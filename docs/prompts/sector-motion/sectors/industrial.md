# Sector brief: Industrial & Logistică (`industrial`, /expertiza/industrial)

| | |
|---|---|
| Accent | `#5C5FD4` indigo, white text. On the dark hero it is 3.28:1, so use mint (`accentOnDark`). On white it is 5.19:1, so instruments keep the accent. |
| Gesture | **Field** (README map): the pointer on the hall floor shows the air column above that spot. |
| Reference photo | Decision 5: `/referinte/ntn-snr-fabrica-de-rulmenti.jpg` (640×360, NTN-SNR logo, location not verified) or `/referinte/moncler-bacau.jpg` (1193×634). Both are wide: show the photo at its natural aspect ratio and never crop it to 4:3. |
| Decisions that touch this page | 2 (KPI 2), 3 (37.000 m²), 4 (labels, card 3), 5 (photo), 7 (heading) |

## The building type

A high-bay production hall, 10-12 m tall:

- **Heating and air.** Warm air stratifies under the roof. Heating is by unit
  heaters, destratification fans or radiant panels, and temperature is
  measured at several heights.
- **Process ventilation** is tied to the process, with IP ratings chosen for
  dust, vibration and washing.
- **Utilities.** **Compressed air**, chilled water and process water, plus
  pumping groups and compressors.
- **Metering.** Electricity is metered **per production line and per utility**.
- **Storage and gates.** Warehouses with product temperature and humidity
  requirements, and gates with air curtains.
- **Offices.** An attached office and social block, treated as a small tertiary
  building.
- **The building/process boundary is written down.** The BMS reads utilities
  and states; it never commands the line.

## Hero: KPI glyphs

| # | Value | Kind | Emphasis | Glyph (24 px band, no text) |
|---|---|---|---|---|
| 1 | 3-8 EUR/mp | range (cost) | glyph | cost ruler, 3-8 solid (the lowest band, at the left end) |
| 2 | 2 (if decision 2 approves) | count | glyph if resolved to 2; "3" stays plain | two ticks |
| 3 | 37.000 m² | quantity | **plain** until decision 3 confirms it; then glyph | a generic square outline that closes, not the factory's footprint |
| 4 | 1.000 tep | threshold | glyph | the dashed line with one end tick; no bar reaches it |

`method` texts:

1. RO "Ordin de mărime 2026, fără TVA, pe mp de arie utilă; 10-30 puncte/1.000 mp." EN "2026 order of magnitude, excl. VAT, per sqm of usable area; 10-30 points/1,000 sqm."
2. RO "Referințe industriale listate pe pagina Referințe, fără proiectele farmaceutice: NTN-SNR Sibiu și Moncler Bacău." EN "Industrial references listed on the References page, excluding the pharmaceutical projects: NTN-SNR Sibiu and Moncler Bacau."
3. RO "Suprafață de producție la fabrica de rulmenți NTN-SNR Sibiu. Sursa: pagina Referințe; confirmată din fișa proiectului." (Drop the last clause until decision 3 confirms.) EN "Production floor at the NTN-SNR bearing factory in Sibiu. Source: the References page; confirmed from the project file."
4. RO "Consumul anual de la care Legea 121/2014 cere manager energetic atestat și audit energetic la 4 ani. Sovitech nu face auditul." EN "The annual consumption above which Law 121/2014 requires a certified energy manager and an energy audit every 4 years. Sovitech does not perform the audit."

## Capabilities: instruments

| # | Card | Beat 1 (cause) | Beat 2 (response) |
|---|---|---|---|
| 1 | Zone mari, hale înalte | one sensor at 2 m settles at a comfortable mark | a second sensor appears at 10 m with its mark far higher: the heat the single sensor never saw |
| 2 | Ventilație corelată cu procesul | a machine silhouette starts (its dot lights) | the extract fan ring spins up to follow it |
| 3 | Aer comprimat monitorizat | a flow trace runs through a shift | in the shaded shift gap it drops but stays above zero: the leak becomes a visible step |
| 4 | Energie pe linii și utilități | three line meters and a utilities meter turn together | one line's machine goes idle and only its meter stops, so each line's share shows |
| 5 | Granița clădire-proces | a dashed boundary line; the BMS dots stay on their side | one state mark crosses toward the BMS side (read-only); nothing crosses back |
| 6 | Fără opriri neplanificate | work blocks float above a production timeline | they drop only into the shaded planned-shutdown windows |

## Ce livrăm: the building, explained

**Figure `hala`** (new). An isometric portal-frame hall:

- a stratified air volume drawn as layers, with destratification fans under the
  roof;
- a compressor room and a separate small pump group;
- a line-meter board on the hall wall;
- a warehouse bay;
- a dock gate with an air curtain;
- a dashed building/process boundary on the floor.

**Gesture.** One idea only: a field on the floor. The pointer on the hall floor
raises the air column above that spot. Three sensor dots at 2, 6 and 10 m spread
apart where the air stratifies, and sit close together under a destratification
fan. The field acts on the hall floor only; every other part is picked by its
rest hull. There is no second gesture.

| Checklist # | Part id | Part | Read-out RO | Read-out EN |
|---|---|---|---|---|
| 1 temperature over large zones, destratification | `hala` | the hall floor and its air column (the geometry shows whether the layers spread or mix) | hală · senzori la 2 / 6 / 10 m | hall · sensors at 2 / 6 / 10 m |
| 2 compressed air, chilled and process water | `compresoare` | the compressor room | compresoare · aer comprimat | compressors · compressed air |
| 3 warehouse temperature and humidity | `depozit` | the warehouse bay | depozit · temperatură și umiditate | warehouse · temperature and humidity |
| 4 electricity per line and utility | `contoare` | the line-meter board | contoare pe linii | line meters |
| 5 pumps, compressors, utility equipment | `pompe` | the pump group | pompe și utilități · stare | pumps and utilities · status |
| 6 lighting, ventilation, air curtains at gates | `poarta` | the dock gate | poarta · perdea de aer | gate · air curtain |

- **Read-outs show heights only, never temperatures.** No source gives this
  building's temperatures.
- **Lap:** `hala` (a stratified spot, the dots spread apart) → `hala-sub-ventilator`
  (a lap-only POINT on the same floor, under a fan, where the dots sit close
  together) → `poarta` → rest. Both floor stops read the same; the geometry
  shows the difference. Leaks belong to card 3, not to the figure.
- **Stage label:** RO "Hală de producție în secțiune: aerul cald se stratifică sub acoperiș; senzori la 2, 6 și 10 m." / EN "Production hall in section: warm air stratifies under the roof; sensors at 2, 6 and 10 m."
- **Tag:** RO "Fig. · hală" / EN "Fig. · production hall".
- **Reference card** (photo per decision 5):
  - Caption from /referinte:
    - NTN-SNR: RO "NTN-SNR, Sibiu: sistem BMS pentru o fabrică de rulmenți cu 37.000 m² suprafață de producție." / EN "NTN-SNR, Sibiu: a BMS for a bearing factory with 37,000 m² of production floor." Drop the area while decision 3 is unknown.
    - Moncler: RO "Moncler, Bacău: automatizare BMS pentru o fabrică de îmbrăcăminte de lux, 16.000 m²." / EN "Moncler, Bacau: BMS automation for a luxury apparel factory, 16,000 m²."
  - Alt: write it after looking at the photo.

## Facts to fix (owner approval)

- **KPI 2 (decision 2).** BMTI Strabag is no longer a listed reference (86fec43).
  - RO "Referințe industriale: NTN-SNR Sibiu, Moncler Bacău" / EN "Industrial references: NTN-SNR Sibiu, Moncler Bacau"
  - Value "2".
- **KPI 3 (decisions 3 and 4).** A 2014 press release gives 27.000 m² for the
  whole site; confirm 37.000 m² from the project file. Label:
  - RO "Suprafață de producție la fabrica de rulmenți NTN-SNR Sibiu, proiect cu BMS livrat de Sovitech"
  - EN "Production floor at the NTN-SNR bearing factory in Sibiu, a project with BMS delivered by Sovitech"
- **KPI 4 (decision 4).** Use the `method` wording as the label: a manager plus an
  audit every 4 years.
- **Card 3 (decision 4).** The superlatives are unsupported.
  - RO "O utilitate scumpă și des irosită: debitul și presiunea se corelează cu programul de producție, ca pierderile să devină vizibile."
  - EN "An expensive and often wasted utility: flow and pressure are correlated with the production schedule so that leaks become visible."

## Capabilities heading (if decision 7 = per sector)

RO "Hale, utilități, granițe clare." / EN "Halls, utilities, clear boundaries."
