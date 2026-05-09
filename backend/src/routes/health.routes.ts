import { Router, Request, Response } from 'express';
import mongoose from 'mongoose';

const router = Router();

/**
 * GET /health — Check system status.
 */
router.get('/', (req: Request, res: Response) => {
  const dbState = mongoose.connection.readyState;
  const statusMap: Record<number, string> = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
  };

  const isHealthy = dbState === 1;

  res.status(isHealthy ? 200 : 503).json({
    success: isHealthy,
    data: {
      status: isHealthy ? 'UP' : 'DOWN',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      database: statusMap[dbState] || 'unknown',
      version: process.env.npm_package_version || '1.0.0',
    },
  });
});

export default router;
