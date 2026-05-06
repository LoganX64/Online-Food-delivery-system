import { Request, Response, NextFunction } from 'express';
import { loginUser } from '../services/auth.service.js';
import { createUser } from '../services/user.service.js';
import { User } from '../models/User.js';

/**
 * POST /auth/register — Create a new account.
 */
export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await createUser(req.body);
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

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

/**
 * POST /auth/logout — Clear the JWT cookie.
 */
export const logout = async (req: Request, res: Response, next: NextFunction) => {
  res.clearCookie('token');
  res.status(200).json({ success: true, data: { message: 'Logged out successfully' } });
};

/**
 * GET /auth/me — Return current user details from JWT.
 */
export const getMe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user?.userId;
    if (!userId) return res.status(401).json({ success: false, error: 'Not authenticated' });

    const user = await User.findById(userId).select('-password').lean();
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

