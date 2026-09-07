"use client";

import { useEffect, useRef, useState } from "react";
import { assetPath } from "@/lib/assetPath";

function clamp(value: number) {
  return Math.max(0, Math.min(1, value));
}

// Cubic smooth easing for natural truck acceleration and deceleration
function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

const wheelPositions = [
  { left: "4.6%", bottom: "10.5%" },
  { left: "12.4%", bottom: "10.5%" },
  { left: "57.8%", bottom: "10.5%" },
  { left: "64.6%", bottom: "10.5%" },
  { left: "87.2%", bottom: "10.5%" },
];

// Natural wheel spin overlay that blends seamlessly into the truck tires
function SpinningWheel({
  left,
  bottom,
  rotation,
  opacity,
}: {
  left: string;
  bottom: string;
  rotation: number;
  opacity: number;
}) {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute h-[clamp(28px,3.5vw,52px)] w-[clamp(28px,3.5vw,52px)] -translate-x-1/2 rounded-full bg-[conic-gradient(from_0deg,rgba(51,65,85,0.4)_0_30deg,rgba(15,23,42,0.8)_30deg_60deg,rgba(100,116,139,0.3)_60deg_90deg,rgba(15,23,42,0.8)_90deg_120deg,rgba(51,65,85,0.4)_120deg_150deg,rgba(15,23,42,0.8)_150deg_180deg,rgba(100,116,139,0.3)_180deg_210deg,rgba(15,23,42,0.8)_210deg_240deg,rgba(51,65,85,0.4)_240deg_270deg,rgba(15,23,42,0.8)_270deg_300deg,rgba(100,116,139,0.3)_300deg_330deg,rgba(15,23,42,0.8)_330deg_360deg)] mix-blend-multiply blur-[0.4px] transition-opacity duration-300"
      style={{
        left,
        bottom,
        opacity,
        transform: `rotate(${rotation}deg)`,
      }}
    />
  );
}

export default function JourneyScene() {
  const sectionRef = useRef<HTMLElement>(null);
  const [, setTick] = useState(0);
  const progressRef = useRef(0);

  useEffect(() => {
    const previewProgress = new URLSearchParams(window.location.search).get("previewProgress");
    if (previewProgress !== null) {
      progressRef.current = clamp(Number(previewProgress));
      setTick((tick) => tick + 1);
      return;
    }

    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const section = sectionRef.current;
        if (!section) return;

        const rect = section.getBoundingClientRect();
        const distance = Math.max(section.offsetHeight - window.innerHeight, 1);
        const next = clamp(-rect.top / distance);

        if (Math.abs(next - progressRef.current) > 0.0005) {
          progressRef.current = next;
          setTick((t) => t + 1);
        }
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const progress = progressRef.current;

  // Phase milestones
  const loading = clamp((progress - 0.05) / 0.22);
  const rawDriving = clamp((progress - 0.28) / 0.48);
  const driving = easeInOutCubic(rawDriving);
  const turning = clamp((progress - 0.68) / 0.18);
  const entering = clamp((progress - 0.8) / 0.2);
  const loaderExit = clamp((progress - 0.24) / 0.12);

  // Smooth truck position across the yard
  const truckX = 6 + driving * 95;
  const loaderX = -28 + loading * 34 - loaderExit * 20;
  const looseContainerX = -31 + loading * 37;
  const looseContainerY = 9 - loading * 12;

  // Smooth rotation proportional to driving distance
  const wheelRotation = driving * 1440;
  const wheelOpacity = rawDriving > 0.02 && rawDriving < 0.98 ? 0.75 : 0;

  // Only show loose container while in flight; once seated, truck container shows
  const looseContainerVisible = loading < 0.98;
  const looseContainerOpacity = clamp((progress - 0.06) / 0.05) * (1 - clamp((loading - 0.9) / 0.08));
  const truckContainerOpacity = clamp((loading - 0.9) / 0.1);

  return (
    <section ref={sectionRef} className="relative h-[400vh] bg-[#7d6857]">
      <div className="relative sticky top-0 h-screen overflow-hidden">
        {/* Background yard image */}
        <img
          src={assetPath("/images/hero/logistics-yard.png")}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-950/20 via-transparent to-slate-950/40" />

        {/* Side-view moving flatbed truck */}
        <div
          className="pointer-events-none absolute bottom-[9%] left-0 z-20 w-[min(72vw,1050px)] will-change-transform"
          style={{
            opacity: 1 - entering,
            transform: `translate3d(${truckX}vw, 0, 0) rotate(${turning * 6}deg) scale(${1 - turning * 0.1})`,
            transformOrigin: "80% 75%",
          }}
        >
          <img
            src={assetPath("/images/hero/empty-flatbed-truck.png")}
            alt="Flatbed delivery truck"
            className="block w-full drop-shadow-[0_20px_10px_rgba(10,16,20,0.42)]"
          />

          {/* Shipping container placed on flatbed */}
          <img
            src={assetPath("/images/hero/shipping-container.png")}
            alt=""
            className="absolute bottom-[20%] left-[0.3%] w-[62%] drop-shadow-[0_12px_7px_rgba(10,16,20,0.25)]"
            style={{ opacity: truckContainerOpacity }}
          />

          {/* Smooth natural wheel rotation (seamlessly integrated into tires without button-like concentric rings) */}
          {wheelPositions.map((wheel, index) => (
            <SpinningWheel
              key={index}
              left={wheel.left}
              bottom={wheel.bottom}
              rotation={wheelRotation + index * 12}
              opacity={wheelOpacity}
            />
          ))}
        </div>

        {/* JCB Loader */}
        <div
          className="pointer-events-none absolute bottom-[21%] left-0 z-30 w-[min(23vw,330px)] will-change-transform"
          style={{
            opacity: 1 - loaderExit,
            transform: `translate3d(${loaderX}vw, 0, 0)`,
          }}
        >
          <img
            src={assetPath("/images/hero/realistic-jcb.png")}
            alt="JCB loader"
            className="block w-full drop-shadow-[0_18px_9px_rgba(10,16,20,0.42)]"
          />
        </div>

        {/* Loose Container in flight toward flatbed */}
        {looseContainerVisible && (
          <img
            src={assetPath("/images/hero/shipping-container.png")}
            alt=""
            className="pointer-events-none absolute bottom-[34%] left-0 z-[25] w-[min(44vw,650px)] will-change-transform"
            style={{
              opacity: looseContainerOpacity,
              transform: `translate3d(${looseContainerX}vw, ${looseContainerY}vh, 0)`,
            }}
          />
        )}

        {/* Loaded truck front-view arriving at warehouse */}
        <div
          className="pointer-events-none absolute bottom-[4%] left-1/2 z-40 w-[min(64vw,920px)] -translate-x-1/2 will-change-transform"
          style={{
            opacity: entering,
            transform: `translateX(-50%) scale(${0.72 + entering * 0.28})`,
          }}
        >
          <img
            src={assetPath("/images/hero/truck-front-loaded.png")}
            alt="Loaded truck entering the warehouse"
            className="block w-full drop-shadow-[0_24px_14px_rgba(10,16,20,0.5)]"
          />
        </div>

        {/* Smooth bottom transition gradient blending into the cool dark website theme */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-40 h-44 bg-gradient-to-t from-[#17120f] via-[#17120f]/85 to-transparent" />

        {/* Futuristic scroll prompt */}
        <div className="absolute bottom-7 left-1/2 z-50 h-11 w-6 -translate-x-1/2 rounded-full border border-white/30 p-1 shadow-lg backdrop-blur-md">
          <div className="mx-auto h-2 w-1 rounded-full bg-[#f97316] animate-bounce" />
        </div>
      </div>
    </section>
  );
}
