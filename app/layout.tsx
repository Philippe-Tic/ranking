import { AppContent } from "@/components/AppContent";
import { ReactQueryClientProvider } from "@/components/ReactQueryClientProvider";

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'RangeRank',
  description: 'Votez pour vos meilleurs ranks.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
  }) {

  return (
    <ReactQueryClientProvider>
      <AppContent>
        {children}
      </AppContent>
    </ReactQueryClientProvider>
  );
}
