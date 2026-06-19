import { getDictionary, type Locale } from '@/lib/i18n'
import Link from 'next/link'

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const locale = ((await params).locale as Locale)
  const dict = getDictionary(locale)
  const a = dict.about

  const whyPoints = [a.why_1, a.why_2, a.why_3, a.why_4, a.why_5]

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-extrabold text-[#0f2744] mb-10">{a.title}</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
        {/* Photo placeholder */}
        <div className="flex flex-col items-center gap-4">
          <div className="w-40 h-40 rounded-full bg-[#0f2744] flex items-center justify-center text-white text-5xl font-bold">
            A
          </div>
          <div className="text-center">
            <p className="font-bold text-[#0f2744] text-lg">{a.name}</p>
            <p className="text-gray-500 text-sm">{a.role}</p>
          </div>
        </div>

        {/* Bio */}
        <div className="md:col-span-2 flex flex-col gap-4 text-gray-700 leading-relaxed">
          <p>{a.bio_1}</p>
          <p>{a.bio_2}</p>
          <p>{a.bio_3}</p>
        </div>
      </div>

      {/* Why trust me */}
      <div className="bg-[#0f2744] text-white rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-6">{a.why_me_title}</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {whyPoints.map((point, i) => (
            <li key={i} className="flex items-center gap-3">
              <span className="text-[#e84141] text-lg">✓</span>
              <span className="text-gray-200 text-sm">{point}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="text-center mt-12">
        <Link
          href={`/${locale}/contact`}
          className="bg-[#e84141] hover:bg-[#ff6b6b] text-white px-8 py-4 rounded-xl font-bold text-lg transition-colors"
        >
          {dict.nav.cta}
        </Link>
      </div>
    </div>
  )
}
