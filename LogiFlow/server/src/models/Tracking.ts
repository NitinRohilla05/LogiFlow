import { db } from "../config/database";
import type { ShipmentStatus } from "./Shipment";

export interface TrackingEvent {
  id: number;
  trackingId: string;
  status: ShipmentStatus;
  location: string;
  description: string;
  timestamp: Date;
}

export interface CreateTrackingEventData {
  trackingId: string;
  status: ShipmentStatus;
  location: string;
  description: string;
}

interface TrackingEventRow {
  id: number;
  tracking_id: string;
  status: ShipmentStatus;
  location: string;
  description: string;
  timestamp: Date;
}

export async function findTrackingEventById(
  eventId: number
): Promise<TrackingEvent | null> {
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
      WHERE id = ?
      LIMIT 1
    `,
    [eventId]
  );

  const events = rows as TrackingEventRow[];

  if (events.length === 0) {
    return null;
  }

  return mapTrackingEvent(events[0]);
}

export async function findTrackingEvents(
  trackingId: string
): Promise<TrackingEvent[]> {
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
    [trackingId.trim()]
  );

  return (rows as TrackingEventRow[]).map(
    mapTrackingEvent
  );
}

export async function findLatestTrackingEvent(
  trackingId: string
): Promise<TrackingEvent | null> {
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
      LIMIT 1
    `,
    [trackingId.trim()]
  );

  const events = rows as TrackingEventRow[];

  if (events.length === 0) {
    return null;
  }

  return mapTrackingEvent(events[0]);
}

export async function createTrackingEvent(
  data: CreateTrackingEventData
): Promise<TrackingEvent> {
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
      data.trackingId.trim(),
      data.status,
      data.location.trim(),
      data.description.trim(),
    ]
  );

  const insertResult = result as {
    insertId: number;
  };

  const event = await findTrackingEventById(
    insertResult.insertId
  );

  if (!event) {
    throw new Error(
      "Tracking event was created but could not be retrieved."
    );
  }

  return event;
}

export async function deleteTrackingEvents(
  trackingId: string
): Promise<boolean> {
  const [result] = await db.execute(
    `
      DELETE FROM tracking_events
      WHERE tracking_id = ?
    `,
    [trackingId.trim()]
  );

  const deleteResult = result as {
    affectedRows: number;
  };

  return deleteResult.affectedRows > 0;
}

function mapTrackingEvent(
  row: TrackingEventRow
): TrackingEvent {
  return {
    id: row.id,
    trackingId: row.tracking_id,
    status: row.status,
    location: row.location,
    description: row.description,
    timestamp: row.timestamp,
  };
}