import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getBlogPost, getBlogPosts, type Locale } from '@/lib/blog'

export async function generateStaticParams() {
  const locales: Locale[] = ['fr', 'en']
  const params: { locale: string; slug: string }[] = []
  for (const locale of locales) {
    const posts = getBlogPosts(locale)
    for (const post of posts) {
      params.push({ locale, slug: post.slug })
    }
  }
  return params
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  const post = getBlogPost(slug, locale as Locale)
  if (!post) return {}
  return {
    title: `${post.title} - Tokyo Expat`,
    description: post.description,
  }
}

function renderContent(content: string) {
  const lines = content.split('\n')
  const elements: React.ReactNode[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    if (line.startsWith('## ')) {
      elements.push(
        <h2 key={i} className="text-2xl font-bold text-[#0f2744] mt-10 mb-4">
          {line.replace('## ', '')}
        </h2>
      )
    } else if (line.startsWith('**') && line.endsWith('**')) {
      elements.push(
        <p key={i} className="font-semibold text-[#0f2744] mt-4 mb-1">
          {line.replace(/\*\*/g, '')}
        </p>
      )
    } else if (line.startsWith('- ')) {
      elements.push(
        <li key={i} className="ml-4 text-gray-700 leading-relaxed list-disc">
          {line.replace('- ', '')}
        </li>
      )
    } else if (line.startsWith('---')) {
      elements.push(<hr key={i} className="my-8 border-gray-200" />)
    } else if (line.startsWith('*') && line.endsWith('*')) {
      elements.push(
        <p key={i} className="text-gray-500 italic text-sm mt-2">
          {line.replace(/\*/g, '')}
        </p>
      )
    } else if (line.trim() !== '') {
      elements.push(
        <p key={i} className="text-gray-700 leading-relaxed mb-4">
          {line}
        </p>
      )
    }

    i++
  }

  return elements
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  const post = getBlogPost(slug, locale as Locale)

  if (!post) notFound()

  const backLabel = locale === 'fr' ? 'Retour aux guides' : 'Back to guides'
  const ctaLabel = locale === 'fr' ? 'Consultation gratuite' : 'Free Consultation'
  const ctaDesc = locale === 'fr'
    ? 'Vous avez un projet d\'installation a Tokyo? Parlons-en.'
    : 'Planning to move to Tokyo? Let\'s talk.'

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <Link href={`/${locale}/blog`} className="text-sm text-gray-400 hover:text-[#0f2744] transition-colors mb-8 inline-block">
        ← {backLabel}
      </Link>

      <div className="flex items-center gap-3 text-xs text-gray-400 mb-4">
        <span>{post.date}</span>
        <span>·</span>
        <span>{post.readingTime}</span>
      </div>

      <h1 className="text-3xl md:text-4xl font-extrabold text-[#0f2744] mb-6 leading-tight">
        {post.title}
      </h1>

      <p className="text-lg text-gray-500 mb-10 leading-relaxed border-l-4 border-[#e84141] pl-4">
        {post.description}
      </p>

      <div className="prose-custom">
        {renderContent(post.content)}
      </div>

      <div className="mt-16 bg-[#0f2744] text-white rounded-2xl p-8 text-center">
        <p className="text-gray-300 mb-2">{ctaDesc}</p>
        <Link
          href={`/${locale}/contact`}
          className="inline-block bg-[#e84141] hover:bg-[#ff6b6b] text-white px-8 py-3 rounded-xl font-bold transition-colors mt-4"
        >
          {ctaLabel}
        </Link>
      </div>
    </div>
  )
}
