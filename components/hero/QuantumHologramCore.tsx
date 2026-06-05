"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sphere, Torus, MeshDistortMaterial, Html } from "@react-three/drei";
import { useEffect, useRef, useState, useMemo } from "react";
import * as THREE from "three";

/**
 * Quantum Hologram Core - Premium futuristic hero object
 * Features:
 * - Floating transparent holographic core with plasma effect
 * - Multiple rotating neon rings
 * - Dynamic inner energy waves
 * - Orbiting particles and glowing dust
 * - Mouse reactive parallax
 * - Smooth animations with bloom effects
 */

// Quantum Core - Central plasma sphere
function QuantumCore() {
  const coreRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const energyRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const p = state.pointer;

    if (coreRef.current) {
      // Mouse reactive tilt
      coreRef.current.rotation.y = THREE.MathUtils.lerp(
        coreRef.current.rotation.y,
        p.x * 0.5,
        0.05
      );
      coreRef.current.rotation.x = THREE.MathUtils.lerp(
        coreRef.current.rotation.x,
        -p.y * 0.5,
        0.05
      );
    }

    if (innerRef.current) {
      // Inner core rotation
      innerRef.current.rotation.y = t * 0.3;
      innerRef.current.rotation.z = Math.sin(t * 0.5) * 0.2;
      
      // Pulsing scale
      const pulse = 1 + Math.sin(t * 2) * 0.08;
      innerRef.current.scale.setScalar(pulse);
    }

    if (energyRef.current) {
      // Energy wave rotation
      energyRef.current.rotation.y = -t * 0.4;
      energyRef.current.rotation.x = Math.cos(t * 0.6) * 0.3;
    }
  });

  return (
    <group ref={coreRef}>
      {/* Outer glass sphere */}
      <Sphere args={[1.2, 64, 64]}>
        <meshPhysicalMaterial
          color="#00ffff"
          metalness={0.1}
          roughness={0.05}
          transmission={0.95}
          thickness={0.5}
          envMapIntensity={1.5}
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
        />
      </Sphere>

      {/* Inner plasma core */}
      <mesh ref={innerRef}>
        <icosahedronGeometry args={[0.8, 4]} />
        <MeshDistortMaterial
          color="#7df9ff"
          emissive="#00ffff"
          emissiveIntensity={1.5}
          metalness={0.8}
          roughness={0.2}
          distort={0.4}
          speed={2}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Energy wave layer */}
      <mesh ref={energyRef}>
        <icosahedronGeometry args={[1.0, 2]} />
        <meshBasicMaterial
          color="#00ffff"
          wireframe
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Center glow point */}
      <mesh>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.9}
        />
      </mesh>
    </group>
  );
}

// Rotating neon rings
function HolographicRings() {
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);
  const ring3 = useRef<THREE.Mesh>(null);
  const ring4 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (ring1.current) ring1.current.rotation.z = t * 0.6;
    if (ring2.current) ring2.current.rotation.x = t * 0.4;
    if (ring3.current) ring3.current.rotation.y = -t * 0.5;
    if (ring4.current) {
      ring4.current.rotation.z = -t * 0.3;
      ring4.current.rotation.x = t * 0.2;
    }
  });

  return (
    <group>
      {/* Ring 1 - Cyan */}
      <Torus ref={ring1} args={[1.8, 0.015, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
        <meshBasicMaterial color="#00ffff" transparent opacity={0.8} />
      </Torus>

      {/* Ring 2 - Blue */}
      <Torus ref={ring2} args={[2.2, 0.012, 16, 100]} rotation={[Math.PI / 3, 0.5, 0]}>
        <meshBasicMaterial color="#007cf0" transparent opacity={0.7} />
      </Torus>

      {/* Ring 3 - Purple */}
      <Torus ref={ring3} args={[2.6, 0.01, 16, 100]} rotation={[0.6, 1.2, 0]}>
        <meshBasicMaterial color="#a78bfa" transparent opacity={0.6} />
      </Torus>

      {/* Ring 4 - Teal */}
      <Torus ref={ring4} args={[3.0, 0.008, 16, 100]} rotation={[1.2, 0.3, 0.8]}>
        <meshBasicMaterial color="#2dd4bf" transparent opacity={0.5} />
      </Torus>
    </group>
  );
}

// Orbiting particles
function OrbitingParticles({ count = 80 }: { count?: number }) {
  const particles = useRef<THREE.Group>(null);

  const particleData = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        radius: 1.5 + Math.random() * 2,
        speed: 0.3 + Math.random() * 0.8,
        offset: (Math.PI * 2 * i) / count,
        size: 0.02 + Math.random() * 0.04,
        tilt: Math.random() * Math.PI,
        color: ["#00ffff", "#7df9ff", "#007cf0", "#a78bfa", "#2dd4bf"][
          Math.floor(Math.random() * 5)
        ],
      })),
    [count]
  );

  useFrame((state) => {
    if (!particles.current) return;
    const t = state.clock.getElapsedTime();

    particles.current.children.forEach((particle, i) => {
      const data = particleData[i];
      if (!data) return;

      const angle = t * data.speed + data.offset;
      particle.position.x = Math.cos(angle) * data.radius;
      particle.position.y = Math.sin(angle) * data.radius * Math.sin(data.tilt);
      particle.position.z = Math.sin(angle) * data.radius * Math.cos(data.tilt);

      // Pulse scale
      const pulse = 1 + Math.sin(t * 3 + data.offset) * 0.3;
      particle.scale.setScalar(data.size * pulse);
    });
  });

  return (
    <group ref={particles}>
      {particleData.map((data, i) => (
        <mesh key={i}>
          <sphereGeometry args={[1, 8, 8]} />
          <meshBasicMaterial color={data.color} transparent opacity={0.8} />
        </mesh>
      ))}
    </group>
  );
}

// Floating energy dust
function EnergyDust({ count = 200 }: { count?: number }) {
  const dustRef = useRef<THREE.Points>(null);

  const [positions, speeds, offsets] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    const off = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const radius = 2 + Math.random() * 3;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);

      spd[i] = 0.1 + Math.random() * 0.3;
      off[i] = Math.random() * Math.PI * 2;
    }

    return [pos, spd, off];
  }, [count]);

  useFrame((state) => {
    if (!dustRef.current) return;
    const t = state.clock.getElapsedTime();
    const pos = dustRef.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const angle = t * speeds[i] + offsets[i];
      const radius = 2 + Math.sin(angle) * 1.5;
      const theta = angle;
      const phi = offsets[i] + t * speeds[i] * 0.2;

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);
    }

    dustRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={dustRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#00ffff"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Background stars
function StarField({ count = 500 }: { count?: number }) {
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    return pos;
  }, [count]);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#7df9ff"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}

// Main scene
function Scene() {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={80} color="#00ffff" />
      <pointLight position={[-5, -5, 5]} intensity={60} color="#a78bfa" />
      <pointLight position={[0, 0, 8]} intensity={40} color="#7df9ff" />

      {/* Background stars */}
      <StarField />

      {/* Main quantum core with float effect */}
      <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.8}>
        <QuantumCore />
      </Float>

      {/* Holographic rings */}
      <HolographicRings />

      {/* Orbiting particles */}
      <OrbitingParticles />

      {/* Energy dust */}
      <EnergyDust />
    </>
  );
}

// Main component
export default function QuantumHologramCore() {
  const [ok, setOk] = useState(true);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let webgl = false;
    try {
      const c = document.createElement("canvas");
      webgl = !!(c.getContext("webgl2") || c.getContext("webgl"));
    } catch {
      webgl = false;
    }
    setOk(!reduce && webgl);
  }, []);

  // Fallback for no WebGL
  if (!ok) {
    return (
      <div aria-hidden className="relative h-full w-full">
        <div className="absolute inset-[10%] rounded-full bg-primary/20 blur-3xl animate-pulse" />
        <div className="absolute inset-[20%] rounded-full bg-secondary/20 blur-3xl animate-pulse" 
          style={{ animationDelay: "0.5s" }} />
        <div className="absolute inset-[30%] rounded-full bg-primary/30 blur-2xl animate-pulse" 
          style={{ animationDelay: "1s" }} />
        <div
          className="absolute inset-[25%] rounded-full border border-primary/30"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(0,255,255,0.3), transparent 70%)",
          }}
        />
      </div>
    );
  }

  return (
    <div aria-hidden className="relative h-full w-full">
      {/* Glow layers */}
      <div className="absolute inset-[5%] rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute inset-[15%] rounded-full bg-secondary/10 blur-3xl" />
      <div className="absolute inset-[25%] rounded-full bg-primary/15 blur-2xl" />
      
      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 2]}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance"
        }}
        style={{ width: "100%", height: "100%" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
