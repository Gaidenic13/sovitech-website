"use client"

import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { AethelTestimonials } from "@/components/aethel-testimonials"
import { HeroField } from "@/components/hero-field"
import { CaseStudySlider } from "@/components/case-study-slider"
import { BlogSlider } from "@/components/blog-slider"
import { StatsSection } from "@/components/stats-section"
import { sectors } from "@/lib/sector-data"
import { useLanguage } from "@/lib/language-context"

export default function Home() {
  const { t } = useLanguage()

  return (
    <>
      <section className="relative bg-[#07201C] min-h-[90vh] flex overflow-hidden items-center">
        <HeroField />
        <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10 py-24">
          <div className="grid gap-16 lg:grid-cols-[1.5fr_1fr] items-center">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-3 text-sm font-semibold tracking-wider uppercase mb-8 text-white/70">
                <span className="w-2 h-2 bg-white/70 rounded-[1px]" aria-hidden="true" />
                Building Management Systems
              </span>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-light leading-none tracking-tighter mb-8 text-white">
                {t("Construit sa controleze orice cladire.", "Built to control every building.")}
                <br />
                {t("Oriunde.", "Everywhere.")}
              </h1>
              <p className="text-base leading-6 max-w-xl mb-12 text-white/60">
                {t(
                  "Solutii BMS integrate care optimizeaza consumul de energie, reduc costurile operationale si mentin confortul ocupantilor in orice tip de cladire.",
                  "Integrated BMS solutions that optimize energy consumption, reduce operational costs and maintain occupant comfort in any type of building."
                )}
              </p>
              <div className="flex items-stretch">
                <Link href="/contact" className="inline-flex items-center bg-white text-black text-base px-8 py-4 rounded-[1px] transition-colors duration-300 hover:bg-[#C8E6C9]">
                  {t("Cerere oferta gratuita", "Request a free quote")}
                </Link>
                <Link href="/calculator-roi" aria-label={t("Calculator ROI", "ROI Calculator")} className="group inline-flex items-center justify-center w-14 bg-white/10 border border-white/15 rounded-[1px] ml-px transition-colors duration-300 hover:bg-white/20">
                  <ArrowRight className="h-5 w-5 text-white transition-transform duration-150 group-hover:translate-x-0.5" />
                </Link>
              </div>
              <div className="mt-14 pt-8 border-t border-white/10 flex items-center gap-4 max-w-xl">
                <div className="flex -space-x-2">
                  {["/professional-male-engineer-headshot.jpg", "/asian-woman-professional-smiling-headshot.jpg", "/businessman-professional-portrait.jpg"].map((src) => (
                    <img key={src} src={src} alt="" className="w-9 h-9 rounded-full object-cover grayscale ring-2 ring-[#07201C]" />
                  ))}
                </div>
                <p className="text-sm text-white/60">
                  {t("De incredere in", "Trusted across")}{" "}
                  <span className="text-white font-semibold">100+</span>{" "}
                  {t("proiecte BMS finalizate", "completed BMS projects")}
                </p>
              </div>
            </div>

            <nav className="hidden lg:flex flex-col gap-10 justify-self-end w-64" aria-label={t("Navigare rapida", "Quick navigation")}>
              {[
                {
                  heading: t("Servicii", "Services"),
                  links: [
                    { label: t("Proiectare BMS", "BMS Design"), href: "/servicii/proiectare" },
                    { label: t("Executie Sisteme", "System Installation"), href: "/servicii/executie" },
                    { label: t("Integrare Sisteme", "Systems Integration"), href: "/servicii/integrare" },
                    { label: t("Mentenanta", "Maintenance"), href: "/servicii/mentenanta" },
                  ],
                },
                {
                  heading: t("Sectoare", "Sectors"),
                  links: [
                    { label: t("Birouri", "Office"), href: "/sectoare/civil" },
                    { label: "HoReCa", href: "/sectoare/horeca" },
                    { label: "Medical", href: "/sectoare/medical" },
                    { label: "Industrial", href: "/sectoare/industrial" },
                  ],
                },
                {
                  heading: t("Resurse", "Resources"),
                  links: [
                    { label: t("Ghid BMS Gratuit", "Free BMS Guide"), href: "/ghid-bms" },
                    { label: t("Calculator ROI", "ROI Calculator"), href: "/calculator-roi" },
                    { label: t("Referinte", "References"), href: "/resurse/referinte" },
                  ],
                },
              ].map((group, gi, groups) => (
                <div key={group.heading} className={gi < groups.length - 1 ? "pb-10 border-b border-white/10" : ""}>
                  <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#C8E6C9]/70 mb-5">{group.heading}</p>
                  <ul className="space-y-4">
                    {group.links.map((link) => (
                      <li key={link.href}>
                        <Link href={link.href} className="text-lg text-white/70 transition-colors duration-150 hover:text-white">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#F5F4F0]">
        <div className="max-w-7xl mx-auto px-8">
          <p className="text-sm text-[#888888] font-semibold tracking-wider uppercase mb-2">• {t("Servicii", "Services")}</p>
          <h2 className="text-5xl font-light text-[#0D2E2B] mb-16 tracking-tighter">
            {t("Sectoare Industriale", "Industry Sectors")}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {sectors.map((s) => (
              <Link key={s.slug} href={`/sectoare/${s.slug}`} className="group rounded-[2px] p-8 flex flex-col justify-between min-h-[200px]" style={{ backgroundColor: s.accentColor }}>
                <div>
                  <span className="text-xs tracking-widest uppercase font-semibold" style={{ color: s.accentTextDark ? "#0D2E2B" : "rgba(255,255,255,0.9)" }}>
                    {s.subtitle}
                  </span>
                  <h3 className="text-2xl font-light mt-2 tracking-tighter leading-tight" style={{ color: s.accentTextDark ? "#0D2E2B" : "#ffffff" }}>
                    {s.title}
                  </h3>
                </div>
                <div className="flex items-center justify-between mt-6">
                  <span className="text-sm font-medium" style={{ color: s.accentTextDark ? "#0D2E2B80" : "rgba(255,255,255,0.9)" }}>
                    {t("Exploreaza sectorul", "Explore sector")}
                  </span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" style={{ color: s.accentTextDark ? "#0D2E2B" : "#ffffff" }} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <StatsSection />

      <section className="py-24 bg-[#F5F4F0]">
        <div className="max-w-7xl mx-auto px-8">
          <p className="text-sm text-[#888888] font-semibold tracking-wider uppercase mb-4">• {t("De incredere", "Trusted by")}</p>
          <h2 className="text-4xl font-light text-[#0D2E2B] mb-12 tracking-tighter">
            {t("Parteneri de incredere", "Trusted Partners")}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-[#0D2E2B]/10 border border-[#0D2E2B]/10">
            {["SAUTER", "Therme", "Radisson", "Rompharm", "NTN SNR", "Floreasca BP"].map((p) => (
              <div key={p} className="bg-[#F5F4F0] h-28 flex items-center justify-center px-4 text-lg font-semibold text-[#0D2E2B]/40 hover:text-[#0D2E2B] hover:bg-white transition-colors duration-300 text-center">
                {p}
              </div>
            ))}
          </div>
          <div className="mt-12">
            <Link href="/resurse/referinte" className="inline-flex items-center gap-2 text-sm font-medium text-[#1F6B4A] hover:gap-3 transition-all">
              {t("Vezi portofoliul complet", "View full portfolio")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid gap-16 lg:grid-cols-2 items-center">
            <div>
              <p className="text-sm text-[#888888] font-semibold tracking-wider uppercase mb-3">• {t("Despre noi", "About us")}</p>
              <h2 className="text-5xl font-light text-[#0D2E2B] tracking-tighter leading-tight mb-6">
                {t("Solutii Complete de Automatizare BMS", "Complete BMS Automation Solutions")}
              </h2>
              <p className="text-base text-[#888888] font-light leading-relaxed mb-4">
                {t(
                  "Sovitech Control este unul dintre liderii din Romania in automatizarea cladirilor si integrarea completa BMS. Echipa noastra, experimentata in constructii si automatizare, este pregatita sa aduca cladirile la viata.",
                  "Sovitech Control is one of Romania's leaders in building automation and full BMS integration. Our team, experienced in construction and automation, is ready to bring buildings to life."
                )}
              </p>
              <p className="text-base text-[#888888] font-light leading-relaxed mb-8">
                {t(
                  "Oferim servicii complete: proiectare BMS, instalare si implementare, programare cu software licentiat, integrare sisteme, testare si punere in functiune, precum si service si mentenanta.",
                  "We offer complete services: BMS design, installation and implementation, programming with licensed software, systems integration, testing and commissioning, as well as service and maintenance."
                )}
              </p>
              <Link href="/servicii" className="inline-flex items-center gap-2 text-sm font-medium text-[#1F6B4A] hover:gap-3 transition-all">
                {t("Exploreaza serviciile noastre BMS", "Explore our full BMS services")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="h-48 overflow-hidden rounded-[2px] bg-[#F5F4F0]"><img src="/diverse-team-member-smiling-professional-headshot.jpg" alt={t("Echipa Sovitech", "Sovitech team")} className="h-full w-full object-cover" /></div>
              <div className="h-48 overflow-hidden rounded-[2px] bg-[#F5F4F0] mt-8"><img src="/professional-using-tablet-for-investment-managemen.jpg" alt={t("Echipa Sovitech", "Sovitech team")} className="h-full w-full object-cover" /></div>
              <div className="h-48 overflow-hidden rounded-[2px] bg-[#F5F4F0] -mt-4"><img src="/asian-woman-professional-smiling-headshot.jpg" alt={t("Echipa Sovitech", "Sovitech team")} className="h-full w-full object-cover" /></div>
              <div className="h-48 overflow-hidden rounded-[2px] bg-[#F5F4F0] mt-4"><img src="/businessman-professional-portrait.jpg" alt={t("Echipa Sovitech", "Sovitech team")} className="h-full w-full object-cover" /></div>
            </div>
          </div>
        </div>
      </section>

      <CaseStudySlider />
      <BlogSlider />

      <AethelTestimonials />

      <section className="bg-[#C5C0F5] py-24">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] items-end">
            <div>
              <p className="text-sm font-semibold tracking-wider uppercase mb-4 text-[#0D2E2B]/60">
                • {t("Urmatorul pas", "Next step")}
              </p>
              <h2 className="text-5xl md:text-6xl font-light text-[#0D2E2B] leading-none tracking-tighter mb-4">
                {t("Gata pentru automatizare BMS?", "Ready for BMS automation?")}
              </h2>
              <p className="text-lg text-[#0D2E2B]/60 font-light">
                {t("Alatura-te clientilor care au incredere in Sovitech Control", "Join the clients who trust Sovitech Control")}
              </p>
            </div>
            <div className="flex items-stretch lg:justify-self-end">
              <Link href="/contact" className="inline-flex items-center bg-[#0D2E2B] text-white text-base px-8 py-4 rounded-[1px] transition-colors duration-300 hover:bg-[#1F6B4A]">
                {t("Cerere oferta", "Request a quote")}
              </Link>
              <Link href="/produse" aria-label={t("Produse SAUTER", "SAUTER Products")} className="group inline-flex items-center justify-center w-14 bg-[#0D2E2B]/10 border border-[#0D2E2B]/20 rounded-[1px] ml-px transition-colors duration-300 hover:bg-[#0D2E2B]/20">
                <ArrowRight className="h-5 w-5 text-[#0D2E2B] transition-transform duration-150 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
