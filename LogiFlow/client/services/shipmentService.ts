import type {
  CreateShipmentData,
  Shipment,
  ShipmentStatusUpdate,
} from "@/types/shipment";

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
      result?.message ?? "Unable to process shipment request."
    );
  }

  return (result?.data ?? result) as T;
}

export async function getShipments(): Promise<Shipment[]> {
  return request<Shipment[]>("/shipments");
}

export async function getShipmentById(
  shipmentId: string
): Promise<Shipment> {
  return request<Shipment>(
    `/shipments/${encodeURIComponent(shipmentId)}`
  );
}

export async function getShipmentByTrackingId(
  trackingId: string
): Promise<Shipment> {
  return request<Shipment>(
    `/shipments/tracking/${encodeURIComponent(trackingId)}`
  );
}

export async function createShipment(
  shipmentData: CreateShipmentData
): Promise<Shipment> {
  return request<Shipment>("/shipments", {
    method: "POST",
    body: JSON.stringify(shipmentData),
  });
}

export async function updateShipmentStatus(
  shipmentId: string,
  statusData: ShipmentStatusUpdate
): Promise<Shipment> {
  return request<Shipment>(
    `/shipments/${encodeURIComponent(shipmentId)}/status`,
    {
      method: "PATCH",
      body: JSON.stringify(statusData),
    }
  );
}

export async function deleteShipment(
  shipmentId: string
): Promise<{ message: string }> {
  return request<{ message: string }>(
    `/shipments/${encodeURIComponent(shipmentId)}`,
    {
      method: "DELETE",
    }
  );
}