import { createRequire as __thinkToolsCreateRequire } from 'node:module';
const require = __thinkToolsCreateRequire(import.meta.url);

// src/host.ts
import { readFileSync, statSync } from "node:fs";
import { resolve, sep, extname } from "node:path";
var name = "dsh-think-tools";
var MAX_SPILL_BYTES = 8 * 1024 * 1024;
function collectImageUrls(data) {
  const urls = [];
  if (!Array.isArray(data)) return urls;
  for (const item of data) {
    if (typeof item !== "object" || item === null) continue;
    const record = item;
    let url = null;
    if (typeof record.b64_json === "string" && record.b64_json !== "") {
      url = `data:image/png;base64,${record.b64_json.replace(/\s+/g, "")}`;
    } else if (typeof record.url === "string" && record.url !== "") {
      url = record.url;
    }
    if (url !== null && !urls.includes(url)) urls.push(url);
  }
  return urls;
}
function parseGeneratedResult(text) {
  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch {
    return { ok: false, urls: [], model: null };
  }
  if (typeof parsed !== "object" || parsed === null) return { ok: false, urls: [], model: null };
  const record = parsed;
  if (record.ok !== true) return { ok: false, urls: [], model: null };
  const data = record.data;
  let urls = collectImageUrls(data?.data);
  if (urls.length === 0 && Array.isArray(record.imageUrls)) {
    urls = record.imageUrls.filter((item) => typeof item === "string" && item !== "");
  }
  if (urls.length === 0) {
    for (const key of ["imageUrl", "imageDataUrl"]) {
      const value = record[key];
      if (typeof value === "string" && value !== "") urls.push(value);
    }
  }
  const model = typeof record.model === "string" && record.model !== "" ? record.model : null;
  return { ok: urls.length > 0, urls, model };
}
function handleGeneratedImages(ctx, req, res) {
  const json = (status, payload) => {
    res.writeHead(status, { "content-type": "application/json", "cache-control": "no-store" });
    res.end(JSON.stringify(payload));
  };
  try {
    const url = new URL(req.url ?? "/", "http://x");
    const file = url.searchParams.get("file") ?? "";
    const store = ctx.get("spillStore");
    const root = typeof store?.root === "string" && store.root !== "" ? store.root : void 0;
    if (root === void 0) {
      json(404, { ok: false, error: "spill store unavailable" });
      return;
    }
    const target = resolve(file);
    if (target !== root && !target.startsWith(root + sep)) {
      json(403, { ok: false, error: "forbidden" });
      return;
    }
    if (extname(target).toLowerCase() !== ".txt") {
      json(403, { ok: false, error: "forbidden" });
      return;
    }
    let size;
    try {
      size = statSync(target).size;
    } catch {
      json(404, { ok: false, error: "spill file not found" });
      return;
    }
    if (size <= 0 || size > MAX_SPILL_BYTES) {
      json(413, { ok: false, error: "spill file too large" });
      return;
    }
    const text = readFileSync(target, "utf8");
    const result = parseGeneratedResult(text);
    if (!result.ok) {
      json(422, { ok: false, error: "spill content is not a generated-image result" });
      return;
    }
    json(200, { ok: true, urls: result.urls, model: result.model });
  } catch {
    json(500, { ok: false, error: "internal error" });
  }
}
function apply(ctx) {
  ctx.inject(["webServer"], (webCtx) => {
    webCtx.effect(() => webCtx.webServer.register({
      kind: "exact",
      path: "/api/think-tools/generated-images",
      handler: (req, res) => handleGeneratedImages(webCtx, req, res)
    }), "dsh-think-tools: generated-images route");
  });
}
export {
  apply,
  name
};
//# sourceMappingURL=index.js.map
