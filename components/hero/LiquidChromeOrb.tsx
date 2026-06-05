"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Environment, Lightformer, Float } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

/**
 * Liquid chrome glass orb.
 * A high-poly metaball with a polished metallic surface that wobbles like
 * mercury (MeshDistortMaterial) and reflects a rig of violet/teal lightformers
 * for an oil-slick, iridescent sheen. Floats, and tilts toward the cursor.
 * Reduced-motion / no-WebGL falls back to a static gradient orb.
 */

function Blob() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const p = state.pointer;
    ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, p.x * 0.7, 0.06);
    ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, -p.y * 0.7, 0.06);
  });
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1.1, 72]} />
      <MeshDistortMaterial
        color="#9f8cff"
        metalness={0.85}
        roughness={0.18}
        distort={0.42}
        speed={1.7}
        envMapIntensity={1.6}
        clearcoat={1}
        clearcoatRoughness={0.12}
      />
    </mesh>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[0, 3, 5]} intensity={2.2} color="#ffffff" />
      <pointLight position={[4, 2, 3]} intensity={45} color="#a78bfa" />
      <pointLight position={[-4, -1, 2]} intensity={40} color="#2dd4bf" />
      <pointLight position={[0, -3, 4]} intensity={20} color="#5eead4" />
      <Float speed={1.3} rotationIntensity={0.5} floatIntensity={1.1}>
        <Blob />
      </Float>
      {/* reflection rig — no HDR/network, builds an env map from these */}
      <Environment resolution={256}>
        <group>
          <Lightformer form="circle" intensity={4} color="#a78bfa" position={[-2.5, 1.5, 2]} scale={3.5} />
          <Lightformer form="circle" intensity={4} color="#2dd4bf" position={[2.5, -1.2, 2]} scale={3.5} />
          <Lightformer form="rect" intensity={3} color="#c4b5fd" position={[0, 2.5, -2]} scale={[5, 3, 1]} />
          <Lightformer form="rect" intensity={2} color="#5eead4" position={[0, -2.5, 1]} scale={[5, 3, 1]} />
          <Lightformer form="circle" intensity={2.5} color="#ffffff" position={[0, 0, 3]} scale={2} />
        </group>
      </Environment>
    </>
  );
}

export default function LiquidChromeOrb() {
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

  if (!ok) {
    return (
      <div aria-hidden className="relative h-full w-full">
        <div
          className="absolute inset-[14%] rounded-full"
          style={{
            background:
              "radial-gradient(circle at 36% 30%, rgba(201,181,253,0.7), rgba(167,139,250,0.4) 40%, rgba(45,212,191,0.25) 65%, transparent 78%)",
            boxShadow: "inset 0 -16px 40px rgba(0,0,0,0.5), 0 30px 80px -30px rgba(167,139,250,0.5)",
          }}
        />
      </div>
    );
  }

  return (
    <div aria-hidden className="relative h-full w-full">
      <div className="absolute inset-[10%] rounded-full bg-primary/15 blur-3xl" />
      <div className="absolute inset-[26%] rounded-full bg-secondary/15 blur-3xl" />
      <Canvas
        camera={{ position: [0, 0, 4.4], fov: 40 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ width: "100%", height: "100%" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
