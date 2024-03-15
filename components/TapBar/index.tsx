import { useUserContext } from "@/components/AppContent";
import { Link, LinkProps } from "@chakra-ui/next-js";
import { Flex, HStack, Heading, Icon, StackProps, Text, VStack, useTheme } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import { IconType } from "react-icons";
import { FaBarsStaggered, FaMedal, FaPaperPlane } from "react-icons/fa6";

const TapBarItem = ({ counter, label, isActive = false, icon, ...rest }: { counter?: number | null, label: string, isActive?: boolean, icon: IconType } & StackProps & LinkProps) => {
  const theme = useTheme();
  return (
    <VStack cursor="pointer" px='8' py='4' w="full" h='full' spacing="1"
      _hover={{
        background: 'gray.900',
        textDecor:'none'
      }}
      transition="0.2s ease"
      {...rest}>
      <Flex borderRadius="md" alignItems="center" justifyContent="center" p="2"
        border='1px'
        borderColor='transparent'
        bg={`linear-gradient(${theme.colors.gray[800]} 0%, ${theme.colors.gray[800]} 50%, ${theme.colors.gray[800]} 100%) padding-box,
          linear-gradient(${isActive ? '#FFD90F' : '#364675'} 0%, ${isActive ? '#7A4E1B' : '#07090F'} 100%) border-box`}
        position='relative'
      >
        {
          !!counter && (
            <Flex position="absolute" top="0.8rem" left="1.4rem" background="red.500" color="white" w="6" alignItems="center" justifyContent="center" borderRadius="100%">
              <Text color="white">
                {counter}
              </Text>
            </Flex>
          )
        }
        <Icon boxSize="4" as={icon} color={isActive ? 'yellow.200' : 'whiteAlpha.800'} />
      </Flex>
      <Heading fontSize='1rem' fontWeight="regular" color={isActive ? 'yellow.500' : 'white'}>{label}</Heading>
    </VStack>
  )
}

export const TapBar = () => {
  const { invitesCount } = useUserContext();
  const pathname = usePathname();
  const slug = pathname.split('/')[1] as 'projects' | 'votes' | 'invites' | undefined;

  return (
    <HStack
      as="nav"
      position='fixed'
      bottom="0"
      bg="blue.900"
      alignItems="center"
      justifyContent="space-between"
      w='full'
      h='5.75rem'
    >
      <TapBarItem as={Link} href='/projects' icon={FaMedal} label="PROJETS" isActive={slug === 'projects'} />
      <TapBarItem as={Link} href='/votes' icon={FaBarsStaggered} isActive={slug === 'votes'} label="VOTES" />
      <TapBarItem counter={invitesCount} as={Link} href='/invites' icon={FaPaperPlane} isActive={slug === 'invites'} label="INVITATIONS" />
    </HStack>
  );
};
