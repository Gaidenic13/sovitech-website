"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { CheckCircle2, ArrowRight, ArrowLeft } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

const questions = [
  {
    id: 1,
    question: "Care este suprafața totală a clădirii dumneavoastră?",
    options: [
      { value: "small", label: "Sub 1.000 m²", points: 1 },
      { value: "medium", label: "1.000 - 5.000 m²", points: 2 },
      { value: "large", label: "5.000 - 10.000 m²", points: 3 },
      { value: "xlarge", label: "Peste 10.000 m²", points: 4 },
    ],
  },
  {
    id: 2,
    question: "Cât de vechi sunt sistemele HVAC actuale?",
    options: [
      { value: "new", label: "Mai puțin de 5 ani", points: 1 },
      { value: "medium", label: "5-10 ani", points: 2 },
      { value: "old", label: "10-15 ani", points: 3 },
      { value: "very-old", label: "Peste 15 ani", points: 4 },
    ],
  },
  {
    id: 3,
    question: "Cât cheltuiți lunar pe energie (electricitate + gaze)?",
    options: [
      { value: "low", label: "Sub 5.000 lei", points: 1 },
      { value: "medium", label: "5.000 - 15.000 lei", points: 2 },
      { value: "high", label: "15.000 - 30.000 lei", points: 3 },
      { value: "very-high", label: "Peste 30.000 lei", points: 4 },
    ],
  },
  {
    id: 4,
    question: "Aveți deja senzori sau automatizări instalate?",
    options: [
      { value: "none", label: "Nu, nimic", points: 4 },
      { value: "basic", label: "Termostate simple", points: 3 },
      { value: "medium", label: "Câțiva senzori și timere", points: 2 },
      { value: "advanced", label: "Sistem parțial automatizat", points: 1 },
    ],
  },
  {
    id: 5,
    question: "Cât de des primiți plângeri despre confortul termic?",
    options: [
      { value: "never", label: "Niciodată", points: 1 },
      { value: "rare", label: "Rar (o dată pe trimestru)", points: 2 },
      { value: "sometimes", label: "Ocazional (lunar)", points: 3 },
      { value: "often", label: "Frecvent (săptămânal)", points: 4 },
    ],
  },
]

export default function QuizPage() {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [showResults, setShowResults] = useState(false)

  const progress = ((currentQuestion + 1) / questions.length) * 100
  const isLastQuestion = currentQuestion === questions.length - 1
  const hasAnswer = answers[questions[currentQuestion].id]

  const handleNext = () => {
    if (isLastQuestion) {
      setShowResults(true)
    } else {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const calculateScore = () => {
    const totalPoints = Object.entries(answers).reduce((sum, [questionId, answer]) => {
      const question = questions.find((q) => q.id === Number.parseInt(questionId))
      const option = question?.options.find((opt) => opt.value === answer)
      return sum + (option?.points || 0)
    }, 0)
    const maxPoints = questions.reduce((sum, q) => sum + Math.max(...q.options.map((opt) => opt.points)), 0)
    return Math.round((totalPoints / maxPoints) * 100)
  }

  const getReadinessLevel = (score: number) => {
    if (score >= 75)
      return {
        level: "Excelent",
        color: "text-green-600",
        description: "Clădirea dumneavoastră are un potențial ridicat pentru economii prin BMS",
      }
    if (score >= 50)
      return { level: "Bun", color: "text-blue-600", description: "Există oportunități semnificative de îmbunătățire" }
    if (score >= 25)
      return {
        level: "Moderat",
        color: "text-yellow-600",
        description: "BMS-ul ar aduce beneficii, dar necesită investiție inițială mai mare",
      }
    return {
      level: "Scăzut",
      color: "text-orange-600",
      description: "Recomandăm o evaluare detaliată înainte de a continua",
    }
  }

  if (showResults) {
    const score = calculateScore()
    const readiness = getReadinessLevel(score)

    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600 mb-6 animate-bounce">
                <CheckCircle2 className="h-12 w-12" />
              </div>
              <h1 className="text-4xl font-bold mb-4">Evaluare Completată!</h1>
              <p className="text-lg text-muted-foreground">Felicitări! Ai câștigat +150 puncte</p>
            </div>

            <Card className="p-8 border-border mb-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center h-32 w-32 rounded-full bg-gradient-to-br from-primary to-primary/60 mb-4">
                  <span className="text-5xl font-bold text-white">{score}</span>
                </div>
                <h2 className="text-2xl font-bold mb-2">Scor Pregătire BMS</h2>
                <p className={`text-xl font-semibold ${readiness.color}`}>{readiness.level}</p>
                <p className="text-muted-foreground mt-2">{readiness.description}</p>
              </div>

              <div className="space-y-6">
                <div className="p-4 bg-muted/30 rounded-lg">
                  <h3 className="font-semibold mb-3">Recomandările Noastre:</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Folosește calculatorul ROI pentru a estima economiile exacte</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Programează o consultație gratuită cu specialiștii noștri</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Explorează studiile de caz relevante pentru sectorul tău</span>
                    </li>
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="flex-1" asChild>
                    <Link href="/ghid-bms/calculator">
                      Calculează ROI Personalizat
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="flex-1 bg-transparent" asChild>
                    <Link href="/ghid-bms/dashboard">Vezi Dashboard</Link>
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  const question = questions[currentQuestion]

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl font-bold">Evaluare Pregătire BMS</h1>
              <span className="text-sm text-muted-foreground">
                {currentQuestion + 1} / {questions.length}
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Question Card */}
          <Card className="p-8 border-border mb-6">
            <h2 className="text-2xl font-bold mb-6">{question.question}</h2>
            <RadioGroup
              value={answers[question.id]}
              onValueChange={(value) => setAnswers({ ...answers, [question.id]: value })}
            >
              <div className="space-y-3">
                {question.options.map((option) => (
                  <div
                    key={option.value}
                    className="flex items-center space-x-3 rounded-lg border border-border p-4 hover:border-primary/50 transition-colors cursor-pointer"
                  >
                    <RadioGroupItem value={option.value} id={`${question.id}-${option.value}`} />
                    <Label htmlFor={`${question.id}-${option.value}`} className="flex-1 cursor-pointer text-base">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </Card>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={handlePrevious} disabled={currentQuestion === 0}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Înapoi
            </Button>
            <Button onClick={handleNext} disabled={!hasAnswer}>
              {isLastQuestion ? "Vezi Rezultatele" : "Următoarea"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
