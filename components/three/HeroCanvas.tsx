/// <reference types="@react-three/fiber" />
"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function ParticleField({ mouse }: { mouse: { x: number; y: number } }) {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 1800;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.elapsedTime;
    pointsRef.current.rotation.y = time * 0.02;
    pointsRef.current.rotation.x = mouse.y * 0.05;
    pointsRef.current.rotation.z = mouse.x * 0.03;
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#6366f1"
        size={0.03}
        sizeAttenuation
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  );
}

function FloatingGeometry({ mouse }: { mouse: { x: number; y: number } }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;
    meshRef.current.rotation.x = time * 0.08 + mouse.y * 0.2;
    meshRef.current.rotation.y = time * 0.12 + mouse.x * 0.2;
    meshRef.current.position.y = Math.sin(time * 0.4) * 0.3;
  });

  return (
    <mesh ref={meshRef} position={[2.5, 0, -2]}>
      <icosahedronGeometry args={[2, 1]} />
      <meshBasicMaterial
        color="#6366f1"
        wireframe
        transparent
        opacity={0.12}
      />
    </mesh>
  );
}

function SecondaryOrb({ mouse }: { mouse: { x: number; y: number } }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;
    meshRef.current.rotation.x = -time * 0.06 + mouse.y * 0.1;
    meshRef.current.rotation.y = time * 0.09 - mouse.x * 0.1;
    meshRef.current.position.x = Math.sin(time * 0.3) * 0.4 - 3;
    meshRef.current.position.y = Math.cos(time * 0.2) * 0.3 + 0.5;
  });

  return (
    <mesh ref={meshRef} position={[-3, 0.5, -3]}>
      <torusKnotGeometry args={[1, 0.3, 80, 16]} />
      <meshBasicMaterial
        color="#06b6d4"
        wireframe
        transparent
        opacity={0.08}
      />
    </mesh>
  );
}

function Scene({ mouse }: { mouse: { x: number; y: number } }) {
  return (
    <>
      <ambientLight intensity={0.1} />
      <ParticleField mouse={mouse} />
      <FloatingGeometry mouse={mouse} />
      <SecondaryOrb mouse={mouse} />
    </>
  );
}

export default function HeroCanvas() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: -(e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 75 }}
      style={{ position: "absolute", inset: 0 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
    >
      <Scene mouse={mouse} />
    </Canvas>
  );
}
