import { ZodSchema, ZodError } from 'zod';
import { Request, Response, NextFunction } from 'express';

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
        res.status(400).json({ errors: (e as any).errors || (e as any).issues });
        return;
      }
      next(e);
    }
  };
