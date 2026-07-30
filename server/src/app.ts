import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { errorHandler } from './middleware/errorHandler';
import { NotFoundError } from './utils/errors';
import pinoHttp from 'pino-http';
import logger from './utils/logger';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes';

const app = express();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(cookieParser());

import checkoutRoutes from './routes/checkoutRoutes';
import { checkoutController } from './controllers/checkoutController';
import express from 'express';

// Request logging
app.use(pinoHttp({ logger }));

// Webhook must be mounted BEFORE express.json()
app.post('/api/webhooks/stripe', express.raw({ type: 'application/json' }), checkoutController.webhook);

app.use(express.json());

// Routes (to be mounted)
app.use('/api/auth', authRoutes);
app.use('/api/checkout', checkoutRoutes);

app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Server is healthy' });
});

// Handle unhandled routes
app.all('*', (req, res, next) => {
  next(new NotFoundError(`Can't find ${req.originalUrl} on this server!`));
});

// Global error handler
app.use(errorHandler);

export default app;
