import { TypedSupabaseClient } from '@/utils/types';
import { UUID } from 'crypto';

export const getInvitesByUserId = (client: TypedSupabaseClient, userId: UUID) => {
  return client
    .from('invites')
    .select('id, status, target_user_id, emitter, project_id, project_name, created_at')
    .eq('target_user_id', userId)
    .throwOnError()
}

export const getInvitesCount = (client: TypedSupabaseClient, userId: UUID) => {
  return client
    .from('invites')
    .select('id', { count: 'exact' })
    .eq('target_user_id', userId)
    .throwOnError()
}

export const getInvitesByProjectId = (client: TypedSupabaseClient, projectId: UUID) => {
  return client
    .from('invites')
    .select('id, target_user_id', { count: 'exact' })
    .eq('project_id', projectId)
    .throwOnError()
}