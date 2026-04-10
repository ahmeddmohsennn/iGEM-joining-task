"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowRight } from "lucide-react"

const steps = [
  {
    step: "01",
    title: "Circuit Design",
    description:
      "An AND-gate genetic circuit is designed with two C. acnes-responsive promoters (SCFA-sensing & anaerobic-sensing) driving LacZ reporter expression.",
    visual: "Promoter library screening & parts characterisation",
  },
  {
    step: "02",
    title: "Chassis Engineering",
    description:
      "Circuit is integrated into a safe E. coli Nissle chassis. Containment kill-switches and auxotrophies ensure the organism cannot persist outside the bandage.",
    visual: "Chromosomal integration via λ-Red recombination",
  },
  {
    step: "03",
    title: "HMF Co-Induction",
    description:
      "HMF embedded in the chitosan matrix co-activates the circuit alongside C. acnes biomarkers, amplifying reporter output above a clinically-meaningful threshold.",
    visual: "HMF-responsive promoter titration assay",
  },
  {
    step: "04",
    title: "Chitosan Bandage",
    description:
      "Engineered bacteria are encapsulated in a crosslinked chitosan hydrogel dressing. The porous matrix maintains viability and permits biomarker diffusion.",
    visual: "Hydrogel porosity & viability characterisation",
  },
  {
    step: "05",
    title: "Colorimetric Readout",
    description:
      "LacZ converts X-gal in the matrix to a blue/purple chromogen. Colour change is visible through a transparent window in the dressing — no equipment needed.",
    visual: "Naked-eye detection & absorbance quantification",
  },
]

export function HowItWorksSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeStep, setActiveStep] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="py-24 md:py-32 relative overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div
          className={`text-center max-w-3xl mx-auto transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <span className="text-primary text-sm font-medium uppercase tracking-wider">
            How It Works
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
            From circuit to{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              bedside readout
            </span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Five integrated steps transform a synthetic genetic circuit into a wearable,
            real-time <em>C. acnes</em> infection sensor embedded in a chitosan wound dressing.
          </p>
        </div>

        {/* Steps Timeline */}
        <div className="mt-16 relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/20 via-primary to-accent/20" />

          <div className="grid lg:grid-cols-5 gap-8">
            {steps.map((step, index) => (
              <div
                key={step.step}
                className={`relative transition-all duration-500 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
                onMouseEnter={() => setActiveStep(index)}
              >
                {/* Step Number */}
                <div
                  className={`relative z-10 w-16 h-16 mx-auto rounded-2xl flex items-center justify-center transition-all duration-300 ${
                    activeStep === index
                      ? "bg-gradient-to-br from-primary to-accent"
                      : "bg-secondary border border-border"
                  }`}
                >
                  <span
                    className={`text-lg font-bold ${
                      activeStep === index ? "text-primary-foreground" : "text-foreground"
                    }`}
                  >
                    {step.step}
                  </span>
                </div>

                {/* Arrow (hidden on last item and mobile) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 -right-4 transform -translate-y-1/2 translate-x-1/2 z-20">
                    <ArrowRight className="w-4 h-4 text-primary" />
                  </div>
                )}

                {/* Content */}
                <div className="mt-6 text-center">
                  <h3
                    className={`text-lg font-semibold transition-colors duration-300 ${
                      activeStep === index ? "text-primary" : "text-foreground"
                    }`}
                  >
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                  <p className="mt-3 text-xs text-muted-foreground/60 italic">
                    {step.visual}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Genetic Circuit Visualization */}
        <div
          className={`mt-20 p-8 rounded-2xl bg-card border border-border transition-all duration-700 delay-500 card-glow ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-foreground mb-2">
                AND-Gate Genetic Circuit Architecture
              </h3>
              <p className="text-muted-foreground">
                Two independent C. acnes-responsive promoters (P<sub>SCFA</sub> and P<sub>ANO</sub>) feed into an
                AND-gate logic module. Both must be activated simultaneously to drive LacZ
                reporter output — minimising false positives from non-infectious inflammation.
              </p>
            </div>
            <div className="flex-1 flex items-center justify-center">
              {/* Circuit Diagram */}
              <div className="flex items-center gap-4 flex-wrap justify-center">
                {["P_SCFA", "P_ANO", "AND Gate", "LacZ", "X-gal", "Colour"].map(
                  (part, i) => (
                    <div key={part} className="flex items-center gap-2">
                      <div
                        className={`px-4 py-2 rounded-lg text-sm font-medium ${
                          i % 2 === 0
                            ? "bg-primary/20 text-primary"
                            : "bg-accent/20 text-accent"
                        }`}
                      >
                        {part}
                      </div>
                      {i < 5 && <ArrowRight className="w-4 h-4 text-muted-foreground" />}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
