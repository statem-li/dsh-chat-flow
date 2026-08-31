/**
 * dsh-think-tools — 思考与工具调用聚合（host 半身）。
 *
 * 本插件的全部能力都在浏览器侧（client 半身）：没有 host 路由、没有工具、
 * 没有持久化设置。host 半身只需保持 Cordis 行激活，client 模块表才能发现
 * 本包的 `dsh.client` 声明并注入浏览器端工厂。
 */

/** Stable Cordis plugin name. */
export const name = 'dsh-think-tools'

/** 无 host 服务依赖。 */
export function apply(): void {}
