"use client"

import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { CaseStudySlider } from "@/components/case-study-slider"
import { BlogSlider } from "@/components/blog-slider"
import { StatsSection } from "@/components/stats-section"
import { useLanguage } from "@/lib/language-context"

export default function Home() {
  const { t } = useLanguage()

  return (
    <>
      <section className="relative bg-[#0D2E2B] min-h-[85vh] flex overflow-hidden items-center pb-0">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none">
          <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fingerprint-59QWj1Ik1Fd1hqzZduTrEqLz2j557z.svg" alt="" className="h-[800px] w-auto" />
        </div>
        <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
          <div className="grid gap-12 lg:grid-cols-2 items-end">
            <div className="max-w-3xl">
              <span className="text-sm font-semibold tracking-wider uppercase mb-4 block" style={{ background: "linear-gradient(90deg, #CDCBFF 0%, #C8E6C9 60%, #CDCBFF 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Building Management Systems
              </span>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight mb-4 text-white">
                {t("Construit sa controleze orice cladire.", "Built to control every building.")}
                <br />
                {t("Oriunde.", "Everywhere.")}
              </h1>
              <p className="text-lg font-light mt-4 max-w-xl mb-8 text-white/60">
                {t(
                  "Solutii BMS integrate care optimizeaza consumul de energie, reduc costurile operationale si mentin confortul ocupantilor in orice tip de cladire.",
                  "Integrated BMS solutions that optimize energy consumption, reduce operational costs and maintain occupant comfort in any type of building."
                )}
              </p>
              <div className="flex items-center gap-3">
                <Link href="/contact" className="inline-flex items-center gap-3 bg-[#0D2E2B] border border-white/20 text-sm px-6 py-2.5 rounded-full hover:border-white/40 transition-all group shadow-[0px_0px_1px_rgba(0,0,0,0.2),0px_4px_8px_rgba(0,0,0,0.08)]">
                  <span style={{ background: "linear-gradient(255deg, #FFB1B1 12%, #CDCBFF 59%, #C8E6C9 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                    {t("Cerere oferta gratuita", "Request a free quote")}
                  </span>
                  <ArrowRight className="h-4 w-4 text-white/60 group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <Link href="/calculator-roi" className="inline-flex items-center gap-2 text-white/50 text-sm hover:text-white/80 transition-colors">
                  {t("Calculator ROI", "ROI Calculator")} →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#F5F4F0]">
        <div className="max-w-7xl mx-auto px-8">
          <p className="text-sm text-[#888888] font-semibold mb-2">• {t("SERVICII", "SERVICES")}</p>
          <h2 className="text-5xl font-black text-[#0D2E2B] mb-16 tracking-tight">
            {t("Sectoare Industriale", "Industry Sectors")}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { href: "/sectoare/retail",      bg: "bg-[#C8E6C9]", textClass: "text-[#0D2E2B]", labelRo: "Retail",      labelEn: "Retail" },
              { href: "/sectoare/civil",       bg: "bg-[#C5C0F5]", textClass: "text-white",      labelRo: "Birouri",     labelEn: "Office" },
              { href: "/sectoare/horeca",      bg: "bg-[#8B7B5C]", textClass: "text-white",      labelRo: "HoReCa",      labelEn: "HoReCa" },
              { href: "/sectoare/medical",     bg: "bg-[#C8E6C9]", textClass: "text-[#0D2E2B]",  labelRo: "Medical",     labelEn: "Medical" },
              { href: "/sectoare/pharma",      bg: "bg-[#5C5FD4]", textClass: "text-white",      labelRo: "Farma",       labelEn: "Pharma" },
              { href: "/sectoare/industrial",  bg: "bg-[#0D2E2B]", textClass: "text-white",      labelRo: "Industrial",  labelEn: "Industrial" },
            ].map((s) => (
              <Link key={s.href} href={s.href} className="group">
                <div className={`${s.bg} ${s.textClass} rounded-xl p-8 flex flex-col justify-between min-h-[200px] hover:scale-[1.02] transition-transform duration-200`}>
                  <span className="text-xs tracking-widest uppercase font-semibold">{t(s.labelRo, s.labelEn)}</span>
                  <span className="text-sm opacity-60 self-end">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <StatsSection />

      <section className="py-24 bg-[#F5F4F0]">
        <div className="max-w-7xl mx-auto px-8">
          <p className="text-sm text-[#888888] font-semibold mb-4">• {t("DE INCREDERE", "TRUSTED BY")}</p>
          <h2 className="text-4xl font-black text-[#0D2E2B] mb-12 tracking-tight">
            {t("Parteneri de incredere", "Trusted Partners")}
          </h2>
          <div className="flex flex-wrap items-center gap-12 md:gap-16">
            {["SAUTER", "Therme", "Radisson", "Rompharm", "NTN SNR", "Floreasca BP"].map((p) => (
              <div key={p} className="text-2xl font-semibold text-[#0D2E2B]/40 hover:text-[#0D2E2B]/70 transition-colors">{p}</div>
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
              <p className="text-sm text-[#888888] font-semibold mb-3">• {t("DESPRE NOI", "ABOUT US")}</p>
              <h2 className="text-5xl font-black text-[#0D2E2B] tracking-tight leading-tight mb-6">
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
              <div className="h-48 overflow-hidden rounded-2xl bg-[#F5F4F0]"><img src="/diverse-team-member-smiling-professional-headshot.jpg" alt={t("Echipa Sovitech", "Sovitech team")} className="h-full w-full object-cover" /></div>
              <div className="h-48 overflow-hidden rounded-2xl bg-[#F5F4F0] mt-8"><img src="/professional-using-tablet-for-investment-managemen.jpg" alt={t("Echipa Sovitech", "Sovitech team")} className="h-full w-full object-cover" /></div>
              <div className="h-48 overflow-hidden rounded-2xl bg-[#F5F4F0] -mt-4"><img src="/asian-woman-professional-smiling-headshot.jpg" alt={t("Echipa Sovitech", "Sovitech team")} className="h-full w-full object-cover" /></div>
              <div className="h-48 overflow-hidden rounded-2xl bg-[#F5F4F0] mt-4"><img src="/businessman-professional-portrait.jpg" alt={t("Echipa Sovitech", "Sovitech team")} className="h-full w-full object-cover" /></div>
            </div>
          </div>
        </div>
      </section>

      <CaseStudySlider />
      <BlogSlider />

      <section className="bg-[#C5C0F5] py-24">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <h2 className="text-5xl font-black text-[#0D2E2B] max-w-2xl mx-auto leading-tight tracking-tight mb-4">
            {t("Gata pentru automatizare BMS?", "Ready for BMS automation?")}
          </h2>
          <p className="text-lg text-[#0D2E2B]/60 font-light mb-8">
            {t("Alatura-te clientilor care au incredere in Sovitech Control", "Join the clients who trust Sovitech Control")}
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-[#0D2E2B] border border-[#0D2E2B]/40 px-7 py-3.5 rounded-full text-sm shadow-[0px_0px_1px_rgba(0,0,0,0.2),0px_4px_8px_rgba(0,0,0,0.08)] hover:shadow-[0px_0px_1px_rgba(0,0,0,0.2),0px_8px_16px_rgba(0,0,0,0.12)] transition-all">
              <span style={{ background: "linear-gradient(255deg, #FFB1B1 12%, #CDCBFF 59%, #C8E6C9 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                {t("Cerere oferta", "Request a quote")}
              </span>
            </Link>
            <Link href="/produse" className="inline-flex items-center justify-center bg-[#0D2E2B]/15 border border-[#0D2E2B]/20 text-[#0D2E2B] px-7 py-3.5 rounded-full text-sm font-medium hover:bg-[#BDBBFF]/30 hover:border-[#BDBBFF]/40 transition-all">
              {t("Produse SAUTER", "SAUTER Products")}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
