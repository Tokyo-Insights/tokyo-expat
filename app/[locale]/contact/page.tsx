import type { Metadata } from 'next'
import type { Locale } from '@/lib/i18n'
import ContactForm from './ContactForm'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const altLocale = locale === 'fr' ? 'en' : 'fr'
  const title = locale === 'en' ? 'Contact — Tokyo Expat' : 'Contact — Tokyo Expat'
  const description = locale === 'en'
    ? 'Contact Tokyo Expat about housing in Tokyo, or order a Housing Check: in writing within 48 hours, the homes that accept your situation and their total cost.'
    : 'Contactez Tokyo Expat pour votre logement à Tokyo, ou commandez un Diagnostic logement : par écrit sous 48 heures, les logements qui acceptent votre situation et leur coût total.'
  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/contact`,
      languages: {
        [locale]: `https://www.tokyo-expat.com/${locale}/contact`,
        [altLocale]: `https://www.tokyo-expat.com/${altLocale}/contact`,
        'x-default': 'https://www.tokyo-expat.com/en/contact',
      },
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://www.tokyo-expat.com/${locale}/contact`,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Tokyo Expat', item: 'https://www.tokyo-expat.com' },
      { '@type': 'ListItem', position: 2, name: 'Contact', item: `https://www.tokyo-expat.com/${locale}/contact` },
    ],
  }

  const contactLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact - Tokyo Expat',
    url: `https://www.tokyo-expat.com/${locale}/contact`,
    description: locale === 'fr'
      ? 'Contactez Tokyo Expat pour votre recherche de logement à Tokyo.'
      : 'Contact Tokyo Expat about finding housing in Tokyo.',
    mainEntity: {
      '@type': 'Organization',
      name: 'Tokyo Expat',
      url: 'https://www.tokyo-expat.com',
      email: 'contact@tokyo-expat.com',
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        email: 'contact@tokyo-expat.com',
        availableLanguage: ['French', 'English', 'Japanese'],
        url: `https://www.tokyo-expat.com/${locale}/contact`,
      },
    },
  }

  const titleText = locale === 'fr' ? 'Contact' : 'Contact'
  const subtitleText = locale === 'fr'
    ? 'Une question sur votre projet à Tokyo ? Écrivez-moi, je réponds personnellement sous 24 heures.'
    : 'A question about your Tokyo project? Write to me, I reply personally within 24 hours.'

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <h1 className="text-4xl font-extrabold text-[#0f2744] mb-4">{titleText}</h1>
      <p className="text-gray-500 mb-12 leading-relaxed">{subtitleText}</p>
      <ContactForm locale={locale as Locale} />
    </div>
  )
}
