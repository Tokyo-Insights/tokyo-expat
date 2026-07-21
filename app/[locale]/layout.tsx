import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { getDictionary, type Locale } from '@/lib/i18n'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ExitIntentPopup from '@/components/ExitIntentPopup'

export const metadata: Metadata = {
  title: 'Tokyo Expat — Chasseur Immobilier à Tokyo',
  description: 'Trouvez votre logement à Tokyo avec un chasseur immobilier dédié. Share house, appartement, maison. FR / EN. Consultation gratuite.',
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ locale: string }>
}) {
  const locale = ((await params).locale as Locale)
  const dict = getDictionary(locale)

  return (
    <>
      <Header locale={locale} nav={dict.nav} />
      <main className="bg-white text-gray-900">{children}</main>
      <Footer locale={locale} nav={dict.nav} footer={dict.footer} />
      <ExitIntentPopup locale={locale} />
    </>
  )
}
