import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const envPath = path.join(process.cwd(), '.env');
const envFile = fs.readFileSync(envPath, 'utf-8');
const envVars = Object.fromEntries(
  envFile.split('\n').filter(Boolean).map(line => line.split('='))
);

const supabaseUrl = envVars.SUPABASE_URL;
const supabaseKey = envVars.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing SUPABASE_URL or SUPABASE_ANON_KEY');
  process.exit(1);
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