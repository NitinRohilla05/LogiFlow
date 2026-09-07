"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, useGLTF } from "@react-three/drei";
import { Suspense, useEffect, useRef } from "react";
import * as THREE from "three";

function DepartureTruck({ progress }: { progress: React.RefObject<number> }) {
  const truckRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/models/vehicle/truck.glb");

  useFrame((_, delta) => {
    if (!truckRef.current) return;

    const targetX = THREE.MathUtils.lerp(-8, 7, progress.current);
    truckRef.current.position.x = THREE.MathUtils.damp(
      truckRef.current.position.x,
      targetX,
      5,
      delta
    );
    truckRef.current.rotation.y = THREE.MathUtils.damp(
      truckRef.current.rotation.y,
      progress.current > 0.85 ? -0.12 : 0,
      5,
      delta
    );
  });

  return (
    <primitive
      ref={truckRef}
      object={scene.clone()}
      position={[-8, -1.1, 0]}
      scale={1.35}
      castShadow
      receiveShadow
    />
  );
}

function DepartureScene({ progress }: { progress: React.RefObject<number> }) {
  return (
    <>
      <ambientLight intensity={1.4} />
      <directionalLight position={[4, 8, 5]} intensity={2.5} castShadow />
      <Environment preset="city" />
      <DepartureTruck progress={progress} />
      <mesh
        position={[0, -1.65, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[30, 8]} />
        <meshStandardMaterial color="#172033" />
      </mesh>
    </>
  );
}

export default function TruckScene() {
  const sectionRef = useRef<HTMLElement>(null);
  const progress = useRef(0);

  useEffect(() => {
    function updateProgress() {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const travel = window.innerHeight + rect.height;
      progress.current = THREE.MathUtils.clamp(
        (window.innerHeight - rect.top) / travel,
        0,
        1
      );
    }

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[560px] overflow-hidden bg-slate-950"
    >
      <Canvas
        shadows="basic"
        camera={{ position: [0, 3.5, 10], fov: 42 }}
        dpr={[1, 1.75]}
      >
        <Suspense fallback={null}>
          <DepartureScene progress={progress} />
        </Suspense>
      </Canvas>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/20" />
      <div className="absolute inset-x-0 bottom-0 z-10 px-6 pb-10">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-300">
            Departure Sequence
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            From pickup to the road.
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300 sm:text-base">
            Scroll to move the shipment through its first mile.
          </p>
        </div>
      </div>
    </section>
  );
}

useGLTF.preload("/models/vehicle/truck.glb");