/**
 * dsh-think-tools — download 工具（host 半身）。
 *
 * 模型侧：wire 工具 `download`（url / dest / overwrite），Node 全局 fetch
 * 流式写盘，进度（receivedBytes / totalBytes / speedBps / status）记入进程内
 * 进度表；浏览器侧：GET /api/think-tools/download/progress?callId=<callId>
 * 轮询实时进度，GUI 渲染真实进度条。
 *
 * 关键对齐：进度表按 callId 索引。run_code 子调度进入工具体时
 * exec.callId == `<parent>:code:<n>`，与客户端 tool/code-dispatch-start
 * 投影出的 RunningToolCall.callId 完全一致（见 packages/core/tools/src/ptc.ts
 * 的 subCallId 生成）；native 直调时 callId 即模型调用 id，同样成立。
 * 两端不靠 URL 猜测、不靠时序窗口，纯 id 对齐。
 *
 * 约束（与 build.mjs assertHostExternals 一致）：
 *  - 零 @deepseek-ai 运行时导入，host 半身自包含；
 *  - 工具定义是手写 ToolDefinition 字面量——tools.register() 只校验
 *    output { schema, render } 且 output schema 在 JSON Schema 支持子集内
 *    （根级 required 数组合法，见 core/tools json-schema.ts 的
 *    checkObjectSchemaTail）；参数校验按 ToolExecutionInput 契约由 execute
 *    自行完成（"tools validate their own schema"）。
 */

import { createWriteStream } from 'node:fs'
import { mkdir, rm, stat } from 'node:fs/promises'
import { homedir } from 'node:os'
import { basename, dirname, join, resolve } from 'node:path'
import { Readable, Transform } from 'node:stream'
import { pipeline } from 'node:stream/promises'

/** 空闲超时：连续这么久没有任何字节进来就中止（防挂死连接）。 */
const IDLE_TIMEOUT_MS = 90_000
/** 已结束条目保留时长（过期清理）。 */
const SETTLED_TTL_MS = 30 * 60_000
/** 进度表容量上限（超过先淘汰最旧的已结束条目）。 */
const MAX_ENTRIES = 64

/** 一条下载的实时状态（浏览器轮询拿到的就是它）。 */
export interface DownloadState {
  /** 关联的工具调用 id（run_code 子调用为 `<parent>:code:<n>`）。 */
  callId: string
  /** 原始请求 URL。 */
  url: string
  /** 落盘绝对路径。 */
  dest: string
  /** 总字节数；Content-Length 缺失时为 null（进度条走不定长模式）。 */
  totalBytes: number | null
  /** 已接收字节数。 */
  receivedBytes: number
  status: 'running' | 'completed' | 'failed' | 'cancelled'
  error?: string
  startedAt: number
  finishedAt?: number
  /** 平滑后的实时速度（B/s）。 */
  speedBps: number
}

/** 进度表：callId → 状态。对象就地更新，路由在请求时序列化最新值。 */
const downloads = new Map<string, DownloadState>()

/** 淘汰过期/超限条目。 */
function prune(): void {
  const now = Date.now()
  for (const [key, entry] of downloads) {
    if (entry.status !== 'running' && entry.finishedAt !== undefined && now - entry.finishedAt > SETTLED_TTL_MS) {
      downloads.delete(key)
    }
  }
  while (downloads.size > MAX_ENTRIES) {
    let oldestKey: string | undefined
    let oldestAt = Number.POSITIVE_INFINITY
    for (const [key, entry] of downloads) {
      if (entry.status !== 'running') {
        const at = entry.finishedAt ?? entry.startedAt
        if (at < oldestAt) { oldestAt = at; oldestKey = key }
      }
    }
    if (oldestKey === undefined) break
    downloads.delete(oldestKey)
  }
}

/** 文件名消毒：去路径分隔符/控制字符，限长。 */
function sanitizeFilename(name: string): string {
  const cleaned = name.replace(/[\\/:*?"<>|\u0000-\u001f]/g, '_').trim()
  return (cleaned === '' ? 'download.bin' : cleaned).slice(0, 120)
}

/** 从 Content-Disposition 提取文件名（filename* 优先，其次 filename）。 */
function filenameFromDisposition(disposition: string | null): string | null {
  if (disposition === null) return null
  const star = /filename\*=UTF-8''([^;]+)/i.exec(disposition)
  if (star?.[1] !== undefined) {
    try { return sanitizeFilename(decodeURIComponent(star[1].trim())) } catch { /* fall through */ }
  }
  const plain = /filename\s*=\s*"(?:UTF-8)?([^"]+)"|filename\s*=\s*([^;]+)/i.exec(disposition)
  const raw = plain?.[1] ?? plain?.[2]
  return raw === undefined || raw === '' ? null : sanitizeFilename(raw.trim())
}

/** 缺省保存目录（DSH storages 下，不污染工作区）。 */
function defaultDownloadDir(): string {
  const dshHome = process.env.DSH_HOME ?? join(homedir(), '.dsh')
  return join(dshHome, 'storages', 'dsh-think-tools-downloads')
}

/** 字节数格式化（host 侧 result 文本用）。 */
function formatBytes(n: number): string {
  if (!Number.isFinite(n) || n < 0) return '?'
  if (n < 1024) return `${n} B`
  if (n < 1024 ** 2) return `${(n / 1024).toFixed(1)} KB`
  if (n < 1024 ** 3) return `${(n / 1024 ** 2).toFixed(1)} MB`
  return `${(n / 1024 ** 3).toFixed(2)} GB`
}

/** 执行一次下载：写进度表 + 流式落盘，返回 output schema 兼容的 canonical 值。 */
async function runDownload(args: Record<string, unknown>, callId: string, signal: AbortSignal): Promise<Record<string, unknown>> {
  const url = typeof args.url === 'string' ? args.url.trim() : ''
  if (!/^https?:\/\//i.test(url)) throw new Error('download: url 必须是 http(s) 地址')

  const startedAt = Date.now()
  const state: DownloadState = {
    callId,
    url,
    dest: '',
    totalBytes: null,
    receivedBytes: 0,
    status: 'running',
    startedAt,
    speedBps: 0,
  }
  downloads.set(callId, state)
  prune()

  const controller = new AbortController()
  const onCallerAbort = (): void => controller.abort()
  if (signal.aborted) controller.abort()
  else signal.addEventListener('abort', onCallerAbort, { once: true })

  // 空闲看门狗：每次收到字节都续期。
  let idleTimer: ReturnType<typeof setTimeout> | null = null
  const armIdle = (): void => {
    if (idleTimer !== null) clearTimeout(idleTimer)
    idleTimer = setTimeout(() => controller.abort(), IDLE_TIMEOUT_MS)
  }

  try {
    const response = await fetch(url, {
      redirect: 'follow',
      signal: controller.signal,
      headers: {
        'user-agent': 'dsh-think-tools-download/1.0',
        accept: '*/*',
        ...(typeof args.headers === 'object' && args.headers !== null ? args.headers as Record<string, string> : {}),
      },
    })
    if (!response.ok) throw new Error(`HTTP ${response.status} ${response.statusText}`.trim())
    armIdle()

    // 决定落盘路径：显式 dest 优先；否则按 Content-Disposition / 最终 URL 推导。
    const contentLength = response.headers.get('content-length')
    state.totalBytes = contentLength !== null && contentLength !== '' && Number.isFinite(Number(contentLength))
      ? Number(contentLength)
      : null
    let dest = typeof args.dest === 'string' && args.dest.trim() !== '' ? resolve(args.dest.trim()) : ''
    if (dest === '') {
      const name = filenameFromDisposition(response.headers.get('content-disposition'))
        ?? sanitizeFilename(decodeURIComponent(basename(new URL(response.url || url).pathname)))
      dest = join(defaultDownloadDir(), name)
    }
    await mkdir(dirname(dest), { recursive: true })
    const overwrite = args.overwrite === true
    if (!overwrite) {
      try {
        await stat(dest)
        throw new Error(`目标已存在：${dest}（overwrite: true 可覆盖）`)
      } catch (error) {
        if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error
      }
    }
    state.dest = dest

    // 计数 transform：逐块累计 + 速度 EMA（400ms 窗口）。
    let lastAt = Date.now()
    let lastBytes = 0
    const counter = new Transform({
      transform(chunk: Buffer, _enc, callback) {
        state.receivedBytes += chunk.length
        const now = Date.now()
        const dt = now - lastAt
        if (dt >= 400) {
          const instant = ((state.receivedBytes - lastBytes) * 1000) / Math.max(dt, 1)
          state.speedBps = state.speedBps === 0 ? instant : state.speedBps * 0.6 + instant * 0.4
          lastAt = now
          lastBytes = state.receivedBytes
        }
        armIdle()
        callback(null, chunk)
      },
    })
    await pipeline(
      Readable.fromWeb(response.body as unknown as import('node:stream/web').ReadableStream),
      counter,
      createWriteStream(dest),
    )

    const finished = await stat(dest)
    state.status = 'completed'
    state.receivedBytes = finished.size
    state.finishedAt = Date.now()
    prune()

    const durationMs = state.finishedAt - startedAt
    const value: Record<string, unknown> = {
      ok: true,
      path: dest,
      url: response.url || url,
      bytes: finished.size,
      durationMs,
    }
    if (state.totalBytes !== null) value.totalBytes = state.totalBytes
    return value
  } catch (error) {
    const aborted = controller.signal.aborted
    state.status = aborted ? 'cancelled' : 'failed'
    state.error = aborted ? '已取消' : error instanceof Error ? error.message : String(error)
    state.finishedAt = Date.now()
    // 失败/取消都清掉半截文件，不留垃圾。
    if (state.dest !== '') await rm(state.dest, { force: true }).catch(() => {})
    prune()
    throw aborted
      ? new Error(`下载已取消：${url}`)
      : new Error(`下载失败：${state.error}`)
  } finally {
    if (idleTimer !== null) clearTimeout(idleTimer)
    signal.removeEventListener('abort', onCallerAbort)
  }
}

/** 手写的 ToolDefinition 字面量（不引 @deepseek-ai/dsh-tools，保持自包含）。 */
export const downloadTool = {
  name: 'download',
  description: [
    '下载 http(s) 文件到本地（流式写盘，Web 界面实时进度条）。',
    '需要下载文件（安装包 / zip / release 资产 / 模型权重等）时优先用它，而不是用 pwsh 跑 curl。',
    'dest 给目标文件的绝对路径（目录会自动创建）；缺省存到 ~/.dsh/storages/dsh-think-tools-downloads/。',
    '目标已存在时默认报错，传 overwrite: true 覆盖。返回 JSON { ok, path, url, bytes, totalBytes?, durationMs }。',
  ].join(' '),
  parameters: {
    type: 'object',
    properties: {
      url: { type: 'string', description: 'http(s) 下载地址' },
      dest: { type: 'string', description: '目标文件绝对路径（缺省按 Content-Disposition/URL 命名存入默认目录）' },
      overwrite: { type: 'boolean', description: '目标已存在时是否覆盖（默认 false）' },
    },
    required: ['url'],
  },
  output: {
    schema: {
      type: 'object',
      additionalProperties: false,
      properties: {
        ok: { type: 'boolean' },
        path: { type: 'string' },
        url: { type: 'string' },
        bytes: { type: 'integer' },
        totalBytes: { type: 'integer' },
        durationMs: { type: 'integer' },
      },
      required: ['ok', 'path', 'url', 'bytes'],
    },
    render(_args: unknown, value: unknown): Array<{ type: 'text'; text: string }> {
      const v = (typeof value === 'object' && value !== null ? value : {}) as Record<string, unknown>
      const bytes = typeof v.bytes === 'number' ? formatBytes(v.bytes) : '?'
      const total = typeof v.totalBytes === 'number' ? ` / ${formatBytes(v.totalBytes)}` : ''
      const duration = typeof v.durationMs === 'number' ? ` · ${(v.durationMs / 1000).toFixed(1)}s` : ''
      return [{
        type: 'text',
        text: `已下载 → ${String(v.path ?? '?')}\n${bytes}${total}${duration}`,
      }]
    },
    presentationMeta(_args: unknown, value: unknown): unknown {
      // 完整 canonical 值随 tool/result 持久化，client 完成态卡片直接读 meta。
      return value
    },
  },
  timeoutMs: 3_600_000,
  isConcurrencySafe: (): boolean => true,
  async execute(args: unknown, exec: { callId: string; signal: AbortSignal }): Promise<Record<string, unknown>> {
    const record = (typeof args === 'object' && args !== null ? args : {}) as Record<string, unknown>
    if (typeof record.url !== 'string' || record.url.trim() === '') {
      throw new Error('download: 缺少必填参数 url（http(s) 地址）')
    }
    if (record.dest !== undefined && (typeof record.dest !== 'string' || record.dest.trim() === '')) {
      throw new Error('download: dest 必须是非空字符串（目标文件绝对路径）')
    }
    return await runDownload(record, exec.callId, exec.signal)
  },
}

/** JSON 响应小工具。 */
function json(res: import('node:http').ServerResponse, status: number, payload: unknown): void {
  res.writeHead(status, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' })
  res.end(JSON.stringify(payload))
}

/** 只读面：按 callId 取一条下载状态（测试与诊断用；未只读导出进度表本体）。 */
export function readDownloadState(callId: string): DownloadState | undefined {
  return downloads.get(callId)
}

/**
 * 注册下载进度路由（在已注入 webServer 的子上下文中调用）：
 *   GET /api/think-tools/download/progress?callId=<id> → { ok, download|null }
 *   GET /api/think-tools/download/progress            → { ok, downloads[] }
 * @param webCtx - webServer 已就绪的插件上下文。
 */
export function applyDownloadRoutes(webCtx: Record<string, any>): void {
  webCtx.effect(() => webCtx.webServer.register({
    kind: 'prefix',
    path: '/api/think-tools/download',
    handler: (req: import('node:http').IncomingMessage, res: import('node:http').ServerResponse): void => {
      try {
        const parsed = new URL(req.url ?? '/', 'http://x')
        if (req.method !== 'GET' || parsed.pathname !== '/api/think-tools/download/progress') {
          json(res, 404, { ok: false, error: 'not found' })
          return
        }
        const callId = parsed.searchParams.get('callId')
        if (callId !== null && callId !== '') {
          json(res, 200, { ok: true, download: downloads.get(callId) ?? null })
          return
        }
        const list = [...downloads.values()].sort((a, b) => b.startedAt - a.startedAt).slice(0, 50)
        json(res, 200, { ok: true, downloads: list })
      } catch {
        json(res, 500, { ok: false, error: 'internal error' })
      }
    },
  }), 'dsh-think-tools: download routes')
}

/**
 * 注册 download 工具（在已注入 tools 的子上下文中调用）。
 * @param toolsCtx - tools 服务已就绪的插件上下文。
 */
export function applyDownloadTool(toolsCtx: Record<string, any>): void {
  toolsCtx.effect(() => toolsCtx.tools.register(downloadTool), 'dsh-think-tools: download tool')
}
