/**
 * dsh-chat-flow — 注入式样式（思考 chip + 对话流卡片）。
 *
 * 命名空间 `dtt__`（dsh-chat-flow），与 webui 的 dsh-better-markdown__/
 * dsh-reply-card__ 不冲突；工具聚合的 dts__ 样式在 tool-summary/styles.ts。
 *
 * ⚠ 注入式 CSS 注释红线：注释内部严禁出现「星号紧跟正斜杠」的两字符闭合序列
 * （包括 token 名里混写星号再跟正斜杠的写法），否则注释提前闭合，
 * 残骸文本会把下一条规则拖成非法选择器整条丢弃。
 */

const CSS = `
/* 空白槽位折叠：聚合后工具/思考节点留下的空 [data-slot] 不再产生空白条。 */
[data-chat-flow-key]:has(> [data-slot]:empty) {
  display: none;
}

/* ── 助手正文容器：与官方 AssistantMarkdown 同一套字级与节奏 ────────────
   官方 MarkdownText 自带排版，这里只补容器层（字号轴 + 块间 gap + 宽表外溢）。 */
.dtt__assistant {
  display: flex;
  flex-direction: column;
  min-width: 0;
  font-size: var(--dsh-content-font-size, 14px);
  line-height: calc(24px + var(--dsh-content-font-delta, 0px));
  color: var(--dsw-alias-label-primary);
}

.dtt__assistant-body {
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 0;
}

/* 宽表外溢（与官方 .body :global(.md-table-wide) 同规则） */
.dtt__assistant-body :global(.md-table-wide) {
  --dsh-table-spare: max(0px, calc((100cqw - var(--dsh-chat-content-width)) / 2));
  --dsh-table-lead: calc(var(--dsh-table-spare) + min(var(--dsh-chat-content-width), 100cqw) - 100%);
  box-sizing: border-box;
  width: calc(100% + var(--dsh-table-lead) + var(--dsh-table-spare));
  max-width: none;
  margin-left: calc(-1 * var(--dsh-table-lead));
  padding-left: var(--dsh-table-lead);
}

/* 中断回合的收尾标记（官方 .stopped 同款静默小签）。 */
.dtt__stopped {
  align-self: flex-start;
  border-radius: 6px;
  padding: 0 6px;
  background: var(--dsw-alias-interactive-bg-hover);
  color: var(--dsw-alias-label-tertiary);
  font-size: 11px;
  line-height: 18px;
}

/* ══ 对话流卡片（自 webui flow-card 移植；回合结束后才出现）══════════════
   --step：回合中间的已完成片段。左侧一条竖线 + 极淡纱，圈出「一步」。
   --reply：回合最终回复（总结卡）。描边 + 顶部高光 + 完成标记与统计 chip。
   共同规则：跟随文字色的中性半透明纱（浅色=淡黑、深色=淡白，一条规则通吃
   两个主题）。⚠ 不加 backdrop-filter：消息流里每条回复都是一张卡，长会话
   下大面积模糊会拖垮滚动性能。 */
.dtt__card {
  min-width: 0;
  border-radius: 14px;
  animation: dtt-card-in .26s cubic-bezier(.2, .8, .2, 1);
}

/* 中间步骤：轻量竖线卡 */
.dtt__card--step {
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-left: 2px solid var(--dsw-alias-border-l2, rgba(127,127,127,.22));
  border-radius: 0 12px 12px 0;
  padding: 10px 14px;
  background: color-mix(in srgb, var(--dsw-alias-label-primary) 2.5%, transparent);
}

/* 最终回复：总结卡 */
.dtt__card--reply {
  position: relative;
  overflow: hidden;
  border: 1px solid var(--dsw-alias-border-l3, rgba(127,127,127,.16));
  padding: 0;
  background:
    linear-gradient(180deg, color-mix(in srgb, var(--dsw-alias-bg-base) 26%, transparent), transparent 42%),
    var(--dsh-flow-veil, color-mix(in srgb, var(--dsw-alias-label-primary) 4%, transparent));
  box-shadow: 0 1px 2px rgba(15, 17, 21, .04), 0 8px 24px -18px rgba(15, 17, 21, .28);
}

/* 顶边一条品牌蓝渐隐细线：只在总结卡出现，作为「本轮收尾」的视觉锚点。 */
.dtt__card--reply::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(
    90deg,
    var(--dsw-alias-state-business-primary, #4176e6) 0%,
    color-mix(in srgb, var(--dsw-alias-state-business-primary, #4176e6) 35%, transparent) 42%,
    transparent 100%
  );
  opacity: .75;
  pointer-events: none;
}

.dtt__card--reply[data-interrupted]::before {
  background: linear-gradient(
    90deg,
    var(--dsw-alias-state-warn-primary, #f59e0b) 0%,
    transparent 100%
  );
}

/* 头部：完成标记 + 统计 chip 行 */
.dtt__card-head {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  border-bottom: 1px solid var(--dsw-alias-border-l3, rgba(127,127,127,.12));
  padding: 10px 16px;
}

.dtt__card-badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  flex: none;
  height: 22px;
  border-radius: 11px;
  padding: 0 9px;
  background: color-mix(in srgb, var(--dsw-alias-state-success-primary, #2f9e44) 12%, transparent);
  color: var(--dsw-alias-state-success-primary, #2f9e44);
  font-size: 12px;
  font-weight: 700;
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--dsw-alias-state-success-primary, #2f9e44) 8%, transparent);
  line-height: 22px;
  white-space: nowrap;
}

.dtt__card-badge[data-interrupted] {
  background: color-mix(in srgb, var(--dsw-alias-state-warn-primary, #f59e0b) 14%, transparent);
  color: var(--dsw-alias-state-warn-label, #b45309);
}

.dtt__card-chips {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
  min-width: 0;
}

.dtt__card-chip {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  height: 22px;
  border: 1px solid var(--dsw-alias-border-l3, rgba(127,127,127,.16));
  border-radius: 7px;
  padding: 0 8px;
  color: var(--dsw-alias-label-tertiary);
  font-size: 11px;
  line-height: 22px;
  white-space: nowrap;
  transition: transform .22s ease, box-shadow .22s ease, border-color .22s ease;
}

/* 方案A：标签弱化 + 数值加强 + 状态圆点，扫一眼先看到数字。 */
.dtt__card-chip::before {
  content: "";
  width: 5px;
  height: 5px;
  flex: none;
  border-radius: 50%;
  background: currentColor;
  opacity: .3;
}

.dtt__card-chip:hover {
  transform: translateY(-2px);
  border-color: color-mix(in srgb, var(--dsw-alias-state-business-primary, #4176e6) 45%, transparent);
  box-shadow: 0 6px 16px rgba(65,118,230,.14);
}

.dtt__card-chip-value {
  color: var(--dsw-alias-label-primary);
  font-variant-numeric: tabular-nums;
  font-size: 12px;
  font-weight: 700;
}

/* Git chip 高亮蓝，一眼区分。 */
.dtt__card-chip[data-kind="git"] {
  background: color-mix(in srgb, var(--dsw-alias-state-business-primary, #4176e6) 12%, transparent);
  border-color: transparent;
  color: var(--dsw-alias-state-business-primary, #4176e6);
}

.dtt__card-chip[data-kind="git"] .dtt__card-chip-value {
  color: inherit;
}

.dtt__card-chip[data-kind="git"]::before {
  opacity: 1;
  box-shadow: 0 0 6px currentColor;
}

.dtt__card-chip[data-kind="git"]:hover {
  box-shadow: 0 6px 18px rgba(65,118,230,.30);
}

.dtt__card-chip[data-kind="time"] .dtt__card-chip-value {
  color: var(--dsw-alias-state-business-primary, #4176e6);
}

.dtt__card-body {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 14px 16px;
}

@keyframes dtt-card-in {
  from { opacity: .35; }
  to { opacity: 1; }
}

/* ── 思考入口 chip（与工具 chip dts__entry 同一套视觉语言）──────────────
   胶囊 28px + 圆形图标底 + 强调色（品牌蓝）运行态。--dtt-rea-accent 只在
   本组件根上声明一次，子元素继承。 */
.dtt__reasoning {
  --dtt-rea-accent: var(--dsw-alias-state-business-primary, #4176e6);
  --dtt-rea-fill: var(--dsh-flow-veil, color-mix(in srgb, var(--dsw-alias-label-primary) 5%, transparent));
  --dtt-rea-surface: var(--dsw-alias-bg-layer-1, rgba(127,127,127,.05));
  --dtt-rea-border: var(--dsw-alias-border-l2, rgba(127,127,127,.22));
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  max-width: 100%;
}

.dtt__reasoning-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  max-width: 100%;
  height: 28px;
  margin: 0;
  overflow: hidden;
  border: 1px solid var(--dtt-rea-border);
  border-radius: 999px;
  padding: 0 12px 0 5px;
  background: var(--dtt-rea-surface);
  box-shadow: 0 1px 2px rgba(15,17,21,.04);
  color: var(--dsw-alias-label-secondary);
  cursor: pointer;
  font-size: 12px;
  line-height: 26px;
  white-space: nowrap;
  transition: border-color .18s ease, background-color .18s ease, box-shadow .18s ease, transform .18s ease;
}

.dtt__reasoning-btn:hover {
  border-color: color-mix(in srgb, var(--dtt-rea-accent) 34%, var(--dtt-rea-border));
  background: var(--dsw-alias-interactive-bg-hover, rgba(127,127,127,.1));
  box-shadow: 0 2px 8px rgba(15,17,21,.08);
  color: var(--dsw-alias-label-primary);
  transform: translateY(-1px);
}

.dtt__reasoning-btn:active {
  box-shadow: 0 1px 2px rgba(15,17,21,.06);
  transform: none;
}

.dtt__reasoning-btn:focus-visible {
  outline: 2px solid color-mix(in srgb, var(--dtt-rea-accent) 55%, transparent);
  outline-offset: 2px;
}

.dtt__reasoning-icon {
  display: inline-grid;
  place-items: center;
  flex: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: color-mix(in srgb, var(--dtt-rea-accent) 13%, transparent);
  color: var(--dtt-rea-accent);
  font-size: 12px;
  line-height: 1;
}

.dtt__reasoning-btn > span:not(.dtt__reasoning-icon) {
  min-width: 0;
  overflow: hidden;
  font-weight: 500;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* 思考中：描边/文字染成强调色 + 扫光高光 + 图标呼吸圈。动画仅在本轮进行中
   存在（单元素 background-position / box-shadow），思考结束即消失。 */
.dtt__reasoning[data-running="true"] .dtt__reasoning-btn {
  border-color: color-mix(in srgb, var(--dtt-rea-accent) 42%, transparent);
  background:
    linear-gradient(color-mix(in srgb, var(--dtt-rea-accent) 9%, transparent), color-mix(in srgb, var(--dtt-rea-accent) 9%, transparent)),
    var(--dtt-rea-surface);
  color: var(--dtt-rea-accent);
}

.dtt__reasoning[data-running="true"] .dtt__reasoning-icon {
  background: color-mix(in srgb, var(--dtt-rea-accent) 20%, transparent);
  animation: dtt-rea-breathe 1.8s ease-in-out infinite;
}

.dtt__reasoning[data-running="true"] .dtt__reasoning-btn::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(100deg,
    transparent 22%,
    color-mix(in srgb, var(--dtt-rea-accent) 16%, transparent) 50%,
    transparent 78%);
  background-size: 220% 100%;
  pointer-events: none;
  animation: dtt-rea-sheen 1.9s linear infinite;
}

@keyframes dtt-rea-sheen {
  from { background-position: 160% 0; }
  to { background-position: -60% 0; }
}

@keyframes dtt-rea-breathe {
  0%, 100% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--dtt-rea-accent) 32%, transparent); }
  50% { box-shadow: 0 0 0 4px color-mix(in srgb, var(--dtt-rea-accent) 0%, transparent); }
}

/* 实时思考预览：流式滚动最新思考文字。左侧强调色导轨点明「这是思考流」。 */
.dtt__reasoning-live {
  align-self: stretch;
  position: relative;
  max-height: 180px;
  overflow-y: auto;
  border: 1px solid var(--dsw-alias-border-l3, rgba(127,127,127,.16));
  border-left: 2px solid color-mix(in srgb, var(--dtt-rea-accent) 38%, transparent);
  border-radius: 4px 12px 12px 4px;
  padding: 10px 14px;
  background:
    linear-gradient(180deg, color-mix(in srgb, var(--dtt-rea-accent) 7%, transparent), transparent 56%),
    var(--dtt-rea-fill, rgba(127,127,127,.04));
  color: var(--dsw-alias-label-secondary);
  font-size: 12px;
  line-height: 20px;
  white-space: pre-wrap;
  word-break: break-word;
  scrollbar-width: thin;
  scrollbar-color: var(--dsw-alias-scrollbar-bg-l2, rgba(127,127,127,.4)) transparent;
}

.dtt__reasoning-live::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}

.dtt__reasoning-live::-webkit-scrollbar-track {
  background: transparent;
}

.dtt__reasoning-live::-webkit-scrollbar-thumb {
  background: var(--dsw-alias-scrollbar-bg-l2, rgba(127,127,127,.4));
  border-radius: 2px;
}

.dtt__reasoning-live::-webkit-scrollbar-thumb:hover {
  background: var(--dsw-alias-scrollbar-hover-l2, rgba(127,127,127,.6));
}

.dtt__visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  margin: -1px;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}

/* 尊重系统「减少动态效果」偏好 */
@media (prefers-reduced-motion: reduce) {
  .dtt__card { animation: none; }
  .dtt__reasoning[data-running="true"] .dtt__reasoning-btn::after { display: none; }
  .dtt__reasoning-btn,
  .dtt__reasoning[data-running="true"] .dtt__reasoning-icon {
    animation: none;
    transition: none;
  }
  .dtt__reasoning-btn:hover { transform: none; }
  .dtt__card-chip { transition: none; }
  .dtt__card-chip:hover { transform: none; }
}

/* ── 生图画廊条（dgi__：SummaryCard 正文区，generate_image 结果）────────
   默认单图（保持原比例、≤360px）；strip--multi 时并排缩略图（4:3 裁剪、
   序号角标）。点击弹全屏 Lightbox（z-index 1200 为会话级遮罩统一值）。 */
.dgi__strip {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 2px;
  min-width: 0;
}

.dgi__row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  min-width: 0;
}

.dgi__item {
  appearance: none;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: zoom-in;
  position: relative;
  display: block;
  flex: 0 0 auto;
  width: auto;
  height: auto;
  max-width: 360px;
  border-radius: 8px;
  overflow: hidden;
  line-height: 0;
}

/* 多图并排：弹性缩略图（放不下自动换行） */
.dgi__strip--multi .dgi__item {
  flex: 1 1 0;
  min-width: 96px;
  max-width: 220px;
  aspect-ratio: 4 / 3;
}

.dgi__thumb {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  max-width: 100%;
  max-height: 100%;
  border-radius: 8px;
  transition: transform .15s ease, filter .15s ease;
}

.dgi__strip--multi .dgi__thumb {
  object-fit: cover;
}

.dgi__item:hover .dgi__thumb {
  transform: scale(1.02);
  filter: brightness(1.04);
}

.dgi__item:focus-visible {
  outline: 2px solid var(--dsw-alias-accent, #7aa2f7);
  outline-offset: 2px;
}

.dgi__badge {
  position: absolute;
  left: 6px;
  bottom: 6px;
  padding: 2px 6px;
  border-radius: 4px;
  background: rgba(10, 12, 16, .72);
  color: rgba(255, 255, 255, .92);
  font-size: 11px;
  line-height: 16px;
  font-variant-numeric: tabular-nums;
  backdrop-filter: blur(4px);
}

.dgi__backdrop {
  position: fixed;
  inset: 0;
  z-index: 1200;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(8, 10, 14, .92);
  animation: dgi-fade-in .18s ease;
}

.dgi__stage {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 92vw;
  max-height: 88vh;
  color: rgba(255, 255, 255, .92);
}

.dgi__full {
  display: block;
  max-width: 92vw;
  max-height: 80vh;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 24px 64px rgba(0, 0, 0, .5);
  animation: dgi-zoom-in .2s ease;
}

.dgi__save-button {
  position: absolute;
  top: 12px;
  right: 12px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border: 1px solid rgba(255, 255, 255, .18);
  border-radius: 999px;
  background: rgba(20, 24, 32, .78);
  color: rgba(255, 255, 255, .92);
  font-size: 12px;
  line-height: 18px;
  cursor: pointer;
  backdrop-filter: blur(6px);
  transition: background .15s ease, border-color .15s ease;
}

.dgi__save-button:hover {
  background: rgba(32, 38, 50, .88);
  border-color: rgba(255, 255, 255, .32);
}

.dgi__save-button:disabled {
  opacity: .6;
  cursor: default;
}

.dgi__save-icon { display: block; }

.dgi__broken {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 200px;
  min-height: 160px;
  border-radius: 8px;
  background: rgba(255, 255, 255, .06);
  color: rgba(255, 255, 255, .72);
  font-size: 13px;
}

.dgi__meta-line {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
  font-size: 12px;
  line-height: 18px;
  font-variant-numeric: tabular-nums;
  color: rgba(255, 255, 255, .8);
}

.dgi__model {
  opacity: .75;
  font-family: var(--dsh-font-mono, ui-monospace, SFMono-Regular, Menlo, monospace);
}

.dgi__hint-line {
  margin-top: 4px;
  font-size: 11px;
  line-height: 16px;
  color: rgba(255, 255, 255, .5);
}

@keyframes dgi-fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes dgi-zoom-in {
  from { transform: scale(.96); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

@media (prefers-reduced-motion: reduce) {
  .dgi__backdrop,
  .dgi__full,
  .dgi__thumb { animation: none; transition: none; }
  .dgi__item:hover .dgi__thumb { transform: none; }
}

/* 用户要求：对话流卡片去全部底色无边框（只留阴影/文字/动效；hover 反馈保留）。 */
.dtt__card--step, .dtt__card--reply { background: transparent !important; }
/* 超细边条：1px 发丝描边（浅色 l3 / 深色白 10%），阴影回到 v0.4.7 的轻档。 */
.dtt__card--reply { border: 1px solid var(--dsw-alias-border-l3, rgba(127,127,127,.16)) !important; }
.dtt__card--reply::before, .dtt__card--reply[data-interrupted]::before { display: none !important; }
.dtt__card--step { border: none !important; }
.dtt__card-chip { border-color: transparent !important; }
.dtt__card-chip:hover { border-color: color-mix(in srgb, var(--dsw-alias-state-business-primary, #4176e6) 45%, transparent) !important; }
.dtt__card-badge, .dtt__card-badge[data-interrupted] { background: transparent !important; }
.dtt__card-chip, .dtt__card-chip[data-kind="git"] { background: transparent !important; }
body[data-ds-dark-theme] .dtt__card--reply { box-shadow: 0 12px 32px rgba(0,0,0,.55) !important; border-color: rgba(255,255,255,.10) !important; }

/* ══ 会话头部视图标签（对话 / 轨迹）移到右上角 ═══════════════════════════
   官方 ui-conversation 把 tablist 作为 header 的第二个块级子元素，独占标题行
   下方一整条（header 实测 76px）。这里把 header 改成单行 flex：标题行
   flex:1 1 auto + min-width:0 负责收缩截断，tablist flex:none 靠 margin-left:auto
   钉到右上角，与标题垂直同行；header 收回 45px，省下的 31px 全还给正文。
   选择器只用稳定钩子：header 标签、role=tablist、CSS Module 的 _titleRow /
   _tab 后缀（前缀 wSkVaW_ 是构建 hash，会变，一律不写死）。
   :has 只在真的渲染出 tablist（视图数 1 时官方不渲染）时生效，单视图零影响。 */
header:has(> [role='tablist']) {
  display: flex;
  align-items: center;
  gap: 18px;
}

header:has(> [role='tablist']) > [class*='_titleRow'] {
  flex: 1 1 auto;
  min-width: 0;
}

header:has(> [role='tablist']) > [role='tablist'] {
  flex: none;
  gap: 22px;
  margin: 0 0 0 auto;
  padding-left: 0;
}

/* 标签本体：下划线收回到贴着文字（官方 11px 底衬是给整行贴边用的），
   hover 提色 + 下划线从中心展开，选中态常驻蓝色下划线。 */
header > [role='tablist'] > [class*='_tab'] {
  padding: 2px 0 8px;
  transition: color .18s ease;
}

header > [role='tablist'] > [class*='_tab']:hover {
  color: var(--dsw-alias-label-primary);
}

header > [role='tablist'] > [class*='_tab']::after {
  right: 0;
  bottom: 2px;
  left: 0;
  transform: scaleX(0);
  transform-origin: 50% 100%;
  transition: transform .22s cubic-bezier(.2, .8, .2, 1), background-color .18s ease;
}

header > [role='tablist'] > [class*='_tab']:hover::after {
  background: var(--dsw-alias-border-l2, rgba(127,127,127,.28));
  transform: scaleX(1);
}

header > [role='tablist'] > [class*='_tab'][class*='_tabActive']::after {
  background: var(--dsw-alias-state-business-primary, #4176e6);
  transform: scaleX(1);
}

@media (prefers-reduced-motion: reduce) {
  header > [role='tablist'] > [class*='_tab'],
  header > [role='tablist'] > [class*='_tab']::after { transition: none; }
}
`

/** Inject the stylesheet once. */
export function injectStyles(): void {
  if (typeof document === 'undefined') return
  if (document.getElementById('dsh-chat-flow-styles') !== null) return
  const style = document.createElement('style')
  style.id = 'dsh-chat-flow-styles'
  style.textContent = CSS
  document.head.appendChild(style)
}

/** 生图画廊样式：与主样式同模板，幂等注入（别名，供组件内部调用）。 */
export const injectGalleryStyles = injectStyles
