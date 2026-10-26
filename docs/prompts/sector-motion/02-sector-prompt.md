# Prompt 2 of 2: one sector (run once per sector)

Replace `{{SECTOR}}` with the data slug (for example `civil`). Then paste
everything below the line into a new Claude Code session opened in
`/Users/cristiangaidenic/Documents/code/sovitech-live`.

---

```
SECTOR    = {{SECTOR}}
BRIEF     = docs/sector-motion/sectors/{{SECTOR}}.md
DECISIONS = docs/sector-motion/owner-decisions.md   (the only source of approvals)
ORDER     = civil, horeca, medical, pharma, retail, industrial, educational, sport-si-wellness
```

Use the `bespoke-motion` skill: read SKILL.md and every reference, with
`references/sovitech.md` as the brand file. For the building figure, also use
the `hairline-create` skill. This is the skill's **Page tier**: three pieces,
each reviewed adversarially, then integrated and checked as a whole.

Hairline and CSS only. No GSAP, no ScrollTrigger, no `pin`; sticky is CSS
`sticky top-16`. Muted text on light is `#6B6B6B`.

## 0. Preconditions and git (stop and ask if any fails)

1. **Base branch.** `git log --oneline feat/sector-motion-foundation` must show
   the foundation commits, plus a merge of `feat/sector-motion-<slug>` for
   every sector before {{SECTOR}} in ORDER. If one is missing, stop and ask.
2. **Your branch.** Run `git switch feat/sector-motion-foundation`, then
   `git switch -c feat/sector-motion-{{SECTOR}}`.
3. **Foundation files exist:**
   - `lib/sector-motion/{types.ts,registry.ts,registry.client.ts}`;
   - `components/motion/{hairline-stage,figure-frame,figure-wrapper,sector-kpis,kpi-glyphs,cost-ruler,instrument-card,sector-building}.tsx`;
   - `components/motion/{reveal.css,use-in-view.ts,use-motion-prefs.ts}`;
   - `scripts/hairline-poster.mjs`;
   - `scripts/perf-gate.mjs`;
   - `docs/perf/sector-baseline.json`.

   If any is missing, stop: the foundation is not done.
4. **Read the BRIEF in full; it is the design.** Then read:
   - DECISIONS, and its resolved table for this sector;
   - this sector's entry in `lib/sector-data.ts`, RO and EN. The brief was
     written on 22.10.2026, so the data may have moved since;
   - the matching entries on `/referinte` (`app/referinte/page.tsx`).
5. **Facts gate.** List every figure the motion will draw attention to: the four
   KPIs and anything in an instrument, a read-out or a caption. For each,
   confirm all of these:
   - it is in this repo's sector data or on /referinte;
   - it matches the site sources:
     - `components/articles/{sisteme-bms-cladiri,cost-sistem-bms,modernizare-bms,date-esg-cladiri,obligatie-bacs-legea-372-2005,epbd-2024-romania,monitorizare-calitate-aer-epbd,consum-energie-mai-mare-cladire}.tsx`;
     - `app/servicii/{modernizare-sisteme-de-automatizare-si-bms,executie-sisteme-bms}/page.tsx`;
     - `lib/faqs/modernizare-sisteme-de-automatizare-si-bms.ts`;
     - `lib/role-copy.ts`;
   - /referinte is the only source for client names and counts;
   - its label or method states the domain, whether it is measured or
     estimated, and the baseline. This editorial rule is binding. 38 % is
     banned in any phrasing;
   - EN `metrics[i].value` equals RO `ro.metricValues[i]`. A mismatch is a fact
     to fix.

   The foundation already applied the approved corrections to `sector-data.ts`;
   here you only verify them. A figure that the resolved table marks `plain`,
   or that is unconfirmed or contested, gets **no glyph**: it renders as text,
   and the hand-over says why.
6. **Legal status.** Re-verify the transposition of Directive (EU) 2024/1275
   (Art. 13 alin. 9 lit. b, Art. 13 alin. 10 lit. d) on legislatie.just.ro and
   EUR-Lex (national transposition measures). If you can, write the date you
   checked into the `method` text. If you cannot reach them, keep
   "verificat la 16.08.2026" and list the re-check as open. **Never write a date
   for a check you did not perform.**

## 1. Ownership and files

Before you fan out, create these stubs:

- `lib/sector-motion/{{SECTOR}}.data.ts`: the `SectorMotionData`, with all text
  from the brief, RO and EN;
- `lib/sector-motion/{{SECTOR}}.tsx`: `Glyph` and `Instrument`, re-exported from
  the per-piece files.

Then add the slug to `registry.ts` and `registry.client.ts`.

Per-piece files live under `components/sector-motion/{{SECTOR}}/`:
`kpi-glyphs.tsx`, `instruments.tsx`, and the figure `lib/hairline/<figure>.js`.
**Builders own only their per-piece files.**

You alone own the shared files: `components/motion/*`, `sector-client.tsx`,
`sector-data.ts`, `registry*.ts` and the `.data.ts`. Touch a shared file only to
fix a real defect. If you do, list it in the hand-over with before and after
screenshots of one other sector that already has motion (or of the fixture, for
civil).

If the Workflow or Agent tools are available, run the three pieces as parallel
pipelines (build → fresh-eyes review → fix; see the skill's
`references/orchestration.md`). Otherwise, do them in order.

### A. Hero KPI glyphs

- The foundation's `SectorKpis` draws the band, the reveal and the disclosure.
  You supply each cell's `kind`, `emphasis`, `cost` and `method`, plus any
  bespoke glyph the brief names. For everything else, `Glyph` returns
  `<KindGlyph>`.
- A bespoke glyph fits the 24 px band.
  - It is hairline mint, with no text, digits or letters.
  - Solid strokes draw in with dashoffset. Dashed strokes and discrete marks use
    the clip wipe; nothing counts up.
  - Never draw a client's footprint. Never draw a marker, bar or value for a real
    building against a legal threshold.
  - Words like "proxy", "literatură" and "netranspus" belong in the HTML label
    or the method, not in the SVG.
- `plain` cells keep an empty band.

### B. Capability instruments

- Follow the foundation's **instrument spec** exactly: 64 px square,
  `viewBox` 48, stroke 1.25, structure `#0D2E2B` at 45 %, the moving element in
  `accentOnLight`, no text inside, `aria-hidden`, and the SSR markup equals the
  final state.
- Each instrument is the one the brief names. It tells the card's own point in
  **one or two beats**: the cause in 700 ms, a 150 ms hold, then the response in
  700 ms, at most 1.6 s in total. A third beat is a second idea: cut it.
- Pure inline SVG plus CSS keyed on the card's `[data-play]`, about 1 KB each.
  Cards gain no `tabindex`, and hover replays only from rest.
- Each one should be a drawing of a real object, never a letter, logo or icon.
  Protocol names stay text, in their own casing, in the card copy.

### C. Ce livrăm: "the building, explained"

- **Concept.** The brief names the figure, the object, the gesture (from the
  README's gesture map, so it does not repeat another sector's), the parts table
  and the lap. Do not swap the gesture.
- **Build it with `hairline-create`.**
  - Work in the scratch folder `<session scratchpad>/hl-{{SECTOR}}/`, and run
    `look.mjs` from there until it exits 0 and the look questions are answered.
    The validator must pass.
  - Skip hairline-create's §4 hand-over (no artifact); the figure is handed over
    on this page.
  - To evolve an existing figure (for example `etaje` → `birouri`), reverse-port
    it first (`docs/sector-motion/hairline-reverse-port.md`).
- **The figure file is at most 200 lines.** If it is over, cut in this order:
  1. interior detail of parts that are not lap stops;
  2. secondary equipment;
  3. parts beyond the three lap stops (they keep a POINT on their containing
     solid).

  Never split the file.
- **Parts.**
  - The figure emits stable ASCII part ids. `POINTS` (id → `[x, y]` in the
    400 × 320 viewBox) is derived from a pure `layout()`; never hard-code
    POINTS.
  - At most 6 pickable parts plus 3 context solids. No part may be under
    10 viewBox units at rest. Parts are picked by their rest hulls (rule 01).
  - The bespoke answer (field, dilate time, paint and decay, scrub) acts on the
    **hero part only**, so legend focus, which places a virtual pointer at a
    POINT, never fights the gesture.
- **Legend.**
  - Map each checklist item to one distinct part, as the brief's parts table
    says. Two items never share a part, and at least four items are mapped.
  - An item with no physical part (a procedure, a contract term) stays a plain
    row, and the hand-over says why.
  - Read-outs come only from `parts[].name`. They never contain a value that is
    not in sector data.
- **Port and poster.**
  1. Port the figure with the skill's
     `scripts/hairline-port.mjs <scratch>/<figure>.js lib/hairline/<figure>.js`.
  2. Then, with the page running, generate the poster:
     `node scripts/hairline-poster.mjs http://localhost:3999/expertiza/<url> "#sector-ce-livram" public/hairline/<figure>-poster.svg`.
  3. Look at the poster as a standalone file.
- **Reference card.** It comes from the brief and DECISIONS: caption and alt in
  RO and EN, the photo's natural width and height, never annotated. The figure
  is a generic building type, never the client's building. With no permission,
  or no photo, show the brief's `typeLabel` instead.

## 2. Verify (your own eyes, real numbers)

Run everything against `pnpm build && pnpm start -p 3999`, not the dev server:
dev prints warnings that fail the shooter.

- **Screenshots.** Use shoot.mjs from the bespoke-motion skill on
  `http://localhost:3999/expertiza/<url>`:
  - viewports `desktop,laptop,phone,se,landscape`, plus `--reduced`;
  - `--section "#sector-hero"` and `--section "#sector-ce-livram"`, sampling the
    lap;
  - a `zoom` on the figure at 1440 and at 390. Check the edge, mid and lo
    strokes on `#FFFFFF`; nothing that carries meaning is drawn in `lo`.

  Make contact sheets with `sheet.mjs` and look at every one.
- **JS off.** Use a playwright context with `javaScriptEnabled: false`. Every
  sector-data string must be in the DOM and visible, the poster must show
  instead of the figure, and the KPI method notes must be listed.
- **Keyboard only.** Test the KPI disclosures (open, Escape, focus return), the
  legend pins, Escape, and Pause. Focus must be visible and distinct from the
  active state.
- **EN toggle.** Every new string is translated, and the layout holds.
- **StrictMode.** Exactly one svg per `[data-hairline]`.
- **Perf.** Run
  `node scripts/perf-gate.mjs --compare docs/perf/sector-baseline.json` on this
  page. The **budget**:
  - initial JS at most +8 KB gz, covering the glyphs and instruments;
  - the Ce livrăm chunk (kernel + figure + SectorBuilding) at most 16 KB gz,
    loading only on approach and only on this sector;
  - page total at most +24 KB gz;
  - LCP element is still the H1, with the median within ±50 ms;
  - CLS at most 0.001 after a full scroll;
  - no long task over 100 ms attributed to motion.
- **Phone legibility.** At 390 px, no information-bearing text is under 10 px,
  and the figure is at least 85 % of the width.

## 3. Fresh-eyes review, then fix

Spawn a reviewer with no stake in the build (or do the review yourself if there
are no subagents). It uses the skill's `references/verification.md` checklist
plus the facts gate above, takes its own screenshots, and reports issues with
severity, evidence and a fix. Fix every critical and major issue, then verify
again.

## 4. Hand-over

- Commit on `feat/sector-motion-{{SECTOR}}`, staging by path. Never commit
  `package-lock.json`, and do not push.
- Report:
  - the three pieces: what each shows and how it behaves;
  - the files;
  - perf numbers against the baseline;
  - screenshots, desktop and phone;
  - every figure left as plain text, and why;
  - any shared-file fix, with its screenshots;
  - open owner questions;
  - the local URL to check.
- Ask the owner to review. **Only on the owner's OK in this session**, run
  `git switch feat/sector-motion-foundation` and
  `git merge --no-ff feat/sector-motion-{{SECTOR}}`. Do not push.
- End with: "Next sector: <the next slug in ORDER>."

## Acceptance criteria (all must hold)

1. KPI values and labels are identical in the SSR HTML and after hydration, with
   no count-up anywhere. Opening a method moves nothing outside the KPI grid.
2. Every glyph-emphasised figure states its domain, whether it is measured or
   estimated, and its baseline, in the cell or its method. Nothing the resolved
   table marks `plain` has a glyph. No glyph contains text.
3. Six instruments, each true to its card's copy in at most two beats, follow the
   instrument spec. Reduced motion shows the final states.
4. The building figure passes the hairline validator and the look. Its legend is
   the mapped checklist items (at least 4, each a distinct part), and unmapped
   rows render as plain text. Lap, pin, Escape, Pause, sr-only and sticky on
   phones all work. The poster renders with JS off.
5. The reference card is captioned, lazy, at its natural aspect ratio and never
   annotated. Sectors without a usable photo show the type label.
6. The perf gate is within budget, with no console errors and no horizontal
   overflow at any viewport. The JS-off and reduced-motion versions are
   designed, not broken.
