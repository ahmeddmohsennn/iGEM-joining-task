"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { 
  Users, 
  Lightbulb, 
  FlaskConical, 
  Cpu, 
  Heart,
  ChevronLeft,
  ChevronRight,
  Home
} from "lucide-react"

const navLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/team", label: "Team Members", icon: Users },
  { href: "/project", label: "Project", icon: Lightbulb },
  { href: "/wet-lab", label: "Wet Lab", icon: FlaskConical },
  { href: "/dry-lab", label: "Dry Lab", icon: Cpu },
  { href: "/human-practices", label: "Human Practices", icon: Heart },
]

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth < 768) {
        setIsCollapsed(true)
      }
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-4 border-b border-border">
        <Link href="/" className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0">
            <span className="text-lg font-bold text-primary-foreground">B</span>
          </div>
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-foreground">BioSynth</span>
              <span className="text-xs text-muted-foreground">iGEM 2026</span>
            </div>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navLinks.map((link) => {
          const isActive = pathname === link.href
          const Icon = link.icon
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => isMobile && setIsMobileOpen(false)}
              className={cn(
                "flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200",
                "hover:bg-muted/50",
                isActive && "bg-gradient-to-r from-primary/20 to-accent/20 text-foreground",
                !isActive && "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className={cn("h-5 w-5 shrink-0", isActive && "text-primary")} />
              {!isCollapsed && (
                <span className="text-sm font-medium">{link.label}</span>
              )}
              {isActive && !isCollapsed && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
              )}
            </Link>
          )
        })}
      </nav>

      {/* Collapse Toggle (Desktop only) */}
      {!isMobile && (
        <div className="p-4 border-t border-border">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
          >
            {isCollapsed ? (
              <ChevronRight className="h-5 w-5" />
            ) : (
              <>
                <ChevronLeft className="h-5 w-5" />
                <span className="text-sm">Collapse</span>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  )

  return (
    <>
      {/* Mobile Toggle Button */}
      {isMobile && (
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-background/80 backdrop-blur-xl border border-border text-foreground"
        >
          {isMobileOpen ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
        </button>
      )}

      {/* Mobile Overlay */}
      {isMobile && isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 h-screen bg-background/80 backdrop-blur-xl border-r border-border z-40 transition-all duration-300",
          isCollapsed ? "w-20" : "w-64",
          isMobile && !isMobileOpen && "-translate-x-full",
          isMobile && isMobileOpen && "translate-x-0"
        )}
      >
        {sidebarContent}
      </aside>

      {/* Spacer for content */}
      {!isMobile && (
        <div className={cn("shrink-0 transition-all duration-300", isCollapsed ? "w-20" : "w-64")} />
      )}
    </>
  )
}
