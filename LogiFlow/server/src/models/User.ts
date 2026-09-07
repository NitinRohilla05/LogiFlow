import bcrypt from "bcryptjs";
import { db } from "../config/database";

export type UserRole = "customer" | "admin";

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

interface UserRow {
  id: number;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  created_at: Date;
  updated_at: Date;
}

export interface CreateUserData {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
}

export async function findUserById(
  userId: number
): Promise<User | null> {
  const [rows] = await db.execute(
    `
      SELECT
        id,
        name,
        email,
        role,
        created_at,
        updated_at
      FROM users
      WHERE id = ?
      LIMIT 1
    `,
    [userId]
  );

  const users = rows as UserRow[];

  if (users.length === 0) {
    return null;
  }

  return mapUser(users[0]);
}

export async function findUserByEmail(
  email: string
): Promise<User | null> {
  const [rows] = await db.execute(
    `
      SELECT
        id,
        name,
        email,
        role,
        created_at,
        updated_at
      FROM users
      WHERE email = ?
      LIMIT 1
    `,
    [email.trim().toLowerCase()]
  );

  const users = rows as UserRow[];

  if (users.length === 0) {
    return null;
  }

  return mapUser(users[0]);
}

export async function findUserWithPasswordByEmail(
  email: string
): Promise<UserRow | null> {
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
    [email.trim().toLowerCase()]
  );

  const users = rows as UserRow[];

  if (users.length === 0) {
    return null;
  }

  return users[0];
}

export async function createUser(
  userData: CreateUserData
): Promise<User> {
  const name = userData.name.trim();
  const email = userData.email.trim().toLowerCase();
  const role = userData.role ?? "customer";

  const hashedPassword = await bcrypt.hash(
    userData.password,
    12
  );

  const [result] = await db.execute(
    `
      INSERT INTO users (
        name,
        email,
        password,
        role
      )
      VALUES (?, ?, ?, ?)
    `,
    [name, email, hashedPassword, role]
  );

  const insertResult = result as {
    insertId: number;
  };

  const user = await findUserById(insertResult.insertId);

  if (!user) {
    throw new Error(
      "User was created but could not be retrieved."
    );
  }

  return user;
}

export async function emailExists(
  email: string
): Promise<boolean> {
  const [rows] = await db.execute(
    `
      SELECT id
      FROM users
      WHERE email = ?
      LIMIT 1
    `,
    [email.trim().toLowerCase()]
  );

  return (rows as Array<{ id: number }>).length > 0;
}

export async function verifyPassword(
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(
    plainPassword,
    hashedPassword
  );
}

function mapUser(row: UserRow): User {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    role: row.role,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}