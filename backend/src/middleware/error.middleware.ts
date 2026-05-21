import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { AppError } from '../utils/AppError.js';

/**
 * Centralized error handler middleware.
 * Catches AppError instances for known errors, and falls back
 * to a generic 500 for unexpected failures.
 */
export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || (err instanceof AppError ? err.statusCode : 500);
  
  if (statusCode >= 500 || (!err.statusCode && !(err instanceof AppError))) {
    console.error('❌ ERROR OCCURRED:', err.message || err);
    if (err.stack) console.error(err.stack);
  } else {
    // Only log brief message for expected operational errors (400, 401, etc.)
    console.warn(`⚠️ [${statusCode}] ${err.message || 'Operational Error'}`);
  }

  // ── Known application errors ─────────────────────────────────
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
    return;
  }

  // ── Zod validation errors (if somehow bypassed middleware) ────
  if (err instanceof ZodError) {
    const errors = err.issues.map((issue) => ({
      field: issue.path.slice(1).join('.') || issue.path.join('.'),
      message: issue.message,
    }));
    res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors,
    });
    return;
  }

  // ── MongoDB duplicate key error (e.g. unique email) ──────────
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || 'field';
    res.status(409).json({
      success: false,
      message: `A record with this ${field} already exists`,
    });
    return;
  }

  // ── Mongoose ValidationError (schema-level) ──────────────────
  if (err.name === 'ValidationError' && err.errors) {
    const errors = Object.values(err.errors).map((e: any) => ({
      field: e.path,
      message: e.message,
    }));
    res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors,
    });
    return;
  }

  // ── Mongoose CastError (invalid ObjectId, etc.) ──────────────
  if (err.name === 'CastError') {
    res.status(400).json({
      success: false,
      message: `Invalid value for field '${err.path}': ${err.value}`,
    });
    return;
  }

  // ── Multer errors (file upload issues) ───────────────────────
  if (err.name === 'MulterError') {
    let message = err.message;
    if (err.code === 'LIMIT_FILE_SIZE') {
      message = 'The uploaded file is too large. Maximum allowed size is 5MB.';
    }
    res.status(400).json({
      success: false,
      message,
    });
    return;
  }

  // ── Fallback: unknown internal error ─────────────────────────
  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
  });
};
