'use client'

import { useState } from 'react'
import { getDictionary, type Locale } from '@/lib/i18n'

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID ?? ''

export default function ContactForm({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale)
  const c = dict.contact

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(false)
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name, email, message, locale }),
      })
      if (res.ok) {
        setSent(true)
      } else {
        setError(true)
      }
    } catch {
      setError(true)
    }
  }

  return (
    <>
      <div className="bg-[#0f2744] rounded-2xl p-8 mb-8 text-center">
        <p className="text-white/70 text-sm uppercase tracking-widest mb-2">
          {locale === 'fr' ? 'Consultation gratuite' : 'Free consultation'}
        </p>
        <h2 className="text-white text-2xl font-bold mb-3">
          {locale === 'fr' ? 'Réservez votre appel de 30 min' : 'Book your 30-min call'}
        </h2>
        <p className="text-white/70 text-sm mb-6">
          {locale === 'fr'
            ? 'Choisissez un créneau qui vous convient. Sans engagement.'
            : 'Pick a time that works for you. No obligation.'}
        </p>
        <a
          href="https://calendly.com/contact-tokyo-expat/30min"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
              window.gtag('event', 'book_call_click', { source: 'contact_page', locale })
            }
          }}
          className="inline-block bg-[#e84141] hover:bg-[#ff6b6b] text-white px-8 py-3 rounded-xl font-bold transition-colors"
        >
          {locale === 'fr' ? 'Réserver maintenant' : 'Book now'} &rarr;
        </a>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8">
        <h2 className="font-bold text-[#0f2744] text-xl mb-6">{c.form_title}</h2>
        {sent ? (
          <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-green-800 text-center font-medium">
            {c.sent}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{c.name_label}</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f2744]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{c.email_label}</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f2744]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{c.message_label}</label>
              <textarea
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f2744] resize-none"
              />
            </div>
            {error && (
              <p className="text-red-600 text-sm">
                {locale === 'fr'
                  ? "Erreur d'envoi. Reessayez ou ecrivez directement a contact@tokyo-expat.com"
                  : 'Send error. Please retry or email contact@tokyo-expat.com directly.'}
              </p>
            )}
            <button
              type="submit"
              className="bg-[#e84141] hover:bg-[#ff6b6b] text-white px-8 py-3 rounded-xl font-bold transition-colors self-start"
            >
              {c.send}
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
