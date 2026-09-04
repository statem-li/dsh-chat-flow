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
'.dtt-diagram { position: relative; }',
'.dtt-diagram--large { overflow-x: auto; }',
'/* 用户要求：去底色（比例切换器是控件，保留）。 */',
'.dtt-diagram { background: transparent !important; }',
'.dtt-dg-scale { position: absolute; top: 8px; right: 8px; display: flex; gap: 2px; background: var(--dsw-alias-bg-layer-2, rgba(127,127,127,.12)); border-radius: 999px; padding: 2px; }',
'.dtt-dg-scale-btn { border: 0; background: transparent; font-size: 11px; line-height: 20px; min-width: 24px; padding: 0 6px; border-radius: 999px; cursor: pointer; color: inherit; opacity: .6; font-family: inherit; transition: all .2s ease; }',
'.dtt-dg-scale-btn:hover { opacity: 1; transform: translateY(-1px); }',
'.dtt-dg-scale-btn--active { background: var(--dsw-alias-bg-layer-1, #fff); opacity: 1; font-weight: 700; box-shadow: 0 1px 6px rgba(20,40,90,.18); }',
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
