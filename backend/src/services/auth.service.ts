import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
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

/**
 * Generate a password reset token and save it to the user record.
 * In a real-world scenario, this would trigger an email.
 */
export const requestPasswordReset = async (email: string) => {
  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    throw new AppError('No user found with that email address', 404);
  }

  // Generate random token
  const resetToken = crypto.randomBytes(32).toString('hex');
  
  // Hash token to store in DB
  const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

  // Set expiration (e.g., 1 hour)
  user.resetPasswordToken = hashedToken;
  user.resetPasswordExpires = new Date(Date.now() + 3600000);

  await user.save();

  return resetToken;
};

/**
 * Reset password using a valid token.
 */
export const resetUserPassword = async (token: string, newPassword: string) => {
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpires: { $gt: new Date() },
  });

  if (!user) {
    throw new AppError('Token is invalid or has expired', 400);
  }

  // Hash new password
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(newPassword, salt);

  // Clear reset token fields
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;

  await user.save();

  return { message: 'Password has been reset successfully' };
};
