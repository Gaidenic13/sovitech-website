"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Download, CheckCircle2, Lock } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function DescarcaGhidPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Redirect to thank you page
    router.push("/ghid-bms/multumim")
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-5 gap-8">
            {/* Left: Benefits */}
            <div className="md:col-span-2 space-y-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-4">Obțineți Ghidul Gratuit de Evaluare BMS</h1>
                <p className="text-lg text-muted-foreground">
                  Completați formularul pentru a descărca imediat ghidul complet cu toate resursele incluse.
                </p>
              </div>

              <Card className="p-6 bg-muted/30 border-border">
                <h3 className="font-semibold mb-4">Ce veți primi:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Ghid PDF de 42 pagini cu liste de verificare detaliate</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Calculator ROI în format Excel editabil</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Benchmark-uri actualizate pentru toate sectoarele</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Studii de caz cu rezultate măsurabile</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Acces la webinarii exclusive despre BMS</span>
                  </li>
                </ul>
              </Card>

              <Card className="p-4 bg-primary/5 border-primary/20">
                <div className="flex items-start gap-3">
                  <Lock className="h-5 w-5 text-primary mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium mb-1">Datele dumneavoastră sunt în siguranță</p>
                    <p className="text-muted-foreground">
                      Nu partajăm informațiile cu terți. Datele sunt folosite exclusiv pentru a vă trimite ghidul și
                      conținut relevant.
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Right: Form */}
            <div className="md:col-span-3">
              <Card className="p-8 border-border">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Prenume *</Label>
                      <Input id="firstName" name="firstName" required placeholder="Ion" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Nume *</Label>
                      <Input id="lastName" name="lastName" required placeholder="Popescu" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email profesional *</Label>
                    <Input id="email" name="email" type="email" required placeholder="ion.popescu@companie.ro" />
                    <p className="text-xs text-muted-foreground">Ghidul va fi trimis imediat pe această adresă</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefon</Label>
                    <Input id="phone" name="phone" type="tel" placeholder="+40 721 234 567" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company">Companie *</Label>
                    <Input id="company" name="company" required placeholder="Numele companiei" />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="propertyType">Tip proprietate *</Label>
                      <Select name="propertyType" required>
                        <SelectTrigger id="propertyType">
                          <SelectValue placeholder="Selectați tipul" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="office">Clădire de birouri</SelectItem>
                          <SelectItem value="retail">Spațiu comercial / Retail</SelectItem>
                          <SelectItem value="hotel">Hotel / HORECA</SelectItem>
                          <SelectItem value="medical">Unitate medicală</SelectItem>
                          <SelectItem value="industrial">Hală industrială</SelectItem>
                          <SelectItem value="mixed">Utilizare mixtă</SelectItem>
                          <SelectItem value="other">Altele</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="role">Funcția dumneavoastră *</Label>
                      <Select name="role" required>
                        <SelectTrigger id="role">
                          <SelectValue placeholder="Selectați funcția" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="owner">Proprietar</SelectItem>
                          <SelectItem value="fm">Facility Manager</SelectItem>
                          <SelectItem value="tech">Director Tehnic</SelectItem>
                          <SelectItem value="pm">Project Manager</SelectItem>
                          <SelectItem value="exec">Management Executiv</SelectItem>
                          <SelectItem value="other">Altă funcție</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 pt-2">
                    <Checkbox id="consent" required />
                    <Label htmlFor="consent" className="text-sm font-normal leading-snug cursor-pointer">
                      Sunt de acord să primesc ghidul și să fiu contactat de Sovitech Control cu informații despre
                      soluții BMS. Pot să-mi retrag consimțământul oricând. *
                    </Label>
                  </div>

                  <div className="flex items-start gap-3">
                    <Checkbox id="newsletter" />
                    <Label htmlFor="newsletter" className="text-sm font-normal leading-snug cursor-pointer">
                      Doresc să primesc newsletter-ul lunar cu articole despre eficiență energetică și automatizări
                    </Label>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>Se trimite...</>
                    ) : (
                      <>
                        <Download className="mr-2 h-5 w-5" />
                        Descarcă Ghidul Gratuit
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    Respectăm confidențialitatea datelor dumneavoastră. Citiți{" "}
                    <a href="/politica-confidentialitate" className="text-primary hover:underline">
                      Politica de Confidențialitate
                    </a>
                  </p>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
