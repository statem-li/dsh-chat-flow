/**
 * dsh-think-tools — 对话截图：会话消息抽取（client 端，自 dsh-webui 移植）。
 *
 * 从 ChatSnapshot（ui-chat 的 useChat 快照，DSH 0.1.2 形状）里按范围取出
 * 可截图的文本：
 *  - reply：当前这条 AI 回复；
 *  - turn：这条回复所在的一轮（我的提问 + AI 回复，含同轮内多步回复）；
 *  - all：整段会话（按时间顺序的全部提问与回复）。
 *
 * 只取文本块：reasoning（思考）、tool-call（工具调用）、图片附件不进截图——
 * 截图是给人看的成稿，不是调试轨迹。
 *
 * 与 webui 0.1.1 版 collect 的区别：快照形状从 `snapshot.chat.*` 换成 0.1.2
 * 的扁平 `snapshot.nodes / snapshot.locations`，user 文本从
 * `node.data.content`（ContentBlock[]）取、assistant 文本从
 * `turn-tail.data.closing.blocks`（AssistantBlock[]）取。
 */
import type { ChatSnapshot } from '@deepseek-ai/dsh-client-ui-chat/client'

/** 截图范围。 */
export type ShotRange = 'reply' | 'turn' | 'all'

/** 一条待截图消息。 */
export interface ShotMessage {
  role: 'user' | 'assistant'
  text: string
}

/** turn-tail 节点的 data 里我们用到的部分（避免依赖内部实现细节）。 */
interface TailData {
  turn?: number
  closing?: {
    finalNode?: { messageId?: unknown }
    blocks?: readonly { kind?: string; text?: string }[]
  } | null
}

/** user 节点的 data 里我们用到的部分（ContentBlock[] 的最小投影）。 */
interface UserData {
  content?: readonly { type?: string; text?: string }[]
}

/** 拼接 assistant 文本块（丢弃思考/工具/图片块）。 */
function assistantText(data: TailData): string {
  const blocks = data.closing?.blocks ?? []
  return blocks
    .filter(block => block.kind === 'text' && typeof block.text === 'string')
    .map(block => block.text as string)
    .join('')
}

/** 拼接 user 文本块（ContentBlock 的判别键是 type；丢 image/tool 块）。 */
function userText(data: UserData): string {
  const content = data.content ?? []
  return content
    .filter(block => block.type === 'text' && typeof block.text === 'string')
    .map(block => block.text as string)
    .join('')
}

/** 把一个 chat 节点转成待截图消息（不可截图则返回 null）。 */
function toMessage(node: { kind: string; data: unknown } | undefined): ShotMessage | null {
  if (node === undefined) return null
  if (node.kind === 'user' || node.kind === 'steering') {
    const text = userText(node.data as UserData)
    return text.trim() === '' ? null : { role: 'user', text }
  }
  if (node.kind === 'turn-tail') {
    const text = assistantText(node.data as TailData)
    return text.trim() === '' ? null : { role: 'assistant', text }
  }
  return null
}

/** 找到承载指定 messageId 的 turn-tail 节点键与轮次（finalNode.messageId
 *  稳定 identity；interruption fallback 缺 messageId 时按序取最后一个可见回复）。 */
function locateTail(snapshot: ChatSnapshot, messageId: unknown): { key: string; turn: number } | null {
  let fallback: { key: string; turn: number } | null = null
  for (const key of snapshot.order) {
    const node = snapshot.nodes.get(key)
    if (node === undefined || node.kind !== 'turn-tail') continue
    const data = node.data as TailData
    const tail = { key, turn: typeof data.turn === 'number' ? data.turn : -1 }
    if (data.closing?.finalNode?.messageId === messageId) return tail
    if (data.closing?.finalNode !== undefined) fallback = tail
  }
  return fallback
}

/**
 * 按范围抽取待截图消息。
 * @param snapshot - 当前 Chat 快照（useChat 的订阅值）。
 * @param messageId - 触发截图的那条 AI 回复的 id。
 * @param range - 截图范围。
 * @returns 时间顺序的消息数组（空数组表示无可截内容）。
 */
export function collectMessages(
  snapshot: ChatSnapshot,
  messageId: unknown,
  range: ShotRange,
): ShotMessage[] {
  const located = locateTail(snapshot, messageId)
  if (range === 'reply') {
    if (located === null) return []
    const message = toMessage(snapshot.nodes.get(located.key))
    return message === null ? [] : [message]
  }
  if (range === 'turn') {
    if (located === null || located.turn < 0) return []
    const out: ShotMessage[] = []
    for (const key of snapshot.locations.getTurn(located.turn)) {
      const message = toMessage(snapshot.nodes.get(key))
      if (message !== null) out.push(message)
    }
    return out
  }
  const out: ShotMessage[] = []
  for (const key of snapshot.order) {
    const message = toMessage(snapshot.nodes.get(key))
    if (message !== null) out.push(message)
  }
  return out
}
