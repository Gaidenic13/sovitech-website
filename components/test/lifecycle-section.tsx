"use client"

import { useEffect, useId, useRef, useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin"
import { SplitText } from "gsap/SplitText"
import { useGSAP } from "@gsap/react"
import { useLanguage } from "@/lib/language-context"
import { FigureFrame } from "@/components/test/figure-frame"
import {
  CHECKS,
  GHOST_DX,
  INK,
  LifecycleDrawing,
  PANELS,
  PROTOS,
  ProtoSwatch,
  VBH,
  VBW,
  panelView,
  setLens,
} from "@/components/test/lifecycle-drawing"

if (typeof window !== "undefined") gsap.registerPlugin(useGSAP, ScrollTrigger, DrawSVGPlugin, SplitText)

type Pair = [ro: string, en: string]

const CHAPTERS: {
  href: string
  name: Pair
  title: Pair
  body: Pair
  spec: [ro: string[], en: string[]] | "protocols"
}[] = [
  {
    href: "/servicii/proiectare-automatizari-bms",
    name: ["Proiectare", "Design"],
    title: ["Sistemul există întâi pe hârtie.", "The system exists on paper first."],
    body: [
      "Schema funcțională pe fiecare instalație, lista de puncte, secvențele de funcționare și caietul de sarcini. Proiectul se scrie pe protocoale deschise, ca să poată fi ofertat și executat și de alți furnizori.",
      "A functional diagram for each installation, the points list, the operating sequences and the technical specification. The design is written on open protocols, so other suppliers can bid for it and build it too.",
    ],
    spec: [
      ["Schemă funcțională", "Listă de puncte", "Caiet de sarcini"],
      ["Functional diagram", "Points list", "Specification"],
    ],
  },
  {
    href: "/servicii/executie-sisteme-bms",
    name: ["Execuție", "Execution"],
    title: ["Desenul devine instalație.", "The drawing becomes an installation."],
    body: [
      "Tabloul de automatizare, cablarea și echipamentele de câmp, programele și interfața grafică, apoi punerea în funcțiune și documentația As-built. Fiecare livrabil are un criteriu de recepție scris.",
      "The automation panel, cabling and field devices, the programs and the graphical interface, then commissioning and the As-built documentation. Every deliverable has a written acceptance criterion.",
    ],
    spec: [
      ["Tablou", "Cablare", "Punere în funcțiune", "As-built"],
      ["Panel", "Cabling", "Commissioning", "As-built"],
    ],
  },
  {
    href: "/servicii/integrare-sisteme-knx-dali-modbus-mbus",
    name: ["Integrare", "Integration"],
    title: ["Cinci protocoale, o\u00A0singură supervizare.", "Five protocols, one supervisory\u00A0layer."],
    body: [
      "Chillerele, centralele de tratare a aerului, iluminatul și contoarele vin cu automatizarea lor. Integrarea nu o înlocuiește: o citește și îi dă comenzi, prin protocoalele pe care echipamentele le vorbesc deja.",
      "Chillers, air handling units, lighting and meters come with their own controls. Integration does not replace them: it reads them and sends them commands, over the protocols the equipment already speaks.",
    ],
    spec: "protocols",
  },
  {
    href: "/servicii/intretinere-sisteme-bms",
    name: ["Întreținere", "Maintenance"],
    title: ["Verificat periodic, nu\u00A0doar reparat.", "Checked on schedule, not only\u00A0repaired."],
    body: [
      "Verificări planificate, cu frecvență declarată: programe orare, puncte trecute pe manual, deriva senzorilor, comunicația pe magistrale. Contractul se scrie pe severități, nu pe promisiuni.",
      "Planned checks at a declared frequency: schedules, points left in manual, sensor drift, communication on the buses. The contract is written on severities, not on promises.",
    ],
    spec: [
      ["Verificări planificate", "Registru de intervenții", "Raport periodic"],
      ["Planned checks", "Intervention log", "Periodic report"],
    ],
  },
  {
    href: "/servicii/modernizare-sisteme-de-automatizare-si-bms",
    name: ["Modernizare", "Modernisation"],
    title: ["Înnoit din mers, zonă cu zonă.", "Renewed\u00A0while\u00A0running, zone\u00A0by\u00A0zone."],
    body: [
      "Traseele de cablu, dulapurile tablourilor și o parte din elementele de câmp rămân pe loc, unde starea lor permite. Migrarea se face pe etape, zonă cu zonă, cu sistemul vechi și cel nou în paralel.",
      "Cable routes, panel cabinets and part of the field devices stay in place, where their condition allows. Migration happens in stages, zone by zone, with the old and new systems running in parallel.",
    ],
    spec: [
      ["Audit", "Migrare pe etape", "Sisteme în paralel"],
      ["Audit", "Staged migration", "Systems in parallel"],
    ],
  },
]

const N = CHAPTERS.length
const num = (i: number) => String(i + 1).padStart(2, "0")
const EXPO = "expo.out"
/** Where a rail click lands inside each chapter: once its drawing has finished (the last one, once the camera is back). */
const LAND = [0.74, 0.74, 0.74, 0.8, 0.985]

/** A one-line odometer: the stack of values slides so the chosen one shows (2em rows: whole pixels at 11px). */
function Roll({ items, index, className = "" }: { items: string[]; index: number; className?: string }) {
  return (
    <span className={`relative inline-block h-[2em] overflow-hidden ${className}`}>
      <span
        className="block transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none"
        style={{ transform: `translateY(${-index * 2}em)` }}
      >
        {items.map((x) => (
          <span key={x} className="block h-[2em] leading-[2em]">
            {x}
          </span>
        ))}
      </span>
    </span>
  )
}

function Spec({ i, lang }: { i: number; lang: "ro" | "en" }) {
  const spec = CHAPTERS[i].spec
  const chip = "flex items-center gap-2 rounded-[1px] border border-white/10 px-2 py-[5px] leading-none"
  return (
    <ul className="flex flex-wrap gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-white/55">
      {spec === "protocols"
        ? PROTOS.map((p) => (
            <li key={p.id} className={chip}>
              <ProtoSwatch id={p.id} className="w-3.5 text-[#C8E6C9]" />
              {p.name}
            </li>
          ))
        : spec[lang === "ro" ? 0 : 1].map((s) => (
            <li key={s} className={chip}>
              {s}
            </li>
          ))}
    </ul>
  )
}

/**
 * Fig. 05: Sovitech's service lifecycle as one technical drawing that grows
 * while you scroll. A pinned stage, five chapters (design, execution,
 * integration, maintenance, modernisation), one scrubbed master timeline.
 * With reduced motion it becomes a list of the five chapters beside the
 * finished drawing, which lights the layer of the chapter being read.
 */
export function LifecycleSection() {
  const { t, lang } = useLanguage()
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "")
  const rootRef = useRef<HTMLElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const drawRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLOListElement>(null)
  /** The chapter the drawing is in. */
  const activeRef = useRef(0)
  /** The chapter whose title is on screen (-1 for the moment between two titles). */
  const shownRef = useRef(0)
  const jumpRef = useRef<((i: number) => void) | null>(null)
  const introDone = useRef(false)
  const [active, setActive] = useState(0)
  const [textIdx, setTextIdx] = useState(0)
  const [inPin, setInPin] = useState(false)
  const [hovered, setHovered] = useState<number | null>(null)
  const [reading, setReading] = useState<number | null>(null)
  const lit = hovered ?? reading

  const L = (p: Pair) => (lang === "ro" ? p[0] : p[1])
  const names = CHAPTERS.map((c) => L(c.name))
  const drawingLabel = t(
    "Secțiune printr-o clădire cu tehnică pe acoperiș, două etaje, parter și subsol tehnic. Desenul arată, pe rând, proiectarea, execuția, integrarea magistralelor BACnet, DALI, KNX, M-Bus și Modbus într-un singur BMS, verificările periodice și înlocuirea controlerelor din tablouri, zonă cu zonă.",
    "Section through a building with roof plant, two floors, a ground floor and a basement plant room. The drawing shows, in turn, design, execution, the integration of BACnet, DALI, KNX, M-Bus and Modbus buses into one BMS, the periodic checks, and the replacement of the controllers inside the panels, zone by zone.",
  )

  // ── The master timeline: one pin, one scrub, labels per chapter. ─────────
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(
        { desktop: "(min-width: 1024px)", motion: "(prefers-reduced-motion: no-preference)" },
        (ctx) => {
          const { desktop, motion } = (ctx.conditions ?? {}) as { desktop?: boolean; motion?: boolean }
          const stage = stageRef.current
          const wrap = wrapRef.current
          const draw = drawRef.current
          const text = textRef.current
          const root = rootRef.current
          if (!motion || !stage || !wrap || !draw || !text || !root) return
          const box = draw.querySelector<HTMLElement>('[data-k="box"]')
          const sheet = draw.querySelector<SVGSVGElement>('svg[data-k="sheet"]')
          if (!box || !sheet) return

          const q = gsap.utils.selector(draw)
          const k = (key: string, extra = "") => q(`[data-k="${key}"]${extra}`) as Element[]

          // ── Chapter text ──────────────────────────────────────────────────
          // One title at a time. The one on screen leaves first (its lines rise out of their masks), then the
          // chapter the drawing has reached arrives; a title that is not on screen is never animated. If the
          // scroll keeps moving, the arrival waits until the chapter is stable, so a flick never stacks titles.
          const blocks = gsap.utils.toArray<HTMLElement>("[data-ch]", text)
          const linesOf = (b: HTMLElement) => gsap.utils.toArray<HTMLElement>(".lc-line", b)
          const fadesOf = (b: HTMLElement) => gsap.utils.toArray<HTMLElement>("[data-fade]", b)
          const all = (b: HTMLElement) => [b, ...linesOf(b), ...fadesOf(b)]
          const hide = (j: number) => {
            const b = blocks[j]
            const lines = linesOf(b)
            const fades = fadesOf(b)
            gsap.killTweensOf(all(b))
            gsap.set(b, { autoAlpha: 0 })
            if (lines.length) gsap.set(lines, { yPercent: 110 })
            if (fades.length) gsap.set(fades, { autoAlpha: 0, y: 0 })
          }
          const showNow = (j: number) => {
            const b = blocks[j]
            const lines = linesOf(b)
            const fades = fadesOf(b)
            gsap.killTweensOf(all(b))
            gsap.set(b, { autoAlpha: 1 })
            if (lines.length) gsap.set(lines, { yPercent: 0 })
            if (fades.length) gsap.set(fades, { autoAlpha: 1, y: 0 })
          }

          // Plain functions on purpose: what they start is tracked here and killed in cleanup (a contextSafe
          // wrapper called while the matchMedia context is active would nest the two contexts).
          let want = activeRef.current
          let phase: "idle" | "in" | "out" = "idle"
          let anim: gsap.core.Timeline | null = null
          let pending: gsap.core.Tween | null = null
          let changedAt = 0
          let waits = 0
          let forced: number | null = null
          let forceEnd: gsap.core.Tween | null = null

          const shown = (i: number) => {
            shownRef.current = i
            if (i >= 0) setTextIdx(i)
          }
          const enter = (from: number) => {
            pending = null
            const i = want
            const dir = i >= from ? 1 : -1
            blocks.forEach((_, j) => j !== i && hide(j))
            const b = blocks[i]
            const lines = linesOf(b)
            const fades = fadesOf(b)
            gsap.killTweensOf(all(b))
            gsap.set(b, { autoAlpha: 1 })
            shown(i)
            phase = "in"
            anim = gsap.timeline({
              onComplete: () => {
                phase = "idle"
                anim = null
                if (want !== shownRef.current) leave()
              },
            })
            if (lines.length) anim.fromTo(lines, { yPercent: 110 * dir }, { yPercent: 0, duration: 0.9, ease: EXPO, stagger: 0.07 }, 0)
            if (fades.length)
              anim.fromTo(fades, { autoAlpha: 0, y: 14 * dir }, { autoAlpha: 1, y: 0, duration: 0.75, ease: EXPO, stagger: 0.05 }, 0.1)
          }
          const arrive = (from: number) => {
            // Still moving: give the scroll a beat to settle on a chapter (never more than ~0.4s).
            if (performance.now() - changedAt < 110 && waits < 6) {
              waits++
              pending = gsap.delayedCall(0.07, () => arrive(from))
              return
            }
            waits = 0
            enter(from)
          }
          const leave = () => {
            const i = shownRef.current
            if (i < 0) return
            anim?.kill()
            const dir = want > i ? 1 : -1
            const b = blocks[i]
            const lines = linesOf(b)
            const fades = fadesOf(b)
            phase = "out"
            anim = gsap.timeline({
              onComplete: () => {
                hide(i)
                shownRef.current = -1
                phase = "idle"
                anim = null
                arrive(i)
              },
            })
            if (lines.length) anim.to(lines, { yPercent: -110 * dir, duration: 0.32, ease: "power3.in", stagger: 0.035 }, 0)
            if (fades.length) anim.to(fades, { autoAlpha: 0, y: -10 * dir, duration: 0.24, ease: "power2.in" }, 0)
            anim.set({}, {}, 0.05)
          }
          const request = (next: number) => {
            if (next !== want) {
              want = next
              changedAt = performance.now()
            }
            if (phase === "out" || shownRef.current < 0) return // the arrival reads `want` when it happens
            if (next !== shownRef.current) leave()
          }

          // Start from wherever the drawing is (a breakpoint change rebuilds all of this mid-scroll).
          blocks.forEach((_, j) => (j === want ? showNow(j) : hide(j)))
          shown(want)

          // ── Pulses: a short segment per bus, looping on the clock once the building is alive (chapter 4 on).
          const pulseGroup = k("pulses")
          const loops = k("pulse").map((el, i) => {
            const len = (el as SVGPathElement).getTotalLength()
            const seg = Math.min(9, (18 / len) * 100)
            const duration = len / 120
            const tw = gsap.fromTo(
              el,
              { drawSVG: `0% ${seg}%` },
              { drawSVG: `${100 - seg}% 100%`, duration, ease: "none", repeat: -1, paused: true },
            )
            tw.totalTime((((i % 2) * 0.5 + Math.floor(i / 2) * 0.23) % 1) * duration)
            return tw
          })
          const blink = gsap.to(k("node-dot"), { opacity: 0.2, duration: 0.7, ease: "sine.inOut", yoyo: true, repeat: -1, paused: true })
          let inView = false
          let alive = false
          const live = () => {
            const on = inView && activeRef.current >= 3
            if (on === alive) return
            alive = on
            loops.forEach((tw) => (on ? tw.resume() : tw.pause()))
            if (on) blink.resume()
            else blink.pause()
            gsap.to(pulseGroup, { autoAlpha: on ? 1 : 0, duration: 0.5, overwrite: true })
          }
          gsap.set(pulseGroup, { autoAlpha: 0 })

          // ── Camera (chapter 5): the viewBox moves, so hairlines stay 1px; the labels follow through CSS vars.
          const cam = { x: 0, y: 0, w: VBW }
          let camKey = ""
          let lens = false
          const applyCam = () => {
            const key = `${cam.x.toFixed(2)},${cam.y.toFixed(2)},${cam.w.toFixed(2)}`
            if (key === camKey) return
            camKey = key
            const h = (cam.w * VBH) / VBW
            sheet.setAttribute("viewBox", `${cam.x.toFixed(3)} ${cam.y.toFixed(3)} ${cam.w.toFixed(3)} ${h.toFixed(3)}`)
            box.style.setProperty("--vx", `${((cam.x / VBW) * 100).toFixed(4)}%`)
            box.style.setProperty("--vy", `${((cam.y / VBH) * 100).toFixed(4)}%`)
            box.style.setProperty("--vs", (VBW / cam.w).toFixed(5))
            // Zoomed in, the sheet runs to the box edges: soften them, like the edge of a lens.
            const z = Math.min(1, Math.max(0, (VBW / cam.w - 1) / 0.6))
            box.style.setProperty("--edge", `${(z * 7).toFixed(2)}%`)
            if (z > 0 !== lens) setLens(box, (lens = z > 0))
          }

          const sync = (progress: number) => {
            applyCam()
            const idx = Math.min(N - 1, Math.max(0, Math.floor(progress * N + 1e-4)))
            if (idx !== activeRef.current) {
              activeRef.current = idx
              setActive(idx)
            }
            if (forced !== null && idx === forced) {
              forced = null
              forceEnd?.kill()
            }
            if (forced === null) request(idx)
            live()
          }

          const header = () => (document.querySelector("header") as HTMLElement | null)?.offsetHeight ?? 64
          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: stage,
              pin: true,
              start: () => `top ${header()}px`,
              end: () => `+=${Math.round(window.innerHeight * (desktop ? 4.6 : 3.6))}`,
              scrub: 0.8,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onToggle: (self) => setInPin(self.isActive),
            },
          })
          const st = tl.scrollTrigger
          tl.eventCallback("onUpdate", () => sync(tl.progress()))

          // Rail: the text goes straight to the chapter chosen, the drawing scrubs there under it.
          jumpRef.current = (i: number) => {
            if (!st) return
            forced = i
            forceEnd?.kill()
            forceEnd = gsap.delayedCall(3, () => {
              forced = null
              request(activeRef.current)
            })
            request(i)
            window.scrollTo({ top: st.start + (st.end - st.start) * ((i + LAND[i]) / N), behavior: "smooth" })
          }

          const drawIn = (targets: gsap.TweenTarget, at: number, duration: number, stagger = 0) =>
            tl.fromTo(targets, { drawSVG: "0%" }, { drawSVG: "100%", duration, stagger }, at)
          const dim = (targets: gsap.TweenTarget, rest: string, at: number) =>
            tl.fromTo(targets, { color: INK.hi }, { color: rest, duration: 0.12 }, at)
          const layer = (n: number) => q(`[data-layer="${n}"]`)
          const labels = (n: number) => q(`[data-layer-label="${n}"]`)

          // 01 · Design (the sheet, axes and ground are already set by the approach, below): the dashed
          // outline draws itself, then its zones, dimensions and levels.
          tl.addLabel("proiectare", 0)
          tl.fromTo(k("dstruct"), { autoAlpha: 1 }, { autoAlpha: 1, duration: 0.01 }, 0)
          drawIn(k("m-struct"), 0.02, 0.34, 0.03)
          tl.fromTo(k("hatch"), { opacity: 0 }, { opacity: 1, duration: 0.2 }, 0.12)
          drawIn(k("m-zone"), 0.26, 0.22, 0.012)
          drawIn(k("dim"), 0.4, 0.2, 0.02)
          tl.fromTo(k("tick"), { opacity: 0 }, { opacity: 1, duration: 0.06, stagger: 0.015 }, 0.48)
          k("lvl").forEach((m, i) =>
            tl.fromTo([m, k("lvl-label")[i]], { autoAlpha: 0, x: -4 }, { autoAlpha: 1, x: 0, duration: 0.08 }, 0.46 + i * 0.03),
          )

          // 02 · Execution: design steps back, the dashes turn solid, then trays, devices and panels.
          tl.addLabel("executie", 1)
          dim(layer(1), INK.mid, 1)
          dim(labels(1), INK.edge, 1)
          drawIn(k("struct"), 1.02, 0.34, 0.025)
          tl.to(k("dstruct"), { autoAlpha: 0, duration: 0.42 }, 1.06)
          drawIn(k("arch"), 1.2, 0.2, 0.012)
          drawIn(k("tray"), 1.28, 0.24, 0.04)
          drawIn(k("dev"), 1.34, 0.3, 0.006)
          drawIn([...k("casing"), ...k("old")], 1.5, 0.18, 0.02)
          tl.fromTo(k("old"), { autoAlpha: 1 }, { autoAlpha: 1, duration: 0.01 }, 0)

          // 03 · Integration: the BMS, then each bus in turn, its label arriving with it.
          tl.addLabel("integrare", 2)
          dim(layer(2), INK.edge, 2)
          drawIn(k("node"), 2.02, 0.12, 0.02)
          tl.fromTo([...k("node-dot"), ...k("node-label")], { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.06 }, 2.1)
          PROTOS.forEach((p, i) => {
            const at = 2.06 + i * 0.07
            const sel = `[data-proto="${p.id}"]`
            drawIn(k("m-bus", sel), at, 0.32)
            if (k("m-drop", sel).length) drawIn(k("m-drop", sel), at + 0.2, 0.1)
            if (k("joint", sel).length) tl.fromTo(k("joint", sel), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.05, stagger: 0.02 }, at + 0.2)
            tl.fromTo(k("proto", sel), { autoAlpha: 0, x: -8 }, { autoAlpha: 1, x: 0, duration: 0.1 }, at)
          })
          drawIn(k("tap"), 2.42, 0.08, 0.03)

          // 04 · Maintenance: the buses dim so the pulses read; a sweep passes and every node gets its check.
          tl.addLabel("intretinere", 3)
          dim(layer(3), INK.edge, 3)
          dim(labels(3), INK.edge, 3)
          const sweep = k("sweep")
          tl.fromTo(sweep, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.05 }, 3.03)
          tl.fromTo(sweep, { y: 60 }, { y: 476, duration: 0.65 }, 3.05)
          tl.to(sweep, { autoAlpha: 0, duration: 0.06 }, 3.7)
          k("check").forEach((el, i) => {
            const at = 3.05 + ((CHECKS[i].y - 60) / 416) * 0.65
            tl.fromTo(el, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.01 }, at)
            drawIn(el.querySelector('[data-k="check-c"]'), at, 0.06)
            drawIn(el.querySelector('[data-k="check-p"]'), at + 0.04, 0.04)
          })

          // 05 · Modernisation: the camera pushes in on the panels and rides the riser up, floor by floor.
          // In each cabinet the old controller slides out, dashed, and the new one draws itself in mint; the
          // cabinet, the routes and the rest of the building stay. Then the camera pulls back to the whole.
          tl.addLabel("modernizare", 4)
          dim(labels(4), INK.edge, 4)
          const FULL = { x: 0, y: 0, w: VBW }
          const camTo = (from: typeof FULL, to: typeof FULL, at: number, duration: number) =>
            tl.fromTo(cam, { ...from }, { ...to, duration, ease: "power2.inOut", immediateRender: false }, at)
          const order = [...PANELS].reverse()
          camTo(FULL, panelView(order[0].y), 4.02, 0.13)
          order.forEach((p, i) => {
            const b = 4.15 + i * 0.24
            if (i > 0) camTo(panelView(order[i - 1].y), panelView(p.y), b - 0.06, 0.06)
            const sel = `[data-floor="${p.floor}"]`
            const ghost = k("ghost", sel)
            const tags = [...k("tag-new", sel), ...k("tag-old", sel)]
            tl.fromTo(k("zflash", sel), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.03 }, b)
            tl.to(k("zflash", sel), { autoAlpha: 0, duration: 0.04 }, b + 0.15)
            tl.to(k("old", sel), { autoAlpha: 0, duration: 0.03 }, b + 0.01)
            tl.fromTo(ghost, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.03 }, b + 0.01)
            tl.fromTo(ghost, { x: 0 }, { x: GHOST_DX, duration: 0.07, ease: "power2.inOut" }, b + 0.03)
            drawIn(k("new", sel), b + 0.06, 0.08, 0.006)
            drawIn(k("tapnew", sel), b + 0.11, 0.04)
            tl.fromTo(tags, { autoAlpha: 0, y: 4 }, { autoAlpha: 1, y: 0, duration: 0.03, stagger: 0.012 }, b + 0.08)
            tl.to(tags, { autoAlpha: 0, duration: 0.02 }, b + 0.165)
            tl.to(ghost, { opacity: 0.55, duration: 0.04 }, b + 0.14)
          })
          camTo(panelView(order[order.length - 1].y), FULL, 4.81, 0.14)

          // The rails: a vertical fill node to node (desktop), five segments (mobile).
          tl.fromTo(root.querySelectorAll("[data-rail-fill]"), { scaleY: 0 }, { scaleY: 1, duration: N - 1 }, 0)
          root.querySelectorAll("[data-seg]").forEach((el, i) => {
            tl.fromTo(el, { scaleX: 0 }, { scaleX: 1, duration: 1 }, i)
          })
          tl.set({}, {}, N)

          // ── The approach: while the stage rises into view, the sheet is laid out (grid, axes A–D, ground),
          // so the pin starts on a drawing already under way instead of an empty frame.
          const pre = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: wrap,
              start: "top bottom",
              end: () => `top ${header()}px`,
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          })
          pre.fromTo(k("grid"), { opacity: 0 }, { opacity: 1, duration: 0.5 }, 0)
          pre.fromTo(k("m-axis"), { drawSVG: "0%" }, { drawSVG: "100%", duration: 0.5, stagger: 0.07 }, 0.18)
          pre.fromTo(k("bubble"), { autoAlpha: 0, y: -6 }, { autoAlpha: 1, y: 0, duration: 0.12, stagger: 0.07 }, 0.2)
          pre.fromTo(k("ground"), { drawSVG: "0%" }, { drawSVG: "100%", duration: 0.32 }, 0.62)
          pre.set({}, {}, 1)

          ScrollTrigger.create({
            trigger: root,
            start: "top bottom",
            end: "bottom top",
            onToggle: (self) => {
              inView = self.isActive
              live()
            },
          })

          // Intro: the two heading lines rise out of their masks once.
          // (Not again after a breakpoint change: once seen, the intro simply stays.)
          if (!introDone.current) {
            const intro = root.querySelectorAll("[data-intro-line]")
            const introRest = root.querySelectorAll("[data-intro-fade]")
            gsap
              .timeline({
                scrollTrigger: { trigger: root, start: "top 78%", once: true },
                onStart: () => {
                  introDone.current = true
                },
              })
              .fromTo(intro, { yPercent: 110 }, { yPercent: 0, duration: 1.1, ease: EXPO, stagger: 0.09 })
              .fromTo(introRest, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.9, ease: EXPO, stagger: 0.08 }, 0.25)
          }

          let gone = false
          document.fonts?.ready.then(() => {
            if (!gone) ScrollTrigger.refresh()
          })

          return () => {
            gone = true
            jumpRef.current = null
            anim?.kill()
            pending?.kill()
            forceEnd?.kill()
            gsap.killTweensOf(blocks.flatMap(all))
            sheet.setAttribute("viewBox", `0 0 ${VBW} ${VBH}`)
            for (const v of ["--vx", "--vy", "--vs", "--edge"]) box.style.removeProperty(v)
            setLens(box, false)
          }
        },
      )
      return () => mm.revert()
    },
    { scope: rootRef },
  )

  // Chapter titles are split into lines (and re-split when the language changes, the elements are keyed by it).
  // reduceWhiteSpace: false keeps the no-break spaces, so a one-letter word never ends a line.
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const titles = gsap.utils.toArray<HTMLElement>("[data-ch-title]", textRef.current)
        titles.forEach((el) => {
          const i = Number(el.dataset.chTitle)
          SplitText.create(el, {
            type: "lines",
            mask: "lines",
            linesClass: "lc-line",
            reduceWhiteSpace: false,
            autoSplit: true,
            onSplit(self) {
              gsap.set(self.lines, { yPercent: i === shownRef.current ? 0 : 110 })
            },
          })
        })
      })
      return () => mm.revert()
    },
    { dependencies: [lang], scope: rootRef, revertOnUpdate: true },
  )

  // Reduced motion: the drawing lights the chapter being read (a band just under the middle of the screen).
  useEffect(() => {
    const list = listRef.current
    if (!list || typeof IntersectionObserver === "undefined") return
    const items = Array.from(list.children) as HTMLElement[]
    const seen = new Set<number>()
    let last: number | null | undefined
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const i = items.indexOf(e.target as HTMLElement)
          if (e.isIntersecting) seen.add(i)
          else seen.delete(i)
        }
        // Above the list: nothing chosen yet. Below it: the last chapter stays lit.
        const next = seen.size ? Math.max(...seen) : list.getBoundingClientRect().top > window.innerHeight * 0.5 ? null : N - 1
        if (next === last) return
        last = next
        setReading(next)
        setHovered(null) // a tapped chapter gives way once the reader scrolls on
      },
      { rootMargin: "-52% 0px -38% 0px" },
    )
    items.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  const frameTag = (
    <>
      <span className="hidden sm:inline">{t("ciclu · ", "lifecycle · ")}</span>
      {t("secțiune A–A", "section A–A")}
    </>
  )
  const footLeft = t("5 etape · 1 desen", "5 stages · 1 drawing")

  return (
    <section ref={rootRef} className="relative bg-[#07201C] text-white" aria-labelledby={`${uid}-h`}>
      {/* ── Intro ─────────────────────────────────────────────────────── */}
      <div className="container-site pt-16 sm:pt-20 lg:pt-24">
        <div className="mb-12 flex items-center justify-between border-b border-white/10 pb-5 font-mono text-[11px] uppercase tracking-[0.2em] text-white/40 lg:mb-16">
          <span className="text-[#C8E6C9]">• {t("Ciclul de viață al unui sistem", "The life of a system")}</span>
          <span className="hidden sm:inline">Fig. 05 / {t("De la proiect la clădire vie", "From drawing to a living building")}</span>
        </div>
        <div className="grid gap-8 pb-10 sm:pb-12 lg:grid-cols-12 lg:items-end lg:gap-10 lg:pb-16">
          <h2 id={`${uid}-h`} className="text-5xl font-light leading-none tracking-tighter md:text-6xl lg:col-span-7 lg:text-7xl">
            <span className="-mb-[0.12em] block overflow-hidden pb-[0.12em]">
              <span data-intro-line className="block">
                {t("De la proiect", "From drawing")}
              </span>
            </span>
            <span className="-mb-[0.12em] mt-2 block overflow-hidden pb-[0.12em]">
              <span data-intro-line className="block text-white/35">
                {t("la clădire vie.", "to a living building.")}
              </span>
            </span>
          </h2>
          <div className="lg:col-span-4 lg:col-start-9">
            <p data-intro-fade className="max-w-md text-base font-light leading-6 text-white/60">
              {t(
                "Un singur desen, cinci etape. Sovitech Control proiectează sistemul, îl execută, îl integrează cu echipamentele clădirii, îl întreține și, când îi vine vremea, îl modernizează.",
                "One drawing, five stages. Sovitech Control designs the system, builds it, integrates it with the building's equipment, maintains it and, when the time comes, modernises it.",
              )}
            </p>
            <p data-intro-fade className="mt-6 max-w-md border-t border-white/10 pt-4 font-mono text-[11px] leading-5 tracking-wide text-white/45">
              <span className="motion-reduce:hidden">{t("Derulați: desenul se completează la fiecare etapă.", "Scroll: the drawing grows with every stage.")}</span>
              <span className="hidden motion-reduce:inline">
                {t(
                  "Derulați sau alegeți o etapă: desenul arată ce adaugă fiecare.",
                  "Scroll or pick a stage: the drawing shows what each one adds.",
                )}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* ── Pinned stage (motion) ─────────────────────────────────────── */}
      <div ref={wrapRef} className="motion-reduce:hidden">
        <div ref={stageRef} className="relative h-[calc(100svh-65px)] overflow-hidden bg-[#07201C]">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(200,230,201,.03) 1px, transparent 1px), linear-gradient(90deg, rgba(200,230,201,.03) 1px, transparent 1px)",
              backgroundSize: "56px 56px",
              maskImage: "radial-gradient(ellipse 55% 65% at 70% 50%, #000 10%, transparent 75%)",
              WebkitMaskImage: "radial-gradient(ellipse 55% 65% at 70% 50%, #000 10%, transparent 75%)",
            }}
          />
          <div className="container-site relative h-full">
            <div className="flex h-full flex-col gap-4 py-3 sm:gap-6 sm:py-6 lg:grid lg:grid-cols-12 lg:items-center lg:gap-x-10 lg:gap-y-0 lg:py-10">
              {/* The drawing. Below lg its size is set by the height left for the text, and the frame hugs it, so it is never half empty. */}
              <div className="mx-auto w-full max-w-[calc(max(14rem,(100svh-65px-25rem)*1.28)+1.5rem+2px)] sm:max-w-[calc(max(18rem,(100svh-65px-35rem)*1.28)+3rem+2px)] lg:col-span-7 lg:col-start-6 lg:row-start-1 lg:max-w-none">
                <FigureFrame
                  tag={frameTag}
                  live={`${num(active)} · ${names[active]}`}
                  liveOn={inPin}
                  footLeft={footLeft}
                  footRight={`${VBW} × ${VBH}`}
                >
                  <div className="px-3 pb-8 pt-10 sm:px-6 sm:pb-11 sm:pt-14">
                    <div
                      ref={drawRef}
                      className="mx-auto w-full lg:max-w-[calc((100svh-65px-12rem)*1.28)]"
                    >
                      <LifecycleDrawing uid={`${uid}m`} lang={lang} mode="motion" label={drawingLabel} />
                    </div>
                  </div>
                </FigureFrame>
              </div>

              {/* The chapter */}
              <div className="flex min-h-0 flex-1 flex-col lg:col-span-5 lg:col-start-1 lg:row-start-1 lg:flex-none lg:py-2">
                <div className="flex items-center gap-4 font-mono text-[11px] uppercase leading-none tracking-[0.2em]" aria-hidden>
                  <span className="flex items-center tabular-nums">
                    <Roll items={CHAPTERS.map((_, i) => num(i))} index={active} className="text-[#C8E6C9]" />
                    <span className="inline-block h-[2em] leading-[2em] text-white/50">&nbsp;/ {num(N - 1)}</span>
                  </span>
                  <span className="h-px w-8 bg-white/15 sm:w-10" />
                  <Roll items={names} index={active} className="text-white/55" />
                </div>

                <div ref={textRef} className="mt-3 grid sm:mt-5 lg:mt-9">
                  {CHAPTERS.map((c, i) => (
                    <div
                      key={c.href}
                      data-ch={i}
                      inert={i !== textIdx}
                      className="col-start-1 row-start-1"
                      style={i === 0 ? undefined : { visibility: "hidden" }}
                    >
                      <h3
                        key={lang}
                        data-ch-title={i}
                        className="max-w-xl text-balance text-[1.75rem] font-light leading-[1.05] tracking-tighter sm:text-4xl lg:text-[clamp(2.25rem,3.4vw,3.25rem)] lg:leading-[1.04] [&_.lc-line-mask]:-my-[0.14em] [&_.lc-line-mask]:py-[0.14em]"
                      >
                        {L(c.title)}
                      </h3>
                      <p
                        data-fade
                        className="mt-3 max-w-md text-[14px] font-light leading-[1.45] text-white/60 sm:mt-5 sm:text-base sm:leading-6 lg:mt-6"
                      >
                        {L(c.body)}
                      </p>
                      <div data-fade className="mt-4 hidden sm:mt-6 lg:block [@media(min-height:740px)]:block">
                        <Spec i={i} lang={lang} />
                      </div>
                      <div data-fade className="mt-4 sm:mt-7">
                        <Link
                          href={c.href}
                          className="group inline-flex items-center gap-2 border-b border-white/20 pb-1 text-sm text-white transition-colors duration-150 hover:border-[#C8E6C9] hover:text-[#C8E6C9] focus-visible:rounded-[1px] focus-visible:border-[#C8E6C9] focus-visible:outline-solid focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[#C8E6C9]"
                        >
                          {t("Detalii serviciu", "Service details")}
                          <span className="sr-only">: {L(c.name)}</span>
                          <ArrowRight className="h-4 w-4 text-[#C8E6C9] transition-transform duration-150 group-hover:translate-x-0.5" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Mobile and tablet rail: five numbered segments at the foot of the stage, each filling with its chapter. */}
                <nav aria-label={t("Etapele ciclului", "Lifecycle stages")} className="mt-auto grid grid-cols-5 gap-1.5 pt-5 lg:hidden">
                  {CHAPTERS.map((c, i) => (
                    <button
                      key={c.href}
                      type="button"
                      onClick={() => jumpRef.current?.(i)}
                      aria-label={`${num(i)} ${L(c.name)}`}
                      aria-current={i === active ? "step" : undefined}
                      className="group relative rounded-[1px] pb-1 pt-2.5 text-left focus-visible:outline-solid focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-[#C8E6C9]"
                    >
                      <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-white/15" />
                      <span
                        aria-hidden
                        data-seg
                        className="absolute inset-x-0 top-0 h-px origin-left bg-[#C8E6C9]"
                        style={{ transform: "scaleX(0)" }}
                      />
                      <span
                        aria-hidden
                        className={`font-mono text-[10px] tracking-[0.2em] tabular-nums transition-colors duration-300 ${
                          i === active ? "text-[#C8E6C9]" : "text-white/50 group-hover:text-white/75"
                        }`}
                      >
                        {num(i)}
                      </span>
                    </button>
                  ))}
                </nav>

                {/* Desktop rail: five steps, a hairline that fills node to node. */}
                <nav aria-label={t("Etapele ciclului", "Lifecycle stages")} className="mt-12 hidden lg:block">
                  <ol className="relative">
                    <span aria-hidden className="absolute bottom-[14px] left-[3px] top-[14px] w-px bg-white/10" />
                    <span
                      aria-hidden
                      data-rail-fill
                      className="absolute bottom-[14px] left-[3px] top-[14px] w-px origin-top bg-[#C8E6C9]"
                      style={{ transform: "scaleY(0)" }}
                    />
                    {CHAPTERS.map((c, i) => (
                      <li key={c.href}>
                        <button
                          type="button"
                          onClick={() => jumpRef.current?.(i)}
                          aria-current={i === active ? "step" : undefined}
                          className="group relative -ml-2 flex h-7 items-center gap-4 rounded-[2px] pl-2 pr-3 text-left focus-visible:outline-solid focus-visible:outline-1 focus-visible:outline-offset-0 focus-visible:outline-[#C8E6C9]"
                        >
                          <span
                            aria-hidden
                            className={`relative size-[7px] rounded-full border transition-colors duration-300 ${
                              i <= active ? "border-[#C8E6C9] bg-[#C8E6C9]" : "border-white/35 bg-[#07201C] group-hover:border-white/70"
                            }`}
                          />
                          <span
                            className={`font-mono text-[11px] tracking-[0.2em] tabular-nums transition-colors duration-300 ${
                              i === active ? "text-[#C8E6C9]" : "text-white/50 group-hover:text-white/75"
                            }`}
                          >
                            {num(i)}
                          </span>
                          <span
                            className={`text-sm font-light transition-colors duration-150 ${
                              i === active ? "text-white" : "text-white/55 group-hover:text-white/80"
                            }`}
                          >
                            {L(c.name)}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
        <div aria-hidden className="h-8 sm:h-10 lg:h-4" />
      </div>

      {/* ── Reduced motion: the five chapters listed, the finished drawing beside them (above them, sticky, on phones) ── */}
      <div className="hidden motion-reduce:block">
        <div className="container-site pb-16 sm:pb-20 lg:pb-24">
          <div className="flex flex-col lg:grid lg:grid-cols-12 lg:gap-10">
            <div className="sticky top-[65px] z-10 -mx-4 bg-[#07201C] px-4 pb-4 pt-3 sm:-mx-6 sm:px-6 lg:static lg:col-span-7 lg:col-start-6 lg:row-start-1 lg:mx-0 lg:bg-transparent lg:p-0">
              <div className="mx-auto max-w-[max(15rem,calc(((100svh-65px)*0.42-100px)*1.28+26px))] sm:max-w-[max(20rem,calc(((100svh-65px)*0.45-130px)*1.28+50px))] lg:sticky lg:top-24 lg:max-w-none">
                <FigureFrame
                  tag={frameTag}
                  live={lit === null ? t("toate etapele", "all stages") : `${num(lit)} · ${names[lit]}`}
                  liveOn={lit !== null}
                  footLeft={footLeft}
                  footRight={`${VBW} × ${VBH}`}
                >
                  <div className="px-3 pb-8 pt-10 sm:px-6 sm:pb-11 sm:pt-14">
                    <LifecycleDrawing uid={`${uid}s`} lang={lang} mode="static" highlight={lit} label={drawingLabel} />
                  </div>
                </FigureFrame>
              </div>
            </div>
            <ol ref={listRef} className="mt-6 border-t border-white/10 lg:col-span-5 lg:row-start-1 lg:mt-0">
              {CHAPTERS.map((c, i) => (
                <li
                  key={c.href}
                  onClick={() => setHovered(i)}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(i)}
                  onBlur={() => setHovered(null)}
                  className="relative border-b border-white/10 py-8"
                >
                  <span
                    aria-hidden
                    className={`absolute inset-x-0 top-0 h-px bg-[#C8E6C9] ${lit === i ? "opacity-100" : "opacity-0"}`}
                  />
                  <p className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.2em]">
                    <span className="text-[#C8E6C9]">{num(i)}</span>
                    <span className="h-px w-8 bg-white/15" />
                    <span className={lit === i ? "text-white" : "text-white/55"}>{L(c.name)}</span>
                  </p>
                  <h3 className="mt-5 text-balance text-3xl font-light leading-tight tracking-tighter sm:text-4xl">{L(c.title)}</h3>
                  <p className="mt-4 max-w-md text-base font-light leading-6 text-white/60">{L(c.body)}</p>
                  <div className="mt-5">
                    <Spec i={i} lang={lang} />
                  </div>
                  <Link
                    href={c.href}
                    className="mt-6 inline-flex items-center gap-2 border-b border-white/20 pb-1 text-sm text-white hover:border-[#C8E6C9] hover:text-[#C8E6C9] focus-visible:rounded-[1px] focus-visible:border-[#C8E6C9] focus-visible:outline-solid focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[#C8E6C9]"
                  >
                    {t("Detalii serviciu", "Service details")}
                    <span className="sr-only">: {L(c.name)}</span>
                    <ArrowRight className="h-4 w-4 text-[#C8E6C9]" />
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
