import { Request, Response, NextFunction } from 'express';
import { loginUser } from '../services/auth.service.js';

/**
 * POST /auth/login — Authenticate user, issue JWT in HTTP-only cookie.
 */
export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const result = await loginUser(email, password);

    // Set JWT in HTTP-only cookie as per architecture spec
    res.cookie('token', result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({
      success: true,
      data: {
        token: result.token,
        user: result.user,
      },
    });
  } catch (error) {
    next(error);
  }
};
