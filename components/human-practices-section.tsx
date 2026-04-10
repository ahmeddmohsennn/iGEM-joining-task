"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Users, Building, GraduationCap, Globe, MessageSquare, Calendar, ArrowRight } from "lucide-react"

const initiatives = [
  {
    title: "Healthcare Staff Workshops",
    description: "Interactive sessions with surgeons, nurses, and infection control specialists to validate clinical need, refine detection thresholds, and co-design bandage usability.",
    impact: "60+ clinicians",
    icon: Users,
  },
  {
    title: "Industry Partnerships",
    description: "Collaborations with wound-care companies and hospital procurement teams to understand regulatory pathways for medical device clearance of our biosensor bandage.",
    impact: "4 partnerships",
    icon: Building,
  },
  {
    title: "Patient Education Outreach",
    description: "Co-designed infographics and videos with patient groups explaining how the smart bandage works and addressing GMO safety concerns in a clinical setting.",
    impact: "8 patient groups",
    icon: GraduationCap,
  },
  {
    title: "Policy & Regulatory Engagement",
    description: "Meetings with MHRA and CE-marking consultants to map out the regulatory route for a GMO-containing medical device and inform our containment strategy.",
    impact: "3 regulatory briefs",
    icon: Globe,
  },
]

const timeline = [
  {
    date: "January 2026",
    title: "Stakeholder Mapping",
    description: "Identified key stakeholders: surgeons, infection control nurses, wound-care industry, patient advocates, and biosafety regulators relevant to post-surgical SSI.",
  },
  {
    date: "February 2026",
    title: "Clinical Expert Interviews",
    description: "Conducted 18 interviews with orthopaedic surgeons and infection specialists to confirm unmet need and define acceptable detection time and sensitivity.",
  },
  {
    date: "March 2026",
    title: "Patient Focus Groups",
    description: "Facilitated three focus groups to understand patient concerns about GMO-based diagnostics and gather preferences on bandage transparency and colour readout.",
  },
  {
    date: "April 2026",
    title: "Industry Co-Design Sessions",
    description: "Worked with wound-care manufacturers to optimise bandage format, packaging sterility, and shelf-life requirements for a viable medical product.",
  },
  {
    date: "May 2026",
    title: "Regulatory Consultation",
    description: "Submitted pre-application inquiry to MHRA regarding classification of our biosensor bandage as a Class II in vitro diagnostic medical device.",
  },
]

const feedback = [
  {
    quote: "Detecting C. acnes days earlier would fundamentally change how we manage implant-related infections — this is exactly what the field needs.",
    author: "Mr. David Clarke",
    role: "Orthopaedic Surgeon, NHS Trust",
  },
  {
    quote: "The team demonstrated exemplary responsible innovation — they let clinical reality shape their design, not the other way around.",
    author: "Prof. Aisha Nwosu",
    role: "Bioethics & Patient Safety Expert",
  },
  {
    quote: "Once the team explained the kill-switch and containment measures, patients were far more receptive to the idea of a living diagnostic.",
    author: "Rachel Okonkwo",
    role: "Patient Advocacy Lead",
  },
]

export function HumanPracticesSection() {
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
            Human Practices
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Science with{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Society
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Our biosensor is shaped by the people who will use it — clinicians, patients,
            and regulators — ensuring that our <em>C. acnes</em> SSI detection technology
            is safe, accessible, and clinically meaningful.
          </p>
        </div>

        {/* Key Initiatives */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Key Initiatives</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {initiatives.map((initiative, index) => {
              const Icon = initiative.icon
              return (
                <Card
                  key={initiative.title}
                  className={`bg-card/50 border-border hover:border-primary/50 transition-all duration-500 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 shrink-0">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-foreground">{initiative.title}</h3>
                          <Badge className="bg-accent/20 text-accent">{initiative.impact}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{initiative.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Engagement Timeline */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Engagement Timeline</h2>
          <div className="space-y-4">
            {timeline.map((item, index) => (
              <div
                key={item.date}
                className={`flex gap-4 transition-all duration-500 ${
                  isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0">
                    <Calendar className="h-5 w-5 text-primary-foreground" />
                  </div>
                  {index < timeline.length - 1 && (
                    <div className="w-0.5 h-full bg-gradient-to-b from-primary/50 to-transparent mt-2" />
                  )}
                </div>
                <Card className="flex-1 bg-card/50 border-border mb-4">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-xs">{item.date}</Badge>
                      <h3 className="font-semibold text-foreground">{item.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Stakeholder Feedback */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Stakeholder Voices</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {feedback.map((item, index) => (
              <Card
                key={item.author}
                className={`bg-card/50 border-border transition-all duration-500 ${
                  isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <CardContent className="p-6">
                  <MessageSquare className="h-8 w-8 text-primary/30 mb-4" />
                  <p className="text-sm text-foreground italic mb-4">&quot;{item.quote}&quot;</p>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{item.author}</p>
                    <p className="text-xs text-muted-foreground">{item.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
