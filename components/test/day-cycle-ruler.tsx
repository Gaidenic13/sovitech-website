"use client"

import type { HTMLAttributes, Ref } from "react"
import { useLanguage } from "@/lib/language-context"
import { EVENTS, MODES, SCHEDULE, clock, eventIndexAt, modeAt } from "./day-cycle-data"

/* The time program drawn the way a BMS schedule screen draws it: a step line, one level per mode. */
const LEVEL = [87.5, 62.5, 37.5, 12.5] // % from the top: protection, economy, standby, comfort
const X = (h: number) => h * 100 // viewBox x per hour; the graph's viewBox is 2400 × 100

const PROGRAM = (() => {
  let d = `M0 ${LEVEL[SCHEDULE[0][1]]}`
  for (let i = 1; i < SCHEDULE.length; i++) {
    const [t, m] = SCHEDULE[i]
    d += `H${X(t)}V${LEVEL[m]}`
  }
  return d + `H${X(24)}`
})()

const TICKS = (() => {
  let d = ""
  for (let q = 0; q <= 96; q++) {
    const h = q / 4
    const len = q % 24 === 0 ? 9 : q % 4 === 0 ? 6 : 3
    d += `M${X(h)} 0V${len}`
  }
  return d
})()

const pct = (h: number) => `${(h / 24) * 100}%`

export type TrackProps = HTMLAttributes<HTMLDivElement> & { ref?: Ref<HTMLDivElement> }

/**
 * The 24-hour ruler under the figure. `live` adds the needle and the accent trace the section's
 * timeline scrubs ([data-needle], [data-progress]). The ruler itself is only a drawing: `track`
 * makes it the section's time slider (one surface carries it), and `hover`, `focused` and
 * `dragging` come from that slider so every surface draws the same state.
 */
export function DayRuler({
  step,
  live = true,
  hover = null,
  focused = false,
  dragging = false,
  marks = [],
  track,
}: {
  step: number
  live?: boolean
  hover?: number | null
  focused?: boolean
  dragging?: boolean
  /** Hours to point out on a still ruler (the moments the still layout shows). */
  marks?: number[]
  track?: TrackProps
}) {
  const { lang } = useLanguage()
  const h = step / 4
  const mode = modeAt(h)
  const current = eventIndexAt(h)

  return (
    <div className="dc-rl flex select-none">
      <div aria-hidden className="dc-gut relative w-28 shrink-0">
        <div className="dc-gh relative">
          {[3, 2, 1, 0].map((m) => (
            <span
              key={m}
              className="absolute left-0 -translate-y-1/2 font-mono text-[10px] uppercase leading-none tracking-[0.14em]"
              style={{ top: `${LEVEL[m]}%`, color: live && m === mode ? "var(--dc-accent)" : "var(--dc-ink-3)" }}
            >
              {lang === "ro" ? MODES[m].sro : MODES[m].sen}
            </span>
          ))}
        </div>
      </div>

      <div
        {...track}
        className={`relative min-w-0 flex-1 outline-none ${track ? "cursor-pointer" : ""}`}
        style={{
          touchAction: track ? "pan-y" : undefined,
          outline: focused ? "1px solid var(--dc-accent)" : undefined,
          outlineOffset: 6,
        }}
      >
        {/* the program: dashed where it is still ahead, drawn in the accent where the day has passed */}
        <div aria-hidden className="dc-gh relative">
          <svg viewBox={`0 0 ${X(24)} 100`} preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible">
            <path
              d={PROGRAM}
              fill="none"
              vectorEffect="non-scaling-stroke"
              strokeWidth={1}
              strokeDasharray={live ? "2 3" : undefined}
              style={{ stroke: live ? "var(--dc-rule-2)" : "var(--dc-edge)" }}
            />
          </svg>
          {live && (
            <div data-progress="" className="absolute inset-0" style={{ clipPath: "inset(0% 100% 0% 0%)" }}>
              <svg viewBox={`0 0 ${X(24)} 100`} preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible">
                <path d={PROGRAM} fill="none" vectorEffect="non-scaling-stroke" strokeWidth={1} style={{ stroke: "var(--dc-accent)" }} />
              </svg>
            </div>
          )}

          {EVENTS.map((e, i) => {
            const reached = !live || h + 1e-6 >= e.t
            const now = live && i === current
            const tip = hover === i
            return (
              <span key={e.t} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: pct(e.t), top: `${LEVEL[e.mode]}%` }}>
                <span
                  className="block size-[7px] rounded-full border transition-colors duration-300"
                  style={{
                    borderColor: reached ? "var(--dc-accent)" : "var(--dc-edge)",
                    background: reached ? "var(--dc-accent)" : "var(--dc-bg)",
                    outline: now || tip ? "1px solid var(--dc-accent)" : "1px solid transparent",
                    outlineOffset: 2,
                  }}
                />
                {tip && (
                  <span
                    className={`dc-in pointer-events-none absolute bottom-full mb-2 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.14em] ${
                      e.t > 20 ? "right-0" : e.t < 3 ? "left-0" : "left-1/2 -translate-x-1/2"
                    }`}
                    style={{ color: "var(--dc-ink)", background: "var(--dc-bg)", padding: "2px 4px" }}
                  >
                    {clock(e.t)} · {lang === "ro" ? e.ro : e.en}
                  </span>
                )}
              </span>
            )
          })}
        </div>

        {/* hour scale */}
        <div aria-hidden className="relative mt-2 h-[9px] border-t" style={{ borderColor: "var(--dc-rule-2)" }}>
          <svg viewBox={`0 0 ${X(24)} 9`} preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible">
            <path d={TICKS} fill="none" vectorEffect="non-scaling-stroke" strokeWidth={1} style={{ stroke: "var(--dc-ink-3)" }} />
          </svg>
        </div>
        <div aria-hidden className="relative mt-1.5 h-4 font-mono text-[10px] tracking-[0.12em] tabular-nums" style={{ color: "var(--dc-ink-3)" }}>
          {[0, 3, 6, 9, 12, 15, 18, 21, 24].map((hh) => (
            <span
              key={hh}
              className={`absolute top-0 ${hh % 6 ? "hidden sm:block" : ""} ${hh === 0 ? "" : hh === 24 ? "-translate-x-full" : "-translate-x-1/2"}`}
              style={{ left: pct(hh) }}
            >
              {String(hh).padStart(2, "0")}
            </span>
          ))}
        </div>

        {marks.map((m) => (
          <div key={m} aria-hidden className="pointer-events-none absolute -top-5 bottom-5" style={{ left: pct(m) }}>
            <span className="absolute inset-y-0 left-0 w-px" style={{ background: "var(--dc-accent)", opacity: 0.6 }} />
            <span
              className={`absolute -top-1 font-mono text-[10px] tracking-[0.12em] tabular-nums ${m > 20 ? "right-1.5" : "left-1.5"}`}
              style={{ color: "var(--dc-accent)" }}
            >
              {clock(m)}
            </span>
          </div>
        ))}

        {live && (
          <div data-needle="" aria-hidden className="pointer-events-none absolute -top-2 bottom-5 left-0 w-full">
            <span className="absolute inset-y-0 left-0 w-px" style={{ background: "var(--dc-accent)" }} />
            <span className="dc-nh absolute left-0 size-[5px] -translate-x-1/2 rounded-[1px]" style={{ background: "var(--dc-accent)" }} />
            {(dragging || focused) && (
              <span
                className="absolute -top-5 left-0 -translate-x-1/2 font-mono text-[10px] tracking-[0.12em] tabular-nums"
                style={{ color: "var(--dc-accent)", background: "var(--dc-bg)", padding: "1px 3px" }}
              >
                {clock(h)}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
