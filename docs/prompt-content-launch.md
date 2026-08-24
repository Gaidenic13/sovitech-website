# Prompt: publish the first content wave (articles + site copy + data corrections)

Copy everything below the line into a fresh session in this repo.

---

You are working in the Sovitech Control website repo (Next.js 16 App Router, React 19, Tailwind v4, bilingual RO/EN via `lib/language-context.tsx` → `t(ro, en)`, RO default). The dev server runs via the Browser pane. The route registry at `lib/site-routes.ts` is the single source of truth for URLs: routes are generated only for entries with `status: "published"`, planned slugs 404, and the sitemap reads from it.

The content source of truth is the Google Drive folder `1sxhm4Lq4-KRGi26e86O5WBDRhA_Wm-tf`. Read these before touching anything:

- `00A - Index` (`1DnWLkZvlCTaNqxu_PJu27oTGGXhmphng1sSE95XaO7c`) — the 10 final RO articles with their publication URLs, categories and diagram lists
- `12 - Corectii pe site si in motorul ROI` (`1hT_AGxv0b6VdpXCfY1vtGA01sNUT63P98t3E_RAkfUo`) — binding data corrections
- `15 - Reguli de linkuri interne si de publicare` (`15e8iLQwhiAAt4hXb7xwF9gR7IkbvQsUHaUYLDjbQKcU`) — link-degradation rules
- `13 - Ghid de stil redactional` and `11 - Registrul de cifre` — style and figure rules
- Subfolder `Copy site (text final pe pagini)` (`1dr_AiN6Qrdqi_JG52Mrc2w9W0lqUuvzD`) — final page copy C1–C7
- Subfolder `Diagrame (SVG si PNG)` (`131i9p4WQry1Ng365y4ElmG6vNHmLvMY4`) — article diagrams

Work in three phases, in this order. Build (`npx next build`) and typecheck after each phase; verify rendered pages in the browser at desktop and at a **true 375px** viewport (assert `window.innerWidth === 375` before trusting any mobile result — the pane silently clamps).

## Phase 0 — decisions baked into this prompt

- **Slugs: the 00A index wins** over both doc 15 and the current registry (it is the newest, and the EN pairing is defined against it). Update `lib/site-routes.ts` so the five differing slugs match 00A: `scada-vs-bms`, `cost-sistem-bms`, `epbd-2024-romania`, `kpi-performanta-cladire`, `monitorizare-calitate-aer-epbd`. Nothing published links to the old slugs, so no redirects are needed for them.
- **The tool URL** is `/instrumente/test-obligatie-bacs` (matches the registry; doc 00A's blocker note left it open — pick this and note it in the summary).
- **Homepage stats use doc 12 Variant A** (5–15% total / 1–3 ani optimizare / 10–20% HVAC, each with its domain in the label). The referinte page uses the Variant-C approach: technical work descriptions, no performance percentages.
- **EN articles are OUT of scope.** They require server-rendered `/en/` routes and hreflang — a separate architecture task. Do not create `/en` routes; do not delete the EN registry-adjacent notes.
- **Author byline**: every article footer renders "Echipa de inginerie Sovitech Control" for now, and every ported file carries a `// TODO(author):` comment. Do not invent a person. Do not emit `Person` schema until a real engineer signs.

## Phase 1 — data corrections (doc 12, applied exactly)

1. `components/stats-section.tsx`: remove **38%** and **6,1 ani**; replace with Variant A values, RO and EN labels both carrying the domain ("din consumul total al clădirii", "pe consumul HVAC…"). Keep 250.000+ m², 30+ projects, 15+ years. Also make the counters SSR-honest: render the final value in HTML and animate only the transition (crawlers currently read literal `0`).
2. `app/referinte/page.tsx`: delete the 35/42/28/15% impact tiles and the aggregate percentage tiles that lack a methodology; replace the section with technical-scope cards per doc 12's Therme/Rompharm models (points count, equipment, protocols, commissioning constraints — only verifiable facts). Where a project lacks those facts, describe the scope in words with no numbers.
3. `lib/roi-calculator.ts`: replace `COST_PER_SQM = 25` with the per-building-type band from doc 12 (`office_a {9,13,18}` … `pharma {30,50,80}`), defaulting to the `typical` value and mapping the calculator's existing industry types onto the bands. Savings: add the domain dimension (whole-building 5–15 default / HVAC 10–20 / FDD 5–15) and show it next to the result. Payback: output an interval per intervention type (1–3 / 1–2 / 3–6 ani), never a single decimal. Under every result render the methodology line linking to `/calculator-roi/metodologie`.
4. Sweep the remaining known contradictions: Therme must be ~34.000 m² everywhere (fix the 8.000 m² case-study claim to "peste 8.000 m² de spații climatizate deservite de sistemul BMS" only if that's what the source copy says — otherwise align to the referinte figure); kill every remaining "38%" (grep the whole repo, including case-study headlines like "a redus costurile cu 38%"); remove the fabricated people ("Andrei Popescu" author/testimonial, "Ion Popescu" and "Alexandru Ionescu" testimonials, "Dr. Elena Ionescu", "Dan Georgescu") — the C-copy in Phase 2 replaces those blocks, so prefer replacing over patching.
5. Rule for every figure you touch, sitewide: **domain in the same sentence, measured vs calculated stated, baseline stated** — or the figure goes.

## Phase 2 — site copy (Copy site folder, C1–C7)

Apply the final copy to the existing pages, RO and EN both (the C-docs carry RO; write faithful EN yourself in the site's existing EN register, since the C-docs are the binding RO text):

- **C1** → `app/page.tsx` (hero, despre-noi section), new `app/despre-noi/page.tsx`, `app/contact/page.tsx`
- **C2** → new legal pages (`/termeni`, `/confidentialitate`, `/cookies` — kebab slugs per the doc), wire the footer's legal links to them (they currently all point at `/contact`), and apply the global elements copy
- **C3** → the four existing service pages plus the two `planned` ones: create `/servicii/modernizare-sisteme-de-automatizare-si-bms` and `/servicii/consultanta` from the C3 text and flip them to `published` in the registry
- **C4** → the sector pages in `lib/sector-data.ts`; if C4 defines pharma as its own sector, split it from medical, add the `expertiza` entry, and replace the pharma→medical alias redirect with the real page
- **C5** → the 8 role pages: the copy becomes a per-persona intro block rendered by `components/role-page.tsx` above the generated link lists
- **C6** → `/ghid`, `/instrumente`, `/resurse` hub copy, the six `/resurse/<categorie>/` archive pages (create them — they're the link-degradation targets doc 15 depends on; drive them from the registry's `category` field so each archive lists its articles automatically), and the dictionary **only if** C6 contains finished term entries; otherwise leave `/dictionar` planned
- **C7** → `/cerere-oferta`, `/calculator-roi` framing copy, `/produse` intro

While applying copy, give **every page it touches** unique `<title>`/description metadata (the audit found one global template on all non-product pages) and a canonical. No em dashes anywhere in anything you write — use comma, colon, parentheses, or a full stop, matching the site's established convention.

## Phase 3 — the 10 RO articles

Port each article from its final Drive doc (IDs in 00A) into the site:

- **Mechanics**: set the registry entry to `status: "published"`; render through `EntryShell` (`components/entry-shell.tsx`) with the article body as children. Part A of each doc supplies title tag, meta description (both already character-counted — use them verbatim), slug, category. Part C is the body. Part B (cover-image brief) is NOT rendered; save it as a comment or skip it.
- **Body conversion**: H2/H3 with diacritics and stable `id` anchors (ASCII, hyphenated — doc 15 defines the scheme); tables as real `<table>` inside an `overflow-x-auto` wrapper; the "Pe scurt" list, FAQ block and concluding CTA preserved. Wrap it in a typographic prose container consistent with the site (light weight, `#0D2E2B` on cream, generous measure ~70ch).
- **Diagrams**: download the SVGs listed for each article in 00A from the Diagrame folder into `public/diagrame/`, replace each `[DIAGRAMA: …]` marker with the matching SVG and a translated caption via `t()`. If an SVG is missing, render nothing and log it in the final summary — never leave the bracket text visible.
- **Internal links**: use the registry. Links to published pages are real; links to unpublished articles point to the **category archive** with a category-appropriate anchor text; links to `/pentru/*` and `/dictionar/*` degrade to plain text; links to `/instrumente/*` point to `/contact` with a "Cere…" anchor (doc 15, rules a–e). Record every degraded link in a `// LINKS-TO-REACTIVATE:` comment block at the top of the article file.
- **Language**: the articles are RO-only for now. Render them regardless of the toggle (do not hide RO content in EN mode; the EN pages come later at `/en/`).
- **Schema**: emit `Article` + `BreadcrumbList` + `FAQPage` JSON-LD per article (absolute URLs, `dateModified` from the doc's verification date). No `Person` (Phase 0 decision).
- **Figures**: as you port, verify every percentage against doc 11's register bands; if a sentence has a bare percentage, add the domain from the canonical table in doc 15 §2.

## Verification and done criteria

- `npx next build` and `npx tsc --noEmit` clean.
- Crawl every internal link on all new/changed pages (published pages 200, degraded links resolve to their archive/contact targets) — zero 404s.
- `grep` proves: no `38%` anywhere, no em dash in new content, no `[DIAGRAMA`, no `[TO BE SUPPLIED]`/`[TO BE PROVIDED]` (any casing), no `Andrei Popescu`/`Ion Popescu`/`Alexandru Ionescu`.
- Sitemap contains exactly the published registry entries plus the new static pages; archives and articles present, planned slugs absent.
- Screenshot one pillar (`/ghid/sisteme-bms-cladiri`) and one cluster at desktop and true 375px; confirm tables scroll inside their container and the page has zero horizontal overflow.
- Final summary lists: pages created, articles published with their URLs, every degraded link recorded for reactivation, missing diagrams, and anything in the Drive copy you could not apply verbatim and why.

Do not commit; leave everything in the working tree for review.
