'use client'
import { useState } from 'react'
import type { ReactNode } from 'react'

interface Props {
  locale: string
  compact?: boolean
  variant?: 'checklist' | 'rent-index'
}

export default function LeadMagnetForm({ locale, compact = false, variant = 'checklist' }: Props): ReactNode {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const isFr = locale === 'fr'
  const isRentIndex = variant === 'rent-index'
  const source = isRentIndex ? 'lead-magnet-rent-index' : 'lead-magnet-checklist'
  const pdfUrl = isRentIndex
    ? (isFr ? '/tokyo-rent-index-fr.pdf' : '/tokyo-rent-index-en.pdf')
    : (isFr ? '/checklist-relocation-japon.pdf' : '/japan-relocation-checklist.pdf')

  const t = isRentIndex ? {
    title: isFr
      ? 'Gardez l\'Indice des loyers (PDF portable + mises a jour)'
      : 'Keep the Rent Index (portable PDF + updates)',
    subtitle: isFr
      ? 'Cette page est un instantane. Recevez l\'indice complet (23 arrondissements, 27 lignes, 50 stations) en un PDF portable, et les chiffres actualises par email a chaque mise a jour trimestrielle.'
      : 'This page is a snapshot. Get the full index (23 wards, 27 lines, 50 stations) as one portable PDF, plus the refreshed figures by email at every quarterly update.',
    placeholder: isFr ? 'Votre email' : 'Your email',
    button: isFr ? 'Recevoir le PDF + les MAJ' : 'Email me the PDF + updates',
    loading: isFr ? 'Envoi...' : 'Sending...',
    successTitle: isFr ? 'C\'est pret !' : 'It is ready!',
    successBody: isFr
      ? 'Votre indice complet est disponible ci-dessous. Une copie arrive aussi dans votre boite email.'
      : 'Your full index is available below. A copy is also on its way to your inbox.',
    download: isFr ? 'Telecharger l\'indice (PDF)' : 'Download the index (PDF)',
    error: isFr ? 'Une erreur est survenue. Reessayez.' : 'Something went wrong. Please retry.',
  } : {
    title: isFr
      ? 'Recevez la Checklist Relocation Japon (PDF gratuit)'
      : 'Get the Japan Relocation Checklist (free PDF)',
    subtitle: isFr
      ? '90+ actions concretes pour preparer votre installation au Japon, organisees en 7 phases. Envoye instantanement.'
      : '90+ concrete action items to prepare your move to Japan, across 7 phases. Sent instantly.',
    placeholder: isFr ? 'Votre email' : 'Your email',
    button: isFr ? 'Recevoir la checklist' : 'Get the checklist',
    loading: isFr ? 'Envoi...' : 'Sending...',
    successTitle: isFr ? 'Cest pret !' : 'It is ready!',
    successBody: isFr
      ? 'Votre checklist est disponible ci-dessous. Une copie arrive aussi dans votre boite email.'
      : 'Your checklist is available below. A copy is also on its way to your inbox.',
    download: isFr ? 'Telecharger la checklist (PDF)' : 'Download the checklist (PDF)',
    error: isFr ? 'Une erreur est survenue. Reessayez.' : 'Something went wrong. Please retry.',
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, locale, source }),
      })
      if (res.ok && typeof window !== 'undefined' && typeof window.gtag === 'function') {
        window.gtag('event', 'generate_lead', {
          source: compact ? 'lead-magnet-mid-article' : 'lead-magnet-end',
          locale,
        })
      }
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className={`rounded-2xl border border-green-200 bg-green-50 ${compact ? 'p-5' : 'p-8'}`}>
        <p className="font-bold text-[#0f2744] text-lg mb-1">{t.successTitle}</p>
        <p className="text-sm text-gray-600 mb-4">{t.successBody}</p>
        <a
          href={pdfUrl}
          download
          className="inline-block bg-[#e84141] hover:bg-[#c73333] text-white px-6 py-3 rounded-xl font-semibold transition-colors"
        >
          {t.download}
        </a>
      </div>
    )
  }

  return (
    <div className={`rounded-2xl border border-gray-200 bg-white ${compact ? 'p-5' : 'p-8'}`}>
      <p className={`font-bold text-[#0f2744] ${compact ? 'text-base' : 'text-xl'} mb-1`}>{t.title}</p>
      <p className="text-sm text-gray-500 mb-4">{t.subtitle}</p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t.placeholder}
          required
          disabled={status === 'loading'}
          className="flex-1 px-4 py-3 rounded-xl text-sm border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#e84141]"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="px-6 py-3 rounded-xl text-sm font-semibold bg-[#e84141] hover:bg-[#c73333] text-white transition-colors disabled:opacity-50 whitespace-nowrap"
        >
          {status === 'loading' ? t.loading : t.button}
        </button>
      </form>
      {status === 'error' && <p className="text-red-500 text-xs mt-2">{t.error}</p>}
    </div>
  )
}
