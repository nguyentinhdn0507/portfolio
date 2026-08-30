'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Torus, Octahedron } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from 'next-themes';

function FloatingOrb({ isDark }: { isDark: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const torusRef = useRef<THREE.Mesh>(null);
  const outerTorusRef = useRef<THREE.Mesh>(null);
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  // Handle mouse move
  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.targetY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state) => {
    // Lerp mouse
    mouse.current.x += (mouse.current.targetX - mouse.current.x) * 0.05;
    mouse.current.y += (mouse.current.targetY - mouse.current.y) * 0.05;

    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2 + mouse.current.y * 0.4;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3 + mouse.current.x * 0.4;
    }

    if (torusRef.current) {
      torusRef.current.rotation.x = -state.clock.getElapsedTime() * 0.35 + mouse.current.y * 0.3;
      torusRef.current.rotation.y = state.clock.getElapsedTime() * 0.25 + mouse.current.x * 0.3;
    }

    if (outerTorusRef.current) {
      outerTorusRef.current.rotation.x = state.clock.getElapsedTime() * 0.15;
      outerTorusRef.current.rotation.z = -state.clock.getElapsedTime() * 0.2;
    }
  });

  const orbColor = isDark ? '#38bdf8' : '#2563eb';
  const emissiveColor = isDark ? '#1e1b4b' : '#dbeafe';
  const ringColor = isDark ? '#818cf8' : '#4f46e5';
  const ring2Color = isDark ? '#2dd4bf' : '#0284c7';

  return (
    <group scale={1.1}>
      {/* Central Fluid Distorted Glass Orb */}
      <Float speed={2} rotationIntensity={1.2} floatIntensity={1.5}>
        <Sphere ref={meshRef} args={[1.35, 64, 64]}>
          <MeshDistortMaterial
            color={orbColor}
            emissive={emissiveColor}
            emissiveIntensity={isDark ? 0.3 : 0.15}
            distort={0.42}
            speed={2.2}
            roughness={0.15}
            metalness={0.8}
            wireframe={false}
            clearcoat={1}
            clearcoatRoughness={0.1}
          />
        </Sphere>
      </Float>

      {/* Internal Geometric Core */}
      <Octahedron args={[0.85]} scale={1}>
        <meshStandardMaterial
          color={isDark ? '#c084fc' : '#6366f1'}
          wireframe={true}
          transparent={true}
          opacity={0.4}
        />
      </Octahedron>

      {/* Dynamic Orbital Gyro Ring 1 */}
      <Torus ref={torusRef} args={[2.0, 0.02, 16, 100]}>
        <meshStandardMaterial
          color={ringColor}
          emissive={ringColor}
          emissiveIntensity={isDark ? 0.6 : 0.2}
          wireframe={false}
        />
      </Torus>

      {/* Dynamic Orbital Gyro Ring 2 */}
      <Torus ref={outerTorusRef} args={[2.3, 0.015, 16, 100]}>
        <meshStandardMaterial
          color={ring2Color}
          emissive={ring2Color}
          emissiveIntensity={isDark ? 0.5 : 0.2}
        />
      </Torus>
    </group>
  );
}

// Pre-generate deterministic particle coordinates
const staticParticles = Array.from({ length: 60 }, (_, i) => {
  const seed = (i * 9301 + 49297) % 233280;
  const rnd = seed / 233280;
  const radius = 2.4 + rnd * 2.2;
  const theta = (i / 60) * Math.PI * 2;
  const phi = Math.acos(2 * ((i % 10) / 10) - 1);
  const x = radius * Math.sin(phi) * Math.cos(theta);
  const y = radius * Math.sin(phi) * Math.sin(theta);
  const z = radius * Math.cos(phi);
  const size = 0.025 + (i % 5) * 0.008;
  return { x, y, z, size };
});

function OrbitingParticles({ isDark }: { isDark: boolean }) {

  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.08;
      groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.05) * 0.1;
    }
  });

  const particleColor = isDark ? '#38bdf8' : '#4f46e5';

  return (
    <group ref={groupRef}>
      {staticParticles.map((p, i) => (
        <mesh key={i} position={[p.x, p.y, p.z]}>
          <sphereGeometry args={[p.size, 8, 8]} />
          <meshBasicMaterial
            color={i % 2 === 0 ? particleColor : (isDark ? '#c084fc' : '#06b6d4')}
            transparent
            opacity={isDark ? 0.75 : 0.6}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function HeroCanvas() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={isDark ? 0.7 : 0.9} />
        <pointLight position={[10, 10, 10]} intensity={isDark ? 1.5 : 1.2} color={isDark ? '#38bdf8' : '#2563eb'} />
        <pointLight position={[-10, -10, -10]} intensity={isDark ? 1.2 : 0.8} color={isDark ? '#818cf8' : '#6366f1'} />
        <directionalLight position={[0, 5, 5]} intensity={0.5} />

        <FloatingOrb isDark={isDark} />
        <OrbitingParticles isDark={isDark} />
      </Canvas>
    </div>
  );
}
