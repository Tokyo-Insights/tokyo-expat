import Link from 'next/link'

// 404 du site public : rendue dans le layout [locale] (en-tete, pied de page, lang).
// Necessaire depuis le 24/10/2026 : sans layout racine global, la 404 par defaut de
// Next sortait une page d'erreur nue. not-found ne recoit pas la langue : texte FR + EN.
export default function NotFound() {
  return (
    <section className="max-w-2xl mx-auto px-4 py-24 text-center">
      <p className="text-sm font-semibold text-gray-500">404</p>
      <h1 className="mt-2 text-3xl font-bold">Page introuvable · Page not found</h1>
      <p className="mt-4 text-gray-600">
        Cette page n&apos;existe pas ou a été déplacée. This page does not exist or has moved.
      </p>
      <div className="mt-8 flex justify-center gap-4">
        <Link href="/fr" className="rounded-lg bg-[#0f2744] px-5 py-2.5 text-white">Accueil</Link>
        <Link href="/en" className="rounded-lg border border-[#0f2744] px-5 py-2.5 text-[#0f2744]">Home</Link>
      </div>
    </section>
  )
}
