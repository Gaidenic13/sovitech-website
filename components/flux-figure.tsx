"use client"

import { useCallback } from "react"
import { flux, POINTS } from "@/lib/hairline/flux"
import { HairlineStage, type HairlineFigure, type ViewPoint } from "@/components/hairline-stage"

export type FluxPart = "senzor" | "hvac" | "vana" | "contor" | "bms"

/** The order the unseen pointer walks the figure in when nobody is touching it: every source, then the cabinet. */
export const FLUX_LAP: FluxPart[] = ["senzor", "hvac", "vana", "contor", "bms"]

// The figure names its parts in its read-out; the page works with ids.
const BY_NAME: Record<string, FluxPart> = { senzor: "senzor", hvac: "hvac", "vană": "vana", contor: "contor", bms: "bms" }
const LAP: (ViewPoint | null)[] = [...FLUX_LAP.map((p) => POINTS[p] as ViewPoint), null]

/**
 * The Hairline "flux" figure: a BMS cabinet fed by four devices. It plays its
 * own lap until a hand arrives, reports the part under the pointer through
 * `onRead`, and answers `focus` from outside (the legend) as a pointer would.
 */
export function FluxFigure({
  label,
  focus,
  onRead,
  paused,
  className,
}: {
  label: string
  focus: FluxPart | null
  onRead: (part: FluxPart | null) => void
  paused?: boolean
  className?: string
}) {
  const read = useCallback((text: string) => onRead(BY_NAME[text] ?? null), [onRead])
  return (
    <HairlineStage
      figure={flux as HairlineFigure}
      label={label}
      lap={LAP}
      focus={focus ? (POINTS[focus] as ViewPoint) : null}
      onRead={read}
      paused={paused}
      className={className}
    />
  )
}
