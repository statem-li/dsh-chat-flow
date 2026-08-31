/**
 * dsh-think-tools — client 半身入口（思考 chip + 工具调用聚合 + 对话流卡片）。
 *
 * 自 dsh-webui 的 dsh-better-markdown（思考 chip 部分）+ dsh-tool-summary
 * 拆分为独立插件，三点行为差异见 thinking/ThinkingStepNodeView.tsx 头注释：
 *  1. 正文链路保持官方（MarkdownText / renderMessageImages），不引入 markstream；
 *  2. 对话流卡片只在回合结束后出现（流式期不包卡，保住流式输出）；
 *  3. 思考与工具共用同一个活动抽屉（window 级总线，键名与 webui 相同，
 *     与 webui 并存时按 last-write-wins 共享同一抽屉）。
 */
import type { Context as ClientContext } from '@deepseek-ai/dsh-client-runtime/client'
// Type-only: 拉入 ui-chat / ui-tool 的 SlotMap 合并声明（assistant-step /
// tool-call 两个 keyed 槽位的类型契约）+ ui-slots 的 slots 服务声明 +
// dsh-client-locale 的 common 词汇合并（t 的共享键域，markdown 标签用）。
import type {} from '@deepseek-ai/dsh-client-ui-slots'
import type {} from '@deepseek-ai/dsh-client-ui-renderer/client'
import type {} from '@deepseek-ai/dsh-client-ui-chat/client'
import type {} from '@deepseek-ai/dsh-client-ui-tool/client'
import type {} from '@deepseek-ai/dsh-client-locale/client'
import { injectStyles as injectToolSummaryStyles } from './tool-summary/styles.ts'
import { injectStyles as injectBaseStyles } from './styles.ts'
import { mountActivityDrawer } from './tool-summary/activity-drawer.tsx'
import { ToolGroupNodeView } from './tool-summary/ToolGroupNodeView.tsx'
import { ThinkingStepNodeView } from './thinking/ThinkingStepNodeView.tsx'

/** 顶层服务依赖（client boot graph 用）。 */
export const inject = ['slots']

/** 单个模块失败不拖垮插件整体。 */
function guarded(ctx: ClientContext, label: string, mount: () => void): void {
  try {
    mount()
  } catch (error) {
    console.warn(`[dsh-think-tools] ${label} 挂载失败：${error instanceof Error ? error.message : String(error)}`)
  }
}

export function apply(ctx: ClientContext): void {
  // 样式：工具聚合（dts__）与思考/流卡（dtt__）两枚独立 <style>，幂等注入。
  guarded(ctx, 'tool-summary styles', injectToolSummaryStyles)
  guarded(ctx, 'think-tools styles', injectBaseStyles)
  // 共享活动抽屉：思考与工具调用的详情面板（body 级宿主，只挂一次）。
  guarded(ctx, 'activity drawer', mountActivityDrawer)

  // 工具调用聚合：替换内置 tool-call 渲染器，每回合一枚 chip + 抽屉。
  guarded(ctx, 'tool-call seat', () => {
    ctx.slots.inject('conversation.chat.node', () => ctx.slots.register({
      name: 'conversation.chat.node',
      key: 'tool-call',
      priority: -100,
      locale: 'chat',
    }, ToolGroupNodeView))
  })

  // 思考 chip + 对话流卡片：替换内置 assistant-step 渲染器（正文仍用官方
  // MarkdownText，思考聚合进 chip，卡片回合结束后出现）。
  guarded(ctx, 'assistant-step seat', () => {
    ctx.slots.inject('conversation.chat.node', () => ctx.slots.register({
      name: 'conversation.chat.node',
      key: 'assistant-step',
      priority: -100,
      locale: 'chat',
    }, ThinkingStepNodeView))
  })
}
