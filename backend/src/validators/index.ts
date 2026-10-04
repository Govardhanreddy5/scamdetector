import { z } from 'zod';

export const analyzeTextSchema = z.object({
  text: z.string().min(1, 'Please provide content to analyze.').max(20000, 'Content exceeds maximum limit of 20,000 characters.'),
  language: z.enum(['en', 'hi', 'te']).optional().default('en'),
});

export const analyzeUrlSchema = z.object({
  url: z.string().min(3, 'Please enter a valid URL.').max(2048, 'URL exceeds maximum length.'),
  language: z.enum(['en', 'hi', 'te']).optional().default('en'),
});

export const demoCaseSchema = z.object({
  caseId: z.string().min(1, 'Demo case ID is required.'),
  language: z.enum(['en', 'hi', 'te']).optional().default('en'),
});
