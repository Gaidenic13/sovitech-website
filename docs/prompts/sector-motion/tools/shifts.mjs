// Lists layout-shift entries with their source nodes, before and after scrolling, and the
// server-HTML height of every [data-hairline] stage versus its hydrated height.
import { createRequire } from "node:module"
import { homedir } from "node:os"
import { join } from "node:path"

const req = createRequire(join(homedir(), "Library/Caches/hairline-look/noop.js"))
const { chromium } = req("playwright-core")
const url = process.argv[2]
const scroll = process.argv[3] !== "noscroll"

const browser = await chromium.launch({ channel: "chrome", headless: true })
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
await page.addInitScript(() => {
  window.__s = []
  new PerformanceObserver((l) => {
    for (const e of l.getEntries())
      window.__s.push({
        t: Math.round(e.startTime),
        v: +e.value.toFixed(4),
        input: e.hadRecentInput,
        src: (e.sources || []).slice(0, 3).map((s) => {
          const n = s.node
          const d = n && n.nodeType === 1 ? `${n.tagName.toLowerCase()}${n.getAttribute("data-hairline") ? "[data-hairline=" + n.getAttribute("data-hairline") + "]" : ""}.${String(n.className || "").split(" ").slice(0, 4).join(".")}` : n ? n.nodeName : "?"
          return `${d} y ${Math.round(s.previousRect.y)}→${Math.round(s.currentRect.y)} h ${Math.round(s.previousRect.height)}→${Math.round(s.currentRect.height)}`
        }),
      })
  }).observe({ type: "layout-shift", buffered: true })
})
// no-JS heights of stages, straight from the server HTML
const ctxNoJs = await browser.newContext({ viewport: { width: 1440, height: 900 }, javaScriptEnabled: false })
const p2 = await ctxNoJs.newPage()
await p2.goto(url, { waitUntil: "load" })
const noJs = await p2.evaluate(() => ({
  stages: [...document.querySelectorAll("[data-hairline]")].map((e) => [e.getAttribute("data-hairline"), Math.round(e.getBoundingClientRect().height)]),
  hiddenOpacity0: [...document.querySelectorAll("h1,h2,p")].filter((e) => getComputedStyle(e.closest(".opacity-0") || e).opacity === "0").length,
  docHeight: document.documentElement.scrollHeight,
}))
await ctxNoJs.close()

await page.goto(url, { waitUntil: "load" })
await page.waitForTimeout(3000)
const hydrated = await page.evaluate(() => ({
  stages: [...document.querySelectorAll("[data-hairline]")].map((e) => [e.getAttribute("data-hairline"), Math.round(e.getBoundingClientRect().height), e.querySelectorAll(":scope > svg").length]),
  docHeight: document.documentElement.scrollHeight,
}))
if (scroll)
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += innerHeight * 0.8) {
      scrollTo(0, y)
      await new Promise((r) => setTimeout(r, 150))
    }
  })
await page.waitForTimeout(500)
const shifts = await page.evaluate(() => window.__s)
console.log(JSON.stringify({ noJs, hydrated }, null, 0))
console.log("shift entries:", shifts.length, "sum:", shifts.filter((s) => !s.input).reduce((a, s) => a + s.v, 0).toFixed(4))
for (const s of shifts.sort((a, b) => b.v - a.v).slice(0, 8)) console.log(JSON.stringify(s))
await browser.close()
