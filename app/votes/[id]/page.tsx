"use client"

import { Content } from "@/components/Content";
import { Header } from "@/components/Header";
import { MyRanks, VoteProps } from "@/components/MyRanks";
import { Page } from "@/components/Page";
import { getRawVote } from "@/services/projects";
import { getVote } from "@/services/votes";
import useSupabaseBrowser from "@/utils/supabase-browser";
import { HStack, Heading, Icon, IconButton, Spinner } from "@chakra-ui/react";
import { useQuery } from "@supabase-cache-helpers/postgrest-react-query";
import { UUID } from "crypto";
import { useParams, useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa6";

export default function Index() {
  const supabase = useSupabaseBrowser();
  const router = useRouter();
  const { id: voteId } = useParams<{ id: UUID; }>()
  const { data: votes, isLoading: isLoadingVotes, isError: isErrorVotes } = useQuery(getVote(supabase, voteId))
  const { data: projectData, isLoading: isLoadingVoteRaw, isError: isErrorVoteRaw } = useQuery(getRawVote(supabase, voteId), {
    enabled: votes?.status === 'todo',
  })

  const isLoading = isLoadingVotes || isLoadingVoteRaw;
  const votesRaw = projectData?.votes_raw?.map((id: string, index: number) => ({ id, rank: index + 1 }))

  const vote = votes?.vote as VoteProps[] || votesRaw;

  return (
    <Page>
      <Header>
        <HStack>
          <IconButton onClick={() => {router.push('/votes')}} variant='tertiary' aria-label='retour' icon={<Icon as={FaArrowLeft} />} />
          <Heading>Detail Vote</Heading>
        </HStack>
      </Header>
      <Content>
        {isLoading && <Spinner />}
        {!isLoading && vote && (
          <MyRanks status={votes?.status} vote={vote} voteId={voteId} />
        )}
      </Content>

    </Page>
  );
}
