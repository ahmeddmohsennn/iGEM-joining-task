"use client"

import { HeaderNavbar } from "@/components/header-navbar"
import { Scroll3DScene } from "@/components/scroll-3d-scene"

interface PageLayoutProps {
  children: React.ReactNode
}

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <HeaderNavbar />
      <main className="relative">
        <Scroll3DScene />
        <div className="relative z-20">
          {children}
        </div>
      </main>
    </div>
  )
}
