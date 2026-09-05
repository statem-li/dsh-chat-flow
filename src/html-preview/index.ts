/**
 * dsh-chat-flow — 本地 HTML 预览（host 半身）。
 *
 * 让对话里出现的本地 .html/.htm 路径（行内代码或裸路径）能在总结卡里
 * 直接内嵌渲染。四个接口，全在 /api/chat-flow/html 前缀下：
 *
 *   GET  /meta?path=&cwd=    → { ok, abs, name, dir, size, mtimeMs } 存在性/大小探测
 *   GET  /view?path=&cwd=&h= → 直接回 HTML 正文（注入 base + 高度回报脚本）
 *   GET  /raw/<token>/<rel>  → 同目录兄弟资源（css/js/img/font/嵌套页面）
 *   POST /open {path,cwd}    → 交系统默认程序（浏览器）打开
 *
 * 为什么走 /view + /raw 而不是 srcDoc：srcDoc 没有 base URL，页面里的
 * <link rel="stylesheet" href="x.css"> 全部解析不出来，真实工程里的 HTML
 * 十有八九带同目录资源，那样预览是坏的。/view 注入
 * <base href="/api/chat-flow/html/raw/<token>/">，相对路径就都落到 /raw，
 * 由它按目录发兄弟文件。token = base64url(JSON [目录, 通道号])，嵌套页面
 * 从 /raw 拿到的 base 天然正确，且能继承同一个通道号继续回报高度。
 *
 * 安全边界（本地 dev 工具，取最小暴露）：
 *  - meta/view/open 只认 .html/.htm 扩展，/raw 只发静态资源白名单类型；
 *  - /raw 的目录来自 token 本身，rel 逐段解码后拒绝 .. / 绝对路径 / 越界；
 *  - 大小上限：HTML 4MB、兄弟资源 16MB；
 *  - HTML 响应带 CSP sandbox 头（allow-scripts 等，不给 allow-same-origin）
 *    → 文档落进不透明源，读不到 DSH 的 cookie / localStorage，即使被人当
 *    顶层页面直接打开也一样；iframe 侧再叠一层 sandbox 属性；
 *  - 错误一律 { ok:false, code, error }，不外泄堆栈。
 */

import { spawn } from 'node:child_process'
import { readFile, stat } from 'node:fs/promises'
import { homedir } from 'node:os'
import { dirname, extname, isAbsolute, join, resolve, sep } from 'node:path'
import type { IncomingMessage, ServerResponse } from 'node:http'

/** 路由前缀（与 host.ts 注册一致）。 */
const ROUTE = '/api/chat-flow/html'
/** 预览正文大小上限。 */
const MAX_HTML_BYTES = 4 * 1024 * 1024
/** 兄弟资源大小上限（图片/字体可能比正文大）。 */
const MAX_ASSET_BYTES = 16 * 1024 * 1024
/** 单个反斜杠字符（拼正则用，源码里少写转义）。 */
const BS = '\\'
/** /raw 的资源名非法字符（反斜杠 + Windows 非法字符 + 控制符）。 */
const BAD_NAME = new RegExp('[' + BS + BS + ':*?"<>|' + BS + 'u0000-' + BS + 'u001f]')

/** 允许预览/打开的扩展。 */
const HTML_EXT = new Set(['.html', '.htm'])

/**
 * /raw 只发这些类型：渲染一张页面用得上的（样式/脚本/图/字体）。
 * 刻意不含 txt / csv / json / map —— 预览一张 html 不该顺带把同目录的
 * 笔记和数据文件也变成可读的。
 */
const ASSET_TYPES: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.htm': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.ico': 'image/x-icon',
  '.bmp': 'image/bmp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
  '.wasm': 'application/wasm',
}

/** 预览文档的 CSP：不透明源 + 允许脚本/弹窗/表单，禁 same-origin。 */
const SANDBOX_CSP = 'sandbox allow-scripts allow-popups allow-forms allow-modals'

/** 统一 JSON 响应。 */
function json(res: ServerResponse, status: number, payload: unknown): void {
  res.writeHead(status, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' })
  res.end(JSON.stringify(payload))
}

/** 失败响应（带机器可读 code，客户端据此决定静默还是报错）。 */
function fail(res: ServerResponse, status: number, code: string, error: string): void {
  json(res, status, { ok: false, code, error })
}

/** 是否形如 D:/x 或 D:x（Windows 盘符开头）。 */
function drivePrefixed(p: string): boolean {
  return p.length > 2 && /[A-Za-z]/.test(p[0] ?? '') && (p[1] ?? '') === ':'
}

/**
 * 把消息里抽出来的路径解析成绝对路径。
 * 支持 file:// URL、~ 用户目录、相对会话 cwd。
 */
function resolveTarget(raw: string, cwd: string | undefined): string | null {
  let p = raw.trim()
  if (p === '') return null
  if (/^file:/i.test(p)) {
    try {
      const parsed = new URL(p)
      p = decodeURIComponent(parsed.pathname)
      // file:///D:/x.html 的 pathname 是 /D:/x.html，去掉盘符前多出的斜杠。
      if ((p[0] ?? '') === '/' && drivePrefixed(p.slice(1))) p = p.slice(1)
    } catch {
      return null
    }
  }
  if (p === '' || /[*?]/.test(p)) return null
  if (p === '~' || p.startsWith('~/') || p.startsWith('~' + BS)) {
    p = join(homedir(), p.slice(1).replace(new RegExp('^[' + BS + '/]+'), ''))
  }
  if (isAbsolute(p)) return resolve(p)
  const base = cwd !== undefined && cwd !== '' ? cwd : process.cwd()
  return resolve(base, p)
}

/** 读文本 + 嗅探 charset（前 4KB 的 meta/xml 声明）：GBK 等中文页面常见。 */
async function readText(abs: string): Promise<{ text: string; charset: string }> {
  const buf = await readFile(abs)
  const head = buf.subarray(0, 4096).toString('latin1')
  const declared = /charset\s*=\s*["']?\s*([\w-]+)/i.exec(head)?.[1] ?? ''
  const label = declared.toLowerCase().replace(/_/g, '-')
  if (label !== '' && label !== 'utf-8' && label !== 'utf8' && label !== 'us-ascii') {
    try {
      return { text: new TextDecoder(label).decode(buf), charset: label }
    } catch {
      /* 未知标签退回 utf-8 */
    }
  }
  return { text: buf.toString('utf8'), charset: label === '' ? 'utf-8' : label }
}

/** stat + 扩展 + 大小三重校验；失败时已写好响应并返回 null。 */
async function guardHtml(abs: string, res: ServerResponse): Promise<{ size: number; mtimeMs: number } | null> {
  if (!HTML_EXT.has(extname(abs).toLowerCase())) {
    fail(res, 415, 'not-html', '只支持 .html / .htm 预览')
    return null
  }
  let info
  try {
    info = await stat(abs)
  } catch {
    fail(res, 404, 'not-found', '文件不存在')
    return null
  }
  if (!info.isFile()) {
    fail(res, 400, 'not-file', '目标不是文件')
    return null
  }
  if (info.size > MAX_HTML_BYTES) {
    fail(res, 413, 'too-large', '文件 ' + (info.size / 1048576).toFixed(1) + 'MB 超过 ' + (MAX_HTML_BYTES / 1048576) + 'MB 预览上限')
    return null
  }
  return { size: info.size, mtimeMs: Math.round(info.mtimeMs) }
}

/** base64url 编解码（token 进 URL，不能带 + / =）。 */
function encodeToken(dir: string, channel: string): string {
  return Buffer.from(JSON.stringify([dir, channel]), 'utf8').toString('base64url')
}

function decodeToken(token: string): { dir: string; channel: string } | null {
  try {
    const parsed = JSON.parse(Buffer.from(token, 'base64url').toString('utf8')) as unknown
    if (!Array.isArray(parsed)) return null
    const [dir, channel] = parsed as [unknown, unknown]
    if (typeof dir !== 'string' || !isAbsolute(dir)) return null
    return { dir, channel: typeof channel === 'string' ? channel : '' }
  } catch {
    return null
  }
}

/** 高度回报脚本：把 scrollHeight 用 postMessage 发给父窗口（带通道号）。 */
function heightScript(channel: string): string {
  const safe = channel.replace(/[^\w-]/g, '').slice(0, 32)
  return '<script>(function(){var I="' + safe + '";'
    + 'function H(){var d=document.documentElement,b=document.body;'
    + 'return Math.max(d?d.scrollHeight:0,d?d.offsetHeight:0,b?b.scrollHeight:0,b?b.offsetHeight:0)}'
    + 'function p(){try{parent.postMessage({__dshHtmlPreview:1,id:I,height:H()},"*")}catch(e){}}'
    + 'var t=0;function s(){clearTimeout(t);t=setTimeout(p,80)}'
    + 'p();window.addEventListener("load",p);document.addEventListener("DOMContentLoaded",p);'
    + 'if(window.ResizeObserver&&document.body){try{new ResizeObserver(s).observe(document.body)}catch(e){}}'
    + 'var n=0;var iv=setInterval(function(){p();n+=1;if(n>900)clearInterval(iv)},2000);})();</' + 'script>'
}

/**
 * 给 HTML 注入 base（相对资源落到 /raw）与高度回报脚本。
 * base 必须在任何相对 URL 被解析之前出现，所以插在 head 起始处。
 * baseHref 为空串 = 不注入 base（嵌套页面 URL 天然正确）。
 */
function decorate(html: string, baseHref: string, channel: string): string {
  let out = html
  if (baseHref !== '') {
    const base = '<base href="' + baseHref.replace(/"/g, '%22') + '">'
    const head = /<head[^>]*>/i.exec(out)
    out = head !== null && head.index >= 0
      ? out.slice(0, head.index + head[0].length) + base + out.slice(head.index + head[0].length)
      : base + out
  }
  const script = heightScript(channel)
  const body = /<\/body\s*>/i.exec(out)
  out = body !== null && body.index >= 0
    ? out.slice(0, body.index) + script + out.slice(body.index)
    : out + script
  return out
}

/** GET /meta：探测（客户端据此决定渲染 / 静默 / 报错）。 */
async function handleMeta(abs: string, res: ServerResponse): Promise<void> {
  const info = await guardHtml(abs, res)
  if (info === null) return
  json(res, 200, {
    ok: true,
    abs,
    name: abs.split(/[\\/]+/).pop() ?? abs,
    dir: dirname(abs),
    size: info.size,
    mtimeMs: info.mtimeMs,
  })
}

/** GET /view：发预览正文（注入 base + 高度脚本，CSP sandbox）。 */
async function handleView(abs: string, channel: string, res: ServerResponse): Promise<void> {
  const info = await guardHtml(abs, res)
  if (info === null) return
  const { text } = await readText(abs)
  const baseHref = ROUTE + '/raw/' + encodeToken(dirname(abs), channel) + '/'
  const html = decorate(text, baseHref, channel)
  res.writeHead(200, {
    'content-type': 'text/html; charset=utf-8',
    'cache-control': 'no-store',
    'content-security-policy': SANDBOX_CSP,
  })
  res.end(html)
}

/** GET /raw/<token>/<rel>：发同目录兄弟资源（嵌套 HTML 也顺带注入脚本）。 */
async function handleRaw(tailPath: string, res: ServerResponse): Promise<void> {
  const withoutPrefix = tailPath.startsWith('/raw/') ? tailPath.slice(5) : tailPath
  const slash = withoutPrefix.indexOf('/')
  if (slash <= 0) {
    fail(res, 400, 'bad-token', '资源地址非法')
    return
  }
  const token = withoutPrefix.slice(0, slash)
  const relRaw = withoutPrefix.slice(slash + 1)
  const decoded = decodeToken(token)
  if (decoded === null) {
    fail(res, 403, 'bad-token', '资源地址非法')
    return
  }
  // 逐段解码后再拼：%2F 不会被当成目录分隔符；.. / 绝对路径 / 控制字符一律拒。
  const rel: string[] = []
  for (const segment of relRaw.split('/')) {
    if (segment === '' || segment === '.') continue
    let part = segment
    try {
      part = decodeURIComponent(segment)
    } catch {
      fail(res, 400, 'bad-path', '资源名非法')
      return
    }
    if (part === '..' || part === '.' || isAbsolute(part) || BAD_NAME.test(part)) {
      fail(res, 403, 'bad-path', '资源名非法')
      return
    }
    rel.push(part)
  }
  if (rel.length === 0) {
    fail(res, 404, 'not-found', '资源不存在')
    return
  }
  const target = resolve(join(decoded.dir, join(...rel)))
  if (target !== decoded.dir && !target.startsWith(decoded.dir + sep)) {
    fail(res, 403, 'forbidden', '越界访问')
    return
  }
  const type = ASSET_TYPES[extname(target).toLowerCase()]
  if (type === undefined) {
    fail(res, 403, 'forbidden', '该类型不提供')
    return
  }
  let info
  try {
    info = await stat(target)
  } catch {
    fail(res, 404, 'not-found', '资源不存在')
    return
  }
  if (!info.isFile() || info.size > MAX_ASSET_BYTES) {
    fail(res, 413, 'too-large', '资源过大')
    return
  }
  const headers = {
    'content-type': type,
    'cache-control': 'no-store',
    'content-security-policy': SANDBOX_CSP,
  }
  if (HTML_EXT.has(extname(target).toLowerCase())) {
    // 嵌套页面：补一份高度回报脚本（base 已由 URL 天然正确，不再注入）。
    const { text } = await readText(target)
    res.writeHead(200, headers)
    res.end(decorate(text, '', decoded.channel))
    return
  }
  res.writeHead(200, headers)
  res.end(await readFile(target))
}

/** POST /open：交系统默认程序（.html 即浏览器）。 */
async function handleOpen(abs: string, res: ServerResponse): Promise<void> {
  if (!HTML_EXT.has(extname(abs).toLowerCase())) {
    fail(res, 415, 'not-html', '只支持用浏览器打开 .html / .htm')
    return
  }
  try {
    const info = await stat(abs)
    if (!info.isFile()) {
      fail(res, 400, 'not-file', '目标不是文件')
      return
    }
  } catch {
    fail(res, 404, 'not-found', '文件不存在')
    return
  }
  const command = process.platform === 'win32' ? 'explorer.exe' : process.platform === 'darwin' ? 'open' : 'xdg-open'
  try {
    spawn(command, [abs], { detached: true, stdio: 'ignore' }).unref()
    json(res, 200, { ok: true, abs })
  } catch (error) {
    fail(res, 500, 'spawn-failed', error instanceof Error ? error.message : String(error))
  }
}

/** 读小 JSON 请求体。 */
function readBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolvePromise, rejectPromise) => {
    const chunks: Buffer[] = []
    let size = 0
    req.on('data', (chunk: Buffer) => {
      size += chunk.length
      if (size > 64 * 1024) {
        rejectPromise(new Error('body too large'))
        req.destroy()
        return
      }
      chunks.push(chunk)
    })
    req.on('end', () => resolvePromise(Buffer.concat(chunks).toString('utf8')))
    req.on('error', rejectPromise)
  })
}

/** POST /open 的异步体（错误在内部消化成 JSON）。 */
async function handleOpenBody(req: IncomingMessage, res: ServerResponse): Promise<void> {
  try {
    const raw = await readBody(req)
    const body = JSON.parse(raw === '' ? '{}' : raw) as Record<string, unknown>
    const path = typeof body.path === 'string' ? body.path : ''
    const cwd = typeof body.cwd === 'string' && body.cwd !== '' ? body.cwd : undefined
    const abs = resolveTarget(path, cwd)
    if (abs === null) {
      fail(res, 400, 'bad-path', '路径非法')
      return
    }
    await handleOpen(abs, res)
  } catch {
    fail(res, 500, 'internal', 'internal error')
  }
}

/**
 * 挂载本地 HTML 预览路由（在已注入 webServer 的子上下文中调用）。
 * @param webCtx - webServer 服务已就绪的插件上下文。
 */
export function applyHtmlPreviewRoutes(webCtx: Record<string, any>): void {
  webCtx.effect(() => webCtx.webServer.register({
    kind: 'prefix',
    path: ROUTE,
    handler: (req: IncomingMessage, res: ServerResponse): void => {
      try {
        const url = new URL(req.url ?? '/', 'http://x')
        const tail = url.pathname.slice(ROUTE.length)
        if (req.method === 'GET' && tail === '/meta') {
          const abs = resolveTarget(url.searchParams.get('path') ?? '', url.searchParams.get('cwd') ?? undefined)
          if (abs === null) {
            fail(res, 400, 'bad-path', '路径非法')
            return
          }
          void handleMeta(abs, res)
          return
        }
        if (req.method === 'GET' && tail === '/view') {
          const abs = resolveTarget(url.searchParams.get('path') ?? '', url.searchParams.get('cwd') ?? undefined)
          if (abs === null) {
            fail(res, 400, 'bad-path', '路径非法')
            return
          }
          void handleView(abs, url.searchParams.get('h') ?? '', res)
          return
        }
        if (req.method === 'GET' && tail.startsWith('/raw/')) {
          void handleRaw(tail, res)
          return
        }
        if (req.method === 'POST' && tail === '/open') {
          void handleOpenBody(req, res)
          return
        }
        fail(res, 404, 'not-found', '未知的预览接口')
      } catch {
        fail(res, 500, 'internal', 'internal error')
      }
    },
  }), 'dsh-chat-flow: html preview routes')
}
