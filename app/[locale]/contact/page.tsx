'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { getDictionary, type Locale } from '@/lib/i18n'

export default function ContactPage() {
  const params = useParams()
  const locale = (params?.locale as Locale) ?? 'fr'
  const dict = getDictionary(locale)
  const c = dict.contact

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message, locale }),
    })
    if (res.ok) setSent(true)
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-extrabold text-[#0f2744] mb-4">{c.title}</h1>
      <p className="text-gray-500 mb-12 leading-relaxed">{c.subtitle}</p>

      {/* Contact form */}
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
            <button
              type="submit"
              className="bg-[#e84141] hover:bg-[#ff6b6b] text-white px-8 py-3 rounded-xl font-bold transition-colors self-start"
            >
              {c.send}
            </button>
          </form>
        )}
      </div>

      {/* Direct email */}
      <div className="mt-8 text-center text-sm text-gray-500">
        <a href="mailto:contact@tokyo-expat.com" className="text-[#0f2744] font-medium hover:text-[#e84141] transition-colors">
          contact@tokyo-expat.com
        </a>
      </div>
    </div>
  )
}
