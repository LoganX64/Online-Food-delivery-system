import { Request, Response, NextFunction } from 'express';
import {
  createAddress,
  getAddressesByUserId,
  getAddressById,
  updateAddress,
  deleteAddress,
} from '../services/address.service.js';

/**
 * POST /addresses — Create a new address for the authenticated user.
 */
export const addAddress = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // userId comes from the authenticated user (set by auth middleware)
    const userId = (req as any).user?.userId || req.body.userId;
    const address = await createAddress(userId, req.body);
    res.status(201).json({ success: true, data: address });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /addresses — Get all addresses for the authenticated user.
 */
export const fetchAddresses = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user?.userId || req.query.userId as string;
    const addresses = await getAddressesByUserId(userId);
    res.status(200).json({ success: true, data: addresses });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /addresses/:id — Get a single address by ID.
 */
export const fetchAddressById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user?.userId || req.query.userId as string;
    const address = await getAddressById(userId, req.params.id as string);
    res.status(200).json({ success: true, data: address });
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /addresses/:id — Update an address.
 */
export const updateAddressById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user?.userId || req.body.userId;
    const address = await updateAddress(userId, req.params.id as string, req.body);
    res.status(200).json({ success: true, data: address });
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE /addresses/:id — Delete an address.
 */
export const deleteAddressById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user?.userId || req.query.userId as string;
    const result = await deleteAddress(userId, req.params.id as string);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};
