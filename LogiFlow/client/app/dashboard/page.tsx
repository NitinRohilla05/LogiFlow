"use client";

import {
  Activity,
  ArrowRight,
  CheckCircle2,
  Clock3,
  Package,
  Truck,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import Sidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import ShipmentCard from "@/components/dashboard/ShipmentCard";
import StatsCard from "@/components/dashboard/StatsCard";
import { getShipments } from "@/services/shipmentService";
import type { Shipment } from "@/types/shipment";

const activity = [
  {
    icon: Truck,
    title: "Shipment LF123456789 is in transit",
    description: "Gurugram, Haryana",
    time: "12 min ago",
  },
  {
    icon: Package,
    title: "Shipment LF987654321 reached warehouse",
    description: "Manesar Distribution Center",
    time: "1 hour ago",
  },
  {
    icon: CheckCircle2,
    title: "Shipment LF456789123 delivered",
    description: "Chandigarh, India",
    time: "Yesterday",
  },
];

export default function DashboardPage() {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadShipments() {
      try {
        const result = await getShipments();

        if (isMounted) {
          setShipments(result);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err instanceof Error
              ? err.message
              : "Unable to load shipments."
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void loadShipments();

    return () => {
      isMounted = false;
    };
  }, []);

  const shipmentCounts = shipments.reduce(
    (counts, shipment) => {
      counts.total += 1;
      counts[shipment.status] += 1;
      return counts;
    },
    {
      total: 0,
      pending: 0,
      "picked-up": 0,
      "in-transit": 0,
      warehouse: 0,
      "out-for-delivery": 0,
      delivered: 0,
    } as Record<string, number>
  );

  function formatDeliveryDate(value: string): string {
    return new Intl.DateTimeFormat("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(value));
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />

      <div className="lg:pl-72">
        <DashboardHeader />

        <main className="px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            {/* Heading */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-medium text-slate-400">
                  Overview
                </p>

                <h2 className="mt-1 text-3xl font-bold tracking-tight text-slate-950">
                  Your logistics at a glance
                </h2>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                  Monitor your shipments, delivery progress, and recent
                  logistics activity from one place.
                </p>
              </div>

              <Link
                href="/tracking"
                className="inline-flex w-fit items-center gap-2 rounded-xl bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-0.5 hover:bg-[var(--primary-dark)]"
              >
                Track Shipment
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              <StatsCard
                title="Total Shipments"
                value={isLoading ? "..." : shipmentCounts.total}
                description="All shipments associated with your account"
                icon={Package}
                trend="+12%"
                trendType="positive"
              />

              <StatsCard
                title="In Transit"
                value={isLoading ? "..." : shipmentCounts["in-transit"]}
                description="Shipments currently moving through the network"
                icon={Truck}
                trend="+8%"
                trendType="positive"
              />

              <StatsCard
                title="Delivered"
                value={isLoading ? "..." : shipmentCounts.delivered}
                description="Successfully delivered shipments"
                icon={CheckCircle2}
                trend="+18%"
                trendType="positive"
              />

              <StatsCard
                title="Pending"
                value={isLoading ? "..." : shipmentCounts.pending}
                description="Shipments waiting for pickup or processing"
                icon={Clock3}
                trend="Stable"
                trendType="neutral"
              />
            </div>

            {/* Main Grid */}
            <div className="mt-8 grid gap-8 xl:grid-cols-[1.4fr_0.6fr]">
              {/* Recent Shipments */}
              <section>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                      Shipments
                    </p>

                    <h3 className="mt-1 text-xl font-bold text-slate-950">
                      Recent shipments
                    </h3>
                  </div>

                  <Link
                    href="/tracking"
                    className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700"
                  >
                    View all
                    <ArrowRight size={15} />
                  </Link>
                </div>

                {error && (
                  <p className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                    {error}
                  </p>
                )}

                {!error && !isLoading && shipments.length === 0 && (
                  <p className="mt-5 rounded-2xl border border-slate-200 bg-white px-4 py-6 text-sm text-slate-500">
                    No shipments found for this account.
                  </p>
                )}

                <div className="mt-5 grid gap-4">
                  {shipments.slice(0, 3).map((shipment) => (
                    <ShipmentCard
                      key={shipment.trackingId}
                      trackingId={shipment.trackingId}
                      origin={shipment.origin}
                      destination={shipment.destination}
                      status={shipment.status}
                      estimatedDelivery={formatDeliveryDate(
                        shipment.estimatedDelivery
                      )}
                    />
                  ))}
                </div>
              </section>

              {/* Activity */}
              <section>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                    Activity
                  </p>

                  <h3 className="mt-1 text-xl font-bold text-slate-950">
                    Recent updates
                  </h3>
                </div>

                <div className="mt-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="space-y-6">
                    {activity.map((item, index) => {
                      const Icon = item.icon;
                      const isLast = index === activity.length - 1;

                      return (
                        <div
                          key={`${item.title}-${item.time}`}
                          className="relative flex gap-4"
                        >
                          {!isLast && (
                            <div className="absolute left-5 top-11 h-[calc(100%+24px)] w-px bg-slate-200" />
                          )}

                          <div className="relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-600">
                            <Icon size={18} />
                          </div>

                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-semibold leading-5 text-slate-900">
                              {item.title}
                            </p>

                            <p className="mt-1 text-xs leading-5 text-slate-500">
                              {item.description}
                            </p>

                            <p className="mt-2 text-[11px] font-medium uppercase tracking-wider text-slate-400">
                              {item.time}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-7 flex items-center gap-3 rounded-2xl bg-emerald-50 p-4">
                    <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white text-emerald-600 shadow-sm">
                      <Activity size={17} />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-emerald-800">
                        Network operating normally
                      </p>

                      <p className="mt-0.5 text-xs text-emerald-600/80">
                        No active delivery disruptions detected.
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Bottom CTA */}
            <section className="mt-8 overflow-hidden rounded-3xl bg-slate-950 p-7 text-white sm:p-9">
              <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-2xl">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-300">
                    Need to send something?
                  </p>

                  <h3 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
                    Start a new shipment with LogiFlow.
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-400">
                    Create a shipment, receive a tracking ID, and monitor
                    the delivery from pickup to destination.
                  </p>
                </div>

                <Link
                  href="/register"
                  className="inline-flex w-fit shrink-0 items-center gap-2 rounded-xl bg-blue-500 px-5 py-3.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-blue-400"
                >
                  Create Shipment
                  <ArrowRight size={16} />
                </Link>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}