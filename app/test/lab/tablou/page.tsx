import type { Metadata } from "next"
import { TablouSection } from "@/components/test/tablou-section"

// A lab page for the "tablou" section alone (Fig. 02 on /test), to check it in isolation: kept out of the index.
export const metadata: Metadata = {
  title: "Lab · Tabloul de automatizare",
  robots: { index: false, follow: false },
}

export default function TablouLabPage() {
  return <TablouSection />
}
