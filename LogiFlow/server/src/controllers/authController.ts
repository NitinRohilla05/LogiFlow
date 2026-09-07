import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { db } from "../config/database";

interface RegisterRequestBody {
  name?: string;
  email?: string;
  password?: string;
}

interface LoginRequestBody {
  email?: string;
  password?: string;
}

interface UserRow {
  id: number;
  name: string;
  email: string;
  password: string;
  role: "customer" | "admin";
  created_at: Date;
  updated_at: Date;
}

function createToken(
  userId: number,
  role: "customer" | "admin"
): string {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not configured.");
  }

  return jwt.sign(
    {
      userId,
      role,
    },
    secret,
    {
      expiresIn: "7d",
    }
  );
}

export async function register(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { name, email, password } =
      req.body as RegisterRequestBody;

    if (!name?.trim() || !email?.trim() || !password) {
      res.status(400).json({
        success: false,
        message: "Name, email, and password are required.",
      });

      return;
    }

    if (password.length < 8) {
      res.status(400).json({
        success: false,
        message: "Password must contain at least 8 characters.",
      });

      return;
    }

    const normalizedEmail = email.trim().toLowerCase();
    const normalizedName = name.trim();

    const [existingUsers] = await db.execute(
      "SELECT id FROM users WHERE email = ? LIMIT 1",
      [normalizedEmail]
    );

    if ((existingUsers as UserRow[]).length > 0) {
      res.status(409).json({
        success: false,
        message: "An account with this email already exists.",
      });

      return;
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const [result] = await db.execute(
      `
        INSERT INTO users (name, email, password, role)
        VALUES (?, ?, ?, ?)
      `,
      [
        normalizedName,
        normalizedEmail,
        hashedPassword,
        "customer",
      ]
    );

    const insertResult = result as {
      insertId: number;
    };

    const token = createToken(
      insertResult.insertId,
      "customer"
    );

    const user = {
      id: String(insertResult.insertId),
      name: normalizedName,
      email: normalizedEmail,
      role: "customer" as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    res.status(201).json({
      success: true,
      message: "Account created successfully.",
      data: {
        user,
        token,
      },
    });
  } catch (error) {
    console.error("Register error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to create account.",
    });
  }
}

export async function login(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { email, password } =
      req.body as LoginRequestBody;

    if (!email?.trim() || !password) {
      res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });

      return;
    }

    const normalizedEmail = email.trim().toLowerCase();

    const [rows] = await db.execute(
      `
        SELECT
          id,
          name,
          email,
          password,
          role,
          created_at,
          updated_at
        FROM users
        WHERE email = ?
        LIMIT 1
      `,
      [normalizedEmail]
    );

    const users = rows as UserRow[];

    if (users.length === 0) {
      res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });

      return;
    }

    const user = users[0];

    const passwordMatches = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatches) {
      res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });

      return;
    }

    const token = createToken(user.id, user.role);

    res.status(200).json({
      success: true,
      message: "Login successful.",
      data: {
        user: {
          id: String(user.id),
          name: user.name,
          email: user.email,
          role: user.role,
          createdAt: user.created_at.toISOString(),
          updatedAt: user.updated_at.toISOString(),
        },
        token,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to login.",
    });
  }
}