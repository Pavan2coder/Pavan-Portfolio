"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Icosahedron, Line, Sphere, Stars, Torus } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

/* -------------------------------------------------------------------------
 * Core Sphere — JARVIS neural core with multi-layer geometry
 * ----------------------------------------------------------------------- */
function CoreSphere({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const innerRef = useRef<THREE.Mesh>(null);
  const midRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);
  const wire2Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    // gentle ease to mouse parallax
    const mx = mouse.current.x * 0.35;
    const my = mouse.current.y * 0.25;

    if (innerRef.current) {
      innerRef.current.rotation.y = t * 0.35;
      innerRef.current.rotation.x = Math.sin(t * 0.4) * 0.25 + my;
      const pulse = 1 + Math.sin(t * 1.6) * 0.04;
      innerRef.current.scale.setScalar(pulse);
    }
    if (midRef.current) {
      midRef.current.rotation.y = -t * 0.22;
      midRef.current.rotation.x = -my * 0.6;
      midRef.current.rotation.z = mx * 0.4;
    }
    if (wireRef.current) {
      wireRef.current.rotation.y = -t * 0.18 + mx * 0.4;
      wireRef.current.rotation.z = t * 0.08;
      wireRef.current.rotation.x = my * 0.8;
    }
    if (wire2Ref.current) {
      wire2Ref.current.rotation.y = t * 0.12 - mx * 0.3;
      wire2Ref.current.rotation.x = -t * 0.07;
    }
  });

  return (
    <group>
      {/* inner glowing core */}
      <Sphere ref={innerRef as any} args={[0.7, 48, 48]}>
        <meshStandardMaterial
          color={"#7df9ff"}
          emissive={"#00ffff"}
          emissiveIntensity={2.4}
          transparent
          opacity={0.92}
          metalness={0.4}
          roughness={0.15}
        />
      </Sphere>

      {/* mid faceted shell */}
      <Icosahedron ref={midRef} args={[1.15, 2]}>
        <meshStandardMaterial
          color={new THREE.Color("#0ff")}
          emissive={new THREE.Color("#00ffff")}
          emissiveIntensity={1.1}
          metalness={0.7}
          roughness={0.18}
          transparent
          opacity={0.55}
        />
      </Icosahedron>

      {/* wireframe outer */}
      <Icosahedron ref={wireRef} args={[1.65, 1]}>
        <meshBasicMaterial color={"#00ffff"} wireframe transparent opacity={0.55} />
      </Icosahedron>

      {/* secondary outer wireframe */}
      <Icosahedron ref={wire2Ref} args={[1.95, 2]}>
        <meshBasicMaterial color={"#7df9ff"} wireframe transparent opacity={0.18} />
      </Icosahedron>
    </group>
  );
}

/* -------------------------------------------------------------------------
 * Orbit Rings — 4 layered tori on different planes
 * ----------------------------------------------------------------------- */
function OrbitRings() {
  const a = useRef<THREE.Mesh>(null);
  const b = useRef<THREE.Mesh>(null);
  const c = useRef<THREE.Mesh>(null);
  const d = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (a.current) a.current.rotation.z = t * 0.45;
    if (b.current) b.current.rotation.x = t * 0.32;
    if (c.current) c.current.rotation.y = -t * 0.27;
    if (d.current) {
      d.current.rotation.z = -t * 0.2;
      d.current.rotation.x = t * 0.18;
    }
  });

  return (
    <group>
      <Torus ref={a} args={[2.3, 0.012, 16, 140]} rotation={[Math.PI / 2.5, 0, 0]}>
        <meshBasicMaterial color={"#00ffff"} transparent opacity={0.7} />
      </Torus>
      <Torus ref={b} args={[2.75, 0.008, 16, 140]} rotation={[Math.PI / 3, 0.4, 0]}>
        <meshBasicMaterial color={"#7df9ff"} transparent opacity={0.55} />
      </Torus>
      <Torus ref={c} args={[3.2, 0.006, 16, 140]} rotation={[0.6, 1.1, 0]}>
        <meshBasicMaterial color={"#007cf0"} transparent opacity={0.55} />
      </Torus>
      <Torus ref={d} args={[3.65, 0.005, 16, 140]} rotation={[1.2, 0.2, 0.6]}>
        <meshBasicMaterial color={"#7df9ff"} transparent opacity={0.35} />
      </Torus>
    </group>
  );
}

/* -------------------------------------------------------------------------
 * Holographic radar circles — flat rings on z=0 with slight tilt
 * ----------------------------------------------------------------------- */
function RadarCircles() {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ref.current) {
      ref.current.rotation.z = t * 0.08;
    }
  });
  const radii = [2.5, 3.0, 3.5, 4.0];
  return (
    <group ref={ref} rotation={[Math.PI / 2.4, 0, 0]}>
      {radii.map((r, i) => (
        <mesh key={i}>
          <ringGeometry args={[r - 0.005, r, 128]} />
          <meshBasicMaterial
            color={i % 2 ? "#00ffff" : "#7df9ff"}
            transparent
            opacity={0.18 - i * 0.025}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

/* -------------------------------------------------------------------------
 * Orbiting particles
 * ----------------------------------------------------------------------- */
function OrbitParticles({ count = 90 }: { count?: number }) {
  const group = useRef<THREE.Group>(null);
  const seeds = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        r: 2.0 + Math.random() * 1.6,
        speed: 0.2 + Math.random() * 0.45,
        phase: Math.random() * Math.PI * 2,
        tilt: Math.random() * Math.PI,
        size: 0.02 + Math.random() * 0.045,
        color: Math.random() > 0.5 ? "#7df9ff" : "#00ffff",
      })),
    [count]
  );

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (!group.current) return;
    group.current.children.forEach((child, i) => {
      const s = seeds[i];
      if (!s) return;
      const a = t * s.speed + s.phase;
      child.position.set(
        Math.cos(a) * s.r,
        Math.sin(a) * s.r * Math.sin(s.tilt),
        Math.sin(a) * s.r * Math.cos(s.tilt)
      );
    });
  });

  return (
    <group ref={group}>
      {seeds.map((s, i) => (
        <mesh key={i} scale={s.size}>
          <sphereGeometry args={[1, 8, 8]} />
          <meshBasicMaterial color={s.color} />
        </mesh>
      ))}
    </group>
  );
}

/* -------------------------------------------------------------------------
 * Neural network lines — connect a fixed set of orbital points with lines
 * that pulse / flicker like a synapse map.
 * ----------------------------------------------------------------------- */
function NeuralLines({ nodes = 14 }: { nodes?: number }) {
  const points = useMemo(() => {
    const arr: THREE.Vector3[] = [];
    for (let i = 0; i < nodes; i++) {
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = 2 * Math.PI * Math.random();
      const r = 1.7;
      arr.push(
        new THREE.Vector3(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta),
          r * Math.cos(phi)
        )
      );
    }
    return arr;
  }, [nodes]);

  const segments = useMemo(() => {
    const segs: { a: THREE.Vector3; b: THREE.Vector3; phase: number }[] = [];
    for (let i = 0; i < points.length; i++) {
      // connect each node to ~3 closest others
      const dists = points
        .map((p, j) => ({ j, d: p.distanceTo(points[i]) }))
        .filter((x) => x.j !== i)
        .sort((a, b) => a.d - b.d)
        .slice(0, 3);
      for (const { j } of dists) {
        if (j > i) {
          segs.push({ a: points[i], b: points[j], phase: Math.random() * Math.PI * 2 });
        }
      }
    }
    return segs;
  }, [points]);

  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.06;
      groupRef.current.rotation.x = Math.sin(t * 0.1) * 0.15;
      groupRef.current.children.forEach((child, i) => {
        const mat = (child as any).material as THREE.LineBasicMaterial | undefined;
        if (mat) {
          const phase = segments[i]?.phase ?? 0;
          mat.opacity = 0.18 + Math.abs(Math.sin(t * 1.3 + phase)) * 0.45;
        }
      });
    }
  });

  return (
    <group ref={groupRef}>
      {segments.map((s, i) => (
        <Line
          key={i}
          points={[s.a, s.b]}
          color={"#00ffff"}
          lineWidth={1}
          transparent
          opacity={0.35}
        />
      ))}
      {points.map((p, i) => (
        <mesh key={`n-${i}`} position={p} scale={0.035}>
          <sphereGeometry args={[1, 8, 8]} />
          <meshBasicMaterial color={"#7df9ff"} />
        </mesh>
      ))}
    </group>
  );
}

/* -------------------------------------------------------------------------
 * Camera drift + mouse parallax
 * ----------------------------------------------------------------------- */
function CameraDrift({
  mouse,
}: {
  mouse: React.MutableRefObject<{ x: number; y: number }>;
}) {
  const { camera } = useThree();
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const driftX = Math.sin(t * 0.15) * 0.4;
    const driftY = Math.cos(t * 0.18) * 0.3;
    // ease camera toward drift + mouse offset
    const targetX = driftX + mouse.current.x * 0.7;
    const targetY = driftY + mouse.current.y * 0.5;
    camera.position.x += (targetX - camera.position.x) * 0.05;
    camera.position.y += (targetY - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

/* -------------------------------------------------------------------------
 * Scene + Canvas
 * ----------------------------------------------------------------------- */
function Scene() {
  const mouse = useRef({ x: 0, y: 0 });
  const { gl } = useThree();

  // window-level mouse listener so parallax still works when the canvas
  // wrapper is pointer-events-none (e.g. used as a section background)
  useMemo(() => {
    const el = gl.domElement;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) return;
      mouse.current.x = (e.clientX - r.left) / r.width - 0.5;
      mouse.current.y = -((e.clientY - r.top) / r.height - 0.5);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [gl]);

  return (
    <>
      <ambientLight intensity={0.55} />
      <pointLight position={[3, 3, 3]} intensity={1.6} color={"#00ffff"} />
      <pointLight position={[-3, -2, -2]} intensity={1.3} color={"#007cf0"} />
      <pointLight position={[0, 4, -2]} intensity={0.9} color={"#7df9ff"} />

      <Suspense fallback={null}>
        <Float speed={1.4} rotationIntensity={0.3} floatIntensity={0.7}>
          <CoreSphere mouse={mouse} />
          <NeuralLines />
        </Float>
        <OrbitRings />
        <RadarCircles />
        <OrbitParticles />
        <Stars
          radius={50}
          depth={40}
          count={1600}
          factor={3}
          saturation={0.6}
          fade
          speed={0.5}
        />
      </Suspense>
      <CameraDrift mouse={mouse} />
    </>
  );
}

export function AICore({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 6.5], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
