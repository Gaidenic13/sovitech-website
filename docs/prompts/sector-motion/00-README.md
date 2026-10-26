# Sector pages in motion: how to run it

This pack adds bespoke, interactive motion to every sector page
(`/expertiza/<sector>`) of sovitech.ro. It runs as one foundation session, then
**one session per sector**. Every session works in
`/Users/cristiangaidenic/Documents/code/sovitech-live`, never in this repo:
this repo's sector data is stale.

## The files

| File | Use |
|---|---|
| `owner-decisions.md` | Fill in first. Holds the 11 decisions only you can make. The foundation copies it into the target repo, and every sector session reads it there. |
| `01-foundation.md` | Run **once**, first. It brings this pack into the target repo, measures a baseline, ports HeroField and the Hairline kit, and builds the shared motion components and the per-sector contract. It also applies the approved fact fixes and adds a perf gate. |
| `02-sector-prompt.md` | Run **once per sector**. Replace `{{SECTOR}}` with the data slug from the table below. |
| `sectors/<slug>.md` | The design for one sector: its building type, hero KPI glyphs, capability instruments, the Ce livrăm figure with its parts table, the reference card, and the facts to fix. |
| `tools/*.mjs` | Measurement probes from the audit (static server, vitals, CPU profile, long tasks, layout shifts). The foundation turns them into `scripts/perf-gate.mjs`. |

## Order and git flow

1. Fill in `owner-decisions.md`.
2. Open a new Claude Code session in `sovitech-live` and paste
   `01-foundation.md`. It creates `feat/sector-motion-foundation` from the base
   branch in decision 1 and commits there. It does not push.
3. Review the foundation (it ends with screenshots and a URL list). On your OK,
   the session leaves the branch ready; nothing is merged to `main`.
4. For each sector, open a new session in `sovitech-live` and paste
   `02-sector-prompt.md` with `{{SECTOR}}` replaced. The session creates
   `feat/sector-motion-<slug>` from `feat/sector-motion-foundation`. Go in this
   order (richest data first, so civil proves the system):
   `civil` → `horeca` → `medical` → `pharma` → `retail` → `industrial` →
   `educational` → `sport-si-wellness`.
5. After each sector, review it on a phone and a laptop. When you say OK in that
   session, it merges `feat/sector-motion-<slug>` into
   `feat/sector-motion-foundation` (`--no-ff`, no push). The next sector
   session will not start until the previous one is merged.
6. When you are ready to ship, merge `feat/sector-motion-foundation` into
   `main` yourself (or tell a session to do it), then follow the usual ship
   flow (sovitech `main` → website-v2 `master` → Netlify). No session pushes
   without your explicit OK.

`entertainment` and `centre-de-date` are `planned` in production (a 301 to
/expertiza). Run them only after they are published. Their briefs are complete,
but their facts must be checked again at that point.

| Data slug | Public URL | Brief |
|---|---|---|
| `civil` | /expertiza/cladiri-de-birouri | `sectors/civil.md` |
| `horeca` | /expertiza/horeca | `sectors/horeca.md` |
| `medical` | /expertiza/medical | `sectors/medical.md` |
| `pharma` | /expertiza/pharma | `sectors/pharma.md` |
| `retail` | /expertiza/retail | `sectors/retail.md` |
| `industrial` | /expertiza/industrial | `sectors/industrial.md` |
| `educational` | /expertiza/educational | `sectors/educational.md` |
| `sport-si-wellness` | /expertiza/sport-si-wellness | `sectors/sport-si-wellness.md` |
| `entertainment` | (planned) | `sectors/entertainment.md` |
| `centre-de-date` | (planned) | `sectors/centre-de-date.md` |

## Gesture per sector (so the family does not repeat itself)

Each Ce livrăm figure answers the hand in its own way. A visitor who opens two
sector pages should see two different ideas. Do not change a sector's gesture
to one its neighbour already uses.

| Sector | Figure | Gesture |
|---|---|---|
| civil | `birouri` | **Scrub and pick.** The pointer's height picks one of 6 levels, and each level answers one checklist item. |
| horeca | `hotel` | **One of many.** The room grid; each room's dot shows its state (free: no dot, sold: dim dot). |
| medical | `spital` | **One of many.** Pressure is drawn as ceiling height; the isolation room sits below the corridor. |
| pharma | `inregistrator` | **Dilate time.** The EMS recorder's strip advances on its own, and hovering slows it so a trace can be read. |
| retail | `parc-retail` | **One of many along a row.** The unit under the pointer slides forward (the `tablou` pattern). |
| industrial | `hala` | **Field.** The pointer on the hall floor shows the air column above that spot. |
| educational | `campus` | **Paint and decay.** CO₂ rises where the hand passes, and the dampers clear it. |
| sport-si-wellness | `bazin` | **Field.** Vapour rises where the pointer is over the water. |
| entertainment (planned) | `sala` | **Scrub.** x is the event timeline (doors open, full house, interval, empty). |
| centre-de-date (planned) | `centru-date` | **One of many.** Racks; the worst of three intake dots answers. |

## What "done" looks like for a sector

- **Hero.** Four KPI cells on a glass surface. Each has one micro-glyph, drawn
  by the kind of figure, in a fixed 24 px band at the top of the cell, so the
  row reads like a drafting strip. Values and labels are real text from the
  first paint, and nothing counts up. Tapping a cell opens its source and
  domain in a panel over the grid's own box, so nothing else moves. Contested
  or unconfirmed figures stay as plain text.
- **Capabilities.** Six cards. Each icon square becomes a small instrument that
  tells the card's point in one or two beats. It plays when the cards enter and
  again on hover, never in a way that needs words inside the drawing.
- **Ce livrăm.** A Hairline figure of the building type, built around the
  sector's gesture. The checklist items with a physical part (at least four)
  become its legend. It has a self-playing three-stop lap, plus pointer,
  keyboard, touch and a visible pause. The real reference photo sits beside
  it as a captioned "Referință" card at its natural aspect ratio. A sector
  without its own project gets a "Tip de clădire" label instead.
- **Budget.**
  - The H1 stays the LCP element, and the median LCP stays within ±50 ms of
    the baseline.
  - CLS is at most 0.001, including a full scroll.
  - No long task over 100 ms is attributed to motion code.
  - Initial JS grows by at most 8 KB gz. The Ce livrăm chunk is at most 16 KB gz
    and loads only when the section approaches the viewport.
  - Reduced motion and no-JS each get a designed version, and the page works
    on a phone first.
