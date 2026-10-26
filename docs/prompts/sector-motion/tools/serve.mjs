// Read-only static server for the last `next build` output: prerendered HTML from
// .next/server/app, chunks from .next/static, assets from public. For measurement only.
import http from "node:http"
import { readFile, stat } from "node:fs/promises"
import { join, extname } from "node:path"
import zlib from "node:zlib"

const ROOT = process.argv[2]
const PORT = Number(process.argv[3] || 4517)
const TYPES = { ".html": "text/html; charset=utf-8", ".js": "application/javascript", ".css": "text/css", ".woff2": "font/woff2", ".svg": "image/svg+xml", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".webp": "image/webp", ".json": "application/json", ".ico": "image/x-icon", ".txt": "text/plain" }

async function tryFile(p) {
  try {
    const s = await stat(p)
    if (s.isFile()) return p
  } catch {}
  return null
}

http
  .createServer(async (req, res) => {
    const url = decodeURIComponent(new URL(req.url, "http://x").pathname)
    let file = null
    if (url.startsWith("/_next/static/")) file = await tryFile(join(ROOT, ".next/static", url.slice("/_next/static/".length)))
    if (!file) file = await tryFile(join(ROOT, "public", url))
    if (!file) file = await tryFile(join(ROOT, ".next/server/app", (url === "/" ? "/index" : url) + ".html"))
    if (!file) {
      res.writeHead(404)
      return res.end("404")
    }
    let body = await readFile(file)
    const type = TYPES[extname(file)] || "application/octet-stream"
    const headers = { "content-type": type, "cache-control": "no-store" }
    // brotli for text, as a CDN would serve it
    if (process.argv[4] === "br" && /text|javascript|json|svg/.test(type) && /br/.test(req.headers["accept-encoding"] || "")) {
      body = zlib.brotliCompressSync(body)
      headers["content-encoding"] = "br"
    }
    res.writeHead(200, headers)
    res.end(body)
  })
  .listen(PORT, () => console.log("serving", ROOT, "on", PORT))
