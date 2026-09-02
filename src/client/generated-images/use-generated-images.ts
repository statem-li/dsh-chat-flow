/**
 * dsh-think-tools — 本回合生图结果收集 hook（客户端）。
 *
 * 两级取数：
 *  1. **内联**：工具结果 JSON 未超 DSH spill 阈值时，文本即完整 JSON，
 *     `parseGeneratedImageText` 直接提取（b64_json → data URL）。
 *  2. **spill 外取**：结果超过阈值时文本只剩「preview + locator」，完整
 *     JSON 存在 host 侧 spill 文件里——从文本提取 locator，请求
 *     `/api/think-tools/generated-images`（host 半身路由，仅 root 内、只回
 *     图片 URL），拿到图片数据。
 *
 * 缓存：内联结果按 block 对象（WeakMap），spill 结果按 callId（Map），
 * 同一结果只解析/请求一次；模块级缓存跨渲染复用。
 */
import { useEffect, useMemo, useState } from 'react'
import type { ToolCallBlock } from '@deepseek-ai/dsh-client-runtime/client'
import { callName, resultText } from '../tool-summary/tool-stats.ts'
import { findSpillLocator, parseGeneratedImageText } from './parse'
import type { GeneratedImageEntry } from './parse'

export interface GeneratedImagesState {
  readonly urls: readonly string[]
  readonly model: string | null
}

const EMPTY: GeneratedImagesState = { urls: [], model: null }

/** 内联结果缓存：按 tool-call 块对象（引用稳定，跨渲染复用）。 */
const inlineCache = new WeakMap<ToolCallBlock, readonly GeneratedImageEntry[]>()

/** spill 结果缓存：按 callId（含失败占位，避免反复请求）。 */
const spillCache = new Map<string, GeneratedImagesState>()
const spillPending = new Map<string, Promise<void>>()

/** 递归收集一个工具树的全部调用（root + subCalls），生图可能出现在子调用。 */
function collectBlocks(root: ToolCallBlock): ToolCallBlock[] {
  const out = [root]
  for (const child of root.subCalls) out.push(...collectBlocks(child))
  return out
}

/** 解析一个调用的内联结果（缓存）。 */
function inlineOf(block: ToolCallBlock): readonly GeneratedImageEntry[] {
  const hit = inlineCache.get(block)
  if (hit !== undefined) return hit
  const entries = parseGeneratedImageText(resultText(block))
  inlineCache.set(block, entries)
  return entries
}

/** 通过 host 路由读 spill 文件，取回图片 URL（去重、缓存、失败占位）。 */
async function loadSpill(callId: string, locator: string): Promise<GeneratedImagesState> {
  const hit = spillCache.get(callId)
  if (hit !== undefined) return hit
  const running = spillPending.get(callId)
  if (running !== undefined) {
    await running
    return spillCache.get(callId) ?? EMPTY
  }
  const pending = (async (): Promise<void> => {
    let state: GeneratedImagesState = EMPTY
    try {
      const response = await fetch(
        `/api/think-tools/generated-images?file=${encodeURIComponent(locator)}`,
      )
      const data: unknown = response.ok ? await response.json() : null
      if (typeof data === 'object' && data !== null) {
        const record = data as { urls?: unknown; model?: unknown }
        const urls = Array.isArray(record.urls)
          ? record.urls.filter((url): url is string => typeof url === 'string' && url !== '')
          : []
        state = {
          urls,
          model: typeof record.model === 'string' && record.model !== '' ? record.model : null,
        }
      }
    } catch {
      state = EMPTY
    }
    spillCache.set(callId, state)
  })()
  spillPending.set(callId, pending)
  await pending
  spillPending.delete(callId)
  return spillCache.get(callId) ?? EMPTY
}

/** 合并多张来源的结果（去重、保留首个非空 model）。 */
function mergeImages(states: readonly GeneratedImagesState[]): GeneratedImagesState {
  const urls: string[] = []
  let model: string | null = null
  for (const state of states) {
    for (const url of state.urls) if (!urls.includes(url)) urls.push(url)
    if (model === null && state.model !== null) model = state.model
  }
  return { urls, model }
}

/**
 * 订阅本回合 generate_image 的结果图片（内联 + spill 异步），
 * toolNodes 变化时重新扫描；spill 到达后触发一次更新。
 */
export function useGeneratedImages(toolNodes: readonly unknown[]): GeneratedImagesState {
  const scan = useMemo(() => {
    const inline: GeneratedImageEntry[] = []
    const locators: { callId: string; locator: string }[] = []
    for (const tool of toolNodes) {
      const root = (tool as { data?: { root?: ToolCallBlock } }).data?.root
      if (root === undefined) continue
      for (const block of collectBlocks(root)) {
        if (callName(block) !== 'generate_image') continue
        if (!('kind' in block) || block.isError) continue
        const entries = inlineOf(block)
        if (entries.length > 0) {
          for (const entry of entries) {
            if (!inline.some(candidate => candidate.url === entry.url)) inline.push(entry)
          }
        } else {
          const locator = findSpillLocator(resultText(block))
          if (locator !== undefined && !locators.some(item => item.callId === block.callId)) {
            locators.push({ callId: block.callId, locator })
          }
        }
      }
    }
    return { inline, locators, key: locators.map(item => item.callId).join('|') }
  }, [toolNodes])

  const [spill, setSpill] = useState<GeneratedImagesState>(EMPTY)

  useEffect(() => {
    if (scan.locators.length === 0) {
      setSpill(EMPTY)
      return
    }
    let cancelled = false
    void (async (): Promise<void> => {
      const cached: GeneratedImagesState[] = []
      const miss: { callId: string; locator: string }[] = []
      for (const item of scan.locators) {
        const hit = spillCache.get(item.callId)
        if (hit !== undefined) cached.push(hit)
        else miss.push(item)
      }
      let pending: GeneratedImagesState = mergeImages(cached)
      if (miss.length > 0) {
        const loaded = await Promise.all(miss.map(item => loadSpill(item.callId, item.locator)))
        if (!cancelled) pending = mergeImages([...cached, ...loaded])
      }
      if (!cancelled) setSpill(pending)
    })()
    return () => { cancelled = true }
  }, [scan.key])

  return useMemo(() => {
    const states: GeneratedImagesState[] = [spill]
    if (scan.inline.length > 0) {
      states.push({ urls: scan.inline.map(entry => entry.url), model: scan.inline[0]?.model ?? null })
    }
    return mergeImages(states)
  }, [scan, spill])
}
