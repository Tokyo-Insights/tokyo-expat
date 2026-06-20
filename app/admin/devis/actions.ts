'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const CREDENTIAL_HASH = '60ae3e46ed42441602e40724cefb80e30f69473c55fb2a012ecd855bcf2b578c'

async function sha256(str: string): Promise<string> {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str))
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('')
}

export async function login(formData: FormData) {
  const user = (formData.get('user') as string ?? '').trim()
  const pass = (formData.get('pass') as string ?? '').trim()

  const hash = await sha256(`${user}:${pass}`)

  if (hash === CREDENTIAL_HASH) {
    const cookieStore = await cookies()
    cookieStore.set('admin_auth', CREDENTIAL_HASH, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7,
      path: '/admin',
    })
  }

  redirect('/admin/devis')
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete('admin_auth')
  redirect('/admin/devis')
}
