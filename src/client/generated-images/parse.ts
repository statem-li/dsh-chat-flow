/**
 * dsh-think-tools — 生图结果文本解析（纯函数）。
 *
 * generate_image 工具（dsh-provider-hub 的 model-capabilities）把结果以
 * `JSON.stringify(value, null, 2)` 写进 tool-call 节点的 content 文本块，
 * 形状为 `{ ok, model, endpoint, data: { data: [{ b64_json | url }] } }`
 * （OpenAI 兼容 images/generations 原始响应）；旧 vision-helper 通道另返回
 * `{ ok, imageUrls, imageUrl, imageDataUrl }`。这里兼容两种，产出统一的
 * 画廊条目列表（b64_json → data URL 交给 <img> 直接渲染，绕开 DSH
 * markdown 只放行 http(s) 的图片策略）。
 */

export interface GeneratedImageEntry {
  readonly url: string
  readonly model: string | null
}

/** 候选图片：OpenAI data[].b64_json / url 字段。 */
interface RawCandidate {
  readonly b64_json?: unknown
  readonly url?: unknown
}

function pushUnique(list: GeneratedImageEntry[], url: string, model: string | null): void {
  if (url === '') return
  if (!list.some(entry => entry.url === url)) list.push({ url, model })
}

/** 从 OpenAI 兼容响应体里提取图片 URL（b64_json 转 data URL 优先，其次 url）。 */
function collectFromData(data: unknown, model: string | null, list: GeneratedImageEntry[]): void {
  if (!Array.isArray(data)) return
  for (const item of data) {
    if (typeof item !== 'object' || item === null) continue
    const record = item as RawCandidate
    if (typeof record.b64_json === 'string' && record.b64_json !== '') {
      const b64 = record.b64_json.replace(/\s+/g, '')
      pushUnique(list, `data:image/png;base64,${b64}`, model)
    } else if (typeof record.url === 'string' && record.url !== '') {
      pushUnique(list, record.url, model)
    }
  }
}

/**
 * 解析一个 generate_image 工具结果文本，返回画廊条目（已去重）。
 * 解析失败 / 无图片时返回空数组（绝不抛错）。
 */
export function parseGeneratedImageText(text: string): readonly GeneratedImageEntry[] {
  const list: GeneratedImageEntry[] = []
  if (typeof text !== 'string' || text.trim() === '') return list
  let parsed: unknown
  try {
    parsed = JSON.parse(text)
  } catch {
    return list
  }
  if (typeof parsed !== 'object' || parsed === null) return list
  const record = parsed as Record<string, unknown>
  if (record.ok !== true) return list
  const model = typeof record.model === 'string' && record.model !== '' ? record.model : null

  // 主通道：data.data[]（sensenova 等 OpenAI 兼容网关）。
  const data = record.data as Record<string, unknown> | undefined
  if (typeof data === 'object' && data !== null) {
    collectFromData(data.data, model, list)
  }
  // 旧 vision-helper 通道：imageUrls / imageUrl / imageDataUrl。
  if (Array.isArray(record.imageUrls)) {
    for (const item of record.imageUrls) {
      if (typeof item === 'string' && item !== '') pushUnique(list, item, model)
    }
  }
  for (const key of ['imageUrl', 'imageDataUrl'] as const) {
    const value = record[key]
    if (typeof value === 'string' && value !== '') pushUnique(list, value, model)
  }
  return list
}

/** Spill locator 正则：完整结果存储路径（preview 通知行的一部分）。 */
const SPILL_LOCATOR_RE = /Full formatted result stored at: ([^\s]+?)\.\s+Use read with offset\/limit/i

/**
 * 从工具结果文本中提取 spill 定位路径（DSH spill-policy 把超大纯文本结果
 * 替换成「preview + locator」，完整 JSON 落在该文件里）。没有则返回 undefined。
 */
export function findSpillLocator(text: string): string | undefined {
  if (typeof text !== 'string') return undefined
  const match = SPILL_LOCATOR_RE.exec(text)
  const locator = match?.[1]
  return locator !== undefined && locator !== '' ? locator : undefined
}
