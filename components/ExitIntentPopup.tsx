'use client'

import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'

/**
 * Pop-up exit-intent (capture email) -- amplifie l'aimant qui convertit (checklist).
 * Regles: DESKTOP-only (evite la penalite Google interstitiel mobile + le tactile),
 * ne s'arme qu'apres 8s, se declenche quand la souris quitte par le HAUT (intent
 * de fermer/changer d'onglet), skip sur /checklist.
 *
 * Revu le 16/09/2026 sur preuve Brevo: cette pop-up est la 2e source de captures du
 * site (4 sur 16 vrais contacts) et celle qui ramene les MEILLEURS noms (une adresse
 * corporate, une adresse francaise). Trois defauts corriges:
 *
 *  1. `te_exit_shown` etait pose a l'OUVERTURE et n'expirait JAMAIS, pour tout le site.
 *     Un visiteur qui l'avait vue une fois sans s'inscrire ne la revoyait plus jamais,
 *     nulle part. Or sur une page de donnees les visiteurs RECURRENTS sont justement
 *     les plus proches d'une decision. Desormais: reactivation apres COOLDOWN_DAYS.
 *  2. Aucune trace de la conversion: quelqu'un qui S'ETAIT inscrit pouvait la revoir.
 *     Desormais `te_exit_done` coupe definitivement pour un inscrit.
 *  3. Elle proposait la checklist relocation meme sur /data, ou le lecteur vient de
 *     passer du temps sur l'indice des loyers. L'aimant suit maintenant la PAGE.
 */
const COOLDOWN_DAYS = 14
const SEEN = 'te_exit_shown'   // horodatage du dernier affichage
const DONE = 'te_exit_done'    // '1' = deja inscrit, ne plus jamais afficher

function shouldSkip(): boolean {
  try {
    if (localStorage.getItem(DONE) === '1') return true
    const last = localStorage.getItem(SEEN)
    if (!last) return false
    // '1' = ancien format pose avant le 16/09/2026: on le traite comme expire.
    if (last === '1') return false
    const ts = Number(last)
    if (!Number.isFinite(ts)) return false
    return Date.now() - ts < COOLDOWN_DAYS * 86400000
  } catch {
    return false // localStorage indisponible (navigation privee): ne pas bloquer
  }
}

export default function ExitIntentPopup({ locale }: { locale: string }): ReactNode {
  const isFr = locale === 'fr'
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  // Sur /data le lecteur vient de consulter l'indice: lui proposer une checklist
  // relocation est un coq-a-l'ane. L'aimant suit l'intention de la page.
  const [isIndex, setIsIndex] = useState(false)

  const pdfUrl = isIndex
    ? (isFr ? '/tokyo-rent-index-fr.pdf' : '/tokyo-rent-index-en.pdf')
    : (isFr ? '/checklist-relocation-japon.pdf' : '/japan-relocation-checklist.pdf')
  const source = isIndex ? 'lead-magnet-exit-popup-rent-index' : 'lead-magnet-exit-popup'

  useEffect(() => {
    if (typeof window === 'undefined') return
    // Desktop avec souris uniquement (pas de tactile -> pas de penalite interstitiel).
    const isDesktop = window.matchMedia('(min-width: 1024px) and (hover: hover) and (pointer: fine)').matches
    if (!isDesktop) return
    if (window.location.pathname.includes('/checklist')) return
    if (shouldSkip()) return

    setIsIndex(/\/data(\/|$)/.test(window.location.pathname))

    let armed = false
    const armTimer = window.setTimeout(() => { armed = true }, 8000)

    const onLeave = (e: MouseEvent) => {
      // relatedTarget null + clientY <= 0 = la souris est sortie par le haut de la fenetre
      if (armed && e.clientY <= 0 && !e.relatedTarget && !shouldSkip()) {
        setOpen(true)
        try { localStorage.setItem(SEEN, String(Date.now())) } catch { /* ignore */ }
        document.removeEventListener('mouseout', onLeave)
      }
    }
    document.addEventListener('mouseout', onLeave)
    return () => {
      window.clearTimeout(armTimer)
      document.removeEventListener('mouseout', onLeave)
    }
  }, [])

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, locale, source }),
      })
      if (res.ok) {
        // Inscrit: ne plus jamais lui reproposer la pop-up, cooldown ou pas.
        try { localStorage.setItem(DONE, '1') } catch { /* ignore */ }
      }
      if (res.ok && typeof window !== 'undefined' && typeof (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag === 'function') {
        (window as unknown as { gtag: (...a: unknown[]) => void }).gtag('event', 'generate_lead', { source, locale })
      }
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4"
      onClick={() => setOpen(false)}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setOpen(false)}
          aria-label={isFr ? 'Fermer' : 'Close'}
          className="absolute top-3 right-4 text-gray-400 hover:text-gray-700 text-2xl leading-none"
        >
          ×
        </button>

        {status === 'success' ? (
          <div>
            <p className="text-xl font-bold text-[#0f2744] mb-2">{isFr ? "C'est prêt !" : 'It is ready!'}</p>
            <p className="text-sm text-gray-600 mb-4">
              {isIndex
                ? (isFr
                  ? 'Votre indice complet arrive dans votre boîte. Vous pouvez aussi le télécharger tout de suite :'
                  : 'Your full index is on its way to your inbox. You can also download it right now:')
                : (isFr
                  ? 'Votre checklist arrive dans votre boîte. Vous pouvez aussi la télécharger tout de suite :'
                  : 'Your checklist is on its way to your inbox. You can also download it right now:')}
            </p>
            <a
              href={pdfUrl}
              download
              className="inline-block bg-[#e84141] hover:bg-[#c73333] text-white px-6 py-3 rounded-xl font-semibold transition-colors"
            >
              {isIndex
                ? (isFr ? 'Télécharger l\'indice (PDF)' : 'Download the index (PDF)')
                : (isFr ? 'Télécharger la checklist (PDF)' : 'Download the checklist (PDF)')}
            </a>
          </div>
        ) : (
          <>
            <span className="inline-block bg-[#e84141]/10 text-[#e84141] text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wider">
              {isFr ? 'PDF gratuit' : 'Free PDF'}
            </span>
            <p className="text-xl font-bold text-[#0f2744] mb-1">
              {isIndex
                ? (isFr ? 'Emportez les chiffres avec vous' : 'Take the numbers with you')
                : (isFr ? 'Un instant avant de partir' : 'One thing before you go')}
            </p>
            <p className="text-sm text-gray-500 mb-4 leading-relaxed">
              {isIndex
                ? (isFr
                  ? "Cette page est un instantané. Recevez l'indice complet (23 arrondissements, 27 lignes, 50 stations) en PDF, plus les chiffres actualisés à chaque mise à jour trimestrielle."
                  : 'This page is a snapshot. Get the full index (23 wards, 27 lines, 50 stations) as a PDF, plus the refreshed figures at every quarterly update.')
                : (isFr
                  ? "Récupérez la checklist relocation Japon : 90+ actions concrètes, du visa au compte en banque. Tout ce que j'aurais aimé savoir avant d'arriver."
                  : 'Grab the Japan relocation checklist: 90+ concrete steps, from visa prep to opening a bank account. Everything I wish I had known before arriving.')}
            </p>
            <form onSubmit={submit} className="flex flex-col gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={isFr ? 'Votre email' : 'Your email'}
                disabled={status === 'loading'}
                className="px-4 py-3 rounded-xl text-sm border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#e84141]"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="px-6 py-3 rounded-xl text-sm font-semibold bg-[#e84141] hover:bg-[#c73333] text-white transition-colors disabled:opacity-50"
              >
                {status === 'loading'
                  ? (isFr ? 'Envoi...' : 'Sending...')
                  : isIndex
                    ? (isFr ? 'Recevoir le PDF + les MAJ' : 'Email me the PDF + updates')
                    : (isFr ? 'Recevoir la checklist' : 'Get the checklist')}
              </button>
            </form>
            {status === 'error' && (
              <p className="text-red-500 text-xs mt-2">
                {isFr ? 'Une erreur est survenue. Réessayez.' : 'Something went wrong. Please retry.'}
              </p>
            )}
            <p className="text-[10px] text-gray-400 mt-3">
              {isFr
                ? 'Un seul email de bienvenue + les mises à jour data. Désinscription en 1 clic.'
                : 'One welcome email + data updates. Unsubscribe in one click.'}
            </p>
          </>
        )}
      </div>
    </div>
  )
}
