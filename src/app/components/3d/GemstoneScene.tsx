"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";

function Diamond() {
  const meshRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.OctahedronGeometry(1.5, 0);
    return geo;
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y = -state.clock.elapsedTime * 0.3;
      innerRef.current.rotation.z = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <Float
      speed={2}
      rotationIntensity={0.5}
      floatIntensity={0.5}
    >
      {/* Outer diamond */}
      <mesh ref={meshRef} geometry={geometry}>
        <meshPhysicalMaterial
          color="#E8F4F8"
          metalness={0.1}
          roughness={0}
          transmission={0.95}
          thickness={2}
          ior={2.4}
          clearcoat={1}
          clearcoatRoughness={0}
          attenuationColor="#C9A96E"
          attenuationDistance={5}
        />
      </mesh>

      {/* Inner core */}
      <mesh ref={innerRef} scale={0.6}>
        <octahedronGeometry args={[1, 0]} />
        <meshPhysicalMaterial
          color="#C9A96E"
          metalness={0.8}
          roughness={0.2}
          emissive="#C9A96E"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Sparkle particles */}
      <Sparkles
        count={20}
        scale={4}
        size={3}
        speed={0.5}
        color="#C9A96E"
      />
    </Float>
  );
}

function FloatingRings() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {[0, 1, 2].map((i) => (
        <mesh
          key={i}
          rotation={[Math.PI / 2, 0, (i * Math.PI) / 3]}
          position={[0, 0, 0]}
        >
          <torusGeometry args={[2.5 + i * 0.8, 0.02, 16, 100]} />
          <meshStandardMaterial
            color="#C9A96E"
            metalness={1}
            roughness={0.1}
            emissive="#C9A96E"
            emissiveIntensity={0.1}
          />
        </mesh>
      ))}
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={1} color="#C9A96E" />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#B76E79" />
      <pointLight position={[5, -5, 5]} intensity={0.5} color="#E8E8E8" />
      
      <Diamond />
      <FloatingRings />
      
      <Environment preset="city" />
    </>
  );
}

export function GemstoneScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
