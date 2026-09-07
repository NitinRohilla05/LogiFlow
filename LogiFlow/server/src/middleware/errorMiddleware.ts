import type { NextFunction, Request, Response } from "express";

export interface AppError extends Error {
  statusCode?: number;
  status?: number;
  code?: string;
}

export function errorMiddleware(
  error: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  console.error("Server Error:", error);

  const statusCode =
    error.statusCode ??
    error.status ??
    500;

  const message =
    statusCode >= 500
      ? "Internal server error."
      : error.message || "Something went wrong.";

  res.status(statusCode).json({
    success: false,
    message,
  });
}

export function notFoundMiddleware(
  req: Request,
  res: Response
): void {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
}