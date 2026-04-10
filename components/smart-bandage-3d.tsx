"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, Environment, OrbitControls } from "@react-three/drei"
import * as THREE from "three"

// Chitosan matrix layer - porous gel-like structure
function ChitosanMatrix({ yOffset = 0 }: { yOffset?: number }) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.MeshStandardMaterial
      material.opacity = 0.25 + Math.sin(state.clock.elapsedTime * 0.8) * 0.05
    }
  })

  return (
    <mesh ref={meshRef} position={[0, yOffset, 0]}>
      <boxGeometry args={[1.4, 0.04, 1.4]} />
      <meshStandardMaterial 
        color="#00D6FF"
        transparent
        opacity={0.3}
        emissive="#00D6FF"
        emissiveIntensity={0.15}
        roughness={0.6}
      />
    </mesh>
  )
}

// Sensor node embedded in bandage
function SensorNode({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current && glowRef.current) {
      const pulse = Math.sin(state.clock.elapsedTime * 2 + position[0] * 3) * 0.5 + 0.5
      meshRef.current.scale.setScalar(0.8 + pulse * 0.2)
      glowRef.current.scale.setScalar(1.2 + pulse * 0.4)
      const material = glowRef.current.material as THREE.MeshStandardMaterial
      material.opacity = 0.15 + pulse * 0.15
    }
  })

  return (
    <group position={position}>
      {/* Glow effect */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial 
          color="#00D6FF" 
          transparent 
          opacity={0.2}
          emissive="#00D6FF"
          emissiveIntensity={0.5}
        />
      </mesh>
      {/* Sensor core */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshStandardMaterial 
          color="#ffffff"
          emissive="#00D6FF"
          emissiveIntensity={0.8}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
    </group>
  )
}

// Active ingredient particles
function ActiveParticle({ position, delay = 0 }: { position: [number, number, number], delay?: number }) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime + delay
      meshRef.current.position.y = position[1] + Math.sin(time * 1.5) * 0.05
      const scale = 0.8 + Math.sin(time * 2) * 0.2
      meshRef.current.scale.setScalar(scale)
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <octahedronGeometry args={[0.025, 0]} />
      <meshStandardMaterial 
        color="#0050FF"
        emissive="#0050FF"
        emissiveIntensity={0.6}
        transparent
        opacity={0.8}
      />
    </mesh>
  )
}

// Main smart bandage component
function SmartBandage() {
  const groupRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.15
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.08 - 0.2
    }
  })

  // Generate sensor positions
  const sensorPositions: [number, number, number][] = useMemo(() => [
    [-0.3, 0.08, -0.3],
    [0.3, 0.08, -0.3],
    [-0.3, 0.08, 0.3],
    [0.3, 0.08, 0.3],
    [0, 0.08, 0],
  ], [])

  // Generate active particles
  const particles = useMemo(() => {
    const p: Array<{ position: [number, number, number], delay: number }> = []
    for (let i = 0; i < 20; i++) {
      p.push({
        position: [
          (Math.random() - 0.5) * 1.2,
          0.12 + Math.random() * 0.05,
          (Math.random() - 0.5) * 1.2
        ],
        delay: Math.random() * Math.PI * 2
      })
    }
    return p
  }, [])

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <group ref={groupRef}>
        {/* Base bandage layer (flexible substrate) */}
        <mesh position={[0, -0.05, 0]}>
          <boxGeometry args={[1.5, 0.02, 1.5]} />
          <meshStandardMaterial 
            color="#1a1a2e"
            transparent
            opacity={0.9}
            roughness={0.8}
          />
        </mesh>

        {/* Chitosan matrix layers */}
        <ChitosanMatrix yOffset={0} />
        <ChitosanMatrix yOffset={0.05} />
        
        {/* Top protective layer */}
        <mesh position={[0, 0.1, 0]}>
          <boxGeometry args={[1.5, 0.01, 1.5]} />
          <meshStandardMaterial 
            color="#0050FF"
            transparent
            opacity={0.15}
            roughness={0.3}
          />
        </mesh>

        {/* Embedded sensors */}
        {sensorPositions.map((pos, index) => (
          <SensorNode key={index} position={pos} />
        ))}

        {/* Active ingredient particles */}
        {particles.map((p, index) => (
          <ActiveParticle key={index} position={p.position} delay={p.delay} />
        ))}

        {/* Edge border glow */}
        <mesh position={[0, 0.02, 0]}>
          <boxGeometry args={[1.55, 0.08, 1.55]} />
          <meshStandardMaterial 
            color="#00D6FF"
            transparent
            opacity={0.05}
            emissive="#00D6FF"
            emissiveIntensity={0.3}
          />
        </mesh>
      </group>
    </Float>
  )
}

export function SmartBandage3D() {
  return (
    <div className="w-full h-full min-h-[400px]">
      <Canvas
        camera={{ position: [2, 1.5, 2], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" />
        <pointLight position={[-5, 3, -5]} intensity={0.4} color="#00D6FF" />
        <pointLight position={[0, -3, 0]} intensity={0.3} color="#0050FF" />
        <spotLight 
          position={[0, 5, 0]} 
          angle={0.5} 
          penumbra={1} 
          intensity={0.5} 
          color="#00D6FF"
        />
        <SmartBandage />
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2}
        />
        <Environment preset="night" />
      </Canvas>
    </div>
  )
}
