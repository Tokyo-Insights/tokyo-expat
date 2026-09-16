import type { MetadataRoute } from 'next'
import { getBlogPosts } from '@/lib/blog'

const BASE_URL = 'https://www.tokyo-expat.com'

/**
 * Images d'un article, declarees au sitemap (balises <image:image>).
 *
 * Ajoute le 16/09/2026. Constat qui l'a motive: le site ne recevait que
 * 4 impressions Google Images sur 90 jours, contre 71 360 en recherche web,
 * parce qu'il n'avait aucune photographie. Declarer les images accelere leur
 * decouverte, ce qui sert directement la mesure du test photo.
 *
 * On lit le markdown de l'article plutot que de tenir une liste a la main:
 * une liste separee se desynchronise des le premier article modifie.
 */
function imagesOf(content: string): string[] {
  const urls = new Set<string>()
  const re = /!\[[^\]]*\]\((\/[^\s)"]+)/g
  let m: RegExpExecArray | null
  while ((m = re.exec(content)) !== null) urls.add(BASE_URL + m[1])
  return [...urls]
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ['', '/services', '/listings', '/data', '/resources', '/checklist', '/about', '/contact', '/blog', '/embed']
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
    getBlogPosts(locale).map((post) => {
      const images = imagesOf(post.content)
      return {
        url: `${BASE_URL}/${locale}/blog/${post.slug}`,
        // `updated` prime sur `date`: sans cela, une refonte de contenu laisse
        // le sitemap annoncer la date de publication, donc "rien n'a change".
        lastModified: new Date(post.updated ?? post.date),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
        ...(images.length > 0 ? { images } : {}),
      }
    })
  )

  return [...staticEntries, ...blogEntries]
}
