import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Clock, CheckCircle2, Network, Zap, Target, Cpu } from "lucide-react"
import Link from "next/link"

export default function IntegrarePage() {
  return (
    <article className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-foreground transition-colors">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/servicii" className="hover:text-foreground transition-colors">
                Services
              </Link>
            </li>
            <li>/</li>
            <li className="text-foreground">System Integration</li>
          </ol>
        </nav>

        <div className="grid gap-12 lg:grid-cols-[280px_1fr]">
          {/* Sidebar */}
          <aside className="space-y-8">
            <div>
              <span className="inline-block rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent mb-4">
                BMS Services
              </span>
              <h3 className="text-sm font-medium text-muted-foreground mb-4">Average project duration</h3>
              <div className="flex items-center gap-2 text-foreground">
                <Clock className="h-5 w-5 text-accent" />
                <span className="font-semibold">2–8 weeks</span>
              </div>
            </div>

            <div className="border-t border-border pt-6">
              <h3 className="text-sm font-medium text-muted-foreground mb-4">Supported protocols</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                  <span>BACnet IP/MS-TP</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                  <span>KNX/EIB</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                  <span>Modbus RTU/TCP</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                  <span>M-Bus</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                  <span>DALI (lighting)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                  <span>OPC UA</span>
                </li>
              </ul>
            </div>

            <div className="border-t border-border pt-6">
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                <Link href="/contact">Request a free consultation</Link>
              </Button>
            </div>
          </aside>

          {/* Main Content */}
          <main className="max-w-3xl">
            <header className="mb-10">
              <h1 className="text-4xl font-bold text-foreground mb-4 md:text-5xl">System Integration</h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Specialised programming services with licensed software, integration of multiple protocols (KNX, DALI,
                Modbus, M-Bus, BACnet) and connection of complex systems into a unified platform.
              </p>
            </header>

            {/* Hero Image */}
            <div className="mb-12 aspect-video overflow-hidden rounded-xl bg-muted">
              <img
                src="/services-system-integration.jpg"
                alt="BMS system integration"
                className="h-full w-full object-cover"
              />
            </div>

            {/* Process Section */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <Target className="h-6 w-6 text-accent" />
                Integration Process
              </h2>

              <div className="space-y-6">
                <div className="rounded-xl border border-border bg-card p-6">
                  <div className="flex items-start gap-4">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-white text-sm font-bold shrink-0">
                      1
                    </span>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Existing Systems Audit</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        We analyse all existing technical systems in the building: HVAC, lighting, access control,
                        metering, fire detection. We identify communication protocols and available integration points.
                      </p>
                      <p className="text-sm text-accent mt-2">Duration: 2–4 days</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-border bg-card p-6">
                  <div className="flex items-start gap-4">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-white text-sm font-bold shrink-0">
                      2
                    </span>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Integration Architecture</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        We design the integration architecture, select the necessary gateways and define the data
                        structure. We establish the system hierarchy and the communication logic between the various
                        sub-systems.
                      </p>
                      <p className="text-sm text-accent mt-2">Duration: 1 week</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-border bg-card p-6">
                  <div className="flex items-start gap-4">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-white text-sm font-bold shrink-0">
                      3
                    </span>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Programming and Configuration</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        We programme BMS controllers using SAUTER CASE Suite software, configure inter-system
                        communication and implement automation logic. We develop custom graphical interfaces for
                        operation.
                      </p>
                      <p className="text-sm text-accent mt-2">Duration: 2–4 weeks</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-border bg-card p-6">
                  <div className="flex items-start gap-4">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-white text-sm font-bold shrink-0">
                      4
                    </span>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">End-to-End Testing</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        We verify communication between all integrated systems, test automation scenarios and optimise
                        parameters. We validate correct operation under real operating conditions.
                      </p>
                      <p className="text-sm text-accent mt-2">Duration: 1–2 weeks</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Protocols Section */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <Network className="h-6 w-6 text-accent" />
                Protocols and Technologies
              </h2>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-border bg-card p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <Cpu className="h-5 w-5 text-accent" />
                    <h3 className="font-semibold text-foreground">BACnet</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Standard protocol for communication between BMS equipment. We support BACnet IP and MS/TP.
                  </p>
                </div>

                <div className="rounded-xl border border-border bg-card p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <Cpu className="h-5 w-5 text-accent" />
                    <h3 className="font-semibold text-foreground">KNX/EIB</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    European standard for building automation, ideal for lighting and blind control.
                  </p>
                </div>

                <div className="rounded-xl border border-border bg-card p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <Cpu className="h-5 w-5 text-accent" />
                    <h3 className="font-semibold text-foreground">Modbus</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Industrial protocol for communication with field equipment, meters and PLCs.
                  </p>
                </div>

                <div className="rounded-xl border border-border bg-card p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <Cpu className="h-5 w-5 text-accent" />
                    <h3 className="font-semibold text-foreground">M-Bus</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Protocol for reading utility meters: electricity, water, gas, heat.
                  </p>
                </div>
              </div>
            </section>

            {/* Impact Section */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <Zap className="h-6 w-6 text-accent" />
                Impact and Benefits
              </h2>

              <div className="grid gap-4 sm:grid-cols-2">
                <Card className="border-border/40 bg-accent/5">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl font-bold text-accent mb-2">100%</div>
                    <p className="text-sm text-muted-foreground">Centralised visibility</p>
                  </CardContent>
                </Card>
                <Card className="border-border/40 bg-accent/5">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl font-bold text-accent mb-2">40%</div>
                    <p className="text-sm text-muted-foreground">Reduction in intervention time</p>
                  </CardContent>
                </Card>
                <Card className="border-border/40 bg-accent/5">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl font-bold text-accent mb-2">1</div>
                    <p className="text-sm text-muted-foreground">Single control interface</p>
                  </CardContent>
                </Card>
                <Card className="border-border/40 bg-accent/5">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl font-bold text-accent mb-2">∞</div>
                    <p className="text-sm text-muted-foreground">Automation scenarios</p>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* CTA Section */}
            <section className="rounded-xl bg-accent/10 border border-accent/20 p-8 text-center">
              <h2 className="text-2xl font-bold text-foreground mb-4">Do you have separate systems that don&apos;t communicate?</h2>
              <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                We integrate all your systems into a single platform. Contact us for a free analysis of your existing
                infrastructure.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                  <Link href="/contact">Request a free audit</Link>
                </Button>
                <Button size="lg" variant="outline" className="border-border hover:bg-accent/10 bg-transparent" asChild>
                  <Link href="/resurse/referinte">View integration projects</Link>
                </Button>
              </div>
            </section>

            {/* Related Services */}
            <section className="mt-12 pt-12 border-t border-border">
              <h3 className="text-lg font-semibold text-foreground mb-6">Related services</h3>
              <div className="grid gap-4 sm:grid-cols-3">
                <Link
                  href="/servicii/proiectare"
                  className="group rounded-lg border border-border p-4 hover:border-accent/50 transition-colors"
                >
                  <h4 className="font-medium text-foreground group-hover:text-accent transition-colors">
                    BMS Design
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1">Complete BMS system design</p>
                </Link>
                <Link
                  href="/servicii/executie"
                  className="group rounded-lg border border-border p-4 hover:border-accent/50 transition-colors"
                >
                  <h4 className="font-medium text-foreground group-hover:text-accent transition-colors">
                    Execution &amp; Implementation
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1">SAUTER equipment installation</p>
                </Link>
                <Link
                  href="/servicii/mentenanta"
                  className="group rounded-lg border border-border p-4 hover:border-accent/50 transition-colors"
                >
                  <h4 className="font-medium text-foreground group-hover:text-accent transition-colors">Maintenance</h4>
                  <p className="text-sm text-muted-foreground mt-1">Service and upgrades</p>
                </Link>
              </div>
            </section>
          </main>
        </div>
      </div>
    </article>
  )
}
