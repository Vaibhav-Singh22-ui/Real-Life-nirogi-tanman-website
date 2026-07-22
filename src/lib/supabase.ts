import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://ybqnauibeoqdonzcmhpk.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlicW5hdWliZW9xZG9uemNtaHBrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ3MjUwODQsImV4cCI6MjEwMDMwMTA4NH0.phKlV4ldqdhF2RfUoEu9gf829hNXsNpjanrROACY6gE";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});
