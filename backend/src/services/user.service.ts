import bcrypt from 'bcryptjs';
import { User, IUser } from '../models/User.js';
import { AppError } from '../utils/AppError.js';

/**
 * Create a new user. Hashes password before storing.
 * Returns the user object without the password field.
 */
export const createUser = async (userData: Partial<IUser>) => {
  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) {
    throw new AppError('User with this email already exists', 409);
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(userData.password as string, salt);

  const user = new User({ ...userData, password: hashedPassword });
  await user.save();

  const userObject = user.toObject();
  delete userObject.password;
  return userObject;
};

/**
 * Fetch all users with passwords excluded.
 */
export const getAllUsers = async () => {
  return User.find().select('-password').lean();
};

/**
 * Fetch a single user by ID. Throws 404 if not found.
 */
export const getUserById = async (id: string) => {
  const user = await User.findById(id).select('-password').lean();
  if (!user) throw new AppError('User not found', 404);
  return user;
};

/**
 * Update a user by ID. Only whitelisted fields are accepted.
 * Password updates are NOT allowed through this endpoint.
 */
export const updateUser = async (id: string, updates: Partial<IUser>) => {
  const ALLOWED_FIELDS: (keyof IUser)[] = ['name', 'phone', 'profileImage', 'role', 'isActive'];

  const safeUpdates: Partial<IUser> = {};
  for (const key of ALLOWED_FIELDS) {
    if (updates[key] !== undefined) {
      (safeUpdates as any)[key] = updates[key];
    }
  }

  const user = await User.findByIdAndUpdate(id, safeUpdates, { returnDocument: 'after', runValidators: true })
    .select('-password')
    .lean();

  if (!user) throw new AppError('User not found', 404);
  return user;
};

/**
 * Soft-delete a user by setting isActive = false.
 * Does NOT remove the document from the database.
 */
export const deleteUser = async (id: string) => {
    const user = await User.findByIdAndUpdate(id, { isActive: false }, { returnDocument: 'after' });
  if (!user) throw new AppError('User not found', 404);
  return { message: 'User deactivated successfully' };
};

/**
 * Update user's profile image URL.
 */
export const updateUserProfileImage = async (id: string, imageUrl: string) => {
  const user = await User.findByIdAndUpdate(id, { profileImage: imageUrl }, { returnDocument: 'after' })
    .select('-password')
    .lean();
  if (!user) throw new AppError('User not found', 404);
  return user;
};

