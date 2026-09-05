/**
 * dsh-chat-flow — 本地 HTML 预览 API 客户端。
 *
 * 三个调用：/meta（探测存在性与大小，决定渲染/静默/报错）、
 * /view 的 URL（给 iframe 当 src，host 侧注入 base + 高度回报脚本）、
 * /open（交系统默认浏览器打开）。
 */

const ROUTE = '/api/chat-flow/html'

/** /meta 的返回（失败时带机器可读 code）。 */
export interface HtmlMeta {
  ok: boolean
  abs?: string
  name?: string
  dir?: string
  size?: number
  mtimeMs?: number
  code?: string
  error?: string
}

/** iframe 的 src：带通道号 h（父窗口据此认领 postMessage）与版本 v（改动即重载）。 */
export function viewUrl(path: string, cwd: string | undefined, channel: string, version: number): string {
  const params = new URLSearchParams({ path })
  if (cwd !== undefined && cwd !== '') params.set('cwd', cwd)
  params.set('h', channel)
  if (version > 0) params.set('v', String(version))
  return ROUTE + '/view?' + params.toString()
}

/** 探测文件（网络异常按 not-found 处理，交由调用方静默）。 */
export async function fetchMeta(path: string, cwd: string | undefined): Promise<HtmlMeta> {
  const params = new URLSearchParams({ path })
  if (cwd !== undefined && cwd !== '') params.set('cwd', cwd)
  try {
    const response = await fetch(ROUTE + '/meta?' + params.toString(), { cache: 'no-store' })
    const data = await response.json().catch(() => null) as HtmlMeta | null
    if (data !== null && typeof data === 'object') return data
    return { ok: false, code: response.status === 404 ? 'not-found' : 'internal', error: 'HTTP ' + response.status }
  } catch {
    return { ok: false, code: 'offline', error: '预览服务不可达' }
  }
}

/** 用系统默认程序（浏览器）打开；失败抛错由调用方提示。 */
export async function openInBrowser(path: string, cwd: string | undefined): Promise<void> {
  const response = await fetch(ROUTE + '/open', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ path, cwd }),
  })
  const data = await response.json().catch(() => null) as { ok?: boolean; error?: string } | null
  if (data === null || data.ok !== true) {
    throw new Error(typeof data?.error === 'string' ? data.error : '打开失败（HTTP ' + response.status + '）')
  }
}

/** 字节数可读化（卡片头部摘要用）。 */
export function formatBytes(n: number): string {
  if (!Number.isFinite(n) || n < 0) return '?'
  if (n < 1024) return n + ' B'
  if (n < 1048576) return (n / 1024).toFixed(1) + ' KB'
  return (n / 1048576).toFixed(1) + ' MB'
}

/** 时间戳短格式（今天只显示时分，其它显示月-日）。 */
export function formatWhen(ms: number): string {
  const date = new Date(ms)
  const now = new Date()
  const sameDay = date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth() && date.getDate() === now.getDate()
  const pad = (n: number): string => (n < 10 ? '0' + n : String(n))
  if (sameDay) return pad(date.getHours()) + ':' + pad(date.getMinutes())
  return (date.getMonth() + 1) + '-' + pad(date.getDate())
}
