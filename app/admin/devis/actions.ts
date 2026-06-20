'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function login(formData: FormData) {
  const user = formData.get('user') as string
  const pass = formData.get('pass') as string

  const validUser = process.env.ADMIN_USER
  const validPass = process.env.ADMIN_PASSWORD

  if (user === validUser && pass === validPass) {
    const cookieStore = await cookies()
    cookieStore.set('admin_auth', `${validUser}:${validPass}`, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 jours
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
