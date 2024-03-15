import { useUserContext } from "@/components/AppContent";
import { Logo } from "@/components/Logo";
import { Link, LinkProps } from "@chakra-ui/next-js";
import { Avatar, Box, Button, Flex, HStack, Heading, Icon, Popover, PopoverContent, PopoverTrigger, Spinner, StackProps, Text, VStack, useTheme } from "@chakra-ui/react";
import { usePathname, useRouter } from "next/navigation";
import { IconType } from "react-icons";
import { FaBarsStaggered, FaMedal, FaPaperPlane } from "react-icons/fa6";

const NavbarItem = ({ counter, label, isActive = false, icon, ...rest }: { counter?: number | null, label: string, isActive?: boolean, icon: IconType } & StackProps & LinkProps) => {
  const theme = useTheme();
  return (
    <HStack cursor="pointer" px='8' w="full" py="4" spacing="4"
      _hover={{
        background: 'blue.800',
        textDecor:'none'
      }}
      transition="0.2s ease"
      {...rest}>
      <Flex borderRadius="md" alignItems="center" justifyContent="center" p="2"
        border='1px'
        borderColor='transparent'
        bg={`linear-gradient(${theme.colors.gray[800]} 0%, ${theme.colors.gray[800]} 50%, ${theme.colors.gray[800]} 100%) padding-box,
          linear-gradient(${isActive ? '#FFD90F' : '#364675'} 0%, ${isActive ? '#7A4E1B': '#07090F'} 100%) border-box`}
      >
        <Icon boxSize="5" as={icon} color={isActive ? 'yellow.200' : 'whiteAlpha.800'} />
      </Flex>
      <Heading fontSize='1.75rem' fontWeight="regular" color={isActive ? 'yellow.500' : 'white'}>{label}</Heading>
      {
        counter && (
          <Flex background="red.500" color="white" w="6" alignItems="center" justifyContent="center" borderRadius="100%">
            <Text color="white">
              {counter}
            </Text>
          </Flex>
        )
      }
    </HStack>
  )
}

export const Navbar = () => {
  const { invitesCount, user, isLoading, signOut } = useUserContext();
  const pathname = usePathname();
  const slug = pathname.split('/')[1] as 'projects' | 'votes' | 'invites' | undefined;
  const router = useRouter();
  const theme = useTheme();

  return (
    <VStack
      as="nav"
      position='sticky'
      top="0"
      h='100vh'
      bg="blue.900"
      alignItems="center"
      justifyContent="space-between"
      py='10'
    >
      <Link href="/projects">
        <Logo px='8' />
      </Link>
      <VStack w="full" spacing="4">
        <NavbarItem as={Link} href='/projects' icon={FaMedal} label="Projets" isActive={slug === 'projects'} />
        <NavbarItem as={Link} href='/votes' icon={FaBarsStaggered} isActive={slug === 'votes'} label="Votes" />
        <NavbarItem counter={invitesCount} as={Link} href='/invites' icon={FaPaperPlane} isActive={slug === 'invites'} label="Invitations" />
      </VStack>
      <Popover
        placement='top'
      >
        <PopoverTrigger>
          <Box w='full' px='8'>
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
              px='6'
              py='4'
              borderRadius="md"
              cursor="pointer"
              transition="0.2s ease"
              _hover={{
                bg:`linear-gradient(${theme.colors.gray[900]} 0%, ${theme.colors.gray[900]} 50%, ${theme.colors.gray[900]} 100%) padding-box,
              linear-gradient(#FFD90F 0%, #7A4E1B 100%) border-box`
              }}
              w='full'
            >
              {isLoading && <Spinner />}
              <Avatar size="md" src={user?.user_metadata?.avatar_url} />
              <VStack alignItems="flex-start" w="full">
                <Heading color="white" fontSize="1.25rem">{user?.user_metadata?.full_name}</Heading>
                <Heading color="white" fontSize="1.125rem">{user?.user_metadata?.custom_claims.global_name}</Heading>
              </VStack>
            </HStack>
          </Box>
        </PopoverTrigger>
        <PopoverContent  overflow='hidden' w="fit-content">
          <VStack spacing='0' w='13rem'>
            {/* <Button variant='menu' onClick={() => { router.push('/profile') }} borderRadius="none" background="white" w='full' justifyContent='flex-start'>Profile</Button> */}
            <Button variant='menu' onClick={() => signOut()} borderRadius="none" background="white" w='full' justifyContent='flex-start'>Déconnexion</Button>
          </VStack>
        </PopoverContent>
      </Popover>
    </VStack>
  );
};
