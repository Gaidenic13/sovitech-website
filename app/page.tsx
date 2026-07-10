"use client"

import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { AethelTestimonials } from "@/components/aethel-testimonials"
import { HeroField } from "@/components/hero-field"
import { CaseStudySlider } from "@/components/case-study-slider"
import { BlogSlider } from "@/components/blog-slider"
import { StatsSection } from "@/components/stats-section"
import { sectors, localizeSector } from "@/lib/sector-data"
import { useLanguage } from "@/lib/language-context"

export default function Home() {
  const { t, lang } = useLanguage()

  return (
    <>
      <section className="relative bg-[#07201C] min-h-[90vh] flex overflow-hidden items-center">
        <HeroField />
        <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10 py-24">
          <div className="flex items-center">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-3 text-sm font-semibold tracking-wider uppercase mb-8 text-white/70">
                <span className="w-2 h-2 bg-white/70 rounded-[1px]" aria-hidden="true" />
                Building Management Systems
              </span>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-light leading-none tracking-tighter mb-8 text-white">
                {t("Construit să controleze orice clădire.", "Built to control every building.")}
                <br />
                {t("Oriunde.", "Everywhere.")}
              </h1>
              <p className="text-base leading-6 max-w-xl mb-12 text-white/60">
                {t(
                  "Soluții BMS integrate care optimizează consumul de energie, reduc costurile operaționale și mențin confortul ocupanților în orice tip de clădire.",
                  "Integrated BMS solutions that optimize energy consumption, reduce operational costs and maintain occupant comfort in any type of building."
                )}
              </p>
              <div className="flex items-stretch">
                <Link href="/contact" className="inline-flex items-center bg-white text-black text-base px-8 py-4 rounded-[1px] transition-colors duration-300 hover:bg-[#C8E6C9]">
                  {t("Cerere ofertă gratuită", "Request a free quote")}
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
                  {t("De încredere în", "Trusted across")}{" "}
                  <span className="text-white font-semibold">100+</span>{" "}
                  {t("proiecte BMS finalizate", "completed BMS projects")}
                </p>
              </div>
            </div>

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
            {sectors.map((raw) => localizeSector(raw, lang)).map((s) => (
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
                    {t("Explorează sectorul", "Explore sector")}
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
          <p className="text-sm text-[#888888] font-semibold tracking-wider uppercase mb-4">• {t("De încredere", "Trusted by")}</p>
          <h2 className="text-4xl font-light text-[#0D2E2B] mb-12 tracking-tighter">
            {t("Parteneri de încredere", "Trusted Partners")}
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
                {t("Soluții complete de automatizare BMS", "Complete BMS Automation Solutions")}
              </h2>
              <p className="text-base text-[#888888] font-light leading-relaxed mb-4">
                {t(
                  "Sovitech Control este unul dintre liderii din România în automatizarea clădirilor și integrarea completă BMS. Echipa noastră, cu experiență în construcții și automatizări, este pregătită să aducă clădirile la viață.",
                  "Sovitech Control is one of Romania's leaders in building automation and full BMS integration. Our team, experienced in construction and automation, is ready to bring buildings to life."
                )}
              </p>
              <p className="text-base text-[#888888] font-light leading-relaxed mb-8">
                {t(
                  "Oferim servicii complete: proiectare BMS, instalare și implementare, programare cu software licențiat, integrare de sisteme, testare și punere în funcțiune, precum și service și mentenanță.",
                  "We offer complete services: BMS design, installation and implementation, programming with licensed software, systems integration, testing and commissioning, as well as service and maintenance."
                )}
              </p>
              <Link href="/servicii" className="inline-flex items-center gap-2 text-sm font-medium text-[#1F6B4A] hover:gap-3 transition-all">
                {t("Explorează serviciile noastre BMS", "Explore our full BMS services")}
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
                • {t("Următorul pas", "Next step")}
              </p>
              <h2 className="text-5xl md:text-6xl font-light text-[#0D2E2B] leading-none tracking-tighter mb-4">
                {t("Gata pentru automatizare BMS?", "Ready for BMS automation?")}
              </h2>
              <p className="text-lg text-[#0D2E2B]/60 font-light">
                {t("Alătură-te clienților care au încredere în Sovitech Control", "Join the clients who trust Sovitech Control")}
              </p>
            </div>
            <div className="flex items-stretch lg:justify-self-end">
              <Link href="/contact" className="inline-flex items-center bg-[#0D2E2B] text-white text-base px-8 py-4 rounded-[1px] transition-colors duration-300 hover:bg-[#1F6B4A]">
                {t("Cerere ofertă", "Request a quote")}
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
