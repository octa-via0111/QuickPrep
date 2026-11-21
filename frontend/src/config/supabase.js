import { createClient } from '@supabase/supabase-js';

const getEnv = (key, fallback = '') => {
  try {
    if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env[key]) {
      return import.meta.env[key];
    }
  } catch (e) {}
  try {
    if (typeof process !== 'undefined' && process.env && process.env[key]) {
      return process.env[key];
    }
  } catch (e) {}
  return fallback;
};

const supabaseUrl = (getEnv('VITE_SUPABASE_URL', 'https://dnhlngwxepicvugxbeee.supabase.co')).trim();
const supabaseAnonKey = (getEnv('VITE_SUPABASE_ANON_KEY', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRuaGxuZ3d4ZXBpY3Z1Z3hiZWVlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTUwNTYzODEsImV4cCI6MjExMDYzMjM4MX0.bXV0mrxEJRXAjdYiPUeGn5HjukaMJC9Oe7K3bHvBp9o')).trim();

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  !supabaseUrl.includes('your-project')
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: { persistSession: true }
    })
  : null;

export default supabase;
