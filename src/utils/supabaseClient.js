import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
    import.meta.env.VITE_PUBLIC_SUPABASE_URL,
    import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY,
    {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    }
);
