# dsh-chat-flow — DSH 对话流增强

把 dsh-webui 全家桶里的四块对话体验拆成独立插件（webui 卸载后补回），
零 DSH 源码改动，纯插件注入：

| 能力 | 说明 |
|---|---|
| **思考 chip** | 每个回合一枚紧凑 chip——思考中实时走秒（`思考中 · 12.3s`）+ 实时文字滚动预览（钉底自动跟随，向上翻阅即停），点击打开共享活动抽屉看全文；回合结束显示 `思考 ×N` |
| **工具调用聚合** | 每回合一枚芯片（`工具 ×N` + kind 迷你徽标 + 只读数/错误数）替代默认逐条工具卡片流；点击打开活动抽屉——工具调用总结卡（次数/进行中/失败/按工具分布/涉及文件点击跳转）+ 完整调用树（展开参数/输出、子调用、耗时、下载/长命令进行中实时进度） |
| **对话流卡片** | 总结卡头部 chip 含 Git 操作计数（本轮 git 调用次数，悬停看动词摘要）；头部方案A分层（标签弱化 + 数值加强 + 状态圆点，Git 高亮蓝，hover 上浮）；全卡片去底色（1px 超细发丝边条 + 轻阴影，深浅主题各配色） | 回合中间的已完成片段 = 轻量步骤卡（无框）；回合最终回复 = 总结卡（「本轮完成」徽章 + 用时/步骤/工具/思考统计 chip；中断回合变琥珀色「已中断」）。**卡片只在回合结束后出现**，流式期间一律平铺，流式输出不被卡片吞掉 |
| **共享活动抽屉** | 浏览器侧居中弹窗（mask + 面板，z-index 9990/9991），思考按语义分类成组（实施编写/原因排查/验证确认/规划方案/决策权衡/总结汇报/探索分析），工具调用按树展开；Esc/点空白关闭 |
| **可交互卡片** | 正文里的 proto-tabs 围栏渲染成可点击的 Tab 卡片（信息分层 pill / 可展开卡片 / AI 流光三种形态，缺省 pill）；解析失败自动回退原文，绝不崩卡 |
| **对话截图** | assistant 消息操作栏相机按钮 → 截图面板（范围本条回复/这一轮/整段会话 × 版式电脑/手机 × 画质 1080P/2K/4K × 画幅 × 四套主题；标题/徽章可编辑；预览后保存/复制/下载/打开目录；「元素删除」编辑模式点击页面删元素再重新生成）。正文里提到的本地 HTML 会自动内嵌进截图（与对话预览共用同一套路径抽取规则，走 file:// iframe，同目录样式图片照常加载，只嵌页面本身、不带对话里那圈工具条，最多 3 张）；host 端常驻无头浏览器渲染卡片（markdown-it + shiki + mermaid 真图），保存目录 `~/.dsh/storages/dsh-chat-flow-screenshot` |
| **会话头部视图标签** | 官方把「对话 / 轨迹」两个视图标签独占标题下方一整行（header 76px）；本插件把 header 改成单行 flex，标签钉到右上角与标题同行（header 收回 45px，省下的 31px 还给正文），下划线贴字、hover 从中心展开、选中常驻蓝条。纯 CSS 注入，选择器只用 `header` / `role=tablist` / CSS Module 的 `_titleRow`、`_tab` 后缀，不依赖构建 hash 前缀；单视图（无 tablist）时 `:has` 不匹配，零影响 |
| **本地 HTML 预览** | 正文里出现的本地 `.html/.htm` 路径（行内代码、markdown 链接目标或裸路径）自动识别，在对话流卡片里就地内嵌 iframe 预览：host 侧 `/api/chat-flow/html` 读正文并注入 `<base>`（同目录 css/js/图片/字体照常生效）+ 高度回报脚本，卡片按回报高度缓动自适应（200~900px）；缩放档缺省 **1:1 真实尺寸**（页面比卡片宽时由页面自己横向滚），点工具条那枚按钮切「等比缩放」= 固定 1280 逻辑视口排版再缩到卡片宽（按钮上显示 69% 这类比例），带「浏览器打开」/ 重新读取 / 折叠；iframe 叠 `sandbox` + 响应头 CSP sandbox，预览页落进不透明源，读不到 DSH 的 cookie 与 localStorage。裸文件名找不到就静默，绝对路径找不到才报错 |
| **download 下载工具** | host 半身注册 wire 工具 `download`（url / dest / overwrite，Node 流式写盘，优先于用 pwsh 跑 curl）+ 进度路由 `GET /api/chat-flow/download/progress?callId=`；client 半身 keyed `tool.call.toolview`（key=download）渲染实时进度条（已收/总量、速度、ETA，确定填充+辉光游标/不定长游标滑动两态），完成态读结果 meta 显示落盘路径 + 大小 + 用时 + 「打开」按钮。进度按 callId 严格对齐（run_code 子调用 `<parent>:code:<n>` 两端同源），对话流 chip 与抽屉行同步显示百分比；缺省保存 `~/.dsh/storages/dsh-chat-flow-downloads/` |

**正文链路保持官方**：text 块用官方 `MarkdownText`（ui-primitives）、图片走官方
`renderMessageImages` 槽——不引入 markstream / shiki / katex（截图渲染是 host
端独立管线，不受影响），流式渲染与内置 UI 完全一致，性能零负担（不做常驻
轮询，统计全部来自已有会话投影）。截图引擎空闲 5 分钟自动回收，卸载即关。

## 流程图卡片（diagram，flowchart）

diagram 围栏放 JSON（坐标 /4 网格，节点 ≤9、边 ≤12，非法结构自动回退原文）：

```diagram
{"type": "flowchart", "title": "标题", "desc": "一句话", "nodes": [{"id": "a", "shape": "oval", "x": 280, "y": 24, "w": 160, "h": 48, "name": "开始", "sub": "start"}], "edges": [{"from": "a", "to": "b", "label": "是", "accent": false, "pts": [[360,72],[360,120]]}]}
```

shape 三选一 oval / rect / diamond，pts 为完整折线点（含起终点，圆角自动倒）。size 缺省 full，紧凑版设 "size": "compact"（去副标签和图例，矮四成）。卡片右上角另有“紧 / 标 / 大”切换，看图的人可随时改比例（放大横向滚动）。视口自动贴合内容宽度，窄图不留两侧空白。

## 可交互卡片（proto-tabs）

总结时想放可点卡片，正文里加一个围栏（JSON，tabs 最多 4 个，minis 每 Tab 最多 4 条）：

```proto-tabs
{"title": "胶囊组件重构设计提案", "tabs": [{"label": "方案 A：信息分层", "variant": "pill", "heading": "高可读性重构", "pill": {"tag": "Embedding 向量嵌入", "desc": "把文字映射为多数值向量", "detail": "点击展开的详情"}, "minis": [{"t": "1. 视觉锚点", "d": "专有名词打 Tag"}]}]}
```

variant 可选 pill / expand / glow，缺省 pill（方案A）。未闭合围栏（流式中）与非法 JSON 都按原文显示。

## 本地 HTML 预览

助手正文里任何指向本地 HTML 的写法都会被识别并就地预览：

- 行内代码：`D:\out\report.html`、`./dist/index.html`
- markdown 链接：[看板](./dist/index.html)、[x](file:///D:/a.htm)
- 裸路径：D:/work/board.htm、~/docs/note.html、../x/y.htm、\\srv\share\a.html
- 裸文件名：报告.html（按会话 cwd 解析；找不到就静默，不占位）

围栏代码块里的路径、http(s):// 链接、`*.html` 通配一律不算。每条正文最多 4 张卡，同一路径只出一张。

渲染链路：GET /api/chat-flow/html/meta 探测（存在 / 大小 / 扩展名）→ GET /view 发正文，host 注入
`<base href="/api/chat-flow/html/raw/<token>/">`（token = base64url(JSON [目录, 通道号])）与一段高度回报脚本，
于是页面自己的 style.css、图片、字体、甚至点进同目录的另一个 .html 都能正常加载；脚本把 scrollHeight 用
postMessage 回传，父窗口按通道号认领后写进卡片高度（CSS 缓动过渡）。GET /open 交系统默认程序打开。

隔离与最小暴露：iframe `sandbox`（不给 `allow-same-origin`）+ HTML 响应头
`Content-Security-Policy: sandbox allow-scripts allow-popups allow-forms allow-modals`，预览页落进不透明源；
/raw 只发渲染用得上的类型（样式 / 脚本 / 图 / 字体 / wasm），刻意不含 txt / json / csv / map；路径逐段解码后
拒绝 `..`、绝对段与越界；HTML 上限 4MB、兄弟资源 16MB。
> host 半身改动要重启 DSH 服务才生效（托盘「重启服务与程序」）；client 半身刷新页面即可。

## 一句话安装（DSH）

```bash
dsh plugin --profile web add github:statem-li/dsh-chat-flow
```

重启 DeepSeek Harness 即可。本包在 package.json 声明了 `dsh.bundle.patch`，
`dsh plugin add` 完成后自动加入 profile 的 bundles 层，无需手动改 patch。

本地开发安装（junction，与 dsh-done-pill 同款）：

```powershell
New-Item -ItemType Junction -Path "$env:USERPROFILE\.dsh\profiles\web\node_modules\dsh-chat-flow" -Target D:\AI\Dsh\dsh-chat-flow
```

并在 `~/.dsh/profiles/web/cordis.patch.yml` 追加（同 id 条目按 last-write-wins 合并）：

```yaml
- insert:
    - id: dsh-chat-flow
      name: dsh-chat-flow
```

## 卸载

```bash
dsh plugin --profile web remove dsh-chat-flow
```

本地 junction 安装：删除 junction 与 profile patch 里的 insert 条目，重启 DSH。

## 与 dsh-webui 共存

两者都替换 `conversation.chat.node` 的 `tool-call` / `assistant-step` 槽位
（priority -100）。webui 已安装时请关闭其 `toolSummary` 模块（保留官方正文），
或不要同时安装本插件，否则同 key 同 priority 的第二个注册会抛错。

> 活动抽屉 window 总线键 `__dshActivityDrawerStore__` 与 webui 相同：若
> webui 的 toolSummary 同时开启，两者共享同一抽屉（last-write-wins）。

> 对话截图不受上述冲突影响：本插件注册 `conversation.chat.assistant-actions`
> 的 id 为 `chat-flow-screenshot`（webui 为 `webui-screenshot`），路由前缀
> 与保存目录也都独立（`/api/chat-flow/screenshot` 与
> `storages/dsh-chat-flow-screenshot`）——共存时只是在每条消息上多一个
> 相机按钮。

## 产物体积

发布内容约 **5.0 MB**：`lib/index.js` 3.45 MB（host 半身）+ `lib/client.js` 258 KB（浏览器半身，另带 457 KB 的 map 给 DevTools 断点用）+ `assets/` 968 KB（mermaid 引擎预压缩）+ 构建脚本零头。两处刻意省下来的：

- **host 半身不出 source map**：Node 只有带 `--enable-source-maps` 才读它，DSH 服务没开，13.6 MB 的 map 纯属占地方（也占 git 历史）。`build.mjs` 里 host 是 `sourcemap: false`，client 保留。
- **shiki 走 fine-grained**：`shiki/core` + `shiki/engine/javascript` + 显式 import 的 34 个 grammar 与 2 个主题。之前从 `shiki` 主入口 `createHighlighter`，esbuild 会把全量 ~220 种语法（约 10 MB）内联进来，而其中未注册的那些本来也用不到（`codeToHtml` 外面套着 try/catch，未注册语言回落纯文本）。用纯 JS 正则引擎而不是 oniguruma wasm，是为了不引 wasm 文件路径依赖 —— 产物仍是单文件自包含，装到 profile 的 node_modules 里也不会找不到 wasm。代价是首次高亮慢一些（三个代码块含引擎初始化约 550ms，截图整体 1.4s 内），加语言要在 `src/shot/markdown.ts` 的 import 列表里补一行。

## 构建（Windows）

```powershell
node build.mjs    # esbuild 双 bundle：lib/index.js(host) + lib/client.js(browser)
```

- host 半身运行时导入仅 node: 内置（markdown-it / shiki / CDP 客户端全部内联，
  产物自包含），构建末尾有 `assertHostExternals()` 守卫拦截不可解析的
  specifier；mermaid 引擎（assets/vendor/mermaid.min.js.gz）随包分发，
  运行时由截图引擎按需解压进临时页面；
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
├── host.ts                          — host 半身：spill 图片读取 + 截图路由接入
├── shims.d.ts                       — markdown-it 插件的无官方类型声明
├── browser/                         — 零依赖 CDP 客户端 + 系统 Chrome/Edge 启动
├── shared/
│   └── sanitize-html.ts             — 模型原始 HTML 净化（截图 markdown 管线用）
├── shot/                            — 截图 host 半身（自 webui/screenshot 移植）
│   ├── index.ts                     — /api/chat-flow/screenshot 路由（render/save/reveal/image/diagnose）
│   ├── card.ts                      — 卡片 HTML 组装（页头/标题/正文/页脚/鲸鱼署名）
│   ├── markdown.ts                  — markdown-it + shiki + mermaid 围栏识别
│   ├── theme.ts                     — 四套主题 CSS 编译（浅/深/玻璃/玻璃深）
│   ├── presets.ts                   — 设备×画质档位（host/client 共用纯数据）
│   ├── renderer.ts                  — 常驻无头浏览器 + 串行渲染队列 + 长图分段拼接
│   └── stitch.ts                    — PNG 拼接（零依赖手写 filter/CRC32）
└── client/
    ├── index.ts                     — client 入口：样式 + 抽屉 + 三座注册
    ├── styles.ts                    — 思考 chip + 对话流卡片样式（dtt__ 命名空间）
    ├── flow-card.tsx                — 步骤卡 / 总结卡（ReplyCardMeta 统计）
    ├── modal-animation.ts           — 弹窗开合动画（截图面板共用）
    ├── thinking/
    │   └── ThinkingStepNodeView.tsx — assistant-step 替换：回合聚合思考 chip +
    │                                  卡片门控（回合结束才出卡）+ 官方正文渲染
    ├── shot/                        — 截图 client 半身（自 webui/screenshot 移植）
    │   ├── index.tsx                — assistant-actions 相机按钮（useChat 快照 ref）
    │   ├── Panel.tsx                — 截图面板（范围/版式/画质/画幅/主题 + 元素删除）
    │   ├── collect.ts               — ChatSnapshot 消息抽取（0.1.2 扁平节点形状）
    │   ├── api.ts                   — /render /save /reveal API 客户端
    │   └── styles.ts                — 面板样式（tsh__ 命名空间）
    └── tool-summary/                — 工具聚合（自 webui/dsh-tool-summary 移植）
        ├── ToolGroupNodeView.tsx    — 每回合一枚工具 chip + 抽屉入口
        ├── activity-drawer.tsx      — 共享活动抽屉（window 总线 + 居中弹窗）
        ├── tool-stats.ts            — 统计/耗时/下载解析纯函数（callView 防御式读取）
        ├── activity-kind.ts         — 调用分类徽标（git push/构建/测试…）
        ├── reasoning-classify.ts    — 思考语义分类（关键词打分）
        ├── icons.tsx                — kind 徽标 SVG 字形
        ├── use-now.ts               — 走秒时钟
        └── styles.ts                — 工具聚合样式（dts__ 命名空间）
assets/
└── vendor/
    └── mermaid.min.js.gz            — mermaid 引擎（截图带图围栏时解压使用）
scripts/
├── smoke-host.mjs
└── smoke-client.mjs
```

## 许可

MIT
