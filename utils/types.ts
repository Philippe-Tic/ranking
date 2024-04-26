import type { Database } from '@/utils/database.types'
import { SupabaseClient } from '@supabase/supabase-js'

export type TypedSupabaseClient = SupabaseClient<Database>
