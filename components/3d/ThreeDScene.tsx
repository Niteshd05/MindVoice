'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Box, Torus, MeshWobbleMaterial } from '@react-three/drei';
import * as THREE from 'three';

function RotatingElements() {
  const sphereRef = useRef<THREE.Mesh>(null);
  const boxRef = useRef<THREE.Mesh>(null);
  const torusRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();

    if (sphereRef.current) {
      sphereRef.current.position.x = Math.sin(time * 0.5) * 2;
      sphereRef.current.rotation.y += 0.002;
    }

    if (boxRef.current) {
      boxRef.current.position.z = Math.cos(time * 0.5) * 2;
      boxRef.current.rotation.x += 0.003;
      boxRef.current.rotation.z += 0.001;
    }

    if (torusRef.current) {
      torusRef.current.rotation.x += 0.001;
      torusRef.current.rotation.y += 0.002;
    }
  });

  return (
    <>
      {/* Floating Sphere */}
      <Sphere ref={sphereRef} args={[0.8, 32, 32]}>
        <MeshWobbleMaterial
          color="#D4A574"
          speed={2}
          factor={0.5}
          wireframe={false}
        />
      </Sphere>

      {/* Rotating Box */}
      <Box ref={boxRef} args={[1, 1, 1]}>
        <MeshWobbleMaterial
          color="#B8956A"
          speed={1.5}
          factor={0.4}
        />
      </Box>

      {/* Torus Ring */}
      <Torus ref={torusRef} args={[1.5, 0.3, 32, 32]}>
        <MeshWobbleMaterial
          color="#E8C9A0"
          speed={2.5}
          factor={0.3}
        />
      </Torus>

      {/* Lighting */}
      <ambientLight intensity={0.8} />
      <pointLight position={[10, 10, 10]} intensity={1.2} color="#D4A574" />
      <pointLight position={[-10, -10, 10]} intensity={0.8} color="#B8956A" />
      <pointLight position={[0, 0, 10]} intensity={0.6} color="#E8C9A0" />
    </>
  );
}

export function ThreeDScene() {
  return (
    <div className="w-full h-96 rounded-3xl overflow-hidden shadow-2xl">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <RotatingElements />
      </Canvas>
    </div>
  );
}
