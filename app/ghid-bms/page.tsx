import Link from "next/link"
import { CheckCircle2, Download, FileText, LineChart, ListChecks, Calculator, ArrowRight } from "lucide-react"

export default function GhidBMSPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F5F4F0]">
      {/* Hero Section */}
      <section className="bg-[#0D2E2B] py-20 md:py-28 relative overflow-hidden">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fingerprint-59QWj1Ik1Fd1hqzZduTrEqLz2j557z.svg"
            alt=""
            className="h-[500px] w-auto"
          />
        </div>
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/8 border border-white/10 rounded-full px-4 py-1.5 text-xs text-white/60 font-medium mb-6">
              <FileText className="h-3.5 w-3.5" />
              Free Evaluation Guide
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-white leading-tight tracking-tight mb-6 text-balance">
              Assess Your Building&apos;s Automation Potential
            </h1>
            <p className="text-white/60 font-light text-lg mb-10 max-w-2xl leading-relaxed">
              Get the complete guide with checklists, industry benchmarks and ROI templates to determine your
              building&apos;s readiness for BMS technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/ghid-bms/descarca"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#0D2E2B] text-sm font-bold px-7 py-3.5 rounded-xl hover:bg-[#F5F4F0] transition-colors"
              >
                <Download className="h-4 w-4" />
                Download the Free Guide
              </Link>
              <Link
                href="#continut"
                className="inline-flex items-center justify-center gap-2 bg-transparent border border-white/15 text-white text-sm font-medium px-7 py-3.5 rounded-xl hover:bg-white/5 transition-colors"
              >
                View Contents
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-white py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-8">
          <div className="max-w-2xl mb-14">
            <p className="text-xs text-[#888888] font-semibold tracking-widest uppercase mb-3">• What you will discover</p>
            <h2 className="text-4xl font-black text-[#0D2E2B] leading-tight tracking-tight">
              What You Will Find in This Guide
            </h2>
            <p className="text-[#888888] font-light mt-3">A complete toolkit for evaluating the BMS investment opportunity</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <ListChecks className="h-6 w-6 text-[#1F6B4A]" />,
                title: "Complete Checklists",
                desc: "Assess existing infrastructure, savings potential and organisational readiness for BMS.",
                bg: "#C8E6C9",
              },
              {
                icon: <LineChart className="h-6 w-6 text-[#5C5FD4]" />,
                title: "Industry Benchmarks",
                desc: "Compare your current energy consumption against industry standards for your sector.",
                bg: "#C5C0F5",
              },
              {
                icon: <Calculator className="h-6 w-6 text-[#1F6B4A]" />,
                title: "ROI Templates",
                desc: "Calculate the potential savings and investment payback period for BMS in your building.",
                bg: "#C8E6C9",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl bg-[#F5F4F0] p-8 flex flex-col gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: item.bg + "60" }}>
                  {item.icon}
                </div>
                <h3 className="text-lg font-black text-[#0D2E2B]">{item.title}</h3>
                <p className="text-sm text-[#888888] font-light leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content Overview */}
      <section id="continut" className="bg-[#F5F4F0] py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-8">
          <div className="max-w-2xl mb-14">
            <p className="text-xs text-[#888888] font-semibold tracking-widest uppercase mb-3">• Guide structure</p>
            <h2 className="text-4xl font-black text-[#0D2E2B] leading-tight tracking-tight">
              Guide Contents
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                num: "01",
                title: "Existing Infrastructure Assessment",
                desc: "Checklists for HVAC, lighting, security systems and current energy consumption.",
                items: [
                  "Equipment inventory and system age",
                  "Compatibility with communication protocols (BACnet, KNX, Modbus)",
                  "Energy consumption analysis and loss identification",
                ],
              },
              {
                num: "02",
                title: "Savings Potential Calculation",
                desc: "Methodology and templates for estimating savings and financial benefits.",
                items: [
                  "Energy savings calculation: 25–40% reduction in operational costs",
                  "ROI estimate and investment payback period (typically 2–4 years)",
                  "Additional benefits: CO2 emission reduction, increased property value",
                ],
              },
              {
                num: "03",
                title: "Sector Benchmarks",
                desc: "Comparative data for offices, retail, medical, HORECA and industrial.",
                items: [
                  "Average energy consumption by sector (kWh/m²/yr)",
                  "Typical operational and maintenance costs",
                  "Success cases and measurable results from real projects",
                ],
              },
              {
                num: "04",
                title: "Implementation Plan",
                desc: "Concrete steps for moving from assessment to BMS implementation.",
                items: [
                  "Typical timeline: from audit to commissioning (3–6 months)",
                  "Required resources and stakeholder involvement",
                  "Strategies to minimise operational disruption",
                ],
              },
            ].map((section) => (
              <div key={section.num} className="bg-white rounded-2xl p-8 flex gap-6">
                <div className="flex-shrink-0">
                  <span className="text-4xl font-black text-[#0D2E2B]/10">{section.num}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-black text-[#0D2E2B] mb-2">{section.title}</h3>
                  <p className="text-sm text-[#888888] font-light mb-4 leading-relaxed">{section.desc}</p>
                  <ul className="space-y-2">
                    {section.items.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#1F6B4A] mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-[#0D2E2B] font-light">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0D2E2B] py-20">
        <div className="max-w-7xl mx-auto px-8">
          <div className="max-w-2xl">
            <p className="text-xs text-[#1F6B4A] font-semibold tracking-widest uppercase mb-3">• Download now</p>
            <h2 className="text-4xl font-black text-white leading-tight tracking-tight mb-4">
              Ready to Assess Your Building?
            </h2>
            <p className="text-white/60 font-light mb-8 leading-relaxed">
              Download the free guide and start your assessment in just a few minutes. No obligations, no hidden costs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/ghid-bms/descarca"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#0D2E2B] text-sm font-bold px-7 py-3.5 rounded-xl hover:bg-[#F5F4F0] transition-colors"
              >
                <Download className="h-4 w-4" />
                Download the Guide Now
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-transparent border border-white/15 text-white text-sm font-medium px-7 py-3.5 rounded-xl hover:bg-white/5 transition-colors"
              >
                Schedule a Consultation
              </Link>
            </div>
            <p className="text-xs text-white/30 mt-6 font-light">
              Instant download &nbsp;·&nbsp; Interactive PDF format &nbsp;·&nbsp; Editable Excel templates
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
