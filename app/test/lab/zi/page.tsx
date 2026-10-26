import type { Metadata } from "next"
import { DayCycleSection } from "@/components/test/day-cycle-section"

// A lab for Fig. 03 alone: a screen of room before and after, so the pin can be scrolled through.
export const metadata: Metadata = {
  title: "Lab · O zi în clădire",
  robots: { index: false, follow: false },
}

export default function DayCycleLab() {
  return (
    <>
      <div className="flex h-screen items-end justify-center bg-[#F5F4F0] pb-10 font-mono text-[11px] uppercase tracking-[0.2em] text-[#0D2E2B]/40">
        Fig. 03 ↓
      </div>
      <DayCycleSection />
      <div className="h-screen bg-[#F5F4F0]" />
    </>
  )
}
