/**
 * dsh-chat-flow — 本地 HTML 内嵌预览卡（client）。
 *
 * 挂在对话流卡片正文里（紧跟提到路径的那段正文之后）：先打 /meta 探测，
 * 命中就用 iframe 嵌 host 的 /view 页面，没命中按强弱候选决定静默还是报错。
 *
 * 三个要点：
 *  1. 高度自适应 —— /view 注入的脚本把 scrollHeight 用 postMessage 回传，
 *     父窗口按通道号认领后写进 body 的 height（CSS 缓动过渡），夹在
 *     160~720px；页面没脚本报高度时兜底 360px，iframe 内部自己滚。
 *  2. 隔离 —— iframe 叠 sandbox（不给 allow-same-origin）+ host 侧 CSP
 *     sandbox，预览页落进不透明源，读不到 DSH 的 cookie / localStorage。
 *  3. 「浏览器打开」—— 交 host 用系统默认程序打开（.html 即默认浏览器），
 *     失败只在卡片里落一行提示，不打断会话。
 */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { fetchMeta, formatBytes, formatWhen, openInBrowser, viewUrl } from './api.ts'
import { injectHtmlPreviewStyles } from './styles.ts'
import type { HtmlPathHit } from './parse.ts'

/** 预览高度夹取区间（px）。 */
const MIN_H = 160
const MAX_H = 720
/** 拿不到回报高度时的兜底。 */
const FALLBACK_H = 360

type Phase = 'probing' | 'ready' | 'error' | 'hidden'

/** 通道号：一次会话内自增，父窗口据此认领 postMessage。 */
let channelSeq = 0
function nextChannel(): string {
  channelSeq += 1
  return 'h' + channelSeq.toString(36) + Math.random().toString(36).slice(2, 8)
}

/** 14px 线性图标（与插件其它卡片同一视觉语言，不引外部图标包）。 */
function Icon({ d, size = 14 }: { readonly d: string; readonly size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor"
      strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d={d} />
    </svg>
  )
}

const DOC_PATH = 'M4 1.8h5l3 3v9a.7.7 0 0 1-.7.7H4a.7.7 0 0 1-.7-.7v-12A.7.7 0 0 1 4 1.8Z M9 1.9v3.1h3.1'
const EXT_PATH = 'M6.4 3.2H3.2v9.6h9.6V9.6 M9.2 2.4h4.4v4.4 M13.6 2.4 7.6 8.4'
const REFRESH_PATH = 'M13.4 8a5.4 5.4 0 1 1-1.6-3.8 M13.2 1.9v3h-3'
const CHEVRON_PATH = 'M4 6.2 8 10.2l4-4'

/**
 * 一个本地 HTML 文件的内嵌预览。
 * @param path - 消息里抽出来的路径（原样，相对路径由 host 按 cwd 解析）。
 * @param cwd - 会话工作目录（相对路径基准）。
 */
export function HtmlPreviewCard({ hit, cwd }: {
  readonly hit: HtmlPathHit
  readonly cwd?: string | undefined
}) {
  const { path, explicit } = hit
  const [phase, setPhase] = useState<Phase>('probing')
  const [meta, setMeta] = useState<{ abs: string; name: string; size: number; mtimeMs: number } | null>(null)
  const [error, setError] = useState('')
  const [reported, setReported] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const [openHint, setOpenHint] = useState('')
  const [spin, setSpin] = useState(false)
  const [frameKey, setFrameKey] = useState(0)
  const channelRef = useRef('')
  if (channelRef.current === '') channelRef.current = nextChannel()
  const channel = channelRef.current

  useEffect(() => { injectHtmlPreviewStyles() }, [])

  // 探测：路径变化或手动刷新都重新问一次 host。
  useEffect(() => {
    let alive = true
    setPhase('probing')
    setMeta(null)
    setReported(0)
    setLoaded(false)
    setError('')
    void (async (): Promise<void> => {
      const result = await fetchMeta(path, cwd)
      if (!alive) return
      if (result.ok === true && result.abs !== undefined) {
        setMeta({
          abs: result.abs,
          name: result.name ?? result.abs.split(/[\\/]/).pop() ?? result.abs,
          size: result.size ?? 0,
          mtimeMs: result.mtimeMs ?? 0,
        })
        setPhase('ready')
        return
      }
      // 裸文件名弱候选找不到 = 大概率是随口提到的名字，静默。
      if ((result.code === 'not-found' || result.code === 'no-route') && !explicit) {
        setPhase('hidden')
        return
      }
      setError(result.error ?? '无法读取该文件')
      setPhase('error')
    })()
    return () => { alive = false }
  }, [path, cwd, explicit, frameKey])

  // 高度回报：只认领自己通道的消息。
  useEffect(() => {
    if (phase !== 'ready') return
    const onMessage = (event: MessageEvent): void => {
      const data = event.data as { __dshHtmlPreview?: unknown; id?: unknown; height?: unknown } | null
      if (data === null || typeof data !== 'object') return
      if (data.__dshHtmlPreview !== 1 || data.id !== channel) return
      const height = typeof data.height === 'number' && Number.isFinite(data.height) ? data.height : 0
      if (height > 0) setReported(height)
    }
    window.addEventListener('message', onMessage)
    return () => { window.removeEventListener('message', onMessage) }
  }, [phase, channel])

  const src = useMemo(
    () => viewUrl(path, cwd, channel, meta?.mtimeMs ?? 0),
    [path, cwd, channel, meta?.mtimeMs],
  )

  // 探测期先撑到最小高（骨架微光才看得见）；报错态收 0，只留头部 + 一行提示。
  const boxHeight = collapsed || phase === 'error'
    ? 0
    : phase === 'probing'
      ? MIN_H
      : Math.max(MIN_H, Math.min(MAX_H, reported > 0 ? reported : FALLBACK_H))

  const reload = useCallback((): void => {
    setSpin(true)
    window.setTimeout(() => { setSpin(false) }, 700)
    setFrameKey(key => key + 1)
  }, [])

  const open = useCallback((): void => {
    void (async (): Promise<void> => {
      setOpenHint('')
      try {
        await openInBrowser(path, cwd)
      } catch (reason) {
        setOpenHint(reason instanceof Error ? reason.message : '打开失败')
      }
    })()
  }, [path, cwd])

  if (phase === 'hidden') return null

  // 探测成功用 host 回的文件名，失败/未回来就照抄消息里写的那串（更诚实）。
  const name = meta !== null ? meta.name : path
  const veilGone = phase === 'ready' && loaded

  return (
    <div className="dhp__card" data-phase={phase} data-collapsed={collapsed ? '1' : '0'}>
      <div className="dhp__head">
        <span className="dhp__icon"><Icon d={DOC_PATH} /></span>
        <span className="dhp__name" title={meta?.abs ?? path}>{name}</span>
        <span className="dhp__tag">HTML</span>
        {meta !== null && (
          <span className="dhp__meta">{formatBytes(meta.size)} · {formatWhen(meta.mtimeMs)}</span>
        )}
        <div className="dhp__actions">
          <button type="button" className="dhp__btn dhp__btn--primary" onClick={open} title={meta?.abs ?? path}>
            浏览器打开
            <Icon d={EXT_PATH} size={12} />
          </button>
          <button type="button" className="dhp__btn dhp__btn--icon" data-spin={spin ? '1' : undefined}
            onClick={reload} title="重新读取" aria-label="重新读取">
            <span className="dhp__spin"><Icon d={REFRESH_PATH} size={13} /></span>
          </button>
          <button type="button" className="dhp__btn dhp__btn--icon" onClick={() => { setCollapsed(v => !v) }}
            aria-expanded={!collapsed} title={collapsed ? '展开预览' : '折叠预览'} aria-label={collapsed ? '展开预览' : '折叠预览'}>
            <span className="dhp__chevron"><Icon d={CHEVRON_PATH} size={13} /></span>
          </button>
        </div>
      </div>

      <div className="dhp__body" style={{ height: boxHeight }}>
        {phase === 'ready' && (
          <iframe
            key={frameKey}
            className="dhp__frame"
            data-loaded={loaded ? '1' : '0'}
            src={src}
            title={name}
            sandbox="allow-scripts allow-popups allow-forms allow-modals"
            referrerPolicy="no-referrer"
            onLoad={() => { setLoaded(true) }}
          />
        )}
        {phase !== 'error' && (
          <div className="dhp__veil" data-gone={veilGone ? '1' : '0'} aria-hidden>
            <div className="dhp__bar" />
            <div className="dhp__bar" />
            <div className="dhp__bar" />
            <div className="dhp__bar" />
          </div>
        )}
      </div>

      {phase === 'error' && (
        <div className="dhp__err"><span className="dhp__err-dot" />{error}</div>
      )}
      {openHint !== '' && (
        <div className="dhp__err"><span className="dhp__err-dot" />{openHint}</div>
      )}
    </div>
  )
}

/** 一组路径的预览条（同一条正文里多个 html 时纵向堆叠）。 */
export function HtmlPreviewStrip({ hits, cwd }: {
  readonly hits: readonly HtmlPathHit[]
  readonly cwd?: string | undefined
}) {
  if (hits.length === 0) return null
  return (
    <div className="dhp__stack">
      {hits.map(item => <HtmlPreviewCard key={item.path} hit={item} cwd={cwd} />)}
    </div>
  )
}
