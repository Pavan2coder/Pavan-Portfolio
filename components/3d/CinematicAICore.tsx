"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Icosahedron, Line, Sphere, Stars, Torus, Html, OrbitControls } from "@react-three/drei";
import { Suspense, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useSound } from "@/hooks/useSound";
import { 
  SiPython, 
  SiReact, 
  SiNodedotjs, 
  SiMongodb, 
  SiFlutter, 
  SiFastapi,
  SiDocker,
  SiThreedotjs,
  SiJavascript,
  SiTailwindcss
} from "react-icons/si";
import { IconType } from "react-icons";

// Real skill data with tech stack colors and official logos
const skills: Array<{
  name: string;
  color: string;
  position: [number, number, number];
  Icon: IconType;
  description: string;
}> = [
  { 
    name: "Python", 
    color: "#3776AB", 
    position: [3.5, 1.5, 0.5], 
    Icon: SiPython,
    description: "AI • Backend • Automation"
  },
  { 
    name: "React", 
    color: "#61DAFB", 
    position: [-3.5, 1.5, 0.5], 
    Icon: SiReact,
    description: "Frontend • UI/UX • Components"
  },
  { 
    name: "Node.js", 
    color: "#339933", 
    position: [0, 3.5, 1.5], 
    Icon: SiNodedotjs,
    description: "Backend • APIs • Server"
  },
  { 
    name: "MongoDB", 
    color: "#47A248", 
    position: [0, -3.5, 1.5], 
    Icon: SiMongodb,
    description: "Database • NoSQL • Cloud"
  },
  { 
    name: "Flutter", 
    color: "#02569B", 
    position: [2.5, -2, 2.5], 
    Icon: SiFlutter,
    description: "Mobile • Cross-Platform • UI"
  },
  { 
    name: "FastAPI", 
    color: "#009688", 
    position: [-2.5, -2, 2.5], 
    Icon: SiFastapi,
    description: "Python • REST • High Performance"
  },
  { 
    name: "Docker", 
    color: "#2496ED", 
    position: [2.5, 2, -2.5], 
    Icon: SiDocker,
    description: "Containers • DevOps • Deploy"
  },
  { 
    name: "Tailwind", 
    color: "#06B6D4", 
    position: [-2.5, 2, -2.5], 
    Icon: SiTailwindcss,
    description: "CSS • Styling • Design System"
  },
  { 
    name: "Three.js", 
    color: "#000000", 
    position: [0, 2.5, -2.5], 
    Icon: SiThreedotjs,
    description: "3D • WebGL • Graphics"
  },
  { 
    name: "JavaScript", 
    color: "#F7DF1E", 
    position: [0, -2.5, -2.5], 
    Icon: SiJavascript,
    description: "Core • Web • Full Stack"
  },
];

interface SkillNodeProps {
  skill: {
    name: string;
    color: string;
    position: [number, number, number];
    Icon: IconType;
    description: string;
  };
  onClick: () => void;
}

function SkillNode({ skill, onClick }: SkillNodeProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const { Icon } = skill;

  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.getElapsedTime();
      
      // Gentle floating
      const floatOffset = Math.sin(t * 0.8 + skill.position[0]) * 0.08;
      groupRef.current.position.y = skill.position[1] + floatOffset;
      
      // Slight rotation
      groupRef.current.rotation.y = t * 0.3;
      groupRef.current.rotation.x = Math.sin(t * 0.5) * 0.2;
      
      // Smooth scale animation
      const targetScale = hovered ? 1.3 : 1;
      groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  return (
    <group 
      ref={groupRef}
      position={skill.position as [number, number, number]}
    >
      {/* Tech logo with holographic glow - NO BACKGROUND SPHERE */}
      <Html
        distanceFactor={6}
        center
        zIndexRange={[0, 0]}
      >
        <div 
          className="flex items-center justify-center transition-all duration-300 cursor-pointer"
          style={{
            width: hovered ? '90px' : '70px',
            height: hovered ? '90px' : '70px',
            filter: `drop-shadow(0 0 ${hovered ? '20px' : '12px'} ${skill.color}) drop-shadow(0 0 ${hovered ? '40px' : '24px'} ${skill.color}80)`,
          }}
          onClick={onClick}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <Icon 
            size={hovered ? 50 : 38}
            color={skill.color}
            style={{
              filter: `brightness(${hovered ? 1.8 : 1.4}) saturate(${hovered ? 1.5 : 1.2})`,
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          />
        </div>
      </Html>

      {/* Holographic ring effect */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.4, 0.45, 32]} />
        <meshBasicMaterial
          color={skill.color}
          transparent
          opacity={hovered ? 0.6 : 0.3}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Info panel on hover */}
      {hovered && (
        <Html 
          position={[0, 0.9, 0]} 
          distanceFactor={8} 
          center
          zIndexRange={[100, 0]}
        >
          <div className="bg-bg/95 backdrop-blur-md border border-primary/60 rounded-lg px-4 py-3 shadow-glow-md pointer-events-none animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div className="flex items-center gap-2 mb-1">
              <Icon size={20} color={skill.color} />
              <div className="text-sm font-display uppercase tracking-wider text-primary whitespace-nowrap font-bold">
                {skill.name}
              </div>
            </div>
            <div className="text-xs text-primary/70 whitespace-nowrap">
              {skill.description}
            </div>
          </div>
        </Html>
      )}
    </group>
  );
}

function CoreSphere() {
  const innerRef = useRef<THREE.Mesh>(null);
  const midRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);
  const wire2Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (innerRef.current) {
      innerRef.current.rotation.y = t * 0.35;
      innerRef.current.rotation.x = Math.sin(t * 0.4) * 0.25;
      const pulse = 1 + Math.sin(t * 1.6) * 0.04;
      innerRef.current.scale.setScalar(pulse);
    }
    if (midRef.current) {
      midRef.current.rotation.y = -t * 0.22;
      midRef.current.rotation.x = t * 0.15;
      midRef.current.rotation.z = Math.sin(t * 0.3) * 0.2;
    }
    if (wireRef.current) {
      wireRef.current.rotation.y = -t * 0.18;
      wireRef.current.rotation.z = t * 0.08;
      wireRef.current.rotation.x = Math.cos(t * 0.25) * 0.3;
    }
    if (wire2Ref.current) {
      wire2Ref.current.rotation.y = t * 0.12;
      wire2Ref.current.rotation.x = -t * 0.07;
    }
  });

  return (
    <group>
      <Sphere ref={innerRef as any} args={[0.7, 48, 48]}>
        <meshStandardMaterial
          color={"#00f5d4"}
          emissive={"#6366f1"}
          emissiveIntensity={2.8}
          transparent
          opacity={0.94}
          metalness={0.5}
          roughness={0.12}
        />
      </Sphere>

      <Icosahedron ref={midRef} args={[1.15, 2]}>
        <meshStandardMaterial
          color={new THREE.Color("#6366f1")}
          emissive={new THREE.Color("#00f5d4")}
          emissiveIntensity={1.4}
          metalness={0.75}
          roughness={0.15}
          transparent
          opacity={0.6}
        />
      </Icosahedron>

      <Icosahedron ref={wireRef} args={[1.65, 1]}>
        <meshBasicMaterial color={"#6366f1"} wireframe transparent opacity={0.6} />
      </Icosahedron>

      <Icosahedron ref={wire2Ref} args={[1.95, 2]}>
        <meshBasicMaterial color={"#00f5d4"} wireframe transparent opacity={0.25} />
      </Icosahedron>
    </group>
  );
}

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
        <meshBasicMaterial color={"#6366f1"} transparent opacity={0.85} />
      </Torus>
      <Torus ref={b} args={[2.75, 0.008, 16, 140]} rotation={[Math.PI / 3, 0.4, 0]}>
        <meshBasicMaterial color={"#00f5d4"} transparent opacity={0.7} />
      </Torus>
      <Torus ref={c} args={[3.2, 0.006, 16, 140]} rotation={[0.6, 1.1, 0]}>
        <meshBasicMaterial color={"#ffaa00"} transparent opacity={0.65} />
      </Torus>
      <Torus ref={d} args={[3.65, 0.005, 16, 140]} rotation={[1.2, 0.2, 0.6]}>
        <meshBasicMaterial color={"#f43f5e"} transparent opacity={0.5} />
      </Torus>
    </group>
  );
}

function ConnectionLines() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.05;
      groupRef.current.children.forEach((child, i) => {
        const mat = (child as any).material as THREE.LineBasicMaterial | undefined;
        if (mat) {
          mat.opacity = 0.15 + Math.abs(Math.sin(t * 1.2 + i * 0.5)) * 0.25;
        }
      });
    }
  });

  return (
    <group ref={groupRef}>
      {skills.map((skill, i) => (
        <Line
          key={i}
          points={[[0, 0, 0], skill.position as [number, number, number]]}
          color={skill.color}
          lineWidth={1.5}
          transparent
          opacity={0.2}
        />
      ))}
    </group>
  );
}

function OrbitParticles({ count = 300 }: { count?: number }) {
  const group = useRef<THREE.Group>(null);
  const seeds = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        r: 2.0 + Math.random() * 3.5,
        speed: 0.15 + Math.random() * 0.6,
        phase: Math.random() * Math.PI * 2,
        tilt: Math.random() * Math.PI,
        size: 0.015 + Math.random() * 0.04,
        color: Math.random() > 0.6 ? "#5eead4" : Math.random() > 0.3 ? "#a78bfa" : "#2dd4bf",
        opacity: 0.4 + Math.random() * 0.6,
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
      const pulse = 1 + Math.sin(t * 2 + s.phase) * 0.3;
      child.scale.setScalar(s.size * pulse);
    });
  });

  return (
    <group ref={group}>
      {seeds.map((s, i) => (
        <mesh key={i} scale={s.size}>
          <sphereGeometry args={[1, 8, 8]} />
          <meshBasicMaterial color={s.color} transparent opacity={s.opacity} />
        </mesh>
      ))}
    </group>
  );
}



function Scene({ onSkillClick }: { onSkillClick?: (skill: string) => void }) {
  const { playNodeClick, playNeuralPulse } = useSound();

  const handleSkillClick = (skillName: string) => {
    playNodeClick();
    setTimeout(() => playNeuralPulse(), 100);
    onSkillClick?.(skillName);
  };

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.55} />
      <pointLight position={[3, 3, 3]} intensity={1.6} color={"#a78bfa"} />
      <pointLight position={[-3, -2, -2]} intensity={1.3} color={"#2dd4bf"} />
      <pointLight position={[0, 4, -2]} intensity={0.9} color={"#5eead4"} />

      {/* OrbitControls for full interaction */}
      <OrbitControls
        enableDamping
        dampingFactor={0.05}
        rotateSpeed={0.8}
        zoomSpeed={1.2}
        minDistance={5}
        maxDistance={15}
        enablePan={false}
        makeDefault
      />

      <Suspense fallback={null}>
        <Float speed={1.6} rotationIntensity={0.4} floatIntensity={0.9}>
          <CoreSphere />
        </Float>
        <OrbitRings />
        <ConnectionLines />
        {skills.map((skill) => (
          <SkillNode
            key={skill.name}
            skill={skill}
            onClick={() => handleSkillClick(skill.name)}
          />
        ))}
        <OrbitParticles />
        <Stars
          radius={60}
          depth={50}
          count={2400}
          factor={4}
          saturation={0.7}
          fade
          speed={0.6}
        />
      </Suspense>
    </>
  );
}

export default function CinematicAICore({ onSkillClick }: { onSkillClick?: (skill: string) => void }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
    >
      <Scene onSkillClick={onSkillClick} />
    </Canvas>
  );
}
