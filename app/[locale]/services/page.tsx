import Link from 'next/link'
import type { Metadata } from 'next'
import { getDictionary, type Locale } from '@/lib/i18n'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return {
    title: locale === 'en' ? 'Our Services — Tokyo Expat' : 'Nos Services — Tokyo Expat',
    alternates: { canonical: `/${locale}/services` },
  }
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const locale = ((await params).locale as Locale)
  const dict = getDictionary(locale)
  const s = dict.services

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <div className="text-center mb-14">
        <h1 className="text-4xl font-extrabold text-[#0f2744] mb-4">{s.title}</h1>
        <p className="text-gray-500 text-lg">{s.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {s.packages.map((pkg) => (
          <div key={pkg.id} className="border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-shadow flex flex-col">
            <div className="mb-4">
              <h2 className="text-xl font-bold text-[#0f2744] mb-1">{pkg.name}</h2>
              <p className="text-gray-500 text-sm">{pkg.description}</p>
            </div>
            <div className="mb-6">
              <span className="inline-block bg-[#0f2744]/8 text-[#0f2744] text-sm font-semibold px-3 py-1 rounded-full">
                {locale === 'fr' ? 'Tarif sur devis — consultation gratuite' : 'Price on request — free consultation'}
              </span>
            </div>
            <div className="mb-6 flex-1">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">{s.included}</p>
              <ul className="space-y-2">
                {pkg.included.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <Link
              href={`/${locale}/contact`}
              className="block text-center bg-[#0f2744] hover:bg-[#1a3a6b] text-white px-6 py-3 rounded-xl font-semibold transition-colors"
            >
              {s.book_cta}
            </Link>
          </div>
        ))}
      </div>

    </div>
  )
}
