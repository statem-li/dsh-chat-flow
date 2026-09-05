/**
 * dsh-chat-flow — 本地 HTML 路径抽取（shared：client 预览卡与 host 截图共用）。
 *
 * 从助手正文（markdown 源文本）里找出指向本地 .html/.htm 的路径。规则与
 * 降噪四条的来由见 src/client/html-preview/parse.ts 的转发注释与本文件内注释。
 * 零依赖纯函数：两侧都能直接 import，不引运行时包。
 */
/** 一条候选路径。 */
export interface HtmlPathHit {
  /** 原样路径（交给 host 解析，相对路径按会话 cwd）。 */
  readonly path: string
  /** 显式路径（盘符 / UNC / ~ / 绝对 / 带目录分隔符）；false = 裸文件名弱候选。 */
  readonly explicit: boolean
}

/** 一个反斜杠（拼 RegExp 源串用：字符串字面量里写 \\ 才是正则要的 \）。 */
const BS = '\\'
/** 单引号 / 双引号 / 反引号（字符类里要排除，但直接写进字面量会把字符串截断）。 */
const SQ = String.fromCharCode(39)
const DQ = String.fromCharCode(34)
const BT = String.fromCharCode(96)
/** 路径字符类：排除空白、引号、尖括号、竖线、反引号、括号、通配符。 */
const CH = '[^' + BS + 's' + SQ + DQ + '<>|' + BT + '()' + BS + '[' + BS + ']*?]'
/** 扩展名源串。 */
const EXT_SRC = BS + '.(?:html|htm)'
/** 尾随守卫：扩展名后面不能再跟词字符或点（report.html.bak 不算）。 */
const TAIL = '(?![' + BS + 'w.])'
/** 左边界守卫：前面不能是词字符或点。 */
const HEAD = '(?<![' + BS + 'w.])'

/** 扩展名判定（.html / .htm，大小写不限，行尾）。 */
const EXT = /\.(?:html|htm)$/i
/** 带 scheme 的 URL：除 file 外都不是本地文件。 */
const URLISH = /\b[a-z][\w+.-]*:\/\/\S+/gi
/** file:// URL：先转成本地路径。 */
const FILE_URL = /file:\/\/\S+/gi
/** 围栏代码块：整段摘掉，示例里的路径不预览。 */
const FENCE = /(?:^|\n)(```|~~~)[\S\S]*?\1(?:\n|$)/g
/** 行内代码。 */
const INLINE = /`([^`\n]+)`/g
/** markdown 链接/图片的目标。 */
const LINK = /\[[^\]]*\](\s*<?([^)\s>]+)>?\s*)/g
/** 强候选：盘符 / UNC / ~ 或 ./ ../ / 绝对。 */
const STRONG: readonly RegExp[] = [
  new RegExp(HEAD + '[A-Za-z]:' + CH + '*' + EXT_SRC + TAIL, 'gi'),
  new RegExp(HEAD + BS + BS + CH + '*' + EXT_SRC + TAIL, 'gi'),
  new RegExp('(?<![' + BS + 'w~' + BS + '/.])' + '(?:' + BS + '.{1,2}|~)?' + BS + '/(?!' + BS + '.)' + CH + '*' + EXT_SRC + TAIL, 'gi'),
]
/** 弱候选：不带分隔符的裸文件名（允许中文，不含空格，宁缺毋滥）。 */
const WEAK = /(?:^|\s)([\w\u4e00-\u9fff\d._@+-]{1,80}?\.(?:html|htm))(?![\w.])/gi
/** 路径里不允许出现的字符（glob 占位、控制符）。 */
const BAD = /[*?\u0000-\u001f]/
/** 合法前缀：盘符 / UNC / ~ / ./ ../ / 绝对。 */
const PREFIX = /^(?:[A-Za-z]:[\\/]|\\\\|~[\\/]|\.{1,2}[\\/]|\/)/

/** 清掉包裹符与句末标点（中英文都算）。 */
function tidy(input: string): string {
  let p = input.trim()
  p = p.replace(/^[<("'\[]+/, '')
  p = p.replace(/[">)\]，,.;:!?、。；：！？]+$/, '')
  return p.trim()
}

/**
 * 形状校验：不带分隔符的裸文件名放行；带分隔符的必须有合法前缀；点号开头的
 * 文件名（/.htm、.hidden.html 这类）一律不放行——正文里「/x.htm」这种写法常常
 * 只是句子的一部分，不是路径。
 */
function looksLikePath(p: string): boolean {
  const name = p.slice(Math.max(p.lastIndexOf('/'), p.lastIndexOf(BS)) + 1)
  if (name.startsWith('.')) return false
  return p.includes('/') === false && p.includes(BS) === false || PREFIX.test(p)
}

/** 是否显式路径（决定找不到时静默还是报错）。 */
function isExplicit(p: string): boolean {
  return PREFIX.test(p) || p.includes(BS)
}

/** file:///D:/a.html → D:/a.html；file:///mnt/x/a.htm → /mnt/x/a.htm。 */
function fromFileUrl(url: string): string | null {
  try {
    const parsed = new URL(url)
    let p = decodeURIComponent(parsed.pathname)
    if (p.charCodeAt(0) === 47 && p.charCodeAt(2) === 58) p = p.slice(1)
    return p
  } catch {
    return null
  }
}

/**
 * 从一段 markdown 源文本里抽出本地 HTML 路径（按出现顺序，最多 4 条）。
 * @param text - 助手正文（未渲染的 markdown）。
 */
export function findLocalHtmlPaths(text: string): HtmlPathHit[] {
  if (!/\.html?/i.test(text)) return []
  const hits: HtmlPathHit[] = []
  const keys: string[] = []
  const add = (rawPath: string, forced?: boolean): void => {
    const p = tidy(rawPath)
    if (p === '' || !EXT.test(p) || BAD.test(p) || !looksLikePath(p)) return
    const key = p.toLowerCase().replace(/[\\\/]/g, '/')
    if (keys.includes(key)) return
    const explicit = forced ?? isExplicit(p)
    // 弱候选若只是某条已收路径的尾巴就丢掉：D:\a\b.html 不再额外收 b.html。
    if (!explicit && keys.some(seenKey => seenKey.endsWith('/' + key))) return
    keys.push(key)
    hits.push({ path: p, explicit })
  }

  let body = text
  // 1) file:// URL 转本地路径；连同其它 scheme:// URL 一起摘掉。
  for (const m of body.matchAll(FILE_URL)) {
    const converted = fromFileUrl(m[0])
    if (converted !== null) add(converted, true)
  }
  body = body.replace(URLISH, ' ')
  // 2) 围栏代码块整段摘掉。
  body = body.replace(FENCE, ' ')
  // 3) 行内代码 + 链接目标。
  for (const m of body.matchAll(INLINE)) add(m[1] ?? '')
  for (const m of body.matchAll(LINK)) add(m[2] ?? '')
  // 4) 裸强候选（命中即抹掉，避免弱候选重复命中尾巴）。
  for (const pattern of STRONG) {
    for (const m of body.matchAll(pattern)) add(m[0])
    body = body.replace(pattern, ' ')
  }
  // 5) 裸文件名弱候选。
  for (const m of body.matchAll(WEAK)) add(m[1] ?? '')

  return hits.slice(0, 4)
}
