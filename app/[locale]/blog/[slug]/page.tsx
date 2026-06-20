import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'
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
  const ogImage = `/og?title=${encodeURIComponent(post.title)}&locale=${locale}`
  return {
    title: `${post.title} - Tokyo Expat`,
    description: post.description,
    alternates: {
      canonical: `/${locale}/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      url: `https://www.tokyo-expat.com/${locale}/blog/${slug}`,
      images: [{ url: ogImage, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [ogImage],
    },
  }
}

function renderInline(text: string, key?: string): ReactNode {
  const parts: ReactNode[] = []
  const regex = /(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g
  let last = 0
  let match: RegExpExecArray | null

  while ((match = regex.exec(text)) !== null) {
    if (match.index > last) parts.push(text.slice(last, match.index))
    const seg = match[0]
    const idx = match.index

    if (seg.startsWith('**')) {
      parts.push(<strong key={`${key}-b${idx}`} className="font-semibold text-[#0f2744]">{seg.slice(2, -2)}</strong>)
    } else if (seg.startsWith('*')) {
      parts.push(<em key={`${key}-i${idx}`}>{seg.slice(1, -1)}</em>)
    } else {
      const linkMatch = seg.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
      if (linkMatch) {
        parts.push(
          <a key={`${key}-l${idx}`} href={linkMatch[2]} className="text-[#e84141] underline underline-offset-2 hover:text-[#0f2744] transition-colors">
            {linkMatch[1]}
          </a>
        )
      }
    }
    last = match.index + seg.length
  }
  if (last < text.length) parts.push(text.slice(last))
  return parts.length === 1 && typeof parts[0] === 'string' ? parts[0] : <>{parts}</>
}

function renderTable(lines: string[], baseKey: number): ReactNode {
  const parseRow = (line: string) =>
    line.split('|').map(c => c.trim()).filter((_, i, a) => i > 0 && i < a.length - 1)

  const isSeparator = (line: string) => /^\|[-|\s:]+\|$/.test(line.trim())

  const separatorIdx = lines.findIndex(isSeparator)
  const headerLines = separatorIdx > 0 ? lines.slice(0, separatorIdx) : []
  const bodyLines = lines.slice(separatorIdx + 1)

  return (
    <div key={baseKey} className="overflow-x-auto my-8 rounded-xl border border-gray-200">
      <table className="w-full text-sm border-collapse">
        {headerLines.length > 0 && (
          <thead>
            {headerLines.map((line, ri) => (
              <tr key={ri} className="bg-[#0f2744] text-white">
                {parseRow(line).map((cell, ci) => (
                  <th key={ci} className="px-4 py-3 text-left font-semibold whitespace-nowrap">
                    {renderInline(cell, `th-${baseKey}-${ri}-${ci}`)}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
        )}
        <tbody>
          {bodyLines.map((line, ri) => (
            <tr key={ri} className={ri % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              {parseRow(line).map((cell, ci) => (
                <td key={ci} className="px-4 py-3 border-t border-gray-100 text-gray-700">
                  {renderInline(cell, `td-${baseKey}-${ri}-${ci}`)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function renderContent(content: string) {
  const lines = content.split('\n')
  const elements: ReactNode[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    // H2
    if (line.startsWith('## ')) {
      elements.push(
        <h2 key={i} className="text-2xl font-bold text-[#0f2744] mt-10 mb-4">
          {renderInline(line.slice(3), `h2-${i}`)}
        </h2>
      )
      i++

    // H3
    } else if (line.startsWith('### ')) {
      elements.push(
        <h3 key={i} className="text-lg font-semibold text-[#0f2744] mt-6 mb-2">
          {renderInline(line.slice(4), `h3-${i}`)}
        </h3>
      )
      i++

    // Table
    } else if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
      const tableLines: string[] = []
      while (i < lines.length && lines[i].trim().startsWith('|') && lines[i].trim().endsWith('|')) {
        tableLines.push(lines[i])
        i++
      }
      elements.push(renderTable(tableLines, i))

    // List group
    } else if (line.startsWith('- ')) {
      const listItems: ReactNode[] = []
      while (i < lines.length && lines[i].startsWith('- ')) {
        listItems.push(
          <li key={i} className="text-gray-700 leading-relaxed">
            {renderInline(lines[i].slice(2), `li-${i}`)}
          </li>
        )
        i++
      }
      elements.push(
        <ul key={`ul-${i}`} className="list-disc ml-5 my-3 space-y-1">
          {listItems}
        </ul>
      )

    // HR
    } else if (line.startsWith('---')) {
      elements.push(<hr key={i} className="my-8 border-gray-200" />)
      i++

    // Italic CTA (standalone *text*)
    } else if (line.startsWith('*') && line.endsWith('*') && !line.startsWith('**')) {
      elements.push(
        <p key={i} className="text-gray-500 italic text-sm mt-2">
          {line.slice(1, -1)}
        </p>
      )
      i++

    // Empty line
    } else if (line.trim() === '') {
      i++

    // Paragraph
    } else {
      elements.push(
        <p key={i} className="text-gray-700 leading-relaxed mb-4">
          {renderInline(line, `p-${i}`)}
        </p>
      )
      i++
    }
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

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    inLanguage: locale === 'fr' ? 'fr-FR' : 'en-US',
    url: `https://www.tokyo-expat.com/${locale}/blog/${post.slug}`,
    author: {
      '@type': 'Person',
      name: 'Alessandro',
      url: `https://www.tokyo-expat.com/${locale}/about`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Tokyo Expat',
      url: 'https://www.tokyo-expat.com',
    },
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
