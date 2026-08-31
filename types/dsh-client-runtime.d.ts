/**
 * 类型垫片：`@deepseek-ai/dsh-client-runtime` 在当前 DSH 0.1.2 源码树中已不再
 * 以独立包存在（client 运行时类型并入 @deepseek-ai/dsh-client-* 各客户端包），
 * 但为了与 webui/done-pill 的既有 import 写法保持一致（全部是 type-only，
 * esbuild 会整句擦除，不影响产物），这里把它映射到真实存在的类型源。
 */

export type {
  AssistantBlock,
  AssistantMessageNode,
  RunningToolCall,
  ToolCallBlock,
  ToolResultNode,
  TurnLocation,
} from '@deepseek-ai/dsh-client-ui-conversation/client'

export type {
  AssistantChatData,
  ChatNode,
  ChatNodeKind,
  ChatNodeViewProps,
  ChatViewSlotProps,
  FinalAssistantChatData,
  TurnTailOwnerProps,
} from '@deepseek-ai/dsh-client-ui-chat/client'

export type { Context } from '@deepseek-ai/cordis'
