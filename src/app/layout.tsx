import { Metadata } from "next";
import { Provider } from "@/components/ui/provider";
import { Toaster } from "@/components/ui/toaster";
import LayoutWrapper from "@/components/wrapper/layoutWrapper";

import '@/styles/_main.scss';

export const metadata: Metadata = {
    title: 'Arcadia',
    description: 'Welcome to Arcadia.',
    icons: {
        icon: '/favicon.ico'
    }
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Provider>
          <Toaster />
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </Provider>
      </body>
    </html>
  );
}