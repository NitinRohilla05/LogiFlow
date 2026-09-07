import type { Request, Response } from "express";
import { db } from "../config/database";

type ShipmentStatus =
  | "pending"
  | "picked-up"
  | "in-transit"
  | "warehouse"
  | "out-for-delivery"
  | "delivered";

interface CreateShipmentBody {
  sender?: string;
  receiver?: string;
  origin?: string;
  destination?: string;
  weight?: number;
}

interface StatusUpdateBody {
  status?: ShipmentStatus;
  location?: string;
  description?: string;
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

function formatShipment(row: ShipmentRow) {
  return {
    id: String(row.id),
    trackingId: row.tracking_id,
    sender: row.sender,
    receiver: row.receiver,
    origin: row.origin,
    destination: row.destination,
    status: row.status,
    weight: Number(row.weight),
    estimatedDelivery: row.estimated_delivery.toISOString(),
    createdAt: row.created_at.toISOString(),
    updatedAt: row.updated_at.toISOString(),
  };
}

function generateTrackingId(): string {
  const randomNumber = Math.floor(
    100000000 + Math.random() * 900000000
  );

  return `LF${randomNumber}`;
}

export async function getShipments(
  _req: Request,
  res: Response
): Promise<void> {
  try {
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

    const shipments = (rows as ShipmentRow[]).map(formatShipment);

    res.status(200).json({
      success: true,
      data: shipments,
    });
  } catch (error) {
    console.error("Get shipments error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch shipments.",
    });
  }
}

export async function getShipmentById(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const shipmentId = Number(req.params.id);

    if (!Number.isInteger(shipmentId) || shipmentId <= 0) {
      res.status(400).json({
        success: false,
        message: "Invalid shipment ID.",
      });

      return;
    }

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
      res.status(404).json({
        success: false,
        message: "Shipment not found.",
      });

      return;
    }

    res.status(200).json({
      success: true,
      data: formatShipment(shipments[0]),
    });
  } catch (error) {
    console.error("Get shipment by ID error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch shipment.",
    });
  }
}

export async function getShipmentByTrackingId(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const trackingIdParam = req.params.trackingId;
    const trackingId =
      typeof trackingIdParam === "string"
        ? trackingIdParam.trim()
        : undefined;

    if (!trackingId) {
      res.status(400).json({
        success: false,
        message: "Tracking ID is required.",
      });

      return;
    }

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
      [trackingId]
    );

    const shipments = rows as ShipmentRow[];

    if (shipments.length === 0) {
      res.status(404).json({
        success: false,
        message: "Shipment not found.",
      });

      return;
    }

    res.status(200).json({
      success: true,
      data: formatShipment(shipments[0]),
    });
  } catch (error) {
    console.error(
      "Get shipment by tracking ID error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Unable to fetch shipment.",
    });
  }
}

export async function createShipment(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const {
      sender,
      receiver,
      origin,
      destination,
      weight,
    } = req.body as CreateShipmentBody;

    if (
      !sender?.trim() ||
      !receiver?.trim() ||
      !origin?.trim() ||
      !destination?.trim() ||
      weight === undefined
    ) {
      res.status(400).json({
        success: false,
        message:
          "Sender, receiver, origin, destination, and weight are required.",
      });

      return;
    }

    if (typeof weight !== "number" || weight <= 0) {
      res.status(400).json({
        success: false,
        message: "Weight must be a positive number.",
      });

      return;
    }

    const trackingId = generateTrackingId();

    const estimatedDelivery = new Date();
    estimatedDelivery.setDate(
      estimatedDelivery.getDate() + 3
    );

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
        trackingId,
        sender.trim(),
        receiver.trim(),
        origin.trim(),
        destination.trim(),
        "pending",
        weight,
        estimatedDelivery,
      ]
    );

    const insertResult = result as {
      insertId: number;
    };

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
      [insertResult.insertId]
    );

    const shipments = rows as ShipmentRow[];

    res.status(201).json({
      success: true,
      message: "Shipment created successfully.",
      data: formatShipment(shipments[0]),
    });
  } catch (error) {
    console.error("Create shipment error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to create shipment.",
    });
  }
}

export async function updateShipmentStatus(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const shipmentId = Number(req.params.id);

    const {
      status,
      location,
      description,
    } = req.body as StatusUpdateBody;

    const validStatuses: ShipmentStatus[] = [
      "pending",
      "picked-up",
      "in-transit",
      "warehouse",
      "out-for-delivery",
      "delivered",
    ];

    if (!Number.isInteger(shipmentId) || shipmentId <= 0) {
      res.status(400).json({
        success: false,
        message: "Invalid shipment ID.",
      });

      return;
    }

    if (!status || !validStatuses.includes(status)) {
      res.status(400).json({
        success: false,
        message: "Invalid shipment status.",
      });

      return;
    }

    if (!location?.trim()) {
      res.status(400).json({
        success: false,
        message: "Location is required.",
      });

      return;
    }

    const [existingRows] = await db.execute(
      `
        SELECT id, tracking_id
        FROM shipments
        WHERE id = ?
        LIMIT 1
      `,
      [shipmentId]
    );

    const existingShipments = existingRows as Array<{
      id: number;
      tracking_id: string;
    }>;

    if (existingShipments.length === 0) {
      res.status(404).json({
        success: false,
        message: "Shipment not found.",
      });

      return;
    }

    await db.execute(
      `
        UPDATE shipments
        SET
          status = ?,
          updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `,
      [status, shipmentId]
    );

    await db.execute(
      `
        INSERT INTO tracking_events (
          tracking_id,
          status,
          location,
          description
        )
        VALUES (?, ?, ?, ?)
      `,
      [
        existingShipments[0].tracking_id,
        status,
        location.trim(),
        description?.trim() ||
          `Shipment status updated to ${status}.`,
      ]
    );

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

    res.status(200).json({
      success: true,
      message: "Shipment status updated successfully.",
      data: formatShipment(shipments[0]),
    });
  } catch (error) {
    console.error("Update shipment status error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to update shipment status.",
    });
  }
}

export async function deleteShipment(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const shipmentId = Number(req.params.id);

    if (!Number.isInteger(shipmentId) || shipmentId <= 0) {
      res.status(400).json({
        success: false,
        message: "Invalid shipment ID.",
      });

      return;
    }

    const [result] = await db.execute(
      "DELETE FROM shipments WHERE id = ?",
      [shipmentId]
    );

    const deleteResult = result as {
      affectedRows: number;
    };

    if (deleteResult.affectedRows === 0) {
      res.status(404).json({
        success: false,
        message: "Shipment not found.",
      });

      return;
    }

    res.status(200).json({
      success: true,
      message: "Shipment deleted successfully.",
    });
  } catch (error) {
    console.error("Delete shipment error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to delete shipment.",
    });
  }
}