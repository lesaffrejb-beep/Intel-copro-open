import { NextRequest, NextResponse } from 'next/server'
import { createRawNote } from '@/lib/notes'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const text = typeof body?.text === 'string' ? body.text : ''
    const title = typeof body?.title === 'string' ? body.title : undefined
    const source = typeof body?.source === 'string' ? body.source : undefined
    const tags = Array.isArray(body?.tags) ? body.tags : undefined

    if (!text.trim()) {
      return NextResponse.json({ error: 'Champ text requis' }, { status: 400 })
    }

    const note = createRawNote({ text, title, source, tags })

    return NextResponse.json(
      {
        ok: true,
        file: note.filename,
        path: `raw/notes-terrain/${note.filename}`,
      },
      { status: 201 }
    )
  } catch (err) {
    console.error('[note API POST]', err)
    return NextResponse.json({ error: 'Erreur création note terrain' }, { status: 500 })
  }
}
