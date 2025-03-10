import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL('https://bqitech.com'),
  title: {
    default: 'BQI Tech - Innovating for a Better World',
    template: '%s | BQI Tech'
  },
  description: 'BQI Tech provides innovative solutions across industries to improve quality of life worldwide.',
  keywords: ['software development', 'technology services', 'government solutions', 'IT consulting'],
  authors: [{ name: 'BQI Tech' }],
  creator: 'BQI Tech',
  publisher: 'BQI Tech',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://bqitech.com',
    siteName: 'BQI Tech',
    title: 'BQI Tech - Innovating for a Better World',
    description: 'BQI Tech provides innovative solutions across industries to improve quality of life worldwide.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'BQI Tech',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BQI Tech - Innovating for a Better World',
    description: 'BQI Tech provides innovative solutions across industries to improve quality of life worldwide.',
    images: ['/og-image.jpg'],
  },
  verification: {
    google: 'your-google-verification-code',
  },
}; 