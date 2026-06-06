"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState, useMemo } from "react";
import * as THREE from "three";

/**
 * Singularity Rift Engine - Interstellar-inspired dimensional tear
 * A cinematic multidimensional portal with reality distortion effects
 * Replaces the quantum core with something truly unique
 */

// Dimensional Rift Core - The central tear in reality
function RiftCore() {
  const coreRef = useRef<THREE.Group>(null);
  const darkCoreRef = useRef<THREE.Mesh>(null);
  const riftRingRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const p = state.pointer;

    if (coreRef.current) {
      // Mouse parallax
      coreRef.current.rotation.y = THREE.MathUtils.lerp(
        coreRef.current.rotation.y,
        p.x * 0.3,
        0.03
      );
      coreRef.current.rotation.x = THREE.MathUtils.lerp(
        coreRef.current.rotation.x,
        -p.y * 0.3,
        0.03
      );
    }

    if (darkCoreRef.current) {
      // Slow rotation of dark energy core
      darkCoreRef.current.rotation.z = t * 0.1;
      
      // Subtle pulsing
      const pulse = 1 + Math.sin(t * 0.8) * 0.05;
      darkCoreRef.current.scale.setScalar(pulse);
    }

    if (riftRingRef.current) {
      // Rift ring distortion
      riftRingRef.current.rotation.z = -t * 0.15;
      const distort = Math.sin(t * 2) * 0.02;
      riftRingRef.current.scale.set(1 + distort, 1 - distort, 1);
    }
  });

  return (
    <group ref={coreRef}>
      {/* Dark energy core - the singularity */}
      <mesh ref={darkCoreRef}>
        <sphereGeometry args={[0.4, 64, 64]} />
        <meshBasicMaterial
          color="#000000"
          transparent
          opacity={0.95}
        />
      </mesh>

      {/* Inner dark glow */}
      <mesh>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshBasicMaterial
          color="#001a33"
          transparent
          opacity={0.6}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Rift distortion ring */}
      <mesh ref={riftRingRef}>
        <torusGeometry args={[0.8, 0.15, 16, 64]} />
        <meshStandardMaterial
          color="#0066ff"
          emissive="#0044cc"
          emissiveIntensity={2}
          metalness={0.8}
          roughness={0.2}
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Outer energy glow */}
      <mesh>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshBasicMaterial
          color="#0088ff"
          transparent
          opacity={0.15}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}

// Energy Cracks - Glowing fractures in reality
function EnergyCracks() {
  const cracksRef = useRef<THREE.Group>(null);
  
  const crackData = useMemo(() => {
    const cracks = [];
    for (let i = 0; i < 12; i++) {
      const angle = (Math.PI * 2 * i) / 12;
      const distance = 0.8 + Math.random() * 0.4;
      cracks.push({
        angle,
        distance,
        length: 0.6 + Math.random() * 0.8,
        rotation: Math.random() * Math.PI,
        speed: 0.5 + Math.random() * 0.5,
      });
    }
    return cracks;
  }, []);

  useFrame((state) => {
    if (!cracksRef.current) return;
    const t = state.clock.getElapsedTime();

    cracksRef.current.children.forEach((crack, i) => {
      const data = crackData[i];
      if (!data) return;

      // Flickering opacity
      const flicker = 0.3 + Math.sin(t * data.speed + i) * 0.2;
      const mesh = crack as THREE.Mesh;
      if (mesh.material && 'opacity' in mesh.material) {
        (mesh.material as THREE.MeshBasicMaterial).opacity = flicker;
      }

      // Subtle rotation
      crack.rotation.z = data.rotation + t * 0.1;
    });
  });

  return (
    <group ref={cracksRef}>
      {crackData.map((crack, i) => {
        const x = Math.cos(crack.angle) * crack.distance;
        const y = Math.sin(crack.angle) * crack.distance;
        
        return (
          <mesh
            key={i}
            position={[x, y, 0]}
            rotation={[0, 0, crack.rotation]}
          >
            <planeGeometry args={[0.04, crack.length]} />
            <meshBasicMaterial
              color="#00ddff"
              transparent
              opacity={0.5}
              side={THREE.DoubleSide}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        );
      })}
    </group>
  );
}

// Floating Geometric Shards
function FloatingShards({ count = 20 }: { count?: number }) {
  const shardsRef = useRef<THREE.Group>(null);

  const shardData = useMemo(() => {
    const shards = [];
    for (let i = 0; i < count; i++) {
      const radius = 1.5 + Math.random() * 2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      shards.push({
        radius,
        theta,
        phi,
        speed: 0.2 + Math.random() * 0.4,
        rotSpeed: 0.5 + Math.random() * 1,
        size: 0.08 + Math.random() * 0.12,
        offset: Math.random() * Math.PI * 2,
      });
    }
    return shards;
  }, [count]);

  useFrame((state) => {
    if (!shardsRef.current) return;
    const t = state.clock.getElapsedTime();

    shardsRef.current.children.forEach((shard, i) => {
      const data = shardData[i];
      if (!data) return;

      // Orbital motion
      const angle = t * data.speed + data.offset;
      const r = data.radius + Math.sin(t + data.offset) * 0.3;
      
      shard.position.x = Math.cos(angle + data.theta) * r;
      shard.position.y = Math.sin(angle + data.phi) * r;
      shard.position.z = Math.cos(angle) * r * 0.5;

      // Rotation
      shard.rotation.x = t * data.rotSpeed;
      shard.rotation.y = t * data.rotSpeed * 0.7;
      shard.rotation.z = t * data.rotSpeed * 0.5;
    });
  });

  return (
    <group ref={shardsRef}>
      {shardData.map((data, i) => (
        <mesh key={i}>
          <boxGeometry args={[data.size, data.size * 2, data.size * 0.3]} />
          <meshStandardMaterial
            color="#4488ff"
            emissive="#0066ff"
            emissiveIntensity={0.5}
            metalness={0.9}
            roughness={0.1}
            transparent
            opacity={0.7}
          />
        </mesh>
      ))}
    </group>
  );
}

// Dimensional Energy Streams
function EnergyStreams() {
  const streamsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!streamsRef.current) return;
    const t = state.clock.getElapsedTime();

    streamsRef.current.children.forEach((stream, i) => {
      stream.rotation.z = t * 0.3 + i;
      
      const pulse = 0.5 + Math.sin(t * 2 + i) * 0.5;
      const mesh = stream as THREE.Mesh;
      if (mesh.material && 'opacity' in mesh.material) {
        (mesh.material as THREE.MeshBasicMaterial).opacity = pulse * 0.4;
      }
    });
  });

  return (
    <group ref={streamsRef}>
      {[0, 1, 2, 3].map((i) => {
        const angle = (Math.PI * 2 * i) / 4;
        const x = Math.cos(angle) * 2;
        const y = Math.sin(angle) * 2;

        return (
          <mesh key={i} position={[x, y, 0]} rotation={[0, 0, angle]}>
            <planeGeometry args={[0.06, 2.5]} />
            <meshBasicMaterial
              color="#00ccff"
              transparent
              opacity={0.4}
              side={THREE.DoubleSide}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        );
      })}
    </group>
  );
}

// Cosmic Dust Particles
function CosmicDust({ count = 400 }: { count?: number }) {
  const dustRef = useRef<THREE.Points>(null);

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const radius = 3 + Math.random() * 5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);

      vel[i * 3] = (Math.random() - 0.5) * 0.02;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
    }

    return [pos, vel];
  }, [count]);

  useFrame(() => {
    if (!dustRef.current) return;
    const pos = dustRef.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < count; i++) {
      pos[i * 3] += velocities[i * 3];
      pos[i * 3 + 1] += velocities[i * 3 + 1];
      pos[i * 3 + 2] += velocities[i * 3 + 2];

      // Reset if too far
      const dist = Math.sqrt(
        pos[i * 3] ** 2 + pos[i * 3 + 1] ** 2 + pos[i * 3 + 2] ** 2
      );
      if (dist > 8) {
        pos[i * 3] *= 0.3;
        pos[i * 3 + 1] *= 0.3;
        pos[i * 3 + 2] *= 0.3;
      }
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
        size={0.02}
        color="#88ccff"
        transparent
        opacity={0.4}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Deep Space Background
function DeepSpaceBackground() {
  const bgRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!bgRef.current) return;
    const t = state.clock.getElapsedTime();
    bgRef.current.rotation.z = t * 0.02;
  });

  return (
    <mesh ref={bgRef} position={[0, 0, -8]}>
      <planeGeometry args={[30, 30]} />
      <meshBasicMaterial
        color="#000510"
        transparent
        opacity={0.8}
      />
    </mesh>
  );
}

// Dimensional Fog Layers
function DimensionalFog() {
  const fogLayers = useMemo(() => {
    return Array.from({ length: 3 }, (_, i) => ({
      z: -2 - i * 1.5,
      scale: 6 + i * 2,
      speed: 0.05 + i * 0.03,
      opacity: 0.15 - i * 0.04,
    }));
  }, []);

  return (
    <group>
      {fogLayers.map((layer, i) => (
        <DimensionalFogLayer key={i} {...layer} />
      ))}
    </group>
  );
}

function DimensionalFogLayer({
  z,
  scale,
  speed,
  opacity,
}: {
  z: number;
  scale: number;
  speed: number;
  opacity: number;
}) {
  const fogRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!fogRef.current) return;
    const t = state.clock.getElapsedTime();
    fogRef.current.rotation.z = t * speed;
    
    const pulse = 1 + Math.sin(t * 0.5) * 0.1;
    fogRef.current.scale.setScalar(scale * pulse);
  });

  return (
    <mesh ref={fogRef} position={[0, 0, z]}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <meshBasicMaterial
        color="#001a44"
        transparent
        opacity={opacity}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// Main Scene
function Scene() {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 0, 2]} intensity={30} color="#0088ff" />
      <pointLight position={[3, 3, 1]} intensity={20} color="#4400ff" distance={8} />
      <pointLight position={[-3, -3, 1]} intensity={20} color="#00ccff" distance={8} />

      {/* Background layers */}
      <DeepSpaceBackground />
      <DimensionalFog />

      {/* Main singularity rift */}
      <RiftCore />
      <EnergyCracks />
      <EnergyStreams />
      
      {/* Floating elements */}
      <FloatingShards />
      <CosmicDust />

      {/* Distant stars */}
      <CosmicDust count={600} />
    </>
  );
}

// Main Component
export default function SingularityRiftEngine() {
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
        <div className="absolute inset-[20%] rounded-full bg-[#001a44]/30 blur-3xl animate-pulse" />
        <div className="absolute inset-[30%] rounded-full bg-[#000510]/50 blur-2xl animate-pulse" 
          style={{ animationDelay: "0.7s" }} />
        <div className="absolute inset-[35%] rounded-full bg-black/80" />
        <div className="absolute inset-[40%] rounded-full border border-[#0088ff]/20" />
      </div>
    );
  }

  return (
    <div aria-hidden className="relative h-full w-full">
      {/* Atmospheric glow layers */}
      <div className="absolute inset-0 bg-gradient-radial from-[#001a44]/20 via-transparent to-transparent blur-2xl" />
      <div className="absolute inset-[10%] bg-gradient-radial from-[#0044cc]/10 via-transparent to-transparent blur-3xl" />
      
      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ width: "100%", height: "100%" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
