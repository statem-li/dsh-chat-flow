/**
 * dsh-chat-flow — 本地 HTML 预览卡片样式（class 前缀 dhp__，运行时注入 style）。
 *
 * 动效清单：卡片入场（上浮淡入）、iframe 首帧淡入、高度自适应带缓动、
 * 折叠收放 + 箭头旋转、按钮 hover 上浮/active 回弹、加载纱光扫过、
 * 刷新时图标转一圈。prefers-reduced-motion 全部降级为无动画。
 */

const CSS = `
/* 多个预览纵向堆叠（一条正文里提到好几个 html）。 */
.dhp__stack {
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 0;
}

/* ── 卡片外壳 ══════════════════════════════════════════════════════════ */
.dhp__card {
  position: relative;
  overflow: hidden;
  border: 1px solid var(--dsw-alias-border-l3, rgba(127,127,127,.18));
  border-radius: 12px;
  background: color-mix(in srgb, var(--dsw-alias-label-primary) 2%, transparent);
  animation: dhp-in .3s cubic-bezier(.2, .8, .2, 1) both;
  transition: border-color .2s ease, box-shadow .24s ease;
}

.dhp__card:hover {
  border-color: color-mix(in srgb, var(--dsw-alias-state-business-primary, #4176e6) 34%, transparent);
  box-shadow: 0 6px 22px rgba(0,0,0,.07);
}

@keyframes dhp-in {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: none; }
}

/* ── 头部行 ════════════════════════════════════════════════════════════ */
.dhp__head {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  padding: 7px 8px 7px 11px;
}

.dhp__icon {
  display: inline-flex;
  flex: none;
  color: var(--dsw-alias-label-tertiary);
  transition: color .2s ease, transform .24s cubic-bezier(.2,.8,.2,1);
}

.dhp__card:hover .dhp__icon { color: var(--dsw-alias-state-business-primary, #4176e6); transform: translateY(-1px); }

.dhp__name {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 13px;
  font-weight: 500;
  line-height: 20px;
  color: var(--dsw-alias-label-primary);
}

.dhp__tag {
  flex: none;
  padding: 0 6px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--dsw-alias-state-business-primary, #4176e6) 12%, transparent);
  color: var(--dsw-alias-state-business-primary, #4176e6);
  font-size: 11px;
  line-height: 18px;
}

.dhp__meta {
  flex: none;
  font-size: 11px;
  line-height: 18px;
  font-variant-numeric: tabular-nums;
  color: var(--dsw-alias-label-caption, var(--dsw-alias-label-tertiary));
}

.dhp__actions {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-left: auto;
}

/* ── 按钮 ══════════════════════════════════════════════════════════════ */
.dhp__btn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  height: 26px;
  padding: 0 9px;
  border: 1px solid transparent;
  border-radius: 8px;
  background: transparent;
  color: var(--dsw-alias-label-secondary, var(--dsw-alias-label-tertiary));
  font-size: 12px;
  line-height: 1;
  cursor: pointer;
  transition: transform .16s cubic-bezier(.2,.8,.2,1), box-shadow .18s ease,
    background-color .18s ease, color .18s ease, border-color .18s ease;
}

.dhp__btn:hover {
  transform: translateY(-1px);
  background: var(--dsw-alias-interactive-bg-hover, rgba(127,127,127,.10));
  color: var(--dsw-alias-label-primary);
}

.dhp__btn:active { transform: translateY(0) scale(.96); }

.dhp__btn--primary {
  border-color: color-mix(in srgb, var(--dsw-alias-state-business-primary, #4176e6) 34%, transparent);
  background: color-mix(in srgb, var(--dsw-alias-state-business-primary, #4176e6) 10%, transparent);
  color: var(--dsw-alias-state-business-primary, #4176e6);
}

.dhp__btn--primary:hover {
  color: var(--dsw-alias-state-business-primary, #4176e6);
  box-shadow: 0 4px 14px color-mix(in srgb, var(--dsw-alias-state-business-primary, #4176e6) 26%, transparent);
}

.dhp__btn--icon { width: 26px; padding: 0; justify-content: center; }

/* 缩放档：适应（等比缩到卡片宽）/ 1:1（原始尺寸，内部滚动）。 */
.dhp__btn--fit {
  min-width: 40px;
  justify-content: center;
  border-color: var(--dsw-alias-border-l3, rgba(127,127,127,.2));
  font-variant-numeric: tabular-nums;
  font-size: 11px;
}

.dhp__btn[data-busy='1'] { opacity: .6; pointer-events: none; }

.dhp__spin { transition: transform .5s cubic-bezier(.3,.7,.3,1); }
.dhp__btn:hover .dhp__spin { transform: rotate(120deg); }
.dhp__btn[data-spin='1'] .dhp__spin { animation: dhp-rotate .7s linear; }
@keyframes dhp-rotate { to { transform: rotate(360deg); } }

.dhp__chevron { transition: transform .26s cubic-bezier(.2,.8,.2,1); }
.dhp__card[data-collapsed='1'] .dhp__chevron { transform: rotate(-90deg); }

/* ── 预览体：高度自适应 + 缓动 ═════════════════════════════════════════ */
.dhp__body {
  position: relative;
  height: 0;
  overflow: hidden;
  border-top: 1px solid transparent;
  transition: height .34s cubic-bezier(.2, .8, .2, 1), border-color .2s ease;
}

.dhp__card[data-collapsed='0'] .dhp__body { border-top-color: var(--dsw-alias-border-l3, rgba(127,127,127,.16)); }

.dhp__frame {
  position: absolute;
  top: 0;
  display: block;
  border: 0;
  background: #fff;
  color-scheme: light;
  opacity: 0;
  transform-origin: top left;
  transition: opacity .32s ease, transform .3s cubic-bezier(.2,.8,.2,1), left .3s cubic-bezier(.2,.8,.2,1);
}

.dhp__frame[data-loaded='1'] { opacity: 1; }

/* 加载纱：骨架微光，首帧到了就淡出。 */
.dhp__veil {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 14px;
  background: color-mix(in srgb, var(--dsw-alias-label-primary) 3%, transparent);
  opacity: 1;
  transition: opacity .3s ease;
}

.dhp__veil[data-gone='1'] { opacity: 0; pointer-events: none; }

.dhp__bar {
  height: 10px;
  border-radius: 6px;
  background: linear-gradient(
    90deg,
    color-mix(in srgb, var(--dsw-alias-label-primary) 7%, transparent) 0%,
    color-mix(in srgb, var(--dsw-alias-label-primary) 14%, transparent) 50%,
    color-mix(in srgb, var(--dsw-alias-label-primary) 7%, transparent) 100%
  );
  background-size: 220% 100%;
  animation: dhp-shimmer 1.25s ease-in-out infinite;
}

.dhp__bar:nth-child(2) { width: 72%; animation-delay: .12s; }
.dhp__bar:nth-child(3) { width: 48%; animation-delay: .24s; }
.dhp__bar:nth-child(4) { width: 60%; animation-delay: .36s; }

@keyframes dhp-shimmer {
  from { background-position: 120% 0; }
  to { background-position: -60% 0; }
}

/* ── 错误行 ════════════════════════════════════════════════════════════ */
.dhp__err {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 12px 10px;
  font-size: 12px;
  line-height: 18px;
  color: var(--dsw-alias-label-tertiary);
  animation: dhp-in .24s ease both;
}

.dhp__err-dot {
  width: 6px;
  height: 6px;
  flex: none;
  border-radius: 50%;
  background: var(--dsw-alias-state-warning, #d9822b);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--dsw-alias-state-warning, #d9822b) 18%, transparent);
}

/* ── 深色主题微调 ══════════════════════════════════════════════════════ */
body[data-ds-dark-theme] .dhp__card { background: color-mix(in srgb, #fff 3%, transparent); }
body[data-ds-dark-theme] .dhp__card:hover { box-shadow: 0 8px 26px rgba(0,0,0,.45); }

@media (prefers-reduced-motion: reduce) {
  .dhp__card, .dhp__err { animation: none; }
  .dhp__body, .dhp__frame, .dhp__veil, .dhp__btn, .dhp__chevron, .dhp__icon { transition: none; }
  .dhp__bar { animation: none; }
  .dhp__btn:hover, .dhp__card:hover .dhp__icon { transform: none; }
}
`

/** 注入样式（幂等）。 */
export function injectHtmlPreviewStyles(): void {
  if (typeof document === 'undefined') return
  if (document.getElementById('dsh-chat-flow-html-preview-styles') !== null) return
  const style = document.createElement('style')
  style.id = 'dsh-chat-flow-html-preview-styles'
  style.textContent = CSS
  document.head.appendChild(style)
}
