"use client";

import { Bell, Menu, Search, UserRound } from "lucide-react";
import { useState } from "react";

interface DashboardHeaderProps {
  onMenuClick?: () => void;
}

export default function DashboardHeader({
  onMenuClick,
}: DashboardHeaderProps) {
  const [search, setSearch] = useState("");

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
      <div className="flex h-20 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Mobile Menu */}
        <button
          type="button"
          onClick={onMenuClick}
          className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-slate-100 text-slate-700 transition-colors hover:bg-slate-200 lg:hidden"
          aria-label="Open dashboard menu"
        >
          <Menu size={20} />
        </button>

        {/* Page Title */}
        <div className="hidden min-w-0 flex-1 lg:block">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
            Dashboard
          </p>

          <h1 className="mt-1 truncate text-xl font-bold tracking-tight text-slate-950">
            Welcome back 👋
          </h1>
        </div>

        {/* Search */}
        <div className="relative hidden w-full max-w-md md:block">
          <Search
            size={18}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search shipments..."
            className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm font-medium text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-blue-200 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            className="relative grid h-10 w-10 place-items-center rounded-xl text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
            aria-label="Notifications"
          >
            <Bell size={19} />

            <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-blue-500 ring-2 ring-white" />
          </button>

          <div className="hidden h-8 w-px bg-slate-200 sm:block" />

          <button
            type="button"
            className="flex items-center gap-3 rounded-xl px-2 py-1.5 transition-colors hover:bg-slate-50"
            aria-label="Open profile menu"
          >
            <div className="grid h-9 w-9 place-items-center rounded-full bg-blue-50 text-blue-600">
              <UserRound size={18} />
            </div>

            <div className="hidden text-left sm:block">
              <p className="text-sm font-semibold text-slate-900">
                LogiFlow User
              </p>

              <p className="text-xs text-slate-400">
                Customer Account
              </p>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="border-t border-slate-100 px-4 py-3 md:hidden">
        <div className="relative">
          <Search
            size={17}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search shipments..."
            className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-900 outline-none focus:border-blue-200 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
          />
        </div>
      </div>
    </header>
  );
}