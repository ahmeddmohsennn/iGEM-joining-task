"use client"

import { useEffect, useRef, useState } from "react"
import { Award, TrendingUp, Shield, Zap } from "lucide-react"

const achievements = [
  {
    icon: TrendingUp,
    metric: "3.8×",
    label: "Circuit Induction",
    description: "Fold-activation of AND-gate at clinical C. acnes metabolite levels",
  },
  {
    icon: Zap,
    metric: "4–6 h",
    label: "Detection Speed",
    description: "Colorimetric readout visible within 4–6 hours of bacterial inoculation",
  },
  {
    icon: Shield,
    metric: "99.7%",
    label: "Containment Rate",
    description: "Auxotrophic kill-switch elimination efficiency validated",
  },
  {
    icon: Award,
    metric: ">85%",
    label: "Bacterial Viability",
    description: "Chassis viability maintained in chitosan matrix over 72 hours",
  },
]

export function ResultsSection() {
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
      id="results"
      ref={sectionRef}
      className="py-24 md:py-32 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
        <div
          className={`text-center max-w-3xl mx-auto transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <span className="text-primary text-sm font-medium uppercase tracking-wider">
            Results
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
            Breakthrough{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              achievements
            </span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Our biosensor system demonstrates clear, quantifiable performance milestones
            that bring rapid <em>C. acnes</em> SSI detection closer to clinical reality.
          </p>
        </div>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((achievement, index) => (
            <div
              key={achievement.label}
              className={`group relative p-8 rounded-2xl bg-gradient-to-br from-card to-secondary border border-border hover:border-primary/50 transition-all duration-300 text-center card-glow ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Icon */}
              <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <achievement.icon className="w-7 h-7 text-primary" />
              </div>

              {/* Metric */}
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {achievement.metric}
              </div>

              {/* Label */}
              <div className="mt-2 text-lg font-semibold text-foreground">
                {achievement.label}
              </div>

              {/* Description */}
              <p className="mt-2 text-sm text-muted-foreground">
                {achievement.description}
              </p>
            </div>
          ))}
        </div>

        {/* Publication/Award Banner */}
        <div
          className={`mt-16 p-8 rounded-2xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 text-center transition-all duration-700 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <p className="text-lg text-foreground font-medium">
            Selected for presentation at{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-bold">
              iGEM 2026 Grand Jamboree
            </span>
          </p>
          <p className="mt-2 text-muted-foreground">
            Our project has been recognised for its innovative approach to post-surgical
            infection control using synthetic biology at the point of care.
          </p>
        </div>
      </div>
    </section>
  )
}
