import { describe, it, expect } from 'vitest';
import { runRuleEngine } from '../src/rules/ruleEngine.js';

describe('Deterministic Rule Engine', () => {
  it('detects guaranteed return promises and flags them as HIGH severity', () => {
    const text = 'Join our channel for guaranteed 30% monthly return with zero risk!';
    const result = runRuleEngine(text);

    expect(result.signals.length).toBeGreaterThan(0);
    expect(result.criticalSignalDetected).toBe(true);
    expect(result.computedScore).toBeGreaterThanOrEqual(7);

    const hasGuaranteedFlag = result.redFlags.some(
      (rf) => rf.type === 'GUARANTEED_RETURNS' && rf.severity === 'HIGH'
    );
    expect(hasGuaranteedFlag).toBe(true);
  });

  it('detects critical OTP and credential theft requests', () => {
    const text = 'Dear user, please share your OTP to confirm your Demat account activation.';
    const result = runRuleEngine(text);

    expect(result.criticalSignalDetected).toBe(true);
    const hasOtpFlag = result.redFlags.some(
      (rf) => rf.type === 'SENSITIVE_INFO_REQUEST' && rf.severity === 'HIGH'
    );
    expect(hasOtpFlag).toBe(true);
  });

  it('detects regional language scam keywords (Hindi and Telugu)', () => {
    const hindiText = 'पैसा डबल करें मात्र 10 दिनों में। पक्का मुनाफा।';
    const hindiResult = runRuleEngine(hindiText);
    expect(hindiResult.signals.length).toBeGreaterThan(0);
    expect(hindiResult.computedScore).toBeGreaterThanOrEqual(4);

    const teluguText = 'ఖచ్చితమైన లాభం కొరకు మా గ్రూపులో చేరండి.';
    const teluguResult = runRuleEngine(teluguText);
    expect(teluguResult.signals.length).toBeGreaterThan(0);
  });

  it('handles benign educational content without false positive alerts', () => {
    const benignText =
      'Mutual fund investments are subject to market risks. Read all scheme related documents carefully.';
    const result = runRuleEngine(benignText);

    expect(result.criticalSignalDetected).toBe(false);
    expect(result.computedScore).toBe(0);
    expect(result.redFlags.length).toBe(0);
  });
});
