"use client"

import { memo } from "react"
import { SHADE } from "./day-cycle-data"

/*
 * Fig. 03, the drawing: an office block on its site, in a 2:1 isometric
 * projection, under a sun-path arc. Everything here is static markup built once
 * from world coordinates; the section's GSAP timeline moves it by data
 * attributes (windows, blinds, fans) and `skyAt(h)` places the sun, the moon
 * and the cast shadow for any hour of the day.
 *
 * World axes: x runs down-right, y runs down-left, z is up. The two facades
 * the viewer sees face south-east (y = D, left) and south-west (x = W, right).
 */

// The drawing is cropped tight around the block and its sun path, so the building, not the empty
// sky, fills the frame (it spans ~80% of the viewBox height).
export const VB = { x: 76, y: 40, w: 648, h: 552 }
const VIEWBOX = `${VB.x} ${VB.y} ${VB.w} ${VB.h}`

const S = 1.6 // world unit → viewBox unit
const KZ = 1.18 // vertical stretch, so floors read as floors
const OX = 361.6
const OY = 372

type V2 = [number, number]

export function P(x: number, y: number, z = 0): V2 {
  return [OX + (x - y) * S, OY + ((x + y) * S) / 2 - z * S * KZ]
}

const n1 = (n: number) => Math.round(n * 10) / 10
const pts = (a: V2[]) => a.map(([x, y]) => `${n1(x)},${n1(y)}`).join(" ")
const pathOf = (a: V2[], close = true) => "M" + a.map(([x, y]) => `${n1(x)} ${n1(y)}`).join("L") + (close ? "Z" : "")
const seg = (a: V2, b: V2) => `M${n1(a[0])} ${n1(a[1])}L${n1(b[0])} ${n1(b[1])}`

/** Convex hull, monotone chain: the silhouette of a prism is the hull of its two rings. */
function hull(input: V2[]): V2[] {
  const p = input.slice().sort((a, b) => a[0] - b[0] || a[1] - b[1])
  if (p.length < 3) return p
  const cross = (o: V2, a: V2, b: V2) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0])
  const lo: V2[] = []
  for (const q of p) {
    while (lo.length >= 2 && cross(lo[lo.length - 2], lo[lo.length - 1], q) <= 0) lo.pop()
    lo.push(q)
  }
  const up: V2[] = []
  for (let i = p.length - 1; i >= 0; i--) {
    const q = p[i]
    while (up.length >= 2 && cross(up[up.length - 2], up[up.length - 1], q) <= 0) up.pop()
    up.push(q)
  }
  return lo.slice(0, -1).concat(up.slice(0, -1))
}

type Ring = [number, number][]

function rrect(x0: number, y0: number, x1: number, y1: number, r: number, n = 5): Ring {
  const out: Ring = []
  const corners: [number, number, number][] = [
    [x1 - r, y1 - r, 0],
    [x0 + r, y1 - r, 90],
    [x0 + r, y0 + r, 180],
    [x1 - r, y0 + r, 270],
  ]
  for (const [cx, cy, a0] of corners)
    for (let i = 0; i <= n; i++) {
      const a = ((a0 + (90 * i) / n) * Math.PI) / 180
      out.push([cx + r * Math.cos(a), cy + r * Math.sin(a)])
    }
  return out
}

function disc(cx: number, cy: number, r: number, n = 36): Ring {
  return Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)] as [number, number]
  })
}

const ringAt = (ring: Ring, z: number) => ring.map(([x, y]) => P(x, y, z))
function prism(ring: Ring, z0: number, z1: number) {
  return { sil: pathOf(hull([...ringAt(ring, z0), ...ringAt(ring, z1)])), top: pts(ringAt(ring, z1)) }
}

/* ── The building ──────────────────────────────────────────────────────── */

export const T = 3 // the plinth
export const W = 132 // south-east facade length (x)
export const D = 84 // south-west facade length (y)
const FL = 24 // floor to floor
export const HB = FL * 5 + 4 // five floors and the parapet
const ZTOP = T + HB

// Twelve office zones (floor 1–4 × A/B on the south-east side, C on the south-west side):
// when the first person arrives, and when presence ends. 20 is the time schedule's cut-off;
// the two zones that outlast it are the ones the presence sensors keep lit.
const ARRIVE: Record<string, number> = {
  "1A": 6.75, "1B": 7.25, "1C": 7.5, "2A": 7.0, "2B": 7.75, "2C": 7.25,
  "3A": 7.5, "3B": 7.0, "3C": 8.0, "4A": 7.25, "4B": 8.25, "4C": 7.75,
}
const LEAVE: Record<string, number> = {
  "1A": 17.25, "1B": 20, "1C": 17.75, "2A": 18.5, "2B": 17.0, "2C": 21.25,
  "3A": 18.0, "3B": 20, "3C": 18.75, "4A": 22.25, "4B": 17.5, "4C": 20,
}
export const LOBBY_ON = 6.5
export const LOBBY_OFF = 20

type Win = {
  key: string
  floor: number
  poly: V2[]
  on: number
  off: number
  blind?: { h: number; slats: string; bar: string; down: number; up: number }
}

function officeWindows(): Win[] {
  const out: Win[] = []
  for (let f = 1; f <= 4; f++) {
    const z0 = T + FL * f + 5
    const z1 = T + FL * f + 19
    const h = (z1 - z0) * S * KZ
    const slatZ = [1, 2, 3, 4, 5].map((k) => z1 - ((z1 - z0) * k) / 6)
    // south-east facade, six bays
    for (let b = 0; b < 6; b++) {
      const x0 = 22 * b + 4
      const x1 = 22 * b + 18
      const zone = `${f}${b < 3 ? "A" : "B"}`
      const k = b % 3
      out.push({
        key: `se-${f}-${b}`,
        floor: f,
        poly: [P(x0, D, z0), P(x1, D, z0), P(x1, D, z1), P(x0, D, z1)],
        on: ARRIVE[zone] + 0.07 * k,
        off: LEAVE[zone] === 20 ? 20 : LEAVE[zone] + 0.06 * k,
        blind: {
          h,
          slats: slatZ.map((z) => seg(P(x0, D, z), P(x1, D, z))).join(""),
          bar: seg(P(x0, D, z0 + 0.7), P(x1, D, z0 + 0.7)),
          // bay by bay along the facade, top floor first; every blind is down within half an hour
          down: SHADE.se.down + 0.03 * b + 0.025 * (4 - f),
          up: SHADE.se.up + 0.03 * b + 0.025 * (4 - f),
        },
      })
    }
    // south-west facade, four bays
    for (let j = 0; j < 4; j++) {
      const y0 = 21 * j + 4
      const y1 = 21 * j + 17
      const zone = `${f}C`
      out.push({
        key: `sw-${f}-${j}`,
        floor: f,
        poly: [P(W, y1, z0), P(W, y0, z0), P(W, y0, z1), P(W, y1, z1)],
        on: ARRIVE[zone] + 0.07 * (3 - j),
        off: LEAVE[zone] === 20 ? 20 : LEAVE[zone] + 0.06 * j,
        blind: {
          h,
          slats: slatZ.map((z) => seg(P(W, y0, z), P(W, y1, z))).join(""),
          bar: seg(P(W, y0, z0 + 0.7), P(W, y1, z0 + 0.7)),
          down: SHADE.sw.down + 0.03 * (3 - j) + 0.025 * (4 - f),
          up: SHADE.sw.up + 0.03 * (3 - j) + 0.025 * (4 - f),
        },
      })
    }
  }
  return out
}

const WINDOWS = officeWindows()

// The lobby: two glazed panes and the entrance door on the south-east side.
const LOBBY: V2[][] = [
  [P(28, D, T + 4), P(54, D, T + 4), P(54, D, T + 19), P(28, D, T + 19)],
  [P(78, D, T + 4), P(104, D, T + 4), P(104, D, T + 19), P(78, D, T + 19)],
  [P(58, D, T), P(74, D, T), P(74, D, T + 17), P(58, D, T + 17)],
]

const FACE_SE: V2[] = [P(0, D, T), P(W, D, T), P(W, D, ZTOP), P(0, D, ZTOP)]
const FACE_SW: V2[] = [P(W, D, T), P(W, 0, T), P(W, 0, ZTOP), P(W, D, ZTOP)]
const ROOF: V2[] = [P(0, 0, ZTOP), P(W, 0, ZTOP), P(W, D, ZTOP), P(0, D, ZTOP)]
const BODY_SIL = pathOf(hull([...FACE_SE, ...FACE_SW, ...ROOF]))

const FLOOR_LINES = [1, 2, 3, 4, 5]
  .map((f) => {
    const z = T + FL * f
    return seg(P(0, D, z), P(W, D, z)) + seg(P(W, D, z), P(W, 0, z))
  })
  .join("")

// The parapet's inner edge and the roof deck just below it, seen over the back walls.
const ZR = T + FL * 5 + 1
const PARAPET_IN = pts([P(3, 3, ZTOP), P(W - 3, 3, ZTOP), P(W - 3, D - 3, ZTOP), P(3, D - 3, ZTOP)])
const ROOF_DECK = pathOf([P(3, D - 3, ZR), P(3, 3, ZR), P(W - 3, 3, ZR)], false) + seg(P(3, 3, ZR), P(3, 3, ZTOP))

// Entrance canopy over the door.
const CANOPY = (() => {
  const x0 = 54, x1 = 78, y0 = D, y1 = D + 8, z0 = T + 18, z1 = T + 20
  const front: V2[] = [P(x0, y1, z0), P(x1, y1, z0), P(x1, y1, z1), P(x0, y1, z1)]
  const side: V2[] = [P(x1, y1, z0), P(x1, y0, z0), P(x1, y0, z1), P(x1, y1, z1)]
  const top: V2[] = [P(x0, y0, z1), P(x1, y0, z1), P(x1, y1, z1), P(x0, y1, z1)]
  return { front: pts(front), side: pts(side), top: pts(top), sil: pathOf(hull([...front, ...side, ...top])) }
})()

// Ground floor, south-west side: a service door and the plant room louvre.
const SERVICE_DOOR = pts([P(W, 20, T), P(W, 8, T), P(W, 8, T + 17), P(W, 20, T + 17)])
const LOUVRE_FRAME = pts([P(W, 76, T + 5), P(W, 40, T + 5), P(W, 40, T + 18), P(W, 76, T + 18)])
const LOUVRE_SLATS = [7.2, 9.4, 11.6, 13.8, 16]
  .map((z) => seg(P(W, 74, T + z), P(W, 42, T + z)))
  .join("")

// Rooftop air handling unit with two fans, a lift overrun, and the weather station the shading reads.
const AHU = { ring: rrect(16, 18, 62, 46, 3), z0: ZTOP, z1: ZTOP + 16 }
const AHU_P = prism(AHU.ring, AHU.z0, AHU.z1)
const AHU_BEVEL = pts(ringAt(rrect(17.5, 19.5, 60.5, 44.5, 2), AHU.z1))
const AHU_LOUVRES = [4, 7, 10].map((z) => seg(P(20, 46, ZTOP + z), P(38, 46, ZTOP + z))).join("")
const AHU_LED = P(56, 46, ZTOP + 11)
const FANS = [
  [28, 32],
  [50, 32],
].map(([cx, cy]) => {
  const zf = AHU.z1 + 3
  const housing = prism(disc(cx, cy, 8), AHU.z1, zf)
  return {
    cx,
    cy,
    housing,
    guard: pts(ringAt(disc(cx, cy, 6.6), zf)),
    at: P(cx, cy, zf),
  }
})
// One blade in the fan's own plane (u, v in world units around the hub): the iso matrix lays it down.
const BLADES = [0, 1, 2, 3]
  .map((k) => {
    const a = (k * Math.PI) / 2
    const p = (r: number, da: number) => `${n1(r * Math.cos(a + da))} ${n1(r * Math.sin(a + da))}`
    return `M${p(1.6, 0)}Q${p(4.4, 0.18)} ${p(6.1, 0.62)}`
  })
  .join("")

const OVERRUN = (() => {
  const x0 = 94, x1 = 120, y0 = 12, y1 = 34, z0 = ZTOP, z1 = ZTOP + 14
  const left: V2[] = [P(x0, y1, z0), P(x1, y1, z0), P(x1, y1, z1), P(x0, y1, z1)]
  const right: V2[] = [P(x1, y1, z0), P(x1, y0, z0), P(x1, y0, z1), P(x1, y1, z1)]
  const top: V2[] = [P(x0, y0, z1), P(x1, y0, z1), P(x1, y1, z1), P(x0, y1, z1)]
  const door = pts([P(100, y1, z0), P(108, y1, z0), P(108, y1, z0 + 10), P(100, y1, z0 + 10)])
  return { left: pts(left), right: pts(right), top: pts(top), door, sil: pathOf(hull([...left, ...right, ...top])) }
})()

const MAST = {
  pole: seg(P(114, 70, ZTOP), P(114, 70, ZTOP + 19)),
  head: prism(disc(114, 70, 3.2, 20), ZTOP + 19, ZTOP + 21.5),
  arm: seg(P(110, 70, ZTOP + 15), P(118, 70, ZTOP + 15)),
}

const PLINTH = prism(rrect(-8, -8, W + 8, D + 8, 3), 0, T)
const PLINTH_TOP = pts(ringAt(rrect(-8, -8, W + 8, D + 8, 3), T))

// The site: an isometric ground grid that fades out, and the path to the entrance.
const GRID = (() => {
  let g = ""
  for (let k = 0; k <= 14; k++) {
    const v = -120 + 24 * k
    g += seg(P(-132, v, 0), P(264, v, 0))
  }
  for (let k = 0; k <= 16; k++) {
    const v = -132 + 24 * k
    g += seg(P(v, -120, 0), P(v, 216, 0))
  }
  return g
})()
const PATH = seg(P(56, D + 8, 0), P(56, D + 96, 0)) + seg(P(76, D + 8, 0), P(76, D + 96, 0))

// Dimension lines on the ground along both facades, with end ticks, as on a site plan.
const DIM_SE = seg(P(0, D + 16, 0), P(W, D + 16, 0)) + seg(P(0, D + 12, 0), P(0, D + 20, 0)) + seg(P(W, D + 12, 0), P(W, D + 20, 0))
const DIM_SW = seg(P(W + 16, 0, 0), P(W + 16, D, 0)) + seg(P(W + 12, 0, 0), P(W + 20, 0, 0)) + seg(P(W + 12, D, 0), P(W + 20, D, 0))
// A label lying on the ground: its x axis runs along a facade, its y axis points away from it
// (unit vectors of the 2:1 projection: (±0.894, 0.447)).
const groundText = (at: V2, along: V2, away: V2) =>
  `matrix(${n1(along[0] * 1000) / 1000} ${n1(along[1] * 1000) / 1000} ${n1(away[0] * 1000) / 1000} ${n1(away[1] * 1000) / 1000} ${n1(at[0])} ${n1(at[1])})`
const LABEL_SE = groundText(P(2, D + 30, 0), [0.894, 0.447], [-0.894, 0.447])
const LABEL_SW = groundText(P(W + 30, D - 2, 0), [0.894, -0.447], [0.894, 0.447])

/* ── The sky: a sun-path arc over the site ─────────────────────────────── */

const [ACX, ACY] = P(W / 2, D / 2, 0)
// Narrow enough to stay inside the crop, tall enough that the noon sun clears the rooftop plant.
const ARC_RX = 290
const ARC_RY = 385
export const SUNRISE = 6.25
export const SUNSET = 19.75

const ARC = `M${n1(ACX - ARC_RX)} ${n1(ACY)}A${ARC_RX} ${ARC_RY} 0 0 1 ${n1(ACX + ARC_RX)} ${n1(ACY)}`
const onArc = (phi: number): V2 => [ACX - ARC_RX * Math.cos(phi), ACY - ARC_RY * Math.sin(phi)]
/** Where the sun rises and sets on the arc, in viewBox units: the dawn and dusk wipes centre on them. */
export const SUN_RISE_PT: V2 = onArc(0)
export const SUN_SET_PT: V2 = onArc(Math.PI)
const ARC_TICKS = Array.from({ length: 13 }, (_, i) => 7 + i)
  .map((h) => {
    const phi = (Math.PI * (h - SUNRISE)) / (SUNSET - SUNRISE)
    const [x, y] = onArc(phi)
    let nx = -Math.cos(phi) / ARC_RX
    let ny = -Math.sin(phi) / ARC_RY
    const l = Math.hypot(nx, ny)
    nx /= l
    ny /= l
    const len = h === 12 ? 9 : 5
    return seg([x, y], [x + nx * len, y + ny * len])
  })
  .join("")

const STARS: V2[] = [
  [96, 124], [148, 84], [214, 60], [128, 214], [92, 318], [176, 156], [244, 176], [196, 262],
  [704, 112], [652, 80], [590, 58], [676, 206], [708, 330], [628, 150], [548, 92], [612, 266],
]

const smooth = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)))
  return t * t * (3 - 2 * t)
}

// Sun direction in the world, for the cast shadow: east is screen-left, south faces the viewer.
const TILT = Math.PI / 6
const EAST: V2 = [-Math.SQRT1_2, Math.SQRT1_2]
const SOUTH: V2 = [Math.SQRT1_2, Math.SQRT1_2]
const MAX_SHADOW = 2.4 * HB
const FOOT: V2[] = [
  [0, 0],
  [W, 0],
  [W, D],
  [0, D],
]

export type Sky = {
  sun: { x: number; y: number; o: number }
  moon: { x: number; y: number; o: number }
  shadow: { d: string; o: number }
}

/** Where the sun and the moon stand at hour h (0–24), and the building's shadow on its site. */
export function skyAt(h: number): Sky {
  const span = SUNSET - SUNRISE
  const phi = (Math.PI * (h - SUNRISE)) / span
  const night = 24 - span
  const phiM = (Math.PI * ((((h - SUNSET) % 24) + 24) % 24)) / night

  const sunUp = phi > 0 && phi < Math.PI
  const [sx, sy] = onArc(Math.min(Math.PI, Math.max(0, phi)))
  const moonUp = phiM > 0 && phiM < Math.PI
  const [mx, my] = onArc(Math.min(Math.PI, Math.max(0, phiM)))

  let d = ""
  let so = 0
  if (sunUp) {
    const dz = Math.sin(phi) * Math.cos(TILT)
    const hx = Math.cos(phi) * EAST[0] + Math.sin(phi) * Math.sin(TILT) * SOUTH[0]
    const hy = Math.cos(phi) * EAST[1] + Math.sin(phi) * Math.sin(TILT) * SOUTH[1]
    const hl = Math.hypot(hx, hy) || 1
    const len = Math.min(MAX_SHADOW, (hl * HB) / Math.max(dz, 1e-3))
    const ox = (-hx / hl) * len
    const oy = (-hy / hl) * len
    const ring = FOOT.flatMap(([x, y]) => [P(x, y, T), P(x + ox, y + oy, T)])
    d = pathOf(hull(ring))
    so = smooth(0.03, 0.28, dz)
  }

  return {
    sun: { x: sx, y: sy, o: sunUp ? smooth(0, 0.16, Math.sin(phi)) : 0 },
    moon: { x: mx, y: my, o: moonUp ? smooth(0, 0.16, Math.sin(phiM)) * 0.95 : 0 },
    shadow: { d: d || "M0 0", o: so },
  }
}

/* ── Styles: five strokes and a plate, all read from the section's CSS variables ─ */

export const SCENE_CSS = `
.dcs{display:block;overflow:hidden}
.dcs path,.dcs polygon,.dcs circle,.dcs line{vector-effect:non-scaling-stroke;stroke-width:1;stroke-linejoin:round;stroke-linecap:round}
.dcs .pl{fill:var(--dc-bg);stroke:var(--dc-mid)}
.dcs .sil{fill:none;stroke:var(--dc-edge)}
.dcs .sd{fill:var(--dc-bg);stroke:var(--dc-edge)}
.dcs .ln{fill:none;stroke:var(--dc-mid)}
.dcs .lo{fill:none;stroke:var(--dc-lo)}
.dcs .grid{fill:none;stroke:var(--dc-lo)}
.dcs .dim{fill:none;stroke:var(--dc-mid)}
.dcs .gl{fill:var(--dc-edge);stroke:none;font-family:ui-monospace,Menlo,Consolas,monospace;font-size:13px;letter-spacing:.22em}
@media (max-width:639px){.dcs .gl{font-size:19px}}
.dcs .arc{fill:none;stroke:var(--dc-mid);stroke-dasharray:1 5}
.dcs .tick{fill:none;stroke:var(--dc-mid)}
.dcs .win{fill:var(--dc-bg);stroke:none}
.dcs .pl,.dcs .sd,.dcs .win{fill-opacity:var(--dc-fill,1)}
.dcs .lit{fill:var(--dc-lit);fill-opacity:var(--dc-lit-a);stroke:none}
.dcs .bl{fill:var(--dc-bg);fill-opacity:.8;stroke:none}
.dcs .slat{fill:none;stroke:var(--dc-mid)}
.dcs .bar{fill:none;stroke:var(--dc-edge)}
.dcs .wf{fill:none;stroke:var(--dc-mid)}
.dcs .star{fill:var(--dc-edge);stroke:none;opacity:var(--dc-night)}
.dcs .shade{fill:var(--dc-shade);stroke:var(--dc-edge);stroke-opacity:.55;stroke-dasharray:2 3}
.dcs .sun{fill:var(--dc-bg);stroke:var(--dc-hi)}
.dcs .ray{fill:none;stroke:var(--dc-hi)}
.dcs .moon{fill:var(--dc-bg);stroke:var(--dc-edge)}
.dcs .fanb{fill:none;stroke:var(--dc-mid);transition:stroke .4s ease-out}
.dcs .hub{fill:var(--dc-mid);stroke:none;transition:fill .4s ease-out}
.dcs .led{fill:var(--dc-lo);stroke:none;transition:fill .4s ease-out}
.dcs .ahu{transition:stroke .4s ease-out}
.dcs[data-run="1"] .fanb{stroke:var(--dc-accent)}
.dcs[data-run="1"] .hub,.dcs[data-run="1"] .led{fill:var(--dc-accent)}
.dcs[data-run="1"] .ahu{stroke:var(--dc-hi)}
`

type Draft = "base" | "win" | "roof"

/**
 * A stroked shape the entrance can draft: it carries the non-scaling-stroke
 * attribute DrawSVG measures by, its draft group, and (windows) its floor.
 */
function Shape({ d, p, className, draft, floor }: { d?: string; p?: string; className: string; draft?: Draft; floor?: number }) {
  const props = { className, vectorEffect: "non-scaling-stroke", "data-draft": draft, "data-floor": floor }
  return d ? <path d={d} {...props} /> : <polygon points={p} {...props} />
}

/**
 * The building and its sky. Memoised: it never re-renders after mount, so the
 * attributes GSAP writes (opacity, transforms, data-run) are never fought over.
 */
export const DayScene = memo(function DayScene({
  uid,
  className,
  facades,
}: {
  uid: string
  className?: string
  /** The two facade names written on the ground, south-east then south-west. */
  facades: [string, string]
}) {
  const fade = `${uid}-fade`
  const mask = `${uid}-mask`
  return (
    <svg
      viewBox={VIEWBOX}
      className={`dcs ${className ?? ""}`}
      aria-hidden="true"
      data-scene=""
      data-run="0"
    >
      <defs>
        <radialGradient
          id={fade}
          gradientUnits="userSpaceOnUse"
          cx={ACX}
          cy={ACY}
          r={330}
          gradientTransform={`translate(${ACX} ${ACY}) scale(1 0.58) translate(${-ACX} ${-ACY})`}
        >
          <stop offset="0.3" stopColor="#fff" stopOpacity="1" />
          <stop offset="0.72" stopColor="#fff" stopOpacity="0.35" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <mask id={mask} maskUnits="userSpaceOnUse" x={VB.x} y={VB.y} width={VB.w} height={VB.h}>
          <rect x={VB.x} y={VB.y} width={VB.w} height={VB.h} fill={`url(#${fade})`} />
        </mask>
        {WINDOWS.map((w) => (
          <clipPath id={`${uid}-${w.key}`} key={w.key}>
            <polygon points={pts(w.poly)} />
          </clipPath>
        ))}
      </defs>

      {/* sky */}
      <g>
        {STARS.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 1.4 : 1} className="star" />
        ))}
        <g data-skyline="">
          <path d={ARC} className="arc" />
          <path d={ARC_TICKS} className="tick" />
        </g>
        <g data-moon="" transform="translate(-100 -100)" style={{ opacity: 0 }}>
          <circle r={9} className="moon" />
          <path d="M0 -9A6.2 9 0 0 1 0 9" className="moon" style={{ fill: "none" }} />
        </g>
        <g data-sun="" transform="translate(-100 -100)" style={{ opacity: 0 }}>
          <path
            className="ray"
            d={Array.from({ length: 8 }, (_, k) => {
              const a = (k * Math.PI) / 4
              return seg([14 * Math.cos(a), 14 * Math.sin(a)], [19 * Math.cos(a), 19 * Math.sin(a)])
            }).join("")}
          />
          <circle r={9.5} className="sun" />
        </g>
      </g>

      {/* the site */}
      <g mask={`url(#${mask})`}>
        <g data-ground="">
          <path d={GRID} className="grid" />
          <path d={PATH} className="ln" />
        </g>
        <path data-shadow="" d="M0 0" className="shade" style={{ opacity: 0 }} />
      </g>
      <g data-ground="">
        <path d={DIM_SE + DIM_SW} className="dim" />
        <text transform={LABEL_SE} className="gl">
          {facades[0]}
        </text>
        <text transform={LABEL_SW} className="gl">
          {facades[1]}
        </text>
      </g>
      <Shape d={PLINTH.sil} className="sd" draft="base" />
      <Shape p={PLINTH_TOP} className="lo" draft="base" />

      {/* the block */}
      <Shape p={pts(FACE_SE)} className="pl" draft="base" />
      <Shape p={pts(FACE_SW)} className="pl" draft="base" />
      <Shape p={pts(ROOF)} className="pl" draft="base" />
      <Shape d={FLOOR_LINES} className="lo" draft="base" />

      {WINDOWS.map((w) => {
        const p = pts(w.poly)
        return (
          <g key={w.key}>
            <polygon points={p} className="win" />
            <polygon points={p} className="lit" data-lit="" data-on={w.on} data-off={w.off} style={{ opacity: 0 }} />
            {w.blind && (
              <g clipPath={`url(#${uid}-${w.key})`}>
                <g
                  data-blind=""
                  data-down={w.blind.down}
                  data-up={w.blind.up}
                  data-h={n1(w.blind.h)}
                  transform={`translate(0 ${-n1(w.blind.h)})`}
                >
                  <polygon points={p} className="bl" />
                  <path d={w.blind.slats} className="slat" />
                  <path d={w.blind.bar} className="bar" />
                </g>
              </g>
            )}
            <Shape p={p} className="wf" draft="win" floor={w.floor} />
          </g>
        )
      })}

      {LOBBY.map((poly, i) => {
        const p = pts(poly)
        return (
          <g key={`lobby-${i}`}>
            <polygon points={p} className="win" />
            <polygon points={p} className="lit" data-lit="" data-on={LOBBY_ON} data-off={LOBBY_OFF} style={{ opacity: 0 }} />
            <Shape p={p} className="wf" draft="win" floor={0} />
          </g>
        )
      })}
      <Shape d={seg(P(66, D, T), P(66, D, T + 17))} className="ln" draft="win" floor={0} />
      <Shape p={CANOPY.top} className="pl" draft="win" floor={0} />
      <Shape p={CANOPY.front} className="pl" draft="win" floor={0} />
      <Shape p={CANOPY.side} className="pl" draft="win" floor={0} />
      <Shape d={CANOPY.sil} className="sil" draft="win" floor={0} />

      <Shape p={SERVICE_DOOR} className="pl" draft="win" floor={0} />
      <Shape p={LOUVRE_FRAME} className="pl" draft="win" floor={0} />
      <Shape d={LOUVRE_SLATS} className="lo" draft="win" floor={0} />

      <Shape d={BODY_SIL} className="sil" draft="base" />

      {/* the roof */}
      <Shape p={PARAPET_IN} className="lo" draft="roof" />
      <Shape d={ROOF_DECK} className="lo" draft="roof" />

      <Shape d={AHU_P.sil} className="sd ahu" draft="roof" />
      <Shape p={AHU_P.top} className="ln" draft="roof" />
      <Shape p={AHU_BEVEL} className="lo" draft="roof" />
      <Shape d={AHU_LOUVRES} className="lo" draft="roof" />
      <circle cx={AHU_LED[0]} cy={AHU_LED[1]} r={1.7} className="led" />
      {FANS.map((f, i) => (
        <g key={i}>
          <Shape d={f.housing.sil} className="sd ahu" draft="roof" />
          <Shape p={f.housing.top} className="pl" draft="roof" />
          <Shape p={f.guard} className="lo" draft="roof" />
          <g data-blades="" transform={`matrix(${S} ${S / 2} ${-S} ${S / 2} ${n1(f.at[0])} ${n1(f.at[1])})`}>
            <g data-fan="">
              <path d={BLADES} className="fanb" />
            </g>
          </g>
          <circle cx={f.at[0]} cy={f.at[1]} r={1.5} className="hub" />
        </g>
      ))}

      <Shape p={OVERRUN.top} className="pl" draft="roof" />
      <Shape p={OVERRUN.left} className="pl" draft="roof" />
      <Shape p={OVERRUN.right} className="pl" draft="roof" />
      <Shape p={OVERRUN.door} className="lo" draft="roof" />
      <Shape d={OVERRUN.sil} className="sil" draft="roof" />

      <Shape d={MAST.pole + MAST.arm} className="ln" draft="roof" />
      <Shape d={MAST.head.sil} className="sd" draft="roof" />
      <Shape p={MAST.head.top} className="lo" draft="roof" />
    </svg>
  )
})
