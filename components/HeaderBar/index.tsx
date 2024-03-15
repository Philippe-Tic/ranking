import { useUserContext } from "@/components/AppContent";
import { Logo } from "@/components/Logo";
import { Link } from "@chakra-ui/next-js";
import { Avatar, Button, HStack, Heading, Popover, PopoverContent, PopoverTrigger, Portal, Spacer, Spinner, VStack, useTheme } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export const HeaderBar = () => {
  const { user, isLoading, signIn, signOut } = useUserContext();
  const router = useRouter();
  const theme = useTheme();

  return (
    <HStack
      as="nav"
      bg="blue.900"
      alignItems="center"
      p="4"
    >
      <Link href="/projects">
        <Logo h='2rem' />
      </Link>
      <Spacer />
      <Popover
        placement='bottom-end'
      >
        <PopoverTrigger>
          <HStack
            as={Button}
            position='relative'
            h='fit-content'
            spacing={4}
            color="brand.500"
            border='1px'
            borderColor='transparent'
            bg={`linear-gradient(${theme.colors.gray[800]} 0%, ${theme.colors.gray[800]} 50%, ${theme.colors.gray[800]} 100%) padding-box,
              linear-gradient(#364675 0%, #07090F 100%) border-box`}
            px='4'
            py='1'
            borderRadius="md"
            cursor="pointer"
            transition="0.2s ease"
            _hover={{
              bg:`linear-gradient(${theme.colors.gray[900]} 0%, ${theme.colors.gray[900]} 50%, ${theme.colors.gray[900]} 100%) padding-box,
              linear-gradient(#FFD90F 0%, #7A4E1B 100%) border-box`
            }}
          >
            {isLoading && <Spinner />}
            <Avatar size="sm" src={user?.user_metadata?.avatar_url} />
            <VStack maxW="full" overflow='hidden' spacing='0' alignItems="flex-start" w="full">
              <Heading maxW='full' overflow='hidden' whiteSpace='nowrap' textOverflow='ellipsis' color="white" fontSize="1.2rem">{user?.user_metadata?.full_name}</Heading>
              <Heading maxW='full' overflow='hidden' whiteSpace='nowrap' textOverflow='ellipsis' color="white" fontSize="1.1rem">{user?.user_metadata?.custom_claims.global_name}</Heading>
            </VStack>
          </HStack>

        </PopoverTrigger>
        <Portal>
          <PopoverContent overflow='hidden' w="fit-content">
            <VStack spacing='0' w='13rem'>
              {/* <Button size='md' variant='menu' onClick={() => { router.push('/profile') }} borderRadius="none" background="white" w='full' justifyContent='flex-start'>Profile</Button> */}
              <Button size='md' variant='menu' onClick={() => signOut()} borderRadius="none" background="white" w='full' justifyContent='flex-start'>Déconnexion</Button>
            </VStack>
          </PopoverContent>
        </Portal>
      </Popover>

    </HStack>
  );
};
