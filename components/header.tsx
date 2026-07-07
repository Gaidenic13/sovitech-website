"use client"

import Link from "next/link"
import { Calculator } from "lucide-react"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { useLanguage } from "@/lib/language-context"

export function Header() {
  const { lang, setLang, t } = useLanguage()

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-[#0D2E2B]/10">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/placeholder%20%281%29-3DZXnJPEBcaC7XdneA9zScoygOkuFv.png"
              alt="SOVITECH Control"
              className="h-8 w-auto"
            />
          </Link>

          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-[#0D2E2B]/70 text-sm font-medium hover:text-[#0D2E2B] hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent transition">
                  {t("Servicii", "Services")}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 bg-white border border-[#0D2E2B]/10 shadow-lg">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link href="/servicii" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#F5F4F0]">
                          <div className="text-sm font-medium leading-none text-[#0D2E2B]">{t("Servicii BMS Complete", "Complete BMS Services")}</div>
                          <p className="line-clamp-2 text-sm leading-snug text-[#0D2E2B]/50">{t("Parcursul complet de la consultanta la mentenanta", "The full journey from consultation to maintenance")}</p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link href="/servicii#proiectare" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#F5F4F0]">
                          <div className="text-sm font-medium leading-none text-[#0D2E2B]">{t("Proiectare BMS", "BMS Design")}</div>
                          <p className="line-clamp-2 text-sm leading-snug text-[#0D2E2B]/50">{t("Proiectare completa a sistemelor de automatizare", "Full design of automation systems")}</p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link href="/servicii#executie" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#F5F4F0]">
                          <div className="text-sm font-medium leading-none text-[#0D2E2B]">{t("Executie Sisteme", "System Installation")}</div>
                          <p className="line-clamp-2 text-sm leading-snug text-[#0D2E2B]/50">{t("Implementare profesionala sisteme BMS", "Professional BMS system implementation")}</p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link href="/servicii#integrare" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#F5F4F0]">
                          <div className="text-sm font-medium leading-none text-[#0D2E2B]">{t("Integrare Sisteme", "Systems Integration")}</div>
                          <p className="line-clamp-2 text-sm leading-snug text-[#0D2E2B]/50">{t("Integrare KNX, DALI, Modbus, M-Bus", "KNX, DALI, Modbus, M-Bus integration")}</p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/produse" legacyBehavior passHref>
                  <NavigationMenuLink className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-[#0D2E2B]/70 transition hover:text-[#0D2E2B] hover:bg-transparent focus:bg-transparent focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                    {t("Produse SAUTER", "SAUTER Products")}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-[#0D2E2B]/70 text-sm font-medium hover:text-[#0D2E2B] hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent transition">
                  {t("Sectoare", "Sectors")}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 bg-white border border-[#0D2E2B]/10 shadow-lg">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link href="/sectoare" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#F5F4F0]">
                          <div className="text-sm font-medium leading-none text-[#0D2E2B]">{t("Toate Sectoarele", "All Sectors")}</div>
                          <p className="line-clamp-2 text-sm leading-snug text-[#0D2E2B]/50">{t("Expertiza BMS in toate industriile", "BMS expertise across all industries")}</p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link href="/sectoare/civil" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#F5F4F0]">
                          <div className="text-sm font-medium leading-none text-[#0D2E2B]">{t("Civil & Birouri", "Civil & Office")}</div>
                          <p className="line-clamp-2 text-sm leading-snug text-[#0D2E2B]/50">{t("Cladiri de birouri si spatii comerciale", "Office buildings and commercial spaces")}</p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link href="/sectoare/medical" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#F5F4F0]">
                          <div className="text-sm font-medium leading-none text-[#0D2E2B]">{t("Medical & Farma", "Medical & Pharma")}</div>
                          <p className="line-clamp-2 text-sm leading-snug text-[#0D2E2B]/50">{t("Facilitati medicale si productie farmaceutica", "Medical facilities and pharmaceutical production")}</p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link href="/sectoare/retail" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#F5F4F0]">
                          <div className="text-sm font-medium leading-none text-[#0D2E2B]">{t("Retail & HORECA", "Retail & HORECA")}</div>
                          <p className="line-clamp-2 text-sm leading-snug text-[#0D2E2B]/50">{t("Centre comerciale si spatii hotel", "Shopping centres and hotel spaces")}</p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link href="/sectoare/industrial" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#F5F4F0]">
                          <div className="text-sm font-medium leading-none text-[#0D2E2B]">{t("Industrial", "Industrial")}</div>
                          <p className="line-clamp-2 text-sm leading-snug text-[#0D2E2B]/50">{t("Depozite industriale si productie", "Industrial warehouses and production")}</p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-[#0D2E2B]/70 text-sm font-medium hover:text-[#0D2E2B] hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent transition">
                  {t("Resurse", "Resources")}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 bg-white border border-[#0D2E2B]/10 shadow-lg">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link href="/resurse" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#F5F4F0]">
                          <div className="text-sm font-medium leading-none text-[#0D2E2B]">{t("Toate Resursele", "All Resources")}</div>
                          <p className="line-clamp-2 text-sm leading-snug text-[#0D2E2B]/50">{t("Date, analize si ghiduri pentru profesionisti", "Data, analysis and guides for professionals")}</p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link href="/resurse/articole/eficienta-bms" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#F5F4F0]">
                          <div className="text-sm font-medium leading-none text-[#0D2E2B]">{t("Eficienta BMS - Analiza Date", "BMS Efficiency - Data Analysis")}</div>
                          <p className="line-clamp-2 text-sm leading-snug text-[#0D2E2B]/50">{t("Cat de eficiente sunt sistemele BMS?", "How efficient are BMS systems?")}</p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link href="/resurse/referinte" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#F5F4F0]">
                          <div className="text-sm font-medium leading-none text-[#0D2E2B]">{t("Proiecte & Referinte", "Projects & References")}</div>
                          <p className="line-clamp-2 text-sm leading-snug text-[#0D2E2B]/50">{t("Portofoliul nostru de proiecte BMS", "Our portfolio of BMS projects")}</p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link href="/ghid-bms" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#F5F4F0]">
                          <div className="text-sm font-medium leading-none text-[#0D2E2B]">{t("Ghid BMS Gratuit", "Free BMS Guide")}</div>
                          <p className="line-clamp-2 text-sm leading-snug text-[#0D2E2B]/50">{t("Evalueaza potentialul cladirii tale", "Assess the potential of your building")}</p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link href="/resurse/raport-piata" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#F5F4F0]">
                          <div className="text-sm font-medium leading-none text-[#0D2E2B]">{t("Raport Piata BMS", "BMS Market Report")}</div>
                          <p className="line-clamp-2 text-sm leading-snug text-[#0D2E2B]/50">{t("Analiza pietei de automatizare 2025", "Automation market analysis 2025")}</p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center gap-3">
          {/* RO / EN toggle */}
          <div className="hidden sm:flex items-center rounded-full border border-[#0D2E2B]/15 overflow-hidden text-xs font-semibold">
            <button
              onClick={() => setLang("ro")}
              className={`px-3 py-1.5 transition-colors ${lang === "ro" ? "bg-[#0D2E2B] text-white" : "text-[#0D2E2B]/50 hover:text-[#0D2E2B]"}`}
            >
              RO
            </button>
            <button
              onClick={() => setLang("en")}
              className={`px-3 py-1.5 transition-colors ${lang === "en" ? "bg-[#0D2E2B] text-white" : "text-[#0D2E2B]/50 hover:text-[#0D2E2B]"}`}
            >
              EN
            </button>
          </div>

          <Link
            href="/calculator-roi"
            className="hidden sm:flex items-center gap-2 text-[#0D2E2B]/60 text-sm font-medium hover:text-[#0D2E2B] transition"
          >
            <Calculator className="h-4 w-4" />
            <span className="hidden lg:inline">{t("Calculator ROI", "ROI Calculator")}</span>
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#0D2E2B] text-white text-sm font-medium px-5 py-2 rounded-full hover:bg-[#1F6B4A] transition-all"
          >
            {t("Cerere oferta", "Request a quote")}
          </Link>
        </div>
      </div>
    </header>
  )
}
