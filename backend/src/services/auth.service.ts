import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { AppError } from '../utils/AppError.js';

/**
 * Authenticate a user by email and password.
 * Returns a signed JWT token and the user info (without password).
 */
export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email }).lean();
  if (!user) {
    throw new AppError('Invalid email or password', 401);
  }

  // Reject deactivated accounts
  if (!user.isActive) {
    throw new AppError('Account is deactivated. Please contact support.', 403);
  }

  const isMatch = await bcrypt.compare(password, user.password as string);
  if (!isMatch) {
    throw new AppError('Invalid email or password', 401);
  }

  const secret = process.env.JWT_KEY;
  if (!secret) {
    throw new AppError('JWT_KEY is not defined in environment variables', 500);
  }

  const expiresIn = (process.env.JWT_EXPIRES_IN || '7d') as jwt.SignOptions['expiresIn'];

  const token = jwt.sign(
    { userId: user._id.toString(), role: user.role },
    secret,
    { expiresIn }
  );

  const { password: _pwd, ...userWithoutPassword } = user;

  return { token, user: userWithoutPassword };
};
