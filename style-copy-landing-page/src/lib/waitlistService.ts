import { z } from 'zod';

// Validation schema
export const waitlistSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name must be less than 100 characters'),
  source: z.string().optional(),
  referrer: z.string().optional(),
});

export type WaitlistFormData = z.infer<typeof waitlistSchema>;

// Local storage service for development
class LocalWaitlistService {
  private storageKey = 'atmos-waitlist-local';
  private rateLimitKey = 'atmos-waitlist-rate-limit';

  private getStoredEntries() {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem(this.storageKey);
    return stored ? JSON.parse(stored) : [];
  }

  private storeEntries(entries: any[]) {
    if (typeof window === 'undefined') return;
    localStorage.setItem(this.storageKey, JSON.stringify(entries));
  }

  private isRateLimited(): boolean {
    if (typeof window === 'undefined') return false;
    
    const now = Date.now();
    const rateLimitData = localStorage.getItem(this.rateLimitKey);
    
    if (!rateLimitData) {
      localStorage.setItem(this.rateLimitKey, JSON.stringify({ count: 1, resetTime: now + 2 * 60 * 1000 }));
      return false;
    }

    const { count, resetTime } = JSON.parse(rateLimitData);
    
    if (now > resetTime) {
      localStorage.setItem(this.rateLimitKey, JSON.stringify({ count: 1, resetTime: now + 2 * 60 * 1000 }));
      return false;
    }

    if (count >= 10) {
      return true;
    }

    localStorage.setItem(this.rateLimitKey, JSON.stringify({ count: count + 1, resetTime }));
    return false;
  }

  async addToWaitlist(data: WaitlistFormData) {
    const validatedData = waitlistSchema.parse(data);
    
    if (this.isRateLimited()) {
      throw new Error('Too many attempts. Please wait 2 minutes before trying again.');
    }

    const entries = this.getStoredEntries();
    const existingEntry = entries.find((entry: any) => entry.email === validatedData.email);
    
    if (existingEntry) {
      if (existingEntry.status === 'unsubscribed') {
        const updatedEntry = {
          ...existingEntry,
          status: 'active',
          updated_at: new Date().toISOString(),
          source: validatedData.source,
          referrer: validatedData.referrer,
        };
        
        const updatedEntries = entries.map((entry: any) => 
          entry.email === validatedData.email ? updatedEntry : entry
        );
        this.storeEntries(updatedEntries);
        return updatedEntry;
      } else {
        throw new Error('Email already registered for waitlist');
      }
    }

    const newEntry = {
      id: `local-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      email: validatedData.email,
      name: validatedData.name,
      source: validatedData.source || 'website',
      referrer: validatedData.referrer,
      status: 'active',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const updatedEntries = [...entries, newEntry];
    this.storeEntries(updatedEntries);
    
    return newEntry;
  }

  async getWaitlistCount(): Promise<number> {
    const entries = this.getStoredEntries();
    return entries.filter((entry: any) => entry.status === 'active').length;
  }

  async getWaitlistStats() {
    const entries = this.getStoredEntries();
    const activeEntries = entries.filter((entry: any) => entry.status === 'active');
    
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    const recentEntries = activeEntries.filter((entry: any) => 
      new Date(entry.created_at) >= yesterday
    );

    const sourceCounts = activeEntries.reduce((acc: any, entry: any) => {
      const source = entry.source || 'unknown';
      acc[source] = (acc[source] || 0) + 1;
      return acc;
    }, {});

    const topSources = Object.entries(sourceCounts)
      .map(([source, count]) => ({ source, count }))
      .sort((a: any, b: any) => b.count - a.count)
      .slice(0, 5);

    return {
      total_count: activeEntries.length,
      recent_count: recentEntries.length,
      growth_rate: activeEntries.length > 0 ? (recentEntries.length / activeEntries.length) * 100 : 0,
      top_sources: topSources,
      converted_count: 0,
    };
  }

  async isEmailInWaitlist(email: string): Promise<boolean> {
    const entries = this.getStoredEntries();
    return entries.some((entry: any) => entry.email === email && entry.status === 'active');
  }

  async unsubscribeFromWaitlist(email: string): Promise<void> {
    const entries = this.getStoredEntries();
    const updatedEntries = entries.map((entry: any) => 
      entry.email === email 
        ? { ...entry, status: 'unsubscribed', updated_at: new Date().toISOString() }
        : entry
    );
    this.storeEntries(updatedEntries);
  }

  checkRateLimit(identifier: string) {
    return {
      allowed: !this.isRateLimited(),
      resetTime: this.isRateLimited() ? Date.now() + 2 * 60 * 1000 : undefined,
    };
  }

  // Clear rate limit for testing
  clearRateLimit() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.rateLimitKey);
    }
  }
}

// Create and export service instance
const waitlistService = new LocalWaitlistService();

export const addToWaitlist = (data: WaitlistFormData) => waitlistService.addToWaitlist(data);
export const getWaitlistCount = () => waitlistService.getWaitlistCount();
export const getWaitlistStats = () => waitlistService.getWaitlistStats();
export const isEmailInWaitlist = (email: string) => waitlistService.isEmailInWaitlist(email);
export const unsubscribeFromWaitlist = (email: string) => waitlistService.unsubscribeFromWaitlist(email);
export const checkRateLimit = (identifier: string) => waitlistService.checkRateLimit(identifier);
export const clearRateLimit = () => waitlistService.clearRateLimit();