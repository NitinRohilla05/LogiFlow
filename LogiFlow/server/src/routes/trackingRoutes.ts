import { Router } from "express";

import {
  getTrackingDetails,
  getTrackingHistory,
  addTrackingEvent,
  updateShipmentTracking,
} from "../controllers/trackingController";

const router = Router();

router.get("/:trackingId", getTrackingDetails);

router.get(
  "/:trackingId/history",
  getTrackingHistory
);

router.post("/events", addTrackingEvent);

router.patch(
  "/:trackingId",
  updateShipmentTracking
);

export default router;