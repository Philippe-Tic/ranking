import { HeaderBar } from "@/components/HeaderBar";
import { Navbar } from "@/components/Navbar";
import { TapBar } from "@/components/TapBar";
import { Flex, useBreakpointValue } from "@chakra-ui/react";
import { ReactNode } from "react";

const PageLayout = ({ children }: { children: ReactNode }) => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  if (isMobile) {
    return (
      <Flex flexDir="column" minH='100vh' as="main" bg="background">
        <HeaderBar />
        {children}
        <TapBar />
      </Flex>
    )
  }

  return (
    <Flex flexDir='row' minH='100vh' as="main" bg="background">
      <Navbar />
      {children}
    </Flex>
  );
};

export default PageLayout;