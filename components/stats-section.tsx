"use client"

import { useEffect, useRef, useState } from "react"
import { useLanguage } from "@/lib/language-context"

interface Stat {
  value: number
  decimals?: number
  prefix?: string
  suffix?: string
  separator?: boolean
  labelRo: string
  labelEn: string
  colSpan?: 2 | 1
  size?: "xl" | "lg"
}

const stats: Stat[] = [
  {
    value: 42827,
    suffix: "€",
    separator: true,
    labelRo: "economii medii in primul an dupa implementarea BMS",
    labelEn: "average savings in the first year after BMS implementation",
    colSpan: 2,
    size: "xl",
  },
  {
    value: 38,
    suffix: "%",
    labelRo: "reducere medie a consumului de energie",
    labelEn: "average energy consumption reduction",
  },
  {
    value: 100,
    suffix: "+",
    labelRo: "proiecte finalizate cu succes",
    labelEn: "successfully completed projects",
  },
  {
    value: 2.1,
    decimals: 1,
    labelRo: "ani perioada medie de amortizare",
    labelEn: "years average payback period",
  },
  {
    value: 15,
    suffix: "+",
    labelRo: "ani experienta in automatizare",
    labelEn: "years of experience in automation",
  },
  {
    value: 500000,
    suffix: "+",
    separator: true,
    labelRo: "mp suprafata totala automatizata in Romania",
    labelEn: "sqm total automated area in Romania",
    colSpan: 2,
  },
]

function formatNumber(val: number, stat: Stat): string {
  const fixed = stat.decimals !== undefined ? val.toFixed(stat.decimals) : Math.round(val).toString()
  const parts = fixed.split(".")
  if (stat.separator) {
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }
  const formatted = parts.join(".")
  return `${stat.prefix ?? ""}${formatted}${stat.suffix ?? ""}`
}

function useCountUp(target: number, duration: number, started: boolean, decimals = 0) {
  const [current, setCurrent] = useState(0)
  const rafRef = useRef<number | null>(null)
  const startTimeRef = useRef<number | null>(null)

  useEffect(() => {
    if (!started) return
    const ease = (t: number) => 1 - Math.pow(1 - t, 4)
    const tick = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp
      const elapsed = timestamp - startTimeRef.current
      const progress = Math.min(elapsed / duration, 1)
      const value = ease(progress) * target
      setCurrent(parseFloat(value.toFixed(decimals)))
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        setCurrent(target)
      }
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [started, target, duration, decimals])

  return current
}

function StatCell({ stat, started, accent, lang }: { stat: Stat; started: boolean; accent?: string; lang: "ro" | "en" }) {
  const val = useCountUp(stat.value, 600, started, stat.decimals ?? 0)
  const display = formatNumber(val, stat)
  const colClass = stat.colSpan === 2 ? "col-span-2" : "col-span-1"
  const textSize = stat.size === "xl" ? "text-6xl sm:text-7xl md:text-8xl" : "text-5xl sm:text-6xl md:text-7xl"

  return (
    <div className={`${colClass} bg-[#0D2E2B] flex flex-col justify-end py-10 px-8 min-h-[180px] relative overflow-hidden`}>
      {accent && <div className="absolute top-0 left-0 right-0 h-0.5" style={{ backgroundColor: accent }} />}
      <span className={`font-black tabular-nums leading-none my-0 ${textSize}`} style={{ color: accent ?? "#ffffff" }}>
        {display}
      </span>
      <span className="text-sm font-light mt-3 leading-snug text-white/60" style={{ maxWidth: stat.colSpan === 2 ? 220 : 140 }}>
        {lang === "ro" ? stat.labelRo : stat.labelEn}
      </span>
    </div>
  )
}

function CountUp({ stat, started }: { stat: Stat; started: boolean }) {
  const val = useCountUp(stat.value, 600, started, stat.decimals ?? 0)
  return <>{formatNumber(val, stat)}</>
}

export function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [started, setStarted] = useState(false)
  const { lang, t } = useLanguage()

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect() } },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="bg-[#0D2E2B] py-32">
      <div className="max-w-7xl mx-auto px-8">
        <p className="text-sm font-semibold mb-4" style={{ background: "linear-gradient(90deg, #CDCBFF 0%, #C8E6C9 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
          • {t("IN CIFRE", "BY THE NUMBERS")}
        </p>
        <h2 className="text-5xl font-black mb-16 tracking-tight text-white">
          {t("Impact masurabil", "Measurable impact")}
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10">
          <div className="col-span-2 bg-[#0D2E2B] flex flex-col justify-end py-10 px-8 min-h-[180px] relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: "linear-gradient(90deg, #CDCBFF, #C8E6C9)" }} />
            <span className="font-black tabular-nums leading-none text-6xl sm:text-7xl md:text-8xl" style={{ background: "linear-gradient(255deg, #FFB1B1 12%, #CDCBFF 59%, #C8E6C9 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              <CountUp stat={stats[0]} started={started} />
            </span>
            <span className="text-sm font-light mt-3 leading-snug max-w-[220px] text-white/60">
              {lang === "ro" ? stats[0].labelRo : stats[0].labelEn}
            </span>
          </div>
          <StatCell stat={stats[1]} started={started} accent="#CDCBFF" lang={lang} />
          <StatCell stat={stats[2]} started={started} accent="#C8E6C9" lang={lang} />
          <StatCell stat={stats[3]} started={started} accent="#FFB1B1" lang={lang} />
          <StatCell stat={stats[4]} started={started} accent="#CDCBFF" lang={lang} />
          <div className="col-span-2 bg-[#0D2E2B] flex flex-col justify-end py-10 px-8 min-h-[180px] relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: "linear-gradient(90deg, #C8E6C9, #CDCBFF)" }} />
            <span className="font-black tabular-nums leading-none text-5xl sm:text-6xl md:text-7xl" style={{ color: "#C8E6C9" }}>
              <CountUp stat={stats[5]} started={started} />
            </span>
            <span className="text-sm font-light mt-3 leading-snug max-w-[220px] text-white/60">
              {lang === "ro" ? stats[5].labelRo : stats[5].labelEn}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
