import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return {
    title: locale === 'en' ? 'Contact — Tokyo Expat' : 'Contact — Tokyo Expat',
    alternates: { canonical: `/${locale}/contact` },
  }
}

export default function ContactLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
