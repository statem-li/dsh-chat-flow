# dsh-think-tools — DSH 思考与工具调用聚合

把 dsh-webui 全家桶里的三块对话体验拆成独立插件（webui 卸载后补回），
零 DSH 源码改动，纯插件注入：

| 能力 | 说明 |
|---|---|
| **思考 chip** | 每个回合一枚紧凑 chip——思考中实时走秒（`思考中 · 12.3s`）+ 实时文字滚动预览（钉底自动跟随，向上翻阅即停），点击打开共享活动抽屉看全文；回合结束显示 `思考 ×N` |
| **工具调用聚合** | 每回合一枚芯片（`工具 ×N` + kind 迷你徽标 + 只读数/错误数）替代默认逐条工具卡片流；点击打开活动抽屉——工具调用总结卡（次数/进行中/失败/按工具分布/涉及文件点击跳转）+ 完整调用树（展开参数/输出、子调用、耗时、下载/长命令进行中实时进度） |
| **对话流卡片** | 回合中间的已完成片段 = 轻量步骤卡（左竖线 + 淡纱）；回合最终回复 = 总结卡（「本轮完成」徽章 + 用时/步骤/工具/思考统计 chip + 顶部品牌蓝渐隐细线；中断回合变琥珀色「已中断」）。**卡片只在回合结束后出现**，流式期间一律平铺，流式输出不被卡片吞掉 |
| **共享活动抽屉** | 浏览器侧居中弹窗（mask + 面板，z-index 9990/9991），思考按语义分类成组（实施编写/原因排查/验证确认/规划方案/决策权衡/总结汇报/探索分析），工具调用按树展开；Esc/点空白关闭 |

**正文链路保持官方**：text 块用官方 `MarkdownText`（ui-primitives）、图片走官方
`renderMessageImages` 槽——不引入 markstream / shiki / katex，流式渲染与内置
UI 完全一致，性能零负担（不做常驻轮询，统计全部来自已有会话投影）。

## 一句话安装（DSH）

```bash
dsh plugin --profile web add github:statem-li/dsh-think-tools
```

重启 DeepSeek Harness 即可。本包在 package.json 声明了 `dsh.bundle.patch`，
`dsh plugin add` 完成后自动加入 profile 的 bundles 层，无需手动改 patch。

本地开发安装（junction，与 dsh-done-pill 同款）：

```powershell
New-Item -ItemType Junction -Path "$env:USERPROFILE\.dsh\profiles\web\node_modules\dsh-think-tools" -Target D:\AI\Dsh\dsh-think-tools
```

并在 `~/.dsh/profiles/web/cordis.patch.yml` 追加（同 id 条目按 last-write-wins 合并）：

```yaml
- insert:
    - id: dsh-think-tools
      name: dsh-think-tools
```

## 卸载

```bash
dsh plugin --profile web remove dsh-think-tools
```

本地 junction 安装：删除 junction 与 profile patch 里的 insert 条目，重启 DSH。

## 与 dsh-webui 共存

两者都替换 `conversation.chat.node` 的 `tool-call` / `assistant-step` 槽位
（priority -100）。webui 已安装时请关闭其 `toolSummary` 模块（保留官方正文），
或不要同时安装本插件，否则同 key 同 priority 的第二个注册会抛错。

> 活动抽屉 window 总线键 `__dshActivityDrawerStore__` 与 webui 相同：若
> webui 的 toolSummary 同时开启，两者共享同一抽屉（last-write-wins）。

## 构建（Windows）

```powershell
node build.mjs    # esbuild 双 bundle：lib/index.js(host) + lib/client.js(browser)
```

- host 半身无运行时依赖（no-op apply），产物自包含，构建末尾有
  `assertHostExternals()` 守卫拦截不可解析的 specifier；
- client 半身 external react 家族 + `@deepseek-ai/*`（DSH client 模块表
  运行时提供实例），CJS 工厂包 `window.__ModuleLoader__.load` 契约；
- esbuild 解析顺序：本地 node_modules → DSH checkout pnpm store（可设
  `DSH_CHECKOUT` 环境变量）。

类型检查（借用 DSH checkout 的 typescript，paths 已指向同一 checkout）：

```powershell
node <DSH>/node_modules/.pnpm/typescript@*/node_modules/typescript/bin/tsc -p tsconfig.json --noEmit
```

## 冒烟测试

```powershell
node scripts/smoke-host.mjs     # 裸 node 加载 lib/index.js，校验插件形状
node scripts/smoke-client.mjs   # node:vm 假 window.__ModuleLoader__ + DOM，
                                # 校验 apply 挂抽屉/样式/两个槽位注册
```

## 结构

```
src/
├── host.ts                          — host 半身（no-op，保持 Cordis 行激活）
└── client/
    ├── index.ts                     — client 入口：样式 + 抽屉 + 两个槽位注册
    ├── styles.ts                    — 思考 chip + 对话流卡片样式（dtt__ 命名空间）
    ├── flow-card.tsx                — 步骤卡 / 总结卡（ReplyCardMeta 统计）
    ├── thinking/
    │   └── ThinkingStepNodeView.tsx — assistant-step 替换：回合聚合思考 chip +
    │                                  卡片门控（回合结束才出卡）+ 官方正文渲染
    └── tool-summary/                — 工具聚合（自 webui/dsh-tool-summary 移植）
        ├── ToolGroupNodeView.tsx    — 每回合一枚工具 chip + 抽屉入口
        ├── activity-drawer.tsx      — 共享活动抽屉（window 总线 + 居中弹窗）
        ├── tool-stats.ts            — 统计/耗时/下载解析纯函数（callView 防御式读取）
        ├── activity-kind.ts         — 调用分类徽标（git push/构建/测试…）
        ├── reasoning-classify.ts    — 思考语义分类（关键词打分）
        ├── icons.tsx                — kind 徽标 SVG 字形
        ├── use-now.ts               — 走秒时钟
        └── styles.ts                — 工具聚合样式（dts__ 命名空间）
scripts/
├── smoke-host.mjs
└── smoke-client.mjs
```

## 许可

MIT
