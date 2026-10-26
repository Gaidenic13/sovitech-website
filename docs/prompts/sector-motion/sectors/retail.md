# Sector brief: Retail (`retail`, /expertiza/retail)

| | |
|---|---|
| Accent | `#8B7B5C` khaki, white text. On the dark hero it is **4.13:1**, under 4.5:1 for the 14 px breadcrumb, so use mint (`accentOnDark`). On white it is 4.13:1, so instruments keep the accent. Never use it for information on cream. |
| Gesture | **One of many along a row** (README map): the unit under the pointer slides forward (the `tablou` pattern). |
| Reference photo | Today: `/referinte/pitesti-retail-park.webp` (680×510), where the eMAG and Auchan signs dominate. **There is no usable swap:** `roman-value-centre.jpg` is a 3D render with a large Carrefour sign, and it names a different project from KPI 3. Decision 5: no card (recommended) or Pitești cropped away from the signs. |
| Decisions that touch this page | 4 (KPI 1, 3, 4 labels; card 2), 5 (photo), 7 (heading), 11 (legal date) |

## The building type

A retail park or shopping centre:

- **Layout.** A row of big-box units under one roofline behind a car park, or a
  mall gallery spine with skylights, anchors at the ends and a food court.
- **Each unit has its own meters** (electricity, heat, water, fitted during
  construction) and runs its own terminal plant.
- **Common areas.** Central AHUs and plant water temperatures serve the gallery
  and common areas. Lighting runs on schedule and on daylight (skylights).
- **Car park.** Ventilation on **CO**, with an interface to smoke control; the
  fire panel keeps the safety function.
- **Food zone.** Cold rooms and refrigerated displays.
- **Portfolio.** A standard point list and alarm matrix let a whole portfolio
  run from one dispatch centre, which is **off-site**.

## Hero: KPI glyphs

| # | Value | Kind | Emphasis | Glyph (24 px band, no text) |
|---|---|---|---|---|
| 1 | 4-9 EUR/mp | range (cost) | glyph | cost ruler, 4-9 solid |
| 2 | 2 | count | glyph (/referinte lists 2) | two ticks |
| 3 | ~24.800 m² | quantity | glyph | a generic square outline that closes, not the park's footprint |
| 4 | 70 kW | threshold | glyph | one dashed horizontal line drawn at reduced strength (not in force); nothing crosses it, and there is no marker |

`method` texts:

1. RO "Ordin de mărime 2026, fără TVA, pe mp de arie utilă, pentru retail și centre comerciale; 15-35 de puncte la 1.000 mp." EN "2026 order of magnitude, excl. VAT, per sqm of usable area, for retail and shopping centres; 15-35 points per 1,000 sqm."
2. RO "Referințe în retail listate pe pagina Referințe: Pitești Retail Park și Roman Value Centre." EN "Retail references listed on the References page: Pitesti Retail Park and Roman Value Centre."
3. RO "Suprafață închiriabilă, circa 24.800 m², la Pitești Retail Park. Sursa: pagina Referințe." EN "Leasable area, about 24,800 m², at Pitesti Retail Park. Source: the References page."
4. RO "Pragul de 70 kW din Directiva (UE) 2024/1275, art. 13 alin. (9) lit. b), termen 31.12.2029; prevederea nu este încă transpusă în legea română (verificat la <data verificării reale, altfel 16.08.2026>)." EN "The 70 kW threshold of Directive (EU) 2024/1275, Art. 13(9)(b), deadline 31.12.2029; the provision is not yet transposed into Romanian law (checked <real check date, otherwise 16.08.2026>)." Romania has transposed the directive only in part (Art. 17(15), through OG 16/2025); do not write that "the directive" is untransposed.

## Capabilities: instruments

| # | Card | Beat 1 (cause) | Beat 2 (response) |
|---|---|---|---|
| 1 | Contorizare pe unitate locativă | three unit meter dials turn by different amounts | one shared bill bar splits into three unequal slices, each sized by its dial's travel (service-charge recovery) |
| 2 | Un dispecerat pe portofoliu | several identical small store screens; an alarm mark appears on one | the same mark appears in the same place on the dispatch screen: the same alarm means the same thing |
| 3 | Galerie și spații comune | gallery dampers open and close in sequence (variable demand) | the AHU's duct-pressure needle holds its mark |
| 4 | Iluminat pe program și pe lumină naturală | a skylight brightens | the luminaires under it dim (lighting load only) |
| 5 | Parcare și desfumare | CO dots rise in a car-park section | the extract fan rings spin up and the dots clear; a dashed line to the fire panel stays still (the panel keeps the safety function) |
| 6 | Zona alimentară | a refrigerated display case's door opens and its air-curtain line bends | the door closes and the line straightens |

## Ce livrăm: the building, explained

**Figure `parc-retail`** (from the `tablou` pattern: one of many along a row). A
retail park as a row of units under one roofline:

- a canopy or gallery with skylights;
- a car park in front, with CO extract;
- a meter cabinet on each unit;
- a data rail along the roof edge: a solid conduit, at least 10 units thick,
  carrying the shared 15-minute history;
- the **dispatch drawn as a separate small desk off-site**, at the far end of the
  data rail, with a gap in the ground plane between it and the park.

**Gesture.** The unit under the pointer slides forward a little, and its meter
cabinet lights. Its neighbours part, staggered.

| Checklist # | Part id | Part | Read-out RO | Read-out EN |
|---|---|---|---|---|
| 1 meters per unit | `unitate` (any unit) | a unit with its meter cabinet | unitate · contoare | unit · meters |
| 2 gallery temperature and fresh air | `galerie` | the gallery or canopy AHU | galerie · aer proaspăt | gallery · fresh air |
| 3 lighting on schedule and daylight | `luminator` | a skylight | luminator · iluminat | skylight · lighting |
| 4 car park CO and smoke-control interface | `parcare` | the car park | parcare · CO | car park · CO |
| 5 standard point list and alarm matrix | `dispecerat` | the off-site dispatch desk | dispecerat · aceleași ecrane | dispatch · the same screens |
| 6 15-min history | `istoric` | the data rail | istoric · 15 minute | history · 15 minutes |

- **Lap:** `unitate` (meters) → `parcare` → `luminator` → rest.
- **Stage label:** RO "Parc de retail: un rând de unități sub același acoperiș, parcare în față, dispeceratul în afara amplasamentului." / EN "Retail park: a row of units under one roof, a car park in front, dispatch off-site."
- **Tag:** RO "Fig. · parc de retail" / EN "Fig. · retail park".
- **Reference:** per decision 5.
  - **No card** (recommended): typeLabel RO "Tip de clădire: parc de retail" / EN "Building type: retail park".
  - **Pitești, cropped:** caption RO "Pitești Retail Park: sistem BMS pentru un parc de retail cu circa 24.800 m² suprafață închiriabilă." / EN "Pitesti Retail Park: a BMS for a retail park with about 24,800 m² of leasable area." Crop away from the eMAG and Auchan signs, and write the alt after looking at the crop.
  - Never use the Roman render.

## Facts to fix (owner approval, decision 4)

- **KPI 1 label.** It says the cost is measured on common areas and central plant,
  but the cost article says per sqm of usable area. Use the `method` wording as
  the label.
- **KPI 3 label.** Put "~" / "circa" back, and drop "deservită de sistemul BMS"
  (tenants run their own terminal plant).
  - RO "Suprafață închiriabilă la Pitești Retail Park, proiect cu BMS livrat de Sovitech (HVAC, iluminat, energie)"
  - EN "Leasable area at Pitesti Retail Park, a project with BMS delivered by Sovitech (HVAC, lighting, energy)"
- **KPI 4 label.** "aduce sub obligație magazinele individuale" is unsupported, and
  the threshold cannot be invoked as a domestic obligation.
  - RO "Pragul din Directiva (UE) 2024/1275, termen 31.12.2029; prevederea nu este încă transpusă în legea română"
  - EN "The threshold in Directive (EU) 2024/1275, deadline 31.12.2029; the provision is not yet transposed into Romanian law"
- **Card 2.** "ca 40 de locații" is an unsupported number.
  - RO "…decise la primul magazin, ca fiecare locație nouă să afișeze aceleași ecrane, iar aceeași alarmă să însemne același lucru peste tot."
  - EN "…decided at the first store, so that every new location shows the same screens and the same alarm means the same thing everywhere."

## Capabilities heading (if decision 7 = per sector)

RO "Unități, galerie, portofoliu." / EN "Units, gallery, portfolio."
