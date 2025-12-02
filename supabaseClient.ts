// supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY ?? '';

if (!supabaseUrl) {
  // Prevent runtime crash in browser and help debugging
  console.warn('VITE_SUPABASE_URL is missing. Add it to your env.');
}
if (!supabaseAnonKey) {
  console.warn('VITE_SUPABASE_ANON_KEY is missing. Add it to your env.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
