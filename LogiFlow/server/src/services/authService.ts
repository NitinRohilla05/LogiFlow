import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import {
  createUser,
  emailExists,
  findUserWithPasswordByEmail,
  type User,
  type UserRole,
} from "../models/User";

interface LoginResult {
  user: User;
  token: string;
}

interface RegisterResult {
  user: User;
  token: string;
}

function createAuthToken(
  userId: number,
  role: UserRole
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

export async function registerUser(
  name: string,
  email: string,
  password: string
): Promise<RegisterResult> {
  const normalizedName = name.trim();
  const normalizedEmail = email.trim().toLowerCase();

  if (
    !normalizedName ||
    !normalizedEmail ||
    !password
  ) {
    throw new Error(
      "Name, email, and password are required."
    );
  }

  if (password.length < 8) {
    throw new Error(
      "Password must contain at least 8 characters."
    );
  }

  const alreadyExists = await emailExists(
    normalizedEmail
  );

  if (alreadyExists) {
    throw new Error(
      "An account with this email already exists."
    );
  }

  const user = await createUser({
    name: normalizedName,
    email: normalizedEmail,
    password,
    role: "customer",
  });

  const token = createAuthToken(user.id, user.role);

  return {
    user,
    token,
  };
}

export async function loginUser(
  email: string,
  password: string
): Promise<LoginResult> {
  const normalizedEmail = email.trim().toLowerCase();

  if (!normalizedEmail || !password) {
    throw new Error(
      "Email and password are required."
    );
  }

  const userWithPassword =
    await findUserWithPasswordByEmail(
      normalizedEmail
    );

  if (!userWithPassword) {
    throw new Error(
      "Invalid email or password."
    );
  }

  const passwordMatches = await bcrypt.compare(
    password,
    userWithPassword.password
  );

  if (!passwordMatches) {
    throw new Error(
      "Invalid email or password."
    );
  }

  const user: User = {
    id: userWithPassword.id,
    name: userWithPassword.name,
    email: userWithPassword.email,
    role: userWithPassword.role,
    createdAt: userWithPassword.created_at,
    updatedAt: userWithPassword.updated_at,
  };

  const token = createAuthToken(
    user.id,
    user.role
  );

  return {
    user,
    token,
  };
}