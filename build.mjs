/**
 * dsh-chat-flow — build script.
 *
 * Two bundles from one esbuild run (模板：dsh-done-pill/build.mjs）：
 *
 *   lib/index.js   host half    ESM,  node platform,  self-contained
 *   lib/client.js  browser half CJS,  browser platform, wrapped in the
 *                  `window.__ModuleLoader__.load` factory contract
 *
 * host 半身没有任何运行时导入（apply 为 no-op），产物完全自包含——见
 * assertHostExternals()。client 半身只 external 平台种子词（react 家族）
 * 与 @deepseek-ai/*（运行时由 DSH client 模块表提供同一份实例）。
 *
 * Usage: node build.mjs
 */

import { createRequire } from 'node:module'
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { resolve, dirname, join, basename } from 'node:path'
import { fileURLToPath } from 'node:url'

const HERE = dirname(fileURLToPath(import.meta.url))
const DSH_CHECKOUT = process.env.DSH_CHECKOUT ?? 'D:/AI/deepseek-harness'
const PLUGIN_ID = 'dsh-chat-flow'

/** Resolve esbuild (own node_modules → DSH checkout pnpm store → error). */
function loadEsbuild() {
  const localRequire = createRequire(resolve(HERE, 'package.json'))
  try {
    return localRequire('esbuild')
  } catch {
    // Not installed locally; fall through to the checkout scan.
  }

  const store = join(DSH_CHECKOUT, 'node_modules', '.pnpm')
  const candidates = []
  if (existsSync(store)) {
    for (const entry of readdirSync(store)) {
      if (!entry.startsWith('esbuild@')) continue
      candidates.push(join(store, entry, 'node_modules', 'esbuild'))
    }
  }
  if (candidates.length > 0) {
    const pick = candidates.sort().at(-1)
    return createRequire(resolve(pick, 'package.json'))(pick)
  }

  throw new Error(
    'dsh-chat-flow: cannot find esbuild.\n'
    + '  Run `pnpm install` in this directory (esbuild is a devDependency).\n'
    + `  Or set DSH_CHECKOUT to a DSH checkout to borrow its copy (currently: ${DSH_CHECKOUT}).`,
  )
}

const esbuild = loadEsbuild()

/** Platform seed words + react come from the DSH module table at runtime. */
const CLIENT_EXTERNAL = [
  'react',
  'react/jsx-runtime',
  'react-dom',
  'react-dom/client',
]

/** Browser half: one CJS factory registered with the host module loader. */
const clientBundle = {
  entryPoints: [resolve(HERE, 'src/client/index.ts')],
  outfile: resolve(HERE, 'lib/client.js'),
  bundle: true,
  format: 'cjs',
  platform: 'browser',
  target: ['es2020'],
  jsx: 'automatic',
  sourcemap: true,
  logLevel: 'info',
  external: CLIENT_EXTERNAL,
  // Everything under @deepseek-ai/ stays a runtime require (module table).
  plugins: [{
    name: 'chat-flow-external-platform',
    setup(build) {
      build.onResolve({ filter: /^@deepseek-ai\// }, args => ({ path: args.path, external: true }))
    },
  }],
  banner: {
    js: [
      `window.__ModuleLoader__.load({ id: ${JSON.stringify(PLUGIN_ID)}, factory: (require) => {`,
      'var module = { exports: {} };',
      'var exports = module.exports;',
      'Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });',
    ].join('\n'),
  },
  footer: {
    js: 'return module.exports; } });',
  },
}

/** Runtime-resolvable host packages. host 半身无任何运行时导入 → 空表。 */
const HOST_RUNTIME_EXTERNAL_ALLOWLIST = new Set([
])

/** Host half: ESM, self-contained except node builtins and the allowlist. */
const hostBundle = {
  entryPoints: [resolve(HERE, 'src/host.ts')],
  outfile: resolve(HERE, 'lib/index.js'),
  bundle: true,
  format: 'esm',
  platform: 'node',
  target: 'node22',
  // host 半身不出 source map：Node 只有带 --enable-source-maps 时才会读它，
  // DSH 服务没开这个 flag，13.6MB 的 map 纯属占地方（也占 git 历史）。
  // client 半身的 map 保留 —— 浏览器 DevTools 默认会读，调插件前端要用。
  sourcemap: false,
  logLevel: 'info',
  external: [],
  // Any runtime CJS dep (none today) would need a real require: keep the guard.
  banner: {
    js: [
      "import { createRequire as __thinkToolsCreateRequire } from 'node:module';",
      'const require = __thinkToolsCreateRequire(import.meta.url);',
    ].join('\n'),
  },
  plugins: [{
    name: 'chat-flow-external-platform',
    setup(build) {
      build.onResolve({ filter: /^(@deepseek-ai\/|node:)/ }, args => ({ path: args.path, external: true }))
    },
  }],
}

/** Fail the build if the host bundle still hands an unresolvable specifier. */
function assertHostExternals(outfile) {
  const source = readFileSync(outfile, 'utf8')
  const specifiers = new Set()
  for (const m of source.matchAll(/(?:^|[;\n])\s*(?:import|export)[\s\S]*?from\s*["']([^"']+)["']/g)) {
    specifiers.add(m[1])
  }
  for (const m of source.matchAll(/\bimport\s*\(\s*["']([^"']+)["']\s*\)/g)) {
    specifiers.add(m[1])
  }

  const violations = [...specifiers].filter((spec) => {
    if (spec.startsWith('node:')) return false
    return !HOST_RUNTIME_EXTERNAL_ALLOWLIST.has(spec)
  })

  if (violations.length > 0) {
    throw new Error(
      'dsh-chat-flow: host bundle imports packages that an installed plugin cannot resolve.\n'
      + violations.map(v => `  - ${v}`).join('\n')
      + '\n\n'
      + 'DSH ships @deepseek-ai/* as source only; a plugin inside a profile\'s\n'
      + 'node_modules gets plain node resolution and finds no lib/index.js.\n'
      + `Add the name to HOST_RUNTIME_EXTERNAL_ALLOWLIST in ${basename(fileURLToPath(import.meta.url))}\n`
      + 'after verifying the package really ships runtime JS.',
    )
  }
  return [...specifiers]
}

await Promise.all([esbuild.build(clientBundle), esbuild.build(hostBundle)])
const hostExternals = assertHostExternals(resolve(HERE, 'lib/index.js'))
console.log('[dsh-chat-flow] built lib/index.js + lib/client.js')
console.log(`[dsh-chat-flow] host runtime imports: ${hostExternals.length === 0 ? '(none)' : hostExternals.join(', ')}`)
