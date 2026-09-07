import type { Request, Response } from "express";
import { db } from "../config/database";

type ShipmentStatus =
  | "pending"
  | "picked-up"
  | "in-transit"
  | "warehouse"
  | "out-for-delivery"
  | "delivered";

interface TrackingEventRow {
  id: number;
  tracking_id: string;
  status: ShipmentStatus;
  location: string;
  description: string;
  timestamp: Date;
}

interface ShipmentTrackingRow {
  tracking_id: string;
  status: ShipmentStatus;
  destination: string;
  estimated_delivery: Date;
}

interface UpdateTrackingBody {
  status?: ShipmentStatus;
  location?: string;
  description?: string;
}

function formatTrackingEvent(
  row: TrackingEventRow
) {
  return {
    id: String(row.id),
    trackingId: row.tracking_id,
    status: row.status,
    location: row.location,
    description: row.description,
    timestamp: row.timestamp.toISOString(),
  };
}

export async function getTrackingDetails(
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

    const [shipmentRows] = await db.execute(
      `
        SELECT
          tracking_id,
          status,
          destination,
          estimated_delivery
        FROM shipments
        WHERE tracking_id = ?
        LIMIT 1
      `,
      [trackingId]
    );

    const shipments =
      shipmentRows as ShipmentTrackingRow[];

    if (shipments.length === 0) {
      res.status(404).json({
        success: false,
        message: "Shipment not found.",
      });

      return;
    }

    const shipment = shipments[0];

    const [eventRows] = await db.execute(
      `
        SELECT
          id,
          tracking_id,
          status,
          location,
          description,
          timestamp
        FROM tracking_events
        WHERE tracking_id = ?
        ORDER BY timestamp DESC
      `,
      [trackingId]
    );

    const events = (
      eventRows as TrackingEventRow[]
    ).map(formatTrackingEvent);

    const currentLocation =
      events.length > 0
        ? events[0].location
        : shipment.destination;

    res.status(200).json({
      success: true,
      data: {
        trackingId: shipment.tracking_id,
        currentStatus: shipment.status,
        currentLocation,
        estimatedDelivery:
          shipment.estimated_delivery.toISOString(),
        events,
      },
    });
  } catch (error) {
    console.error("Get tracking details error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch tracking details.",
    });
  }
}

export async function getTrackingHistory(
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
          status,
          location,
          description,
          timestamp
        FROM tracking_events
        WHERE tracking_id = ?
        ORDER BY timestamp DESC
      `,
      [trackingId]
    );

    const events = (
      rows as TrackingEventRow[]
    ).map(formatTrackingEvent);

    res.status(200).json({
      success: true,
      data: events,
    });
  } catch (error) {
    console.error("Get tracking history error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch tracking history.",
    });
  }
}

export async function addTrackingEvent(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const {
      trackingId,
      status,
      location,
      description,
    } = req.body as {
      trackingId?: string;
      status?: ShipmentStatus;
      location?: string;
      description?: string;
    };

    const validStatuses: ShipmentStatus[] = [
      "pending",
      "picked-up",
      "in-transit",
      "warehouse",
      "out-for-delivery",
      "delivered",
    ];

    if (!trackingId?.trim()) {
      res.status(400).json({
        success: false,
        message: "Tracking ID is required.",
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

    const normalizedTrackingId = trackingId.trim();

    const [shipmentRows] = await db.execute(
      `
        SELECT id
        FROM shipments
        WHERE tracking_id = ?
        LIMIT 1
      `,
      [normalizedTrackingId]
    );

    if ((shipmentRows as Array<{ id: number }>).length === 0) {
      res.status(404).json({
        success: false,
        message: "Shipment not found.",
      });

      return;
    }

    const [result] = await db.execute(
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
        normalizedTrackingId,
        status,
        location.trim(),
        description?.trim() ||
          `Shipment status updated to ${status}.`,
      ]
    );

    const insertResult = result as {
      insertId: number;
    };

    await db.execute(
      `
        UPDATE shipments
        SET
          status = ?,
          updated_at = CURRENT_TIMESTAMP
        WHERE tracking_id = ?
      `,
      [status, normalizedTrackingId]
    );

    const [eventRows] = await db.execute(
      `
        SELECT
          id,
          tracking_id,
          status,
          location,
          description,
          timestamp
        FROM tracking_events
        WHERE id = ?
        LIMIT 1
      `,
      [insertResult.insertId]
    );

    const events = eventRows as TrackingEventRow[];

    res.status(201).json({
      success: true,
      message: "Tracking event added successfully.",
      data: formatTrackingEvent(events[0]),
    });
  } catch (error) {
    console.error("Add tracking event error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to add tracking event.",
    });
  }
}

export async function updateShipmentTracking(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const trackingIdParam = req.params.trackingId;
    const trackingId =
      typeof trackingIdParam === "string"
        ? trackingIdParam.trim()
        : undefined;

    const {
      status,
      location,
      description,
    } = req.body as UpdateTrackingBody;

    const validStatuses: ShipmentStatus[] = [
      "pending",
      "picked-up",
      "in-transit",
      "warehouse",
      "out-for-delivery",
      "delivered",
    ];

    if (!trackingId) {
      res.status(400).json({
        success: false,
        message: "Tracking ID is required.",
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

    const [shipmentRows] = await db.execute(
      `
        SELECT id
        FROM shipments
        WHERE tracking_id = ?
        LIMIT 1
      `,
      [trackingId]
    );

    if ((shipmentRows as Array<{ id: number }>).length === 0) {
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
        WHERE tracking_id = ?
      `,
      [status, trackingId]
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
        trackingId,
        status,
        location.trim(),
        description?.trim() ||
          `Shipment status updated to ${status}.`,
      ]
    );

    const [shipmentResult] = await db.execute(
      `
        SELECT
          tracking_id,
          status,
          destination,
          estimated_delivery
        FROM shipments
        WHERE tracking_id = ?
        LIMIT 1
      `,
      [trackingId]
    );

    const shipment = (
      shipmentResult as ShipmentTrackingRow[]
    )[0];

    const [eventRows] = await db.execute(
      `
        SELECT
          id,
          tracking_id,
          status,
          location,
          description,
          timestamp
        FROM tracking_events
        WHERE tracking_id = ?
        ORDER BY timestamp DESC
      `,
      [trackingId]
    );

    const events = (
      eventRows as TrackingEventRow[]
    ).map(formatTrackingEvent);

    res.status(200).json({
      success: true,
      message: "Shipment tracking updated successfully.",
      data: {
        trackingId: shipment.tracking_id,
        currentStatus: shipment.status,
        currentLocation:
          events[0]?.location ?? location.trim(),
        estimatedDelivery:
          shipment.estimated_delivery.toISOString(),
        events,
      },
    });
  } catch (error) {
    console.error(
      "Update shipment tracking error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Unable to update shipment tracking.",
    });
  }
}