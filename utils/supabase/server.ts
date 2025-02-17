import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

export const createClient = () => {
  const cookieStore = cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll().map((cookie) => ({
          name: cookie.name,
          value: cookie.value,
        })),
        setAll: (cookies) => {
          cookies.forEach(({ name, value, ...options }) => {
            cookieStore.set({ name, value, ...options })
          })
        },
      },
    }
  )
} 