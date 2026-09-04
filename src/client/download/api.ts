/**
 * dsh-chat-flow — 下载进度轮询 hook（client 半身）。
 *
 * 供抽屉行（SimpleToolRow）等轻量场景复用：按 callId 轮询 host 半身的
 * /api/chat-flow/download/progress，拿不到就回 null（优雅降级为纯时长）。
 */

import { useEffect, useState } from 'react'

/** host 进度路由的单条状态（与 host 端 DownloadState 对齐）。 */
export interface DownloadState {
  callId: string
  url: string
  dest: string
  totalBytes: number | null
  receivedBytes: number
  status: 'running' | 'completed' | 'failed' | 'cancelled'
  error?: string
  startedAt: number
  finishedAt?: number
  speedBps: number
}

/** 下载进度百分比（0-100）；总量未知返回 null。 */
export function downloadPercent(state: DownloadState | null): number | null {
  if (state === null || state.totalBytes === null || state.totalBytes <= 0) return null
  return Math.min(100, Math.max(0, Math.floor((100 * state.receivedBytes) / state.totalBytes)))
}

/**
 * 轮询一个下载的实时状态。
 * @param callId - 工具调用 id（run_code 子调用为 `<parent>:code:<n>`）。
 * @param active - true 才轮询；false/undefined 时恒返回 null。
 */
export function useDownloadState(callId: string | undefined, active: boolean): DownloadState | null {
  const [state, setState] = useState<DownloadState | null>(null)
  useEffect(() => {
    if (!active || callId === undefined || callId === '') {
      setState(null)
      return
    }
    let alive = true
    let timer: ReturnType<typeof setTimeout> | null = null
    const tick = async (): Promise<void> => {
      if (!alive) return
      try {
        const res = await fetch(`/api/chat-flow/download/progress?callId=${encodeURIComponent(callId)}`, { cache: 'no-store' })
        if (res.ok) {
          const data = (await res.json()) as { download?: DownloadState | null }
          if (alive) setState(data.download ?? null)
        }
      } catch {
        // 抖动忽略，下轮再试。
      }
      if (alive) timer = setTimeout(() => { void tick() }, 700)
    }
    void tick()
    return () => {
      alive = false
      if (timer !== null) clearTimeout(timer)
    }
  }, [callId, active])
  return state
}
