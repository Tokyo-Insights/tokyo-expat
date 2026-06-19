import { MetadataRoute } from 'next'
import { getBlogPosts } from '@/lib/blog'

const baseUrl = 'https://www.tokyo-expat.com'
const locales = ['fr', 'en']

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ['', '/services', '/blog', '/about', '/contact']

  const staticUrls = locales.flatMap((locale) =>
    staticPages.map((page) => ({
      url: `${baseUrl}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: page === '' ? 1 : 0.8,
    }))
  )

  const blogUrls = locales.flatMap((locale) =>
    getBlogPosts(locale as 'fr' | 'en').map((post) => ({
      url: `${baseUrl}/${locale}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  )

  return [...staticUrls, ...blogUrls]
}
