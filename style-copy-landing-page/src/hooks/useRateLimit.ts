import { useState, useCallback } from 'react';

interface RateLimitConfig {
  maxAttempts: number;
  windowMs: number;
  key?: string;
}

export function useRateLimit(config: RateLimitConfig) {
  const { maxAttempts, windowMs, key = 'default' } = config;
  const [attempts, setAttempts] = useState<number[]>([]);

  const recordAttempt = useCallback(() => {
    const now = Date.now();
    setAttempts(prev => {
      const validAttempts = prev.filter(time => now - time < windowMs);
      return [...validAttempts, now];
    });
  }, [windowMs]);

  const isRateLimited = attempts.filter(time => Date.now() - time < windowMs).length >= maxAttempts;

  const getTimeUntilReset = () => {
    if (attempts.length === 0) return 0;
    const now = Date.now();
    const validAttempts = attempts.filter(time => now - time < windowMs);
    if (validAttempts.length === 0) return 0;
    const oldestAttempt = Math.min(...validAttempts);
    const resetTime = oldestAttempt + windowMs;
    return Math.max(0, resetTime - now);
  };

  return {
    isRateLimited,
    recordAttempt,
    getTimeUntilReset,
    remainingAttempts: Math.max(0, maxAttempts - attempts.length),
  };
} 