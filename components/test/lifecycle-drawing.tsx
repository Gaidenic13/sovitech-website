"use client"

import { Fragment, type CSSProperties } from "react"

/**
 * Fig. 05, the drawing: one section through a small building (roof plant,
 * two floors, ground floor, basement plant room), drawn the way a BMS project
 * grows. Every stroke carries a data-k hook so the section can animate it,
 * and a layer number (1 design, 2 execution, 3 integration, 4 maintenance,
 * 5 modernisation) so earlier work can step back while the current one is lit.
 *
 * The drawing is pure geometry in a 640 × 500 viewBox. Words never live in
 * the SVG: labels are HTML laid over it at viewBox positions, so they keep a
 * readable size from a phone to a wide screen.
 *
 * A camera can push in on the sheet (chapter 5): the section animates the
 * SVG's viewBox, so every hairline stays 1px, and sets --vx / --vy / --vs on
 * the box so the HTML labels follow the zoom without growing.
 */

export const VBW = 640
export const VBH = 500

/** The hairline inks of the hero figure, on the deep surface. */
export const INK = {
  hi: "#C8E6C9",
  edge: "#6F978B",
  mid: "#3A5F55",
  lo: "#24473F",
  plate: "#07201C",
} as const

export type ProtoId = "bacnet" | "dali" | "knx" | "mbus" | "modbus"

/** The five buses, top to bottom as they leave the building's levels. Told apart by dash and weight, never by colour. */
export const PROTOS: { id: ProtoId; name: string; dash?: string; width: number; y: number }[] = [
  { id: "bacnet", name: "BACnet", width: 1.75, y: 90 },
  { id: "dali", name: "DALI", dash: "8 2.5 1 2.5", width: 1, y: 124 },
  { id: "knx", name: "KNX", dash: "1 2.5", width: 1, y: 214 },
  { id: "mbus", name: "M-Bus", dash: "3 2.5", width: 1, y: 304 },
  { id: "modbus", name: "Modbus", dash: "8 3", width: 1, y: 394 },
]

const pct = (v: number, of: number) => `${+((v / of) * 100).toFixed(4)}%`
const camX = (x: number) => `(${pct(x, VBW)} - var(--vx, 0%)) * var(--vs, 1)`
const camY = (y: number) => `(${pct(y, VBH)} - var(--vy, 0%)) * var(--vs, 1)`

/** A viewBox point as a CSS position inside the drawing box, through the camera. */
export const at = (x: number, y: number): CSSProperties => ({ left: `calc(${camX(x)})`, top: `calc(${camY(y)})` })

const circ = (cx: number, cy: number, r: number) =>
  `M${cx - r},${cy} a${r},${r} 0 1,0 ${2 * r},0 a${r},${r} 0 1,0 ${-2 * r},0`

// ── Geometry ────────────────────────────────────────────────────────────────
// Walls 140/146 and 514/520. Levels (top of slab): roof 106, E2 196, E1 286,
// ground 376, basement floor 462. Slabs are 6 deep. The riser is 452 to 486.

const AXES = [
  { x: 143, n: "A" },
  { x: 267, n: "B" },
  { x: 393, n: "C" },
  { x: 517, n: "D" },
]

const LEVELS = [
  { y: 106, ro: "T", en: "R" },
  { y: 196, ro: "E2", en: "L2" },
  { y: 286, ro: "E1", en: "L1" },
  { y: 376, ro: "P", en: "GF" },
  { y: 462, ro: "S", en: "B1" },
]

const STRUCT = [
  "M146,462 V94 H140 V468",
  "M514,462 V94 H520 V468",
  "M146,106 H514 M146,112 H514",
  ...[196, 286, 376].map((y) => `M146,${y} H452 M486,${y} H514 M146,${y + 6} H452 M486,${y + 6} H514`),
  "M146,462 H514 M140,468 H520",
  "M452,112 V382 M486,112 V382",
]

const ZONES = [
  ...[
    [119, 189],
    [209, 279],
    [299, 369],
  ].flatMap(([y0, y1]) =>
    [
      [153, 260],
      [274, 386],
      [400, 445],
    ].map(([x0, x1]) => `M${x0},${y0} H${x1} V${y1} H${x0} Z`),
  ),
  "M153,389 H445 V455 H153 Z",
]
/** Which floor each above-ground zone belongs to: the migration lights a floor's zones while its panel is retrofitted. */
const ZONE_FLOOR = ["e2", "e2", "e2", "e1", "e1", "e1", "p", "p", "p"] as const

const ARCH = [
  "M267,112 V196 M393,112 V196",
  "M267,202 V286 M393,202 V286",
  "M267,292 V338 M393,292 V338",
  ...[
    [128, 176],
    [218, 266],
    [308, 356],
  ].map(
    ([h, s]) =>
      `M140,${h} H146 M140,${s} H146 M143,${h} V${s} M514,${h} H520 M514,${s} H520 M517,${h} V${s}`,
  ),
]

const TRAYS = [112, 202, 292, 382].map(
  (c) =>
    `M154,${c + 5} H450 V${c + 8} H154 Z ` + [180, 240, 300, 360, 420].map((x) => `M${x},${c} V${c + 5}`).join(" "),
)

const DEVICES = [
  // roof: air handling unit, filter, coil, fan
  "M170,72 H270 V106 H170 Z",
  "M200,72 V106 M234,72 V106",
  "M176,78 L194,84 L176,90 L194,96 L176,102",
  "M210,78 V100 M217,78 V100 M224,78 V100",
  circ(252, 89, 10),
  circ(252, 89, 3),
  // E2: luminaires on pendants
  ...[180, 228, 306, 354, 422].map((x) => `M${x},112 V128 M${x - 10},128 H${x + 10} L${x + 7},132 H${x - 7} Z`),
  // E1: room units on the walls
  ...[148, 269, 395].map((x) => `M${x},240 h7 v10 h-7 Z M${x + 2},243.5 h3`),
  // ground floor: heat meters on the distribution pipe
  "M150,356 H424 V450 H250",
  "M150,360 H420 V446 H250",
  ...[202, 330].flatMap((x) => [`M${x - 6},352 h12 v12 h-12 Z M${x},346.5 V352`, circ(x, 342, 4.5)]),
  // basement: chiller, two pumps, a motorised valve
  "M160,410 H250 V462 H160 Z",
  "M160,420 H250",
  "M172,428 H238 A4,4 0 0 1 238,436 H172 A4,4 0 0 1 172,428 Z",
  "M172,444 H238 A4,4 0 0 1 238,452 H172 A4,4 0 0 1 172,444 Z",
  ...[300, 340].flatMap((x) => [circ(x, 448, 7), `M${x - 4},444 L${x + 5},448 L${x - 4},452 Z`]),
  "M374,443 V453 L386,443 V453 Z",
  "M380,448 V438 M375,432 h10 v6 h-10 Z",
]

/** Floor automation panels: the cabinet stays for life, what is inside it is what gets replaced. */
export const PANELS = [
  { floor: "e2", y: 136 },
  { floor: "e1", y: 226 },
  { floor: "p", y: 316 },
] as const

const casing = (y: number) => `M490,${y} h22 v40 h-22 Z`
const oldInside = (y: number) => [8, 14, 20, 26, 32].map((d) => `M493.5,${y + d} h15`).join(" ")
const newInside = (y: number) => [
  `M493.5,${y + 5} h15 v10 h-15 Z`,
  `M496,${y + 12} l3,-3 l3,2 l3,-4 l2.5,2`,
  `M493.5,${y + 21} h15 M493.5,${y + 26} h15`,
  circ(496.5, y + 33.5, 1.1),
  circ(501, y + 33.5, 1.1),
  circ(505.5, y + 33.5, 1.1),
]
const tap = (y: number) => `M483,${y + 20} H490`
/** The old controller as a dashed outline: it slides out of the cabinet, to the right of the wall, when it is replaced. */
const ghost = (y: number) => `M492,${y + 5} h18 v31 h-18 Z ${oldInside(y)}`
export const GHOST_DX = 34
/** The chapter 5 camera: how far it pushes in, and where on the box the panel being retrofitted sits. */
export const ZOOM = 2.8
export const panelView = (y: number) => {
  const w = VBW / ZOOM
  const h = VBH / ZOOM
  return { x: 501 + GHOST_DX / 2 - 0.56 * w, y: y + 24 - 0.5 * h, w }
}

const BUS: Record<ProtoId, string> = {
  bacnet: "M270,90 H477 Q483,90 483,96 V404 C483,414 471,414 471,424",
  dali: "M180,124 H471 Q477,124 477,130 V404 C477,414 471,414 471,424",
  knx: "M151.5,240 V220 Q151.5,214 157.5,214 H465 Q471,214 471,220 V424",
  mbus: "M202,337.5 V310 Q202,304 208,304 H459 Q465,304 465,310 V404 C465,414 471,414 471,424",
  modbus: "M205,410 V400 Q205,394 211,394 H453 Q459,394 459,400 V404 C459,414 471,414 471,424",
}

const DROPS: Partial<Record<ProtoId, string>> = {
  knx: "M272.5,214 V240 M398.5,214 V240",
  mbus: "M330,304 V337.5",
  modbus: "M300,394 V441 M340,394 V441",
}

const JOINTS: [ProtoId, number, number][] = [
  ["dali", 228, 124],
  ["dali", 306, 124],
  ["dali", 354, 124],
  ["dali", 422, 124],
  ["knx", 272.5, 214],
  ["knx", 398.5, 214],
  ["mbus", 330, 304],
  ["modbus", 300, 394],
  ["modbus", 340, 394],
]

/** Where the periodic checks land, top to bottom: the unit on the roof, three panels, a meter, the chiller, the BMS. */
export const CHECKS = [
  { x: 270, y: 72 },
  { x: 501, y: 126 },
  { x: 501, y: 216 },
  { x: 501, y: 306 },
  { x: 216, y: 336 },
  { x: 250, y: 410 },
  { x: 493, y: 424 },
]

const grid = (step: number, skip?: number) => {
  let d = ""
  for (let x = 0; x <= VBW; x += step) if (!skip || x % skip) d += `M${x},0 V${VBH} `
  for (let y = 0; y <= VBH; y += step) if (!skip || y % skip) d += `M0,${y} H${VBW} `
  return d
}
const GRID_MINOR = grid(20, 100)
const GRID_MAJOR = grid(100)

const HATCH = [
  ...Array.from({ length: 11 }, (_, k) => `M128,${388 + 8 * k} L140,${376 + 8 * k}`),
  ...Array.from({ length: 11 }, (_, k) => `M520,${376 + 8 * k} L532,${388 + 8 * k}`),
  ...Array.from({ length: 50 }, (_, k) => `M${128 + 8 * k},476 L${136 + 8 * k},468`),
  ...Array.from({ length: 9 }, (_, k) => `M${30 + 12 * k},376 L${24 + 12 * k},382`),
  ...Array.from({ length: 7 }, (_, k) => `M${544 + 12 * k},376 L${538 + 12 * k},382`),
].join(" ")

const DIMS = [
  "M143,52 H517",
  "M556,106 V462",
  ...LEVELS.map((l) => `M524,${l.y} H578`),
]
const TICKS = [
  ...AXES.map((a) => `M${a.x - 4},56 L${a.x + 4},48`),
  ...LEVELS.map((l) => `M552,${l.y + 4} L560,${l.y - 4}`),
]

// ── Pieces ──────────────────────────────────────────────────────────────────

const NS = "non-scaling-stroke" as const

/**
 * While the camera is pushed in, the box clips the sheet and fades its edges (as wide as --edge), like the
 * edge of a lens. At the full view neither applies, so labels may overhang the box into the frame's margin.
 */
const EDGE_V = "linear-gradient(to bottom, transparent, #000 var(--edge, 0%), #000 calc(100% - var(--edge, 0%)), transparent)"
const EDGE_H = "linear-gradient(to right, transparent, #000 var(--edge, 0%), #000 calc(100% - var(--edge, 0%)), transparent)"
export function setLens(box: HTMLElement, on: boolean) {
  const st = box.style
  st.overflow = on ? "hidden" : ""
  st.maskImage = on ? `${EDGE_V}, ${EDGE_H}` : ""
  st.maskComposite = on ? "intersect" : ""
  st.setProperty("-webkit-mask-image", on ? `${EDGE_V}, ${EDGE_H}` : "")
  st.setProperty("-webkit-mask-composite", on ? "source-in" : "")
}

export type DrawingMode = "motion" | "static"

/**
 * The drawing itself. In "motion" mode it is handed to GSAP, which owns every
 * state; in "static" mode (reduced motion) it shows the finished building and
 * lights one chapter's layer, `highlight`, in mint.
 */
export function LifecycleDrawing({
  uid,
  lang,
  mode,
  highlight = null,
  label,
}: {
  uid: string
  lang: "ro" | "en"
  mode: DrawingMode
  highlight?: number | null
  label: string
}) {
  const id = (s: string) => `${uid}-${s}`
  const still = mode === "static"
  const tone = (layer: number, rest: string): CSSProperties | undefined =>
    still ? { color: highlight === layer ? INK.hi : rest, transition: "color 300ms ease" } : undefined
  const hidden: CSSProperties = { opacity: 0, visibility: "hidden" }

  return (
    <div data-k="box" className="relative w-full" style={{ aspectRatio: `${VBW} / ${VBH}` }} role="img" aria-label={label}>
      <svg
        data-k="sheet"
        viewBox={`0 0 ${VBW} ${VBH}`}
        className="absolute inset-0 h-full w-full"
        fill="none"
        stroke="currentColor"
        strokeWidth={1}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
        style={{ color: INK.edge }}
      >
        <defs>
          <radialGradient id={id("rg")} gradientUnits="userSpaceOnUse" cx="330" cy="260" r="360">
            <stop offset="0.35" stopColor="#fff" />
            <stop offset="1" stopColor="#000" />
          </radialGradient>
          <mask id={id("mg")} maskUnits="userSpaceOnUse" x="0" y="0" width={VBW} height={VBH}>
            <rect width={VBW} height={VBH} fill={`url(#${id("rg")})`} />
          </mask>
          {/* Solid twins of every dashed line: drawing these reveals the dashes, so a dashed line can still draw itself. */}
          <mask id={id("m1")} maskUnits="userSpaceOnUse" x="-20" y="-20" width={VBW + 40} height={VBH + 40}>
            <g stroke="#fff" strokeWidth={5} strokeLinecap="square">
              {AXES.map((a) => (
                <path key={a.n} data-k="m-axis" d={`M${a.x},38 V486`} />
              ))}
              {STRUCT.map((d, i) => (
                <path key={i} data-k="m-struct" d={d} />
              ))}
              {ZONES.map((d, i) => (
                <path key={i} data-k="m-zone" d={d} />
              ))}
            </g>
          </mask>
          <mask id={id("m3")} maskUnits="userSpaceOnUse" x="-20" y="-20" width={VBW + 40} height={VBH + 40}>
            <g stroke="#fff" strokeWidth={5} strokeLinecap="square">
              {PROTOS.map((p) => (
                <path key={p.id} data-k="m-bus" data-proto={p.id} d={BUS[p.id]} />
              ))}
              {PROTOS.filter((p) => DROPS[p.id]).map((p) => (
                <path key={p.id} data-k="m-drop" data-proto={p.id} d={DROPS[p.id]} />
              ))}
            </g>
          </mask>
        </defs>

        {/* The sheet: a 20-unit drafting grid, heavier every 100, fading out towards the frame. */}
        <g data-k="grid" mask={`url(#${id("mg")})`}>
          <path d={GRID_MINOR} stroke="rgba(200,230,201,0.05)" vectorEffect={NS} />
          <path d={GRID_MAJOR} stroke="rgba(200,230,201,0.09)" vectorEffect={NS} />
        </g>

        {/* 1 · Design: axes, the site, dimensions, the dashed outline and its zones. */}
        <g data-layer="1" style={tone(0, INK.mid)}>
          <g mask={`url(#${id("m1")})`}>
            {AXES.map((a) => (
              <path key={a.n} d={`M${a.x},38 V486`} strokeDasharray="10 3 2 3" strokeLinecap="butt" vectorEffect={NS} />
            ))}
            <g data-k="zones">
              {ZONES.map((d, i) => (
                <path key={i} d={d} strokeDasharray="2 3" strokeLinecap="butt" vectorEffect={NS} />
              ))}
            </g>
            <g data-k="dstruct" style={hidden}>
              {STRUCT.map((d, i) => (
                <path key={i} d={d} strokeDasharray="5 3" strokeLinecap="butt" vectorEffect={NS} />
              ))}
            </g>
          </g>
          <path data-k="ground" d="M20,376 H140 M520,376 H620" vectorEffect={NS} />
          <path data-k="hatch" d={HATCH} vectorEffect={NS} />
          {DIMS.map((d, i) => (
            <path key={i} data-k="dim" d={d} vectorEffect={NS} />
          ))}
          {TICKS.map((d, i) => (
            <path key={i} data-k="tick" d={d} vectorEffect={NS} />
          ))}
          {LEVELS.map((l) => (
            <path key={l.y} data-k="lvl" d={`M566,${l.y - 7} H574 L570,${l.y} Z`} vectorEffect={NS} />
          ))}
        </g>

        {/* 2 · Execution: the solid structure, then trays, field devices, panels. */}
        <g data-layer="2" style={tone(1, INK.edge)}>
          {STRUCT.map((d, i) => (
            <path key={i} data-k="struct" d={d} vectorEffect={NS} />
          ))}
          {ARCH.map((d, i) => (
            <path key={i} data-k="arch" d={d} vectorEffect={NS} />
          ))}
          {TRAYS.map((d, i) => (
            <path key={i} data-k="tray" d={d} vectorEffect={NS} />
          ))}
          {DEVICES.map((d, i) => (
            <path key={i} data-k="dev" d={d} vectorEffect={NS} />
          ))}
          {PANELS.map((p) => (
            <path key={p.floor} data-k="casing" data-floor={p.floor} d={casing(p.y)} vectorEffect={NS} />
          ))}
          {PANELS.map((p) => (
            <path
              key={p.floor}
              data-k="old"
              data-floor={p.floor}
              d={oldInside(p.y)}
              vectorEffect={NS}
              style={still ? hidden : undefined}
            />
          ))}
        </g>

        {/* 3 · Integration: five buses converge on one BMS. */}
        <g data-layer="3" style={tone(2, INK.edge)}>
          <g mask={`url(#${id("m3")})`}>
            {PROTOS.map((p) => (
              <path
                key={p.id}
                d={BUS[p.id]}
                strokeWidth={p.width}
                strokeDasharray={p.dash}
                strokeLinecap="butt"
                vectorEffect={NS}
              />
            ))}
            {PROTOS.filter((p) => DROPS[p.id]).map((p) => (
              <path key={p.id} d={DROPS[p.id]} strokeDasharray={p.dash} strokeLinecap="butt" vectorEffect={NS} />
            ))}
          </g>
          {JOINTS.map(([p, x, y]) => (
            <circle key={`${x}-${y}`} data-k="joint" data-proto={p} cx={x} cy={y} r={1.9} fill="currentColor" stroke="none" />
          ))}
          {PANELS.map((p) => (
            <path key={p.floor} data-k="tap" d={tap(p.y)} strokeWidth={1.75} vectorEffect={NS} />
          ))}
          <path data-k="node" d="M449,424 H493 V452 H449 Z" vectorEffect={NS} />
          <path data-k="node" d="M449,430 H493" vectorEffect={NS} />
          <path data-k="node" d="M455,452 V462 M487,452 V462" vectorEffect={NS} />
          <circle data-k="node-dot" cx={487.5} cy={427} r={1.3} fill="currentColor" stroke="none" />
        </g>

        {/* 4 · Maintenance: an inspection line sweeps the section; the checks themselves are laid over in HTML. */}
        <g data-layer="4">
          <path data-k="sweep" d="M136,0 H524" strokeDasharray="2 4" strokeLinecap="butt" vectorEffect={NS} style={{ ...hidden, color: INK.hi }} />
        </g>

        {/* 5 · Modernisation: the old insides go dashed and dim, the new ones draw in, cabinets and routes stay. */}
        <g data-layer="5">
          <g style={{ color: INK.hi }}>
            {ZONE_FLOOR.map((f, i) => (
              <path
                key={i}
                data-k="zflash"
                data-floor={f}
                d={ZONES[i]}
                strokeDasharray="2 3"
                strokeLinecap="butt"
                vectorEffect={NS}
                style={hidden}
              />
            ))}
          </g>
          {PANELS.map((p) => (
            <path
              key={p.floor}
              data-k="ghost"
              data-floor={p.floor}
              d={ghost(p.y)}
              transform={still ? `translate(${GHOST_DX} 0)` : undefined}
              strokeDasharray="2 2"
              strokeLinecap="butt"
              vectorEffect={NS}
              style={still ? { color: highlight === 4 ? INK.edge : INK.mid, transition: "color 300ms ease" } : { color: INK.edge, ...hidden }}
            />
          ))}
          {PANELS.map((p) => (
            <g key={p.floor} style={still ? tone(4, INK.edge) : { color: INK.hi }}>
              {newInside(p.y).map((d, i) => (
                <path key={i} data-k="new" data-floor={p.floor} d={d} vectorEffect={NS} />
              ))}
              <path data-k="tapnew" data-floor={p.floor} d={tap(p.y)} strokeWidth={1.75} vectorEffect={NS} />
            </g>
          ))}
        </g>

        {/* Data on the move: a short mint segment rides each bus into the BMS. */}
        <g data-k="pulses" strokeWidth={2} style={{ ...hidden, color: INK.hi }}>
          {PROTOS.flatMap((p) =>
            [0, 1].map((c) => <path key={`${p.id}-${c}`} data-k="pulse" data-proto={p.id} d={BUS[p.id]} vectorEffect={NS} />),
          )}
        </g>
      </svg>

      {/* Words over the drawing, at viewBox positions, at a fixed readable size. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 select-none font-mono uppercase">
        <div data-layer-label="1" style={still ? { color: highlight === 0 ? INK.hi : INK.edge } : undefined}>
          {AXES.map((a) => (
            <span
              key={a.n}
              data-k="bubble"
              className="absolute flex size-[15px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-current text-[8px] leading-none sm:size-[18px] sm:text-[9px]"
              style={at(a.x, 22)}
            >
              {a.n}
            </span>
          ))}
          {LEVELS.map((l) => (
            <span
              key={l.y}
              data-k="lvl-label"
              className="absolute -translate-y-full pb-0.5 text-[9px] leading-none tracking-[0.12em] sm:text-[10px]"
              style={at(580, l.y - 1)}
            >
              {lang === "ro" ? l.ro : l.en}
            </span>
          ))}
        </div>
        <div data-layer-label="3" style={still ? { color: highlight === 2 ? INK.hi : INK.edge } : undefined}>
          {PROTOS.map((p) => (
            <span
              key={p.id}
              data-k="proto"
              data-proto={p.id}
              className="absolute flex -translate-y-1/2 items-center gap-1.5 whitespace-nowrap text-[9px] leading-none tracking-[0.12em] sm:gap-2 sm:text-[10px]"
              style={{ right: `calc(100% - ${camX(124)})`, top: `calc(${camY(p.y)})` }}
            >
              {p.name}
              <ProtoSwatch id={p.id} className="w-3 sm:w-4" />
            </span>
          ))}
          <span
            data-k="node-label"
            className="absolute -translate-x-1/2 -translate-y-1/2 text-[8px] leading-none tracking-[0.06em] sm:text-[9px] sm:tracking-[0.14em]"
            style={at(471, 441.5)}
          >
            BMS
          </span>
        </div>
        <div data-layer-label="4" style={still ? { color: highlight === 3 ? INK.hi : INK.edge } : undefined}>
          {CHECKS.map((c) => (
            <span
              key={`${c.x}-${c.y}`}
              data-k="check"
              className="absolute size-3 -translate-x-1/2 -translate-y-1/2 sm:size-4"
              style={at(c.x, c.y)}
            >
              <svg
                viewBox="0 0 16 16"
                className="size-full overflow-visible"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.25}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="8" cy="8" r="7.5" fill={INK.plate} stroke="none" />
                <path data-k="check-c" d="M8,1 a7,7 0 1,1 0,14 a7,7 0 1,1 0,-14" />
                <path data-k="check-p" d="M4.8,8.3 L7,10.4 L11.2,5.9" />
              </svg>
            </span>
          ))}
        </div>
        {!still && (
          <div>
            {PANELS.map((p) => (
              <Fragment key={p.floor}>
                <span
                  data-k="tag-new"
                  data-floor={p.floor}
                  className="absolute -translate-x-1/2 text-[9px] leading-none tracking-[0.16em] sm:text-[10px]"
                  style={{ ...at(501, p.y + 45), ...hidden, color: INK.hi }}
                >
                  {lang === "ro" ? "Nou" : "New"}
                </span>
                <span
                  data-k="tag-old"
                  data-floor={p.floor}
                  className="absolute -translate-x-1/2 text-[9px] leading-none tracking-[0.16em] sm:text-[10px]"
                  style={{ ...at(501 + GHOST_DX, p.y + 45), ...hidden, color: INK.edge }}
                >
                  {lang === "ro" ? "Vechi" : "Old"}
                </span>
              </Fragment>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

/** A short sample of a bus line, for legends: the same dash and weight as in the drawing. */
export function ProtoSwatch({ id, className = "" }: { id: ProtoId; className?: string }) {
  const p = PROTOS.find((x) => x.id === id)!
  return (
    <svg aria-hidden viewBox="0 0 16 4" preserveAspectRatio="none" className={`h-1 shrink-0 ${className}`}>
      <line x1="0" y1="2" x2="16" y2="2" stroke="currentColor" strokeWidth={p.width} strokeDasharray={p.dash} vectorEffect={NS} />
    </svg>
  )
}
