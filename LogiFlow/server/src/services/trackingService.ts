import {
  createTrackingEvent,
  findLatestTrackingEvent,
  findTrackingEvents,
  type TrackingEvent,
} from "../models/Tracking";

import {
  findShipmentByTrackingId,
  updateShipment,
  type ShipmentStatus,
} from "../models/Shipment";

export interface TrackingDetails {
  trackingId: string;
  currentStatus: ShipmentStatus;
  currentLocation: string;
  estimatedDelivery: Date;
  events: TrackingEvent[];
}

export interface AddTrackingEventInput {
  trackingId: string;
  status: ShipmentStatus;
  location: string;
  description?: string;
}

const VALID_STATUSES: ShipmentStatus[] = [
  "pending",
  "picked-up",
  "in-transit",
  "warehouse",
  "out-for-delivery",
  "delivered",
];

function validateStatus(status: ShipmentStatus): void {
  if (!VALID_STATUSES.includes(status)) {
    throw new Error("Invalid shipment status.");
  }
}

export async function getTracking(
  trackingId: string
): Promise<TrackingDetails> {
  const normalizedTrackingId = trackingId.trim();

  if (!normalizedTrackingId) {
    throw new Error("Tracking ID is required.");
  }

  const shipment = await findShipmentByTrackingId(
    normalizedTrackingId
  );

  if (!shipment) {
    throw new Error("Shipment not found.");
  }

  const events = await findTrackingEvents(
    normalizedTrackingId
  );

  const latestEvent = events[0];

  return {
    trackingId: shipment.trackingId,
    currentStatus: shipment.status,
    currentLocation:
      latestEvent?.location ?? shipment.origin,
    estimatedDelivery: shipment.estimatedDelivery,
    events,
  };
}

export async function getTrackingHistory(
  trackingId: string
): Promise<TrackingEvent[]> {
  const normalizedTrackingId = trackingId.trim();

  if (!normalizedTrackingId) {
    throw new Error("Tracking ID is required.");
  }

  const shipment = await findShipmentByTrackingId(
    normalizedTrackingId
  );

  if (!shipment) {
    throw new Error("Shipment not found.");
  }

  return findTrackingEvents(normalizedTrackingId);
}

export async function addTrackingEvent(
  input: AddTrackingEventInput
): Promise<TrackingEvent> {
  const trackingId = input.trackingId.trim();
  const location = input.location.trim();
  const description =
    input.description?.trim() ||
    `Shipment status updated to ${input.status}.`;

  if (!trackingId) {
    throw new Error("Tracking ID is required.");
  }

  if (!location) {
    throw new Error("Location is required.");
  }

  validateStatus(input.status);

  const shipment =
    await findShipmentByTrackingId(trackingId);

  if (!shipment) {
    throw new Error("Shipment not found.");
  }

  const event = await createTrackingEvent({
    trackingId,
    status: input.status,
    location,
    description,
  });

  await updateShipment(shipment.id, {
    status: input.status,
  });

  return event;
}

export async function updateTracking(
  trackingId: string,
  input: {
    status: ShipmentStatus;
    location: string;
    description?: string;
  }
): Promise<TrackingDetails> {
  const normalizedTrackingId = trackingId.trim();

  if (!normalizedTrackingId) {
    throw new Error("Tracking ID is required.");
  }

  validateStatus(input.status);

  const location = input.location.trim();

  if (!location) {
    throw new Error("Location is required.");
  }

  const shipment = await findShipmentByTrackingId(
    normalizedTrackingId
  );

  if (!shipment) {
    throw new Error("Shipment not found.");
  }

  await addTrackingEvent({
    trackingId: normalizedTrackingId,
    status: input.status,
    location,
    description: input.description,
  });

  return getTracking(normalizedTrackingId);
}

export async function getLatestTrackingEvent(
  trackingId: string
): Promise<TrackingEvent | null> {
  const normalizedTrackingId = trackingId.trim();

  if (!normalizedTrackingId) {
    throw new Error("Tracking ID is required.");
  }

  const shipment = await findShipmentByTrackingId(
    normalizedTrackingId
  );

  if (!shipment) {
    throw new Error("Shipment not found.");
  }

  return findLatestTrackingEvent(normalizedTrackingId);
}