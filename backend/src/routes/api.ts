import { Router } from 'express';
import multer from 'multer';
import {
  analyzeTextHandler,
  analyzeImageHandler,
  analyzeUrlHandler,
  getDemoCasesHandler,
  runDemoHandler,
  healthCheckHandler,
  getSupportedLanguagesHandler,
} from '../controllers/analysisController.js';

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB max
    files: 1,
  },
  fileFilter: (_req, file, cb) => {
    const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file format. Only PNG, JPG, and WEBP screenshots are allowed.'));
    }
  },
});

const router = Router();

// Core Analysis Endpoints
router.post('/analyze/text', analyzeTextHandler);
router.post('/analyze/image', upload.single('image'), analyzeImageHandler);
router.post('/analyze/url', analyzeUrlHandler);

// Demo Mode Endpoints
router.get('/analyze/demo-cases', getDemoCasesHandler);
router.post('/analyze/demo', runDemoHandler);

// System & Config Endpoints
router.get('/health', healthCheckHandler);
router.get('/config/languages', getSupportedLanguagesHandler);

export default router;
