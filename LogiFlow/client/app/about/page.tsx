import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Globe2,
  ShieldCheck,
  Truck,
  Users,
} from "lucide-react";

const highlights = [
  {
    icon: Truck,
    title: "Reliable Delivery",
    description:
      "A connected logistics workflow designed to keep shipments moving efficiently.",
  },
  {
    icon: Globe2,
    title: "Connected Network",
    description:
      "One platform connecting pickup, transportation, warehouse operations, and delivery.",
  },
  {
    icon: ShieldCheck,
    title: "Built for Visibility",
    description:
      "Clear shipment status and tracking throughout the delivery journey.",
  },
  {
    icon: Users,
    title: "Customer Focused",
    description:
      "Simple tools and experiences designed around the people using them every day.",
  },
];

const values = [
  "Transparent shipment tracking",
  "Reliable logistics operations",
  "Modern technology",
  "Scalable delivery workflows",
];

export default function AboutPage() {
  return (
    <main className="bg-slate-50 text-slate-950">
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950 pb-24 pt-36 text-white">
        <div className="absolute inset-0">
          <Image
            src="/images/warehouse/warehouse-bg.png"
            alt=""
            fill
            priority
            className="object-cover opacity-30"
            sizes="100vw"
          />

          <div className="absolute inset-0 bg-slate-950/75" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-950/40" />
        </div>

        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-blue-300">
              About LogiFlow
            </span>

            <h1 className="mt-6 text-5xl font-bold leading-[1.05] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
              Moving goods.
              <br />
              <span className="text-blue-400">
                Building confidence.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
              LogiFlow is a modern logistics experience built to make
              shipping easier to manage, easier to track, and easier to
              understand.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="bg-white py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="relative overflow-hidden rounded-[32px]">
              <Image
                src="/images/warehouse/warehouse-interior.png"
                alt="Modern logistics warehouse interior"
                width={1200}
                height={900}
                className="h-[460px] w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 to-transparent" />

              <div className="absolute bottom-6 left-6 rounded-2xl border border-white/15 bg-slate-950/70 px-5 py-4 text-white backdrop-blur-xl">
                <p className="text-xs uppercase tracking-[0.16em] text-slate-400">
                  Our approach
                </p>

                <p className="mt-1 text-sm font-semibold">
                  Technology + Logistics
                </p>
              </div>
            </div>

            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--primary)]">
                Why LogiFlow
              </span>

              <h2 className="mt-5 text-4xl font-bold leading-tight tracking-[-0.03em] text-slate-950 sm:text-5xl">
                Logistics should feel
                <br />
                simple.
              </h2>

              <p className="mt-6 text-base leading-7 text-slate-500">
                Traditional delivery operations can involve disconnected
                systems, unclear shipment status, and complicated workflows.
                LogiFlow brings those moving parts together into one
                connected experience.
              </p>

              <p className="mt-5 text-base leading-7 text-slate-500">
                From the moment a shipment is picked up to the moment it
                reaches its destination, our platform is designed around
                visibility, reliability, and operational simplicity.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {values.map((value) => (
                  <div
                    key={value}
                    className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3"
                  >
                    <CheckCircle2
                      size={18}
                      className="shrink-0 text-blue-500"
                    />

                    <span className="text-sm font-semibold text-slate-700">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="bg-slate-50 py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--primary)]">
              What We Believe
            </span>

            <h2 className="mt-5 text-4xl font-bold tracking-[-0.03em] text-slate-950 sm:text-5xl">
              Better logistics starts
              <br />
              with better visibility.
            </h2>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className="rounded-3xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-slate-200/50"
                >
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 text-blue-600">
                    <Icon size={21} />
                  </div>

                  <h3 className="mt-7 text-lg font-bold text-slate-950">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    {item.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="rounded-[32px] bg-slate-950 px-7 py-14 text-center text-white sm:px-12 sm:py-16">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-300">
              Start with LogiFlow
            </p>

            <h2 className="mx-auto mt-5 max-w-3xl text-4xl font-bold tracking-[-0.03em] sm:text-5xl">
              Put every shipment on a smarter journey.
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
              Track deliveries, manage shipments, and build a more connected
              logistics workflow with LogiFlow.
            </p>

            <Link
              href="/register"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-blue-500 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:-translate-y-1 hover:bg-blue-400"
            >
              Get Started
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}