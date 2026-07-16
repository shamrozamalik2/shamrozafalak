import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

function createSupabaseClient() {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn(
      "Supabase env vars are missing — set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env (see .env.example)."
    );
    return null;
  }
  return createClient(supabaseUrl, supabaseAnonKey);
}

// `null` until real credentials are set in .env — consumers must handle that case rather than
// assuming the client always exists, so the rest of the site keeps working either way.
export const supabase = createSupabaseClient();
