"use client"

import { useEffect, useRef, useState } from "react"
import { FlaskConical, Microscope, BarChart3, Clock } from "lucide-react"

const experiments = [
  {
    icon: FlaskConical,
    title: "Promoter Characterisation",
    description:
      "Fluorescence reporter assay measuring P_SCFA and P_ANO promoter activity in response to increasing concentrations of C. acnes metabolites (propionic acid, butyric acid) under anaerobic conditions.",
    status: "Completed",
    result: "3.8× fold induction at 10 mM propionate",
  },
  {
    icon: Microscope,
    title: "HMF Co-Induction Assay",
    description:
      "Titration of HMF (0–5 mM) against baseline circuit activity to determine optimal co-inducer concentration for signal amplification without cytotoxicity to the chassis.",
    status: "Completed",
    result: "2.8× signal boost at 1.5 mM HMF",
  },
  {
    icon: BarChart3,
    title: "Chitosan Viability & Diffusion",
    description:
      "CFU counts and FRAP assay on bacteria encapsulated in chitosan hydrogel over 72 hours, alongside diffusion coefficient measurements for short-chain fatty acids through the matrix.",
    status: "Completed",
    result: ">85% viability; D_eff = 4.2 × 10⁻¹⁰ m²/s",
  },
  {
    icon: Clock,
    title: "Kill-Switch Containment Test",
    description:
      "Environmental escape assay: engineered bacteria plated on media without synthetic amino acid supplement to validate auxotrophic kill-switch. UV-inducible CRISPRi backup also assessed.",
    status: "In Progress",
    result: "99.7% elimination in initial trials",
  },
]

export function ExperimentsSection() {
  const [isVisible, setIsVisible] = useState(false)
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
      id="experiments"
      ref={sectionRef}
      className="py-24 md:py-32 relative bg-secondary/30"
    >
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-accent/5 rounded-full blur-[150px]" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
        <div
          className={`text-center max-w-3xl mx-auto transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <span className="text-primary text-sm font-medium uppercase tracking-wider">
            Experiments
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
            Rigorous{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              validation
            </span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Every component — from promoter sensitivity to bandage viability — is backed
            by quantitative laboratory data designed to reflect clinical wound conditions.
          </p>
        </div>

        <div className="mt-16 grid md:grid-cols-2 gap-6">
          {experiments.map((experiment, index) => (
            <div
              key={experiment.title}
              className={`group p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 card-glow ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center shrink-0">
                  <experiment.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <h3 className="text-lg font-semibold text-foreground">
                      {experiment.title}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        experiment.status === "Completed"
                          ? "bg-accent/20 text-accent"
                          : "bg-primary/20 text-primary"
                      }`}
                    >
                      {experiment.status}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {experiment.description}
                  </p>
                  <div className="mt-4 pt-4 border-t border-border">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">
                      Result
                    </span>
                    <p className="mt-1 text-sm font-medium bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                      {experiment.result}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
