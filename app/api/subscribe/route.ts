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
      }),
    })

    const resText = await res.text()
    console.log('Brevo status:', res.status, resText)

    if (res.status === 204 || res.status === 201 || res.ok) {
      return NextResponse.json({ ok: true })
    }

    return NextResponse.json({ error: 'Subscription failed' }, { status: 500 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
