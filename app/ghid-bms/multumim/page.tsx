import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle2, Download, Award, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function MultumimPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          {/* Success Message */}
          <div className="text-center mb-12">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600 mb-6">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <div className="inline-flex items-center gap-2 text-sm text-primary mb-4">
              <Award className="h-4 w-4" />
              Ai câștigat +100 puncte!
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Mulțumim! Verificați Email-ul</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Am trimis ghidul complet de evaluare BMS pe adresa dvs. de email. Dacă nu găsiți email-ul în câteva
              minute, verificați și folderul spam.
            </p>
          </div>

          {/* Download Card */}
          <Card className="p-8 border-border bg-gradient-to-br from-primary/5 to-primary/10 mb-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="h-12 w-12 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
                <Download className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-2">Descărcare Imediată</h2>
                <p className="text-muted-foreground mb-4">
                  Nu doriți să așteptați? Descărcați ghidul direct din browserul dumneavoastră.
                </p>
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Download className="mr-2 h-5 w-5" />
                  Descarcă Ghidul Acum (PDF, 8.2 MB)
                </Button>
              </div>
            </div>
          </Card>

          {/* Dashboard CTA */}
          <Card className="p-8 border-primary bg-primary/5">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Continuă Evaluarea & Câștigă Recompense</h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Accesează dashboard-ul tău personalizat pentru a completa quiz-ul, a calcula ROI-ul și a debloca
                conținut exclusiv. Fiecare etapă completată te aduce mai aproape de o ofertă personalizată!
              </p>
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                <Link href="/ghid-bms/dashboard">
                  Accesează Dashboard-ul
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <p className="text-sm text-muted-foreground mt-4">
                ✨ Deblochează studii de caz • 🏆 Câștigă insigne • 📊 Vezi progresul
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
