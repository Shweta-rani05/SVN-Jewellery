import { Request, Response, NextFunction } from 'express';
import { authService } from '../services/authService';
import { UnauthorizedError } from '../utils/errors';

const setTokenCookie = (res: Response, token: string) => {
  res.cookie('refreshToken', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
};

export const authController = {
  async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const { user, accessToken, refreshToken } = await authService.signup(req.body);
      setTokenCookie(res, refreshToken);
      res.status(201).json({ success: true, data: { user, accessToken } });
    } catch (error) {
      next(error);
    }
  },

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { user, accessToken, refreshToken } = await authService.login(req.body);
      setTokenCookie(res, refreshToken);
      res.status(200).json({ success: true, data: { user, accessToken } });
    } catch (error) {
      next(error);
    }
  },

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.cookies?.refreshToken;
      if (!token) throw new UnauthorizedError('No refresh token provided');

      const { accessToken, refreshToken } = await authService.refresh(token);
      setTokenCookie(res, refreshToken);
      res.status(200).json({ success: true, data: { accessToken } });
    } catch (error) {
      next(error);
    }
  },

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.cookies?.refreshToken;
      if (token) {
        await authService.logout(token);
      }
      res.clearCookie('refreshToken');
      res.status(200).json({ success: true, data: null });
    } catch (error) {
      next(error);
    }
  },

  async getMe(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(200).json({ success: true, data: { user: (req as any).user } });
    } catch (error) {
      next(error);
    }
  }
};
