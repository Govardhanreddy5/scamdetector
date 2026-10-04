import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load .env from backend or root
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
dotenv.config(); // fallback local

import { createApp } from './app.js';
import { isGeminiConfigured } from './ai/geminiService.js';

const PORT = parseInt(process.env.PORT || '5000', 10);
const app = createApp();

app.listen(PORT, () => {
  console.log('------------------------------------------------------------');
  console.log(`🛡️  ScamLens Bharat API Server running on port ${PORT}`);
  console.log(`🌐  Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🤖  Gemini AI Status: ${isGeminiConfigured() ? 'Active (API Key loaded)' : 'Fallback Mode (Rule Engine active)'}`);
  console.log(`🚀  Health Check: http://localhost:${PORT}/api/health`);
  console.log('------------------------------------------------------------');
});
