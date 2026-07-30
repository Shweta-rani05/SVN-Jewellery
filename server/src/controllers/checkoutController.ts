import { Request, Response, NextFunction } from 'express';
import { checkoutService } from '../services/checkoutService';
import { AppError, ValidationError } from '../utils/errors';
import logger from '../utils/logger';

export const checkoutController = {
  async createSession(req: Request, res: Response, next: NextFunction) {
    try {
      const { items, cardDetails } = req.body;
      const userId = (req as any).user.id;

      if (!items || !Array.isArray(items) || items.length === 0) {
        throw new ValidationError('Cart is empty or invalid');
      }

      const { url, sessionId } = await checkoutService.createSession(userId, items, cardDetails);
      res.status(200).json({ success: true, data: { url, sessionId } });
    } catch (error) {
      next(error);
    }
  },

  async webhook(req: Request, res: Response, next: NextFunction) {
    // Webhook is bypassed as we are using mockPayment in checkoutService
    res.status(200).json({ received: true });
  }
};
