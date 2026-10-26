# Owner decisions for the sector-motion work

Fill this in **before** running `01-foundation.md`. Put an `x` in one box per
question, or write a value where asked. The foundation run copies this file into
`sovitech-live/docs/sector-motion/owner-decisions.md` and commits it; every
sector session reads it there and nowhere else.

Anything left blank counts as **unknown**. For an unknown, the figure stays as
plain text on the page: no glyph, no motion, no change to its wording.

Facts below were checked against `sovitech-live` (branch `audit/ui-ux`, commit
7e0fc4a) on 22.10.2026.

---

## 1. Base branch for the motion work

- [ ] `audit/ui-ux` (recommended if it ships: it carries the #6B6B6B greys,
      next/image, diacritics and the skip link)
- [ ] `main`

## 2. Reference counts that disagree with /referinte

`/referinte` in `sovitech-live` is the source of truth for client names and
counts. Neither the foundation run nor any sector session may add or restore
entries there. Commit 86fec43 (07.09.2026) removed BMTI Strabag, Spitalul Clinic
Sfânta Maria, Spitalul de Chirurgie Plastică și Arsuri, Hyperion, Actavis,
Monrol and Athénée Palace Hilton.

| Page · KPI | Sector data says | /referinte lists | Choose |
|---|---|---|---|
| Birouri · KPI 4 | 4 (BCR, Floreasca Tower, Ștefan cel Mare, Monaco Towers) | 5 (+ Floreasca Business Park) | [ ] **5**, add Floreasca Business Park to the label (recommended) · [ ] keep 4 |
| Industrial · KPI 2 | 3 (NTN-SNR, Moncler, BMTI Strabag) | 2 non-pharma (NTN-SNR, Moncler; the two Rompharm plants are filed under Industrial but belong to Pharma) | [ ] **2**, drop BMTI Strabag (recommended) · [ ] keep 3 (then it stays plain text) |
| Medical · KPI 1 | 3 (Sfânta Maria, Foișor, Chirurgie Plastică) | 1 (Spitalul Foișor) | [ ] value **1**, label "Referință în spitale: Spitalul Foișor" · [ ] keep 3 as plain text, method "Proiecte din portofoliul Sovitech; pe pagina Referințe apare Spitalul Foișor" |
| Medical · KPI 3 | 303 beds at Sfânta Maria | Sfânta Maria is not listed | [ ] keep as plain text (default) · [ ] replace the cell (write the new value and label): ____ · [ ] confirmed from the project file, still plain text because the hospital is not on /referinte |
| Pharma · KPI 2 | 5 (Rompharm Co, Rompharm Uzbekistan, Hyperion, Actavis, Monrol Eczacıbaşı) | 2 (Rompharm Company, Rompharm Uzbekistan) | [ ] value **2**, label names the two Rompharm plants · [ ] keep 5 as plain text, method "Proiecte din portofoliul Sovitech; pe pagina Referințe apar Rompharm Company și Rompharm Uzbekistan" |

If you want a removed client back on /referinte, make that change yourself, in a
separate commit, before the foundation run. The agents will then see it as the
source.

## 3. Figures to confirm from project files

| Figure | Where it is stated today | Doubt | Confirmed? |
|---|---|---|---|
| NTN-SNR 37.000 m² production floor | sector data, /referinte, testimonial | a 2014 press release gives 27.000 m² for the whole site | [ ] yes, 37.000 · [ ] correct value: ____ · [ ] unknown (plain text) |
| Novotel 258 rooms | sector data, /referinte ("hotel de 258 camere") | none; only the label's scope ("deservit de sistemul BMS livrat") is reworded | [ ] yes · [ ] unknown |

## 4. Claims corrections (details and RO/EN wording in each brief, section "Facts to fix")

- [ ] Approve all as proposed
- [ ] Approve all except: ____

The main ones:
- Birouri KPI 3: the 5-15% stays a band "măsurată în literatura independentă
  (Crowe et al. 2020, LBNL)", the wording the cost article already uses. It is
  never presented as a Sovitech result, and the label gives both paybacks
  (1-3 years for optimisation, 3-6 years for a capital modernisation).
- Retail and Educational KPI 4 (70 kW): the label says the provision is not yet
  transposed and drops "aduce sub obligație…".
- Sport KPI 4 (290 kW): the threshold applies per system family, and
  "depășit doar prin…" is dropped.
- Retail KPI 3, HORECA KPI 4, Industrial KPI 3: drop "deservit(ă) de sistemul
  BMS" in favour of "proiect cu BMS livrat de Sovitech".
- Unsupported card sentences (Birouri card 3 and card 6, HORECA card 1,
  Retail card 2 "40 de locații", Industrial card 3 superlatives): reworded.

The foundation also fixes one plain data bug without needing approval: on the
Sport page, EN KPI 2 says "6" air handling units while RO and the testimonial
say "20". The EN value becomes "20".

## 5. Reference photos

All eight photos lack recorded usage rights.

- Permission to show client buildings as captioned "Referință" cards:
  [ ] yes · [ ] no

  If **no**: [ ] keep today's photo exactly as it is now (no caption, no card) ·
  [ ] show no photo; the figure is labelled "Tip de clădire".
- Swaps (each also changes the photo on the /expertiza index):
  - HORECA: Radisson (old "Radisson SAS" sign; the room KPI is Novotel) →
    `novotel-bucuresti.jpg` (1142×855): [ ] yes · [ ] no
  - Educațional: the school render with a third-party credit →
    `lycee-francais-anna-de-noailles.jpg` (1000×521, the same campus as the
    13.500 m² KPI): [ ] yes · [ ] no
  - Pharma: Rompharm Otopeni (325×203, too small) → `rompharm-uzbekistan.jpg`
    (1280×960, the same plant as the testimonial): [ ] yes · [ ] no
  - Retail: there is **no usable swap** (`roman-value-centre.jpg` is a 3D render
    with a large Carrefour sign). [ ] no reference card, figure labelled
    "Tip de clădire" (recommended) · [ ] keep Pitești, cropped away from the
    eMAG/Auchan signs
  - Industrial: [ ] NTN-SNR (640×360, company logo, location not verified) ·
    [ ] Moncler Bacău (1193×634)

## 6. HeroField pause control (WCAG 2.2.2) and off-screen sleep

- [ ] Sector hero only
- [ ] Every page that uses HeroField (about 20)
- [ ] No

## 7. Capabilities heading

"Software premium, servicii premium." is the same on every sector page.
- [ ] Keep it
- [ ] One heading per sector (proposed in each brief)

## 8. Therme location in captions

- [ ] București (as on /referinte)
- [ ] Balotești, Ilfov (as in the testimonial)

## 9. Educational title

- [ ] "Educațional & Instituții" (the sector page)
- [ ] "Educație & Instituții" (the route metadata and the /referinte category)

## 10. Access control in project scopes

/referinte lists "control acces" for BCR Calea Victoriei and Ambasada Canadei.
Access control is outside Sovitech's execution scope (information only).
- [ ] Leave /referinte as is; the sector pages omit it (default)
- [ ] Remove it from /referinte as well (you make that change)
- [ ] It was in scope on those projects: the sector pages may mention it

## 11. Legal re-check

The status of Directive (EU) 2024/1275 was last verified on 16.08.2026 (BACS
article). Sector sessions re-check it on legislatie.just.ro and EUR-Lex. If a
session cannot reach them, it keeps "verificat la 16.08.2026" and lists the
re-check as open.
- [ ] Fine
- [ ] I will re-verify myself; date: ____
