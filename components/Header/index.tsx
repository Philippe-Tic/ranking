import { BoxProps, Flex } from "@chakra-ui/react"
import { ReactNode } from "react"

export const Header = ({ children, ...props }: { children: ReactNode } & BoxProps) => {
  return (
    <Flex box-shadow="0px 81px 23px 0px rgba(0, 0, 0, 0.00), 0px 52px 21px 0px rgba(0, 0, 0, 0.00), 0px 29px 17px 0px rgba(0, 0, 0, 0.00), 0px 13px 13px 0px rgba(0, 0, 0, 0.01), 0px 3px 7px 0px rgba(0, 0, 0, 0.01)" backgroundColor='white' w='full' px={{base: 4, md: 8}} py={4} position='sticky' top="0" zIndex='9' {...props}>
      {children}
    </Flex>
  )
}