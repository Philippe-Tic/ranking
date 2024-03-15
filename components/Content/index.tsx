import { BoxProps, Flex } from "@chakra-ui/react"
import { ReactNode } from "react"

export const Content = ({ children, ...props }: { children: ReactNode } & BoxProps) => {
  return (
    <Flex flexDir='column' w='full' flex='1' px={{base: 4, md: 8}} pt={4} pb={{base: '6.75rem', md: 4}} {...props}>
      {children}
    </Flex>
  )
}