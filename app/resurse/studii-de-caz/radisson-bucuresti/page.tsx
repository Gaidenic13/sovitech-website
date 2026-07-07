"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ArrowUpRight, Share2, Check, ArrowRight, Building2, Thermometer, BarChart3, Shield, Wifi, Users, Zap, Clock, Award } from "lucide-react"
import { useState } from "react"

const metrics = [
  { value: "424", label: "Monitored rooms" },
  { value: "82.6%", label: "BREEAM Energy Score" },
  { value: "~30%", label: "Energy consumption reduction" },
  { value: "24/7", label: "Active monitoring" },
]

const challenges = [
  { icon: Wifi, title: "Disparate systems", desc: "HVAC and lighting were controlled independently, limiting visibility and coordination." },
  { icon: Zap, title: "High energy consumption", desc: "Continuous 24/7 operation amplified even minor inefficiencies, generating significant costs." },
  { icon: Users, title: "Manual monitoring", desc: "Without centralised automation, the team relied on manual checks and fixed schedules." },
  { icon: Award, title: "Sustainability targets", desc: "Ambitious BREEAM objectives and 100% renewable electricity required advanced control." },
]

const solutionFeatures = [
  { icon: Building2, title: "Centralised platform", desc: "Unified SAUTER interface for monitoring and controlling HVAC, lighting and other systems from a single dashboard." },
  { icon: Thermometer, title: "Zoned HVAC automation", desc: "Climate control by zone across rooms, corridors, conference halls and spa, adapting to occupancy and outdoor conditions." },
  { icon: BarChart3, title: "Energy monitoring", desc: "Real-time metering of electricity and heating by zone (kitchens, laundry, pools) to identify waste." },
  { icon: Shield, title: "Systems integration", desc: "Communication with sub-systems via KNX, DALI, Modbus, M-Bus, BACnet protocols and integration with Fidelio PMS." },
]

const timeline = [
  { phase: "Audit and design", duration: "Week 1–3", desc: "Inventory of HVAC, chillers, boilers, pumps and electricity meters. BMS architecture design with SAUTER controllers and modules." },
  { phase: "Equipment installation", duration: "Week 3–6", desc: "Mounting of programmable controllers and I/O modules in technical rooms. Installation of SAUTER valves, dampers and actuators on HVAC units." },
  { phase: "Network integration", duration: "Week 5–7", desc: "Connecting all devices via KNX/DALI/M-Bus and linking to the central SAUTER modulo servers." },
  { phase: "Software configuration", duration: "Week 6–8", desc: "Programming control logic (schedules, setpoints, alarms). Creating custom dashboards with live data." },
  { phase: "Testing and commissioning", duration: "Week 8–10", desc: "Testing every sub-system, calibrating sensors, verifying protections. Full switchover during periods of low occupancy." },
]

const results = [
  { title: "Real-time visibility", desc: "Managers have instant access to all systems. A single dashboard shows zone-level HVAC conditions, energy consumption and equipment status.", icon: BarChart3 },
  { title: "Enhanced comfort", desc: "More precise climate control ensures consistent comfort. Advanced CO₂ and humidity sensors support the 75.4% Health & Wellbeing score.", icon: Thermometer },
  { title: "~30% energy savings", desc: "Reduced boiler run times and optimised chiller operation during unoccupied periods. Monthly reports identify inefficiencies.", icon: Zap },
  { title: "Operational efficiency", desc: "Alarms and trend logging enable proactive maintenance. The team can intervene remotely and detect anomalies before failures occur.", icon: Shield },
  { title: "Sustainability compliance", desc: "Energy and water consumption optimisation, plus interfaces with renewable sources, supports BREEAM Excellent objectives.", icon: Award },
  { title: "Scalability", desc: "The platform can grow with new zones and future integration of renewable systems, without a complete rebuild.", icon: Building2 },
]

const whyReasons = [
  "Specialised expertise in hotel systems: Fidelio integration, pool control, room monitoring",
  "Premium SAUTER technology: controllers and sensors meeting the highest international standards",
  "Full-service delivery: design, execution, integration and maintenance from a single provider",
  "Local support: Bucharest-based team with fast response times and knowledge of local regulations",
]

const hospitalityBenefits = [
  { title: "Centralised control", desc: "Unified management of HVAC, lighting, pools/spa and security from a single platform." },
  { title: "Guest comfort", desc: "Automatic climate and air-quality control supports a 5-star experience." },
  { title: "Energy transparency", desc: "Real-time metering and reports showing where energy is consumed and saved." },
  { title: "Integrated hotel operations", desc: "BMS-PMS (Fidelio) link enables occupancy-based HVAC setback and housekeeping alerts." },
  { title: "Maintenance efficiency", desc: "Remote monitoring and alerts reduce downtime and the risk of inconvenience to guests." },
  { title: "Regulatory compliance", desc: "Automated systems simplify sustainability, safety and comfort certifications." },
]

export default function RadissonBucurestiCaseStudy() {
  const [copied, setCopied] = useState(false)
  const [activeSection, setActiveSection] = useState("")

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const toc = [
    { id: "despre", label: "About Radisson Blu" },
    { id: "provocarea", label: "The Challenge" },
    { id: "solutia", label: "The Solution" },
    { id: "implementare", label: "Implementation" },
    { id: "rezultate", label: "Results" },
    { id: "de-ce-sovitech", label: "Why Sovitech" },
    { id: "beneficii", label: "Hospitality Benefits" },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="border-b border-border bg-secondary/50">
        <div className="mx-auto max-w-[1220px] px-4 sm:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/resurse" className="text-muted-foreground hover:text-foreground transition-colors no-underline">Resources</Link>
            <span className="text-muted-foreground/50">/</span>
            <Link href="/resurse/referinte" className="text-muted-foreground hover:text-foreground transition-colors no-underline">Case Studies</Link>
            <span className="text-muted-foreground/50">/</span>
            <span className="text-foreground font-medium">Radisson Blu</span>
          </div>
          <button onClick={handleShare} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
            {copied ? <Check className="h-3.5 w-3.5" /> : <Share2 className="h-3.5 w-3.5" />}
            {copied ? "Copied" : "Share"}
          </button>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-background border-b border-border">
        <div className="mx-auto max-w-[1220px] px-4 sm:px-8 pt-12 pb-16 md:pt-16 md:pb-20">
          <Link href="/resurse/referinte" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-accent no-underline hover:no-underline">
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Case Studies
          </Link>
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold tracking-wide text-accent uppercase mb-6">
                HORECA &mdash; 5-Star Hotel
              </div>
              <h1 className="text-foreground mb-6 text-balance" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.1, letterSpacing: "-0.03em", fontWeight: 600 }}>
                How Radisson Blu Bucharest achieved BREEAM Excellent certification through integrated BMS automation
              </h1>
              <p className="text-muted-foreground max-w-xl" style={{ fontSize: "clamp(1rem, 1.5vw, 1.125rem)", lineHeight: 1.6, letterSpacing: "-0.01em" }}>
                424 rooms, 12 conference halls, restaurant, spa, pool — all unified in a single intelligent control platform with SAUTER technology from Switzerland.
              </p>
            </div>
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <div className="grid grid-cols-2 gap-6">
                  {metrics.map((m, i) => (
                    <div key={i} className={i < 2 ? "pb-6 border-b border-border" : ""}>
                      <div className="text-accent font-semibold" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", letterSpacing: "-0.03em", lineHeight: 1 }}>{m.value}</div>
                      <div className="text-muted-foreground mt-1.5" style={{ fontSize: "0.8125rem", letterSpacing: "-0.01em" }}>{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Image */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-[1220px] px-4 sm:px-8">
          <div className="relative aspect-[21/9] w-full overflow-hidden md:rounded-2xl md:my-8 -mx-4 md:mx-0">
            <Image src="/luxury-hotel-lobby-modern-interior.jpg" alt="Radisson Blu Bucharest - Modern hotel lobby" fill className="object-cover" priority />
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="mx-auto max-w-[1220px] px-4 sm:px-8 py-16 md:py-20">
        <div className="grid lg:grid-cols-12 gap-16">

          {/* Sidebar */}
          <aside className="lg:col-span-3 order-2 lg:order-1">
            <div className="sticky top-24 space-y-8">
              <nav className="hidden lg:block">
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3" style={{ letterSpacing: "0.06em" }}>Contents</div>
                <ul className="space-y-1.5 list-none p-0 m-0">
                  {toc.map((item) => (
                    <li key={item.id}>
                      <a href={`#${item.id}`} className="text-sm text-muted-foreground hover:text-accent transition-colors no-underline block py-0.5" style={{ letterSpacing: "-0.01em" }}>
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="border-t border-border pt-6">
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2" style={{ letterSpacing: "0.06em" }}>Client</div>
                <div className="font-semibold text-foreground text-sm" style={{ letterSpacing: "-0.01em" }}>Radisson Blu Bucharest</div>
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2" style={{ letterSpacing: "0.06em" }}>Industry</div>
                <div className="font-semibold text-foreground text-sm" style={{ letterSpacing: "-0.01em" }}>HORECA - 5-Star Hotel</div>
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2" style={{ letterSpacing: "0.06em" }}>Service</div>
                <div className="font-semibold text-foreground text-sm" style={{ letterSpacing: "-0.01em" }}>Full BMS: Design, Execution, Integration</div>
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2" style={{ letterSpacing: "0.06em" }}>Technology</div>
                <div className="font-semibold text-foreground text-sm" style={{ letterSpacing: "-0.01em" }}>SAUTER modulo - BACnet / KNX / Modbus</div>
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2" style={{ letterSpacing: "0.06em" }}>Certification</div>
                <div className="font-semibold text-foreground text-sm" style={{ letterSpacing: "-0.01em" }}>BREEAM In-Use Excellent (2025)</div>
              </div>
              <div className="pt-4 border-t border-border">
                <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white no-underline hover:no-underline transition-all" style={{ letterSpacing: "-0.01em" }}>
                  Request a Consultation
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </aside>

          {/* Main */}
          <main className="lg:col-span-9 order-1 lg:order-2 space-y-20">

            {/* About */}
            <section id="despre">
              <h2 className="text-foreground mb-6" style={{ fontSize: "clamp(1.25rem, 2vw, 1.5rem)", letterSpacing: "-0.02em", fontWeight: 600 }}>
                About Radisson Blu Bucharest
              </h2>
              <div className="space-y-4 max-w-[45rem]">
                <p className="text-foreground/85" style={{ fontSize: "clamp(0.9375rem, 1.2vw, 1rem)", lineHeight: 1.7, letterSpacing: "-0.01em" }}>
                  Radisson Blu Hotel Bucharest is a landmark 5-star hotel in the Romanian capital. Opened in 2007, it offers 424 rooms (including standard, business-class and suites) and extensive conference and leisure facilities. The hotel includes 12 conference halls (one of 540 m² for 500 people), multiple restaurants, bars, spa, fitness centre, pool and other recreational spaces.
                </p>
                <p className="text-foreground/85" style={{ fontSize: "clamp(0.9375rem, 1.2vw, 1rem)", lineHeight: 1.7, letterSpacing: "-0.01em" }}>
                  In 2025 the hotel achieved BREEAM In-Use Excellent certification, with a score of 82.6% for Energy and 75.4% for Health &amp; Wellbeing. These results highlight the hotel&apos;s commitment to energy efficiency and maintaining indoor comfort and air quality at the highest level.
                </p>
              </div>
            </section>

            {/* Challenge */}
            <section id="provocarea">
              <h2 className="text-foreground mb-6" style={{ fontSize: "clamp(1.25rem, 2vw, 1.5rem)", letterSpacing: "-0.02em", fontWeight: 600 }}>
                The Challenge
              </h2>
              <p className="text-foreground/85 mb-8 max-w-[45rem]" style={{ fontSize: "clamp(0.9375rem, 1.2vw, 1rem)", lineHeight: 1.7, letterSpacing: "-0.01em" }}>
                Managing a luxury hotel operating 24/7 involves complex operational challenges. Heating, cooling, ventilation, lighting and water/pool systems must maintain guest comfort across dozens of different zones, while simultaneously controlling energy consumption.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {challenges.map((c, i) => (
                  <div key={i} className="rounded-xl border border-border bg-card p-5 transition-colors hover:border-accent/30">
                    <div className="flex items-start gap-3.5">
                      <div className="mt-0.5 h-9 w-9 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <c.icon className="h-4.5 w-4.5 text-accent" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-1" style={{ fontSize: "0.9375rem", letterSpacing: "-0.01em" }}>{c.title}</h4>
                        <p className="text-muted-foreground" style={{ fontSize: "0.8125rem", lineHeight: 1.6 }}>{c.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Testimonial */}
            <div className="rounded-2xl bg-secondary p-8 md:p-10">
              <blockquote>
                <p className="text-foreground mb-6 text-pretty" style={{ fontSize: "clamp(1.0625rem, 1.5vw, 1.25rem)", lineHeight: 1.6, letterSpacing: "-0.02em", fontWeight: 500 }}>
                  {'"'}Achieving BREEAM certification is a proud moment that reflects our deep commitment to sustainable hospitality. Sovitech&apos;s automation solutions directly support that commitment, making hotel operations more efficient and environmentally friendly.{'"'}
                </p>
                <footer className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center text-accent font-semibold text-lg">GM</div>
                  <div>
                    <div className="font-semibold text-foreground" style={{ fontSize: "0.875rem", letterSpacing: "-0.01em" }}>General Manager</div>
                    <div className="text-muted-foreground" style={{ fontSize: "0.875rem" }}>Radisson Blu Bucharest</div>
                  </div>
                </footer>
              </blockquote>
            </div>

            {/* Solution */}
            <section id="solutia">
              <h2 className="text-foreground mb-6" style={{ fontSize: "clamp(1.25rem, 2vw, 1.5rem)", letterSpacing: "-0.02em", fontWeight: 600 }}>
                The Solution: Sovitech BMS Automation
              </h2>
              <p className="text-foreground/85 mb-8 max-w-[45rem]" style={{ fontSize: "clamp(0.9375rem, 1.2vw, 1rem)", lineHeight: 1.7, letterSpacing: "-0.01em" }}>
                Sovitech Control delivered a centralised Building Management System (BMS) that connects all hotel systems into a single intelligent, energy-efficient platform.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {solutionFeatures.map((f, i) => (
                  <div key={i} className="rounded-xl border border-border bg-card p-5 transition-colors hover:border-accent/30">
                    <div className="flex items-start gap-3.5">
                      <div className="mt-0.5 h-9 w-9 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <f.icon className="h-4.5 w-4.5 text-accent" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-1" style={{ fontSize: "0.9375rem", letterSpacing: "-0.01em" }}>{f.title}</h4>
                        <p className="text-muted-foreground" style={{ fontSize: "0.8125rem", lineHeight: 1.6 }}>{f.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-foreground/85 mt-6 max-w-[45rem]" style={{ fontSize: "clamp(0.9375rem, 1.2vw, 1rem)", lineHeight: 1.7, letterSpacing: "-0.01em" }}>
                Sovitech also integrated the system with the Fidelio hotel PMS, allowing room occupancy data to be linked to HVAC and lighting control for automatic optimisation.
              </p>
            </section>

            {/* Implementation */}
            <section id="implementare">
              <h2 className="text-foreground mb-8" style={{ fontSize: "clamp(1.25rem, 2vw, 1.5rem)", letterSpacing: "-0.02em", fontWeight: 600 }}>
                Implementation Process
              </h2>
              <p className="text-foreground/85 mb-8 max-w-[45rem]" style={{ fontSize: "clamp(0.9375rem, 1.2vw, 1rem)", lineHeight: 1.7, letterSpacing: "-0.01em" }}>
                The implementation was carried out in phases to avoid disruption to hotel operations. Full switchover to the new system took place during periods of low occupancy.
              </p>
              <div className="space-y-0">
                {timeline.map((step, i) => (
                  <div key={i} className="relative flex gap-6 pb-10 last:pb-0">
                    {i < timeline.length - 1 && (
                      <div className="absolute left-[15px] top-[36px] bottom-0 w-px bg-border" />
                    )}
                    <div className="relative z-10 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2 border-accent bg-background text-xs font-bold text-accent">
                      {i + 1}
                    </div>
                    <div className="pt-0.5 flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-1.5">
                        <h4 className="font-semibold text-foreground" style={{ fontSize: "0.9375rem", letterSpacing: "-0.01em" }}>{step.phase}</h4>
                        <span className="text-xs font-medium text-muted-foreground bg-secondary rounded-full px-2.5 py-0.5">{step.duration}</span>
                      </div>
                      <p className="text-muted-foreground" style={{ fontSize: "0.8125rem", lineHeight: 1.65 }}>{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Results */}
            <section id="rezultate">
              <h2 className="text-foreground mb-8" style={{ fontSize: "clamp(1.25rem, 2vw, 1.5rem)", letterSpacing: "-0.02em", fontWeight: 600 }}>
                Results and Impact
              </h2>
              <p className="text-foreground/85 mb-8 max-w-[45rem]" style={{ fontSize: "clamp(0.9375rem, 1.2vw, 1rem)", lineHeight: 1.7, letterSpacing: "-0.01em" }}>
                Following implementation, Radisson Blu Bucharest achieved significant benefits in operational control and sustainability. The Sovitech BMS gave the hotel unprecedented visibility over its building systems.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {results.map((r, i) => (
                  <div key={i} className="rounded-xl bg-secondary p-6">
                    <div className="flex items-center gap-2.5 mb-3">
                      <div className="h-8 w-8 rounded-lg bg-accent/10 flex items-center justify-center">
                        <r.icon className="h-4 w-4 text-accent" />
                      </div>
                      <h4 className="font-semibold text-foreground" style={{ fontSize: "0.9375rem", letterSpacing: "-0.01em" }}>{r.title}</h4>
                    </div>
                    <p className="text-muted-foreground" style={{ fontSize: "0.8125rem", lineHeight: 1.65 }}>{r.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Why Sovitech */}
            <section id="de-ce-sovitech">
              <h2 className="text-foreground mb-6" style={{ fontSize: "clamp(1.25rem, 2vw, 1.5rem)", letterSpacing: "-0.02em", fontWeight: 600 }}>
                Why Radisson Blu chose Sovitech
              </h2>
              <p className="text-foreground/85 mb-6 max-w-[45rem]" style={{ fontSize: "clamp(0.9375rem, 1.2vw, 1rem)", lineHeight: 1.7, letterSpacing: "-0.01em" }}>
                Sovitech was selected for its specialised expertise in HORECA automation and its proven portfolio of similar projects. Sovitech&apos;s client list includes renowned hotels: Radisson, Crowne Plaza, Hilton Athenee Palace, Novotel and others.
              </p>
              <div className="rounded-xl border border-border bg-card p-6">
                <ul className="space-y-3 list-none p-0 m-0">
                  {whyReasons.map((reason, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="mt-1 h-5 w-5 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <Check className="h-3 w-3 text-accent" />
                      </div>
                      <span className="text-foreground/85" style={{ fontSize: "0.9375rem", lineHeight: 1.6, letterSpacing: "-0.01em" }}>{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Hospitality Benefits */}
            <section id="beneficii">
              <h2 className="text-foreground mb-6" style={{ fontSize: "clamp(1.25rem, 2vw, 1.5rem)", letterSpacing: "-0.02em", fontWeight: 600 }}>
                Key benefits for hotel facilities
              </h2>
              <p className="text-foreground/85 mb-8 max-w-[45rem]" style={{ fontSize: "clamp(0.9375rem, 1.2vw, 1rem)", lineHeight: 1.7, letterSpacing: "-0.01em" }}>
                Hotels that invest in modern BMS systems gain significant strategic advantages. The Sovitech system for Radisson Blu delivers:
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {hospitalityBenefits.map((b, i) => (
                  <div key={i} className="rounded-xl bg-secondary p-5">
                    <h4 className="font-semibold text-foreground mb-1.5" style={{ fontSize: "0.9375rem", letterSpacing: "-0.01em" }}>{b.title}</h4>
                    <p className="text-muted-foreground" style={{ fontSize: "0.8125rem", lineHeight: 1.6 }}>{b.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Conclusion */}
            <section className="rounded-2xl border border-border bg-card p-8 md:p-10">
              <h3 className="font-semibold text-foreground mb-4" style={{ fontSize: "clamp(1.0625rem, 1.5vw, 1.25rem)", letterSpacing: "-0.02em" }}>
                Conclusion
              </h3>
              <div className="space-y-4 max-w-[45rem]">
                <p className="text-foreground/85" style={{ fontSize: "clamp(0.9375rem, 1.2vw, 1rem)", lineHeight: 1.7, letterSpacing: "-0.01em" }}>
                  By implementing the integrated Sovitech BMS, Radisson Blu Bucharest transformed its infrastructure into an intelligent, efficient facility. The project achieved higher levels of guest comfort, enhanced visibility for facilities managers and notable reductions in energy consumption.
                </p>
                <p className="text-foreground/85" style={{ fontSize: "clamp(0.9375rem, 1.2vw, 1rem)", lineHeight: 1.7, letterSpacing: "-0.01em" }}>
                  This case study illustrates a best practice: aligning hotel operations with sustainability and efficiency objectives through technology. Sovitech BMS automation enables hotels to achieve these results, creating a future-ready hotel that delights guests and delivers measurable sustainability gains.
                </p>
              </div>
            </section>

            {/* CTA */}
            <div className="rounded-2xl bg-foreground p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-background font-semibold mb-2" style={{ fontSize: "clamp(1.0625rem, 1.5vw, 1.25rem)", letterSpacing: "-0.02em" }}>
                  Want similar results for your hotel?
                </h3>
                <p className="text-background/60" style={{ fontSize: "0.875rem" }}>
                  Contact our team for a personalised consultation and efficiency plan.
                </p>
              </div>
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white no-underline hover:no-underline whitespace-nowrap transition-all" style={{ letterSpacing: "-0.01em" }}>
                Contact us
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </main>
        </div>
      </div>

      {/* Related */}
      <section className="border-t border-border bg-secondary/50 py-16">
        <div className="mx-auto max-w-[1220px] px-4 sm:px-8">
          <h2 className="text-foreground mb-8" style={{ fontSize: "clamp(1.25rem, 2vw, 1.5rem)", letterSpacing: "-0.02em", fontWeight: 600 }}>
            Other case studies
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Link href="/resurse/studii-de-caz/therme-bucuresti" className="group rounded-xl border border-border bg-card p-6 no-underline hover:no-underline hover:border-accent/40 transition-all">
              <div className="text-xs font-semibold uppercase tracking-wider text-accent mb-3">HORECA - Spa &amp; Wellness</div>
              <h3 className="text-foreground font-semibold mb-2 group-hover:text-accent transition-colors" style={{ fontSize: "clamp(1rem, 1.5vw, 1.125rem)", letterSpacing: "-0.01em" }}>
                Therme Bucharest
              </h3>
              <p className="text-muted-foreground mb-4" style={{ fontSize: "0.8125rem", lineHeight: 1.6 }}>
                35% reduction in energy costs through BMS automation for the wellness complex.
              </p>
              <span className="text-sm font-semibold text-accent inline-flex items-center gap-1">
                Read the study <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
            <Link href="/contact" className="group rounded-xl border border-border bg-card p-6 no-underline hover:no-underline hover:border-accent/40 transition-all">
              <div className="text-xs font-semibold uppercase tracking-wider text-accent mb-3">Your project</div>
              <h3 className="text-foreground font-semibold mb-2 group-hover:text-accent transition-colors" style={{ fontSize: "clamp(1rem, 1.5vw, 1.125rem)", letterSpacing: "-0.01em" }}>
                The next case study could be yours
              </h3>
              <p className="text-muted-foreground mb-4" style={{ fontSize: "0.8125rem", lineHeight: 1.6 }}>
                Contact us to discuss how we can transform your building into an intelligent, efficient space.
              </p>
              <span className="text-sm font-semibold text-accent inline-flex items-center gap-1">
                Speak to a specialist <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
