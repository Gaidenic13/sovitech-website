"use client"

import type { ReactNode } from "react"

type Tone = "dark" | "light"

/** Corner ticks for a figure's frame: a drafting-table detail, the accent at a fraction. */
export function Ticks({ tone = "dark" }: { tone?: Tone }) {
  const base = `pointer-events-none absolute size-3 ${tone === "dark" ? "border-[#C8E6C9]/50" : "border-[#1F6B4A]/50"}`
  return (
    <>
      <span aria-hidden className={`${base} -left-px -top-px border-l border-t`} />
      <span aria-hidden className={`${base} -right-px -top-px border-r border-t`} />
      <span aria-hidden className={`${base} -bottom-px -left-px border-b border-l`} />
      <span aria-hidden className={`${base} -bottom-px -right-px border-b border-r`} />
    </>
  )
}

/**
 * The frame every figure on /test sits in: a hairline border with corner
 * ticks, a monospace tag top-left, a live read-out top-right (accent while
 * something is chosen), and two quiet notes along the bottom edge.
 */
export function FigureFrame({
  tag,
  live,
  liveOn,
  footLeft,
  footRight,
  tone = "dark",
  announce = false,
  className = "",
  children,
}: {
  tag: ReactNode
  live: ReactNode
  liveOn: boolean
  footLeft?: ReactNode
  footRight?: ReactNode
  tone?: Tone
  /** Announce read-out changes to screen readers; off by default, so a self-playing lap stays quiet. */
  announce?: boolean
  className?: string
  children: ReactNode
}) {
  const dark = tone === "dark"
  const accent = dark ? "text-[#C8E6C9]" : "text-[#1F6B4A]"
  return (
    <figure className={`relative rounded-[2px] border ${dark ? "border-white/10" : "border-[#0D2E2B]/10"} ${className}`}>
      <Ticks tone={tone} />
      <figcaption className="pointer-events-none absolute inset-x-4 top-4 z-10 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.18em] sm:inset-x-5">
        <span className={dark ? "text-white/50" : "text-[#0D2E2B]/55"}>{tag}</span>
        <span className="flex items-center gap-2 tabular-nums" aria-live={announce ? "polite" : "off"}>
          <span
            aria-hidden
            className={`size-1.5 rounded-full transition-colors duration-300 ${
              liveOn ? (dark ? "bg-[#C8E6C9]" : "bg-[#1F6B4A]") : dark ? "bg-white/25" : "bg-[#0D2E2B]/20"
            }`}
          />
          <span className={liveOn ? accent : dark ? "text-white/55" : "text-[#0D2E2B]/60"}>{live}</span>
        </span>
      </figcaption>
      {children}
      {(footLeft || footRight) && (
        <div
          className={`pointer-events-none absolute inset-x-4 bottom-4 flex justify-between font-mono text-[10px] uppercase tracking-[0.18em] sm:inset-x-5 ${
            dark ? "text-white/40" : "text-[#0D2E2B]/50"
          }`}
        >
          <span>{footLeft}</span>
          <span className="hidden sm:inline">{footRight}</span>
        </div>
      )}
    </figure>
  )
}
