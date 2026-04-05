import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { DiscType, EnneagramType, DiscConfidence } from './disc'

const REPO_ROOT = path.resolve(process.cwd(), '..')
export const CONTACTS_DIR = path.join(REPO_ROOT, 'wiki', 'meta', 'contacts')

export interface Contact {
  slug: string
  title: string
  tags: string[]
  created: string
  updated: string
  disc_primary?: DiscType
  disc_secondary?: DiscType
  disc_confidence?: DiscConfidence
  enneagram_type?: EnneagramType
  enneagram_wing?: EnneagramType
  residences?: string[]
  interactions?: ContactInteraction[]
  body: string
}

export interface ContactInteraction {
  date: string
  sujet: string
  resultat: string
}

export function ensureContactsDir() {
  if (!fs.existsSync(CONTACTS_DIR)) {
    fs.mkdirSync(CONTACTS_DIR, { recursive: true })
  }
}

export function listContacts(): Contact[] {
  ensureContactsDir()
  const files = fs.readdirSync(CONTACTS_DIR).filter((f) => f.endsWith('.md'))
  return files.map((f) => readContact(f.replace(/\.md$/, ''))).filter(Boolean) as Contact[]
}

export function readContact(slug: string): Contact | null {
  const filePath = path.join(CONTACTS_DIR, `${slug}.md`)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(raw)

  return {
    slug,
    title: data.title ?? slug,
    tags: data.tags ?? [],
    created: data.created ?? '',
    updated: data.updated ?? '',
    disc_primary: data.disc_primary,
    disc_secondary: data.disc_secondary,
    disc_confidence: data.disc_confidence,
    enneagram_type: data.enneagram_type,
    enneagram_wing: data.enneagram_wing,
    residences: data.residences ?? [],
    interactions: normalizeInteractions(data.interactions),
    body: content.trim(),
  }
}

export function writeContact(slug: string, contact: Partial<Contact> & { title: string }) {
  ensureContactsDir()

  const today = new Date().toISOString().split('T')[0]
  const existing = readContact(slug)

  const frontmatter: Record<string, unknown> = {
    title: contact.title,
    category: 'person',
    tags: contact.tags ?? [],
    created: existing?.created ?? today,
    updated: today,
    sensitivity: 'internal',
    disc_primary: contact.disc_primary ?? null,
    disc_secondary: contact.disc_secondary ?? null,
    disc_confidence: contact.disc_confidence ?? null,
    enneagram_type: contact.enneagram_type ?? null,
    enneagram_wing: contact.enneagram_wing ?? null,
    residences: contact.residences ?? [],
    interactions: normalizeInteractions(contact.interactions),
  }

  const body = contact.body ?? existing?.body ?? defaultContactBody()
  const fileContent = matter.stringify(body, frontmatter)
  fs.writeFileSync(path.join(CONTACTS_DIR, `${slug}.md`), fileContent, 'utf8')
}

function normalizeInteractions(value: unknown): ContactInteraction[] {
  if (!Array.isArray(value)) return []
  return value
    .map((entry) => {
      if (!entry || typeof entry !== 'object') return null
      const item = entry as Record<string, unknown>
      const date = typeof item.date === 'string' ? item.date : ''
      const sujet = typeof item.sujet === 'string' ? item.sujet : ''
      const resultat = typeof item.resultat === 'string' ? item.resultat : ''
      if (!date || !sujet || !resultat) return null
      return { date, sujet, resultat }
    })
    .filter((entry): entry is ContactInteraction => !!entry)
    .sort((a, b) => b.date.localeCompare(a.date))
}

function defaultContactBody(): string {
  return `## Notes comportementales
[Observer : style de communication, réaction aux conflits, rythme de décision]

## Style de communication adapté
- Format privilégié :
- Ce qui fonctionne :
- Ce qu'il faut éviter :

## Peur centrale (Enneagramme)
[Description en 1-2 phrases]
`
}

export function slugify(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}
