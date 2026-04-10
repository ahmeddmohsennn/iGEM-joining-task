"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"

/* ─── Slider card data ─────────────────────────────────────────────── */
const sliderCards = [
  {
    id: 1,
    emoji: "🧬",
    tag: "Synthetic Biology",
    title: "AND-Gate Circuit",
    desc: "Dual-input genetic AND-gate detects C. acnes SCFA biomarkers and anaerobic conditions simultaneously — eliminating false positives.",
  },
  {
    id: 2,
    emoji: "🔬",
    tag: "Wet Lab",
    title: "Chitosan Bandage",
    desc: "Genipin-crosslinked chitosan hydrogel maintains >85% bacterial viability over 72 hours while permitting biomarker diffusion.",
  },
  {
    id: 3,
    emoji: "💻",
    tag: "Dry Lab",
    title: "ODE Circuit Model",
    desc: "Validated ODE system predicts reporter accumulation dynamics and guides optimal HMF co-inducer concentration selection.",
  },
  {
    id: 4,
    emoji: "🌍",
    tag: "Human Practices",
    title: "Clinical Co-Design",
    desc: "60+ surgeons and infection control nurses shaped detection thresholds and bandage usability through iterative co-design workshops.",
  },
  {
    id: 5,
    emoji: "🏆",
    tag: "Achievement",
    title: "Gold Medal Track",
    desc: "Integrated human practices, validated biosensor circuit, and chitosan encapsulation proof-of-concept completed.",
  },
  {
    id: 6,
    emoji: "📊",
    tag: "Results",
    title: "4–6 h Detection",
    desc: "Colorimetric readout visible to the naked eye within 4–6 hours of C. acnes inoculation — 48 hours faster than culture.",
  },
  {
    id: 7,
    emoji: "🤝",
    tag: "Collaboration",
    title: "Multi-team Network",
    desc: "Cross-lab reproducibility study with iGEM teams specialising in biosensors and biomaterials across 4 countries.",
  },
  {
    id: 8,
    emoji: "🚀",
    tag: "Innovation",
    title: "BioBrick Registry",
    desc: "Submitted 5 new characterised parts: AND-gate promoters, HMF-responsive element, and LacZ secretion construct.",
  },
]

const footerLinks = {
  project: [
    { label: "Overview", href: "#overview" },
    { label: "Solution", href: "#project" },
    { label: "Experiments", href: "#experiments" },
    { label: "Results", href: "#results" },
  ],
  resources: [
    { label: "Documentation", href: "#" },
    { label: "Protocols", href: "#" },
    { label: "Parts Registry", href: "#" },
    { label: "Notebook", href: "#" },
  ],
  team: [
    { label: "Members", href: "#" },
    { label: "Attributions", href: "#" },
    { label: "Sponsors", href: "#" },
    { label: "Contact", href: "#" },
  ],
}

/* ─── Card width + gap constants ────────────────────────────────────── */
const CARD_W = 248   // px  (keep in sync with SliderCard width)
const CARD_GAP = 16    // px
const CARD_STEP = CARD_W + CARD_GAP
// full belt = 8 cards * step — that's how far the marquee translates before reset
const BELT_W = sliderCards.length * CARD_STEP

/* ─── Particle canvas ──────────────────────────────────────────────── */
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }
    resize()
    window.addEventListener("resize", resize)

    const W = () => canvas.offsetWidth
    const H = () => canvas.offsetHeight

    const pts = Array.from({ length: 40 }, () => ({
      x: Math.random() * W(),
      y: Math.random() * H(),
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.8 + 0.6,
    }))

    let raf: number
    const draw = () => {
      ctx.clearRect(0, 0, W(), H())
      pts.forEach((p, i) => {
        pts.slice(i + 1).forEach((q) => {
          const d = Math.hypot(p.x - q.x, p.y - q.y)
          if (d < 140) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(80,110,255,${0.1 * (1 - d / 140)})`
            ctx.lineWidth = 0.7
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(q.x, q.y)
            ctx.stroke()
          }
        })
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 3)
        g.addColorStop(0, "rgba(0,200,255,0.75)")
        g.addColorStop(1, "rgba(0,80,255,0)")
        ctx.beginPath()
        ctx.fillStyle = g
        ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2)
        ctx.fill()
        p.x += p.vx; p.y += p.vy
        if (p.x < 0 || p.x > W()) p.vx *= -1
        if (p.y < 0 || p.y > H()) p.vy *= -1
      })
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { window.removeEventListener("resize", resize); cancelAnimationFrame(raf) }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.45 }}
    />
  )
}

/* ─── Marquee slider  ───────────────────────────────────────────────── */
function HighlightSlider() {
  const beltRef = useRef<HTMLDivElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)

  // drag state
  const dragging = useRef(false)
  const startX = useRef(0)
  const dragOff = useRef(0)      // accumulated drag offset (px)
  const pausedAt = useRef(0)      // computedStyle translateX at pause moment

  // pause / resume the CSS animation
  const pause = () => { if (beltRef.current) beltRef.current.style.animationPlayState = "paused" }
  const resume = () => { if (beltRef.current) beltRef.current.style.animationPlayState = "running" }

  const onMouseDown = (e: React.MouseEvent) => {
    dragging.current = true
    startX.current = e.clientX
    dragOff.current = 0
    pause()
    // read current translate so we can offset from there
    const mat = new DOMMatrix(getComputedStyle(beltRef.current!).transform)
    pausedAt.current = mat.m41  // translateX in px
    if (wrapRef.current) wrapRef.current.style.cursor = "grabbing"
  }

  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragging.current || !beltRef.current) return
    e.preventDefault()
    dragOff.current = e.clientX - startX.current
    // apply drag offset on top of paused position, wrap within belt
    let nx = pausedAt.current + dragOff.current
    // keep within [-BELT_W, 0] visually — modulo wrap
    nx = ((nx % BELT_W) - BELT_W) % BELT_W
    // use animation-delay trick: set delay so the animation "starts" from here
    const dur = parseFloat(getComputedStyle(beltRef.current).animationDuration) || 36
    const fraction = Math.abs(nx) / BELT_W          // 0–1
    beltRef.current.style.animationDelay = `-${fraction * dur}s`
    beltRef.current.style.transform = `translateX(${nx}px)`
  }

  const endDrag = () => {
    if (!dragging.current) return
    dragging.current = false
    if (wrapRef.current) wrapRef.current.style.cursor = "grab"
    if (beltRef.current) {
      // commit the new delay so animation resumes from the dragged position
      beltRef.current.style.animationPlayState = "running"
    }
  }

  // Touch
  const onTouchStart = (e: React.TouchEvent) => {
    dragging.current = true
    startX.current = e.touches[0].clientX
    dragOff.current = 0
    pause()
    const mat = new DOMMatrix(getComputedStyle(beltRef.current!).transform)
    pausedAt.current = mat.m41
  }
  const onTouchMove = (e: React.TouchEvent) => {
    if (!dragging.current || !beltRef.current) return
    dragOff.current = e.touches[0].clientX - startX.current
    let nx = pausedAt.current + dragOff.current
    nx = ((nx % BELT_W) - BELT_W) % BELT_W
    const dur = parseFloat(getComputedStyle(beltRef.current).animationDuration) || 36
    const fraction = Math.abs(nx) / BELT_W
    beltRef.current.style.animationDelay = `-${fraction * dur}s`
    beltRef.current.style.transform = `translateX(${nx}px)`
  }
  const endTouch = () => { dragging.current = false; resume() }

  return (
    <div style={{ flex: 1, minWidth: 0 }}>
      {/* Label */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
        <div style={{
          width: 6, height: 6, borderRadius: "50%",
          background: "linear-gradient(135deg, oklch(0.55 0.25 260), oklch(0.72 0.18 195))",
          boxShadow: "0 0 8px oklch(0.72 0.18 195 / 0.8)",
          animation: "dotPulse 2s ease-in-out infinite",
        }} />
        <span style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "oklch(0.72 0.18 195)" }}>
          Project Highlights
        </span>
      </div>

      {/* Overflow mask */}
      <div
        ref={wrapRef}
        style={{ overflow: "hidden", cursor: "grab", position: "relative" }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={endDrag}
        onMouseLeave={endDrag}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={endTouch}
      >
        {/* Edge fade masks */}
        <div aria-hidden style={{
          position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none",
          background: "linear-gradient(to right, oklch(0.02 0 0) 0%, transparent 8%, transparent 92%, oklch(0.02 0 0) 100%)",
        }} />

        {/* The infinitely-moving belt — triple cards for seamless looping */}
        <div
          ref={beltRef}
          style={{
            display: "flex",
            gap: CARD_GAP,
            width: "max-content",
            animation: `marqueeScroll 36s linear infinite`,
            willChange: "transform",
            paddingBottom: 4,
          }}
        >
          {[...sliderCards, ...sliderCards, ...sliderCards].map((card, i) => (
            <SliderCard key={`${card.id}-${i}`} card={card} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marqueeScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-${BELT_W}px); }
        }
        @keyframes dotPulse {
          0%,100% { opacity:0.7; transform:scale(1);   }
          50%      { opacity:1;   transform:scale(1.4); }
        }
      `}</style>
    </div>
  )
}

function SliderCard({ card }: { card: typeof sliderCards[0] }) {
  return (
    <div
      style={{
        flexShrink: 0,
        width: CARD_W,
        padding: "20px 20px 18px",
        borderRadius: 14,
        background: "oklch(0.06 0 0 / 0.85)",
        border: "1px solid oklch(0.18 0 0)",
        backdropFilter: "blur(12px)",
        display: "flex",
        flexDirection: "column",
        gap: 10,
        transition: "border-color 0.3s, box-shadow 0.3s, transform 0.25s",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement
        el.style.borderColor = "oklch(0.55 0.25 260 / 0.5)"
        el.style.boxShadow = "0 0 20px 2px oklch(0.55 0.25 260 / 0.12), 0 0 40px 4px oklch(0.72 0.18 195 / 0.07)"
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement
        el.style.borderColor = "oklch(0.18 0 0)"
        el.style.boxShadow = "none"
      }}
    >
      <span style={{ fontSize: 26, lineHeight: 1 }}>{card.emoji}</span>
      <span style={{
        fontSize: 10, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase",
        color: "oklch(0.72 0.18 195)", padding: "2px 8px", borderRadius: 99,
        background: "oklch(0.72 0.18 195 / 0.1)", border: "1px solid oklch(0.72 0.18 195 / 0.2)",
        alignSelf: "flex-start",
      }}>
        {card.tag}
      </span>
      <p style={{ fontSize: 14, fontWeight: 600, color: "oklch(0.92 0 0)", margin: 0, lineHeight: 1.3 }}>
        {card.title}
      </p>
      <p style={{ fontSize: 12, color: "oklch(0.54 0 0)", margin: 0, lineHeight: 1.55 }}>
        {card.desc}
      </p>
    </div>
  )
}

/* ─── Side panel (beside slider) — mission + stats ──────────────────── */
function MissionPanel() {
  return (
    <div style={{
      width: 220, flexShrink: 0,
      display: "flex", flexDirection: "column", gap: 24,
      justifyContent: "center",
    }}>
      {/* DNA SVG accent */}
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg"
        style={{ filter: "drop-shadow(0 0 8px oklch(0.72 0.18 195 / 0.6))" }}>
        <circle cx="22" cy="22" r="20" stroke="url(#mpg)" strokeWidth="1.5" />
        <polygon points="22,6 38,16 38,32 22,40 6,32 6,16"
          stroke="oklch(0.72 0.18 195)" strokeWidth="1" fill="none" />
        <circle cx="22" cy="22" r="5" fill="url(#mpg)" />
        <defs>
          <linearGradient id="mpg" x1="2" y1="2" x2="42" y2="42" gradientUnits="userSpaceOnUse">
            <stop stopColor="oklch(0.55 0.25 260)" />
            <stop offset="1" stopColor="oklch(0.72 0.18 195)" />
          </linearGradient>
        </defs>
      </svg>

      {/* Mission text */}
      <div>
        <p style={{
          fontSize: 13, fontWeight: 600, color: "oklch(0.85 0 0)",
          margin: "0 0 8px", lineHeight: 1.4,
        }}>
          Detecting C. acnes SSI — at the Bedside
        </p>
        <p style={{ fontSize: 11, color: "oklch(0.45 0 0)", margin: 0, lineHeight: 1.65 }}>
          We engineer a smart genetic circuit embedded in a chitosan bandage
          to detect post-surgical C. acnes infections 48 hours earlier than culture.
        </p>
      </div>

      {/* Key stats */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {[
          { val: "4–6h", label: "Detection Speed", color: "oklch(0.55 0.25 260)" },
          { val: "5", label: "BioBricks", color: "oklch(0.72 0.18 195)" },
          { val: "3.8×", label: "Circuit Induction", color: "oklch(0.55 0.25 260)" },
          { val: "2026", label: "iGEM Season", color: "oklch(0.72 0.18 195)" },
        ].map((s) => (
          <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 3, height: 28, borderRadius: 2, flexShrink: 0,
              background: s.color,
              boxShadow: `0 0 8px ${s.color} / 0.5`,
            }} />
            <div>
              <div style={{
                fontSize: 16, fontWeight: 700,
                background: `linear-gradient(90deg, ${s.color}, oklch(0.72 0.18 195))`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                lineHeight: 1.1,
              }}>{s.val}</div>
              <div style={{ fontSize: 10, color: "oklch(0.45 0 0)", marginTop: 1 }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── Root Footer ───────────────────────────────────────────────────── */
export function Footer() {
  return (
    <footer style={{ position: "relative", borderTop: "1px solid oklch(0.12 0 0)", overflow: "hidden" }}>
      <ParticleCanvas />

      {/* Ambient glows */}
      <div aria-hidden style={{
        position: "absolute", top: "20%", left: "15%",
        width: 500, height: 300, borderRadius: "50%",
        background: "radial-gradient(ellipse, oklch(0.55 0.25 260 / 0.07) 0%, transparent 70%)",
        filter: "blur(40px)", pointerEvents: "none",
      }} />
      <div aria-hidden style={{
        position: "absolute", bottom: "10%", right: "10%",
        width: 400, height: 240, borderRadius: "50%",
        background: "radial-gradient(ellipse, oklch(0.72 0.18 195 / 0.06) 0%, transparent 70%)",
        filter: "blur(50px)", pointerEvents: "none",
      }} />

      <div style={{ position: "relative", zIndex: 1 }}>

        {/* ── TOP: Slider + Mission panel ── */}
        <div style={{
          borderBottom: "1px solid oklch(0.1 0 0)",
          padding: "40px 32px",
          display: "flex",
          gap: 32,
          alignItems: "center",
        }}>
          {/* Slider ~80% */}
          <HighlightSlider />

          {/* Separator */}
          <div style={{
            width: 1, alignSelf: "stretch", flexShrink: 0,
            background: "linear-gradient(to bottom, transparent, oklch(0.18 0 0) 20%, oklch(0.18 0 0) 80%, transparent)",
          }} />

          {/* Mission / stats side */}
          <MissionPanel />
        </div>

        {/* ── MIDDLE: Link columns ── */}
        <div style={{
          borderBottom: "1px solid oklch(0.1 0 0)",
          padding: "36px 32px",
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1fr",
          gap: 40,
          alignItems: "flex-start",
        }}>
          {/* Brand blurb */}
          <div>
            <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none", marginBottom: 12 }}>
              <div style={{
                width: 32, height: 32, borderRadius: 9,
                background: "linear-gradient(135deg, oklch(0.55 0.25 260), oklch(0.72 0.18 195))",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 0 12px oklch(0.55 0.25 260 / 0.4)",
              }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>B</span>
              </div>
              <span style={{ fontSize: 15, fontWeight: 600, color: "oklch(0.9 0 0)" }}>BioSynth</span>
            </Link>
            <p style={{ fontSize: 12, color: "oklch(0.45 0 0)", lineHeight: 1.65, margin: 0, maxWidth: 260 }}>
              Engineering biology for a sustainable future through synthetic biology and innovation.
              iGEM 2026 Competition entry.
            </p>
            {/* Social icons */}
            {/* <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
              {[
                { icon: "🌐", label: "iGEM", href: "https://igem.org" },
                { icon: "📄", label: "GitHub", href: "#" },
                { icon: "✉️", label: "Email", href: "#" },
              ].map((l) => (
                <a key={l.label} href={l.href} target="_blank" rel="noreferrer" title={l.label}
                  style={{
                    width: 32, height: 32, borderRadius: 8, fontSize: 14,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: "oklch(0.1 0 0)", border: "1px solid oklch(0.18 0 0)",
                    textDecoration: "none", transition: "border-color 0.25s, background 0.25s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "oklch(0.55 0.25 260 / 0.5)"
                      ; (e.currentTarget as HTMLAnchorElement).style.background = "oklch(0.12 0 0)"
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "oklch(0.18 0 0)"
                      ; (e.currentTarget as HTMLAnchorElement).style.background = "oklch(0.1 0 0)"
                  }}
                >
                  {l.icon}
                </a>
              ))}
            </div> */}
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h3 style={{
                fontSize: 10, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase",
                color: "oklch(0.5 0 0)", marginBottom: 14, marginTop: 0,
              }}>
                {group}
              </h3>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                {links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href}
                      style={{ fontSize: 12, color: "oklch(0.48 0 0)", textDecoration: "none", transition: "color 0.2s" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "oklch(0.9 0 0)")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "oklch(0.48 0 0)")}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── BOTTOM: copyright bar ── */}
        <div style={{
          padding: "16px 32px",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 10,
        }}>
          <span style={{ fontSize: 12, color: "oklch(0.35 0 0)" }}>
            © {new Date().getFullYear()} BioSynth iGEM Team. Built for the iGEM Competition.
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <a href="https://igem.org" target="_blank" rel="noreferrer"
              style={{ fontSize: 12, color: "oklch(0.4 0 0)", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "oklch(0.8 0 0)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "oklch(0.4 0 0)")}
            >
              iGEM Foundation
            </a>
            <a href="#"
              style={{ fontSize: 12, color: "oklch(0.4 0 0)", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "oklch(0.8 0 0)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "oklch(0.4 0 0)")}
            >
              Privacy Policy
            </a>
          </div>
        </div>

      </div>
    </footer>
  )
}
