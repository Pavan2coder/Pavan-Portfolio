"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState, useMemo } from "react";
import * as THREE from "three";

/**
 * JARVIS Multiversal Core Environment
 * Cinematic futuristic AI consciousness background
 * Living neural universe with infinite depth
 * NO centered objects - pure atmospheric intelligence system
 */

// Infinite Neural Grid - Massive interconnected neural pathways
function InfiniteNeuralGrid() {
  const gridRef = useRef<THREE.Group>(null);

  const gridStructure = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      z: -60 + i * 6,
      scale: 0.5 + i * 0.15,
      opacity: 0.25 - i * 0.01,
      rotation: i * 0.1,
    }));
  }, []);

  useFrame((state) => {
    if (!gridRef.current) return;
    const t = state.clock.getElapsedTime();
    const p = state.pointer;

    gridRef.current.rotation.x = Math.sin(t * 0.03) * 0.1 - p.y * 0.08;
    gridRef.current.rotation.y = t * 0.02 + p.x * 0.1;
  });

  return (
    <group ref={gridRef}>
      {gridStructure.map((layer, i) => (
        <group key={i} position={[0, 0, layer.z]} rotation={[0, layer.rotation, 0]}>
          {/* Horizontal neural pathways */}
          {Array.from({ length: 16 }, (_, j) => {
            const y = -15 + j * 2;
            return (
              <mesh key={`h-${j}`} position={[0, y, 0]} scale={layer.scale}>
                <planeGeometry args={[40, 0.03]} />
                <meshBasicMaterial
                  color={j % 3 === 0 ? "#00ffff" : j % 3 === 1 ? "#0088ff" : "#8844ff"}
                  transparent
                  opacity={layer.opacity}
                  blending={THREE.AdditiveBlending}
                />
              </mesh>
            );
          })}
          {/* Vertical neural pathways */}
          {Array.from({ length: 16 }, (_, j) => {
            const x = -15 + j * 2;
            return (
              <mesh key={`v-${j}`} position={[x, 0, 0]} scale={layer.scale}>
                <planeGeometry args={[0.03, 40]} />
                <meshBasicMaterial
                  color={j % 3 === 0 ? "#00ffff" : j % 3 === 1 ? "#0088ff" : "#8844ff"}
                  transparent
                  opacity={layer.opacity}
                  blending={THREE.AdditiveBlending}
                />
              </mesh>
            );
          })}
        </group>
      ))}
    </group>
  );
}

// Flowing AI Circuitry - Neural pathways with energy flow
function FlowingAICircuitry() {
  const circuitRef = useRef<THREE.Group>(null);

  const circuits = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => {
      const points = [];
      const startX = (Math.random() - 0.5) * 30;
      const startY = (Math.random() - 0.5) * 25;
      const startZ = -10 - Math.random() * 40;

      for (let j = 0; j < 40; j++) {
        const t = j / 40;
        const x = startX + Math.sin(t * Math.PI * 4) * 3;
        const y = startY + Math.cos(t * Math.PI * 3) * 2;
        const z = startZ + t * 20;
        points.push(new THREE.Vector3(x, y, z));
      }

      return {
        points,
        speed: 0.2 + Math.random() * 0.4,
        offset: Math.random() * Math.PI * 2,
        color: i % 3 === 0 ? "#00ffff" : i % 3 === 1 ? "#0088ff" : "#8844ff",
      };
    });
  }, []);

  useFrame((state) => {
    if (!circuitRef.current) return;
    const t = state.clock.getElapsedTime();

    circuitRef.current.children.forEach((circuit, i) => {
      const data = circuits[i];
      if (!data) return;

      const pulse = 0.15 + Math.sin(t * data.speed + data.offset) * 0.1;
      const mesh = circuit as THREE.Mesh;
      if (mesh.material && 'opacity' in mesh.material) {
        (mesh.material as THREE.MeshBasicMaterial).opacity = pulse;
      }
    });
  });

  return (
    <group ref={circuitRef}>
      {circuits.map((circuit, i) => {
        const curve = new THREE.CatmullRomCurve3(circuit.points);
        const tubeGeometry = new THREE.TubeGeometry(curve, 80, 0.01, 8, false);

        return (
          <mesh key={i} geometry={tubeGeometry}>
            <meshBasicMaterial
              color={circuit.color}
              transparent
              opacity={0.2}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        );
      })}
    </group>
  );
}

// Holographic AI Data Rain - Intelligent text streams
function HolographicAIDataRain() {
  const rainRef = useRef<THREE.Group>(null);

  const dataStreams = useMemo(() => {
    const symbols = [
      "AI_PROC", "NEURAL_", "QUANTUM", ">>>DATA", "MATRIX_", 
      "COMPUTE", "ANALYZE", "PREDICT", "OPTIMIZE", "COMPILE",
      "EXECUTE", "SYSTEM_", "STATUS:", "OUTPUT:", "INPUT__"
    ];

    return Array.from({ length: 60 }, (_, i) => ({
      text: symbols[i % symbols.length],
      x: (Math.random() - 0.5) * 35,
      y: 15 + Math.random() * 10,
      z: -5 - Math.random() * 45,
      speed: 0.8 + Math.random() * 1.2,
      width: 0.8 + Math.random() * 0.4,
    }));
  }, []);

  useFrame((state) => {
    if (!rainRef.current) return;
    const t = state.clock.getElapsedTime();

    rainRef.current.children.forEach((stream, i) => {
      const data = dataStreams[i];
      if (!data) return;

      stream.position.y = data.y - (t * data.speed) % 40;
      
      if (stream.position.y < -15) {
        stream.position.y = 15;
      }

      const flicker = 0.2 + Math.sin(t * 8 + i) * 0.05;
      const mesh = stream.children[0] as THREE.Mesh;
      if (mesh && mesh.material && 'opacity' in mesh.material) {
        (mesh.material as THREE.MeshBasicMaterial).opacity = flicker;
      }
    });
  });

  return (
    <group ref={rainRef}>
      {dataStreams.map((stream, i) => (
        <group key={i} position={[stream.x, stream.y, stream.z]}>
          <mesh>
            radius = 8 + Math.random() * 15;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;

      return {
        x: radius * Math.sin(phi) * Math.cos(theta),
        y: radius * Math.sin(phi) * Math.sin(theta),
        z: radius * Math.cos(phi) - 10,
        length: 1 + Math.random() * 3,
        speed: 0.1 + Math.random() * 0.3,
        axis: Math.random() > 0.5 ? "x" : "y",
      };
    });
  }, [count]);

  useFrame((state) => {
    if (!linesRef.current) return;
    const t = state.clock.getElapsedTime();

    linesRef.current.children.forEach((line, i) => {
      const data = lineData[i];
      if (!data) return;

      if (data.axis === "x") {
        line.rotation.x = t * data.speed;
      } else {
        line.rotation.y = t * data.speed;
      }

      // Subtle floating
      line.position.y = data.y + Math.sin(t * 0.5 + i) * 0.5;
    });
  });

  return (
    <group ref={linesRef}>
      {lineData.map((data, i) => (
        <mesh key={i} position={[data.x, data.y, data.z]}>
          <planeGeometry args={[0.01, data.length]} />
          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={0.3}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

// Cosmic Dust Particles - Atmospheric depth
function AtmosphericDust({ count = 800 }: { count?: number }) {
  const dustRef = useRef<THREE.Points>(null);

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const radius = 10 + Math.random() * 30;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi) - 20;

      vel[i * 3] = (Math.random() - 0.5) * 0.01;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.01;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.01;
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

      // Wrap around
      if (Math.abs(pos[i * 3]) > 40) pos[i * 3] *= -0.5;
      if (Math.abs(pos[i * 3 + 1]) > 40) pos[i * 3 + 1] *= -0.5;
      if (pos[i * 3 + 2] > 10) pos[i * 3 + 2] = -40;
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
        size={0.015}
        color="#88ccff"
        transparent
        opacity={0.3}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Volumetric Light Rays - God rays effect
function VolumetricRays() {
  const raysRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!raysRef.current) return;
    const t = state.clock.getElapsedTime();

    raysRef.current.rotation.z = t * 0.01;

    raysRef.current.children.forEach((ray, i) => {
      const pulse = 0.3 + Math.sin(t * 0.5 + i) * 0.2;
      const mesh = ray as THREE.Mesh;
      if (mesh.material && 'opacity' in mesh.material) {
        (mesh.material as THREE.MeshBasicMaterial).opacity = pulse * 0.08;
      }
    });
  });

  const rays = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      rotation: (Math.PI * 2 * i) / 8,
    }));
  }, []);

  return (
    <group ref={raysRef} position={[0, 0, -25]}>
      {rays.map((ray, i) => (
        <mesh key={i} rotation={[0, 0, ray.rotation]} position={[0, 0, 0]}>
          <planeGeometry args={[0.3, 30]} />
          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={0.08}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
}

// Perspective Distortion Planes - Space folding
function PerspectivePlanes() {
  const planesRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!planesRef.current) return;
    const t = state.clock.getElapsedTime();

    planesRef.current.rotation.x = Math.sin(t * 0.03) * 0.15;
    planesRef.current.rotation.y = t * 0.02;
  });

  const planes = useMemo(() => {
    return Array.from({ length: 5 }, (_, i) => ({
      z: -10 - i * 8,
      opacity: 0.06 - i * 0.008,
    }));
  }, []);

  return (
    <group ref={planesRef}>
      {planes.map((plane, i) => (
        <mesh key={i} position={[0, 0, plane.z]}>
          <planeGeometry args={[30, 30, 20, 20]} />
          <meshBasicMaterial
            color="#1144aa"
            wireframe
            transparent
            opacity={plane.opacity}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

// Dimensional Light Trails - Subtle curved glowing paths (RIGHT SIDE)
function DimensionalLightTrails() {
  const trailsRef = useRef<THREE.Group>(null);

  const trailPaths = useMemo(() => {
    return Array.from({ length: 6 }, (_, i) => {
      const points = [];
      const startX = 8 + Math.random() * 8; // Right side positioning
      const startY = -8 + i * 3;
      const startZ = -15 + Math.random() * 10;

      for (let j = 0; j < 40; j++) {
        const t = j / 40;
        const x = startX + Math.sin(t * Math.PI * 2) * 2;
        const y = startY + t * 12;
        const z = startZ + Math.cos(t * Math.PI * 2) * 1.5;
        points.push(new THREE.Vector3(x, y, z));
      }

      return {
        points,
        speed: 0.1 + Math.random() * 0.15,
        offset: Math.random() * Math.PI * 2,
      };
    });
  }, []);

  useFrame((state) => {
    if (!trailsRef.current) return;
    const t = state.clock.getElapsedTime();

    trailsRef.current.children.forEach((trail, i) => {
      const data = trailPaths[i];
      if (!data) return;

      const pulse = 0.15 + Math.sin(t * data.speed + data.offset) * 0.1;
      const mesh = trail as THREE.Mesh;
      if (mesh.material && 'opacity' in mesh.material) {
        (mesh.material as THREE.MeshBasicMaterial).opacity = pulse;
      }
    });
  });

  return (
    <group ref={trailsRef}>
      {trailPaths.map((trail, i) => {
        const curve = new THREE.CatmullRomCurve3(trail.points);
        const tubeGeometry = new THREE.TubeGeometry(curve, 64, 0.008, 8, false);

        return (
          <mesh key={i} geometry={tubeGeometry}>
            <meshBasicMaterial
              color={i % 3 === 0 ? "#00ffff" : i % 3 === 1 ? "#4488ff" : "#8844ff"}
              transparent
              opacity={0.25}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        );
      })}
    </group>
  );
}

// Right-Side Recursive Grid Depth
function RightSideRecursiveGrid() {
  const gridRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!gridRef.current) return;
    const t = state.clock.getElapsedTime();

    gridRef.current.rotation.y = Math.sin(t * 0.02) * 0.05;
    gridRef.current.rotation.x = Math.cos(t * 0.03) * 0.03;
  });

  const gridLayers = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      z: -5 - i * 4,
      x: 8 + i * 0.5,
      opacity: 0.12 - i * 0.013,
      scale: 1 + i * 0.15,
    }));
  }, []);

  return (
    <group ref={gridRef}>
      {gridLayers.map((layer, i) => (
        <group key={i} position={[layer.x, 0, layer.z]} scale={layer.scale}>
          {/* Vertical lines */}
          {[-2, -1, 0, 1, 2].map((x) => (
            <mesh key={`v-${x}`} position={[x * 1.5, 0, 0]}>
              <planeGeometry args={[0.012, 10]} />
              <meshBasicMaterial
                color="#00aaff"
                transparent
                opacity={layer.opacity}
                side={THREE.DoubleSide}
              />
            </mesh>
          ))}
          {/* Horizontal lines */}
          {[-2, -1, 0, 1, 2].map((y) => (
            <mesh key={`h-${y}`} position={[0, y * 1.5, 0]}>
              <planeGeometry args={[8, 0.012]} />
              <meshBasicMaterial
                color="#00aaff"
                transparent
                opacity={layer.opacity}
                side={THREE.DoubleSide}
              />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}

// Sparse Cosmic Dust - Right side focus
function SparseCosmicDust({ count = 150 }: { count?: number }) {
  const dustRef = useRef<THREE.Points>(null);

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Focus on right side
      const radius = 8 + Math.random() * 12;
      const theta = -Math.PI / 3 + Math.random() * (Math.PI / 1.5); // Right hemisphere
      const phi = Math.random() * Math.PI;

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20 - 5;

      vel[i * 3] = (Math.random() - 0.5) * 0.008;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.008;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.008;
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

      // Wrap around
      if (pos[i * 3] > 25) pos[i * 3] = 8;
      if (pos[i * 3] < 5) pos[i * 3] = 25;
      if (Math.abs(pos[i * 3 + 1]) > 20) pos[i * 3 + 1] *= -0.8;
      if (pos[i * 3 + 2] > 10) pos[i * 3 + 2] = -20;
      if (pos[i * 3 + 2] < -20) pos[i * 3 + 2] = 10;
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
        size={0.012}
        color="#99ddff"
        transparent
        opacity={0.4}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Dimensional Window - Massive recursive geometric structure (RIGHT SIDE)
function DimensionalWindow() {
  const windowRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!windowRef.current) return;
    const t = state.clock.getElapsedTime();
    const p = state.pointer;

    // Slow rotation with mouse parallax
    windowRef.current.rotation.y = Math.sin(t * 0.03) * 0.15 + p.x * 0.05;
    windowRef.current.rotation.x = Math.cos(t * 0.04) * 0.1 - p.y * 0.03;
  });

  const frames = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      z: -5 - i * 5,
      scale: 0.6 + i * 0.25,
      opacity: 0.15 - i * 0.011,
      x: 10 + i * 0.4,
    }));
  }, []);

  return (
    <group ref={windowRef}>
      {frames.map((frame, i) => (
        <group key={i} position={[frame.x, 0, frame.z]} scale={frame.scale}>
          {/* Outer frame */}
          <lineSegments>
            <edgesGeometry
              attach="geometry"
              args={[new THREE.BoxGeometry(8, 12, 0.1)]}
            />
            <lineBasicMaterial
              color={i % 3 === 0 ? "#00ffff" : i % 3 === 1 ? "#4488ff" : "#8844ff"}
              transparent
              opacity={frame.opacity}
            />
          </lineSegments>

          {/* Inner cross divisions */}
          <mesh position={[0, 0, 0]}>
            <planeGeometry args={[8, 0.015]} />
            <meshBasicMaterial
              color="#00aaff"
              transparent
              opacity={frame.opacity * 0.7}
              side={THREE.DoubleSide}
            />
          </mesh>
          <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <planeGeometry args={[12, 0.015]} />
            <meshBasicMaterial
              color="#00aaff"
              transparent
              opacity={frame.opacity * 0.7}
              side={THREE.DoubleSide}
            />
          </mesh>

          {/* Corner accent lines */}
          {[
            [-3.8, 5.8],
            [3.8, 5.8],
            [-3.8, -5.8],
            [3.8, -5.8],
          ].map((pos, j) => (
            <group key={j} position={[pos[0], pos[1], 0]}>
              <mesh>
                <planeGeometry args={[0.6, 0.01]} />
                <meshBasicMaterial
                  color="#ffffff"
                  transparent
                  opacity={frame.opacity * 0.5}
                  side={THREE.DoubleSide}
                />
              </mesh>
              <mesh rotation={[0, 0, Math.PI / 2]}>
                <planeGeometry args={[0.6, 0.01]} />
                <meshBasicMaterial
                  color="#ffffff"
                  transparent
                  opacity={frame.opacity * 0.5}
                  side={THREE.DoubleSide}
                />
              </mesh>
            </group>
          ))}
        </group>
      ))}
    </group>
  );
}

// Temporal Echo Fragments - Floating dimensional glass shards (ORIGINAL EFFECT)
function TemporalEchoFragments() {
  const fragmentsRef = useRef<THREE.Group>(null);

  const fragments = useMemo(() => {
    return Array.from({ length: 15 }, (_, i) => {
      // Create irregular shard shapes
      const points = [];
      const numPoints = 5 + Math.floor(Math.random() * 4);
      
      for (let j = 0; j < numPoints; j++) {
        const angle = (j / numPoints) * Math.PI * 2;
        const radius = 0.3 + Math.random() * 0.5;
        points.push(
          new THREE.Vector2(
            Math.cos(angle) * radius,
            Math.sin(angle) * radius
          )
        );
      }

      return {
        points,
        x: 10 + Math.random() * 8,
        y: -6 + i * 1.2 + (Math.random() - 0.5) * 2,
        z: -8 - Math.random() * 25,
        rotX: Math.random() * Math.PI,
        rotY: Math.random() * Math.PI,
        rotZ: Math.random() * Math.PI,
        speedX: 0.05 + Math.random() * 0.1,
        speedY: 0.03 + Math.random() * 0.08,
        speedZ: 0.04 + Math.random() * 0.09,
        offset: Math.random() * Math.PI * 2,
        color: i % 3 === 0 ? "#00ffff" : i % 3 === 1 ? "#8844ff" : "#ffffff",
        opacity: 0.08 + Math.random() * 0.12,
      };
    });
  }, []);

  useFrame((state) => {
    if (!fragmentsRef.current) return;
    const t = state.clock.getElapsedTime();
    const p = state.pointer;

    fragmentsRef.current.children.forEach((fragment, i) => {
      const data = fragments[i];
      if (!data) return;

      // Slow rotation
      fragment.rotation.x = data.rotX + t * data.speedX;
      fragment.rotation.y = data.rotY + t * data.speedY;
      fragment.rotation.z = data.rotZ + t * data.speedZ;

      // Gentle floating
      fragment.position.y = data.y + Math.sin(t * 0.3 + data.offset) * 0.4;
      fragment.position.x = data.x + Math.cos(t * 0.2 + data.offset) * 0.3;

      // Mouse parallax - very subtle
      fragment.position.x += p.x * 0.5;
      fragment.position.y -= p.y * 0.3;

      // Pulsing opacity
      const pulse = 1 + Math.sin(t * 0.5 + data.offset) * 0.3;
      const mesh = fragment.children[0] as THREE.Mesh;
      if (mesh && mesh.material && 'opacity' in mesh.material) {
        (mesh.material as THREE.MeshStandardMaterial).opacity = data.opacity * pulse;
      }
    });
  });

  return (
    <group ref={fragmentsRef}>
      {fragments.map((frag, i) => {
        const shape = new THREE.Shape(frag.points);
        const geometry = new THREE.ShapeGeometry(shape);

        return (
          <mesh
            key={i}
            position={[frag.x, frag.y, frag.z]}
            rotation={[frag.rotX, frag.rotY, frag.rotZ]}
            geometry={geometry}
          >
            <meshStandardMaterial
              color={frag.color}
              emissive={frag.color}
              emissiveIntensity={0.3}
              transparent
              opacity={frag.opacity}
              side={THREE.DoubleSide}
              metalness={0.9}
              roughness={0.1}
            />
          </mesh>
        );
      })}
    </group>
  );
}

// Fragment Glow Particles - Tiny cosmic particles around fragments
function FragmentGlowParticles({ count = 200 }: { count?: number }) {
  const particlesRef = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo((): [Float32Array, Float32Array] => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Focus around fragment area (right side)
      const radius = 8 + Math.random() * 10;
      const theta = -Math.PI / 4 + Math.random() * (Math.PI / 2);
      const phi = Math.random() * Math.PI;

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 2] = -8 - Math.random() * 25;

      // Color variation
      const colorChoice = Math.random();
      if (colorChoice < 0.4) {
        col[i * 3] = 0;
        col[i * 3 + 1] = 1;
        col[i * 3 + 2] = 1; // Cyan
      } else if (colorChoice < 0.7) {
        col[i * 3] = 0.53;
        col[i * 3 + 1] = 0.27;
        col[i * 3 + 2] = 1; // Violet
      } else {
        col[i * 3] = 1;
        col[i * 3 + 1] = 1;
        col[i * 3 + 2] = 1; // White
      }
    }

    return [pos, col];
  }, [count]);

  useFrame((state) => {
    if (!particlesRef.current) return;
    const t = state.clock.getElapsedTime();

    const pos = particlesRef.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < count; i++) {
      // Very slow ambient drift
      pos[i * 3 + 1] += Math.sin(t * 0.1 + i) * 0.002;
      pos[i * 3 + 2] += 0.005;

      // Wrap around
      if (pos[i * 3 + 2] > 5) {
        pos[i * 3 + 2] = -30;
      }
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
        size={0.015}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Dimensional Distortion Field - Subtle warping effect around fragments
function DimensionalDistortionField() {
  const fieldRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!fieldRef.current) return;
    const t = state.clock.getElapsedTime();

    fieldRef.current.rotation.z = t * 0.02;
    
    const pulse = 1 + Math.sin(t * 0.4) * 0.05;
    fieldRef.current.scale.setScalar(pulse);

    const mat = fieldRef.current.material as THREE.MeshBasicMaterial;
    mat.opacity = 0.02 + Math.sin(t * 0.3) * 0.01;
  });

  return (
    <mesh ref={fieldRef} position={[14, 0, -15]}>
      <planeGeometry args={[15, 20, 32, 32]} />
      <meshBasicMaterial
        color="#00aaff"
        transparent
        opacity={0.03}
        side={THREE.DoubleSide}
        wireframe
      />
    </mesh>
  );
}

// Floating Coordinate Data - Futuristic interface text
function FloatingCoordinateData() {
  const dataRef = useRef<THREE.Group>(null);

  const coordinates = useMemo(() => {
    const texts = [
      "DIMENSION_07",
      "T+ 04:32:11",
      "X: 294.442",
      "Y: -127.983",
      "QUANTUM_FIELD",
      "SIGNAL_STABLE",
      "SECTOR_A135",
      "D_SPACE",
      "GRAVITY_SHIFT",
      "θ: 42.7°",
      "Z: 891.224",
      "SYNC_ACTIVE",
    ];

    return texts.map((text, i) => ({
      text,
      x: 8 + Math.random() * 10,
      y: -8 + i * 1.8,
      z: -8 - Math.random() * 20,
      speed: 0.2 + Math.random() * 0.3,
      offset: Math.random() * Math.PI * 2,
      size: 0.18 + Math.random() * 0.08,
    }));
  }, []);

  useFrame((state) => {
    if (!dataRef.current) return;
    const t = state.clock.getElapsedTime();

    dataRef.current.children.forEach((child, i) => {
      const data = coordinates[i];
      if (!data) return;

      // Slow floating motion
      child.position.y = data.y + Math.sin(t * data.speed + data.offset) * 0.3;
      
      // Subtle side drift
      child.position.x = data.x + Math.cos(t * data.speed * 0.5 + data.offset) * 0.2;

      // Pulsing opacity
      const pulse = 0.2 + Math.sin(t * 0.5 + data.offset) * 0.15;
      const mesh = child.children[0] as THREE.Mesh;
      if (mesh && mesh.material && 'opacity' in mesh.material) {
        (mesh.material as THREE.MeshBasicMaterial).opacity = pulse;
      }
    });
  });

  return (
    <group ref={dataRef}>
      {coordinates.map((coord, i) => (
        <group key={i} position={[coord.x, coord.y, coord.z]}>
          <mesh>
            <planeGeometry args={[coord.text.length * 0.15, 0.3]} />
            <meshBasicMaterial
              color={i % 2 === 0 ? "#00ffff" : "#8844ff"}
              transparent
              opacity={0.35}
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// Gravitational Distortion Waves - Subtle ripples (RIGHT SIDE)
function GravitationalWaves() {
  const wavesRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!wavesRef.current) return;
    const t = state.clock.getElapsedTime();

    wavesRef.current.children.forEach((wave, i) => {
      wave.rotation.z = t * 0.05 + i * 0.2;
      
      const pulse = 0.5 + Math.sin(t * 0.3 + i * 0.5) * 0.5;
      wave.scale.setScalar(1 + pulse * 0.1);

      const mesh = wave as THREE.Mesh;
      if (mesh.material && 'opacity' in mesh.material) {
        (mesh.material as THREE.MeshBasicMaterial).opacity = pulse * 0.05;
      }
    });
  });

  const waves = useMemo(() => {
    return Array.from({ length: 4 }, (_, i) => ({
      x: 12 + i * 2,
      z: -8 - i * 3,
      radius: 3 + i * 1.5,
    }));
  }, []);

  return (
    <group ref={wavesRef}>
      {waves.map((wave, i) => (
        <mesh key={i} position={[wave.x, 0, wave.z]} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[wave.radius, wave.radius + 0.02, 64]} />
          <meshBasicMaterial
            color="#00ccff"
            transparent
            opacity={0.05}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

// Live AI Neural Command Stream - JARVIS-inspired holographic code (RIGHT SIDE)
function LiveAINeuralCommandStream() {
  const streamRef = useRef<THREE.Group>(null);

  const codeLines = useMemo(() => {
    const snippets = [
      "neural.process(layer_7)",
      "inference.run(model_v4)",
      ">>> api.status: ACTIVE",
      "quantum.compute()",
      "ml.predict(tensor_data)",
      "system.optimize()",
      ">>> output: 0.9847",
      "neural.sync()",
      "ai.analyze(input)",
      ">>> status: RUNNING",
      "vision.detect(frame)",
      "nlp.tokenize(text)",
      ">>> confidence: 98%",
      "matrix.multiply(A, B)",
      "gradient.descent()",
      ">>> loss: 0.0234",
      "transformer.encode()",
      "attention.compute()",
    ];

    return snippets.map((text, i) => ({
      text,
      x: 9 + Math.random() * 7,
      y: 8 - i * 0.9,
      z: -6 - Math.random() * 18,
      speed: 0.15 + Math.random() * 0.25,
      offset: Math.random() * Math.PI * 2,
      width: text.length * 0.12,
    }));
  }, []);

  useFrame((state) => {
    if (!streamRef.current) return;
    const t = state.clock.getElapsedTime();

    streamRef.current.children.forEach((child, i) => {
      const data = codeLines[i];
      if (!data) return;

      // Smooth scrolling upward
      child.position.y = data.y + (t * data.speed) % 18;
      
      // Wrap around
      if (child.position.y > 10) {
        child.position.y = -8;
      }

      // Subtle flickering opacity
      const flicker = 0.25 + Math.sin(t * 4 + data.offset) * 0.05;
      const mesh = child.children[0] as THREE.Mesh;
      if (mesh && mesh.material && 'opacity' in mesh.material) {
        (mesh.material as THREE.MeshBasicMaterial).opacity = flicker;
      }
    });
  });

  return (
    <group ref={streamRef}>
      {codeLines.map((line, i) => (
        <group key={i} position={[line.x, line.y, line.z]}>
          <mesh>
            <planeGeometry args={[line.width, 0.2]} />
            <meshBasicMaterial
              color={line.text.startsWith(">>>") ? "#00ffff" : "#88ccff"}
              transparent
              opacity={0.3}
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// AI System Panels - Minimal floating UI fragments (RIGHT SIDE)
function AISystemPanels() {
  const panelsRef = useRef<THREE.Group>(null);

  const panels = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      x: 10 + Math.random() * 6,
      y: -7 + i * 2.2,
      z: -7 - Math.random() * 15,
      width: 1.5 + Math.random() * 1,
      height: 0.8 + Math.random() * 0.6,
      speed: 0.1 + Math.random() * 0.15,
      offset: Math.random() * Math.PI * 2,
    }));
  }, []);

  useFrame((state) => {
    if (!panelsRef.current) return;
    const t = state.clock.getElapsedTime();
    const p = state.pointer;

    panelsRef.current.children.forEach((panel, i) => {
      const data = panels[i];
      if (!data) return;

      // Gentle floating
      panel.position.y = data.y + Math.sin(t * data.speed + data.offset) * 0.3;
      
      // Mouse parallax
      panel.position.x = data.x + p.x * 0.3;
      panel.position.y += -p.y * 0.2;

      // Pulsing opacity
      const pulse = 0.15 + Math.sin(t * 0.4 + data.offset) * 0.08;
      panel.children.forEach((child) => {
        const mesh = child as THREE.Mesh;
        if (mesh.material && 'opacity' in mesh.material) {
          (mesh.material as THREE.MeshBasicMaterial).opacity = pulse;
        }
      });
    });
  });

  return (
    <group ref={panelsRef}>
      {panels.map((panel, i) => (
        <group key={i} position={[panel.x, panel.y, panel.z]}>
          {/* Panel background */}
          <mesh>
            <planeGeometry args={[panel.width, panel.height]} />
            <meshBasicMaterial
              color="#001a33"
              transparent
              opacity={0.2}
              side={THREE.DoubleSide}
            />
          </mesh>
          {/* Panel border */}
          <lineSegments>
            <edgesGeometry
              attach="geometry"
              args={[new THREE.PlaneGeometry(panel.width, panel.height)]}
            />
            <lineBasicMaterial
              color={i % 2 === 0 ? "#00ffff" : "#8844ff"}
              transparent
              opacity={0.3}
            />
          </lineSegments>
          {/* Inner accent line */}
          <mesh position={[0, panel.height * 0.3, 0.01]}>
            <planeGeometry args={[panel.width * 0.8, 0.01]} />
            <meshBasicMaterial
              color="#00aaff"
              transparent
              opacity={0.25}
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// Neural Data Streams - Animated flowing data connections (RIGHT SIDE)
function NeuralDataStreams() {
  const streamsRef = useRef<THREE.Group>(null);

  const streamPaths = useMemo(() => {
    return Array.from({ length: 10 }, (_, i) => {
      const points = [];
      const startX = 9 + Math.random() * 6;
      const startY = -7 + i * 1.5;
      const startZ = -8 - Math.random() * 12;

      for (let j = 0; j < 25; j++) {
        const t = j / 25;
        const x = startX + Math.sin(t * Math.PI * 3) * 0.8;
        const y = startY + t * 8;
        const z = startZ + Math.cos(t * Math.PI * 2) * 0.5;
        points.push(new THREE.Vector3(x, y, z));
      }

      return {
        points,
        speed: 0.2 + Math.random() * 0.3,
        offset: Math.random() * Math.PI * 2,
      };
    });
  }, []);

  useFrame((state) => {
    if (!streamsRef.current) return;
    const t = state.clock.getElapsedTime();

    streamsRef.current.children.forEach((stream, i) => {
      const data = streamPaths[i];
      if (!data) return;

      const pulse = 0.12 + Math.sin(t * data.speed + data.offset) * 0.08;
      const mesh = stream as THREE.Mesh;
      if (mesh.material && 'opacity' in mesh.material) {
        (mesh.material as THREE.MeshBasicMaterial).opacity = pulse;
      }
    });
  });

  return (
    <group ref={streamsRef}>
      {streamPaths.map((stream, i) => {
        const curve = new THREE.CatmullRomCurve3(stream.points);
        const tubeGeometry = new THREE.TubeGeometry(curve, 48, 0.004, 6, false);

        return (
          <mesh key={i} geometry={tubeGeometry}>
            <meshBasicMaterial
              color={i % 3 === 0 ? "#00ffff" : i % 3 === 1 ? "#00aaff" : "#0088ff"}
              transparent
              opacity={0.2}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        );
      })}
    </group>
  );
}

// Neural Network Nodes - Subtle connection points (RIGHT SIDE)
function NeuralNetworkNodes({ count = 50 }: { count?: number }) {
  const nodesRef = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo((): [Float32Array, Float32Array] => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Focus on right side
      pos[i * 3] = 9 + Math.random() * 7;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 2] = -6 - Math.random() * 18;

      // Cyan glow
      col[i * 3] = 0;
      col[i * 3 + 1] = 0.8 + Math.random() * 0.2;
      col[i * 3 + 2] = 1;
    }

    return [pos, col];
  }, [count]);

  useFrame((state) => {
    if (!nodesRef.current) return;
    const t = state.clock.getElapsedTime();

    const pos = nodesRef.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < count; i++) {
      // Subtle pulsing movement
      pos[i * 3 + 1] += Math.sin(t * 0.5 + i * 0.1) * 0.003;
    }

    nodesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={nodesRef}>
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
        size={0.025}
        vertexColors
        transparent
        opacity={0.5}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Holographic Glow Particles - Ambient AI atmosphere (RIGHT SIDE)
function HolographicGlowParticles({ count = 120 }: { count?: number }) {
  const particlesRef = useRef<THREE.Points>(null);

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Right-side focus
      pos[i * 3] = 9 + Math.random() * 8;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 2] = -5 - Math.random() * 20;

      vel[i * 3] = (Math.random() - 0.5) * 0.005;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.008;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.005;
    }

    return [pos, vel];
  }, [count]);

  useFrame(() => {
    if (!particlesRef.current) return;
    const pos = particlesRef.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < count; i++) {
      pos[i * 3] += velocities[i * 3];
      pos[i * 3 + 1] += velocities[i * 3 + 1];
      pos[i * 3 + 2] += velocities[i * 3 + 2];

      // Wrap around
      if (pos[i * 3] > 18) pos[i * 3] = 9;
      if (pos[i * 3] < 8) pos[i * 3] = 18;
      if (pos[i * 3 + 1] > 10) pos[i * 3 + 1] = -10;
      if (pos[i * 3 + 1] < -10) pos[i * 3 + 1] = 10;
      if (pos[i * 3 + 2] > 5) pos[i * 3 + 2] = -25;
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
      </bufferGeometry>
      <pointsMaterial
        size={0.018}
        color="#00ddff"
        transparent
        opacity={0.4}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Main Scene
function Scene() {
  return (
    <>
      {/* Subtle ambient lighting */}
      <ambientLight intensity={0.1} />
      <pointLight position={[0, 0, 5]} intensity={5} color="#4488ff" distance={30} />
      <pointLight position={[10, 10, -10]} intensity={3} color="#8844ff" distance={30} />

      {/* Dimensional structures */}
      <DimensionalGrid />
      <DimensionalCorridors />
      <RecursiveDepthBoxes />
      <PerspectivePlanes />

      {/* Atmospheric elements */}
      <FloatingDimensionalLines />
      <AtmosphericDust />
      <VolumetricRays />

      {/* Right-side enhanced atmospheric effects */}
      <DimensionalLightTrails />
      <RightSideRecursiveGrid />
      <SparseCosmicDust />
      <GravitationalWaves />

      {/* Dimensional Window & Coordinate Data */}
      <DimensionalWindow />
      <FloatingCoordinateData />

      {/* Temporal Echo Fragments - Original cinematic effect */}
      <TemporalEchoFragments />
      <FragmentGlowParticles />
      <DimensionalDistortionField />

      {/* Live AI Neural Command Stream - JARVIS-inspired */}
      <LiveAINeuralCommandStream />
      <AISystemPanels />
      <NeuralDataStreams />
      <NeuralNetworkNodes />
      <HolographicGlowParticles />
    </>
  );
}

// Main Component
export default function TesseractBackground() {
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
        <div className="absolute inset-0 bg-gradient-to-br from-[#000510] via-[#001a33] to-bg opacity-80" />
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(90deg, transparent 0%, #00ffff 50%, transparent 100%),
                             linear-gradient(0deg, transparent 0%, #4488ff 50%, transparent 100%)`,
            backgroundSize: '100px 100px',
          }}
        />
      </div>
    );
  }

  return (
    <div aria-hidden className="absolute inset-0 pointer-events-none">
      {/* 3D Canvas - fills entire background */}
      <Canvas
        camera={{ position: [0, 0, 10], fov: 75 }}
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
        <Scene />
      </Canvas>
    </div>
  );
}
