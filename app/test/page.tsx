import type { Metadata } from "next"
import { TestClient } from "./test-client"

// A sandbox page for the Hairline "flux" figure: kept out of the index and the sitemap.
export const metadata: Metadata = {
  title: "Test · Fluxul de date BMS",
  robots: { index: false, follow: false },
}

export default function TestPage() {
  return <TestClient />
}
