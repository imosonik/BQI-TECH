"use client";

import { usePathname } from 'next/navigation';
import localFont from "next/font/local";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./globals.css";
import "./clerk-overrides.css";
import ClientLayout from "@/components/ClientLayout";
import { CookieConsentBanner } from '@/components/CookieConsentBanner';
import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from 'react-hot-toast';
import { useState } from "react";
import { SettingsProvider } from "@/contexts/SettingsContext";
import { JsonLd } from '@/components/JsonLd'
import Script from 'next/script'

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');
  const isDashboardRoute = pathname?.startsWith('/dashboard');

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
            `,
          }}
        />
      </head>
      <body>
        <SettingsProvider>
          <QueryClientProvider client={queryClient}>
            <ClerkProvider>
              {isAdminRoute || isDashboardRoute ? (
                children
              ) : (
                <>
                  <ClientLayout>
                    {children}
                  </ClientLayout>
                  <CookieConsentBanner />
                </>
              )}
            </ClerkProvider>
            <Toaster position="top-right" />
            <ReactQueryDevtools initialIsOpen={false} />
            <JsonLd />
          </QueryClientProvider>
        </SettingsProvider>
      </body>
    </html>
  );
}

