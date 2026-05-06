import { Request, Response, NextFunction } from 'express';
import {
  getAdminRestaurants,
  approveRestaurant,
  rejectRestaurant,
  deactivateRestaurant,
} from '../services/admin.service.js';

export const fetchAdminRestaurants = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    
    let isApproved: boolean | undefined = undefined;
    if (req.query.isApproved === 'true') isApproved = true;
    if (req.query.isApproved === 'false') isApproved = false;

    const data = await getAdminRestaurants(page, limit, isApproved);
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const approveAdminRestaurant = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await approveRestaurant(req.params.id as string);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

export const rejectAdminRestaurant = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await rejectRestaurant(req.params.id as string);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

export const deactivateAdminRestaurant = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await deactivateRestaurant(req.params.id as string);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};
