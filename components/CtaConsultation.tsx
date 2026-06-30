'use client'
import Link from 'next/link'
import type { ReactNode } from 'react'

interface Props {
  locale: string
}

export default function CtaConsultation({ locale }: Props): ReactNode {
  const isFr = locale === 'fr'
  const t = {
    title: isFr
      ? 'Besoin d\'aide pour vous loger a Tokyo ?'
      : 'Need help finding housing in Tokyo?',
    body: isFr
      ? 'Je vous aide a trouver un logement adapte, sans garant japonais et sans barriere de langue. Consultation gratuite, sans engagement, en francais ou en anglais.'
      : 'I help you find the right home, with no Japanese guarantor and no language barrier. Free consultation, no commitment, in English or French.',
    button: isFr ? 'Reserver ma consultation gratuite' : 'Book my free consultation',
  }

  function track() {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', 'select_consultation', {
        source: 'blog_article_cta',
        locale,
      })
    }
  }

  return (
    <div className="mt-8 bg-[#0f2744] text-white rounded-2xl p-8 text-center">
      <p className="text-xl font-bold mb-2">{t.title}</p>
      <p className="text-gray-300 text-sm mb-5 max-w-xl mx-auto leading-relaxed">{t.body}</p>
      <Link
        href={`/${locale}/contact`}
        onClick={track}
        className="inline-block bg-[#e84141] hover:bg-[#ff6b6b] text-white px-8 py-3 rounded-xl font-bold transition-colors"
      >
        {t.button}
      </Link>
    </div>
  )
}
