/**
 * dsh-think-tools — host 半身冒烟测试。
 *
 * 断言 lib/index.js 在裸 node（无 tsx、无 DSH 运行时）下可加载，并导出
 * 合法的 Cordis 插件形状。host 半身现在注册一条生成的图片读取路由：
 *
 *   ctx.inject(['webServer'], cb) —— 延迟注入，绝不是 apply 直接读
 *   ctx.webServer（cordis 的 ctx 是 Proxy，未在 inject 中声明的属性一读
 *   就抛 `cannot get property "webServer" without inject`，会连累整棵
 *   插件树 boot 失败 → 3080 起不来——2026-09-03 真实踩坑）。
 *
 * 所以本冒烟除了检查自包含与导出形状，还实际驱动 apply()：
 *   1. 提供最小 ctx.inject stub，捕获延迟注入回调；
 *   2. 提供最小 webCtx（effect + webServer.register），执行回调并断言
 *      路由注册的 kind/path 一模一样；
 *   3. 裸 apply 直接访问 webServer 的老写法在这里必然 TypeError → FAIL。
 *
 * 验收：源码目录与「已安装位置」各跑一遍。
 * Usage: node scripts/smoke-host.mjs
 */

import { readFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const HERE = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(HERE, '..')
const HOST = resolve(ROOT, 'lib/index.js')

const fail = (msg) => { console.error(`FAIL  ${msg}`); process.exitCode = 1 }
const pass = (msg) => console.log(`ok    ${msg}`)

// 先做文本守卫：安装位置解析不了的 specifier 一个都不许出现。
const source = readFileSync(HOST, 'utf8')
const externalImports = [...source.matchAll(
  /(?:^|[;\n])\s*(?:import|export)[\s\S]*?from\s*["']([^"']+)["']/g,
)].map(m => m[1]).filter(spec => !spec.startsWith('node:'))
if (externalImports.length > 0) {
  fail(`host bundle still imports non-node specifiers: ${externalImports.join(', ')}`)
} else {
  pass('host bundle has no non-node runtime imports')
}

const mod = await import(new URL(`file://${HOST.replace(/\\/g, '/')}`))
if (mod.name !== 'dsh-think-tools') fail(`expected name "dsh-think-tools", got ${JSON.stringify(mod.name)}`)
else pass(`exports name = ${mod.name}`)
if (typeof mod.apply !== 'function') fail('apply is not a function')
else pass('exports apply()')

// ── 最小 cordis 桩：延迟注入 + 路由注册捕获 ──────────────────────────────
const registered = []
const unregistered = []
let effectRan = false
let effectDisposer = null
let injectNames = null
const stubCtx = {
  // 老写法（apply 里直接 ctx.webServer.xxx）在这里拿不到该属性 → TypeError。
  inject(names, callback) {
    injectNames = names
    const webCtx = {
      effect(fn, label) {
        effectRan = true
        // cordis 在 fiber 提交时执行 effect；返回值为 disposer（真实
        // webServer.register 返回 () => void，见 dsh-host-webserver）。
        const disposer = fn()
        if (typeof disposer !== 'function') throw new Error(`effect(${label}) must return a disposer`)
        effectDisposer = disposer
        return disposer
      },
      webServer: {
        // 与真实 register 一致：返回注销函数。
        register(spec) {
          registered.push(spec)
          return () => { unregistered.push(spec) }
        },
      },
    }
    callback(webCtx)
  },
}

try {
  mod.apply(stubCtx)
  pass('apply(ctx) ran without throwing')
} catch (error) {
  fail(`apply(ctx) threw: ${error?.stack ?? error}`)
}

if (injectNames === null || JSON.stringify(injectNames) !== JSON.stringify(['webServer'])) {
  fail(`expected deferred inject ['webServer'], got ${JSON.stringify(injectNames)}`)
} else {
  pass('apply defers webServer access via ctx.inject(["webServer"], cb)')
}

if (!effectRan) fail('deferred webServer callback never ran')
else pass('deferred webServer callback executed')

if (registered.length !== 1) {
  fail(`expected exactly 1 route registration, got ${registered.length}: ${JSON.stringify(registered)}`)
} else {
  const spec = registered[0]
  if (spec?.kind !== 'exact' || spec?.path !== '/api/think-tools/generated-images') {
    fail(`unexpected route spec: ${JSON.stringify(spec)}`)
  } else {
    pass('registered GET /api/think-tools/generated-images (kind=exact)')
  }
  if (typeof spec?.handler !== 'function') fail('route handler is not a function')
  else pass('route handler is a function')
  const disposer = effectDisposer
  if (typeof disposer === 'function') pass('route returns a disposer (unregisterable)')
  else fail('route registration did not return an unregister disposer')
}

console.log(`\n${process.exitCode ? 'SMOKE FAILED' : 'SMOKE PASSED'} — ${HOST}`)
process.exit(process.exitCode ?? 0)
