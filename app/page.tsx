"use client"

import { useUserContext } from "@/components/AppContent";
import { Logo } from "@/components/Logo";
import { Link as ChakraLink } from "@chakra-ui/next-js";
import { Button, Center, Flex, HStack, Heading, Icon, IconButton, Image, SimpleGrid, Spacer, Stack, Text, VStack, useBreakpointValue } from "@chakra-ui/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FaDiscord } from "react-icons/fa6";


export default function Index() {
  const { user, signIn } = useUserContext();
  if (user) redirect("/projects");
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Stack spacing='8' px={{ base: 4, sm: 8, md: 16 }} pt={6} borderTop='4px solid' borderColor='white' minH='100vh' w='100%' backgroundImage='url(/bg.png)' backgroundSize='100%' backgroundRepeat='no-repeat'>
      <HStack spacing={4}>
        <Link href='/'>
          <Logo color='blue.800' />
        </Link>
        <Spacer />
        {
          isMobile ?
            <IconButton variant="solid" colorScheme="blue" aria-label="Connect with discord" onClick={() => signIn()} icon={<Icon as={FaDiscord} />} />
            :
            <Button aria-label="Connect with discord" variant="solid" colorScheme="blue" onClick={() => signIn()} leftIcon={<FaDiscord />}>Connexion via Discord</Button>
        }
      </HStack>

      <SimpleGrid columns={{base: 1, md: 2}}>
        <VStack alignItems='start' justifyContent='center' h='70vh' spacing='6'>
          <Heading as="h1" fontSize="5xl" fontWeight="600" letterSpacing='0.5px'>Créez vos ranks, faîtes voter les autres et publiez les résultats !</Heading>
          <Text as="h2" fontSize='xl'>RangeRank vous permet de créer des projets afin de mettre en place vos listes de votes, puis de les partager via l'application aux membres inscrits et de voir les résultats des votes une fois terminé !</Text>
          <Button size='lg' onClick={() => signIn()} w='fit-content'>Je m'inscris !</Button>
        </VStack>
        {!isMobile &&
        <Center justifyContent='end'>
          <Image w='full' src='/mockup.png' alt='' />
        </Center>
        }
      </SimpleGrid>

      <Flex py='4' flex='1' alignItems='end'>
        <Stack direction={{base: 'column', sm: 'row'}} w='full'>
          <Text>RangeRank, made with ❤️ by <ChakraLink href='https://twitter.com/NOOTNOOT_BOY' target='_blank'>Pilip</ChakraLink></Text>
          <Spacer />
          <Text>2024 - Still in development 🚀</Text>
        </Stack>
      </Flex>

    </Stack>
  );
}
