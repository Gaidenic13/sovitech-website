"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ArrowRight, Pause, Play } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { tablou, POINTS } from "@/lib/hairline/tablou"
import { HairlineStage, HAIRLINE_ON_LIGHT, type HairlineFigure, type ViewPoint } from "@/components/hairline-stage"
import { FigureFrame } from "@/components/test/figure-frame"

type Module = "psu" | "controller" | "io" | "knx" | "dali" | "modbus" | "mbus" | "bacnet"

/** The modules on the rail, left to right, as the figure draws them. */
const MODULES: { id: Module; ro: string; en: string; dro: string; den: string; bus?: true }[] = [
  { id: "psu", ro: "Sursă 24 V", en: "24 V supply", dro: "Alimentează controlerul și modulele din tablou", den: "Powers the controller and the modules in the panel" },
  { id: "controller", ro: "Controler", en: "Controller", dro: "Rulează buclele de reglaj, programele orare și alarmele", den: "Runs the control loops, time schedules and alarms" },
  { id: "io", ro: "Modul I/O", en: "I/O module", dro: "Citește senzori și contacte, comandă vane și clapete", den: "Reads sensors and contacts, drives valves and dampers" },
  { id: "knx", ro: "KNX", en: "KNX", dro: "Iluminat, jaluzele, comenzi și termostate de cameră", den: "Lighting, blinds, room controls and thermostats", bus: true },
  { id: "dali", ro: "DALI", en: "DALI", dro: "Corpuri de iluminat adresabile și senzori de lumină naturală", den: "Addressable luminaires and daylight sensors", bus: true },
  { id: "modbus", ro: "Modbus", en: "Modbus", dro: "Chillere, centrale de tratare a aerului, pompe de căldură", den: "Chillers, air handling units, heat pumps", bus: true },
  { id: "mbus", ro: "M-Bus", en: "M-Bus", dro: "Contoare de energie termică și de apă", den: "Heat and water meters", bus: true },
  { id: "bacnet", ro: "BACnet", en: "BACnet", dro: "Automatizare de clădire și controlere de la alți producători", den: "Building automation and controllers from other manufacturers", bus: true },
]

// The figure names a module in its read-out; the page works with ids.
const BY_NAME: Record<string, Module> = {
  "psu 24v": "psu", controller: "controller", "i/o": "io", knx: "knx", dali: "dali", modbus: "modbus", "m-bus": "mbus", bacnet: "bacnet",
}
const at = (m: Module) => POINTS[m] as ViewPoint

// The lap is a sentence, not an inventory: the brain of the panel, a gateway mid-rail, the gateway at the far end, rest.
const STOPS: Module[] = ["controller", "modbus", "bacnet"]
const LAP: (ViewPoint | null)[] = [...STOPS.map(at), null]
const LAPS = 2 // then the figure rests, and the control below it can play the lap again
// The gateway the figure leaves half out at rest, its one bright mark: the page names it too.
const REST_MARK: Module = "modbus"
// An empty corner of the viewBox: held there, the unseen pointer lets every module go and the lap waits.
const PARK: ViewPoint = [4, 4]

// The same figure with and without its lap: swapping them remounts the stage, which is how the lap stops for good.
const WALKING = tablou as HairlineFigure
const STILL: HairlineFigure = { ...WALKING, tour: null }

/**
 * Fig. 02, "tablou": the inside of an automation panel, every protocol on one
 * DIN rail. The figure sits left, the copy right; a legend below names each
 * module and points the figure at it, and the figure's read-out lights the
 * legend back. The lap plays twice when the section is first seen, then rests.
 */
export function TablouSection() {
  const { t, lang } = useLanguage()
  const [active, setActive] = useState<Module | null>(null)
  const [announce, setAnnounce] = useState(false)
  const [hover, setHover] = useState<Module | null>(null)
  const [kbd, setKbd] = useState<Module | null>(null)
  const [pinned, setPinned] = useState<Module | null>(null)
  const [touring, setTouring] = useState(true)
  const [parking, setParking] = useState(false)
  const [reduced, setReduced] = useState(false)
  const [coarse, setCoarse] = useState(false)
  const [seen, setSeen] = useState(false)
  const ref = useRef<HTMLElement>(null)

  // What the user did last, so a read-out they caused is told apart from one the lap caused.
  const over = useRef(false)
  const lastUser = useRef(-Infinity)
  const lastRead = useRef<Module | null>(null)
  const laps = useRef(0)
  const settle = useRef<ReturnType<typeof setTimeout>>(undefined)
  const stop = useRef<ReturnType<typeof setTimeout>>(undefined)

  // Reveal once, when the section first comes into view.
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === "undefined") {
      setSeen(true)
      return
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true)
          io.disconnect()
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // Reduced motion takes the lap away; a coarse pointer changes the hint from hover to tap.
  useEffect(() => {
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)")
    const cp = window.matchMedia("(pointer: coarse)")
    const sync = () => {
      setReduced(rm.matches)
      setCoarse(cp.matches)
    }
    sync()
    rm.addEventListener("change", sync)
    cp.addEventListener("change", sync)
    return () => {
      rm.removeEventListener("change", sync)
      cp.removeEventListener("change", sync)
    }
  }, [])

  useEffect(
    () => () => {
      clearTimeout(settle.current)
      clearTimeout(stop.current)
    },
    [],
  )

  const touch = () => {
    lastUser.current = performance.now()
  }

  // The figure reports every module the pointer crosses. A hand's read-outs are shown at once and announced; the
  // lap's are shown only for the modules it stops on, once it has settled there, and never announced.
  const onRead = useCallback((text: string) => {
    const id = BY_NAME[text] ?? null
    // a hand is on the figure, or just touched the legend, the figure or the control
    const user = over.current || performance.now() - lastUser.current < 400
    if (!user && id === null && lastRead.current === STOPS[STOPS.length - 1]) {
      laps.current += 1
      if (laps.current >= LAPS) {
        clearTimeout(stop.current)
        stop.current = setTimeout(() => setTouring(false), 1000) // once the last module has settled back
      }
    }
    lastRead.current = id
    clearTimeout(settle.current)
    const commit = () => {
      setActive(id)
      setAnnounce(user && id !== null)
    }
    if (user || id === null) commit()
    else if (STOPS.includes(id)) settle.current = setTimeout(commit, 180)
  }, [])

  const walking = touring && !reduced
  const toggleTour = () => {
    touch()
    clearTimeout(stop.current)
    if (walking) {
      // Park the unseen pointer so the module out settles back, then remount without the lap.
      setParking(true)
      stop.current = setTimeout(() => {
        touch() // the remount re-sends any point the legend holds; its read-out is still the user's
        setTouring(false)
        setParking(false)
      }, 900)
    } else {
      laps.current = 0
      setTouring(true)
    }
  }

  const label = (m: (typeof MODULES)[number]) => (lang === "ro" ? m.ro : m.en)
  const activeModule = MODULES.find((m) => m.id === active)
  const restModule = MODULES.find((m) => m.id === REST_MARK)!
  const pointed = hover ?? kbd ?? pinned
  // Swapping the lap remounts the stage, which only re-sends a held point when it changes: a hundredth of a unit does.
  const focus: ViewPoint | null = pointed ? [at(pointed)[0] + (walking ? 0 : 0.01), at(pointed)[1]] : parking ? PARK : null
  const state = (id: Module) => (active === id ? "on" : !active && id === REST_MARK ? "mark" : "off")

  const rise = (delay: number, extra = "") => ({
    className: `${extra} transition-[opacity,translate] duration-700 ease-out motion-reduce:transition-none ${seen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`,
    style: { transitionDelay: `${delay}ms` },
  })
  const bar = (s: string) =>
    `absolute inset-x-0 top-0 h-px origin-left transition-[transform,background-color] duration-700 ease-out motion-reduce:transition-none ${
      s === "on" ? "scale-x-100 bg-[#1F6B4A]" : s === "mark" ? "scale-x-100 bg-[#1F6B4A]/35" : "scale-x-0 bg-[#1F6B4A]"
    }`
  const dot = (s: string) =>
    `size-1.5 shrink-0 rounded-full transition-colors duration-300 ${s === "on" ? "bg-[#1F6B4A]" : s === "mark" ? "bg-[#1F6B4A]/40" : "bg-[#0D2E2B]/15"}`

  const pull = coarse ? t("Atingeți", "Tap") : t("Treceți cursorul peste", "Hover")
  const hint = walking
    ? t(
        `Figura parcurge singură câteva module. ${pull} oricare ca să-l scoateți de pe șină.`,
        `The figure walks a few modules on its own. ${pull} any module to pull it off the rail.`,
      )
    : t(`${pull} un modul ca să-l scoateți de pe șină.`, `${pull} a module to pull it off the rail.`)

  return (
    <section ref={ref} className="relative overflow-hidden bg-[#F5F4F0] text-[#0D2E2B]">
      {/* The drafting grid, behind the figure only. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(13,46,43,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(13,46,43,.05) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 55% 60% at 30% 46%, #000 15%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse 55% 60% at 30% 46%, #000 15%, transparent 75%)",
        }}
      />

      <div className="container-site section-l relative">
        <div {...rise(0)}>
          <div className="mb-12 flex items-center justify-between border-b border-[#0D2E2B]/10 pb-5 font-mono text-[11px] uppercase tracking-[0.2em] text-[#0D2E2B]/65 lg:mb-16">
            <span className="text-[#1F6B4A]">• {t("Integrare independentă", "Independent integration")}</span>
            <span className="hidden sm:inline">Fig. 02 / {t("Tabloul de automatizare", "The automation panel")}</span>
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          {/* On small screens the copy column dissolves into the grid, so the figure sits right under the heading. */}
          <div className="contents lg:col-span-5 lg:col-start-8 lg:block">
            <h2 {...rise(75, "order-1")}>
              <span className="block text-4xl font-light leading-none tracking-tighter sm:text-5xl lg:text-6xl">
                {t("Un singur tablou.", "One panel.")}
              </span>
              <span className="mt-2 block text-4xl font-light leading-none tracking-tighter text-[#0D2E2B]/55 sm:text-5xl lg:text-6xl">
                {t("Toate protocoalele.", "Every protocol.")}
              </span>
            </h2>

            <div {...rise(150, "order-3")}>
              <p className="max-w-md text-base font-light leading-6 text-[#888888] lg:mt-8">
                {t(
                  "Într-un tablou de automatizare Sovitech, controlerul, modulele de intrări și ieșiri și gateway-urile de protocol stau unul lângă altul, pe aceeași șină DIN. Fiecare sistem al clădirii raportează aceluiași BMS: o singură listă de alarme, un singur istoric de date.",
                  "In a Sovitech automation panel, the controller, the input/output modules and the protocol gateways sit side by side on the same DIN rail. Every system in the building reports to the same BMS: one alarm list, one data history."
                )}
              </p>

              {/* The five buses: an indicator only, lit while their gateway is out of the rail. */}
              <div aria-hidden className="mt-10 grid max-w-md grid-cols-5 gap-px border border-[#0D2E2B]/10 bg-[#0D2E2B]/10">
                {MODULES.filter((m) => m.bus).map((m) => {
                  const s = state(m.id)
                  return (
                    <span
                      key={m.id}
                      className={`relative bg-[#F5F4F0] py-3 text-center font-mono text-[10px] tracking-[0.12em] transition-colors duration-300 sm:text-[11px] ${s === "on" ? "text-[#1F6B4A]" : "text-[#0D2E2B]/65"}`}
                    >
                      <span className={bar(s)} />
                      {m.en}
                    </span>
                  )
                })}
              </div>

              <p className="mt-6 max-w-md border-l border-[#1F6B4A] pl-4 text-sm font-light leading-6 text-[#0D2E2B]/70">
                {t(
                  "Fiind independentă, Sovitech alege arhitectura după clădire, nu după catalogul unui producător.",
                  "Being independent, Sovitech chooses the architecture to fit the building, not a manufacturer's catalogue."
                )}
              </p>

              <Link
                href="/servicii/integrare-sisteme-knx-dali-modbus-mbus"
                className="group mt-10 inline-flex items-center gap-3 border-b border-[#0D2E2B]/20 pb-1 text-base font-light text-[#0D2E2B] transition-colors duration-300 hover:border-[#1F6B4A] hover:text-[#1F6B4A] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[#1F6B4A]"
              >
                {t("Cum integrăm sistemele clădirii", "How we integrate building systems")}
                <ArrowRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>

          <div {...rise(200, "order-2 lg:order-none lg:col-span-7 lg:col-start-1 lg:row-start-1")}>
            <FigureFrame
              tone="light"
              tag={t("tablou · iso 30°", "panel · iso 30°")}
              live={
                // Only what a hand chose is announced; the lap's read-outs stay out of the accessibility tree.
                <span aria-hidden={announce ? undefined : true}>
                  {activeModule ? (
                    label(activeModule)
                  ) : (
                    <>
                      {label(restModule)}
                      <span className="hidden sm:inline"> · {t("8 module pe șină", "8 modules on the rail")}</span>
                    </>
                  )}
                </span>
              }
              liveOn={!!activeModule}
              footLeft={t("5 protocoale → 1 BMS", "5 protocols → 1 BMS")}
              footRight="400 × 320"
            >
              <div
                className="overflow-hidden"
                onPointerEnter={(e) => {
                  if (e.nativeEvent.isTrusted) over.current = true
                }}
                onPointerLeave={(e) => {
                  if (!e.nativeEvent.isTrusted) return
                  over.current = false
                  touch()
                  setPinned(null)
                }}
              >
                {/* On a phone the drawing is enlarged a little and its empty top and bottom are cropped. */}
                <div className="-mx-[4%] -mb-[4%] -mt-[7%] sm:m-0">
                  <HairlineStage
                    figure={walking ? WALKING : STILL}
                    palette={HAIRLINE_ON_LIGHT}
                    label={t(
                      "Interiorul unui tablou de automatizare: o șină DIN cu o sursă, un controler, un modul de intrări și ieșiri și cinci gateway-uri de protocol, între două canale de cablu.",
                      "Inside an automation panel: a DIN rail holding a power supply, a controller, an input/output module and five protocol gateways, between two cable ducts."
                    )}
                    lap={walking ? LAP : undefined}
                    focus={focus}
                    onRead={onRead}
                    className="w-full"
                  />
                </div>
              </div>
            </FigureFrame>
            <div className="mt-4 flex flex-col items-start gap-3 sm:flex-row sm:justify-between sm:gap-6">
              <p className="max-w-md font-mono text-[11px] leading-5 tracking-wide text-[#0D2E2B]/65">{hint}</p>
              {!reduced && (
                <button
                  type="button"
                  onClick={toggleTour}
                  className="inline-flex shrink-0 items-center gap-2 rounded-[1px] font-mono text-[11px] uppercase leading-5 tracking-[0.18em] text-[#0D2E2B]/65 transition-colors duration-300 hover:text-[#1F6B4A] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[#1F6B4A]"
                >
                  {walking ? <Pause aria-hidden className="size-3" strokeWidth={1.5} /> : <Play aria-hidden className="size-3" strokeWidth={1.5} />}
                  {walking ? t("Oprește animația", "Pause animation") : t("Pornește animația", "Play animation")}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* The legend names what the drawing never writes, and points at it like a hand would; a click keeps it pointed. */}
        <div
          {...rise(300, "mt-12 grid grid-cols-1 gap-px border border-[#0D2E2B]/10 bg-[#0D2E2B]/10 sm:grid-cols-2 md:grid-cols-4 lg:mt-16")}
          onKeyDown={(e) => {
            if (e.key === "Escape") setPinned(null)
          }}
        >
          {MODULES.map((m, i) => {
            const s = state(m.id)
            return (
              <button
                key={m.id}
                type="button"
                aria-pressed={pinned === m.id}
                onMouseEnter={() => {
                  touch()
                  setHover(m.id)
                }}
                onMouseLeave={() => {
                  touch()
                  setHover(null)
                }}
                onFocus={(e) => {
                  touch()
                  if (e.currentTarget.matches(":focus-visible")) setKbd(m.id)
                }}
                onBlur={() => {
                  touch()
                  setKbd(null)
                }}
                onClick={() => {
                  touch()
                  setPinned((p) => (p === m.id ? null : m.id))
                }}
                className={`relative grid grid-cols-[2.25rem_1fr_auto] items-baseline gap-x-3 px-4 py-4 text-left transition-colors duration-300 focus-visible:outline focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-[#1F6B4A] sm:flex sm:h-full sm:flex-col sm:items-stretch sm:card-p ${s === "on" ? "bg-white" : "bg-[#F5F4F0]"}`}
              >
                <span aria-hidden className={bar(s)} />
                <span className="font-mono text-[11px] tracking-[0.2em] text-[#0D2E2B]/65 sm:flex sm:items-center sm:justify-between">
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <span className="hidden items-center gap-2 uppercase sm:flex">
                    <span className="hidden tracking-[0.14em] lg:inline">{m.bus ? "gateway" : t("nucleu", "core")}</span>
                    <span aria-hidden className={dot(s)} />
                  </span>
                </span>
                <span className="min-w-0">
                  <span className={`block text-lg font-light tracking-tight transition-colors duration-150 sm:mt-6 sm:text-xl ${s === "on" ? "text-[#1F6B4A]" : "text-[#0D2E2B]"}`}>
                    {label(m)}
                  </span>
                  <span className="mt-1 block text-sm font-light leading-5 text-[#888888] sm:mt-2">{lang === "ro" ? m.dro : m.den}</span>
                </span>
                <span aria-hidden className={`${dot(s)} self-center sm:hidden`} />
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
