import { Request, Response, NextFunction } from 'express';
import { loginUser } from '../services/auth.service.js';

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const result = await loginUser(email, password);
    res.status(200).json({
      message: 'Login successful',
      token: result.token,
      user: result.user,
    });
  } catch (error) {
    next(error);
  }
};
