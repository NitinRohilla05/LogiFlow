"use client";

import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  MapPin,
  Package,
  Truck,
} from "lucide-react";

interface ShipmentCardProps {
  trackingId: string;
  destination: string;
  origin?: string;
  status:
    | "pending"
    | "picked-up"
    | "in-transit"
    | "warehouse"
    | "out-for-delivery"
    | "delivered";
  estimatedDelivery: string;
}

const statusConfig = {
  pending: {
    label: "Pending",
    className: "bg-amber-50 text-amber-600",
  },
  "picked-up": {
    label: "Picked Up",
    className: "bg-blue-50 text-blue-600",
  },
  "in-transit": {
    label: "In Transit",
    className: "bg-indigo-50 text-indigo-600",
  },
  warehouse: {
    label: "At Warehouse",
    className: "bg-purple-50 text-purple-600",
  },
  "out-for-delivery": {
    label: "Out for Delivery",
    className: "bg-cyan-50 text-cyan-600",
  },
  delivered: {
    label: "Delivered",
    className: "bg-emerald-50 text-emerald-600",
  },
};

export default function ShipmentCard({
  trackingId,
  destination,
  origin = "New Delhi",
  status,
  estimatedDelivery,
}: ShipmentCardProps) {
  const statusInfo = statusConfig[status];

  return (
    <article className="group rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-slate-200/50 sm:p-6">
      {/* Top */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-blue-50 text-blue-600">
            <Package size={21} />
          </div>

          <div>
            <p className="text-xs font-medium text-slate-400">
              Tracking ID
            </p>

            <h3 className="mt-1 text-sm font-bold text-slate-950 sm:text-base">
              {trackingId}
            </h3>
          </div>
        </div>

        <span
          className={`rounded-full px-3 py-1.5 text-xs font-bold ${statusInfo.className}`}
        >
          {statusInfo.label}
        </span>
      </div>

      {/* Route */}
      <div className="mt-6 rounded-2xl bg-slate-50 p-4">
        <div className="relative">
          <div className="absolute left-[7px] top-3 bottom-3 w-px bg-slate-200" />

          <div className="relative flex items-start gap-3">
            <span className="mt-1 h-4 w-4 shrink-0 rounded-full border-4 border-blue-500 bg-white" />

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                From
              </p>

              <p className="mt-1 text-sm font-semibold text-slate-900">
                {origin}
              </p>
            </div>
          </div>

          <div className="relative mt-5 flex items-start gap-3">
            <span className="mt-1 h-4 w-4 shrink-0 rounded-full border-4 border-slate-300 bg-white" />

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                To
              </p>

              <p className="mt-1 text-sm font-semibold text-slate-900">
                {destination}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Delivery Info */}
      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-slate-100 p-4">
          <div className="flex items-center gap-2 text-slate-400">
            <CalendarDays size={15} />

            <span className="text-[10px] font-bold uppercase tracking-[0.12em]">
              Delivery
            </span>
          </div>

          <p className="mt-2 text-sm font-semibold text-slate-900">
            {estimatedDelivery}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-100 p-4">
          <div className="flex items-center gap-2 text-slate-400">
            <MapPin size={15} />

            <span className="text-[10px] font-bold uppercase tracking-[0.12em]">
              Destination
            </span>
          </div>

          <p className="mt-2 truncate text-sm font-semibold text-slate-900">
            {destination}
          </p>
        </div>
      </div>

      {/* Action */}
      <Link
        href={`/tracking?id=${encodeURIComponent(trackingId)}`}
        className="mt-5 flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition-all hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
      >
        <Truck size={16} />

        Track Shipment

        <ArrowRight
          size={16}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      </Link>
    </article>
  );
}