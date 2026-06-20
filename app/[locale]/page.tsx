import Link from 'next/link'
import { getDictionary, type Locale } from '@/lib/i18n'

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const locale = ((await params).locale as Locale)
  const dict = getDictionary(locale)
  const h = dict.home
  const s = dict.services
  const featured = s.packages.slice(0, 3)

  return (
    <div>
      {/* Hero */}
      <section className="bg-[#0f2744] text-white py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block bg-[#e84141] text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-6">
            Tokyo Expat
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
            {h.hero_title}
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            {h.hero_subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${locale}/contact`}
              className="bg-[#e84141] hover:bg-[#ff6b6b] text-white px-8 py-4 rounded-xl font-bold text-lg transition-colors"
            >
              {h.hero_cta}
            </Link>
            <Link
              href={`/${locale}/services`}
              className="border border-white text-white hover:bg-white hover:text-[#0f2744] px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
            >
              {h.hero_secondary}
            </Link>
          </div>
        </div>
      </section>

      {/* Why section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-[#0f2744] mb-12">{h.why_title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="text-3xl mb-4">🏠</div>
              <h3 className="font-bold text-[#0f2744] text-lg mb-2">{h.why_1_title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{h.why_1_desc}</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="text-3xl mb-4">⚡</div>
              <h3 className="font-bold text-[#0f2744] text-lg mb-2">{h.why_2_title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{h.why_2_desc}</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="text-3xl mb-4">🌐</div>
              <h3 className="font-bold text-[#0f2744] text-lg mb-2">{h.why_3_title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{h.why_3_desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured services */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-[#0f2744] mb-4">{h.services_title}</h2>
          <p className="text-center text-gray-500 mb-12">{s.subtitle}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featured.map((pkg) => (
              <div key={pkg.id} className="border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                <h3 className="font-bold text-[#0f2744] text-lg mb-2">{pkg.name}</h3>
                <p className="text-gray-500 text-sm mb-4">{pkg.description}</p>
                <p className="text-sm font-semibold text-[#0f2744]/60 mt-2">
                  {locale === 'fr' ? 'Tarif sur devis' : 'Price on request'}
                </p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href={`/${locale}/services`}
              className="bg-[#0f2744] hover:bg-[#1a3a6b] text-white px-8 py-3 rounded-xl font-semibold transition-colors"
            >
              {h.services_cta}
            </Link>
          </div>
        </div>
      </section>

      {/* Trust section */}
      <section className="bg-[#0f2744] text-white py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">{h.trust_title}</h2>
          <p className="text-gray-300">{h.trust_desc}</p>
          <Link
            href={`/${locale}/about`}
            className="inline-block mt-6 text-[#e84141] font-semibold hover:text-[#ff6b6b] transition-colors"
          >
            {dict.nav.about} →
          </Link>
        </div>
      </section>
    </div>
  )
}
