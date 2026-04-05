'use client'

import { useState, useEffect, useRef } from 'react'

interface SearchResult {
  title: string
  slug: string
  category: string
  status: 'draft' | 'review' | 'validated'
  tags: string[]
  excerpt: string
  matchType: 'title' | 'tag' | 'content'
}

const STATUS_ICON: Record<string, string> = {
  validated: '✅',
  review: '🔄',
  draft: '✏️',
}

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(null)

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)

    if (query.trim().length < 2) {
      setResults([])
      return
    }

    setLoading(true)
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/wiki/search?q=${encodeURIComponent(query)}`)
        const data = await res.json()
        setResults(data)
      } catch {
        setResults([])
      } finally {
        setLoading(false)
      }
    }, 250)
  }, [query])

  return (
    <div>
      <div style={{ position: 'relative', marginBottom: 'var(--s-6)' }}>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Rechercher un article, tag ou contenu…"
          style={{
            width: '100%',
            padding: '12px 16px',
            fontFamily: 'var(--font-body)',
            fontSize: '0.9rem',
            background: 'var(--bg-2)',
            border: '1px solid var(--border)',
            borderRadius: '2px',
            color: 'var(--tx-hi)',
            outline: 'none',
            transition: 'border-color 0.15s',
          }}
          onFocus={e => (e.target.style.borderColor = 'var(--tx-lo)')}
          onBlur={e => (e.target.style.borderColor = 'var(--border)')}
        />
        {loading && (
          <span
            style={{
              position: 'absolute',
              right: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              color: 'var(--tx-muted)',
            }}
          >
            …
          </span>
        )}
      </div>

      {results.length > 0 && (
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div
            style={{
              padding: '12px 16px',
              borderBottom: '1px solid var(--border)',
            }}
          >
            <span className="font-meta">
              {results.length} résultat{results.length !== 1 ? 's' : ''}
            </span>
          </div>
          {results.map((r, i) => (
            <div
              key={r.slug}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                padding: '12px 16px',
                borderBottom: i < results.length - 1 ? '1px solid var(--border)' : 'none',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '0.75rem' }}>{STATUS_ICON[r.status] ?? '✏️'}</span>
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: 'var(--tx-hi)',
                  }}
                >
                  {r.title}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.6875rem',
                    color: 'var(--tx-muted)',
                    marginLeft: 'auto',
                  }}
                >
                  {r.category}
                </span>
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: 'var(--tx-lo)',
                  lineHeight: 1.5,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {r.excerpt}
              </div>
              {r.tags.length > 0 && (
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '2px' }}>
                  {r.tags.slice(0, 5).map(tag => (
                    <span
                      key={tag}
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.625rem',
                        color: 'var(--tx-muted)',
                        background: 'var(--bg-3)',
                        padding: '1px 6px',
                        borderRadius: '1px',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {query.trim().length >= 2 && !loading && results.length === 0 && (
        <div
          style={{
            padding: '16px',
            fontFamily: 'var(--font-body)',
            fontSize: '0.8125rem',
            color: 'var(--tx-muted)',
            textAlign: 'center',
          }}
        >
          Aucun résultat pour &ldquo;{query}&rdquo;
        </div>
      )}
    </div>
  )
}
