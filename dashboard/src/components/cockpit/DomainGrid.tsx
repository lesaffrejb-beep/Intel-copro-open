'use client'

import { useState } from 'react'

// Canonical domain order + display labels
const DOMAINS: { key: string; label: string; description: string }[] = [
  { key: 'concepts',      label: 'Concepts',       description: 'Définitions juridiques & fondamentaux' },
  { key: 'procedures',    label: 'Procédures',      description: 'Étapes opérationnelles à suivre' },
  { key: 'jurisprudence', label: 'Jurisprudence',   description: 'Décisions de justice & sources' },
  { key: 'financement',   label: 'Financement',     description: 'Crédit, subventions, PTZ' },
  { key: 'technique',     label: 'Technique',       description: 'Ascenseur, pathologies, DTG' },
  { key: 'outils',        label: 'Outils',          description: 'Méthodes de travail & système' },
]

interface Article {
  title: string
  slug: string
  status: string
}

interface DomainGridProps {
  byCategory: Record<string, Article[]>
}

export function DomainGrid({ byCategory }: DomainGridProps) {
  const [hovered, setHovered] = useState<string | null>(null)

  const enriched = DOMAINS.map((d) => ({
    ...d,
    articles: byCategory[d.key] ?? [],
    count: (byCategory[d.key] ?? []).length,
  }))

  const maxCount = Math.max(...enriched.map((d) => d.count), 1)

  return (
    <div>
      <div className="font-meta" style={{ marginBottom: 'var(--s-4)' }}>
        Couverture des domaines
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1px',
          background: 'var(--border)',
          border: '1px solid var(--border)',
          borderRadius: '2px',
          overflow: 'hidden',
        }}
      >
        {enriched.map((domain, i) => {
          const isHovered = hovered === domain.key
          const isEmpty = domain.count === 0
          // Depth fill: how much of the cell to "paint" relative to max
          const fillPct = Math.max(domain.count / maxCount, 0)

          return (
            <div
              key={domain.key}
              className={`domain-cell stagger-${i}`}
              onMouseEnter={() => setHovered(domain.key)}
              onMouseLeave={() => setHovered(null)}
              style={{
                background: isHovered ? 'var(--bg-2)' : 'var(--bg-1)',
                padding: '18px 20px',
                position: 'relative',
                minHeight: '112px',
                overflow: 'hidden',
              }}
            >
              {/* Depth fill bar — bottom of cell, grows with article count */}
              {!isEmpty && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: `${fillPct * 60}%`,
                    background: `rgba(255,255,255,0.025)`,
                    pointerEvents: 'none',
                    transition: 'height 0.4s cubic-bezier(0.16,1,0.3,1)',
                  }}
                />
              )}

              {/* Default state: big number + label */}
              <div
                style={{
                  opacity: isHovered ? 0 : 1,
                  transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
                  transition: 'opacity 0.15s ease, transform 0.15s ease',
                  pointerEvents: isHovered ? 'none' : 'auto',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '2rem',
                    fontWeight: 400,
                    letterSpacing: '-0.03em',
                    lineHeight: 1,
                    color: isEmpty ? 'var(--tx-muted)' : 'var(--tx-hi)',
                    marginBottom: '8px',
                  }}
                >
                  {domain.count}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.6rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    color: isEmpty ? 'var(--tx-muted)' : 'var(--tx-lo)',
                  }}
                >
                  {domain.label}
                </div>

                {isEmpty && (
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '14px',
                      left: '20px',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.5rem',
                      color: 'var(--border-hi)',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                    }}
                  >
                    vide
                  </div>
                )}
              </div>

              {/* Hover state: article list */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  padding: '14px 18px',
                  opacity: isHovered ? 1 : 0,
                  transform: isHovered ? 'translateY(0)' : 'translateY(6px)',
                  transition: 'opacity 0.15s ease, transform 0.15s ease',
                  pointerEvents: isHovered ? 'auto' : 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '2px',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.5rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    color: 'var(--tx-lo)',
                    marginBottom: '8px',
                  }}
                >
                  {domain.label} · {domain.description}
                </div>

                {domain.articles.length === 0 ? (
                  <div
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.75rem',
                      color: 'var(--tx-muted)',
                      fontStyle: 'italic',
                    }}
                  >
                    Aucun article — à compiler depuis raw/
                  </div>
                ) : (
                  domain.articles.slice(0, 5).map((a) => (
                    <div
                      key={a.slug}
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.6875rem',
                        lineHeight: 1.35,
                        color:
                          a.status === 'validated'
                            ? 'var(--ok)'
                            : a.status === 'review'
                            ? 'var(--warn)'
                            : 'var(--tx-md)',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {a.status === 'validated' ? '✓ ' : a.status === 'review' ? '~ ' : '· '}
                      {a.title}
                    </div>
                  ))
                )}

                {domain.articles.length > 5 && (
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.5625rem',
                      color: 'var(--tx-muted)',
                      marginTop: '4px',
                    }}
                  >
                    +{domain.articles.length - 5} autres
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
