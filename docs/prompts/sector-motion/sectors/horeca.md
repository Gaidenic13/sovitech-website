# Sector brief: HORECA (`horeca`, /expertiza/horeca)

| | |
|---|---|
| Accent | `#1F6B4A` green, white text. On the dark hero it is 2.65:1, so use mint (`accentOnDark`). On white it is 6.44:1, so instruments keep the accent. |
| Gesture | **One of many** (README map): the room grid. Each room's dot shows its state. |
| Reference photo | Today: `/referinte/radisson-blu-hotel.jpg` (800×600, old "Radisson SAS" sign), but the room KPI is Novotel. Proposed swap (decision 5): `/referinte/novotel-bucuresti.jpg` (1142×855), so the photo and the 258-room KPI name the same hotel. |
| Decisions that touch this page | 3 (258 rooms), 4 (KPI 4 label, card 1), 5 (swap, permission), 7 (heading) |

## The building type

A hotel running 24/7, with occupancy that changes daily:

- **Guest-room floors.** A double-loaded corridor, a fan coil per room, a
  thermostat plus window contact plus presence detection, and the hotel
  management system reporting sold / occupied / free.
- **Podium.** Lobby and reception, restaurant and conference rooms (fresh air
  on occupancy), a kitchen with hoods and cold rooms, and a laundry.
- **Spa and pool.** Humidity control and heat recovery.
- **Car park** ventilated on CO.
- **Basement.** Central plant and **domestic hot water**, its temperature
  monitored against microbiological risk.

Room control is what moves the budget from 6-13 to 18-38 EUR/mp.

## Hero: KPI glyphs

| # | Value | Kind | Emphasis | Glyph (24 px band, no text) |
|---|---|---|---|---|
| 1 | 6-13 EUR/mp | range (cost) | glyph | the full 0-80 cost ruler, 6-13 solid |
| 2 | 18-38 EUR/mp | range (cost) | glyph | the full 0-80 cost ruler: 6-13 as a ghost band, 18-38 solid, and a 1 px bracket over the gap from 13 to 18 (the bracket is the rooms) |
| 3 | 3 | count | glyph | three ticks |
| 4 | 258 | count | glyph (on /referinte: "hotel de 258 camere"), unless decision 3 says unknown | a small generic room-grid patch (decorative, not 258 marks), revealed by one clip wipe |

**Never draw one ruler across both cells.** Each cell carries the whole 0-80
scale; the jump between the two cells is the hero's point.

`method` texts:

- 1 and 2: RO "Ordin de mărime orientativ 2026, fără TVA, pe mp de arie utilă; densitate 30-55 puncte/1.000 mp fără control pe cameră, 90-160 cu control pe cameră." EN "Indicative 2026 order of magnitude, excl. VAT, per sqm of usable area; 30-55 points/1,000 sqm without room control, 90-160 with room control."
- 3: RO "Hoteluri listate pe pagina Referințe: Radisson Blu, Novotel, Crowne Plaza, toate în București." EN "Hotels listed on the References page: Radisson Blu, Novotel and Crowne Plaza, all in Bucharest."
- 4: RO "Camere la Novotel București (~15.900 m²), proiect cu BMS livrat de Sovitech. Sursa: pagina Referințe." EN "Rooms at Novotel Bucharest (~15,900 m²), a project with BMS delivered by Sovitech. Source: the References page."

## Capabilities: instruments

| # | Card | Beat 1 (cause) | Beat 2 (response) |
|---|---|---|---|
| 1 | Control pe cameră legat de recepție | a key card drops into the slot beside a room door | the thermostat needle rises from setback to comfort |
| 2 | Regim redus calibrat pe cameră | a temperature line holds low (setback) along a time axis with a check-in tick | it curves up and reaches comfort exactly at the tick, not before |
| 3 | Bucătărie, spălătorie, parcare | a kitchen hood's fan ring starts turning | the make-up air damper opens to follow it |
| 4 | Zona de spa și piscină | a wall section beside a pool: moisture dots gather on the warm side | the dew-point line settles and stays outside the wall's layers, so no condensation forms inside the structure |
| 5 | Consum pe zone funcționale | a hot-water tank: a tap opens and its temperature trace dips | the trace recovers before it reaches the dashed hygiene line |
| 6 | Lucrări fazate, hotel în funcțiune | a few rooms on one floor grey out (out of sale) while the rest stay lit | they return lit as a few rooms on the next floor grey out |

## Ce livrăm: the building, explained

**Figure `hotel`** (new). Guest-room floors over a podium, with a basement:

- Each guest floor is a grid of room plates.
- The podium is one row of four bays: reception, conference and restaurant,
  kitchen, and the car-park ramp.
- The basement has one domestic-hot-water tank.

**Rest pose: the states are geometry, not words.** Each room carries one dot: no
dot means free, a dim dot (`dot m`) means sold. The one bright edge is the room
the eye should start at. The lifted room shows only its window line and its
thermostat needle (setback when free, comfort when sold). Do not draw thermostat,
window-contact or presence parts under 10 viewBox units.

**Gesture.** One of many. The room under the pointer lifts, and its neighbours
keep their places.

| Checklist # | Part id | Part | Read-out RO | Read-out EN |
|---|---|---|---|---|
| 1 room thermostat, window, presence | `camera` (any room), with `states`: the figure emits `camera:libera` or `camera:vanduta` | a room plate | name "cameră"; states: liberă → "cameră liberă · regim redus", vândută → "cameră vândută · confort" | name "room"; states: free → "free room · setback", sold → "sold room · comfort" |
| 2 PMS interface | `receptie` | the reception bay | recepție · stare camere | reception · room status |
| 3 fresh air on occupancy | `conferinte` | the conference and restaurant bay | conferințe și restaurant · aer proaspăt | conference and restaurant · fresh air |
| 4 domestic hot water | `acm` | the basement tank | subsol · apă caldă menajeră | basement · domestic hot water |
| 5 car park CO | `parcare` | the car-park ramp bay | parcare · CO | car park · CO |
| 6 kitchen cold rooms | `bucatarie` | the kitchen bay | bucătărie · spații frigorifice | kitchen · cold rooms |

- **Lap:** `camera-libera` (a lap-only POINT on a free room, needle at setback)
  → `camera-vanduta` (a lap-only POINT on a sold room on the same floor, needle
  at comfort) → `bucatarie` → rest. Two different rooms, never the same point
  twice.
- **No room numbers** in any read-out: a number would read as a real room.
- **Stage label:** RO "Hotel în secțiune: etaje de camere, podium cu recepție, conferințe, bucătărie și parcare, subsol cu apă caldă menajeră." / EN "Hotel in section: guest-room floors, a podium with reception, conference, kitchen and car park, and a basement with domestic hot water."
- **Tag:** RO "Fig. · hotel" / EN "Fig. · hotel".
- **Reference card** (Novotel, if decision 5 approves the swap and permission):
  - Caption RO "Novotel București: sistem BMS pentru un hotel de 258 de camere, ~15.900 m²." / EN "Novotel Bucharest: a BMS for a 258-room hotel, ~15,900 m²."
  - Alt: write it after looking at the photo (what it shows, plus "Novotel București" / "Novotel Bucharest").

## Facts to fix (owner approval, decision 4)

- **KPI 4 label.** "hotel deservit de sistemul BMS livrat" overstates the scope.
  - RO "Camere la Novotel București, proiect cu BMS livrat de Sovitech"
  - EN "Rooms at Novotel Bucharest, a project with BMS delivered by Sovitech"
- **Card 1.** "Cea mai mare parte a economiei posibile … în camerele nevândute" is
  unsupported.
  - RO "…și aplică regimul corespunzător. Camerele nevândute nu mai sunt climatizate ca și cum ar fi ocupate."
  - EN "…and applies the matching regime. Unsold rooms are no longer conditioned as if they were occupied."
- **Cost cells.** The method says "orientativ 2026, fără TVA" (as above).

## Capabilities heading (if decision 7 = per sector)

RO "Camere, recepție, apă caldă." / EN "Rooms, reception, hot water."
