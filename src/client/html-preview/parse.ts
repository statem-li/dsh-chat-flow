/**
 * dsh-chat-flow — 本地 HTML 路径抽取（client）。
 *
 * 从助手正文（markdown 源文本）里找出指向本地 .html/.htm 的路径，交给
 * HtmlPreviewCard 内嵌预览。四类来源：
 *  1. 行内代码：反引号包起来的 D:\\out\\report.html；
 *  2. markdown 链接目标：[看板](./dist/index.html)、[x](file:///D:/a.htm)；
 *  3. 裸路径：盘符 / UNC / ~ / 绝对 / 带分隔符的相对路径；
 *  4. 裸文件名：报告.html（弱候选，按会话 cwd 解析）。
 *
 * 降噪三条：先摘掉围栏代码块与任何 scheme:// URL（http 链接不是本地文件）；
 * 强候选摘完再跑弱候选（避免 D:\a\b.html 额外命中尾巴 b.html）；
 * 句末标点与包裹引号/括号清干净。
 */

/** 一条候选路径。 */
export interface HtmlPathHit {
  /** 原样路径（交给 host 解析，相对路径按会话 cwd）。 */
  readonly path: string
  /** 显式路径（盘符 / UNC / ~ / 绝对 / 带目录分隔符）；false = 裸文件名弱候选。 */
  readonly explicit: boolean
}

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
/** 强候选：盘符 / UNC / ~ 或 ./ ../ 或绝对路径（尾巴不能再跟词字符或点）。 */
const STRONG: readonly RegExp[] = [
  /[A-Za-z]:[^\s'"<>|`()\[\]*?]*?\.(?:html|htm)(?![\w.])/gi,
  /(?:\\\\)[^\s'"<>|`()\[\]*?]*?\.(?:html|htm)(?![\w.])/gi,
  /(?:\.{1,2}|~)?\/[^\s'"<>|`()\[\]*?]*?\.(?:html|htm)(?![\w.])/gi,
]
/** 弱候选：不带分隔符的裸文件名（允许中文，不含空格，宁缺毋滥）。 */
const WEAK = /(?:^|\s)([\w\u4e00-\u9fff\d._@+-]{1,80}?\.(?:html|htm))(?![\w.])/gi
/** 路径里不允许出现的字符（glob 占位、控制符）。 */
const BAD = /[*?\u0000-\u001f]/

/** 清掉包裹符与句末标点（中英文都算）。 */
function tidy(input: string): string {
  let p = input.trim()
  p = p.replace(/^[<("'\[]+/, '')
  p = p.replace(/[">)\]，,.;:!?、。；：！？]+$/, '')
  return p.trim()
}

/** 是否显式路径（决定 404 时静默还是报错）。 */
function isExplicit(p: string): boolean {
  return /^[A-Za-z]:[\/]/.test(p) || /^\\/.test(p) || /^~[\/]/.test(p) || p.includes('/') || p.includes('\\')
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
    if (p === '' || !EXT.test(p) || BAD.test(p)) return
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
