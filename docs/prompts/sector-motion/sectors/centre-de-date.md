# Sector brief: Centre de date (`centre-de-date`), PLANNED

**Run this only after the page is published.** Today it is `planned` in
production (a 301 to /expertiza). Before running, check every fact below again
against `sector-data.ts`.

| | |
|---|---|
| Accent | `#5C5FD4` indigo, white text. On the dark hero it is 3.28:1, so use mint (`accentOnDark`). On white it is 5.19:1, so instruments keep the accent. |
| Gesture | **One of many** (README map): racks. The rack under the pointer shows its three intake sensors, and the worst one answers. |
| Reference photo | None. **Sovitech states it has no project of its own in this sector**: the page describes transferable competence. The image is `/placeholder.svg`. Show the type label, and do not show the "De încredere pentru" strip. |
| Decisions that touch this page | 7 (heading) |

## The building type

A constant, concentrated, almost entirely internal heat load: no season, no
occupancy, no night mode.

- **Rack rows.** **Cold aisles are measured at the equipment intake, at three
  heights per rack**, in the most loaded rows, and control acts on the worst
  value.
- **Environment.** Raised-floor or ceiling plenum pressure, RH and dew point,
  and leak detection under the floor and near cooling circuits.
- **Equipment.** Precision cooling units, UPS, generators and power-quality
  analysers are integrated over Modbus and BACnet.
- **Metering.** IT circuits are metered separately from infrastructure circuits
  (for PUE).
- **Redundancy and alarms.** Standby rotation with tested changeover, and alarm
  escalation by severity and time.
- **Security.** NIS2 segmentation and logged remote access.
- **Redundancy design stays with the facility's specialist designer.**

## Hero: KPI glyphs

| # | Value | Kind | Emphasis | Glyph (24 px band, no text) |
|---|---|---|---|---|
| 1 | 90-320 EUR | range (per point) | glyph | a separate per-point scale (0-400 EUR per point, ticks at 0 and 400 only) with a 90-320 band; **not** the EUR/mp ruler |
| 2 | PUE | code | glyph | two small meter circles over and under a fraction line, with no number |
| 3 | NIS2 | code | glyph | a network line split into segments by two gateway ticks |
| 4 | 0 | zero | plain, **no motion at all** | none: the honest zero stays exactly "0" |

`method` texts:

1. RO "Pe punct fizic complet, ordin de mărime 2026, fără TVA: 180-320 EUR sub 150 de puncte, 90-160 EUR peste 1.500 de puncte." EN "Per complete physical point, 2026 order of magnitude, excl. VAT: 180-320 EUR below 150 points, 90-160 EUR above 1,500 points."
2. RO "Energia totală a facilității raportată la energia echipamentelor de calcul, pe o perioadă declarată, din două mărimi măsurate cu contoare dedicate." EN "Total facility energy divided by computing equipment energy, over a declared period, from two quantities measured with dedicated meters."
3. RO "OUG 155/2024, în vigoare pentru operatorii de infrastructură digitală: segmentare de rețea, acces la distanță controlat, jurnalizarea intervențiilor." EN "GEO 155/2024, in force for digital infrastructure operators: network segmentation, controlled remote access, logged interventions."
4. RO "Proiecte proprii în sector: niciunul. Pagina descrie competență transferabilă din proiecte farmaceutice, spitale, birouri și retail." EN "Own projects in this sector: none. The page describes competence transferable from pharma, hospital, office and retail projects."

## Capabilities: instruments

| # | Card | Beat 1 (cause) | Beat 2 (response) |
|---|---|---|---|
| 1 | Temperatura pe culoarul rece | three dots at three heights on a rack's intake; the top one rises | that dot takes the accent: control follows the worst value |
| 2 | Redundanță verificată | a standby unit sits idle beside a running one | a rotation tick swaps them, and the standby now runs under load |
| 3 | Umiditate, punct de rouă, presiuni | a leak cable runs under a raised-floor tile | one segment of it lights where water touches it |
| 4 | Contorizare pentru PUE | two meters, IT and infrastructure, turn | their readings write into two separate lines that never merge |
| 5 | Integrarea echipamentelor | a UPS, a cooling unit and a generator are joined by one line | the line reaches the BMS through a single gateway; there is no open path around it |
| 6 | Alarmare cu escaladare | an unacknowledged alarm mark sits on the first rung of a ladder | after a pause it climbs to the next rung |

## Ce livrăm: the building, explained

**Figure `centru-date`** (new):

- a rack row with a cold aisle and a hot aisle;
- a CRAH unit at the end of the row, and a standby CRAH;
- the raised-floor plenum;
- a meter board with two meters (IT, infrastructure);
- a network gateway box.

**Gesture.** One of many racks. The rack under the pointer shows its three intake
dots, and the worst one takes the bright edge.

| Checklist # | Part id | Part | Read-out RO | Read-out EN |
|---|---|---|---|---|
| 1 dense environmental monitoring | `rack` (any rack) | a rack and its three intake dots | culoar rece · cea mai defavorabilă valoare | cold aisle · the worst value |
| 2 local controller operation | `controler` | the CRAH's local controller | controler local · fără supervizare | local controller · without supervision |
| 3 automatic changeover and rotation | `crah-rezerva` | the standby CRAH | unitate de rezervă · rotație | standby unit · rotation |
| 4 PUE from two dedicated meters | `contoare` | the meter board | contoare · IT și infrastructură | meters · IT and infrastructure |
| 5 NIS2 security | `gateway` | the network gateway box | rețea · segmentare | network · segmentation |
| 6 work alongside the specialist designer | none | a contract term: plain legend row | | |

- **Lap:** `rack` (a loaded rack, its worst dot bright) → `crah-rezerva` →
  `contoare` → rest.
- **Stage label:** RO "Rând de rack-uri cu culoar rece și cald, unitatea de răcire de precizie și cea de rezervă." / EN "A rack row with cold and hot aisles, the precision cooling unit and its standby."
- **Tag:** RO "Fig. · centru de date" / EN "Fig. · data centre".
- **Type label (no reference):** RO "Tip de instalație, competență transferabilă; Sovitech nu are încă un proiect propriu în acest sector." / EN "Installation type, transferable competence; Sovitech has no project of its own in this sector yet."

## Facts to fix (owner approval)

- **KPI 1 label.** "banda comună tuturor sectoarelor" is not stated anywhere.
  Use the `method` wording as the label.

## Capabilities heading (if decision 7 = per sector)

RO "Culoar rece, redundanță, escaladare." / EN "Cold aisle, redundancy, escalation."
