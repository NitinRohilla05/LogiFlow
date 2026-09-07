"use client";

import Link from "next/link";
import { assetPath } from "@/lib/assetPath";
import Image from "next/image";
import { ArrowRight, MapPin, PackageCheck, Truck } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={assetPath("/images/hero/hero-bg.png")}
          alt="LogiFlow delivery truck at a modern warehouse"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-slate-950/65" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/70 to-slate-950/20" />
      </div>

      {/* Decorative Glow */}
      <div className="absolute -left-32 top-1/3 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="absolute -right-32 bottom-10 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-6 pb-16 pt-32 lg:px-8">
        <div className="grid w-full items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Left */}
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-200 backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
              Smart Logistics. Simplified.
            </div>

            <h1 className="text-5xl font-bold leading-[1.02] tracking-[-0.04em] sm:text-6xl lg:text-8xl">
              Delivering
              <br />
              <span className="text-blue-400">Beyond</span>
              <br />
              Expectations.
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
              Move every shipment with confidence. LogiFlow connects pickup,
              transportation, warehouse operations, and final delivery in one
              modern logistics platform.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/tracking"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-500 px-6 py-3.5 text-sm font-semibold text-white shadow-xl shadow-blue-500/20 transition-all hover:-translate-y-1 hover:bg-blue-400"
              >
                Track Your Package
                <ArrowRight size={17} />
              </Link>

              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-all hover:-translate-y-1 hover:bg-white/15"
              >
                Explore Services
              </Link>
            </div>

            {/* Trust Metrics */}
            <div className="mt-12 grid max-w-2xl grid-cols-3 border-y border-white/10 py-6">
              <div>
                <p className="text-2xl font-bold sm:text-3xl">99.2%</p>
                <p className="mt-1 text-xs text-slate-400 sm:text-sm">
                  On-time delivery
                </p>
              </div>

              <div className="border-l border-white/10 pl-5">
                <p className="text-2xl font-bold sm:text-3xl">24/7</p>
                <p className="mt-1 text-xs text-slate-400 sm:text-sm">
                  Shipment tracking
                </p>
              </div>

              <div className="border-l border-white/10 pl-5">
                <p className="text-2xl font-bold sm:text-3xl">150+</p>
                <p className="mt-1 text-xs text-slate-400 sm:text-sm">
                  Delivery routes
                </p>
              </div>
            </div>
          </div>

          {/* Right / Shipment Card */}
          <div className="hidden lg:block">
            <div className="ml-auto max-w-md">
              <div className="overflow-hidden rounded-[28px] border border-white/15 bg-slate-900/65 p-5 shadow-2xl shadow-black/30 backdrop-blur-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.16em] text-slate-400">
                      Live Delivery
                    </p>
                    <h2 className="mt-1 text-lg font-semibold">
                      Shipment in transit
                    </h2>
                  </div>

                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-blue-500/15 text-blue-300">
                    <Truck size={21} />
                  </div>
                </div>

                {/* Mini Route */}
                <div className="relative mt-8">
                  <div className="absolute left-[10px] top-3 bottom-3 w-px bg-white/15" />

                  <div className="relative flex gap-4">
                    <div className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-blue-500">
                      <MapPin size={13} />
                    </div>

                    <div className="pb-7">
                      <p className="text-xs text-slate-400">Pickup</p>
                      <p className="mt-1 font-medium">New Delhi</p>
                    </div>
                  </div>

                  <div className="relative flex gap-4">
                    <div className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full border border-blue-400/50 bg-blue-500/10 text-blue-300">
                      <Truck size={13} />
                    </div>

                    <div className="pb-7">
                      <p className="text-xs text-slate-400">Current location</p>
                      <p className="mt-1 font-medium">Gurugram</p>
                    </div>
                  </div>

                  <div className="relative flex gap-4">
                    <div className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full border border-white/20 bg-white/5 text-slate-400">
                      <PackageCheck size={13} />
                    </div>

                    <div>
                      <p className="text-xs text-slate-400">Destination</p>
                      <p className="mt-1 font-medium">Jaipur</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 border-t border-white/10 pt-5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Shipment</span>
                    <span className="font-medium text-slate-200">
                      LF123456789
                    </span>
                  </div>

                  <div className="mt-3 flex items-center justify-between text-xs">
                    <span className="text-slate-400">Estimated arrival</span>
                    <span className="font-medium text-blue-300">
                      Today, 6:30 PM
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/50">
          <span>Scroll to explore</span>

          <div className="h-10 w-5 rounded-full border border-white/25 p-1">
            <div className="mx-auto h-2 w-1 rounded-full bg-white/70 animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}