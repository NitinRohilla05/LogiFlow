"use client";

import Image from "next/image";
import { MapPin, Navigation, Truck } from "lucide-react";
import { useEffect, useState } from "react";
import { assetPath } from "@/lib/assetPath";

const routePoints = [
  {
    name: "New Delhi",
    type: "Pickup",
    top: "76.8%",
    left: "16%",
  },
  {
    name: "Gurugram",
    type: "Current Location",
    top: "50%",
    left: "47%",
  },
  {
    name: "Jaipur",
    type: "Destination",
    top: "27.7%",
    left: "82%",
  },
];

// Exact Bezier curve points matching:
// M 160 430 C 280 390, 350 300, 470 280 C 620 255, 680 190, 820 155
function getBezierPoint(
  p0: { x: number; y: number },
  p1: { x: number; y: number },
  p2: { x: number; y: number },
  p3: { x: number; y: number },
  u: number
) {
  const inv = 1 - u;
  const inv2 = inv * inv;
  const inv3 = inv2 * inv;
  const u2 = u * u;
  const u3 = u2 * u;

  const x =
    inv3 * p0.x +
    3 * inv2 * u * p1.x +
    3 * inv * u2 * p2.x +
    u3 * p3.x;

  const y =
    inv3 * p0.y +
    3 * inv2 * u * p1.y +
    3 * inv * u2 * p2.y +
    u3 * p3.y;

  return { x, y };
}

function computeTruckCoordinates(progressVal: number) {
  const t = Math.max(0, Math.min(100, progressVal)) / 100;
  if (t <= 0.5) {
    const u = t / 0.5;
    return getBezierPoint(
      { x: 160, y: 430 },
      { x: 280, y: 390 },
      { x: 350, y: 300 },
      { x: 470, y: 280 },
      u
    );
  } else {
    const u = (t - 0.5) / 0.5;
    return getBezierPoint(
      { x: 470, y: 280 },
      { x: 620, y: 255 },
      { x: 680, y: 190 },
      { x: 820, y: 155 },
      u
    );
  }
}

export default function TrackingMap() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let paused = false;

    const interval = setInterval(() => {
      if (paused) return;

      setProgress((previous) => {
        if (previous >= 100) {
          paused = true;
          setTimeout(() => {
            setProgress(0);
            paused = false;
          }, 2000);
          return 100;
        }

        return previous + 0.5;
      });
    }, 40);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const point = computeTruckCoordinates(progress);
  const truckLeft = (point.x / 1000) * 100;
  const truckTop = (point.y / 560) * 100;

  return (
    <section className="relative overflow-hidden bg-slate-950 py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-blue-300">
            <Navigation size={13} />
            Live Tracking
          </span>

          <h2 className="mt-6 text-4xl font-bold tracking-[-0.03em] text-white sm:text-5xl">
            Know exactly where
            <br />
            your shipment is.
          </h2>

          <p className="mt-5 text-base leading-7 text-slate-400 sm:text-lg">
            Follow your shipment in real time from pickup to destination with
            complete visibility throughout the journey.
          </p>
        </div>

        {/* Tracking Card */}
        <div className="mt-12 overflow-hidden rounded-[28px] border border-white/10 bg-slate-900 shadow-2xl shadow-black/20">
          <div className="grid lg:grid-cols-[1fr_320px]">
            {/* Map */}
            <div className="relative min-h-[560px] overflow-hidden">
              <Image
                src={assetPath("/images/tracking/tracking-map.png")}
                alt="Shipment tracking dashboard"
                fill
                className="object-cover opacity-20"
                sizes="(max-width: 1024px) 100vw, 70vw"
              />

              <div className="absolute inset-0 bg-slate-950/70" />

              {/* Grid */}
              <div
                className="absolute inset-0 opacity-[0.08]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
                  backgroundSize: "60px 60px",
                }}
              />

              {/* Route */}
              <svg
                className="absolute inset-0 h-full w-full"
                viewBox="0 0 1000 560"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M 160 430 C 280 390, 350 300, 470 280 C 620 255, 680 190, 820 155"
                  fill="none"
                  stroke="rgba(255,255,255,0.12)"
                  strokeWidth="8"
                  strokeLinecap="round"
                />

                <path
                  d="M 160 430 C 280 390, 350 300, 470 280 C 620 255, 680 190, 820 155"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray="12 10"
                />
              </svg>

              {/* Location Points */}
              {routePoints.map((pt, index) => (
                <div
                  key={pt.name}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{
                    top: pt.top,
                    left: pt.left,
                  }}
                >
                  <div
                    className={`relative grid h-10 w-10 place-items-center rounded-full border shadow-xl ${
                      index === 1
                        ? "border-blue-400 bg-blue-500 text-white shadow-blue-500/30"
                        : "border-white/20 bg-slate-900 text-slate-300"
                    }`}
                  >
                    <MapPin size={18} />
                  </div>

                  <div className="absolute left-1/2 top-12 -translate-x-1/2 whitespace-nowrap rounded-lg border border-white/10 bg-slate-950/90 px-3 py-2 backdrop-blur-md">
                    <p className="text-[10px] uppercase tracking-wider text-slate-500">
                      {pt.type}
                    </p>
                    <p className="mt-0.5 text-xs font-semibold text-white">
                      {pt.name}
                    </p>
                  </div>
                </div>
              ))}

              {/* Animated Truck following the road curve */}
              <div
                className="absolute -translate-x-1/2 -translate-y-1/2 will-change-transform"
                style={{
                  left: `${truckLeft}%`,
                  top: `${truckTop}%`,
                }}
              >
                <div className="relative grid h-12 w-12 place-items-center rounded-2xl border border-blue-300/30 bg-blue-500 text-white shadow-2xl shadow-blue-500/30">
                  <Truck size={22} />

                  <span className="absolute inset-[-7px] rounded-2xl border border-blue-400/20 animate-ping" />
                </div>
              </div>

              {/* Map Badge */}
              <div className="absolute left-5 top-5 rounded-xl border border-white/10 bg-slate-950/80 px-4 py-3 backdrop-blur-xl sm:left-7 sm:top-7">
                <p className="text-[10px] uppercase tracking-[0.16em] text-slate-500">
                  Shipment
                </p>
                <p className="mt-1 font-semibold text-white">
                  LF123456789
                </p>
              </div>

              <div className="absolute bottom-5 left-5 flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-500/10 px-4 py-2 text-xs font-semibold text-emerald-300 backdrop-blur-xl sm:bottom-7 sm:left-7">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                Live
              </div>
            </div>

            {/* Details */}
            <aside className="border-t border-white/10 p-6 lg:border-l lg:border-t-0 lg:p-7">
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-slate-500">
                  Current Status
                </p>

                <div className="mt-3 flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-blue-500/10 text-blue-400">
                    <Truck size={19} />
                  </div>

                  <div>
                    <h3 className="font-semibold text-white">
                      In Transit
                    </h3>
                    <p className="text-xs text-slate-500">
                      Gurugram, Haryana
                    </p>
                  </div>
                </div>
              </div>

              <div className="my-7 border-t border-white/10" />

              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-slate-500">
                  Delivery Progress
                </p>

                <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-blue-500 transition-all duration-75"
                    style={{
                      width: `${Math.max(5, progress)}%`,
                    }}
                  />
                </div>

                <div className="mt-2 flex justify-between text-xs text-slate-500">
                  <span>Picked up</span>
                  <span>{Math.round(progress)}%</span>
                  <span>Delivered</span>
                </div>
              </div>

              <div className="my-7 border-t border-white/10" />

              <div className="space-y-5">
                <div>
                  <p className="text-xs text-slate-500">
                    Estimated Delivery
                  </p>
                  <p className="mt-1 font-semibold text-white">
                    Today, 6:30 PM
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-500">
                    Destination
                  </p>
                  <p className="mt-1 font-semibold text-white">
                    Jaipur, Rajasthan
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-500">
                    Shipment Type
                  </p>
                  <p className="mt-1 font-semibold text-white">
                    Express Delivery
                  </p>
                </div>
              </div>

              <button
                type="button"
                className="mt-8 w-full rounded-xl bg-blue-500 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-400"
              >
                View Full Tracking
              </button>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}