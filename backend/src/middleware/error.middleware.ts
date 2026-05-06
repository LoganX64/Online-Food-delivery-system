import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);

  if (err.message === 'USER_NOT_FOUND') {
    res.status(404).json({ message: 'User not found' });
    return;
  }

  if (err.message === 'INVALID_CREDENTIALS') {
    res.status(401).json({ message: 'Invalid email or password' });
    return;
  }

  if (err.message === 'User with this email already exists') {
    res.status(409).json({ message: err.message });
    return;
  }

  res.status(500).json({ message: err.message || 'Internal Server Error' });
};
