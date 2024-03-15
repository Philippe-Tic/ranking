"use client"

import { useUserContext } from "@/components/AppContent";
import { Content } from "@/components/Content";
import { DataList, DataListCell, DataListRow, DataListText, DataListTextHeader } from "@/components/DataTable";
import { Header } from "@/components/Header";
import { InlineMessage } from "@/components/InlineMessage";
import { Page } from "@/components/Page";
import { getInvitesByUserId } from "@/services/invites";
import useSupabaseBrowser from "@/utils/supabase-browser";
import { Box, Button, ButtonGroup, Card, CardBody, CardFooter, Heading, Spinner, Stack, Text, VStack, useBreakpointValue, useToast } from "@chakra-ui/react";
import { useDeleteMutation, useInsertMutation, useQuery } from "@supabase-cache-helpers/postgrest-react-query";
import dayjs from "dayjs";

export default function Index() {
  const toast = useToast();
  const { user, refetchInvitesCount } = useUserContext();
  const supabase = useSupabaseBrowser();
  const isMobile = useBreakpointValue({ base: true, lg: false });
  const { data: invites, isLoading, isError } = useQuery(getInvitesByUserId(supabase, user?.id))
  const { mutateAsync: deleteInvite, isPending: isPendingDeleteInvite, isError: isErrorDeletingVote } = useDeleteMutation(
    supabase.from('invites'),
    ["id"],
    "",
    {}
  );
  const { mutateAsync: createVote, isPending: isPendingCreateVote, isError: isErrorCreateVote } = useInsertMutation(
    supabase.from('votes'),
    ["id"],
    "",
    {
      onSuccess() {
        toast({
          title: 'Vote disponible',
          status: 'success',
          duration: 3000,
        });
      }
    }
  );

  const handleAccept = (invite: any) => async () => {
    // TODO check if a vote already exists
    createVote([{
      user_id: user.id,
      project_id: invite.project_id,
    }])

    if (!isErrorCreateVote) {
      await deleteInvite({ id: invite.id })
      if (!isErrorDeletingVote) refetchInvitesCount()
    }
  }

  const handleDelete = (id: string) => async () => {
    await deleteInvite({ id })
    if (!isErrorDeletingVote) refetchInvitesCount()
  }

  return (
    <Page>
      <Header>
        <Heading>Invitations</Heading>
      </Header>
      <Content>
        {isLoading && <Spinner />}
        {isError && <Box>Une erreur est survenue dans la récupération des données</Box>}
        {!invites?.length && !isLoading && !isError && <InlineMessage title="Information" message="Vous n'avez pas d'invitation pour le moment" />}
        <VStack w="full" spacing="4">
          { isMobile && invites && !!invites?.length && invites.map(invite =>
            <Card w='full' key={invite.id}>
              <CardBody>
                <Stack spacing='3'>
                  <Heading size='lg'>{invite.project_name}</Heading>
                  <Text>
                    {invite.emitter}
                  </Text>
                  <Text>
                    {dayjs(invite.created_at).format('DD-MM-YYYY')}
                  </Text>
                </Stack>
              </CardBody>
              <CardFooter w="full" pt="0">
                <ButtonGroup>
                  <Button variant='solid' colorScheme='green' onClick={handleAccept(invite)}>Accepter</Button>
                  <Button variant='solid' colorScheme='red' onClick={handleDelete(invite?.id)}>Refuser</Button>
                </ButtonGroup>
              </CardFooter>
            </Card>
          )}
        </VStack>

        {!isMobile && !!invites?.length && (
          <DataList minH='5rem'>
            <DataListRow>
              <DataListCell flex={1.2}>
                <DataListTextHeader>Nom</DataListTextHeader>
              </DataListCell>
              <DataListCell flex={0.8}>
                <DataListTextHeader>Émetteur</DataListTextHeader>
              </DataListCell>
              <DataListCell flex={0.5} align="end">
                <DataListTextHeader>Date</DataListTextHeader>
              </DataListCell>
              <DataListCell align="end">
                <DataListTextHeader>Actions</DataListTextHeader>
              </DataListCell>
            </DataListRow>
            {invites.map(invite => <DataListRow key={invite.id}>
              <DataListCell flex={1.2}>
                <DataListText fontWeight="bold">{invite.project_name}</DataListText>
              </DataListCell>
              <DataListCell flex={0.8}>
                <DataListText>{invite.emitter}</DataListText>
              </DataListCell>
              <DataListCell flex={0.5} align="end">
                <DataListText>{dayjs(invite.created_at).format('DD-MM-YYYY')}</DataListText>
              </DataListCell>
              <DataListCell align="end">
                <ButtonGroup>
                  <Button size='sm' variant='solid' colorScheme='green' onClick={handleAccept(invite)}>Accepter</Button>
                  <Button size='sm' variant='solid' colorScheme='red' onClick={handleDelete(invite?.id)}>Refuser</Button>
                </ButtonGroup>
              </DataListCell>
            </DataListRow>)}
          </DataList>
        )}
      </Content>
    </Page>
  );
}
