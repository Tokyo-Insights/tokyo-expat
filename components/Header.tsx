'use client'

import Link from 'next/link'
import { useState } from 'react'
import type { Locale } from '@/lib/i18n'

interface HeaderProps {
  locale: Locale
  nav: {
    home: string
    services: string
    listings: string
    data: string
    blog: string
    about: string
    contact: string
    cta: string
    checklist: string
  }
}

export default function Header({ locale, nav }: HeaderProps) {
  const [open, setOpen] = useState(false)
  const other = locale === 'fr' ? 'en' : 'fr'

  return (
    <header className="bg-[#0f2744] text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href={`/${locale}`} className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight">
            Tokyo<span className="text-[#e84141]">Expat</span>
          </span>
          <span className="text-xs text-gray-400 hidden sm:block">— Housing Hunter</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href={`/${locale}`} className="hover:text-[#e84141] transition-colors">{nav.home}</Link>
          <Link href={`/${locale}/services`} className="hover:text-[#e84141] transition-colors">{nav.services}</Link>
          <Link href={`/${locale}/listings`} className="hover:text-[#e84141] transition-colors font-semibold text-[#e84141]">{nav.listings}</Link>
          <Link href={`/${locale}/data`} className="hover:text-[#e84141] transition-colors">{nav.data}</Link>
          <Link href={`/${locale}/blog`} className="hover:text-[#e84141] transition-colors">{nav.blog}</Link>
          <Link href={`/${locale}/about`} className="hover:text-[#e84141] transition-colors">{nav.about}</Link>
          <Link href={`/${locale}/contact`} className="hover:text-[#e84141] transition-colors">{nav.contact}</Link>
          <Link href={`/${locale}/checklist`} className="border border-[#e84141]/60 text-[#e84141] hover:bg-[#e84141] hover:text-white px-3 py-1.5 rounded-lg transition-colors">{nav.checklist}</Link>
          <Link href={`/${other}`} className="text-gray-400 hover:text-white transition-colors uppercase text-xs border border-gray-600 px-2 py-1 rounded">
            {other.toUpperCase()}
          </Link>
          <Link href={`/${locale}/contact`} className="bg-[#e84141] hover:bg-[#ff6b6b] text-white px-4 py-2 rounded-lg font-semibold transition-colors">
            {nav.cta}
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button className="md:hidden text-white" onClick={() => setOpen(!open)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[#0f2744] border-t border-gray-700 px-4 py-4 flex flex-col gap-4 text-sm">
          <Link href={`/${locale}`} onClick={() => setOpen(false)}>{nav.home}</Link>
          <Link href={`/${locale}/services`} onClick={() => setOpen(false)}>{nav.services}</Link>
          <Link href={`/${locale}/listings`} onClick={() => setOpen(false)} className="text-[#e84141] font-semibold">{nav.listings}</Link>
          <Link href={`/${locale}/data`} onClick={() => setOpen(false)}>{nav.data}</Link>
          <Link href={`/${locale}/blog`} onClick={() => setOpen(false)}>{nav.blog}</Link>
          <Link href={`/${locale}/about`} onClick={() => setOpen(false)}>{nav.about}</Link>
          <Link href={`/${locale}/contact`} onClick={() => setOpen(false)}>{nav.contact}</Link>
          <Link href={`/${locale}/checklist`} onClick={() => setOpen(false)} className="text-[#e84141] font-semibold">{nav.checklist}</Link>
          <Link href={`/${other}`} className="text-gray-400 uppercase text-xs">{other.toUpperCase()}</Link>
          <Link href={`/${locale}/contact`} onClick={() => setOpen(false)} className="bg-[#e84141] text-white px-4 py-2 rounded-lg text-center font-semibold">
            {nav.cta}
          </Link>
        </div>
      )}
    </header>
  )
}
