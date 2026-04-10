"use client"

import { useRef, useEffect, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Float, Environment } from "@react-three/drei"
import * as THREE from "three"

function DNAHelix({ scrollProgress }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null)
  
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y = scrollProgress * Math.PI * 4
      groupRef.current.position.y = Math.sin(scrollProgress * Math.PI) * 0.5
    }
  })

  const helixPoints = []
  const helixPoints2 = []
  const numPoints = 20
  
  for (let i = 0; i < numPoints; i++) {
    const t = (i / numPoints) * Math.PI * 4
    const y = (i / numPoints) * 4 - 2
    helixPoints.push(new THREE.Vector3(Math.cos(t) * 0.5, y, Math.sin(t) * 0.5))
    helixPoints2.push(new THREE.Vector3(Math.cos(t + Math.PI) * 0.5, y, Math.sin(t + Math.PI) * 0.5))
  }

  return (
    <group ref={groupRef}>
      {helixPoints.map((point, i) => (
        <group key={i}>
          <mesh position={[point.x, point.y, point.z]}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial color="#0050FF" emissive="#0050FF" emissiveIntensity={0.5} />
          </mesh>
          <mesh position={[helixPoints2[i].x, helixPoints2[i].y, helixPoints2[i].z]}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial color="#00D6FF" emissive="#00D6FF" emissiveIntensity={0.5} />
          </mesh>
          {i % 2 === 0 && (
            <mesh position={[(point.x + helixPoints2[i].x) / 2, point.y, (point.z + helixPoints2[i].z) / 2]}>
              <cylinderGeometry args={[0.02, 0.02, 1, 8]} />
              <meshStandardMaterial color="#ffffff" opacity={0.3} transparent />
            </mesh>
          )}
        </group>
      ))}
    </group>
  )
}

function FloatingMolecule({ scrollProgress, position }: { scrollProgress: number; position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5 + scrollProgress * Math.PI
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.3
      meshRef.current.scale.setScalar(1 + Math.sin(scrollProgress * Math.PI * 2) * 0.2)
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position}>
        <icosahedronGeometry args={[0.3, 1]} />
        <meshStandardMaterial
          color="#0050FF"
          emissive="#0050FF"
          emissiveIntensity={0.5}
          roughness={0.2}
          metalness={0.8}
          wireframe
        />
      </mesh>
    </Float>
  )
}

function OrbitingParticles({ scrollProgress }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null)
  const particleCount = 50
  const particles = useRef<THREE.Vector3[]>([])
  
  if (particles.current.length === 0) {
    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI
      const r = 2 + Math.random() * 1.5
      particles.current.push(new THREE.Vector3(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
      ))
    }
  }

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1 + scrollProgress * Math.PI * 2
      groupRef.current.rotation.x = scrollProgress * 0.5
    }
  })

  return (
    <group ref={groupRef}>
      {particles.current.map((pos, i) => (
        <mesh key={i} position={[pos.x, pos.y, pos.z]}>
          <sphereGeometry args={[0.03 + Math.random() * 0.02, 8, 8]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? "#0050FF" : "#00D6FF"}
            emissive={i % 2 === 0 ? "#0050FF" : "#00D6FF"}
            emissiveIntensity={0.8}
          />
        </mesh>
      ))}
    </group>
  )
}

function Scene({ scrollProgress }: { scrollProgress: number }) {
  const { camera } = useThree()
  
  useEffect(() => {
    camera.position.set(0, 0, 5)
  }, [camera])

  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#0050FF" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00D6FF" />
      <spotLight position={[0, 5, 0]} intensity={0.5} angle={0.5} penumbra={1} color="#ffffff" />
      
      <DNAHelix scrollProgress={scrollProgress} />
      <FloatingMolecule scrollProgress={scrollProgress} position={[-2, 1, -1]} />
      <FloatingMolecule scrollProgress={scrollProgress} position={[2, -1, -1]} />
      <FloatingMolecule scrollProgress={scrollProgress} position={[1.5, 1.5, -2]} />
      <OrbitingParticles scrollProgress={scrollProgress} />
      
      <Environment preset="night" />
    </>
  )
}

export function Scroll3DScene() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = Math.min(scrollTop / docHeight, 1)
      setScrollProgress(progress)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed top-0 right-0 w-1/3 h-screen pointer-events-none z-10 opacity-60"
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent" }}
      >
        <Scene scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  )
}
