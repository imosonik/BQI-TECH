import { MetadataRoute } from 'next'
import sitemap from '@/app/sitemap'

export async function getSitemapXml(): Promise<string> {
  const sitemapData = await sitemap()
  
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${sitemapData
        .map(
          (url) => `
        <url>
          <loc>${url.url}</loc>
          <lastmod>${new Date(url.lastModified || new Date()).toISOString()}</lastmod>
          ${url.changeFrequency ? `<changefreq>${url.changeFrequency}</changefreq>` : ''}
          ${url.priority ? `<priority>${url.priority}</priority>` : ''}
        </url>
      `
        )
        .join('')}
    </urlset>`

  return xml
} 