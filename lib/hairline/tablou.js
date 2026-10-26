/* eslint-disable */
// A Hairline figure, written with the hairline-create skill and checked by its
// validator and look. Drawn on the kernel in ./kernel.js.
/**
 * Tablou: the inside of an open automation panel. A mounting plate, a DIN rail
 * with its slots, a slotted cable duct above with its lid unclipped and one
 * below, and on the rail eight modules of different widths: a 24 V supply, a
 * controller with its display, an I/O module and five protocol gateways. Each
 * is a DIN profile, shoulders and a raised hood, and says what it is with
 * geometry: terminal screws, LEDs, vents, a DIP strip, a rotary switch, a
 * network port, a release clip, and a cable that runs behind it into one slot
 * of the duct's comb. The module under the pointer comes off the rail
 * towards the viewer and its neighbours part, staggered outwards; it takes the
 * bright stroke and its name goes to the read-out. At rest one gateway is half
 * out. The slider is the stagger.
 *
 * The pattern: one of many. Tweens, a stagger by distance, and a hit test on
 * static hulls: every module at rest, and the one chosen also where it is
 * pulled to, so it stays chosen under a pointer that follows it up.
 */
import HL from "./kernel"

const {
  Cam, disposer, facing, fit, flatDot, hull, mk, open, place, pointer, poly, prism, proj, put, r2, rad,
  register, ringAt, rings, rrect, seg, solid, tdone, tset, tval, tween,
} = HL

const ZB = 3, ZS = 11, LIFT = 12, GAP = 5, REST = 5, RL = 5, RDX = 2.4, TH = 22, FY = -32, ZW = 5.5;
// name, width, hood height, hood half-depth, half-height, terminal rows, hood features [kind, u, v, …]
const MODS = [
  ["psu 24v", 18, 6, 9, 18, 1, [["s", 3.5, -6, 3.5, 3], ["s", 5.5, -6, 5.5, 3], ["s", 7.5, -6, 7.5, 3], ["s", 9.5, -6, 9.5, 3], ["d", 14, -5, "dot m"], ["o", 14, 2.4, 1.7]]],
  ["controller", 32, 9, 12, 20, 1, [["r", 3.5, -8.5, 21, 1.5, 1.4, "nf"], ["d", 6, 6, "dot off"], ["d", 10, 6, "dot off"], ["d", 14, 6, "dot off"], ["d", 27, -7.5, "dot m"], ["d", 27, -4, "dot off"], ["r", 24.5, 1, 29.5, 7, 0.8]]],
  ["i/o", 20, 5, 9, 18, 2, Array.from({ length: 12 }, (_, k) => ["d", 3.5 + (k % 6) * 2.6, k < 6 ? -5 : -1.8, k === 1 || k === 4 || k === 9 ? "dot m" : "dot off"])],
  ["knx", 12, 4, 8, 18, 1, [["d", 6, -4.5, "dot m"], ["o", 6, 2.2, 1.9]]],
  ["dali", 12, 4, 8, 18, 1, [["d", 4, -4.5, "dot m"], ["d", 8, -4.5, "dot off"], ["r", 3.2, 1, 8.8, 4, 1]]],
  ["modbus", 14, 5, 9, 18, 1, [["d", 7, -6, "dot m"], ["r", 2.2, -2.6, 11.8, 2.6, 0.8], ["d", 4.2, -0.9, "dot m"], ["d", 6.2, 0.9, "dot m"], ["d", 8.2, -0.9, "dot m"], ["d", 10.2, -0.9, "dot m"]]],
  ["m-bus", 12, 4, 8, 18, 1, [["d", 6, -5, "dot m"], ["o", 6, 1.6, 2.6], ["s", 4.4, 3.2, 7.6, 0]]],
  ["bacnet", 16, 6, 9, 18, 1, [["d", 5.5, -5.5, "dot m"], ["d", 10.5, -5.5, "dot off"], ["r", 4.6, -1.2, 11.4, 5.2, 0.8], ["s", 6.8, 5.2, 9.2, 5.2]]],
];

/** Whether a screen point is inside a closed polygon. */
function inside(hp, [x, y]) {
  let c = false;
  for (let i = 0, j = hp.length - 1; i < hp.length; j = i++) {
    const [xi, yi] = hp[i], [xj, yj] = hp[j];
    if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) c = !c;
  }
  return c;
}

/** The modules laid on the rail 0.8 apart, and the camera fitted to the plate, the open lid and a module lifted off either end. */
function layout() {
  let x = 0;
  const mods = MODS.map(([name, w, hh, hy, my, rows, feats], i) => {
    const m = { i, name, hh, hy, my, rows, feats, x0: x, x1: x + w, zt: ZS + hh };
    x += w + 0.8;
    return m;
  });
  const L = x - 0.8, D0 = -16, D1 = L + 16, C = Cam(45, 0.5, 1.75);
  fit(C, [[D0 - 4, -52, -2.5], [D1 + 4, -52, -2.5], [D1 + 4, 50, -2.5], [D0 - 4, 50, -2.5], [D0, -46, 24], [D1, -46, 24], [0, -23, 21 + LIFT], [L, -23, 21 + LIFT]], 200, 166);
  return { mods, L, D0, D1, C, P: proj(C) };
}

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  let stag = value, act = -2;
  const { mods, L, D0, D1, C, P } = layout(), front = facing(C), O = P(0, 0, 0);

  const g = mk("g", {}, svg);
  const box = (parent, x0, y0, x1, y1, z0, z1, r, b) => {
    const [ring, inner] = rings(x0, y0, x1, y1, r, b), s = solid(parent);
    put(s, prism(P, front, ring, inner, z0, z1));
    return s;
  };
  const line = (parent, d, cls = "nf lo") => mk("path", { d, class: cls }, parent);
  const dot = (parent, pt, r, cls) => { const el = flatDot(parent, C, r, cls); place(el, pt); return el; };
  const flat = (x0, y0, x1, y1, r, z) => poly(ringAt(P, rrect(x0, y0, x1, y1, r, 4), z));

  // back to front: the plate, the far duct and its comb, its lid, the rail and its slots
  box(g, D0 - 4, -52, D1 + 4, 50, -2.5, 0, 4, 1.5);
  box(g, D0, -46, D1, FY, 0, 16, 2, 1.2);
  const slots = [];
  for (let s = D0 + 4; s < D1 - 2; s += 6) slots.push(s);
  line(g, slots.map((s) => seg(P(s, FY, 15), P(s, FY, 5.5))).join(""));
  const c = Math.cos(rad(TH)), sn = Math.sin(rad(TH)), lid = rrect(D0 + 0.4, 0, D1 - 0.4, 14.6, 1.6, 4);
  const lw = (u, v, t) => P(u, -46.3 + v * c - t * sn, 16 + v * sn + t * c);
  line(g, poly(lid.map((q) => lw(q.u, q.v, 0))), "lo");
  line(g, poly(lid.map((q) => lw(q.u, q.v, 1.2))), "sil");
  box(g, -14, -5, L + 14, 5, 0, ZB, 1.5, 1);
  const rs = [];
  for (let s = -9; s <= L + 9; s += 10) rs.push(flat(s - 3, -1.2, s + 3, 1.2, 1.2, ZB));
  line(g, rs.join(""));

  for (const m of mods) {
    const { x0, x1, hy, my, zt } = m, tv = (my + hy) / 2, grp = mk("g", {}, g), cx = (x0 + x1) / 2;
    const term = (sg) => {
      for (let r = 0; r < m.rows; r++) for (let u = x0 + 2.5; u <= x1 - 2.4; u += 3) dot(grp, P(u, sg * (tv + (m.rows > 1 ? (r - 0.5) * 4.4 : 0)), ZS), 0.75, "dot off");
    };
    // The cable: from the top terminal nearest a comb slot, over the back edge, down behind the module (drawn
    // first, so the module hides it), then straight along the plate at that slot's x into the slot's foot.
    const ty = -(tv + (m.rows > 1 ? -2.2 : 0)), xs = slots.find((s) => s >= x0 + 1.5), xt = x0 + 2.5 + 3 * Math.round((xs - x0 - 2.5) / 3);
    m.back = line(grp, "", "nf");
    m.run = [P(xs, -my - 0.4, ZS + 0.3), [P(xs, -my - 3.5, ZW), P(xs, FY, ZW)]];
    m.sils = [box(grp, x0, -my, x1, my, ZB, ZS, 1.6, 0.8)];
    line(grp, seg(P(xt, ty, ZS + 0.3), m.run[0]), "nf");
    term(-1);
    m.sils.push(box(grp, x0 + 0.6, -hy, x1 - 0.6, hy, ZS, zt, 1.4, 0.8));
    const T = (u, v) => P(x0 + u, v, zt);
    for (const [k, u, v, a, b, r, cls] of m.feats) {
      if (k === "d") dot(grp, T(u, v), 0.8, a);
      else if (k === "s") line(grp, seg(T(u, v), T(a, b)));
      else if (k === "o") line(grp, flat(x0 + u - a, v - a, x0 + u + a, v + a, a, zt));
      else line(grp, flat(x0 + u, v, x0 + a, b, r, zt), cls || "nf lo");
    }
    term(1);
    box(grp, cx - 2.2, my - 0.6, cx + 2.2, my + 2.4, ZB, ZB + 2, 0.8, 0.5); // the release clip
    Object.assign(m, { g: grp, lz: tween(m.i === REST ? RL : 0), dx: tween(m.i > REST ? RDX : 0), drawn: "" });
  }

  // the near duct, lid on, its comb on the face that looks at us
  box(g, D0, 32, D1, 44, 0, 11, 2, 1.2);
  line(g, slots.map((s) => seg(P(s + 3, 44, 9.4), P(s + 3, 44, 3.5))).join("") + seg(P(D0 + 1.5, 44, 9.8), P(D1 - 1.5, 44, 9.8)));

  // Hit areas, all static: each module's two boxes at rest, padded to the gaps, and the module chosen also over
  // the pose it is pulled to (the gateway out at rest: from half out to fully out), so it keeps a pointer that
  // follows it up. They are read front to back, as they are painted: a nearer module still wins where it is drawn over.
  const padded = (m) => [[m.x0 - 0.4, m.x1 + 0.4, -m.my - 3, m.my + 3, 0, ZS], [m.x0, m.x1, -m.hy, m.hy, ZS, m.zt]];
  const tight = (m) => [[m.x0, m.x1, -m.my, m.my, ZB, ZS], [m.x0 + 0.6, m.x1 - 0.6, -m.hy, m.hy, ZS, m.zt]];
  const area = (boxes, lifts) => boxes.map(([a0, a1, b0, b1, z0, z1]) => {
    const pts = [];
    for (const l of lifts) for (const u of [a0, a1]) for (const v of [b0, b1]) for (const z of [z0, z1]) pts.push(P(u, v - l * 0.25, z + l));
    return hull(pts);
  });
  const rest = mods.map((m) => area(padded(m), [0])), pulled = mods.map((m) => area(tight(m), m.i === REST ? [RL, LIFT] : [LIFT]));
  const half = area(tight(mods[REST]), [RL]);
  const hit = (pt) => {
    const k = act >= 0 ? act : REST, held = act >= 0 ? pulled[k] : half;
    for (let i = mods.length - 1; i >= 0; i--) if (rest[i].some((h) => inside(h, pt)) || (i === k && held.some((h) => inside(h, pt)))) return i;
    return -1;
  };

  /** A module's pose is one translation: forward (z), a little up the plate (−y), and along the rail. */
  function draw(m, now) {
    const lz = tval(m.lz, now), dx = tval(m.dx, now), q = P(dx, -lz * 0.25, lz), ox = r2(q[0] - O[0]), oy = r2(q[1] - O[1]);
    const key = ox + " " + oy;
    if (key === m.drawn) return;
    m.drawn = key;
    m.g.setAttribute("transform", `translate(${key})`);
    m.back.setAttribute("d", open([m.run[0], ...m.run[1].map(([a, b]) => [a - ox, b - oy])]));
  }

  const B = register(stage, (_dt, now) => {
    let moving = false;
    for (const m of mods) { draw(m, now); if (!tdone(m.lz, now) || !tdone(m.dx, now)) moving = true; }
    return moving;
  });
  bag.add(B.unregister);

  /** Pulls module a (−1 is rest: one gateway half out). The stagger spreads from the module pulled, or the one let go. */
  function setActive(a) {
    if (a === act) return;
    const now = performance.now(), from = a >= 0 ? a : act >= 0 ? act : REST;
    act = a;
    for (const m of mods) {
      const i = m.i, delay = Math.abs(i - from) * stag;
      tset(m.lz, a < 0 ? (i === REST ? RL : 0) : i === a ? LIFT : 0, now, delay);
      tset(m.dx, a < 0 ? (i > REST ? RDX : 0) : Math.sign(i - a) * GAP, now, delay);
      m.sils.forEach((s) => s.sil.classList.toggle("hi", i === (a < 0 ? REST : a)));
    }
    read.textContent = a < 0 ? "rest" : mods[a].name;
    B.wake();
  }
  setActive(-1);

  bag.add(pointer(stage, { move: (p) => setActive(hit(p)), leave: () => setActive(-1) }));
  bag.add(() => svg.replaceChildren());

  return {
    set: (v) => { stag = v; },
    destroy: bag.dispose,
  };
}

/**
 * Where each module answers, in viewBox points: the front of its base, which no lifted neighbour ever covers.
 * Taken from the figure's own layout and camera, so they follow any change to the modules. The page walks them,
 * and its legend points at them.
 */
const IDS = ["psu", "controller", "io", "knx", "dali", "modbus", "mbus", "bacnet"]
export const POINTS = (() => {
  const { mods, P } = layout()
  return Object.fromEntries(mods.map((m, i) => [IDS[i], P((m.x0 + m.x1) / 2, m.my - 2.5, ZS).map(Math.round)]))
})()

export const tablou = {
  name: "tablou",
  means: "An open automation panel: the module under the pointer comes off the DIN rail, and its neighbours part in turn.",
  rules: [1, 2, 5, 10],
  range: [0, 40, 90],
  tour: [[133, 152], [222, 194], [257, 212], null],
  mount,
}
