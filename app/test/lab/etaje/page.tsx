import type { Metadata } from "next"
import { EtajeSection } from "@/components/test/etaje-section"

// A lab route for one section of /test, Fig. 04 "etaje": kept out of the index.
export const metadata: Metadata = {
  title: "Test · Etaje",
  robots: { index: false, follow: false },
}

export default function EtajeLabPage() {
  return <EtajeSection />
}
