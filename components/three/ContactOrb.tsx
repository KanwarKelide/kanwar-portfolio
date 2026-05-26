/// <reference types="@react-three/fiber" />
"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = `
  uniform float uTime;
  varying vec3 vNormal;
  varying vec3 vPosition;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vec3 pos = position;
    float d = sin(pos.x * 3.5 + uTime * 0.9) * 0.04 + sin(pos.y * 2.8 + uTime * 1.1) * 0.03;
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
    float fresnel = pow(1.0 - max(dot(vNormal, viewDir), 0.0), 2.2);
    vec3 color = mix(uColor1, uColor2, sin(uTime * 0.6) * 0.5 + 0.5);
    gl_FragColor = vec4(mix(color * 0.15, color * 1.2, fresnel), fresnel * 0.9 + 0.04);
  }
`;

function Orb({ mouse }: { mouse: { x: number; y: number } }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uColor1: { value: new THREE.Color("#6366f1") },
    uColor2: { value: new THREE.Color("#06b6d4") },
  }), []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    uniforms.uTime.value = time;

    if (meshRef.current) {
      meshRef.current.rotation.y = time * 0.12 + mouse.x * 0.25;
      meshRef.current.rotation.x = mouse.y * 0.18;
      const s = 1 + Math.sin(time * 1.0) * 0.04;
      meshRef.current.scale.setScalar(s);
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = time * 0.25;
      ring1Ref.current.rotation.x = time * 0.08 + mouse.y * 0.18;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -time * 0.18;
      ring2Ref.current.rotation.y = time * 0.12;
    }
  });

  return (
    <>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.4, 64, 64]} />
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          transparent
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
      {/* Outer glow shell */}
      <mesh ref={glowRef} scale={1.6}>
        <sphereGeometry args={[1.4, 16, 16]} />
        <meshBasicMaterial color="#6366f1" transparent opacity={0.04} side={THREE.BackSide} />
      </mesh>
      <mesh ref={ring1Ref}>
        <torusGeometry args={[2.2, 0.018, 8, 120]} />
        <meshBasicMaterial color="#06b6d4" transparent opacity={0.35} />
      </mesh>
      <mesh ref={ring2Ref}>
        <torusGeometry args={[1.75, 0.01, 8, 120]} />
        <meshBasicMaterial color="#6366f1" transparent opacity={0.22} />
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
      <ambientLight intensity={0.05} />
      <pointLight position={[4, 4, 3]} color="#6366f1" intensity={3} />
      <pointLight position={[-4, -3, 2]} color="#06b6d4" intensity={2} />
      <Orb mouse={mouse} />
    </Canvas>
  );
}
