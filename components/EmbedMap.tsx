'use client'

import { useState } from 'react'

export default function EmbedMap({ code, locale }: { code: string; locale: 'en' | 'fr' }) {
  const [copied, setCopied] = useState(false)
  const en = locale === 'en'

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      // clipboard indisponible : selection manuelle du <pre> reste possible
    }
  }

  return (
    <div className="mt-5 rounded-2xl border-2 border-[#e84141]/30 bg-[#0f2744]/[0.03] p-5">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <p className="text-sm font-bold text-[#0f2744]">
            {en ? 'Use this map on your site — free' : 'Utilisez cette carte sur votre site — gratuit'}
          </p>
          <p className="text-xs text-gray-500 mt-1 max-w-lg">
            {en
              ? 'Writers, bloggers and journalists: republish this map anywhere. All we ask is that you keep the link back to this page.'
              : 'Rédacteurs, blogueurs et journalistes : republiez cette carte où vous voulez. Nous demandons seulement de conserver le lien vers cette page.'}
          </p>
        </div>
        <button
          onClick={copy}
          className="shrink-0 rounded-lg bg-[#e84141] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#d13636]"
        >
          {copied
            ? (en ? '✓ Copied' : '✓ Copié')
            : (en ? 'Copy embed code' : 'Copier le code')}
        </button>
      </div>
      <pre className="mt-3 text-[11px] text-gray-600 whitespace-pre-wrap break-all bg-white border border-gray-200 rounded-lg p-3 overflow-x-auto">{code}</pre>
    </div>
  )
}
