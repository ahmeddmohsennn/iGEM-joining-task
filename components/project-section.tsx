"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Target, Lightbulb, Zap, CheckCircle2, ArrowRight } from "lucide-react"

const objectives = [
  {
    title: "Design AND-Gate Biosensor Circuit",
    description: "Construct a dual-input synthetic genetic circuit with C. acnes SCFA-responsive and anaerobic-sensing promoters driving LacZ reporter output.",
    status: "In Progress",
  },
  {
    title: "Optimise HMF Co-Induction",
    description: "Determine optimal HMF concentration range within the chitosan matrix that amplifies circuit output without impairing chassis viability.",
    status: "Completed",
  },
  {
    title: "Validate Chitosan Encapsulation",
    description: "Characterise bacterial viability, metabolite diffusion, and colorimetric performance of the bandage system under simulated wound conditions.",
    status: "In Progress",
  },
  {
    title: "Biosafety & Containment Assays",
    description: "Confirm kill-switch efficiency and auxotrophic containment to meet GMO safety requirements for medical device use.",
    status: "Planned",
  },
]

const timeline = [
  { phase: "Circuit Design & Parts", months: "Jan – Mar", status: "completed" },
  { phase: "Chassis Engineering", months: "Apr – Jun", status: "completed" },
  { phase: "Bandage Fabrication & Testing", months: "Jul – Sep", status: "current" },
  { phase: "Validation & Documentation", months: "Oct – Nov", status: "upcoming" },
]

export function ProjectSection() {
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
            Our Project
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Detecting{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              C. acnes SSI
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            We are engineering a smart genetic circuit embedded inside a chitosan hydrogel
            bandage — augmented with HMF — to detect <em>Cutibacterium acnes</em> surgical
            site infections before clinical symptoms appear.
          </p>
        </div>

        {/* Vision & Mission */}
        <div className={`grid md:grid-cols-2 gap-6 mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <Card className="bg-gradient-to-br from-primary/10 to-transparent border-primary/30 card-glow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/20">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Our Vision</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                To make post-surgical wound monitoring intelligent and proactive — embedding
                a living biosensor directly into the bandage so that infection is flagged
                in hours, not days, enabling targeted antibiotic therapy and reducing resistance.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-accent/10 to-transparent border-accent/30 card-glow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-accent/20">
                  <Lightbulb className="h-6 w-6 text-accent" />
                </div>
                <CardTitle className="text-xl">Our Mission</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                To design, build, and validate a modular synthetic AND-gate circuit in
                an engineered E. coli chassis, encapsulated in chitosan hydrogel with
                HMF co-inducer, delivering colorimetric SSI readout at the bedside.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Key Objectives */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Key Objectives</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {objectives.map((objective, index) => (
              <Card
                key={objective.title}
                className={`bg-card/50 border-border hover:border-primary/50 transition-all duration-500 card-glow ${
                  isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-primary/10 shrink-0">
                      <Zap className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-foreground">{objective.title}</h3>
                        <Badge
                          variant={objective.status === "Completed" ? "default" : "secondary"}
                          className={objective.status === "Completed" ? "bg-green-500/20 text-green-400" : ""}
                        >
                          {objective.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{objective.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Project Timeline</h2>
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary to-accent hidden md:block" />

            <div className="space-y-8">
              {timeline.map((item, index) => (
                <div
                  key={item.phase}
                  className={`flex items-center gap-4 md:gap-8 transition-all duration-700 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className={`flex-1 text-right hidden md:block ${index % 2 === 1 ? "order-3 text-left" : ""}`}>
                    {index % 2 === 0 && (
                      <Card className="inline-block bg-card/50 border-border">
                        <CardContent className="p-4">
                          <h3 className="font-semibold text-foreground">{item.phase}</h3>
                          <p className="text-sm text-muted-foreground">{item.months}</p>
                        </CardContent>
                      </Card>
                    )}
                  </div>

                  <div className="relative z-10 shrink-0">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        item.status === "completed"
                          ? "bg-green-500/20 border-2 border-green-500"
                          : item.status === "current"
                          ? "bg-primary/20 border-2 border-primary animate-pulse"
                          : "bg-muted border-2 border-border"
                      }`}
                    >
                      {item.status === "completed" ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      ) : item.status === "current" ? (
                        <ArrowRight className="h-5 w-5 text-primary" />
                      ) : (
                        <div className="w-2 h-2 rounded-full bg-muted-foreground" />
                      )}
                    </div>
                  </div>

                  <div className={`flex-1 ${index % 2 === 0 ? "md:order-3" : ""}`}>
                    {(index % 2 === 1 || true) && (
                      <Card className="bg-card/50 border-border md:hidden md:inline-block">
                        <CardContent className="p-4">
                          <h3 className="font-semibold text-foreground">{item.phase}</h3>
                          <p className="text-sm text-muted-foreground">{item.months}</p>
                        </CardContent>
                      </Card>
                    )}
                    {index % 2 === 1 && (
                      <Card className="hidden md:inline-block bg-card/50 border-border">
                        <CardContent className="p-4">
                          <h3 className="font-semibold text-foreground">{item.phase}</h3>
                          <p className="text-sm text-muted-foreground">{item.months}</p>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
