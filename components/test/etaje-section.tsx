"use client"

import { useCallback, useEffect, useRef, useState, type FocusEvent, type PointerEvent as ReactPointerEvent } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { etaje, POINTS } from "@/lib/hairline/etaje"
import { HairlineStage, HAIRLINE_ON_LIGHT, type HairlineFigure, type ViewPoint } from "@/components/hairline-stage"
import { FigureFrame } from "@/components/test/figure-frame"

type Level = keyof typeof POINTS

/** One level of the building. `read` is the figure's own read-out for it; `code` is its lift-panel key, RO and EN. */
type Stop = { id: Level; read: string; code: [string, string]; ro: string; en: string }

/**
 * A legend row. Most rows are one level; the office floors share their installations, so they share one row and
 * one description, and the row is picked by height, the way the figure picks a level: three keys, 03 over 01.
 */
type Row = { key: string; stops: Stop[]; ro: string; en: string; dro: string; den: string; bus: string }

const ROWS: Row[] = [
  {
    key: "roof",
    stops: [{ id: "acoperis", read: "acoperiș", code: ["T", "RF"], ro: "Acoperiș", en: "Roof" }],
    ro: "Acoperiș",
    en: "Roof",
    dro: "Centrale de tratare a aerului, chillere, ventilatoare",
    den: "Air handling units, chillers, fans",
    bus: "BACnet · Modbus",
  },
  {
    key: "office",
    stops: [
      { id: "etaj3", read: "etaj 3", code: ["03", "03"], ro: "Etaj 3", en: "Floor 3" },
      { id: "etaj2", read: "etaj 2", code: ["02", "02"], ro: "Etaj 2", en: "Floor 2" },
      { id: "etaj1", read: "etaj 1", code: ["01", "01"], ro: "Etaj 1", en: "Floor 1" },
    ],
    ro: "Etaje de birouri",
    en: "Office floors",
    dro: "Aceleași instalații pe fiecare etaj: iluminat și climat pe zone, ventiloconvectoare, CO₂ și umiditate",
    den: "The same installations on every floor: lighting and climate by zone, fan coils, CO₂ and humidity",
    bus: "DALI · KNX · BACnet",
  },
  {
    key: "ground",
    stops: [{ id: "parter", read: "parter", code: ["P", "GF"], ro: "Parter", en: "Ground floor" }],
    ro: "Parter",
    en: "Ground floor",
    dro: "Climatul holului, perdele de aer, iluminatul spațiilor comune",
    den: "Lobby climate, air curtains, common-area lighting",
    bus: "BACnet · KNX",
  },
  {
    key: "basement",
    stops: [{ id: "subsol", read: "subsol", code: ["S", "B1"], ro: "Subsol", en: "Basement" }],
    ro: "Subsol",
    en: "Basement",
    dro: "Cazane, pompe de căldură, pompe, contoare de energie",
    den: "Boilers, heat pumps, pumps, energy meters",
    bus: "Modbus · M-Bus",
  },
]

const STOPS = ROWS.flatMap((r) => r.stops)
const BY_READ: Record<string, Level> = Object.fromEntries(STOPS.map((s) => [s.read, s.id]))

/** Untouched, the figure scans the building the way the legend reads it: roof to basement, then back to rest. */
const LAP: (ViewPoint | null)[] = [...STOPS.map((s) => POINTS[s.id] as ViewPoint), null]

/** The figure's lift curve, so the legend's indicator travels with the floors. */
const LIFT = "ease-[cubic-bezier(.32,.72,0,1)]"

const FOCUS_RING =
  "outline-none focus-visible:outline-1 focus-visible:outline-solid focus-visible:-outline-offset-1 focus-visible:outline-[#1F6B4A]"

/**
 * Fig. 04: the building floor by floor. Copy and a lift-panel legend on the
 * left, the Hairline "etaje" figure on the right (on phones it stays pinned
 * under the header while the legend scrolls beneath it). The figure reports
 * the level under the pointer; the legend points the figure at a level, and a
 * click or a tap holds it there until the same key is pressed again; a single
 * indicator rides the legend's rail to whatever is open.
 */
export function EtajeSection() {
  const { t, lang } = useLanguage()
  const ro = lang === "ro"
  const [active, setActive] = useState<Level | null>(null)
  const [hover, setHover] = useState<Level | null>(null)
  const [kbd, setKbd] = useState<Level | null>(null)
  const [pin, setPin] = useState<Level | null>(null)
  const [seen, setSeen] = useState(false)
  const [rail, setRail] = useState<Partial<Record<Level, { y: number; h: number }>>>({})
  const [last, setLast] = useState<Level>("acoperis")
  const sectionRef = useRef<HTMLElement>(null)
  const legendRef = useRef<HTMLDivElement>(null)
  const targets = useRef<Partial<Record<Level, HTMLElement | null>>>({})

  // Entrance once the section is reached: opacity and an 8px rise, settled to exactly 0.
  // Leaving the section lets go of a held level, so the figure scans again when it comes back.
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    if (typeof IntersectionObserver === "undefined") {
      setSeen(true)
      return
    }
    const enter = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setSeen(true)
          enter.disconnect()
        }
      },
      { rootMargin: "0px 0px -15% 0px" },
    )
    const leave = new IntersectionObserver((entries) => {
      if (entries.every((e) => !e.isIntersecting)) setPin(null)
    })
    enter.observe(el)
    leave.observe(el)
    return () => {
      enter.disconnect()
      leave.disconnect()
    }
  }, [])

  // The rail: where each level's key sits in the legend, measured once and again whenever the legend changes size.
  useEffect(() => {
    const box = legendRef.current
    if (!box) return
    const measure = () => {
      const top = box.getBoundingClientRect().top
      const next: Partial<Record<Level, { y: number; h: number }>> = {}
      for (const s of STOPS) {
        const el = targets.current[s.id]
        if (!el) continue
        const r = el.getBoundingClientRect()
        next[s.id] = { y: r.top - top, h: r.height }
      }
      setRail(next)
    }
    measure()
    if (typeof ResizeObserver === "undefined") return
    const ro = new ResizeObserver(measure)
    ro.observe(box)
    return () => ro.disconnect()
  }, [])

  const onRead = useCallback((text: string) => {
    const id = BY_READ[text] ?? null
    setActive(id)
    if (id) setLast(id)
  }, [])

  const asked = hover ?? kbd ?? pin
  const stop = active ? STOPS.find((s) => s.id === active)! : null
  const pinned = pin ? STOPS.find((s) => s.id === pin)! : null
  const bar = rail[active ?? last]

  // A key previews its level under a mouse or keyboard focus; a click, a tap, Enter or Space holds it, and again lets it go.
  const keyProps = (id: Level) => ({
    "aria-pressed": pin === id,
    onPointerEnter: (e: ReactPointerEvent) => {
      if (e.pointerType === "mouse") setHover(id)
    },
    onPointerLeave: (e: ReactPointerEvent) => {
      if (e.pointerType === "mouse") setHover((h) => (h === id ? null : h))
    },
    onFocus: (e: FocusEvent<HTMLElement>) => {
      if (e.currentTarget.matches(":focus-visible")) setKbd(id)
    },
    onBlur: () => setKbd((k) => (k === id ? null : k)),
    onClick: () => setPin((p) => (p === id ? null : id)),
  })

  /** A lift-panel key: a hairline square, lit while its level is open, filled while it is held. */
  const keyCap = (s: Stop) => {
    const on = active === s.id
    const held = pin === s.id
    return (
      <span
        aria-hidden
        className={`flex size-7 items-center justify-center rounded-[2px] border font-mono text-[11px] tabular-nums tracking-[0.08em] transition-colors duration-300 ${
          held
            ? "border-[#1F6B4A] bg-[#1F6B4A] text-[#F5F4F0]"
            : on
              ? "border-[#1F6B4A] text-[#1F6B4A]"
              : "border-[#0D2E2B]/15 text-[#0D2E2B]/60"
        }`}
      >
        {ro ? s.code[0] : s.code[1]}
      </span>
    )
  }

  const rise = (delay: number, extra = "") => ({
    className: `${extra} transition-[opacity,translate] duration-700 ease-out motion-reduce:transition-none ${seen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`,
    style: { transitionDelay: `${delay}ms` },
  })

  return (
    <section ref={sectionRef} className="section-l relative overflow-x-clip bg-[#F5F4F0] text-[#0D2E2B]">
      <div className="container-site relative">
        <div {...rise(0)}>
          <div className="mb-12 flex items-center justify-between border-b border-[#0D2E2B]/10 pb-5 font-mono text-[11px] uppercase tracking-[0.2em] text-[#0D2E2B]/55 lg:mb-16">
            <span className="text-[#1F6B4A]">• {t("Supraveghere pe niveluri", "Supervision by level")}</span>
            <span className="hidden sm:inline">Fig. 04 / {t("Etaje", "Floors")}</span>
          </div>
        </div>

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-14">
          {/* Copy */}
          <div className="lg:col-span-5">
            <h2 {...rise(75)}>
              <span className="block text-balance text-4xl font-light leading-none tracking-tighter sm:text-5xl xl:text-6xl">
                {t("Etaj cu etaj.", "Floor by floor.")}
              </span>
              <span className="mt-2 block text-balance text-4xl font-light leading-none tracking-tighter text-[#0D2E2B]/35 sm:text-5xl xl:text-6xl">
                {t("Un singur BMS le vede pe toate.", "One BMS sees them all.")}
              </span>
            </h2>
            <div {...rise(150)}>
              <p className="mt-8 max-w-md text-base font-light leading-6 text-[#888888]">
                {t(
                  "Un BMS citește clădirea nivel cu nivel: centrala termică din subsol, holul de la parter, zonele de birouri de pe fiecare etaj, echipamentele de pe acoperiș. Fiecare nivel are instalațiile lui, iar fiecare instalație are punctele ei de date.",
                  "A BMS reads a building level by level: the plant room in the basement, the lobby on the ground floor, the office zones on every floor, the equipment on the roof. Each level has its own installations, and each installation its own data points."
                )}
              </p>
            </div>
            <div {...rise(200)}>
              <div className="mt-10 flex flex-col gap-4 border-t border-[#0D2E2B]/10 pt-5 sm:flex-row sm:items-end sm:justify-between">
                <p className="max-w-[17rem] text-sm font-light leading-5 text-[#0D2E2B]/70">
                  {t(
                    "Modernizarea urmează aceeași logică: pe etape, zonă cu zonă, cu clădirea în funcțiune.",
                    "Modernisation follows the same logic: in stages, zone by zone, with the building in operation."
                  )}
                </p>
                <Link
                  href="/servicii/modernizare-sisteme-de-automatizare-si-bms"
                  className="group inline-flex shrink-0 items-center gap-2 rounded-[1px] text-sm text-[#1F6B4A] outline-none transition-colors duration-150 hover:text-[#0D2E2B] focus-visible:outline-1 focus-visible:outline-solid focus-visible:outline-offset-4 focus-visible:outline-[#1F6B4A]"
                >
                  {t("Modernizare", "Modernisation")}
                  <ArrowRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Figure and legend. On phones they share one block, so the figure can stay pinned while the legend scrolls under it. */}
          <div className="flex flex-col gap-8 lg:contents">
            <div
              {...rise(
                200,
                "sticky top-16 z-10 -mx-4 bg-[#F5F4F0] px-4 pb-4 pt-3 sm:-mx-6 sm:px-6 lg:top-24 lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1 lg:mx-0 lg:self-start lg:bg-transparent lg:p-0 [@media(max-height:560px)]:static"
              )}
            >
              {/* Pinned on a phone, the figure keeps to half the screen so the legend has room under it; unpinned it may be wider. */}
              <div className="relative mx-auto w-full max-w-[62svh] lg:max-w-none max-lg:[@media(max-height:560px)]:max-w-xl">
                {/* A drafting grid behind the figure, faded out before it reaches the copy. */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 lg:-inset-16"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(13,46,43,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(13,46,43,.05) 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                    backgroundPosition: "center",
                    maskImage: "radial-gradient(ellipse 50% 50% at 50% 50%, #000 25%, transparent 75%)",
                    WebkitMaskImage: "radial-gradient(ellipse 50% 50% at 50% 50%, #000 25%, transparent 75%)",
                  }}
                />
                <FigureFrame
                  tone="light"
                  tag={t("etaje · iso 30°", "floors · iso 30°")}
                  live={
                    <>
                      {/* What the figure shows changes with the scan; only a level someone holds is announced. */}
                      <span aria-hidden>{stop ? (ro ? stop.ro : stop.en) : t("toate nivelurile", "all levels")}</span>
                      <span className="sr-only">{pinned ? (ro ? pinned.ro : pinned.en) : ""}</span>
                    </>
                  }
                  liveOn={!!stop}
                  footLeft={t("6 niveluri → 1 BMS", "6 levels → 1 BMS")}
                  footRight="400 × 320"
                >
                  <HairlineStage
                    figure={etaje as HairlineFigure}
                    palette={HAIRLINE_ON_LIGHT}
                    label={t(
                      "O clădire de birouri desenată nivel cu nivel: subsolul tehnic, parterul, trei etaje de birouri și acoperișul cu echipamente. Nivelul ales se deschide, iar etajele de deasupra se ridică.",
                      "An office building drawn level by level: the plant basement, the ground floor, three office floors and the roof with its equipment. The chosen level opens and the floors above it lift away."
                    )}
                    lap={LAP}
                    focus={asked ? (POINTS[asked] as ViewPoint) : null}
                    onRead={onRead}
                    className="mt-6 w-full sm:mt-0"
                  />
                </FigureFrame>
              </div>
            </div>

            {/* Legend: a lift panel. Hover or focus a key and the figure opens its level; press it to hold the level there. */}
            <div {...rise(300, "lg:col-span-5")}>
              <div className="flex items-center justify-between border-b border-[#0D2E2B]/10 pb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-[#0D2E2B]/55">
                <span>{t("Nivel · ce urmărește BMS-ul", "Level · what the BMS watches")}</span>
                <span>Protocol</span>
              </div>
              <div ref={legendRef} className="relative">
                <span aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-px bg-[#0D2E2B]/10" />
                <span
                  aria-hidden
                  className={`pointer-events-none absolute left-0 top-0 w-[2px] bg-[#1F6B4A] transition-[translate,height,opacity] duration-700 motion-reduce:transition-none ${LIFT}`}
                  style={{ translate: `0 ${bar?.y ?? 0}px`, height: bar?.h ?? 0, opacity: stop && bar ? 1 : 0 }}
                />
                <ul className="divide-y divide-[#0D2E2B]/10 border-b border-[#0D2E2B]/10">
                  {ROWS.map((row) => {
                    const lit = row.stops.some((s) => s.id === active)
                    const descId = `etaje-${row.key}`
                    const text = (
                      <span className="min-w-0">
                        <span className="flex items-baseline justify-between gap-4">
                          <span
                            className={`text-lg font-light leading-7 tracking-tight transition-colors duration-150 ${lit ? "text-[#1F6B4A]" : "text-[#0D2E2B]"}`}
                          >
                            {ro ? row.ro : row.en}
                          </span>
                          <span
                            className={`whitespace-nowrap font-mono text-[10px] tracking-[0.1em] transition-colors duration-300 ${lit ? "text-[#1F6B4A]" : "text-[#0D2E2B]/60"}`}
                          >
                            {row.bus}
                          </span>
                        </span>
                        <span id={descId} className="mt-1 block text-sm font-light leading-5 text-[#888888]">
                          {ro ? row.dro : row.den}
                        </span>
                      </span>
                    )

                    if (row.stops.length === 1) {
                      const s = row.stops[0]
                      return (
                        <li key={row.key}>
                          <button
                            ref={(el) => {
                              targets.current[s.id] = el
                            }}
                            type="button"
                            aria-label={ro ? s.ro : s.en}
                            aria-describedby={descId}
                            {...keyProps(s.id)}
                            className={`grid w-full grid-cols-[2.75rem_1fr] items-start gap-x-3 py-4 pl-5 pr-3 text-left transition-colors duration-300 ${FOCUS_RING} ${lit ? "bg-white/70" : ""}`}
                          >
                            {keyCap(s)}
                            {text}
                          </button>
                        </li>
                      )
                    }

                    // The office floors: three keys stacked like the floors, and three bands over the row that pick by height.
                    return (
                      <li key={row.key} className={`relative transition-colors duration-300 ${lit ? "bg-white/70" : ""}`}>
                        <div className="grid grid-cols-[2.75rem_1fr] gap-x-3 pl-5 pr-3">
                          <span className="grid grid-rows-3 py-2">
                            {row.stops.map((s) => (
                              <span
                                key={s.id}
                                ref={(el) => {
                                  targets.current[s.id] = el
                                }}
                                className="flex h-10 items-center"
                              >
                                {keyCap(s)}
                              </span>
                            ))}
                          </span>
                          <span className="pb-4 pt-[14px]">{text}</span>
                        </div>
                        <span className="absolute inset-0 grid grid-rows-3">
                          {row.stops.map((s) => (
                            <button
                              key={s.id}
                              type="button"
                              aria-label={ro ? s.ro : s.en}
                              aria-describedby={descId}
                              {...keyProps(s.id)}
                              className={`block w-full ${FOCUS_RING}`}
                            />
                          ))}
                        </span>
                      </li>
                    )
                  })}
                </ul>
              </div>
              <p className="mt-5 max-w-md font-mono text-[11px] leading-5 tracking-wide text-[#0D2E2B]/60">
                <span className="[@media(pointer:coarse)]:hidden">
                  {t(
                    "Figura rulează singură. Treceți cursorul pe verticală peste clădire și se deschide nivelul de la acea înălțime; un clic pe un nivel din listă îl ține deschis.",
                    "The figure runs on its own. Move the cursor up and down the building and the level at that height opens; a click on a level in the list holds it open."
                  )}
                </span>
                <span className="hidden [@media(pointer:coarse)]:inline">
                  {t(
                    "Figura rulează singură. Atingeți un nivel din listă ca să-l deschideți; încă o atingere îl eliberează.",
                    "The figure runs on its own. Tap a level in the list to open it; tap it again to let it go."
                  )}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
