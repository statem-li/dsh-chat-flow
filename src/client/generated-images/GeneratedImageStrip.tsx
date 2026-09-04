/**
 * dsh-chat-flow — 生图画廊条（client 组件）。
 *
 * 在对话流卡片（总结卡）正文区渲染本回合 generate_image 的结果：多张并排
 * 缩略图（带序号角标）、单张保持原比例小图（≤360px），单击打开全屏
 * Lightbox（暗底居中 + 保存 + Esc / 点空白关闭）。交互与旧 dsh-webui 的
 * image-gallery（GalleryStrip）一致：createPortal 挂 body 规避祖先
 * backdrop-filter / transform 钉死 fixed 的坑；z-index 1200 为会话级
 * 全屏遮罩统一值。
 *
 * 数据源是工具结果文本（b64_json），不走 markdown 图片策略，因此即使
 * 模型在正文里只写了图片路径文字，图也会直接显示。
 */
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { injectGalleryStyles } from '../styles'

const NS = 'dgi'
const cls = {
  strip: `${NS}__strip`,
  stripMulti: `${NS}__strip--multi`,
  row: `${NS}__row`,
  item: `${NS}__item`,
  thumb: `${NS}__thumb`,
  badge: `${NS}__badge`,
  backdrop: `${NS}__backdrop`,
  stage: `${NS}__stage`,
  saveButton: `${NS}__save-button`,
  saveIcon: `${NS}__save-icon`,
  broken: `${NS}__broken`,
  full: `${NS}__full`,
  metaLine: `${NS}__meta-line`,
  model: `${NS}__model`,
  hintLine: `${NS}__hint-line`,
}

const L = {
  open: '点击查看大图',
  broken: '图片加载失败',
  lightboxAria: '生图结果',
  save: '保存',
  saving: '保存中…',
  saved: '已保存',
  saveFailed: '保存失败',
  hint: '点击空白处或按 Esc 关闭',
  head: (count: number) => `生图结果 · ${count} 张`,
}

type SaveState = 'idle' | 'saving' | 'saved' | 'failed' | 'canceled'

declare global {
  interface Window {
    /** File System Access API：弹系统「另存为」对话框（部分浏览器/上下文不支持）。 */
    showSaveFilePicker?: (options?: { suggestedName?: string }) => Promise<FileSystemFileHandle>
  }
}

/** 从远程 URL 提取文件名（含扩展名），兜底 gallery-N.png。 */
function filenameFrom(url: string, index: number): string {
  try {
    const last = new URL(url).pathname.split('/').pop() ?? ''
    if (/\.(png|jpe?g|webp|gif)$/i.test(last)) return last
  } catch {
    /* 非 URL 或解析失败，用兜底名 */
  }
  return `gallery-${index + 1}.png`
}

/** 普通下载（浏览器默认下载目录 / 下载栏）。失败返回 false。 */
async function downloadFallback(url: string, filename: string): Promise<boolean> {
  try {
    const response = await fetch(url, { mode: 'cors' })
    if (!response.ok) return false
    const blob = await response.blob()
    if (blob.size === 0) return false
    const objectUrl = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = objectUrl
    anchor.download = filename
    document.body.appendChild(anchor)
    anchor.click()
    anchor.remove()
    setTimeout(() => URL.revokeObjectURL(objectUrl), 60_000)
    return true
  } catch {
    return false
  }
}

/**
 * 保存图片：优先系统「另存为」对话框（用户自选位置/文件名）；
 * 对话框不可用（手势/权限异常、浏览器不支持）时自动降级为普通下载。
 * 顺序关键：showSaveFilePicker 必须在用户点击手势的有效窗口内调用——
 * 先弹对话框拿到句柄，再取图写入用户所选的位置。
 */
async function saveImage(url: string, filename: string): Promise<SaveState> {
  if (typeof window.showSaveFilePicker === 'function') {
    let handle: FileSystemFileHandle
    try {
      handle = await window.showSaveFilePicker({ suggestedName: filename })
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return 'canceled'
      return (await downloadFallback(url, filename)) ? 'saved' : 'failed'
    }
    try {
      const response = await fetch(url, { mode: 'cors' })
      if (!response.ok) return (await downloadFallback(url, filename)) ? 'saved' : 'failed'
      const blob = await response.blob()
      if (blob.size === 0) return (await downloadFallback(url, filename)) ? 'saved' : 'failed'
      const writable = await handle.createWritable()
      await writable.write(blob)
      await writable.close()
      return 'saved'
    } catch {
      return (await downloadFallback(url, filename)) ? 'saved' : 'failed'
    }
  }
  return (await downloadFallback(url, filename)) ? 'saved' : 'failed'
}

/** 生图画廊条：多张并排、单张小图；点击开全屏 Lightbox。 */
export function GeneratedImageStrip({ images, model }: {
  readonly images: readonly string[]
  readonly model?: string | null | undefined
}): JSX.Element | null {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [broken, setBroken] = useState<ReadonlySet<number>>(new Set())
  const [saveState, setSaveState] = useState<SaveState>('idle')

  // 幂等注入样式（SSR 环境无 document 时静默跳过）
  useEffect(() => { injectGalleryStyles() }, [])

  useEffect(() => {
    if (openIndex === null) return
    const onKey = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') setOpenIndex(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [openIndex])

  const open = openIndex !== null ? images[openIndex] : undefined
  const onSave = async (): Promise<void> => {
    if (open === undefined || saveState === 'saving') return
    setSaveState('saving')
    const result = await saveImage(open, filenameFrom(open, openIndex as number))
    setSaveState(result === 'canceled' ? 'idle' : result)
  }
  const markBroken = (index: number): void => {
    setBroken(prev => new Set(prev).add(index))
  }

  const multi = images.length > 1
  return (
    <div className={`${cls.strip}${multi ? ` ${cls.stripMulti}` : ''}`}>
      <div className={cls.row}>
        {images.map((url, index) => (
          <button
            type="button"
            key={`${url.slice(0, 48)}:${index}`}
            className={cls.item}
            onClick={() => { setOpenIndex(index); setSaveState('idle') }}
            title={L.open}
          >
            <img
              src={url}
              alt={`${L.head(images.length)} ${index + 1}`}
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
              draggable={false}
              className={cls.thumb}
              onError={() => markBroken(index)}
            />
            {multi && <span className={cls.badge}>{index + 1}</span>}
          </button>
        ))}
      </div>
      {open !== undefined && createPortal(
        <div
          className={cls.backdrop}
          role="dialog"
          aria-modal="true"
          aria-label={`${L.lightboxAria} ${(openIndex as number) + 1}`}
          onClick={() => setOpenIndex(null)}
        >
          <div className={cls.stage} onClick={event => event.stopPropagation()}>
            <button
              type="button"
              className={cls.saveButton}
              onClick={event => { event.stopPropagation(); void onSave() }}
              disabled={saveState === 'saving'}
              aria-label={L.save}
            >
              <svg className={cls.saveIcon} viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
                <path d="M8 1v8m0 0L4.5 5.5M8 9l3.5-3.5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2.5 11.5v2h11v-2" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
              </svg>
              <span>
                {saveState === 'idle' && L.save}
                {saveState === 'saving' && L.saving}
                {saveState === 'saved' && L.saved}
                {saveState === 'failed' && L.saveFailed}
              </span>
            </button>
            {broken.has(openIndex as number) ? (
              <div className={cls.broken}>{L.broken}</div>
            ) : (
              <img
                src={open}
                alt={`${L.lightboxAria} ${(openIndex as number) + 1}`}
                className={cls.full}
                onError={() => markBroken(openIndex as number)}
              />
            )}
            <div className={cls.metaLine}>
              <span>#{(openIndex as number) + 1}</span>
              {model !== null && model !== undefined && model !== '' && (
                <span className={cls.model}>{model}</span>
              )}
            </div>
            <div className={cls.hintLine}>{L.hint}</div>
          </div>
        </div>,
        document.body,
      )}
    </div>
  )
}

/** 导出供测试/调试：真实用例的解析入口。 */
export { parseGeneratedImageText } from './parse'
export type { GeneratedImageEntry } from './parse'
