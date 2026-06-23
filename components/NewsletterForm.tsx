'use client'
import { useState } from 'react'
import type { ReactNode } from 'react'

interface Props {
  locale: string
  labels?: {
    title?: string
    subtitle?: string
    placeholder?: string
    button?: string
    success?: string
    error?: string
  }
}

export default function NewsletterForm({ locale, labels = {} }: Props): ReactNode {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const isFr = locale === 'fr'
  const t = {
    title:       labels.title       ?? (isFr ? 'Recevez nos guides gratuits' : 'Get our free housing guides'),
    subtitle:    labels.subtitle    ?? (isFr
      ? 'Conseils logement Tokyo, share houses, visas. Une fois par mois, pas de spam.'
      : 'Tokyo housing tips, share houses, visa guides. Once a month, no spam.'),
    placeholder: labels.placeholder ?? (isFr ? 'Votre email' : 'Your email'),
    button:      labels.button      ?? (isFr ? 'Je m\'abonne' : 'Subscribe'),
    success:     labels.success     ?? (isFr ? 'Merci ! Vérifiez votre boite email.' : 'Thanks! Check your inbox.'),
    error:       labels.error       ?? (isFr ? 'Une erreur est survenue. Réessayez.' : 'Something went wrong. Please retry.'),
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, locale }),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="newsletter-form">
      <h3>{t.title}</h3>
      <p>{t.subtitle}</p>
      {status === 'success' ? (
        <p className="newsletter-success">{t.success}</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder={t.placeholder}
            required
            disabled={status === 'loading'}
          />
          <button type="submit" disabled={status === 'loading'}>
            {status === 'loading' ? '...' : t.button}
          </button>
          {status === 'error' && <p className="newsletter-error">{t.error}</p>}
        </form>
      )}
    </div>
  )
}
