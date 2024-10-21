"use client";

import localFont from "next/font/local";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";
import { CookieConsentBanner } from '@/components/CookieConsentBanner';

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
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <ClientLayout>
        {children}
        <CookieConsentBanner />
      </ClientLayout>
    </html>
  );
}
