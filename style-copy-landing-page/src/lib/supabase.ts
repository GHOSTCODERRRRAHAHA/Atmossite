import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false, // We don't need auth for waitlist
    autoRefreshToken: false,
  },
});

// Database types
export interface WaitlistEntry {
  id: string;
  email: string;
  name: string;
  created_at: string;
  updated_at: string;
  source?: string;
  referrer?: string;
  user_agent?: string;
  ip_address?: string;
  status: 'active' | 'notified' | 'converted' | 'unsubscribed';
  metadata?: Record<string, any>;
}

export interface WaitlistStats {
  total_count: number;
  recent_count: number; // Last 24 hours
  growth_rate: number; // Percentage growth
  top_sources: Array<{ source: string; count: number }>;
}
