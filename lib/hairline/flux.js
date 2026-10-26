/* eslint-disable */
// A Hairline figure, written with the hairline-create skill and checked by its
// validator and look. Drawn on the kernel in ./kernel.js.
/**
 * Flux: a BMS cabinet in a plant room, wired to four field devices: a rooftop
 * HVAC unit with twin fans, a room sensor on its post, a valve on its pipe
 * with a handwheel, and an energy meter with its dial. Packets ride the
 * conduits into the cabinet, always; each device has its module in the rack.
 * Hovering slows the flow so one packet can be followed, and lights the source
 * under the pointer, its conduit, its packets and its module. The slider is
 * how slow the hovered flow runs, as a share of full speed.
 *
 * The pattern: dilate time. One ambient loop, a spring on the rate, and a hit
 * test on the parts' rest hulls, which never move.
 */
import HL from "./kernel"

const {
  Cam, disposer, facing, fit, flatDot, hull, mk, place, pointer, poly, prism, proj, put,
  reducedMotion, register, ringAt, rings, rrect, seg, solid, spring, stepS, unproj,
} = HL

const V = 24, K = 3; // packet speed in world units a second; packets per conduit
// Each part: its bounding box [x0, y0, x1, y1, height] for the hit test, and its conduit, device to cabinet.
const PARTS = [
  { id: "hvac", name: "hvac", box: [-80, -24, -56, 12, 23], path: [[-68, -6], [0, -6]], off: 0 },
  { id: "senzor", name: "senzor", box: [-1, -73, 17, -55, 22], path: [[8, -64], [8, 0]], off: 7 },
  { id: "bms", name: "bms", box: [-12, -16, 12, 16, 58], path: null },
  { id: "vana", name: "vană", box: [-30, 55, 18, 69, 21], path: [[-6, 62], [-6, 0]], off: 13 },
  { id: "contor", name: "contor", box: [55, -4, 69, 12, 24], path: [[62, 4], [0, 4]], off: 4 },
];

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  const C = Cam(45, 0.5, 2.2), corners = [];
  for (const p of PARTS) {
    const [x0, y0, x1, y1, h] = p.box;
    for (const x of [x0, x1]) for (const y of [y0, y1]) for (const z of [0, h]) corners.push([x, y, z]);
  }
  fit(C, corners, 200, 166);
  const P = proj(C), front = facing(C);
  let slow = value, act, t = 0;

  const g = mk("g", {}, svg);
  const line = (d, cls = "nf lo") => mk("path", { d, class: cls }, g);
  const dot = (pt, cls) => { const el = mk("circle", { r: 1.05, class: cls }, g); place(el, pt); return el; };
  const blk = (x0, y0, x1, y1, z0, z1, r, b) => {
    const [ring, inner] = rings(x0, y0, x1, y1, r, b), s = solid(g);
    put(s, prism(P, front, ring, inner, z0, z1));
    return s;
  };
  const round = (cx, cy, R, b = 0) => rrect(cx - R + b, cy - R + b, cx + R - b, cy + R - b, R - b, 14);
  const disc = (cx, cy, R, z0, z1, b) => { const s = solid(g); put(s, prism(P, front, round(cx, cy, R), round(cx, cy, R, b), z0, z1)); return s; };
  const lid = (cx, cy, R, z) => poly(ringAt(P, round(cx, cy, R), z));
  /** A ring on a face that looks down +x: u runs along y, v up z. */
  const faceX = (x, ring) => poly(ring.map((q) => P(x, q.u, q.v)));

  // The floor first: conduits and their packets lie on the ground, so every solid painted later covers them where it should.
  const flows = new Map();
  for (const p of PARTS) if (p.path) {
    const [a, b] = p.path, w = 2.6;
    const ring = rrect(Math.min(a[0], b[0]) - w, Math.min(a[1], b[1]) - w, Math.max(a[0], b[0]) + w, Math.max(a[1], b[1]) + w, w, 4);
    const strip = line(poly(ringAt(P, ring, 0)), "lo");
    const dots = Array.from({ length: K }, () => flatDot(g, C, 1.5, "dot m"));
    flows.set(p.id, { a, b, L: Math.hypot(b[0] - a[0], b[1] - a[1]), off: p.off, strip, dots });
  }

  const leds = new Map();
  const SHAPE = {
    hvac: () => {
      const s = [blk(-80, -24, -56, 12, 0, 20, 3, 1.5)];
      line([7, 11, 15].map((z) => seg(P(-77, 12, z), P(-59, 12, z))).join("")); // louvres
      for (const cy of [-15, 3]) {
        s.push(disc(-68, cy, 7.5, 20, 23, 1.1)); // fan shroud
        line(lid(-68, cy, 5, 23) + lid(-68, cy, 2.6, 23)); // guard rings
        dot(P(-68, cy, 23), "dot off");
      }
      return s;
    },
    senzor: () => {
      const s = [disc(8, -64, 5, 0, 2, 1), disc(8, -64, 1.8, 2, 15, 0.5), disc(8, -64, 9, 15, 22, 1.4)];
      for (let k = 0; k < 8; k++) dot(P(8 + 5.6 * Math.cos(k * Math.PI / 4), -64 + 5.6 * Math.sin(k * Math.PI / 4), 22), "dot off");
      dot(P(8, -64, 22), "dot m");
      return s;
    },
    bms: () => {
      const s = [blk(-12, -16, 12, 16, 0, 3, 3, 1), blk(-11, -15, 11, 15, 3, 58, 3, 1.4)];
      line(faceX(11, rrect(-10.5, 7, 10.5, 54, 2, 4))); // the door
      const rows = [40, 32, 24, 16];
      line(rows.map((z) => seg(P(11, -8, z), P(11, 8, z))).join("")); // rack modules
      line(seg(P(11, 8.6, 44), P(11, 8.6, 50)), "nf"); // handle
      line([46, 49, 52].map((z) => seg(P(-7, 15, z), P(7, 15, z))).join("")); // vents
      PARTS.filter((p) => p.path).forEach((p, i) => leds.set(p.id, dot(P(11, -6, rows[i] + 4), "dot m")));
      return s;
    },
    vana: () => {
      const s = [blk(-30, 59, -12, 65, 0, 6, 3, 1)]; // pipe, behind the body
      s.push(blk(-12, 56, 0, 68, 0, 13, 3, 1.2)); // body
      s.push(blk(0, 59, 18, 65, 0, 6, 3, 1)); // pipe, in front of it
      s.push(disc(-6, 62, 1.8, 13, 19, 0.5), disc(-6, 62, 7, 19, 21, 1)); // stem, handwheel
      line(seg(P(-12, 62, 21), P(0, 62, 21)) + seg(P(-6, 56, 21), P(-6, 68, 21))); // spokes
      dot(P(-6, 62, 21), "dot m");
      return s;
    },
    contor: () => {
      const s = [blk(55, -4, 69, 12, 0, 24, 2.5, 1.2)];
      line(faceX(69, rrect(-0.5, 12.5, 8.5, 21.5, 4.5, 14)), "nf"); // dial window
      line(seg(P(69, 4, 17), P(69, 6.6, 19.6))); // needle
      for (let k = 0; k < 5; k++) dot(P(69, -1 + k * 2.5, 7), k === 2 ? "dot m" : "dot off"); // register
      return s;
    },
  };
  // Back to front, by the footprint's nearest corner.
  const ORDER = PARTS.slice().sort((p, q) => p.box[2] + p.box[3] - (q.box[2] + q.box[3]) || p.box[0] - q.box[0]);
  for (const p of ORDER) p.sils = SHAPE[p.id]();

  // Hit areas: each part's hull at rest. Nothing in the figure moves but the packets, so these never lift out from under the pointer.
  const hulls = new Map(PARTS.map((p) => {
    const [x0, y0, x1, y1, h] = p.box, pts = [];
    for (const x of [x0, x1]) for (const y of [y0, y1]) for (const z of [0, h]) pts.push(P(x, y, z));
    return [p.id, hull(pts)];
  }));
  const inside = (hp, [x, y]) => {
    let c = false;
    for (let i = 0, j = hp.length - 1; i < hp.length; j = i++) {
      const [xi, yi] = hp[i], [xj, yj] = hp[j];
      if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) c = !c;
    }
    return c;
  };
  function hit(pt) {
    let best = null;
    for (const p of ORDER) if (inside(hulls.get(p.id), pt)) best = p.id; // the nearest one wins
    if (best) return best;
    const [gx, gy] = unproj(C, pt[0], pt[1], 0);
    for (const p of PARTS) if (p.path) {
      const [[ax, ay], [bx, by]] = p.path;
      if (gx >= Math.min(ax, bx) - 6 && gx <= Math.max(ax, bx) + 6 && gy >= Math.min(ay, by) - 6 && gy <= Math.max(ay, by) + 6) return p.id;
    }
    return null;
  }

  const rate = spring(1);
  const B = register(stage, (dt) => {
    // read each frame: the loop learns the reader's preference when it starts, after mount
    const still = reducedMotion();
    if (!still) { stepS(rate, dt); t += dt * V * rate.x; }
    flows.forEach((f) => f.dots.forEach((el, k) => {
      const s = ((t + f.off + (k * f.L) / K) % f.L) / f.L;
      place(el, P(f.a[0] + (f.b[0] - f.a[0]) * s, f.a[1] + (f.b[1] - f.a[1]) * s, 0));
    }));
    return !still;
  });
  bag.add(B.unregister);

  /** Chooses a source (null for rest): it, its conduit, its packets and its module take the bright; the rest dim. */
  function setActive(id) {
    if (id === act) return;
    act = id;
    const all = !id || id === "bms";
    for (const p of PARTS) p.sils.forEach((s) => s.sil.classList.toggle("hi", p.id === (id || "bms")));
    flows.forEach((f, k) => {
      const cls = all ? "dot m" : k === id ? "dot" : "dot off";
      f.strip.setAttribute("class", k === id ? "hi" : "lo");
      f.dots.forEach((el) => el.setAttribute("class", cls));
      leds.get(k).setAttribute("class", cls);
    });
    rate.t = id ? slow : 1;
    read.textContent = id ? PARTS.find((p) => p.id === id).name : "rest";
    B.wake();
  }
  setActive(null);

  bag.add(pointer(stage, { move: (p) => setActive(hit(p)), leave: () => setActive(null) }));
  bag.add(() => svg.replaceChildren());

  return {
    set: (v) => { slow = v; if (act) { rate.t = v; B.wake(); } },
    destroy: bag.dispose,
  };
}

/** Where each part answers, in viewBox points: the page walks them, and its legend points at them. */
export const POINTS = { hvac: [111, 103], senzor: [319, 113], bms: [207, 88], vana: [101, 202], contor: [297, 204] }

export const flux = {
  name: "flux",
  means: "Four devices feed a BMS cabinet; hovering slows the data so a packet can be followed, and lights its source.",
  rules: [1, 4, 6, 7],
  range: [0.5, 0.2, 0.06],
  tour: [[111, 103], [297, 204], [207, 88], null],
  mount,
}
