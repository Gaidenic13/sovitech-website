"use client"

import { useEffect, useRef, useState } from "react"
import { useLanguage } from "@/lib/language-context"

// ─── Aethel Forge design tokens ───────────────────────────────────────────────
// surface #07201C · accent #C8E6C9 · text #A3A3A3 / #FFFFFF · radii 1-2px
// spacing 4px rhythm · motion 300ms/150ms ease · glass surfaces, hairline borders

const VERT = `
attribute vec2 aGrid;
uniform float uTime;
uniform vec2 uPointer;
uniform vec2 uViewport;
uniform float uDpr;
varying float vDepth;

void main() {
  vec2 pos = aGrid;
  // soft wave motion: two crossed sine fields
  float wave = sin(pos.x * 6.0 + uTime * 0.6) * 0.35
             + sin(pos.y * 4.0 - uTime * 0.4) * 0.35
             + sin((pos.x + pos.y) * 3.0 + uTime * 0.25) * 0.3;
  vDepth = wave * 0.5 + 0.5;
  // pointer-reactive drift, subtle only
  pos += uPointer * 0.03 * (0.4 + vDepth);
  gl_Position = vec4(pos, 0.0, 1.0);
  gl_PointSize = (1.0 + vDepth * 2.0) * uDpr;
}
`

const FRAG = `
precision mediump float;
varying float vDepth;

void main() {
  vec2 uv = gl_PointCoord - 0.5;
  float d = length(uv);
  if (d > 0.5) discard;
  float soft = smoothstep(0.5, 0.1, d);
  // depth fade: far dots green-grey, near dots lift toward #C8E6C9
  vec3 grey = vec3(0.28, 0.38, 0.34);
  vec3 cyan = vec3(0.784, 0.902, 0.788);
  vec3 color = mix(grey, cyan, smoothstep(0.55, 1.0, vDepth) * 0.8);
  gl_FragColor = vec4(color, soft * (0.08 + vDepth * 0.22));
}
`

function DotMatrixField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const gl = canvas.getContext("webgl", { alpha: true, antialias: false })
    if (!gl) return // DOM fallback: section reads fine on plain dark green

    const pointer = { x: 0, y: 0, tx: 0, ty: 0 }
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    let raf = 0
    let disposed = false
    let teardownScene: (() => void) | null = null

    const setupScene = () => {
      if (disposed || gl.isContextLost()) return

      const compile = (type: number, src: string) => {
        const s = gl.createShader(type)!
        gl.shaderSource(s, src)
        gl.compileShader(s)
        return s
      }
      const program = gl.createProgram()!
      gl.attachShader(program, compile(gl.VERTEX_SHADER, VERT))
      gl.attachShader(program, compile(gl.FRAGMENT_SHADER, FRAG))
      gl.linkProgram(program)
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return
      gl.useProgram(program)

      // sparse dot grid in clip space
      const COLS = 90
      const ROWS = 50
      const grid = new Float32Array(COLS * ROWS * 2)
      let i = 0
      for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < COLS; x++) {
          grid[i++] = (x / (COLS - 1)) * 2 - 1
          grid[i++] = (y / (ROWS - 1)) * 2 - 1
        }
      }
      const buf = gl.createBuffer()
      gl.bindBuffer(gl.ARRAY_BUFFER, buf)
      gl.bufferData(gl.ARRAY_BUFFER, grid, gl.STATIC_DRAW)
      const aGrid = gl.getAttribLocation(program, "aGrid")
      gl.enableVertexAttribArray(aGrid)
      gl.vertexAttribPointer(aGrid, 2, gl.FLOAT, false, 0, 0)

      const uTime = gl.getUniformLocation(program, "uTime")
      const uPointer = gl.getUniformLocation(program, "uPointer")
      const uDpr = gl.getUniformLocation(program, "uDpr")

      gl.enable(gl.BLEND)
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
      gl.clearColor(0, 0, 0, 0)

      const dpr = Math.min(window.devicePixelRatio || 1, 2) // DPR clamp
      const resize = () => {
        canvas.width = canvas.clientWidth * dpr
        canvas.height = canvas.clientHeight * dpr
        gl.viewport(0, 0, canvas.width, canvas.height)
      }
      resize()
      window.addEventListener("resize", resize)
      gl.uniform1f(uDpr, dpr)

      const start = performance.now()
      const frame = () => {
        if (disposed || gl.isContextLost()) return
        const t = (performance.now() - start) / 1000
        pointer.x += (pointer.tx - pointer.x) * 0.04
        pointer.y += (pointer.ty - pointer.y) * 0.04
        gl.uniform1f(uTime, t)
        gl.uniform2f(uPointer, pointer.x, pointer.y)
        gl.clear(gl.COLOR_BUFFER_BIT)
        gl.drawArrays(gl.POINTS, 0, COLS * ROWS)
        if (!reducedMotion) raf = requestAnimationFrame(frame)
      }
      frame()

      teardownScene = () => {
        cancelAnimationFrame(raf)
        window.removeEventListener("resize", resize)
      }
    }

    const onPointer = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect()
      pointer.tx = ((e.clientX - r.left) / r.width) * 2 - 1
      pointer.ty = -(((e.clientY - r.top) / r.height) * 2 - 1)
    }
    window.addEventListener("pointermove", onPointer)

    // context-loss recovery: preventDefault marks the context restorable, then
    // we proactively request restoration; on restore, rebuild the whole scene
    // (all GL resources are gone)
    const requestRestore = () => {
      setTimeout(() => {
        if (disposed) return
        try {
          gl.getExtension("WEBGL_lose_context")?.restoreContext()
        } catch {
          // not restorable (event wasn't preventDefault-ed) — nothing to do
        }
      }, 0)
    }
    const onLost = (e: Event) => {
      e.preventDefault()
      teardownScene?.()
      teardownScene = null
      requestRestore()
    }
    const onRestored = () => setupScene()
    canvas.addEventListener("webglcontextlost", onLost)
    canvas.addEventListener("webglcontextrestored", onRestored)

    if (gl.isContextLost()) {
      // context was lost before this mount (browser eviction) — try to revive
      requestRestore()
    } else {
      setupScene()
    }

    return () => {
      // Do NOT loseContext() here: React StrictMode remounts reuse the same
      // canvas, and a context lost during cleanup (with its restore listener
      // already removed) can never be restored — the section stays blank on
      // route re-entry. Unreferenced canvases release their contexts on GC.
      disposed = true
      teardownScene?.()
      window.removeEventListener("pointermove", onPointer)
      canvas.removeEventListener("webglcontextlost", onLost)
      canvas.removeEventListener("webglcontextrestored", onRestored)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0 pointer-events-none" aria-hidden="true" />
}

// ─── Testimonial section ──────────────────────────────────────────────────────

const testimonials = [
  {
    quoteRo: "Sistemul BMS implementat de Sovitech ne-a redus costurile energetice cu 38% în primul an. ROI-ul a fost atins în mai puțin de 2 ani.",
    quoteEn: "The BMS system implemented by Sovitech reduced our energy costs by 38% in the first year. ROI was achieved in less than 2 years.",
    author: "Alexandru Ionescu",
    roleRo: "Director Tehnic, Therme Bucharest",
    roleEn: "Technical Director, Therme Bucharest",
    stat: "-38%",
    statLabelRo: "costuri energetice",
    statLabelEn: "energy costs",
  },
  {
    quoteRo: "Colaborarea cu Sovitech ne-a adus nu doar tehnologie de top, ci și o echipă care înțelege nevoile specifice ale industriei hoteliere.",
    quoteEn: "Working with Sovitech gave us not only top technology, but also a team that understands the specific needs of the hotel industry.",
    author: "Maria Popescu",
    roleRo: "Facility Manager, Radisson Blu",
    roleEn: "Facilities Manager, Radisson Blu",
    stat: "24/7",
    statLabelRo: "suport dedicat",
    statLabelEn: "dedicated support",
  },
  {
    quoteRo: "Monitorizarea în timp real și alertele automate ne-au permis să prevenim probleme costisitoare înainte să apară.",
    quoteEn: "Real-time monitoring and automated alerts allowed us to prevent costly problems before they occurred.",
    author: "Dan Georgescu",
    roleRo: "Director Operatiuni, Rompharm",
    roleEn: "Operations Director, Rompharm",
    stat: "0",
    statLabelRo: "avarii neplanificate",
    statLabelEn: "unplanned outages",
  },
]

export function AethelTestimonials() {
  const { t } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="relative bg-[#07201C] overflow-hidden">
      <DotMatrixField />

      <div className="relative z-10 max-w-7xl mx-auto px-8 py-24 lg:py-32">
        <div
          className="transition-all duration-300 ease-out"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(24px)" }}
        >
          <p className="text-sm font-semibold tracking-wider uppercase mb-6 text-[#C8E6C9]">
            • {t("Dovezi, nu promisiuni", "Proof, not promises")}
          </p>
          <h2
            className="font-light text-white mb-16 lg:mb-24"
            style={{ fontSize: "clamp(3rem, 8vw, 6rem)", lineHeight: 1, letterSpacing: "-0.05em" }}
          >
            {t("Clienții vorbesc.", "Clients speak.")}
            <br />
            <span className="text-[#A3A3A3]">{t("Cifrele confirmă.", "The numbers confirm.")}</span>
          </h2>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          {testimonials.map((item, idx) => (
            <div
              key={item.author}
              className="transition-all duration-300 ease-out"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "none" : "translateY(24px)",
                transitionDelay: `${150 + idx * 150}ms`,
              }}
            >
              {/* gradient border shell: hairline frame, content surface inset */}
              <div
                className="h-full p-px rounded-[2px]"
                style={{
                  background:
                    "linear-gradient(to right bottom, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.03) 49%, rgba(200,230,201,0.28) 51%, rgba(255,255,255,0.03) 100%)",
                }}
              >
                <figure className="group h-full flex flex-col justify-between rounded-[1px] bg-[#07201C]/70 backdrop-blur-[2px] p-[18px] lg:p-6 transition-colors duration-300 ease-out hover:bg-[#C8E6C9]/[0.04]">
                  <div>
                    <p className="text-4xl font-light text-[#C8E6C9] mb-1" style={{ letterSpacing: "-0.03em" }}>
                      {item.stat}
                    </p>
                    <p className="text-xs uppercase tracking-widest text-[#A3A3A3] mb-6">
                      {t(item.statLabelRo, item.statLabelEn)}
                    </p>
                    <blockquote className="text-base leading-6 text-[#A3A3A3] transition-colors duration-300 group-hover:text-white">
                      &ldquo;{t(item.quoteRo, item.quoteEn)}&rdquo;
                    </blockquote>
                  </div>
                  <figcaption className="mt-8 pt-4 border-t border-white/10">
                    <p className="text-sm text-white transition-colors duration-150 group-hover:text-[#C8E6C9]">
                      {item.author}
                    </p>
                    <p className="text-sm text-[#A3A3A3]">{t(item.roleRo, item.roleEn)}</p>
                  </figcaption>
                </figure>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
