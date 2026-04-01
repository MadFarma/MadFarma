import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing SUPABASE_URL or SUPABASE_ANON_KEY');
  console.log('Available env vars:', Object.keys(process.env).filter(k => k.includes('SUPABASE')));
}

export const supabase = createClient(supabaseUrl, supabaseKey);

export async function listTables() {
  const { data, error } = await supabase
    .from('pg_tables')
    .select('tablename')
    .eq('schemaname', 'public');
  
  if (error) {
    console.log('Cannot list tables, trying alternative...');
    return null;
  }
  return data;
}