import type { ShipmentStatus } from "./shipment";

export interface TrackingEvent {
  id: string;
  trackingId: string;
  status: ShipmentStatus;
  location: string;
  description: string;
  timestamp: string;
}

export interface TrackingDetails {
  trackingId: string;
  currentStatus: ShipmentStatus;
  currentLocation: string;
  estimatedDelivery: string;
  events: TrackingEvent[];
}