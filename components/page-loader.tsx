"use client"

import { useEffect, useRef, useState } from "react"

export function PageLoader() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [visible, setVisible] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth * window.devicePixelRatio
      canvas.height = window.innerHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }
    resize()
    window.addEventListener("resize", resize)

    const W = () => window.innerWidth
    const H = () => window.innerHeight

    const particles: {
      x: number; y: number; z: number
      vx: number; vy: number; vz: number
      size: number
    }[] = Array.from({ length: 80 }, () => ({
      x: Math.random() * W(),
      y: Math.random() * H(),
      z: Math.random(),
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      vz: (Math.random() - 0.5) * 0.003,
      size: Math.random() * 2 + 0.5,
    }))

    let raf: number
    const animate = () => {
      ctx.clearRect(0, 0, W(), H())

      particles.forEach((p, i) => {
        const scale = 0.5 + p.z * 0.5
        const r = p.size * scale

        // connections
        particles.slice(i + 1).forEach((p2) => {
          const dx = p.x - p2.x, dy = p.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 160) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(100,120,255,${0.12 * (1 - dist / 160) * scale})`
            ctx.lineWidth = 0.6
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
          }
        })

        // glow dot
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 3)
        g.addColorStop(0, `rgba(0,214,255,${0.9 * scale})`)
        g.addColorStop(1, "rgba(0,80,255,0)")
        ctx.beginPath()
        ctx.fillStyle = g
        ctx.arc(p.x, p.y, r * 3, 0, Math.PI * 2)
        ctx.fill()

        p.x += p.vx; p.y += p.vy; p.z += p.vz
        if (p.x < 0 || p.x > W()) p.vx *= -1
        if (p.y < 0 || p.y > H()) p.vy *= -1
        if (p.z < 0 || p.z > 1) p.vz *= -1
      })

      raf = requestAnimationFrame(animate)
    }
    animate()

    const fadeTimer = setTimeout(() => setFadeOut(true), 2400)
    const hideTimer = setTimeout(() => setVisible(false), 3000)

    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(raf)
      clearTimeout(fadeTimer)
      clearTimeout(hideTimer)
    }
  }, [])

  if (!visible) return null

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "oklch(0.02 0 0)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        transition: "opacity 0.55s ease, transform 0.55s ease",
        opacity: fadeOut ? 0 : 1,
        transform: fadeOut ? "scale(1.04)" : "scale(1)",
        pointerEvents: fadeOut ? "none" : "all",
      }}
    >
      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.55 }}
      />

      {/* Ambient glows */}
      <div style={{
        position: "absolute", top: "30%", left: "50%", transform: "translateX(-50%)",
        width: 600, height: 600, borderRadius: "50%",
        background: "radial-gradient(circle, oklch(0.55 0.25 260 / 0.12) 0%, transparent 70%)",
        filter: "blur(60px)",
      }} />
      <div style={{
        position: "absolute", bottom: "20%", left: "30%",
        width: 400, height: 400, borderRadius: "50%",
        background: "radial-gradient(circle, oklch(0.72 0.18 195 / 0.10) 0%, transparent 70%)",
        filter: "blur(70px)",
      }} />

      {/* ── 3-D floating shapes ── */}
      <FloatingShapes />

      {/* Centre logo + progress */}
      <div style={{ position: "relative", zIndex: 10, textAlign: "center", userSelect: "none" }}>
        {/* DNA helix icon */}
        <LoaderIcon />

        <p style={{
          marginTop: 20,
          fontSize: 13,
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          color: "oklch(0.6 0 0)",
          fontFamily: "var(--font-inter, Inter, system-ui, sans-serif)",
        }}>
          BioSynth · iGEM 2026
        </p>

        {/* Slim progress bar */}
        <div style={{
          marginTop: 18,
          width: 160,
          height: 2,
          borderRadius: 99,
          background: "oklch(0.15 0 0)",
          overflow: "hidden",
          marginInline: "auto",
        }}>
          <div style={{
            height: "100%",
            borderRadius: 99,
            background: "linear-gradient(to right, oklch(0.55 0.25 260), oklch(0.72 0.18 195))",
            animation: "loaderBar 2.5s cubic-bezier(0.4,0,0.2,1) forwards",
          }} />
        </div>
      </div>

      {/* Keyframe injection */}
      <style>{`
        @keyframes loaderBar {
          from { width: 0%; }
          to   { width: 100%; }
        }
        @keyframes floatA {
          0%,100% { transform: translateY(0px)   rotateX(0deg)   rotateY(0deg)   rotateZ(0deg); }
          50%      { transform: translateY(-22px) rotateX(180deg) rotateY(90deg)  rotateZ(30deg); }
        }
        @keyframes floatB {
          0%,100% { transform: translateY(0px)   rotateX(0deg)   rotateY(0deg)   rotateZ(0deg); }
          50%      { transform: translateY(18px)  rotateX(-120deg) rotateY(150deg) rotateZ(-20deg); }
        }
        @keyframes floatC {
          0%,100% { transform: translateY(0px)   rotateX(0deg)   rotateY(0deg)   rotateZ(0deg); }
          33%      { transform: translateY(-14px) rotateX(60deg)  rotateY(-90deg) rotateZ(45deg); }
          66%      { transform: translateY(10px)  rotateX(-30deg) rotateY(200deg) rotateZ(-15deg); }
        }
        @keyframes spinRing {
          from { transform: rotateX(70deg) rotateZ(0deg); }
          to   { transform: rotateX(70deg) rotateZ(360deg); }
        }
        @keyframes pulseGlow {
          0%,100% { opacity: 0.6; transform: scale(1); }
          50%      { opacity: 1;   transform: scale(1.12); }
        }
        @keyframes dnaRotate {
          from { transform: rotateZ(0deg); }
          to   { transform: rotateZ(360deg); }
        }
      `}</style>
    </div>
  )
}

/* ─── Floating 3-D shapes ─────────────────────────────────────────── */
function FloatingShapes() {
  return (
    <div style={{ position: "absolute", inset: 0, perspective: "900px", overflow: "hidden", pointerEvents: "none" }}>

      {/* Top-left tetrahedron */}
      <div style={{
        position: "absolute", top: "12%", left: "8%",
        width: 52, height: 52,
        animation: "floatA 6s ease-in-out infinite",
        transformStyle: "preserve-3d",
      }}>
        <svg viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: "drop-shadow(0 0 8px oklch(0.55 0.25 260 / 0.7))" }}>
          <polygon points="26,2 50,46 2,46" stroke="oklch(0.55 0.25 260)" strokeWidth="1.5" fill="oklch(0.55 0.25 260 / 0.06)" />
          <line x1="26" y1="2" x2="26" y2="46" stroke="oklch(0.72 0.18 195)" strokeWidth="0.8" strokeDasharray="3 3" />
        </svg>
      </div>

      {/* Top-right octahedron */}
      <div style={{
        position: "absolute", top: "8%", right: "10%",
        width: 44, height: 44,
        animation: "floatB 7s ease-in-out infinite 1s",
        transformStyle: "preserve-3d",
      }}>
        <svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: "drop-shadow(0 0 10px oklch(0.72 0.18 195 / 0.6))" }}>
          <polygon points="22,2 42,22 22,42 2,22" stroke="oklch(0.72 0.18 195)" strokeWidth="1.5" fill="oklch(0.72 0.18 195 / 0.06)" />
          <line x1="2" y1="22" x2="42" y2="22" stroke="oklch(0.55 0.25 260)" strokeWidth="0.8" strokeDasharray="3 3" />
          <line x1="22" y1="2" x2="22" y2="42" stroke="oklch(0.55 0.25 260)" strokeWidth="0.8" strokeDasharray="3 3" />
        </svg>
      </div>

      {/* Bottom-left cube wireframe */}
      <div style={{
        position: "absolute", bottom: "16%", left: "6%",
        width: 40, height: 40,
        animation: "floatC 8s ease-in-out infinite 0.5s",
        transformStyle: "preserve-3d",
      }}>
        <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: "drop-shadow(0 0 8px oklch(0.55 0.25 260 / 0.55))" }}>
          <rect x="4" y="4" width="24" height="24" stroke="oklch(0.55 0.25 260)" strokeWidth="1.2" fill="none" />
          <rect x="12" y="12" width="24" height="24" stroke="oklch(0.72 0.18 195)" strokeWidth="1.2" fill="none" />
          <line x1="4" y1="4" x2="12" y2="12" stroke="oklch(0.72 0.18 195)" strokeWidth="0.8" />
          <line x1="28" y1="4" x2="36" y2="12" stroke="oklch(0.72 0.18 195)" strokeWidth="0.8" />
          <line x1="4" y1="28" x2="12" y2="36" stroke="oklch(0.72 0.18 195)" strokeWidth="0.8" />
          <line x1="28" y1="28" x2="36" y2="36" stroke="oklch(0.72 0.18 195)" strokeWidth="0.8" />
        </svg>
      </div>

      {/* Bottom-right hexagon */}
      <div style={{
        position: "absolute", bottom: "12%", right: "8%",
        width: 50, height: 50,
        animation: "floatA 9s ease-in-out infinite 2s",
        transformStyle: "preserve-3d",
      }}>
        <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: "drop-shadow(0 0 10px oklch(0.72 0.18 195 / 0.5))" }}>
          <polygon points="25,2 48,13.5 48,36.5 25,48 2,36.5 2,13.5" stroke="oklch(0.72 0.18 195)" strokeWidth="1.5" fill="oklch(0.72 0.18 195 / 0.05)" />
          <circle cx="25" cy="25" r="8" stroke="oklch(0.55 0.25 260)" strokeWidth="0.8" fill="none" strokeDasharray="2 4" />
        </svg>
      </div>

      {/* Centre-left small diamond */}
      <div style={{
        position: "absolute", top: "45%", left: "4%",
        width: 28, height: 28,
        animation: "floatB 5s ease-in-out infinite 1.5s",
        transformStyle: "preserve-3d",
      }}>
        <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: "drop-shadow(0 0 6px oklch(0.55 0.25 260 / 0.8))" }}>
          <polygon points="14,1 27,14 14,27 1,14" stroke="oklch(0.55 0.25 260)" strokeWidth="1.5" fill="oklch(0.55 0.25 260 / 0.1)" />
        </svg>
      </div>

      {/* Centre-right small triangle */}
      <div style={{
        position: "absolute", top: "55%", right: "5%",
        width: 30, height: 30,
        animation: "floatC 7s ease-in-out infinite 3s",
        transformStyle: "preserve-3d",
      }}>
        <svg viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: "drop-shadow(0 0 6px oklch(0.72 0.18 195 / 0.8))" }}>
          <polygon points="15,1 29,28 1,28" stroke="oklch(0.72 0.18 195)" strokeWidth="1.5" fill="oklch(0.72 0.18 195 / 0.08)" />
        </svg>
      </div>

      {/* Orbital ring */}
      <div style={{
        position: "absolute", top: "18%", right: "22%",
        width: 60, height: 60,
        animation: "spinRing 4s linear infinite",
        transformStyle: "preserve-3d",
        opacity: 0.5,
      }}>
        <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="30" cy="30" rx="28" ry="11" stroke="oklch(0.72 0.18 195)" strokeWidth="1" />
          <circle cx="30" cy="30" r="4" fill="oklch(0.55 0.25 260)" opacity="0.7" />
        </svg>
      </div>

      {/* Bottom orbital ring */}
      <div style={{
        position: "absolute", bottom: "22%", left: "20%",
        width: 50, height: 50,
        animation: "spinRing 5s linear infinite reverse",
        transformStyle: "preserve-3d",
        opacity: 0.4,
      }}>
        <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="25" cy="25" rx="23" ry="9" stroke="oklch(0.55 0.25 260)" strokeWidth="1" />
          <circle cx="25" cy="25" r="3.5" fill="oklch(0.72 0.18 195)" opacity="0.8" />
        </svg>
      </div>
    </div>
  )
}

/* ─── Animated DNA-ring centre icon ──────────────────────────────── */
function LoaderIcon() {
  return (
    <div style={{ position: "relative", width: 70, height: 70, margin: "0 auto", perspective: 400 }}>
      {/* Outer glow pulse */}
      <div style={{
        position: "absolute", inset: -12,
        borderRadius: "50%",
        background: "radial-gradient(circle, oklch(0.55 0.25 260 / 0.25), transparent 70%)",
        animation: "pulseGlow 1.4s ease-in-out infinite",
      }} />

      {/* Spinning 3-D ring */}
      <div style={{
        width: "100%", height: "100%",
        animation: "dnaRotate 2s linear infinite",
        transformStyle: "preserve-3d",
      }}>
        <svg viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Outer ring */}
          <circle cx="35" cy="35" r="30" stroke="url(#lg)" strokeWidth="2" />
          {/* Inner hexagon */}
          <polygon
            points="35,10 57,22.5 57,47.5 35,60 13,47.5 13,22.5"
            stroke="oklch(0.72 0.18 195)" strokeWidth="1.2" fill="none"
          />
          {/* Cross */}
          <line x1="35" y1="5" x2="35" y2="65" stroke="oklch(0.55 0.25 260 / 0.4)" strokeWidth="0.8" strokeDasharray="4 4" />
          <line x1="5" y1="35" x2="65" y2="35" stroke="oklch(0.55 0.25 260 / 0.4)" strokeWidth="0.8" strokeDasharray="4 4" />
          {/* Centre dot */}
          <circle cx="35" cy="35" r="5" fill="url(#lg2)" />
          <defs>
            <linearGradient id="lg" x1="5" y1="5" x2="65" y2="65" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="oklch(0.55 0.25 260)" />
              <stop offset="100%" stopColor="oklch(0.72 0.18 195)" />
            </linearGradient>
            <radialGradient id="lg2" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="oklch(0.72 0.18 195)" />
              <stop offset="100%" stopColor="oklch(0.55 0.25 260)" />
            </radialGradient>
          </defs>
        </svg>
      </div>
    </div>
  )
}
