import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../utils/AppError.js";

/**
 * Decoded JWT payload shape.
 */
export interface JwtPayload {
  userId: string;
  role: "customer" | "restaurantOwner" | "admin";
}

/**
 * Middleware that verifies the JWT from the HTTP-only cookie (or Authorization header).
 * On success, attaches `req.user` with { userId, role }.
 */
export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token =
      req.cookies?.token ||
      (req.headers.authorization?.startsWith("Bearer ")
        ? req.headers.authorization.split(" ")[1]
        : null);

    if (token && req.cookies?.token) {
      // Console logging token for initial testing only. Remove in production.
      // console.log(`[AUTH] Token from Cookie: ${token}`);
    } else if (token) {
      // Console logging token for initial testing only. Remove in production.
      // console.log(`[AUTH] Token from Header: ${token}`);
    }

    if (!token) {
      throw new AppError("Authentication required", 401);
    }

    const secret = process.env.JWT_KEY;
    if (!secret) {
      throw new AppError(
        "JWT_KEY is not defined in environment variables",
        500,
      );
    }

    const decoded = jwt.verify(token, secret) as JwtPayload;
    (req as any).user = decoded;
    next();
  } catch (error) {
    if (error instanceof AppError) {
      next(error);
      return;
    }
    next(new AppError("Invalid or expired token", 401));
  }
};

/**
 * Middleware factory that restricts access to specific roles.
 * Must be used AFTER `authenticate`.
 *
 * @example router.get('/admin-only', authenticate, authorize('admin'), handler);
 */
export const authorize = (...allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = (req as any).user?.role;

    if (!userRole || !allowedRoles.includes(userRole)) {
      next(new AppError("Forbidden: insufficient permissions", 403));
      return;
    }

    next();
  };
};
