import type { MetadataRoute } from 'next'
import { getBlogPosts } from '@/lib/blog'

const BASE_URL = 'https://www.tokyo-expat.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ['', '/services', '/about', '/contact', '/blog']
  const locales = ['fr', 'en'] as const

  const staticEntries: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    staticPages.map((page) => ({
      url: `${BASE_URL}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: page === '' ? 1 : 0.8,
    }))
  )

  const blogEntries: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    getBlogPosts(locale).map((post) => ({
      url: `${BASE_URL}/${locale}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  )

  return [...staticEntries, ...blogEntries]
}
