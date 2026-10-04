import { Request, Response } from 'express';
import { analyzeTextSchema, analyzeUrlSchema, demoCaseSchema } from '../validators/index.js';
import { processContentAnalysis } from '../services/analysisService.js';
import { analyzeSafeUrl } from '../utils/urlAnalyzer.js';
import { extractTextFromImage, isGeminiConfigured } from '../ai/geminiService.js';
import { DEMO_CASES, getDemoCase } from '../services/demoService.js';
import { ApiResponse } from '../types/index.js';

export async function analyzeTextHandler(req: Request, res: Response): Promise<void> {
  try {
    const parseResult = analyzeTextSchema.safeParse(req.body);
    if (!parseResult.success) {
      const resp: ApiResponse = {
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: parseResult.error.issues[0]?.message || 'Invalid input payload',
        },
      };
      res.status(400).json(resp);
      return;
    }

    const { text, language } = parseResult.data;
    const result = await processContentAnalysis({
      content: text,
      language: language as 'en' | 'hi' | 'te',
    });

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    console.error('Error analyzing text:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'ANALYSIS_ERROR',
        message: 'An internal error occurred during content analysis. Please try again.',
      },
    });
  }
}

export async function analyzeImageHandler(req: Request, res: Response): Promise<void> {
  try {
    const file = req.file;
    if (!file) {
      res.status(400).json({
        success: false,
        error: {
          code: 'FILE_MISSING',
          message: 'No image file uploaded. Please upload a PNG, JPG, or WEBP screenshot.',
        },
      });
      return;
    }

    const language = (req.body.language || 'en') as 'en' | 'hi' | 'te';

    // Extract text from image via Gemini Vision
    const extractedText = await extractTextFromImage(file.buffer, file.mimetype);

    // Run combined analysis on extracted text
    const result = await processContentAnalysis({
      content: extractedText,
      language,
    });

    result.extractedText = extractedText;

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    console.error('Error analyzing image:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'IMAGE_ANALYSIS_ERROR',
        message: 'Could not process screenshot image. Please ensure image is clear and under 10MB.',
      },
    });
  }
}

export async function analyzeUrlHandler(req: Request, res: Response): Promise<void> {
  try {
    const parseResult = analyzeUrlSchema.safeParse(req.body);
    if (!parseResult.success) {
      res.status(400).json({
        success: false,
        error: {
          code: 'INVALID_URL',
          message: parseResult.error.issues[0]?.message || 'Please provide a valid URL string.',
        },
      });
      return;
    }

    const { url, language } = parseResult.data;

    // Run safe URL fetcher with SSRF guards
    const urlReport = await analyzeSafeUrl(url);

    if (!urlReport.isValidUrl) {
      res.status(400).json({
        success: false,
        error: {
          code: 'UNSAFE_OR_INVALID_URL',
          message: urlReport.heuristicRedFlags.join(' ') || 'The specified URL format is invalid or prohibited.',
        },
      });
      return;
    }

    // Synthesize text to inspect: domain + page title + description + extracted snippet
    const aggregatedContent = [
      `Website Domain: ${urlReport.domain}`,
      urlReport.extractedTitle ? `Page Title: ${urlReport.extractedTitle}` : '',
      urlReport.extractedMetaDescription ? `Description: ${urlReport.extractedMetaDescription}` : '',
      urlReport.extractedTextSnippet ? `Body Excerpt: ${urlReport.extractedTextSnippet}` : '',
    ]
      .filter(Boolean)
      .join('\n');

    const result = await processContentAnalysis({
      content: aggregatedContent,
      language: language as 'en' | 'hi' | 'te',
      urlReport,
    });

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    console.error('Error analyzing URL:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'URL_ANALYSIS_FAILED',
        message: 'Could not complete safe URL inspection. Please try again.',
      },
    });
  }
}

export async function getDemoCasesHandler(_req: Request, res: Response): Promise<void> {
  const cases = Object.values(DEMO_CASES).map(c => ({
    id: c.id,
    title: c.title,
    category: c.category,
    inputType: c.inputType,
    sampleContent: c.sampleContent,
  }));

  res.status(200).json({
    success: true,
    data: cases,
  });
}

export async function runDemoHandler(req: Request, res: Response): Promise<void> {
  const parseResult = demoCaseSchema.safeParse(req.body);
  if (!parseResult.success) {
    res.status(400).json({
      success: false,
      error: {
        code: 'INVALID_DEMO_PARAMS',
        message: parseResult.error.issues[0]?.message || 'Invalid demo request.',
      },
    });
    return;
  }

  const { caseId, language } = parseResult.data;
  const demoResult = getDemoCase(caseId, language as 'en' | 'hi' | 'te');

  if (!demoResult) {
    res.status(404).json({
      success: false,
      error: {
        code: 'DEMO_CASE_NOT_FOUND',
        message: `Demo case with ID '${caseId}' does not exist.`,
      },
    });
    return;
  }

  res.status(200).json({
    success: true,
    data: demoResult,
  });
}

export async function healthCheckHandler(_req: Request, res: Response): Promise<void> {
  res.status(200).json({
    success: true,
    data: {
      status: 'healthy',
      service: 'ScamLens Bharat API',
      version: '1.0.0',
      geminiConfigured: isGeminiConfigured(),
      timestamp: new Date().toISOString(),
      supportedLanguages: ['en', 'hi', 'te'],
    },
  });
}

export async function getSupportedLanguagesHandler(_req: Request, res: Response): Promise<void> {
  res.status(200).json({
    success: true,
    data: [
      { code: 'en', name: 'English', nativeName: 'English' },
      { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
      { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
    ],
  });
}
