import { Request, Response, NextFunction } from 'express';
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  updateUserProfileImage,
} from '../services/user.service.js';
import { uploadImage } from '../utils/cloudinary.js';
import { AppError } from '../utils/AppError.js';

/**
 * GET /users/me — Fetch current user details.
 */
export const fetchMe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user?.userId;
    if (!userId) throw new AppError('Unauthorized', 401);

    const user = await getUserById(userId);
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /users/me — Update current user profile.
 */
export const updateMe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user?.userId;
    if (!userId) throw new AppError('Unauthorized', 401);

    // Security: Prevent users from updating their own role or isActive status
    const { role, isActive, ...safeBody } = req.body;

    const user = await updateUser(userId, safeBody);
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /users/profile-image — Upload and set profile image.
 */
export const uploadProfileImage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user?.userId;
    if (!userId) {
      throw new AppError('Authentication required', 401);
    }

    if (!req.file) {
      throw new AppError('No image provided', 400);
    }

    const imageUrl = await uploadImage(req.file.buffer, 'profiles');
    const user = await updateUserProfileImage(userId, imageUrl);

    res.status(200).json({ success: true, data: user });
  } catch (error: any) {
    console.log('🚀 [DEBUG] UPLOAD FAILED');
    console.log('Error Message:', error.message);
    if (error.stack) console.log('Stack Trace:', error.stack);
    debugger;
    next(error);
  }
};

/**
 * POST /users — Create a new user.
 */
export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await createUser(req.body);
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /users — Fetch all users (passwords excluded).
 */
export const fetchAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!(req as any).user) throw new AppError('Authentication required', 401);
    const users = await getAllUsers();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /users/:id — Fetch a single user by ID.
 */
export const fetchUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!(req as any).user) throw new AppError('Authentication required', 401);
    const user = await getUserById(req.params.id as string);
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /users/:id — Update a user (whitelisted fields only).
 */
export const updateUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!(req as any).user) throw new AppError('Authentication required', 401);
    const user = await updateUser(req.params.id as string, req.body);
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE /users/:id — Soft delete (sets isActive = false).
 */
export const deleteUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!(req as any).user) throw new AppError('Authentication required', 401);
    const result = await deleteUser(req.params.id as string);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};
