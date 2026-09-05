/**
 * dsh-chat-flow — 本地 HTML 路径抽取（client 入口）。
 *
 * 实现已上移到 src/shared/html-paths.ts（host 截图管线要用同一套规则，
 * 否则「对话里能预览、截图里认不出」就会两边漂移）。这里只做转发，
 * 保持既有 import 路径不变。
 *
 * 规则速记：行内代码 / markdown 链接目标 / 裸路径（盘符 · UNC · ~ · 绝对 ·
 * 相对）/ 裸文件名四类来源；先摘围栏代码块与 scheme:// URL；强候选带左边界
 * 且斜杠后不紧跟点；带分隔符必须有合法前缀；点号开头文件名不放行；强候选
 * 摘完再跑弱候选，句末标点与包裹引号清干净；按出现顺序最多 4 条。
 */
export { findLocalHtmlPaths } from '../../shared/html-paths.ts'
export type { HtmlPathHit } from '../../shared/html-paths.ts'
