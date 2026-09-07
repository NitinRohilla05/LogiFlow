import "dotenv/config";

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import { testDatabaseConnection } from "./config/database";

import authRoutes from "./routes/authRoutes";
import shipmentRoutes from "./routes/shipmentRoutes";
import trackingRoutes from "./routes/trackingRoutes";

import {
  errorMiddleware,
  notFoundMiddleware,
} from "./middleware/errorMiddleware";

const app = express();

const PORT = Number(process.env.PORT) || 5000;

const CLIENT_URL =
  process.env.CLIENT_URL || "http://localhost:3000";

/* -----------------------------
   Security & Middleware
----------------------------- */

app.use(
  helmet({
    crossOriginResourcePolicy: {
      policy: "cross-origin",
    },
  })
);

app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== "test") {
  app.use(morgan("dev"));
}

/* -----------------------------
   Health Check
----------------------------- */

app.get("/api/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "LogiFlow API is running.",
    timestamp: new Date().toISOString(),
  });
});

/* -----------------------------
   API Routes
----------------------------- */

app.use("/api/auth", authRoutes);
app.use("/api/shipments", shipmentRoutes);
app.use("/api/tracking", trackingRoutes);

/* -----------------------------
   404 Handler
----------------------------- */

app.use(notFoundMiddleware);

/* -----------------------------
   Global Error Handler
----------------------------- */

app.use(errorMiddleware);

/* -----------------------------
   Server Startup
----------------------------- */

async function startServer(): Promise<void> {
  try {
    await testDatabaseConnection();

    app.listen(PORT, () => {
      console.log("");
      console.log("====================================");
      console.log("       LogiFlow API Server");
      console.log("====================================");
      console.log(`🚀 Server: http://localhost:${PORT}`);
      console.log(
        `💚 Health: http://localhost:${PORT}/api/health`
      );
      console.log(`🌐 Client: ${CLIENT_URL}`);
      console.log("====================================");
      console.log("");
    });
  } catch (error) {
    console.error(
      "❌ Server startup failed:",
      error
    );

    process.exit(1);
  }
}

void startServer();