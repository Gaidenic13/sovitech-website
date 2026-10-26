# Sector brief: Entertainment (`entertainment`), PLANNED

**Run this only after the page is published.** Today it is `planned` in
production (a 301 to /expertiza). Before running, check every fact below again
against `sector-data.ts`, which may change before publication.

| | |
|---|---|
| Accent | `#B14A36` brick, white text. On the dark hero it is 3.17:1, so use mint (`accentOnDark`). On white it is 5.38:1, so instruments keep the accent. |
| Gesture | **Scrub** (README map): x over the hall is the event timeline (doors open, full house, interval, empty). |
| Reference photo | None. Sovitech has no reference of its own in this sector, and the image is `/placeholder.svg`. Show the type label, and do not show the "De încredere pentru" strip. |
| Decisions that touch this page | 4 (labels, card 5), 7 (heading), 11 (legal date) |

## The building type

A venue that goes from zero to several hundred people in about fifteen minutes,
and back to zero after two hours:

- **The auditorium.** Raked seating, often with displacement supply under the
  seats.
- **Measuring.** CO₂ is measured in the **audience breathing zone**, not the
  return duct. Temperature gradients are large, so there are several measuring
  points.
- **Airflow.** Ramps are slow, because an audible change is a defect. Start-up
  is anticipated from the hall's real temperature and inertia.
- **Around the hall.** Foyers peak before and after the hall; there are bar and
  food areas, and dressing rooms and technical zones.
- **Stage lighting** is a large variable heat load that the BMS does not command.
- **The fire panel** keeps smoke control and evacuation.

## Hero: KPI glyphs

| # | Value | Kind | Emphasis | Glyph (24 px band, no text) |
|---|---|---|---|---|
| 1 | 4-18 EUR/mp | range (proxy) | glyph | cost ruler, 4-18 **dashed** |
| 2 | CO2 | code | glyph | no SVG: a 1 px CSS underline under the value text |
| 3 | 290 kW | threshold | glyph | two empty column outlines (one per system family), each crossed by the same dashed line; never stacked, nothing measured |
| 4 | 2026 | code (time-sensitive) | glyph only after the legal re-check | no SVG: a 1 px CSS underline under the value text |

`method` texts:

1. RO "Reper de cost: banda agregată 2026 pentru retail, birouri și hoteluri fără control pe cameră, folosită ca proxy; nu există bandă publicată pentru săli de spectacol." EN "Cost reference: the 2026 aggregated band for retail, offices and hotels without room control, used as a proxy; no band is published for performance halls."
2. RO "Ventilație comandată pe CO₂ măsurat în zona de respirație a publicului, nu în tubulatura de retur." EN "Ventilation driven by CO₂ measured in the audience breathing zone, not in the return duct."
3. RO "Pragul BACS din Legea 372/2005, pe familie de sisteme; termen 31.12.2024, depășit. Încadrarea se verifică pe clădire." EN "The BACS threshold in Law 372/2005, per system family; deadline 31.12.2024, passed. Applicability is checked per building."
4. RO "Art. 13 alin. (10) lit. d) din Directiva (UE) 2024/1275: monitorizarea calității mediului interior de la 29 mai 2026; prevederea nu este încă transpusă în legea română (verificat la <data verificării reale, altfel 16.08.2026>)." EN "Art. 13(10)(d) of Directive (EU) 2024/1275: indoor environmental quality monitoring from 29 May 2026; the provision is not yet transposed into Romanian law (checked <real check date, otherwise 16.08.2026>)."

## Capabilities: instruments

| # | Card | Beat 1 (cause) | Beat 2 (response) |
|---|---|---|---|
| 1 | Ventilație pe ocuparea reală | the seat-level CO₂ mark rises as people dots fill the rows | the return-duct mark follows, late and lower (the delayed, mixed reading) |
| 2 | Pornire anticipată | a start tick slides along a timeline to an earlier position (computed from the hall's state) | the temperature line from that tick reaches comfort at the doors tick |
| 3 | Rampe lente de debit | a fan ring's speed target jumps | the actual speed climbs along a straight, limited slope, never a step |
| 4 | Foaiere și zone de acces | the foyer's occupancy dots peak before the hall's block | they peak again after it, while the hall's own block sits between |
| 5 | Consum pe eveniment | an event bar draws on a timeline | the between-events bar draws beside it, visible on its own |
| 6 | Interfața cu centrala de incendiu | the fire panel sends a signal along a dashed line to the BMS | the BMS switches its plant to the scenario; nothing goes back to the panel |

## Ce livrăm: the building, explained

**Figure `sala`** (new). An auditorium in section:

- raked seats with under-seat supply and a sensor column in the breathing zone;
- a foyer;
- a stage with a lighting bridge;
- the AHU with attenuators;
- a bar block and a backstage block.

**No text inside the figure.** "Not commanded by the BMS" goes in the stage's
read-out (rule 10).

**Gesture.** Scrub over the seating: x is the event's time (doors open → full
house → interval → empty). Occupancy dots, CO₂ and the AHU's fan follow with a
rate-limited ramp. The scrub acts on the seating only; every other part is
picked by its rest hull.

| Checklist # | Part id | Part | Read-out RO | Read-out EN |
|---|---|---|---|---|
| 1 hall temperature and airflow on occupancy | `sala` (with `states`: `usi`, `plin`, `pauza`, `gol`) | the seating | sală · uși deschise / sală plină / pauză / sală goală | hall · doors open / full house / interval / empty |
| 2 temperature at several points | `senzori` | the sensor column in the breathing zone | sală · mai multe puncte de măsură | hall · several measuring points |
| 3 bar and food ventilation, storage monitored | `bar` | the bar block | bar și alimentație · ventilație | bar and food · ventilation |
| 4 dressing rooms, technical zones, offices | `culise` | the backstage block | cabine și zone tehnice · regim propriu | dressing rooms and technical zones · own regime |
| 5 stage lighting stays separate | `scena` | the stage and its lighting bridge | scenă · iluminat necomandat de BMS | stage · lighting not commanded by the BMS |
| 6 maximum airflow only when occupancy requires it | `cta` | the AHU with attenuators | CTA · debit maxim doar la sală plină | AHU · maximum airflow only for a full house |

- **Lap:** `sala-usi` (a lap-only point at the doors-open end of the seating) →
  `sala-plin` (a lap-only point at the full-house position) → `scena` → rest.
- **Stage label:** RO "Sală de spectacol în secțiune: gradene cu introducere de aer sub scaune, foaier, scenă și centrala de tratare a aerului." / EN "Performance hall in section: raked seating with under-seat supply, a foyer, the stage and the air handling unit."
- **Tag:** RO "Fig. · sală de spectacol" / EN "Fig. · performance hall".
- **Type label (no reference):** RO "Tip de clădire, nu proiect Sovitech" / EN "Building type, not a Sovitech project".

## Facts to fix (owner approval)

- **KPI 1.** Use the `method` wording above as the label.
- **KPI 4 (decision 11).** "încă netranspus" refers to the provision, not the
  whole directive, which Romania transposed in part (Art. 17(15), OG 16/2025).
  Use "prevedere încă netranspusă" / "provision not yet transposed", with the
  check date.
- **Card 5.** "dominant" is unsupported.
  - RO "Energia se măsoară pe eveniment, iar costul de operare dintre evenimente devine vizibil."
  - EN "Energy is measured per event, and the running cost between events becomes visible."

## Capabilities heading (if decision 7 = per sector)

RO "Ocupare, rampe, evenimente." / EN "Occupancy, ramps, events."
