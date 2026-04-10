"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FlaskConical, Dna, Microscope, TestTube, CheckCircle2, Clock, AlertCircle } from "lucide-react"

const protocols = [
  {
    name: "AND-Gate Plasmid Construction",
    description: "Gibson Assembly of dual-promoter construct (P_SCFA::AND::P_ANO) with LacZ reporter, RBS optimisation, and terminator sequences into pSB1C3 backbone.",
    status: "Completed",
    icon: Dna,
  },
  {
    name: "E. coli Chassi Preparation",
    description: "Heat-shock transformation of E. coli Nissle 1917 with biosensor plasmid. Integration of auxotrophic marker and CRISPRi kill-switch cassette.",
    status: "Completed",
    icon: FlaskConical,
  },
  {
    name: "Chitosan Hydrogel Encapsulation",
    description: "Crosslinking of 2% chitosan with genipin (0.1%) to form hydrogel matrix; bacterial embedding at OD 0.8; viability and diffusion characterisation.",
    status: "In Progress",
    icon: TestTube,
  },
  {
    name: "Colorimetric Detection Assay",
    description: "X-gal assay under anaerobic conditions with varying SCFA and HMF concentrations; absorbance at 595 nm and naked-eye assessment with colour chart.",
    status: "In Progress",
    icon: Microscope,
  },
]

const experiments = [
  {
    title: "P_SCFA Promoter Library Screen",
    date: "March 15, 2026",
    result: "Identified top-3 promoter variants with 2.5–3.8× induction at 10 mM propionate.",
    status: "success",
  },
  {
    title: "Anaerobic Promoter (P_ANO) Characterisation",
    date: "April 2, 2026",
    result: "P_ANO shows 12× upregulation under 0% O₂ vs. aerobic baseline.",
    status: "success",
  },
  {
    title: "HMF Dose-Response Titration",
    date: "May 10, 2026",
    result: "Optimal co-induction at 1.5 mM HMF; 2.8× signal amplification confirmed.",
    status: "success",
  },
  {
    title: "Chitosan Viability Time-course",
    date: "June 5, 2026",
    result: "72-hour viability >85% confirmed; diffusion coefficient measurement ongoing.",
    status: "pending",
  },
]

const labNotebook = [
  {
    week: "Week 12",
    date: "March 18–22",
    activities: [
      "Prepared competent E. coli Nissle 1917 cells",
      "PCR amplification of AND-gate parts",
      "Gibson Assembly of dual-promoter plasmid",
    ],
  },
  {
    week: "Week 13",
    date: "March 25–29",
    activities: [
      "Transformed biosensor plasmid into chassis",
      "Colony screening by diagnostic PCR",
      "Sequencing verification of circuit constructs",
    ],
  },
  {
    week: "Week 14",
    date: "April 1–5",
    activities: [
      "Anaerobic promoter induction assay setup",
      "X-gal plate-reader fluorescence calibration",
      "HMF titration pilot experiment",
    ],
  },
]

export function WetLabSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 border-primary/50 text-primary">
            Wet Lab
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Laboratory{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Experiments
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            From AND-gate plasmid assembly to chitosan bandage fabrication — explore the wet
            lab protocols, experiments, and results that bring our <em>C. acnes</em> SSI
            biosensor to life.
          </p>
        </div>

        <Tabs defaultValue="protocols" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="protocols">Protocols</TabsTrigger>
            <TabsTrigger value="experiments">Experiments</TabsTrigger>
            <TabsTrigger value="notebook">Lab Notebook</TabsTrigger>
          </TabsList>

          <TabsContent value="protocols">
            <div className="grid md:grid-cols-2 gap-6">
              {protocols.map((protocol, index) => {
                const Icon = protocol.icon
                return (
                  <Card
                    key={protocol.name}
                    className={`bg-card/50 border-border hover:border-primary/50 transition-all duration-500 ${
                      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-primary/10">
                            <Icon className="h-5 w-5 text-primary" />
                          </div>
                          <CardTitle className="text-lg">{protocol.name}</CardTitle>
                        </div>
                        <Badge
                          variant={protocol.status === "Completed" ? "default" : "secondary"}
                          className={protocol.status === "Completed" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}
                        >
                          {protocol.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{protocol.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="experiments">
            <div className="space-y-4">
              {experiments.map((experiment, index) => (
                <Card
                  key={experiment.title}
                  className={`bg-card/50 border-border transition-all duration-500 ${
                    isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`p-2 rounded-lg shrink-0 ${
                        experiment.status === "success" ? "bg-green-500/10" : "bg-yellow-500/10"
                      }`}>
                        {experiment.status === "success" ? (
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                        ) : (
                          <Clock className="h-5 w-5 text-yellow-500" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-foreground">{experiment.title}</h3>
                          <span className="text-sm text-muted-foreground">{experiment.date}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{experiment.result}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="notebook">
            <div className="space-y-6">
              {labNotebook.map((entry, index) => (
                <Card
                  key={entry.week}
                  className={`bg-card/50 border-border transition-all duration-500 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{entry.week}</CardTitle>
                      <Badge variant="outline">{entry.date}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {entry.activities.map((activity) => (
                        <li key={activity} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                          {activity}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
