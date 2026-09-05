/**
 * dsh-chat-flow — 本地 HTML 预览卡样式（class 前缀 dhp__，运行时注入 style）。
 *
 * 形态：一条极窄的工具条 + 铺满的预览区，像一个小浏览器窗。工具条刻意压低
 * 存在感（图标 + 文件名 + 大小·时间；动作按钮 resting 半透明、悬停整排提亮），
 * 页面本身才是主角。动效：卡片入场、预览首帧淡入、高度缓动贴合、折叠收放 +
 * 箭头旋转、按钮 hover 上浮 / active 回弹、探测期一条来回扫的光轨、刷新图标
 * 转一圈。prefers-reduced-motion 全部降级。
 */

const CSS = `/* 多个预览纵向堆叠（一条正文里提到好几个 html）。 */
.dhp__stack { display: flex; flex-direction: column; gap: 10px; min-width: 0; }

/* ── 卡片外壳 ══════════════════════════════════════════════════════════ */
.dhp__card {
  --dhp-accent: var(--dsw-alias-state-business-primary, #4176e6);
  --dhp-hairline: var(--dsw-alias-border-l3, rgba(127,127,127,.17));
  position: relative;
  overflow: hidden;
  border: 1px solid var(--dhp-hairline);
  border-radius: 13px;
  background: var(--dsw-alias-bg-base, #fff);
  box-shadow: 0 1px 2px rgba(17, 24, 39, .04);
  animation: dhp-in .32s cubic-bezier(.2, .8, .2, 1) both;
  transition: border-color .22s ease, box-shadow .26s ease, transform .26s cubic-bezier(.2,.8,.2,1);
}

.dhp__card:hover {
  border-color: color-mix(in srgb, var(--dhp-accent) 30%, transparent);
  box-shadow: 0 10px 30px rgba(17, 24, 39, .09);
  transform: translateY(-1px);
}

@keyframes dhp-in { from { opacity: 0; transform: translateY(7px); } to { opacity: 1; transform: none; } }

/* ── 工具条：极窄、低存在感 ═══════════════════════════════════════════ */
.dhp__bar {
  display: flex;
  align-items: center;
  gap: 7px;
  min-width: 0;
  height: 34px;
  padding: 0 7px 0 9px;
  background: color-mix(in srgb, var(--dsw-alias-label-primary) 3%, transparent);
  border-bottom: 1px solid transparent;
  transition: border-color .22s ease;
}

.dhp__card[data-collapsed='0'] .dhp__bar { border-bottom-color: var(--dhp-hairline); }

.dhp__glyph {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  flex: none;
  border-radius: 6px;
  background: color-mix(in srgb, var(--dhp-accent) 12%, transparent);
  color: var(--dhp-accent);
  transition: box-shadow .24s ease, transform .24s cubic-bezier(.2,.8,.2,1);
}

.dhp__card:hover .dhp__glyph { transform: translateY(-1px); box-shadow: 0 0 0 3px color-mix(in srgb, var(--dhp-accent) 12%, transparent); }

.dhp__name {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 12.5px;
  font-weight: 500;
  line-height: 18px;
  color: var(--dsw-alias-label-primary);
}

.dhp__meta {
  flex: none;
  font-size: 11.5px;
  line-height: 18px;
  font-variant-numeric: tabular-nums;
  color: var(--dsw-alias-label-caption, var(--dsw-alias-label-tertiary));
}

.dhp__gap { flex: 1 1 auto; min-width: 8px; }

/* ── 按钮：resting 收着，悬停整排提亮 ═════════════════════════════════ */
.dhp__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  height: 24px;
  min-width: 24px;
  padding: 0 6px;
  border: 1px solid transparent;
  border-radius: 7px;
  background: transparent;
  color: var(--dsw-alias-label-tertiary);
  font-size: 11.5px;
  line-height: 1;
  font-variant-numeric: tabular-nums;
  cursor: pointer;
  opacity: .68;
  transition: opacity .18s ease, transform .16s cubic-bezier(.2,.8,.2,1),
    background-color .18s ease, color .18s ease, box-shadow .2s ease;
}

.dhp__bar:hover .dhp__btn { opacity: .92; }
.dhp__btn:hover { opacity: 1; transform: translateY(-1px); background: var(--dsw-alias-interactive-bg-hover, rgba(127,127,127,.12)); color: var(--dsw-alias-label-primary); }
.dhp__btn:active { transform: translateY(0) scale(.94); }
.dhp__btn--fit { padding: 0 7px; border-color: var(--dhp-hairline); }
.dhp__btn--fit:hover { color: var(--dhp-accent); box-shadow: 0 4px 12px color-mix(in srgb, var(--dhp-accent) 20%, transparent); }
.dhp__btn--ghost { width: auto; padding: 0 10px; border: 1px solid var(--dhp-hairline); color: var(--dsw-alias-label-secondary, var(--dsw-alias-label-tertiary)); opacity: 1; }
.dhp__btn--ghost:hover { border-color: color-mix(in srgb, var(--dhp-accent) 40%, transparent); color: var(--dhp-accent); }

.dhp__spin { display: inline-flex; transition: transform .5s cubic-bezier(.3,.7,.3,1); }
.dhp__btn[data-spin='1'] .dhp__spin { animation: dhp-rotate .7s linear; }
@keyframes dhp-rotate { to { transform: rotate(360deg); } }

.dhp__chevron { display: inline-flex; transition: transform .26s cubic-bezier(.2,.8,.2,1); }
.dhp__card[data-collapsed='1'] .dhp__chevron { transform: rotate(-90deg); }

/* ── 预览区 ════════════════════════════════════════════════════════════ */
.dhp__body {
  position: relative;
  height: 0;
  overflow: hidden;
  background: var(--dsw-alias-bg-base, #fff);
  transition: height .34s cubic-bezier(.2, .8, .2, 1);
}

/* 顶缘一道内阴影，让预览区像是「嵌进」卡片里。 */
.dhp__body::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  box-shadow: inset 0 6px 14px -12px rgba(17, 24, 39, .5);
}

.dhp__frame {
  position: absolute;
  top: 0;
  display: block;
  border: 0;
  background: #fff;
  color-scheme: light;
  transform-origin: top left;
  opacity: 0;
  transition: opacity .34s ease, transform .3s cubic-bezier(.2,.8,.2,1), left .3s cubic-bezier(.2,.8,.2,1);
}

.dhp__frame[data-loaded='1'] { opacity: 1; }

/* 探测中：一条来回扫的光轨。 */
.dhp__loading { position: absolute; inset: 0; background: color-mix(in srgb, var(--dsw-alias-label-primary) 2%, transparent); }

.dhp__rail {
  position: relative;
  width: 100%;
  height: 2px;
  overflow: hidden;
  background: color-mix(in srgb, var(--dhp-accent) 14%, transparent);
}

.dhp__rail::after {
  content: '';
  position: absolute;
  inset: 0 auto 0 0;
  width: 34%;
  border-radius: 2px;
  background: linear-gradient(90deg, transparent, var(--dhp-accent), transparent);
  animation: dhp-scan 1.15s cubic-bezier(.5, 0, .5, 1) infinite;
}

@keyframes dhp-scan { from { transform: translateX(-110%); } to { transform: translateX(310%); } }

/* 失败空态：居中一行，不刷屏。 */
.dhp__empty {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  padding: 0 14px;
  color: var(--dsw-alias-label-tertiary);
  font-size: 12.5px;
  animation: dhp-in .26s ease both;
}

.dhp__empty-icon {
  display: inline-flex;
  width: 24px;
  height: 24px;
  flex: none;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: color-mix(in srgb, var(--dsw-alias-state-warning, #d9822b) 14%, transparent);
  color: var(--dsw-alias-state-warning, #d9822b);
}

.dhp__empty-text { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

/* 打开失败的落底提示。 */
.dhp__note {
  padding: 6px 11px;
  border-top: 1px solid var(--dhp-hairline);
  background: color-mix(in srgb, var(--dsw-alias-label-primary) 2%, transparent);
  color: var(--dsw-alias-label-tertiary);
  font-size: 11.5px;
  animation: dhp-in .2s ease both;
}

/* ── 深色主题微调 ══════════════════════════════════════════════════════ */
body[data-ds-dark-theme] .dhp__card { box-shadow: 0 1px 2px rgba(0,0,0,.4); }
body[data-ds-dark-theme] .dhp__card:hover { box-shadow: 0 12px 32px rgba(0,0,0,.5); }
body[data-ds-dark-theme] .dhp__body::after { box-shadow: inset 0 6px 16px -12px rgba(0,0,0,.9); }

@media (prefers-reduced-motion: reduce) {
  .dhp__card, .dhp__empty, .dhp__note { animation: none; }
  .dhp__card, .dhp__bar, .dhp__body, .dhp__frame, .dhp__btn, .dhp__chevron, .dhp__spin, .dhp__glyph { transition: none; }
  .dhp__rail::after { animation: none; width: 100%; }
  .dhp__card:hover, .dhp__btn:hover, .dhp__card:hover .dhp__glyph { transform: none; }
}`

/** 注入样式（幂等）。 */
export function injectHtmlPreviewStyles(): void {
  if (typeof document === 'undefined') return
  if (document.getElementById('dsh-chat-flow-html-preview-styles') !== null) return
  const style = document.createElement('style')
  style.id = 'dsh-chat-flow-html-preview-styles'
  style.textContent = CSS
  document.head.appendChild(style)
}
