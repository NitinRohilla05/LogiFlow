"use client";

import Link from "next/link";
import { ArrowRight, Navigation, Activity, Clock3, Gauge, Sparkles } from "lucide-react";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import JourneyScene from "@/components/landing/JourneyScene";
import Services from "@/components/landing/Services";
import CTA from "@/components/landing/CTA";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#17120f] text-[#fff8ef] selection:bg-[#f97316] selection:text-[#24150a]">
      {/* Scroll-driven interactive truck dispatch sequence */}
      <JourneyScene />

      {/* Floating glassmorphic dock header */}
      <Navbar />

      {/* Core services and capabilities */}
      <Services />

      {/* Spacious Track Anything Feature Section in Cool Dark Tech Theme */}
      <section className="relative overflow-hidden border-b border-[#4a3729] bg-[#211711] py-24 sm:py-32">
        {/* Ambient Lighting */}
        <div className="pointer-events-none absolute right-1/4 top-10 h-96 w-96 rounded-full bg-[#f97316]/[.08] blur-[150px]" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-72 w-72 rounded-full bg-[#f3c77a]/[.06] blur-[130px]" />

        <div className="relative z-10 mx-auto max-w-[1600px] px-6 lg:px-12 2xl:px-16">
          <div className="rounded-[28px] border border-[#5a4636] bg-[#2a1f18]/90 p-7 shadow-[0_24px_80px_rgba(30,18,10,0.32)] backdrop-blur-2xl sm:p-12 lg:p-14">
            <div className="grid gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-16">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-[#f4b56a]/30 bg-[#f4b56a]/[.08] px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-[#f4b56a]">
                  <Navigation size={13} />
                  Universal Telemetry
                </span>

                <h2 className="mt-6 max-w-xl text-4xl font-bold leading-[1.08] tracking-[-0.03em] text-[#fff8ef] sm:text-5xl lg:text-[3.65rem]">
                  Your shipment is always{" "}
                  <span className="bg-gradient-to-r from-[#f4b56a] via-[#f97316] to-[#f1c168] bg-clip-text text-transparent">
                    within reach.
                  </span>
                </h2>

                <p className="mt-6 max-w-xl text-base leading-7 text-[#c1b0a0] sm:text-lg">
                  Follow your package from pickup to warehouse arrival with one unified tracking dashboard. Real-time waypoint telemetry and sub-second dispatch updates.
                </p>

                <div className="mt-9 flex flex-wrap items-center gap-3">
                  <Link
                    href="/tracking"
                    className="site-button site-button-primary site-button-lg"
                  >
                    Track a Shipment
                    <ArrowRight size={17} />
                  </Link>

                  <Link
                    href="/services"
                    className="site-button site-button-secondary site-button-lg"
                  >
                    Explore Delivery Network
                  </Link>
                </div>
              </div>

              {/* Verified Metrics / Trust Card */}
              <div className="rounded-3xl border border-[#5a4636] bg-[#201711]/90 p-6 shadow-inner sm:p-7">
                <div className="flex items-center justify-between">
                  <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#f4b56a]">
                    Network Reliability
                  </p>
                  <span className="flex h-2.5 w-2.5 rounded-full bg-[#f97316] shadow-[0_0_14px_rgba(249,115,22,0.65)] animate-pulse" />
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-[#5a4636] bg-[#31241c] p-4">
                    <Activity size={17} className="text-[#f4b56a]" />
                    <p className="mt-4 font-mono text-2xl font-bold text-[#f4b56a]">99.4%</p>
                    <p className="mt-1 text-xs font-medium leading-5 text-[#c1b0a0]">On-time delivery rate</p>
                  </div>

                  <div className="rounded-2xl border border-[#5a4636] bg-[#31241c] p-4">
                    <Clock3 size={17} className="text-[#f1c168]" />
                    <p className="mt-4 font-mono text-2xl font-bold text-[#fff8ef]">24 / 7</p>
                    <p className="mt-1 text-xs font-medium leading-5 text-[#c1b0a0]">Continuous GPS tracking</p>
                  </div>

                  <div className="rounded-2xl border border-[#5a4636] bg-[#31241c] p-4">
                    <Gauge size={17} className="text-[#f1c168]" />
                    <p className="mt-4 font-mono text-2xl font-bold text-[#fff8ef]">150+</p>
                    <p className="mt-1 text-xs font-medium leading-5 text-[#c1b0a0]">Active distribution hubs</p>
                  </div>

                  <div className="rounded-2xl border border-[#5a4636] bg-[#31241c] p-4">
                    <Sparkles size={17} className="text-[#f4b56a]" />
                    <p className="mt-4 font-mono text-2xl font-bold text-[#f4b56a]">&lt; 15m</p>
                    <p className="mt-1 text-xs font-medium leading-5 text-[#c1b0a0]">Average dispatch speed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Spacious Call To Action */}
      <CTA />

      {/* Spacious Footer */}
      <Footer />
    </main>
  );
}
