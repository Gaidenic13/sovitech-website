# Prompt 1 of 2: foundation (run once, before any sector)

Fill in `owner-decisions.md` (next to this file) first. Then paste everything
below the line into a new Claude Code session opened in
`/Users/cristiangaidenic/Documents/code/sovitech-live`.

---

```
PACK      = /Users/cristiangaidenic/Documents/code/Sovitech Website Code/docs/prompts/sector-motion
DECISIONS = $PACK/owner-decisions.md   (filled in by the owner; read it first)
OLD_REPO  = /Users/cristiangaidenic/Documents/code/Sovitech Website Code   (source of the Hairline kit; never build there)
PROD_REPO = /Users/cristiangaidenic/Documents/code/sovitech-productie       (local clone of production, gitlab sovitechcontrol/website-v2)
```

Use the `bespoke-motion` skill. Read its SKILL.md and every reference it points
to; the brand file is `references/sovitech.md`. Verify everything you claim with
real screenshots and measurements.

## Goal

Prepare `sovitech-live` so that each sector page (`/expertiza/<sector>`) can get
bespoke motion in its own later session, by **filling slots in a typed contract**
rather than editing shared code. This run changes no sector's look beyond the
shared upgrades listed below. A sector without a motion module must render
exactly as it does today.

## Rules for every task

- **No GSAP, no ScrollTrigger, no `pin`.** Sector pages use Hairline and CSS only.
  Sticky is CSS `sticky top-16`.
- **Never hide text that exists in the server HTML** unless the hiding is behind
  the reveal gate (Task 6). Never touch the H1, subhead, CTAs or KPI values.
- **/referinte is the source of truth** for client names and counts. Never add,
  remove or restore entries there. If a KPI and /referinte disagree and DECISIONS
  does not resolve it, the KPI keeps its current text and gets no glyph.
- **Muted text on light is `#6B6B6B`** in this repo. The `#888888` some old notes
  mention is stale.
- **Stage files by path.** Never `git add -A`, and never commit `package-lock.json`
  (this is a pnpm repo, and an untracked one is lying in the tree). Do not push.
- When a task says "verify", look at a screenshot or a measured number, not just
  a type check.

## Facts (verified 22.10.2026; re-check what you rely on)

- **Production** is gitlab `sovitechcontrol/website-v2` master @ `8609b73`.
  `PROD_REPO` has fetched it (`origin/master` = 8609b73). Production's sector
  files equal this repo's, except for `components/hero-field.tsx`. In 8609b73
  that file adds:
  - `powerPreference: "low-power"`;
  - an IntersectionObserver pause at `threshold: 0.05`;
  - `frameInterval = 28` (~35 fps);
  - a load-plus-idle boot (`requestIdleCallback`, timeout 1500);
  - half-resolution rendering.

  **Trap:** this repo has a stale remote-tracking ref `prod/master` at `09900e7`,
  the parent before those changes. Never use it.
- **The page.** `app/expertiza/[sector]/page.tsx` is a server component:
  `generateStaticParams` over the published registry slugs, plus RO metadata. It
  renders `sector-client.tsx` (`"use client"`; server-rendered in RO, EN through
  `useLanguage().t`). Section order:
  1. hero: HeroField, accent bar, breadcrumb, pill, H1 with `\n`, subhead,
     2 CTAs, 2×2 KPI grid;
  2. the "De încredere pentru" strip;
  3. Capabilități: `sector.features`, 6 cards with lucide icons, hard-coded H2;
  4. Ce livrăm: `sector.capabilities` plus `sector.image` as a 4:3 photo;
  5. related sectors;
  6. CTA.
- **Data.** `lib/sector-data.ts` holds 10 sectors, each with 4 metrics, 6
  features, 6 capabilities and a testimonial. The RO overlay
  (`localizeSector`) works by index. The file ships whole to every sector page
  (~22 KB gz), so keep motion data **out** of it.
- **Header.** It is sticky `h-16` and measures 65 px, so sticky stages use `top-16`.
- **Old-repo numbers, indicative only.** Task 2 re-measures them.
  - Offices page, emulated mid phone: about 226 KB gz JS, LCP element the H1
    (about 1.20 s), CLS 0, TBT about 70 ms.
  - On phones the KPI grid starts near y≈970, below the fold, and values wrap
    to two lines in cells about 164 px wide.
- **Lessons from the /test sandbox in OLD_REPO. Do not repeat these.**
  - An entrance `rise()` hid text until hydration: it moved LCP and shipped 14
    invisible blocks without JS.
  - `pin: true` gave CLS 0.9+.
  - Hairline stages were 0 px tall in SSR because the aspect ratio arrived with
    the kernel CSS.
  - GSAP timelines built at hydration made a 2 s long task at 4× CPU.

## Tasks

### 1. Branch, pack and decisions (first commit, no app change)

1. Read `DECISIONS`. If it is not filled in, stop and ask.
2. Run `git switch <base from decision 1>`, then
   `git switch -c feat/sector-motion-foundation`.
3. Copy `$PACK/sectors/*.md` → `docs/sector-motion/sectors/`, and
   `$PACK/00-README.md` and `$PACK/02-sector-prompt.md` → `docs/sector-motion/`.
   From now on, the copies in this repo are the ones sector sessions read.
4. Copy `$PACK/tools/*.mjs` → `scripts/perf/`.
5. Write `docs/sector-motion/owner-decisions.md`: the owner's answers verbatim,
   followed by a **resolved table** with one row per sector and KPI. Each row
   says `glyph` / `plain` / `changed to …` and cites the decision. Add rows for
   each sector's photo, permission and heading. Sector sessions read only this
   file for approvals.
6. Commit only these paths:
   "docs: sector-motion pack, owner decisions, perf probes".

### 2. Pre-change baseline (before any app edit)

On that commit, the app is still untouched.

1. Run `pnpm build && pnpm start -p 3999`. If `next start` cannot run, use
   `scripts/perf/serve.mjs`, which cannot serve `/_next/image`; record that it
   was the fallback.
2. Run the probes on every published sector (5 runs each; see Task 10 for the
   profiles and statistics). Save the results as
   `docs/perf/sector-baseline.pre.json`.
3. Take before-screenshots of every published sector:

   ```bash
   node ~/.claude/skills/bespoke-motion/scripts/shoot.mjs --url http://localhost:3999/expertiza/<url> --out docs/perf/shots-pre/<slug> --viewports desktop,laptop,phone,se,landscape --reduced
   ```

   The probes use `playwright-core` from `~/Library/Caches/hairline-look`. If it
   is missing, run the hairline-create skill's `look.mjs` once to install it.
4. Commit: "perf: pre-change baseline".

### 3. HeroField from production

1. Run `git -C "$PROD_REPO" fetch origin master`, then
   `git -C "$PROD_REPO" show 8609b73:components/hero-field.tsx > components/hero-field.tsx`.
2. Check that the file contains `low-power`, `threshold: 0.05` and
   `frameInterval = 28`. If any is missing, or the fetch fails, stop and ask.
3. Diff the result against the old file and keep nothing else from it.
4. Commit.

### 4. Port the Hairline kit (from OLD_REPO, where it is uncommitted)

- `lib/hairline/kernel.js`, unchanged (MIT; keep the header). Also port
  `flux.js`, `tablou.js` and `etaje.js` as starting points.
- `components/hairline-stage.tsx` → `components/motion/hairline-stage.tsx`.
- `components/test/figure-frame.tsx` → `components/motion/figure-frame.tsx`.
- `components/flux-figure.tsx` → `components/motion/figure-wrapper.tsx`. It is
  the pattern: names to ids, ids to POINTS, `paused`.
- Write `docs/sector-motion/hairline-reverse-port.md` with the steps for turning
  a ported figure back into a bench figure, so it can go through `look.mjs`
  again:
  1. drop the 3-line header and `import HL from "./kernel"`;
  2. add `const { … } = HL;`;
  3. turn `export const POINTS…` and `export const <name> = {…}` back into the
     trailing `hairline({…});`.

  Then do this once for `etaje.js` to prove it: the bench copy must pass
  `look.mjs`. Keep that bench copy in the session scratchpad, never in the repo.

### 5. Shared stage upgrades (SSR-correct, StrictMode-safe)

- **`HairlineStage`.**
  - Reserve its box in SSR with an inline `aspect-ratio` from a prop, so the box
    exists before the kernel CSS.
  - Keep `paused`, `onRead`, the real-pointer guard and the separate lap effect.
  - Add a `poster` prop: the URL of a static SVG. Render it as
    `<img src alt="" aria-hidden width height decoding="async" loading="lazy">`
    in a sibling `div.absolute.inset-0` inside the reserved box, **not** as a
    child of `[data-hairline]`.
  - Drop the poster after the kernel's first frame, to avoid a blank flash.
  - Add `HAIRLINE_ON_WHITE`, because Ce livrăm sits on `bg-white`. The plate is
    `#FFFFFF`. Each stroke keeps the contrast ratio that `HAIRLINE_ON_LIGHT`
    has on its cream plate. Interior detail uses `mid`, never `lo`.
- **`FigureFrame`.** `announce` stays opt-in. Add `tone="white"`.
- **`scripts/hairline-poster.mjs <url> <section-selector> <out.svg>`.**
  1. Open the page with playwright-core and `reducedMotion: "reduce"`, so the
     lap does not run and the figure sits at rest.
  2. Wait for `[data-hairline] > svg`, then serialise it with every computed
     paint value inlined as attributes: `fill`, `stroke`, `stroke-width`,
     `stroke-dasharray`, `stroke-linecap`, `stroke-linejoin`, `opacity`,
     `vector-effect`.
  3. Remove the classes, round coordinates to one decimal place, and set
     `width`/`height` from the viewBox.
  4. Write the file to `public/hairline/<figure>-poster.svg`. It must render
     correctly as a standalone file in a browser with JS off; check that with a
     screenshot.

### 6. Motion primitives

- **`components/motion/reveal.css`** (imported once).
  - Start states exist only under
    `@media screen and (scripting: enabled) and (prefers-reduced-motion: no-preference)`.
  - Add a CSS keyframe failsafe that reveals everything after about 4 s.
  - Never apply it to the H1, the subhead, the CTAs or KPI values.
- **`components/motion/use-in-view.ts`.** A one-shot IntersectionObserver with a
  `rootMargin` option. It also returns true when the element is already above
  the viewport on load (restored scroll).
- **`components/motion/use-motion-prefs.ts`.** Only for JS behaviour: laps,
  timers, the lazy figure load. Anything that changes layout or visible copy is
  chosen by CSS media queries in the SSR markup: the Pause button
  (`motion-reduce:hidden`), the touch versus hover hint
  (`@media (pointer: coarse)`), static versus animated captions. That way the
  server markup is already right.

### 7. The per-sector contract

Create `lib/sector-motion/types.ts`, exactly this shape (you may add fields,
never remove them):

```ts
export type L = { ro: string; en: string }
export type KpiKind = "range" | "count" | "quantity" | "threshold" | "code" | "principle" | "zero"

export interface KpiCell {
  kind: KpiKind
  emphasis: "glyph" | "plain"          // plain = text only (contested, unconfirmed, nothing honest to draw)
  cost?: { band: [number, number]; ghost?: [number, number]; proxy?: boolean } // EUR/mp, on the shared 0-80 ruler
  method: L                            // source · domain · measured or estimated · baseline · check date (legal)
}

export interface BuildingPart {
  id: string                           // ASCII id the figure emits ("acoperis", "etaj2"); key into POINTS
  checklist: number | null             // index into sector.capabilities this part answers; null = context part
  name: L                              // read-out and legend preview text
  states?: Record<string, L>           // optional: the figure may emit "<id>:<state>" (e.g. "camera:libera"); the read-out then uses states[state]
}

export interface SectorMotionData {    // lib/sector-motion/<slug>.data.ts: serialisable only, no JSX
  kpis?: [KpiCell, KpiCell, KpiCell, KpiCell]   // index-aligned with sector.metrics
  capabilitiesHeading?: L              // only if owner decision 7 = per sector
  building?: {
    figure: string                     // lib/hairline/<figure>.js
    aspect: number                     // viewBox width / height
    poster: string                     // "/hairline/<figure>-poster.svg", made by scripts/hairline-poster.mjs
    stageLabel: L                      // aria-label of the stage: what the drawing shows
    tag: L                             // FigureFrame tag
    hint: { pointer: L; touch: L }     // chosen by CSS (pointer: fine / coarse)
    parts: BuildingPart[]              // at most 6; each checklist index appears at most once
    lap: [string, string, string]      // POINTS keys, in order (usually part ids; a lap-only point on a part is allowed); then rest
    reference?: { caption: L; alt: L; width: number; height: number } // the photo is sector.image
    typeLabel?: L                      // shown instead of a reference card
  }
}
```

Wiring:

- **Server data.** `lib/sector-motion/registry.ts` exports
  `motionData: Record<slug, () => Promise<{ default: SectorMotionData }>>` with
  one explicit `import()` per slug. `app/expertiza/[sector]/page.tsx` awaits it
  and passes the result to `SectorPageClient` as a `motion` prop. The method
  texts, part names, captions, alts and headings then sit in the SSR HTML and in
  that page's payload only. Never load visible content in `useEffect`.
- **Client UI.** `lib/sector-motion/registry.client.ts` (`"use client"`) maps
  each slug to `next/dynamic` components with SSR left on:
  - `Glyph({ index, cell })` returns that cell's bespoke glyph, or
    `<KindGlyph cell={cell} />` from `components/motion/kpi-glyphs.tsx`.
  - `Instrument({ index })` returns that card's instrument, or `null`; for
    `null` the card shows today's lucide icon.

  It also maps each slug to `figure: () => import("@/lib/hairline/<figure>")`,
  a plain `import()` that `SectorBuilding` calls only on approach. The figure
  module exports `<camelName>` and `POINTS` (part id → `[x, y]` in the 400 × 320
  viewBox), derived from a pure `layout()` inside the figure.
- **Defaults.** A slug with no entry renders today's markup, unchanged.
- **Prove the slots before any sector exists.** Add a dev-only fixture: a
  `lib/sector-motion/fixture.data.ts` plus `fixture.tsx` that fill **every**
  slot, using `etaje` as the figure, a poster made with the script, and one
  instrument and one bespoke glyph. Activate it with `?motion-fixture=1` only
  when `process.env.NODE_ENV !== "production"`.
  - Screenshot it on the offices page at desktop and phone.
  - Then confirm with `grep` that no fixture string is in `.next/static` after
    `pnpm build`.

  The fixture stays in the repo as a dev harness. That also avoids file
  deletion, which some sandboxes refuse.

### 8. Hook components (in `sector-client.tsx`: a minimal, reviewed diff)

Give the three sections `id="sector-hero"`, `id="sector-capabilitati"` and
`id="sector-ce-livram"`.

**`components/motion/sector-kpis.tsx`**

- **Values and labels are today's SSR text**, final and visible at first paint.
  No count-ups, ever.
- **Surface.** Move the cells to the DESIGN-SYSTEM glass recipe for legibility
  over the WebGL field:
  - `bg-[#07201C]/75`, with a 1 px gradient hairline shell;
  - labels at `text-white/60` or more.
- **Glyph band.** Each cell has a fixed **24 px glyph band at its top**, in the
  same position in all four cells. It holds `Glyph` and is `aria-hidden`.
  - Glyphs never contain text, digits or letters.
  - Strokes are mint `#C8E6C9` at 70-80 %; the sector accent never carries
    information here.
  - A `plain` cell has an empty band (the band keeps its height).
- **Reveal.**
  - Solid strokes draw in with `stroke-dashoffset` and `pathLength="1"`.
  - Dashed strokes and groups of discrete marks (ticks, dots) never use dashoffset.
    They are revealed by a `clip-path: inset()` wipe from left to right, so the
    dash pattern shows in every frame and nothing appears to count.
  - Timing: 700 ms on `cubic-bezier(.32,.72,0,1)`, with a 75 ms stagger.
  - On desktop the grid is above the fold, so it plays after `load` plus idle.
    On phones it plays on view.
  - The start state exists only under the reveal gate.
- **`components/motion/kpi-glyphs.tsx`** (default glyph by kind):
  - `range` with `cost`: the cost ruler below.
  - `count`: one tick per counted item. Above 12 items, draw a short ruler with
    one tick per item.
  - `quantity`: a generic square outline that closes. Never a client's footprint.
  - `threshold`: the dashed line the brief names. Never a marker or a bar for a
    real building.
  - `code`: no SVG. Draw a 1 px CSS underline under each token of the value text
    (`IQ`, `OQ`, `PQ`) with `scaleX`, token by token.
  - `principle` and `zero`: nothing by default.
- **`components/motion/cost-ruler.tsx`.** One hairline scale from 0 to 80 EUR/mp
  for every cost band, so sectors can be compared.
  - Ticks at 0, 40 and 80 only; the numbers stay in the value text.
  - The band is solid; `ghost` is an outline only; `proxy` is dashed.
  - The minimum drawn band width is 12 px.
- **Method disclosure.**
  - The whole cell is a `<button type="button" aria-expanded aria-controls>`.
    Its target is at least 24 px. It shows a visible 11 px mono cue,
    "sursă +" / "source +".
  - Opening it shows the method panel **over the grid's own box**: the grid
    wrapper is `relative`, and the panel is `absolute inset-0` with the same
    glass and `overflow-y-auto`. The panel holds the cell's value, its `method`
    text (13 px, white/80) and a close button.
  - Focus moves to the panel heading (`tabindex=-1`). Escape or close returns
    focus to the cell.
  - Only one panel is open at a time. Nothing outside the grid moves.
  - No JS: render the four methods as a small numbered note list under the grid,
    visible only under `@media (scripting: none)`.

**`components/motion/instrument-card.tsx` and the instrument spec**

Every sector follows this spec:

- **Size.** The icon square grows to 64 px (`w-16 h-16`), with the same tint and
  position. Inside, `viewBox="0 0 48 48"`.
- **Strokes.** 1.25 px, `vector-effect: non-scaling-stroke`, round caps and
  joins, `fill: none` except small dots.
- **Colour.**
  - Structure is `#0D2E2B` at 45 %.
  - The moving element uses `accentOnLight`: the sector accent when it reaches
    3:1 on the card surface (measure it).
  - Otherwise: civil and medical use `#0D2E2B` at 100 %, educational uses
    `#B14A36`.
- **Content.** At most one moving element per beat, plus one reference mark (a
  band, a line, a tick). No text, digits, letters or icons inside.
  `aria-hidden="true"`; the card's text carries the information.
- **Static state.** The SSR markup draws the **final state**, designed as a
  thumbnail. It is also the reduced-motion and no-JS state.
- **Timing.**
  - Beat 1 (the cause) runs 700 ms on the lift curve, then a 150 ms hold, then
    beat 2 (the response) runs 700 ms. The total is at most 1.6 s.
  - It plays once on view. Cards that enter together stagger 75 ms in reading
    order.
  - It replays on pointer hover, only from rest; ignore re-entry while it
    plays.
  - The card sets `data-play` on itself, and the instrument's CSS keyframes
    key on it. Instruments are stateless SVG components.
- **The card.** It gains no `tabindex`. Card hover stays colour-only. A 1 px top
  rule draws in on view.

**`components/motion/sector-building.tsx`**

Model it on these files from OLD_REPO, but do not copy their `rise()`:

- `components/test/etaje-section.tsx`: sticky figure on phones, lift-panel
  legend, sr-only picks, `FOCUS_RING` with `outline-solid`;
- `components/test/tablou-section.tsx`: 180 ms debounced lap read-out,
  pin/Escape, Pause, the coarse-pointer hint;
- the wrapper ported in Task 4.

Requirements:

- **Layout, phone.** Wrap the heading, the figure (`sticky top-16`, static under
  `@media (max-height: 560px)`) and the legend. Put the reference card after
  that wrapper, so sticky releases before the photo.
- **Layout, desktop.** Left column: heading, legend, then the reference card
  (at most 280 px wide, caption below). Right column: the figure in
  `FigureFrame tone="white"`, `sticky top-24`.
- **Legend.**
  - Checklist items that some `parts[].checklist` points to become buttons:
    hover and focus preview, click pins with `aria-pressed`, Escape releases.
  - The other checklist items render as plain rows with the same typography.
  - Add a visible Pause/Play button.
  - An sr-only line announces **user** picks only, never the lap.
  - The hint comes from `building.hint`, chosen by CSS.
  - Visible focus: `focus-visible:outline-solid outline-1` in the accent. Never
    combine it with `outline-none`.
- **Figure loading.**
  - The stage reserves `building.aspect` in SSR and shows `building.poster`.
  - The figure chunk (kernel + figure) is fetched by `import()` when the section
    is within one viewport (`rootMargin: "100% 0px"`), and never before `load`.
  - Under reduced motion the figure still loads (pointer and keyboard work), but
    the lap never runs.
- **Lap.**
  - Three stops from `building.lap`; read-outs are debounced 180 ms so no part
    flashes in passing.
  - It sleeps off-screen and pauses on the Pause button.
  - The figure emits part ids; the component localises them through
    `parts[].name`.
- **Reference card.** It uses `sector.image` at its **natural aspect ratio** (the
  data's width and height); never crop it to 4:3. It has a caption,
  `loading="lazy" decoding="async"`, no zoom, no parallax, and is never
  annotated with systems. Without `reference`, show `typeLabel` and no photo.

**Fallback.** A sector with no `building` keeps today's list plus photo.

### 9. HeroField pause (per owner decision 6)

1. Keep the 8609b73 behaviour and add a `paused` prop.
2. HeroField is `pointer-events-none aria-hidden`, so the Pause/Play text button
   lives in the hero section, outside HeroField: bottom-right, 11 px mono,
   `motion-reduce:hidden`, at least 24 px target.
3. Apply it to the scope the owner chose (sector heroes only, or every page
   with HeroField).
4. Never create a second WebGL context.

### 10. Shared fixes the motion will expose (all sectors, RO and EN)

- **EN headings.** Some are built from `title.toLowerCase()` ("Everything your
  offices needs.", "Ready to optimise your offices building?"). Give them proper
  per-sector EN strings.
- **Photo `alt` text.** Ce livrăm's `alt` describes what the photo shows and
  names the building. It is an exterior, not "an installation".
- **Accents on the dark hero.** Add `accentOnDark`: mint `#C8E6C9` for every
  accent under 4.5:1 on `#07201C`:
  - pharma 1.17:1;
  - HORECA and sport 2.65:1;
  - entertainment 3.17:1;
  - industrial and data centres 3.28:1;
  - retail 4.13:1.

  Use it for the breadcrumb, pill and accent bar.
- **Accents on white.** Add `accentOnLight` per the instrument spec.
- **Hover.** Remove `hover:scale-[1.02]` from the sector index tiles and related
  cards, and `hover:scale-105` from the /expertiza index images. These are
  low-resolution sources, and the brand rule is colour-only hover.
- **"De încredere pentru" strip.** Do not show it on sectors without their own
  projects.
- **Capabilities heading.** If decision 7 = per sector, the heading comes from
  `motion.capabilitiesHeading` (SSR), with "Software premium, servicii premium."
  as the fallback.

### 11. Facts and data

- **Approved corrections.** Apply the owner-approved corrections from the briefs
  (section "Facts to fix") to `lib/sector-data.ts`, RO **and** EN, exactly as
  worded there.
- **Unapproved figures** stay as they are. The resolved table marks them
  `plain`.
- **Data parity bug.** For every sector, compare `metrics[i].value` (EN) with
  `ro.metricValues[i]`. Today Sport KPI 2 is EN "6" and RO "20" (the testimonial
  says 20), so set the EN value to "20". Report any other mismatch.
- **Approved photo swaps** change `image` in `sector-data.ts`, so /expertiza
  follows too.
- **Pharma name.** Spell it "Eczacıbaşı" (Turkish ş with a cedilla) wherever the
  name stays.
- Do not touch `/referinte` entries (see the rules at the top).

### 12. Perf gate and post-foundation baseline

Write `scripts/perf-gate.mjs` from the probes in `scripts/perf/`:

- Run against `pnpm build && pnpm start -p 3999`.
- **Profiles.**
  - Phone: 390×844, DPR 3, CPU 4×, 1.6 Mbps / 150 ms.
  - Desktop: 1440×900.
- **Five runs per page and profile.** Compare medians.
- **Pass conditions:**
  - the LCP element is the H1 in every run;
  - the median LCP is within ±50 ms of the baseline;
  - the maximum CLS over the runs is at most 0.001, after a full scroll;
  - no long task over 100 ms is attributed, by CPU profile, to motion chunks
    (`kernel`, the figure, `components/motion`, `components/sector-motion`).
    The baseline already has non-motion long tasks; report them, but fail only
    on motion.
- **JS sizes.** Sum `zlib.gzipSync` sizes of the script files the page loads.
  - **initial**: everything loaded before `load`;
  - **figure chunk**: what loads when Ce livrăm approaches;
  - **total**: after a full scroll.
- **Output.** JSON per page. `--compare <file>` prints the deltas and exits 1 on
  failure.

Run it on all published sectors and save `docs/perf/sector-baseline.json`. This
post-foundation baseline is the one sector sessions compare against. Also
report the deltas against `sector-baseline.pre.json`.

### 13. Verify, review, fix

1. `pnpm build` passes.
2. Take shoot.mjs screenshots of every published sector (desktop, laptop, phone,
   se, landscape, reduced). Compare them with `docs/perf/shots-pre/`: only the
   intended shared upgrades may differ.
3. No console errors, and no horizontal overflow.
4. JS off (a playwright context with `javaScriptEnabled: false`): every
   sector-data string is in the DOM and visible.
5. The fixture shows every slot working.
6. The perf gate's deltas against the pre-baseline are only the intended ones.

Then have a fresh-eyes review subagent check the work with the skill's
`references/verification.md` checklist. Fix every critical and major finding,
then verify again.

## Hand-over

Commit on `feat/sector-motion-foundation`, by path; do not push. Report:

- what changed and why;
- the contract (paste `types.ts`);
- where the fixture is and how to open it;
- the perf numbers, pre versus post;
- screenshots (desktop and phone, one sector);
- the resolved decisions table;
- anything the owner must still decide.

End with: "Foundation ready. Next: run 02-sector-prompt.md with SECTOR=civil."
