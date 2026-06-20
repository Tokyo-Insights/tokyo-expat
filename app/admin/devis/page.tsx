import { cookies } from 'next/headers'
import { login } from './actions'
import DevisGenerator from './DevisGenerator'

export const metadata = { robots: 'noindex, nofollow' }

const CREDENTIAL_HASH = '471140ac30abca250357ff668e9ef628f9ea21a312a41f385b91ad204b2f8249'

async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies()
  const token = cookieStore.get('admin_auth')?.value
  return token === CREDENTIAL_HASH
}

export default async function AdminDevisPage() {
  const authed = await isAuthenticated()

  if (authed) {
    return <DevisGenerator />
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="text-3xl mb-3">🔒</div>
          <h1 className="text-xl font-extrabold text-[#0f2744]">Tokyo Expat Admin</h1>
          <p className="text-sm text-gray-500 mt-1">Accès réservé</p>
        </div>
        <form action={login} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">
              Identifiant
            </label>
            <input
              name="user"
              type="text"
              autoComplete="username"
              required
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f2744]/20"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">
              Mot de passe
            </label>
            <input
              name="pass"
              type="password"
              autoComplete="current-password"
              required
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f2744]/20"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#0f2744] hover:bg-[#1a3a6b] text-white py-3 rounded-xl font-semibold text-sm transition-colors mt-2"
          >
            Connexion
          </button>
        </form>
      </div>
    </div>
  )
}
