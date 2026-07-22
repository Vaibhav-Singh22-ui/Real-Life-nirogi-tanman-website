import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = (typeof process !== 'undefined' ? (process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL) : '') || 'https://ybqnauibeoqdonzcmhpk.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = (typeof process !== 'undefined' ? (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.VITE_SUPABASE_PUBLISHABLE_KEY) : '') || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlicW5hdWliZW9xZG9uemNtaHBrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ3MjUwODQsImV4cCI6MjEwMDMwMTA4NH0.phKlV4ldqdhF2RfUoEu9gf829hNXsNpjanrROACY6gE';

export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY,
  {
    auth: {
      storage: typeof window !== 'undefined' ? window.localStorage : undefined,
      persistSession: true,
      autoRefreshToken: true,
    }
  }
);
