"use client"

import { useUserContext } from "@/components/AppContent";
import { Content } from "@/components/Content";
import { Header } from "@/components/Header";
import { Page } from "@/components/Page";
import { getVotesByUserId } from "@/services/votes";
import useSupabaseBrowser from "@/utils/supabase-browser";
import { voteDisplay } from "@/utils/votes";
import { Link } from "@chakra-ui/next-js";
import { Box, Button, Card, CardBody, CardFooter, Heading, Image, SimpleGrid, Spinner, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, Tag, Text } from "@chakra-ui/react";
import { useQuery } from "@supabase-cache-helpers/postgrest-react-query";

export default function Index() {
  const { user } = useUserContext();
  const supabase = useSupabaseBrowser();
  const { data: votes, isLoading, isError } = useQuery(getVotesByUserId(supabase, user?.id))

  return (
    <Page>
      <Header>
        <Heading>Votes</Heading>
      </Header>
      <Content>

        <Tabs>
          <TabList>
            <Tab>À faire / En cours</Tab>
            <Tab>Terminé</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              {isLoading && <Spinner />}
              {isError && <Box>Une erreur est survene dans la récupération des données</Box>}
              {votes && !votes.filter((vote) => vote.status === "todo" || vote.status === "doing") && <Box>Vous n'avez pas de vote à faire ou en cours</Box>}
              <SimpleGrid columns={{base: 1, sm: 2, lg: 3}} gap={4}>
                {votes && votes.filter((vote) => vote.status === "todo" || vote.status === "doing").map((vote) => (
                  <Card maxW='md' key={vote.id}>
                    <CardBody>
                      <Image
                        src={vote.projects.image || ''}
                        alt='Green double couch with wooden legs'
                        borderRadius='lg'
                        h="10rem"
                        w="full"
                        objectFit="cover"
                      />
                      <Stack mt='6' spacing='3'>
                        <Tag size="md" fontWeight="bold" w="fit-content" colorScheme={voteDisplay[vote.status].color}>{voteDisplay[vote.status].title}</Tag>
                        <Heading size='lg'>{vote.projects.title}</Heading>
                        <Text>
                          {vote.projects.description}
                        </Text>
                      </Stack>
                    </CardBody>
                    <CardFooter w="full" pt="0">
                      <Button as={Link} href={`/votes/${vote.id}`} w="full" variant='primary'>
                    Voter
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </SimpleGrid>
            </TabPanel>
            <TabPanel>
              <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} gap={4}>
                {isLoading && <Spinner />}
                {isError && <Box>Une erreur est survene dans la récupération des données</Box>}
                {votes && !votes.filter((vote) => vote.status === "done") && <Box>Vous n'avez pas de vote terminé</Box>}
                {votes && votes.filter((vote) => vote.status === "done").map((vote) => (
                  <Card maxW='md' key={vote.id}>
                    <CardBody>
                      <Image
                        src={vote.projects.image || ''}
                        alt='Green double couch with wooden legs'
                        borderRadius='lg'
                        h="10rem"
                        w="full"
                        objectFit="cover"
                      />
                      <Stack mt='6' spacing='3'>
                        <Tag size="md" fontWeight="bold" w="fit-content" colorScheme={voteDisplay[vote.status].color}>{voteDisplay[vote.status].title}</Tag>
                        <Heading size='lg'>{vote.projects.title}</Heading>
                        <Text>
                          {vote.projects.description}
                        </Text>
                      </Stack>
                    </CardBody>
                    <CardFooter w="full" pt="0">
                      <Button as={Link} href={`/votes/${vote.id}`} w="full" variant='primary'>
                        Voir mon vote
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </SimpleGrid>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Content>
    </Page>
  );
}
