import { describe, it, expect } from 'vitest';
import { analyzeSafeUrl, isPrivateIp } from '../src/utils/urlAnalyzer.js';

describe('Safe URL Analyzer & SSRF Protection', () => {
  it('correctly identifies private IP ranges and loopbacks', () => {
    expect(isPrivateIp('127.0.0.1')).toBe(true);
    expect(isPrivateIp('10.0.0.5')).toBe(true);
    expect(isPrivateIp('192.168.1.1')).toBe(true);
    expect(isPrivateIp('172.16.0.1')).toBe(true);
    expect(isPrivateIp('169.254.169.254')).toBe(true); // AWS/cloud metadata
    expect(isPrivateIp('8.8.8.8')).toBe(false); // Public DNS
  });

  it('blocks localhost and internal domains without external network requests', async () => {
    const report = await analyzeSafeUrl('http://localhost:3000/admin');
    expect(report.isPrivateOrInternal).toBe(true);
    expect(report.heuristicRedFlags.some((f) => f.includes('localhost/internal host'))).toBe(true);
  });

  it('detects unencrypted HTTP and suspicious TLDs', async () => {
    const report = await analyzeSafeUrl('http://trading-profits-now.xyz/login');
    expect(report.isHttps).toBe(false);
    expect(report.isSuspiciousTld).toBe(true);
    expect(report.heuristicRedFlags.length).toBeGreaterThanOrEqual(1);
  });
});
