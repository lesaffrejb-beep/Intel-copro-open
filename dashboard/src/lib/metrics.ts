import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'

// Repo root = parent of dashboard/
const REPO_ROOT = path.resolve(process.cwd(), '..')
const METRICS_FILE = path.join(REPO_ROOT, 'outputs', 'metrics.md')
const WIKI_DIR = path.join(REPO_ROOT, 'wiki')
const RAW_DIR = path.join(REPO_ROOT, 'raw')

export interface WikiMetrics {
  articles: {
    total: number
    validated: number
    review: number
    draft: number
    objective: number
  }
  words: {
    total: number
    objective: number
  }
  sources: {
    pdfs: number
    ingested: number
  }
  lint: {
    brokenLinks: number
  }
  activity: {
    commits7d: number
    modified7d: number
  }
  pending: number
  byCategory: Record<string, number>
  generatedAt: string
}

/** Extraire une valeur d'un tableau markdown : | Label | Valeur | */
function extractTableValue(content: string, label: string): number {
  const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const re = new RegExp(`\\|\\s*${escaped}\\s*\\|\\s*([\\d,. ]+)\\s*\\|`, 'i')
  const m = content.match(re)
  if (!m) return 0
  return parseInt(m[1].replace(/[\s,]/g, ''), 10) || 0
}

/** Compter les fichiers en attente dans raw/ non encore dans wiki/ */
function countPending(): number {
  try {
    if (!fs.existsSync(RAW_DIR)) return 0
    let count = 0
    const walk = (dir: string) => {
      for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name)
        if (entry.isDirectory()) walk(full)
        else if (entry.name.endsWith('.md')) count++
      }
    }
    walk(RAW_DIR)
    return count
  } catch {
    return 0
  }
}

/** Nombre de commits sur wiki/ ces 7 derniers jours */
function countCommits7d(): number {
  try {
    const out = execSync(
      `git -C "${REPO_ROOT}" log --oneline --since="7 days ago" -- wiki/ 2>/dev/null`,
      { encoding: 'utf8', timeout: 5000 }
    )
    return out.trim().split('\n').filter(Boolean).length
  } catch {
    return 0
  }
}

export async function getMetrics(): Promise<WikiMetrics> {
  let content = ''
  try {
    content = fs.readFileSync(METRICS_FILE, 'utf8')
  } catch {
    // fichier absent — on retourne des zéros
  }

  const byCategory: Record<string, number> = {}
  const catSection = content.match(/## Couverture par catégorie([\s\S]*?)(?=##|$)/)
  if (catSection) {
    const rows = catSection[1].matchAll(/\|\s*(\w[\w-]*)\s*\|\s*(\d+)\s*\|/g)
    for (const [, cat, cnt] of rows) {
      byCategory[cat] = parseInt(cnt, 10)
    }
  }

  const generatedLine = content.match(/_Généré par.*?(\w{3}\s+\w{3}\s+\d+\s+[\d:]+\s+\w+\s+\d{4})/)
  const generatedAt = generatedLine?.[1] ?? new Date().toISOString()

  return {
    articles: {
      total: extractTableValue(content, 'Total articles'),
      validated: extractTableValue(content, 'Validés ✅'),
      review: extractTableValue(content, 'En révision 🔄'),
      draft: extractTableValue(content, 'Brouillons ✏️'),
      objective: 100,
    },
    words: {
      total: extractTableValue(content, 'Mots total'),
      objective: 400_000,
    },
    sources: {
      pdfs: extractTableValue(content, 'PDFs sources'),
      ingested: extractTableValue(content, "Fichiers raw/ ingérés"),
    },
    lint: {
      brokenLinks: extractTableValue(content, 'Liens cassés ⚠️'),
    },
    activity: {
      commits7d: countCommits7d(),
      modified7d: extractTableValue(content, 'Articles modifiés (7j)'),
    },
    pending: countPending(),
    byCategory,
    generatedAt,
  }
}
