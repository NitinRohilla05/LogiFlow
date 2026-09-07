"use client";

import {
  Check,
  CircleDot,
  Clock3,
  MapPin,
  Package,
  Truck,
} from "lucide-react";
import type { ShipmentStatus } from "@/types/shipment";

interface ShipmentStatusProps {
  trackingId: string;
  status: ShipmentStatus;
  currentLocation?: string;
  estimatedDelivery?: string;
}

const statusSteps: {
  key: ShipmentStatus;
  label: string;
  description: string;
  icon: typeof Package;
}[] = [
  {
    key: "pending",
    label: "Order Placed",
    description: "Shipment information has been received.",
    icon: Package,
  },
  {
    key: "picked-up",
    label: "Picked Up",
    description: "Package has been collected from the sender.",
    icon: Package,
  },
  {
    key: "in-transit",
    label: "In Transit",
    description: "Shipment is currently moving to its destination.",
    icon: Truck,
  },
  {
    key: "warehouse",
    label: "At Warehouse",
    description: "Package is being processed at the distribution center.",
    icon: Package,
  },
  {
    key: "out-for-delivery",
    label: "Out for Delivery",
    description: "Courier is on the way to the final destination.",
    icon: Truck,
  },
  {
    key: "delivered",
    label: "Delivered",
    description: "Package has reached its destination.",
    icon: Check,
  },
];

export default function ShipmentStatus({
  trackingId,
  status,
  currentLocation = "Gurugram, Haryana",
  estimatedDelivery = "Today, 6:30 PM",
}: ShipmentStatusProps) {
  const currentIndex = statusSteps.findIndex(
    (step) => step.key === status
  );

  const safeIndex = currentIndex >= 0 ? currentIndex : 0;
  const currentStep = statusSteps[safeIndex];

  return (
    <section className="w-full rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/40 sm:p-8">
      {/* Header */}
      <div className="flex flex-col gap-5 border-b border-slate-200 pb-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
            Tracking ID
          </p>

          <h2 className="mt-2 text-xl font-bold tracking-tight text-slate-950">
            {trackingId}
          </h2>
        </div>

        <div className="inline-flex w-fit items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
          <span className="h-2 w-2 animate-pulse rounded-full bg-blue-500" />
          {currentStep.label}
        </div>
      </div>

      {/* Current Information */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl bg-slate-50 p-5">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-white text-blue-500 shadow-sm">
              <MapPin size={19} />
            </div>

            <div>
              <p className="text-xs font-medium text-slate-400">
                Current Location
              </p>

              <p className="mt-1 font-semibold text-slate-900">
                {currentLocation}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-slate-50 p-5">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-white text-blue-500 shadow-sm">
              <Clock3 size={19} />
            </div>

            <div>
              <p className="text-xs font-medium text-slate-400">
                Estimated Delivery
              </p>

              <p className="mt-1 font-semibold text-slate-900">
                {estimatedDelivery}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="mt-10">
        <div className="mb-6">
          <h3 className="text-lg font-bold tracking-tight text-slate-950">
            Shipment Journey
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Follow the progress of your shipment from pickup to delivery.
          </p>
        </div>

        <div className="space-y-0">
          {statusSteps.map((step, index) => {
            const Icon = step.icon;
            const isCompleted = index < safeIndex;
            const isCurrent = index === safeIndex;
            const isUpcoming = index > safeIndex;
            const isLast = index === statusSteps.length - 1;

            return (
              <div key={step.key} className="flex gap-4">
                {/* Indicator */}
                <div className="flex w-10 shrink-0 flex-col items-center">
                  <div
                    className={[
                      "grid h-10 w-10 place-items-center rounded-full border-2 transition-all",
                      isCompleted &&
                        "border-blue-500 bg-blue-500 text-white",
                      isCurrent &&
                        "border-blue-500 bg-blue-50 text-blue-600 shadow-lg shadow-blue-500/20",
                      isUpcoming &&
                        "border-slate-200 bg-slate-50 text-slate-400",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    {isCompleted ? (
                      <Check size={17} strokeWidth={2.5} />
                    ) : isCurrent ? (
                      <CircleDot size={18} />
                    ) : (
                      <Icon size={17} />
                    )}
                  </div>

                  {!isLast && (
                    <div
                      className={`my-1 w-[2px] flex-1 min-h-12 ${
                        index < safeIndex
                          ? "bg-blue-500"
                          : "bg-slate-200"
                      }`}
                    />
                  )}
                </div>

                {/* Content */}
                <div
                  className={`pb-8 ${
                    isLast ? "pb-0" : ""
                  }`}
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <h4
                      className={`font-semibold ${
                        isCurrent
                          ? "text-blue-600"
                          : isUpcoming
                            ? "text-slate-400"
                            : "text-slate-900"
                      }`}
                    >
                      {step.label}
                    </h4>

                    {isCurrent && (
                      <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-600">
                        Current
                      </span>
                    )}
                  </div>

                  <p
                    className={`mt-1 text-sm leading-6 ${
                      isUpcoming
                        ? "text-slate-400"
                        : "text-slate-500"
                    }`}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}