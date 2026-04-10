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
  Home,
  Menu,
  X
} from "lucide-react"

const navLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/team", label: "Team Members", icon: Users },
  { href: "/project", label: "Project", icon: Lightbulb },
  { href: "/wet-lab", label: "Wet Lab", icon: FlaskConical },
  { href: "/dry-lab", label: "Dry Lab", icon: Cpu },
  { href: "/human-practices", label: "Human Practices", icon: Heart },
]

export function HeaderNavbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled 
            ? "bg-background/80 backdrop-blur-xl border-b border-border" 
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0">
                <span className="text-lg font-bold text-primary-foreground">B</span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-semibold text-foreground">BioSynth</span>
                <span className="text-xs text-muted-foreground">iGEM 2026</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href
                const Icon = link.icon
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200",
                      "hover:bg-muted/50",
                      isActive && "bg-gradient-to-r from-primary/20 to-accent/20 text-foreground",
                      !isActive && "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <Icon className={cn("h-4 w-4 shrink-0", isActive && "text-primary")} />
                    <span className="text-sm font-medium">{link.label}</span>
                  </Link>
                )
              })}
            </nav>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="md:hidden p-2 rounded-lg text-foreground hover:bg-muted/50 transition-colors"
            >
              {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileOpen && (
          <div className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border">
            <nav className="px-4 py-4 space-y-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href
                const Icon = link.icon
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                      "hover:bg-muted/50",
                      isActive && "bg-gradient-to-r from-primary/20 to-accent/20 text-foreground",
                      !isActive && "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <Icon className={cn("h-5 w-5 shrink-0", isActive && "text-primary")} />
                    <span className="text-sm font-medium">{link.label}</span>
                    {isActive && (
                      <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
                    )}
                  </Link>
                )
              })}
            </nav>
          </div>
        )}
      </header>

      {/* Spacer */}
      <div className="h-16" />
    </>
  )
}
