import { Router } from 'express';
import express from 'express';
import { checkoutController } from '../controllers/checkoutController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

router.post('/create-session', protect, checkoutController.createSession);

// Note: Stripe webhook needs the raw request body. 
// We handle this conditionally in app.ts, but express.raw() can also be used here directly.
// The app.ts currently handles it for /api/webhooks/stripe, so we don't need raw() here if we mount at /api/webhooks/stripe,
// BUT this file will be mounted at /api/checkout, so let's adjust app.ts or mount it differently.

export default router;
