"use client"

import { useUserContext } from "@/components/AppContent";
import { Content } from "@/components/Content";
import { Header } from "@/components/Header";
import { Page } from "@/components/Page";
import ProjectCard from "@/components/ProjectCard";
import { getProjectsByUserId } from "@/services/projects";
import useSupabaseBrowser from "@/utils/supabase-browser";
import { usePagination } from "@/utils/usePagination";
import { Link } from "@chakra-ui/next-js";
import { Button, Heading, SimpleGrid, Spacer, Spinner, Text } from "@chakra-ui/react";
import { useQuery } from "@supabase-cache-helpers/postgrest-react-query";
import { useState } from "react";

export default function Index() {
  const { user } = useUserContext();
  const supabase = useSupabaseBrowser();

  // TODO: URL ?
  const [page, setPage] = useState(0);
  const { from, to } = usePagination(page);
  const { data: projects, count, isLoading, isError } = useQuery(getProjectsByUserId(supabase, user?.id, from, to));
  const isLastPage = count ? count <= to : false;

  return (
    <Page>
      <Header>
        <Heading>Projects</Heading>
        <Spacer />
        <Button as={Link} href="/projects/new">Nouveau projet</Button>
      </Header>
      {isError && <Text>Une erreur est survenue</Text>}
      {isLoading && <Spinner />}
      {!isLoading && projects?.length === 0 && <Text>No projects</Text>}
      {!isLoading && projects?.length && (
        <Content>
          <SimpleGrid w="full" columns={{ base: 1, sm: 2, lg: 3 }} spacing="4">
            {
              projects?.map((project) => (
                <ProjectCard key={project?.id} project={project} />
              ))
            }
          </SimpleGrid>
        </Content>
      )}
    </Page>
  );
}
