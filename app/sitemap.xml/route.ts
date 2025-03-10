import { getSitemapXml } from '../../lib/sitemap'
import { NextResponse } from 'next/server'

export async function GET() {
  const xml = await getSitemapXml()

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, must-revalidate',
    },
  })
} 