"use client";

import { useCallback, useState } from "react";
import { getTrackingDetails } from "@/services/trackingService";
import type { TrackingDetails } from "@/types/tracking";

interface UseTrackingReturn {
  trackingResult: TrackingDetails | null;
  isLoading: boolean;
  error: string | null;
  trackShipment: (trackingId: string) => Promise<void>;
  clearTracking: () => void;
}

export default function useTracking(): UseTrackingReturn {
  const [trackingResult, setTrackingResult] =
    useState<TrackingDetails | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const trackShipment = useCallback(async (trackingId: string) => {
    const id = trackingId.trim();

    if (!id) {
      setError("Please enter a tracking ID.");
      setTrackingResult(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await getTrackingDetails(id);

      setTrackingResult(result);
    } catch (err) {
      setTrackingResult(null);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to fetch shipment tracking details."
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearTracking = useCallback(() => {
    setTrackingResult(null);
    setError(null);
    setIsLoading(false);
  }, []);

  return {
    trackingResult,
    isLoading,
    error,
    trackShipment,
    clearTracking,
  };
}