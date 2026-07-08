import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Calculator, Download, TrendingUp, BookOpen } from "lucide-react"
import Link from "next/link"

export default function ResurseSuplimentarePage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0D4D4D] to-[#0A3939] py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Resurse Suplimentare BMS</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Instrumente, calculatoare și conținut educațional pentru a vă ajuta să luați cea mai bună decizie despre
              automatizarea clădirii.
            </p>
          </div>
        </div>
      </section>

      {/* Tools & Calculators */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Instrumente Interactive</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="p-8 border-border hover:border-primary/50 transition-colors">
              <div className="h-14 w-14 rounded-[2px] bg-primary/10 flex items-center justify-center mb-6">
                <Calculator className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Calculator ROI BMS</h3>
              <p className="text-muted-foreground mb-6">
                Estimați economiile potențiale și perioada de recuperare a investiției în automatizare BMS pentru
                clădirea dumneavoastră.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                <li>✓ Calcul economii energetice anuale</li>
                <li>✓ Estimare perioadă recuperare investiție</li>
                <li>✓ Comparație scenarii de implementare</li>
              </ul>
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                Deschide Calculatorul
              </Button>
            </Card>

            <Card className="p-8 border-border hover:border-primary/50 transition-colors">
              <div className="h-14 w-14 rounded-[2px] bg-primary/10 flex items-center justify-center mb-6">
                <TrendingUp className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Quiz Pregătire BMS</h3>
              <p className="text-muted-foreground mb-6">
                Evaluați în 5 minute gradul de pregătire al clădirii pentru implementarea unui sistem BMS performant.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                <li>✓ 15 întrebări despre infrastructură</li>
                <li>✓ Rezultat instant cu scorare</li>
                <li>✓ Recomandări personalizate</li>
              </ul>
              <Button variant="outline" className="w-full bg-transparent">
                Începe Quiz-ul
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Studii de Caz Detaliate</h2>
            <p className="text-lg text-muted-foreground">
              Rezultate măsurabile din proiectele noastre de automatizare BMS
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <Card className="p-6 border-border hover:border-primary/40 transition-colors duration-300">
              <img
                src="/modern-spa-building-thermal-pools.jpg"
                alt="Therme Bucuresti"
                className="w-full h-48 object-cover rounded-[2px] mb-4"
              />
              <span className="text-xs font-semibold text-primary">HORECA</span>
              <h3 className="text-xl font-bold mt-2 mb-2">Therme București</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Reducere cu 35% a costurilor energetice pentru cel mai mare complex wellness din Europa.
              </p>
              <Button variant="link" className="p-0 h-auto" asChild>
                <Link href="/resurse/studii-de-caz/therme-bucuresti">Citește studiul →</Link>
              </Button>
            </Card>

            <Card className="p-6 border-border hover:border-primary/40 transition-colors duration-300">
              <img
                src="/luxury-hotel-modern-building.jpg"
                alt="Radisson Blu"
                className="w-full h-48 object-cover rounded-[2px] mb-4"
              />
              <span className="text-xs font-semibold text-primary">HOTEL</span>
              <h3 className="text-xl font-bold mt-2 mb-2">Radisson Blu București</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Optimizare confort și eficiență energetică pentru hotel 5 stele cu 428 camere.
              </p>
              <Button variant="link" className="p-0 h-auto" asChild>
                <Link href="/resurse/studii-de-caz/radisson-bucuresti">Citește studiul →</Link>
              </Button>
            </Card>

            <Card className="p-6 border-border hover:border-primary/40 transition-colors duration-300">
              <img
                src="/pharmaceutical-manufacturing.png"
                alt="Rompharm"
                className="w-full h-48 object-cover rounded-[2px] mb-4"
              />
              <span className="text-xs font-semibold text-primary">PHARMA</span>
              <h3 className="text-xl font-bold mt-2 mb-2">Rompharm Company</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Control precis mediu productie pentru facilitati farmaceutice certificate GMP.
              </p>
              <Button variant="link" className="p-0 h-auto" asChild>
                <Link href="/resurse/referinte">Citește studiul →</Link>
              </Button>
            </Card>
          </div>

          <div className="text-center mt-8">
            <Button variant="outline" size="lg" asChild>
              <Link href="/resurse/referinte">Vezi Toate Proiectele</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Blog Series */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Serie de Articole: Ghid Complet BMS</h2>
            <p className="text-lg text-muted-foreground">
              Conținut educațional aprofundat despre sisteme de automatizare
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <Card className="p-6 border-border hover:border-primary/50 transition-colors">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-primary">PARTEA 1</span>
                  <h3 className="text-lg font-bold mt-1 mb-2">Fundamentele BMS: Ce Trebuie să Știți</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Introducere completă în sistemele de management clădiri: componente, beneficii și tehnologii.
                  </p>
                  <Button variant="link" className="p-0 h-auto text-sm">
                    Citește articolul →
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-border hover:border-primary/50 transition-colors">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-primary">PARTEA 2</span>
                  <h3 className="text-lg font-bold mt-1 mb-2">Evaluarea ROI: Merită Investiția?</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Metodologie detaliată pentru calculul rentabilității investiției în BMS pentru diferite tipuri de
                    clădiri.
                  </p>
                  <Button variant="link" className="p-0 h-auto text-sm">
                    Citește articolul →
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-border hover:border-primary/50 transition-colors">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-primary">PARTEA 3</span>
                  <h3 className="text-lg font-bold mt-1 mb-2">Procesul de Implementare Pas cu Pas</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    De la audit inițial la punerea în funcțiune: ghid complet pentru implementarea cu succes a BMS.
                  </p>
                  <Button variant="link" className="p-0 h-auto text-sm">
                    Citește articolul →
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-border hover:border-primary/50 transition-colors">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-primary">PARTEA 4</span>
                  <h3 className="text-lg font-bold mt-1 mb-2">Mentenanță și Optimizare Continuă</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Cum să mențineți performanța sistemului BMS și să maximizați economiile pe termen lung.
                  </p>
                  <Button variant="link" className="p-0 h-auto text-sm">
                    Citește articolul →
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto p-8 md:p-12 border-border bg-gradient-to-br from-primary/5 to-primary/10">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Aveți Întrebări despre BMS?</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Echipa noastră de specialiști este pregătită să vă ajute cu informații personalizate pentru proiectul
                dumneavoastră.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                  <Link href="/contact">Programează Consultație</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/ghid-bms/descarca">
                    <Download className="mr-2 h-5 w-5" />
                    Descarcă Ghidul
                  </Link>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  )
}
