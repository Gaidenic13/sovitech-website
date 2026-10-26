"use client"

import { useCallback, useId, useRef, useState, type CSSProperties, type ReactNode } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin"
import { useGSAP } from "@gsap/react"
import { useLanguage } from "@/lib/language-context"
import { DayScene, SCENE_CSS, SUN_RISE_PT, SUN_SET_PT, skyAt } from "./day-cycle-scene"
import { DayRuler, type TrackProps } from "./day-cycle-ruler"
import { EVENTS, MODES, MOMENTS, SURFACE_CSS, clock, eventIndexAt, modeAt, plantAt } from "./day-cycle-data"

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, useGSAP)

/* ── Which layout ──────────────────────────────────────────────────────────
 * The scrubbed stage needs a screen with room: 600px of height (a phone held
 * upright, a tablet), or 540px from 1024px wide. Shorter screens (a phone on
 * its side, a small laptop window) and reduced motion get the still layout.
 * CSS picks the layout, so the server markup is already the right one; GSAP
 * builds the scrub only where the same query matches.
 */
const PIN =
  "(prefers-reduced-motion: no-preference) and (min-height: 600px), (prefers-reduced-motion: no-preference) and (min-width: 1024px) and (min-height: 540px)"

/*
 * The track reserves the whole scroll length in the markup (no pin-spacer appears after hydration),
 * and the stage sticks under the 64px header. The stage is as tall as the large viewport, so when a
 * phone's toolbar collapses there is still surface under it; its content box is the small viewport.
 */
const LAYOUT_CSS = `
.dc-p,.dc-pi{display:none}
@media ${PIN}{.dc-p{display:block}.dc-pi{display:inline}.dc-s,.dc-si{display:none}}
.dc-track{position:relative;height:calc(100lvh - 4rem + 280svh)}
@media (min-width:768px){.dc-track{height:calc(100lvh - 4rem + 360svh)}}
.dc-stage{position:sticky;top:4rem;height:calc(100lvh - 4rem);overflow:hidden}
.dc-box{position:relative;height:calc(100svh - 4rem)}
[data-dc-layer="day"]{clip-path:circle(0px at 0px 0px)}
.dc-rl{--dc-gh:2.5rem}
@media (min-width:1024px){.dc-rl{--dc-gh:3rem}}
@media (min-width:1024px) and (min-height:720px){.dc-rl{--dc-gh:4rem}}
.dc-gh{height:var(--dc-gh)}
.dc-gut{display:none}
@media (min-width:1024px) and (min-height:720px){.dc-gut{display:block}}
.dc-nh{top:calc(var(--dc-gh) + 14px)}
.dc-lad{display:none}
@media (min-width:1024px) and (min-height:800px){.dc-lad{display:block}.dc-row{display:none}}
.dc-grid{mask-image:radial-gradient(ellipse 75% 45% at 50% 64%,#000 15%,transparent 75%);-webkit-mask-image:radial-gradient(ellipse 75% 45% at 50% 64%,#000 15%,transparent 75%)}
@media (min-width:1024px){.dc-grid{mask-image:radial-gradient(ellipse 55% 65% at 70% 45%,#000 15%,transparent 75%);-webkit-mask-image:radial-gradient(ellipse 55% 65% at 70% 45%,#000 15%,transparent 75%)}}
@keyframes dc-in{from{opacity:0;transform:translateY(4px)}}
.dc-in{animation:dc-in .5s cubic-bezier(.16,1,.3,1) both}
@keyframes dc-ui{from{transform:translateY(100%)}}
@keyframes dc-uo{to{transform:translateY(-100%)}}
@keyframes dc-di{from{transform:translateY(-100%)}}
@keyframes dc-do{to{transform:translateY(100%)}}
@media (prefers-reduced-motion:reduce){.dc-in,.dc-roll>span{animation-duration:1ms!important}}
`

/* ── Motion model ──────────────────────────────────────────────────────────
 * One paused timeline whose time is the hour of the day (0–24), driven by one
 * scrubbed ScrollTrigger. Colours never tween: the stage holds two complete
 * surfaces, night and day, and the day one is revealed by a circle that grows
 * out of the sunrise and shrinks back into the sunset. Every stroke and every
 * word always sits on its own surface.
 */

const DAWN = [6.25, 7.25] // the day surface spreads from the sunrise point
const DUSK = [19, 19.75] // and withdraws into the sunset point
const FAN_SPEED = [0, 0, 0.42, 1] // by mode: off at night, part load in standby, full in comfort
const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v))

function buildDay(scope: HTMLElement) {
  const q = gsap.utils.selector(scope)
  const num = (el: Element, k: string) => Number((el as HTMLElement | SVGElement).dataset[k])
  const tl = gsap.timeline({ paused: true, defaults: { ease: "none" } })

  tl.addLabel("noapte", 0).addLabel("zori", DAWN[0]).addLabel("zi", DAWN[1]).addLabel("amurg", DUSK[0]).addLabel("seara", DUSK[1])

  // Occupancy: every window by its own zone's arrival and departure, a few minutes apart.
  q("[data-lit]").forEach((el) => {
    tl.to(el, { opacity: 1, duration: 0.2, ease: "power1.out" }, num(el, "on"))
    tl.to(el, { opacity: 0, duration: 0.2, ease: "power1.in" }, num(el, "off"))
  })
  // Shading: blinds follow the sun from the south-east facade to the south-west one.
  q("[data-blind]").forEach((el) => {
    const h = num(el, "h")
    tl.to(el, { y: 0, duration: 0.25, ease: "power2.inOut" }, num(el, "down"))
    tl.to(el, { y: -h, duration: 0.25, ease: "power2.inOut" }, num(el, "up"))
  })
  q("[data-needle]").forEach((el) => tl.fromTo(el, { xPercent: 0 }, { xPercent: 100, duration: 24 }, 0))
  q("[data-progress]").forEach((el) =>
    tl.fromTo(el, { clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 24 }, 0),
  )
  tl.set({}, {}, 24)

  const all = <E extends Element>(sel: string) => Array.from(scope.querySelectorAll<E>(sel))
  const suns = all<SVGGElement>("[data-sun]")
  const moons = all<SVGGElement>("[data-moon]")
  const shadows = all<SVGPathElement>("[data-shadow]")
  const scenes = all<SVGSVGElement>("[data-scene]")
  const fans = all<SVGGElement>("[data-fan]")

  /** What a timeline can't tween: bodies on an arc, a shadow's outline, the plant's run state. */
  function sky(h: number) {
    const s = skyAt(h)
    const sun = `translate(${s.sun.x.toFixed(1)} ${s.sun.y.toFixed(1)})`
    const moon = `translate(${s.moon.x.toFixed(1)} ${s.moon.y.toFixed(1)})`
    const run = modeAt(h) >= 2 ? "1" : "0"
    suns.forEach((el) => {
      el.setAttribute("transform", sun)
      el.style.opacity = s.sun.o.toFixed(3)
    })
    moons.forEach((el) => {
      el.setAttribute("transform", moon)
      el.style.opacity = s.moon.o.toFixed(3)
    })
    shadows.forEach((el) => {
      el.setAttribute("d", s.shadow.d)
      el.style.opacity = s.shadow.o.toFixed(3)
    })
    scenes.forEach((el) => el.setAttribute("data-run", run))
  }

  return { tl, sky, fans }
}

/* ── Small pieces ─────────────────────────────────────────────────────────── */

/** One odometer wheel: the new digit rolls in, the old one out, always in the direction time moves. */
function Roll({ d, dir }: { d: number; dir: number }) {
  const [s, setS] = useState({ d, prev: d, dir, k: 0 })
  if (s.d !== d) setS({ d, prev: s.d, dir, k: s.k + 1 })
  const [inA, outA] = s.dir < 0 ? ["dc-di", "dc-do"] : ["dc-ui", "dc-uo"]
  const ease = " .6s cubic-bezier(.16,1,.3,1) both"
  return (
    <span className="dc-roll relative inline-block h-[1em] overflow-hidden align-top">
      {s.k > 0 && (
        <span key={`o${s.k}`} className="absolute inset-x-0 top-0 block" style={{ animation: outA + ease }}>
          {s.prev}
        </span>
      )}
      <span key={`i${s.k}`} className="block" style={s.k > 0 ? { animation: inA + ease } : undefined}>
        {s.d}
      </span>
    </span>
  )
}

function Clock({ step, className }: { step: number; className?: string }) {
  const [m, setM] = useState({ step, dir: 1 })
  if (m.step !== step) setM({ step, dir: step > m.step ? 1 : -1 })
  const hh = Math.floor(step / 4)
  const mm = (step % 4) * 15
  return (
    <span aria-hidden className={`flex font-light leading-none tracking-tighter tabular-nums ${className ?? ""}`}>
      <Roll d={Math.floor(hh / 10)} dir={m.dir} />
      <Roll d={hh % 10} dir={m.dir} />
      <span className="relative -top-[0.06em] px-[0.02em]" style={{ color: "var(--dc-dim)" }}>
        :
      </span>
      <Roll d={Math.floor(mm / 10)} dir={m.dir} />
      <Roll d={mm % 10} dir={m.dir} />
    </span>
  )
}

/** Four bars, one per mode, lowest to highest: the meter fills up to the mode in force. */
function ModeMeter({ level }: { level: number }) {
  return (
    <span aria-hidden className="flex h-4 items-end gap-[3px]">
      {[0, 1, 2, 3].map((i) => (
        <span
          key={i}
          className="w-[3px] rounded-[1px] transition-colors duration-300"
          style={{ height: 4 + i * 4, background: i <= level ? "var(--dc-accent)" : "var(--dc-rule-2)" }}
        />
      ))}
    </span>
  )
}

/**
 * The four room modes stacked like a BMS mode selector, with the one in force lit and an accent
 * rail beside it; for desktops tall enough to give the left column room.
 */
function ModeLadder({ mode }: { mode: number }) {
  const { t, lang } = useLanguage()
  return (
    <div data-rise="" className="dc-lad">
      <span className="block font-mono text-[11px] uppercase tracking-[0.2em]" style={{ color: "var(--dc-ink-3)" }}>
        {t("Regim", "Mode")}
      </span>
      <div className="relative mt-4">
        <span aria-hidden className="absolute inset-y-0 left-0 w-px" style={{ background: "var(--dc-rule-2)" }} />
        <span
          aria-hidden
          className="absolute left-0 top-0 h-1/4 w-px transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ background: "var(--dc-accent)", transform: `translateY(${(3 - mode) * 100}%)` }}
        />
        <ol>
          {[3, 2, 1, 0].map((m) => (
            <li
              key={m}
              className="flex items-baseline gap-3 pl-5 text-[1.75rem] font-light leading-[1.3] tracking-tight transition-colors duration-500"
              style={{ color: m === mode ? "var(--dc-ink)" : "var(--dc-dim)" }}
            >
              {lang === "ro" ? MODES[m].ro : MODES[m].en}
              {m === mode && (
                <span className="dc-in font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: "var(--dc-accent)" }}>
                  {t("activ", "active")}
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

/**
 * The frame every figure on /test sits in (components/test/figure-frame.tsx), here in the section's
 * own surface colours, which the shared frame's dark/light tones cannot express.
 */
function Frame({
  tag,
  live,
  liveOn,
  footLeft,
  footRight,
  className = "",
  children,
}: {
  tag: ReactNode
  live: ReactNode
  liveOn: boolean
  footLeft?: ReactNode
  footRight?: ReactNode
  className?: string
  children: ReactNode
}) {
  const tick = "pointer-events-none absolute size-3"
  const tickColor = { borderColor: "color-mix(in srgb, var(--dc-accent) 50%, transparent)" }
  return (
    <figure className={`@container relative rounded-[2px] border ${className}`} style={{ borderColor: "var(--dc-rule)" }}>
      <span aria-hidden className={`${tick} -left-px -top-px border-l border-t`} style={tickColor} />
      <span aria-hidden className={`${tick} -right-px -top-px border-r border-t`} style={tickColor} />
      <span aria-hidden className={`${tick} -bottom-px -left-px border-b border-l`} style={tickColor} />
      <span aria-hidden className={`${tick} -bottom-px -right-px border-b border-r`} style={tickColor} />
      <figcaption className="pointer-events-none absolute inset-x-3 top-3 z-10 flex items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.18em] sm:inset-x-5 sm:top-4">
        <span className="hidden truncate @[30rem]:inline" style={{ color: "var(--dc-ink-3)" }}>
          {tag}
        </span>
        <span className="ml-auto flex min-w-0 items-center gap-2 tabular-nums">
          <span
            aria-hidden
            className="size-1.5 shrink-0 rounded-full transition-colors duration-300"
            style={{ background: liveOn ? "var(--dc-accent)" : "var(--dc-rule-2)" }}
          />
          <span className="truncate" style={{ color: liveOn ? "var(--dc-accent)" : "var(--dc-ink-3)" }}>
            {live}
          </span>
        </span>
      </figcaption>
      {children}
      {(footLeft || footRight) && (
        <div
          className="pointer-events-none absolute inset-x-5 bottom-4 hidden justify-between font-mono text-[10px] uppercase tracking-[0.18em] sm:flex"
          style={{ color: "var(--dc-ink-3)" }}
        >
          <span>{footLeft}</span>
          <span>{footRight}</span>
        </div>
      )}
    </figure>
  )
}

/** The drafting grid behind the figure, as on the hero, in the surface's own ink. */
function DraftGrid() {
  return (
    <div
      aria-hidden
      className="dc-grid pointer-events-none absolute inset-0"
      style={{
        backgroundImage:
          "linear-gradient(var(--dc-grid) 1px, transparent 1px), linear-gradient(90deg, var(--dc-grid) 1px, transparent 1px)",
        backgroundSize: "56px 56px",
      }}
    />
  )
}

const FACADES_RO: [string, string] = ["S-E", "S-V"]
const FACADES_EN: [string, string] = ["SE", "SW"]
function useFacades() {
  return useLanguage().lang === "ro" ? FACADES_RO : FACADES_EN
}

function useSceneId() {
  return "dc" + useId().replace(/[^a-zA-Z0-9_-]/g, "")
}

const SURFACE_STYLE: CSSProperties = { background: "var(--dc-bg)", color: "var(--dc-ink)" }

/** The whole day for assistive tech, independent of the animation. */
function ScheduleList() {
  const { t, lang } = useLanguage()
  return (
    <ol className="sr-only">
      {EVENTS.map((e) => (
        <li key={e.t}>
          {clock(e.t)}, {t("regim", "mode")} {lang === "ro" ? MODES[e.mode].ro : MODES[e.mode].en}: {lang === "ro" ? e.dro : e.den}
        </li>
      ))}
    </ol>
  )
}

/** Eyebrow, headline and lead: in the flow above the stage, so they are read before the day starts. */
function Header({ id }: { id: string }) {
  const { t } = useLanguage()
  return (
    <div data-dc-head="" className="container-site relative pb-12 pt-16 sm:pb-14 sm:pt-20 lg:pb-16 lg:pt-24">
      <div
        data-hd=""
        className="mb-10 flex items-center justify-between border-b pb-5 font-mono text-[11px] uppercase tracking-[0.2em] lg:mb-14"
        style={{ borderColor: "var(--dc-rule)", color: "var(--dc-ink-3)" }}
      >
        <span style={{ color: "var(--dc-accent)" }}>• {t("O zi în clădire", "A day in the building")}</span>
        <span className="hidden sm:inline">Fig. 03 / {t("Programul orar", "The time program")}</span>
      </div>
      <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-10">
        <h2 id={id} className="lg:col-span-7">
          <span data-hd="" className="block text-4xl font-light leading-none tracking-tighter sm:text-5xl lg:text-6xl">
            {t("Clădirea doarme, se trezește, lucrează.", "The building sleeps, wakes, works.")}
          </span>
          <span
            data-hd=""
            className="mt-2 block text-4xl font-light leading-none tracking-tighter sm:text-5xl lg:text-6xl"
            style={{ color: "var(--dc-dim)" }}
          >
            {t("BMS-ul ține ritmul.", "The BMS keeps time.")}
          </span>
        </h2>
        <div data-hd="" className="lg:col-span-5">
          <p className="max-w-md text-base font-light leading-6" style={{ color: "var(--dc-ink-2)" }}>
            {t(
              "Un program orar trece clădirea prin regimurile ei de funcționare, de la reducerea de noapte la confort. Senzorii de prezență și stația meteo ajustează apoi fiecare zonă.",
              "A time program takes the building through its operating modes, from night setback to comfort. Presence sensors and the weather station then adjust each zone.",
            )}
          </p>
          <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.2em]" style={{ color: "var(--dc-ink-3)" }}>
            <span className="dc-pi">{t("Derulați · 00:00 → 24:00", "Scroll · 00:00 → 24:00")}</span>
            <span className="dc-si">{t("Trei momente din aceeași zi", "Three moments of the same day")}</span>
          </p>
        </div>
      </div>
    </div>
  )
}

/* ── The stage: one complete surface ─────────────────────────────────────── */

type StageState = { step: number; hover: number | null; focused: boolean; dragging: boolean }

function Stage({ uid, state, track }: { uid: string; state: StageState; track?: TrackProps }) {
  const { t, lang } = useLanguage()
  const facades = useFacades()
  const { step } = state
  const h = step / 4
  const mode = modeAt(h)
  const evIndex = eventIndexAt(h)
  const ev = EVENTS[evIndex]
  const name = lang === "ro" ? MODES[mode].ro : MODES[mode].en
  const plant = plantAt(h, lang)

  return (
    <div className="dc-box">
      <DraftGrid />
      <div className="container-site relative flex h-full flex-col gap-3 py-3 sm:gap-5 sm:py-5 lg:gap-6 lg:py-6">
        <div className="grid min-h-0 flex-1 grid-rows-[auto_minmax(13rem,1fr)] gap-3 sm:gap-5 lg:grid-cols-12 lg:grid-rows-1 lg:gap-10">
          <div className="flex min-h-0 flex-col lg:col-span-5 lg:justify-between">
            <div className="flex items-end justify-between gap-4 lg:block">
              <div data-rise="">
                <span className="block font-mono text-[11px] uppercase tracking-[0.2em]" style={{ color: "var(--dc-ink-3)" }}>
                  {t("Ora clădirii", "Building time")}
                </span>
                <Clock
                  step={step}
                  className="mt-1.5 text-[length:clamp(3.25rem,min(21vw,10.5svh),6rem)] lg:mt-3 lg:text-[length:clamp(4.5rem,min(12vw,19svh),11.5rem)]"
                />
                <span data-dc-time="" className="sr-only">
                  {clock(h)}
                </span>
              </div>
              <div data-rise="" className="flex items-center gap-2.5 pb-1 lg:hidden">
                <ModeMeter level={mode} />
                <span key={`${mode}-${lang}`} className="dc-in text-lg font-light leading-tight tracking-tight sm:text-xl">
                  {name}
                </span>
              </div>
            </div>

            <ModeLadder mode={mode} />

            <div>
              <div
                data-rise=""
                className="dc-row hidden items-center gap-3 border-t pt-5 lg:flex"
                style={{ borderColor: "var(--dc-rule)" }}
              >
                <ModeMeter level={mode} />
                <span className="font-mono text-[11px] uppercase tracking-[0.2em]" style={{ color: "var(--dc-ink-3)" }}>
                  {t("Regim", "Mode")}
                </span>
                <span key={`${mode}-${lang}`} className="dc-in text-3xl font-light leading-tight tracking-tight">
                  {name}
                </span>
              </div>
              <div data-rise="" className="mt-2.5 min-h-[5.25rem] max-w-md sm:mt-3 sm:min-h-[6rem] lg:mt-5 lg:min-h-[6.5rem]">
                <span className="block font-mono text-[11px] uppercase tracking-[0.2em] tabular-nums" style={{ color: "var(--dc-accent)" }}>
                  {clock(ev.t)} · {lang === "ro" ? ev.ro : ev.en}
                </span>
                <p
                  key={`${evIndex}-${lang}`}
                  className="dc-in mt-1.5 text-sm font-light leading-5 sm:text-base sm:leading-6 lg:mt-2"
                  style={{ color: "var(--dc-ink-2)" }}
                >
                  {lang === "ro" ? ev.dro : ev.den}
                </p>
              </div>
            </div>
          </div>

          <div className="relative min-h-0 lg:col-span-7">
            <Frame
              className="h-full"
              tag={t("clădire de birouri · iso 2:1", "office block · iso 2:1")}
              live={plant.text}
              liveOn={plant.on}
              footLeft={t("fațade S-E · S-V", "SE · SW facades")}
              footRight="00:00 → 24:00"
            >
              <div className="absolute inset-x-2 bottom-2 top-9 sm:inset-x-4 sm:bottom-6 sm:top-7">
                <DayScene uid={uid} className="h-full w-full" facades={facades} />
              </div>
            </Frame>
          </div>
        </div>

        <div data-rise="">
          <DayRuler step={step} hover={state.hover} focused={state.focused} dragging={state.dragging} track={track} />
        </div>
      </div>
    </div>
  )
}

/* ── The scroll-driven layout ─────────────────────────────────────────────── */

function DayPinned({ uid }: { uid: string }) {
  const { t, lang } = useLanguage()
  const root = useRef<HTMLDivElement>(null)
  const stRef = useRef<ScrollTrigger | null>(null)
  const trackEl = useRef<HTMLDivElement>(null)
  const drag = useRef<{ id: number; x: number; moved: boolean } | null>(null)
  const [step, setStep] = useState(0)
  const [hover, setHover] = useState<number | null>(null)
  const [focused, setFocused] = useState(false)
  const [dragging, setDragging] = useState(false)

  useGSAP(
    () => {
      const el = root.current
      const track = el?.querySelector<HTMLElement>(".dc-track")
      const stage = el?.querySelector<HTMLElement>(".dc-stage")
      const night = el?.querySelector<HTMLElement>('[data-dc-layer="night"]')
      const dayLayer = el?.querySelector<HTMLElement>('[data-dc-layer="day"]')
      if (!el || !track || !stage || !night || !dayLayer) return

      const mm = gsap.matchMedia()
      mm.add(PIN, () => {
        // Entrance: while the stage rises into view, the night building is drafted, wireframe first,
        // floor by floor, then its plates fill in and hide what is behind them; the type rises after.
        const qd = gsap.utils.selector(night)
        const draft = gsap.timeline({ defaults: { ease: "none" } })
        // One fromTo per element, not a staggered from(): after a refresh, a staggered from() only
        // restores the start state of the children the playhead has already reached.
        const seq = (els: Element[], from: gsap.TweenVars, to: gsap.TweenVars, at: number, each: number) =>
          els.forEach((e, i) => draft.fromTo(e, from, to, at + i * each))
        const DRAWN = { drawSVG: "0% 0%" }
        const DRAW = (d: number) => ({ drawSVG: "0% 100%", duration: d })
        draft.fromTo(night, { "--dc-fill": 0 }, { "--dc-fill": 1, duration: 0.3, ease: "power1.inOut" }, 0.62)
        seq(qd('[data-draft="base"]'), DRAWN, DRAW(0.34), 0, 0.03)
        for (let f = 0; f <= 4; f++) seq(qd(`[data-draft="win"][data-floor="${f}"]`), DRAWN, DRAW(0.14), 0.2 + f * 0.07, 0.006)
        seq(qd('[data-draft="roof"]'), DRAWN, DRAW(0.2), 0.55, 0.012)
        seq(qd("[data-ground]"), { opacity: 0 }, { opacity: 1, duration: 0.45 }, 0.15, 0)
        seq(qd("[data-skyline], [data-blades]"), { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0.6, 0)
        seq(qd("[data-rise]"), { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3, ease: "power2.out" }, 0.38, 0.05)
        draft.set({}, {}, 1)
        ScrollTrigger.create({
          trigger: track,
          start: "top bottom",
          end: "top top+=64",
          scrub: 0.6,
          invalidateOnRefresh: true,
          animation: draft,
          onRefresh: (self) => draft.progress(self.progress),
        })

        const day = buildDay(stage)
        const nightScene = night.querySelector<SVGSVGElement>("[data-scene]")
        const dayScene = dayLayer.querySelector<SVGSVGElement>("[data-scene]")

        // Where, on the stage, the sun rises and sets: the wipe's two centres, and the radius that
        // covers the whole stage from either of them.
        const geo = { rise: { x: 0, y: 0 }, set: { x: 0, y: 0 }, max: 0 }
        const measure = () => {
          const m = nightScene?.getScreenCTM()
          if (!m) return
          const box = dayLayer.getBoundingClientRect()
          const at = ([x, y]: readonly [number, number]) => {
            const p = new DOMPoint(x, y).matrixTransform(m)
            return { x: p.x - box.left, y: p.y - box.top }
          }
          geo.rise = at(SUN_RISE_PT)
          geo.set = at(SUN_SET_PT)
          const corners = [
            [0, 0],
            [box.width, 0],
            [0, box.height],
            [box.width, box.height],
          ]
          const far = (c: { x: number; y: number }) => Math.max(...corners.map(([x, y]) => Math.hypot(x - c.x, y - c.y)))
          geo.max = Math.max(far(geo.rise), far(geo.set)) + 2
        }

        const ease = gsap.parseEase("power2.inOut")
        const wipe = (h: number) => {
          const am = h < 13
          const k = am
            ? ease(clamp((h - DAWN[0]) / (DAWN[1] - DAWN[0]), 0, 1))
            : 1 - ease(clamp((h - DUSK[0]) / (DUSK[1] - DUSK[0]), 0, 1))
          const c = am ? geo.rise : geo.set
          dayLayer.style.clipPath =
            k <= 0 ? "" : k >= 1 ? "none" : `circle(${(k * geo.max).toFixed(1)}px at ${c.x.toFixed(1)}px ${c.y.toFixed(1)}px)`
          // whichever drawing is fully covered is not painted at all
          if (nightScene) nightScene.style.visibility = k >= 1 ? "hidden" : ""
          if (dayScene) dayScene.style.visibility = k <= 0 ? "hidden" : ""
        }

        let last = -1
        let target = 0
        const apply = (h: number) => {
          day.sky(h)
          wipe(h)
          target = FAN_SPEED[modeAt(h)]
          // a pixel of scroll is ~0.03 of a quarter: round that away so a rest on a mark reads as the mark
          const s = clamp(Math.floor(h * 4 + 0.04), 0, 96)
          if (s !== last) {
            last = s
            setStep(s)
          }
        }
        day.tl.eventCallback("onUpdate", () => apply(day.tl.time()))

        stRef.current = ScrollTrigger.create({
          trigger: track,
          start: "top top+=64",
          end: () => `+=${Math.max(1, track.offsetHeight - stage.offsetHeight)}`,
          scrub: 0.8,
          invalidateOnRefresh: true,
          animation: day.tl,
          // after a reload or a resize, start from where the scroll is, not from 00:00
          onRefresh: (self) => {
            measure()
            day.tl.progress(self.progress)
            apply(day.tl.time())
          },
        })

        // The rooftop fans run on their own clock while the section is on screen, easing between speeds.
        const seen = ScrollTrigger.create({ trigger: track, start: "top bottom", end: "bottom top" })
        let speed = 0
        let angle = 0
        const spin = (_time: number, dt: number) => {
          if (!seen.isActive) return
          speed += (target - speed) * (1 - Math.exp(-dt / 650))
          if (speed < 0.002 && target === 0) return
          angle = (angle + speed * dt * 0.5) % 360
          day.fans.forEach((f, i) => f.setAttribute("transform", `rotate(${(i % 2 ? 37 - angle * 0.92 : angle).toFixed(1)})`))
        }
        gsap.ticker.add(spin)

        return () => {
          gsap.ticker.remove(spin)
          stRef.current = null
          dayLayer.style.clipPath = ""
          if (nightScene) nightScene.style.visibility = ""
          if (dayScene) dayScene.style.visibility = ""
        }
      })

      let alive = true
      document.fonts?.ready.then(() => alive && ScrollTrigger.refresh())
      return () => {
        alive = false
        mm.revert()
      }
    },
    { scope: root },
  )

  /* The ruler is the section's time slider: drag along it, click or tap an event, or use the keys. */
  const go = useCallback((h: number, behavior: ScrollBehavior) => {
    const st = stRef.current
    if (!st) return
    window.scrollTo({ top: Math.ceil(st.start + (st.end - st.start) * (clamp(h, 0, 24) / 24)) + 1, behavior })
  }, [])
  // read the scroll itself, not the trigger's progress: that only updates on the next scroll event,
  // so quick key presses would all start from the same hour
  const now = () => {
    const st = stRef.current
    return st ? Math.round(clamp((window.scrollY - st.start) / (st.end - st.start), 0, 1) * 96) / 4 : 0
  }
  const hourAt = (x: number) => {
    const r = trackEl.current?.getBoundingClientRect()
    return r ? clamp((x - r.left) / r.width, 0, 1) * 24 : 0
  }
  const markNear = (x: number, tol: number) => {
    const r = trackEl.current?.getBoundingClientRect()
    if (!r) return null
    let best: number | null = null
    let bd = tol
    EVENTS.forEach((e, i) => {
      const d = Math.abs(r.left + (e.t / 24) * r.width - x)
      if (d <= bd) {
        bd = d
        best = i
      }
    })
    return best
  }
  const landOn = (i: number) => go(EVENTS[i].t + EVENTS[i].land, "smooth")

  const h = step / 4
  const modeName = lang === "ro" ? MODES[modeAt(h)].ro : MODES[modeAt(h)].en
  const track: TrackProps = {
    ref: trackEl,
    role: "slider",
    tabIndex: 0,
    "aria-label": t("Ora din zi", "Time of day"),
    "aria-valuemin": 0,
    "aria-valuemax": 24,
    "aria-valuenow": h,
    "aria-valuetext": `${clock(h)}, ${modeName}`,
    "aria-orientation": "horizontal",
    onPointerDown: (e) => {
      if (e.button !== 0) return
      e.currentTarget.setPointerCapture(e.pointerId)
      drag.current = { id: e.pointerId, x: e.clientX, moved: false }
    },
    onPointerMove: (e) => {
      const d = drag.current
      if (d && d.id === e.pointerId) {
        if (!d.moved && Math.abs(e.clientX - d.x) > 4) {
          d.moved = true
          setDragging(true)
          setHover(null)
        }
        if (d.moved) go(hourAt(e.clientX), "instant")
        return
      }
      if (e.pointerType === "mouse") setHover(markNear(e.clientX, 10))
    },
    onPointerUp: (e) => {
      const d = drag.current
      if (!d || d.id !== e.pointerId) return
      drag.current = null
      if (d.moved) return setDragging(false)
      const m = markNear(e.clientX, e.pointerType === "mouse" ? 10 : 14)
      if (m !== null) landOn(m)
      else go(Math.round(hourAt(e.clientX) * 4) / 4, "smooth")
    },
    onPointerCancel: () => {
      drag.current = null
      setDragging(false)
    },
    onPointerLeave: (e) => {
      if (e.pointerType === "mouse") setHover(null)
    },
    onFocus: (e) => setFocused(e.currentTarget.matches(":focus-visible")),
    onBlur: () => setFocused(false),
    onKeyDown: (e) => {
      const cur = now()
      const k = e.key
      if (k === "ArrowRight" || k === "ArrowUp") go(cur + 0.25, "instant")
      else if (k === "ArrowLeft" || k === "ArrowDown") go(cur - 0.25, "instant")
      else if (k === "PageUp") {
        const next = EVENTS.findIndex((x) => x.t > cur + 1e-3)
        if (next >= 0) landOn(next)
        else go(24, "smooth")
      } else if (k === "PageDown") {
        const i = eventIndexAt(cur)
        landOn(cur > EVENTS[i].t + EVENTS[i].land + 1e-3 ? i : Math.max(0, i - 1))
      } else if (k === "Home") go(0, "smooth")
      else if (k === "End") go(24, "smooth")
      else return
      e.preventDefault()
    },
  }

  const state: StageState = { step, hover, focused, dragging }
  return (
    <div ref={root} className="dc-p">
      <div className="dc-track">
        <div className="dc-stage">
          {/* each surface isolates its own stacking, so nothing of the night one paints over the day one */}
          <div data-dc-layer="night" data-dc-surface="" className="absolute inset-0 isolate" style={SURFACE_STYLE}>
            <Stage uid={`${uid}n`} state={state} track={track} />
          </div>
          {/* the same stage on the day surface, revealed from the sunrise; never interactive itself */}
          <div data-dc-layer="day" data-dc-surface="day" aria-hidden inert className="absolute inset-0 isolate" style={SURFACE_STYLE}>
            <Stage uid={`${uid}d`} state={state} />
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Still layout: three moments of the same day, side by side ────────────── */

function DayStill({ uid }: { uid: string }) {
  const { t, lang } = useLanguage()
  const facades = useFacades()
  const root = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      root.current?.querySelectorAll<HTMLElement>("[data-hour]").forEach((panel) => {
        const h = Number(panel.dataset.hour)
        const day = buildDay(panel)
        day.tl.time(h)
        day.sky(h)
        day.fans.forEach((f, i) => f.setAttribute("transform", `rotate(${i ? 37 : 0})`))
      })
    },
    { scope: root },
  )

  return (
    <div ref={root} className="dc-s container-site pb-16 sm:pb-20 lg:pb-24">
      <div className="grid gap-px border md:grid-cols-3" style={{ borderColor: "var(--dc-rule)", background: "var(--dc-rule)" }}>
        {MOMENTS.map((m, i) => {
          const mode = modeAt(m.h)
          const lit = m.h > 7.25 && m.h < 19
          const plant = plantAt(m.h, lang, true)
          return (
            <div key={m.h} data-hour={m.h} data-dc-surface={lit ? "day" : ""} className="card-p flex flex-col" style={SURFACE_STYLE}>
              <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-2">
                <Clock step={m.h * 4} className="text-5xl lg:text-6xl" />
                <span className="flex items-center gap-2.5 pb-1">
                  <ModeMeter level={mode} />
                  <span className="text-lg font-light tracking-tight">{lang === "ro" ? MODES[mode].ro : MODES[mode].en}</span>
                </span>
              </div>
              <span className="mt-5 block font-mono text-[11px] uppercase tracking-[0.2em]" style={{ color: "var(--dc-accent)" }}>
                {clock(m.h)} · {lang === "ro" ? m.ro : m.en}
              </span>
              <p className="mt-2 text-sm font-light leading-6 md:min-h-[7.5rem] lg:min-h-[4.5rem]" style={{ color: "var(--dc-ink-2)" }}>
                {lang === "ro" ? m.dro : m.den}
              </p>
              <Frame
                className="mt-5 aspect-[6/5]"
                tag={t("clădire · iso 2:1", "building · iso 2:1")}
                live={plant.text}
                liveOn={plant.on}
              >
                <div className="absolute inset-x-2 bottom-2 top-9">
                  <DayScene uid={`${uid}s${i}`} className="h-full w-full" facades={facades} />
                </div>
              </Frame>
            </div>
          )
        })}
      </div>

      <div className="mt-12 lg:mt-16">
        <DayRuler step={96} live={false} marks={MOMENTS.map((m) => m.h)} />
      </div>
    </div>
  )
}

/**
 * Fig. 03, "O zi în clădire": scrolling scrubs one office day, 00:00 to 24:00,
 * and the building answers the way its BMS time program runs it. On a short
 * screen or with reduced motion it becomes three still moments of the same day.
 */
export function DayCycleSection() {
  const uid = useSceneId()
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const head = root.current?.querySelector<HTMLElement>("[data-dc-head]")
        if (!head) return
        // plays once, as the header comes into view (or at once, if the page loads scrolled past it)
        const tl = gsap.timeline({ scrollTrigger: { trigger: head, start: "top 82%", toggleActions: "play none none none" } })
        head.querySelectorAll("[data-hd]").forEach((el, i) =>
          tl.fromTo(el, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: "expo.out" }, i * 0.08),
        )
      })
      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <section ref={root} aria-labelledby={`${uid}-title`} data-dc-surface="" className="relative" style={SURFACE_STYLE}>
      <style>{SCENE_CSS + SURFACE_CSS + LAYOUT_CSS}</style>
      <ScheduleList />
      <Header id={`${uid}-title`} />
      <DayPinned uid={uid} />
      <DayStill uid={uid} />
    </section>
  )
}
