import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
const anon = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

/** اگر env تنظیم نشده باشد null است و اپ به localStorage برمی‌گردد */
export const isSupabaseConfigured = Boolean(url && anon && !url.includes('YOUR_'))

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(url!, anon!)
  : null
