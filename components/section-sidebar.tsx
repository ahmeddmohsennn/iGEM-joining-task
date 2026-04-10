"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { 
  Sparkles,
  AlertTriangle,
  Lightbulb,
  Cog,
  FlaskConical,
  BarChart3,
  Rocket,
  ChevronLeft,
  ChevronRight
} from "lucide-react"

const sections = [
  { id: "hero", label: "Overview", icon: Sparkles },
  { id: "problem", label: "The Problem", icon: AlertTriangle },
  { id: "solution", label: "Our Solution", icon: Lightbulb },
  { id: "how-it-works", label: "How It Works", icon: Cog },
  { id: "experiments", label: "Experiments", icon: FlaskConical },
  { id: "results", label: "Results", icon: BarChart3 },
  { id: "cta", label: "Get Involved", icon: Rocket },
]

export function SectionSidebar() {
  const [activeSection, setActiveSection] = useState("hero")
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024
      setIsMobile(mobile)
      if (mobile) {
        setIsCollapsed(true)
      }
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i].id)
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 80
      const elementPosition = element.offsetTop - offset
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth"
      })
    }
  }

  if (isMobile) {
    return (
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40">
        <div className="flex items-center gap-1 px-2 py-2 bg-background/80 backdrop-blur-xl border border-border rounded-full shadow-lg">
          {sections.map((section) => {
            const isActive = activeSection === section.id
            const Icon = section.icon
            return (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={cn(
                  "p-2 rounded-full transition-all duration-200",
                  isActive 
                    ? "bg-gradient-to-r from-primary to-accent text-primary-foreground" 
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
                title={section.label}
              >
                <Icon className="h-4 w-4" />
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <aside
      className={cn(
        "fixed left-0 top-1/2 -translate-y-1/2 z-40 transition-all duration-300",
        isCollapsed ? "w-14" : "w-48"
      )}
    >
      <div className="bg-background/80 backdrop-blur-xl border border-border border-l-0 rounded-r-2xl shadow-lg overflow-hidden">
        {/* Section Links */}
        <nav className="p-2 space-y-1">
          {sections.map((section) => {
            const isActive = activeSection === section.id
            const Icon = section.icon
            return (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 text-left",
                  "hover:bg-muted/50",
                  isActive && "bg-gradient-to-r from-primary/20 to-accent/20 text-foreground",
                  !isActive && "text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon className={cn("h-4 w-4 shrink-0", isActive && "text-primary")} />
                {!isCollapsed && (
                  <span className="text-sm font-medium truncate">{section.label}</span>
                )}
                {isActive && !isCollapsed && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                )}
              </button>
            )
          })}
        </nav>

        {/* Collapse Toggle */}
        <div className="p-2 border-t border-border">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <>
                <ChevronLeft className="h-4 w-4" />
                <span className="text-xs">Collapse</span>
              </>
            )}
          </button>
        </div>
      </div>
    </aside>
  )
}
