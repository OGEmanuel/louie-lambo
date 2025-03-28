import type { Metadata } from 'next';
import { DynaPuff } from 'next/font/google';
import './globals.css';
import Navbar from './navbar';
import Sidenav from './sidenav';
import QueryProvider from '@/utils/query-provider';
import Head from 'next/head';
import { ThemeProvider } from '@/components/theme-provider';
import { AppContextProvider } from '@/context/AppContext';
import { Suspense } from 'react';
import { ToastContainer } from 'react-toastify';

const dynaPuff = DynaPuff({
  variable: '--font-dyna-puff',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: '$Lambo Platform',
  description: 'Lambo Louie Platform',
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
        className={`${dynaPuff.className} relative z-10 flex min-h-screen justify-center overflow-x-hidden before:absolute before:inset-0 before:-z-10 before:bg-[url('/images/light-lambo-bg.jpeg')] before:bg-cover before:bg-fixed before:bg-no-repeat before:opacity-20 dark:bg-[var(--color-lambo-black)] dark:before:bg-[url('/images/dark-lambo-bg.png')]`}
      >
        <Suspense fallback={null}>
          <QueryProvider>
            <AppContextProvider>
              <ThemeProvider>
                <section className="flex w-full max-w-[1728px] justify-center">
                  <div className="flex w-full max-w-[1488px] flex-col gap-6 pb-[30px] pt-6 md:gap-10 md:pt-[25px]">
                    <Navbar />
                    <div className="flex items-start gap-10">
                      <Sidenav />
                      {children}
                    </div>
                    <ToastContainer position="bottom-right" theme="dark" />
                  </div>
                </section>
              </ThemeProvider>
            </AppContextProvider>
          </QueryProvider>
        </Suspense>
      </body>
    </html>
  );
}
