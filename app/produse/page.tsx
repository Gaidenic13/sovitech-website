"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Cpu, Gauge, Wind, Zap, Database, Globe, ChevronRight, Thermometer, Activity } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

interface Product {
  id: string
  name: string
  category: string
  image: string
  icon: React.ElementType
  shortDesc: string
  specs: {
    model: string
    protocol: string
    range: string
    power: string
  }
  docs: string
  features: string[]
  modelCodes?: string
}

const products: Product[] = [
  {
    id: "1",
    name: "Controllere DDC & PLC",
    category: "Controllere & PLC",
    image: "/modern-building-automation-controller-device.jpg",
    icon: Cpu,
    shortDesc: "Controllere programabile și PLC-uri pentru automatizare complexă și control precis al sistemelor HVAC",
    specs: {
      model: "SAUTER modu840 Series",
      protocol: "BACnet, Modbus, LON",
      range: "8-64 puncte I/O extensibile",
      power: "24V DC / 15W",
    },
    docs: "Documentație tehnică controllere",
    features: [
      "Programare avansată cu CASE Suite",
      "Web server integrat pentru acces remote",
      "Stocare date locale și trending",
      "Redundanță sistem și backup automat",
    ],
    modelCodes: "VUL, VUT, VUN, V6R, VUD, VUE; BUL, BUT, BXL, BUN, B6R, BUD, BUE",
  },
  {
    id: "2",
    name: "Presostați",
    category: "Senzori Presiune",
    image: "/air-quality-sensor-device-modern-white.jpg",
    icon: Gauge,
    shortDesc: "Presostați și traductoare de presiune pentru monitorizare și control precis în sisteme HVAC",
    specs: {
      model: "SAUTER DSP/DSF Series",
      protocol: "0-10V, 4-20mA",
      range: "0-10 bar",
      power: "24V AC/DC",
    },
    docs: "Fișă tehnică presostați",
    features: [
      "Precizie înaltă și stabilitate pe termen lung",
      "Display digital LCD opțional",
      "Protecție la suprapresiune",
      "Certificare EN și ISO",
    ],
    modelCodes: "VQD, VQE; BQD, BQE",
  },
  {
    id: "3",
    name: "Senzori Calitate Aer",
    category: "Senzori Ambient",
    image: "/air-quality-sensor-device-modern-white.jpg",
    icon: Wind,
    shortDesc: "Senzori multi-parametru pentru monitorizare calitate aer, CO2, VOC, temperatură și umiditate",
    specs: {
      model: "SAUTER EGQ Series",
      protocol: "Modbus RTU, BACnet",
      range: "CO2 0-2000ppm, VOC, Temp, RH",
      power: "24V AC/DC",
    },
    docs: "Manual utilizare senzori calitate aer",
    features: [
      "Precizie CO2 ±30ppm cu calibrare automată",
      "Detecție VOC și particule fine",
      "Display LCD color cu indicatori vizuali",
      "Design modern și montaj ușor",
    ],
    modelCodes: "EGQ222, EGQ212, EGH series",
  },
  {
    id: "4",
    name: "Senzori Temperatură & Umiditate",
    category: "Senzori Ambient",
    image: "/modern-smart-thermostat-touchscreen-white.jpg",
    icon: Thermometer,
    shortDesc: "Traductoare și senzori de temperatură și umiditate pentru toate zonele clădirii",
    specs: {
      model: "SAUTER EGT/EGH Series",
      protocol: "0-10V, 4-20mA, Modbus",
      range: "-30°C...+70°C, 0-100% RH",
      power: "24V DC",
    },
    docs: "Specificații tehnice senzori",
    features: [
      "Precizie ±0.3°C pentru temperatură",
      "Senzori de umiditate cu acuratețe ridicată",
      "Montaj versatil: cameră, canal, exterior",
      "Modele cu și fără display",
    ],
    modelCodes: "VUG, VUP, VUS; BUG, BUS; EGT, EGH",
  },
  {
    id: "5",
    name: "Senzori CO2",
    category: "Senzori Ambient",
    image: "/air-quality-sensor-device-modern-white.jpg",
    icon: Activity,
    shortDesc: "Senzori de CO2 dedicați pentru ventilație controlată și eficiență energetică",
    specs: {
      model: "SAUTER EGC Series",
      protocol: "Modbus, 0-10V",
      range: "0-2000/5000 ppm CO2",
      power: "24V DC / PoE",
    },
    docs: "Ghid instalare senzori CO2",
    features: [
      "Tehnologie NDIR pentru măsurare precisă",
      "Compensare automată temperatură/umiditate",
      "Algoritmi de ventilație demand-controlled",
      "Durată de viață lungă fără mentenanță",
    ],
    modelCodes: "EGC210, EGC220, EGQ series cu CO2",
  },
  {
    id: "6",
    name: "Servomotoare & Actuatori",
    category: "Actuatori",
    image: "/hvac-valve-actuator-servomotor-modern.jpg",
    icon: Gauge,
    shortDesc: "Servomotoare rotative și liniare pentru supape și clapete HVAC cu control precis",
    specs: {
      model: "SAUTER ASM/AVM Series",
      protocol: "0-10V, 3-punct, Modbus",
      range: "0-95° / 5-40Nm",
      power: "24V AC/230V AC",
    },
    docs: "Manual instalare servomotoare",
    features: [
      "Poziționare precisă cu feedback analog",
      "Protecție la suprasarcină și blocare",
      "Montaj rapid cu clemă universală",
      "Versiuni spring-return pentru siguranță",
    ],
    modelCodes: "VKR, VKRA, VKAI, VDL; BKR, BKRA, BKLI, BKTI, BKTA; ASM, AVM series",
  },
  {
    id: "7",
    name: "Supape 2 și 3 Căi",
    category: "Actuatori",
    image: "/hvac-valve-actuator-servomotor-modern.jpg",
    icon: Gauge,
    shortDesc: "Supape de reglaj cu 2 și 3 căi pentru sisteme de încălzire și răcire",
    specs: {
      model: "SAUTER VUE/BUE Series",
      protocol: "Comandă direct de la servomotor",
      range: "DN15-DN150, PN16",
      power: "Acționare electrică 24V/230V",
    },
    docs: "Catalog supape reglaj",
    features: [
      "Corpuri din bronz și oțel inoxidabil",
      "Caracteristici liniare și echiprocente",
      "Etanșare fiabilă cu garnituri EPDM",
      "Gamă completă de diametre și presiuni",
    ],
    modelCodes: "VUE, VUD series; BUE, BUD series; VKP valve packages",
  },
  {
    id: "8",
    name: "Termostate Ambient Încălzire",
    category: "Panouri Operare",
    image: "/modern-smart-thermostat-touchscreen-white.jpg",
    icon: Zap,
    shortDesc: "Termostate pentru încălzire centrală cu control precis al temperaturii camerei",
    specs: {
      model: "SAUTER EY-RC Series",
      protocol: "Modbus, KNX, BACnet",
      range: "5-35°C reglabil",
      power: "24V DC / PoE / baterie",
    },
    docs: "Quick start termostate cameră",
    features: [
      "Display LCD sau color touchscreen",
      "Programare săptămânală și scenarii",
      "Setpoint-uri dual (confort/economie)",
      "Design elegant pentru orice interior",
    ],
    modelCodes: "EY-RC500, EY-RC515, RDT series",
  },
  {
    id: "9",
    name: "Termostate Wireless Inteligente",
    category: "Panouri Operare",
    image: "/modern-smart-thermostat-touchscreen-white.jpg",
    icon: Zap,
    shortDesc: "Termostate wireless smart cu conectivitate IoT și control de pe smartphone",
    specs: {
      model: "SAUTER ecoUnit Smart",
      protocol: "Wireless EnOcean, Bluetooth",
      range: "Control zonă și multi-zonă",
      power: "Baterie Li 2 ani autonomie",
    },
    docs: "App mobile și configurare",
    features: [
      "Control remote prin aplicație mobilă",
      "Învățare automată și algoritmi predictivi",
      "Integrare cu asistenți vocali",
      "Consum redus energie fără fire",
    ],
    modelCodes: "ecoUnit Smart, EY-WS series",
  },
  {
    id: "10",
    name: "Centrale Tratare Aer (AHU)",
    category: "Echipamente HVAC",
    image: "/modern-building-automation-controller-device.jpg",
    icon: Wind,
    shortDesc: "Sisteme complete de tratare aer cu automatizare integrată și management inteligent",
    specs: {
      model: "SAUTER AHU Solutions",
      protocol: "BACnet, Modbus",
      range: "500-50.000 m³/h",
      power: "Sistem complet automatizat",
    },
    docs: "Soluții complete AHU",
    features: [
      "Control complet debit, temperatură, umiditate",
      "Recuperare căldură și free-cooling",
      "Filtrare avansată și monitorizare calitate",
      "Optimizare energetică automată",
    ],
    modelCodes: "AHU packages cu controllere integrate",
  },
  {
    id: "11",
    name: "Software BMS CASE Suite",
    category: "Software BMS",
    image: "/building-management-software-dashboard-screen.jpg",
    icon: Database,
    shortDesc: "Platformă software completă pentru programare, management și vizualizare BMS",
    specs: {
      model: "SAUTER Vision Center & CASE",
      protocol: "BACnet/IP, OPC UA, Modbus",
      range: "Până la 100.000 puncte",
      power: "Server Windows/Linux/Cloud",
    },
    docs: "Ghid utilizare Vision Center",
    features: [
      "Interface grafică HTML5 responsive",
      "Raportare energetică și trending avansat",
      "Alarme inteligente și notificări",
      "Integrare sisteme terțe și EMS",
    ],
    modelCodes: "Vision Center 5.0, CASE Suite 2.x, EMS 100/200",
  },
  {
    id: "12",
    name: "Gateway & Module I/O",
    category: "Gateway & Integrare",
    image: "/network-gateway-device-technology-modern.jpg",
    icon: Globe,
    shortDesc: "Gateway-uri și module I/O pentru integrare protocoale și extindere sistem",
    specs: {
      model: "SAUTER moduWeb & EY-IO",
      protocol: "BACnet, Modbus, M-Bus, LON",
      range: "Cloud & local access",
      power: "PoE / 24V DC",
    },
    docs: "Configurare gateway și I/O",
    features: [
      "Web server securizat cu acces HTTPS",
      "REST API pentru integrări custom",
      "Data logging și stocare cloud",
      "Module I/O extensibile: EY-IO 530 series",
    ],
    modelCodes: "moduWeb Vision, EY-IO 530, EY6IO30/31/50/70/71/72, EY6CM series, YCS 200/210",
  },
]

export default function ProdusePage() {
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>("Toate")
  const { t, lang } = useLanguage()

  const categories = lang === "ro"
    ? ["Toate", "Controllere & PLC", "Senzori Presiune", "Senzori Ambient", "Actuatori", "Echipamente HVAC", "Software BMS", "Panouri Operare", "Gateway & Integrare"]
    : ["All", "Controllers & PLC", "Pressure Sensors", "Ambient Sensors", "Actuators", "HVAC Equipment", "BMS Software", "Operating Panels", "Gateway & Integration"]

  // Map EN category back to RO for filtering (data is in RO)
  const categoryMap: Record<string, string> = {
    "All": "Toate",
    "Controllers & PLC": "Controllere & PLC",
    "Pressure Sensors": "Senzori Presiune",
    "Ambient Sensors": "Senzori Ambient",
    "Actuators": "Actuatori",
    "HVAC Equipment": "Echipamente HVAC",
    "BMS Software": "Software BMS",
    "Operating Panels": "Panouri Operare",
    "Gateway & Integration": "Gateway & Integrare",
  }

  const allLabel = lang === "ro" ? "Toate" : "All"

  // Reset filter to "all" whenever language changes
  useEffect(() => {
    setSelectedCategory(allLabel)
  }, [lang]) // eslint-disable-line react-hooks/exhaustive-deps

  const resolvedCategory = lang === "en" ? (categoryMap[selectedCategory] ?? selectedCategory) : selectedCategory
  const filteredProducts =
    (selectedCategory === "Toate" || selectedCategory === "All")
      ? products
      : products.filter((p) => p.category === resolvedCategory)

  return (
    <>
      <section className="relative overflow-hidden border-b border-border/40 bg-gradient-to-br from-primary/5 via-background to-primary/10 px-4 py-20">
        <div className="container mx-auto">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
              </span>
              {t("Partener autorizat SAUTER Elveția în România", "Authorised SAUTER Partner in Romania")}
            </div>
            <h1 className="mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-5xl font-bold tracking-tight text-transparent md:text-6xl">
              {t("Gama completă SAUTER", "Complete SAUTER Range")}
            </h1>
            <p className="text-balance text-lg text-muted-foreground md:text-xl">
              {t("Sovitech oferă întreaga gamă de echipamente, senzori și software necesare pentru execuția, proiectarea, mentenanța și facility management al sistemelor BMS. Produse care îndeplinesc cele mai înalte standarde și certificări elvețiene.", "Sovitech offers the full range of equipment, sensors and software required for the execution, design, maintenance and facility management of BMS systems. Products that meet the highest Swiss standards and certifications.")}
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-4xl">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border border-border/50 bg-card/50 p-6 backdrop-blur-sm">
                <h3 className="mb-2 font-semibold text-foreground">{t("Documentație tehnică", "Technical Documentation")}</h3>
                <p className="text-sm text-muted-foreground">
                  {t("Fișe tehnice și manuale în format PDF disponibile pentru fiecare produs în secțiunea de detalii.", "Technical data sheets and manuals in PDF format available for each product in the details section.")}
                </p>
              </div>
              <div className="rounded-lg border border-border/50 bg-card/50 p-6 backdrop-blur-sm">
                <h3 className="mb-2 font-semibold text-foreground">{t("Oferte personalizate", "Custom Quotes")}</h3>
                <p className="text-sm text-muted-foreground">
                  {t("Reprezentanții noștri comerciali pot furniza prețuri pentru echipamente și oferte personalizate bazate pe cerințele proiectului.", "Our sales representatives can provide equipment pricing and custom quotes based on your project requirements.")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-primary/5 blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 h-96 w-96 rounded-full bg-primary/5 blur-3xl"></div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="sticky top-16 z-40 border-b border-border/40 bg-background/95 px-4 py-4 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="container mx-auto">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`whitespace-nowrap rounded-full px-5 py-2 text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                    : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="px-4 py-16">
        <div className="container mx-auto">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => {
              const Icon = product.icon
              const isHovered = hoveredProduct === product.id

              return (
                <div
                  key={product.id}
                  onMouseEnter={() => setHoveredProduct(product.id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                  className="group relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br from-card to-muted/20 transition-all duration-500 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10"
                >
                  {/* Product Image */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Category Badge */}
                    <div className="absolute left-4 top-4 rounded-full border border-border/50 bg-background/90 px-3 py-1 text-xs font-medium backdrop-blur-sm">
                      {product.category}
                    </div>

                    {/* Icon */}
                    <div className="absolute bottom-4 right-4 rounded-xl bg-primary/90 p-3 text-primary-foreground shadow-lg backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                      <Icon className="h-6 w-6" />
                    </div>

                    {/* Hover Overlay with Specs */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-t from-background via-background/95 to-background/80 p-6 backdrop-blur-sm transition-all duration-500 ${
                        isHovered ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
                      }`}
                    >
                      <div className="flex h-full flex-col justify-end">
                        <h4 className="mb-4 text-sm font-semibold text-primary">{t("Specificații Tehnice", "Technical Specifications")}</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Model:</span>
                            <span className="font-medium text-foreground">{product.specs.model}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">{t("Protocol:", "Protocol:")}</span>
                            <span className="font-medium text-foreground">{product.specs.protocol}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">{t("Gamă:", "Range:")}</span>
                            <span className="font-medium text-foreground">{product.specs.range}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">{t("Alimentare:", "Power:")}</span>
                            <span className="font-medium text-foreground">{product.specs.power}</span>
                          </div>
                        </div>
                        {product.modelCodes && (
                          <div className="mt-4 border-t border-border/50 pt-4">
                            <h5 className="mb-1 text-xs font-semibold text-muted-foreground">{t("Coduri model:", "Model codes:")}</h5>
                            <p className="text-xs text-foreground/80 leading-relaxed">{product.modelCodes}</p>
                          </div>
                        )}
                        <div className="mt-4 pt-4 border-t border-border/50">
                          <a
                            href="#"
                            className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80"
                          >
                            {product.docs}
                            <ChevronRight className="ml-1 h-4 w-4" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-6">
                    <h3 className="mb-2 text-xl font-semibold text-foreground">{product.name}</h3>
                    <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{product.shortDesc}</p>

                    {/* Features */}
                    <div className="mb-4 space-y-2">
                      {product.features.slice(0, 2).map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary"></div>
                          <span className="text-xs text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <Button
                      variant="outline"
                      size="sm"
                      className="group/btn w-full border-primary/20 hover:border-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
                    >
                      <span>{t("Detalii produs", "Product details")}</span>
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                    </Button>
                  </div>

                  {/* Shine effect on hover */}
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border/40 bg-gradient-to-br from-primary/10 via-background to-primary/5 px-4 py-20">
        <div className="container mx-auto">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">{t("Ai nevoie de consultanță tehnică?", "Need technical consultancy?")}</h2>
            <p className="mb-8 text-pretty text-lg text-muted-foreground">
              {t("Specialiștii noștri sunt disponibili pentru a oferi informații despre gama de produse, prețuri și disponibilitate. Te ajutăm să alegi echipamentele potrivite pentru proiectul tău BMS.", "Our specialists are available to provide information about the product range, pricing and availability. We help you choose the right equipment for your BMS project.")}
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                {t("Contactează un specialist", "Contact a specialist")}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline">
                {t("Descarcă catalog complet PDF", "Download full PDF catalogue")}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
