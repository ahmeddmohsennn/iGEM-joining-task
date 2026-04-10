"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Github, FileText } from "lucide-react"

export function CTASection() {
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
    <section id="cta" ref={sectionRef} className="py-24 md:py-32 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px]" />
      </div>

      <div className="mx-auto max-w-4xl px-6 lg:px-8 relative">
        <div
          className={`text-center transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-balance">
            Join us in{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              engineering
            </span>{" "}
            safer surgery
          </h2>

          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore our full documentation, lab protocols, and data. Together, we can transform
            how the world detects and prevents post-surgical <em>C. acnes</em> infections.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 transition-opacity px-8 gap-2"
            >
              <Link href="#project">
                Read Full Documentation
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="border-border bg-secondary text-foreground hover:bg-transparent hover:text-primary transition-colors gap-2"
            >
              <Link href="#" target="_blank">
                <Github className="w-4 h-4" />
                View on GitHub
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="border-border bg-secondary text-foreground hover:bg-transparent hover:text-primary transition-colors gap-2"
            >
              <Link href="#" target="_blank">
                <FileText className="w-4 h-4" />
                Download PDF
              </Link>
            </Button>
          </div>
        </div>

        {/* Team Info */}
        <div
          className={`mt-20 pt-10 border-t border-border transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
        >
          <div className="text-center">
            <p className="text-sm text-muted-foreground uppercase tracking-wider mb-4">
              A project by
            </p>
            <p className="text-xl font-semibold text-foreground">BioSynth iGEM Team</p>
            <p className="mt-2 text-muted-foreground">
              University of Innovation, Department of Synthetic Biology
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              Contact us:{" "}
              <a
                href="mailto:team@biosynth-igem.org"
                className="text-primary hover:underline"
              >
                team@biosynth-igem.org
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
