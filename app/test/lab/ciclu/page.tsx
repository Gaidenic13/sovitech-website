import type { Metadata } from "next"
import { LifecycleSection } from "@/components/test/lifecycle-section"

// A lab for Fig. 05 alone: light spacers above and below, so the pin can be scrolled into and out of.
export const metadata: Metadata = {
  title: "Lab · Ciclul de viață",
  robots: { index: false, follow: false },
}

export default function CicluLabPage() {
  return (
    <>
      <div aria-hidden className="h-screen bg-[#F5F4F0]" />
      <LifecycleSection />
      <div aria-hidden className="h-screen bg-[#F5F4F0]" />
    </>
  )
}
