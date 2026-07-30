import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../utils/token';
import { UnauthorizedError, ForbiddenError } from '../utils/errors';
import { userRepository } from '../repositories/userRepository';

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let token;
    
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    
    if (!token) {
      return next(new UnauthorizedError('You are not logged in. Please log in to get access.'));
    }

    const decoded = verifyAccessToken(token);
    const currentUser = await userRepository.findUserById(decoded.id);
    
    if (!currentUser) {
      return next(new UnauthorizedError('The user belonging to this token does no longer exist.'));
    }

    (req as any).user = currentUser;
    next();
  } catch (error) {
    next(new UnauthorizedError('Invalid token'));
  }
};

export const requireRole = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;
    if (!user || !roles.includes(user.role)) {
      return next(new ForbiddenError('You do not have permission to perform this action'));
    }
    next();
  };
};
