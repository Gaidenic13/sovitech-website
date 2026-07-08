import Link from "next/link"
import { Clock, CheckCircle2, Zap, Target, Shield } from "lucide-react"

export default function ExecutiePage() {
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
              <li className="text-white/60">Execution &amp; Implementation</li>
            </ol>
          </nav>
          <p className="text-xs text-[#C8E6C9] font-semibold tracking-widest uppercase mb-3">• BMS Services</p>
          <h1 className="text-5xl font-light text-white leading-tight tracking-tighter mb-4">
            Execution &amp; Implementation
          </h1>
          <p className="text-white/60 font-light text-lg max-w-2xl leading-relaxed">
            Professional implementation with SAUTER equipment from the global leader in energy management. Full
            testing, commissioning and training for your team.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="grid gap-12 lg:grid-cols-[260px_1fr]">
          {/* Sidebar */}
          <aside className="space-y-0">
            <div className="bg-white rounded-[2px] overflow-hidden">
              <div className="p-6 border-b border-[#0D2E2B]/8">
                <p className="text-xs text-[#888888] font-semibold tracking-widest uppercase mb-3">Average duration</p>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-[#1F6B4A]" />
                  <span className="font-light text-[#0D2E2B]">4–12 weeks</span>
                </div>
              </div>
              <div className="p-6 border-b border-[#0D2E2B]/8">
                <p className="text-xs text-[#888888] font-semibold tracking-widest uppercase mb-4">Equipment used</p>
                <ul className="space-y-3">
                  {["SAUTER controllers", "Temperature and humidity sensors", "Actuators and valves", "Control panels"].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[#1F6B4A] mt-0.5 shrink-0" />
                      <span className="text-sm text-[#0D2E2B] font-light">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-6">
                <Link
                  href="/contact"
                  className="block w-full text-center bg-[#0D2E2B] text-white text-sm font-semibold py-3 rounded-[2px] hover:bg-[#0a2220] transition-colors"
                >
                  Request a free consultation
                </Link>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="space-y-16">
            {/* Hero Image */}
            <div className="aspect-video overflow-hidden rounded-[2px] bg-[#0D2E2B]/5">
              <img
                src="/services-installation-work.jpg"
                alt="BMS Execution - Equipment installation"
                className="h-full w-full object-cover"
              />
            </div>

            {/* Process */}
            <section>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-8 rounded-[2px] bg-[#C8E6C9] flex items-center justify-center">
                  <Target className="h-4 w-4 text-[#1F6B4A]" />
                </div>
                <h2 className="text-2xl font-light text-[#0D2E2B] tracking-tighter">Implementation Process</h2>
              </div>

              <div className="space-y-4">
                {[
                  { num: "1", title: "Preparation and Planning", body: "We verify the design documentation, order the necessary equipment and set the execution schedule. We coordinate with the other teams involved in the project to ensure smooth implementation.", duration: "1–2 weeks" },
                  { num: "2", title: "Equipment Installation", body: "Our team of certified technicians installs controllers, sensors, actuators and control panels in accordance with technical specifications. We complete all electrical and communication connections.", duration: "2–6 weeks (depending on complexity)" },
                  { num: "3", title: "Configuration and Programming", body: "We programme the controllers with algorithms optimised for energy efficiency, configure the user interface and set operating parameters. We implement automated scenarios and safety alarms.", duration: "1–2 weeks" },
                  { num: "4", title: "Testing and Commissioning", body: "We carry out comprehensive tests on all implemented systems, verify the correct operation of control loops and optimise parameters. We document test results and generate acceptance reports.", duration: "1–2 weeks" },
                  { num: "5", title: "Training and Handover", body: "We organise training sessions for the client's technical staff, present the system's functions and operating procedures. We hand over the complete documentation and provide support during the warranty period.", duration: "2–3 days" },
                ].map((step) => (
                  <div key={step.num} className="bg-white rounded-[2px] p-6 flex items-start gap-5">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0D2E2B] text-white text-sm font-light shrink-0">
                      {step.num}
                    </span>
                    <div className="flex-1">
                      <h3 className="font-light text-[#0D2E2B] mb-2">{step.title}</h3>
                      <p className="text-sm text-[#888888] font-light leading-relaxed mb-3">{step.body}</p>
                      <span className="text-xs font-semibold text-[#1F6B4A]">Duration: {step.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Impact */}
            <section>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-8 rounded-[2px] bg-[#C8E6C9] flex items-center justify-center">
                  <Zap className="h-4 w-4 text-[#1F6B4A]" />
                </div>
                <h2 className="text-2xl font-light text-[#0D2E2B] tracking-tighter">Impact and Benefits</h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { value: "99%", label: "Acceptance success rate" },
                  { value: "150+", label: "Projects implemented" },
                  { value: "2 yrs", label: "Equipment warranty" },
                  { value: "4h", label: "Emergency response time" },
                ].map((stat) => (
                  <div key={stat.label} className="bg-white rounded-[2px] p-6 text-center">
                    <p className="text-4xl font-light text-[#1F6B4A] mb-2">{stat.value}</p>
                    <p className="text-xs text-[#888888] font-light">{stat.label}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* SAUTER */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-[2px] bg-[#C8E6C9] flex items-center justify-center">
                  <Shield className="h-4 w-4 text-[#1F6B4A]" />
                </div>
                <h2 className="text-2xl font-light text-[#0D2E2B] tracking-tighter">SAUTER Partnership</h2>
              </div>
              <div className="bg-white rounded-[2px] p-8">
                <p className="text-sm text-[#888888] font-light leading-relaxed mb-5">
                  Sovitech Control is an{" "}
                  <span className="font-semibold text-[#0D2E2B]">authorised SAUTER partner</span> in Romania, offering
                  access to the most advanced building automation equipment in the industry. SAUTER, headquartered in
                  Switzerland, is a world leader in energy management systems for buildings.
                </p>
                <ul className="space-y-2">
                  {[
                    "Equipment certified to European standards",
                    "Direct technical support from the manufacturer",
                    "Spare parts available long-term",
                    "Constantly updated software",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[#1F6B4A]" />
                      <span className="text-sm text-[#0D2E2B] font-light">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* CTA */}
            <section className="bg-[#07201C] rounded-[2px] p-10 text-center">
              <h2 className="text-2xl font-light text-white mb-3">Do you have a BMS implementation project?</h2>
              <p className="text-white/60 font-light mb-7 max-w-xl mx-auto text-sm leading-relaxed">
                Contact us for a free assessment. Our team will analyse your requirements and propose the optimal
                solution for your building.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center bg-white text-[#0D2E2B] text-sm font-bold px-6 py-3 rounded-[2px] hover:bg-[#F5F4F0] transition-colors"
                >
                  Request a free quote
                </Link>
                <Link
                  href="/produse"
                  className="inline-flex items-center justify-center bg-transparent border border-white/15 text-white text-sm font-medium px-6 py-3 rounded-[2px] hover:bg-white/5 transition-colors"
                >
                  View SAUTER equipment
                </Link>
              </div>
            </section>

            {/* Related */}
            <section className="pt-4 border-t border-[#0D2E2B]/8">
              <p className="text-xs text-[#888888] font-semibold tracking-widest uppercase mb-6">• Related services</p>
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  { href: "/servicii/proiectare", title: "BMS Design", desc: "Complete BMS system design" },
                  { href: "/servicii/integrare", title: "System Integration", desc: "Programming and protocol integration" },
                  { href: "/servicii/mentenanta", title: "Maintenance", desc: "Service and upgrades" },
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
