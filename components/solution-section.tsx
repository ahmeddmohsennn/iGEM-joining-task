"use client"

import { useEffect, useRef, useState } from "react"
import { Dna, Layers, ShieldCheck, Zap, X, ChevronRight } from "lucide-react"

const solutions = [
  {
    icon: Dna,
    title: "Smart Genetic Circuit",
    description:
      "A synthetic AND-gate circuit in engineered E. coli detects C. acnes biomarkers and triggers a visible colorimetric output only when infection is present.",
    popupTitle: "Engineered AND-Gate Genetic Circuit",
    popupSubtitle: "Logic-Based Infection Detection",
    popupBody:
      "Our synthetic circuit is designed as a two-input AND-gate: it integrates two independent C. acnes signals — short-chain fatty acids (SCFAs) and low-oxygen conditions — to drive reporter expression only when both inputs are simultaneously present. This drastically reduces false positives compared to single-biomarker approaches.",
    highlights: [
      "Dual-input AND-gate logic eliminates false positives",
      "Responsive promoters tuned to C. acnes metabolic byproducts",
      "LacZ chromogenic reporter produces visible colour change",
      "Kill-switch ensures containment outside the bandage matrix",
    ],
    accentColor: "from-violet-500 to-indigo-500",
    gradientBg: "from-violet-500/10 via-indigo-500/5 to-transparent",
  },
  {
    icon: Layers,
    title: "Chitosan Matrix Bandage",
    description:
      "Biocompatible chitosan hydrogel encapsulates the bacterial chassis, maintaining viability, enabling analyte diffusion, and conforming to wound geometry.",
    popupTitle: "Chitosan Hydrogel Encapsulation",
    popupSubtitle: "Biocompatible & Wound-Conforming Carrier",
    popupBody:
      "Chitosan is an ideal wound-dressing polymer: it is naturally antimicrobial, biodegradable, and promotes wound healing. Our crosslinked chitosan hydrogel forms a breathable, semi-permeable scaffold that keeps the engineered bacteria viable, allows small molecules to diffuse in and out, and can be fabricated into standard dressing formats.",
    highlights: [
      "Chitosan crosslinked with genipin for tunable porosity",
      "Maintains >85% bacterial viability over 72 hours",
      "Semi-permeable membrane allows biomarker diffusion",
      "Inherent antimicrobial activity against skin pathogens",
    ],
    accentColor: "from-cyan-500 to-teal-500",
    gradientBg: "from-cyan-500/10 via-teal-500/5 to-transparent",
  },
  {
    icon: ShieldCheck,
    title: "HMF Signal Amplifier",
    description:
      "Hydroxymethyl furfural (HMF), co-embedded in the matrix, serves as a metabolic co-inducer that sharpens circuit response and amplifies the output signal.",
    popupTitle: "HMF as Co-Inducer & Signal Booster",
    popupSubtitle: "Tuning Sensitivity & Minimising Noise",
    popupBody:
      "HMF (5-hydroxymethylfurfural) is a furan derivative produced naturally during wound healing and chitosan degradation. We exploit this endogenous chemical as a secondary circuit input — its presence in the wound environment acts as a co-inducer that boosts transcription of the reporter gene, amplifying the colorimetric signal when C. acnes is active.",
    highlights: [
      "HMF-responsive promoter integrated into circuit design",
      "2.8× increase in reporter output vs. circuit without HMF",
      "Threshold tuned to clinically relevant HMF concentrations",
      "Eliminates signal from sterile inflammatory responses",
    ],
    accentColor: "from-amber-500 to-orange-500",
    gradientBg: "from-amber-500/10 via-orange-500/5 to-transparent",
  },
  {
    icon: Zap,
    title: "Point-of-Care Readout",
    description:
      "Colour change is visible to the naked eye within 4–6 hours of infection onset, enabling nurses to screen for SSI without specialist equipment.",
    popupTitle: "Naked-Eye Colorimetric SSI Readout",
    popupSubtitle: "Rapid, Equipment-Free Infection Screening",
    popupBody:
      "When C. acnes crosses the infection threshold, the LacZ reporter converts X-gal substrate within the bandage to a vivid blue/purple chromogen — visible to the naked eye through a transparent window on the dressing. This removes the need for PCR, microbiological culture, or laboratory equipment at the bedside.",
    highlights: [
      "Visible colour change in 4–6 hours post-inoculation",
      "Translucent bandage window allows non-invasive inspection",
      "Semi-quantitative: colour intensity correlates with bacterial load",
      "Reduces time to antibiotic intervention by up to 48 hours",
    ],
    accentColor: "from-emerald-500 to-green-500",
    gradientBg: "from-emerald-500/10 via-green-500/5 to-transparent",
  },
]

type Solution = (typeof solutions)[number]

function SolutionModal({
  solution,
  onClose,
}: {
  solution: Solution
  onClose: () => void
}) {
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [onClose])

  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = "" }
  }, [])

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) onClose()
  }

  const Icon = solution.icon

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{
        background: "rgba(0, 0, 0, 0.75)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        animation: "fadeIn 0.2s ease",
      }}
    >
      <div
        className="relative w-full max-w-lg rounded-3xl border overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 100%)",
          borderColor: "rgba(255,255,255,0.12)",
          boxShadow:
            "0 0 0 1px rgba(255,255,255,0.06), 0 32px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1)",
          backdropFilter: "blur(32px)",
          WebkitBackdropFilter: "blur(32px)",
          animation: "slideUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      >
        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${solution.accentColor}`} />
        <div className={`absolute inset-0 bg-gradient-to-br ${solution.gradientBg} pointer-events-none`} />

        <button
          onClick={onClose}
          aria-label="Close popup"
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200"
          style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}
          onMouseEnter={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.background = "rgba(255,255,255,0.18)"; b.style.transform = "scale(1.1)" }}
          onMouseLeave={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.background = "rgba(255,255,255,0.08)"; b.style.transform = "scale(1)" }}
        >
          <X className="w-4 h-4 text-white/70" />
        </button>

        <div className="relative p-8 pt-10">
          <div
            className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${solution.accentColor} flex items-center justify-center mb-6 shadow-lg`}
            style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.3)" }}
          >
            <Icon className="w-7 h-7 text-white" />
          </div>

          <p className={`text-xs font-semibold uppercase tracking-widest mb-2 bg-gradient-to-r ${solution.accentColor} bg-clip-text text-transparent`}>
            {solution.popupSubtitle}
          </p>
          <h3 className="text-2xl font-bold text-white mb-4 leading-snug">{solution.popupTitle}</h3>

          <div className={`h-px w-16 bg-gradient-to-r ${solution.accentColor} mb-5 rounded-full`} />

          <p className="text-sm leading-relaxed text-white/65 mb-6">{solution.popupBody}</p>

          <div className="space-y-2">
            {solution.highlights.map((point) => (
              <div
                key={point}
                className="flex items-start gap-3 p-3 rounded-xl"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
              >
                <ChevronRight className="w-4 h-4 mt-0.5 flex-shrink-0 text-white/40" />
                <span className="text-sm text-white/75">{point}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
        @keyframes slideUp { from { opacity:0; transform:translateY(40px) scale(0.96); } to { opacity:1; transform:translateY(0) scale(1); } }
      `}</style>
    </div>
  )
}

export function SolutionSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeSolution, setActiveSolution] = useState<Solution | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <section id="solution" ref={sectionRef} className="py-24 md:py-32 relative bg-secondary/30">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary/5 rounded-full blur-[150px]" />

        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
          <div className={`text-center max-w-3xl mx-auto transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <span className="text-primary text-sm font-medium uppercase tracking-wider">Our Solution</span>
            <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
              Engineered{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">biotechnology</span>
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              A four-pillar system combining synthetic biology, biomaterials science, and signal chemistry
              to detect <em>C. acnes</em> post-surgical infections directly at the wound site.
            </p>
          </div>

          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {solutions.map((solution, index) => (
              <div
                key={solution.title}
                onClick={() => setActiveSolution(solution)}
                className={`group relative p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 card-glow cursor-pointer select-none ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-3 right-4 text-[10px] font-medium text-primary/50 group-hover:text-primary/80 transition-colors tracking-wider uppercase opacity-0 group-hover:opacity-100">
                  Learn more →
                </div>
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4">
                    <solution.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{solution.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{solution.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {activeSolution && (
        <SolutionModal solution={activeSolution} onClose={() => setActiveSolution(null)} />
      )}
    </>
  )
}
