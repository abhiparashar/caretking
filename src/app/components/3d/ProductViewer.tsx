"use client";

import { useRef, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { Material } from "@/app/types";

interface JewelryModelProps {
  type: "ring" | "necklace" | "earring" | "bracelet";
  material: Material;
  autoRotate?: boolean;
}

const materialColors: Record<Material, { color: string; metalness: number; roughness: number }> = {
  gold: { color: "#C9A96E", metalness: 1, roughness: 0.15 },
  silver: { color: "#C0C0C0", metalness: 1, roughness: 0.15 },
  "rose-gold": { color: "#B76E79", metalness: 1, roughness: 0.15 },
  platinum: { color: "#E5E4E2", metalness: 1, roughness: 0.1 },
};

function Ring({ material }: { material: Material }) {
  const meshRef = useRef<THREE.Group>(null);
  const mat = materialColors[material];

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Ring band */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1, 0.15, 16, 100]} />
        <meshStandardMaterial
          color={mat.color}
          metalness={mat.metalness}
          roughness={mat.roughness}
        />
      </mesh>

      {/* Diamond setting */}
      <mesh position={[0, 1.1, 0]}>
        <cylinderGeometry args={[0.3, 0.2, 0.2, 6]} />
        <meshStandardMaterial
          color={mat.color}
          metalness={mat.metalness}
          roughness={mat.roughness}
        />
      </mesh>

      {/* Diamond */}
      <mesh position={[0, 1.4, 0]}>
        <octahedronGeometry args={[0.4, 0]} />
        <meshPhysicalMaterial
          color="#E8F4F8"
          metalness={0}
          roughness={0}
          transmission={0.95}
          thickness={1}
          ior={2.4}
        />
      </mesh>

      {/* Prongs */}
      {[0, 90, 180, 270].map((angle, i) => (
        <mesh
          key={i}
          position={[
            Math.cos((angle * Math.PI) / 180) * 0.25,
            1.2,
            Math.sin((angle * Math.PI) / 180) * 0.25,
          ]}
        >
          <cylinderGeometry args={[0.02, 0.02, 0.4, 8]} />
          <meshStandardMaterial
            color={mat.color}
            metalness={mat.metalness}
            roughness={mat.roughness}
          />
        </mesh>
      ))}
    </group>
  );
}

function Necklace({ material }: { material: Material }) {
  const meshRef = useRef<THREE.Group>(null);
  const mat = materialColors[material];

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Chain */}
      {Array.from({ length: 20 }).map((_, i) => {
        const angle = (i / 20) * Math.PI * 2;
        const radius = 1.5;
        return (
          <mesh
            key={i}
            position={[Math.cos(angle) * radius, Math.sin(angle) * radius * 0.3, 0]}
            rotation={[0, 0, angle + Math.PI / 2]}
          >
            <torusGeometry args={[0.1, 0.03, 8, 16]} />
            <meshStandardMaterial
              color={mat.color}
              metalness={mat.metalness}
              roughness={mat.roughness}
            />
          </mesh>
        );
      })}

      {/* Pendant */}
      <mesh position={[0, -0.8, 0]}>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshPhysicalMaterial
          color="#E8F4F8"
          metalness={0}
          roughness={0}
          transmission={0.9}
          thickness={0.5}
          ior={2.4}
        />
      </mesh>

      {/* Pendant setting */}
      <mesh position={[0, -0.4, 0]}>
        <cylinderGeometry args={[0.08, 0.05, 0.3, 8]} />
        <meshStandardMaterial
          color={mat.color}
          metalness={mat.metalness}
          roughness={mat.roughness}
        />
      </mesh>
    </group>
  );
}

function Earring({ material }: { material: Material }) {
  const meshRef = useRef<THREE.Group>(null);
  const mat = materialColors[material];

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.4;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Stud base */}
      <mesh>
        <cylinderGeometry args={[0.3, 0.3, 0.1, 32]} />
        <meshStandardMaterial
          color={mat.color}
          metalness={mat.metalness}
          roughness={mat.roughness}
        />
      </mesh>

      {/* Center diamond */}
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.2, 0.25, 0.15, 8]} />
        <meshPhysicalMaterial
          color="#E8F4F8"
          metalness={0}
          roughness={0}
          transmission={0.95}
          thickness={0.5}
          ior={2.4}
        />
      </mesh>

      {/* Halo */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        return (
          <mesh
            key={i}
            position={[Math.cos(angle) * 0.35, 0.05, Math.sin(angle) * 0.35]}
          >
            <sphereGeometry args={[0.06, 16, 16]} />
            <meshPhysicalMaterial
              color="#E8F4F8"
              metalness={0}
              roughness={0}
              transmission={0.9}
              thickness={0.3}
              ior={2.4}
            />
          </mesh>
        );
      })}
    </group>
  );
}

function Bracelet({ material }: { material: Material }) {
  const meshRef = useRef<THREE.Group>(null);
  const mat = materialColors[material];

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Cuff body */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[1.2, 0.2, 16, 50, Math.PI * 1.5]} />
        <meshStandardMaterial
          color={mat.color}
          metalness={mat.metalness}
          roughness={mat.roughness}
        />
      </mesh>

      {/* Decorative stones */}
      {Array.from({ length: 5 }).map((_, i) => {
        const angle = (i / 4) * Math.PI * 1.5 - Math.PI * 0.75;
        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * 1.2,
              Math.sin(angle) * 1.2,
              0.15,
            ]}
          >
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshPhysicalMaterial
              color="#E8F4F8"
              metalness={0}
              roughness={0}
              transmission={0.9}
              thickness={0.3}
              ior={2.4}
            />
          </mesh>
        );
      })}
    </group>
  );
}

function Model({ type, material }: JewelryModelProps) {
  switch (type) {
    case "ring":
      return <Ring material={material} />;
    case "necklace":
      return <Necklace material={material} />;
    case "earring":
      return <Earring material={material} />;
    case "bracelet":
      return <Bracelet material={material} />;
    default:
      return <Ring material={material} />;
  }
}

function Scene({ type, material }: JewelryModelProps) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        intensity={1}
        color="#C9A96E"
      />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#E8E8E8" />
      
      <Model type={type} material={material} />
      
      <ContactShadows
        position={[0, -2, 0]}
        opacity={0.4}
        scale={10}
        blur={2}
        far={4}
      />
      
      <Environment preset="studio" />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 1.5}
        autoRotate
        autoRotateSpeed={2}
      />
    </>
  );
}

export function ProductViewer({ type, material }: JewelryModelProps) {
  return (
    <div className="w-full h-full min-h-[400px]">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <Scene type={type} material={material} />
        </Suspense>
      </Canvas>
    </div>
  );
}
