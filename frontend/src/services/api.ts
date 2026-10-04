import { AnalysisResult, DemoCaseItem, Language } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export async function analyzeText(text: string, language: Language = 'en'): Promise<AnalysisResult> {
  const response = await fetch(`${API_BASE_URL}/api/analyze/text`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text, language }),
  });

  const json = await response.json();
  if (!response.ok || !json.success) {
    throw new Error(json.error?.message || 'Failed to analyze text content.');
  }

  return json.data;
}

export async function analyzeImage(file: File, language: Language = 'en'): Promise<AnalysisResult> {
  const formData = new FormData();
  formData.append('image', file);
  formData.append('language', language);

  const response = await fetch(`${API_BASE_URL}/api/analyze/image`, {
    method: 'POST',
    body: formData,
  });

  const json = await response.json();
  if (!response.ok || !json.success) {
    throw new Error(json.error?.message || 'Failed to analyze screenshot.');
  }

  return json.data;
}

export async function analyzeUrl(url: string, language: Language = 'en'): Promise<AnalysisResult> {
  const response = await fetch(`${API_BASE_URL}/api/analyze/url`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url, language }),
  });

  const json = await response.json();
  if (!response.ok || !json.success) {
    throw new Error(json.error?.message || 'Failed to analyze URL.');
  }

  return json.data;
}

export async function fetchDemoCases(): Promise<DemoCaseItem[]> {
  const response = await fetch(`${API_BASE_URL}/api/analyze/demo-cases`);
  const json = await response.json();
  if (!response.ok || !json.success) {
    throw new Error(json.error?.message || 'Failed to load demo cases.');
  }
  return json.data;
}

export async function runDemoCase(caseId: string, language: Language = 'en'): Promise<AnalysisResult> {
  const response = await fetch(`${API_BASE_URL}/api/analyze/demo`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ caseId, language }),
  });

  const json = await response.json();
  if (!response.ok || !json.success) {
    throw new Error(json.error?.message || 'Failed to execute demo case.');
  }

  return json.data;
}

export async function checkServerHealth(): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/health`);
    const data = await res.json();
    return data.success === true;
  } catch {
    return false;
  }
}
