/**
 * dsh-think-tools — download 工具的原子卡片（client 半身）。
 *
 * 注册进 ui-tool 的 keyed `tool.call.toolview` 槽位（key: 'download'），
 * 接管内置 download 工具行的渲染：
 *  - 运行中：约 700ms 轮询 host 半身进度路由（按 callId 对齐——run_code
 *    子调用的 RunningToolCall.callId 就是 `<parent>:code:<n>`，与 host
 *    进度表键一致），渲染真实进度条 + 速度 + 已收/总量 + ETA；
 *  - 完成态：从结果 meta 读 { path, bytes, durationMs }，静态卡片 +
 *    「打开所在目录」按钮（openFile 打开落盘文件所在目录）；
 *  - 轮询不可达（旧 host / 路由缺失）时优雅降级为官方 generic 行为：
 *    不抛错、不白屏，显示运行时长。
 */

import { memo, useEffect, useRef, useState } from 'react'
import { IconDownloadOutline16 } from '@deepseek-ai/dsh-client-ui-primitives'
import type { ToolCallViewProps } from '@deepseek-ai/dsh-client-ui-tool/client'
import { formatDuration } from '../tool-summary/tool-stats.ts'

const NS = 'dtt-dl'

/** host 进度路由的单条状态（与 host 端 DownloadState 对齐）。 */
interface DownloadState {
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

/** 完成态 meta（host 端 presentationMeta 投影的 canonical 值）。 */
interface DownloadMeta {
  ok?: boolean
  path?: string
  url?: string
  bytes?: number
  totalBytes?: number
  durationMs?: number
}

/** 完成态静态进度：meta 里有 totalBytes 时可画出终值比例。 */
function settledRatio(meta: DownloadMeta | null): number | null {
  if (meta === null) return null
  const bytes = typeof meta.bytes === 'number' ? meta.bytes : undefined
  const total = typeof meta.totalBytes === 'number' && meta.totalBytes > 0 ? meta.totalBytes : undefined
  if (bytes === undefined || total === undefined) return null
  return Math.min(1, bytes / total)
}

function formatBytes(n: number): string {
  if (!Number.isFinite(n) || n < 0) return '?'
  if (n < 1024) return `${Math.round(n)} B`
  if (n < 1024 ** 2) return `${(n / 1024).toFixed(1)} KB`
  if (n < 1024 ** 3) return `${(n / 1024 ** 2).toFixed(1)} MB`
  return `${(n / 1024 ** 3).toFixed(2)} GB`
}

function formatSpeed(bps: number): string {
  if (!Number.isFinite(bps) || bps <= 0) return '—'
  return `${formatBytes(bps)}/s`
}

/** shell 命令参数 → { url, output }：识别 -OutFile / -o / --output / DownloadFile 第二参。 */
function parseShellDownload(command: string): { url: string; output: string } | undefined {
  let output = ''
  const psOut = /-OutFile[=\s]+(?:"([^"]+)"|'([^']+)'|([^\s"]+))/i.exec(command)
  if (psOut !== null) output = psOut[1] ?? psOut[2] ?? psOut[3] ?? ''
  if (output === '') {
    const curlOut = /(?:--output-document|--output|-o|-O)[=\s]+(?:"([^"]+)"|'([^']+)'|([^\s"]+))/i.exec(command)
    if (curlOut !== null) output = curlOut[1] ?? curlOut[2] ?? curlOut[3] ?? ''
  }
  if (output === '') {
    const df = /DownloadFile\s*\(\s*[^,()]+,\s*(?:"([^"]+)"|'([^']+)'|([\w.:\\\/-]+))/i.exec(command)
    if (df !== null) output = df[1] ?? df[2] ?? df[3] ?? ''
  }
  let url = ''
  const urls = command.match(/https?:\/\/[^\s"']+/gi)
  if (urls !== null && urls.length > 0) url = urls[urls.length - 1] ?? ''
  if (url === '' && output === '') return undefined
  return { url, output }
}

/** 运行中的活卡片：轮询进度路由，画真实进度条。 */
export const LiveDownloadCard = memo(function LiveDownloadCard({
  callId, url, startedAt, outputPath,
}: {
  callId: string
  url: string
  startedAt: number
  /** shell 下载解析出的落盘路径（download 工具为 undefined）：非空时注册文件看护。 */
  outputPath?: string | undefined
}) {
  const [state, setState] = useState<DownloadState | null>(null)
  const [now, setNow] = useState(() => Date.now())
  const aliveRef = useRef(true)
  const watchTriedRef = useRef(false)

  useEffect(() => {
    aliveRef.current = true
    let timer: ReturnType<typeof setTimeout> | null = null
    const tick = async (): Promise<void> => {
      if (!aliveRef.current) return
      try {
        const res = await fetch(`/api/think-tools/download/progress?callId=${encodeURIComponent(callId)}`, { cache: 'no-store' })
        if (res.ok) {
          const data = (await res.json()) as { download?: DownloadState | null }
          if (aliveRef.current) setState(data.download ?? null)
          // shell 下载：进度表没记录且还没试过 → POST 落盘路径注册文件看护
          //（host 端 stat 文件增长合成进度，之后每轮轮询就是心跳）。
          if (data.download === null && outputPath !== undefined && outputPath !== '' && !watchTriedRef.current) {
            watchTriedRef.current = true
            void fetch('/api/think-tools/download/watch', {
              method: 'POST',
              headers: { 'content-type': 'application/json' },
              body: JSON.stringify({ callId, path: outputPath, url }),
            }).catch(() => {})
          }
        }
      } catch {
        // 网络/路由抖动：下一轮再试，不清空已有状态。
      }
      if (aliveRef.current) timer = setTimeout(() => { void tick() }, 700)
    }
    void tick()
    const clock = setInterval(() => { if (aliveRef.current) setNow(Date.now()) }, 500)
    return () => {
      aliveRef.current = false
      if (timer !== null) clearTimeout(timer)
      clearInterval(clock)
    }
  }, [callId])

  const elapsed = Math.max(0, now - startedAt)
  const total = state?.totalBytes ?? null
  const received = state?.receivedBytes ?? 0
  // 比例：有 Content-Length 用真实比例；否则不定长（游标动画）。
  const ratio = total !== null && total > 0 ? Math.min(1, received / total) : null
  const speed = state?.speedBps ?? 0
  const eta = ratio !== null && speed > 0 && ratio < 1
    ? Math.max(0, Math.round(((1 - ratio) * total!) / speed))
    : null
  const status = state?.status ?? 'running'

  return (
    <div className={`${NS}__card`} data-state={status} data-determinate={ratio !== null || undefined}>
      <div className={`${NS}__head`}>
        <IconDownloadOutline16 size={14} aria-hidden />
        <span className={`${NS}__title`}>
          {status === 'running' ? '下载中' : status === 'completed' ? '下载完成' : status === 'cancelled' ? '已取消' : '下载失败'}
          {status === 'running' && <span className={`${NS}__elapsed`}> · {formatDuration(elapsed)}</span>}
        </span>
        <span className={`${NS}__stats`}>
          {speed > 0 && status === 'running' && <span className={`${NS}__speed`}>{formatSpeed(speed)}</span>}
          {total !== null && <span className={`${NS}__bytes`}>{formatBytes(received)} / {formatBytes(total)}</span>}
          {total === null && received > 0 && <span className={`${NS}__bytes`}>{formatBytes(received)}</span>}
        </span>
      </div>
      {url !== '' && <div className={`${NS}__url`} title={url}>{url}</div>}
      <div className={`${NS}__track`} role={ratio !== null ? 'progressbar' : undefined}
        aria-valuenow={ratio !== null ? Math.round(ratio * 100) : undefined}
        aria-valuemin={0} aria-valuemax={100}>
        {ratio !== null ? (
          <div className={`${NS}__fill`} style={{ width: `${Math.round(ratio * 100)}%` }} />
        ) : (
          <div className={`${NS}__cursor`} />
        )}
      </div>
      <div className={`${NS}__foot`}>
        {ratio !== null && <span className={`${NS}__pct`}>{Math.round(ratio * 100)}%</span>}
        {eta !== null && <span className={`${NS}__eta`}>剩余约 {eta < 60 ? `${eta}s` : `${Math.floor(eta / 60)}m${(eta % 60).toString().padStart(2, '0')}s`}</span>}
        {status === 'failed' && state?.error !== undefined && <span className={`${NS}__error`}>{state.error}</span>}
        {state?.dest !== undefined && state.dest !== '' && (status === 'completed' || status === 'running') && (
          <span className={`${NS}__dest`} title={state.dest}>→ {state.dest}</span>
        )}
      </div>
    </div>
  )
})

/** 原子 download 卡片：运行中走活进度，完成/失败走静态摘要。 */
export const DownloadCard = memo(function DownloadCard(props: ToolCallViewProps) {
  const { block, callId, openFile } = props
  const running = !('kind' in block)

  if (running) {
    const raw = block.argsRaw
    let url = ''
    let outputPath: string | undefined
    try {
      const parsed = JSON.parse(raw) as { url?: unknown; dest?: unknown; command?: unknown }
      if (typeof parsed?.url === 'string') url = parsed.url
      // download 工具的 dest；shell 命令走 parseDownload 提取 -OutFile/-o 等。
      if (typeof parsed?.dest === 'string' && parsed.dest !== '') outputPath = parsed.dest
      if (typeof parsed?.command === 'string' && parsed.command !== '') {
        const shell = parseShellDownload(parsed.command)
        if (shell !== undefined) {
          if (shell.url !== '') url = shell.url
          if (shell.output !== '') outputPath = shell.output
        }
      }
    } catch { /* 保持空串 */ }
    return <LiveDownloadCard callId={callId} url={url} startedAt={block.time} outputPath={outputPath} />
  }

  // 完成态：meta 优先，回退到结果文本。
  const meta = (block.meta !== null && typeof block.meta === 'object' ? block.meta : null) as DownloadMeta | null
  const isError = block.isError
  const path = typeof meta?.path === 'string' ? meta.path : null
  const bytes = typeof meta?.bytes === 'number' ? meta.bytes : null
  const durationMs = typeof meta?.durationMs === 'number' ? meta.durationMs : null
  const ratio = settledRatio(meta)
  const text = block.content
    .map((part) => (part as { type?: string; text?: string }).type === 'text' && typeof (part as { text?: string }).text === 'string' ? (part as { text: string }).text : '')
    .join('\n')

  const reveal = (): void => {
    if (path === null) return
    // openFile 的语义是「打开路径」；打开文件本身即定位到落盘产物。
    openFile(path)
  }

  return (
    <div className={`${NS}__card`} data-state={isError ? 'failed' : 'completed'} data-determinate={ratio !== null || undefined}>
      <div className={`${NS}__head`}>
        <IconDownloadOutline16 size={14} aria-hidden />
        <span className={`${NS}__title`}>{isError ? '下载失败' : '下载完成'}</span>
        <span className={`${NS}__stats`}>
          {bytes !== null && <span className={`${NS}__bytes`}>{formatBytes(bytes)}</span>}
          {durationMs !== null && <span className={`${NS}__elapsed`}> · {formatDuration(durationMs)}</span>}
        </span>
      </div>
      {!isError && ratio !== null && (
        <div className={`${NS}__track`}>
          <div className={`${NS}__fill` } style={{ width: `${Math.round(ratio * 100)}%` }} />
        </div>
      )}
      {(path !== null || text !== '') && (
        <div className={`${NS}__foot`}>
          {path !== null && (
            <>
              <span className={`${NS}__dest`} title={path}>→ {path}</span>
              <button type="button" className={`${NS}__open`} onClick={reveal}>打开</button>
            </>
          )}
          {path === null && text !== '' && <span className={`${NS}__error`}>{text.slice(0, 160)}</span>}
        </div>
      )}
    </div>
  )
})
