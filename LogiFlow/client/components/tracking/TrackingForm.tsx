"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, Search } from "lucide-react";

interface TrackingFormProps {
  onTrack?: (trackingId: string) => void;
  isLoading?: boolean;
}

export default function TrackingForm({
  onTrack,
  isLoading = false,
}: TrackingFormProps) {
  const [trackingId, setTrackingId] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const id = trackingId.trim();

    if (!id || isLoading) {
      return;
    }

    onTrack?.(id);
  }

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-slate-200 bg-white p-2 shadow-lg shadow-slate-200/40"
      >
        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="relative flex-1">
            <label htmlFor="tracking-id" className="sr-only">
              Tracking ID
            </label>

            <Search
              size={19}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              aria-hidden="true"
            />

            <input
              id="tracking-id"
              type="text"
              value={trackingId}
              onChange={(event) => setTrackingId(event.target.value)}
              placeholder="Enter tracking ID, e.g. LF123456789"
              autoComplete="off"
              spellCheck={false}
              className="h-12 w-full rounded-xl border border-transparent bg-slate-50 pl-11 pr-4 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:border-blue-200 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
            />
          </div>

          <button
            type="submit"
            disabled={!trackingId.trim() || isLoading}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-6 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[var(--primary-dark)] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
          >
            {isLoading ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Tracking...
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

      <p className="mt-3 text-xs text-slate-400">
        Enter your shipment tracking ID to see its latest location and
        delivery status.
      </p>
    </div>
  );
}