# Sector brief: Medical (`medical`, /expertiza/medical)

| | |
|---|---|
| Accent | `#C8E6C9` mint, dark text. On the dark hero it is 12.7:1, so keep it. On white it is 1.34:1, so instruments use `#0D2E2B` for the moving element. |
| Gesture | **One of many** (README map). Pressure is drawn as ceiling height, and the isolation room sits below the corridor. No arrows anywhere. |
| Reference photo | `/referinte/spitalul-foisor.jpg`: 1200×800 in this repo (the old repo and production have a 1500×1000 version). Good quality. |
| Decisions that touch this page | 2 (KPI 1 and KPI 3), 4 (KPI 4 label), 5 (permission), 7 (heading) |

## The building type

A hospital that runs 24/7:

- **Critical zones that are never switched off:** the operating block, ICU,
  sterilisation, the laboratory, radiology (equipment temperature requirements),
  and the pharmacy with its medicine and sample cold storage. They sit next to
  zones that behave like offices.
- **Pressure.** Operating theatres are in **overpressure**; isolation rooms are
  in **underpressure**, with an anteroom. The cascade runs OR > prep > clean
  corridor.
- **Air.** Airflow and air changes per hour, with filter condition monitored,
  and automatic changeover to a standby AHU.
- **Local controllers keep running without supervision.**
- **Alarms** are routed to the staff who can act.
- **Execution** is phased by zone and building wing, critical zones last.

## Hero: KPI glyphs

| # | Value | Kind | Emphasis | Glyph (24 px band, no text) |
|---|---|---|---|---|
| 1 | per decision 2 ("1" or "3") | count | **plain** either way: a count of 1 needs no glyph, and 3 is contested | none |
| 2 | 9.000 m² | quantity | glyph (on /referinte) | a generic square outline that closes. Not Foișor's footprint |
| 3 | 303 | count | **plain**: Sfânta Maria is not on /referinte (decision 2) | none |
| 4 | 24/7 | principle | glyph | a ring of 24 short ticks that closes once; nothing breaks or blinks (supervision loss lives only in card 1) |

`method` texts:

1. Decision 2(a): RO "Referință listată pe pagina Referințe." EN "Reference listed on the References page." Decision 2(b): RO "Proiecte din portofoliul Sovitech; pe pagina Referințe apare Spitalul Foișor." EN "Projects from the Sovitech portfolio; the References page lists Spitalul Foișor." **Never** write "listate pe pagina Referințe" for 3.
2. RO "Spitalul de ortopedie Foișor, București: 9.000 m², 119 paturi; BMS cu backup pentru sistemele critice. Sursa: pagina Referințe." EN "Foișor orthopaedic hospital, Bucharest: 9,000 m², 119 beds; BMS with backup for critical systems. Source: the References page."
3. Whatever decision 2 says. By default the cell keeps its current text with no glyph, and the method reads RO "Cifră din fișa proiectului; spitalul nu este listat pe pagina Referințe." EN "A figure from the project file; the hospital is not listed on the References page."
4. RO "Principiu de proiectare, nu rezultat măsurat: controlerele zonelor critice funcționează local și fără supervizare." EN "A design principle, not a measured result: critical-zone controllers run locally, even without supervision."

## Capabilities: instruments

| # | Card | Beat 1 (cause) | Beat 2 (response) |
|---|---|---|---|
| 1 | Continuitate în zonele critice | the network line from a controller to supervision opens a gap | the controller's LED keeps its steady pulse |
| 2 | Presiuni diferențiale | a U-tube manometer between two rooms: a door opens and the liquid level nudges | it settles back with the offset on the same side; the direction never reverses |
| 3 | Debit de aer și schimburi orare | people dots enter an operating room whose ceiling carries a ring of air-change ticks | the sweep around the ring keeps its steady rate |
| 4 | Bloc operator, ATI, sterilizare, laborator | four room cells in a 2 × 2 block, each with a needle; a shared disturbance swings all four | each needle returns to its own angle, not to a common one |
| 5 | Farmacie și spații frigorifice | a fridge door opens and its temperature mark rises toward the drawn alarm line (no numbers) | the door closes and the mark falls back inside its band before reaching the line |
| 6 | Fazare fără întreruperea activității | two ordinary wings switch from dashed (old) to solid (new) controllers | the critical wing switches last |

"A needle held in its band" appears only here (card 5) in the whole pack.

## Ce livrăm: the building, explained

**Figure `spital`** (new). An operating suite and a ward corridor in isometric
plan:

- **Pressure is height.** Each room is a plate whose ceiling height is its
  pressure: the OR highest, prep one step lower, the clean corridor lower, and
  the isolation room sunk below the corridor, with its anteroom in between. **No
  arrows anywhere** (rule 10).
- A pharmacy cold room, a nurse station and an AHU with its filter close the
  corridor.
- At most 8 solids plus 6 pickable parts.

**Gesture.** One of many. The room under the pointer lifts a little more and
takes the bright edge. Its neighbours keep their steps, so the cascade reads by
comparison. Controllers are `dot m` (alive), never bright (rule 04).

| Checklist # | Part id | Part | Read-out RO | Read-out EN |
|---|---|---|---|---|
| 1 temperature and humidity in OR and ICU | `sala-operatie` | the OR plate (an ICU bay beside it is context) | sală de operație · suprapresiune | operating theatre · overpressure |
| 2 differential pressure | `pregatire` | the prep plate, one step below the OR | pregătire · o treaptă mai jos | prep · one step lower |
| 3 airflow, air changes, filters | `cta` | the AHU with its filter | CTA · filtru monitorizat | AHU · filter monitored |
| 4 pharmacy cold storage | `farmacie` | the cold room | farmacie · spațiu frigorific | pharmacy · cold room |
| 5 alarms to staff | `asistente` | the nurse station | post de asistente · alarme | nurse station · alarms |
| (context) | `izolare` | the isolation room, sunk below the corridor | izolare · subpresiune | isolation · underpressure |
| 6 phased execution | none | a procedure: plain legend row | | |

- **Lap:** `sala-operatie` → `izolare` → `farmacie` → rest.
- **Stage label:** RO "Bloc operator și coridor de spital în plan: înălțimea fiecărei camere arată presiunea ei." / EN "Operating suite and hospital corridor in plan: each room's height shows its pressure."
- **Tag:** RO "Fig. · spital" / EN "Fig. · hospital".
- **Reference card** (if decision 5 allows):
  - Caption RO "Spitalul de ortopedie Foișor, București: 9.000 m², 119 paturi, BMS cu backup pentru sistemele critice." / EN "Foișor orthopaedic hospital, Bucharest: 9,000 m², 119 beds, a BMS with backup for critical systems."
  - Alt RO "Spitalul Foișor din București: clădire albă cu colț curbat și parasolare metalice; în fundal, Foișorul de Foc." / EN "Foișor Hospital in Bucharest: a white building with a curved corner and metal sunshades; the Fire Watchtower behind it."
  - Use the photo's natural aspect (1200×800).

## Facts to fix (owner approval)

- **KPI 1 (decision 2).** /referinte lists only Spitalul Foișor; Sfânta Maria and
  Chirurgie Plastică were removed in 86fec43.
  - (a) Value "1", RO "Referință în spitale: Spitalul Foișor" / EN "Hospital reference: Foișor Hospital".
  - (b) Keep 3 as plain text with the portfolio method above.
- **KPI 3 (decision 2).** 303 has had no site source since 86fec43. It stays plain
  text, with no glyph, until the owner decides. If kept, the label drops
  "deservite de sistemul BMS": RO "Paturi la Spitalul Clinic Sfânta Maria, unde Sovitech a livrat automatizare BMS" / EN "Beds at Sfânta Maria Clinical Hospital, where Sovitech delivered BMS automation".
- **KPI 4 (decision 4).** Label it as a principle: RO "Principiu de proiectare: zonele critice funcționează local, pe controler, și fără supervizare" / EN "Design principle: critical zones run locally on their controllers, even without supervision".

## Capabilities heading (if decision 7 = per sector)

RO "Continuitate, presiuni, fazare." / EN "Continuity, pressures, phasing."
