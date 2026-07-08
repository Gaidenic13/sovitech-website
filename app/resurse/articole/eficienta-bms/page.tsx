import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Copy, Linkedin, Twitter, Facebook } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function EficientaBMSArticlePage() {
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

      {/* Article Header */}
      <article className="container mx-auto px-4 py-12">
        <div className="grid gap-12 lg:grid-cols-[280px_1fr]">
          {/* Left Sidebar */}
          <aside className="space-y-8 lg:sticky lg:top-24 lg:self-start">
            {/* Category */}
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">Categorie</p>
              <Link
                href="/resurse?category=data"
                className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/20 transition-colors"
              >
                Date & Analiză
              </Link>
            </div>

            {/* Author */}
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-3">Scris de</p>
              <Link href="#" className="group flex items-center gap-3">
                <div className="relative h-12 w-12 overflow-hidden rounded-full bg-muted">
                  <Image src="/professional-male-engineer-headshot.jpg" alt="Andrei Popescu" fill className="object-cover" />
                </div>
                <div>
                  <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                    Andrei Popescu
                  </p>
                  <p className="text-sm text-muted-foreground">Director Tehnic, Sovitech</p>
                </div>
              </Link>
            </div>

            {/* Share */}
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
            {/* Article Header */}
            <header className="mb-12">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                Date & Analiză
              </div>
              <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tighter text-foreground md:text-5xl">
                Cât de eficiente sunt sistemele BMS în reducerea costurilor energetice?
              </h1>
              <p className="mb-6 text-xl text-muted-foreground leading-relaxed">
                Analiza datelor din 150+ proiecte BMS implementate în România arată economii semnificative - dar
                rezultatele variază în funcție de sector și complexitate.
              </p>
              <p className="text-sm text-muted-foreground">Ian 15, 2026 — 12 min citire</p>
            </header>

            {/* Hero Image */}
            <div className="relative mb-12 aspect-[16/9] overflow-hidden rounded-[2px] bg-muted">
              <Image
                src="/modern-building-automation-dashboard-with-energy-c.jpg"
                alt="Dashboard BMS cu grafice energie"
                fill
                className="object-cover"
              />
            </div>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              <p className="text-lg leading-relaxed text-foreground">
                Un studiu recent publicat de Asociația pentru Eficiență Energetică din România susține că sistemele BMS
                pot reduce costurile energetice cu până la <strong>50%</strong>. Cu toate acestea, datele noastre
                sugerează că această cifră necesită context.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                Bazându-ne pe analiza a peste 150 de proiecte implementate în ultimii 15 ani, am identificat trei
                probleme structurale în studiile existente:
              </p>

              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0"></span>
                  <span>
                    <strong className="text-foreground">Setul de date este dominat de clădiri noi.</strong> Majoritatea
                    studiilor analizează doar clădiri construite recent, unde eficiența este deja ridicată prin design.
                    Acest lucru poate supraevalua impactul BMS.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0"></span>
                  <span>
                    <strong className="text-foreground">Există bias de selecție.</strong> Clădirile care implementează
                    BMS sunt de obicei cele care și-au propus deja obiective de eficiență. Rezultatele bune nu sunt
                    neapărat cauzate doar de BMS.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0"></span>
                  <span>
                    <strong className="text-foreground">Nu se ia în calcul întreținerea.</strong> Un sistem BMS fără
                    mentenanță corespunzătoare poate pierde până la 15% din eficiență în primii 3 ani.
                  </span>
                </li>
              </ul>

              <p className="text-muted-foreground leading-relaxed">
                Setul nostru de date este diferit: monitorizăm consumul energetic <em>în timp real</em>, fără
                reconstrucție retroactivă, fără a ne baza pe dacă o clădire a devenit sau nu suficient de notabilă
                pentru a fi inclusă în studii.
              </p>

              <h2 className="mt-16 mb-6 text-3xl font-bold text-foreground">Perspectiva Sovitech Control</h2>

              <h3 className="mt-10 mb-4 text-xl font-semibold text-foreground">Metodologia Studiului</h3>

              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0"></span>
                  <span>
                    Am analizat <strong className="text-foreground">fiecare proiect BMS</strong> implementat între
                    2015-2024 de echipa noastră.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0"></span>
                  <span>Am exclus proiectele incomplete sau cele fără date de consum pre-implementare.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0"></span>
                  <span>
                    Am grupat proiectele pe <strong className="text-foreground">sectoare industriale</strong> și{" "}
                    <strong className="text-foreground">dimensiune clădire</strong>.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0"></span>
                  <span>
                    Ultima actualizare a datelor: <strong className="text-foreground">Ian 1, 2026</strong>.
                  </span>
                </li>
              </ul>

              <p className="text-muted-foreground leading-relaxed">
                Am analizat peste <strong className="text-foreground">150 de implementări BMS</strong>, cu o medie de
                10-15 proiecte noi pe an, acoperind aproximativ 50-80 de clădiri per categorie de sector. Un set de date
                cu amploare reală și fără eșecuri silențioase care dispar din vedere.
              </p>

              <h3 className="mt-10 mb-4 text-xl font-semibold text-foreground">
                Clădirile cu BMS economisesc mai mult?
              </h3>

              <p className="text-muted-foreground leading-relaxed">
                Studiile existente susțin că sistemele BMS reduc consumul cu{" "}
                <strong className="text-foreground">40-50%</strong>, comparativ cu{" "}
                <strong className="text-foreground">15-20%</strong> pentru clădiri fără automatizare avansată.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                Metrica noastră echivalentă este <em>reducerea reală a consumului</em>: dacă clădirea consumă cu minimum
                10% mai puțin după implementarea BMS. Nu este același lucru cu cifrele din studii, dar este cea mai bună
                metrică non-biasată pe care o avem.
              </p>

              {/* Data Visualization - Chart 1 */}
              <div className="my-12 rounded-[2px] border border-border bg-card p-8">
                <h4 className="mb-6 text-lg font-semibold text-foreground">
                  Reducerea consumului energetic pe sector (%)
                </h4>
                <div className="space-y-4">
                  {[
                    { sector: "HORECA & Wellness", value: 42, color: "bg-primary" },
                    { sector: "Clădiri de Birouri", value: 38, color: "bg-primary" },
                    { sector: "Medical & Pharma", value: 35, color: "bg-primary" },
                    { sector: "Retail & Shopping", value: 32, color: "bg-primary" },
                    { sector: "Industrial & Logistică", value: 28, color: "bg-primary" },
                  ].map((item) => (
                    <div key={item.sector} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{item.sector}</span>
                        <span className="font-medium text-foreground">{item.value}%</span>
                      </div>
                      <div className="h-3 w-full rounded-full bg-muted">
                        <div
                          className={`h-full rounded-full ${item.color} transition-all`}
                          style={{ width: `${item.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <p className="mt-6 text-sm text-muted-foreground">
                  Rata reducerii consumului energetic după implementarea BMS, măsurată pe parcursul primilor 2 ani de
                  funcționare.
                </p>
              </div>

              <div className="my-8 rounded-[2px] bg-primary/5 border border-primary/20 p-6">
                <p className="text-foreground font-medium mb-2">Rezultatul nostru:</p>
                <ul className="space-y-2 text-muted-foreground">
                  <li>
                    • <strong className="text-foreground">Sectorul HORECA:</strong> 42% reducere medie a consumului
                  </li>
                  <li>
                    • <strong className="text-foreground">Celelalte sectoare:</strong> 28-38% reducere medie
                  </li>
                </ul>
                <p className="mt-4 text-muted-foreground">
                  Deci: da, o îmbunătățire semnificativă — <strong className="text-foreground">nu</strong> prăpastia
                  enormă de 20-30 puncte procentuale raportată în alte studii.
                </p>
              </div>

              <h3 className="mt-10 mb-4 text-xl font-semibold text-foreground">
                Care este ROI-ul real al implementării BMS?
              </h3>

              <p className="text-muted-foreground leading-relaxed">
                Dovezile existente pentru ROI se bazează pe două construcții fragile:
              </p>

              <ol className="space-y-3 text-muted-foreground list-decimal pl-6">
                <li>
                  <strong className="text-foreground">"Perioada de amortizare."</strong> Majoritatea calculelor folosesc
                  costuri ideale, nu reale. Costurile de întreținere și upgrade sunt adesea omise.
                </li>
                <li>
                  <strong className="text-foreground">ROI trimis la 5 ani.</strong> O metrică care este încă influențată
                  de valori extreme și nu reflectă experiența investitorului.
                </li>
              </ol>

              <p className="text-muted-foreground leading-relaxed">
                Noi folosim două măsuri mai robuste: perioada reală de amortizare și "proiecte de succes" (ROI ≥ 100% în
                3 ani).
              </p>

              {/* Data Visualization - Chart 2 */}
              <div className="my-12 rounded-[2px] border border-border bg-card p-8">
                <h4 className="mb-6 text-lg font-semibold text-foreground">
                  Perioada medie de amortizare pe dimensiune clădire
                </h4>
                <div className="grid grid-cols-4 gap-4 text-center">
                  {[
                    { size: "< 5.000 mp", years: "4.2 ani" },
                    { size: "5-15.000 mp", years: "3.1 ani" },
                    { size: "15-30.000 mp", years: "2.4 ani" },
                    { size: "> 30.000 mp", years: "1.8 ani" },
                  ].map((item) => (
                    <div key={item.size} className="rounded-[2px] bg-muted/50 p-4">
                      <p className="text-2xl font-bold text-primary mb-1">{item.years}</p>
                      <p className="text-xs text-muted-foreground">{item.size}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-6 text-sm text-muted-foreground">
                  Clădirile mai mari beneficiază de economii de scară, reducând semnificativ perioada de amortizare a
                  investiției în BMS.
                </p>
              </div>

              <h3 className="mt-10 mb-4 text-xl font-semibold text-foreground">Proiecte de Succes</h3>

              <p className="text-muted-foreground leading-relaxed">
                Iată <strong className="text-foreground">fracția de proiecte BMS care ating ROI ≥100% în 3 ani</strong>.
              </p>

              {/* Data Visualization - Chart 3 */}
              <div className="my-12 rounded-[2px] border border-border bg-card p-8">
                <h4 className="mb-6 text-lg font-semibold text-foreground">
                  Rata de succes (ROI ≥100% în 3 ani) pe sector
                </h4>
                <div className="grid grid-cols-5 gap-3">
                  {[
                    { sector: "HORECA", rate: "68%" },
                    { sector: "Birouri", rate: "62%" },
                    { sector: "Medical", rate: "58%" },
                    { sector: "Retail", rate: "54%" },
                    { sector: "Industrial", rate: "51%" },
                  ].map((item) => (
                    <div key={item.sector} className="text-center">
                      <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                        <span className="text-lg font-bold text-primary">{item.rate}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{item.sector}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-6 text-sm text-muted-foreground">
                  Proiectele din sectorul HORECA au cea mai mare rată de succes datorită consumului intensiv de energie
                  și variabilității mari a utilizării.
                </p>
              </div>

              <p className="text-muted-foreground leading-relaxed">Acum modelul ideal se destramă complet:</p>

              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0"></span>
                  <span>
                    Ratele de succes sunt <strong className="text-foreground">consistente, nu haotice</strong> între
                    sectoare.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0"></span>
                  <span>Proiectele HORECA conduc, dar nu domină.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0"></span>
                  <span>
                    Sectorul industrial, deși cu cea mai mică reducere de consum, are totuși &gt;50% rată de succes.
                  </span>
                </li>
              </ul>

              <h2 className="mt-16 mb-6 text-3xl font-bold text-foreground">Ce spun datele non-biasate</h2>

              <p className="text-muted-foreground leading-relaxed">
                În toate rezultatele noastre, obținem un pattern consistent:
              </p>

              <ol className="space-y-4 text-muted-foreground">
                <li className="flex items-start gap-4">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground flex-shrink-0">
                    1
                  </span>
                  <span>
                    <strong className="text-foreground">Beneficiul BMS este real, dar moderat.</strong> Sistemele BMS
                    reflectă o investiție solidă cu randamente previzibile. Efectul este semnificativ, dar nu miraculos.
                  </span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground flex-shrink-0">
                    2
                  </span>
                  <span>
                    <strong className="text-foreground">
                      Rezultatele extreme nu se concentrează în sectoare specifice.
                    </strong>{" "}
                    Proiectele de succes — cele care contează — nu depind de un singur sector.
                  </span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground flex-shrink-0">
                    3
                  </span>
                  <span>
                    <strong className="text-foreground">Dimensiunea clădirii contează.</strong> Clădirile mai mari văd
                    ROI mai rapid datorită economiilor de scară.
                  </span>
                </li>
              </ol>

              <h2 className="mt-16 mb-6 text-3xl font-bold text-foreground">Concluzii</h2>

              <ol className="space-y-4 text-muted-foreground">
                <li className="flex items-start gap-4">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground flex-shrink-0">
                    1
                  </span>
                  <span>
                    <strong className="text-foreground">
                      Reducerile dramatice raportate în studii sunt probabil un artefact al datelor.
                    </strong>{" "}
                    Într-un set de date fără bias de supraviețuire, gap-ul enorm dispare.
                  </span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground flex-shrink-0">
                    2
                  </span>
                  <span>
                    <strong className="text-foreground">Sistemele BMS sunt o investiție solidă, nu magică.</strong>{" "}
                    Obțineți economii reale și previzibile, nu un univers fundamental diferit.
                  </span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground flex-shrink-0">
                    3
                  </span>
                  <span>
                    <strong className="text-foreground">
                      Succesul este previzibil pe baza dimensiunii și sectorului.
                    </strong>{" "}
                    Există o legătură clară între caracteristicile proiectului și rezultate.
                  </span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground flex-shrink-0">
                    4
                  </span>
                  <span>
                    <strong className="text-foreground">Piața BMS este eficientă.</strong> Prețurile reflectă valoarea
                    reală. Sistemele BMS nu sunt soluții magice — sunt investiții solide cu ROI previzibil.
                  </span>
                </li>
              </ol>

              {/* Disclaimer */}
              <div className="mt-16 rounded-[2px] border border-border bg-muted/30 p-6">
                <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Disclaimer
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Acest document și informațiile, graficele furnizate sunt doar în scop informativ și nu ar trebui să
                  fie considerate sfaturi de investiții. Nimic din acest material nu este destinat a fi o recomandare
                  pentru orice investiție sau alt fel de consiliere. Performanțele trecute nu sunt indicative pentru
                  rezultatele viitoare. Conținutul este valabil doar la data indicată. Orice proiecții, estimări,
                  prognoze, ținte, perspective și/sau opinii exprimate în aceste materiale pot fi modificate fără
                  notificare și pot diferi sau fi contrare opiniilor exprimate de alții. Toate datele menționate în
                  acest material sunt actuale la data de 1/1/2026, dacă nu se specifică altfel.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Latest Articles Section */}
        <section className="mt-24 border-t border-border pt-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-2xl font-bold text-foreground">Ultimele articole</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  category: "Studiu de Caz",
                  title: "Cum a redus Therme București costurile cu 38% prin automatizare BMS",
                  date: "Dec 20, 2025",
                  readTime: "8 min",
                  image: "/thermal-spa-modern-building.jpg",
                },
                {
                  category: "Ghid Tehnic",
                  title: "Integrarea protocoalelor BACnet și KNX: Ghid complet 2026",
                  date: "Dec 15, 2025",
                  readTime: "15 min",
                  image: "/building-automation-technical-diagram.jpg",
                },
                {
                  category: "Analiză Piață",
                  title: "Piața BMS din România: Tendințe și previziuni 2026",
                  date: "Dec 10, 2025",
                  readTime: "10 min",
                  image: "/romania-cityscape-modern-buildings.jpg",
                },
              ].map((article, index) => (
                <Link key={index} href="#" className="group">
                  <div className="relative mb-4 aspect-[2/1] overflow-hidden rounded-[2px] bg-muted">
                    <Image
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="mb-2 inline-flex items-center rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground">
                    {article.category}
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {article.date} — <span className="text-primary">{article.readTime} citire</span>
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </article>
    </div>
  )
}
