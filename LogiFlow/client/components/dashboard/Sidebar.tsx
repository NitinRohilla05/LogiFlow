"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  MapPin,
  UserRound,
  LogOut,
  ArrowLeft,
  X,
} from "lucide-react";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const navigation = [
  {
    label: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Shipments",
    href: "/dashboard/shipments",
    icon: Package,
  },
  {
    label: "Tracking",
    href: "/tracking",
    icon: MapPin,
  },
  {
    label: "Profile",
    href: "/dashboard/profile",
    icon: UserRound,
  },
];

export default function Sidebar({
  isOpen = false,
  onClose,
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={[
          "fixed left-0 top-0 z-50 flex h-screen w-72 flex-col border-r border-slate-200 bg-white transition-transform duration-300",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0",
        ].join(" ")}
      >
        {/* Header */}
        <div className="flex h-20 items-center justify-between border-b border-slate-200 px-6">
          <Link
            href="/"
            className="flex items-center gap-3"
            onClick={onClose}
          >
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-[var(--primary)] text-lg font-bold text-white">
              L
            </div>

            <div>
              <span className="text-xl font-bold tracking-tight text-slate-950">
                Logi<span className="text-[var(--primary)]">Flow</span>
              </span>

              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                Logistics
              </p>
            </div>
          </Link>

          <button
            type="button"
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 lg:hidden"
            aria-label="Close sidebar"
          >
            <X size={19} />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-4 py-7">
          <p className="px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
            Menu
          </p>

          <nav className="mt-3 space-y-1" aria-label="Dashboard navigation">
            {navigation.map((item) => {
              const Icon = item.icon;

              const isActive =
                item.href === "/dashboard"
                  ? pathname === "/dashboard"
                  : pathname === item.href ||
                    pathname.startsWith(`${item.href}/`);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  aria-current={isActive ? "page" : undefined}
                  className={[
                    "group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition-all",
                    isActive
                      ? "bg-blue-50 text-[var(--primary)]"
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-900",
                  ].join(" ")}
                >
                  <Icon
                    size={19}
                    strokeWidth={isActive ? 2.4 : 2}
                    className={
                      isActive
                        ? "text-[var(--primary)]"
                        : "text-slate-400 group-hover:text-slate-700"
                    }
                  />

                  <span>{item.label}</span>

                  {isActive && (
                    <span className="ml-auto h-2 w-2 rounded-full bg-[var(--primary)]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Quick Info */}
          <div className="mt-8 rounded-2xl bg-slate-950 p-5 text-white">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
              <span className="text-xs font-semibold text-emerald-300">
                System Online
              </span>
            </div>

            <p className="mt-3 text-sm font-semibold">
              Logistics network is operating normally.
            </p>

            <p className="mt-2 text-xs leading-5 text-slate-400">
              Track shipments and manage your delivery activity from your
              dashboard.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 p-4">
          <Link
            href="/"
            onClick={onClose}
            className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-900"
          >
            <ArrowLeft size={18} />
            <span>Back to Website</span>
          </Link>

          <button
            type="button"
            className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-red-500 transition-colors hover:bg-red-50"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}