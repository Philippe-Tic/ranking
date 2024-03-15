import { VStack } from "@chakra-ui/react"
import { ReactNode } from "react"

export const Page = ({ children }: {children: ReactNode}) => {
  return (
    <VStack flex='1' justifyContent="flex-start" spacing="0">{children}</VStack>
  )
}