'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useTheme } from 'next-themes';

const POINT_COUNT = 300;
const staticPositions = new Float32Array(POINT_COUNT * 3);
for (let i = 0; i < POINT_COUNT; i++) {
  const seedX = (i * 9301 + 49297) % 233280;
  const seedY = (i * 7307 + 104729) % 233280;
  const seedZ = (i * 4999 + 123457) % 233280;
  staticPositions[i * 3] = (seedX / 233280 - 0.5) * 25;
  staticPositions[i * 3 + 1] = (seedY / 233280 - 0.5) * 25;
  staticPositions[i * 3 + 2] = (seedZ / 233280 - 0.5) * 15;
}

function BackgroundPoints({ isDark }: { isDark: boolean }) {
  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;
      pointsRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.015) * 0.05;
    }
  });

  const color = isDark ? '#38bdf8' : '#6366f1';

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[staticPositions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color={color}
        transparent
        opacity={isDark ? 0.35 : 0.25}
        sizeAttenuation
      />
    </points>
  );
}

export default function ParticleBackground() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        gl={{ alpha: true, antialias: false, powerPreference: 'low-power' }}
      >
        <BackgroundPoints isDark={isDark} />
      </Canvas>
    </div>
  );
}
