"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, useGLTF } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";

function RoadModel() {
  const roadRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/models/environment/road.glb");

  useFrame((_, delta) => {
    if (!roadRef.current) return;

    roadRef.current.position.x -= delta * 1.5;

    // Seamless wrap using modular arithmetic to avoid a visible teleportation glitch
    const range = 16;
    roadRef.current.position.x =
      ((((roadRef.current.position.x + 8) % range) + range) % range) - 8;
  });

  return (
    <primitive
      ref={roadRef}
      object={scene}
      scale={1.5}
      position={[0, -1, 0]}
    />
  );
}

function SceneContent() {
  return (
    <>
      <ambientLight intensity={1.5} />

      <directionalLight
        position={[5, 8, 5]}
        intensity={2.5}
        castShadow
      />

      <Environment preset="city" />

      <RoadModel />
    </>
  );
}

export default function RoadScene() {
  return (
    <section className="relative h-[500px] w-full overflow-hidden bg-slate-950">
      <Canvas
        camera={{
          position: [0, 3, 8],
          fov: 45,
        }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <SceneContent />
        </Suspense>
      </Canvas>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/30" />

      <div className="absolute inset-x-0 bottom-0 z-10 px-6 pb-10">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-300">
            Logistics Route
          </p>

          <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Every Mile Matters.
          </h2>

          <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300 sm:text-base">
            Our delivery network keeps every shipment moving efficiently
            from pickup to destination.
          </p>
        </div>
      </div>
    </section>
  );
}

useGLTF.preload("/models/environment/road.glb");