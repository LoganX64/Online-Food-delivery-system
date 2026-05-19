import { z, ZodSchema } from 'zod';
import { Request, Response, NextFunction } from 'express';

/**
 * Middleware factory that validates req.body / req.query / req.params
 * against a Zod schema.
 *
 * - Dynamically enforces strict validation (using .strict()) on body, query,
 *   and params so any unrecognized fields are strictly rejected with a 400.
 * - Uses safeParse to collect ALL errors in one pass (not just the first).
 * - Strips the leading 'body.' / 'query.' / 'params.' prefix from field names
 *   so the frontend receives clean, human-readable field references.
 *
 * Returns 400 with:
 *   { success: false, message: string, errors: [{ field, message }] }
 */
export const validate = (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction): void => {
    let validationSchema = schema;

    // Dynamically apply .strict() to nested body, query, and params to reject extra fields
    if (schema instanceof z.ZodObject) {
      const shape = { ...schema.shape };
      if (shape.body && shape.body instanceof z.ZodObject) {
        shape.body = shape.body.strict();
      }
      if (shape.query && shape.query instanceof z.ZodObject) {
        shape.query = shape.query.strict();
      }
      if (shape.params && shape.params instanceof z.ZodObject) {
        shape.params = shape.params.strict();
      }
      validationSchema = z.object(shape);
    }

    const result = validationSchema.safeParse({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    if (!result.success) {
      const errors = result.error.issues.map((issue) => {
        // Remove the leading segment ('body', 'query', 'params') from the path
        const path = issue.path.slice(1).join('.');
        return {
          field: path || 'unknown',
          message: issue.message,
        };
      });

      const message =
        errors.length === 1
          ? errors[0].message
          : `Validation failed: ${errors.map((e) => `${e.field} — ${e.message}`).join('; ')}`;

      res.status(400).json({ success: false, message, errors });
      return;
    }

    // Keep req.body as is (or use Zod output, since it's already validated strictly)
    req.body = (result.data as any).body;

    next();
  };
