import Link from 'next/link'
import type { Metadata } from 'next'
import { getBlogPosts, type Locale } from '@/lib/blog'

const titles: Record<string, string> = {
  fr: 'Guides logement Tokyo — Tokyo Expat',
  en: 'Tokyo Housing Guides — Tokyo Expat',
}
const descriptions: Record<string, string> = {
  fr: 'Guides pratiques pour trouver un logement à Tokyo : share house, appartement meublé, compte bancaire, visa. Pour francophones et expatriés.',
  en: 'Practical guides for finding housing in Tokyo: share house, furnished apartment, bank account, visa. For expats and international residents.',
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return {
    title: titles[locale] ?? titles.fr,
    description: descriptions[locale] ?? descriptions.fr,
    alternates: { canonical: `/${locale}/blog` },
  }
}

export default async function BlogIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const locale = ((await params).locale as Locale)
  const posts = getBlogPosts(locale)

  const title = locale === 'fr' ? 'Guides & Conseils' : 'Guides & Advice'
  const subtitle = locale === 'fr'
    ? 'Tout ce que vous devez savoir pour trouver un logement a Tokyo.'
    : 'Everything you need to know to find housing in Tokyo.'

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-extrabold text-[#0f2744] mb-4">{title}</h1>
      <p className="text-gray-500 mb-12">{subtitle}</p>

      <div className="flex flex-col gap-8">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/${locale}/blog/${post.slug}`}
            className="group border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
              <span>{post.date}</span>
              <span>·</span>
              <span>{post.readingTime}</span>
            </div>
            <h2 className="text-xl font-bold text-[#0f2744] group-hover:text-[#e84141] transition-colors mb-2">
              {post.title}
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">{post.description}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
