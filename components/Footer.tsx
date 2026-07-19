import Link from 'next/link'
import type { Locale } from '@/lib/i18n'
import NewsletterForm from '@/components/NewsletterForm'

interface FooterProps {
  locale: Locale
  nav: { home: string; services: string; about: string; contact: string }
  footer: { tagline: string; links: string; legal: string; contact: string }
}

export default function Footer({ locale, nav, footer }: FooterProps) {
  return (
    <footer className="bg-[#0a1e38] text-gray-400 mt-20">
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <p className="text-white font-bold text-lg mb-2">
            Tokyo<span className="text-[#e84141]">Expat</span>
          </p>
          <p className="text-sm">{footer.tagline}</p>
          <p className="text-sm mt-2">{footer.contact}</p>
        </div>
        <div>
          <p className="text-white font-semibold mb-3">{footer.links}</p>
          <ul className="space-y-2 text-sm">
            <li><Link href={`/${locale}`} className="hover:text-white transition-colors">{nav.home}</Link></li>
            <li><Link href={`/${locale}/services`} className="hover:text-white transition-colors">{nav.services}</Link></li>
            <li><Link href={`/${locale}/about`} className="hover:text-white transition-colors">{nav.about}</Link></li>
            <li><Link href={`/${locale}/contact`} className="hover:text-white transition-colors">{nav.contact}</Link></li>
            <li><Link href={`/${locale}/checklist`} className="hover:text-white transition-colors">{locale === 'fr' ? 'Checklist gratuite' : 'Free checklist'}</Link></li>
            <li><Link href={`/${locale}/resources`} className="hover:text-white transition-colors">{locale === 'fr' ? 'Ressources' : 'Resources'}</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-sm leading-relaxed">{footer.legal}</p>
          <div className="mt-6">
            <NewsletterForm locale={locale} />
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800 text-center text-xs py-4 text-gray-600">
        © {new Date().getFullYear()} Tokyo Expat. {locale === 'fr' ? 'Tous droits réservés.' : 'All rights reserved.'}
      </div>
    </footer>
  )
}
