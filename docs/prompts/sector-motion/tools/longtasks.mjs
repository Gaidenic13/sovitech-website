import { createRequire } from "node:module"
import { homedir } from "node:os"
import { join } from "node:path"
const req = createRequire(join(homedir(), "Library/Caches/hairline-look/noop.js"))
const { chromium } = req("playwright-core")
const url = process.argv[2]
const browser = await chromium.launch({ channel: "chrome", headless: true })
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true })
const page = await ctx.newPage()
const cdp = await ctx.newCDPSession(page)
await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 })
await page.addInitScript(() => {
  window.__lt = []; window.__mark = []
  new PerformanceObserver((l) => { for (const e of l.getEntries()) window.__lt.push([Math.round(e.startTime), Math.round(e.duration)]) }).observe({ type: "longtask", buffered: true })
  document.addEventListener("DOMContentLoaded", () => window.__mark.push(["DCL", Math.round(performance.now())]))
  window.addEventListener("load", () => window.__mark.push(["load", Math.round(performance.now())]))
  document.fonts && document.fonts.ready.then(() => window.__mark.push(["fonts", Math.round(performance.now())]))
})
await page.goto(url, { waitUntil: "load" })
await page.waitForTimeout(7000)
const r = await page.evaluate(() => ({ lt: window.__lt, mark: window.__mark, hl: document.querySelectorAll("[data-hairline] > svg").length }))
console.log(url.replace(/^https?:\/\/[^/]+/, ""), JSON.stringify(r))
await browser.close()
