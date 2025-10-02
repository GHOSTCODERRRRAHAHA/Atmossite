import { z } from 'zod';
import { supabase } from './supabase';
import type { WaitlistEntry } from './supabase';

// Validation schema
export const waitlistSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name must be less than 100 characters'),
  source: z.string().optional(),
  referrer: z.string().optional(),
});

export type WaitlistFormData = z.infer<typeof waitlistSchema>;

// Supabase waitlist service
class SupabaseWaitlistService {
  private rateLimitKey = 'atmos-waitlist-rate-limit';

  // Rate limiting check (client-side)
  private isRateLimited(): boolean {
    if (typeof window === 'undefined') return false;
    
    const now = Date.now();
    const rateLimitData = localStorage.getItem(this.rateLimitKey);
    
    if (!rateLimitData) {
      localStorage.setItem(this.rateLimitKey, JSON.stringify({ count: 1, resetTime: now + 5 * 60 * 1000 }));
      return false;
    }

    const { count, resetTime } = JSON.parse(rateLimitData);
    
    if (now > resetTime) {
      localStorage.setItem(this.rateLimitKey, JSON.stringify({ count: 1, resetTime: now + 5 * 60 * 1000 }));
      return false;
    }

    if (count >= 3) {
      return true;
    }

    localStorage.setItem(this.rateLimitKey, JSON.stringify({ count: count + 1, resetTime }));
    return false;
  }

  // Add to waitlist
  async addToWaitlist(data: WaitlistFormData): Promise<WaitlistEntry> {
    // Validate input
    const validatedData = waitlistSchema.parse(data);
    
    // Check rate limiting
    if (this.isRateLimited()) {
      throw new Error('Too many attempts. Please wait 5 minutes before trying again.');
    }

    try {
      // Check if email already exists
      const { data: existingEntry, error: checkError } = await supabase
        .from('waitlist')
        .select('*')
        .eq('email', validatedData.email)
        .maybeSingle();

      if (checkError) {
        console.error('Error checking existing email:', checkError);
        throw new Error('Failed to check email. Please try again.');
      }

      if (existingEntry) {
        if (existingEntry.status === 'unsubscribed') {
          // Allow resubscription
          const { data: updatedEntry, error: updateError } = await supabase
            .from('waitlist')
            .update({
              status: 'active',
              source: validatedData.source || 'website',
              referrer: validatedData.referrer,
              updated_at: new Date().toISOString(),
            })
            .eq('email', validatedData.email)
            .select()
            .single();

          if (updateError) {
            console.error('Error updating waitlist entry:', updateError);
            throw new Error('Failed to resubscribe. Please try again.');
          }

          return updatedEntry;
        } else {
          throw new Error('Email already registered for waitlist');
        }
      }

      // Add new entry
      const { data: newEntry, error: insertError } = await supabase
        .from('waitlist')
        .insert({
          email: validatedData.email,
          name: validatedData.name,
          source: validatedData.source || 'website',
          referrer: validatedData.referrer,
          user_agent: typeof window !== 'undefined' ? navigator.userAgent : undefined,
          status: 'active',
        })
        .select()
        .single();

      if (insertError) {
        console.error('Error inserting waitlist entry:', insertError);
        
        // Handle unique constraint violation
        if (insertError.code === '23505') {
          throw new Error('Email already registered for waitlist');
        }
        
        throw new Error('Failed to join waitlist. Please try again.');
      }

      return newEntry;
    } catch (error) {
      console.error('Waitlist service error:', error);
      
      if (error instanceof Error) {
        throw error;
      }
      
      throw new Error('Failed to join waitlist. Please try again.');
    }
  }

  // Get waitlist count
  async getWaitlistCount(): Promise<number> {
    try {
      const { count, error } = await supabase
        .from('waitlist')
        .select('id', { count: 'exact', head: true })
        .eq('status', 'active');

      if (error) {
        console.error('Error getting waitlist count:', error);
        return 0;
      }

      return count || 0;
    } catch (error) {
      console.error('Error getting waitlist count:', error);
      return 0;
    }
  }

  // Get waitlist stats
  async getWaitlistStats() {
    try {
      const { data: stats, error } = await supabase
        .from('waitlist_stats')
        .select('*')
        .single();

      if (error) {
        console.error('Error getting waitlist stats:', error);
        return {
          total_count: 0,
          recent_count: 0,
          growth_rate: 0,
          top_sources: [],
          converted_count: 0,
        };
      }

      // Get top sources
      const { data: sourcesData, error: sourcesError } = await supabase
        .from('waitlist')
        .select('source')
        .eq('status', 'active');

      let topSources: Array<{ source: string; count: number }> = [];
      
      if (!sourcesError && sourcesData) {
        const sourceCounts = sourcesData.reduce((acc: any, entry: any) => {
          const source = entry.source || 'unknown';
          acc[source] = (acc[source] || 0) + 1;
          return acc;
        }, {});

        topSources = Object.entries(sourceCounts)
          .map(([source, count]) => ({ source, count: count as number }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 5);
      }

      const growthRate = stats.total_count > 0 
        ? (stats.recent_count / stats.total_count) * 100 
        : 0;

      return {
        total_count: stats.total_count || 0,
        recent_count: stats.recent_count || 0,
        growth_rate: growthRate,
        top_sources: topSources,
        converted_count: stats.converted_count || 0,
      };
    } catch (error) {
      console.error('Error getting waitlist stats:', error);
      return {
        total_count: 0,
        recent_count: 0,
        growth_rate: 0,
        top_sources: [],
        converted_count: 0,
      };
    }
  }

  // Check if email exists
  async isEmailInWaitlist(email: string): Promise<boolean> {
    try {
      const { data, error } = await supabase
        .from('waitlist')
        .select('id')
        .eq('email', email)
        .eq('status', 'active')
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error checking email in waitlist:', error);
        return false;
      }

      return !!data;
    } catch (error) {
      console.error('Error checking email in waitlist:', error);
      return false;
    }
  }

  // Unsubscribe
  async unsubscribeFromWaitlist(email: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('waitlist')
        .update({ status: 'unsubscribed' })
        .eq('email', email);

      if (error) {
        console.error('Error unsubscribing from waitlist:', error);
        throw new Error('Failed to unsubscribe. Please try again.');
      }
    } catch (error) {
      console.error('Error unsubscribing from waitlist:', error);
      throw new Error('Failed to unsubscribe. Please try again.');
    }
  }

  // Rate limiting check
  checkRateLimit(identifier: string) {
    return {
      allowed: !this.isRateLimited(),
      resetTime: this.isRateLimited() ? Date.now() + 5 * 60 * 1000 : undefined,
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
const supabaseWaitlistService = new SupabaseWaitlistService();

export const addToWaitlist = (data: WaitlistFormData) => supabaseWaitlistService.addToWaitlist(data);
export const getWaitlistCount = () => supabaseWaitlistService.getWaitlistCount();
export const getWaitlistStats = () => supabaseWaitlistService.getWaitlistStats();
export const isEmailInWaitlist = (email: string) => supabaseWaitlistService.isEmailInWaitlist(email);
export const unsubscribeFromWaitlist = (email: string) => supabaseWaitlistService.unsubscribeFromWaitlist(email);
export const checkRateLimit = (identifier: string) => supabaseWaitlistService.checkRateLimit(identifier);
export const clearRateLimit = () => supabaseWaitlistService.clearRateLimit();
