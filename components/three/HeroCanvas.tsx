/// <reference types="@react-three/fiber" />
"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

const vertexShader = `
  uniform float uTime;
  varying vec3 vNormal;
  varying vec3 vPosition;

  void main() {
    vNormal = normalize(normalMatrix * normal);
    vec3 pos = position;
    float displacement = sin(pos.x * 4.0 + uTime) * 0.05
                       + sin(pos.y * 3.0 + uTime * 0.7) * 0.04
                       + sin(pos.z * 2.5 + uTime * 0.9) * 0.03;
    pos += normal * displacement;
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
    float pulse = sin(uTime * 0.8) * 0.5 + 0.5;
    vec3 color = mix(uColor1, uColor2, pulse);
    color = mix(color * 0.2, color * 1.4, fresnel);
    float alpha = fresnel * 0.85 + 0.05;
    gl_FragColor = vec4(color, alpha);
  }
`;

function FresnelSphere({ mouse, scrollRef }: { mouse: { x: number; y: number }; scrollRef: React.MutableRefObject<number> }) {
  const meshRef = useRef<THREE.Mesh>(null);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uColor1: { value: new THREE.Color("#6366f1") },
    uColor2: { value: new THREE.Color("#06b6d4") },
  }), []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;
    uniforms.uTime.value = time;
    meshRef.current.rotation.y = time * 0.06 + mouse.x * 0.3;
    meshRef.current.rotation.x = time * 0.04 + mouse.y * 0.2;
    meshRef.current.position.y = Math.sin(time * 0.3) * 0.15;
  });

  return (
    <mesh ref={meshRef} position={[2.2, 0, -1]}>
      <icosahedronGeometry args={[1.8, 6]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
}

function ParticleLayer({
  count,
  spread,
  size,
  color,
  opacity,
  speed,
  mouse,
}: {
  count: number;
  spread: number;
  size: number;
  color: string;
  opacity: number;
  speed: number;
  mouse: { x: number; y: number };
}) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * spread;
      pos[i * 3 + 1] = (Math.random() - 0.5) * spread;
      pos[i * 3 + 2] = (Math.random() - 0.5) * spread * 0.6;
    }
    return pos;
  }, [count, spread]);

  useFrame((state) => {
    if (!ref.current) return;
    const time = state.clock.elapsedTime;
    ref.current.rotation.y = time * speed;
    ref.current.rotation.x = mouse.y * 0.04 + time * speed * 0.3;
    ref.current.rotation.z = mouse.x * 0.02;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={color}
        size={size}
        sizeAttenuation
        depthWrite={false}
        opacity={opacity}
      />
    </Points>
  );
}

function SecondaryOrb({ mouse }: { mouse: { x: number; y: number } }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;
    meshRef.current.rotation.x = -time * 0.05 + mouse.y * 0.1;
    meshRef.current.rotation.y = time * 0.07 - mouse.x * 0.1;
    meshRef.current.position.x = Math.sin(time * 0.25) * 0.5 - 3.2;
    meshRef.current.position.y = Math.cos(time * 0.18) * 0.3 + 0.8;
  });

  return (
    <mesh ref={meshRef} position={[-3.2, 0.8, -2.5]}>
      <torusKnotGeometry args={[0.8, 0.25, 100, 16]} />
      <meshBasicMaterial color="#06b6d4" wireframe transparent opacity={0.12} />
    </mesh>
  );
}

function CameraRig({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  useFrame(({ camera }) => {
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, 6 - scrollRef.current * 2.5, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, -scrollRef.current * 0.4, 0.05);
  });
  return null;
}

function Scene({ mouse, scrollRef }: { mouse: { x: number; y: number }; scrollRef: React.MutableRefObject<number> }) {
  return (
    <>
      <ambientLight intensity={0.04} />
      <pointLight position={[3, 3, 2]} color="#6366f1" intensity={3} />
      <pointLight position={[-3, -2, 1]} color="#06b6d4" intensity={2} />
      <ParticleLayer count={1000} spread={28} size={0.015} color="#6366f1" opacity={0.35} speed={0.012} mouse={mouse} />
      <ParticleLayer count={700} spread={16} size={0.026} color="#a5b4fc" opacity={0.55} speed={-0.018} mouse={mouse} />
      <ParticleLayer count={350} spread={9} size={0.042} color="#06b6d4" opacity={0.7} speed={0.025} mouse={mouse} />
      <FresnelSphere mouse={mouse} scrollRef={scrollRef} />
      <SecondaryOrb mouse={mouse} />
      <CameraRig scrollRef={scrollRef} />
    </>
  );
}

export default function HeroCanvas() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const scrollRef = useRef(0);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: -(e.clientY / window.innerHeight - 0.5) * 2,
      });
    };

    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      scrollRef.current = Math.min(window.scrollY / heroHeight, 1);
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 72 }}
      style={{ position: "absolute", inset: 0 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
      performance={{ min: 0.5 }}
    >
      <Scene mouse={mouse} scrollRef={scrollRef} />
    </Canvas>
  );
}
