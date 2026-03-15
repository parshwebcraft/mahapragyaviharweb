import { createSupabaseBrowserClient } from "@/supabase/client";

export async function signInWithOtp(email: string) {
  const supabase = createSupabaseBrowserClient();

  return supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/admin`
    }
  });
}
