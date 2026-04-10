"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Github, Linkedin, Mail } from "lucide-react"

const teamMembers = [
  {
    name: "Dr. Sarah Chen",
    role: "Team Lead",
    department: "Molecular Biology",
    image: "/team/member-1.jpg",
    bio: "Leading the project vision and coordinating cross-functional research efforts.",
    tags: ["Leadership", "Strategy"],
  },
  {
    name: "Alex Thompson",
    role: "Wet Lab Lead",
    department: "Biochemistry",
    image: "/team/member-2.jpg",
    bio: "Designing and executing laboratory experiments for genetic circuit validation.",
    tags: ["Cloning", "Assays"],
  },
  {
    name: "Maya Patel",
    role: "Dry Lab Lead",
    department: "Computational Biology",
    image: "/team/member-3.jpg",
    bio: "Building computational models and analyzing experimental data.",
    tags: ["Modeling", "ML"],
  },
  {
    name: "James Wilson",
    role: "Human Practices",
    department: "Science Communication",
    image: "/team/member-4.jpg",
    bio: "Engaging with stakeholders and ensuring responsible innovation.",
    tags: ["Outreach", "Ethics"],
  },
  {
    name: "Lisa Zhang",
    role: "Lab Technician",
    department: "Molecular Biology",
    image: "/team/member-5.jpg",
    bio: "Managing lab operations and supporting experimental workflows.",
    tags: ["PCR", "Gel Electrophoresis"],
  },
  {
    name: "Michael Roberts",
    role: "Software Developer",
    department: "Bioinformatics",
    image: "/team/member-6.jpg",
    bio: "Developing analysis pipelines and visualization tools.",
    tags: ["Python", "Data Viz"],
  },
]

const advisors = [
  {
    name: "Prof. Emily Watson",
    role: "Faculty Advisor",
    institution: "Department of Bioengineering",
  },
  {
    name: "Dr. Robert Kim",
    role: "Industry Mentor",
    institution: "BioTech Innovations Inc.",
  },
]

export function TeamSection() {
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set())
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observers = cardRefs.current.map((ref, index) => {
      if (!ref) return null
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleCards((prev) => new Set([...prev, index]))
          }
        },
        { threshold: 0.2 }
      )
      observer.observe(ref)
      return observer
    })

    return () => {
      observers.forEach((observer) => observer?.disconnect())
    }
  }, [])

  return (
    <section className="py-24 px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 border-primary/50 text-primary">
            Our Team
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Meet the{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Innovators
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A diverse team of passionate scientists, engineers, and communicators
            working together to push the boundaries of synthetic biology.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {teamMembers.map((member, index) => (
            <div
              key={member.name}
              ref={(el) => { cardRefs.current[index] = el }}
              className={`transition-all duration-700 ${
                visibleCards.has(index)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <Card className="bg-card/50 border-border hover:border-primary/50 transition-all duration-300 group overflow-hidden card-glow">
                <CardContent className="p-6">
                  {/* Avatar Placeholder */}
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                    <span className="text-3xl font-bold text-foreground">
                      {member.name.split(" ").map((n) => n[0]).join("")}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-foreground mb-1">
                      {member.name}
                    </h3>
                    <p className="text-sm text-primary font-medium mb-1">{member.role}</p>
                    <p className="text-xs text-muted-foreground mb-3">{member.department}</p>
                    <p className="text-sm text-muted-foreground mb-4">{member.bio}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap justify-center gap-2 mb-4">
                      {member.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Social Links */}
                    <div className="flex justify-center gap-3">
                      <button className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
                        <Github className="h-4 w-4" />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
                        <Linkedin className="h-4 w-4" />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
                        <Mail className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Advisors */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-8">Our Advisors</h2>
          <div className="flex flex-wrap justify-center gap-6">
            {advisors.map((advisor) => (
              <Card key={advisor.name} className="bg-card/30 border-border w-72 card-glow">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <span className="text-xl font-bold text-foreground">
                      {advisor.name.split(" ").map((n) => n[0]).join("")}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{advisor.name}</h3>
                  <p className="text-sm text-primary">{advisor.role}</p>
                  <p className="text-xs text-muted-foreground">{advisor.institution}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
