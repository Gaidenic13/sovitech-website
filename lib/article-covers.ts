// Cover images for the first-wave articles, keyed by slug (files in
// /public/coperti, named after the slug they belong to). One map serves the
// article pages, the archive/hub cards and the og:image metadata, so a cover
// can never drift from its article.

const covers: Record<string, string> = {
  "sisteme-bms-cladiri": "/coperti/sisteme-bms-cladiri.png",
  "obligatie-bacs-legea-372-2005": "/coperti/obligatie-bacs-legea-372-2005.png",
  "scada-vs-bms": "/coperti/scada-vs-bms.png",
  "cost-sistem-bms": "/coperti/cost-sistem-bms.png",
  "caiet-de-sarcini-bms": "/coperti/caiet-de-sarcini-bms.png",
  "epbd-2024-romania": "/coperti/epbd-2024-romania.png",
  "ce-este-un-sistem-bms": "/coperti/ce-este-un-sistem-bms.png",
  "kpi-performanta-cladire": "/coperti/kpi-performanta-cladire.png",
  "date-esg-cladiri": "/coperti/date-esg-cladiri.png",
  "monitorizare-calitate-aer-epbd": "/coperti/monitorizare-calitate-aer-epbd.png",
}

/** Cover path for an article slug, or undefined when none exists. */
export function coverFor(slug: string): string | undefined {
  return covers[slug]
}

// Background color of each cover artwork. Card frames paint this behind the
// inset image so the 10% inner margin is indistinguishable from the cover's
// own background.
const coverBgs: Record<string, string> = {
  "sisteme-bms-cladiri": "#0A231E",
  "obligatie-bacs-legea-372-2005": "#5C5FD4",
  "scada-vs-bms": "#C5BFF0",
  "cost-sistem-bms": "#0A231E",
  "caiet-de-sarcini-bms": "#C8E6C9",
  "epbd-2024-romania": "#0A231E",
  "ce-este-un-sistem-bms": "#5C5FD4",
  "kpi-performanta-cladire": "#0A231E",
  "date-esg-cladiri": "#C5BFF0",
  "monitorizare-calitate-aer-epbd": "#C8E6C9",
}

/** Background color of a cover, for seamless inset framing. */
export function coverBgFor(slug: string): string {
  return coverBgs[slug] ?? "#0A231E"
}
