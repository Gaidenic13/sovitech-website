import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Clock, CheckCircle2, FileText, Zap, Target } from "lucide-react"
import Link from "next/link"

export default function ProiectarePage() {
  return (
    <article className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-foreground transition-colors">
                Acasa
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/servicii" className="hover:text-foreground transition-colors">
                Servicii
              </Link>
            </li>
            <li>/</li>
            <li className="text-foreground">Proiectare BMS</li>
          </ol>
        </nav>

        <div className="grid gap-12 lg:grid-cols-[280px_1fr]">
          {/* Sidebar */}
          <aside className="space-y-8">
            <div>
              <span className="inline-block rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent mb-4">
                Servicii BMS
              </span>
              <h3 className="text-sm font-medium text-muted-foreground mb-4">Durata medie proiect</h3>
              <div className="flex items-center gap-2 text-foreground">
                <Clock className="h-5 w-5 text-accent" />
                <span className="font-semibold">2-6 saptamani</span>
              </div>
            </div>

            <div className="border-t border-border pt-6">
              <h3 className="text-sm font-medium text-muted-foreground mb-4">Livrabile incluse</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                  <span>Documentatie tehnica completa</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                  <span>Scheme electrice si de automatizare</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                  <span>Lista echipamente cu specificatii</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                  <span>Estimare buget si timeline</span>
                </li>
              </ul>
            </div>

            <div className="border-t border-border pt-6">
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                <Link href="/contact">Solicita consultatie gratuita</Link>
              </Button>
            </div>
          </aside>

          {/* Main Content */}
          <main className="max-w-3xl">
            <header className="mb-10">
              <h1 className="text-4xl font-bold text-foreground mb-4 md:text-5xl">Proiectare BMS</h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Proiectare completa de sisteme Building Management System pentru automatizarea functiilor critice ale
                cladirii: HVAC, securitate, control acces, iluminat si detectie incendiu.
              </p>
            </header>

            {/* Hero Image */}
            <div className="mb-12 aspect-video overflow-hidden rounded-[2px] bg-muted">
              <img
                src="/services-engineering-design.jpg"
                alt="Proiectare BMS - Echipa de ingineri"
                className="h-full w-full object-cover"
              />
            </div>

            {/* Process Section */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <Target className="h-6 w-6 text-accent" />
                Procesul de Proiectare
              </h2>

              <div className="space-y-6">
                <div className="rounded-[2px] border border-border bg-card p-6">
                  <div className="flex items-start gap-4">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-white text-sm font-bold shrink-0">
                      1
                    </span>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Analiza si Evaluare Initiala</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Echipa noastra efectueaza o evaluare completa a cladirii, analizand infrastructura existenta,
                        consumul energetic actual si obiectivele de eficienta. Identificam oportunitatile de optimizare
                        si definim scope-ul proiectului impreuna cu clientul.
                      </p>
                      <p className="text-sm text-accent mt-2">Durata: 3-5 zile lucratoare</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-[2px] border border-border bg-card p-6">
                  <div className="flex items-start gap-4">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-white text-sm font-bold shrink-0">
                      2
                    </span>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Conceptualizare si Design</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Dezvoltam conceptul tehnic al sistemului BMS, selectam echipamentele optime din gama SAUTER si
                        cream arhitectura sistemului. Definim punctele de masurare, controlerele necesare si
                        protocoalele de comunicatie (BACnet, KNX, Modbus).
                      </p>
                      <p className="text-sm text-accent mt-2">Durata: 1-2 saptamani</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-[2px] border border-border bg-card p-6">
                  <div className="flex items-start gap-4">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-white text-sm font-bold shrink-0">
                      3
                    </span>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Documentatie Tehnica</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Elaboram documentatia completa de proiectare: scheme electrice, diagrame de automatizare, liste
                        de echipamente cu specificatii tehnice, planuri de amplasare si instructiuni de montaj. Toate
                        documentele respecta standardele in vigoare.
                      </p>
                      <p className="text-sm text-accent mt-2">Durata: 1-2 saptamani</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-[2px] border border-border bg-card p-6">
                  <div className="flex items-start gap-4">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-white text-sm font-bold shrink-0">
                      4
                    </span>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Validare si Aprobare</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Prezentam proiectul clientului pentru validare, efectuam ajustarile necesare si obtinem
                        aprobarile finale. Pregatim caietul de sarcini pentru faza de executie si oferim suport in
                        procesul de achizitie echipamente.
                      </p>
                      <p className="text-sm text-accent mt-2">Durata: 3-5 zile lucratoare</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Impact Section */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <Zap className="h-6 w-6 text-accent" />
                Impact si Beneficii
              </h2>

              <div className="grid gap-4 sm:grid-cols-2">
                <Card className="border-border/40 bg-accent/5">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl font-bold text-accent mb-2">35%</div>
                    <p className="text-sm text-muted-foreground">Reducere costuri energetice</p>
                  </CardContent>
                </Card>
                <Card className="border-border/40 bg-accent/5">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl font-bold text-accent mb-2">50%</div>
                    <p className="text-sm text-muted-foreground">Mai putine interventii manuale</p>
                  </CardContent>
                </Card>
                <Card className="border-border/40 bg-accent/5">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl font-bold text-accent mb-2">2-3 ani</div>
                    <p className="text-sm text-muted-foreground">ROI mediu investitie</p>
                  </CardContent>
                </Card>
                <Card className="border-border/40 bg-accent/5">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl font-bold text-accent mb-2">24/7</div>
                    <p className="text-sm text-muted-foreground">Monitorizare automata</p>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* What's Included */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <FileText className="h-6 w-6 text-accent" />
                Ce include proiectarea BMS
              </h2>

              <div className="prose prose-gray max-w-none">
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent mt-0.5 shrink-0" />
                    <span>
                      <strong className="text-foreground">Automatizare HVAC</strong> - Control inteligent pentru
                      incalzire, ventilatie si aer conditionat cu optimizare energetica
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent mt-0.5 shrink-0" />
                    <span>
                      <strong className="text-foreground">Sistem de iluminat</strong> - Control automat bazat pe
                      prezenta si lumina naturala pentru economii maxime
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent mt-0.5 shrink-0" />
                    <span>
                      <strong className="text-foreground">Control acces si securitate</strong> - Integrare cu sistemele
                      de securitate existente sau noi
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent mt-0.5 shrink-0" />
                    <span>
                      <strong className="text-foreground">Detectie incendiu</strong> - Monitorizare si alertare automata
                      pentru siguranta maxima
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent mt-0.5 shrink-0" />
                    <span>
                      <strong className="text-foreground">Contorizare utilitati</strong> - Monitorizare consum energie,
                      apa, gaz cu raportare detaliata
                    </span>
                  </li>
                </ul>
              </div>
            </section>

            {/* CTA Section */}
            <section className="rounded-[2px] bg-accent/10 border border-accent/20 p-8 text-center">
              <h2 className="text-2xl font-bold text-foreground mb-4">Pregatit sa incepi proiectul BMS?</h2>
              <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                Contacteaza-ne pentru o consultatie gratuita. Echipa noastra va analiza cerintele tale si va propune
                solutia optima pentru cladirea ta.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                  <Link href="/contact">Solicita oferta gratuita</Link>
                </Button>
                <Button size="lg" variant="outline" className="border-border hover:bg-accent/10 bg-transparent" asChild>
                  <Link href="/resurse/referinte">Vezi proiecte similare</Link>
                </Button>
              </div>
            </section>

            {/* Related Services */}
            <section className="mt-12 pt-12 border-t border-border">
              <h3 className="text-lg font-semibold text-foreground mb-6">Servicii conexe</h3>
              <div className="grid gap-4 sm:grid-cols-3">
                <Link
                  href="/servicii/executie"
                  className="group rounded-[2px] border border-border p-4 hover:border-accent/50 transition-colors"
                >
                  <h4 className="font-medium text-foreground group-hover:text-accent transition-colors">
                    Executie & Implementare
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1">Implementare profesionala cu echipamente SAUTER</p>
                </Link>
                <Link
                  href="/servicii/integrare"
                  className="group rounded-[2px] border border-border p-4 hover:border-accent/50 transition-colors"
                >
                  <h4 className="font-medium text-foreground group-hover:text-accent transition-colors">
                    Integrare Sisteme
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1">Programare si integrare protocoale multiple</p>
                </Link>
                <Link
                  href="/servicii/mentenanta"
                  className="group rounded-[2px] border border-border p-4 hover:border-accent/50 transition-colors"
                >
                  <h4 className="font-medium text-foreground group-hover:text-accent transition-colors">Mentenanta</h4>
                  <p className="text-sm text-muted-foreground mt-1">Service si upgrade-uri de eficienta</p>
                </Link>
              </div>
            </section>
          </main>
        </div>
      </div>
    </article>
  )
}
