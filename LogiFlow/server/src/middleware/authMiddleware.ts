import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import type { UserRole } from "../models/User";

export interface AuthenticatedRequest extends Request {
  user?: {
    userId: number;
    role: UserRole;
  };
}

interface JwtPayload {
  userId: number;
  role: UserRole;
  iat?: number;
  exp?: number;
}

export function authenticate(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      res.status(401).json({
        success: false,
        message: "Authentication token is required.",
      });

      return;
    }

    const [scheme, token] = authorization.split(" ");

    if (scheme !== "Bearer" || !token) {
      res.status(401).json({
        success: false,
        message: "Invalid authorization format.",
      });

      return;
    }

    const secret = process.env.JWT_SECRET;

    if (!secret) {
      res.status(500).json({
        success: false,
        message: "JWT configuration is missing.",
      });

      return;
    }

    const decoded = jwt.verify(token, secret);

    if (
      typeof decoded !== "object" ||
      decoded === null ||
      typeof decoded.userId !== "number" ||
      (decoded.role !== "customer" &&
        decoded.role !== "admin")
    ) {
      res.status(401).json({
        success: false,
        message: "Invalid authentication token.",
      });

      return;
    }

    const payload = decoded as JwtPayload;

    req.user = {
      userId: payload.userId,
      role: payload.role,
    };

    next();
  } catch (error) {
    if (
      error instanceof jwt.TokenExpiredError
    ) {
      res.status(401).json({
        success: false,
        message: "Authentication token has expired.",
      });

      return;
    }

    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({
        success: false,
        message: "Invalid authentication token.",
      });

      return;
    }

    console.error("Authentication error:", error);

    res.status(500).json({
      success: false,
      message: "Authentication failed.",
    });
  }
}

export function requireAdmin(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void {
  if (!req.user) {
    res.status(401).json({
      success: false,
      message: "Authentication required.",
    });

    return;
  }

  if (req.user.role !== "admin") {
    res.status(403).json({
      success: false,
      message: "Administrator access required.",
    });

    return;
  }

  next();
}