import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const NEON_BACKEND_URL = 
  import.meta.env.VITE_SUPABASE_URL || 
  "https://ep-wild-queen-an6ps5hl.apirest.c-6.us-east-1.aws.neon.tech/neondb";

const NEON_ANON_KEY = 
  import.meta.env.VITE_SUPABASE_ANON_KEY || 
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF5aXl2dndjd2FndWlvbGp6YW5pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYzODc2MzAsImV4cCI6MjA2MTk2MzYzMH0.P2eVh713gSNY9fmKbh0OOvYSIf-_xrp-xB9q5Q5J-pM";

export const supabase = createClient<Database>(NEON_BACKEND_URL, NEON_ANON_KEY);