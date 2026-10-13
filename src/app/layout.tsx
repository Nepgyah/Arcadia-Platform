import { Metadata } from "next";
import { Provider } from "@/components/ui/provider";
import { Toaster } from "@/components/ui/toaster";
import UIWrapper from "@/components/wrapper/uiWrapper";

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
          <UIWrapper>
            {children}
          </UIWrapper>
        </Provider>
      </body>
    </html>
  );
}