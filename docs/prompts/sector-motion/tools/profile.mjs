// CPU-profiles the first N seconds of a page load (4x CPU slowdown) and sums self time per script chunk,
// tagging chunks by what they contain, so main-thread cost can be attributed to GSAP, Hairline, React, etc.
import { createRequire } from "node:module"
import { homedir } from "node:os"
import { join } from "node:path"
import { readFileSync, existsSync } from "node:fs"

const req = createRequire(join(homedir(), "Library/Caches/hairline-look/noop.js"))
const { chromium } = req("playwright-core")
const [url, root, secs = "6", scroll = "noscroll"] = process.argv.slice(2)

const tagOf = (u) => {
  const m = u.match(/\/_next\/static\/(chunks\/[^?]+)/)
  if (!m) return u ? u.replace(/^https?:\/\/[^/]+/, "") : "(native/gc/idle)"
  const p = join(root, ".next/static", m[1])
  if (!existsSync(p)) return m[1]
  const s = readFileSync(p, "utf8")
  const tags = []
  if (/uReveal/.test(s)) tags.push("hero-field")
  if (/adoptedStyleSheets/.test(s)) tags.push("hairline-kernel")
  if (/useGSAP/.test(s) && /matchMedia/.test(s) && s.length > 100000) tags.push("gsap+ScrollTrigger")
  if (/Ciclul|ciclul/.test(s)) tags.push("lifecycle")
  if (/O zi/.test(s)) tags.push("day-cycle")
  if (/Un singur tablou/.test(s)) tags.push("test-client+tablou")
  if (/__SECRET_INTERNALS|react-dom|scheduler/.test(s)) tags.push("react")
  if (/Calea Victoriei/.test(s)) tags.push("sector-data")
  return `${m[1].slice(7, 15)} ${tags.join("+") || "other"} (${Math.round(s.length / 1024)}KB)`
}

const browser = await chromium.launch({ channel: "chrome", headless: true })
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true })
const page = await ctx.newPage()
const cdp = await ctx.newCDPSession(page)
await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 })
await cdp.send("Profiler.enable")
await cdp.send("Profiler.setSamplingInterval", { interval: 200 })
await cdp.send("Profiler.start")
await page.goto(url, { waitUntil: "load" })
if (scroll === "scroll")
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += innerHeight * 0.8) {
      scrollTo(0, y)
      await new Promise((r) => setTimeout(r, 150))
    }
  })
await page.waitForTimeout(Number(secs) * 1000)
const { profile } = await cdp.send("Profiler.stop")
const byId = new Map(profile.nodes.map((n) => [n.id, n]))
const self = new Map()
const dts = profile.timeDeltas
for (let i = 0; i < profile.samples.length; i++) {
  const n = byId.get(profile.samples[i])
  const fn = n.callFrame.functionName
  const key = ["(idle)", "(program)", "(garbage collector)"].includes(fn) ? fn : tagOf(n.callFrame.url)
  self.set(key, (self.get(key) || 0) + (dts[i] || 0) / 1000)
}
const rows = [...self.entries()].filter(([k]) => k !== "(idle)").sort((a, b) => b[1] - a[1]).slice(0, 14)
console.log(url.replace(/^https?:\/\/[^/]+/, ""), "busy ms (4x CPU), first", secs, "s", scroll)
for (const [k, v] of rows) console.log(String(Math.round(v)).padStart(7), k)
await browser.close()
