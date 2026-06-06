"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState, useMemo } from "react";
import * as THREE from "three";

/**
 * JARVIS Multiversal Core Environment
 * Complete cinematic AI consciousness background
 * Living neural universe with infinite depth
 * Tony Stark JARVIS meets Interstellar
 */

// Infinite Neural Grid - Massive interconnected neural pathways
function InfiniteNeuralGrid() {
  const gridRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!gridRef.current) return;
    const t = state.clock.getElapsedTime();
    const p = state.pointer;

    // Cinematic rotation with mouse parallax
    gridRef.current.rotation.x = Math.sin(t * 0.02) * 0.15 - p.y * 0.2;
    gridRef.current.rotation.y = t * 0.01 + p.x * 0.3;
    gridRef.current.rotation.z = Math.cos(t * 0.015) * 0.08;
  });

  const neuralLayers = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      z: -10 + i * 6,
      scale: 1 + i * 0.4,
      opacity: 0.15 - i * 0.006,
      color: i % 4 === 0 ? "#00ffff" : i % 4 === 1 ? "#0088ff" : i % 4 === 2 ? "#8844ff" : "#00aaff",
      speed: 0.02 + i * 0.001,
    }));
  }, []);

  return (
    <group ref={gridRef}>
      {neuralLayers.map((layer, i) => (
        <NeuralGridLayer key={i} {...layer} index={i} />
      ))}
    </group>
  );
}

// Individual neural grid layer
function NeuralGridLayer({
  z,
  scale,
  opacity,
  color,
  speed,
  index,
}: {
  z: number;
  scale: number;
  opacity: number;
  color: string;
  speed: number;
  index: number;
}) {
  const layerRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!layerRef.current) return;
    const t = state.clock.getElapsedTime();

    // Neural pulse animation
    const pulse = 1 + Math.sin(t * speed + index * 0.3) * 0.03;
    layerRef.current.scale.setScalar(scale * pulse);

    // Energy flow
    layerRef.current.position.z = z + Math.sin(t * 0.05 + index * 0.2) * 0.5;
  });

  return (
    <group ref={layerRef} position={[0, 0, z]}>
      {/* Horizontal neural pathways */}
      {Array.from({ length: 15 }, (_, i) => {
        const y = -14 + i * 2;
        return (
          <mesh key={`h-${i}`} position={[0, y, 0]}>
            <planeGeometry args={[40, 0.025]} />
            <meshBasicMaterial
              color={color}
              transparent
              opacity={opacity}
              side={THREE.DoubleSide}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        );
      })}

      {/* Vertical neural pathways */}
      {Array.from({ length: 15 }, (_, i) => {
        const x = -14 + i * 2;
        return (
          <mesh key={`v-${i}`} position={[x, 0, 0]}>
            <planeGeometry args={[0.025, 40]} />
            <meshBasicMaterial
              color={color}
              transparent
              opacity={opacity}
              side={THREE.DoubleSide}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        );
      })}

      {/* Diagonal neural connections */}
      {Array.from({ length: 8 }, (_, i) => {
        const angle = (i * Math.PI) / 4;
        return (
          <mesh key={`d-${i}`} rotation={[0, 0, angle]}>
            <planeGeometry args={[0.015, 35]} />
            <meshBasicMaterial
              color={color}
              transparent
              opacity={opacity * 0.5}
              side={THREE.DoubleSide}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        );
      })}
    </group>
  );
}

// Holographic AI Data Rain - Futuristic calculations streaming
function HolographicDataRain() {
  const rainRef = useRef<THREE.Group>(null);

  const dataStreams = useMemo(() => {
    const glyphs = ["▲", "◆", "●", "■", "◀", "▶", "◢", "◣", "◤", "◥"];
    const codes = ["∑", "∫", "∂", "∇", "λ", "π", "Ω", "Δ", "Φ", "Ψ"];
    const symbols = [...glyphs, ...codes];

    return Array.from({ length: 60 }, (_, i) => ({
      x: -20 + (i % 12) * 3.5,
      y: 15 + (Math.random() * 10),
      z: -15 - Math.random() * 40,
      symbol: symbols[Math.floor(Math.random() * symbols.length)],
      speed: 0.8 + Math.random() * 1.2,
      offset: Math.random() * Math.PI * 2,
      size: 0.3 + Math.random() * 0.4,
    }));
  }, []);

  useFrame((state) => {
    if (!rainRef.current) return;
    const t = state.clock.getElapsedTime();

    rainRef.current.children.forEach((stream, i) => {
      const data = dataStreams[i];
      if (!data) return;

      // Smooth downward flow
      stream.position.y = data.y - (t * data.speed) % 30;
      
      // Wrap around
      if (stream.position.y < -15) {
        stream.position.y = 15;
      }

      // Pulsing glow
      const pulse = 0.3 + Math.sin(t * 2 + data.offset) * 0.2;
      const mesh = stream.children[0] as THREE.Mesh;
      if (mesh && mesh.material && 'opacity' in mesh.material) {
        (mesh.material as THREE.MeshBasicMaterial).opacity = pulse;
      }
    });
  });

  return (
    <group ref={rainRef}>
      {dataStreams.map((stream, i) => (
        <group key={i} position={[stream.x, stream.y, stream.z]}>
          <mesh>
            <planeGeometry args={[stream.size, stream.size]} />
            <meshBasicMaterial
              color={i % 3 === 0 ? "#00ffff" : i % 3 === 1 ? "#00aaff" : "#8844ff"}
              transparent
              opacity={0.5}
              side={THREE.DoubleSide}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// Energy Veins - Large cinematic flowing energy streams
function EnergyVeins() {
  const veinsRef = useRef<THREE.Group>(null);

  const veinPaths = useMemo(() => {
    return Array.from({ length: 15 }, (_, i) => {
      const points = [];
      const startX = -15 + Math.random() * 30;
      const startY = -12 + Math.random() * 24;
      const startZ = -30 + Math.random() * 20;

      for (let j = 0; j < 60; j++) {
        const t = j / 60;
        const x = startX + Math.sin(t * Math.PI * 4 + i) * 8;
        const y = startY + Math.cos(t * Math.PI * 3 + i) * 8;
        const z = startZ + t * 40;
        points.push(new THREE.Vector3(x, y, z));
      }

      return {
        points,
        speed: 0.3 + Math.random() * 0.4,
        offset: Math.random() * Math.PI * 2,
        radius: 0.02 + Math.random() * 0.03,
      };
    });
  }, []);

  useFrame((state) => {
    if (!veinsRef.current) return;
    const t = state.clock.getElapsedTime();

    veinsRef.current.children.forEach((vein, i) => {
      const data = veinPaths[i];
      if (!data) return;

      // Energy pulse along veins
      const pulse = 0.4 + Math.sin(t * data.speed + data.offset) * 0.3;
      const mesh = vein as THREE.Mesh;
      if (mesh.material && 'opacity' in mesh.material) {
        (mesh.material as THREE.MeshBasicMaterial).opacity = pulse;
      }
    });
  });

  return (
    <group ref={veinsRef}>
      {veinPaths.map((vein, i) => {
        const curve = new THREE.CatmullRomCurve3(vein.points);
        const tubeGeometry = new THREE.TubeGeometry(curve, 80, vein.radius, 8, false);

        return (
          <mesh key={i} geometry={tubeGeometry}>
            <meshBasicMaterial
              color={i % 3 === 0 ? "#00ffff" : i % 3 === 1 ? "#0088ff" : "#8844ff"}
              transparent
              opacity={0.7}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        );
      })}
    </group>
  );
}

// Neural Consciousness Particles - Living AI atmosphere
function NeuralConsciousnessParticles({ count = 1500 }: { count?: number }) {
  const particlesRef = useRef<THREE.Points>(null);

  const [positions, colors, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Spherical distribution
      const radius = 15 + Math.random() * 40;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi) - 25;

      // Color variation
      const colorChoice = Math.random();
      if (colorChoice < 0.4) {
        col[i * 3] = 0;
        col[i * 3 + 1] = 1;
        col[i * 3 + 2] = 1; // Cyan
      } else if (colorChoice < 0.7) {
        col[i * 3] = 0;
        col[i * 3 + 1] = 0.53;
        col[i * 3 + 2] = 1; // Electric blue
      } else {
        col[i * 3] = 0.53;
        col[i * 3 + 1] = 0.27;
        col[i * 3 + 2] = 1; // Violet
      }

      vel[i * 3] = (Math.random() - 0.5) * 0.012;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.012;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.012;
    }

    return [pos, col, vel];
  }, [count]);

  useFrame(() => {
    if (!particlesRef.current) return;
    const pos = particlesRef.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < count; i++) {
      pos[i * 3] += velocities[i * 3];
      pos[i * 3 + 1] += velocities[i * 3 + 1];
      pos[i * 3 + 2] += velocities[i * 3 + 2];

      // Wrap around
      if (Math.abs(pos[i * 3]) > 50) pos[i * 3] *= -0.6;
      if (Math.abs(pos[i * 3 + 1]) > 50) pos[i * 3 + 1] *= -0.6;
      if (pos[i * 3 + 2] > 20) pos[i * 3 + 2] = -50;
      if (pos[i * 3 + 2] < -50) pos[i * 3 + 2] = 20;
    }

    particlesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Dimensional AI Structures - Floating geometric consciousness
function DimensionalAIStructures() {
  const structuresRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!structuresRef.current) return;
    const t = state.clock.getElapsedTime();

    structuresRef.current.rotation.x = Math.sin(t * 0.03) * 0.2;
    structuresRef.current.rotation.y = t * 0.015;
    structuresRef.current.rotation.z = Math.cos(t * 0.025) * 0.15;
  });

  const structures = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      z: -20 - i * 8,
      size: 3 + i * 1.5,
      opacity: 0.12 - i * 0.008,
      type: i % 3,
    }));
  }, []);

  return (
    <group ref={structuresRef}>
      {structures.map((struct, i) => (
        <mesh key={i} position={[0, 0, struct.z]}>
          {struct.type === 0 && <boxGeometry args={[struct.size, struct.size, struct.size]} />}
          {struct.type === 1 && <octahedronGeometry args={[struct.size * 0.7]} />}
          {struct.type === 2 && <icosahedronGeometry args={[struct.size * 0.6]} />}
          <meshBasicMaterial
            color={i % 3 === 0 ? "#00ffff" : i % 3 === 1 ? "#0088ff" : "#8844ff"}
            wireframe
            transparent
            opacity={struct.opacity}
          />
        </mesh>
      ))}
    </group>
  );
}

// Volumetric AI Fog - Deep atmospheric presence
function VolumetricAIFog() {
  const fogRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!fogRef.current) return;
    const t = state.clock.getElapsedTime();

    fogRef.current.rotation.z = t * 0.005;

    fogRef.current.children.forEach((fog, i) => {
      const pulse = 0.05 + Math.sin(t * 0.3 + i * 0.5) * 0.03;
      const mesh = fog as THREE.Mesh;
      if (mesh.material && 'opacity' in mesh.material) {
        (mesh.material as THREE.MeshBasicMaterial).opacity = pulse;
      }
    });
  });

  const fogLayers = useMemo(() => {
    return Array.from({ length: 10 }, (_, i) => ({
      z: -15 - i * 8,
      opacity: 0.08 - i * 0.006,
    }));
  }, []);

  return (
    <group ref={fogRef}>
      {fogLayers.map((layer, i) => (
        <mesh key={i} position={[0, 0, layer.z]}>
          <planeGeometry args={[80, 80, 40, 40]} />
          <meshBasicMaterial
            color="#001a33"
            wireframe
            transparent
            opacity={layer.opacity}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

// Neural Connection Web - Interconnected consciousness
function NeuralConnectionWeb() {
  const webRef = useRef<THREE.Group>(null);

  const connections = useMemo(() => {
    const nodes: THREE.Vector3[] = [];
    const lines: [number, number][] = [];

    // Create nodes in 3D space
    for (let i = 0; i < 40; i++) {
      const radius = 12 + Math.random() * 25;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;

      nodes.push(
        new THREE.Vector3(
          radius * Math.sin(phi) * Math.cos(theta),
          radius * Math.sin(phi) * Math.sin(theta),
          radius * Math.cos(phi) - 20
        )
      );
    }

    // Connect nearby nodes
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[i]!.distanceTo(nodes[j]!) < 15) {
          lines.push([i, j]);
        }
      }
    }

    return { nodes, lines };
  }, []);

  useFrame((state) => {
    if (!webRef.current) return;
    const t = state.clock.getElapsedTime();

    webRef.current.rotation.y = t * 0.02;
    webRef.current.rotation.x = Math.sin(t * 0.03) * 0.1;
  });

  return (
    <group ref={webRef}>
      {connections.lines.map((line, i) => {
        const start = connections.nodes[line[0]];
        const end = connections.nodes[line[1]];
        if (!start || !end) return null;

        const points = [start, end];
        const geometry = new THREE.BufferGeometry().setFromPoints(points);

        return (
          <primitive key={i} object={new THREE.Line(
            geometry,
            new THREE.LineBasicMaterial({
              color: i % 3 === 0 ? "#00ffff" : i % 3 === 1 ? "#0088ff" : "#8844ff",
              transparent: true,
              opacity: 0.15,
              blending: THREE.AdditiveBlending,
            })
          )} />
        );
      })}
    </group>
  );
}

// Reality Distortion Field - Space bending effect
function RealityDistortionField() {
  const distortionRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!distortionRef.current) return;
    const t = state.clock.getElapsedTime();

    distortionRef.current.rotation.z = t * 0.01;
    
    const pulse = 1 + Math.sin(t * 0.4) * 0.08;
    distortionRef.current.scale.set(pulse, pulse, 1);

    const mat = distortionRef.current.material as THREE.MeshBasicMaterial;
    mat.opacity = 0.04 + Math.sin(t * 0.3) * 0.02;
  });

  return (
    <mesh ref={distortionRef} position={[0, 0, -25]}>
      <planeGeometry args={[60, 60, 64, 64]} />
      <meshBasicMaterial
        color="#0088ff"
        transparent
        opacity={0.06}
        side={THREE.DoubleSide}
        wireframe
      />
    </mesh>
  );
}

// Holographic System Diagnostics - Floating AI indicators
function HolographicSystemDiagnostics() {
  const diagRef = useRef<THREE.Group>(null);

  const diagnostics = useMemo(() => {
    const texts = [
      "NEURAL_CORE",
      "AI_SYNC_98%",
      "QUANTUM_PROC",
      "MATRIX_ACTIVE",
      "DIM_STABLE",
      "CONSCIOUSNESS",
      "MULTIVERSE_OK",
      "JARVIS_ONLINE",
    ];

    return texts.map((text, i) => ({
      text,
      x: -15 + Math.random() * 30,
      y: -10 + Math.random() * 20,
      z: -10 - Math.random() * 30,
      speed: 0.15 + Math.random() * 0.2,
      offset: Math.random() * Math.PI * 2,
    }));
  }, []);

  useFrame((state) => {
    if (!diagRef.current) return;
    const t = state.clock.getElapsedTime();

    diagRef.current.children.forEach((child, i) => {
      const data = diagnostics[i];
      if (!data) return;

      // Gentle floating
      child.position.y = data.y + Math.sin(t * data.speed + data.offset) * 0.4;
      child.position.x = data.x + Math.cos(t * data.speed * 0.7 + data.offset) * 0.3;

      // Pulsing opacity
      const pulse = 0.25 + Math.sin(t * 0.6 + data.offset) * 0.15;
      const mesh = child.children[0] as THREE.Mesh;
      if (mesh && mesh.material && 'opacity' in mesh.material) {
        (mesh.material as THREE.MeshBasicMaterial).opacity = pulse;
      }
    });
  });

  return (
    <group ref={diagRef}>
      {diagnostics.map((diag, i) => (
        <group key={i} position={[diag.x, diag.y, diag.z]}>
          <mesh>
            <planeGeometry args={[diag.text.length * 0.18, 0.35]} />
            <meshBasicMaterial
              color={i % 2 === 0 ? "#00ffff" : "#8844ff"}
              transparent
              opacity={0.4}
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// Main JARVIS Scene
function JARVISScene() {
  return (
    <>
      {/* Cinematic lighting */}
      <ambientLight intensity={0.15} />
      <pointLight position={[0, 0, 10]} intensity={8} color="#00ffff" distance={50} />
      <pointLight position={[-15, 10, -20]} intensity={5} color="#0088ff" distance={40} />
      <pointLight position={[15, -10, -20]} intensity={5} color="#8844ff" distance={40} />

      {/* Core neural infrastructure */}
      <InfiniteNeuralGrid />
      <DimensionalAIStructures />
      <NeuralConnectionWeb />

      {/* Living atmosphere */}
      <NeuralConsciousnessParticles />
      <HolographicDataRain />
      <EnergyVeins />

      {/* Environmental effects */}
      <VolumetricAIFog />
      <RealityDistortionField />
      <HolographicSystemDiagnostics />
    </>
  );
}

// Main Component Export
export default function JARVISMultiversalCore() {
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
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#000510] via-[#001a33] to-bg opacity-90" />
        <div 
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `
              linear-gradient(90deg, transparent 0%, #00ffff 50%, transparent 100%),
              linear-gradient(0deg, transparent 0%, #0088ff 50%, transparent 100%)
            `,
            backgroundSize: '80px 80px',
          }}
        />
      </div>
    );
  }

  return (
    <div aria-hidden className="absolute inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 75 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ 
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <fog attach="fog" args={["#000510", 20, 100]} />
        <JARVISScene />
      </Canvas>
    </div>
  );
}
