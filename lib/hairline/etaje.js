/* eslint-disable */
// A Hairline figure, written with the hairline-create skill and checked by its
// validator and look. Drawn on the kernel in ./kernel.js.
/**
 * Etaje: a mid-rise office building as a stack of floors on a plinth: the
 * plant-room basement with its boilers, pumps and automation panel, a lobby
 * behind its entrance canopy, three office floors in curtain wall, and a roof
 * carrying an air handling unit with two fan rings and a chiller with a row of
 * fans. A core runs up through every level and out over the roof. At rest the
 * stack is slightly exploded, each gap a little wider than the one under it,
 * and the core's head on the roof holds the bright edge. The pointer's height
 * on the facade picks a level; the floors above it lift away, staggered
 * outwards from it on the 700ms curve. Once its gap is open the level's plan
 * shows (zones, fan coils under the glass, luminaires, a sensor) and its slab
 * takes the bright edge. The slider is how far the floors above part, in world units.
 *
 * The pattern: scrub and pick. Tweens, a stagger by distance, and a hit test
 * on static bands of facade height taken from the rest pose, so a floor
 * moving out from under the pointer cannot flip the choice.
 */
import HL from "./kernel"

const {
  Cam, disposer, extremes, facing, fit, mk, place, pointer, poly, prism, proj, put, register,
  ringAt, rings, rrect, seg, solid, tdone, tset, tval, tween,
} = HL

// footprint, slab, glazing inset, the closed gap between floors, the plinth's margin, the stagger, the slider's far end
const W = 92, D = 44, TS = 2, IN = 1.6, G0 = 2.4, PL = 5, STEP = 45, FAR = 30;
// at rest every gap is a little open, each wider than the one under it: the share of the slider's gap under level i
const REST = [0, 0.03, 0.08, 0.14, 0.21, 0.3];
const CORE = [40, 14, 54, 28];
/** A fan coil under the glass of the long facade, centred on x. */
const FC = (x) => [x - 3.5, 39.4, x + 3.5, 41, 0.7];
const OFFICE = {
  pitch: 5.9, mark: [46.9, 35.5],
  // four perimeter zones off a corridor, and one along the short facade
  lines: [[[6, 31], [86, 31]], [[24, 31], [24, 42.4]], [[46, 31], [46, 42.4]], [[68, 31], [68, 42.4]], [[76, 6], [76, 31]]],
  loops: [FC(15), FC(35), FC(57), FC(77), [87.6, 14, 89.2, 22, 0.7]],
  offs: [[11, 36.5], [19, 36.5], [30, 36.5], [40, 36.5], [52, 36.5], [62, 36.5], [73, 36.5], [81, 36.5], [82, 13], [82, 24], [13, 22], [25, 22], [63, 21]],
  stand: [[CORE, 0]],
};
/**
 * The levels, bottom to top. h: from the level's base to its top. pitch: the curtain wall's mullions.
 * stand: what rises off its top, [footprint, height, radius, fans]; a height of 0 is the core, which spans the gap to the level above.
 * mark: the one dot that lights with the level. lines, loops and offs: its plan, drawn flat on its top.
 */
const LV = [
  { name: "subsol", h: 9, mark: [66, 41], lines: [[[14, 41], [72, 41]], [[20, 36], [20, 41]], [[34, 36], [34, 41]]],
    vents: [[8, 2.6, 24, 6], [66, 2.6, 82, 6]],
    stand: [[CORE, 0], [[15, 26, 25, 36], 9, 5], [[29, 26, 39, 36], 9, 5], [[49, 35, 54, 40], 3.5, 2.5], [[57, 35, 62, 40], 3.5, 2.5], [[66, 29, 78, 33], 8, 1]] },
  { name: "parter", h: 15, pitch: 9.6, mark: [48.9, 35], canopy: [21, D - IN, 39, D + 5],
    lines: [[[6, 24], [40, 24]], [[48, 28], [48, 42.4]]], loops: [[22, 39.4, 38, 41, 0.7], [25, 29, 37, 32, 1.5]],
    offs: [[12, 36], [12, 28.5], [42, 36], [57, 37], [67, 37], [77, 37], [86, 37]],
    stand: [[CORE, 0]] },
  { name: "etaj 1", h: 12, ...OFFICE },
  { name: "etaj 2", h: 12, ...OFFICE },
  { name: "etaj 3", h: 12, ...OFFICE },
  { name: "acoperiș", h: 3, mark: [16, 26, 8], top: true, offs: [[28, 26, 8]],
    stand: [[[9, 18, 35, 34], 8, 2.5, [[16, 26, 4.4], [28, 26, 4.4]]], [CORE, 6], [[59, 12, 87, 26], 5.5, 2, [[66, 19, 2.9], [73, 19, 2.9], [80, 19, 2.9]]]] },
];
const N = LV.length, PLANT = 8;
const BASE = [], CUM = [];
LV.reduce((z, L) => (BASE.push(z), z + L.h + G0), 0);
REST.reduce((s, r) => (CUM.push(s + r), s + r), 0);

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  let G = value, act = null;

  // Fitted to the tallest pose at the slider's far end: the stack opened at the basement, every floor lifted (rule 03).
  const C = Cam(45, 0.5, 1.8), TOP = BASE[N - 1] + LV[N - 1].h;
  fit(C, [[-PL, -PL, 0], [W + PL, D + PL, 0], [W + PL, -PL, 0], [-PL, D + PL, 0], [0, 0, TOP + PLANT + FAR], [W, 0, TOP + FAR], [0, D, TOP + FAR]], 200, 155);
  const P = proj(C), front = facing(C);

  const g = mk("g", {}, svg);
  const box = (x0, y0, x1, y1, r, b) => { const [ring, inner] = rings(x0, y0, x1, y1, r, b); return { ring, inner, s: solid(g) }; };
  const draw = (bx, z0, z1) => put(bx.s, prism(P, front, bx.ring, bx.inner, z0, z1));
  const dot = (cls, parent) => mk("circle", { r: 1.05, class: cls }, parent);
  const round = (cx, cy, R) => rrect(cx - R, cy - R, cx + R, cy + R, R, 14);

  // Bottom to top: each level covers the one under it. In a level, its guide goes first, behind its own slab.
  const lv = LV.map((L, i) => {
    const o = { L, guide: i ? mk("path", { class: "nf dash" }, g) : null, open: true };
    o.slab = i === 0 ? box(-PL, -PL, W + PL, D + PL, 3, 1.4) : box(0, 0, W, D, 2.5, L.top ? 1.2 : 0.9);
    o.ext = extremes(P, o.slab.ring);
    if (L.pitch) { o.glass = box(IN, IN, W - IN, D - IN, 1.6, 0.8); o.mull = mk("path", { class: "nf lo" }, g); }
    if (L.vents) o.vents = mk("path", { class: "nf lo" }, g);
    if (L.canopy) o.canopy = box(...L.canopy, 0.8, 0.4);
    // a level's plan sits in its own group, put in place only while the gap over it is open; the roof's plant always shows
    const pg = L.top ? g : (o.pg = mk("g", {}, g));
    o.plan = mk("path", { class: "nf" }, pg);
    const dots = () => { o.mark = dot("dot m", pg); o.offs = (L.offs || []).map(() => dot("dot m", pg)); };
    if (!L.top) dots();
    o.stand = L.stand.map(([fp, h, r = 2, fans]) => {
      const b = box(...fp, r, Math.min(1.1, r * 0.4));
      return Object.assign(b, { h, fans, core: fp === CORE, top: fans ? mk("path", { class: "nf" }, b.s.g) : null });
    });
    if (L.top) dots();
    return o;
  });
  // the rest mark: the core's head on the roof, the one part every level shares
  const head = lv[N - 1].stand.find((b) => b.core);

  /** Draws level o with its base at zb, the level below topping out at zp and the one above starting at zn; open shows its plan. */
  function drawLevel(o, zb, zp, zn, open) {
    const L = o.L, zt = zb + L.h, at = (x, y, dz = 0) => P(x, y, zt + dz);
    if (o.guide) o.guide.setAttribute("d", zb - zp > G0 + 0.5 * G ? o.ext.map((q) => seg(P(q.u, q.v, zb), P(q.u, q.v, zp))).join("") : "");
    draw(o.slab, zb, o.glass ? zb + TS : zt);
    if (o.glass) {
      draw(o.glass, zb + TS, zt);
      let d = "";
      // the curtain wall: mullions spaced evenly along the two faces that look at the viewer
      const n1 = Math.round((W - 2 * IN) / L.pitch), n2 = Math.round((D - 2 * IN) / L.pitch);
      for (let k = 1; k < n1; k++) { const x = IN + (k * (W - 2 * IN)) / n1; d += seg(P(x, D - IN, zb + TS), P(x, D - IN, zt)); }
      for (let k = 1; k < n2; k++) { const y = IN + (k * (D - 2 * IN)) / n2; d += seg(P(W - IN, y, zb + TS), P(W - IN, y, zt)); }
      o.mull.setAttribute("d", d);
    }
    if (o.vents) o.vents.setAttribute("d", L.vents.map(([u0, v0, u1, v1]) => poly(rrect(u0, v0, u1, v1, 1, 3).map((q) => P(q.u, D + PL, zb + q.v)))).join(""));
    if (o.canopy) draw(o.canopy, zb + 11.5, zb + 12.6);
    if (o.pg && open !== o.open) { o.open = open; if (open) o.stand[0].s.g.before(o.pg); else o.pg.remove(); }
    o.plan.setAttribute("d", (L.lines || []).map(([a, b]) => seg(at(...a), at(...b))).join("") +
      (L.loops || []).map(([x0, y0, x1, y1, r]) => poly(ringAt(P, rrect(x0, y0, x1, y1, r, 3), zt))).join(""));
    place(o.mark, at(...L.mark));
    o.offs.forEach((el, k) => place(el, at(...L.offs[k])));
    for (const b of o.stand) {
      const z1 = b.h ? zt + b.h : Math.max(zt + 0.2, zn);
      draw(b, zt, z1);
      if (b.top) b.top.setAttribute("d", b.fans.map(([cx, cy, R]) => poly(ringAt(P, round(cx, cy, R), z1)) + poly(ringAt(P, round(cx, cy, R * 0.45), z1))).join(""));
    }
  }

  // Each level's lift above its closed base, one tween each. At rest every gap is a little open.
  const restLift = (i) => CUM[i] * G;
  const lift = lv.map((_, i) => tween(restLift(i)));
  const drawn = [];
  const B = register(stage, (_dt, now) => {
    let moving = false;
    const zs = [];
    for (let i = 0; i < N; i++) {
      // a floor lifted late never sinks into the one under it
      zs.push(Math.max(BASE[i] + tval(lift[i], now), i ? zs[i - 1] + LV[i - 1].h + 0.6 : 0));
      if (!tdone(lift[i], now)) moving = true;
    }
    lv.forEach((o, i) => {
      const zp = i ? zs[i - 1] + LV[i - 1].h : 0, zn = i < N - 1 ? zs[i + 1] : 0;
      const open = i < N - 1 && zn - zs[i] - LV[i].h > G0 + 0.5 * G, key = `${zp},${zs[i]},${zn},${open}`;
      if (key !== drawn[i]) { drawn[i] = key; drawLevel(o, zs[i], zp, zn, open); }
    });
    return moving;
  });
  bag.add(B.unregister);

  // Hit: the pointer is put on the facade under it (the long face, or past the near corner the short one), and its height there
  // is read against bands that never move: each level's rest base, up to the next one's.
  const O = P(0, 0, 0), X = P(1, 0, 0), Y = P(0, 1, 0), Z = P(0, 0, 1);
  const ax = X[0] - O[0], ay = Y[0] - O[0], bx = X[1] - O[1], by = Y[1] - O[1], bz = Z[1] - O[1];
  function hit([sx, sy]) {
    let x = (sx - O[0] - ay * D) / ax, y = D;
    if (x > W) { y = (sx - O[0] - ax * W) / ay; x = W; }
    if (x < -PL - 6 || y < -PL - 6) return -1;
    const h = (sy - O[1] - bx * x - by * y) / bz;
    if (h < -6 || h > BASE[N - 1] + restLift(N - 1) + 54) return -1;
    let k = 0;
    while (k < N - 1 && h >= BASE[k + 1] + restLift(k + 1)) k++;
    return k;
  }

  function aim(now, from) {
    lift.forEach((tw, i) => tset(tw, act < 0 ? restLift(i) : i > act ? G : 0, now, from < 0 ? 0 : Math.abs(i - from) * STEP));
  }
  /** Opens the stack at level a (-1 returns it to rest). The stagger spreads from the level chosen, or the one let go. */
  function setActive(a) {
    if (a === act) return;
    const from = a >= 0 ? a : act ?? -1;
    act = a;
    aim(performance.now(), from);
    // the bright edge and the bright dot go to the level chosen; at rest the core's head keeps the bright edge
    lv.forEach((o, i) => {
      o.slab.s.sil.classList.toggle("hi", i === a);
      o.mark.setAttribute("class", i === a ? "dot" : "dot m");
    });
    head.s.sil.classList.toggle("hi", a < 0);
    read.textContent = a < 0 ? "rest" : LV[a].name;
    B.wake();
  }
  setActive(-1);

  bag.add(pointer(stage, { move: (p) => setActive(hit(p)), leave: () => setActive(-1) }));
  bag.add(() => svg.replaceChildren());

  return {
    set: (v) => { G = v; aim(performance.now(), -1); B.wake(); },
    destroy: bag.dispose,
  };
}

/** Where each level answers, in viewBox points: on the long facade, inside the level's band at every gap the slider allows. */
export const POINTS = { subsol: [183, 250], parter: [183, 226], etaj1: [183, 198], etaj2: [183, 170], etaj3: [183, 140], acoperis: [183, 106] }

export const etaje = {
  name: "etaje",
  means: "A building floor by floor: the pointer's height picks a level, the floors above lift away and its plan shows.",
  rules: [1, 2, 3, 5, 6],
  range: [14, 22, 30],
  tour: [[183, 106], [183, 170], [183, 250], null],
  mount,
}
