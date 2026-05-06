import bcrypt from 'bcryptjs';
import { User, IUser } from '../models/User.js';

export const createUser = async (userData: Partial<IUser>) => {
  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) {
    throw new Error('User with this email already exists');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(userData.password as string, salt);

  const user = new User({ ...userData, password: hashedPassword });
  await user.save();

  const userObject = user.toObject();
  delete userObject.password;
  return userObject;
};

export const getAllUsers = async () => {
  return User.find().select('-password').lean();
};

export const getUserById = async (id: string) => {
  const user = await User.findById(id).select('-password').lean();
  if (!user) throw new Error('USER_NOT_FOUND');
  return user;
};

export const updateUser = async (id: string, updates: Partial<IUser>) => {
  const ALLOWED_FIELDS: (keyof IUser)[] = ['name', 'phone', 'profileImage', 'role', 'isActive'];

  const safeUpdates: Partial<IUser> = {};
  for (const key of ALLOWED_FIELDS) {
    if (updates[key] !== undefined) {
      (safeUpdates as any)[key] = updates[key];
    }
  }

  const user = await User.findByIdAndUpdate(id, safeUpdates, { new: true })
    .select('-password')
    .lean();

  if (!user) throw new Error('USER_NOT_FOUND');
  return user;
};

export const deleteUser = async (id: string) => {
  const user = await User.findByIdAndUpdate(id, { isActive: false }, { new: true });
  if (!user) throw new Error('USER_NOT_FOUND');
  return { message: 'User deactivated successfully' };
};
