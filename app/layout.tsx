import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';
import './globals.css';
import Navbar from './navbar';
import Sidenav from './sidenav';
import QueryProvider from '@/utils/query-provider';
import Head from 'next/head';
import { ThemeProvider } from '@/components/theme-provider';
import { AppContextProvider } from '@/context/AppContext';
import { Suspense } from 'react';

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Lambo XRP Miner',
  description: 'Lambo Louie Xrp Miner',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            if (localStorage.theme === 'dark') {
              document.documentElement.classList.add('dark')
            } else {
              document.documentElement.classList.remove('dark')
            }
          `,
          }}
        />
      </Head>
      <body
        className={`${dmSans.variable} flex justify-center dark:bg-[var(--color-lambo-black)]`}
      >
        <Suspense fallback={null}>
          <AppContextProvider>
            <ThemeProvider>
              <section className="flex w-full max-w-[1728px] justify-center">
                <QueryProvider>
                  <div className="flex w-full max-w-[1488px] flex-col gap-6 pb-[30px] pt-6 md:gap-10 md:pt-[25px]">
                    <Navbar />
                    <div className="flex items-start gap-10">
                      <Sidenav />
                      {children}
                    </div>
                  </div>
                </QueryProvider>
              </section>
            </ThemeProvider>
          </AppContextProvider>
        </Suspense>
      </body>
    </html>
  );
}
