#!/usr/bin/env node
// Builds the LinkedIn carousel "Sisteme BMS pentru clădiri" (1080 × 1350, 4:5) in RO and EN:
//   node build.mjs [ro|en|all]
//   -> ../out/<file>.pdf (exact 1080 × 1350 px pages), ../out/<lang>/slide-NN.png, ../out/<lang>/sheet-slide.png
// Figures are the site's own Hairline figures (lib/hairline), mounted live in the page and printed as vectors.
import { createRequire } from "node:module";
import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { META, SLIDES } from "./content.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "../../../..");
const OUT = resolve(HERE, "../out");
const SHEET = join(homedir(), ".claude/skills/bespoke-motion/scripts/sheet.mjs");
const langs = (process.argv[2] || "all") === "all" ? ["ro", "en"] : [process.argv[2]];

// ── the site's Hairline modules, bundled into one classic script ──────────────
function bundle() {
  const kernel = readFileSync(join(ROOT, "lib/hairline/kernel.js"), "utf8").replace(/\nexport default HL\s*$/, "\n");
  const mod = (name) => {
    const src = readFileSync(join(ROOT, `lib/hairline/${name}.js`), "utf8")
      .replace(/^import HL from "\.\/kernel"\s*$/m, "")
      .replace(/^export const /gm, "const ");
    return `window.FIG_${name} = (() => {\n${src}\nreturn { figure: ${name}, POINTS };\n})();\n`;
  };
  return kernel + "\nwindow.HL = HL;\n" + ["flux", "tablou"].map(mod).join("\n");
}

// Print palettes: a little heavier than the site's, because a phone shows this page at a third of its size.
const PALETTE = {
  dark: { plate: "#07201C", hi: "#C8E6C9", edge: "#86AC9E", mid: "#527A6E", lo: "#33584F" },
  light: { plate: "#F5F4F0", hi: "#0D2E2B", edge: "#3F5653", mid: "#6F807C", lo: "#9AA6A2" },
};
const b64 = (p) => readFileSync(join(ROOT, p)).toString("base64");
const LOGO = { dark: b64("public/logo-white.svg"), light: b64("public/logo.svg") };

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
// Typesetting: ranges as non-breaking en dashes, compounds and law numbers kept whole, short words off line ends.
const nb = (s) =>
  esc(s)
    .replace(/(\d)-(\d+%?)/g, '<span class="nw">$1–$2</span>')
    .replace(/(\p{L})-(\p{L})/gu, "$1‑$2")
    .replace(/CO₂/g, "CO<sub>2</sub>")
    .replace(/\b(peste|over) (\d)/g, "$1 $2")
    .replace(/\b(Legea|Law|Directiva|Directive) /g, "$1 ")
    .replace(/(\d) (ani|years|de|kW|EUR|min)\b/g, "$1 $2")
    .replace(/(^|\s)(\S{1,2}) (?=\S)/g, "$1$2 ");
const dash = (s) => String(s).replace(/(\d)-(\d)/g, "$1–$2");

// ── slide renderers ──────────────────────────────────────────────────────────
function title(t, lang, big = 88) {
  const [a, b] = t[lang];
  const small = b && b.length > 24;
  return `<h2 class="title" style="--ts:${big}px"><span>${nb(a)}</span>${b ? `<span class="sub ${small ? "small" : ""}">${nb(b)}</span>` : ""}</h2>`;
}
const label = (s, lang) => (s?.label ? `<p class="label">• ${esc(s.label[lang])}</p>` : "");
const note = (s, lang) => (s.note ? `<p class="note">${nb(s.note[lang])}</p>` : "");
function figure(f, lang, tone, cls = "") {
  return `<figure class="frame ${cls}"><i class="tk tl"></i><i class="tk tr"></i><i class="tk bl"></i><i class="tk br"></i>
    <figcaption>${esc(f.tag[lang])}</figcaption>
    <div class="stage" data-fig="${f.name}" data-tone="${tone}" data-lang="${lang}" ${f.pick ? `data-pick="${f.pick}"` : ""} ${f.callout ? `data-callout="${esc(f.callout)}"` : ""}></div></figure>`;
}

const R = {
  cover: (s, L) => `
    <p class="eyebrow">• ${esc(s.eyebrow[L])}</p>
    <h1 class="title hero"><span>${nb(s.title[L][0])}</span><span>${nb(s.title[L][1])}</span><span class="accent">${nb(s.accent[L])}</span></h1>
    <p class="body lead">${nb(s.body[L])}</p>
    <div class="grow center">${figure(s.figure, L, "dark", "fill")}</div>`,

  legal: (s, L) => {
    const X = (d) => 40 + 137.3 * d; // years since 2024 → x
    const at = { due: X(0.997), future: X(5.997) };
    return `
    ${label(s, L)}${title(s.title, L, 80)}
    <svg class="timeline" viewBox="0 0 904 92" aria-hidden="true">
      ${["2024", "2025", "2026", "2027", "2028", "2029"].map((y, i) => `<text x="${X(i + 0.5)}" y="26" text-anchor="middle" class="yr">${y}</text>`).join("")}
      <line x1="${X(0)}" y1="52" x2="${X(6)}" y2="52" class="ln"/>
      ${[0, 1, 2, 3, 4, 5, 6].map((i) => `<line x1="${X(i)}" y1="44" x2="${X(i)}" y2="60" class="ln"/>`).join("")}
      <line x1="${at.due}" y1="52" x2="${at.due}" y2="92" class="ln on"/>
      <line x1="${at.future}" y1="52" x2="${at.future}" y2="92" class="ln"/>
      <circle cx="${X(2.41)}" cy="52" r="8" class="dot-hollow"/>
      <text x="${X(2.41)}" y="86" text-anchor="middle" class="yr sm">29.05</text>
      <circle cx="${at.due}" cy="52" r="12" class="dot-on"/>
      <circle cx="${at.future}" cy="52" r="10" class="dot-m"/>
    </svg>
    <div class="marks">${s.marks.map((m) => `<div class="mk ${m.state}"><p class="mono">${m.date}</p><p class="mk-big">${nb(m.big)}</p><p class="mk-a">${nb(m[L][0])}</p><p class="mk-b">${nb(m[L][1])}</p>${m[L][2] ? `<p class="mk-q">${nb(m[L][2])}</p>` : ""}</div>`).join("")}</div>
    <div class="fine"><p>${nb(s.fine[L])}</p></div>
    <div class="grow"></div>${note(s, L)}`;
  },

  verbs: (s, L) => `
    ${label(s, L)}
    <h2 class="verbs">${s.verbs[L].map((v, i) => `<span class="${i === 2 ? "accent" : ""}">${esc(v)}</span>`).join("")}</h2>
    <p class="body">${nb(s.body[L])}</p>
    <blockquote>${nb(s.quote[L])}</blockquote>
    <div class="grow"></div>${note(s, L)}`,

  levels: (s, L) => `
    ${label(s, L)}${title(s.title, L)}
    <div class="levels grow">
      <div class="lv-rows">${s.levels.map((l, i) => `<div class="lv"><p class="lv-k"><span class="mono">${L === "en" ? "L" : "N"}${3 - i}</span>${esc(l.k[L])}</p><p class="lv-w">${nb(l.what[L])}</p><p class="lv-c">${nb(l.check[L])}</p></div>`).join("")}</div>
      <div class="lv-fig">${figure(s.figure, L, "light", "tall")}</div>
    </div>`,

  list: (s, L) => `
    ${label(s, L)}${title(s.title, L)}
    <ol class="rows">${s.items.map((it, i) => `<li><span class="mono idx">${String(i + 1).padStart(2, "0")}</span><div><p class="row-k">${esc(it.k[L])}</p><p class="row-v">${nb(it.v[L])}</p></div></li>`).join("")}</ol>
    <div class="grow"></div>`,

  protocols: (s, L) => `
    ${label(s, L)}${title(s.title, L, 80)}
    <div class="proto-fig">${figure(s.figure, L, s.tone, "wide")}</div>
    <div class="proto">${s.rows.map((r) => `<div class="pr"><span class="pr-k">${nb(r.k)}</span><span class="pr-v">${nb(r[L])}</span></div>`).join("")}</div>`,

  closed: (s, L) => {
    const xs = [70, 261, 452, 643, 834];
    return `
    ${label(s, L)}${title(s.title, L)}
    <p class="body">${nb(s.body[L])}</p>
    <svg class="years" viewBox="0 0 904 150" aria-hidden="true">
      <text x="${xs[4]}" y="26" text-anchor="end" class="callout-t">${esc(s.mark[L].toUpperCase())}</text>
      <line x1="${xs[4]}" y1="40" x2="${xs[4]}" y2="76" class="ln on"/>
      <line x1="10" y1="88" x2="894" y2="88" class="ln"/>
      ${xs.map((x, i) => `<line x1="${x}" y1="78" x2="${x}" y2="98" class="ln"/><text x="${x}" y="136" class="yr ${i === 4 ? "on" : ""}" text-anchor="middle">${s.years[L].toUpperCase()} ${i + 1}</text>`).join("")}
      <circle cx="${xs[0]}" cy="88" r="9" class="dot-m"/><circle cx="${xs[4]}" cy="88" r="13" class="dot-on"/>
    </svg>
    <p class="kicker">• ${esc(s.formulaTitle[L])}</p>
    <ul class="formula">${s.formula[L].map((f) => `<li><i></i>${nb(f)}</li>`).join("")}</ul>`;
  },

  numbers: (s, L) => `
    ${label(s, L)}${title(s.title, L)}
    <div class="nums">${s.numbers.map((n) => `<div class="num"><p class="n">${esc(dash(L === "en" && n.nEn ? n.nEn : n.n))}</p><p class="nc">${nb(n[L])}</p></div>`).join("")}</div>
    <div class="grow"></div>${note(s, L)}`,

  cost: (s, L) => `
    ${label(s, L)}${title(s.title, L)}
    <div class="nums">${s.numbers.map((n) => `<div class="num"><p class="n">${esc(dash(n.n))}${n.unit ? `<span class="u">${esc(L === "en" && n.unitEn ? n.unitEn : n.unit)}</span>` : ""}</p><p class="nc">${nb(n[L])}</p></div>`).join("")}
      <div class="num miss"><p class="miss-k">${esc(s.missing.k[L])}</p><p class="miss-v">${nb(s.missing.v[L])}</p></div></div>
    <div class="grow"></div>${note(s, L)}`,

  cards: (s, L) => `
    ${label(s, L)}${title(s.title, L)}
    <div class="cards">${s.items[L].map((it, i) => `<div class="card ${i === s.highlight ? "on" : ""}"><p class="mono idx">${String(i + 1).padStart(2, "0")}${i === s.highlight ? `<span class="tag">${esc(s.tag[L])}</span>` : ""}</p><p class="card-t">${nb(it)}</p></div>`).join("")}</div>
    <div class="grow"></div>${note(s, L)}`,

  numbered: (s, L) => `
    ${label(s, L)}${title(s.title, L)}
    <ol class="steps">${s.items[L].map((it, i) => `<li><span class="mono idx">${String(i + 1).padStart(2, "0")}</span>${nb(it)}</li>`).join("")}</ol>
    <div class="grow"></div>${note(s, L)}`,

  roles: (s, L) => `
    ${label(s, L)}${title(s.title, L)}
    <div class="roles">${s.roles.map((r, i) => `<div class="role"><p class="role-k"><span class="mono">0${i + 1}</span>${esc(r.k[L])}</p><p class="role-v">${nb(r.v[L])}</p></div>`).join("")}</div>
    <div class="grow"></div>${note(s, L)}`,

  cta: (s, L) => `
    <h2 class="title cta-t"><span>${nb(s.title[L][0])}</span><span class="accent">${nb(s.accent[L])}</span></h2>
    <p class="body">${nb(s.body[L])}</p>
    <div class="grow center">${figure(s.figure, L, "dark", "fill")}</div>
    <div class="cta">
      <p class="kicker">• ${esc(s.ctaTitle[L])}</p>
      <p class="url">${META[L].url}</p>
      <p class="cta-sub">${nb(s.ctaSub[L])}</p>
    </div>`,
};

// ── page ─────────────────────────────────────────────────────────────────────
const CSS = `
@page { size: 1080px 1350px; margin: 0 }
* { box-sizing: border-box; margin: 0; padding: 0 }
html, body { background: #555; -webkit-print-color-adjust: exact; print-color-adjust: exact }
body { font-family: Inter, system-ui, sans-serif; -webkit-font-smoothing: antialiased }
.slide { width: 1080px; height: 1350px; position: relative; overflow: hidden; display: flex; flex-direction: column;
  padding: 150px 88px 172px; break-after: page; background: var(--bg); color: var(--ink) }
.slide > * { flex-shrink: 0 }
.slide.dark { --bg: #07201C; --ink: #FFFFFF; --mut: rgba(255,255,255,.74); --dim: rgba(255,255,255,.6); --acc: #C8E6C9; --line: rgba(255,255,255,.15); --line2: rgba(255,255,255,.4); --tile: rgba(255,255,255,.04) }
.slide.light { --bg: #F5F4F0; --ink: #0D2E2B; --mut: rgba(13,46,43,.78); --dim: rgba(13,46,43,.7); --acc: #1F6B4A; --line: rgba(13,46,43,.14); --line2: rgba(13,46,43,.4); --tile: #FFFFFF }
.grid::before { content: ""; position: absolute; inset: 0; pointer-events: none;
  background-image: linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px);
  background-size: 54px 54px; opacity: .4;
  -webkit-mask-image: radial-gradient(ellipse 70% 55% at 60% 70%, #000 10%, transparent 72%); mask-image: radial-gradient(ellipse 70% 55% at 60% 70%, #000 10%, transparent 72%) }
.mono, .chrome, figcaption, .idx { font-family: "JetBrains Mono", ui-monospace, monospace; letter-spacing: .12em; text-transform: uppercase }
.label, .eyebrow, .kicker { font-family: Inter, sans-serif; font-weight: 600; letter-spacing: .1em; text-transform: uppercase; color: var(--acc) }
.chrome { position: absolute; left: 88px; right: 88px; display: flex; justify-content: space-between; align-items: center; font-size: 24px; color: var(--dim); z-index: 2 }
.chrome.top { top: 46px; padding-bottom: 20px; border-bottom: 1px solid var(--line) }
.chrome.top .count { color: var(--ink) }
.chrome.bot { bottom: 52px; border-top: 1px solid var(--line); padding-top: 26px }
.chrome.bot img { height: 52px; width: auto; display: block }
.chrome > span:first-child, .chrome .swipe { font-family: Inter, sans-serif; font-weight: 600; letter-spacing: .1em }
.chrome.bot .swipe { color: var(--acc); font-size: 24px }
.nw { white-space: nowrap }
sub { font-size: .62em; vertical-align: baseline; position: relative; top: .28em }
svg .yr.sm { font-size: 22px }
.slide[data-i="1"] .chrome.bot .swipe { font-size: 30px; color: var(--ink) }
.label { font-size: 24px; margin-bottom: 26px; position: relative; z-index: 1 }
.eyebrow { font-size: 24px; margin-bottom: 30px; line-height: 1.4 }
.title { font-weight: 300; font-size: var(--ts, 88px); line-height: 1.08; letter-spacing: -.045em; display: flex; flex-direction: column; margin-bottom: 38px; text-wrap: balance; position: relative; z-index: 1 }
.title .sub { color: var(--dim) }
.title .sub.small { font-size: .56em; letter-spacing: -.025em; line-height: 1.16; margin-top: .3em; color: var(--mut) }
.title.hero { font-size: 104px; line-height: 1.02; margin-bottom: 32px }
.accent { color: var(--acc) }
.body { font-size: 34px; line-height: 1.38; font-weight: 300; color: var(--mut); max-width: 880px; text-wrap: pretty; position: relative; z-index: 1 }
.body.lead { font-size: 32px; max-width: 880px }
.note { font-size: 27px; line-height: 1.38; color: var(--mut); margin-top: 26px; text-wrap: pretty; font-weight: 300 }
.grow { flex: 1 1 0 !important; min-height: 0; flex-shrink: 1 !important }
.center { display: flex; justify-content: center; align-items: center; padding-top: 28px }
.frame { position: relative; border: 1px solid var(--line); border-radius: 2px; margin: 0 }
.frame .tk { position: absolute; width: 22px; height: 22px; border-color: var(--acc); opacity: .75 }
.tk.tl { left: -1px; top: -1px; border-left: 2px solid; border-top: 2px solid } .tk.tr { right: -1px; top: -1px; border-right: 2px solid; border-top: 2px solid }
.tk.bl { left: -1px; bottom: -1px; border-left: 2px solid; border-bottom: 2px solid } .tk.br { right: -1px; bottom: -1px; border-right: 2px solid; border-bottom: 2px solid }
figcaption { position: absolute; left: 22px; top: 18px; font-size: 24px; color: var(--dim); z-index: 1; white-space: nowrap }
.frame.fill { height: 100%; width: 100%; max-width: 904px }
.frame .stage { width: 100%; height: 100% }
.stage { display: block }
.frame.tall { width: 100%; aspect-ratio: 5/6 }
.frame.wide { width: 100%; height: 352px }
svg text.callout-t, .stage svg text.callout-t { font: 500 26px "JetBrains Mono", monospace; letter-spacing: .12em; fill: var(--acc) }
.verbs { display: flex; flex-direction: column; font-weight: 300; font-size: 118px; line-height: 1.04; letter-spacing: -.05em; margin: 6px 0 40px }
blockquote { font-size: 31px; line-height: 1.38; font-weight: 400; color: var(--ink); border-left: 2px solid var(--acc); padding: 6px 0 6px 30px; margin-top: 38px; text-wrap: pretty }
.levels { display: grid; grid-template-columns: 1fr 400px; gap: 44px; align-items: start }
.lv-rows { display: flex; flex-direction: column }
.lv { border-top: 1px solid var(--line); padding: 18px 0 20px }
.lv-k { font-size: 44px; font-weight: 300; letter-spacing: -.03em; display: flex; align-items: baseline; gap: 18px; margin-bottom: 8px }
.lv-k .mono { font-size: 24px; color: var(--acc) }
.lv-w { font-size: 29px; line-height: 1.32; color: var(--mut); font-weight: 300; text-wrap: pretty }
.lv-c { font-size: 29px; line-height: 1.32; color: var(--acc); margin-top: 10px; text-wrap: pretty }
.lv-fig { padding-top: 1px }
.rows { list-style: none; display: flex; flex-direction: column }
.rows li { display: grid; grid-template-columns: 74px 1fr; padding: 15px 0; border-top: 1px solid var(--line) }
.idx { font-size: 24px; color: var(--acc); padding-top: 10px }
.row-k { font-size: 36px; font-weight: 300; letter-spacing: -.025em; margin-bottom: 6px }
.row-v { font-size: 28px; line-height: 1.3; color: var(--mut); font-weight: 300; text-wrap: pretty }
.proto-fig { margin: 0 0 22px }
.proto { display: flex; flex-direction: column }
.pr { display: grid; grid-template-columns: 180px 1fr; align-items: baseline; padding: 11px 0; border-bottom: 1px solid var(--line) }
.pr:last-child { border-bottom: 0 }
.pr-k { font-size: 36px; font-weight: 300; letter-spacing: -.02em; color: var(--acc) }
.pr-v { font-size: 28px; line-height: 1.3; color: var(--mut); font-weight: 300 }
svg .ln { stroke: var(--line2); stroke-width: 2; fill: none }
svg .ln.on { stroke: var(--acc) }
svg .dot-on { fill: var(--acc) } svg .dot-m { fill: var(--dim) } svg .dot-hollow { fill: var(--bg); stroke: var(--line2); stroke-width: 2.5 }
svg .yr { font: 500 26px "JetBrains Mono", monospace; letter-spacing: .1em; fill: var(--dim) }
svg .yr.on { fill: var(--acc) }
.years { width: 100%; height: auto; margin: 40px 0 34px }
.kicker { font-size: 24px; margin-bottom: 16px }
.formula { list-style: none; border-top: 1px solid var(--line) }
.formula li { text-wrap: balance; display: flex; gap: 22px; align-items: baseline; font-size: 31px; line-height: 1.28; font-weight: 300; padding: 15px 0; border-bottom: 1px solid var(--line) }
.formula li:last-child { border-bottom: 0 }
.formula i { flex: none; width: 14px; height: 14px; background: var(--acc); border-radius: 1px; transform: translateY(-4px) }
.nums { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: var(--line); border: 1px solid var(--line) }
.num { background: var(--bg); padding: 18px 24px 20px }
.n { font-size: 68px; font-weight: 300; letter-spacing: -.045em; line-height: 1; color: var(--acc); display: flex; align-items: baseline; gap: 12px; white-space: nowrap }
.u { font: 400 30px Inter, sans-serif; letter-spacing: 0; color: var(--dim) }
.nc { font-size: 27px; line-height: 1.3; color: var(--mut); font-weight: 300; margin-top: 12px; text-wrap: pretty }
.num.miss { background: linear-gradient(var(--tile), var(--tile)), var(--bg); outline: 2px solid var(--acc); outline-offset: -2px }
.miss-k { font-size: 24px; font-weight: 600; letter-spacing: .1em; text-transform: uppercase; color: var(--acc); margin-bottom: 12px }
.miss-v { font-size: 29px; line-height: 1.32; font-weight: 400; color: var(--ink); text-wrap: pretty }
.timeline { width: 100%; height: auto; margin-top: 8px; display: block }
.marks { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; border-top: 1px solid var(--line2) }
.mk { padding-top: 22px }
.mk.due { border-top: 3px solid var(--acc); margin-top: -2px }
.mk .mono { font-size: 26px; color: var(--dim) }
.mk.due .mono { color: var(--acc) }
.mk-big { font-size: 70px; font-weight: 300; letter-spacing: -.04em; line-height: 1.05; margin: 6px 0 8px }
.mk.future .mk-big { color: var(--dim) }
.mk-a { font-size: 30px; line-height: 1.3; font-weight: 400 }
.mk-b { font-size: 28px; line-height: 1.32; color: var(--mut); font-weight: 300; margin-top: 8px; text-wrap: pretty }
.mk-q { font-size: 28px; line-height: 1.32; color: var(--mut); font-weight: 300; margin-top: 14px; text-wrap: pretty }
.fine { margin-top: 24px; border: 1px solid var(--line); background: var(--tile); padding: 22px 28px; border-radius: 2px }
.fine p { font-size: 29px; line-height: 1.35; font-weight: 400; text-wrap: balance }
.cards { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: var(--line); border: 1px solid var(--line) }
.card { background: var(--bg); padding: 16px 22px 18px; min-height: 0 }
.card .idx { padding-top: 0; display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px }
.card .tag { font-size: 24px; letter-spacing: .06em; color: var(--bg); background: var(--acc); padding: 4px 10px; border-radius: 1px }
.card-t { font-size: 29px; line-height: 1.26; font-weight: 300; color: var(--mut); text-wrap: pretty }
.card.on { background: var(--tile); box-shadow: none; outline: 2px solid var(--acc); outline-offset: -2px }
.card.on .card-t { color: var(--ink); font-weight: 400 }
.steps { list-style: none; border-top: 1px solid var(--line) }
.steps li { display: grid; grid-template-columns: 66px 1fr; font-size: 28px; line-height: 1.22; font-weight: 300; padding: 9px 0; border-bottom: 1px solid var(--line); text-wrap: pretty }
.steps li:last-child { border-bottom: 0 }
.steps li .idx { padding-top: 5px }
.roles { display: flex; flex-direction: column; border-top: 1px solid var(--line) }
.role { padding: 24px 0 26px; border-bottom: 1px solid var(--line) }
.role:last-child { border-bottom: 0 }
.role-k { font-size: 40px; font-weight: 300; letter-spacing: -.025em; line-height: 1.1; margin-bottom: 12px; display: flex; align-items: baseline; gap: 18px }
.role-k .mono { font-size: 24px; color: var(--acc) }
.role-v { font-size: 30px; line-height: 1.36; font-weight: 300; color: var(--mut); text-wrap: pretty }
.cta-t { font-size: 80px }
.cta { margin-top: 34px }
.url { font-size: 40px; font-weight: 400; letter-spacing: -.01em; margin-bottom: 14px; color: var(--ink) }
.cta-sub { font-size: 28px; line-height: 1.36; font-weight: 300; color: var(--mut); text-wrap: pretty }
`;

// The three levels of a BMS, drawn with the Hairline kernel: field, automation, supervision.
const NIVELURI = `
function mountNiveluri(stage, svg, lang) {
  const { Cam, fit, proj, facing, rings, prism, put, solid, mk, rrect, poly, seg } = HL;
  svg.setAttribute("viewBox", "0 0 400 480");
  const W = 120, D = 84, T = 4, LV = [0, 62, 124];
  const C = Cam(45, 0.5, 2.05);
  const pts = [];
  for (const z of LV) for (const [x, y] of [[0,0],[W,0],[0,D],[W,D]]) pts.push([x, y, z], [x, y, z + T]);
  pts.push([30, 40, 124 + T + 44]);
  fit(C, pts, 214, 244);
  const P = proj(C), front = facing(C);
  const g = mk("g", {}, svg);
  const box = (x0, y0, x1, y1, z0, z1, r = 2.5, b = 1.1) => { const [ring, inner] = rings(x0, y0, x1, y1, r, b); const s = solid(g); put(s, prism(P, front, ring, inner, z0, z1)); return s; };
  const disc = (cx, cy, R, z0, z1, b = 1) => { const s = solid(g); put(s, prism(P, front, rrect(cx-R, cy-R, cx+R, cy+R, R, 14), rrect(cx-R+b, cy-R+b, cx+R-b, cy+R-b, R-b, 14), z0, z1)); return s; };
  const line = (d, cls = "nf lo") => mk("path", { d, class: cls }, g);
  const dot = (p, cls) => { const c = mk("circle", { r: 1.6, class: cls }, g); c.setAttribute("cx", p[0]); c.setAttribute("cy", p[1]); return c; };
  const guides = (z0, z1) => line([[0,0],[W,0],[0,D],[W,D]].map(([x, y]) => seg(P(x, y, z0 + T), P(x, y, z1))).join(""), "nf dash");
  const tag = (z, i) => { const p = P(0, D, z + T / 2); const t = mk("text", { x: (p[0] - 12).toFixed(1), y: (p[1] + 4).toFixed(1), "text-anchor": "end", class: "callout-t lvt" }, svg); t.textContent = (lang === "en" ? "L" : "N") + i; };

  const zf = LV[0] + T;
  box(0, 0, W, D, LV[0], zf, 4, 1.4);
  line(seg(P(22, 22, zf), P(98, 22, zf)) + seg(P(22, 22, zf), P(22, 62, zf)) + seg(P(22, 62, zf), P(70, 62, zf)));
  disc(22, 22, 3.6, zf, zf + 2); disc(22, 22, 1.3, zf + 2, zf + 12, .4); disc(22, 22, 6.5, zf + 12, zf + 17, 1.1);
  box(92, 14, 104, 30, zf, zf + 18, 2, 1);
  line(poly(rrect(17, zf + 9, 25, zf + 15, 3, 10).map((q) => P(104, q.u, q.v))), "nf");
  box(48, 58, 86, 66, zf, zf + 5, 3, 1); box(61, 55, 73, 69, zf, zf + 11, 2.5, 1);
  disc(67, 62, 1.2, zf + 11, zf + 16, .4); disc(67, 62, 5.5, zf + 16, zf + 18, 1);
  guides(LV[0], LV[1]);

  const za = LV[1] + T;
  box(0, 0, W, D, LV[1], za, 4, 1.4);
  box(28, 30, 92, 50, za, za + 34, 2.5, 1.2);
  for (let i = 0; i < 6; i++) { const x0 = 32 + i * 9.6; line(poly([P(x0, 50, za + 8), P(x0 + 7.6, 50, za + 8), P(x0 + 7.6, 50, za + 22), P(x0, 50, za + 22)]), i === 1 ? "nf hi" : "nf"); dot(P(x0 + 2.2, 50, za + 19), i === 1 ? "dot" : "dot off"); }
  line(seg(P(30, 50, za + 26), P(90, 50, za + 26)));
  guides(LV[1], LV[2]);

  const zs = LV[2] + T;
  box(0, 0, W, D, LV[2], zs, 4, 1.4);
  box(54, 44, 66, 52, zs, zs + 8, 2, 1); box(58, 46, 62, 50, zs + 8, zs + 16, 1.5, .6);
  box(30, 46, 90, 50, zs + 16, zs + 50, 2, 1).sil.classList.add("hi");
  const scr = (u, v) => P(u, 50, v);
  line(poly([scr(34, zs + 20), scr(86, zs + 20), scr(86, zs + 46), scr(34, zs + 46)]), "nf");
  line("M" + [[37, 30], [44, 34], [51, 29], [58, 37], [65, 33], [72, 40], [79, 36], [83, 42]].map(([u, v]) => scr(u, zs + v).join(" ")).join("L"), "nf hi");
  box(98, 14, 110, 30, zs, zs + 30, 2, 1);
  for (let k = 0; k < 4; k++) line(seg(P(110, 17, zs + 8 + k * 6), P(110, 27, zs + 8 + k * 6)));
  tag(LV[2], 3); tag(LV[1], 2); tag(LV[0], 1);
}`;

function page(lang) {
  const total = SLIDES.length;
  const slides = SLIDES.map((s, i) => {
    const last = i === total - 1;
    const tone = s.tone;
    const grid = ["cover", "levels", "protocols", "cta"].includes(s.kind) ? "grid" : "";
    return `<section class="slide ${tone} ${grid}" data-i="${i + 1}">
      <div class="chrome top"><span>• ${esc(META[lang].series)}</span><span class="count">${String(i + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}</span></div>
      ${R[s.kind](s, lang)}
      <div class="chrome bot"><img src="data:image/svg+xml;base64,${LOGO[tone]}" alt="Sovitech Control"/><span class="swipe">${last ? esc(META[lang].last) : `${esc(META[lang].swipe)} →`}</span></div>
    </section>`;
  }).join("\n");
  return `<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><title>${META[lang].file}</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&family=JetBrains+Mono:wght@400;500&display=block" rel="stylesheet">
<style>${CSS}</style></head><body>${slides}
<script>${bundle()}</script>
<script>${NIVELURI}
const PAL = ${JSON.stringify(PALETTE)};
HL.inject(document);
window.__mounted = 0;
for (const stage of document.querySelectorAll(".stage")) {
  const name = stage.dataset.fig, tone = stage.dataset.tone, p = PAL[tone];
  stage.setAttribute("data-hairline", name);
  for (const k of Object.keys(p)) stage.style.setProperty("--hairline-" + k, p[k]);
  stage.style.setProperty("--hairline-stroke", "2.4");
  const svg = HL.mk("svg", { viewBox: "0 0 400 320", "aria-hidden": "true" }, stage);
  if (name === "niveluri") { stage.style.aspectRatio = "5 / 6"; mountNiveluri(stage, svg, stage.dataset.lang); window.__mounted++; continue; }
  const mod = window["FIG_" + name];
  mod.figure.mount({ stage, svg, read: { textContent: "" } }, mod.figure.range[1]);
  const pick = stage.dataset.pick;
  if (pick && mod.POINTS[pick]) {
    const r = stage.getBoundingClientRect(), [x, y] = mod.POINTS[pick];
    stage.dispatchEvent(new PointerEvent("pointermove", { pointerType: "mouse", bubbles: true, clientX: r.left + x / 400 * r.width, clientY: r.top + y / 320 * r.height }));
    // a callout names the part the slide is about: a short leader up and to the right of it
    if (stage.dataset.callout) {
      const lx = x + 36, ly = Math.max(40, y - 70);
      HL.mk("path", { d: "M" + x + " " + (y - 18) + "L" + (lx - 4) + " " + (ly + 6), class: "nf hi" }, svg);
      const t = HL.mk("text", { x: lx, y: ly, class: "callout-t" }, svg); t.textContent = stage.dataset.callout;
    }
  }
  window.__mounted++;
}
// Crop each figure's viewBox to its drawing, matched to the frame's aspect, leaving room under the caption.
window.__crop = () => {
  for (const stage of document.querySelectorAll(".stage")) {
    const svg = stage.querySelector("svg"), bb = svg.getBBox();
    const w = stage.clientWidth, h = stage.clientHeight;
    const cap = stage.closest("figure").querySelector("figcaption").getBoundingClientRect();
    const capFrac = (cap.bottom - stage.getBoundingClientRect().top + 14) / h;
    const padX = bb.width * 0.06, padBot = bb.height * 0.06;
    let x = bb.x - padX, vw = bb.width + 2 * padX, vh = (bb.height + padBot) / (1 - capFrac), y = bb.y - vh * capFrac;
    const want = w / h;
    if (vw / vh < want) { const nw = vh * want; x -= (nw - vw) / 2; vw = nw; } else { const nh = vw / want; y -= (nh - vh) * capFrac + (nh - vh) * (1 - capFrac) / 2; vh = nh; }
    svg.setAttribute("viewBox", [x, y, vw, vh].map((n) => n.toFixed(1)).join(" "));
  }
  return true;
};
</script></body></html>`;
}

// ── render ───────────────────────────────────────────────────────────────────
function loadPlaywright() {
  for (const base of [process.cwd(), join(homedir(), "Library/Caches/hairline-look")]) {
    try { return createRequire(join(base, "noop.js"))("playwright-core"); } catch {}
  }
  throw new Error("playwright-core not found");
}
const { chromium } = loadPlaywright();
const browser = await chromium.launch({ channel: "chrome" });
mkdirSync(OUT, { recursive: true });
let failed = false;
for (const lang of langs) {
  const html = page(lang);
  const htmlFile = join(OUT, `${META[lang].file}.html`);
  writeFileSync(htmlFile, html);
  const ctx = await browser.newContext({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 1, reducedMotion: "reduce" });
  const pg = await ctx.newPage();
  const errors = [];
  pg.on("pageerror", (e) => errors.push(e.message));
  pg.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
  await pg.goto("file://" + htmlFile, { waitUntil: "networkidle" });
  await pg.evaluate(() => document.fonts.ready);
  await pg.waitForFunction(() => window.__mounted >= document.querySelectorAll(".stage").length, null, { timeout: 15000 });
  await pg.waitForTimeout(1200);
  await pg.evaluate(() => window.__crop());
  await pg.waitForTimeout(200);
  const dir = join(OUT, lang);
  rmSync(dir, { recursive: true, force: true });
  mkdirSync(dir, { recursive: true });
  const n = await pg.locator(".slide").count();
  for (let i = 0; i < n; i++) await pg.locator(".slide").nth(i).screenshot({ path: join(dir, `slide-${String(i + 1).padStart(2, "0")}.png`) });
  // Nothing may come within 32px of the footer rule, and no text may be clipped on the right.
  const problems = await pg.evaluate(() => [...document.querySelectorAll(".slide")].flatMap((s, i) => {
    const lim = s.querySelector(".chrome.bot").getBoundingClientRect().top - 32, right = s.getBoundingClientRect().right - 88 + 1;
    const els = [...s.querySelectorAll("p, li, h1, h2, blockquote, figure, svg.years, svg.timeline, .nums, .cards, .marks, .fine, .proto, .pr, .role, .cta")].filter((e) => !e.closest(".chrome"));
    const low = els.filter((e) => e.getBoundingClientRect().bottom > lim);
    const wide = els.filter((e) => e.getBoundingClientRect().right > right);
    return [low.length ? "slide " + (i + 1) + ": " + low.map((e) => e.className || e.tagName).join(",") + " +" + Math.round(Math.max(...low.map((e) => e.getBoundingClientRect().bottom)) - lim) + "px into the 32px gap" : null, wide.length ? "slide " + (i + 1) + ": " + wide.length + " element(s) past the right margin" : null].filter(Boolean);
  }));
  await pg.emulateMedia({ media: "print" });
  const pdf = join(OUT, `${META[lang].file}.pdf`);
  await pg.pdf({ path: pdf, width: "1080px", height: "1350px", printBackground: true, preferCSSPageSize: true });
  // Chrome rounds the page to 1013.04pt; trim it to exactly 1012.5pt (1350px) so no strip shows at the bottom.
  execFileSync("python3", ["-c", `import pypdf,sys
r=pypdf.PdfReader(sys.argv[1]); w=pypdf.PdfWriter()
for p in r.pages:
    top=float(p.mediabox.top); p.mediabox.lower_left=(0, top-1012.5); p.mediabox.upper_right=(810, top); p.cropbox=p.mediabox
    w.add_page(p)
w.add_metadata({"/Title": sys.argv[2], "/Author": "Sovitech Control"})
w.write(sys.argv[1])`, pdf, lang === "ro" ? "Sisteme BMS pentru clădiri · Ghid Sovitech" : "Building management systems · Sovitech guide"]);
  execFileSync("node", [SHEET, dir, "slide", "4", "270"], { stdio: "ignore" });
  if (errors.length || problems.length) failed = true;
  console.log(`${lang}: ${n} slides -> ${META[lang].file}.pdf${errors.length ? "\n  ERRORS: " + errors.join(" | ") : ""}${problems.length ? "\n  " + problems.join("\n  ") : ""}`);
  await ctx.close();
}
await browser.close();
process.exit(failed ? 1 : 0);
