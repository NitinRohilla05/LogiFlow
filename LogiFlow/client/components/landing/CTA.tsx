"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, Zap, ShieldCheck } from "lucide-react";

const benefits = [
  "Real-time waypoint telemetry & automated ETA forecasting",
  "Dedicated nation-wide express carrier dispatch network",
  "Smart automated warehouse sorting & temperature control",
  "24/7 dedicated enterprise logistics support team",
];

export default function CTA() {
  return (
    <section className="relative overflow-hidden border-b border-[#4a3729] bg-[#211711] py-24 text-[#fff8ef] sm:py-32">
      {/* Background Image with Deep Shading */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src="/images/delivery/delivery-truck.png"
          alt=""
          fill
          className="object-cover opacity-[.08]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#211711] via-[#211711]/95 to-[#211711]" />
      </div>

      {/* Atmospheric Ambient Lighting */}
      <div className="pointer-events-none absolute left-10 top-1/3 h-96 w-96 rounded-full bg-[#f1c168]/[.06] blur-[150px]" />
      <div className="pointer-events-none absolute bottom-1/3 right-10 h-96 w-96 rounded-full bg-[#f97316]/[.08] blur-[150px]" />

      {/* Main Content with Expansive Padding & Spacing */}
      <div className="relative z-10 mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-14 2xl:px-16">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#f4b56a]/30 bg-[#f4b56a]/[.08] px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-[#f4b56a]">
              <Zap size={13} />
              Enterprise Freight Solutions
            </span>

            <h2 className="mt-6 text-4xl font-bold leading-[1.08] tracking-[-0.03em] text-[#fff8ef] sm:text-5xl lg:text-6xl">
              Let&apos;s get your{" "}
              <span className="bg-gradient-to-r from-[#f4b56a] via-[#f97316] to-[#f1c168] bg-clip-text text-transparent">
                shipment moving.
              </span>
            </h2>

            <p className="mt-6 max-w-xl text-base leading-7 text-[#c1b0a0] sm:text-lg">
              Experience modern logistics with guaranteed delivery windows,
              live GPS telematics, and a connected supply chain built around your business.
            </p>

            {/* Action Buttons with Generous Spacing */}
            <div className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
              <Link
                href="/tracking"
                className="site-button site-button-primary site-button-lg"
              >
                Track a Shipment Now
                <ArrowRight size={17} />
              </Link>

              <Link
                href="/register"
                className="site-button site-button-secondary site-button-lg"
              >
                Create Shipper Account
              </Link>
            </div>
          </div>

          {/* Spacious Benefits Card */}
          <div className="w-full">
            <div className="rounded-3xl border border-[#5a4636] bg-[#2a1f18]/95 p-6 shadow-[0_24px_80px_rgba(30,18,10,0.32)] backdrop-blur-2xl sm:p-8">
              <div className="flex items-center justify-between border-b border-[#4a3729] pb-5">
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#f4b56a]">
                  Why Choose LogiFlow
                </p>
                <span className="flex h-2.5 w-2.5 rounded-full bg-[#f97316] shadow-[0_0_14px_rgba(249,115,22,0.65)] animate-pulse" />
              </div>

              <div className="mt-7 space-y-4">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex items-start gap-4">
                  <div className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg border border-[#f4b56a]/25 bg-[#f4b56a]/[.08] text-[#f4b56a]">
                      <CheckCircle2 size={16} />
                    </div>

                    <span className="text-sm font-medium leading-6 text-[#e2d1c1]">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-8 grid grid-cols-2 gap-5 border-t border-[#4a3729] pt-7">
                <div>
                  <p className="font-mono text-2xl font-bold text-[#fff8ef]">24 / 7 / 365</p>
                  <p className="mt-1 text-xs font-medium text-[#c1b0a0]">Continuous Monitoring</p>
                </div>
                <div>
                  <p className="font-mono text-2xl font-bold text-[#f4b56a]">&lt; 0.02%</p>
                  <p className="mt-1 text-xs font-medium text-[#c1b0a0]">Claim Incident Rate</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
