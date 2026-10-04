import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { createApp } from '../src/app.js';

const app = createApp();

describe('ScamLens Bharat API Endpoints', () => {
  it('GET /api/health returns 200 and healthy status', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.service).toBe('ScamLens Bharat API');
  });

  it('GET /api/config/languages returns supported languages', async () => {
    const res = await request(app).get('/api/config/languages');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.length).toBe(3);
  });

  it('POST /api/analyze/text processes suspicious text correctly', async () => {
    const res = await request(app)
      .post('/api/analyze/text')
      .send({
        text: 'Guaranteed 25% returns every week! Limited slots left! Send OTP to verify.',
        language: 'en',
      });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.riskLevel).toBe('HIGH');
    expect(res.body.data.redFlags.length).toBeGreaterThan(0);
    expect(res.body.data.avoidActions.length).toBeGreaterThan(0);
  });

  it('POST /api/analyze/text validates empty or invalid payload', async () => {
    const res = await request(app).post('/api/analyze/text').send({});
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.error.code).toBe('VALIDATION_ERROR');
  });

  it('GET /api/analyze/demo-cases returns the 3 pre-built cases', async () => {
    const res = await request(app).get('/api/analyze/demo-cases');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.length).toBe(3);
  });

  it('POST /api/analyze/demo loads pre-configured demo cases', async () => {
    const res = await request(app)
      .post('/api/analyze/demo')
      .send({
        caseId: 'case-1-high-risk',
        language: 'hi',
      });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.riskLevel).toBe('HIGH');
    expect(res.body.data.isDemo).toBe(true);
    expect(res.body.data.language).toBe('hi');
  });
});
