import { Provider } from "@/components/ui/provider";
import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import WrapperUI from "./wrapperUI";

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
          <WrapperUI>
            {children}
          </WrapperUI>
        </Provider>
      </body>
    </html>
  );
}
