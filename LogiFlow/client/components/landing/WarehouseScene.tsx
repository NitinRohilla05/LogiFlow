"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  OrbitControls,
  useGLTF,
} from "@react-three/drei";
import { Suspense, useEffect, useRef } from "react";
import * as THREE from "three";

function WarehouseModel() {
  const { scene } = useGLTF(
    "/models/environment/warehouse.glb"
  );

  return (
    <primitive
      object={scene}
      scale={2}
      position={[0, -1.4, 0]}
    />
  );
}

function TruckModel({ progress }: { progress: React.RefObject<number> }) {
  const truckRef = useRef<THREE.Group>(null);

  const { scene } = useGLTF(
    "/models/vehicle/truck.glb"
  );

  useFrame((_, delta) => {
    if (!truckRef.current) return;

    const driveProgress = THREE.MathUtils.clamp(progress.current / 0.55, 0, 1);
    const turnProgress = THREE.MathUtils.clamp(
      (progress.current - 0.55) / 0.2,
      0,
      1
    );
    const dockProgress = THREE.MathUtils.clamp(
      (progress.current - 0.75) / 0.25,
      0,
      1
    );

    const highwayX = THREE.MathUtils.lerp(-7, -1.2, driveProgress);
    const turnX = THREE.MathUtils.lerp(-1.2, 0.2, turnProgress);
    const dockX = THREE.MathUtils.lerp(0.2, 0.35, dockProgress);
    const targetX =
      progress.current < 0.55
        ? highwayX
        : progress.current < 0.75
          ? turnX
          : dockX;
    const targetZ = THREE.MathUtils.lerp(1, 0.05, turnProgress);
    const targetRotation =
      progress.current < 0.55
        ? 0
        : THREE.MathUtils.lerp(-Math.PI / 2, 0, dockProgress);

    truckRef.current.position.x = THREE.MathUtils.damp(
      truckRef.current.position.x,
      targetX,
      5,
      delta
    );
    truckRef.current.position.z = THREE.MathUtils.damp(
      truckRef.current.position.z,
      targetZ,
      5,
      delta
    );
    truckRef.current.rotation.y = THREE.MathUtils.damp(
      truckRef.current.rotation.y,
      targetRotation,
      5,
      delta
    );
  });

  return (
    <primitive
      ref={truckRef}
      object={scene.clone()}
      scale={1.35}
      castShadow
      receiveShadow
    />
  );
}

function Packages() {
  const { scene } = useGLTF(
    "/models/cargo/box.glb"
  );

  const positions: [number, number, number][] = [
    [-0.8, -0.65, 1.4],
    [-0.2, -0.65, 1.4],
    [0.4, -0.65, 1.4],
    [-0.5, -0.05, 1.4],
    [0.1, -0.05, 1.4],
  ];

  return (
    <>
      {positions.map((position, index) => (
        <primitive
          key={index}
          object={scene.clone()}
          position={position}
          scale={0.45}
          castShadow
        />
      ))}
    </>
  );
}

function Scene({ progress }: { progress: React.RefObject<number> }) {
  return (
    <>
      <ambientLight intensity={1.4} />

      <directionalLight
        position={[6, 10, 6]}
        intensity={3}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      <spotLight
        position={[0, 6, 5]}
        intensity={2}
        angle={0.6}
        penumbra={1}
        castShadow
      />

      <Environment preset="city" />

      <WarehouseModel />
      <TruckModel progress={progress} />
      <Packages />

      <mesh
        position={[0, -1.5, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color="#111827" />
      </mesh>

      <OrbitControls
        enablePan={false}
        enableRotate={false}
        enableZoom={false}
        minDistance={5}
        maxDistance={14}
        minPolarAngle={Math.PI / 3.5}
        maxPolarAngle={Math.PI / 2.1}
      />
    </>
  );
}

export default function WarehouseScene() {
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
      className="relative h-[650px] overflow-hidden bg-slate-950"
    >
      <Canvas
        shadows="basic"
        camera={{
          position: [8, 4.5, 11],
          fov: 42,
        }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <Scene progress={progress} />
        </Suspense>
      </Canvas>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/20" />

      <div className="absolute inset-x-0 bottom-0 z-10 px-6 pb-12">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-300">
            Distribution Center
          </p>

          <h2 className="mt-2 max-w-2xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Arrive. Unload. Move Forward.
          </h2>

          <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
            Every shipment passes through an organized logistics network
            designed for speed, precision, and visibility.
          </p>
        </div>
      </div>
    </section>
  );
}

useGLTF.preload("/models/environment/warehouse.glb");
useGLTF.preload("/models/vehicle/truck.glb");
useGLTF.preload("/models/cargo/box.glb");