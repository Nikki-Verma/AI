import { ReactQueryProvider } from "@/providers/reactQueryProvider";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { DM_Sans } from "next/font/google";
import "./globals.scss";

import { ThemeProvider } from "@/providers/antdThemeProvider";
import NotificationProvider from "@/providers/notificationProvider";
import SessionProvider from "@/providers/SessionProvider";
import StyledComponentsRegistry from "@/providers/syledComponentsProvider";
const dm_sans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });

export const metadata: Metadata = {
  title: "SimplAi",
  description: "Simplifying your AI journey",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.log("SIMPLAI APP VERSION:", process.env.NEXT_PUBLIC_APP_VERSION);
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className={dm_sans.variable}>
        <StyledComponentsRegistry>
          <ThemeProvider>
            <SessionProvider
              session={session}
              refetchInterval={900}
              refetchOnWindowFocus={false}
            >
              <AntdRegistry>
                <NotificationProvider>
                  <ReactQueryProvider>{children}</ReactQueryProvider>
                </NotificationProvider>
              </AntdRegistry>
            </SessionProvider>
          </ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
