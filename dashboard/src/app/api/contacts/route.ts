import { NextRequest, NextResponse } from 'next/server'
import { listContacts, writeContact, slugify } from '@/lib/contacts'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const contacts = listContacts()
    return NextResponse.json(contacts)
  } catch (err) {
    console.error('[contacts API GET]', err)
    return NextResponse.json({ error: 'Erreur lecture contacts' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { title, ...rest } = body

    if (!title || typeof title !== 'string') {
      return NextResponse.json({ error: 'Champ title requis' }, { status: 400 })
    }

    const slug = slugify(title)
    writeContact(slug, { title, ...rest })

    return NextResponse.json({ slug }, { status: 201 })
  } catch (err) {
    console.error('[contacts API POST]', err)
    return NextResponse.json({ error: 'Erreur création contact' }, { status: 500 })
  }
}
