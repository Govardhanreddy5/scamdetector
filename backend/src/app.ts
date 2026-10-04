import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import apiRoutes from './routes/api.js';

export function createApp() {
  const app = express();

  // Security headers
  app.use(helmet({
    contentSecurityPolicy: false, // Allows flexible API usage
    crossOriginEmbedderPolicy: false,
  }));

  // CORS configuration
  const allowedOrigin = process.env.FRONTEND_URL || 'http://localhost:5173';
  app.use(cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, or same-origin)
      if (!origin || origin === allowedOrigin || origin.startsWith('http://localhost:')) {
        callback(null, true);
      } else {
        callback(null, true); // Permissive in dev/hackathon demo mode
      }
    },
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));

  // Request rate limiter
  const limiter = rateLimit({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10), // 15 mins default
    max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '120', 10),
    standardHeaders: true,
    legacyHeaders: false,
    skip: (req) => req.path === '/api/health',
    message: {
      success: false,
      error: {
        code: 'RATE_LIMIT_EXCEEDED',
        message: 'Too many requests from this IP. Please try again after a few minutes.',
      },
    },
  });
  app.use('/api', limiter);

  // Body parsers with safe size limits
  app.use(express.json({ limit: '2mb' }));
  app.use(express.urlencoded({ extended: true, limit: '2mb' }));

  // Mount API routes
  app.use('/api', apiRoutes);

  // 404 Route Handler
  app.use((_req: Request, res: Response) => {
    res.status(404).json({
      success: false,
      error: {
        code: 'NOT_FOUND',
        message: 'The requested API endpoint was not found.',
      },
    });
  });

  // Global Error Handler
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    if (err.type === 'entity.parse.failed' || err instanceof SyntaxError) {
      res.status(400).json({
        success: false,
        error: {
          code: 'INVALID_JSON',
          message: 'Malformed JSON payload in request body.',
        },
      });
      return;
    }

    if (err.name === 'MulterError') {
      res.status(400).json({
        success: false,
        error: {
          code: 'FILE_UPLOAD_ERROR',
          message: err.message,
        },
      });
      return;
    }

    console.error('Unhandled server error:', err);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: 'A security or server error occurred. Please verify your input and try again.',
      },
    });
  });

  return app;
}
