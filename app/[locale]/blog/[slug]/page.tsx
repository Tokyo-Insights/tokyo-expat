import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { getBlogPost, getBlogPosts, getTwinSlug, type Locale } from '@/lib/blog'
import { faqData } from '@/lib/faq_data'
import LeadMagnetForm from '@/components/LeadMagnetForm'
import CtaConsultation from '@/components/CtaConsultation'

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
  const twinSlug = getTwinSlug(slug, locale as Locale)
  const altLocale = locale === 'fr' ? 'en' : 'fr'
  const languages: Record<string, string> = {
    [locale]: `https://www.tokyo-expat.com/${locale}/blog/${slug}`,
  }
  if (twinSlug) {
    languages[altLocale] = `https://www.tokyo-expat.com/${altLocale}/blog/${twinSlug}`
    languages['x-default'] = locale === 'en'
      ? `https://www.tokyo-expat.com/en/blog/${slug}`
      : `https://www.tokyo-expat.com/en/blog/${twinSlug}`
  }
  return {
    title: `${post.title} - Tokyo Expat`,
    description: post.description,
    alternates: {
      canonical: `/${locale}/blog/${slug}`,
      languages,
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

function renderContent(content: string, locale?: string) {
  const lines = content.split('\n')
  const elements: ReactNode[] = []
  let i = 0
  let h2Count = 0
  let midCtaInserted = false

  while (i < lines.length) {
    const line = lines[i]

    // H2
    if (line.startsWith('## ')) {
      h2Count++
      // Capture email en milieu d'article : juste avant le 3e H2 (= apres 2 sections lues).
      if (locale && !midCtaInserted && h2Count === 3) {
        elements.push(
          <div key={`midcta-${i}`} className="my-10">
            <LeadMagnetForm locale={locale} compact />
          </div>
        )
        midCtaInserted = true
      }
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

  const pageUrl = `https://www.tokyo-expat.com/${locale}/blog/${post.slug}`
  const ogImage = `/og?title=${encodeURIComponent(post.title)}&locale=${locale}`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: locale === 'fr' ? 'fr-FR' : 'en-US',
    url: pageUrl,
    mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl },
    image: {
      '@type': 'ImageObject',
      url: `https://www.tokyo-expat.com${ogImage}`,
      width: 1200,
      height: 630,
    },
    author: {
      '@type': 'Person',
      name: 'Alessandro',
      url: `https://www.tokyo-expat.com/${locale}/about`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Tokyo Expat',
      url: 'https://www.tokyo-expat.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.tokyo-expat.com/icon.png',
        width: 192,
        height: 192,
      },
    },
    isPartOf: {
      '@type': 'WebSite',
      name: 'Tokyo Expat',
      url: 'https://www.tokyo-expat.com',
    },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', '.article-description'],
    },
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Tokyo Expat', item: 'https://www.tokyo-expat.com' },
      { '@type': 'ListItem', position: 2, name: locale === 'fr' ? 'Guides' : 'Guides', item: `https://www.tokyo-expat.com/${locale}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: pageUrl },
    ],
  }

  const faqs = faqData[post.slug] ?? null
  const faqJsonLd = faqs
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.answer,
          },
        })),
      }
    : null

  const faqHeading = locale === 'fr' ? 'Questions fréquentes' : 'Frequently Asked Questions'

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
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

      <p className="article-description text-lg text-gray-500 mb-10 leading-relaxed border-l-4 border-[#e84141] pl-4">
        {post.description}
      </p>

      <div className="prose-custom">
        {renderContent(post.content, locale)}
      </div>

      {faqs && (
        <div className="mt-16 border-t border-gray-200 pt-12">
          <h2 className="text-2xl font-bold text-[#0f2744] mb-8">{faqHeading}</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="group border border-gray-200 rounded-xl overflow-hidden"
              >
                <summary className="flex items-center justify-between cursor-pointer px-6 py-4 bg-white hover:bg-gray-50 transition-colors list-none">
                  <span className="font-semibold text-[#0f2744] pr-4">{faq.question}</span>
                  <span className="flex-shrink-0 text-[#e84141] font-bold text-xl transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <div className="px-6 py-4 bg-gray-50 text-gray-700 leading-relaxed border-t border-gray-100">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      )}

      <div className="mt-12">
        <LeadMagnetForm locale={locale} />
      </div>

      <CtaConsultation locale={locale} />
    </div>
  )
}
