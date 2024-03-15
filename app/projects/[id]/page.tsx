"use client"

import { Content } from "@/components/Content";
import { Header } from "@/components/Header";
import { InlineMessage } from "@/components/InlineMessage";
import ListVotesRaw from "@/components/ListVotesRaw";
import { Page } from "@/components/Page";
import { UserCard } from "@/components/UserCard";
import { getInvitesByProjectId } from "@/services/invites";
import { getProjectById } from "@/services/projects";
import { getUserBySearch } from "@/services/users";
import { getVotesStatusDoingByProjectId, getVotesStatusDoneByProjectId, getVotesStatusTodoByProjectId } from "@/services/votes";
import { useDebounce } from "@/utils/debounce";
import { VotesType, renderResult } from "@/utils/result";
import useSupabaseBrowser from "@/utils/supabase-browser";
import { Button, Card, Center, Flex, GridItem, HStack, Heading, Icon, IconButton, Image, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, SimpleGrid, Spacer, Spinner, Tab, TabList, TabPanel, TabPanels, Tabs, Text, VStack, useDisclosure } from "@chakra-ui/react";
import { useQuery } from "@supabase-cache-helpers/postgrest-react-query";
import { UUID } from "crypto";
import dayjs from "dayjs";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { FaArrowLeft, FaMedal } from "react-icons/fa6";

export default function Index() {
  const supabase = useSupabaseBrowser();
  const { id: projectId } = useParams<{ id: UUID; }>();
  const [searchString, setSearchString] = useState('');
  const searchQuery = useDebounce(searchString, 1000);
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { data: invites, count: countInvites } = useQuery(getInvitesByProjectId(supabase, projectId))
  const { data: votesTodo, count: countVotesTodo } = useQuery(getVotesStatusTodoByProjectId(supabase, projectId))
  const { data: votesDoing, count: countVotesDoing } = useQuery(getVotesStatusDoingByProjectId(supabase, projectId))
  const { data: votesDone, count: countVotesDone } = useQuery(getVotesStatusDoneByProjectId(supabase, projectId))
  const { data: project, isLoading: isLoadingProject, isError: isErrorProject } = useQuery(getProjectById(supabase, projectId))
  const { data: users, isLoading: isLoadingUsers, isError: isErrorUsers } = useQuery(getUserBySearch(supabase, searchQuery))

  const init = votesTodo || []
  const votes = init.concat(votesDoing || []).concat(votesDone || [])

  return (
    <Page>
      <Header alignItems="center">
        <HStack>
          <IconButton onClick={() => {router.push('/projects')}} variant='tertiary' aria-label='retour' icon={<Icon as={FaArrowLeft} />} />
          <Heading>Détail projet</Heading>
        </HStack>
        <Spacer />
        <Button onClick={onOpen} size={{ base: 'sm', md: 'md' }}>Voir le résultat</Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              <Flex w="full" justifyContent="space-between" alignItems="center">
                <Icon as={FaMedal} />
                <Heading>Résultat</Heading>
                <Icon as={FaMedal} />
              </Flex>
            </ModalHeader>
            <ModalBody>
              <VStack w="full" spacing="4">
                {renderResult(votesDone as unknown as VotesType).map((result, index) => (
                  <HStack key={result.name} w="full">
                    <Text>{index + 1} - </Text>
                    <Text>{result.name}</Text>
                    <Spacer />
                    <Text>{result.points} pts</Text>
                  </HStack>
                ))}
              </VStack>
            </ModalBody>
            <ModalFooter>
              <VStack w="full">
                <Button onClick={onClose} w="full">Fermer</Button>
              </VStack>
            </ModalFooter>
          </ModalContent>

        </Modal>
      </Header>
      <Content px={{base: 2, sm: 4}}>
        <Tabs>
          <TabList>
            <Tab>Informations</Tab>
            <Tab>Votes</Tab>
            <Tab>Invitations</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <VStack w="full" alignItems="center" spacing="4">
                <Card overflow="hidden" flexDir="row" h="10rem" w="full">
                  {project?.image && (
                    <Image w="20rem" maxW="33%" src={project?.image} alt="" objectFit="cover" />
                  )}
                  <Center gap="2" flexDirection="column" h="full" w="full" px="8" margin="auto" alignItems="flex-start">
                    <Heading noOfLines={1}>{project?.title}</Heading>
                    <Text noOfLines={2}>{project?.description}</Text>
                    <Text noOfLines={1}>{dayjs(project?.created_at).format('DD-MM-YYYY')}</Text>
                  </Center>

                </Card>
                <SimpleGrid w="full" columns={{base: 1, sm: 2, md: 2, lg: 3}} spacing='4'>
                  <Card py="4">
                    <Center flex="1">
                      <VStack>
                        <Heading>{countInvites}</Heading>
                        <Heading fontSize="1.5rem">Personnes invitées</Heading>
                      </VStack>
                    </Center>
                  </Card>
                  <Card py="4">
                    <Center flex="1">
                      <VStack>
                        <Heading>{(countVotesTodo || 0) + (countVotesDoing || 0)}</Heading>
                        <Heading fontSize="1.5rem">Votes en cours</Heading>
                      </VStack>
                    </Center>
                  </Card>
                  <GridItem colSpan={{base: 2, lg: 1}}>
                    <Card py="4">
                      <Center flex="1">
                        <VStack>
                          <Heading>{countVotesDone}</Heading>
                          <Heading fontSize="1.5rem">Votes terminés</Heading>
                        </VStack>
                      </Center>
                    </Card>
                  </GridItem>
                </SimpleGrid>
              </VStack>

            </TabPanel>
            <TabPanel>
              <SimpleGrid gap={4} columns={{ base: 1, md: 2 }}>
                <InlineMessage title="Informations" message="La liste de vote n'est pas modifiable. Si vous voulez voter, merci de vous inviter vous-même." />
                {project?.votes_raw && (
                  <ListVotesRaw votes={project?.votes_raw} />
                )}
              </SimpleGrid>
            </TabPanel>
            <TabPanel>
              <Input value={searchString} onChange={(e) => setSearchString(e.target.value)} />
              {isLoadingUsers && <Spinner />}
              {isErrorUsers && <InlineMessage status="error" title="Erreur" message="Une erreur est survenue lors de la récupération des utilisateurs" />}
              {users && users.map((user) => (
                <UserCard
                  key={user.id}
                  invites={invites}
                  votes={votes}
                  projectId={project?.id || ''}
                  projectTitle={project?.title || ''}
                  id={user.id} global_name={user.global_name} picture={user.picture} full_name={user.full_name}
                />
              ))}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Content>
    </Page>
  );
}
