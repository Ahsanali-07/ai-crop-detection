// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://julagxknewuhelxlblgp.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp1bGFneGtuZXd1aGVseGxibGdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE4MDIxMzYsImV4cCI6MjA1NzM3ODEzNn0.2e1RDvJl5zmuK4mmVjWKAudsW_FwI7jWoZTVD_JpMAY";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);