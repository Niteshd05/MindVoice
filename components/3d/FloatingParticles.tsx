'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function ParticleField() {
  const ref = useRef<any>(null);
  const particleCount = 500;

  const particles = React.useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      const x = (Math.random() - 0.5) * 3;
      const y = (Math.random() - 0.5) * 3;
      const z = (Math.random() - 0.5) * 3;
      positions[i] = x;
      positions[i + 1] = y;
      positions[i + 2] = z;
    }
    return positions;
  }, []);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.x -= 0.0003;
      ref.current.rotation.y -= 0.0005;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={particles} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#D4A574"
          size={0.015}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.6}
        />
      </Points>
    </group>
  );
}

export function FloatingParticles() {
  return (
    <div className="w-full h-96 absolute inset-0">
      <Canvas camera={{ position: [0, 0, 1.5], fov: 75 }}>
        <ParticleField />
      </Canvas>
    </div>
  );
}
