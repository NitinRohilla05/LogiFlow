import type {
  TrackingDetails,
  TrackingEvent,
} from "@/types/tracking";
import type { ShipmentStatus } from "@/types/shipment";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";

interface ApiResponse<T> {
  success?: boolean;
  message?: string;
  data?: T;
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {}),
      ...(options.headers ?? {}),
    },
  });

  const result = (await response.json().catch(() => null)) as
    | ApiResponse<T>
    | null;

  if (!response.ok) {
    throw new Error(
      result?.message ?? "Unable to process tracking request."
    );
  }

  return (result?.data ?? result) as T;
}

export async function getTrackingDetails(
  trackingId: string
): Promise<TrackingDetails> {
  return request<TrackingDetails>(
    `/tracking/${encodeURIComponent(trackingId)}`
  );
}

export async function getTrackingHistory(
  trackingId: string
): Promise<TrackingEvent[]> {
  return request<TrackingEvent[]>(
    `/tracking/${encodeURIComponent(trackingId)}/history`
  );
}

export async function addTrackingEvent(
  trackingId: string,
  event: {
    status: ShipmentStatus;
    location: string;
    description: string;
  }
): Promise<TrackingEvent> {
  return request<TrackingEvent>("/tracking/events", {
    method: "POST",
    body: JSON.stringify({
      trackingId,
      ...event,
    }),
  });
}

export async function updateShipmentTracking(
  trackingId: string,
  status: ShipmentStatus,
  location: string,
  description?: string
): Promise<TrackingDetails> {
  return request<TrackingDetails>(
    `/tracking/${encodeURIComponent(trackingId)}`,
    {
      method: "PATCH",
      body: JSON.stringify({
        status,
        location,
        description,
      }),
    }
  );
}