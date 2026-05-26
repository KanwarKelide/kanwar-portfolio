/// <reference types="@react-three/fiber" />
"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

type Shape = "torus" | "octahedron" | "icosahedron";

function SpinningMesh({ shape, accent }: { shape: Shape; accent: string }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    meshRef.current.rotation.x = t * 0.15;
    meshRef.current.rotation.y = t * 0.22;
    meshRef.current.position.y = Math.sin(t * 0.4) * 0.3;
  });

  return (
    <mesh ref={meshRef}>
      {shape === "torus" && <torusGeometry args={[2.2, 0.6, 12, 48]} />}
      {shape === "octahedron" && <octahedronGeometry args={[2.2, 1]} />}
      {shape === "icosahedron" && <icosahedronGeometry args={[2.2, 1]} />}
      <meshBasicMaterial color={accent} wireframe transparent opacity={0.18} />
    </mesh>
  );
}

function RingAccent({ accent }: { accent: string }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.z = state.clock.elapsedTime * 0.08;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.3 + 0.5;
  });

  return (
    <mesh ref={ref}>
      <torusGeometry args={[3.5, 0.015, 4, 120]} />
      <meshBasicMaterial color={accent} transparent opacity={0.1} />
    </mesh>
  );
}

export default function CareerMiniCanvas({ shape, accent }: { shape: Shape; accent: string }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 60 }}
      style={{ width: "100%", height: "100%" }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.1} />
      <pointLight position={[3, 3, 2]} color={accent} intensity={2} />
      <SpinningMesh shape={shape} accent={accent} />
      <RingAccent accent={accent} />
    </Canvas>
  );
}
