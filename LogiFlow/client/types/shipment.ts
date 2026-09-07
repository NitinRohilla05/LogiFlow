export type ShipmentStatus =
  | "pending"
  | "picked-up"
  | "in-transit"
  | "warehouse"
  | "out-for-delivery"
  | "delivered";

export interface Shipment {
  id: string;
  trackingId: string;

  sender: string;
  receiver: string;

  origin: string;
  destination: string;

  status: ShipmentStatus;

  weight: number;
  estimatedDelivery: string;

  createdAt: string;
  updatedAt: string;
}

export interface CreateShipmentData {
  sender: string;
  receiver: string;

  origin: string;
  destination: string;

  weight: number;
}

export interface ShipmentStatusUpdate {
  status: ShipmentStatus;
  location: string;
  description?: string;
}