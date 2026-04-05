import { NextRequest, NextResponse } from 'next/server'
import { readContact, writeContact } from '@/lib/contacts'

export const dynamic = 'force-dynamic'

const SAFE_SLUG = /^[a-z0-9][a-z0-9-]*$/

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  if (!SAFE_SLUG.test(slug)) {
    return NextResponse.json({ error: 'Slug invalide' }, { status: 400 })
  }
  const contact = readContact(slug)
  if (!contact) {
    return NextResponse.json({ error: 'Contact introuvable' }, { status: 404 })
  }
  return NextResponse.json(contact)
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  if (!SAFE_SLUG.test(slug)) {
    return NextResponse.json({ error: 'Slug invalide' }, { status: 400 })
  }
  const existing = readContact(slug)
  if (!existing) {
    return NextResponse.json({ error: 'Contact introuvable' }, { status: 404 })
  }

  const body = await req.json()
  const nextInteractions = Array.isArray(existing.interactions) ? [...existing.interactions] : []
  if (body?.interaction && typeof body.interaction === 'object') {
    const interaction = body.interaction as Record<string, unknown>
    if (
      typeof interaction.date === 'string' &&
      typeof interaction.sujet === 'string' &&
      typeof interaction.resultat === 'string' &&
      interaction.date &&
      interaction.sujet &&
      interaction.resultat
    ) {
      nextInteractions.push({
        date: interaction.date,
        sujet: interaction.sujet,
        resultat: interaction.resultat,
      })
    }
  }

  const { interaction: _interaction, ...patch } = body ?? {}
  writeContact(slug, { ...existing, ...patch, interactions: nextInteractions })
  return NextResponse.json({ slug })
}
