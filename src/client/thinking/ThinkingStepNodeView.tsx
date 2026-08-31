/**
 * dsh-think-tools — 回合级思考 chip + 对话流卡片（assistant-step 槽位替换）。
 *
 * 移植自 dsh-webui 的 BETTER assistant 渲染（_tmp-webui/src/client/markdown/
 * renderer.tsx 的 ReasoningEntry + BetterAssistantNodeView），两点关键差异：
 *
 *  1. **正文链路保持官方**：text 块用官方 `MarkdownText`（ui-primitives）、
 *     image 块走官方 `renderMessageImages` 槽——不引入 markstream/shiki/katex，
 *     流式输出与官方渲染完全一致（「流式输出就没了」是本次移植的第一约束）。
 *  2. **卡片只在回合结束后出现**：回合仍在进行（含中间步骤已定型）时一律不包
 *     卡，流式正文直接平铺；turn.status === 'closed'（或中断）后，中间片段变
 *     轻量步骤卡、最终回复变总结卡（本轮完成徽章 + 用时/步骤/工具/思考统计）。
 *
 * 思考材料按「回合」聚合：第一个 assistant-step 渲染一枚 chip（思考中实时
 * 时长 + 实时文字滚动预览），点击打开共享活动抽屉看全文；同一回合其余步骤
 * 只渲染自己的正文。think 块一律不内联展示（避免长思考链拖拽滚动）。
 */
import { memo, useCallback, useEffect, useMemo, useRef } from 'react'
import type { ReactNode } from 'react'
import { Fragment } from 'react'
import { IconThinkOutline14, JsonBlock, MarkdownText } from '@deepseek-ai/dsh-client-ui-primitives'
import type { MarkdownFileMentions, MarkdownLabels } from '@deepseek-ai/dsh-client-ui-primitives'
import type {
  AssistantChatData, ChatNode, ChatNodeViewProps, ChatViewSlotProps, TurnTailOwnerProps,
} from '@deepseek-ai/dsh-client-ui-chat/client'
import type { AssistantBlock, RenderMessageImages } from '@deepseek-ai/dsh-client-ui-conversation/client'
// Type-only: activates the ui-chat SlotMap augmentation ('assistant-step' keyed
// Seat props) so ChatNodeViewProps resolves its owner / hooks / session share.
import type {} from '@deepseek-ai/dsh-client-ui-chat/client'
import type {} from '@deepseek-ai/dsh-client-ui-tool/client'
import { activityStore, type ActivityReasoningItem } from '../tool-summary/activity-drawer.tsx'
import { formatDuration } from '../tool-summary/tool-stats.ts'
import { useNow } from '../tool-summary/use-now.ts'
import { FlowCard, type ReplyCardMeta } from '../flow-card.tsx'

const EMPTY_STEPS: readonly ChatNode<'assistant-step'>[] = []

/** Localized copy adapters for Cordis-free Markdown primitives（官方同款）。 */
function markdownLabelsFrom(t: ChatViewSlotProps['t']): MarkdownLabels {
  return {
    code: { copyLabel: t('copy'), copiedLabel: t('copied') },
    footnotes: t('markdown.footnotes'),
  }
}

/** One reasoning entry inside the turn-level group. */
interface ReasoningItem {
  readonly text: string
  /** Whether its owning step is still streaming. */
  readonly running: boolean
}

/**
 * Turn-level reasoning ENTRY: instead of rendering reasoning inline (and
 * fighting the transcript scroll), one compact chip per turn opens the shared
 * activity drawer with the full reasoning material. While the turn is still
 * thinking the chip labels itself "思考中…".
 */
function ReasoningChip({ items, running, turn, thinkingStart, t }: {
  items: readonly ReasoningItem[]
  running: boolean
  turn: number
  thinkingStart?: number | undefined
  t: ChatViewSlotProps['t']
}) {
  const store = activityStore()
  useEffect(() => {
    store.setReasoning(turn, items)
  }, [store, turn, items])
  const now = useNow(running)
  const elapsed = thinkingStart !== undefined ? Math.max(0, now - thinkingStart) : undefined
  // 当前正在输出的思考文字（最后一个仍 running 的 reasoning 文本）。
  const liveText = useMemo(() => {
    if (!running) return ''
    for (let index = items.length - 1; index >= 0; index -= 1) {
      const item = items[index]
      if (item !== undefined && item.running) return item.text
    }
    return ''
  }, [items, running])
  // 跟随最新：思考文字增长时把预览框滚到底——但仅当读者停在底部。
  // 向上翻阅即停止自动跟随（想看哪里自己滚），滚回底部（≤24px）自动恢复；
  // 阈值与 ChatView 的 FOLLOW_THRESHOLD 一致。
  const liveRef = useRef<HTMLDivElement | null>(null)
  const livePinnedRef = useRef(true)
  const onLiveScroll = useCallback((event: React.UIEvent<HTMLDivElement>): void => {
    const el = event.currentTarget
    livePinnedRef.current = el.scrollHeight - el.scrollTop - el.clientHeight <= 24
  }, [])
  useEffect(() => {
    if (!running) return
    const el = liveRef.current
    if (el === null) return
    const distance = el.scrollHeight - el.scrollTop - el.clientHeight
    // 双保险：滚动事件尚未派发的一帧内，几何距离也能拦住一次误跟随。
    if (!livePinnedRef.current && distance > 24) return
    el.scrollTop = el.scrollHeight
  }, [liveText, running])

  return (
    <div className="dtt__reasoning" data-running={running || undefined}>
      <span className="dtt__visually-hidden">{t('row.running')}</span>
      <button
        type="button"
        className="dtt__reasoning-btn"
        title="点击打开本轮思考详情"
        aria-label={`本轮思考 ${items.length} 次，点击查看`}
        onClick={() => { store.open(turn, 'reasoning') }}
      >
        <span className="dtt__reasoning-icon" aria-hidden><IconThinkOutline14 size={14} /></span>
        <span>
          {running
            ? elapsed !== undefined ? `思考中 · ${formatDuration(elapsed)}` : '思考中…'
            : `思考 ×${items.length}`}
        </span>
      </button>
      {running && liveText !== '' && (
        <div className="dtt__reasoning-live" ref={liveRef} onScroll={onLiveScroll} aria-live="polite">
          {liveText}
        </div>
      )}
    </div>
  )
}

type AssistantBlockLike = AssistantBlock

/** 助手正文：text 走官方 MarkdownText、image 走官方槽、未知块 JsonBlock。 */
function AssistantBody({ blocks, streaming, interrupted, renderMessageImages, mentions, labels, t }: {
  blocks: readonly AssistantBlockLike[]
  streaming: boolean
  interrupted?: boolean | undefined
  renderMessageImages: RenderMessageImages
  mentions?: MarkdownFileMentions | undefined
  labels: MarkdownLabels
  t: ChatViewSlotProps['t']
}): { hasVisible: boolean; rendered: ReactNode[] } {
  const hasVisible = streaming
    || interrupted === true
    || blocks.some(block => block.kind !== 'tool-call')
  const rendered: ReactNode[] = []
  if (!hasVisible) return { hasVisible, rendered }
  for (let index = 0; index < blocks.length; index += 1) {
    const block = blocks[index]
    if (block === undefined) continue
    switch (block.kind) {
      case 'text':
        rendered.push(
          <MarkdownText key={index} text={block.text} streaming={streaming} labels={labels} fileMentions={mentions} />,
        )
        break
      case 'reasoning':
        // 回合级聚合进 chip；此处不渲染任何内联思考。
        break
      case 'image': {
        const start = index
        const group = [block]
        while (index + 1 < blocks.length) {
          const next = blocks[index + 1]
          if (next === undefined || next.kind !== 'image') break
          group.push(next)
          index += 1
        }
        rendered.push(
          <Fragment key={start}>
            {renderMessageImages({
              images: group.map(({ attachment }) => ({ attachment })),
              align: 'start',
            })}
          </Fragment>,
        )
        break
      }
      // 聚合进工具 chip（tool-call 槽位）；此处跳过。
      case 'tool-call':
        break
      default:
        rendered.push(
          <JsonBlock
            key={index}
            label={t('message.unknownBlock')}
            payload={block.block}
            truncatedLabel={total => t('json.truncated', { total })}
          />,
        )
    }
  }
  return { hasVisible, rendered }
}

/**
 * Turn-level reasoning chip + 卡片门控：第一个 assistant-step 渲染 chip
 * （思考材料进共享活动抽屉）；片段正文按「回合是否结束」决定包卡形态。
 */
export const ThinkingStepNodeView = memo(function ThinkingStepNodeView(
  props: ChatNodeViewProps<'assistant-step'>,
) {
  const { node, useTurnData, useChat, openFile, renderMessageImages, fileMentions, t } = props
  const data = node.data
  const locationTurn = node.location.kind === 'turn' || node.location.kind === 'step'
    ? node.location.turn
    : undefined
  const tail = useTurnData('turn-tail')
  const owner = useMemo<TurnTailOwnerProps | undefined>(() => {
    if (locationTurn?.status !== 'closed' || data.finalNode === undefined) return undefined
    if (tail?.closing?.finalNode.seq !== data.finalNode.seq) return undefined
    return { turn: locationTurn, seq: data.finalNode.seq, openFile }
  }, [data.finalNode, openFile, tail, locationTurn])
  const mentions = useMemo(
    () => owner === undefined ? undefined : fileMentions(owner),
    [fileMentions, owner],
  )

  // Aggregate reasoning across every assistant step of this turn.
  const turnNumber = locationTurn?.turn
  const steps = useChat(snapshot => {
    if (turnNumber === undefined) return EMPTY_STEPS
    return snapshot.locations.getTurn(turnNumber)
      .map(key => snapshot.nodes.get(key))
      .filter((candidate): candidate is ChatNode<'assistant-step'> => (
        candidate !== undefined && candidate.kind === 'assistant-step'
      ))
  })
  const reasoningItems = useMemo<readonly ReasoningItem[]>(() => steps.flatMap(step => {
    const stepRunning = step.data.status === 'running'
    return step.data.blocks
      .filter((block): block is Extract<AssistantBlockLike, { kind: 'reasoning' }> => block.kind === 'reasoning')
      .map(block => ({ text: block.text, running: stepRunning }))
  }), [steps])
  const isFirstStep = steps.length > 0 && node.key === steps[0]?.key
  const turnRunning = steps.some(step => step.data.status === 'running')
  // "当前思考"的起点：取仍在流式输出的那个 step 的首个可见内容时间
  // （data.time），而不是整轮的 turn 开始时间，这样计时才是这段思考的时长。
  const thinkingStart = useMemo(() => {
    const runningStep = steps.find(step => step.data.status === 'running')
    return runningStep?.data.time
  }, [steps])

  const visibleBlocks = useMemo(
    () => data.blocks.filter(block => block.kind !== 'reasoning'),
    [data.blocks],
  )
  const chip = isFirstStep && reasoningItems.length > 0
    ? <ReasoningChip
        items={reasoningItems}
        running={turnRunning}
        turn={turnNumber as number}
        thinkingStart={thinkingStart}
        t={t}
      />
    : undefined

  // 本轮工具调用次数与耗时：复用已有的会话投影（无新增订阅）。
  const toolCount = useChat((snapshot) => {
    if (turnNumber === undefined) return 0
    let count = 0
    for (const key of snapshot.locations.getTurn(turnNumber)) {
      if (snapshot.nodes.get(key)?.kind === 'tool-call') count += 1
    }
    return count
  })
  const timing = useChat((snapshot) => {
    if (turnNumber === undefined) return undefined
    return snapshot.legacy.turnTimings.get(turnNumber)
  })
  const streaming = data.status === 'running'
  const interrupted = data.status === 'interrupted'
  // 卡片只在「回合已结束」时出现（含中断）：流式期不包卡，保住流式输出；
  // 中间步骤要等整轮收口才变轻量步骤卡，最终回复变总结卡。
  const turnClosed = locationTurn?.status === 'closed'
  const showCard = turnClosed === true || interrupted
  const isClosingReply = owner !== undefined
  const isSummary = isClosingReply || interrupted
  const variant: 'reply' | 'step' | undefined = !showCard
    ? undefined
    : isSummary ? 'reply' : 'step'
  const cardMeta = useMemo<ReplyCardMeta | undefined>(() => {
    if (!showCard) return undefined
    const start = timing?.startTime
    const end = timing?.endTime
    return {
      durationMs: start !== undefined && end !== undefined ? Math.max(0, end - start) : undefined,
      steps: steps.length,
      tools: toolCount,
      thinking: reasoningItems.length,
    }
  }, [showCard, reasoningItems.length, steps.length, timing, toolCount])
  const labels = useMemo(() => markdownLabelsFrom(t), [t])

  const { hasVisible, rendered } = AssistantBody({
    blocks: visibleBlocks,
    streaming,
    interrupted,
    renderMessageImages,
    mentions,
    labels,
    t,
  })
  if (!hasVisible && chip === undefined) return null

  return (
    <div className="dtt__assistant" data-streaming={streaming || undefined}>
      <div className="dtt__assistant-body">
        {chip}
        {rendered.length > 0 && (variant !== undefined
          ? <FlowCard variant={variant} meta={cardMeta} interrupted={interrupted}>{rendered}</FlowCard>
          : <>{rendered}</>)}
        {interrupted && <span className="dtt__stopped">{t('message.stopped')}</span>}
      </div>
    </div>
  )
})
