# Sector brief: Sport & Wellness (`sport-si-wellness`, /expertiza/sport-si-wellness)

| | |
|---|---|
| Accent | `#1F6B4A` green, white text. On the dark hero it is 2.65:1, so use mint (`accentOnDark`). On white it is 6.44:1, so instruments keep the accent. HORECA shares this accent, so its instruments must look different (no vapour-plus-needle here). |
| Gesture | **Field** (README map): vapour rises where the pointer is over the water. |
| Reference photo | `/referinte/therme-nord-bucuresti.jpg` (800×584, at night: glass domes and pools). The only reference is Therme Nord. |
| Decisions that touch this page | 4 (KPI 3 and 4 labels), 5 (permission), 7 (heading), 8 (location) |

## The building type

A building with pools, where **humidity decides everything**:

- **Evaporation.** Water surfaces evaporate continuously, more with warmer
  water, warmer air, moving water and more bathers.
- **The pool hall** is controlled on **relative humidity**, with the air kept
  slightly warmer than the water.
- **A dedicated AHU** controls the fresh/recirculated ratio and dehumidifies.
  **Exhaust heat recovery** is the biggest lever on thermal consumption.
- **Pressure.** The pool hall is kept in **slight underpressure** against the
  dry zones (changing rooms, corridors, the structure).
- **Other zones.** Saunas, relaxation, changing rooms and showers, fitness and
  food, each with its own regime.
- **Equipment** is rated for warm, humid air laden with water-treatment
  chemicals.
- **Water treatment** is a process plant with its own supplier, linked at data
  level.
- **Glazing.** Supply air washes the glazing so it does not condense.

## Hero: KPI glyphs

| # | Value | Kind | Emphasis | Glyph (24 px band, no text) |
|---|---|---|---|---|
| 1 | 3.500 | count | glyph | a dot field in a plain rectangle (decorative density, not 3.500 dots), revealed by one clip wipe |
| 2 | 20 | count | glyph **only after** the EN value reads "20" (the foundation fixes the "6") | 20 small AHU marks in a row, revealed by one clip wipe, not one by one |
| 3 | 4-18 EUR/mp | range (proxy) | glyph | cost ruler, 4-18 **dashed** |
| 4 | 290 kW | threshold | glyph | two empty column outlines side by side (one per system family), each crossed by the same dashed line; no fill, nothing measured, never stacked |

Only the 3.500 points and the 20 AHUs are project-backed counts. **Never animate
a Therme area or a percentage.** The sources contradict each other (about
34.000 vs 8.000 m², and a 35 % / 38 % history), and 38 % is banned.

`method` texts:

- 1 and 2: RO "Therme Nord, <București | Balotești, Ilfov, per decision 8>: automatizare și supervizare, control de umiditate și temperatură pe zone, punere în funcțiune fără întreruperea activității." EN "Therme Nord, <Bucharest | Balotesti, Ilfov>: automation and supervision, zone humidity and temperature control, commissioned without interrupting operation."
- 3: RO "Banda agregată 2026 (retail, birouri, hoteluri fără control pe cameră), folosită ca proxy; nu există bandă publicată pentru bazine." EN "The 2026 aggregated band (retail, offices, hotels without room control), used as a proxy; no band is published for pools."
- 4: RO "Pragul BACS din Legea 372/2005, pe familie de sisteme; termen 31.12.2024, depășit. Încadrarea se verifică pe clădire." EN "The BACS threshold in Law 372/2005, per system family; deadline 31.12.2024, passed. Applicability is checked per building."

## Capabilities: instruments

| # | Card | Beat 1 (cause) | Beat 2 (response) |
|---|---|---|---|
| 1 | Reglajul pornește de la umiditate | on one vertical scale, the water's tick rises a little (warmer water) | the air's tick follows and settles just above it (air kept slightly warmer than the water) |
| 2 | Tratare a aerului dedicată | the AHU's recovery wheel starts turning | the fresh-air damper opens a little as the recirculation damper closes by the same amount (the ratio is controlled) |
| 3 | Echilibru de presiuni | a door between a dry zone and the pool hall opens | a short stream of dots drifts into the hall, never out of it |
| 4 | Zone cu regim propriu | three objects (a water line, a sauna bench, a row of lockers) draw in | each one's setpoint tick settles at its own height; no words |
| 5 | Echipamente pentru mediu agresiv | droplets fall on a sensor housing with a seal line | they run off, and the sensor's dot stays steady |
| 6 | Energie termică monitorizată | a thermal meter turns | part of an unscaled bar fills (the recovered share, no number) |

## Ce livrăm: the building, explained

**Figure `bazin`** (new):

- **The pool hall.** A tall glazed hall with a pool (the water line) and supply
  slots washing the glazing.
- **Air handling.** A dedicated AHU on the side with its recovery wheel, plus a
  standby AHU.
- **The dry block** (changing rooms, showers).
- **Underpressure is drawn as height, never as arrows.** The pool hall's roof
  plate sits one step lower than the dry block's.
- **Water treatment.** The plant room sits under the pool deck, drawn as a
  separate process box linked by a data line only.

**Gesture.** A field over the water. The pointer over the water raises
evaporation (more bathers): vapour rises, and the AHU's fan turns faster.
Recovery stays on. Keep it calm. The field acts on the water only; every other
part is picked by its rest hull.

| Checklist # | Part id | Part | Read-out RO | Read-out EN |
|---|---|---|---|---|
| 1 RH and temperature per pool hall | `apa` | the water and the hall air above it | sală de bazin · umiditate relativă | pool hall · relative humidity |
| 2 water temperature, water treatment | `tratare-apa` | the process box under the deck (data link only) | tratarea apei · proces, doar date | water treatment · process, data only |
| 3 pressure between zones | `acoperis-sala` | the hall's roof plate, one step below the dry block's | sală de bazin · subpresiune | pool hall · underpressure |
| 4 heat recovery | `recuperator` | the AHU's recovery wheel | recuperator de căldură | heat recovery |
| 5 changing rooms, showers, fitness | `vestiare` | the dry block | vestiare și dușuri | changing rooms and showers |
| 6 phasing with redundancy | `cta-rezerva` | the standby AHU | CTA de rezervă | standby AHU |

- **Lap:** `apa` (vapour rises, the fan turns faster) → `vestiare` (its step
  above the hall lights) → `recuperator` → rest.
- **Stage label:** RO "Sală de bazin în secțiune: apa, centrala de tratare a aerului cu recuperator, zona uscată mai sus și tratarea apei sub pardoseală." / EN "Pool hall in section: the water, the air handling unit with heat recovery, the dry zone a step higher, and water treatment under the deck."
- **Tag:** RO "Fig. · sală de bazin" / EN "Fig. · pool hall".
- **Reference card** (if decision 5 allows):
  - Caption RO "Therme Nord, <locația per decizia 8>: 3.500 de puncte de date, 20 de centrale de tratare a aerului, control de umiditate și temperatură pe zone." / EN "Therme Nord, <location per decision 8>: 3,500 data points, 20 air handling units, zone humidity and temperature control." No area.
  - Alt: write it after looking at the photo (night view, glass domes, pools).

## Facts to fix (owner approval)

- **KPI 2 EN (a data bug; the foundation fixes it).** In `lib/sector-data.ts`, EN
  `metrics[1].value` is "6"; RO and the testimonial say "20". Verify it reads
  "20". Acceptance: the EN and RO cells show the same count.
- **KPI 4 (decision 4).** "depășit doar prin tratarea aerului și încălzirea apei"
  conflicts with the per-system-family rule.
  - RO "Pragul BACS din Legea 372/2005, pe familie de sisteme; termen 31.12.2024, depășit. Încadrarea se verifică pe clădire."
  - EN "BACS threshold in Law 372/2005, per system family; deadline 31.12.2024, passed. Applicability is checked per building."
- **KPI 3 (decision 4).** "zonele de bazin sunt în partea de sus" is unsupported
  (the band excludes pools). Use the `method` wording as the label.
- **Hero subhead.** "costă … mai mult decât întregul sistem" is unsupported. Keep
  it out of motion and flag it for copy review.
- **Subtitle.** It promises sports halls, but the copy covers pools, spa and
  fitness. Flag it for copy review.

## Capabilities heading (if decision 7 = per sector)

RO "Umiditate, presiuni, recuperare." / EN "Humidity, pressures, recovery."
