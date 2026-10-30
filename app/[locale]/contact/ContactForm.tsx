'use client'

import { useState } from 'react'
import { getDictionary, type Locale } from '@/lib/i18n'

export default function ContactForm({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale)
  const c = dict.contact

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState(false)
  // Bloque le double clic pendant l'envoi (doublons de demandes sur mobile lent).
  const [sending, setSending] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (sending) return
    setError(false)
    setSending(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message, locale }),
      })
      if (res.ok) {
        setSent(true)
      } else {
        setError(true)
      }
    } catch {
      setError(true)
    } finally {
      setSending(false)
    }
  }

  return (
    <>
      <div className="bg-[#0f2744] rounded-2xl p-8 mb-8 text-center">
        {/* 30/10/2026 : l'appel gratuit de 30 min (Calendly) est remplace par le Diagnostic logement
            (offre v3, sa decision : « remplace par diagnostic »). Le prix vit sur la page devis, pas ici. */}
        <p className="text-white/70 text-sm uppercase tracking-widest mb-2">
          {locale === 'fr' ? 'Diagnostic logement' : 'Housing Check'}
        </p>
        <h2 className="text-white text-2xl font-bold mb-3">
          {locale === 'fr' ? 'Sachez en 48 heures ce qui vous est vraiment ouvert' : 'Know within 48 hours what is really open to you'}
        </h2>
        <p className="text-white/70 text-sm mb-6">
          {locale === 'fr'
            ? 'Par écrit, sans appel : les logements qui acceptent votre situation (visa, durée, sans garant) et ce que chacun vous coûtera au total sur tout votre séjour, avant de signer quoi que ce soit.'
            : 'In writing, no call needed: the homes that accept your situation (visa, length of stay, no guarantor) and what each one will cost you in total over your stay, before you sign anything.'}
        </p>
        <a
          href={locale === 'fr' ? '/devis/diagnostic' : '/devis/diagnostic?locale=en'}
          onClick={() => {
            if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
              window.gtag('event', 'diagnostic_click', { source: 'contact_page', locale })
            }
          }}
          className="inline-block bg-[#e84141] hover:bg-[#ff6b6b] text-white px-8 py-3 rounded-xl font-bold transition-colors"
        >
          {locale === 'fr' ? 'Voir le Diagnostic' : 'See the Housing Check'} &rarr;
        </a>
        <p className="text-white/50 text-xs mt-4">
          {locale === 'fr'
            ? 'En français, anglais ou japonais · remboursé si le rapport arrive en retard'
            : 'In English, French or Japanese · refunded if the report is late'}
        </p>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8">
        <h2 className="font-bold text-[#0f2744] text-xl mb-6">{c.form_title}</h2>
        {sent ? (
          <div role="status" aria-live="polite" className="bg-green-50 border border-green-200 rounded-xl p-6 text-green-800 text-center font-medium">
            {c.sent}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 mb-1">{c.name_label}</label>
              <input
                id="contact-name"
                name="name"
                autoComplete="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f2744]"
              />
            </div>
            <div>
              <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 mb-1">{c.email_label}</label>
              <input
                id="contact-email"
                name="email"
                autoComplete="email"
                spellCheck={false}
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f2744]"
              />
            </div>
            <div>
              <label htmlFor="contact-message" className="block text-sm font-medium text-gray-700 mb-1">{c.message_label}</label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f2744] resize-none"
              />
            </div>
            {error && (
              <p role="alert" className="text-red-600 text-sm">
                {locale === 'fr'
                  ? "Erreur d'envoi. Réessayez ou écrivez directement à contact@tokyo-expat.com"
                  : 'Send error. Please retry or email contact@tokyo-expat.com directly.'}
              </p>
            )}
            <button
              type="submit"
              disabled={sending}
              aria-busy={sending}
              className="bg-[#e84141] hover:bg-[#ff6b6b] disabled:opacity-60 disabled:cursor-wait text-white px-8 py-3 rounded-xl font-bold transition-colors self-start"
            >
              {sending ? (locale === 'fr' ? 'Envoi…' : 'Sending…') : c.send}
            </button>
          </form>
        )}
      </div>

      <div className="mt-8 text-center text-sm text-gray-500">
        <a href="mailto:contact@tokyo-expat.com" className="text-[#0f2744] font-medium hover:text-[#e84141] transition-colors">
          contact@tokyo-expat.com
        </a>
      </div>
    </>
  )
}
