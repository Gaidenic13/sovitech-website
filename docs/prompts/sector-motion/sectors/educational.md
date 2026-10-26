# Sector brief: Educațional & Instituții (`educational`, /expertiza/educational)

| | |
|---|---|
| Accent | `#E07B6A` coral, dark text. On the dark hero it is 5.85:1, so keep it. On white it is 2.91:1, so instruments use `#B14A36`. |
| Gesture | **Paint and decay** (README map): CO₂ rises where the hand passes over the classrooms, and each room's damper clears it. |
| Reference photo | Today: `/referinte/scoala-germana-bucuresti.jpg` (1422×800), a **3D render with a visible third-party credit** ("render // TAG visual · architectural design // TECTO Arhitectura"). Proposed swap (decision 5): `/referinte/lycee-francais-anna-de-noailles.jpg` (1000×521), the campus named in the 13.500 m² KPI. It is wide: show it at its natural aspect ratio, never cropped to 4:3. |
| Decisions that touch this page | 4 (KPI 4 label), 5 (swap, permission), 7 (heading), 9 (title), 10 (access control), 11 (legal date) |

## The building type

A school campus:

- **Classrooms.** Classroom wings along corridors, about 30 pupils per room
  (the densest occupancy of any building type). CO₂ sensors sit in the
  **occupied zone**, not the corridor, with dampers or VAV per classroom.
- **Air and heat.** One AHU with heat recovery per wing. The heating circuits
  are per wing.
- **Other spaces.** A separate **sports hall** (large volume, variable load),
  labs and workshops, a canteen and admin.
- **Plant.** A **heating substation** and domestic hot water.
- **Schedule.** A **timetable** that changes twice a year, and holidays that
  leave the building unattended for weeks.
- **Institutions and embassies** add network segmentation and controlled
  physical access to panels.

## Hero: KPI glyphs

| # | Value | Kind | Emphasis | Glyph (24 px band, no text) |
|---|---|---|---|---|
| 1 | 3 | count | glyph (/referinte lists 3 under Educație & Instituții) | three ticks |
| 2 | 13.500 m² | quantity | glyph (on /referinte) | a generic square outline that closes; not the campus plan |
| 3 | 5-10 EUR/mp | range (proxy) | glyph | cost ruler, 5-10 **dashed** (the proxy), revealed by the clip wipe so the dashes show in every frame |
| 4 | 70 kW | threshold | glyph | one dashed horizontal line at reduced strength (not in force); nothing crosses it, no marker |

`method` texts:

1. RO "Referințe listate pe pagina Referințe: Ambasada Canadei, Școala Germană București, Lycée Français Anna de Noailles." EN "References listed on the References page: the Canadian Embassy, the German School Bucharest, Lycée Français Anna de Noailles."
2. RO "Suprafață construită a campusului Lycée Français Anna de Noailles, cu BMS livrat de Sovitech. Sursa: pagina Referințe." EN "Built area of the Lycée Français Anna de Noailles campus, with BMS delivered by Sovitech. Source: the References page."
3. RO "Banda birourilor clasa B, folosită ca proxy pentru școli; nu există bandă publicată pentru școli; ordin de mărime 2026, fără TVA." EN "The class B office band, used as a proxy for schools; no band is published for schools; 2026 order of magnitude, excl. VAT."
4. As retail KPI 4. RO "Pragul de 70 kW din Directiva (UE) 2024/1275, art. 13 alin. (9) lit. b), termen 31.12.2029; prevederea nu este încă transpusă în legea română (verificat la <data verificării reale, altfel 16.08.2026>)." EN "The 70 kW threshold of Directive (EU) 2024/1275, Art. 13(9)(b), deadline 31.12.2029; the provision is not yet transposed into Romanian law (checked <real check date, otherwise 16.08.2026>)."

## Capabilities: instruments

| # | Card | Beat 1 (cause) | Beat 2 (response) |
|---|---|---|---|
| 1 | Ventilație pe CO₂ în sălile de clasă | pupil dots fill a classroom; a sensor by the door stays low while one in the occupied zone rises | the damper opens (the sensor in the occupied zone drove it) |
| 2 | Program pe orar și pe vacanțe | one school day: lesson blocks and breaks draw along a time axis | the temperature line follows: comfort during the blocks, setback in the evening |
| 3 | Corpuri de clădire și săli de sport | two wing outlines and a separate sports-hall volume, all at setback | in the evening the hall's mark rises on its own while the wings stay at setback |
| 4 | Securitate instituțională | a remote dot approaches a network line split in two by a gateway | it passes only through the gateway's gate, and the panel door stays shut |
| 5 | Achiziție publică | an outlined socket that the specification describes | three different controller silhouettes each slide in and fit: the function is specified, any compliant product fits |
| 6 | Execuție în vacanțe | one school year: terms and holidays along a strip | work blocks drop only inside the holidays; a tick marks the first school day, untouched |

## Ce livrăm: the building, explained

**Figure `campus`** (new):

- a two-storey classroom wing with classrooms along a corridor;
- a separate sports-hall box (context);
- a heating substation with a domestic-hot-water tank inside;
- a BMS cabinet;
- one AHU per wing on the roof;
- a meter on the wing's incoming supply.

**Gesture.** Paint and decay, acting on the classrooms only. Where the hand
passes over the classrooms, pupil dots arrive and CO₂ dots rise. Each room's
damper opens and clears them over a few seconds. When the hand leaves, an idle
lap returns. No ppm values and no numbers in the drawing.

| Checklist # | Part id | Part | Read-out RO | Read-out EN |
|---|---|---|---|---|
| 1 fresh air on CO₂ | `clasa` (any classroom) | a classroom and its damper | sală de clasă · CO₂ | classroom · CO₂ |
| 2 temperature per room on timetable and holidays | `circuit` | the wing's heating-circuit valve | aripă · circuit de încălzire | wing · heating circuit |
| 3 plant watched in holidays | `dulap-bms` | the BMS cabinet with its watch dot | dulap BMS · veghe în vacanță | BMS cabinet · holiday watch |
| 4 DHW and substation | `punct-termic` | the DHW tank inside the substation | punct termic · apă caldă menajeră | substation · domestic hot water |
| 5 lighting on schedule and presence | `hol` | the corridor luminaires | hol · iluminat | corridor · lighting |
| 6 energy per wing | `contor` | the wing meter | aripă · contor de energie | wing · energy meter |

- **No room numbers** in any read-out.
- **Lap:** `clasa` (CO₂ rises, damper opens) → `hol` → `punct-termic` → rest.
- **Stage label:** RO "Aripă de școală cu săli de clasă pe un coridor, sala de sport separată, punct termic și dulapul BMS." / EN "School wing with classrooms along a corridor, a separate sports hall, a heating substation and the BMS cabinet."
- **Tag:** RO "Fig. · școală" / EN "Fig. · school".
- **Hint:** pointer RO "Treceți peste săli: CO₂ crește, clapetele îl elimină" / EN "Pass over the classrooms: CO₂ rises, the dampers clear it"; touch RO "Atingeți o sală" / EN "Tap a classroom".
- **Reference card** (Lycée, if decision 5 approves the swap and permission):
  - Caption from /referinte: RO "Lycée Français Anna de Noailles, București: automatizare BMS pentru campusul liceului, 13.500 m² construiți." / EN "Lycée Français Anna de Noailles, Bucharest: BMS automation for the lycée campus, 13,500 m² built area."
  - Alt: write it after looking at the photo.
  - **Never show the German School render as a reference.** It is not a photo
    of a delivered building, and it carries a third-party credit.

## Facts to fix (owner approval)

- **KPI 4 (decision 4).** "aduce sub obligație majoritatea școlilor" is
  unsupported and is not a domestic obligation.
  - RO "Pragul din Directiva (UE) 2024/1275, termen 31.12.2029; prevederea nu este încă transpusă în legea română"
  - EN "The threshold in Directive (EU) 2024/1275, deadline 31.12.2029; the provision is not yet transposed into Romanian law"
- **Hero subhead.** "30 de elevi … sub o oră" and "cea mai bună investiție" are
  not supported by site sources. Keep them out of any motion and flag them for
  the C4 copy review.
- **Title (decision 9).** The page says "Educațional & Instituții"; the route
  metadata and /referinte say "Educație & Instituții".
- **Access control (decision 10).** /referinte lists "control acces" for
  Ambasada Canadei. Card 4's instrument shows the BMS respecting the panel door
  and the network gate. It never claims that Sovitech delivers access control.

## Capabilities heading (if decision 7 = per sector)

RO "CO₂, orar, vacanțe." / EN "CO₂, timetable, holidays."
