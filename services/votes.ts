import { TypedSupabaseClient } from '@/utils/types';
import { UUID } from 'crypto';

export const getVotesByUserId = (client: TypedSupabaseClient, userId: UUID) => {
  return client
    .from('votes')
    .select('projects!inner(id, title, description, image), id, project_id, created_at, status')
    .eq('user_id', userId)
    .throwOnError()
}

export const getVote = (client: TypedSupabaseClient, voteId: UUID) => {
  return client
    .from('votes')
    .select('vote, status')
    .eq('id', voteId)
    .limit(1)
    .single()
    .throwOnError()
}

export const getVotesStatusDoingByProjectId = (client: TypedSupabaseClient, projectId: UUID) => {
  return client
    .from('votes')
    .select('id, vote, user_id', { count: 'exact' })
    .eq('project_id', projectId)
    .eq('status', 'doing')
    .throwOnError()
}

export const getVotesStatusTodoByProjectId = (client: TypedSupabaseClient, projectId: UUID) => {
  return client
    .from('votes')
    .select('id, vote, user_id', { count: 'exact' })
    .eq('project_id', projectId)
    .eq('status', 'todo')
    .throwOnError()
}

export const getVotesStatusDoneByProjectId = (client: TypedSupabaseClient, projectId: UUID) => {
  return client
    .from('votes')
    .select('id, vote, user_id', { count: 'exact' })
    .eq('project_id', projectId)
    .eq('status', 'done')
    .throwOnError()
}