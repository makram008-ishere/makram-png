import { createServerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { Database } from '@/types/supabase';

export async function getAdminSession() {
  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '',
    {
      cookies: {
        getAll: () => cookies().getAll().map((cookie) => ({ name: cookie.name, value: cookie.value })),
      },
    }
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return session;
}
