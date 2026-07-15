import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, message, locale } = body

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY
    if (!RESEND_API_KEY) {
      return NextResponse.json({ error: 'Not configured' }, { status: 500 })
    }

    const subject = locale === 'fr'
      ? `[Tokyo Expat] Nouveau message de ${name}`
      : `[Tokyo Expat] New message from ${name}`

    const html = `
      <h2>${subject}</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Locale:</strong> ${locale}</p>
      <hr />
      <p>${message.replace(/\n/g, '<br>')}</p>
    `

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Tokyo Expat <contact@tokyo-expat.com>',
        to: ['info.tokyoinsights@gmail.com'],
        subject,
        html,
        reply_to: email,
      }),
    })

    if (!res.ok) {
      const err = await res.text()
      console.error('Resend error:', err)
      return NextResponse.json({ error: 'Email failed', _debug: err, _status: res.status }, { status: 500 })
    }

    // Alerte TEMPS REEL (non bloquante) : ping Telegram a chaque nouveau lead /contact.
    // Reutilise TELEGRAM_BOT_TOKEN + TELEGRAM_CHAT_ID deja poses sur Vercel.
    // Priorite #1 = ne jamais rater un lead. Silencieux si les env vars manquent.
    const tgToken = process.env.TELEGRAM_BOT_TOKEN
    const tgChat = process.env.TELEGRAM_CHAT_ID
    if (tgToken && tgChat) {
      try {
        await fetch(`https://api.telegram.org/bot${tgToken}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: tgChat,
            text: `\u{1F3AF} NOUVEAU LEAD (/contact)\n${name}\n${email}\nLangue: ${locale || '?'}\n\n${String(message).slice(0, 800)}`,
          }),
        })
      } catch (tgErr) {
        console.error('Telegram lead alert failed:', tgErr)
      }
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
