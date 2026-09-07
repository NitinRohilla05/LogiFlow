import { Router } from "express";

import {
  getShipments,
  getShipmentById,
  getShipmentByTrackingId,
  createShipment,
  updateShipmentStatus,
  deleteShipment,
} from "../controllers/shipmentController";
import { authenticate } from "../middleware/authMiddleware";

const router = Router();

router.use(authenticate);

router.get("/", getShipments);

router.get(
  "/tracking/:trackingId",
  getShipmentByTrackingId
);

router.get("/:id", getShipmentById);

router.post("/", createShipment);

router.patch(
  "/:id/status",
  updateShipmentStatus
);

router.delete("/:id", deleteShipment);

export default router;