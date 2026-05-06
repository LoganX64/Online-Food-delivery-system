import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email }).lean();
  if (!user) {
    throw new Error('INVALID_CREDENTIALS');
  }

  const isMatch = await bcrypt.compare(password, user.password as string);
  if (!isMatch) {
    throw new Error('INVALID_CREDENTIALS');
  }

  const secret = process.env.JWT_KEY;
  if (!secret) {
    throw new Error('JWT_KEY is not defined in environment variables');
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
