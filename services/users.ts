import { TypedSupabaseClient } from '@/utils/types';

export const getUserBySearch = (client: TypedSupabaseClient, search: string) => {
  return client
    .from('users')
    .select('id, full_name, email, global_name, picture')
    .ilike('full_name', `%${search}%`)
    .throwOnError()
}
