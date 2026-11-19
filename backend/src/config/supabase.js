import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

let rawUrl = (process.env.SUPABASE_URL || '').trim();
if (rawUrl.endsWith('/rest/v1/')) {
  rawUrl = rawUrl.replace(/\/rest\/v1\/?$/, '');
} else if (rawUrl.endsWith('/rest/v1')) {
  rawUrl = rawUrl.replace(/\/rest\/v1$/, '');
}
if (rawUrl.endsWith('/')) {
  rawUrl = rawUrl.slice(0, -1);
}

const supabaseUrl = rawUrl;
const supabaseKey = (process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_KEY || '').trim();

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
