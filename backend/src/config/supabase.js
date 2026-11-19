import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseKey && 
  !supabaseUrl.includes('your-supabase') &&
  !supabaseKey.includes('your-anon-key')
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseKey, {
      auth: { persistSession: false }
    })
  : null;

if (isSupabaseConfigured) {
  console.log('[Supabase] Terhubung ke Supabase PostgreSQL:', supabaseUrl);
} else {
  console.log('[Supabase] Mode Fallback / Seed Aktif (Kredensial Supabase belum diatur di .env). Data diambil dari backend memory store.');
}
