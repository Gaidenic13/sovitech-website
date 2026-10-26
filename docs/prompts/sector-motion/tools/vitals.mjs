// Measures LCP (element + time), CLS, long tasks, JS transferred and rAF cost for a URL,
// under a mobile profile (4x CPU slowdown, ~Fast 4G) and a desktop profile.
import { createRequire } from "node:module"
import { homedir } from "node:os"
import { join } from "node:path"

const req = createRequire(join(homedir(), "Library/Caches/hairline-look/noop.js"))
const { chromium } = req("playwright-core")
const urls = process.argv.slice(2)

const PROFILES = {
  mobile: { viewport: { width: 390, height: 844 }, dpr: 3, cpu: 4, net: { latency: 150, down: (1.6 * 1024 * 1024) / 8, up: (750 * 1024) / 8 } },
  desktop: { viewport: { width: 1440, height: 900 }, dpr: 2, cpu: 1, net: null },
}

const browser = await chromium.launch({ channel: "chrome", headless: true, args: ["--enable-webgl", "--ignore-gpu-blocklist", "--use-angle=metal"] })
for (const url of urls) {
  for (const [name, p] of Object.entries(PROFILES)) {
    const ctx = await browser.newContext({ viewport: p.viewport, deviceScaleFactor: p.dpr, isMobile: name === "mobile", hasTouch: name === "mobile" })
    const page = await ctx.newPage()
    const cdp = await ctx.newCDPSession(page)
    await cdp.send("Network.enable")
    if (p.net) await cdp.send("Network.emulateNetworkConditions", { offline: false, latency: p.net.latency, downloadThroughput: p.net.down, uploadThroughput: p.net.up })
    if (p.cpu > 1) await cdp.send("Emulation.setCPUThrottlingRate", { rate: p.cpu })
    let js = 0, img = 0
    cdp.on("Network.loadingFinished", () => {})
    page.on("response", async (r) => {
      try {
        const t = r.request().resourceType()
        const len = Number((await r.headerValue("content-length")) || 0) || (await r.body()).length
        if (t === "script") js += len
        if (t === "image") img += len
      } catch {}
    })
    await page.addInitScript(() => {
      window.__v = { lcp: null, lcpEl: "", cls: 0, long: [], frames: 0 }
      new PerformanceObserver((l) => {
        for (const e of l.getEntries()) {
          window.__v.lcp = e.startTime
          const el = e.element
          window.__v.lcpEl = el ? `${el.tagName.toLowerCase()}${el.className && typeof el.className === "string" ? "." + el.className.split(" ").slice(0, 3).join(".") : ""} "${(el.textContent || el.getAttribute("src") || "").trim().slice(0, 40)}"` : e.url
          window.__v.lcpSize = e.size
        }
      }).observe({ type: "largest-contentful-paint", buffered: true })
      new PerformanceObserver((l) => {
        for (const e of l.getEntries()) if (!e.hadRecentInput) window.__v.cls += e.value
      }).observe({ type: "layout-shift", buffered: true })
      new PerformanceObserver((l) => {
        for (const e of l.getEntries()) window.__v.long.push([Math.round(e.startTime), Math.round(e.duration)])
      }).observe({ type: "longtask", buffered: true })
    })
    const t0 = Date.now()
    await page.goto(url, { waitUntil: "load", timeout: 120000 })
    const loadMs = Date.now() - t0
    await page.waitForTimeout(4000)
    // steady-state main-thread cost per frame while idle at the top (hero visible)
    const frame = await page.evaluate(
      () =>
        new Promise((res) => {
          const ts = []
          const f = (t) => {
            ts.push(t)
            if (ts.length < 61) requestAnimationFrame(f)
            else {
              const d = ts.slice(1).map((v, i) => v - ts[i])
              d.sort((a, b) => a - b)
              res({ median: d[30].toFixed(1), p90: d[54].toFixed(1) })
            }
          }
          requestAnimationFrame(f)
        }),
    )
    // scroll through the page to collect CLS from late layout
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += innerHeight * 0.8) {
        scrollTo(0, y)
        await new Promise((r) => setTimeout(r, 120))
      }
    })
    await page.waitForTimeout(800)
    const v = await page.evaluate(() => window.__v)
    const tbt = v.long.reduce((s, [, d]) => s + Math.max(0, d - 50), 0)
    console.log(
      JSON.stringify({ url: url.replace(/^https?:\/\/[^/]+/, ""), profile: name, load_ms: loadMs, lcp_ms: v.lcp && Math.round(v.lcp), lcp_el: v.lcpEl, cls: +v.cls.toFixed(4), long_tasks: v.long.length, tbt_ms: tbt, js_kb: +(js / 1024).toFixed(1), img_kb: +(img / 1024).toFixed(1), frame_ms_idle: frame }),
    )
    await ctx.close()
  }
}
await browser.close()
