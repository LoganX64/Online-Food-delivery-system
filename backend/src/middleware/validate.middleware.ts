import { ZodSchema, ZodError } from 'zod';
import { Request, Response, NextFunction } from 'express';

/**
 * Middleware factory that validates req.body / req.query / req.params
 * against a Zod schema. Returns structured validation errors on failure.
 */
export const validate = (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (e) {
      if (e instanceof ZodError) {
        const errors = e.issues.map((issue) => ({
          field: issue.path.join('.'),
          message: issue.message,
        }));
        res.status(400).json({ success: false, errors });
        return;
      }
      next(e);
    }
  };
