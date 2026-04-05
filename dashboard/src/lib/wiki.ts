import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const REPO_ROOT = path.resolve(process.cwd(), '..')
const WIKI_DIR = path.join(REPO_ROOT, 'wiki')

export interface WikiArticle {
  title: string
  slug: string
  category: string
  status: 'draft' | 'review' | 'validated'
  tags: string[]
}

const SKIP_FILES = new Set(['index.md', 'glossary.md'])

export interface WikiSearchResult {
  title: string
  slug: string
  category: string
  status: 'draft' | 'review' | 'validated'
  tags: string[]
  /** First matching line with surrounding context */
  excerpt: string
  /** What matched: 'title' | 'tag' | 'content' */
  matchType: 'title' | 'tag' | 'content'
}

export function searchWiki(query: string): WikiSearchResult[] {
  const results: WikiSearchResult[] = []
  const q = query.toLowerCase().trim()
  if (!q || q.length < 2) return results

  try {
    const walkDir = (dir: string) => {
      for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name)

        if (entry.isDirectory()) {
          if (entry.name === 'contacts' || entry.name === 'meta') continue
          walkDir(full)
        } else if (entry.name.endsWith('.md') && !SKIP_FILES.has(entry.name)) {
          try {
            const raw = fs.readFileSync(full, 'utf8')
            const { data, content } = matter(raw)

            const relDir = path.relative(WIKI_DIR, path.dirname(full))
            const category: string =
              typeof data.category === 'string'
                ? data.category
                : relDir.split(path.sep)[0] || 'misc'

            const slug = entry.name.replace(/\.md$/, '')
            const title = typeof data.title === 'string' ? data.title : slug
            const tags: string[] = Array.isArray(data.tags) ? data.tags : []
            const status = (['draft', 'review', 'validated'] as const).includes(data.status)
              ? data.status
              : 'draft'

            // Check title match
            if (title.toLowerCase().includes(q)) {
              results.push({ title, slug, category, status, tags, excerpt: title, matchType: 'title' })
              return
            }

            // Check tag match
            const matchedTag = tags.find(t => String(t).toLowerCase().includes(q))
            if (matchedTag) {
              results.push({ title, slug, category, status, tags, excerpt: `Tag: ${matchedTag}`, matchType: 'tag' })
              return
            }

            // Check content match
            const lines = content.split('\n')
            for (let i = 0; i < lines.length; i++) {
              if (lines[i].toLowerCase().includes(q)) {
                const excerpt = lines[i].trim().slice(0, 200)
                results.push({ title, slug, category, status, tags, excerpt, matchType: 'content' })
                return
              }
            }
          } catch { /* skip */ }
        }
      }
    }

    if (fs.existsSync(WIKI_DIR)) walkDir(WIKI_DIR)
  } catch { /* wiki dir missing */ }

  // Sort: title matches first, then tags, then content
  const order = { title: 0, tag: 1, content: 2 }
  results.sort((a, b) => order[a.matchType] - order[b.matchType])

  return results.slice(0, 30)
}

export function getWikiArticlesByCategory(): Record<string, WikiArticle[]> {
  const byCategory: Record<string, WikiArticle[]> = {}

  try {
    const walkDir = (dir: string) => {
      for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name)

        if (entry.isDirectory()) {
          // skip contacts subdirectory (sensitive)
          if (entry.name === 'contacts') continue
          walkDir(full)
        } else if (entry.name.endsWith('.md') && !SKIP_FILES.has(entry.name)) {
          try {
            const raw = fs.readFileSync(full, 'utf8')
            const { data } = matter(raw)

            // Derive category from frontmatter or directory name
            const relDir = path.relative(WIKI_DIR, path.dirname(full))
            const category: string =
              typeof data.category === 'string'
                ? data.category
                : relDir.split(path.sep)[0] || 'misc'

            const slug = entry.name.replace(/\.md$/, '')

            if (!byCategory[category]) byCategory[category] = []
            byCategory[category].push({
              title: typeof data.title === 'string' ? data.title : slug,
              slug,
              category,
              status: (['draft', 'review', 'validated'] as const).includes(data.status)
                ? data.status
                : 'draft',
              tags: Array.isArray(data.tags) ? data.tags : [],
            })
          } catch {
            /* skip unreadable files */
          }
        }
      }
    }

    if (fs.existsSync(WIKI_DIR)) walkDir(WIKI_DIR)
  } catch {
    /* wiki dir missing */
  }

  return byCategory
}
