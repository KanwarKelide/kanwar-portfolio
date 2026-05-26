/// <reference types="@react-three/fiber" />
"use client";

import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";

const vertexShader = `
  uniform float uTime;
  varying vec3 vNormal;
  varying vec3 vPosition;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vec3 pos = position;
    float d = sin(pos.x * 3.0 + uTime) * 0.03 + sin(pos.y * 2.5 + uTime * 0.8) * 0.02;
    pos += normal * d;
    vPosition = (modelMatrix * vec4(pos, 1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform float uTime;
  varying vec3 vNormal;
  varying vec3 vPosition;
  void main() {
    vec3 viewDir = normalize(cameraPosition - vPosition);
    float fresnel = pow(1.0 - max(dot(vNormal, viewDir), 0.0), 2.5);
    vec3 color = mix(uColor1, uColor2, sin(uTime * 0.5) * 0.5 + 0.5);
    gl_FragColor = vec4(mix(color * 0.2, color, fresnel), fresnel * 0.9 + 0.05);
  }
`;

function CentralOrb() {
  const meshRef = useRef<THREE.Mesh>(null);
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uColor1: { value: new THREE.Color("#6366f1") },
    uColor2: { value: new THREE.Color("#06b6d4") },
  }), []);

  useFrame((state) => {
    uniforms.uTime.value = state.clock.elapsedTime;
    if (meshRef.current) meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.35, 32, 32]} />
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          transparent
          depthWrite={false}
        />
      </mesh>
      <mesh scale={1.8}>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshBasicMaterial color="#6366f1" transparent opacity={0.04} side={THREE.BackSide} />
      </mesh>
      <pointLight color="#6366f1" intensity={4} distance={6} />
      <pointLight color="#06b6d4" intensity={2} distance={4} position={[0.5, 0.5, 0]} />
    </group>
  );
}

function OrbitItem({
  name,
  index,
  total,
  radius,
  tilt,
  speed,
  yOffset,
  color,
  hovered,
  setHovered,
}: {
  name: string;
  index: number;
  total: number;
  radius: number;
  tilt: number;
  speed: number;
  yOffset: number;
  color: string;
  hovered: string | null;
  setHovered: (v: string | null) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const startAngle = (index / total) * Math.PI * 2;

  useFrame((state) => {
    if (!groupRef.current) return;
    const a = startAngle + state.clock.elapsedTime * speed;
    groupRef.current.position.x = Math.cos(a) * radius;
    groupRef.current.position.z = Math.sin(a) * radius;
    groupRef.current.position.y = yOffset + Math.sin(state.clock.elapsedTime * 0.4 + startAngle) * 0.08;
    groupRef.current.rotation.x = tilt;
  });

  const isHovered = hovered === name;

  return (
    <group ref={groupRef}>
      <Html
        center
        distanceFactor={8}
        zIndexRange={[1, 10]}
        occlude={false}
      >
        <div
          className="orbit-chip"
          style={{
            borderColor: isHovered ? color : "rgba(99,102,241,0.3)",
            color: isHovered ? "#ffffff" : "#f8fafc",
            transform: isHovered ? "scale(1.15)" : "scale(1)",
            transition: "all 0.2s ease",
            cursor: "default",
          }}
          onPointerEnter={() => setHovered(name)}
          onPointerLeave={() => setHovered(null)}
        >
          {name}
        </div>
      </Html>
    </group>
  );
}

function RingLine({ radius, tilt, color }: { radius: number; tilt: number; color: string }) {
  return (
    <mesh rotation={[Math.PI / 2 + tilt, 0, 0]}>
      <torusGeometry args={[radius, 0.006, 4, 128]} />
      <meshBasicMaterial color={color} transparent opacity={0.1} />
    </mesh>
  );
}

const buildNames = [
  "Python", "SQL", "JavaScript", "Dart", "Next.js", "Nest.js",
  "Django", "Flutter", "Tailwind", "PostgreSQL", "MongoDB",
  "Docker", "GCP", "AWS", "Power BI", "Tableau",
];

const aiNames = [
  "Claude", "Cursor", "GitHub Copilot", "NotebookLM",
  "Lovable", "Vercel v0", "Perplexity", "Windsurf",
];

function CloudScene() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <>
      <ambientLight intensity={0.15} />
      <CentralOrb />
      <RingLine radius={4.2} tilt={0.25} color="#a5b4fc" />
      <RingLine radius={2.4} tilt={-0.2} color="#67e8f9" />
      {buildNames.map((name, i) => (
        <OrbitItem
          key={name}
          name={name}
          index={i}
          total={buildNames.length}
          radius={4.2}
          tilt={0.25}
          speed={0.1}
          yOffset={0}
          color="#a5b4fc"
          hovered={hovered}
          setHovered={setHovered}
        />
      ))}
      {aiNames.map((name, i) => (
        <OrbitItem
          key={name}
          name={name}
          index={i}
          total={aiNames.length}
          radius={2.4}
          tilt={-0.2}
          speed={-0.16}
          yOffset={0.2}
          color="#67e8f9"
          hovered={hovered}
          setHovered={setHovered}
        />
      ))}
    </>
  );
}

export default function OrbitCloud() {
  return (
    <Canvas
      camera={{ position: [0, 2.5, 9], fov: 58 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
      style={{ width: "100%", height: "100%" }}
    >
      <CloudScene />
    </Canvas>
  );
}
