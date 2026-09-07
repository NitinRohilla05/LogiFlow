"use client";

import Image from "next/image";
import Link from "next/link";
import { assetPath } from "@/lib/assetPath";
import {
  ArrowRight,
  Boxes,
  CheckCircle2,
  Clock3,
  Globe2,
  MapPinned,
  ShieldCheck,
  Truck,
  Warehouse,
} from "lucide-react";

const services = [
  {
    number: "01",
    icon: Truck,
    title: "Express Delivery",
    description:
      "Fast and dependable delivery for time-sensitive shipments that need priority handling.",
    features: [
      "Priority shipment handling",
      "Faster delivery routes",
      "Real-time shipment visibility",
    ],
  },
  {
    number: "02",
    icon: Warehouse,
    title: "Warehouse Solutions",
    description:
      "Organized storage, sorting, and distribution operations for businesses of every size.",
    features: [
      "Secure package storage",
      "Inventory coordination",
      "Fast warehouse processing",
    ],
  },
  {
    number: "03",
    icon: MapPinned,
    title: "Real-Time Tracking",
    description:
      "Know where your shipment is throughout its journey with clear tracking and status updates.",
    features: [
      "Shipment location updates",
      "Delivery progress timeline",
      "Estimated delivery information",
    ],
  },
  {
    number: "04",
    icon: Boxes,
    title: "Package Management",
    description:
      "Keep packages organized from pickup through sorting, transfer, and final delivery.",
    features: [
      "Package identification",
      "Shipment status management",
      "Centralized shipment records",
    ],
  },
  {
    number: "05",
    icon: Globe2,
    title: "Business Logistics",
    description:
      "Flexible logistics workflows designed to support businesses with recurring shipping needs.",
    features: [
      "Scalable shipment workflows",
      "Business shipment management",
      "Centralized logistics visibility",
    ],
  },
  {
    number: "06",
    icon: ShieldCheck,
    title: "Secure Delivery",
    description:
      "A delivery experience built around reliable handling and transparent shipment management.",
    features: [
      "Secure package handling",
      "Shipment activity records",
      "Delivery status visibility",
    ],
  },
];

const stats = [
  {
    value: "99.2%",
    label: "On-time delivery",
  },
  {
    value: "24/7",
    label: "Tracking visibility",
  },
  {
    value: "150+",
    label: "Delivery routes",
  },
  {
    value: "1",
    label: "Connected platform",
  },
];

export default function ServicesPage() {
  return (
    <main className="bg-slate-50 text-slate-950">
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950 pb-24 pt-36 text-white">
        <div className="absolute inset-0">
          <Image
            src={assetPath("/images/hero/hero-bg.png")}
            alt=""
            fill
            priority
            className="object-cover opacity-25"
            sizes="100vw"
          />

          <div className="absolute inset-0 bg-slate-950/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/75 to-slate-950/35" />
        </div>

        <div className="absolute -right-40 top-10 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-4xl">
            <span className="inline-flex rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-blue-300">
              Logistics Services
            </span>

            <h1 className="mt-6 text-5xl font-bold leading-[1.04] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
              One logistics platform.
              <br />
              <span className="text-blue-400">
                Every shipment journey.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
              From express delivery and warehouse operations to real-time
              tracking and business logistics, LogiFlow brings the complete
              shipment journey together.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/tracking"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-500 px-6 py-3.5 text-sm font-semibold text-white shadow-xl shadow-blue-500/20 transition-all hover:-translate-y-1 hover:bg-blue-400"
              >
                Track a Shipment
                <ArrowRight size={17} />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-all hover:-translate-y-1 hover:bg-white/15"
              >
                Talk to Our Team
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`px-6 py-8 text-center sm:px-8 ${
                index > 0 ? "border-l border-slate-200" : ""
              }`}
            >
              <p className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                {stat.value}
              </p>

              <p className="mt-2 text-xs font-medium uppercase tracking-[0.12em] text-slate-400 sm:text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--primary)]">
              Our capabilities
            </span>

            <h2 className="mt-5 text-4xl font-bold leading-tight tracking-[-0.03em] text-slate-950 sm:text-5xl">
              Built around the
              <br />
              complete delivery cycle.
            </h2>

            <p className="mt-5 text-base leading-7 text-slate-500">
              Every part of the LogiFlow experience is designed to make
              logistics easier to manage, easier to understand, and easier to
              scale.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon;

              return (
                <article
                  key={service.number}
                  className="group relative overflow-hidden rounded-[28px] border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-2xl hover:shadow-slate-200/50"
                >
                  <div className="flex items-start justify-between">
                    <div className="grid h-13 w-13 place-items-center rounded-2xl bg-blue-50 text-blue-600 transition-all duration-300 group-hover:bg-blue-500 group-hover:text-white">
                      <Icon size={23} />
                    </div>

                    <span className="text-sm font-bold text-slate-300">
                      {service.number}
                    </span>
                  </div>

                  <h3 className="mt-8 text-xl font-bold tracking-tight text-slate-950">
                    {service.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    {service.description}
                  </p>

                  <div className="mt-6 space-y-3 border-t border-slate-100 pt-6">
                    {service.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-start gap-3"
                      >
                        <CheckCircle2
                          size={17}
                          className="mt-0.5 shrink-0 text-blue-500"
                        />

                        <span className="text-sm text-slate-600">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-blue-600">
                    Learn more

                    <ArrowRight
                      size={15}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </div>

                  <div className="absolute -bottom-16 -right-16 h-36 w-36 rounded-full bg-blue-100/60 blur-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="overflow-hidden bg-slate-950 py-24 text-white sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-14 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-blue-300">
                How it works
              </span>

              <h2 className="mt-5 text-4xl font-bold leading-tight tracking-[-0.03em] sm:text-5xl">
                From pickup
                <br />
                to delivery.
              </h2>

              <p className="mt-5 max-w-lg text-base leading-7 text-slate-400">
                LogiFlow keeps the shipment journey connected across every
                important stage.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-blue-500/10 text-blue-400">
                  <Truck size={20} />
                </div>

                <h3 className="mt-6 text-lg font-bold">
                  Pickup
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Shipment is collected and entered into the logistics
                  network.
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-blue-500/10 text-blue-400">
                  <Clock3 size={20} />
                </div>

                <h3 className="mt-6 text-lg font-bold">
                  Transit
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Shipment moves between locations while its progress remains
                  visible.
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-blue-500/10 text-blue-400">
                  <Warehouse size={20} />
                </div>

                <h3 className="mt-6 text-lg font-bold">
                  Processing
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Packages are sorted and prepared for the next stage of the
                  delivery.
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-blue-500/10 text-blue-400">
                  <CheckCircle2 size={20} />
                </div>

                <h3 className="mt-6 text-lg font-bold">
                  Delivered
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Shipment reaches its final destination and the journey is
                  complete.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[32px] bg-blue-600 px-7 py-14 text-white sm:px-12 sm:py-16">
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-2xl" />

            <div className="relative z-10 max-w-3xl">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-blue-100">
                Ready to move?
              </span>

              <h2 className="mt-5 text-4xl font-bold tracking-[-0.03em] sm:text-5xl">
                Put LogiFlow to work for your next shipment.
              </h2>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-blue-100 sm:text-base">
                Start tracking deliveries, managing shipments, and building a
                more connected logistics workflow today.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-blue-600 transition-all hover:-translate-y-1 hover:bg-blue-50"
                >
                  Get Started
                  <ArrowRight size={17} />
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:-translate-y-1 hover:bg-white/15"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}