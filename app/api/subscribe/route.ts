import { NextRequest, NextResponse } from 'next/server'

const BREVO_LIST_ID = 3

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, locale } = body

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    const apiKey = process.env.BREVO_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: 'Not configured' }, { status: 500 })
    }

    const res = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        listIds: [BREVO_LIST_ID],
        updateEnabled: true,
        attributes: { LANGUE: locale === 'en' ? 'en' : 'fr' },
      }),
    })

    const resText = await res.text()
    console.log('Brevo status:', res.status, resText)

    if (res.status === 204 || res.status === 201 || res.ok) {
      // Envoi de l'email de bienvenue #1 (avec le PDF) via template transactionnel Brevo.
      // Template 1 = FR "Votre checklist relocation Japon est ici", 4 = EN equivalent.
      // Non bloquant : si l'envoi echoue, l'inscription reste un succes (PDF aussi dispo en download direct).
      const welcomeTemplateId = locale === 'en' ? 4 : 1
      try {
        const mailRes = await fetch('https://api.brevo.com/v3/smtp/email', {
          method: 'POST',
          headers: {
            'api-key': apiKey,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            to: [{ email }],
            templateId: welcomeTemplateId,
          }),
        })
        console.log('Brevo welcome email status:', mailRes.status, await mailRes.text())
      } catch (mailErr) {
        console.error('Welcome email send failed:', mailErr)
      }

      return NextResponse.json({ ok: true })
    }

    return NextResponse.json({ error: 'Subscription failed' }, { status: 500 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
