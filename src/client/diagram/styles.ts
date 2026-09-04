/** diagram 流程图卡片容器样式（命名空间 dtt-diagram，幂等注入）。 */

const CSS = [
'/* 容器：总结卡正文内的图纸卡，SVG 随宽自适应 */',
'.dtt-diagram {',
'  margin: 12px 0 4px;',
'  border: 1px solid var(--dsw-alias-border-l2, rgba(127,127,127,.22));',
'  border-radius: 12px;',
'  padding: 16px 12px 8px;',
'  background: var(--dsw-alias-bg-layer-1, rgba(127,127,127,.04));',
'  animation: dtt-proto-rise .45s cubic-bezier(.2,.8,.25,1) both;',
'}',
'.dtt-diagram svg { display: block; width: 100%; height: auto; }',
'.dtt-diagram--compact { padding: 10px 8px 4px; }',
'@media (prefers-reduced-motion: reduce) { .dtt-diagram { animation: none; } }',
].join('\n')

export function injectDiagramStyles(): void {
  if (typeof document === 'undefined') return
  if (document.getElementById('dsh-think-tools-diagram-styles') !== null) return
  const style = document.createElement('style')
  style.id = 'dsh-think-tools-diagram-styles'
  style.textContent = CSS
  document.head.appendChild(style)
}
