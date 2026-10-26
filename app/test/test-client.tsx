"use client"

import { useCallback, useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight, Pause, Play } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { FluxFigure, type FluxPart } from "@/components/flux-figure"
import { FigureFrame } from "@/components/test/figure-frame"
import { TablouSection } from "@/components/test/tablou-section"
import { DayCycleSection } from "@/components/test/day-cycle-section"
import { EtajeSection } from "@/components/test/etaje-section"
import { LifecycleSection } from "@/components/test/lifecycle-section"

const PARTS: { id: FluxPart; ro: string; en: string; dro: string; den: string }[] = [
  { id: "senzor", ro: "Senzori", en: "Sensors", dro: "Temperatură, umiditate, CO₂, prezență", den: "Temperature, humidity, CO₂, occupancy" },
  { id: "hvac", ro: "HVAC", en: "HVAC", dro: "Centrale de tratare a aerului, chillere, ventiloconvectoare", den: "Air handling units, chillers, fan coils" },
  { id: "vana", ro: "Vane", en: "Valves", dro: "Vane de reglaj motorizate pe circuitele de apă", den: "Motorised control valves on water circuits" },
  { id: "contor", ro: "Contoare", en: "Meters", dro: "Energie electrică, energie termică, apă", den: "Electricity, heat, water" },
  { id: "bms", ro: "BMS", en: "BMS", dro: "Controlerul care colectează, decide și comandă", den: "The controller that collects, decides and commands" },
]

const STEPS = [
  {
    ro: "Măsoară",
    en: "Measure",
    dro: "Senzorii și contoarele citesc continuu starea clădirii: temperatură, calitatea aerului, prezență, consum.",
    den: "Sensors and meters read the state of the building continuously: temperature, air quality, occupancy, consumption.",
  },
  {
    ro: "Transmite",
    en: "Transmit",
    dro: "Valorile circulă pe magistrale de comunicație deschise, BACnet, Modbus, KNX sau M-Bus, până la controlerul BMS.",
    den: "Values travel over open communication buses, BACnet, Modbus, KNX or M-Bus, to the BMS controller.",
  },
  {
    ro: "Decide",
    en: "Decide",
    dro: "BMS-ul compară fiecare valoare cu programele orare și pragurile setate și calculează comanda potrivită.",
    den: "The BMS compares every value with the schedules and thresholds that were set, and works out the right command.",
  },
  {
    ro: "Acționează",
    en: "Act",
    dro: "Comenzile ajung la instalațiile HVAC și la vane, iar efectul lor se măsoară din nou. Bucla se închide.",
    den: "Commands reach the HVAC plant and the valves, and their effect is measured again. The loop closes.",
  },
]

export function TestClient() {
  const { t, lang } = useLanguage()
  const [active, setActive] = useState<FluxPart | null>(null)
  const [focus, setFocus] = useState<FluxPart | null>(null)
  const [ready, setReady] = useState(false)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true))
    return () => cancelAnimationFrame(id)
  }, [])

  const onRead = useCallback((part: FluxPart | null) => setActive(part), [])
  const name = (id: FluxPart) => {
    const p = PARTS.find((x) => x.id === id)!
    return lang === "ro" ? p.ro : p.en
  }
  // Entrances: opacity and an 8px rise that settles to exactly 0, staggered.
  const rise = (delay: number, extra = "") => ({
    className: `${extra} transition-[opacity,translate] duration-700 ease-out motion-reduce:transition-none ${ready ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`,
    style: { transitionDelay: `${delay}ms` },
  })

  return (
    <>
      <section className="relative overflow-hidden bg-[#07201C] text-white">
        {/* A drafting grid, faded out towards the edges so it only sits behind the figure. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(200,230,201,.045) 1px, transparent 1px), linear-gradient(90deg, rgba(200,230,201,.045) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage: "radial-gradient(ellipse 60% 70% at 68% 42%, #000 15%, transparent 75%)",
            WebkitMaskImage: "radial-gradient(ellipse 60% 70% at 68% 42%, #000 15%, transparent 75%)",
          }}
        />

        <div className="container-site relative pb-16 pt-10 sm:pb-20 sm:pt-14 lg:pb-24 lg:pt-16">
          <div {...rise(0)}>
            <div className="mb-12 flex items-center justify-between border-b border-white/10 pb-5 font-mono text-[11px] uppercase tracking-[0.2em] text-white/55 lg:mb-16">
              <span className="text-[#C8E6C9]">• {t("Arhitectura unui BMS", "Inside a BMS")}</span>
              <span className="hidden sm:inline">Fig. 01 / {t("Fluxul de date", "Data flow")}</span>
            </div>
          </div>

          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-5">
              <h1 {...rise(75)}>
                <span className="block text-5xl font-light leading-none tracking-tighter md:text-6xl lg:text-7xl">
                  {t("Fiecare echipament vorbește.", "Every device speaks.")}
                </span>
                <span className="mt-2 block text-5xl font-light leading-none tracking-tighter text-white/45 md:text-6xl lg:text-7xl">
                  {t("BMS-ul ascultă.", "The BMS listens.")}
                </span>
              </h1>
              <div {...rise(150)}>
                <p className="mt-8 max-w-md text-base font-light leading-6 text-white/60">
                  {t(
                    "Senzorii, instalațiile HVAC, vanele și contoarele trimit date fără pauză către controlerul BMS. Acolo informația devine decizie: ce pornește, ce se reglează, ce se raportează.",
                    "Sensors, HVAC plant, valves and meters send data to the BMS controller without pause. There, information becomes a decision: what starts, what is adjusted, what is reported."
                  )}
                </p>
              </div>
              <div {...rise(200)}>
                <div className="mt-10 flex items-stretch">
                  <Link
                    href="/contact"
                    className="inline-flex items-center rounded-[1px] bg-white px-8 py-4 text-base text-black transition-colors duration-300 hover:bg-[#C8E6C9]"
                  >
                    {t("Cere o evaluare a clădirii", "Request a building assessment")}
                  </Link>
                  <Link
                    href="/servicii/integrare-sisteme-knx-dali-modbus-mbus"
                    aria-label={t("Integrare sisteme", "Systems integration")}
                    className="group ml-px inline-flex w-14 items-center justify-center rounded-[1px] border border-white/15 bg-white/10 transition-colors duration-300 hover:bg-white/20"
                  >
                    <ArrowRight className="h-5 w-5 text-white transition-transform duration-150 group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>
              <div {...rise(300)}>
                <div className="mt-10 max-w-sm border-t border-white/10 pt-5">
                  <p className="font-mono text-[11px] leading-5 tracking-wide text-white/55">
                    {t(
                      "Animația rulează singură. Atingeți sau treceți cursorul peste un echipament și fluxul încetinește, ca să puteți urmări un pachet de date.",
                      "The animation runs on its own. Touch or hover a device and the flow slows down, so you can follow a single data packet."
                    )}
                  </p>
                  <button
                    type="button"
                    onClick={() => setPaused((p) => !p)}
                    aria-pressed={paused}
                    className="mt-4 inline-flex items-center gap-2 rounded-[1px] font-mono text-[11px] uppercase leading-5 tracking-[0.18em] text-white/55 transition-colors duration-300 hover:text-[#C8E6C9] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[#C8E6C9] motion-reduce:hidden"
                  >
                    {paused ? <Play aria-hidden className="size-3" strokeWidth={1.5} /> : <Pause aria-hidden className="size-3" strokeWidth={1.5} />}
                    {paused ? t("Pornește turul", "Play the tour") : t("Oprește turul", "Pause the tour")}
                  </button>
                </div>
              </div>
            </div>

            <div {...rise(200, "lg:col-span-7")}>
              <FigureFrame
                tag="flux · iso 30°"
                live={active ? name(active) : t("toate sursele", "all sources")}
                liveOn={!!active}
                footLeft={t("4 surse → 1 controler", "4 sources → 1 controller")}
                footRight="400 × 320"
              >
                <FluxFigure
                  label={t(
                    "Un controler BMS primește date de la un senzor, o unitate HVAC, o vană și un contor, prin conducte pe care circulă pachete.",
                    "A BMS controller receives data from a sensor, an HVAC unit, a valve and a meter, through conduits carrying packets."
                  )}
                  focus={focus}
                  onRead={onRead}
                  paused={paused}
                  className="w-full"
                />
              </FigureFrame>
            </div>
          </div>

          {/* The legend names what the drawing never writes, and points at it like a hand would. */}
          <div {...rise(300, "mt-12 grid grid-cols-2 gap-px border border-white/10 bg-white/10 md:grid-cols-5 lg:mt-16")}>
            {PARTS.map((p, i) => {
              const on = active === p.id
              return (
                <button
                  key={p.id}
                  type="button"
                  onMouseEnter={() => setFocus(p.id)}
                  onMouseLeave={() => setFocus(null)}
                  onFocus={() => setFocus(p.id)}
                  onBlur={() => setFocus(null)}
                  className={`relative bg-[#07201C] card-p text-left outline-none transition-colors duration-300 focus-visible:bg-[#0B2925] focus-visible:outline focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-[#C8E6C9] ${on ? "bg-[#0B2925]" : ""} ${i === PARTS.length - 1 ? "col-span-2 md:col-span-1" : ""}`}
                >
                  <span
                    aria-hidden
                    className={`absolute inset-x-0 top-0 h-px origin-left bg-[#C8E6C9] transition-transform duration-700 ease-out motion-reduce:transition-none ${on ? "scale-x-100" : "scale-x-0"}`}
                  />
                  <span className="flex items-center justify-between font-mono text-[11px] tracking-[0.2em] text-white/45">
                    <span>{String(i + 1).padStart(2, "0")}</span>
                    <span aria-hidden className={`size-1.5 rounded-full transition-colors duration-300 ${on ? "bg-[#C8E6C9]" : "bg-white/15"}`} />
                  </span>
                  <span className={`mt-6 block text-xl font-light tracking-tight transition-colors duration-150 ${on ? "text-[#C8E6C9]" : "text-white"}`}>
                    {lang === "ro" ? p.ro : p.en}
                  </span>
                  <span className="mt-2 block text-sm font-light leading-5 text-white/50">{lang === "ro" ? p.dro : p.den}</span>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      <TablouSection />
      <DayCycleSection />
      <EtajeSection />
      <LifecycleSection />

      <section className="section-l bg-[#F5F4F0]">
        <div className="container-site">
          <p className="section-label heading-gap-tight">• {t("Cum circulă informația", "How information moves")}</p>
          <h2 className="heading-gap-loose max-w-3xl text-4xl font-light leading-tight tracking-tighter sm:text-5xl">
            {t("De la măsurătoare la decizie, într-o buclă care nu se oprește.", "From measurement to decision, in a loop that never stops.")}
          </h2>
          <div className="grid gap-px border border-[#0D2E2B]/10 bg-[#0D2E2B]/10 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <div key={s.en} className="bg-[#F5F4F0] card-p-lg">
                <span className="font-mono text-[11px] tracking-[0.2em] text-[#1F6B4A]">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-10 text-2xl font-light tracking-tight">{lang === "ro" ? s.ro : s.en}</h3>
                <p className="mt-3 text-base font-light leading-6 text-[#888888]">{lang === "ro" ? s.dro : s.den}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-l bg-[#07201C] text-white">
        <div className="container-site flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="heading-gap-tight text-sm font-semibold uppercase tracking-wider text-[#C8E6C9]">• {t("Următorul pas", "Next step")}</p>
            <h2 className="max-w-2xl text-4xl font-light leading-tight tracking-tighter sm:text-5xl">
              {t("Vrei să vezi ce circulă prin clădirea ta?", "Want to see what moves through your building?")}
            </h2>
          </div>
          <div className="flex items-stretch">
            <Link
              href="/contact"
              className="inline-flex items-center rounded-[1px] bg-white px-8 py-4 text-base text-black transition-colors duration-300 hover:bg-[#C8E6C9]"
            >
              {t("Cere o evaluare a clădirii", "Request a building assessment")}
            </Link>
            <Link
              href="/contact"
              aria-label={t("Contact", "Contact")}
              className="group ml-px inline-flex w-14 items-center justify-center rounded-[1px] border border-white/15 bg-white/10 transition-colors duration-300 hover:bg-white/20"
            >
              <ArrowRight className="h-5 w-5 text-white transition-transform duration-150 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
