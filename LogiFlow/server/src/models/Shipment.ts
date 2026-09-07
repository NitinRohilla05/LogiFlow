import { db } from "../config/database";

export type ShipmentStatus =
  | "pending"
  | "picked-up"
  | "in-transit"
  | "warehouse"
  | "out-for-delivery"
  | "delivered";

export interface Shipment {
  id: number;
  trackingId: string;
  sender: string;
  receiver: string;
  origin: string;
  destination: string;
  status: ShipmentStatus;
  weight: number;
  estimatedDelivery: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateShipmentData {
  trackingId: string;
  sender: string;
  receiver: string;
  origin: string;
  destination: string;
  status?: ShipmentStatus;
  weight: number;
  estimatedDelivery: Date;
}

export interface UpdateShipmentData {
  status: ShipmentStatus;
}

interface ShipmentRow {
  id: number;
  tracking_id: string;
  sender: string;
  receiver: string;
  origin: string;
  destination: string;
  status: ShipmentStatus;
  weight: number;
  estimated_delivery: Date;
  created_at: Date;
  updated_at: Date;
}

export async function findShipmentById(
  shipmentId: number
): Promise<Shipment | null> {
  const [rows] = await db.execute(
    `
      SELECT
        id,
        tracking_id,
        sender,
        receiver,
        origin,
        destination,
        status,
        weight,
        estimated_delivery,
        created_at,
        updated_at
      FROM shipments
      WHERE id = ?
      LIMIT 1
    `,
    [shipmentId]
  );

  const shipments = rows as ShipmentRow[];

  if (shipments.length === 0) {
    return null;
  }

  return mapShipment(shipments[0]);
}

export async function findShipmentByTrackingId(
  trackingId: string
): Promise<Shipment | null> {
  const [rows] = await db.execute(
    `
      SELECT
        id,
        tracking_id,
        sender,
        receiver,
        origin,
        destination,
        status,
        weight,
        estimated_delivery,
        created_at,
        updated_at
      FROM shipments
      WHERE tracking_id = ?
      LIMIT 1
    `,
    [trackingId.trim()]
  );

  const shipments = rows as ShipmentRow[];

  if (shipments.length === 0) {
    return null;
  }

  return mapShipment(shipments[0]);
}

export async function findAllShipments(): Promise<Shipment[]> {
  const [rows] = await db.execute(
    `
      SELECT
        id,
        tracking_id,
        sender,
        receiver,
        origin,
        destination,
        status,
        weight,
        estimated_delivery,
        created_at,
        updated_at
      FROM shipments
      ORDER BY created_at DESC
    `
  );

  return (rows as ShipmentRow[]).map(mapShipment);
}

export async function createShipment(
  data: CreateShipmentData
): Promise<Shipment> {
  const [result] = await db.execute(
    `
      INSERT INTO shipments (
        tracking_id,
        sender,
        receiver,
        origin,
        destination,
        status,
        weight,
        estimated_delivery
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      data.trackingId.trim(),
      data.sender.trim(),
      data.receiver.trim(),
      data.origin.trim(),
      data.destination.trim(),
      data.status ?? "pending",
      data.weight,
      data.estimatedDelivery,
    ]
  );

  const insertResult = result as {
    insertId: number;
  };

  const shipment = await findShipmentById(
    insertResult.insertId
  );

  if (!shipment) {
    throw new Error(
      "Shipment was created but could not be retrieved."
    );
  }

  return shipment;
}

export async function updateShipment(
  shipmentId: number,
  data: UpdateShipmentData
): Promise<Shipment | null> {
  const [result] = await db.execute(
    `
      UPDATE shipments
      SET
        status = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `,
    [data.status, shipmentId]
  );

  const updateResult = result as {
    affectedRows: number;
  };

  if (updateResult.affectedRows === 0) {
    return null;
  }

  return findShipmentById(shipmentId);
}

export async function deleteShipment(
  shipmentId: number
): Promise<boolean> {
  const [result] = await db.execute(
    `
      DELETE FROM shipments
      WHERE id = ?
    `,
    [shipmentId]
  );

  const deleteResult = result as {
    affectedRows: number;
  };

  return deleteResult.affectedRows > 0;
}

export async function shipmentTrackingIdExists(
  trackingId: string
): Promise<boolean> {
  const [rows] = await db.execute(
    `
      SELECT id
      FROM shipments
      WHERE tracking_id = ?
      LIMIT 1
    `,
    [trackingId.trim()]
  );

  return (rows as Array<{ id: number }>).length > 0;
}

function mapShipment(row: ShipmentRow): Shipment {
  return {
    id: row.id,
    trackingId: row.tracking_id,
    sender: row.sender,
    receiver: row.receiver,
    origin: row.origin,
    destination: row.destination,
    status: row.status,
    weight: Number(row.weight),
    estimatedDelivery: row.estimated_delivery,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}