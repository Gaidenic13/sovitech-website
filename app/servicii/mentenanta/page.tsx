import Link from "next/link"
import { Clock, CheckCircle2, Settings, Phone, Zap, Target, Shield, RefreshCw } from "lucide-react"

export default function MentenantaPage() {
  return (
    <div className="min-h-screen bg-[#F5F4F0]">
      {/* Hero */}
      <section className="bg-[#07201C] py-14 relative overflow-hidden">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fingerprint-59QWj1Ik1Fd1hqzZduTrEqLz2j557z.svg"
            alt=""
            className="h-[400px] w-auto"
          />
        </div>
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          {/* Breadcrumb */}
          <nav className="mb-6">
            <ol className="flex items-center gap-2 text-xs text-white/30">
              <li><Link href="/" className="hover:text-white/60 transition-colors">Home</Link></li>
              <li>/</li>
              <li><Link href="/servicii" className="hover:text-white/60 transition-colors">Services</Link></li>
              <li>/</li>
              <li className="text-white/60">Maintenance &amp; Modernisation</li>
            </ol>
          </nav>
          <p className="text-xs text-[#C8E6C9] font-semibold tracking-widest uppercase mb-3">• BMS Services</p>
          <h1 className="text-5xl font-light text-white leading-tight tracking-tighter mb-4">
            Maintenance &amp; Modernisation
          </h1>
          <p className="text-white/60 font-light text-lg max-w-2xl leading-relaxed">
            Professional servicing, efficiency upgrades and BMS system modernisation to improve facilities management
            and maintain optimal performance.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="grid gap-12 lg:grid-cols-[260px_1fr]">
          {/* Sidebar */}
          <aside>
            <div className="bg-white rounded-[2px] overflow-hidden">
              <div className="p-6 border-b border-[#0D2E2B]/8">
                <p className="text-xs text-[#888888] font-semibold tracking-widest uppercase mb-3">Response time</p>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-[#1F6B4A]" />
                  <span className="font-light text-[#0D2E2B]">4 hours (emergencies)</span>
                </div>
              </div>
              <div className="p-6 border-b border-[#0D2E2B]/8">
                <p className="text-xs text-[#888888] font-semibold tracking-widest uppercase mb-4">Contract types</p>
                <ul className="space-y-3">
                  {["Preventive maintenance", "Corrective maintenance", "On-demand service", "Full-service contract"].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[#1F6B4A] mt-0.5 shrink-0" />
                      <span className="text-sm text-[#0D2E2B] font-light">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-6 border-b border-[#0D2E2B]/8">
                <p className="text-xs text-[#888888] font-semibold tracking-widest uppercase mb-3">Emergency contact</p>
                <div className="flex items-center gap-2 font-light text-[#0D2E2B]">
                  <Phone className="h-4 w-4 text-[#1F6B4A]" />
                  <span>+40 21 XXX XXXX</span>
                </div>
                <p className="text-xs text-[#888888] font-light mt-1">Available 24/7</p>
              </div>
              <div className="p-6">
                <Link
                  href="/contact"
                  className="block w-full text-center bg-[#0D2E2B] text-white text-sm font-semibold py-3 rounded-[2px] hover:bg-[#0a2220] transition-colors"
                >
                  Request a maintenance contract
                </Link>
              </div>
            </div>
          </aside>

          {/* Main */}
          <main className="space-y-16">
            {/* Hero Image */}
            <div className="aspect-video overflow-hidden rounded-[2px] bg-[#0D2E2B]/5">
              <img
                src="/services-maintenance-support.jpg"
                alt="BMS Maintenance - Service team"
                className="h-full w-full object-cover"
              />
            </div>

            {/* Service Types */}
            <section>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-8 rounded-[2px] bg-[#C8E6C9] flex items-center justify-center">
                  <Settings className="h-4 w-4 text-[#1F6B4A]" />
                </div>
                <h2 className="text-2xl font-light text-[#0D2E2B] tracking-tighter">Service Types</h2>
              </div>
              <div className="space-y-4">
                {[
                  {
                    icon: <RefreshCw className="h-5 w-5 text-[#1F6B4A]" />,
                    title: "Preventive Maintenance",
                    body: "Scheduled periodic checks to prevent failures and maintain optimal performance. Includes visual inspections, functional tests, component cleaning and software updates.",
                    points: ["Quarterly or biannual checks", "Detailed reports after each visit", "Improvement recommendations"],
                  },
                  {
                    icon: <Settings className="h-5 w-5 text-[#1F6B4A]" />,
                    title: "Corrective Maintenance",
                    body: "Rapid interventions to remedy faults that arise. Our team diagnoses and resolves issues as quickly as possible to minimise the impact on operations.",
                    points: ["4-hour response time for emergencies", "Remote diagnosis when possible", "Original SAUTER spare parts"],
                  },
                  {
                    icon: <Zap className="h-5 w-5 text-[#1F6B4A]" />,
                    title: "Modernisation and Upgrade",
                    body: "Updating existing BMS systems to improve energy efficiency and add new features. We migrate from legacy systems to modern technologies while preserving previous investments.",
                    points: ["Controller and software upgrades", "Adding sensors and measurement points", "Remote monitoring implementation"],
                  },
                ].map((service) => (
                  <div key={service.title} className="bg-white rounded-[2px] p-6 flex items-start gap-5">
                    <div className="w-10 h-10 rounded-[2px] bg-[#C8E6C9] flex items-center justify-center shrink-0">
                      {service.icon}
                    </div>
                    <div>
                      <h3 className="font-light text-[#0D2E2B] mb-2">{service.title}</h3>
                      <p className="text-sm text-[#888888] font-light leading-relaxed mb-3">{service.body}</p>
                      <ul className="space-y-1">
                        {service.points.map((p) => (
                          <li key={p} className="text-xs text-[#888888] font-light">· {p}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* How it works */}
            <section>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-8 rounded-[2px] bg-[#C8E6C9] flex items-center justify-center">
                  <Target className="h-4 w-4 text-[#1F6B4A]" />
                </div>
                <h2 className="text-2xl font-light text-[#0D2E2B] tracking-tighter">How It Works</h2>
              </div>
              <div className="space-y-4">
                {[
                  { num: "1", title: "Assessment and Contract", body: "We analyse the existing BMS system and your requirements to propose the optimal maintenance contract. We set the visit frequency, SLAs and annual budget." },
                  { num: "2", title: "Visit Planning", body: "We schedule preventive maintenance visits at times convenient for your operations. Our team arrives fully equipped with all the tools and parts required." },
                  { num: "3", title: "Intervention and Reporting", body: "After each visit you receive a detailed report of the work carried out, system status and recommendations for the future. You have access to an online portal to track intervention history." },
                ].map((step) => (
                  <div key={step.num} className="bg-white rounded-[2px] p-6 flex items-start gap-5">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0D2E2B] text-white text-sm font-light shrink-0">
                      {step.num}
                    </span>
                    <div>
                      <h3 className="font-light text-[#0D2E2B] mb-2">{step.title}</h3>
                      <p className="text-sm text-[#888888] font-light leading-relaxed">{step.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Stats */}
            <section>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-8 rounded-[2px] bg-[#C8E6C9] flex items-center justify-center">
                  <Shield className="h-4 w-4 text-[#1F6B4A]" />
                </div>
                <h2 className="text-2xl font-light text-[#0D2E2B] tracking-tighter">Maintenance Contract Benefits</h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { value: "95%", label: "Guaranteed system uptime" },
                  { value: "4h", label: "Maximum emergency response" },
                  { value: "20%", label: "Repair cost reduction" },
                  { value: "24/7", label: "Phone support available" },
                ].map((stat) => (
                  <div key={stat.label} className="bg-white rounded-[2px] p-6 text-center">
                    <p className="text-4xl font-light text-[#1F6B4A] mb-2">{stat.value}</p>
                    <p className="text-xs text-[#888888] font-light">{stat.label}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* CTA */}
            <section className="bg-[#07201C] rounded-[2px] p-10 text-center">
              <h2 className="text-2xl font-light text-white mb-3">Protect your BMS system investment</h2>
              <p className="text-white/60 font-light mb-7 max-w-xl mx-auto text-sm leading-relaxed">
                A maintenance contract ensures optimal operation and system longevity. Contact us for a personalised
                quote.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center bg-white text-[#0D2E2B] text-sm font-bold px-6 py-3 rounded-[2px] hover:bg-[#F5F4F0] transition-colors"
                >
                  Request a maintenance quote
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex items-center justify-center bg-transparent border border-white/15 text-white text-sm font-medium px-6 py-3 rounded-[2px] hover:bg-white/5 transition-colors"
                >
                  View service packages
                </Link>
              </div>
            </section>

            {/* Related */}
            <section className="pt-4 border-t border-[#0D2E2B]/8">
              <p className="text-xs text-[#888888] font-semibold tracking-widest uppercase mb-6">• Related services</p>
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  { href: "/servicii/proiectare", title: "BMS Design", desc: "Complete BMS system design" },
                  { href: "/servicii/executie", title: "Execution & Implementation", desc: "SAUTER equipment installation" },
                  { href: "/servicii/integrare", title: "System Integration", desc: "Connecting multiple systems" },
                ].map((s) => (
                  <Link
                    key={s.href}
                    href={s.href}
                    className="group rounded-[2px] border border-[#0D2E2B]/8 bg-white p-5 hover:border-[#1F6B4A]/30 transition-colors"
                  >
                    <h4 className="font-light text-sm text-[#0D2E2B] group-hover:text-[#1F6B4A] transition-colors mb-1">
                      {s.title}
                    </h4>
                    <p className="text-xs text-[#888888] font-light">{s.desc}</p>
                  </Link>
                ))}
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  )
}
