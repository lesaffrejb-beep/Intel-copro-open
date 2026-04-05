import fs from 'fs'
import path from 'path'

const REPO_ROOT = path.resolve(process.cwd(), '..')
const RAW_NOTES_DIR = path.join(REPO_ROOT, 'raw', 'notes-terrain')

export interface CreateRawNoteInput {
  text: string
  title?: string
  tags?: string[]
  source?: string
}

function slugify(input: string): string {
  return input
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
}

function sanitizeTags(tags: string[] | undefined): string[] {
  if (!Array.isArray(tags)) return []
  return [...new Set(tags.map(tag => String(tag).trim().toLowerCase()).filter(Boolean))]
}

function nextAvailablePath(basePath: string): string {
  if (!fs.existsSync(basePath)) return basePath

  const extension = path.extname(basePath)
  const basename = basePath.slice(0, -extension.length)

  let i = 2
  while (i <= 9999) {
    const candidate = `${basename}-${i}${extension}`
    if (!fs.existsSync(candidate)) return candidate
    i += 1
  }

  throw new Error('Impossible de générer un nom de fichier unique')
}

export function createRawNote(input: CreateRawNoteInput): { path: string; filename: string } {
  const text = input.text.trim()
  if (!text) throw new Error('Le champ text est vide')

  const dateIso = new Date().toISOString().slice(0, 10)
  const titleFromText = text.split('\n').find(Boolean)?.slice(0, 60) ?? 'note-terrain'
  const title = (input.title?.trim() || titleFromText).replace(/\s+/g, ' ').trim()

  const slug = slugify(title) || 'note-terrain'
  fs.mkdirSync(RAW_NOTES_DIR, { recursive: true })

  const baseFilename = `${dateIso}-${slug}.md`
  const finalPath = nextAvailablePath(path.join(RAW_NOTES_DIR, baseFilename))
  const filename = path.basename(finalPath)

  const source = input.source?.trim() || 'dashboard-api-note'
  const tags = ['notes-terrain', 'api-note', ...sanitizeTags(input.tags)]

  const lines = [
    '---',
    `title: "${title.replace(/"/g, '\\"')}"`,
    `source: "${source.replace(/"/g, '\\"')}"`,
    `date: ${dateIso}`,
    'type: notes-terrain',
    `tags: [${tags.join(', ')}]`,
    'status: raw',
    `created: ${dateIso}`,
    '---',
    '',
    text,
    '',
  ]

  fs.writeFileSync(finalPath, lines.join('\n'), 'utf8')

  return { path: finalPath, filename }
}
