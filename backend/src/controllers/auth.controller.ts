import { Request, Response, NextFunction } from 'express';
import { loginUser, requestPasswordReset, resetUserPassword, updateUserPassword } from '../services/auth.service.js';
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

/**
 * POST /auth/forgot-password — Request a password reset token.
 */
export const forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body;
    const resetToken = await requestPasswordReset(email);

    // In production, you would not return the token in the response.
    // It would be sent via email. For development/testing, we return it.
    res.status(200).json({
      success: true,
      message: 'Password reset token generated',
      data: { resetToken },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /auth/reset-password/:token — Reset password using token.
 */
export const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const result = await resetUserPassword(token as string, password);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /auth/update-password — Update password while authenticated.
 */
export const updatePassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user?.userId;
    if (!userId) return res.status(401).json({ success: false, error: 'Not authenticated' });

    const { currentPassword, newPassword } = req.body;
    const result = await updateUserPassword(userId, currentPassword, newPassword);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

