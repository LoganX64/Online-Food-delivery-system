import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError.js';

/**
 * Centralized error handler middleware.
 * Catches AppError instances for known errors, and falls back
 * to a generic 500 for unexpected failures.
 */
export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack || err.message);

  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      error: err.message,
    });
    return;
  }

  // MongoDB duplicate key error (e.g. unique email)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || 'field';
    res.status(409).json({
      success: false,
      error: `A record with this ${field} already exists`,
    });
    return;
  }

  // Mongoose CastError (invalid ObjectId, etc.)
  if (err.name === 'CastError') {
    res.status(400).json({
      success: false,
      error: 'Invalid ID format',
    });
    return;
  }

  res.status(500).json({
    success: false,
    error: 'Internal Server Error',
  });
};
