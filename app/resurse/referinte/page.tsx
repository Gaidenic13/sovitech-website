import { Check } from "lucide-react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const categoryMeta: Record<string, { label: string; color: string; textOnBg: string }> = {
  horeca:     { label: "HORECA & Wellness",       color: "#8B7B5C", textOnBg: "#ffffff" },
  office:     { label: "Office Buildings",         color: "#C5C0F5", textOnBg: "#0D2E2B" },
  medical:    { label: "Medical & Pharma",         color: "#C8E6C9", textOnBg: "#0D2E2B" },
  industrial: { label: "Industrial & Logistics",   color: "#0D2E2B", textOnBg: "#ffffff" },
  retail:     { label: "Retail & Shopping",        color: "#5C5FD4", textOnBg: "#ffffff" },
}

const impactMetrics = [
  { value: "35%", label: "Reduction in operational costs", desc: "Average across our clients" },
  { value: "42%", label: "Energy savings",                  desc: "Achieved through BMS systems" },
  { value: "28%", label: "CO₂ reduction",                   desc: "Emissions reduced annually" },
  { value: "15%", label: "Increase in property value",      desc: "Through BMS implementation" },
]

const references: Record<string, { name: string; location: string; description: string; scope: string; year: string }[]> = {
  horeca: [
    { name: "Therme Bucuresti",       location: "Bucharest", description: "Complete BMS system for the largest wellness complex in Europe",             scope: "HVAC control, lighting, energy",          year: "2023" },
    { name: "Radisson Blu Hotel",     location: "Bucharest", description: "Full automation for a 5-star hotel with 428 rooms",                         scope: "BMS, temperature control, ventilation",   year: "2022" },
    { name: "Hotel InterContinental", location: "Bucharest", description: "Upgrade of existing BMS system and protocol integration",                   scope: "BMS upgrade, KNX integration",            year: "2021" },
  ],
  office: [
    { name: "Floreasca Business Park", location: "Bucharest",   description: "BMS system for a class-A office complex, 45,000 m²",                    scope: "Centralised control, energy reporting",   year: "2023" },
    { name: "Bucharest Tower Center",  location: "Bucharest",   description: "Full automation for a 20-storey office building",                        scope: "BMS, access control, lighting",           year: "2022" },
    { name: "Regina Maria Office",     location: "Cluj-Napoca", description: "BMS system for Regina Maria corporate headquarters",                     scope: "HVAC, ventilation, monitoring",           year: "2021" },
  ],
  medical: [
    { name: "Rompharm Pharma",  location: "Otopeni",    description: "BMS system for a pharmaceutical factory with strict requirements",             scope: "Temperature, humidity, pressure control",     year: "2023" },
    { name: "Spitalul Sanador", location: "Bucharest",  description: "Full automation for a modern private hospital",                                scope: "Medical BMS, critical systems backup",        year: "2022" },
    { name: "Clinica MedLife",  location: "Timisoara",  description: "BMS system for a clinic with 8 medical specialities",                         scope: "HVAC control, air quality monitoring",        year: "2021" },
  ],
  industrial: [
    { name: "Auto Production Hall", location: "Pitesti",    description: "Industrial hall automation, 12,000 m²",                                   scope: "Ventilation control, industrial lighting",   year: "2023" },
    { name: "Logistics Depot",      location: "Bucharest",  description: "BMS system for a 25,000 m² logistics centre",                             scope: "Temperature, humidity, energy control",      year: "2022" },
    { name: "Electronics Factory",  location: "Cluj",       description: "BMS for a factory with clean rooms",                                      scope: "Pressure control, filtration, monitoring",   year: "2021" },
  ],
  retail: [
    { name: "Mega Mall",      location: "Bucharest", description: "BMS system for an 80,000 m² shopping centre",                                   scope: "HVAC control, lighting, energy",             year: "2022" },
    { name: "Promenada Mall", location: "Brasov",    description: "Full automation for a mall with 150 retail units",                               scope: "Centralised BMS, energy monitoring",         year: "2021" },
  ],
}

export default function ReferintePage() {
  return (
    <div className="min-h-screen bg-[#F5F4F0]">

      {/* Hero */}
      <section className="bg-[#07201C] min-h-[45vh] flex items-end pb-16 relative overflow-hidden">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fingerprint-59QWj1Ik1Fd1hqzZduTrEqLz2j557z.svg"
            alt=""
            className="h-[600px] w-auto"
          />
        </div>
        <div className="max-w-7xl mx-auto px-8 w-full relative z-10">
          <span className="text-[#C8E6C9] text-xs font-semibold tracking-widest uppercase mb-4 block">• Portfolio</span>
          <h1 className="text-5xl md:text-7xl font-light text-white leading-tight tracking-tighter">
            Our references<br />— our calling card.
          </h1>
          <p className="text-lg text-white/60 font-light mt-4 max-w-xl">
            The projects we have delivered over the years are the best testament to the trust our clients have placed in us.
          </p>
        </div>
      </section>

      {/* Impact metrics */}
      <section className="py-24 bg-[#F5F4F0]">
        <div className="max-w-7xl mx-auto px-8">
          <p className="text-xs text-[#888888] font-semibold tracking-widest uppercase mb-3">• Impact</p>
          <h2 className="text-5xl font-light text-[#0D2E2B] tracking-tighter mb-12">Measurable impact</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {[
              { ...impactMetrics[0], bg: "#C8E6C9",  text: "#1F6B4A",  onBg: "#0D2E2B" },
              { ...impactMetrics[1], bg: "#C5C0F5",  text: "#5C5FD4",  onBg: "#0D2E2B" },
              { ...impactMetrics[2], bg: "#0D2E2B",  text: "#C8E6C9",  onBg: "#ffffff" },
              { ...impactMetrics[3], bg: "#8B7B5C",  text: "#ffffff",     onBg: "#ffffff" },
            ].map((m, i) => (
              <div key={i} className="rounded-[2px] p-8 flex flex-col justify-between min-h-[180px]" style={{ backgroundColor: m.bg }}>
                <p className="text-4xl font-light" style={{ color: m.text === "#ffffff" ? m.onBg : m.text }}>{m.value}</p>
                <div>
                  <p className="text-sm font-semibold" style={{ color: m.onBg }}>{m.label}</p>
                  <p className="text-xs font-light mt-1" style={{ color: `${m.onBg}99` }}>{m.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Aggregates */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { n: "150+", label: "Completed projects",    color: "#C5C0F5", text: "#5C5FD4", onBg: "#0D2E2B" },
              { n: "92%",  label: "Clients from referrals", color: "#C8E6C9", text: "#1F6B4A", onBg: "#0D2E2B" },
              { n: "15+",  label: "Years of experience",    color: "#0D2E2B", text: "#C8E6C9", onBg: "#ffffff" },
            ].map((s, i) => (
              <div key={i} className="rounded-[2px] p-8 text-center" style={{ backgroundColor: s.color }}>
                <p className="text-4xl font-light mb-1" style={{ color: s.text }}>{s.n}</p>
                <p className="text-sm font-medium" style={{ color: s.onBg }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects by category */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-8">
          <p className="text-xs text-[#888888] font-semibold tracking-widest uppercase mb-3">• Projects</p>
          <h2 className="text-5xl font-light text-[#0D2E2B] tracking-tighter mb-16">Completed projects</h2>

          <div className="space-y-20">
            {Object.entries(references).map(([category, projects]) => {
              const meta = categoryMeta[category]
              return (
                <div key={category}>
                  {/* Category header */}
                  <div className="flex items-center gap-4 mb-8">
                    <div
                      className="px-3 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase"
                      style={{ backgroundColor: meta.color, color: meta.textOnBg }}
                    >
                      {meta.label}
                    </div>
                    <div className="h-px flex-1 bg-[#0D2E2B]/10" />
                    <span className="text-xs text-[#888888] font-medium">{projects.length} projects</span>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {projects.map((project, i) => (
                      <div
                        key={i}
                        className="group rounded-[2px] border-2 border-transparent bg-[#F5F4F0] p-6 transition-all duration-200 hover:border-[#0D2E2B]/10 hover:bg-white"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h4 className="font-light text-base text-[#0D2E2B]">{project.name}</h4>
                            <p className="text-xs text-[#888888] font-light mt-0.5">{project.location}</p>
                          </div>
                          <span
                            className="text-xs font-semibold px-2 py-1 rounded-[1px] shrink-0"
                            style={{ backgroundColor: meta.color + "30", color: meta.textOnBg === "#ffffff" ? meta.color : "#0D2E2B" }}
                          >
                            {project.year}
                          </span>
                        </div>
                        <p className="text-sm text-[#888888] font-light leading-relaxed mb-4">{project.description}</p>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: meta.color }}>
                            <Check className="h-2.5 w-2.5" style={{ color: meta.textOnBg }} />
                          </div>
                          <span className="text-xs font-medium text-[#0D2E2B]">{project.scope}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Trust section */}
      <section className="bg-[#F5F4F0] py-24">
        <div className="max-w-7xl mx-auto px-8">
          <p className="text-xs text-[#888888] font-semibold tracking-widest uppercase mb-3">• Trust</p>
          <h2 className="text-5xl font-light text-[#0D2E2B] tracking-tighter mb-6">Growth through trust</h2>
          <p className="text-base text-[#888888] font-light max-w-2xl mb-12 leading-relaxed">
            The growing number of new clients who reach us through referrals confirms the quality of our services. Close collaboration with every client and measurable results have made us the trusted partner for BMS automation in Romania.
          </p>
          <div className="grid grid-cols-3 gap-4 max-w-lg">
            {[
              { n: "98%",  label: "Client Satisfaction",   color: "#C8E6C9", text: "#1F6B4A",  onBg: "#0D2E2B" },
              { n: "24/7", label: "Technical Support",      color: "#C5C0F5", text: "#5C5FD4",  onBg: "#0D2E2B" },
              { n: "100%", label: "Projects Completed",     color: "#0D2E2B", text: "#C8E6C9",  onBg: "#ffffff" },
            ].map((s, i) => (
              <div key={i} className="rounded-[2px] p-6 text-center" style={{ backgroundColor: s.color }}>
                <p className="text-3xl font-light mb-1" style={{ color: s.text }}>{s.n}</p>
                <p className="text-xs font-medium" style={{ color: s.onBg }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#C5C0F5] py-24 text-center">
        <div className="max-w-2xl mx-auto px-8">
          <p className="text-xs text-[#0D2E2B]/50 font-semibold tracking-widest uppercase mb-4">• New project</p>
          <h2 className="text-5xl font-light text-[#0D2E2B] leading-tight mb-4 text-balance">
            Do you have an automation project in mind?
          </h2>
          <p className="text-base text-[#0D2E2B]/60 font-light mb-8">
            Our specialists are available for consultations and can offer tailored solutions.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#0D2E2B] text-white text-sm font-semibold px-6 py-3 rounded-[1px] hover:bg-[#0a2220] transition-colors"
            >
              Request a personalised quote
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/servicii"
              className="inline-flex items-center gap-2 text-[#0D2E2B] text-sm font-semibold border border-[#0D2E2B]/20 px-6 py-3 rounded-[1px] hover:bg-[#0D2E2B]/5 transition-colors"
            >
              Explore our services
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
