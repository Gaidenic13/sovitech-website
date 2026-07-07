"use client"

import { MapPin, Phone, Mail, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"

export default function ContactPage() {
  const { t } = useLanguage()

  return (
    <>
      <section className="bg-[#0D2E2B] min-h-[45vh] flex items-end pb-16 relative overflow-hidden">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none">
          <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fingerprint-59QWj1Ik1Fd1hqzZduTrEqLz2j557z.svg" alt="" className="h-[600px] w-auto" />
        </div>
        <div className="max-w-7xl mx-auto px-8 w-full relative z-10">
          <span className="text-[#1F6B4A] text-sm font-semibold tracking-wider uppercase mb-4 block">• {t("Contact", "Contact")}</span>
          <h1 className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tight">
            {t("Sa vorbim.", "Let's talk.")}
          </h1>
          <p className="text-lg text-white/60 font-light mt-4 max-w-xl">
            {t(
              "Echipa noastra de specialisti BMS este disponibila pentru consultatii, oferte personalizate si suport tehnic.",
              "Our team of BMS specialists is available for consultations, personalised quotes and technical support."
            )}
          </p>
        </div>
      </section>

      <section className="bg-[#F5F4F0] py-24">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid gap-16 lg:grid-cols-2">
            <div className="space-y-12">
              <div>
                <p className="section-label mb-3">• {t("INFORMATII", "INFORMATION")}</p>
                <h2 className="text-4xl font-black text-[#0D2E2B] tracking-tight mb-4">
                  {t("Venim la tine", "We come to you")}
                </h2>
                <p className="text-base text-[#888888] font-light leading-relaxed">
                  {t(
                    "Suntem disponibili pentru orice tip de proiect BMS — de la consultatie initiala pana la implementare si mentenanta pe termen lung.",
                    "We are available for any type of BMS project — from initial consultation through to implementation and long-term maintenance."
                  )}
                </p>
              </div>

              <div className="aspect-video overflow-hidden rounded-2xl">
                <img src="/services-commissioning-training.jpg" alt={t("Echipa Sovitech", "Sovitech team")} className="h-full w-full object-cover" />
              </div>

              <div className="space-y-8">
                {[
                  { icon: MapPin, labelRo: "Adresa", labelEn: "Address", value: "Str. Dr. Nicolae D. Staicovici, nr 35\nBucuresti, Sector 5, Romania" },
                  { icon: Phone, labelRo: "Telefon", labelEn: "Phone", value: "+40 21 XXX XXXX" },
                  { icon: Mail, labelRo: "Email", labelEn: "Email", value: "office@sovitech.ro" },
                  { icon: Clock, labelRo: "Program", labelEn: "Hours", valueRo: "Luni — Vineri: 09:00 – 18:00\nSambata — Duminica: Inchis", valueEn: "Monday — Friday: 09:00 – 18:00\nSaturday — Sunday: Closed" },
                ].map(({ icon: Icon, labelRo, labelEn, value, valueRo, valueEn }) => (
                  <div key={labelRo} className="flex items-start gap-5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0D2E2B]/8 flex-shrink-0">
                      <Icon className="h-5 w-5 text-[#0D2E2B]" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold tracking-widest uppercase text-[#888888] mb-1">{t(labelRo, labelEn)}</p>
                      <p className="text-sm text-[#0D2E2B] font-light leading-relaxed whitespace-pre-line">
                        {valueRo ? t(valueRo, valueEn!) : value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-10 shadow-sm">
              <p className="section-label mb-3">• {t("MESAJ", "MESSAGE")}</p>
              <h2 className="text-3xl font-black text-[#0D2E2B] tracking-tight mb-8">
                {t("Trimite-ne o cerere", "Send us a request")}
              </h2>

              <form className="space-y-6">
                <div className="grid gap-5 sm:grid-cols-2">
                  {[
                    { id: "firstName", labelRo: "Prenume", labelEn: "First name", placeholderRo: "Ion", placeholderEn: "John" },
                    { id: "lastName", labelRo: "Nume", labelEn: "Last name", placeholderRo: "Popescu", placeholderEn: "Smith" },
                  ].map(({ id, labelRo, labelEn, placeholderRo, placeholderEn }) => (
                    <div key={id}>
                      <label htmlFor={id} className="block text-xs font-semibold tracking-widest uppercase text-[#888888] mb-2">{t(labelRo, labelEn)}</label>
                      <input type="text" id={id} placeholder={t(placeholderRo, placeholderEn)} className="w-full rounded-lg border border-[#0D2E2B]/15 bg-[#F5F4F0] px-4 py-3 text-sm text-[#0D2E2B] placeholder:text-[#0D2E2B]/30 focus:border-[#1F6B4A] focus:outline-none focus:ring-1 focus:ring-[#1F6B4A] transition" />
                    </div>
                  ))}
                </div>

                {[
                  { id: "email", type: "email", labelRo: "Email", labelEn: "Email", placeholder: "ion.popescu@exemplu.ro" },
                  { id: "phone", type: "tel", labelRo: "Telefon", labelEn: "Phone", placeholder: "+40 XXX XXX XXX" },
                ].map(({ id, type, labelRo, labelEn, placeholder }) => (
                  <div key={id}>
                    <label htmlFor={id} className="block text-xs font-semibold tracking-widest uppercase text-[#888888] mb-2">{t(labelRo, labelEn)}</label>
                    <input type={type} id={id} placeholder={placeholder} className="w-full rounded-lg border border-[#0D2E2B]/15 bg-[#F5F4F0] px-4 py-3 text-sm text-[#0D2E2B] placeholder:text-[#0D2E2B]/30 focus:border-[#1F6B4A] focus:outline-none focus:ring-1 focus:ring-[#1F6B4A] transition" />
                  </div>
                ))}

                <div>
                  <label htmlFor="subject" className="block text-xs font-semibold tracking-widest uppercase text-[#888888] mb-2">{t("Subiect", "Subject")}</label>
                  <select id="subject" className="w-full rounded-lg border border-[#0D2E2B]/15 bg-[#F5F4F0] px-4 py-3 text-sm text-[#0D2E2B] focus:border-[#1F6B4A] focus:outline-none focus:ring-1 focus:ring-[#1F6B4A] transition">
                    <option>{t("Cerere oferta", "Request a Quote")}</option>
                    <option>{t("Consultanta BMS", "BMS Consultation")}</option>
                    <option>{t("Suport tehnic", "Technical Support")}</option>
                    <option>{t("Informatii produs", "Product Information")}</option>
                    <option>{t("Altele", "Other")}</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-semibold tracking-widest uppercase text-[#888888] mb-2">{t("Mesaj", "Message")}</label>
                  <textarea id="message" rows={5} placeholder={t("Descrieti pe scurt proiectul sau intrebarea dumneavoastra...", "Briefly describe your project or question...")} className="w-full rounded-lg border border-[#0D2E2B]/15 bg-[#F5F4F0] px-4 py-3 text-sm text-[#0D2E2B] placeholder:text-[#0D2E2B]/30 focus:border-[#1F6B4A] focus:outline-none focus:ring-1 focus:ring-[#1F6B4A] transition resize-none" />
                </div>

                <button type="submit" className="w-full inline-flex items-center justify-center gap-2 bg-[#1F6B4A] text-white text-sm font-medium px-6 py-3.5 rounded-lg hover:bg-[#185c3f] transition-colors">
                  {t("Trimite Mesaj", "Send Message")}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#0D2E2B] py-24">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p className="section-label text-[#1F6B4A] mb-2">• {t("CALCULATOR", "CALCULATOR")}</p>
            <h2 className="text-3xl font-black text-white tracking-tight">
              {t("Calculeaza ROI-ul proiectului tau BMS", "Calculate the ROI of your BMS project")}
            </h2>
          </div>
          <Link href="/calculator-roi" className="btn-sovitech-ghost flex-shrink-0">
            {t("Deschide Calculatorul", "Open the Calculator")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  )
}
