"use client";

import type { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: number | string;
  description: string;
  icon: LucideIcon;
  trend?: string;
  trendType?: "positive" | "negative" | "neutral";
}

export default function StatsCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  trendType = "neutral",
}: StatsCardProps) {
  const trendStyles = {
    positive: "bg-emerald-50 text-emerald-600",
    negative: "bg-red-50 text-red-600",
    neutral: "bg-slate-100 text-slate-500",
  };

  return (
    <article className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-slate-200/50">
      <div className="flex items-start justify-between gap-4">
        {/* Icon */}
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 text-blue-600 transition-colors duration-300 group-hover:bg-blue-500 group-hover:text-white">
          <Icon size={21} strokeWidth={2} />
        </div>

        {/* Trend */}
        {trend && (
          <span
            className={`rounded-full px-2.5 py-1 text-xs font-bold ${trendStyles[trendType]}`}
          >
            {trend}
          </span>
        )}
      </div>

      {/* Value */}
      <div className="mt-6">
        <p className="text-sm font-medium text-slate-500">
          {title}
        </p>

        <p className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
          {value}
        </p>
      </div>

      {/* Description */}
      <p className="mt-2 text-xs leading-5 text-slate-400">
        {description}
      </p>
    </article>
  );
}