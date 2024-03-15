import { TypedSupabaseClient } from '@/utils/types';
import { UUID } from 'crypto';

export const getProjectsByUserId = (client: TypedSupabaseClient, userId: UUID, from: number, to: number) => {
  return client
    .from('projects')
    .select('id, title, description, image, created_at', { count: 'exact' })
    .eq('created_by', userId)
    .range(from, to)
    .throwOnError()
}

export const getProjectById = (client: TypedSupabaseClient, projectId: UUID) => {
  return client
    .from('projects')
    .select('id, title, description, image, created_at, votes_raw')
    .eq('id', projectId)
    .limit(1)
    .single()
    .throwOnError()
}

export const getRawVote = (client: TypedSupabaseClient, voteId: UUID) => {
  return client
    .from('projects')
    .select('votes!inner(project_id), votes_raw')
    .eq('votes.id', voteId)
    .limit(1)
    .single()
    .throwOnError()
}