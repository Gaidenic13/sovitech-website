/*
 * Fig. 03, the schedule: one office weekday as a BMS time program sees it.
 * The four standard room modes, the times the program switches between them,
 * and the moments worth naming. Copy describes how a BMS generally behaves; it
 * makes no claim about any particular building.
 */

/** 0 building protection · 1 economy · 2 standby · 3 comfort, lowest to highest. */
export type Mode = 0 | 1 | 2 | 3

export const MODES: { ro: string; en: string; sro: string; sen: string }[] = [
  { ro: "Protecție clădire", en: "Building protection", sro: "Protecție", sen: "Protection" },
  { ro: "Economic", en: "Economy", sro: "Economic", sen: "Economy" },
  { ro: "Standby", en: "Standby", sro: "Standby", sen: "Standby" },
  { ro: "Confort", en: "Comfort", sro: "Confort", sen: "Comfort" },
]

/**
 * The weekday time program: from each hour on, the mode it holds. Economy is the night setback;
 * building protection (frost and overheating limits) is the mode for long absences, so a working
 * day never drops to it. The ruler still draws its level, as a schedule screen would.
 */
export const SCHEDULE: [number, Mode][] = [
  [0, 1],
  [6, 2],
  [7, 3],
  [18, 2],
  [20, 1],
]

/** Shading, by facade: when the blinds start down and start up again (hours). */
export const SHADE = {
  se: { down: 8, up: 13 },
  sw: { down: 13, up: 19.75 },
} as const

export type DayEvent = {
  t: number
  mode: Mode
  ro: string
  en: string
  dro: string
  den: string
  /** How long after `t` the effect has visibly happened: where a jump to this event lands. */
  land: number
}

export const EVENTS: DayEvent[] = [
  {
    t: 0,
    mode: 1,
    land: 0,
    ro: "Noapte",
    en: "Night",
    dro: "Reducere de noapte: clădirea e goală, spațiile stau la valori de consemn reduse. Protecția e rezervată absențelor lungi.",
    den: "Night setback: the building is empty and spaces sit at reduced setpoints. Protection mode is kept for long absences.",
  },
  {
    t: 6,
    mode: 2,
    land: 0.25,
    ro: "Pornire optimizată",
    en: "Optimised start",
    dro: "BMS-ul pornește instalațiile cât mai târziu posibil: preîncălzire sau prerăcire, ca spațiile să fie gata la sosire.",
    den: "The BMS starts the plant as late as it can: pre-heating or pre-cooling, so spaces are ready when people arrive.",
  },
  {
    t: 7,
    mode: 3,
    land: 0.25,
    ro: "Sosiri",
    en: "Arrivals",
    dro: "Încep sosirile. Ventilația urmărește calitatea aerului și prezența, zonă cu zonă.",
    den: "People start to arrive. Ventilation follows air quality and occupancy, zone by zone.",
  },
  {
    t: SHADE.se.down,
    mode: 3,
    land: 0.5,
    ro: "Umbrire sud-est",
    en: "South-east shading",
    dro: "Stația meteo semnalează soare pe fațada de sud-est. Jaluzelele de pe partea însorită coboară automat.",
    den: "The weather station reports sun on the south-east facade. Blinds on the sunny side lower automatically.",
  },
  {
    t: SHADE.sw.down,
    mode: 3,
    land: 0.5,
    ro: "Umbrire sud-vest",
    en: "South-west shading",
    dro: "Soarele trece pe fațada de sud-vest. Jaluzelele îl urmează: urcă pe sud-est, coboară pe sud-vest.",
    den: "The sun moves on to the south-west facade. The blinds follow it: up on the south-east, down on the south-west.",
  },
  {
    t: 17,
    mode: 3,
    land: 0.25,
    ro: "Plecări",
    en: "Departures",
    dro: "Încep plecările. Zonele care se golesc își sting lumina, după senzorii de prezență.",
    den: "People start to leave. Zones that empty switch their lights off, by presence sensors.",
  },
  {
    t: 18,
    mode: 2,
    land: 0.25,
    ro: "Reducere treptată",
    en: "Gradual setback",
    dro: "După program, valorile de consemn se relaxează treptat, pe măsură ce zonele se golesc.",
    den: "After hours, setpoints are relaxed gradually as the zones empty.",
  },
  {
    t: 20,
    mode: 1,
    land: 0.25,
    ro: "După apus",
    en: "After sunset",
    dro: "Jaluzelele urcă, iar programul orar stinge iluminatul. Rămân aprinse doar zonele unde senzorii văd prezență.",
    den: "The blinds go up and the time program switches the lighting off. Only zones where sensors see presence stay lit.",
  },
  {
    t: 22.5,
    mode: 1,
    land: 0.25,
    ro: "Ultima zonă",
    en: "Last zone",
    dro: "Ultima zonă s-a golit și s-a stins. Clădirea rămâne în regim economic până dimineață.",
    den: "The last zone has emptied and gone dark. The building stays in economy mode until morning.",
  },
]

/** The three moments the still (reduced-motion) layout shows, each captioned as itself. */
export const MOMENTS: { h: number; ro: string; en: string; dro: string; den: string }[] = [
  {
    h: 3,
    ro: "Noapte",
    en: "Night",
    dro: "Reducere de noapte. Clădirea e goală, instalațiile sunt oprite, spațiile stau la valori de consemn reduse.",
    den: "Night setback. The building is empty, the plant is off and spaces sit at reduced setpoints.",
  },
  {
    h: 12,
    ro: "Amiază",
    en: "Midday",
    dro: "Confort în zonele ocupate. Ventilația urmărește calitatea aerului, iar jaluzelele de pe sud-est sunt coborâte.",
    den: "Comfort in occupied zones. Ventilation follows air quality, and the blinds on the south-east side are down.",
  },
  {
    h: 20.5,
    ro: "Seara",
    en: "Evening",
    dro: "Programul orar a stins iluminatul. Rămân aprinse doar zonele unde senzorii mai văd prezență.",
    den: "The time program has switched the lighting off. Only zones where sensors still see presence stay lit.",
  },
]

export function modeAt(h: number): Mode {
  let m: Mode = SCHEDULE[0][1]
  for (const [t, mode] of SCHEDULE) if (h + 1e-6 >= t) m = mode
  return m
}

export function eventIndexAt(h: number): number {
  let i = 0
  EVENTS.forEach((e, k) => {
    if (h + 1e-6 >= e.t) i = k
  })
  return i
}

/** 7.5 → "07:30". */
export function clock(h: number): string {
  const q = Math.round(h * 4)
  const hh = Math.floor(q / 4)
  const mm = (q % 4) * 15
  return `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`
}

/** What the plant is doing at hour h, for the figure's read-out: no numbers, only states. */
export function plantAt(h: number, lang: string, short = false): { text: string; on: boolean } {
  const ro = lang === "ro"
  const on = modeAt(h) >= 2
  const parts = [on ? (ro ? "CTA pornită" : "AHU running") : ro ? "CTA oprită" : "AHU off"]
  if (!short) {
    if (h >= SHADE.se.down && h < SHADE.se.up) parts.push(ro ? "jaluzele S-E jos" : "SE blinds down")
    else if (h >= SHADE.sw.down && h < SHADE.sw.up) parts.push(ro ? "jaluzele S-V jos" : "SW blinds down")
    else if (h >= 20 && h < 22.5) parts.push(ro ? "iluminat pe prezență" : "lights by presence")
  }
  return { text: parts.join(" · "), on }
}

/*
 * The two surfaces. Each is fixed: night is #07201C with mint and white ink, day is #F5F4F0 with
 * #0D2E2B ink. Dawn and dusk never mix them; the day surface is revealed over the night one.
 * The stroke tones (edge, mid, lo) are the surface's ink at fixed opacities, flattened to solids
 * so overlapping hairlines do not darken where they cross.
 */
export const NIGHT = {
  "--dc-bg": "#07201C",
  "--dc-night": "1",
  "--dc-shade": "rgba(13,46,43,0)",
  "--dc-grid": "rgba(200,230,201,0.045)",
  "--dc-ink": "rgba(255,255,255,1)",
  "--dc-ink-2": "rgba(255,255,255,0.65)",
  "--dc-ink-3": "rgba(255,255,255,0.5)",
  "--dc-dim": "rgba(255,255,255,0.35)",
  "--dc-rule": "rgba(255,255,255,0.1)",
  "--dc-rule-2": "rgba(255,255,255,0.2)",
  "--dc-accent": "#C8E6C9",
  "--dc-hi": "#C8E6C9",
  "--dc-edge": "#6F978B",
  "--dc-mid": "#3A5F55",
  "--dc-lo": "#24473F",
  "--dc-lit": "#C8E6C9",
  "--dc-lit-a": "0.9",
} as const

export const DAY: Record<keyof typeof NIGHT, string> = {
  "--dc-bg": "#F5F4F0",
  "--dc-night": "0",
  "--dc-shade": "rgba(13,46,43,0.07)",
  "--dc-grid": "rgba(13,46,43,0.05)",
  "--dc-ink": "rgba(13,46,43,1)",
  "--dc-ink-2": "rgba(13,46,43,0.72)",
  "--dc-ink-3": "rgba(13,46,43,0.66)",
  "--dc-dim": "rgba(13,46,43,0.5)",
  "--dc-rule": "rgba(13,46,43,0.1)",
  "--dc-rule-2": "rgba(13,46,43,0.18)",
  "--dc-accent": "#1F6B4A",
  "--dc-hi": "#0D2E2B",
  "--dc-edge": "#7F918B",
  "--dc-mid": "#B8C4BF",
  "--dc-lo": "#D9E0DC",
  "--dc-lit": "#1F6B4A",
  "--dc-lit-a": "0.2",
}

const decl = (vars: Record<string, string>) =>
  Object.entries(vars)
    .map(([k, v]) => `${k}:${v}`)
    .join(";")

/** Night is the default for any surface; `data-dc-surface="day"` switches one to day. */
export const SURFACE_CSS = `[data-dc-surface]{${decl(NIGHT)}}[data-dc-surface="day"]{${decl(DAY)}}`
