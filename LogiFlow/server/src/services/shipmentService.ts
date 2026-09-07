import {
  createShipment,
  deleteShipment,
  findAllShipments,
  findShipmentById,
  findShipmentByTrackingId,
  shipmentTrackingIdExists,
  updateShipment as updateShipmentRecord,
  type Shipment,
  type ShipmentStatus,
} from "../models/Shipment";

import {
  createTrackingEvent,
} from "../models/Tracking";

interface CreateShipmentInput {
  sender: string;
  receiver: string;
  origin: string;
  destination: string;
  weight: number;
  estimatedDelivery?: Date;
}

interface UpdateShipmentStatusInput {
  status: ShipmentStatus;
  location: string;
  description?: string;
}

function generateTrackingId(): string {
  const randomNumber = Math.floor(
    100000000 + Math.random() * 900000000
  );

  return `LF${randomNumber}`;
}

async function generateUniqueTrackingId(): Promise<string> {
  let trackingId = generateTrackingId();

  while (
    await shipmentTrackingIdExists(trackingId)
  ) {
    trackingId = generateTrackingId();
  }

  return trackingId;
}

export async function getAllShipments(): Promise<Shipment[]> {
  return findAllShipments();
}

export async function getShipment(
  shipmentId: number
): Promise<Shipment> {
  const shipment = await findShipmentById(shipmentId);

  if (!shipment) {
    throw new Error("Shipment not found.");
  }

  return shipment;
}

export async function getShipmentByTracking(
  trackingId: string
): Promise<Shipment> {
  const shipment =
    await findShipmentByTrackingId(trackingId);

  if (!shipment) {
    throw new Error("Shipment not found.");
  }

  return shipment;
}

export async function createNewShipment(
  input: CreateShipmentInput
): Promise<Shipment> {
  const sender = input.sender.trim();
  const receiver = input.receiver.trim();
  const origin = input.origin.trim();
  const destination = input.destination.trim();

  if (
    !sender ||
    !receiver ||
    !origin ||
    !destination
  ) {
    throw new Error(
      "Sender, receiver, origin, and destination are required."
    );
  }

  if (
    typeof input.weight !== "number" ||
    !Number.isFinite(input.weight) ||
    input.weight <= 0
  ) {
    throw new Error(
      "Weight must be a positive number."
    );
  }

  const trackingId =
    await generateUniqueTrackingId();

  const estimatedDelivery =
    input.estimatedDelivery ??
    new Date(
      Date.now() + 3 * 24 * 60 * 60 * 1000
    );

  return createShipment({
    trackingId,
    sender,
    receiver,
    origin,
    destination,
    status: "pending",
    weight: input.weight,
    estimatedDelivery,
  });
}

export async function updateShipment(
  shipmentId: number,
  input: UpdateShipmentStatusInput
): Promise<Shipment> {
  if (!input.status) {
    throw new Error("Shipment status is required.");
  }

  const location = input.location.trim();

  if (!location) {
    throw new Error("Shipment location is required.");
  }

  const shipment = await updateShipmentStatus(
    shipmentId,
    input
  );

  return shipment;
}

async function updateShipmentStatus(
  shipmentId: number,
  input: UpdateShipmentStatusInput
): Promise<Shipment> {
  const shipment = await findShipmentById(shipmentId);

  if (!shipment) {
    throw new Error("Shipment not found.");
  }

  const updatedShipment = await updateShipmentRecord(
    shipmentId,
    {
      status: input.status,
    }
  );

  if (!updatedShipment) {
    throw new Error(
      "Unable to update shipment status."
    );
  }

  await createTrackingEvent({
    trackingId: shipment.trackingId,
    status: input.status,
    location: input.location.trim(),
    description:
      input.description?.trim() ||
      `Shipment status updated to ${input.status}.`,
  });

  return updatedShipment;
}

export async function removeShipment(
  shipmentId: number
): Promise<void> {
  const shipment = await findShipmentById(shipmentId);

  if (!shipment) {
    throw new Error("Shipment not found.");
  }

  const deleted = await deleteShipment(shipmentId);

  if (!deleted) {
    throw new Error(
      "Unable to delete shipment."
    );
  }
}