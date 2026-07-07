"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

// ── Translations ────────────────────────────────────────────────────────────

const translations = {
  ro: {
    label: "• Resurse",
    hero: "Cele mai noi informatii despre automatizarea cladirilor.",
    heroSub: "Date, analize, studii de caz si ghiduri tehnice pentru profesionistii BMS.",
    categories: [
      { name: "Recomandate",       slug: "featured" },
      { name: "Date & Analize",    slug: "data",         count: 12 },
      { name: "Studii de caz",     slug: "case-studies", count: 8  },
      { name: "Ghiduri tehnice",   slug: "guides",       count: 15 },
      { name: "Rapoarte de piata", slug: "reports",      count: 4  },
      { name: "Toate articolele",  slug: "all" },
    ],
    latest: "• ULTIMELE ARTICOLE",
    viewMore: "Mai multe articole",
    readLabel: "Citeste",
    exploreCat: "EXPLOREAZA PE CATEGORII",
    catItems: ["Toate articolele", "Date & Analize", "Studii de caz", "Ghiduri tehnice", "Rapoarte de piata"],
    sectorGuides: "GHIDURI PE SECTOR",
    sectors: ["Civil & Birouri", "Medical & Farma", "Retail & HORECA", "Industrial", "Centre de Date", "Infrastructura"],
    tools: "UNELTE",
    toolItems: [
      { label: "Calculator ROI",          href: "/calculator-roi"           },
      { label: "Ghid BMS",                href: "/ghid-bms"                 },
      { label: "Raport de piata",         href: "/resurse/raport-piata"     },
      { label: "Proiecte & Referinte",    href: "/resurse/referinte"        },
    ],
    newsletter: "NEWSLETTER",
    newsletterTitle: "Ramai inaintea industriei",
    newsletterSub: "Analize lunare, studii de caz si ghiduri tehnice direct in inbox-ul tau.",
    emailPlaceholder: "Adresa ta de email",
    subscribe: "Aboneaza-te",
    featured: {
      category: "Date & Analize",
      title: "Cat de eficiente sunt sistemele BMS in reducerea costurilor de energie?",
      description: "Analiza datelor din 150+ proiecte BMS implementate in Romania arata economii semnificative — dar rezultatele variaza in functie de sector si complexitate.",
      date: "15 IAN 2026",
      readTime: "12 MIN CITIRE",
      authorName: "Andrei Popescu",
      authorRole: "Director Tehnic",
    },
    secondary: [
      { category: "Studiu de caz", title: "Cum a redus Therme Bucuresti costurile cu 38%",            date: "20 DEC 2025", readTime: "8 MIN CITIRE"  },
      { category: "Studiu de caz", title: "Radisson Blu Bucuresti: automatizare hotel 5 stele",       date: "5 DEC 2025",  readTime: "7 MIN CITIRE"  },
      { category: "Raport de piata", title: "Piata BMS din Romania: Tendinte si Previziuni 2026",    date: "10 DEC 2025", readTime: "10 MIN CITIRE" },
    ],
    articles: [
      { category: "Ghid tehnic",    title: "Optimizarea performantei hoteliere prin automatizare si management energetic",   description: "Cum pot hotelurile moderne sa reduca costurile cu energia cu 25-65% mentinand confortul oaspetilor.", date: "20 FEB 2026", readTime: "18 MIN CITIRE" },
      { category: "Ghid tehnic",    title: "Integrarea protocoalelor BACnet si KNX: Ghid complet 2026",                      description: "Tot ce trebuie sa stii despre integrarea celor mai populare protocoale de automatizare.", date: "15 DEC 2025", readTime: "15 MIN CITIRE" },
      { category: "Date & Analize", title: "ROI in automatizarea BMS: Ce arata datele din 150 de proiecte",                 description: "Analiza detaliata a perioadelor de amortizare si a randamentului investitiei pentru sistemele BMS.", date: "28 NOV 2025", readTime: "11 MIN CITIRE" },
      { category: "Ghid tehnic",    title: "Alegerea senzorilor potriviti pentru proiectul tau BMS",                        description: "Ghid complet pentru selectarea senzorilor de temperatura, umiditate si calitate a aerului.", date: "20 NOV 2025", readTime: "9 MIN CITIRE" },
      { category: "Date & Analize", title: "Conformitatea EPBD in 2026: Ce trebuie sa stie proprietarii de cladiri",        description: "Cerinte obligatorii si cum te poate ajuta un BMS sa le indeplinesti in avans.", date: "10 NOV 2025", readTime: "8 MIN CITIRE" },
    ],
  },
  en: {
    label: "• Resources",
    hero: "The latest on building automation.",
    heroSub: "Data, analysis, case studies and technical guides for BMS professionals.",
    categories: [
      { name: "Featured",           slug: "featured" },
      { name: "Data & Analysis",    slug: "data",         count: 12 },
      { name: "Case Studies",       slug: "case-studies", count: 8  },
      { name: "Technical Guides",   slug: "guides",       count: 15 },
      { name: "Market Reports",     slug: "reports",      count: 4  },
      { name: "All Articles",       slug: "all" },
    ],
    latest: "• LATEST ARTICLES",
    viewMore: "View more articles",
    readLabel: "Read",
    exploreCat: "EXPLORE BY CATEGORY",
    catItems: ["All articles", "Data & Analysis", "Case Studies", "Technical Guides", "Market Reports"],
    sectorGuides: "SECTOR GUIDES",
    sectors: ["Civil & Office", "Medical & Pharma", "Retail & HORECA", "Industrial", "Data Centres", "Infrastructure"],
    tools: "TOOLS",
    toolItems: [
      { label: "ROI Calculator",          href: "/calculator-roi"           },
      { label: "BMS Guide",               href: "/ghid-bms"                 },
      { label: "Market Report",           href: "/resurse/raport-piata"     },
      { label: "Projects & References",   href: "/resurse/referinte"        },
    ],
    newsletter: "NEWSLETTER",
    newsletterTitle: "Stay ahead of the industry",
    newsletterSub: "Monthly analyses, case studies and technical guides straight to your inbox.",
    emailPlaceholder: "Your email address",
    subscribe: "Subscribe",
    featured: {
      category: "Data & Analysis",
      title: "How efficient are BMS systems at reducing energy costs?",
      description: "Analysis of data from 150+ BMS projects implemented in Romania shows significant savings — but results vary depending on sector and complexity.",
      date: "JAN 15, 2026",
      readTime: "12 MIN READ",
      authorName: "Andrei Popescu",
      authorRole: "Technical Director",
    },
    secondary: [
      { category: "Case Study",    title: "How Therme Bucharest cut costs by 38%",                     date: "DEC 20, 2025", readTime: "8 MIN READ"  },
      { category: "Case Study",    title: "Radisson Blu Bucharest: 5-star hotel automation",           date: "DEC 5, 2025",  readTime: "7 MIN READ"  },
      { category: "Market Report", title: "The Romanian BMS Market: Trends and Forecasts 2026",       date: "DEC 10, 2025", readTime: "10 MIN READ" },
    ],
    articles: [
      { category: "Technical Guide",   title: "Optimising hotel performance through automation and energy management",  description: "How modern hotels can reduce energy costs by 25-65% while maintaining guest comfort.", date: "FEB 20, 2026", readTime: "18 MIN READ" },
      { category: "Technical Guide",   title: "Integrating BACnet and KNX protocols: Complete guide 2026",             description: "Everything you need to know about integrating the most popular automation protocols.", date: "DEC 15, 2025", readTime: "15 MIN READ" },
      { category: "Data & Analysis",   title: "ROI in BMS automation: What the data from 150 projects shows",         description: "Detailed analysis of payback periods and return on investment for BMS systems.", date: "NOV 28, 2025", readTime: "11 MIN READ" },
      { category: "Technical Guide",   title: "Choosing the right sensors for your BMS project",                      description: "Complete guide to selecting temperature, humidity and air quality sensors.", date: "NOV 20, 2025", readTime: "9 MIN READ" },
      { category: "Data & Analysis",   title: "EPBD compliance in 2026: What building owners need to know",           description: "Mandatory requirements and how a BMS can help you meet them ahead of time.", date: "NOV 10, 2025", readTime: "8 MIN READ" },
    ],
  },
}

// ── Static data (images / hrefs don't change with lang) ─────────────────────

const featuredImage   = "/modern-building-automation-dashboard-with-energy-e.jpg"
const featuredAuthorImage = "/professional-male-engineer-headshot.jpg"
const featuredHref    = "/resurse/articole/eficienta-bms"

const secondaryImages = [
  { image: "/therme-bucuresti-spa-exterior-modern.jpg",   href: "/resurse/studii-de-caz/therme-bucuresti" },
  { image: "/luxury-hotel-lobby-modern-interior.jpg",      href: "/resurse/studii-de-caz/radisson-bucuresti" },
  { image: "/bucharest-modern-skyline-office-buildings.jpg", href: "/resurse/raport-piata" },
]

const articleImages = [
  { image: "/luxury-hotel-lobby-modern-interior.jpg",                    href: "/resurse/articole/optimizare-hotel-bms" },
  { image: "/building-automation-protocols-technical-diagram.jpg",        href: "#" },
  { image: "/financial-charts-and-graphs-data-analysis.jpg",             href: "#" },
  { image: "/building-automation-sensors-equipment-close-up.jpg",        href: "#" },
  { image: "/modern-building-automation-dashboard-with-energy-c.jpg",    href: "#" },
]

const categoryColors: Record<string, { bg: string; text: string }> = {
  "Data & Analysis":    { bg: "#C5C0F5", text: "#5C5FD4" },
  "Date & Analize":     { bg: "#C5C0F5", text: "#5C5FD4" },
  "Case Study":         { bg: "#C8E6C9", text: "#1F6B4A" },
  "Studiu de caz":      { bg: "#C8E6C9", text: "#1F6B4A" },
  "Case Studies":       { bg: "#C8E6C9", text: "#1F6B4A" },
  "Studii de caz":      { bg: "#C8E6C9", text: "#1F6B4A" },
  "Technical Guide":    { bg: "#C8E6C9", text: "#1F6B4A" },
  "Ghid tehnic":        { bg: "#C8E6C9", text: "#1F6B4A" },
  "Technical Guides":   { bg: "#C8E6C9", text: "#1F6B4A" },
  "Ghiduri tehnice":    { bg: "#C8E6C9", text: "#1F6B4A" },
  "Market Report":      { bg: "#C5C0F5", text: "#5C5FD4" },
  "Raport de piata":    { bg: "#C5C0F5", text: "#5C5FD4" },
  "Market Analysis":    { bg: "#C5C0F5", text: "#5C5FD4" },
}

function CategoryBadge({ category }: { category: string }) {
  const colors = categoryColors[category] ?? { bg: "#C8E6C9", text: "#1F6B4A" }
  return (
    <span
      className="inline-block text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full"
      style={{ backgroundColor: colors.bg, color: colors.text }}
    >
      {category}
    </span>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function ResursePage() {
  const { lang } = useLanguage()
  const [activeCategory, setActiveCategory] = useState("featured")
  const t = translations[lang]

  return (
    <div className="min-h-screen bg-[#F5F4F0]">

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="bg-[#0D2E2B] pt-20 pb-0 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 pb-16">
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="section-label text-[#1F6B4A] mb-4">{t.label}</p>
              <h1 className="text-5xl md:text-6xl font-black text-white leading-tight tracking-tight mb-4 max-w-2xl text-balance">
                {t.hero}
              </h1>
              <p className="text-white/50 font-light text-lg max-w-lg leading-relaxed">
                {t.heroSub}
              </p>
            </div>


          </div>
        </div>

        {/* Category filter bar */}
        <div className="bg-[#0D2E2B] border-t border-white/10">
          <div className="max-w-7xl mx-auto px-8">
            <div className="flex items-center gap-1 overflow-x-auto scrollbar-none py-1">
              {t.categories.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => setActiveCategory(cat.slug)}
                  className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-3 text-xs font-semibold tracking-wide transition-colors border-b-2 ${
                    activeCategory === cat.slug
                      ? "border-[#1F6B4A] text-white"
                      : "border-transparent text-white/40 hover:text-white/70"
                  }`}
                >
                  {cat.name}
                  {"count" in cat && cat.count !== undefined && (
                    <span className={`text-[10px] ${activeCategory === cat.slug ? "text-[#1F6B4A]" : "text-white/25"}`}>
                      {cat.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured + Secondary ──────────────────────────────── */}
      <section className="bg-white border-b border-[#0D2E2B]/8">
        <div className="max-w-7xl mx-auto px-8 py-16">
          <div className="grid lg:grid-cols-[1fr_380px] gap-8 items-start">

            {/* Featured large card */}
            <Link href={featuredHref} className="group block">
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-[#0D2E2B]/5 mb-6">
                <Image
                  src={featuredImage}
                  alt={t.featured.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D2E2B]/60 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5">
                  <CategoryBadge category={t.featured.category} />
                </div>
              </div>
              <h2 className="text-2xl font-black text-[#0D2E2B] leading-snug tracking-tight mb-3 group-hover:text-[#1F6B4A] transition-colors text-balance">
                {t.featured.title}
              </h2>
              <p className="text-[#888888] font-light leading-relaxed mb-4 text-sm max-w-xl">
                {t.featured.description}
              </p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2.5">
                  <div className="relative h-8 w-8 overflow-hidden rounded-full bg-[#F5F4F0] flex-shrink-0">
                    <Image
                      src={featuredAuthorImage}
                      alt={t.featured.authorName}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#0D2E2B]">{t.featured.authorName}</p>
                    <p className="text-[10px] text-[#888888]">{t.featured.authorRole}</p>
                  </div>
                </div>
                <span className="text-[#0D2E2B]/15">·</span>
                <p className="text-xs text-[#888888]">
                  {t.featured.date} &nbsp;·&nbsp;{" "}
                  <span className="text-[#1F6B4A] font-medium">{t.featured.readTime}</span>
                </p>
              </div>
            </Link>

            {/* Secondary stack */}
            <div className="flex flex-col divide-y divide-[#0D2E2B]/8">
              {t.secondary.map((post, i) => (
                <Link key={i} href={secondaryImages[i].href} className="group flex gap-4 py-5 first:pt-0 last:pb-0 items-start">
                  <div className="relative h-20 w-28 flex-shrink-0 rounded-xl overflow-hidden bg-[#F5F4F0]">
                    <Image
                      src={secondaryImages[i].image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <CategoryBadge category={post.category} />
                    <h3 className="font-black text-sm text-[#0D2E2B] leading-snug mt-2 mb-1.5 group-hover:text-[#1F6B4A] transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-[10px] text-[#888888]">
                      {post.date} &nbsp;·&nbsp; {post.readTime}
                    </p>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-[#0D2E2B]/20 group-hover:text-[#1F6B4A] transition-colors mt-1 flex-shrink-0" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Latest articles grid ──────────────────────────────── */}
      <section className="py-20 bg-[#F5F4F0]">
        <div className="max-w-7xl mx-auto px-8">
          <p className="section-label mb-10">{t.latest}</p>

          <div className="grid gap-px bg-[#0D2E2B]/8 rounded-2xl overflow-hidden md:grid-cols-2 lg:grid-cols-3">
            {t.articles.map((article, i) => (
              <Link
                key={i}
                href={articleImages[i].href}
                className="group bg-white p-6 flex flex-col hover:bg-[#F5F4F0] transition-colors"
              >
                <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-[#0D2E2B]/5 mb-5">
                  <Image
                    src={articleImages[i].image}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="flex items-center justify-between mb-3">
                  <CategoryBadge category={article.category} />
                  <span className="text-[10px] text-[#888888]">{article.readTime}</span>
                </div>
                <h3 className="font-black text-[#0D2E2B] leading-snug text-base mb-2 group-hover:text-[#1F6B4A] transition-colors line-clamp-2 flex-1">
                  {article.title}
                </h3>
                <p className="text-sm text-[#888888] font-light line-clamp-2 leading-relaxed mb-4">
                  {article.description}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <p className="text-[10px] text-[#888888]">{article.date}</p>
                  <span className="text-[#1F6B4A] flex items-center gap-1 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                    {t.readLabel} <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10 text-center">
            <button className="inline-flex items-center gap-2 border border-[#0D2E2B]/15 bg-white text-[#0D2E2B] text-sm font-semibold px-7 py-3.5 rounded-full hover:border-[#0D2E2B]/30 hover:bg-[#F5F4F0] transition-colors">
              {t.viewMore}
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ── Explore footer ────────────────────────────────────── */}
      <section className="bg-white border-t border-[#0D2E2B]/8 py-16">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid md:grid-cols-[1fr_1fr_1fr_1fr] gap-12">

            <div>
              <p className="section-label mb-6">{t.exploreCat}</p>
              <ul className="space-y-3">
                {t.catItems.map((c) => (
                  <li key={c}>
                    <Link href="#" className="text-sm text-[#0D2E2B]/60 hover:text-[#0D2E2B] font-medium transition-colors flex items-center justify-between group">
                      {c}
                      <ArrowUpRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="section-label mb-6">{t.sectorGuides}</p>
              <ul className="space-y-3">
                {t.sectors.map((s) => (
                  <li key={s}>
                    <Link href="#" className="text-sm text-[#0D2E2B]/60 hover:text-[#0D2E2B] font-medium transition-colors flex items-center justify-between group">
                      {s}
                      <ArrowUpRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="section-label mb-6">{t.tools}</p>
              <ul className="space-y-3">
                {t.toolItems.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="text-sm text-[#0D2E2B]/60 hover:text-[#0D2E2B] font-medium transition-colors flex items-center justify-between group">
                      {item.label}
                      <ArrowUpRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div className="bg-[#0D2E2B] rounded-2xl p-7 flex flex-col">
              <p className="section-label text-[#1F6B4A] mb-4">{t.newsletter}</p>
              <h3 className="text-xl font-black text-white leading-snug mb-3">
                {t.newsletterTitle}
              </h3>
              <p className="text-white/50 text-sm font-light leading-relaxed mb-6 flex-1">
                {t.newsletterSub}
              </p>
              <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-2">
                <input
                  type="email"
                  placeholder={t.emailPlaceholder}
                  className="h-11 rounded-xl border border-white/12 bg-white/8 px-4 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-white/25"
                />
                <button
                  type="submit"
                  className="h-11 bg-white text-[#0D2E2B] text-sm font-bold rounded-xl hover:bg-[#F5F4F0] transition-colors"
                >
                  {t.subscribe}
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>

    </div>
  )
}
