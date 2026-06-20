import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/devis/'],
      },
    ],
    sitemap: 'https://www.tokyo-expat.com/sitemap.xml',
  }
}
