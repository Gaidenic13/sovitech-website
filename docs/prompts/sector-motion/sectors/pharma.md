# Sector brief: Pharma (`pharma`, /expertiza/pharma)

| | |
|---|---|
| Accent | `#0D2E2B` dark green, white text. On the dark hero it is **1.17:1**: the breadcrumb, pill and accent bar are invisible today, so use mint (`accentOnDark`). On white it is 14.6:1, so instruments keep the accent. |
| Gesture | **Dilate time** (README map). The EMS recorder's strip advances on its own, and hovering slows it so a trace can be read. |
| Reference photo | Today: `/referinte/rompharm-company-otopeni.jpg` (**325×203**, unusable at card size). Proposed swap (decision 5): `/referinte/rompharm-uzbekistan.jpg` (1280×960), the same plant as the sector testimonial. |
| Decisions that touch this page | 2 (KPI 2), 4 (KPI 3 label), 5 (swap, permission), 7 (heading) |

## The building type

A pharmaceutical production unit:

- **Classified zones.** Nested grades with personnel and material airlocks.
  Temperature, humidity and **differential pressure** are product conditions,
  not comfort.
- **Air handling.** Dedicated AHUs with failure regimes and standby, with filter
  dP monitored.
- **Storage.** Product warehouses, cold rooms and **stability chambers**.
- **An EMS with its own sensors, independent of the BMS.** In the sector's words:
  "cine reglează nu poate fi și cel care dovedește".
- **Records.** An immutable **audit trail** (user, time, reason). Alert and
  action thresholds are set with Quality. Qualification is IQ/OQ/PQ.
- **Three separate systems.** Admin areas are ordinary BMS and the process is
  SCADA; the three are not merged.

## Hero: KPI glyphs

| # | Value | Kind | Emphasis | Glyph (24 px band, no text) |
|---|---|---|---|---|
| 1 | 30-80 EUR/mp | range (cost) | glyph | cost ruler, 30-80 solid at the right end |
| 2 | per decision 2 ("2" or "5") | count | glyph only if decision 2 = "2"; "5" stays plain | two ticks |
| 3 | 24 luni | quantity (practice) | glyph | a 24-cell strip, revealed by one clip wipe (it never fills cell by cell) |
| 4 | IQ, OQ, PQ | code | glyph | no SVG: a 1 px CSS underline drawn under each token of the value text, in order |

`method` texts:

1. RO "Ordin de mărime 2026, fără TVA, aplicat zonelor cu cerințe, nu întregii suprafețe construite; 100-250 puncte/1.000 mp." EN "2026 order of magnitude, excl. VAT, applied to the areas with requirements, not the whole built area; 100-250 points/1,000 sqm."
2. Decision 2(a): RO "Proiecte farmaceutice listate pe pagina Referințe (categoria Industrial): Rompharm Company, Otopeni, și Rompharm Uzbekistan." EN "Pharmaceutical projects listed on the References page (Industrial category): Rompharm Company, Otopeni, and Rompharm Uzbekistan." Decision 2(b): RO "Proiecte din portofoliul Sovitech; pe pagina Referințe apar Rompharm Company și Rompharm Uzbekistan." EN "Projects from the Sovitech portfolio; the References page lists Rompharm Company and Rompharm Uzbekistan."
3. RO "Retenția minimă pe care o specificăm, la rezoluție completă, plus arhivă agregată de 5-10 ani; nu este un minim GMP." EN "The minimum retention we specify at full resolution, plus a 5-10 year aggregated archive; not a GMP minimum."
4. RO "Documentație de calificare, cu protocoale scrise și aprobate înainte de execuție." EN "Qualification documentation, with protocols written and approved before execution."

## Capabilities: instruments

| # | Card | Beat 1 (cause) | Beat 2 (response) |
|---|---|---|---|
| 1 | Zone clasificate | nested room outlines draw, the outer one first | each inner room's plate rises one step: the cascade by height, without letters |
| 2 | Presiuni diferențiale | a dP trace runs between two dashed lines (alert above, action below) | one dip crosses the alert line, stays above action, and the crossing gets a ring mark |
| 3 | Pistă de audit | a ledger of short rows appends one row | a pen moves back to an earlier row and stops at a seal mark: rows are never rewritten |
| 4 | Monitorizare separată de automatizare | one room with two sensors: the control sensor (filled) and the EMS sensor (hollow), each on its own line to its own box | the control line goes dark (maintenance) while the EMS line keeps its pulse |
| 5 | Centrale de tratare a aerului dedicate | an AHU's filter-dP bar rises toward its mark | the standby AHU takes over |
| 6 | Depozite și camere de stabilitate | a point drifts toward the edge of a dashed rectangle (alert) inside a solid one (action) | it returns to the centre without crossing either edge |

Standby takeover appears only here (card 5) in the whole pack.

## Ce livrăm: the building, explained

**Figure `inregistrator`** (new). It shows the object that is the proof:

- A small classified suite of 3-4 rooms. Grade is shown by plate height; no
  arrows.
- Bolted to the suite's wall is the **EMS recording unit**: a drum or strip with
  one pen per room, writing between two dashed lines (alert, action). The strip
  advances on its own (ambient).
- The BMS control sensors are plain dots in the rooms, wired elsewhere. The EMS
  pens have their own conduit.

The recorder is a metaphor for the continuous, validated record. In copy, never
call it paper, a chart recorder or a datalogger: the checklist itself rejects
"dataloggere descărcate periodic".

**Gesture.** Dilate time. Hovering the strip slows it so a trace can be read.
The room under the pointer and its pen take the bright edge. The slowing acts
on the strip only.

| Checklist # | Part id | Part | Read-out RO | Read-out EN |
|---|---|---|---|---|
| 3 alert and action thresholds | `praguri` | the strip's band between the two dashed lines | praguri · alertă și acțiune | limits · alert and action |
| 4 continuous monitoring | `ems` | the recorder head carrying the pens (≥10 units) | înregistrare EMS · continuă | EMS record · continuous |
| 5 retention and archive | `arhiva` | the roll and its archive drawer | arhivă · 24 de luni, apoi 5-10 ani agregat | archive · 24 months, then 5-10 years aggregated |
| 6 the band applies to areas with requirements | `zona` (any room) | a room of the suite | zonă clasificată | classified room |
| 1 IQ, OQ, PQ | none | a procedure: plain legend row | | |
| 2 change management | none | a procedure: plain legend row | | |

- **Lap:** `zona` (a grade room, its pen bright) → `ems` → `arhiva` → rest.
- **Stage label:** RO "Suită clasificată cu unitatea de înregistrare EMS: câte o peniță pentru fiecare cameră, între limitele de alertă și de acțiune." / EN "Classified suite with the EMS recording unit: one pen per room, between the alert and action limits."
- **Tag:** RO "Fig. · zonă clasificată" / EN "Fig. · classified area".
- **Reference card** (Rompharm Uzbekistan, if decision 5 approves the swap and
  permission):
  - Caption from /referinte: RO "Rompharm Uzbekistan: extinderea internațională a automatizării BMS Rompharm către o nouă fabrică farmaceutică." / EN "Rompharm Uzbekistan: the international expansion of Rompharm's BMS automation to a new pharmaceutical factory."
  - Alt: write it after looking at the photo.

## Facts to fix (owner approval)

- **KPI 2 (decision 2).** /referinte lists 2 pharmaceutical projects (Rompharm
  Company, Rompharm Uzbekistan); Hyperion, Actavis and Monrol were removed in
  86fec43.
  - With "2": RO "Referințe pharma: Rompharm Company și Rompharm Uzbekistan" / EN "Pharma references: Rompharm Company and Rompharm Uzbekistan".
  - With "5": plain text, and the method as above. If any name stays, spell it
    "Eczacıbaşı" (Turkish ş with a cedilla); today it has a comma-below ș.
- **KPI 3 (decision 4).** It is Sovitech's specified practice, not a regulatory
  minimum: use the `method` wording as the label.
- **Grades.** Never show a GMP grade letter as a claim about a specific client.

## Capabilities heading (if decision 7 = per sector)

RO "Zone clasificate, dovadă, calificare." / EN "Classified areas, proof, qualification."
