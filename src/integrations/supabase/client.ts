
// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://fizukkertzehftrqfoyp.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZpenVra2VydHplaGZ0cnFmb3lwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI2NDg2MjYsImV4cCI6MjA1ODIyNDYyNn0.cctkAG5ZMC0v2juRMu1Q0VvWRt-JSPhpD-pAvN76cOc";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
