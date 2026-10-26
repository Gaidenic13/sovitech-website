"use client"

import { useEffect, useRef, type CSSProperties } from "react"
import HL from "@/lib/hairline/kernel"

/** A point in a Hairline figure's 400 × 320 viewBox. */
export type ViewPoint = [number, number]

/** What a figure module in lib/hairline exports: the object its hairline({ … }) call would have declared. */
export interface HairlineFigure {
  name: string
  means: string
  rules: number[]
  range: [number, number, number]
  tour: (ViewPoint | null)[] | null
  mount: (
    host: { stage: HTMLElement; svg: SVGSVGElement; read: { textContent: string } },
    value: number,
  ) => { set: (value: number) => void; destroy: () => void }
}

// Hairline's five strokes, in the brand's two surfaces.
export const HAIRLINE_ON_DARK = {
  "--hairline-plate": "#07201C",
  "--hairline-hi": "#C8E6C9",
  "--hairline-edge": "#6F978B",
  "--hairline-mid": "#3A5F55",
  "--hairline-lo": "#24473F",
  "--hairline-stroke": "1",
} as CSSProperties

export const HAIRLINE_ON_LIGHT = {
  "--hairline-plate": "#F5F4F0",
  "--hairline-hi": "#0D2E2B",
  "--hairline-edge": "#546A67",
  "--hairline-mid": "#95A29F",
  "--hairline-lo": "#BAC1BE",
  "--hairline-stroke": "1",
} as CSSProperties

/**
 * Mounts one Hairline figure the way the package does: a stage, an svg, a
 * read-out. It walks `lap` (or the figure's own tour) on its own until a hand
 * arrives, unless `paused`; reports every read-out through `onRead` ("rest" at
 * rest); and answers `focus` from outside, a viewBox point held as a pointer
 * would be.
 */
export function HairlineStage({
  figure,
  label,
  lap,
  focus = null,
  onRead,
  intensity = 0.5,
  palette = HAIRLINE_ON_DARK,
  paused = false,
  className,
}: {
  figure: HairlineFigure
  label: string
  lap?: (ViewPoint | null)[]
  focus?: ViewPoint | null
  onRead?: (text: string) => void
  /** The slider of the bench, 0 to 1; 0.5 is the figure's default. */
  intensity?: number
  palette?: CSSProperties
  /** Stops the lap (a pause control, WCAG 2.2.2); the figure still answers a hand. */
  paused?: boolean
  className?: string
}) {
  const stageRef = useRef<HTMLDivElement>(null)
  const readRef = useRef(onRead)
  const lapRef = useRef(lap)
  const mounted = useRef(false)
  const held = useRef(false)
  const real = useRef(false)

  useEffect(() => {
    readRef.current = onRead
    lapRef.current = lap
  })

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    HL.inject(document)
    const svg = HL.mk("svg", { viewBox: "0 0 400 320", "aria-hidden": "true" }, stage) as SVGSVGElement
    let text: string | null = null
    const read = {
      get textContent() {
        return text ?? ""
      },
      set textContent(value: string) {
        text = value == null ? "" : String(value)
        readRef.current?.(text)
      },
    }
    // intensity to the figure's own number: two straight lines that meet at 0.5, as in the package
    const [lo, mid, hi] = figure.range
    const i = Math.min(1, Math.max(0, intensity))
    const value = i <= 0.5 ? lo + (i / 0.5) * (mid - lo) : mid + ((i - 0.5) / 0.5) * (hi - mid)
    const handle = figure.mount({ stage, svg, read }, value)
    if (text === null) read.textContent = "rest"
    // Whether a real pointer is over the figure: then it, not the legend, decides when to let go.
    const enter = (e: PointerEvent) => {
      if (e.isTrusted) real.current = true
    }
    const leave = (e: PointerEvent) => {
      if (e.isTrusted) real.current = false
    }
    stage.addEventListener("pointermove", enter)
    stage.addEventListener("pointerleave", leave)
    mounted.current = true
    return () => {
      mounted.current = false
      stage.removeEventListener("pointermove", enter)
      stage.removeEventListener("pointerleave", leave)
      handle.destroy()
      svg.remove()
    }
  }, [figure, intensity])

  // The lap: its own effect, after the mount, so pausing never remounts the figure.
  useEffect(() => {
    const stage = stageRef.current
    if (!stage || paused) return
    const stops = lapRef.current ?? figure.tour
    const walk = stops ? HL.tour(stage, stops) : null
    return () => walk?.stop()
  }, [figure, intensity, paused])

  // A point from outside (a legend, a list) is held over the figure the way a hand would hold it, then let go.
  const fx = focus?.[0]
  const fy = focus?.[1]
  useEffect(() => {
    const stage = stageRef.current
    if (!stage || !mounted.current) return
    if (fx == null || fy == null) {
      // A real pointer that arrived meanwhile keeps the figure; only a point we held is let go.
      if (held.current && !real.current) stage.dispatchEvent(new PointerEvent("pointerleave", { pointerType: "mouse" }))
      held.current = false
      return
    }
    held.current = true
    const r = stage.getBoundingClientRect()
    stage.dispatchEvent(
      new PointerEvent("pointermove", {
        pointerType: "mouse",
        bubbles: true,
        clientX: r.left + (fx / 400) * r.width,
        clientY: r.top + (fy / 320) * r.height,
      }),
    )
  }, [fx, fy])

  return (
    <div ref={stageRef} data-hairline={figure.name} role="img" aria-label={label} className={className} style={palette} />
  )
}
