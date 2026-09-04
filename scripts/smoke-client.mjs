/**
 * dsh-think-tools — browser half smoke test.
 *
 * Executes `lib/client.js` under a stubbed DSH client environment and asserts:
 *   1. registers exactly one `__ModuleLoader__` entry with id "dsh-think-tools"
 *   2. the factory exports `apply` (function) and `inject` (array = ['slots'])
 *   3. `apply(ctx)` mounts the shared activity drawer (body 级宿主) + 注入四枚
 *      <style>（dsh-think-tools-styles / dsh-tool-summary-styles /
 *      dsh-think-tools-shot-styles / dsh-modal-animation-styles /
 *      dsh-think-tools-proto-styles）
 *   4. `apply(ctx)` registers all three seats:
 *        conversation.chat.node / tool-call        priority -100
 *        conversation.chat.node / assistant-step   priority -100
 *        conversation.chat.assistant-actions / think-tools-screenshot  order 5
 *
 * Usage: node scripts/smoke-client.mjs
 */

import { readFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import vm from 'node:vm'

const HERE = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(HERE, '..')
const CLIENT = resolve(ROOT, 'lib/client.js')

/** Stand-in for any React component export. */
function stubComponent(name) {
  const Comp = () => ({ __stub: name })
  Object.defineProperty(Comp, 'name', { value: name })
  return Comp
}

/** Minimal DOM node (records id / children / styles for later assertions). */
function stubNode(tag = 'div') {
  const node = {
    tagName: String(tag).toUpperCase(),
    children: [],
    style: {},
    dataset: {},
    classList: { add: () => {}, remove: () => {}, toggle: () => {}, contains: () => false },
    attrs: {},
    id: '',
    textContent: '',
    appendChild(child) { node.children.push(child); return child },
    insertBefore(child) { node.children.unshift(child); return child },
    removeChild(child) {
      const i = node.children.indexOf(child)
      if (i >= 0) node.children.splice(i, 1)
      return child
    },
    remove() {},
    setAttribute(k, v) { node.attrs[k] = v },
    getAttribute(k) { return node.attrs[k] ?? null },
    removeAttribute(k) { delete node.attrs[k] },
    addEventListener() {},
    removeEventListener() {},
    querySelector: () => null,
    querySelectorAll: () => [],
    getBoundingClientRect: () => ({ x: 0, y: 0, top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0 }),
    contains: () => false,
    compareDocumentPosition: () => 0,
    getRootNode: () => sandbox.document,
    focus: () => {},
    click: () => {},
    ownerDocument: null,
  }
  return node
}

/** Explicit React overrides. */
const REACT_OVERRIDES = {
  createElement: (type, props, ...children) => ({ type, props, children }),
  cloneElement: (el) => el,
  isValidElement: () => false,
  Children: { map: () => [], forEach: () => {}, count: () => 0, toArray: () => [] },
  Fragment: Symbol('Fragment'),
  Component: class Component {
    constructor(props) {
      this.props = props
      this.state = null
    }

    setState() {}

    forceUpdate() {}

    render() {
      return null
    }
  },
  StrictMode: stubComponent('StrictMode'),
  Suspense: stubComponent('Suspense'),
  memo: (comp) => comp,
  forwardRef: (render) => render,
  lazy: () => stubComponent('Lazy'),
  startTransition: (fn) => fn?.(),
  createRef: () => ({ current: null }),
  createContext: () => ({ Provider: stubComponent('Provider'), Consumer: stubComponent('Consumer') }),
  useState: (init) => [typeof init === 'function' ? init() : init, () => {}],
  useReducer: (reducer, init) => [init, () => {}],
  useEffect: () => {},
  useLayoutEffect: () => {},
  useInsertionEffect: () => {},
  useMemo: (fn) => fn(),
  useCallback: (fn) => fn,
  useRef: (init) => ({ current: init }),
  useImperativeHandle: () => {},
  useContext: () => ({}),
  useId: () => 'stub-id',
  useDebugValue: () => {},
  useSyncExternalStore: (_sub, get) => get(),
  useTransition: () => [false, (fn) => fn?.()],
  useDeferredValue: (v) => v,
}

/** Everything the bundle may ask the platform for. */
const MODULES = {
  'react': new Proxy(REACT_OVERRIDES, {
    get: (target, prop) => {
      if (typeof prop !== 'string') return undefined
      if (Object.hasOwn(target, prop)) return target[prop]
      return stubComponent(prop)
    },
    has: () => true,
  }),
  'react/jsx-runtime': {
    jsx: (type, props) => ({ type, props }),
    jsxs: (type, props) => ({ type, props }),
    Fragment: Symbol('Fragment'),
  },
  'react-dom': { createPortal: (node) => node },
  'react-dom/client': { createRoot: () => ({ render: () => {}, unmount: () => {} }) },
  '@deepseek-ai/dsh-client-ui-primitives': {
    IconThinkOutline14: stubComponent('IconThinkOutline14'),
    IconApiOutline14: stubComponent('IconApiOutline14'),
    IconDownloadOutline16: stubComponent('IconDownloadOutline16'),
    JsonBlock: stubComponent('JsonBlock'),
    MarkdownText: stubComponent('MarkdownText'),
  },
}

// ── capture the loader registration ──────────────────────────────────────
const registrations = []
const headItems = []
const bodyItems = []
const sandbox = {
  __ModuleLoader__: { load: (entry) => { registrations.push(entry) } },
  document: {
    head: stubNode('head'),
    body: stubNode('body'),
    documentElement: stubNode('html'),
    createElement: (tag) => stubNode(tag),
    createTextNode: (text) => ({ nodeType: 3, textContent: text }),
    querySelector: () => null,
    querySelectorAll: () => [],
    getElementById: () => null,
    getElementsByTagName: () => [],
    addEventListener: () => {},
    removeEventListener: () => {},
  },
  console,
  setTimeout: (() => { let id = 0; return (fn, ms) => { void fn; void ms; return ++id } })(),
  clearTimeout: () => {},
  setInterval: (() => { let id = 0; return (fn, ms) => { void fn; void ms; return ++id } })(),
  clearInterval: () => {},
  queueMicrotask: (fn) => fn(),
  fetch: async () => ({ ok: false, status: 599, json: async () => ({}) }),
  AbortController,
  localStorage: { getItem: () => null, setItem: () => {}, removeItem: () => {} },
  matchMedia: () => ({ matches: false, addEventListener: () => {}, removeEventListener: () => {} }),
  requestAnimationFrame: (fn) => setTimeout(() => fn(Date.now()), 0),
  cancelAnimationFrame: (id) => clearTimeout(id),
  getComputedStyle: () => ({ getPropertyValue: () => '' }),
  MutationObserver: class { observe() {} disconnect() {} },
  ResizeObserver: class { observe() {} unobserve() {} disconnect() {} },
  CSS: { supports: () => () => '' },
  Element: class {},
  HTMLElement: class {},
  Node: class {},
}
sandbox.window = sandbox
sandbox.globalThis = sandbox
sandbox.self = sandbox
sandbox.top = sandbox
sandbox.parent = sandbox
sandbox.location = { href: 'http://127.0.0.1:0/', origin: 'http://127.0.0.1:0', protocol: 'http:', host: '127.0.0.1:0' }
sandbox.navigator = { userAgent: 'dsh-think-tools-smoke', language: 'zh-CN', maxTouchPoints: 0 }
sandbox.innerWidth = 1440
sandbox.innerHeight = 900
sandbox.devicePixelRatio = 1
sandbox.addEventListener = () => {}
sandbox.removeEventListener = () => {}
sandbox.dispatchEvent = () => true
sandbox.scrollTo = () => {}

// 记录 document 挂载点（head 的 style + body 的抽屉宿主）。
const originalHeadAppend = sandbox.document.head.appendChild.bind(sandbox.document.head)
sandbox.document.head.appendChild = (child) => {
  headItems.push(child)
  return originalHeadAppend(child)
}
const originalBodyAppend = sandbox.document.body.appendChild.bind(sandbox.document.body)
sandbox.document.body.appendChild = (child) => {
  bodyItems.push(child)
  return originalBodyAppend(child)
}

const context = vm.createContext(sandbox)
const code = readFileSync(CLIENT, 'utf8')
new vm.Script(code, { filename: CLIENT }).runInContext(context)

// ── assertions ───────────────────────────────────────────────────────────
const fail = (msg) => { console.error(`FAIL  ${msg}`); process.exitCode = 1 }
const pass = (msg) => console.log(`ok    ${msg}`)

if (registrations.length !== 1) fail(`expected 1 loader registration, got ${registrations.length}`)
else pass('registered exactly one __ModuleLoader__ entry')

const entry = registrations[0]
if (entry?.id !== 'dsh-think-tools') fail(`expected id "dsh-think-tools", got ${JSON.stringify(entry?.id)}`)
else pass('loader id is "dsh-think-tools"')

const require = (id) => {
  if (id in MODULES) return MODULES[id]
  throw new Error(`[smoke] unexpected require(${id}) — add it to the stub table`)
}

const mod = entry.factory(require)
if (typeof mod.apply !== 'function') fail('factory did not export apply()')
else pass('factory exports apply()')
if (!Array.isArray(mod.inject)) fail('factory did not export inject[]')
else pass(`factory exports inject[] = [${mod.inject.join(', ')}]`)
if (JSON.stringify(mod.inject) !== JSON.stringify(['slots'])) {
  fail(`expected inject = ['slots'], got [${mod.inject.join(', ')}]`)
} else {
  pass('client inject = ["slots"]')
}

// ── run apply() against a stub client context ────────────────────────────
const registeredSlots = []
const slotsService = {
  inject: (slot, factory) => {
    if (typeof factory !== 'function') throw new Error('slots.inject expects a factory')
    factory()
  },
  register: (spec, comp) => {
    if (comp === undefined) throw new Error('slots.register called without component')
    registeredSlots.push({
      slot: spec?.name, key: spec?.key, priority: spec?.priority, locale: spec?.locale,
      id: spec?.id, order: spec?.order,
    })
    return () => {}
  },
}
const ctx = {
  effect: (fn) => { const stop = typeof fn === 'function' ? fn() : undefined; return stop ?? (() => {}) },
  get: () => undefined,
  slots: slotsService,
  inject: (names, fn) => {
    if (!Array.isArray(names)) throw new Error('ctx.inject expects a names array')
    fn({ slots: slotsService })
  },
}

try {
  mod.apply(ctx)
  pass('apply(ctx) ran without throwing')
} catch (error) {
  fail(`apply(ctx) threw: ${error?.stack ?? error}`)
}

// 活动抽屉宿主挂到 body。
const drawerHost = bodyItems.find((item) => item?.id === 'dsh-activity-drawer-root')
if (drawerHost === undefined) fail('activity drawer host was not appended to document.body')
else pass('activity drawer host mounted on document.body')

// 四枚 <style> 注入 head。
const styleIds = headItems.filter((item) => item?.tagName === 'STYLE').map((item) => item?.id ?? '')
for (const expected of [
  'dsh-think-tools-styles', 'dsh-tool-summary-styles',
  'dsh-think-tools-shot-styles', 'dsh-modal-animation-styles',
  'dsh-think-tools-proto-styles',
]) {
  if (!styleIds.includes(expected)) fail(`missing injected <style id=${expected}>`)
}
if (styleIds.length === 5) pass('injected five <style> sheets (dtt__ + dts__ + tsh__ + modal + proto)')
else if (styleIds.length > 5) fail(`unexpected extra styles: ${styleIds.join(', ')}`)

// 两个 keyed 槽位阴影注册 + 截图按钮注册。
const cell = (key) => registeredSlots.find((s) => s?.slot === 'conversation.chat.node' && s?.key === key)
if (registeredSlots.length !== 3) {
  fail(`expected 3 slot registrations, got ${registeredSlots.length}: ${JSON.stringify(registeredSlots)}`)
} else {
  pass(`registered ${registeredSlots.length} seats (2 keyed + 1 actions)`)
}
for (const expected of [
  { key: 'tool-call', priority: -100 },
  { key: 'assistant-step', priority: -100 },
]) {
  const found = cell(expected.key)
  if (found === undefined) {
    fail(`missing registration for key ${expected.key}`)
  } else if (found.priority !== expected.priority) {
    fail(`key ${expected.key} priority = ${found.priority}, expected ${expected.priority}`)
  } else if (found.locale !== 'chat') {
    fail(`key ${expected.key} locale = ${found.locale}, expected "chat"`)
  } else {
    pass(`seat conversation.chat.node / ${expected.key} @ priority ${expected.priority}`)
  }
}
const shot = registeredSlots.find((s) => s?.slot === 'conversation.chat.assistant-actions')
if (shot === undefined) {
  fail('missing screenshot action registration for conversation.chat.assistant-actions')
} else if (shot.id !== 'think-tools-screenshot') {
  fail(`screenshot action id = ${JSON.stringify(shot.id)}, expected "think-tools-screenshot"`)
} else if (shot.order !== 5) {
  fail(`screenshot action order = ${shot.order}, expected 5`)
} else {
  pass('seat conversation.chat.assistant-actions / think-tools-screenshot @ order 5')
}

// 思考 chip / 工具 chip 共用的 window 级抽屉总线已创建（apply 内不会建，
// 但 mountActivityDrawer 只挂根；总线由首个 chip 挂载时惰性创建——此处
// 校验抽屉根存在即视为通道就绪）。
const bus = sandbox.__dshActivityDrawerStore__
console.log(`info  activity drawer bus present at apply time: ${bus !== undefined ? 'yes' : 'no (lazy, created on first chip mount)'}`)

console.log(`\n${process.exitCode ? 'SMOKE FAILED' : 'SMOKE PASSED'} — ${CLIENT}`)
process.exit(process.exitCode ?? 0)
