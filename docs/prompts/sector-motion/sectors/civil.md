# Sector brief: Clădiri de birouri (`civil`, /expertiza/cladiri-de-birouri)

| | |
|---|---|
| Accent | `#C5C0F5` lavender, dark text. On the dark hero it is 9.9:1, so keep it. On white it is 1.72:1, so instruments use `#0D2E2B` for the moving element. |
| Gesture | **Scrub and pick** (README map): the pointer's height picks a level, and 6 levels answer the 6 checklist items. |
| Reference photo | `/referinte/bcr-calea-victoriei.jpg`, 600×399: the BCR tower and glass podium. Show it at its natural size or smaller. |
| Decisions that touch this page | 2 (KPI 4 count), 4 (KPI 3, card 3, card 6), 5 (photo permission), 7 (heading), 10 (access control) |

This sector runs first and proves the system. Keep it exemplary rather than
clever.

## The building type

A multi-storey office building:

- **Core and floors.** A central core (lifts, risers, WCs) is surrounded by
  open-plan tenant floor plates.
- **Two regimes on one floor.** A **perimeter strip** (about 4-6 m from the
  façade) and an **interior zone** run different regimes on the same day.
- **Terminal units.** Fan coils, chilled beams or VAV.
- **Plant.** **AHUs and chillers on the roof.** A basement plant room (heat
  substation or boilers, pumps, LV board) and a car park.
- **Metering.** **Meters per leased zone** on each floor's distribution board.
- **Comfort and façade.** CO₂ in dense open plan and meeting rooms, blinds on
  exposed façades, lighting in common areas.
- **Zoning follows the leases**, so the system keeps spare points.

## Hero: KPI glyphs

| # | Value | Kind | Emphasis | Glyph (24 px band, no text) |
|---|---|---|---|---|
| 1 | 9-18 EUR/mp | range (cost) | glyph | cost ruler: 9-18 solid, class B 5-10 as a ghost band |
| 2 | 50-90 | range (density) | glyph | a dot grid of 50 solid and 40 hollow dots (for example 18 × 5), revealed by one clip wipe; the count never changes over time |
| 3 | 5-15% | range (share) | glyph if decision 4 approves the new label, else plain | a bar standing for 100 % of the building's own consumption, with a 1 px bracket over 5-15 % of its length |
| 4 | 5 (if decision 2 approves) | count | glyph if decision 2 is resolved, else plain | five ticks, one per office on /referinte |

`method` texts:

1. RO "Ordin de mărime 2026, fără TVA, pe mp de arie utilă: sistem nou complet la birouri clasa A (clasa B, automatizare de bază: 5-10). Sursa: articolul Cât costă un sistem BMS în România."
   EN "2026 order of magnitude, excl. VAT, per sqm of usable area: a new, complete system in class A offices (class B, basic plant automation: 5-10). Source: the article on what a BMS costs in Romania."
2. RO "Densitate uzuală la clasa A, din tabelul articolului Cât costă un sistem BMS în România; clasa B: 25-45."
   EN "Usual class A density, from the table in the BMS cost article; class B: 25-45."
3. RO "Bandă măsurată în literatura independentă (Crowe et al. 2020, LBNL), citată în articolul Cât costă un sistem BMS în România; nu este un rezultat Sovitech. Recomisionarea are o mediană de 6% din consumul total, pe 1.185 de proiecte. Economia unei clădiri anume se afirmă doar cu 12 luni de referință, 12 luni de comparație și normalizare la grade-zile și ocupare."
   EN "A band measured in independent literature (Crowe et al. 2020, LBNL), cited in the BMS cost article; not a Sovitech result. Recommissioning has a median of 6% of total consumption across 1,185 projects. A saving for a specific building is stated only with 12 months of baseline, 12 months of comparison and normalisation for degree-days and occupancy."
4. RO "Referințe în birouri listate pe pagina Referințe."
   EN "Office references listed on the References page."

## Capabilities: instruments

| # | Card | Beat 1 (cause) | Beat 2 (response) |
|---|---|---|---|
| 1 | Reglaj pe zone | a sun dot moves to one side of a floor plate | that side's perimeter fan-coil marks switch on; the interior zone stays unchanged |
| 2 | Contorizare pe chiriași | a sub-meter dial's pointer steps one 15-minute increment | one dot is written onto that tenant's history line |
| 3 | Fără încălzire și răcire simultană | a fan coil with two valve marks: the room temperature dot rises into the dead band and the heating valve closes | the dot leaves the band on the warm side and only then does the cooling valve open; the two are never open together |
| 4 | Aer proaspăt pe CO₂ | CO₂ dots gather in a meeting-room outline | the damper blade opens and the dots thin out |
| 5 | Rezervă de puncte și rezonare | a partition line slides to a new position | two spare hollow dots fill in on the new zone |
| 6 | Date pentru conformare | a loupe slides along an unbroken row of 15-minute ticks | it reaches the end and the row's end cap closes: no gap in the record |

## Ce livrăm: the building, explained

**Figure `birouri`.** Evolve `lib/hairline/etaje.js`: reverse-port it, then run it
through `look.mjs`. It is a stacked office building with a central core, a roof,
three office floors, a ground floor and a basement. **Delete the shared OFFICE
plan** (the luminaires and the 13 `offs` dots) to stay within 200 lines. Each
opened level shows **only its own feature**. Derive `POINTS` from `layout()`.

**Gesture.** The pointer's height picks a level, and the stack opens there
(scrub and pick). Every legend row therefore has its own level.

| Checklist # | Part id | What opens | Read-out RO | Read-out EN |
|---|---|---|---|---|
| 1 zone temperature | `etaj2` | a perimeter band and an interior zone as two rings, fan coils under the glass | etaj 2 · zone | floor 2 · zones |
| 2 AHUs | `acoperis` | AHU fan rings and the chiller | acoperiș · CTA | roof · AHU |
| 3 metering | `etaj1` | one tenant meter per leased zone at the riser | etaj 1 · contoare | floor 1 · meters |
| 4 CO₂ | `etaj3` | a meeting room with its sensor dot | etaj 3 · CO₂ | floor 3 · CO₂ |
| 5 lighting and blinds | `parter` | lobby luminaires and the blinds strip over the canopy | parter · iluminat | ground · lighting |
| 6 15-min history | `subsol` | the BMS cabinet | subsol · BMS | basement · BMS |

- **Lap:** `acoperis` → `etaj2` → `parter` → rest.
- **Stage label:** RO "Clădire de birouri în secțiune: acoperiș, trei etaje, parter și subsol." / EN "Office building in section: roof, three floors, ground floor and basement."
- **Tag:** RO "Fig. · clădire de birouri" / EN "Fig. · office building".
- **Hint:** pointer RO "Treceți cu mouse-ul pe înălțimea clădirii" / EN "Move along the building's height"; touch RO "Atingeți un nivel" / EN "Tap a level".
- **Reference card** (if decision 5 allows):
  - Caption RO "BCR Calea Victoriei, București: clădire de birouri de 26.300 m² (turn și podium), automatizare BMS și iluminat." / EN "BCR Calea Victoriei, Bucharest: a 26,300 m² office building (tower and podium), BMS automation and lighting."
  - Alt RO "Clădirea BCR Calea Victoriei din București: turn cilindric și podium cu fațadă de sticlă." / EN "The BCR Calea Victoriei building in Bucharest: a cylindrical tower and a podium with a glass façade."
  - The caption omits access control (decision 10).

## Facts to fix (owner approval, decision 4)

- **KPI 3 label.** It says "Economie măsurată … după optimizare, cu amortizare
  de 1-3 ani", which reads as Sovitech's own result and gives one payback.
  - RO "Din consumul total al clădirii, după optimizare: bandă măsurată în literatura independentă, nu rezultat Sovitech. Amortizare 1-3 ani la optimizare, 3-6 ani la modernizare de capital."
  - EN "Of whole-building consumption, after optimisation: a band measured in independent literature, not a Sovitech result. Payback 1-3 years for optimisation, 3-6 years for a capital modernisation."
  - Method: as above. Do not cite Kramer et al. 2019; the site uses that source
    only for FDD analytics.
- **KPI 4 (decision 2).**
  - RO "Referințe în birouri: BCR Calea Victoriei, Floreasca Tower, Floreasca Business Park, Monaco Towers, Ștefan cel Mare Building"
  - EN "Office references: BCR Calea Victoriei, Floreasca Tower, Floreasca Business Park, Monaco Towers, Stefan cel Mare Building"
  - Value: "5". Do not add BMTI Strabag anywhere.
- **Card 3.** "cea mai scumpă formă de risipă" is unsupported.
  - RO "…evită încălzirea și răcirea simultană pe aceeași instalație, o risipă plătită de două ori: o dată la încălzire, o dată la răcire."
  - EN "…prevents heating and cooling running at the same time on the same plant, a waste paid for twice: once to heat, once to cool."
- **Card 6.** Add the per-family scope and the date.
  - RO "Pragul de 290 kW pe familie de sisteme din Legea 372/2005 are termenul depășit (31.12.2024), iar monitorizarea…"
  - EN "The 290 kW per-system-family threshold of Law 372/2005 has an expired deadline (31.12.2024), and indoor environment monitoring…"
- **Testimonial.** It mentions "control acces" (not rendered today). Access
  control is outside execution scope, so do not surface it. The same applies to
  /referinte's BCR entry; decision 10 governs it.

## Capabilities heading (if decision 7 = per sector)

RO "Zone, chiriași, raportare." / EN "Zones, tenants, reporting."
