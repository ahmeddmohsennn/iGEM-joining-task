"use client"

import { useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"

const SmartBandage3D = dynamic(
  () => import("./smart-bandage-3d").then((mod) => mod.SmartBandage3D),
  { ssr: false }
)

const stats = [
  { value: "1 in 10", label: "Surgical patients develop SSI" },
  { value: "48h", label: "Earlier detection vs. culture" },
  { value: "C. acnes", label: "Primary target pathogen" },
]

export function ProblemSection() {
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
      id="problem"
      ref={sectionRef}
      className="py-24 md:py-32 relative overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <span className="text-primary text-sm font-medium uppercase tracking-wider">
              The Problem
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
              Surgical site infections need{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                faster detection
              </span>
            </h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Surgical site infections (SSIs) caused by <em>Cutibacterium acnes</em> are
              a silent threat after orthopaedic and spinal procedures. Their slow-growing,
              anaerobic nature means clinical symptoms may not appear for days — by which
              time broad-spectrum antibiotics have already been given, fuelling resistance.
            </p>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              Current gold-standard diagnosis relies on microbiological cultures that take
              7–14 days, during which patients remain at risk of deep tissue spread and
              implant failure. A point-of-care biosensor embedded in the wound dressing
              itself would transform post-operative care.
            </p>

            {/* Stats */}
            <div className="mt-10 grid grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className={`transition-all duration-700 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${(index + 1) * 100}ms` }}
                >
                  <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-xs md:text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3D Smart Bandage Visual */}
          <div
            className={`relative transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-secondary to-muted">
              <SmartBandage3D />
              
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent pointer-events-none" />

              {/* Label */}
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-sm text-muted-foreground">
                  Smart biosensor bandage — chitosan matrix with embedded engineered bacteria and HMF co-inducer
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
