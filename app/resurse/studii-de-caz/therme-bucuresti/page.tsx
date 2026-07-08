"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ArrowUpRight, Share2, Check, ArrowRight } from "lucide-react"
import { useState } from "react"

const metrics = [
  { value: "35%", label: "Energy consumption reduction" },
  { value: "\u20AC158K", label: "Annual savings" },
  { value: "8,000 m\u00B2", label: "Area implemented" },
  { value: "6 wks", label: "Implementation time" },
]

const timeline = [
  { phase: "Audit & Analysis", duration: "Week 1–2", desc: "Assessment of existing infrastructure and identification of optimisation opportunities." },
  { phase: "System Design", duration: "Week 2–3", desc: "BMS architecture configuration and selection of SAUTER equipment." },
  { phase: "Installation & Integration", duration: "Week 3–5", desc: "Sensor and controller installation, integration with existing HVAC systems." },
  { phase: "Testing & Training", duration: "Week 5–6", desc: "Commissioning, calibration, and training for the Therme technical team." },
]

const results = [
  { icon: "bolt", title: "Energy efficiency", desc: "35% reduction in energy consumption through intelligent HVAC and lighting control." },
  { icon: "shield", title: "99.9% reliability", desc: "Round-the-clock monitoring with predictive alerts and proactive intervention." },
  { icon: "chart", title: "Real-time reporting", desc: "Centralised dashboard with full visibility of all consumption data." },
  { icon: "users", title: "Enhanced comfort", desc: "Optimal temperature and humidity maintained across all areas of the complex." },
]

export default function ThermeBucurestiCaseStudy() {
  const [copied, setCopied] = useState(false)

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb Bar */}
      <div className="border-b border-border bg-secondary/50">
        <div className="mx-auto max-w-[1220px] px-4 sm:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/resurse" className="text-muted-foreground hover:text-foreground transition-colors no-underline">Resources</Link>
            <span className="text-muted-foreground">/</span>
            <Link href="/resurse/referinte" className="text-muted-foreground hover:text-foreground transition-colors no-underline">Case Studies</Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-foreground font-medium">Therme Bucharest</span>
          </div>
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {copied ? <Check className="h-3.5 w-3.5" /> : <Share2 className="h-3.5 w-3.5" />}
            {copied ? "Copied" : "Share"}
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-background border-b border-border">
        <div className="mx-auto max-w-[1220px] px-4 sm:px-8 pt-12 pb-16 md:pt-16 md:pb-20">
          <Link
            href="/resurse/referinte"
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-accent no-underline hover:no-underline"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Case Studies
          </Link>

          <div className="grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold tracking-wide text-accent uppercase mb-6">
                HORECA &mdash; Spa &amp; Wellness
              </div>
              <h1 className="text-foreground mb-6 text-balance" style={{ fontSize: "var(--font-size-4xl)", lineHeight: "var(--line-height-tight)", letterSpacing: "-0.03em", fontWeight: 600 }}>
                Therme Bucharest cut energy costs by 35% through BMS automation
              </h1>
              <p className="text-muted-foreground max-w-xl" style={{ fontSize: "var(--font-size-lg)", lineHeight: "var(--line-height-relaxed)", letterSpacing: "-0.01em" }}>
                How Europe&apos;s largest spa complex implemented an integrated building management system for energy efficiency and operational comfort.
              </p>
            </div>

            {/* Metrics Card */}
            <div className="lg:col-span-5">
              <div className="rounded-[2px] border border-border bg-card p-6 shadow-apple">
                <div className="grid grid-cols-2 gap-6">
                  {metrics.map((m, i) => (
                    <div key={i} className={i < 2 ? "pb-6 border-b border-border" : ""}>
                      <div className="text-accent font-semibold" style={{ fontSize: "var(--font-size-3xl)", letterSpacing: "-0.03em", lineHeight: 1 }}>
                        {m.value}
                      </div>
                      <div className="text-muted-foreground mt-1.5" style={{ fontSize: "var(--font-size-sm)", letterSpacing: "-0.01em" }}>
                        {m.label}
                      </div>
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
        <div className="mx-auto max-w-[1220px] px-4 sm:px-8 py-0">
          <div className="relative aspect-[21/9] w-full overflow-hidden rounded-none md:rounded-[2px] md:my-8 -mx-4 md:mx-0">
            <Image
              src="/thermal-spa-modern-building.jpg"
              alt="Therme Bucharest - Spa and wellness complex"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="mx-auto max-w-[1220px] px-4 sm:px-8 py-16 md:py-20">
        <div className="grid lg:grid-cols-12 gap-16">

          {/* Sidebar */}
          <aside className="lg:col-span-3 order-2 lg:order-1">
            <div className="sticky top-24 space-y-8">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2" style={{ letterSpacing: "0.06em" }}>Client</div>
                <div className="font-semibold text-foreground" style={{ fontSize: "var(--font-size-base)", letterSpacing: "-0.01em" }}>Therme Bucharest</div>
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2" style={{ letterSpacing: "0.06em" }}>Industry</div>
                <div className="font-semibold text-foreground" style={{ fontSize: "var(--font-size-base)", letterSpacing: "-0.01em" }}>HORECA - Spa &amp; Wellness</div>
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2" style={{ letterSpacing: "0.06em" }}>Service</div>
                <div className="font-semibold text-foreground" style={{ fontSize: "var(--font-size-base)", letterSpacing: "-0.01em" }}>Full BMS Implementation</div>
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2" style={{ letterSpacing: "0.06em" }}>Technology</div>
                <div className="font-semibold text-foreground" style={{ fontSize: "var(--font-size-base)", letterSpacing: "-0.01em" }}>SAUTER - BACnet / Modbus</div>
              </div>
              <div className="pt-4 border-t border-border">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-[1px] bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground no-underline hover:no-underline transition-all"
                  style={{ letterSpacing: "-0.01em" }}
                >
                  Request a Consultation
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-9 order-1 lg:order-2">

            {/* Testimonial */}
            <div className="mb-16 rounded-[2px] bg-secondary p-8 md:p-10">
              <blockquote>
                <p className="text-foreground mb-6 text-pretty" style={{ fontSize: "var(--font-size-xl)", lineHeight: "var(--line-height-relaxed)", letterSpacing: "-0.02em", fontWeight: 500 }}>
                  {'"'}Sovitech was an outstanding partner. Their real-time reporting, premium service for our technical team, and intuitive platform allowed us to meet international standards with confidence.{'"'}
                </p>
                <footer className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center text-accent font-semibold text-lg">
                    IP
                  </div>
                  <div>
                    <div className="font-semibold text-foreground" style={{ fontSize: "var(--font-size-sm)", letterSpacing: "-0.01em" }}>Ion Popescu</div>
                    <div className="text-muted-foreground" style={{ fontSize: "var(--font-size-sm)" }}>Technical Director, Therme Bucharest</div>
                  </div>
                </footer>
              </blockquote>
            </div>

            {/* The challenge */}
            <div className="mb-16">
              <h2 className="text-foreground mb-6" style={{ fontSize: "var(--font-size-2xl)", letterSpacing: "-0.02em", fontWeight: 600 }}>
                The Challenge
              </h2>
              <div className="space-y-4">
                <p className="text-foreground/85" style={{ fontSize: "var(--font-size-base)", lineHeight: "var(--line-height-relaxed)", letterSpacing: "-0.01em", maxWidth: "45rem" }}>
                  Therme Bucharest, Europe&apos;s largest spa complex, was facing high energy costs and a fragmented monitoring system. With over 8,000 m² of climate-controlled spaces, thermal pools and wellness areas, efficient energy management was essential.
                </p>
                <p className="text-foreground/85" style={{ fontSize: "var(--font-size-base)", lineHeight: "var(--line-height-relaxed)", letterSpacing: "-0.01em", maxWidth: "45rem" }}>
                  The previous automation provider was not meeting expectations on energy efficiency and reporting. As the complex prepared for expansion, a partner capable of delivering international operating standards was needed.
                </p>
              </div>
            </div>

            {/* Solution */}
            <div className="mb-16">
              <h2 className="text-foreground mb-6" style={{ fontSize: "var(--font-size-2xl)", letterSpacing: "-0.02em", fontWeight: 600 }}>
                The Solution
              </h2>
              <p className="text-foreground/85 mb-8" style={{ fontSize: "var(--font-size-base)", lineHeight: "var(--line-height-relaxed)", letterSpacing: "-0.01em", maxWidth: "45rem" }}>
                Sovitech Control implemented an integrated SAUTER BMS platform that unifies HVAC control, lighting, and energy management under a single centralised system:
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { title: "Strategic consultancy", desc: "Comprehensive infrastructure audit and tailored recommendations for the optimal BMS architecture." },
                  { title: "Multi-system integration", desc: "Connecting all systems through open BACnet and Modbus protocols into a single unified platform." },
                  { title: "Intelligent HVAC control", desc: "Optimisation algorithms that automatically adjust temperature based on occupancy and weather conditions." },
                  { title: "Training & support", desc: "Intensive training for the Therme technical team and continuous 24/7 post-implementation support." },
                ].map((item, i) => (
                  <div key={i} className="rounded-[2px] border border-border bg-card p-5 hover-lift">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 h-5 w-5 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <Check className="h-3 w-3 text-accent" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-1" style={{ fontSize: "var(--font-size-sm)", letterSpacing: "-0.01em" }}>
                          {item.title}
                        </h4>
                        <p className="text-muted-foreground" style={{ fontSize: "var(--font-size-sm)", lineHeight: "var(--line-height-relaxed)" }}>
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div className="mb-16">
              <h2 className="text-foreground mb-8" style={{ fontSize: "var(--font-size-2xl)", letterSpacing: "-0.02em", fontWeight: 600 }}>
                Implementation Process
              </h2>
              <div className="space-y-0">
                {timeline.map((step, i) => (
                  <div key={i} className="relative flex gap-6 pb-8 last:pb-0">
                    {i < timeline.length - 1 && (
                      <div className="absolute left-[15px] top-[32px] bottom-0 w-px bg-border" />
                    )}
                    <div className="relative z-10 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2 border-accent bg-background text-xs font-bold text-accent">
                      {i + 1}
                    </div>
                    <div className="pt-0.5">
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="font-semibold text-foreground" style={{ fontSize: "var(--font-size-base)", letterSpacing: "-0.01em" }}>
                          {step.phase}
                        </h4>
                        <span className="text-xs font-medium text-muted-foreground bg-secondary rounded-full px-2.5 py-0.5">
                          {step.duration}
                        </span>
                      </div>
                      <p className="text-muted-foreground" style={{ fontSize: "var(--font-size-sm)", lineHeight: "var(--line-height-relaxed)" }}>
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Results */}
            <div className="mb-16">
              <h2 className="text-foreground mb-8" style={{ fontSize: "var(--font-size-2xl)", letterSpacing: "-0.02em", fontWeight: 600 }}>
                Results &amp; Impact
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {results.map((r, i) => (
                  <div key={i} className="rounded-[2px] bg-secondary p-6">
                    <h4 className="font-semibold text-foreground mb-2" style={{ fontSize: "var(--font-size-base)", letterSpacing: "-0.01em" }}>
                      {r.title}
                    </h4>
                    <p className="text-muted-foreground" style={{ fontSize: "var(--font-size-sm)", lineHeight: "var(--line-height-relaxed)" }}>
                      {r.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* About Company */}
            <div className="mb-16 rounded-[2px] border border-border bg-card p-8">
              <h3 className="font-semibold text-foreground mb-3" style={{ fontSize: "var(--font-size-lg)", letterSpacing: "-0.01em" }}>
                About Therme Bucharest
              </h3>
              <p className="text-muted-foreground" style={{ fontSize: "var(--font-size-base)", lineHeight: "var(--line-height-relaxed)", maxWidth: "45rem" }}>
                Therme Bucharest is Europe&apos;s largest spa wellness complex, welcoming more than 3 million visitors annually. It encompasses spa zones, thermal pools, saunas and wellness facilities, operating to international standards with institutional investment backing.
              </p>
            </div>

            {/* CTA */}
            <div className="rounded-[2px] bg-foreground p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-background font-semibold mb-2" style={{ fontSize: "var(--font-size-xl)", letterSpacing: "-0.02em" }}>
                  Want similar results?
                </h3>
                <p className="text-background/60" style={{ fontSize: "var(--font-size-sm)" }}>
                  Contact our team for a personalised consultation.
                </p>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-[1px] bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground no-underline hover:no-underline whitespace-nowrap transition-all"
                style={{ letterSpacing: "-0.01em" }}
              >
                Contact us
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </main>
        </div>
      </div>

      {/* Related Case Studies */}
      <section className="border-t border-border bg-secondary/50 py-16">
        <div className="mx-auto max-w-[1220px] px-4 sm:px-8">
          <h2 className="text-foreground mb-8" style={{ fontSize: "var(--font-size-2xl)", letterSpacing: "-0.02em", fontWeight: 600 }}>
            Other case studies
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Link href="/resurse/studii-de-caz/radisson-bucuresti" className="group rounded-[2px] border border-border bg-card p-6 no-underline hover:no-underline hover:border-accent/40 transition-all hover-lift">
              <div className="text-xs font-semibold uppercase tracking-wider text-accent mb-3">HORECA - Hotel</div>
              <h3 className="text-foreground font-semibold mb-2 group-hover:text-accent transition-colors" style={{ fontSize: "var(--font-size-lg)", letterSpacing: "-0.01em" }}>
                Radisson Blu Bucharest
              </h3>
              <p className="text-muted-foreground mb-4" style={{ fontSize: "var(--font-size-sm)", lineHeight: "var(--line-height-relaxed)" }}>
                40% increase in operational efficiency through integrated BMS control.
              </p>
              <span className="text-sm font-semibold text-accent inline-flex items-center gap-1">
                Read the study <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
            <Link href="/contact" className="group rounded-[2px] border border-border bg-card p-6 no-underline hover:no-underline hover:border-accent/40 transition-all hover-lift">
              <div className="text-xs font-semibold uppercase tracking-wider text-accent mb-3">Your project</div>
              <h3 className="text-foreground font-semibold mb-2 group-hover:text-accent transition-colors" style={{ fontSize: "var(--font-size-lg)", letterSpacing: "-0.01em" }}>
                The next case study could be yours
              </h3>
              <p className="text-muted-foreground mb-4" style={{ fontSize: "var(--font-size-sm)", lineHeight: "var(--line-height-relaxed)" }}>
                Contact us and find out how we can help your building achieve similar results.
              </p>
              <span className="text-sm font-semibold text-accent inline-flex items-center gap-1">
                Schedule a consultation <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
