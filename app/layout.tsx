import { Inter } from "next/font/google"
import type { Metadata } from "next"
import { ClientWrapper } from './ClientLayout'
import "./globals.css"
import "./clerk-overrides.css"

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://bqitech.com'),
  title: 'Custom Software Development & IT Solutions | BQITech',
  description: 'BQITech offers custom software development, DevOps consultancy, and IT solutions for governments. Partner with top offshore software development experts today!',
  keywords: ['custom software development', 'IT solutions', 'DevOps consultancy', 'government software', 'offshore development'],
  authors: [{ name: 'BQI Tech' }],
  creator: 'BQI Tech',
  publisher: 'BQI Tech',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://bqitech.com',
    siteName: 'BQITech',
    title: 'Custom Software Development & IT Solutions | BQITech',
    description: 'BQITech offers custom software development, DevOps consultancy, and IT solutions for governments. Partner with top offshore software development experts today!',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'BQITech - Custom Software Development & IT Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Custom Software Development & IT Solutions | BQITech',
    description: 'BQITech offers custom software development, DevOps consultancy, and IT solutions for governments.',
    images: ['/og-image.jpg'],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <meta name="robots" content="index,follow" />
      </head>
      <body>
        <ClientWrapper>
          {children}
        </ClientWrapper>
      </body>
    </html>
  )
}

