import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://vefcnledexjibztvsjwy.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZlZmNubGVkZXhqaWJ6dHZzand5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkyNzU3ODcsImV4cCI6MjA3NDg1MTc4N30.8fPRi1PTHNmw791L2rpiH0fHbag2YdlmOMfMiJW3AQo';

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
