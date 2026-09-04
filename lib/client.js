window.__ModuleLoader__.load({ id: "dsh-think-tools", factory: (require) => {
var module = { exports: {} };
var exports = module.exports;
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/client/index.ts
var index_exports = {};
__export(index_exports, {
  apply: () => apply,
  inject: () => inject
});
module.exports = __toCommonJS(index_exports);

// src/client/tool-summary/styles.ts
var CSS = `
/* Collapse flow slots that render nothing (aggregated tool groups + reasoning
   groups leave empty node slots behind; the transcript column's flex gap
   would otherwise turn each into a blank strip). */
[data-chat-flow-key]:has(> [data-slot]:empty) {
  display: none;
}

/* \u2500\u2500 \u8BBE\u8BA1\u57FA\u7EBF \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
 * \u5F3A\u8C03\u8272\u4E00\u5F8B\u8D70 --dts-accent\uFF08= \u5B98\u65B9\u54C1\u724C\u84DD state-business-primary\uFF09\uFF1B\u7EDD\u4E0D\u7528
 * --dsw-alias-brand-primary\uFF08\u6D45\u8272\u4E0B\u662F\u9ED1\u3001\u6DF1\u8272\u4E0B\u662F\u767D\u7684\u53CD\u8272 token\uFF09\u3002
 * \u8868\u9762/\u63CF\u8FB9\u53EA\u7528 design-platform.css \u91CC\u771F\u5B9E\u5B58\u5728\u7684 token\uFF1Abg-layer-1/2\u3001
 * bg-module-platform\u3001border-l2/l3\u3001label-*\u3001state-*\u3002
 * \u5185\u90E8\u586B\u5145\u9762\u7EDF\u4E00\u7ECF --dts-fill / --dts-fill-strong \u95F4\u63A5\u5F15\u7528\uFF0C\u73BB\u7483\u8D28\u611F\u4E3B\u9898
 * \u53EA\u9700\u8986\u76D6\u8FD9\u4E24\u4E2A\u53D8\u91CF\u5373\u53EF\u6574\u4F53\u6362\u6210\u300C\u4E2D\u6027\u534A\u900F\u660E\u62AC\u5347\u300D\uFF0C\u4E0D\u5FC5\u9010\u6761\u91CD\u5199\u89C4\u5219\u3002
 * \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */

/* ===== \u5BF9\u8BDD\u6D41\u5185\u7684\u5165\u53E3 chip\uFF08\u5DE5\u5177\u8C03\u7528 / \u601D\u8003 \u5171\u7528\u4E00\u5957\u89C6\u89C9\u8BED\u8A00\uFF09=========== */
.dts__entry-wrap {
  --dts-accent: var(--dsw-alias-state-business-primary, #4176e6);
  --dts-fill: var(--dsh-flow-veil, color-mix(in srgb, var(--dsw-alias-label-primary) 5%, transparent));
  /* chip \u8868\u9762/\u63CF\u8FB9\u8D70\u53D8\u91CF\uFF1A\u73BB\u7483\u8D28\u611F\u53EA\u9700\u8986\u76D6\u8FD9\u4E24\u4E2A\u53D8\u91CF\uFF08\u89C1 glass.ts\uFF09\uFF0C
   * \u4E0D\u5FC5\u7528\u66F4\u9AD8\u7279\u5F02\u6027\u7684\u89C4\u5219\u53BB\u538B chip \u7684\u8FD0\u884C\u6001\u6837\u5F0F\uFF08\u5B9E\u6D4B\u76F4\u63A5\u8986\u76D6
   * background-color \u4F1A\u8FDE\u8FD0\u884C\u6001\u7684\u5F3A\u8C03\u8272\u5E95\u4E00\u8D77\u5403\u6389\uFF09\u3002 */
  --dts-chip-surface: var(--dsw-alias-bg-layer-1, rgba(127,127,127,.05));
  --dts-chip-border: var(--dsw-alias-border-l2, rgba(127,127,127,.22));
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  max-width: 100%;
}

.dts__entry {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  max-width: 100%;
  height: 28px;
  margin: 0;
  padding: 0 12px 0 5px;
  overflow: hidden;
  border: 1px solid var(--dts-chip-border);
  border-radius: 999px;
  background: var(--dts-chip-surface);
  box-shadow: 0 1px 2px rgba(15,17,21,.04);
  color: var(--dsw-alias-label-secondary);
  cursor: pointer;
  font-size: 12px;
  line-height: 26px;
  white-space: nowrap;
  transition: border-color .18s ease, background-color .18s ease, box-shadow .18s ease, transform .18s ease;
}

.dts__entry:hover {
  border-color: color-mix(in srgb, var(--dts-accent) 34%, var(--dts-chip-border));
  background: var(--dsw-alias-interactive-bg-hover, rgba(127,127,127,.1));
  box-shadow: 0 2px 8px rgba(15,17,21,.08);
  color: var(--dsw-alias-label-primary);
  transform: translateY(-1px);
}

.dts__entry:active {
  box-shadow: 0 1px 2px rgba(15,17,21,.06);
  transform: none;
}

.dts__entry:focus-visible {
  outline: 2px solid color-mix(in srgb, var(--dts-accent) 55%, transparent);
  outline-offset: 2px;
}

/* \u56FE\u6807\u6258\u5728\u4E00\u679A\u5706\u5F62\u8272\u5E95\u91CC\uFF0C\u4F5C\u4E3A chip \u7684\u89C6\u89C9\u951A\u70B9\uFF08\u601D\u8003 chip \u540C\u89C4\u683C\uFF09\u3002 */
.dts__entry-icon {
  display: inline-grid;
  place-items: center;
  flex: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: color-mix(in srgb, var(--dts-accent) 13%, transparent);
  color: var(--dts-accent);
  font-size: 12px;
  line-height: 1;
}

.dts__entry-text {
  min-width: 0;
  overflow: hidden;
  font-weight: 500;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.dts__entry-sub {
  flex: none;
  border-radius: 999px;
  padding: 0 7px;
  background: var(--dsw-alias-interactive-bg-hover, rgba(127,127,127,.1));
  color: var(--dsw-alias-label-tertiary);
  font-size: 11px;
  line-height: 18px;
}

.dts__entry-err {
  flex: none;
  border-radius: 999px;
  padding: 0 7px;
  background: color-mix(in srgb, var(--dsw-alias-state-error-primary, #e5484d) 14%, transparent);
  color: var(--dsw-alias-state-error-primary, #e5484d);
  font-size: 11px;
  line-height: 18px;
}

/* kind \u8FF7\u4F60\u5FBD\u6807\u7EC4\uFF08chip \u5C3E\u90E8\u7684\u5C0F\u5706\u56FE\u6807\uFF09 */
.dts__entry-kinds {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  flex: none;
}

/* \u8FD0\u884C\u6001\uFF1A\u63CF\u8FB9/\u6587\u5B57\u67D3\u6210\u5F3A\u8C03\u8272\uFF0C\u5E95\u8272\u4E0A\u626B\u8FC7\u4E00\u9053\u6781\u6DE1\u9AD8\u5149\u3002\u52A8\u753B\u53EA\u5728\u672C\u8F6E\u8FDB\u884C\u4E2D
 * \u5B58\u5728\uFF08\u5355\u5143\u7D20\u3001GPU \u53CB\u597D\u7684 background-position\uFF09\uFF0C\u56DE\u5408\u7ED3\u675F\u5373\u6D88\u5931\u3002 */
.dts__entry[data-running="true"] {
  border-color: color-mix(in srgb, var(--dts-accent) 42%, transparent);
  background:
    linear-gradient(color-mix(in srgb, var(--dts-accent) 9%, transparent), color-mix(in srgb, var(--dts-accent) 9%, transparent)),
    var(--dts-chip-surface);
}

.dts__entry[data-running="true"] .dts__entry-text {
  color: var(--dts-accent);
}

.dts__entry[data-running="true"] .dts__entry-icon {
  background: color-mix(in srgb, var(--dts-accent) 20%, transparent);
  animation: dts-breathe 1.8s ease-in-out infinite;
}

.dts__entry[data-running="true"]::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(100deg,
    transparent 22%,
    color-mix(in srgb, var(--dts-accent) 16%, transparent) 50%,
    transparent 78%);
  background-size: 220% 100%;
  pointer-events: none;
  animation: dts-sheen 1.9s linear infinite;
}

@keyframes dts-sheen {
  from { background-position: 160% 0; }
  to { background-position: -60% 0; }
}

@keyframes dts-breathe {
  0%, 100% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--dts-accent) 32%, transparent); }
  50% { box-shadow: 0 0 0 4px color-mix(in srgb, var(--dts-accent) 0%, transparent); }
}

/* ===== \u5BF9\u8BDD\u6D41\u5185\u7684\u5B9E\u65F6\u5361\u7247\uFF08\u4E0B\u8F7D / \u957F\u547D\u4EE4\uFF09============================== */
.dts__entry-live {
  --dts-accent: var(--dsw-alias-state-business-primary, #4176e6);
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 26px;
  padding: 0 12px;
  border: 1px solid color-mix(in srgb, var(--dts-accent) 32%, transparent);
  border-radius: 999px;
  background:
    linear-gradient(color-mix(in srgb, var(--dts-accent) 10%, transparent), color-mix(in srgb, var(--dts-accent) 10%, transparent)),
    var(--dts-chip-surface, transparent);
  color: var(--dts-accent);
  font-size: 11px;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

.dts__download-card {
  --dts-accent: var(--dsw-alias-state-business-primary, #4176e6);
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 280px;
  max-width: 100%;
  padding: 10px 12px;
  border: 1px solid color-mix(in srgb, var(--dts-accent) 24%, var(--dsw-alias-border-l2, rgba(127,127,127,.22)));
  border-radius: 12px;
  background:
    linear-gradient(180deg, color-mix(in srgb, var(--dts-accent) 9%, transparent), transparent 64%),
    var(--dts-fill, rgba(127,127,127,.05));
  box-shadow: 0 1px 3px rgba(15,17,21,.05);
}

.dts__download-head {
  display: flex;
  align-items: center;
  gap: 7px;
  color: var(--dts-accent);
  font-size: 12px;
  font-weight: 600;
}

.dts__download-head > svg {
  flex: none;
}

.dts__download-title {
  font-variant-numeric: tabular-nums;
}

.dts__download-url {
  min-width: 0;
  overflow: hidden;
  color: var(--dsw-alias-label-secondary);
  font-family: var(--ds-font-family-code, monospace);
  font-size: 11px;
  line-height: 18px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.dts__download-dest {
  min-width: 0;
  overflow: hidden;
  color: var(--dsw-alias-label-tertiary);
  font-size: 11px;
  line-height: 18px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.dts__download-dest code {
  border-radius: 4px;
  padding: 0 4px;
  background: var(--dsw-alias-interactive-bg-hover, rgba(127,127,127,.1));
  color: var(--dsw-alias-label-secondary);
  font-family: var(--ds-font-family-code, monospace);
}

.dts__download-progress {
  margin-top: 2px;
}

.dts__download-progress .dts__progress {
  width: 100%;
}

/* \u4E0D\u5B9A\u91CF\u8FDB\u5EA6\u6761\uFF1A\u6DE1\u8272\u8F68\u9053 + \u4E24\u7AEF\u6E10\u9690\u7684\u5F3A\u8C03\u8272\u6E38\u6807\uFF08\u770B\u8D77\u6765\u5728\u6ED1\u52A8\u800C\u975E\u8DF3\u52A8\uFF09\u3002 */
.dts__progress {
  position: relative;
  width: 52px;
  height: 4px;
  overflow: hidden;
  border-radius: 999px;
  background: color-mix(in srgb, var(--dts-accent, #4176e6) 16%, var(--dsw-alias-interactive-bg-hover, rgba(127,127,127,.12)));
}

.dts__progress::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  width: 45%;
  border-radius: 999px;
  background: linear-gradient(90deg, transparent, var(--dts-accent, #4176e6), transparent);
  animation: dts-progress-slide 1.15s cubic-bezier(.4, 0, .6, 1) infinite;
}

@keyframes dts-progress-slide {
  from { left: -45%; }
  to { left: 100%; }
}

/* ===== \u5C45\u4E2D\u6D3B\u52A8\u5F39\u7A97\uFF08\u601D\u8003 + \u5DE5\u5177\uFF09====================================== */
/* \u906E\u7F69\u7C7B\u540D\u5E26 mask\uFF1A\u73BB\u7483\u8D28\u611F\u7684\u6D6E\u5C42\u603B\u9009\u62E9\u5668\u6309\u7EA6\u5B9A\u8DF3\u8FC7\u906E\u7F69\uFF0C\u6A21\u7CCA\u5728\u6B64\u81EA\u5907
   \uFF08\u5B98\u65B9\u914D\u65B9 bg-mask-1 + --dsw-mask-blur\uFF09\u3002 */
.dts__modal-mask {
  position: fixed;
  inset: 0;
  z-index: 9990;
  background: var(--dsw-alias-bg-mask-1, rgba(15, 17, 21, .45));
  backdrop-filter: var(--dsw-mask-blur, blur(2px));
  -webkit-backdrop-filter: var(--dsw-mask-blur, blur(2px));
  animation: dts-fade-in .16s ease-out;
}

@keyframes dts-fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

.dts__modal {
  --dts-accent: var(--dsw-alias-state-business-primary, #4176e6);
  /* \u5185\u90E8\u586B\u5145\u9762\uFF1A\u8DDF\u968F\u6587\u5B57\u8272\u7684\u4E2D\u6027\u534A\u900F\u660E\u7EB1\uFF08\u6D45\u8272=\u6DE1\u9ED1\u3001\u6DF1\u8272=\u6DE1\u767D\uFF09\u3002
   * \u4E0D\u7528 bg-layer-* \u5B9E\u8272 token\u2014\u2014\u6D45\u8272\u4E3B\u9898\u4E0B\u4E09\u5C42 layer \u540C\u4E3A\u7EAF\u767D\uFF0C\u5361\u5728\u767D
   * \u9762\u677F\u4E0A\u5B8C\u5168\u770B\u4E0D\u51FA\u5C42\u6B21\uFF1B\u534A\u900F\u660E\u7EB1\u8FD8\u80FD\u76F4\u63A5\u53E0\u5728\u73BB\u7483\u8D28\u611F\u7684\u6A21\u7CCA\u9762\u4E0A\uFF0C
   * \u4E0D\u4F1A\u5F62\u6210\u300C\u6A21\u7CCA\u4E4B\u4E0A\u518D\u8499\u4E00\u5C42\u539A\u7EB1\u300D\u3002 */
  --dts-fill: var(--dsh-flow-veil, color-mix(in srgb, var(--dsw-alias-label-primary) 5%, transparent));
  --dts-fill-strong: color-mix(in srgb, var(--dsw-alias-label-primary) 8%, transparent);
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 9991;
  display: flex;
  flex-direction: column;
  width: min(760px, 92vw);
  max-height: min(84vh, 860px);
  border: 1px solid var(--dsw-alias-border-l2, rgba(127,127,127,.22));
  border-radius: 16px;
  background: var(--dsw-alias-bg-layer-1, #fff);
  box-shadow:
    0 1px 2px rgba(15,17,21,.06),
    0 24px 64px rgba(15,17,21,.22);
  transform: translate(-50%, -50%);
  animation: dts-modal-in .18s cubic-bezier(.2, .8, .2, 1);
}

@keyframes dts-modal-in {
  from { transform: translate(-50%, -48%) scale(.97); opacity: .4; }
  to { transform: translate(-50%, -50%) scale(1); opacity: 1; }
}

.dts__modal-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 13px 14px 13px 18px;
  border-bottom: 1px solid var(--dsw-alias-border-l3, rgba(127,127,127,.16));
}

.dts__modal-title {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--dsw-alias-label-primary);
  font-size: 13px;
  font-weight: 600;
}

.dts__modal-title svg {
  color: var(--dts-accent);
}

.dts__modal-close {
  display: grid;
  place-items: center;
  flex: none;
  width: 26px;
  height: 26px;
  margin: 0;
  border: 0;
  padding: 0;
  border-radius: 50%;
  background: none;
  color: var(--dsw-alias-label-tertiary);
  cursor: pointer;
  font-size: 13px;
  line-height: 1;
  transition: background-color .15s ease, color .15s ease;
}

.dts__modal-close:hover {
  background: var(--dsw-alias-interactive-bg-hover, rgba(127,127,127,.12));
  color: var(--dsw-alias-label-primary);
}

.dts__modal-scroll {
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
  padding: 16px 18px 22px;
  scrollbar-width: thin;
  scrollbar-color: var(--dsw-alias-scrollbar-bg-l2, rgba(127,127,127,.4)) transparent;
}

.dts__modal-scroll::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}

.dts__modal-scroll::-webkit-scrollbar-track {
  background: transparent;
}

.dts__modal-scroll::-webkit-scrollbar-thumb {
  background: var(--dsw-alias-scrollbar-bg-l2, rgba(127,127,127,.4));
  border-radius: 2px;
}

.dts__modal-scroll::-webkit-scrollbar-thumb:hover {
  background: var(--dsw-alias-scrollbar-hover-l2, rgba(127,127,127,.6));
}

/* ---- \u4E24\u4E2A\u5206\u533A\uFF1A\u601D\u8003 / \u5DE5\u5177 ---- */
.dts__modal-panel {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.dts__modal-panel + .dts__modal-panel {
  margin-top: 18px;
  padding-top: 16px;
  border-top: 1px solid var(--dsw-alias-border-l3, rgba(127,127,127,.16));
}

.dts__modal-panel-head {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 600;
  color: var(--dsw-alias-label-primary);
}

.dts__modal-panel-title {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.dts__modal-panel-title svg {
  color: var(--dts-accent);
}

.dts__modal-panel-count {
  margin-left: auto;
  border-radius: 999px;
  padding: 0 8px;
  background: var(--dsw-alias-interactive-bg-hover, rgba(127,127,127,.12));
  color: var(--dsw-alias-label-secondary);
  font-size: 11px;
  font-weight: 600;
  line-height: 18px;
}

.dts__modal-panel-live {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-left: auto;
  border-radius: 999px;
  padding: 0 9px;
  background: color-mix(in srgb, var(--dts-accent) 12%, transparent);
  color: var(--dts-accent);
  font-size: 11px;
  font-weight: 600;
  line-height: 19px;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

/* ---- \u601D\u8003\u6761\u76EE\u8DF3\u8F6C\u5BFC\u822A ---- */
.dts__reasoning-nav {
  display: flex;
  gap: 4px;
  max-width: 100%;
  overflow-x: auto;
  padding-bottom: 2px;
  scrollbar-width: thin;
}

.dts__reasoning-nav-item {
  flex: none;
  min-width: 26px;
  margin: 0;
  border: 1px solid transparent;
  border-radius: 8px;
  padding: 1px 8px;
  background: var(--dsw-alias-interactive-bg-hover, rgba(127,127,127,.08));
  color: var(--dsw-alias-label-secondary);
  cursor: pointer;
  font-size: 11px;
  font-variant-numeric: tabular-nums;
  line-height: 20px;
  text-align: center;
  transition: background-color .15s ease, color .15s ease, border-color .15s ease;
}

.dts__reasoning-nav-item:hover {
  background: var(--dsw-alias-interactive-bg-hover, rgba(127,127,127,.16));
  color: var(--dsw-alias-label-primary);
}

.dts__reasoning-nav-item[data-active="true"] {
  border-color: color-mix(in srgb, var(--dts-accent) 45%, transparent);
  background: color-mix(in srgb, var(--dts-accent) 14%, transparent);
  color: var(--dts-accent);
  font-weight: 600;
}

/* ---- \u601D\u8003\u6B63\u6587\uFF1A\u6309\u7C7B\u522B\u6210\u7EC4\uFF0C\u6BCF\u6761\u662F\u72EC\u7ACB\u5C0F\u5361 ---- */
.dts__modal-reasoning {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.dts__modal-reasoning-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.dts__modal-reasoning-group-title {
  display: inline-flex;
  align-self: flex-start;
  align-items: center;
  gap: 6px;
  border: 1px solid var(--dsw-alias-border-l3, rgba(127,127,127,.16));
  border-radius: 999px;
  padding: 0 10px;
  background: var(--dts-fill, rgba(127,127,127,.05));
  color: var(--dsw-alias-label-secondary);
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
  line-height: 22px;
  transition: background-color .15s ease, color .15s ease, border-color .15s ease;
}

.dts__modal-reasoning-group-title:hover {
  border-color: color-mix(in srgb, var(--dts-accent) 34%, transparent);
  background: color-mix(in srgb, var(--dts-accent) 10%, transparent);
  color: var(--dsw-alias-label-primary);
}

.dts__modal-reasoning-item {
  display: flex;
  gap: 10px;
  border: 1px solid transparent;
  border-radius: 10px;
  padding: 8px 11px;
  background: var(--dts-fill, rgba(127,127,127,.04));
  color: var(--dsw-alias-label-secondary);
  font-size: 13px;
  line-height: 22px;
  scroll-margin-top: 10px;
  transition: background-color .18s ease, border-color .18s ease;
}

.dts__modal-reasoning-item[data-active="true"] {
  border-color: color-mix(in srgb, var(--dts-accent) 38%, transparent);
  background: color-mix(in srgb, var(--dts-accent) 9%, transparent);
}

.dts__modal-reasoning-item[data-running="true"] {
  color: var(--dsw-alias-label-primary);
}

.dts__modal-reasoning-item-index {
  display: inline-grid;
  place-items: center;
  flex: none;
  align-self: flex-start;
  width: 20px;
  height: 20px;
  margin-top: 1px;
  border-radius: 50%;
  background: var(--dsw-alias-interactive-bg-hover, rgba(127,127,127,.12));
  color: var(--dsw-alias-label-tertiary);
  font-size: 11px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  line-height: 1;
}

.dts__modal-reasoning-item[data-running="true"] .dts__modal-reasoning-item-index,
.dts__modal-reasoning-item[data-active="true"] .dts__modal-reasoning-item-index {
  background: color-mix(in srgb, var(--dts-accent) 18%, transparent);
  color: var(--dts-accent);
}

.dts__modal-reasoning-item-text {
  min-width: 0;
  flex: 1 1 auto;
  white-space: pre-wrap;
  word-break: break-word;
}

/* ---- \u5DE5\u5177\u603B\u7ED3\u5361\uFF08\u586B\u5145\u9762\uFF0C\u4E0E\u4E0B\u65B9\u8C03\u7528\u5217\u8868\u533A\u5206\uFF09---- */
.dts__summary {
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-radius: 12px;
  padding: 12px 14px;
  background: var(--dts-fill-strong, rgba(127,127,127,.07));
}

.dts__summary-title {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--dsw-alias-label-primary);
  font-size: 12px;
  font-weight: 600;
}

.dts__summary-title svg {
  color: var(--dts-accent);
}

.dts__summary-line {
  color: var(--dsw-alias-label-secondary);
  font-size: 12px;
  line-height: 20px;
}

.dts__summary-line b {
  color: var(--dsw-alias-label-primary);
  font-weight: 600;
}

.dts__chips,
.dts__files {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.dts__chip {
  border-radius: 999px;
  padding: 0 9px;
  background: var(--dsw-alias-interactive-bg-hover, rgba(127,127,127,.1));
  color: var(--dsw-alias-label-secondary);
  font-size: 11px;
  line-height: 20px;
  white-space: nowrap;
}

.dts__file {
  margin: 0;
  border: 1px solid color-mix(in srgb, var(--dts-accent) 22%, transparent);
  border-radius: 999px;
  padding: 0 9px;
  background: color-mix(in srgb, var(--dts-accent) 10%, transparent);
  color: var(--dts-accent);
  cursor: pointer;
  font-family: var(--ds-font-family-code, monospace);
  font-size: 11px;
  line-height: 20px;
  white-space: nowrap;
  transition: background-color .15s ease, border-color .15s ease;
}

.dts__file:hover {
  border-color: color-mix(in srgb, var(--dts-accent) 45%, transparent);
  background: color-mix(in srgb, var(--dts-accent) 18%, transparent);
}

/* ---- \u8C03\u7528\u5217\u8868 ---- */
.dts__modal-tools {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.dts__drawer-call,
.dts__call {
  display: flex;
  flex-direction: column;
  min-width: 0;
  border-radius: 10px;
}

.dts__call[data-selected="true"] {
  background: color-mix(in srgb, var(--dts-accent) 8%, transparent);
}

.dts__row {
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 30px;
  border-radius: 8px;
  padding: 3px 8px;
  color: var(--dsw-alias-label-primary);
  cursor: pointer;
  font-size: 12px;
  line-height: 22px;
  user-select: none;
  transition: background-color .15s ease;
}

.dts__row:hover {
  background: var(--dsw-alias-interactive-bg-hover, rgba(127,127,127,.08));
}

.dts__dot {
  flex: none;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--dsw-alias-label-caption, #94a3b8);
}

.dts__dot[data-state="running"] {
  background: var(--dts-accent, #4176e6);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--dts-accent, #4176e6) 20%, transparent);
  animation: dts-pulse 1.1s ease-in-out infinite;
}

.dts__dot[data-state="ok"] {
  background: var(--dsw-alias-state-success-primary, #2f9e44);
}

.dts__dot[data-state="error"] {
  background: var(--dsw-alias-state-error-primary, #e5484d);
}

.dts__dot[data-state="stopped"] {
  background: var(--dsw-alias-label-caption, #94a3b8);
}

@keyframes dts-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: .4; }
}

.dts__row-name {
  flex: none;
  color: var(--dsw-alias-label-primary);
  font-weight: 600;
}

.dts__row-summary {
  flex: 1 1 auto;
  min-width: 0;
  overflow: hidden;
  color: var(--dsw-alias-label-tertiary);
  font-family: var(--ds-font-family-code, monospace);
  font-size: 11px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.dts__row-time {
  flex: none;
  color: var(--dsw-alias-label-caption, #94a3b8);
  font-size: 11px;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

.dts__row-time[data-running="true"] {
  color: var(--dts-accent, #4176e6);
}

/* \u8FD0\u884C\u4E2D\u7684\u4E0B\u8F7D/\u957F\u547D\u4EE4\uFF1A\u884C\u5185\u8FDB\u5EA6\u6761 + \u8D70\u79D2\u65F6\u949F\uFF0C\u957F\u4EFB\u52A1\u4E0D\u4F1A\u770B\u8D77\u6765\u5361\u6B7B\u3002 */
.dts__row-live {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  flex: none;
  color: var(--dts-accent, #4176e6);
  font-size: 11px;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

.dts__inspect {
  flex: none;
  margin: 0;
  border: 0;
  border-radius: 6px;
  padding: 0 5px;
  background: none;
  color: var(--dsw-alias-label-tertiary);
  cursor: pointer;
  font-size: 11px;
  line-height: 20px;
  opacity: 0;
  transition: opacity .15s ease, color .15s ease, background-color .15s ease;
}

.dts__row:hover .dts__inspect,
.dts__inspect:focus-visible {
  opacity: 1;
}

.dts__inspect:hover {
  background: var(--dsw-alias-interactive-bg-hover, rgba(127,127,127,.14));
  color: var(--dts-accent, #4176e6);
}

.dts__chevron {
  flex: none;
  margin-left: auto;
  color: var(--dsw-alias-label-caption, #94a3b8);
  font-size: 9px;
  transition: transform .16s ease;
}

.dts__chevron[data-open="true"] {
  transform: rotate(90deg);
}

/* \u5C55\u5F00\u7684\u53C2\u6570/\u8F93\u51FA\uFF1A\u5F3A\u8C03\u8272\u5BFC\u8F68 + \u586B\u5145\u9762\uFF0C\u4E0E\u8C03\u7528\u884C\u660E\u663E\u5206\u5C42 */
.dts__row-body {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 320px;
  overflow-y: auto;
  margin: 2px 0 8px 25px;
  border-left: 2px solid color-mix(in srgb, var(--dts-accent, #4176e6) 24%, transparent);
  border-radius: 0 8px 8px 0;
  padding: 8px 10px;
  background: var(--dts-fill, rgba(127,127,127,.04));
  scrollbar-width: thin;
}

.dts__row-args,
.dts__row-output {
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 0;
}

.dts__row-label {
  flex: none;
  color: var(--dsw-alias-label-caption, #94a3b8);
  font-size: 10px;
  font-weight: 600;
  letter-spacing: .04em;
}

.dts__row-args code {
  color: var(--dsw-alias-label-secondary);
  font-family: var(--ds-font-family-code, monospace);
  font-size: 11px;
  line-height: 18px;
  white-space: pre-wrap;
  word-break: break-all;
}

.dts__row-pre {
  margin: 0;
  max-height: 220px;
  overflow-y: auto;
  color: var(--dsw-alias-label-secondary);
  font-family: var(--ds-font-family-code, monospace);
  font-size: 11px;
  line-height: 18px;
  white-space: pre-wrap;
  word-break: break-word;
  scrollbar-width: thin;
}

.dts__row-empty {
  color: var(--dsw-alias-label-tertiary);
  font-size: 11px;
  font-style: italic;
}

.dts__subcalls {
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  border-left: 1px solid var(--dsw-alias-border-l3, rgba(127,127,127,.16));
}

.dts__empty {
  border-radius: 12px;
  padding: 18px;
  background: var(--dts-fill, rgba(127,127,127,.04));
  color: var(--dsw-alias-label-tertiary);
  font-size: 12px;
  text-align: center;
}

/* ---- activity-kind \u5FBD\u6807\uFF08git \u63A8\u9001 / \u5B89\u88C5 / \u6784\u5EFA / \u2026\uFF09---- */
.dts__badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  flex: none;
  max-width: 96px;
  height: 18px;
  border-radius: 999px;
  padding: 0 7px;
  background: color-mix(in srgb, var(--dts-kind-color, #64748b) 15%, transparent);
  color: var(--dts-kind-color, #64748b);
  font-size: 10px;
  font-weight: 600;
  line-height: 18px;
  white-space: nowrap;
}

.dts__badge-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: none;
}

.dts__badge-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* chip \u5C3E\u90E8\u7684\u56FE\u6807\u4E13\u7528\u8FF7\u4F60\u5FBD\u6807 */
.dts__badge--mini {
  gap: 0;
  justify-content: center;
  width: 18px;
  height: 18px;
  padding: 0;
  border-radius: 50%;
  background: color-mix(in srgb, var(--dts-kind-color, #64748b) 17%, transparent);
  color: var(--dts-kind-color, #64748b);
  font-size: 10px;
  line-height: 18px;
}

/* \u603B\u7ED3\u533A\u7684 chip \u7EE7\u627F\u6240\u5C5E\u5DE5\u5177\u7684 kind \u914D\u8272 */
.dts__chip[data-kind] {
  background: color-mix(in srgb, var(--dts-kind-color, #64748b) 13%, transparent);
  color: var(--dts-kind-color, #64748b);
}

/* per-kind \u914D\u8272\uFF08badge + chip \u5171\u7528\u540C\u4E00\u4E2A CSS \u53D8\u91CF\uFF09 */
:where(.dts__badge, .dts__chip)[data-kind="git-push"] { --dts-kind-color: #a855f7; }
:where(.dts__badge, .dts__chip)[data-kind="git-commit"] { --dts-kind-color: #22c55e; }
:where(.dts__badge, .dts__chip)[data-kind="git-pull"] { --dts-kind-color: #3b82f6; }
:where(.dts__badge, .dts__chip)[data-kind="git-clone"] { --dts-kind-color: #0ea5e9; }
:where(.dts__badge, .dts__chip)[data-kind="git"] { --dts-kind-color: #16a34a; }
:where(.dts__badge, .dts__chip)[data-kind="gh"] { --dts-kind-color: #8b5cf6; }
:where(.dts__badge, .dts__chip)[data-kind="install"] { --dts-kind-color: #f97316; }
:where(.dts__badge, .dts__chip)[data-kind="build"] { --dts-kind-color: #f59e0b; }
:where(.dts__badge, .dts__chip)[data-kind="test"] { --dts-kind-color: #06b6d4; }
:where(.dts__badge, .dts__chip)[data-kind="run"] { --dts-kind-color: #6366f1; }
:where(.dts__badge, .dts__chip)[data-kind="read"] { --dts-kind-color: #64748b; }
:where(.dts__badge, .dts__chip)[data-kind="write"] { --dts-kind-color: #10b981; }
:where(.dts__badge, .dts__chip)[data-kind="edit"] { --dts-kind-color: #14b8a6; }
:where(.dts__badge, .dts__chip)[data-kind="delete"] { --dts-kind-color: #ef4444; }
:where(.dts__badge, .dts__chip)[data-kind="search"] { --dts-kind-color: #8b5cf6; }
:where(.dts__badge, .dts__chip)[data-kind="fetch"] { --dts-kind-color: #0ea5e9; }
:where(.dts__badge, .dts__chip)[data-kind="download"] { --dts-kind-color: #0ea5e9; }
:where(.dts__badge, .dts__chip)[data-kind="browser"] { --dts-kind-color: #14b8a6; }
:where(.dts__badge, .dts__chip)[data-kind="image"] { --dts-kind-color: #ec4899; }
:where(.dts__badge, .dts__chip)[data-kind="vision"] { --dts-kind-color: #d946ef; }
:where(.dts__badge, .dts__chip)[data-kind="memory"] { --dts-kind-color: #eab308; }
:where(.dts__badge, .dts__chip)[data-kind="todo"] { --dts-kind-color: #84cc16; }
:where(.dts__badge, .dts__chip)[data-kind="subagent"] { --dts-kind-color: #0ea5e9; }
:where(.dts__badge, .dts__chip)[data-kind="question"] { --dts-kind-color: #f43f5e; }
:where(.dts__badge, .dts__chip)[data-kind="command"] { --dts-kind-color: #94a3b8; }
:where(.dts__badge, .dts__chip)[data-kind="other"] { --dts-kind-color: #94a3b8; }

/* ---- \u517C\u5BB9\u4FDD\u7559\uFF1A\u975E\u805A\u5408\u8DEF\u5F84\u7684\u5185\u8054\u5DE5\u5177\u7EC4\uFF08\u5F53\u524D\u672A\u6302\u8F7D\uFF0C\u914D\u8272\u5BF9\u9F50\u65B0\u8BED\u8A00\uFF09---- */
.dts__group {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid var(--dsw-alias-border-l2, rgba(127,127,127,.22));
  border-radius: 12px;
  background: var(--dsw-alias-bg-layer-1, transparent);
}

.dts__head {
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 32px;
  padding: 4px 12px;
  color: var(--dsw-alias-label-primary);
  cursor: pointer;
  user-select: none;
}

.dts__head:hover {
  background: var(--dsw-alias-interactive-bg-hover, rgba(127,127,127,.08));
}

.dts__head-icon {
  flex: none;
  font-size: 13px;
  line-height: 1;
}

.dts__head-title {
  flex: 0 1 auto;
  min-width: 0;
  overflow: hidden;
  font-size: 13px;
  font-weight: 500;
  line-height: 24px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.dts__head-running {
  color: var(--dsw-alias-state-business-primary);
}

.dts__head-errors {
  flex: none;
  border-radius: 999px;
  padding: 0 8px;
  background: color-mix(in srgb, var(--dsw-alias-state-error-primary, #e5484d) 14%, transparent);
  color: var(--dsw-alias-state-error-primary, #e5484d);
  font-size: 11px;
  line-height: 18px;
}

.dts__body {
  display: flex;
  flex-direction: column;
  border-top: 1px solid var(--dsw-alias-border-l3, rgba(127,127,127,.16));
}

.dts__tool-list {
  display: flex;
  flex-direction: column;
  padding: 4px 0;
}

.dts__generic {
  display: flex;
  align-items: baseline;
  gap: 8px;
  min-height: 28px;
  padding: 3px 4px;
  color: var(--dsw-alias-label-secondary);
  font-size: 12px;
}

.dts__generic-name {
  flex: none;
  color: var(--dsw-alias-label-primary);
  font-weight: 600;
}

.dts__generic-args {
  min-width: 0;
  overflow: hidden;
  color: var(--dsw-alias-label-tertiary);
  font-family: var(--ds-font-family-code, monospace);
  font-size: 11px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.dts__toggle {
  align-self: flex-start;
  margin: 2px 8px 8px;
  border: 0;
  border-radius: 999px;
  padding: 2px 10px;
  background: var(--dsw-alias-interactive-bg-hover, rgba(127,127,127,.1));
  color: var(--dsw-alias-label-secondary);
  cursor: pointer;
  font-size: 11px;
  line-height: 20px;
}

.dts__toggle:hover {
  color: var(--dsw-alias-label-primary);
}

/* \u2500\u2500 \u79FB\u52A8\u7AEF\uFF1A\u6D3B\u52A8\u5F39\u7A97\u5168\u5C4F\u3001\u5BF9\u8BDD\u6D41\u5185\u4E0B\u8F7D\u5361\u7247\u4E0D\u8BBE\u6700\u5C0F\u5BBD \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
@media (max-width: 767.98px) {
  .dts__modal{width:100vw;max-width:100vw;max-height:100vh;max-height:100dvh;border-radius:0;top:0;left:0;transform:none}
  .dts__download-card{min-width:0}
}

/* \u2500\u2500 \u5C0A\u91CD\u7CFB\u7EDF\u300C\u51CF\u5C11\u52A8\u6001\u6548\u679C\u300D\uFF1A\u9AD8\u5149/\u547C\u5438/\u6ED1\u52A8\u52A8\u753B\u4E00\u5F8B\u505C \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
@media (prefers-reduced-motion: reduce) {
  .dts__entry[data-running="true"]::after { display: none; }
  .dts__entry,
  .dts__entry[data-running="true"] .dts__entry-icon,
  .dts__dot[data-state="running"],
  .dts__progress::after,
  .dts__modal,
  .dts__modal-mask {
    animation: none;
    transition: none;
  }
  .dts__entry:hover { transform: none; }
}
`;
function injectStyles() {
  if (typeof document === "undefined") return;
  if (document.getElementById("dsh-tool-summary-styles") !== null) return;
  const style = document.createElement("style");
  style.id = "dsh-tool-summary-styles";
  style.textContent = CSS;
  document.head.appendChild(style);
}

// src/client/styles.ts
var CSS2 = `
/* \u7A7A\u767D\u69FD\u4F4D\u6298\u53E0\uFF1A\u805A\u5408\u540E\u5DE5\u5177/\u601D\u8003\u8282\u70B9\u7559\u4E0B\u7684\u7A7A [data-slot] \u4E0D\u518D\u4EA7\u751F\u7A7A\u767D\u6761\u3002 */
[data-chat-flow-key]:has(> [data-slot]:empty) {
  display: none;
}

/* \u2500\u2500 \u52A9\u624B\u6B63\u6587\u5BB9\u5668\uFF1A\u4E0E\u5B98\u65B9 AssistantMarkdown \u540C\u4E00\u5957\u5B57\u7EA7\u4E0E\u8282\u594F \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
   \u5B98\u65B9 MarkdownText \u81EA\u5E26\u6392\u7248\uFF0C\u8FD9\u91CC\u53EA\u8865\u5BB9\u5668\u5C42\uFF08\u5B57\u53F7\u8F74 + \u5757\u95F4 gap + \u5BBD\u8868\u5916\u6EA2\uFF09\u3002 */
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

/* \u5BBD\u8868\u5916\u6EA2\uFF08\u4E0E\u5B98\u65B9 .body :global(.md-table-wide) \u540C\u89C4\u5219\uFF09 */
.dtt__assistant-body :global(.md-table-wide) {
  --dsh-table-spare: max(0px, calc((100cqw - var(--dsh-chat-content-width)) / 2));
  --dsh-table-lead: calc(var(--dsh-table-spare) + min(var(--dsh-chat-content-width), 100cqw) - 100%);
  box-sizing: border-box;
  width: calc(100% + var(--dsh-table-lead) + var(--dsh-table-spare));
  max-width: none;
  margin-left: calc(-1 * var(--dsh-table-lead));
  padding-left: var(--dsh-table-lead);
}

/* \u4E2D\u65AD\u56DE\u5408\u7684\u6536\u5C3E\u6807\u8BB0\uFF08\u5B98\u65B9 .stopped \u540C\u6B3E\u9759\u9ED8\u5C0F\u7B7E\uFF09\u3002 */
.dtt__stopped {
  align-self: flex-start;
  border-radius: 6px;
  padding: 0 6px;
  background: var(--dsw-alias-interactive-bg-hover);
  color: var(--dsw-alias-label-tertiary);
  font-size: 11px;
  line-height: 18px;
}

/* \u2550\u2550 \u5BF9\u8BDD\u6D41\u5361\u7247\uFF08\u81EA webui flow-card \u79FB\u690D\uFF1B\u56DE\u5408\u7ED3\u675F\u540E\u624D\u51FA\u73B0\uFF09\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
   --step\uFF1A\u56DE\u5408\u4E2D\u95F4\u7684\u5DF2\u5B8C\u6210\u7247\u6BB5\u3002\u5DE6\u4FA7\u4E00\u6761\u7AD6\u7EBF + \u6781\u6DE1\u7EB1\uFF0C\u5708\u51FA\u300C\u4E00\u6B65\u300D\u3002
   --reply\uFF1A\u56DE\u5408\u6700\u7EC8\u56DE\u590D\uFF08\u603B\u7ED3\u5361\uFF09\u3002\u63CF\u8FB9 + \u9876\u90E8\u9AD8\u5149 + \u5B8C\u6210\u6807\u8BB0\u4E0E\u7EDF\u8BA1 chip\u3002
   \u5171\u540C\u89C4\u5219\uFF1A\u8DDF\u968F\u6587\u5B57\u8272\u7684\u4E2D\u6027\u534A\u900F\u660E\u7EB1\uFF08\u6D45\u8272=\u6DE1\u9ED1\u3001\u6DF1\u8272=\u6DE1\u767D\uFF0C\u4E00\u6761\u89C4\u5219\u901A\u5403
   \u4E24\u4E2A\u4E3B\u9898\uFF09\u3002\u26A0 \u4E0D\u52A0 backdrop-filter\uFF1A\u6D88\u606F\u6D41\u91CC\u6BCF\u6761\u56DE\u590D\u90FD\u662F\u4E00\u5F20\u5361\uFF0C\u957F\u4F1A\u8BDD
   \u4E0B\u5927\u9762\u79EF\u6A21\u7CCA\u4F1A\u62D6\u57AE\u6EDA\u52A8\u6027\u80FD\u3002 */
.dtt__card {
  min-width: 0;
  border-radius: 14px;
  animation: dtt-card-in .26s cubic-bezier(.2, .8, .2, 1);
}

/* \u4E2D\u95F4\u6B65\u9AA4\uFF1A\u8F7B\u91CF\u7AD6\u7EBF\u5361 */
.dtt__card--step {
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-left: 2px solid var(--dsw-alias-border-l2, rgba(127,127,127,.22));
  border-radius: 0 12px 12px 0;
  padding: 10px 14px;
  background: color-mix(in srgb, var(--dsw-alias-label-primary) 2.5%, transparent);
}

/* \u6700\u7EC8\u56DE\u590D\uFF1A\u603B\u7ED3\u5361 */
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

/* \u9876\u8FB9\u4E00\u6761\u54C1\u724C\u84DD\u6E10\u9690\u7EC6\u7EBF\uFF1A\u53EA\u5728\u603B\u7ED3\u5361\u51FA\u73B0\uFF0C\u4F5C\u4E3A\u300C\u672C\u8F6E\u6536\u5C3E\u300D\u7684\u89C6\u89C9\u951A\u70B9\u3002 */
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

/* \u5934\u90E8\uFF1A\u5B8C\u6210\u6807\u8BB0 + \u7EDF\u8BA1 chip \u884C */
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
  font-weight: 500;
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
  gap: 4px;
  height: 20px;
  border: 1px solid var(--dsw-alias-border-l3, rgba(127,127,127,.16));
  border-radius: 4px;
  padding: 0 6px;
  color: var(--dsw-alias-label-tertiary);
  font-size: 11px;
  line-height: 20px;
  white-space: nowrap;
}

.dtt__card-chip-value {
  color: var(--dsw-alias-label-secondary);
  font-variant-numeric: tabular-nums;
  font-weight: 500;
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

/* \u2500\u2500 \u601D\u8003\u5165\u53E3 chip\uFF08\u4E0E\u5DE5\u5177 chip dts__entry \u540C\u4E00\u5957\u89C6\u89C9\u8BED\u8A00\uFF09\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
   \u80F6\u56CA 28px + \u5706\u5F62\u56FE\u6807\u5E95 + \u5F3A\u8C03\u8272\uFF08\u54C1\u724C\u84DD\uFF09\u8FD0\u884C\u6001\u3002--dtt-rea-accent \u53EA\u5728
   \u672C\u7EC4\u4EF6\u6839\u4E0A\u58F0\u660E\u4E00\u6B21\uFF0C\u5B50\u5143\u7D20\u7EE7\u627F\u3002 */
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

/* \u601D\u8003\u4E2D\uFF1A\u63CF\u8FB9/\u6587\u5B57\u67D3\u6210\u5F3A\u8C03\u8272 + \u626B\u5149\u9AD8\u5149 + \u56FE\u6807\u547C\u5438\u5708\u3002\u52A8\u753B\u4EC5\u5728\u672C\u8F6E\u8FDB\u884C\u4E2D
   \u5B58\u5728\uFF08\u5355\u5143\u7D20 background-position / box-shadow\uFF09\uFF0C\u601D\u8003\u7ED3\u675F\u5373\u6D88\u5931\u3002 */
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

/* \u5B9E\u65F6\u601D\u8003\u9884\u89C8\uFF1A\u6D41\u5F0F\u6EDA\u52A8\u6700\u65B0\u601D\u8003\u6587\u5B57\u3002\u5DE6\u4FA7\u5F3A\u8C03\u8272\u5BFC\u8F68\u70B9\u660E\u300C\u8FD9\u662F\u601D\u8003\u6D41\u300D\u3002 */
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

/* \u5C0A\u91CD\u7CFB\u7EDF\u300C\u51CF\u5C11\u52A8\u6001\u6548\u679C\u300D\u504F\u597D */
@media (prefers-reduced-motion: reduce) {
  .dtt__card { animation: none; }
  .dtt__reasoning[data-running="true"] .dtt__reasoning-btn::after { display: none; }
  .dtt__reasoning-btn,
  .dtt__reasoning[data-running="true"] .dtt__reasoning-icon {
    animation: none;
    transition: none;
  }
  .dtt__reasoning-btn:hover { transform: none; }
}

/* \u2500\u2500 \u751F\u56FE\u753B\u5ECA\u6761\uFF08dgi__\uFF1ASummaryCard \u6B63\u6587\u533A\uFF0Cgenerate_image \u7ED3\u679C\uFF09\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
   \u9ED8\u8BA4\u5355\u56FE\uFF08\u4FDD\u6301\u539F\u6BD4\u4F8B\u3001\u2264360px\uFF09\uFF1Bstrip--multi \u65F6\u5E76\u6392\u7F29\u7565\u56FE\uFF084:3 \u88C1\u526A\u3001
   \u5E8F\u53F7\u89D2\u6807\uFF09\u3002\u70B9\u51FB\u5F39\u5168\u5C4F Lightbox\uFF08z-index 1200 \u4E3A\u4F1A\u8BDD\u7EA7\u906E\u7F69\u7EDF\u4E00\u503C\uFF09\u3002 */
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

/* \u591A\u56FE\u5E76\u6392\uFF1A\u5F39\u6027\u7F29\u7565\u56FE\uFF08\u653E\u4E0D\u4E0B\u81EA\u52A8\u6362\u884C\uFF09 */
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
`;
function injectStyles2() {
  if (typeof document === "undefined") return;
  if (document.getElementById("dsh-think-tools-styles") !== null) return;
  const style = document.createElement("style");
  style.id = "dsh-think-tools-styles";
  style.textContent = CSS2;
  document.head.appendChild(style);
}
var injectGalleryStyles = injectStyles2;

// src/client/proto/styles.ts
var CSS3 = [
  "/* \u5BB9\u5668\uFF1A\u603B\u7ED3\u5361\u6B63\u6587\u5185\u7684\u72EC\u7ACB\u5361\u7247\uFF0C\u7559\u767D breathing room */",
  ".dtt-proto {",
  "  --dtp-accent: var(--dsw-alias-state-business-primary, #4176e6);",
  "  margin: 12px 0 4px;",
  "  border: 1px solid var(--dsw-alias-border-l2, rgba(127,127,127,.22));",
  "  border-radius: 16px;",
  "  padding: 16px 16px 12px;",
  "  background: var(--dsw-alias-bg-layer-1, rgba(127,127,127,.04));",
  "  animation: dtt-proto-rise .45s cubic-bezier(.2,.8,.25,1) both;",
  "}",
  "@keyframes dtt-proto-rise {",
  "  from { opacity: 0; transform: translateY(10px) }",
  "  to { opacity: 1; transform: none }",
  "}",
  ".dtt-proto__head {",
  "  display: flex; align-items: center; justify-content: space-between;",
  "  gap: 10px; flex-wrap: wrap;",
  "  padding-bottom: 12px; margin-bottom: 12px;",
  "  border-bottom: 1px solid var(--dsw-alias-border-l2, rgba(127,127,127,.18));",
  "}",
  ".dtt-proto__title { display: flex; align-items: center; gap: 8px; font-size: 12px; opacity: .65 }",
  ".dtt-proto__dot { width: 7px; height: 7px; border-radius: 50%; background: var(--dtp-accent); box-shadow: 0 0 0 4px color-mix(in srgb, var(--dtp-accent) 15%, transparent) }",
  ".dtt-proto__tabs { display: flex; gap: 6px; background: var(--dsw-alias-bg-layer-2, rgba(127,127,127,.09)); padding: 3px; border-radius: 999px; flex-wrap: wrap }",
  ".dtt-proto__tab { border: 0; background: transparent; font-size: 12px; padding: 6px 12px; border-radius: 999px; cursor: pointer; color: inherit; opacity: .65; font-family: inherit; transition: all .22s ease }",
  ".dtt-proto__tab:hover { opacity: 1; color: var(--dtp-accent); transform: translateY(-1px) }",
  ".dtt-proto__tab--active { background: var(--dsw-alias-bg-layer-1, #fff); opacity: 1; color: var(--dtp-accent); font-weight: 700; box-shadow: 0 2px 10px rgba(65,118,230,.20) }",
  ".dtt-proto__panel { animation: dtt-proto-fade .32s cubic-bezier(.2,.8,.25,1) both }",
  "@keyframes dtt-proto-fade {",
  "  from { opacity: 0; transform: translateY(8px) }",
  "  to { opacity: 1; transform: none }",
  "}",
  ".dtt-proto__heading { display: flex; align-items: center; gap: 8px; font-size: 12px; font-weight: 600; color: #4caf50; margin: 2px 0 10px }",
  '.dtt-proto__heading::before { content: ""; width: 6px; height: 6px; border-radius: 50%; background: currentColor }',
  "/* pill \u884C\uFF1Ahover \u4E0A\u6D6E + \u8F89\u5149 */",
  ".dtt-proto__pill { display: flex; align-items: center; gap: 10px; border: 1.5px solid color-mix(in srgb, var(--dtp-accent) 25%, transparent); border-radius: 999px; padding: 10px 14px; cursor: pointer; transition: all .25s ease }",
  ".dtt-proto__pill:hover { border-color: var(--dtp-accent); box-shadow: 0 6px 22px rgba(65,118,230,.18); transform: translateY(-1px) scale(1.004) }",
  ".dtt-proto__bulb { width: 30px; height: 30px; flex: none; border-radius: 50%; background: radial-gradient(circle at 35% 30%, color-mix(in srgb, var(--dtp-accent) 55%, #fff), color-mix(in srgb, var(--dtp-accent) 12%, transparent)) }",
  ".dtt-proto__tag { font-weight: 700; font-size: 12px; padding: 2px 9px; border-radius: 6px; white-space: nowrap; background: color-mix(in srgb, var(--dtp-accent) 13%, transparent); color: var(--dtp-accent) }",
  ".dtt-proto__tag--dark { background: rgba(147,197,253,.16); color: #93c5fd }",
  ".dtt-proto__desc { flex: 1; font-size: 12px; opacity: .65; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; min-width: 0 }",
  ".dtt-proto__desc--dark { color: #94a3b8; opacity: 1 }",
  ".dtt-proto__arrow { opacity: .4; transition: transform .25s ease }",
  ".dtt-proto__arrow--open { transform: rotate(90deg) }",
  ".dtt-proto__arrow--dark { color: #64748b; opacity: 1 }",
  ".dtt-proto__detail { margin-top: 10px; font-size: 12.5px; padding: 12px 14px; border-radius: 10px; border: 1px dashed color-mix(in srgb, var(--dtp-accent) 40%, transparent); background: color-mix(in srgb, var(--dtp-accent) 6%, transparent); animation: dtt-proto-fade .3s ease both }",
  "/* \u53EF\u5C55\u5F00\u5361\u7247 */",
  ".dtt-proto__expand { border: 1.5px solid color-mix(in srgb, var(--dtp-accent) 25%, transparent); border-radius: 13px; overflow: hidden; transition: all .25s ease }",
  ".dtt-proto__expand:hover { box-shadow: 0 8px 24px rgba(65,118,230,.15); transform: translateY(-2px) }",
  ".dtt-proto__expand-head { display: flex; align-items: center; gap: 10px; padding: 12px 14px; cursor: pointer }",
  ".dtt-proto__expand-body { padding: 2px 14px 14px; font-size: 12.5px; border-top: 1px dashed color-mix(in srgb, var(--dtp-accent) 30%, transparent); padding-top: 12px; margin: 0 14px 14px; padding-left: 0; padding-right: 0; animation: dtt-proto-fade .3s ease both }",
  "/* \u6D41\u5149 */",
  ".dtt-proto__glow { border-radius: 999px; padding: 2px; background: linear-gradient(110deg, #60a5fa, #a78bfa, #34d399, #60a5fa); background-size: 250% 100%; animation: dtt-proto-flow 4s linear infinite; cursor: pointer; transition: transform .25s ease }",
  ".dtt-proto__glow:hover { transform: translateY(-2px) scale(1.008) }",
  "@keyframes dtt-proto-flow { to { background-position: 250% 0 } }",
  ".dtt-proto__glow-inner { background: #0f172a; color: #e2e8f0; border-radius: 999px; padding: 10px 14px; display: flex; align-items: center; gap: 10px }",
  ".dtt-proto__spark { color: #fbbf24 }",
  "/* \u4E09\u5C0F\u5361 */",
  ".dtt-proto__minis { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-top: 12px }",
  "@media (max-width: 560px) { .dtt-proto__minis { grid-template-columns: 1fr } }",
  ".dtt-proto__mini { border: 1px solid var(--dsw-alias-border-l2, rgba(127,127,127,.2)); border-radius: 10px; padding: 10px 12px; font-size: 12px; opacity: .9; transition: all .25s ease }",
  ".dtt-proto__mini:hover { transform: translateY(-3px) scale(1.015); box-shadow: 0 10px 24px rgba(65,118,230,.15); border-color: color-mix(in srgb, var(--dtp-accent) 45%, transparent) }",
  ".dtt-proto__mini b { display: block; color: var(--dtp-accent); font-size: 12.5px; margin-bottom: 2px }",
  ".dtt-proto__hint { font-size: 11px; opacity: .45; margin-top: 10px; text-align: center }",
  "@media (prefers-reduced-motion: reduce) {",
  "  .dtt-proto, .dtt-proto__panel, .dtt-proto__detail, .dtt-proto__expand-body { animation: none }",
  "  .dtt-proto__glow { animation: none }",
  "  .dtt-proto__tab, .dtt-proto__pill, .dtt-proto__expand, .dtt-proto__glow, .dtt-proto__mini { transition: none }",
  "}"
].join("\n");
function injectProtoStyles() {
  if (typeof document === "undefined") return;
  if (document.getElementById("dsh-think-tools-proto-styles") !== null) return;
  const style = document.createElement("style");
  style.id = "dsh-think-tools-proto-styles";
  style.textContent = CSS3;
  document.head.appendChild(style);
}

// src/client/tool-summary/activity-drawer.tsx
var import_react3 = require("react");
var import_client = require("react-dom/client");
var import_dsh_client_ui_primitives2 = require("@deepseek-ai/dsh-client-ui-primitives");

// src/client/tool-summary/tool-stats.ts
function callViewOf(block) {
  const view = block.callView;
  if (view === null || view === void 0) return null;
  return typeof view === "object" ? view : null;
}
var READONLY_TOOLS = /* @__PURE__ */ new Set([
  "read",
  "grep",
  "glob",
  "web_search",
  "web_fetch",
  "search",
  "ls",
  "find",
  "list"
]);
function callName(block) {
  return "kind" in block ? block.call?.name ?? "" : block.name;
}
function isRunning(block) {
  return !("kind" in block);
}
function argsPath(argsRaw) {
  if (argsRaw === "") return void 0;
  try {
    const parsed = JSON.parse(argsRaw);
    if (typeof parsed !== "object" || parsed === null) return void 0;
    const record = parsed;
    for (const key of ["file_path", "path", "dir", "url"]) {
      const value = record[key];
      if (typeof value === "string" && value !== "") return value;
    }
    return void 0;
  } catch {
    return void 0;
  }
}
function resultText(block) {
  if (!("kind" in block)) return "";
  const parts = [];
  for (const content of block.content) {
    const c = content;
    if (c.type === "text" && typeof c.text === "string") parts.push(c.text);
  }
  return parts.join("\n");
}
function computeStats(blocks) {
  const counts = /* @__PURE__ */ new Map();
  const files = /* @__PURE__ */ new Set();
  let total = 0;
  let running = 0;
  let errors = 0;
  let readOnly = 0;
  for (const block of blocks) {
    const name = callName(block);
    total += 1;
    counts.set(name, (counts.get(name) ?? 0) + 1);
    if (isRunning(block)) running += 1;
    else if (block.isError) errors += 1;
    if (READONLY_TOOLS.has(name)) readOnly += 1;
    const path = argsPath("kind" in block ? block.call?.argsRaw ?? "" : block.argsRaw);
    if (path !== void 0) files.add(path);
  }
  const byTool = [...counts.entries()].map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
  return { total, running, errors, byTool, files: [...files], readOnly };
}
function shortenPath(path, cwd) {
  if (cwd !== void 0 && cwd !== "" && path.startsWith(cwd)) {
    const rest = path.slice(cwd.length).replace(/^[\\/]+/, "");
    return rest === "" ? path : rest;
  }
  return path;
}
function callSummary(block) {
  const name = callName(block);
  const raw = "kind" in block ? block.call?.argsRaw ?? "" : block.argsRaw;
  if (raw === "") return name;
  try {
    const parsed = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null) return `${name} \xB7 ${raw}`;
    const record = parsed;
    for (const key of ["file_path", "path", "command", "url", "pattern"]) {
      const value = record[key];
      if (typeof value === "string" && value !== "") return value;
    }
    return `${name} \xB7 ${raw.slice(0, 80)}`;
  } catch {
    return `${name} \xB7 ${raw.slice(0, 80)}`;
  }
}
function formatDuration(ms) {
  if (!Number.isFinite(ms) || ms < 0) return "--";
  const seconds = ms / 1e3;
  if (seconds < 1) return `${Math.round(ms)}ms`;
  if (seconds < 60) return `${seconds.toFixed(1)}s`;
  const minutes = Math.floor(seconds / 60);
  const rest = Math.round(seconds - minutes * 60);
  return `${minutes}m ${rest.toString().padStart(2, "0")}s`;
}
function callDurationMs(block, now) {
  if (isRunning(block)) return Math.max(0, now - block.time);
  if (block.callTime === null) return void 0;
  return Math.max(0, block.time - block.callTime);
}
function classifyActivity(block) {
  const name = callName(block);
  const raw = "kind" in block ? block.call?.argsRaw ?? "" : block.argsRaw;
  if (/download/i.test(name) || /(^|\s)(curl|wget)\b/i.test(raw)) return "download";
  const view = callViewOf(block);
  if (view !== null && view.card === "terminal") return "command";
  if (view !== null && view.card === "generic" && view.kind === "execute") return "command";
  if (/^(bash|sh|pwsh|powershell|cmd|zsh)$/i.test(name)) return "command";
  return "other";
}
function parseDownload(block) {
  const raw = "kind" in block ? block.call?.argsRaw ?? "" : block.argsRaw;
  if (raw === "") return void 0;
  let output = "";
  const out = /(?:--output-document|--output|-o|-O)\s+(?:"([^"]+)"|'([^']+)'|(\S+))/i.exec(raw);
  if (out !== null) output = out[1] ?? out[2] ?? out[3] ?? "";
  let url = "";
  const urls = raw.match(/https?:\/\/[^\s"']+/gi);
  if (urls !== null && urls.length > 0) url = urls[urls.length - 1] ?? "";
  if (url === "" && output === "") return void 0;
  return { url, output };
}

// src/client/tool-summary/activity-kind.ts
function kind(key, label) {
  return { key, label };
}
var K = {
  gitPush: kind("git-push", "\u63A8\u9001"),
  gitCommit: kind("git-commit", "\u63D0\u4EA4"),
  gitPull: kind("git-pull", "\u62C9\u53D6"),
  gitClone: kind("git-clone", "\u514B\u9686"),
  git: kind("git", "Git"),
  gh: kind("gh", "GitHub"),
  install: kind("install", "\u5B89\u88C5"),
  build: kind("build", "\u6784\u5EFA"),
  test: kind("test", "\u6D4B\u8BD5"),
  run: kind("run", "\u8FD0\u884C"),
  read: kind("read", "\u8BFB\u53D6"),
  write: kind("write", "\u5199\u5165"),
  edit: kind("edit", "\u7F16\u8F91"),
  delete: kind("delete", "\u5220\u9664"),
  search: kind("search", "\u641C\u7D22"),
  fetch: kind("fetch", "\u6293\u53D6"),
  download: kind("download", "\u4E0B\u8F7D"),
  browser: kind("browser", "\u6D4F\u89C8\u5668"),
  image: kind("image", "\u751F\u56FE"),
  vision: kind("vision", "\u8BC6\u56FE"),
  memory: kind("memory", "\u8BB0\u5FC6"),
  todo: kind("todo", "\u5F85\u529E"),
  subagent: kind("subagent", "\u5B50\u4EE3\u7406"),
  question: kind("question", "\u8BE2\u95EE"),
  command: kind("command", "\u547D\u4EE4"),
  other: kind("other", "\u5DE5\u5177")
};
var TOOL_BADGE = {
  read: K.read,
  write: K.write,
  edit: K.edit,
  grep: K.search,
  glob: K.search,
  search: K.search,
  web_search: K.search,
  web_fetch: K.fetch,
  generate_image: K.image,
  vision_describe: K.vision,
  todo_write: K.todo,
  ask_user_question: K.question,
  create_goal: K.todo,
  update_goal: K.todo,
  get_goal: K.todo,
  workflow: K.subagent,
  ralph: K.subagent,
  // Shell tools: when a command string is present it wins; these are the
  // fallback for an empty command.
  bash: K.command,
  sh: K.command,
  pwsh: K.command,
  powershell: K.command,
  cmd: K.command,
  zsh: K.command,
  fish: K.command
};
var GENERIC_KIND_BADGE = {
  read: K.read,
  edit: K.edit,
  delete: K.delete,
  move: K.edit,
  search: K.search,
  execute: K.command,
  fetch: K.fetch,
  other: K.other
};
function rawOf(block) {
  return "kind" in block ? block.call?.argsRaw ?? "" : block.argsRaw;
}
function nameOf(block) {
  return "kind" in block ? block.call?.name ?? "" : block.name;
}
function commandText(block) {
  const view = callViewOf(block);
  if (view !== null && view.card === "terminal") return view.title ?? "";
  const raw = rawOf(block);
  if (raw === "") return "";
  try {
    const parsed = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null) return "";
    const command = parsed.command;
    return typeof command === "string" ? command : "";
  } catch {
    return "";
  }
}
function classifyToolName(name) {
  if (name === "") return void 0;
  const lower = name.toLowerCase();
  const exact = TOOL_BADGE[lower];
  if (exact !== void 0) return exact;
  if (lower.startsWith("browser")) return K.browser;
  if (lower.startsWith("memory")) return K.memory;
  if (lower.startsWith("subagent")) return K.subagent;
  return void 0;
}
function classifyCommand(text) {
  const cmd = text.trim().replace(/^[$>]\s*/, "");
  if (cmd === "") return K.command;
  let m = /^git\s+(\S+)/i.exec(cmd);
  if (m !== null) {
    const sub = (m[1] ?? "").toLowerCase();
    if (sub === "push") return K.gitPush;
    if (sub === "commit") return K.gitCommit;
    if (sub === "pull" || sub === "fetch") return K.gitPull;
    if (sub === "clone") return K.gitClone;
    return K.git;
  }
  if (/^gh\b/i.test(cmd)) return K.gh;
  m = /^(npm|pnpm|yarn|bun)\s+(\S+)/i.exec(cmd);
  if (m !== null) {
    const sub = (m[2] ?? "").toLowerCase();
    if (sub === "install" || sub === "i" || sub === "add") return K.install;
    if (sub === "remove" || sub === "uninstall" || sub === "rm") return K.install;
    if (sub === "build" || sub === "compile") return K.build;
    if (sub === "test" || sub === "t") return K.test;
    if (sub === "dev" || sub === "start" || sub === "serve" || sub === "preview") return K.run;
    if (sub === "run") {
      const rest = cmd.slice((m[0] ?? "").length);
      if (/\b(build|compile|bundle)\b/i.test(rest)) return K.build;
      if (/\b(test|vitest|jest|playwright|cypress|mocha)\b/i.test(rest)) return K.test;
      return K.run;
    }
    return K.command;
  }
  if (/^npx\b/i.test(cmd)) return K.run;
  if (/^(curl|wget)\b/i.test(cmd)) return K.download;
  if (/^(tsc|vite|webpack|esbuild|rollup|make|cmake|cargo|go|dotnet)\b/i.test(cmd)) {
    if (/\b(build|compile|bundle)\b/i.test(cmd)) return K.build;
    if (/\b(test)\b/i.test(cmd)) return K.test;
    return K.run;
  }
  if (/\b(build|compile|bundle|transpile)\b/i.test(cmd)) return K.build;
  if (/\b(vitest|jest|pytest|mocha|playwright|cypress)\b/i.test(cmd)) return K.test;
  if (/^(node|python|python3|tsx|ts-node|deno)\b/i.test(cmd)) return K.run;
  return K.command;
}
function classifyKind(block) {
  const command = commandText(block);
  if (command !== "") return classifyCommand(command);
  const byName = classifyToolName(nameOf(block));
  if (byName !== void 0) return byName;
  const view = callViewOf(block);
  if (view !== null) {
    if (view.card === "diff") return K.write;
    if (view.card === "generic" && view.kind !== void 0) {
      const mapped = GENERIC_KIND_BADGE[view.kind];
      if (mapped !== void 0) return mapped;
    }
  }
  return K.other;
}
function distinctKinds(blocks) {
  const seen = /* @__PURE__ */ new Set();
  const out = [];
  for (const block of blocks) {
    const badge = classifyKind(block);
    if (seen.has(badge.key)) continue;
    seen.add(badge.key);
    out.push(badge);
  }
  return out;
}
function kindByToolName(blocks) {
  const map = /* @__PURE__ */ new Map();
  for (const block of blocks) {
    const name = nameOf(block);
    if (name === "" || map.has(name)) continue;
    map.set(name, classifyKind(block));
  }
  return map;
}

// src/client/tool-summary/use-now.ts
var import_react = require("react");
function useNow(active, intervalMs = 1e3) {
  const [now, setNow] = (0, import_react.useState)(() => Date.now());
  (0, import_react.useEffect)(() => {
    if (!active) return;
    setNow(Date.now());
    const id = setInterval(() => {
      setNow(Date.now());
    }, intervalMs);
    return () => {
      clearInterval(id);
    };
  }, [active, intervalMs]);
  return now;
}

// src/client/tool-summary/reasoning-classify.ts
var CATEGORIES = [
  {
    label: "\u5B9E\u65BD\u7F16\u5199",
    icon: "\u270F\uFE0F",
    patterns: [
      /修改/,
      /写入/,
      /实现/,
      /编辑/,
      /创建/,
      /新增/,
      /构建/,
      /重写/,
      /重构/,
      /覆盖/,
      /调用(一?下)?工具|调用generate_image|调用\d+次/,
      /写(代码|文件|脚本|函数|组件|插件|一个|好|完|下)/,
      /建(文件|目录|项目|一个)/,
      /加入|添加/,
      /定义|声明/,
      /删除|清理/,
      /生成结果|产出/
    ]
  },
  {
    label: "\u539F\u56E0\u6392\u67E5",
    icon: "\u{1F50E}",
    patterns: [
      /为什么/,
      /原因/,
      /这是因为/,
      /根本原因/,
      /导致/,
      /引发/,
      /起因/,
      /溯源/,
      /排查/,
      /诊断/,
      /定位问题/,
      /根因/,
      /为何/,
      /怎么会/,
      /哪里出(错|问题|问)/,
      /问题出在/,
      /报错|错误|异常/,
      /失败(了|原因)?/,
      /原因(是|在|何)/,
      /(找|查)(出|到|一下|一?个)?(原因|问题|根|源头)/,
      /解释一下/
    ]
  },
  {
    label: "\u9A8C\u8BC1\u786E\u8BA4",
    icon: "\u2705",
    patterns: [
      /验证/,
      /确认(了|下)?/,
      /测试/,
      /试验/,
      /成功后|成功了/,
      /完美/,
      /生效/,
      /没问题/,
      /通过/,
      /结果[:：]|输出[:：]/,
      /运行结果/,
      /实测/,
      /工作正常/,
      /验证通过/
    ]
  },
  {
    label: "\u89C4\u5212\u65B9\u6848",
    icon: "\u{1F4CB}",
    patterns: [
      /计划/,
      /方案/,
      /步骤/,
      /打算/,
      /思路/,
      /策略/,
      /规划/,
      /设计/,
      /着手/,
      /大致/,
      /拆分|分步/,
      /准备(先|要)?/,
      /接下来/,
      /先(写|建|看|试|做|处理)/,
      /应该(用|先|直接)/
    ]
  },
  {
    label: "\u51B3\u7B56\u6743\u8861",
    icon: "\u{1F914}",
    patterns: [
      /选择/,
      /决定/,
      /权衡/,
      /考虑/,
      /或者/,
      /对比/,
      /倾向于/,
      /取舍/,
      /到底|究竟/,
      /两个(方案|选择)/
    ]
  },
  {
    label: "\u603B\u7ED3\u6C47\u62A5",
    icon: "\u{1F4DD}",
    patterns: [
      /总结/,
      /汇报/,
      /结论/,
      /提交/,
      /推送/,
      /上传/,
      /发布/,
      /收尾/,
      /搞定/,
      /完成(了|时)?|全部(完成|搞定)/,
      /完成情况/,
      /回顾/
    ]
  },
  {
    label: "\u63A2\u7D22\u5206\u6790",
    icon: "\u{1F50D}",
    patterns: [
      /搜索/,
      /查找/,
      /看看/,
      /找找/,
      /检查/,
      /查看/,
      /寻找/,
      /定位/,
      /遍历/,
      /目录|结构/,
      /可能(在|是)?/,
      /在哪里/,
      /位置/,
      /配置|环境/,
      /是否|有无/,
      /没(有|看到|找到)/,
      /(更|更)广/,
      /排除/,
      /了解|认识/,
      /读(一下|取|文件|内容)/
    ]
  }
];
var FALLBACK = { label: "\u5176\u4ED6", icon: "\u{1F4AC}" };
function classifyReasoning(text) {
  let best = FALLBACK;
  let bestScore = 0;
  for (const category of CATEGORIES) {
    let score = 0;
    for (const pattern of category.patterns) {
      const global = new RegExp(pattern.source, "g");
      const matches = text.match(global);
      if (matches !== null) score += matches.length;
    }
    if (score > bestScore) {
      best = { label: category.label, icon: category.icon };
      bestScore = score;
    }
  }
  return best;
}
function groupReasoning(items) {
  const order = [];
  const map = /* @__PURE__ */ new Map();
  for (const item of items) {
    const category = classifyReasoning(item.text);
    let list = map.get(category.label);
    if (list === void 0) {
      list = [];
      map.set(category.label, list);
      order.push(category);
    }
    list.push(item);
  }
  return order.map((category) => ({ category, items: map.get(category.label) ?? [] }));
}

// src/client/tool-summary/ToolGroupNodeView.tsx
var import_react2 = require("react");
var import_dsh_client_ui_primitives = require("@deepseek-ai/dsh-client-ui-primitives");

// src/client/tool-summary/icons.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var ICONS = {
  "git-push": /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", { points: "17 8 12 3 7 8" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", { x1: "12", y1: "3", x2: "12", y2: "15" })
  ] }),
  "git-commit": /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "12", cy: "12", r: "3" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", { x1: "3", y1: "12", x2: "9", y2: "12" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", { x1: "15", y1: "12", x2: "21", y2: "12" })
  ] }),
  "git-pull": /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", { points: "7 10 12 15 17 10" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", { x1: "12", y1: "15", x2: "12", y2: "3" })
  ] }),
  "git-clone": /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { x: "8", y: "8", width: "14", height: "14", rx: "2" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" })
  ] }),
  git: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", { x1: "6", y1: "3", x2: "6", y2: "15" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "18", cy: "6", r: "3" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "6", cy: "18", r: "3" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M18 9a9 9 0 0 1-9 9" })
  ] }),
  gh: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M9 18c-4.51 2-5-2-7-2" })
  ] }),
  install: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m7.5 4.27 9 5.15" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m3.3 7 8.7 5 8.7-5" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 22V12" })
  ] }),
  build: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m15 12-8.373 8.373a1 1 0 1 1-3-3L12 9" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m18 15 4-4" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m21.5 11.5-1.914-1.914A2 2 0 0 1 19 8.172V7l-2.26-2.26a6 6 0 0 0-4.202-1.756L9 2.96l.92.82A6.18 6.18 0 0 1 12 8.4V10l2 2h1.172a2 2 0 0 1 1.414.586L18.5 14.5" })
  ] }),
  test: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M8.5 2h7" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M7 16h10" })
  ] }),
  run: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", { points: "6 3 20 12 6 21 6 3" }),
  read: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" })
  ] }),
  write: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 20h9" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z" })
  ] }),
  edit: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m15 5 4 4" })
  ] }),
  delete: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M3 6h18" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", { x1: "10", y1: "11", x2: "10", y2: "17" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", { x1: "14", y1: "11", x2: "14", y2: "17" })
  ] }),
  search: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "11", cy: "11", r: "8" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m21 21-4.3-4.3" })
  ] }),
  fetch: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "12", cy: "12", r: "10" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M2 12h20" })
  ] }),
  download: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", { points: "7 10 12 15 17 10" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", { x1: "12", y1: "15", x2: "12", y2: "3" })
  ] }),
  browser: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "12", cy: "12", r: "10" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", { points: "16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" })
  ] }),
  image: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { x: "3", y: "3", width: "18", height: "18", rx: "2" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "9", cy: "9", r: "2" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" })
  ] }),
  vision: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "12", cy: "12", r: "3" })
  ] }),
  memory: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", { cx: "12", cy: "5", rx: "9", ry: "3" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M3 5V19A9 3 0 0 0 21 19V5" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M3 12A9 3 0 0 0 21 12" })
  ] }),
  todo: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m3 17 2 2 4-4" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m3 7 2 2 4-4" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M13 6h8" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M13 12h8" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M13 18h8" })
  ] }),
  subagent: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 8V4H8" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { x: "4", y: "8", width: "16", height: "12", rx: "2" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M2 14h2" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M20 14h2" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M15 13v2" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M9 13v2" })
  ] }),
  question: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "12", cy: "12", r: "10" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 17h.01" })
  ] }),
  command: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", { points: "4 17 10 11 4 5" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", { x1: "12", y1: "19", x2: "20", y2: "19" })
  ] }),
  other: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" })
};
function KindIcon({ kind: kind2, size = 14 }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: 2,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true",
      children: ICONS[kind2] ?? ICONS.other
    }
  );
}

// src/client/tool-summary/ToolGroupNodeView.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
var NS = "dts";
var EMPTY = [];
function KindBadge({ kind: kind2 }) {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: `${NS}__badge`, "data-kind": kind2.key, title: kind2.label, children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: `${NS}__badge-icon`, "aria-hidden": true, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(KindIcon, { kind: kind2.key, size: 12 }) }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: `${NS}__badge-text`, children: kind2.label })
  ] });
}
function turnNumber(node) {
  const location = node.location;
  if (location === void 0) return void 0;
  if (location.kind === "turn" || location.kind === "step") return location.turn?.turn;
  return void 0;
}
var SimpleToolRow = (0, import_react2.memo)(function SimpleToolRow2({
  block,
  selected,
  cwd,
  openFile,
  inspectCall
}) {
  const [open, setOpen] = (0, import_react2.useState)(false);
  const running = isRunning(block);
  const name = callName(block);
  const argsRaw = "kind" in block ? block.call?.argsRaw ?? "" : block.argsRaw;
  const summary = callSummary(block);
  const output = resultText(block);
  const failed = !running && block.isError;
  const stopped = !running && !block.isError && block.error !== void 0;
  const state = running ? "running" : failed ? "error" : stopped ? "stopped" : "ok";
  const now = useNow(running);
  const duration = callDurationMs(block, now);
  const activity = classifyActivity(block);
  const kind2 = classifyKind(block);
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
    "div",
    {
      className: `${NS}__call`,
      "data-selected": selected || void 0,
      "data-state": state,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
          "div",
          {
            className: `${NS}__row`,
            role: "button",
            tabIndex: 0,
            "aria-expanded": open,
            onClick: () => {
              setOpen((value) => !value);
            },
            onKeyDown: (event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                setOpen((value) => !value);
              }
            },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: `${NS}__dot`, "data-state": state, "aria-hidden": true }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: `${NS}__row-name`, children: name || block.callId }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(KindBadge, { kind: kind2 }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: `${NS}__row-summary`, title: summary, children: summary }),
              running && duration !== void 0 && activity === "download" && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: `${NS}__row-live`, "data-kind": "download", title: "\u4E0B\u8F7D\u4E2D", children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: `${NS}__progress`, "aria-hidden": true }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { children: [
                  "\u4E0B\u8F7D\u4E2D \xB7 ",
                  formatDuration(duration)
                ] })
              ] }),
              running && duration !== void 0 && activity === "command" && duration > 1e3 && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: `${NS}__row-live`, "data-kind": "command", title: "\u6267\u884C\u4E2D", children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: `${NS}__progress`, "aria-hidden": true }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { children: [
                  "\u6267\u884C\u4E2D \xB7 ",
                  formatDuration(duration)
                ] })
              ] }),
              running && duration !== void 0 && !(activity === "download" || activity === "command" && duration > 1e3) && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: `${NS}__row-time`, "data-running": true, title: "\u8017\u65F6", children: [
                "\u23F3 ",
                formatDuration(duration)
              ] }),
              !running && duration !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: `${NS}__row-time`, title: "\u8017\u65F6", children: formatDuration(duration) }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                "button",
                {
                  type: "button",
                  className: `${NS}__inspect`,
                  title: "\u5728\u8F68\u8FF9\u4E2D\u67E5\u770B",
                  "aria-label": `\u5728\u8F68\u8FF9\u4E2D\u67E5\u770B ${name}`,
                  onClick: (event) => {
                    event.stopPropagation();
                    inspectCall(block.callId);
                  },
                  children: "\u2934"
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: `${NS}__chevron`, "data-open": open || void 0, "aria-hidden": true, children: "\u25B6" })
            ]
          }
        ),
        open && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: `${NS}__row-body`, children: [
          argsRaw !== "" && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: `${NS}__row-args`, children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: `${NS}__row-label`, children: "\u53C2\u6570" }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("code", { children: argsRaw })
          ] }),
          output !== "" && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: `${NS}__row-output`, children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: `${NS}__row-label`, children: "\u8F93\u51FA" }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("pre", { className: `${NS}__row-pre`, children: output })
          ] }),
          argsRaw === "" && output === "" && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: `${NS}__row-empty`, children: running ? "\u6267\u884C\u4E2D\u2026" : "\u65E0\u8F93\u51FA" })
        ] })
      ]
    }
  );
});
function ToolCallTreeList({ block, cwd, openFile, inspectCall }) {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: `${NS}__drawer-call`, children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      SimpleToolRow,
      {
        block,
        selected: false,
        cwd,
        openFile,
        inspectCall
      }
    ),
    block.subCalls.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: `${NS}__subcalls`, "data-subcalls": true, children: block.subCalls.map((child) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ToolCallTreeList, { block: child, cwd, openFile, inspectCall }, child.callId)) })
  ] });
}
var ToolEntry = (0, import_react2.memo)(function ToolEntry2({
  nodes,
  turn,
  turnStart,
  cwd,
  openFile,
  inspectCall
}) {
  const store = activityStore();
  (0, import_react2.useEffect)(() => {
    store.setTools(turn, nodes, cwd, turnStart);
    store.setHandlers({ openFile, inspectCall });
  }, [store, turn, nodes, cwd, turnStart, openFile, inspectCall]);
  const stats = (0, import_react2.useMemo)(() => computeStats(nodes.map((node) => node.data.root)), [nodes]);
  const readOnly = (0, import_react2.useMemo)(() => nodes.filter((node) => READONLY_TOOLS.has(callName(node.data.root))).length, [nodes]);
  const kinds = (0, import_react2.useMemo)(() => distinctKinds(nodes.map((node) => node.data.root)).slice(0, 3), [nodes]);
  const running = stats.running > 0;
  const now = useNow(running);
  const toolStart = (0, import_react2.useMemo)(() => {
    let earliest;
    for (const node of nodes) {
      const block = node.data.root;
      if (isRunning(block) && (earliest === void 0 || block.time < earliest)) earliest = block.time;
    }
    return earliest;
  }, [nodes]);
  const elapsed = toolStart !== void 0 ? Math.max(0, now - toolStart) : void 0;
  const liveActivity = (0, import_react2.useMemo)(() => {
    let hasDownload = false;
    let hasCommand = false;
    let downloadInfo;
    for (const node of nodes) {
      const block = node.data.root;
      if (!isRunning(block)) continue;
      const activity = classifyActivity(block);
      if (activity === "download") {
        hasDownload = true;
        if (downloadInfo === void 0) downloadInfo = parseDownload(block);
      } else if (activity === "command") {
        hasCommand = true;
      }
    }
    return { hasDownload, hasCommand, downloadInfo };
  }, [nodes]);
  const showDownload = running && liveActivity.hasDownload;
  const showCommand = running && !liveActivity.hasDownload && liveActivity.hasCommand && (elapsed ?? 0) > 1e3;
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: `${NS}__entry-wrap`, children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
      "button",
      {
        type: "button",
        className: `${NS}__entry`,
        "data-running": running || void 0,
        title: "\u70B9\u51FB\u6253\u5F00\u672C\u8F6E\u601D\u8003\u4E0E\u5DE5\u5177\u8C03\u7528\u8BE6\u60C5",
        "aria-label": `\u672C\u8F6E\u5DE5\u5177\u8C03\u7528 ${stats.total} \u6B21\uFF0C\u70B9\u51FB\u67E5\u770B`,
        onClick: () => {
          store.open(turn, "tools");
        },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: `${NS}__entry-icon`, "aria-hidden": true, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_dsh_client_ui_primitives.IconApiOutline14, { size: 14 }) }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: `${NS}__entry-text`, children: running ? elapsed !== void 0 ? `\u5DE5\u5177\u8C03\u7528\u4E2D \xB7 ${formatDuration(elapsed)}` : "\u5DE5\u5177\u8C03\u7528\u4E2D" : `\u5DE5\u5177 \xD7${stats.total}` }),
          !running && kinds.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: `${NS}__entry-kinds`, children: kinds.map((kind2) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
            "span",
            {
              className: `${NS}__badge ${NS}__badge--mini`,
              "data-kind": kind2.key,
              title: kind2.label,
              children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(KindIcon, { kind: kind2.key, size: 12 })
            },
            kind2.key
          )) }),
          readOnly > 0 && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: `${NS}__entry-sub`, children: [
            "\u53EA\u8BFB ",
            readOnly
          ] }),
          stats.errors > 0 && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: `${NS}__entry-err`, children: [
            "\u26A0 ",
            stats.errors
          ] })
        ]
      }
    ),
    showDownload && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: `${NS}__download-card`, children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: `${NS}__download-head`, children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_dsh_client_ui_primitives.IconDownloadOutline16, { size: 14, "aria-hidden": true }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: `${NS}__download-title`, children: [
          "\u4E0B\u8F7D\u4E2D \xB7 ",
          formatDuration(elapsed ?? 0)
        ] })
      ] }),
      liveActivity.downloadInfo?.url !== void 0 && liveActivity.downloadInfo.url !== "" && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: `${NS}__download-url`, title: liveActivity.downloadInfo.url, children: liveActivity.downloadInfo.url }),
      liveActivity.downloadInfo?.output !== void 0 && liveActivity.downloadInfo.output !== "" && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: `${NS}__download-dest`, title: liveActivity.downloadInfo.output, children: [
        "\u4FDD\u5B58\u5230 ",
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("code", { children: liveActivity.downloadInfo.output })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: `${NS}__download-progress`, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: `${NS}__progress`, "aria-hidden": true }) })
    ] }),
    showCommand && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: `${NS}__entry-live`, "data-kind": "command", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: `${NS}__progress`, "aria-hidden": true }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { children: [
        "\u6267\u884C\u4E2D \xB7 ",
        formatDuration(elapsed ?? 0)
      ] })
    ] })
  ] });
});
var ToolGroupNodeView = (0, import_react2.memo)(function ToolGroupNodeView2(props) {
  const { node, useChat, cwd, openFile, inspectCall } = props;
  const turn = turnNumber(node);
  const nodes = useChat((snapshot) => {
    if (turn === void 0) return EMPTY;
    return snapshot.locations.getTurn(turn).map((key) => snapshot.nodes.get(key)).filter((candidate) => candidate !== void 0 && candidate.kind === "tool-call");
  });
  const turnStart = useChat((snapshot) => {
    if (turn === void 0) return void 0;
    return snapshot.legacy.turnTimings.get(turn)?.startTime;
  });
  if (nodes.length === 0) return null;
  if (node.key !== nodes[0]?.key) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
    ToolEntry,
    {
      nodes,
      turn,
      turnStart,
      cwd,
      openFile,
      inspectCall
    }
  );
});

// src/client/tool-summary/activity-drawer.tsx
var import_jsx_runtime3 = require("react/jsx-runtime");
var STORE_KEY = "__dshActivityDrawerStore__";
function activityStore() {
  const globalObj = globalThis;
  const existing = globalObj[STORE_KEY];
  if (existing !== void 0) return existing;
  const listeners = /* @__PURE__ */ new Set();
  const data = /* @__PURE__ */ new Map();
  let openTurn = null;
  let activeMode = null;
  let handlers = { openFile: () => {
  }, inspectCall: () => {
  } };
  const notify = () => {
    for (const fn of [...listeners]) {
      try {
        fn();
      } catch {
      }
    }
  };
  const store = {
    get openTurn() {
      return openTurn;
    },
    get activeMode() {
      return activeMode;
    },
    open: (turn, mode) => {
      openTurn = turn;
      activeMode = mode;
      notify();
    },
    close: () => {
      openTurn = null;
      activeMode = null;
      notify();
    },
    setReasoning: (turn, items) => {
      data.set(turn, { ...data.get(turn) ?? {}, reasoning: items });
      notify();
    },
    setTools: (turn, nodes, cwd, turnStart) => {
      data.set(turn, { ...data.get(turn) ?? {}, tools: nodes, toolsCwd: cwd, turnStart });
      notify();
    },
    setHandlers: (next) => {
      handlers = next;
    },
    subscribe: (fn) => {
      listeners.add(fn);
      return () => {
        listeners.delete(fn);
      };
    },
    get: (turn) => data.get(turn),
    handlers: () => handlers
  };
  globalObj[STORE_KEY] = store;
  return store;
}
function DrawerToolSummary({ stats, cwd, openFile, kinds }) {
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dts__summary", children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dts__summary-title", children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_dsh_client_ui_primitives2.IconApiOutline14, { size: 13, "aria-hidden": true }),
      " \u5DE5\u5177\u8C03\u7528\u603B\u7ED3"
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dts__summary-line", children: [
      "\u5171 ",
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("b", { children: stats.total }),
      " \u6B21\u8C03\u7528",
      stats.running > 0 && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_jsx_runtime3.Fragment, { children: [
        " \xB7 ",
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("b", { children: stats.running }),
        " \u6B21\u8FDB\u884C\u4E2D"
      ] }),
      stats.errors > 0 && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_jsx_runtime3.Fragment, { children: [
        " \xB7 \u26A0 ",
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("b", { children: stats.errors }),
        " \u6B21\u5931\u8D25"
      ] })
    ] }),
    stats.byTool.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "dts__chips", children: stats.byTool.map(({ name, count }) => /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("span", { className: "dts__chip", "data-tool": name, "data-kind": kinds.get(name)?.key, children: [
      name,
      " \xD7",
      count
    ] }, name)) }),
    stats.files.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "dts__files", children: stats.files.map((path) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
      "button",
      {
        type: "button",
        className: "dts__file",
        title: path,
        onClick: () => {
          openFile(path);
        },
        children: shortenPath(path, cwd)
      },
      path
    )) })
  ] });
}
function ReasoningGroups({ items, activeIndex, jumpToCategory }) {
  const groups = (0, import_react3.useMemo)(() => groupReasoning(items), [items]);
  let cursor = 0;
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "dts__modal-reasoning", children: groups.map((group) => {
    const firstIndex = cursor;
    cursor += group.items.length;
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dts__modal-reasoning-group", "data-reasoning-category": group.category.label, children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dts__modal-reasoning-group-title", role: "button", tabIndex: 0, onClick: () => jumpToCategory(firstIndex), children: [
        group.category.icon,
        " ",
        group.category.label,
        " (",
        group.items.length,
        ")"
      ] }),
      group.items.map((item) => {
        const globalIndex = firstIndex + group.items.indexOf(item);
        return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
          "div",
          {
            "data-reasoning-index": globalIndex,
            "data-active": activeIndex === globalIndex || void 0,
            className: "dts__modal-reasoning-item",
            "data-running": item.running || void 0,
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "dts__modal-reasoning-item-index", "aria-hidden": true, children: globalIndex + 1 }),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "dts__modal-reasoning-item-text", children: item.text })
            ]
          },
          globalIndex
        );
      })
    ] }, group.category.label);
  }) });
}
function DrawerPanel({ turn, data, store, openFile, inspectCall }) {
  const reasoning = data?.reasoning ?? [];
  const toolNodes = data?.tools ?? [];
  const blocks = (0, import_react3.useMemo)(() => toolNodes.map((node) => node.data.root), [toolNodes]);
  const stats = (0, import_react3.useMemo)(() => computeStats(blocks), [blocks]);
  const kinds = (0, import_react3.useMemo)(() => kindByToolName(blocks), [blocks]);
  const close = () => {
    store.close();
  };
  const mode = store.activeMode;
  const reasoningRunning = reasoning.some((item) => item.running);
  const toolsRunning = stats.running > 0;
  const anyRunning = reasoningRunning || toolsRunning;
  const now = useNow(anyRunning);
  const turnStart = data?.turnStart;
  const elapsed = turnStart !== void 0 ? Math.max(0, now - turnStart) : void 0;
  const toolsElapsed = (0, import_react3.useMemo)(() => {
    let earliest;
    for (const node of toolNodes) {
      const block = node.data.root;
      if (isRunning(block) && (earliest === void 0 || block.time < earliest)) earliest = block.time;
    }
    return earliest !== void 0 ? Math.max(0, now - earliest) : void 0;
  }, [toolNodes, now]);
  const scrollRef = (0, import_react3.useRef)(null);
  const pinnedRef = (0, import_react3.useRef)(true);
  const onScrollPin = (0, import_react3.useCallback)((event) => {
    const el = event.currentTarget;
    pinnedRef.current = el.scrollHeight - el.scrollTop - el.clientHeight <= 24;
  }, []);
  (0, import_react3.useEffect)(() => {
    if (!anyRunning) return;
    const el = scrollRef.current;
    if (el === null) return;
    const distance = el.scrollHeight - el.scrollTop - el.clientHeight;
    if (!pinnedRef.current && distance > 24) return;
    el.scrollTop = el.scrollHeight;
  }, [anyRunning, now, reasoning, toolNodes]);
  const [activeIndex, setActiveIndex] = (0, import_react3.useState)(null);
  const jumpTo = (index) => {
    setActiveIndex(index);
    const el = document.querySelector(`[data-reasoning-index="${index}"]`);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_jsx_runtime3.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "dts__modal-mask", onClick: close, "aria-hidden": true }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dts__modal", role: "dialog", "aria-label": `\u7B2C ${turn} \u8F6E\u6D3B\u52A8\u8BE6\u60C5`, children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("header", { className: "dts__modal-head", children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("span", { className: "dts__modal-title", children: [
          "\u7B2C ",
          turn,
          " \u8F6E",
          mode === "reasoning" && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_jsx_runtime3.Fragment, { children: [
            " \xB7 ",
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_dsh_client_ui_primitives2.IconThinkOutline14, { size: 14, "aria-hidden": true }),
            " ",
            reasoning.length
          ] }),
          mode === "tools" && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_jsx_runtime3.Fragment, { children: [
            " \xB7 ",
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_dsh_client_ui_primitives2.IconApiOutline14, { size: 14, "aria-hidden": true }),
            " ",
            toolNodes.length
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { type: "button", className: "dts__modal-close", onClick: close, "aria-label": "\u5173\u95ED", children: "\u2715" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dts__modal-scroll", ref: scrollRef, onScroll: onScrollPin, children: [
        mode !== "tools" && reasoning.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dts__modal-panel", children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("header", { className: "dts__modal-panel-head", children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("span", { className: "dts__modal-panel-title", children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_dsh_client_ui_primitives2.IconThinkOutline14, { size: 14, "aria-hidden": true }),
              " \u601D\u8003\u8FC7\u7A0B"
            ] }),
            reasoningRunning && elapsed !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("span", { className: "dts__modal-panel-live", children: [
              "\u601D\u8003\u4E2D \xB7 ",
              formatDuration(elapsed)
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ReasoningGroups, { items: reasoning, activeIndex, jumpToCategory: jumpTo })
        ] }),
        mode !== "reasoning" && toolNodes.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dts__modal-panel", children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("header", { className: "dts__modal-panel-head", children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("span", { className: "dts__modal-panel-title", children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_dsh_client_ui_primitives2.IconApiOutline14, { size: 14, "aria-hidden": true }),
              " \u5DE5\u5177\u8C03\u7528"
            ] }),
            toolsRunning && toolsElapsed !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("span", { className: "dts__modal-panel-live", children: [
              "\u8FDB\u884C\u4E2D \xB7 ",
              formatDuration(toolsElapsed)
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(DrawerToolSummary, { stats, cwd: data?.toolsCwd, openFile, kinds }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "dts__modal-tools", children: toolNodes.map((node) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
            ToolCallTreeList,
            {
              block: node.data.root,
              cwd: data?.toolsCwd,
              openFile,
              inspectCall
            },
            node.key
          )) })
        ] }),
        reasoning.length === 0 && toolNodes.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "dts__empty", children: "\u8FD9\u4E00\u8F6E\u6CA1\u6709\u53EF\u663E\u793A\u7684\u601D\u8003\u6216\u5DE5\u5177\u8C03\u7528" })
      ] })
    ] })
  ] });
}
function DrawerApp() {
  const [openTurn, setOpenTurn] = (0, import_react3.useState)(null);
  const [data, setData] = (0, import_react3.useState)(void 0);
  (0, import_react3.useEffect)(() => {
    const store2 = activityStore();
    const render2 = () => {
      const turn = store2.openTurn;
      setOpenTurn(turn);
      setData(turn === null ? void 0 : store2.get(turn));
    };
    render2();
    return store2.subscribe(render2);
  }, []);
  if (openTurn === null) return null;
  const store = activityStore();
  const handlers = store.handlers();
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
    DrawerPanel,
    {
      turn: openTurn,
      data,
      store,
      openFile: handlers.openFile,
      inspectCall: handlers.inspectCall
    },
    openTurn
  );
}
var mounted = false;
function mountActivityDrawer() {
  if (mounted) return;
  mounted = true;
  if (typeof document === "undefined") return;
  if (document.getElementById("dsh-activity-drawer-root") !== null) return;
  const host = document.createElement("div");
  host.id = "dsh-activity-drawer-root";
  document.body.appendChild(host);
  (0, import_client.createRoot)(host).render(/* @__PURE__ */ (0, import_jsx_runtime3.jsx)(DrawerApp, {}));
}

// src/client/thinking/ThinkingStepNodeView.tsx
var import_react7 = require("react");
var import_react8 = require("react");
var import_dsh_client_ui_primitives3 = require("@deepseek-ai/dsh-client-ui-primitives");

// src/client/flow-card.tsx
var import_jsx_runtime4 = require("react/jsx-runtime");
function formatSpan(ms) {
  if (!Number.isFinite(ms) || ms < 0) return "";
  const seconds = ms / 1e3;
  if (seconds < 10) return `${Math.round(seconds * 10) / 10}s`;
  if (seconds < 60) return `${Math.round(seconds)}s`;
  const minutes = Math.floor(seconds / 60);
  const rest = Math.round(seconds - minutes * 60);
  if (minutes < 60) return `${minutes}m${rest.toString().padStart(2, "0")}s`;
  const hours = Math.floor(minutes / 60);
  return `${hours}h${(minutes % 60).toString().padStart(2, "0")}m`;
}
function CheckIcon() {
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("svg", { width: "12", height: "12", viewBox: "0 0 12 12", "aria-hidden": true, children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { d: "M2.5 6.4 4.7 8.6 9.5 3.8", fill: "none", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round", strokeLinejoin: "round" }) });
}
function Chip({ label, value, kind: kind2 }) {
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("span", { className: "dtt__card-chip", "data-kind": kind2, title: `${label} ${value}`, children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "dtt__card-chip-label", children: label }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "dtt__card-chip-value", children: value })
  ] });
}
function FlowCard({ variant, meta, interrupted, children }) {
  if (variant === "step") {
    return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "dtt__card dtt__card--step", children });
  }
  const duration = meta?.durationMs !== void 0 && meta.durationMs > 0 ? formatSpan(meta.durationMs) : "";
  const steps = meta?.steps ?? 0;
  const tools = meta?.tools ?? 0;
  const thinking = meta?.thinking ?? 0;
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
    "div",
    {
      className: "dtt__card dtt__card--reply",
      "data-interrupted": interrupted === true ? "" : void 0,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "dtt__card-head", children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("span", { className: "dtt__card-badge", "data-interrupted": interrupted === true ? "" : void 0, children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(CheckIcon, {}),
            interrupted === true ? "\u5DF2\u4E2D\u65AD" : "\u672C\u8F6E\u5B8C\u6210"
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("span", { className: "dtt__card-chips", children: [
            duration !== "" && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Chip, { label: "\u7528\u65F6", value: duration, kind: "time" }),
            steps > 1 && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Chip, { label: "\u6B65\u9AA4", value: String(steps), kind: "steps" }),
            tools > 0 && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Chip, { label: "\u5DE5\u5177", value: String(tools), kind: "tools" }),
            thinking > 0 && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Chip, { label: "\u601D\u8003", value: String(thinking), kind: "think" })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "dtt__card-body", children })
      ]
    }
  );
}

// src/client/proto/parse.ts
var TICK = String.fromCharCode(96);
var FENCE = new RegExp(TICK.repeat(3) + "proto-tabs\\s*\\n([\\s\\S]*?)" + TICK.repeat(3), "g");
function asSpec(raw) {
  if (typeof raw !== "object" || raw === null) return void 0;
  const obj = raw;
  const tabs = obj.tabs;
  if (!Array.isArray(tabs) || tabs.length === 0 || tabs.length > 4) return void 0;
  const clean = [];
  for (const item of tabs) {
    if (typeof item !== "object" || item === null) return void 0;
    const it = item;
    const pill = it.pill;
    if (typeof it.label !== "string" || typeof it.heading !== "string") return void 0;
    if (typeof pill !== "object" || pill === null) return void 0;
    if (typeof pill.tag !== "string" || typeof pill.desc !== "string" || typeof pill.detail !== "string") return void 0;
    const minis = Array.isArray(it.minis) ? it.minis : [];
    if (minis.length > 4) return void 0;
    const minisClean = [];
    for (const m of minis) {
      if (typeof m !== "object" || m === null) return void 0;
      const mm = m;
      if (typeof mm.t !== "string" || typeof mm.d !== "string") return void 0;
      minisClean.push({ t: mm.t, d: mm.d });
    }
    const variant = it.variant;
    clean.push({
      label: it.label,
      heading: it.heading,
      variant: variant === "pill" || variant === "expand" || variant === "glow" ? variant : void 0,
      pill: { tag: pill.tag, desc: pill.desc, detail: pill.detail },
      minis: minisClean
    });
  }
  return {
    title: typeof obj.title === "string" && obj.title !== "" ? obj.title : "\u4EA4\u4E92\u5F0F\u539F\u578B",
    tabs: clean
  };
}
function splitProtoTabs(text) {
  if (!text.includes("proto-tabs")) return [{ kind: "md", text }];
  const parts = [];
  let cursor = 0;
  FENCE.lastIndex = 0;
  for (; ; ) {
    const match = FENCE.exec(text);
    if (match === null) break;
    const head = text.slice(cursor, match.index);
    if (head !== "") parts.push({ kind: "md", text: head });
    let spec;
    try {
      spec = asSpec(JSON.parse(match[1]));
    } catch {
      spec = void 0;
    }
    if (spec === void 0) {
      parts.push({ kind: "md", text: match[0] });
    } else {
      parts.push({ kind: "card", spec });
    }
    cursor = match.index + match[0].length;
  }
  const tail = text.slice(cursor);
  if (tail !== "") parts.push({ kind: "md", text: tail });
  return parts.length > 0 ? parts : [{ kind: "md", text }];
}

// src/client/proto/ProtoTabsCard.tsx
var import_react4 = require("react");
var import_jsx_runtime5 = require("react/jsx-runtime");
function variantOf(tab) {
  if (tab.variant !== void 0) return tab.variant;
  return "pill";
}
function Minis({ tab }) {
  if (tab.minis.length === 0) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "dtt-proto__minis", children: tab.minis.map((m, i) => /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dtt-proto__mini", children: [
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("b", { children: m.t }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { children: m.d })
  ] }, i)) });
}
var ProtoTabsCard = (0, import_react4.memo)(function ProtoTabsCard2({ spec }) {
  const [active, setActive] = (0, import_react4.useState)(0);
  const [open, setOpen] = (0, import_react4.useState)(false);
  const safeActive = active < spec.tabs.length ? active : 0;
  const tab = spec.tabs[safeActive];
  if (tab === void 0) return null;
  const variant = variantOf(tab);
  const pick = (i) => {
    setActive(i);
    setOpen(false);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dtt-proto", children: [
    /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dtt-proto__head", children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dtt-proto__title", children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dtt-proto__dot", "aria-hidden": true }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { children: spec.title })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "dtt-proto__tabs", role: "tablist", children: spec.tabs.map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
        "button",
        {
          type: "button",
          role: "tab",
          "aria-selected": i === safeActive,
          className: i === safeActive ? "dtt-proto__tab dtt-proto__tab--active" : "dtt-proto__tab",
          onClick: () => {
            pick(i);
          },
          children: t.label
        },
        i
      )) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dtt-proto__panel", children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "dtt-proto__heading", children: tab.heading }),
      variant === "pill" && /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
          "div",
          {
            className: open ? "dtt-proto__pill dtt-proto__pill--open" : "dtt-proto__pill",
            onClick: () => {
              setOpen(!open);
            },
            role: "button",
            tabIndex: 0,
            onKeyDown: (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setOpen(!open);
              }
            },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dtt-proto__bulb", "aria-hidden": true }),
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dtt-proto__tag", children: tab.pill.tag }),
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dtt-proto__desc", children: tab.pill.desc }),
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dtt-proto__arrow", "aria-hidden": true, children: "\u203A" })
            ]
          }
        ),
        open && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "dtt-proto__detail", children: tab.pill.detail })
      ] }),
      variant === "expand" && /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dtt-proto__expand", children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
          "div",
          {
            className: "dtt-proto__expand-head",
            onClick: () => {
              setOpen(!open);
            },
            role: "button",
            tabIndex: 0,
            onKeyDown: (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setOpen(!open);
              }
            },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dtt-proto__bulb", "aria-hidden": true }),
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dtt-proto__tag", children: tab.pill.tag }),
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dtt-proto__desc", children: tab.pill.desc }),
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: open ? "dtt-proto__arrow dtt-proto__arrow--open" : "dtt-proto__arrow", "aria-hidden": true, children: "\u203A" })
            ]
          }
        ),
        open && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "dtt-proto__expand-body", children: tab.pill.detail })
      ] }),
      variant === "glow" && /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
          "div",
          {
            className: "dtt-proto__glow",
            onClick: () => {
              setOpen(!open);
            },
            role: "button",
            tabIndex: 0,
            onKeyDown: (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setOpen(!open);
              }
            },
            children: /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dtt-proto__glow-inner", children: [
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dtt-proto__spark", "aria-hidden": true, children: "\u2726" }),
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dtt-proto__tag dtt-proto__tag--dark", children: tab.pill.tag }),
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dtt-proto__desc dtt-proto__desc--dark", children: tab.pill.desc }),
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dtt-proto__arrow dtt-proto__arrow--dark", "aria-hidden": true, children: "\u203A" })
            ] })
          }
        ),
        open && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "dtt-proto__detail", children: tab.pill.detail })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Minis, { tab })
    ] }, safeActive),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "dtt-proto__hint", children: "Tab / \u5361\u7247\u90FD\u53EF\u4EE5\u76F4\u63A5\u70B9\u51FB\u4F53\u9A8C" })
  ] });
});

// src/client/generated-images/GeneratedImageStrip.tsx
var import_react5 = require("react");
var import_react_dom = require("react-dom");

// src/client/generated-images/parse.ts
function pushUnique(list, url, model) {
  if (url === "") return;
  if (!list.some((entry) => entry.url === url)) list.push({ url, model });
}
function collectFromData(data, model, list) {
  if (!Array.isArray(data)) return;
  for (const item of data) {
    if (typeof item !== "object" || item === null) continue;
    const record = item;
    if (typeof record.b64_json === "string" && record.b64_json !== "") {
      const b64 = record.b64_json.replace(/\s+/g, "");
      pushUnique(list, `data:image/png;base64,${b64}`, model);
    } else if (typeof record.url === "string" && record.url !== "") {
      pushUnique(list, record.url, model);
    }
  }
}
function parseGeneratedImageText(text) {
  const list = [];
  if (typeof text !== "string" || text.trim() === "") return list;
  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch {
    return list;
  }
  if (typeof parsed !== "object" || parsed === null) return list;
  const record = parsed;
  if (record.ok !== true) return list;
  const model = typeof record.model === "string" && record.model !== "" ? record.model : null;
  const data = record.data;
  if (typeof data === "object" && data !== null) {
    collectFromData(data.data, model, list);
  }
  if (Array.isArray(record.imageUrls)) {
    for (const item of record.imageUrls) {
      if (typeof item === "string" && item !== "") pushUnique(list, item, model);
    }
  }
  for (const key of ["imageUrl", "imageDataUrl"]) {
    const value = record[key];
    if (typeof value === "string" && value !== "") pushUnique(list, value, model);
  }
  return list;
}
var SPILL_LOCATOR_RE = /Full formatted result stored at: ([^\s]+?)\.\s+Use read with offset\/limit/i;
function findSpillLocator(text) {
  if (typeof text !== "string") return void 0;
  const match = SPILL_LOCATOR_RE.exec(text);
  const locator = match?.[1];
  return locator !== void 0 && locator !== "" ? locator : void 0;
}

// src/client/generated-images/GeneratedImageStrip.tsx
var import_jsx_runtime6 = require("react/jsx-runtime");
var NS2 = "dgi";
var cls = {
  strip: `${NS2}__strip`,
  stripMulti: `${NS2}__strip--multi`,
  row: `${NS2}__row`,
  item: `${NS2}__item`,
  thumb: `${NS2}__thumb`,
  badge: `${NS2}__badge`,
  backdrop: `${NS2}__backdrop`,
  stage: `${NS2}__stage`,
  saveButton: `${NS2}__save-button`,
  saveIcon: `${NS2}__save-icon`,
  broken: `${NS2}__broken`,
  full: `${NS2}__full`,
  metaLine: `${NS2}__meta-line`,
  model: `${NS2}__model`,
  hintLine: `${NS2}__hint-line`
};
var L = {
  open: "\u70B9\u51FB\u67E5\u770B\u5927\u56FE",
  broken: "\u56FE\u7247\u52A0\u8F7D\u5931\u8D25",
  lightboxAria: "\u751F\u56FE\u7ED3\u679C",
  save: "\u4FDD\u5B58",
  saving: "\u4FDD\u5B58\u4E2D\u2026",
  saved: "\u5DF2\u4FDD\u5B58",
  saveFailed: "\u4FDD\u5B58\u5931\u8D25",
  hint: "\u70B9\u51FB\u7A7A\u767D\u5904\u6216\u6309 Esc \u5173\u95ED",
  head: (count) => `\u751F\u56FE\u7ED3\u679C \xB7 ${count} \u5F20`
};
function filenameFrom(url, index) {
  try {
    const last = new URL(url).pathname.split("/").pop() ?? "";
    if (/\.(png|jpe?g|webp|gif)$/i.test(last)) return last;
  } catch {
  }
  return `gallery-${index + 1}.png`;
}
async function downloadFallback(url, filename) {
  try {
    const response = await fetch(url, { mode: "cors" });
    if (!response.ok) return false;
    const blob = await response.blob();
    if (blob.size === 0) return false;
    const objectUrl = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = objectUrl;
    anchor.download = filename;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    setTimeout(() => URL.revokeObjectURL(objectUrl), 6e4);
    return true;
  } catch {
    return false;
  }
}
async function saveImage(url, filename) {
  if (typeof window.showSaveFilePicker === "function") {
    let handle;
    try {
      handle = await window.showSaveFilePicker({ suggestedName: filename });
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return "canceled";
      return await downloadFallback(url, filename) ? "saved" : "failed";
    }
    try {
      const response = await fetch(url, { mode: "cors" });
      if (!response.ok) return await downloadFallback(url, filename) ? "saved" : "failed";
      const blob = await response.blob();
      if (blob.size === 0) return await downloadFallback(url, filename) ? "saved" : "failed";
      const writable = await handle.createWritable();
      await writable.write(blob);
      await writable.close();
      return "saved";
    } catch {
      return await downloadFallback(url, filename) ? "saved" : "failed";
    }
  }
  return await downloadFallback(url, filename) ? "saved" : "failed";
}
function GeneratedImageStrip({ images, model }) {
  const [openIndex, setOpenIndex] = (0, import_react5.useState)(null);
  const [broken, setBroken] = (0, import_react5.useState)(/* @__PURE__ */ new Set());
  const [saveState, setSaveState] = (0, import_react5.useState)("idle");
  (0, import_react5.useEffect)(() => {
    injectGalleryStyles();
  }, []);
  (0, import_react5.useEffect)(() => {
    if (openIndex === null) return;
    const onKey = (event) => {
      if (event.key === "Escape") setOpenIndex(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIndex]);
  const open = openIndex !== null ? images[openIndex] : void 0;
  const onSave = async () => {
    if (open === void 0 || saveState === "saving") return;
    setSaveState("saving");
    const result = await saveImage(open, filenameFrom(open, openIndex));
    setSaveState(result === "canceled" ? "idle" : result);
  };
  const markBroken = (index) => {
    setBroken((prev) => new Set(prev).add(index));
  };
  const multi = images.length > 1;
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: `${cls.strip}${multi ? ` ${cls.stripMulti}` : ""}`, children: [
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: cls.row, children: images.map((url, index) => /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
      "button",
      {
        type: "button",
        className: cls.item,
        onClick: () => {
          setOpenIndex(index);
          setSaveState("idle");
        },
        title: L.open,
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
            "img",
            {
              src: url,
              alt: `${L.head(images.length)} ${index + 1}`,
              loading: "lazy",
              decoding: "async",
              referrerPolicy: "no-referrer",
              draggable: false,
              className: cls.thumb,
              onError: () => markBroken(index)
            }
          ),
          multi && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: cls.badge, children: index + 1 })
        ]
      },
      `${url.slice(0, 48)}:${index}`
    )) }),
    open !== void 0 && (0, import_react_dom.createPortal)(
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
        "div",
        {
          className: cls.backdrop,
          role: "dialog",
          "aria-modal": "true",
          "aria-label": `${L.lightboxAria} ${openIndex + 1}`,
          onClick: () => setOpenIndex(null),
          children: /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: cls.stage, onClick: (event) => event.stopPropagation(), children: [
            /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
              "button",
              {
                type: "button",
                className: cls.saveButton,
                onClick: (event) => {
                  event.stopPropagation();
                  void onSave();
                },
                disabled: saveState === "saving",
                "aria-label": L.save,
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("svg", { className: cls.saveIcon, viewBox: "0 0 16 16", width: "14", height: "14", "aria-hidden": "true", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("path", { d: "M8 1v8m0 0L4.5 5.5M8 9l3.5-3.5", stroke: "currentColor", strokeWidth: "2", fill: "none", strokeLinecap: "round", strokeLinejoin: "round" }),
                    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("path", { d: "M2.5 11.5v2h11v-2", stroke: "currentColor", strokeWidth: "2", fill: "none", strokeLinecap: "round" })
                  ] }),
                  /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("span", { children: [
                    saveState === "idle" && L.save,
                    saveState === "saving" && L.saving,
                    saveState === "saved" && L.saved,
                    saveState === "failed" && L.saveFailed
                  ] })
                ]
              }
            ),
            broken.has(openIndex) ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: cls.broken, children: L.broken }) : /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
              "img",
              {
                src: open,
                alt: `${L.lightboxAria} ${openIndex + 1}`,
                className: cls.full,
                onError: () => markBroken(openIndex)
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: cls.metaLine, children: [
              /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("span", { children: [
                "#",
                openIndex + 1
              ] }),
              model !== null && model !== void 0 && model !== "" && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: cls.model, children: model })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: cls.hintLine, children: L.hint })
          ] })
        }
      ),
      document.body
    )
  ] });
}

// src/client/generated-images/use-generated-images.ts
var import_react6 = require("react");
var EMPTY2 = { urls: [], model: null };
var inlineCache = /* @__PURE__ */ new WeakMap();
var spillCache = /* @__PURE__ */ new Map();
var spillPending = /* @__PURE__ */ new Map();
function collectBlocks(root) {
  const out = [root];
  for (const child of root.subCalls) out.push(...collectBlocks(child));
  return out;
}
function inlineOf(block) {
  const hit = inlineCache.get(block);
  if (hit !== void 0) return hit;
  const entries = parseGeneratedImageText(resultText(block));
  inlineCache.set(block, entries);
  return entries;
}
async function loadSpill(callId, locator) {
  const hit = spillCache.get(callId);
  if (hit !== void 0) return hit;
  const running = spillPending.get(callId);
  if (running !== void 0) {
    await running;
    return spillCache.get(callId) ?? EMPTY2;
  }
  const pending = (async () => {
    let state = EMPTY2;
    try {
      const response = await fetch(
        `/api/think-tools/generated-images?file=${encodeURIComponent(locator)}`
      );
      const data = response.ok ? await response.json() : null;
      if (typeof data === "object" && data !== null) {
        const record = data;
        const urls = Array.isArray(record.urls) ? record.urls.filter((url) => typeof url === "string" && url !== "") : [];
        state = {
          urls,
          model: typeof record.model === "string" && record.model !== "" ? record.model : null
        };
      }
    } catch {
      state = EMPTY2;
    }
    spillCache.set(callId, state);
  })();
  spillPending.set(callId, pending);
  await pending;
  spillPending.delete(callId);
  return spillCache.get(callId) ?? EMPTY2;
}
function mergeImages(states) {
  const urls = [];
  let model = null;
  for (const state of states) {
    for (const url of state.urls) if (!urls.includes(url)) urls.push(url);
    if (model === null && state.model !== null) model = state.model;
  }
  return { urls, model };
}
function useGeneratedImages(toolNodes) {
  const scan = (0, import_react6.useMemo)(() => {
    const inline = [];
    const locators = [];
    for (const tool of toolNodes) {
      const root = tool.data?.root;
      if (root === void 0) continue;
      for (const block of collectBlocks(root)) {
        if (callName(block) !== "generate_image") continue;
        if (!("kind" in block) || block.isError) continue;
        const entries = inlineOf(block);
        if (entries.length > 0) {
          for (const entry of entries) {
            if (!inline.some((candidate) => candidate.url === entry.url)) inline.push(entry);
          }
        } else {
          const locator = findSpillLocator(resultText(block));
          if (locator !== void 0 && !locators.some((item) => item.callId === block.callId)) {
            locators.push({ callId: block.callId, locator });
          }
        }
      }
    }
    return { inline, locators, key: locators.map((item) => item.callId).join("|") };
  }, [toolNodes]);
  const [spill, setSpill] = (0, import_react6.useState)(EMPTY2);
  (0, import_react6.useEffect)(() => {
    if (scan.locators.length === 0) {
      setSpill(EMPTY2);
      return;
    }
    let cancelled = false;
    void (async () => {
      const cached = [];
      const miss = [];
      for (const item of scan.locators) {
        const hit = spillCache.get(item.callId);
        if (hit !== void 0) cached.push(hit);
        else miss.push(item);
      }
      let pending = mergeImages(cached);
      if (miss.length > 0) {
        const loaded = await Promise.all(miss.map((item) => loadSpill(item.callId, item.locator)));
        if (!cancelled) pending = mergeImages([...cached, ...loaded]);
      }
      if (!cancelled) setSpill(pending);
    })();
    return () => {
      cancelled = true;
    };
  }, [scan.key]);
  return (0, import_react6.useMemo)(() => {
    const states = [spill];
    if (scan.inline.length > 0) {
      states.push({ urls: scan.inline.map((entry) => entry.url), model: scan.inline[0]?.model ?? null });
    }
    return mergeImages(states);
  }, [scan, spill]);
}

// src/client/thinking/ThinkingStepNodeView.tsx
var import_jsx_runtime7 = require("react/jsx-runtime");
var EMPTY_STEPS = [];
var EMPTY_TOOLS = [];
function markdownLabelsFrom(t) {
  return {
    code: { copyLabel: t("copy"), copiedLabel: t("copied") },
    footnotes: t("markdown.footnotes")
  };
}
function ReasoningChip({ items, running, turn, thinkingStart, t }) {
  const store = activityStore();
  (0, import_react7.useEffect)(() => {
    store.setReasoning(turn, items);
  }, [store, turn, items]);
  const now = useNow(running);
  const elapsed = thinkingStart !== void 0 ? Math.max(0, now - thinkingStart) : void 0;
  const liveText = (0, import_react7.useMemo)(() => {
    if (!running) return "";
    for (let index = items.length - 1; index >= 0; index -= 1) {
      const item = items[index];
      if (item !== void 0 && item.running) return item.text;
    }
    return "";
  }, [items, running]);
  const liveRef = (0, import_react7.useRef)(null);
  const livePinnedRef = (0, import_react7.useRef)(true);
  const onLiveScroll = (0, import_react7.useCallback)((event) => {
    const el = event.currentTarget;
    livePinnedRef.current = el.scrollHeight - el.scrollTop - el.clientHeight <= 24;
  }, []);
  (0, import_react7.useEffect)(() => {
    if (!running) return;
    const el = liveRef.current;
    if (el === null) return;
    const distance = el.scrollHeight - el.scrollTop - el.clientHeight;
    if (!livePinnedRef.current && distance > 24) return;
    el.scrollTop = el.scrollHeight;
  }, [liveText, running]);
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "dtt__reasoning", "data-running": running || void 0, children: [
    /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { className: "dtt__visually-hidden", children: t("row.running") }),
    /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(
      "button",
      {
        type: "button",
        className: "dtt__reasoning-btn",
        title: "\u70B9\u51FB\u6253\u5F00\u672C\u8F6E\u601D\u8003\u8BE6\u60C5",
        "aria-label": `\u672C\u8F6E\u601D\u8003 ${items.length} \u6B21\uFF0C\u70B9\u51FB\u67E5\u770B`,
        onClick: () => {
          store.open(turn, "reasoning");
        },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { className: "dtt__reasoning-icon", "aria-hidden": true, children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_dsh_client_ui_primitives3.IconThinkOutline14, { size: 14 }) }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { children: running ? elapsed !== void 0 ? `\u601D\u8003\u4E2D \xB7 ${formatDuration(elapsed)}` : "\u601D\u8003\u4E2D\u2026" : `\u601D\u8003 \xD7${items.length}` })
        ]
      }
    ),
    running && liveText !== "" && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "dtt__reasoning-live", ref: liveRef, onScroll: onLiveScroll, "aria-live": "polite", children: liveText })
  ] });
}
function AssistantBody({ blocks, streaming, interrupted, renderMessageImages, mentions, labels, t }) {
  const hasVisible = streaming || interrupted === true || blocks.some((block) => block.kind !== "tool-call");
  const rendered = [];
  if (!hasVisible) return { hasVisible, rendered };
  for (let index = 0; index < blocks.length; index += 1) {
    const block = blocks[index];
    if (block === void 0) continue;
    switch (block.kind) {
      case "text": {
        const parts = splitProtoTabs(block.text);
        if (parts.length === 1 && parts[0]?.kind === "md") {
          rendered.push(
            /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_dsh_client_ui_primitives3.MarkdownText, { text: block.text, streaming, labels, fileMentions: mentions }, index)
          );
        } else {
          parts.forEach((part, partIndex) => {
            if (part.kind === "card") {
              rendered.push(/* @__PURE__ */ (0, import_jsx_runtime7.jsx)(ProtoTabsCard, { spec: part.spec }, `${index}-${partIndex}`));
            } else if (part.text !== "") {
              rendered.push(
                /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_dsh_client_ui_primitives3.MarkdownText, { text: part.text, streaming, labels, fileMentions: mentions }, `${index}-${partIndex}`)
              );
            }
          });
        }
        break;
      }
      case "reasoning":
        break;
      case "image": {
        const start = index;
        const group = [block];
        while (index + 1 < blocks.length) {
          const next = blocks[index + 1];
          if (next === void 0 || next.kind !== "image") break;
          group.push(next);
          index += 1;
        }
        rendered.push(
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_react8.Fragment, { children: renderMessageImages({
            images: group.map(({ attachment }) => ({ attachment })),
            align: "start"
          }) }, start)
        );
        break;
      }
      // 聚合进工具 chip（tool-call 槽位）；此处跳过。
      case "tool-call":
        break;
      default:
        rendered.push(
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
            import_dsh_client_ui_primitives3.JsonBlock,
            {
              label: t("message.unknownBlock"),
              payload: block.block,
              truncatedLabel: (total) => t("json.truncated", { total })
            },
            index
          )
        );
    }
  }
  return { hasVisible, rendered };
}
var ThinkingStepNodeView = (0, import_react7.memo)(function ThinkingStepNodeView2(props) {
  const { node, useTurnData, useChat, openFile, renderMessageImages, fileMentions, t } = props;
  const data = node.data;
  const locationTurn = node.location.kind === "turn" || node.location.kind === "step" ? node.location.turn : void 0;
  const tail = useTurnData("turn-tail");
  const owner = (0, import_react7.useMemo)(() => {
    if (locationTurn?.status !== "closed" || data.finalNode === void 0) return void 0;
    if (tail?.closing?.finalNode.seq !== data.finalNode.seq) return void 0;
    return { turn: locationTurn, seq: data.finalNode.seq, openFile };
  }, [data.finalNode, openFile, tail, locationTurn]);
  const mentions = (0, import_react7.useMemo)(
    () => owner === void 0 ? void 0 : fileMentions(owner),
    [fileMentions, owner]
  );
  const turnNumber2 = locationTurn?.turn;
  const steps = useChat((snapshot) => {
    if (turnNumber2 === void 0) return EMPTY_STEPS;
    return snapshot.locations.getTurn(turnNumber2).map((key) => snapshot.nodes.get(key)).filter((candidate) => candidate !== void 0 && candidate.kind === "assistant-step");
  });
  const toolNodes = useChat((snapshot) => {
    if (turnNumber2 === void 0) return EMPTY_TOOLS;
    return snapshot.locations.getTurn(turnNumber2).map((key) => snapshot.nodes.get(key)).filter((candidate) => candidate !== void 0 && candidate.kind === "tool-call");
  });
  const reasoningItems = (0, import_react7.useMemo)(() => steps.flatMap((step) => {
    const stepRunning = step.data.status === "running";
    return step.data.blocks.filter((block) => block.kind === "reasoning").map((block) => ({ text: block.text, running: stepRunning }));
  }), [steps]);
  const isFirstStep = steps.length > 0 && node.key === steps[0]?.key;
  const turnRunning = steps.some((step) => step.data.status === "running");
  const generated = useGeneratedImages(toolNodes);
  const galleryStepKey = useChat((snapshot) => {
    if (turnNumber2 === void 0 || generated.urls.length === 0) return void 0;
    let lastStep;
    for (const key of snapshot.locations.getTurn(turnNumber2)) {
      const candidate = snapshot.nodes.get(key);
      if (candidate === void 0) continue;
      if (candidate.kind === "assistant-step") lastStep = key;
    }
    return lastStep;
  });
  const gallery = generated.urls.length > 0 && node.key === galleryStepKey ? /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(GeneratedImageStrip, { images: generated.urls, model: generated.model }) : void 0;
  const thinkingStart = (0, import_react7.useMemo)(() => {
    const runningStep = steps.find((step) => step.data.status === "running");
    return runningStep?.data.time;
  }, [steps]);
  const visibleBlocks = (0, import_react7.useMemo)(
    () => data.blocks.filter((block) => block.kind !== "reasoning"),
    [data.blocks]
  );
  const chip = isFirstStep && reasoningItems.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
    ReasoningChip,
    {
      items: reasoningItems,
      running: turnRunning,
      turn: turnNumber2,
      thinkingStart,
      t
    }
  ) : void 0;
  const toolCount = useChat((snapshot) => {
    if (turnNumber2 === void 0) return 0;
    let count = 0;
    for (const key of snapshot.locations.getTurn(turnNumber2)) {
      if (snapshot.nodes.get(key)?.kind === "tool-call") count += 1;
    }
    return count;
  });
  const timing = useChat((snapshot) => {
    if (turnNumber2 === void 0) return void 0;
    return snapshot.legacy.turnTimings.get(turnNumber2);
  });
  const streaming = data.status === "running";
  const interrupted = data.status === "interrupted";
  const turnClosed = locationTurn?.status === "closed";
  const showCard = turnClosed === true || interrupted;
  const isClosingReply = owner !== void 0;
  const isSummary = isClosingReply || interrupted;
  const variant = !showCard ? void 0 : isSummary ? "reply" : "step";
  const cardMeta = (0, import_react7.useMemo)(() => {
    if (!showCard) return void 0;
    const start = timing?.startTime;
    const end = timing?.endTime;
    return {
      durationMs: start !== void 0 && end !== void 0 ? Math.max(0, end - start) : void 0,
      steps: steps.length,
      tools: toolCount,
      thinking: reasoningItems.length
    };
  }, [showCard, reasoningItems.length, steps.length, timing, toolCount]);
  const labels = (0, import_react7.useMemo)(() => markdownLabelsFrom(t), [t]);
  const { hasVisible, rendered } = AssistantBody({
    blocks: visibleBlocks,
    streaming,
    interrupted,
    renderMessageImages,
    mentions,
    labels,
    t
  });
  if (!hasVisible && chip === void 0 && gallery === void 0) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "dtt__assistant", "data-streaming": streaming || void 0, children: /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "dtt__assistant-body", children: [
    chip,
    rendered.length > 0 && (variant !== void 0 ? /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(FlowCard, { variant, meta: cardMeta, interrupted, children: [
      rendered,
      gallery
    ] }) : /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(import_jsx_runtime7.Fragment, { children: [
      rendered,
      gallery
    ] })),
    rendered.length === 0 && gallery,
    interrupted && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { className: "dtt__stopped", children: t("message.stopped") })
  ] }) });
});

// src/client/shot/index.tsx
var import_react11 = require("react");

// src/client/modal-animation.ts
var import_react9 = require("react");
var MODAL_ANIM_MS = 240;
var STYLE_ID = "dsh-modal-animation-styles";
var SHEET = `
@keyframes dsh-modal-slide-in {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes dsh-modal-slide-out {
  from { opacity: 1; transform: translateY(0); }
  to { opacity: 0; transform: translateY(24px); }
}
@keyframes dsh-modal-side-in {
  from { opacity: 0; transform: translateX(-14px); }
  to { opacity: 1; transform: translateX(0); }
}
@keyframes dsh-modal-side-out {
  from { opacity: 1; transform: translateX(0); }
  to { opacity: 0; transform: translateX(-10px); }
}
@keyframes dsh-modal-rise-in {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes dsh-modal-mask-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes dsh-modal-mask-out {
  from { opacity: 1; }
  to { opacity: 0; }
}
.dsh-modal-slide-in { animation: dsh-modal-slide-in ${MODAL_ANIM_MS}ms cubic-bezier(0.2, 0.8, 0.2, 1); }
.dsh-modal-slide-out { animation: dsh-modal-slide-out ${MODAL_ANIM_MS}ms cubic-bezier(0.4, 0, 0.2, 1) forwards; }
.dsh-modal-side-in { animation: dsh-modal-side-in ${MODAL_ANIM_MS}ms cubic-bezier(0.2, 0.8, 0.2, 1); }
.dsh-modal-side-out { animation: dsh-modal-side-out ${MODAL_ANIM_MS}ms cubic-bezier(0.4, 0, 0.2, 1) forwards; }
/* \u5185\u5BB9\u9519\u843D\uFF1A\u5361\u7247\u64AD\u653E\u6ED1\u5165\uFF08\u5E95\u90E8\u4E0A\u6ED1 / \u53F3\u4FA7\u6ED1\u5165\u5747\u53EF\uFF09\u65F6\u751F\u6548\uFF0C\u5173\u95ED\u65F6\u968F\u5361\u7247\u6574\u4F53\u6536\u56DE\u3002
   fill-mode \u5FC5\u987B\u7528 backwards\uFF08\u5EF6\u8FDF\u671F\u5E94\u7528 from \u5E27\u9690\u85CF\uFF09\u800C\u975E both\u2014\u2014both \u4F1A\u5728\u52A8\u753B
   \u7ED3\u675F\u540E\u6B8B\u7559 to \u5E27 transform\uFF08\u5373\u4F7F translateY(0)\uFF09\uFF0C\u4F7F\u8BE5\u5BB9\u5668\u6210\u4E3A\u540E\u4EE3 position:fixed
   \u5143\u7D20\uFF08\u56FE\u8868 tooltip\uFF09\u7684\u5305\u542B\u5757\uFF0C\u6D6E\u5C42\u6574\u4F53\u504F\u79FB\u3002 */
.dsh-modal-slide-in .dsh-modal-stagger,
.dsh-modal-side-in .dsh-modal-stagger {
  animation: dsh-modal-rise-in ${MODAL_ANIM_MS}ms cubic-bezier(0.2, 0.8, 0.2, 1) backwards;
  animation-delay: 60ms;
}
.dsh-modal-mask-in { animation: dsh-modal-mask-in ${MODAL_ANIM_MS}ms ease; }
.dsh-modal-mask-out { animation: dsh-modal-mask-out ${MODAL_ANIM_MS}ms ease forwards; }
@media (prefers-reduced-motion: reduce) {
  .dsh-modal-slide-in, .dsh-modal-slide-out, .dsh-modal-side-in, .dsh-modal-side-out,
  .dsh-modal-mask-in, .dsh-modal-mask-out { animation: none; }
  .dsh-modal-slide-in .dsh-modal-stagger, .dsh-modal-side-in .dsh-modal-stagger { animation: none; }
}
`;
function ensureModalAnimStyles() {
  if (typeof document === "undefined") return;
  if (document.getElementById(STYLE_ID) !== null) return;
  const tag = document.createElement("style");
  tag.id = STYLE_ID;
  tag.textContent = SHEET;
  document.head.appendChild(tag);
}
function useModalClose(open, onClose, durationMs = MODAL_ANIM_MS) {
  const [closing, setClosing] = (0, import_react9.useState)(false);
  const timerRef = (0, import_react9.useRef)(null);
  const closingRef = (0, import_react9.useRef)(false);
  (0, import_react9.useLayoutEffect)(() => {
    if (open) {
      closingRef.current = false;
      setClosing(false);
    }
  }, [open]);
  const requestClose = (0, import_react9.useCallback)(() => {
    if (closingRef.current) return;
    closingRef.current = true;
    setClosing(true);
    timerRef.current = window.setTimeout(() => {
      onClose();
    }, durationMs);
  }, [onClose, durationMs]);
  (0, import_react9.useEffect)(() => () => {
    if (timerRef.current !== null) window.clearTimeout(timerRef.current);
  }, []);
  return { closing, requestClose };
}

// src/client/shot/collect.ts
function assistantText(data) {
  const blocks = data.closing?.blocks ?? [];
  return blocks.filter((block) => block.kind === "text" && typeof block.text === "string").map((block) => block.text).join("");
}
function userText(data) {
  const content = data.content ?? [];
  return content.filter((block) => block.type === "text" && typeof block.text === "string").map((block) => block.text).join("");
}
function toMessage(node) {
  if (node === void 0) return null;
  if (node.kind === "user" || node.kind === "steering") {
    const text = userText(node.data);
    return text.trim() === "" ? null : { role: "user", text };
  }
  if (node.kind === "turn-tail") {
    const text = assistantText(node.data);
    return text.trim() === "" ? null : { role: "assistant", text };
  }
  return null;
}
function locateTail(snapshot, messageId) {
  let fallback = null;
  for (const key of snapshot.order) {
    const node = snapshot.nodes.get(key);
    if (node === void 0 || node.kind !== "turn-tail") continue;
    const data = node.data;
    const tail = { key, turn: typeof data.turn === "number" ? data.turn : -1 };
    if (data.closing?.finalNode?.messageId === messageId) return tail;
    if (data.closing?.finalNode !== void 0) fallback = tail;
  }
  return fallback;
}
function collectMessages(snapshot, messageId, range) {
  const located = locateTail(snapshot, messageId);
  if (range === "reply") {
    if (located === null) return [];
    const message = toMessage(snapshot.nodes.get(located.key));
    return message === null ? [] : [message];
  }
  if (range === "turn") {
    if (located === null || located.turn < 0) return [];
    const out2 = [];
    for (const key of snapshot.locations.getTurn(located.turn)) {
      const message = toMessage(snapshot.nodes.get(key));
      if (message !== null) out2.push(message);
    }
    return out2;
  }
  const out = [];
  for (const key of snapshot.order) {
    const message = toMessage(snapshot.nodes.get(key));
    if (message !== null) out.push(message);
  }
  return out;
}

// src/client/shot/Panel.tsx
var import_react10 = require("react");
var import_react_dom2 = require("react-dom");

// src/client/shot/api.ts
var ROUTE = "/api/think-tools/screenshot";
async function post(path, body) {
  const res = await fetch(`${ROUTE}${path}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body)
  });
  const data = await res.json();
  if (data.ok !== true) throw new Error(typeof data.error === "string" ? data.error : `\u8BF7\u6C42\u5931\u8D25\uFF08HTTP ${res.status}\uFF09`);
  return data;
}
async function render(request) {
  return await post("/render", request);
}
async function save(id) {
  return await post("/save", { id });
}
async function reveal() {
  await post("/reveal", {});
}

// src/shot/presets.ts
var ASPECT_RATIO = {
  "16:9": 16 / 9,
  "4:3": 4 / 3,
  "1:1": 1,
  "9:16": 9 / 16,
  "3:4": 3 / 4
};
var ASPECT_LABEL = {
  auto: "\u81EA\u9002\u5E94",
  "16:9": "16:9",
  "4:3": "4:3",
  "1:1": "1:1",
  "9:16": "9:16",
  "3:4": "3:4"
};
var SHOT_ASPECTS = ["auto", "16:9", "4:3", "1:1", "9:16", "3:4"];
var SHOT_PRESETS = {
  desktop: {
    // 960×2 = 1920 宽
    "1080p": { cssWidth: 960, scale: 2, minHeight: 540 },
    // 1280×2 = 2560 宽
    "2k": { cssWidth: 1280, scale: 2, minHeight: 720 },
    // 1280×3 = 3840 宽
    "4k": { cssWidth: 1280, scale: 3, minHeight: 720 }
  },
  phone: {
    // 540×2 = 1080 宽
    "1080p": { cssWidth: 540, scale: 2, minHeight: 900 },
    // 480×3 = 1440 宽
    "2k": { cssWidth: 480, scale: 3, minHeight: 820 },
    // 540×4 = 2160 宽
    "4k": { cssWidth: 540, scale: 4, minHeight: 900 }
  }
};
var DEVICE_LABEL = {
  desktop: "\u7535\u8111\u7248",
  phone: "\u624B\u673A\u7248"
};
var QUALITY_LABEL = {
  "1080p": "1080P",
  "2k": "2K",
  "4k": "4K"
};

// src/client/shot/styles.ts
var STYLE_ID2 = "dsh-think-tools-shot-styles";
var cls2 = {
  btn: "tsh-btn",
  btnBusy: "tsh-btn-busy",
  mask: "tsh-mask",
  panel: "tsh-panel",
  head: "tsh-head",
  title: "tsh-title",
  close: "tsh-close",
  bar: "tsh-bar",
  group: "tsh-group",
  label: "tsh-label",
  seg: "tsh-seg",
  segItem: "tsh-seg-item",
  segItemOn: "tsh-seg-item-on",
  select: "tsh-select",
  input: "tsh-input",
  stage: "tsh-stage",
  canvas: "tsh-canvas",
  img: "tsh-img",
  spinner: "tsh-spinner",
  hint: "tsh-hint",
  error: "tsh-error",
  editBar: "tsh-edit-bar",
  editHint: "tsh-edit-hint",
  editCount: "tsh-edit-count",
  editSpacer: "tsh-edit-spacer",
  editor: "tsh-editor",
  frame: "tsh-frame",
  foot: "tsh-foot",
  meta: "tsh-meta",
  actions: "tsh-actions",
  action: "tsh-action",
  primary: "tsh-primary",
  toast: "tsh-toast"
};
var SHEET2 = `
/* \u2500\u2500 \u6D88\u606F\u64CD\u4F5C\u680F\u76F8\u673A\u6309\u94AE\uFF08\u4E0E\u5B98\u65B9 IconActions \u540C\u89C4\u683C\uFF09\u2500\u2500 */
.tsh-btn{box-sizing:border-box;flex:none;display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;padding:6px;border:none;border-radius:8px;background:transparent;color:var(--dsw-alias-label-tertiary,#888);cursor:pointer;transition:color .12s,background .12s}
.tsh-btn:hover{background:var(--dsw-alias-interactive-bg-hover,rgba(255,255,255,.06));color:var(--dsw-alias-label-primary,#eee)}
.tsh-btn-busy{color:var(--dsw-alias-state-business-primary,#4176e6);cursor:default;pointer-events:none}

/* \u2500\u2500 \u906E\u7F69 + \u9762\u677F \u2500\u2500 */
.tsh-mask{position:fixed;inset:0;z-index:1399;background:var(--dsw-alias-bg-mask-1,rgba(0,0,0,.45))}
.tsh-panel{position:fixed;z-index:1400;left:50%;top:50%;transform:translate(-50%,-50%);display:flex;flex-direction:column;box-sizing:border-box;width:min(calc(100vw - 48px),2160px);height:min(calc(100vh - 40px),1720px);border:1px solid var(--dsw-alias-border-l2,rgba(255,255,255,.14));border-radius:14px;background:var(--dsw-specific-menu,var(--dsw-alias-bg-layer-2,#16181d));box-shadow:var(--dsw-shadow-lv3,0 8px 40px rgba(0,0,0,.5));overflow:hidden}
/* \u5C45\u4E2D\u9762\u677F\u7684\u5F00\u5408\u52A8\u753B\u81EA\u5E26 translate(-50%,-50%)\uFF0C\u4E0D\u80FD\u590D\u7528\u901A\u7528\u6ED1\u5165\u7C7B\uFF08\u4F1A\u8986\u76D6\u5B9A\u4F4D\uFF09\u3002 */
.tsh-panel[data-anim='in']{animation:tsh-panel-in 240ms cubic-bezier(.2,.8,.2,1)}
.tsh-panel[data-anim='out']{animation:tsh-panel-out 240ms cubic-bezier(.4,0,.2,1) both}
@keyframes tsh-panel-in{from{opacity:0;transform:translate(-50%,calc(-50% + 18px))}to{opacity:1;transform:translate(-50%,-50%)}}
@keyframes tsh-panel-out{from{opacity:1;transform:translate(-50%,-50%)}to{opacity:0;transform:translate(-50%,calc(-50% + 18px))}}

/* \u2500\u2500 \u5934\u90E8 \u2500\u2500 */
.tsh-head{flex:none;display:flex;align-items:center;gap:8px;padding:12px 16px 10px;border-bottom:1px solid var(--dsw-alias-border-l1,rgba(255,255,255,.08))}
.tsh-title{flex:1;min-width:0;font-size:15px;font-weight:600;line-height:22px;color:var(--dsw-alias-label-primary,#eee)}
.tsh-close{flex:none;display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;border:none;border-radius:8px;padding:0;background:transparent;color:var(--dsw-alias-label-secondary,#bbb);cursor:pointer}
.tsh-close:hover{background:var(--dsw-alias-interactive-bg-hover,rgba(255,255,255,.06));color:var(--dsw-alias-label-primary,#eee)}

/* \u2500\u2500 \u9009\u9879\u6761 \u2500\u2500 */
.tsh-bar{flex:none;display:flex;align-items:center;gap:18px;flex-wrap:wrap;padding:12px 16px;border-bottom:1px solid var(--dsw-alias-border-l1,rgba(255,255,255,.08))}
.tsh-group{display:flex;align-items:center;gap:8px;min-width:0}
.tsh-label{flex:none;font-size:12px;color:var(--dsw-alias-label-secondary,#bbb)}
/* \u5206\u6BB5\u9009\u62E9\uFF1A\u6574\u4F53\u4E00\u679A 32px \u9AD8\u7684\u80F6\u56CA\uFF0C\u9009\u4E2D\u9879\u8D70\u54C1\u724C\u84DD\u5E95 */
.tsh-seg{display:inline-flex;align-items:center;height:32px;padding:2px;gap:2px;border:1px solid var(--dsw-alias-border-l2,#333);border-radius:8px;background:var(--dsw-alias-bg-layer-1,transparent)}
.tsh-seg-item{display:inline-flex;align-items:center;height:26px;padding:0 12px;border:none;border-radius:6px;background:transparent;color:var(--dsw-alias-label-secondary,#bbb);font-size:13px;line-height:1;cursor:pointer;white-space:nowrap;transition:background .12s,color .12s}
.tsh-seg-item:hover{color:var(--dsw-alias-label-primary,#eee)}
.tsh-seg-item-on{background:var(--dsw-alias-state-business-primary,#4176e6);color:#fff}
.tsh-seg-item-on:hover{color:#fff}
/* \u6587\u672C\u8F93\u5165\uFF08\u6807\u9898/\u5FBD\u7AE0\u53EF\u7F16\u8F91\uFF09\uFF1A\u5B98\u65B9\u8F93\u5165\u6846\u89C4\u683C 32px / \u5706\u89D2 8 */
.tsh-input{height:32px;padding:0 10px;font-size:14px;line-height:22px;border-radius:8px;border:1px solid var(--dsw-alias-border-l2,#333);background-color:var(--dsw-alias-bg-layer-1,transparent);color:var(--dsw-alias-label-primary,#eee);min-width:0}
.tsh-input:focus{outline:none;border-color:var(--dsw-alias-state-business-primary,#4176e6)}
.tsh-input::placeholder{color:var(--dsw-alias-label-tertiary,#888)}
.tsh-group .tsh-input{width:190px}
.tsh-select{height:32px;padding:0 32px 0 10px;font-size:14px;line-height:22px;border-radius:8px;border:1px solid var(--dsw-alias-border-l2,#333);background-color:var(--dsw-alias-bg-layer-1,transparent);color:var(--dsw-alias-label-primary,#eee);max-width:200px;appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M2.5 4.5L6 8l3.5-3.5' fill='none' stroke='%2381858C' stroke-width='1.4' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 12px center;cursor:pointer}

/* \u2500\u2500 \u9884\u89C8\u53F0 \u2500\u2500 */
.tsh-stage{flex:1;min-height:0;display:flex;align-items:flex-start;justify-content:center;overflow:auto;padding:18px;background:var(--dsw-alias-bg-module-platform,rgba(255,255,255,.02));scrollbar-width:thin}
.tsh-stage::-webkit-scrollbar{width:8px;height:8px}
.tsh-stage::-webkit-scrollbar-thumb{background:var(--dsw-alias-scrollbar-bg-l2,#333);border-radius:4px}
.tsh-canvas{display:flex;align-items:center;justify-content:center;min-height:100%;width:100%}
.tsh-img{max-width:100%;height:auto;display:block;border-radius:10px;box-shadow:0 10px 34px rgba(0,0,0,.28)}
.tsh-spinner{width:26px;height:26px;border-radius:50%;border:2px solid var(--dsw-alias-border-l2,#333);border-top-color:var(--dsw-alias-state-business-primary,#4176e6);animation:tsh-spin .8s linear infinite}
@keyframes tsh-spin{to{transform:rotate(360deg)}}
.tsh-hint{display:flex;flex-direction:column;align-items:center;gap:10px;font-size:13px;color:var(--dsw-alias-label-tertiary,#888)}
.tsh-error{max-width:520px;font-size:13px;line-height:1.6;color:var(--dsw-alias-state-error-primary,#e5484d);text-align:center;word-break:break-word}

/* \u2500\u2500 \u5143\u7D20\u5220\u9664\u7F16\u8F91\u6A21\u5F0F \u2500\u2500 */
/* \u7F16\u8F91\u4E2D\uFF1A\u9009\u9879\u6761\u6574\u4F53\u51CF\u6DE1\u5E76\u7981\u6B62\u4EA4\u4E92\uFF08\u6539\u4E86\u9009\u9879\u4F1A\u8131\u79BB\u7F16\u8F91\uFF0C\u9700\u8981\u5148\u9000\u51FA\u91CD\u6E32\u67D3\uFF09\u3002 */
.tsh-panel[data-editing] .tsh-bar{opacity:.55;pointer-events:none}
/* \u7F16\u8F91\u5DE5\u5177\u6761\uFF1A\u5438\u9644\u5728\u9884\u89C8\u53F0\u9876\u90E8\uFF0C\u6ED1\u5165\u52A8\u753B\uFF08\u51CF\u5C11\u52A8\u6001\u504F\u597D\u65F6\u76F4\u63A5\u663E\u793A\uFF09\u3002 */
.tsh-edit-bar{position:sticky;top:-18px;z-index:5;flex:none;box-sizing:border-box;width:100%;display:flex;align-items:center;gap:10px;margin:-18px 0 14px;padding:9px 14px;background:var(--dsw-specific-menu,var(--dsw-alias-bg-layer-2,#16181d));border-bottom:1px solid var(--dsw-alias-border-l1,rgba(255,255,255,.08));animation:tsh-editbar-in 180ms ease}
@keyframes tsh-editbar-in{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:none}}
.tsh-edit-hint{font-size:12px;line-height:1.5;color:var(--dsw-alias-label-secondary,#bbb);min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.tsh-edit-count{flex:none;font-size:12px;color:var(--dsw-alias-label-tertiary,#888);white-space:nowrap}
.tsh-edit-count[data-n]{color:var(--dsw-alias-state-error-primary,#e5484d)}
.tsh-edit-spacer{flex:1}
/* \u7F16\u8F91\u753B\u5E03\uFF1Aiframe \u5185\u662F\u771F\u5B9E\u5BBD\u5EA6\u7684\u9875\u9762\uFF0C\u5BB9\u5668\u8D1F\u8D23\u6A2A\u7EB5\u6EDA\u52A8\u3002 */
.tsh-editor{flex:none;box-sizing:border-box;width:100%;overflow:auto;border:1px solid var(--dsw-alias-border-l2,#333);border-radius:10px;background:var(--dsw-alias-bg-module-platform,rgba(255,255,255,.02));scrollbar-width:thin}
.tsh-editor::-webkit-scrollbar{width:8px;height:8px}
.tsh-editor::-webkit-scrollbar-thumb{background:var(--dsw-alias-scrollbar-bg-l2,#333);border-radius:4px}
.tsh-frame{display:block;box-sizing:border-box;width:100%;height:1600px;border:none;background:#fff}
.tsh-frame:focus{outline:none}

/* \u2500\u2500 \u5E95\u680F \u2500\u2500 */
.tsh-foot{flex:none;display:flex;align-items:center;gap:12px;padding:12px 16px;border-top:1px solid var(--dsw-alias-border-l1,rgba(255,255,255,.08))}
.tsh-meta{flex:1;min-width:0;font-size:12px;color:var(--dsw-alias-label-tertiary,#888);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.tsh-actions{flex:none;display:flex;align-items:center;gap:8px}
.tsh-action{display:inline-flex;align-items:center;justify-content:center;height:36px;padding:0 14px;border:1px solid var(--dsw-alias-border-l2,#333);border-radius:18px;background:transparent;color:var(--dsw-alias-label-primary,#eee);font-size:14px;cursor:pointer;transition:border-color .12s,color .12s,opacity .12s;text-decoration:none}
.tsh-action:hover{border-color:var(--dsw-alias-state-business-primary,#4176e6);color:var(--dsw-alias-state-business-primary,#4176e6)}
.tsh-primary{display:inline-flex;align-items:center;justify-content:center;height:36px;padding:0 18px;border:1px solid transparent;border-radius:18px;background:var(--dsw-alias-button-primary-fill,#111);color:var(--dsw-alias-label-primary-foreground,#fff);font-size:14px;font-weight:600;cursor:pointer;transition:opacity .12s}
.tsh-primary:hover{opacity:.86}
.tsh-action:disabled,.tsh-primary:disabled{opacity:.45;cursor:default;pointer-events:none}
/* \u4FDD\u5B58/\u590D\u5236\u7ED3\u679C\u63D0\u793A\uFF08\u5E95\u680F\u5DE6\u4FA7\u539F\u5730\u66FF\u6362 meta \u6587\u6848\uFF0C\u907F\u514D\u989D\u5916\u6D6E\u5C42\uFF09 */
.tsh-toast{color:var(--dsw-alias-state-success-primary,#3fb950)}
@media (prefers-reduced-motion:reduce){
  .tsh-panel{animation:none!important}
  .tsh-spinner{animation:none}
  .tsh-edit-bar{animation:none}
}
`;
function ensureStyles() {
  if (typeof document === "undefined") return;
  if (document.getElementById(STYLE_ID2) !== null) return;
  const tag = document.createElement("style");
  tag.id = STYLE_ID2;
  tag.dataset.plugin = "dsh-think-tools";
  tag.textContent = SHEET2;
  document.head.appendChild(tag);
}

// src/client/shot/Panel.tsx
var import_jsx_runtime8 = require("react/jsx-runtime");
var RANGE_LABEL = {
  reply: "\u672C\u6761\u56DE\u590D",
  turn: "\u8FD9\u4E00\u8F6E\u95EE\u7B54",
  all: "\u6574\u6BB5\u4F1A\u8BDD"
};
var THEME_LABEL = {
  light: "\u6D45\u8272",
  dark: "\u6DF1\u8272",
  glass: "\u73BB\u7483",
  "glass-dark": "\u73BB\u7483\u6DF1\u8272"
};
function currentTheme() {
  const dark = document.body.hasAttribute("data-ds-dark-theme");
  let glass = false;
  try {
    glass = localStorage.getItem("dsh-webui.appearance.glass") === "1";
  } catch {
  }
  return glass ? dark ? "glass-dark" : "glass" : dark ? "dark" : "light";
}
function humanBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}
function EditableText(props) {
  const [draft, setDraft] = (0, import_react10.useState)(props.value);
  (0, import_react10.useEffect)(() => {
    setDraft(props.value);
  }, [props.value]);
  const commit = () => {
    const next = draft.trim();
    if (next !== props.value.trim()) props.onCommit(next);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: cls2.group, children: [
    /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { className: cls2.label, children: props.label }),
    /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
      "input",
      {
        className: cls2.input,
        value: draft,
        placeholder: props.placeholder,
        maxLength: 80,
        onChange: (event) => {
          setDraft(event.target.value);
        },
        onBlur: commit,
        onKeyDown: (event) => {
          if (event.key === "Enter") {
            event.currentTarget.blur();
          }
          if (event.key === "Escape") {
            setDraft(props.value);
            event.currentTarget.blur();
          }
        }
      }
    )
  ] });
}
function ShotPanel({ closing, onClose, collect, title }) {
  const [range, setRange] = (0, import_react10.useState)("reply");
  const [theme, setTheme] = (0, import_react10.useState)(() => currentTheme());
  const [device, setDevice] = (0, import_react10.useState)("desktop");
  const [quality, setQuality] = (0, import_react10.useState)("2k");
  const [aspect, setAspect] = (0, import_react10.useState)("auto");
  const [titleText, setTitleText] = (0, import_react10.useState)(title);
  const [labelText, setLabelText] = (0, import_react10.useState)("Kr");
  const [busy, setBusy] = (0, import_react10.useState)(false);
  const [result, setResult] = (0, import_react10.useState)(null);
  const [error, setError] = (0, import_react10.useState)(null);
  const [toast, setToast] = (0, import_react10.useState)(null);
  const [savedPath, setSavedPath] = (0, import_react10.useState)(null);
  const [editing, setEditing] = (0, import_react10.useState)(false);
  const [baseHtml, setBaseHtml] = (0, import_react10.useState)(null);
  const [editHtml, setEditHtml] = (0, import_react10.useState)(null);
  const [marked, setMarked] = (0, import_react10.useState)(0);
  const tokenRef = (0, import_react10.useRef)(0);
  const editorRef = (0, import_react10.useRef)(null);
  const messages = (0, import_react10.useMemo)(() => collect(range), [collect, range]);
  const run = (0, import_react10.useCallback)(() => {
    const token = tokenRef.current + 1;
    tokenRef.current = token;
    if (messages.length === 0) {
      setResult(null);
      setError("\u8FD9\u4E2A\u8303\u56F4\u91CC\u6CA1\u6709\u53EF\u622A\u56FE\u7684\u6587\u672C\u5185\u5BB9");
      return;
    }
    setBusy(true);
    setError(null);
    setSavedPath(null);
    setToast(null);
    render({ messages, theme, device, quality, aspect, title: titleText, label: labelText }).then((next) => {
      if (tokenRef.current !== token) return;
      setResult(next);
    }).catch((cause) => {
      if (tokenRef.current !== token) return;
      setResult(null);
      setError(cause instanceof Error ? cause.message : String(cause));
    }).finally(() => {
      if (tokenRef.current !== token) return;
      setBusy(false);
    });
  }, [messages, theme, device, quality, aspect, titleText, labelText]);
  (0, import_react10.useEffect)(() => {
    run();
  }, [run]);
  (0, import_react10.useEffect)(() => {
    if (closing) return void 0;
    const onKey = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
    };
  }, [closing, onClose]);
  const startEdit = (0, import_react10.useCallback)(() => {
    const html = result?.html;
    if (typeof html !== "string" || html === "") return;
    if (html.includes('class="mermaid"') || html.includes("class='mermaid'")) {
      setError("\u8BE5\u622A\u56FE\u5305\u542B\u6D41\u7A0B\u56FE\uFF08mermaid\uFF09\uFF0C\u6682\u4E0D\u652F\u6301\u5143\u7D20\u5220\u9664");
      return;
    }
    setBaseHtml(html);
    setEditHtml(html);
    setMarked(0);
    setEditing(true);
    setError(null);
  }, [result]);
  const resetEdit = (0, import_react10.useCallback)(() => {
    if (baseHtml === null) return;
    setEditHtml(baseHtml);
    setMarked(0);
  }, [baseHtml]);
  const stopEdit = (0, import_react10.useCallback)(() => {
    setEditing(false);
    setBaseHtml(null);
    setEditHtml(null);
    setMarked(0);
  }, []);
  (0, import_react10.useEffect)(() => {
    if (!editing || editHtml === null) return void 0;
    const frame = editorRef.current;
    if (frame === null) return void 0;
    let disposed = false;
    const attach = () => {
      if (disposed) return;
      const doc = frame.contentDocument;
      if (doc === null || doc.body === null) return;
      const style = doc.createElement("style");
      style.textContent = [
        ".webui-shot-hover{outline:2px dashed #e5484d !important;outline-offset:2px !important;cursor:crosshair !important}",
        ".webui-shot-mark{outline:2px solid #e5484d !important;outline-offset:2px !important;position:relative !important}",
        '.webui-shot-mark::after{content:"\u5DF2\u9009 \xB7 \u70B9\u51FB\u53D6\u6D88";position:absolute;top:-20px;left:0;z-index:9999;padding:1px 6px;border-radius:4px;background:#e5484d;color:#fff;font:11px/16px sans-serif;pointer-events:none;white-space:nowrap}'
      ].join("\n");
      doc.head.appendChild(style);
      const onOver = (event) => {
        const target = event.target;
        if (target === null || target === doc.body || target === doc.documentElement) return;
        doc.querySelectorAll(".webui-shot-hover").forEach((el) => el.classList.remove("webui-shot-hover"));
        if (!target.closest(".webui-shot-mark")) target.classList.add("webui-shot-hover");
      };
      const onOut = () => {
        doc.querySelectorAll(".webui-shot-hover").forEach((el) => el.classList.remove("webui-shot-hover"));
      };
      const onClick = (event) => {
        const target = event.target;
        if (target === null || target === doc.body || target === doc.documentElement) return;
        event.preventDefault();
        event.stopPropagation();
        target.classList.remove("webui-shot-hover");
        target.classList.toggle("webui-shot-mark");
        setMarked(doc.querySelectorAll(".webui-shot-mark").length);
      };
      doc.addEventListener("mouseover", onOver);
      doc.addEventListener("mouseout", onOut);
      doc.addEventListener("click", onClick, true);
      setMarked(doc.querySelectorAll(".webui-shot-mark").length);
    };
    let tries = 0;
    const timer = window.setInterval(() => {
      tries += 1;
      if (frame.contentDocument?.body != null) {
        window.clearInterval(timer);
        attach();
      } else if (tries > 100) {
        window.clearInterval(timer);
      }
    }, 10);
    return () => {
      disposed = true;
      window.clearInterval(timer);
    };
  }, [editing, editHtml]);
  const applyDelete = (0, import_react10.useCallback)(() => {
    const frame = editorRef.current;
    const doc = frame?.contentDocument;
    if (doc == null || doc.body === null) return;
    const marks = doc.querySelectorAll(".webui-shot-mark");
    if (marks.length === 0) {
      setError("\u8FD8\u6CA1\u6709\u6807\u8BB0\u4EFB\u4F55\u5143\u7D20\u2014\u2014\u5148\u70B9\u51FB\u60F3\u5220\u9664\u7684\u90E8\u5206");
      return;
    }
    doc.querySelectorAll(".webui-shot-hover").forEach((el) => el.classList.remove("webui-shot-hover"));
    marks.forEach((el) => el.remove());
    const next = `<!DOCTYPE html>${doc.documentElement.outerHTML}`;
    const token = tokenRef.current + 1;
    tokenRef.current = token;
    setBusy(true);
    setError(null);
    render({
      messages,
      theme,
      device,
      quality,
      aspect,
      title: titleText,
      label: labelText,
      html: next
    }).then((nextResult) => {
      if (tokenRef.current !== token) return;
      setResult(nextResult);
      if (typeof nextResult.html === "string") {
        setEditHtml(nextResult.html);
        setMarked(0);
      }
    }).catch((cause) => {
      if (tokenRef.current !== token) return;
      setError(cause instanceof Error ? cause.message : String(cause));
    }).finally(() => {
      if (tokenRef.current !== token) return;
      setBusy(false);
    });
  }, [messages, theme, device, quality, aspect, titleText, labelText]);
  const switchRange = (0, import_react10.useCallback)((next) => {
    setRange(next);
  }, []);
  const onSave = (0, import_react10.useCallback)(() => {
    if (result === null) return;
    save(result.id).then((saved) => {
      setSavedPath(saved.path);
      setToast("\u5DF2\u4FDD\u5B58\u5230\u672C\u5730");
    }).catch((cause) => {
      setError(cause instanceof Error ? cause.message : String(cause));
    });
  }, [result]);
  const onCopy = (0, import_react10.useCallback)(() => {
    if (result === null) return;
    const write = async () => {
      const blob = await (await fetch(result.imageUrl, { cache: "no-store" })).blob();
      await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
    };
    write().then(() => {
      setToast("\u56FE\u7247\u5DF2\u590D\u5236\u5230\u526A\u8D34\u677F");
    }).catch(() => {
      setError("\u590D\u5236\u5931\u8D25\uFF1A\u6D4F\u89C8\u5668\u62D2\u7EDD\u4E86\u526A\u8D34\u677F\u5199\u5165\uFF0C\u8BF7\u6539\u7528\u300C\u4E0B\u8F7D PNG\u300D");
    });
  }, [result]);
  const onCopyPath = (0, import_react10.useCallback)(() => {
    if (savedPath === null) return;
    navigator.clipboard?.writeText(savedPath).then(() => {
      setToast("\u8DEF\u5F84\u5DF2\u590D\u5236");
    }).catch(() => {
    });
  }, [savedPath]);
  const anim = closing ? "out" : "in";
  const preset = SHOT_PRESETS[device][quality];
  const aspectNote = aspect !== "auto" && result?.aspectLocked === false ? " \xB7 \u5185\u5BB9\u8D85\u51FA\u753B\u5E45\u5DF2\u4FDD\u7559\u5168\u957F" : "";
  const meta = savedPath !== null ? savedPath : result !== null ? `${result.width} \xD7 ${result.height} px \xB7 ${humanBytes(result.bytes)} \xB7 ${messages.length} \u6761\u6D88\u606F${aspectNote}` : "";
  return (0, import_react_dom2.createPortal)(
    /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(import_jsx_runtime8.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: cls2.mask, "aria-hidden": "true", onClick: onClose }),
      /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: cls2.panel, "data-anim": anim, "data-editing": editing || void 0, role: "dialog", "aria-modal": "true", "aria-label": "\u5BF9\u8BDD\u622A\u56FE", children: [
        /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: cls2.head, children: [
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { className: cls2.title, children: "\u5BF9\u8BDD\u622A\u56FE" }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("button", { type: "button", className: cls2.close, "aria-label": "\u5173\u95ED", onClick: onClose, children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("svg", { width: "15", height: "15", viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("path", { d: "M4 4l8 8M12 4l-8 8", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round" }) }) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: cls2.bar, children: [
          /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: cls2.group, children: [
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { className: cls2.label, children: "\u8303\u56F4" }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: cls2.seg, role: "group", "aria-label": "\u622A\u56FE\u8303\u56F4", children: ["reply", "turn", "all"].map((item) => /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
              "button",
              {
                type: "button",
                className: item === range ? `${cls2.segItem} ${cls2.segItemOn}` : cls2.segItem,
                "aria-pressed": item === range,
                onClick: () => {
                  switchRange(item);
                },
                children: RANGE_LABEL[item]
              },
              item
            )) })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: cls2.group, children: [
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { className: cls2.label, children: "\u7248\u5F0F" }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: cls2.seg, role: "group", "aria-label": "\u8BBE\u5907\u7248\u5F0F", children: Object.keys(DEVICE_LABEL).map((item) => /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
              "button",
              {
                type: "button",
                className: item === device ? `${cls2.segItem} ${cls2.segItemOn}` : cls2.segItem,
                "aria-pressed": item === device,
                onClick: () => {
                  setDevice(item);
                },
                children: DEVICE_LABEL[item]
              },
              item
            )) })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: cls2.group, children: [
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { className: cls2.label, children: "\u753B\u8D28" }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: cls2.seg, role: "group", "aria-label": "\u8F93\u51FA\u753B\u8D28", children: Object.keys(QUALITY_LABEL).map((item) => /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
              "button",
              {
                type: "button",
                className: item === quality ? `${cls2.segItem} ${cls2.segItemOn}` : cls2.segItem,
                "aria-pressed": item === quality,
                onClick: () => {
                  setQuality(item);
                },
                children: QUALITY_LABEL[item]
              },
              item
            )) })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: cls2.group, children: [
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { className: cls2.label, children: "\u753B\u5E45" }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: cls2.seg, role: "group", "aria-label": "\u753B\u5E45\u6BD4\u4F8B", children: SHOT_ASPECTS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
              "button",
              {
                type: "button",
                className: item === aspect ? `${cls2.segItem} ${cls2.segItemOn}` : cls2.segItem,
                "aria-pressed": item === aspect,
                onClick: () => {
                  setAspect(item);
                },
                children: ASPECT_LABEL[item]
              },
              item
            )) })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: cls2.group, children: [
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { className: cls2.label, children: "\u4E3B\u9898" }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
              "select",
              {
                className: cls2.select,
                value: theme,
                "aria-label": "\u622A\u56FE\u4E3B\u9898",
                disabled: editing,
                onChange: (event) => {
                  setTheme(event.target.value);
                },
                children: Object.keys(THEME_LABEL).map((item) => /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("option", { value: item, children: THEME_LABEL[item] }, item))
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: cls2.bar, children: [
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
            EditableText,
            {
              label: "\u6807\u9898",
              value: titleText,
              placeholder: "\u7559\u7A7A\u5219\u4ECE\u6D88\u606F\u6B63\u6587\u81EA\u52A8\u63A8\u5BFC",
              onCommit: setTitleText
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
            EditableText,
            {
              label: "\u5FBD\u7AE0",
              value: labelText,
              placeholder: "\u5982\uFF1AKr",
              onCommit: setLabelText
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("span", { className: cls2.meta, children: [
            "\u8F93\u51FA\u5BBD\u7EA6 ",
            preset.cssWidth * preset.scale,
            " px"
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: cls2.stage, children: editing && editHtml !== null ? /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(import_jsx_runtime8.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: cls2.editBar, children: [
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { className: cls2.editHint, children: "\u70B9\u51FB\u9875\u9762\u4E0A\u7684\u5143\u7D20\u8FDB\u884C\u5220\u9664\uFF1B\u70B9\u51FB\u5DF2\u6807\u8BB0\u7684\u5143\u7D20\u53D6\u6D88\u6807\u8BB0" }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("span", { className: cls2.editCount, "data-n": marked > 0 ? "" : void 0, children: [
              "\u5DF2\u6807\u8BB0 ",
              marked,
              " \u4E2A"
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { className: cls2.editSpacer }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
              "button",
              {
                type: "button",
                className: cls2.action,
                disabled: busy,
                onClick: resetEdit,
                children: "\u91CD\u7F6E"
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
              "button",
              {
                type: "button",
                className: cls2.action,
                disabled: busy,
                onClick: stopEdit,
                children: "\u9000\u51FA\u7F16\u8F91"
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(
              "button",
              {
                type: "button",
                className: cls2.primary,
                disabled: busy || marked === 0,
                onClick: applyDelete,
                children: [
                  "\u5220\u9664 ",
                  marked > 0 ? `${marked} \u4E2A` : "",
                  "\u5E76\u91CD\u65B0\u751F\u6210"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: cls2.editor, children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
            "iframe",
            {
              ref: editorRef,
              className: cls2.frame,
              srcDoc: editHtml,
              sandbox: "allow-same-origin",
              title: "\u622A\u56FE\u7F16\u8F91\u9884\u89C8"
            }
          ) })
        ] }) : /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: cls2.canvas, children: [
          busy && /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: cls2.hint, children: [
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { className: cls2.spinner }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { children: "\u6B63\u5728\u6E32\u67D3\u2026" })
          ] }),
          !busy && error !== null && /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: cls2.error, children: error }),
          !busy && error === null && result !== null && /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("img", { className: cls2.img, src: result.imageUrl, alt: "\u622A\u56FE\u9884\u89C8" })
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: cls2.foot, children: [
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { className: toast !== null ? `${cls2.meta} ${cls2.toast}` : cls2.meta, children: toast !== null ? toast : meta }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: cls2.actions, children: [
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("button", { type: "button", className: cls2.action, disabled: busy, onClick: () => {
              if (editing) stopEdit();
              run();
            }, children: "\u91CD\u65B0\u6E32\u67D3" }),
            result !== null && typeof result.html === "string" && !editing && /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("button", { type: "button", className: cls2.action, disabled: busy, onClick: startEdit, children: "\u5143\u7D20\u5220\u9664" }),
            savedPath !== null && /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("button", { type: "button", className: cls2.action, onClick: onCopyPath, children: "\u590D\u5236\u8DEF\u5F84" }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("button", { type: "button", className: cls2.action, disabled: result === null, onClick: onCopy, children: "\u590D\u5236\u56FE\u7247" }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
              "a",
              {
                className: cls2.action,
                href: result?.imageUrl ?? "#",
                download: "dsh-screenshot.png",
                "aria-disabled": result === null,
                onClick: (event) => {
                  if (result === null) event.preventDefault();
                },
                children: "\u4E0B\u8F7D PNG"
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("button", { type: "button", className: cls2.action, onClick: () => {
              void reveal();
            }, children: "\u6253\u5F00\u76EE\u5F55" }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("button", { type: "button", className: cls2.primary, disabled: result === null, onClick: onSave, children: "\u4FDD\u5B58" })
          ] })
        ] })
      ] })
    ] }),
    document.body
  );
}

// src/client/shot/index.tsx
var import_jsx_runtime9 = require("react/jsx-runtime");
function CameraIcon() {
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
    "path",
    {
      fill: "currentColor",
      fillRule: "evenodd",
      clipRule: "evenodd",
      d: "M9.9 1.8h-3.8l-1.3 2H3a2 2 0 0 0-2 2v6.4a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V5.8a2 2 0 0 0-2-2h-1.8l-1.3-2zM8 9.6a2.2 2.2 0 1 0 0-4.4 2.2 2.2 0 0 0 0 4.4z"
    }
  ) });
}
function AssistantScreenshotAction(props) {
  const { messageId, useChat, useSessions, sessionId } = props;
  const [open, setOpen] = (0, import_react11.useState)(false);
  const { closing, requestClose } = useModalClose(open, () => {
    setOpen(false);
  });
  const snapRef = (0, import_react11.useRef)(null);
  useChat((snapshot) => {
    snapRef.current = snapshot;
    return 0;
  });
  const collect = (0, import_react11.useCallback)((range) => {
    const snapshot = snapRef.current;
    return snapshot === null ? [] : collectMessages(snapshot, messageId, range);
  }, [messageId]);
  const title = useSessions((list) => {
    const byId = list.byId ?? {};
    return byId[String(sessionId)]?.displayTitle ?? "";
  });
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(import_jsx_runtime9.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
      "button",
      {
        type: "button",
        className: open ? `${cls2.btn} ${cls2.btnBusy}` : cls2.btn,
        "aria-label": "\u622A\u56FE\u4E3A\u56FE\u7247",
        onClick: () => {
          setOpen(true);
        },
        children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(CameraIcon, {})
      }
    ),
    open && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(ShotPanel, { closing, onClose: requestClose, collect, title })
  ] });
}
function applyMessageScreenshot(ctx) {
  ensureStyles();
  ensureModalAnimStyles();
  ctx.slots.inject("conversation.chat.assistant-actions", () => ctx.slots.register({
    name: "conversation.chat.assistant-actions",
    id: "think-tools-screenshot",
    order: 5
  }, AssistantScreenshotAction));
}

// src/client/index.ts
var inject = ["slots"];
function guarded(ctx, label, mount) {
  try {
    mount();
  } catch (error) {
    console.warn(`[dsh-think-tools] ${label} \u6302\u8F7D\u5931\u8D25\uFF1A${error instanceof Error ? error.message : String(error)}`);
  }
}
function apply(ctx) {
  guarded(ctx, "tool-summary styles", injectStyles);
  guarded(ctx, "think-tools styles", injectStyles2);
  guarded(ctx, "proto card styles", injectProtoStyles);
  guarded(ctx, "activity drawer", mountActivityDrawer);
  guarded(ctx, "screenshot seat", () => {
    applyMessageScreenshot(ctx);
  });
  guarded(ctx, "tool-call seat", () => {
    ctx.slots.inject("conversation.chat.node", () => ctx.slots.register({
      name: "conversation.chat.node",
      key: "tool-call",
      priority: -100,
      locale: "chat"
    }, ToolGroupNodeView));
  });
  guarded(ctx, "assistant-step seat", () => {
    ctx.slots.inject("conversation.chat.node", () => ctx.slots.register({
      name: "conversation.chat.node",
      key: "assistant-step",
      priority: -100,
      locale: "chat"
    }, ThinkingStepNodeView));
  });
}
return module.exports; } });
//# sourceMappingURL=client.js.map
