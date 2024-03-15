"use client"

import PageLayout from "@/components/PageLayout";
import { getInvitesCount } from "@/services/invites";
import { theme } from "@/theme";
import { createClient } from "@/utils/supabase/client";
import { Box, ChakraProvider, Spinner } from "@chakra-ui/react";
import { useQuery } from "@supabase-cache-helpers/postgrest-react-query";
import Head from "next/head";
import { usePathname, useRouter } from 'next/navigation';
import { ReactNode, createContext, useContext, useEffect, useState } from "react";

type UserContextType = {
  invitesCount: number | null;
  refetchInvitesCount: () => void;
  user: any;
  setUser: (user: any) => void;
  isLoading: any;
  setIsLoading: (loading: boolean) => void;
  signIn: () => void;
  signOut: () => void;
}

const UserContext = createContext<UserContextType>({
  invitesCount: 0,
  refetchInvitesCount: () => {},
  user: null,
  setUser: (user: any) => {},
  isLoading: false,
  setIsLoading: (loading: boolean) => { },
  signIn: () => {},
  signOut: () => {},
});

export const useUserContext = () => useContext(UserContext);

export const AppContent = ({children}: {children: ReactNode}) => {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();
  const path = usePathname();
  const router = useRouter();
  const { count: invitesCount, refetch: refetchInvitesCount } = useQuery(getInvitesCount(supabase, user?.id))

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      const {
        data: { user: fetchedUsed },
      } = await supabase.auth.getUser();
      setUser(fetchedUsed as any);

      setIsLoading(false);
    };

    fetchUser();
  }, [supabase.auth]);

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const signIn = async () =>  await supabase.auth.signInWithOAuth({
    provider: "discord",
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_LOCAL_URL}/auth/callback`
    }
  });

  useEffect(() => {
    if (!isLoading && !user && path !== "/") {
      router.push("/");
    }
  }, [user, path, router, isLoading])

  return (
    <html lang="fr">
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>
      <body>
        <ChakraProvider theme={theme}>
          <UserContext.Provider value={{ invitesCount, refetchInvitesCount, user, setUser, isLoading, setIsLoading, signIn, signOut }}>
            {isLoading && <Spinner />}
            {!isLoading && !user && (
              <Box>
                {children}
              </Box>
            )}
            {!isLoading && user && (
              <PageLayout>
                {children}
              </PageLayout>
            )}
          </UserContext.Provider>
        </ChakraProvider>
      </body>
    </html>
  )
}
