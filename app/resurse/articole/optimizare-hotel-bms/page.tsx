import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Copy, Linkedin, Twitter, Facebook } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function OptimizareHotelBMSPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="border-b border-border/40">
        <div className="container mx-auto px-4 py-4">
          <Link
            href="/resurse"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Resurse
          </Link>
        </div>
      </div>

      {/* Article */}
      <article className="container mx-auto px-4 py-12">
        <div className="grid gap-12 lg:grid-cols-[280px_1fr]">
          {/* Left Sidebar */}
          <aside className="space-y-8 lg:sticky lg:top-24 lg:self-start">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">Categorie</p>
              <Link
                href="/resurse?category=ghid"
                className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/20 transition-colors"
              >
                Ghid Tehnic
              </Link>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-3">Scris de</p>
              <div className="flex items-center gap-3">
                <div className="relative h-12 w-12 overflow-hidden rounded-full bg-muted">
                  <Image src="/professional-male-engineer-headshot.jpg" alt="Andrei Popescu" fill className="object-cover" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Andrei Popescu</p>
                  <p className="text-sm text-muted-foreground">Director Tehnic, Sovitech</p>
                </div>
              </div>
            </div>

            {/* Table of Contents */}
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-3">Cuprins</p>
              <nav className="space-y-2">
                {[
                  { label: "Nevoia de sisteme inteligente", id: "nevoia" },
                  { label: "Solutiile BMS Sovitech", id: "solutii" },
                  { label: "Radisson Blu - Studiu de caz", id: "studiu-caz" },
                  { label: "Economii si benchmark-uri", id: "economii" },
                  { label: "Recomandari implementare", id: "recomandari" },
                  { label: "KPI-uri de monitorizare", id: "kpis" },
                ].map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-3">Distribuie</p>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" className="h-9 w-9 rounded-full bg-transparent">
                  <Copy className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="h-9 w-9 rounded-full bg-transparent">
                  <Linkedin className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="h-9 w-9 rounded-full bg-transparent">
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="h-9 w-9 rounded-full bg-transparent">
                  <Facebook className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="max-w-3xl">
            <header className="mb-12">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                Ghid Tehnic
              </div>
              <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tighter text-foreground md:text-5xl">
                Optimizarea performantei hoteliere prin automatizare si management energetic
              </h1>
              <p className="mb-6 text-xl text-muted-foreground leading-relaxed">
                Cum pot hotelurile moderne sa reduca costurile energetice cu 25-65% mentinand confortul
                oaspetilor la cele mai inalte standarde prin sisteme BMS integrate.
              </p>
              <p className="text-sm text-muted-foreground">Feb 20, 2026 — 18 min citire</p>
            </header>

            {/* Hero Image */}
            <div className="relative mb-12 aspect-[16/9] overflow-hidden rounded-[2px] bg-muted">
              <Image
                src="/luxury-hotel-lobby-modern-interior.jpg"
                alt="Interior hotel modern cu sistem de automatizare"
                fill
                className="object-cover"
              />
            </div>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              <p className="text-lg leading-relaxed text-foreground">
                Hotelurile moderne se confrunta cu costuri energetice in crestere si cerinte de sustenabilitate tot mai stricte,
                in timp ce se straduiesc sa mentina confortul oaspetilor. Integrarea sistemelor avansate de Building Management (BMS) este
                acum esentiala pentru operatiuni eficiente.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                Sovitech Control, specialist roman in BMS, implementeaza solutii integrate care{" "}
                <strong className="text-foreground">optimizeaza consumul energetic, reduc costurile operationale si mentin
                confortul ridicat al ocupantilor</strong>. De exemplu, Radisson Blu Hotel Bucuresti — un hotel de 5 stele cu 424 de
                camere si facilitati extinse (restaurante, spa, sala de fitness, piscine interioare si exterioare) — a adoptat automatizarea
                inteligenta pentru a-si indeplini certificarea Green Key si standardele ridicate de eficienta energetica.
              </p>

              {/* Section: Need */}
              <h2 id="nevoia" className="mt-16 mb-6 text-3xl font-bold text-foreground">
                Nevoia de sisteme inteligente in hoteluri
              </h2>

              <p className="text-muted-foreground leading-relaxed">
                Hotelurile functioneaza 24/7, generand cerere constanta pentru incalzire, racire, iluminat si apa calda.
                Fara control centralizat, consumul de energie{" "}
                <strong className="text-foreground">poate scapa usor de sub control</strong>, facand
                costurile de utilitati imprevizibile si mari.
              </p>

              {/* Key Data Point */}
              <div className="my-12 rounded-[2px] border border-border bg-card p-8">
                <h4 className="mb-6 text-lg font-semibold text-foreground">
                  Consumul energetic tipic al unui hotel
                </h4>
                <div className="grid grid-cols-3 gap-6 text-center">
                  <div className="rounded-[2px] bg-muted/50 p-6">
                    <p className="text-3xl font-bold text-primary mb-2">1.52</p>
                    <p className="text-sm text-muted-foreground">GWh/an consum<br/>hotel 170 camere</p>
                  </div>
                  <div className="rounded-[2px] bg-muted/50 p-6">
                    <p className="text-3xl font-bold text-primary mb-2">82.6%</p>
                    <p className="text-sm text-muted-foreground">Scor BREEAM<br/>Radisson Blu</p>
                  </div>
                  <div className="rounded-[2px] bg-muted/50 p-6">
                    <p className="text-3xl font-bold text-primary mb-2">100%</p>
                    <p className="text-sm text-muted-foreground">Electricitate din<br/>surse regenerabile</p>
                  </div>
                </div>
                <p className="mt-6 text-sm text-muted-foreground">
                  Sursa: Studiu Spacewell si date Radisson Blu Bucuresti
                </p>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                Presiunile de reglementare si branding impinge hotelurile catre sustenabilitate. Radisson Blu Bucuresti,
                de exemplu, foloseste 100% electricitate regenerabila si a obtinut un scor BREEAM In-Use Excellent de 82.6%.
                Atingerea acestor obiective necesita monitorizare si control precis al tuturor sistemelor din cladire.
              </p>

              {/* Section: Solutions */}
              <h2 id="solutii" className="mt-16 mb-6 text-3xl font-bold text-foreground">
                Solutiile BMS Sovitech pentru hoteluri
              </h2>

              <p className="text-muted-foreground leading-relaxed">
                Sovitech Control furnizeaza servicii de automatizare end-to-end adaptate sectorului de ospitalitate.
                Ca partener autorizat al producatorului elvetian SAUTER, Sovitech ofera o gama completa de hardware BMS
                (controlere, vane, senzori, termostate) si software.
              </p>

              <div className="my-8 grid gap-4 sm:grid-cols-2">
                {[
                  { title: "Control HVAC inteligent", desc: "Reglare automata a temperaturii si ventilatie in functie de ocupare" },
                  { title: "Monitorizare energetica", desc: "Dashboard-uri in timp real pentru consum si eficienta" },
                  { title: "Integrare Fidelio", desc: "Conectare cu sistemul de management hotelier pentru control pe camera" },
                  { title: "Control piscine si spa", desc: "Automatizare completa pentru facilitati de wellness" },
                  { title: "Protocoale deschise", desc: "KNX, DALI, Modbus, M-Bus, BACnet pentru interoperabilitate" },
                  { title: "Alerte si mentenanta", desc: "Notificari automate pentru anomalii si intretinere preventiva" },
                ].map((item) => (
                  <div key={item.title} className="rounded-[2px] border border-border/40 bg-card p-5">
                    <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>

              <p className="text-muted-foreground leading-relaxed">
                Prin centralizarea datelor din multiple subsisteme, un BMS Sovitech ofera operatorilor{" "}
                <strong className="text-foreground">o singura interfata pentru toate operatiunile</strong>. Echipa
                de facilitati a hotelului poate ajusta temperaturi, seta moduri de ventilatie si vizualiza consumul
                energetic in timp real.
              </p>

              {/* Section: Case Study */}
              <h2 id="studiu-caz" className="mt-16 mb-6 text-3xl font-bold text-foreground">
                Radisson Blu Bucuresti: un exemplu de ospitalitate sustenabila
              </h2>

              <div className="relative my-8 aspect-[16/9] overflow-hidden rounded-[2px] bg-muted">
                <Image
                  src="/ref-radisson-blu.jpg"
                  alt="Hotel Radisson Blu Bucuresti"
                  fill
                  className="object-cover"
                />
              </div>

              <p className="text-muted-foreground leading-relaxed">
                Proprietatea de 5 stele — cu 12 sali de conferinte, un ballroom pentru 500+ invitati, multiple restaurante
                si facilitati spa — reprezinta o provocare complexa de control. Implementarea Sovitech a oferit Radisson Blu
                supraveghere centralizata a sistemelor HVAC, apei calde, incalzirii piscinelor si iluminatului.
              </p>

              <div className="my-8 rounded-[2px] bg-primary/5 border border-primary/20 p-6">
                <p className="text-foreground font-medium mb-3">Rezultate post-implementare:</p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0"></span>
                    <span><strong className="text-foreground">Vizibilitate energetica in timp real</strong> pe intreaga proprietate</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0"></span>
                    <span><strong className="text-foreground">Climate interioare stabile</strong> in toate zonele, imbunatatind confortul oaspetilor</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0"></span>
                    <span><strong className="text-foreground">Optimizare chiller</strong> in camerele pentru oaspeti in perioadele de ocupare redusa</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0"></span>
                    <span><strong className="text-foreground">Investitie de 1.6M EUR</strong> in spatii de evenimente pentru reducerea amprentei de carbon</span>
                  </li>
                </ul>
              </div>

              {/* Section: Benchmarks */}
              <h2 id="economii" className="mt-16 mb-6 text-3xl font-bold text-foreground">
                Economii energetice si benchmark-uri din industrie
              </h2>

              <p className="text-muted-foreground leading-relaxed">
                Mai multe lanturi hoteliere raporteaza castiguri semnificative din managementul energetic:
              </p>

              {/* Benchmark Data */}
              <div className="my-12 rounded-[2px] border border-border bg-card p-8">
                <h4 className="mb-6 text-lg font-semibold text-foreground">
                  Reduceri energetice raportate de lanturi hoteliere
                </h4>
                <div className="space-y-4">
                  {[
                    { hotel: "DoubleTree by Hilton (170 camere)", value: 65, detail: "Dupa audit sistematic si monitorizare noua" },
                    { hotel: "Carlson Rezidor Amsterdam", value: 30, detail: "Automatizare + iluminat eficient + obisnuinte inteligente" },
                    { hotel: "Benchmark mediu industrie", value: 25, detail: "Estimare conservatoare pentru upgrade BMS standard" },
                  ].map((item) => (
                    <div key={item.hotel} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{item.hotel}</span>
                        <span className="font-medium text-foreground">-{item.value}%</span>
                      </div>
                      <div className="h-3 w-full rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-primary transition-all"
                          style={{ width: `${item.value}%` }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="my-12 rounded-[2px] border border-border bg-card p-8">
                <h4 className="mb-6 text-lg font-semibold text-foreground">KPI-uri tipice de benchmarking</h4>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="rounded-[2px] bg-muted/50 p-5">
                    <p className="text-2xl font-bold text-primary mb-1">{'100-150'}</p>
                    <p className="text-xs text-muted-foreground">kWh/mp/an<br/>consum hotel tipic</p>
                  </div>
                  <div className="rounded-[2px] bg-muted/50 p-5">
                    <p className="text-2xl font-bold text-primary mb-1">{'20-30%'}</p>
                    <p className="text-xs text-muted-foreground">Reducere tinta<br/>obiectiv BMS comun</p>
                  </div>
                  <div className="rounded-[2px] bg-muted/50 p-5">
                    <p className="text-2xl font-bold text-primary mb-1">{'3-5'}</p>
                    <p className="text-xs text-muted-foreground">Ani perioada<br/>de amortizare</p>
                  </div>
                </div>
              </div>

              {/* Section: Recommendations */}
              <h2 id="recomandari" className="mt-16 mb-6 text-3xl font-bold text-foreground">
                Recomandari pentru implementarea BMS
              </h2>

              <p className="text-muted-foreground leading-relaxed mb-8">
                Bazat pe aceste informatii, recomandam managerilor hotelieri o abordare structurata:
              </p>

              <div className="space-y-6">
                {[
                  {
                    step: "1",
                    title: "Realizati un audit energetic complet",
                    desc: "Cartografiati toate sistemele mecanice, electrice si de apa. Analizati facturile de utilitati, contorizati subsistemele si identificati consumatorii excesivi."
                  },
                  {
                    step: "2",
                    title: "Upgrade-uiti senzorii si controlerele",
                    desc: "Inlocuiti termostatele si senzorii de presiune invechiti cu versiuni moderne, conectate la retea. Instalati subcontoare in zone cheie (bucatarie, spalatorie, spa)."
                  },
                  {
                    step: "3",
                    title: "Integrati sistemele sub un singur BMS",
                    desc: "Asigurati-va ca HVAC, iluminatul, refrigerarea si alte sisteme raporteaza catre un BMS unificat. Implementati logica pentru programe orare, ajustari bazate pe ocupare si ventilatie controlata."
                  },
                  {
                    step: "4",
                    title: "Folositi analitica si monitorizarea",
                    desc: "Utilizati dashboard-uri software pentru a vizualiza tendinte si alerte. Revizuiti regulat consumul fata de baseline-uri ajustate la vreme. Folositi detectia anomaliilor pentru a prinde defectiunile devreme."
                  },
                  {
                    step: "5",
                    title: "Implicati personalul si oaspetii",
                    desc: "Instruirea este vitala: echipele de facilitati trebuie sa inteleaga interfetele BMS si procedurile de raspuns. Considerati programe orientate catre oaspeti care incurajeaza comportamentul constient energetic."
                  },
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-4">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground flex-shrink-0">
                      {item.step}
                    </span>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>
                      <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Section: KPIs */}
              <h2 id="kpis" className="mt-16 mb-6 text-3xl font-bold text-foreground">
                KPI-uri pentru monitorizarea succesului
              </h2>

              <p className="text-muted-foreground leading-relaxed mb-8">
                Hotelurile ar trebui sa urmareasca KPI-uri care reflecta atat energia cat si confortul:
              </p>

              <div className="my-8 space-y-4">
                {[
                  {
                    kpi: "Intensitatea consumului energetic (EUI)",
                    desc: "kWh per metru patrat (sau per camera-noapte) pe an. Ofera un baseline pentru evaluarea imbunatatirilor.",
                  },
                  {
                    kpi: "Cost energetic per camera ocupata (ECOR)",
                    desc: "Cheltuiala totala cu energia impartita la numarul de camera-nopti ocupate. Leaga consumul de generatorii de venituri.",
                  },
                  {
                    kpi: "Eficienta HVAC",
                    desc: "Raportul dintre energia reala si cea ideala pentru incalzire/racire. Metrici precum COP (Coeficientul de Performanta) pentru chillere.",
                  },
                  {
                    kpi: "Indicatori de confort al oaspetilor",
                    desc: "Numarul de reclamatii de temperatura sau devieri ale senzorilor. Un BMS functional mentine conditiile in limita a plus/minus 1-2 grade fata de setpoint.",
                  },
                  {
                    kpi: "Emisii de gaze cu efect de sera",
                    desc: "Kg CO2 per oaspete-noapte, mai ales cu inputuri de energie regenerabila.",
                  },
                  {
                    kpi: "Uptime mentenanta",
                    desc: "Procentul de functionare al sistemelor critice (boilere, chillere). Sisteme mai stabile inseamna mai putina mentenanta reactiva.",
                  },
                ].map((item) => (
                  <div key={item.kpi} className="rounded-[2px] border border-border/40 bg-card p-5">
                    <h4 className="font-semibold text-foreground mb-1">{item.kpi}</h4>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>

              {/* Conclusion */}
              <h2 className="mt-16 mb-6 text-3xl font-bold text-foreground">Concluzie</h2>

              <p className="text-muted-foreground leading-relaxed">
                Pentru managerii de facilitati hoteliere, investitia in automatizare avansata este o cale catre
                experiente mai bune pentru oaspeti si marje de profit mai sanatoase. Dupa cum demonstreaza
                Radisson Blu Bucuresti si altii, integrarea BMS inteligenta poate reduce dramatic consumul energetic
                (adesea in intervalul 25-65%) asigurand in acelasi timp confort fiabil.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                Prin urmarea unui proces disciplinat de implementare, monitorizarea KPI-urilor relevante si
                ajustarea continua a operatiunilor, hotelurile pot debloca aceste economii si beneficii de
                sustenabilitate. Intr-o industrie unde reputatia si bugetele sunt strans legate, trecerea catre
                managementul inteligent, bazat pe date, al facilitatilor este atat inevitabila cat si profitabila.
              </p>

              {/* CTA */}
              <div className="mt-16 rounded-[2px] bg-primary/5 border border-primary/20 p-8 text-center">
                <h3 className="text-2xl font-bold text-foreground mb-3">
                  Doriti o evaluare BMS pentru hotelul dumneavoastra?
                </h3>
                <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                  Specialistii Sovitech ofera audituri energetice gratuite pentru proprietati hoteliere.
                  Descoperiti cat puteti economisi in maxim 2 ore.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/contact">
                    <Button size="lg" className="rounded-full">
                      Programeaza audit gratuit
                    </Button>
                  </Link>
                  <Link href="/resurse/studii-de-caz/radisson-bucuresti">
                    <Button size="lg" variant="outline" className="rounded-full bg-transparent">
                      Vezi studiul de caz Radisson
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Related Articles */}
            <div className="mt-16 border-t border-border/40 pt-12">
              <h3 className="mb-8 text-2xl font-bold text-foreground">Articole similare</h3>
              <div className="grid gap-8 sm:grid-cols-2">
                <Link href="/resurse/articole/eficienta-bms" className="group">
                  <div className="relative mb-4 aspect-[5/3] overflow-hidden rounded-[2px] bg-muted">
                    <Image
                      src="/modern-building-automation-dashboard-with-energy-c.jpg"
                      alt="Eficienta BMS"
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="mb-2 inline-flex items-center rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground">
                    Date & Analiza
                  </div>
                  <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    Cat de eficiente sunt sistemele BMS in reducerea costurilor energetice?
                  </h4>
                  <p className="mt-2 text-sm text-muted-foreground">Ian 15, 2026 — 12 min citire</p>
                </Link>
                <Link href="/resurse/studii-de-caz/therme-bucuresti" className="group">
                  <div className="relative mb-4 aspect-[5/3] overflow-hidden rounded-[2px] bg-muted">
                    <Image
                      src="/therme-bucuresti-spa-exterior-modern.jpg"
                      alt="Therme Bucuresti"
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="mb-2 inline-flex items-center rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground">
                    Studiu de Caz
                  </div>
                  <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    Cum a redus Therme Bucuresti costurile cu 38% prin automatizare BMS
                  </h4>
                  <p className="mt-2 text-sm text-muted-foreground">Dec 20, 2025 — 8 min citire</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}
