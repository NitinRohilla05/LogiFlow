"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  PackageSearch,
  ShieldCheck,
  Truck,
} from "lucide-react";

import TrackingForm from "@/components/tracking/TrackingForm";
import ShipmentStatus from "@/components/tracking/ShipmentStatus";
import TrackingMap from "@/components/tracking/TrackingMap";
import useTracking from "@/hooks/useTracking";

export default function TrackingPage() {
  const [trackingId, setTrackingId] = useState("");

  const {
    trackingResult,
    isLoading,
    error,
    trackShipment,
    clearTracking,
  } = useTracking();

  async function handleTrack(id: string) {
    setTrackingId(id);
    await trackShipment(id);
  }

  function handleDemoSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!trackingId.trim()) {
      return;
    }

    void handleTrack(trackingId.trim());
  }

  return (
    <main className="bg-slate-50 text-slate-950">
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950 pb-20 pt-36 text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-slate-950 to-slate-950" />

        <div className="absolute -right-32 top-10 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute -left-40 bottom-0 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-blue-300">
              <PackageSearch size={14} />
              Shipment Tracking
            </span>

            <h1 className="mt-6 text-5xl font-bold leading-[1.04] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
              Know where your
              <br />
              <span className="text-blue-400">
                shipment is.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
              Enter your LogiFlow tracking ID to see shipment progress,
              current location, and estimated delivery information.
            </p>
          </div>

          <div className="mt-10 max-w-3xl">
            <TrackingForm
              onTrack={handleTrack}
              isLoading={isLoading}
            />
          </div>
        </div>
      </section>

      {/* Error */}
      {error && (
        <section className="mx-auto max-w-7xl px-6 pt-8 lg:px-8">
          <div
            role="alert"
            className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-600"
          >
            {error}
          </div>
        </section>
      )}

      {/* Search Result */}
      {trackingResult ? (
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
                  Shipment Found
                </p>

                <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
                  Tracking details
                </h2>
              </div>

              <button
                type="button"
                onClick={clearTracking}
                className="w-fit rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-100"
              >
                Clear Results
              </button>
            </div>

            <ShipmentStatus
              trackingId={trackingResult.trackingId}
              status={trackingResult.currentStatus}
              currentLocation={trackingResult.currentLocation}
              estimatedDelivery={trackingResult.estimatedDelivery}
            />
          </div>
        </section>
      ) : (
        <>
          {/* Tracking Search */}
          <section className="py-16 sm:py-20">
            <div className="mx-auto max-w-4xl px-6 lg:px-8">
              <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/40 sm:p-8 lg:p-10">
                <div className="text-center">
                  <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-blue-50 text-blue-600">
                    <PackageSearch size={24} />
                  </div>

                  <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
                    Track a Shipment
                  </p>

                  <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                    Enter your tracking ID
                  </h2>

                  <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-500">
                    Your tracking ID can usually be found in your shipping
                    confirmation or delivery receipt.
                  </p>
                </div>

                <form
                  onSubmit={handleDemoSubmit}
                  className="mx-auto mt-8 max-w-2xl"
                >
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <input
                      type="text"
                      value={trackingId}
                      onChange={(event) =>
                        setTrackingId(event.target.value)
                      }
                      placeholder="e.g. LF123456789"
                      className="h-12 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                      autoComplete="off"
                    />

                    <button
                      type="submit"
                      disabled={isLoading || !trackingId.trim()}
                      className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-blue-500 px-6 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-blue-400 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {isLoading ? (
                        <>
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                          Searching...
                        </>
                      ) : (
                        <>
                          Track Shipment
                          <ArrowRight size={17} />
                        </>
                      )}
                    </button>
                  </div>
                </form>

                {/* Demo ID */}
                <div className="mx-auto mt-5 max-w-2xl rounded-xl bg-slate-50 px-4 py-3 text-center">
                  <p className="text-xs text-slate-400">
                    Demo tracking ID
                  </p>

                  <button
                    type="button"
                    onClick={() => setTrackingId("LF123456789")}
                    className="mt-1 text-sm font-bold text-blue-600 hover:text-blue-700"
                  >
                    LF123456789
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Live Map */}
          <TrackingMap />

          {/* Features */}
          <section className="bg-white py-20 sm:py-24">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="max-w-2xl">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
                  Why Track With LogiFlow
                </p>

                <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
                  Visibility at every step.
                </h2>
              </div>

              <div className="mt-12 grid gap-5 md:grid-cols-3">
                <article className="rounded-3xl border border-slate-200 bg-slate-50 p-7">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-blue-600 shadow-sm">
                    <Truck size={21} />
                  </div>

                  <h3 className="mt-7 text-xl font-bold">
                    Live Location
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    Follow your shipment as it moves through the logistics
                    network.
                  </p>
                </article>

                <article className="rounded-3xl border border-slate-200 bg-slate-50 p-7">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-blue-600 shadow-sm">
                    <CheckCircle2 size={21} />
                  </div>

                  <h3 className="mt-7 text-xl font-bold">
                    Clear Status
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    See exactly which stage your shipment has reached.
                  </p>
                </article>

                <article className="rounded-3xl border border-slate-200 bg-slate-50 p-7">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-blue-600 shadow-sm">
                    <ShieldCheck size={21} />
                  </div>

                  <h3 className="mt-7 text-xl font-bold">
                    Reliable Information
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    Keep your delivery information centralized and easy to
                    understand.
                  </p>
                </article>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="bg-slate-50 py-20 sm:py-24">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="rounded-[32px] bg-slate-950 px-7 py-14 text-center text-white sm:px-12 sm:py-16">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-300">
                  Need an account?
                </p>

                <h2 className="mx-auto mt-5 max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
                  Manage every shipment from one dashboard.
                </h2>

                <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
                  Create your LogiFlow account to manage shipments and access
                  your full logistics workspace.
                </p>

                <Link
                  href="/register"
                  className="mt-8 inline-flex items-center gap-2 rounded-xl bg-blue-500 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:-translate-y-1 hover:bg-blue-400"
                >
                  Create Account
                  <ArrowRight size={17} />
                </Link>
              </div>
            </div>
          </section>
        </>
      )}
    </main>
  );
}