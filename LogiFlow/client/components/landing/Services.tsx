"use client";

import Link from "next/link";
import {
  ArrowRight,
  Boxes,
  Globe2,
  MapPinned,
  Warehouse,
  Sparkles,
} from "lucide-react";

const services = [
  {
    number: "01",
    icon: Boxes,
    title: "Express Delivery",
    description:
      "Priority shipping designed for time-sensitive packages that need dependable delivery and fast turnaround.",
  },
  {
    number: "02",
    icon: Warehouse,
    title: "Warehouse Solutions",
    description:
      "Secure storage, automated sorting, inventory handling, and regional distribution through an organized logistics network.",
  },
  {
    number: "03",
    icon: MapPinned,
    title: "Real-Time Tracking",
    description:
      "Track every shipment from pickup to destination with live waypoint updates, clear status, and verified delivery proofs.",
  },
  {
    number: "04",
    icon: Globe2,
    title: "Business Logistics",
    description:
      "Flexible logistics infrastructure for growing businesses that require reliable, scalable, and cost-effective delivery operations.",
  },
];

export default function Services() {
  return (
    <section className="relative overflow-hidden border-b border-[#4a3729] bg-[#17120f] py-24 text-[#fff8ef] sm:py-32">
      {/* Background radial glow */}
      <div className="pointer-events-none absolute left-1/4 top-1/3 h-96 w-96 rounded-full bg-[#f97316]/[.06] blur-[140px]" />
      <div className="pointer-events-none absolute bottom-10 right-1/4 h-96 w-96 rounded-full bg-[#f1c168]/[.05] blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-[1600px] px-6 lg:px-12 2xl:px-16">
        {/* Spacious Centered Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#f4b56a]/30 bg-[#f4b56a]/[.08] px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-[#f4b56a]">
            <Sparkles size={12} />
            What We Do
          </span>

          <h2 className="mt-6 text-4xl font-bold tracking-[-0.03em] text-[#fff8ef] sm:text-5xl lg:text-6xl">
            Everything your{" "}
            <span className="bg-gradient-to-r from-[#f4b56a] via-[#f97316] to-[#f1c168] bg-clip-text text-transparent">
              delivery needs.
            </span>
          </h2>

          <p className="mt-5 text-base leading-7 text-[#c1b0a0] sm:text-lg">
            From the first mile to the last mile, LogiFlow connects people,
            packages, warehouses, and transportation into one seamless
            delivery experience.
          </p>
        </div>

        {/* Spacious 4-Card Grid with Cool Dark Tech Aesthetic */}
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <article
                key={service.number}
                className="group relative flex flex-col justify-between rounded-3xl border border-[#4a3729] bg-[#241b15] p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#a56e42] hover:bg-[#302219] hover:shadow-[0_18px_45px_rgba(24,14,8,0.3)]"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="grid h-12 w-12 place-items-center rounded-2xl border border-[#f4b56a]/25 bg-[#f4b56a]/[.08] text-[#f4b56a] transition-all duration-300 group-hover:bg-[#f97316] group-hover:text-[#24150a]">
                      <Icon size={22} strokeWidth={2} />
                    </div>

                    <span className="font-mono text-xs font-bold tracking-wider text-[#8d7c6d] transition-colors group-hover:text-[#f4b56a]">
                      {service.number}
                    </span>
                  </div>

                  <h3 className="mt-7 text-lg font-bold tracking-tight text-[#fff8ef] transition-colors group-hover:text-[#ffd6a5]">
                    {service.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-[#c1b0a0]">
                    {service.description}
                  </p>
                </div>

                <div className="mt-8 flex items-center border-t border-[#4a3729] pt-4 text-xs font-bold uppercase tracking-wider text-[#a28c7a] transition-colors group-hover:text-[#f4b56a]">
                  <span>Learn more</span>
                  <ArrowRight
                    size={14}
                    className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
                  />
                </div>
              </article>
            );
          })}
        </div>

        {/* Action Link with comfortable spacing */}
        <div className="mt-14 text-center">
          <Link
            href="/services"
            className="site-button site-button-secondary site-button-lg"
          >
            Explore all freight services & routes
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
