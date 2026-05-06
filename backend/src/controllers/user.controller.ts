import { Request, Response, NextFunction } from 'express';
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from '../services/user.service.js';

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
    const result = await deleteUser(req.params.id as string);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};
