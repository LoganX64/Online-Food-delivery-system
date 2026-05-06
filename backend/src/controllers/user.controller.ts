import { Request, Response, NextFunction } from 'express';
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from '../services/user.service.js';

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await createUser(req.body);
    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    next(error);
  }
};

export const fetchAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await getAllUsers();
    res.status(200).json({ users });
  } catch (error) {
    next(error);
  }
};

export const fetchUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await getUserById(req.params.id as string);
    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};

export const updateUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await updateUser(req.params.id as string, req.body);
    res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    next(error);
  }
};

export const deleteUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await deleteUser(req.params.id as string);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
