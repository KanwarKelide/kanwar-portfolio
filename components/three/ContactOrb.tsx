/// <reference types="@react-three/fiber" />
"use client";

import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Orb({ mouse }: { mouse: { x: number; y: number } }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current || !ringRef.current) return;
    const time = state.clock.elapsedTime;
    meshRef.current.rotation.y = time * 0.15 + mouse.x * 0.3;
    meshRef.current.rotation.x = mouse.y * 0.2;
    const scale = 1 + Math.sin(time * 1.2) * 0.06;
    meshRef.current.scale.setScalar(scale);
    ringRef.current.rotation.z = time * 0.3;
    ringRef.current.rotation.x = time * 0.1 + mouse.y * 0.2;
  });

  return (
    <>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.4, 48, 48]} />
        <meshBasicMaterial
          color="#6366f1"
          wireframe
          transparent
          opacity={0.15}
        />
      </mesh>
      <mesh ref={ringRef}>
        <torusGeometry args={[2.2, 0.02, 16, 120]} />
        <meshBasicMaterial color="#06b6d4" transparent opacity={0.3} />
      </mesh>
      <mesh>
        <torusGeometry args={[1.8, 0.01, 16, 120]} />
        <meshBasicMaterial color="#6366f1" transparent opacity={0.2} />
      </mesh>
    </>
  );
}

export default function ContactOrb() {
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
      camera={{ position: [0, 0, 5], fov: 60 }}
      style={{ position: "absolute", inset: 0 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} color="#6366f1" intensity={2} />
      <pointLight position={[-5, -5, 5]} color="#06b6d4" intensity={1} />
      <Orb mouse={mouse} />
    </Canvas>
  );
}
