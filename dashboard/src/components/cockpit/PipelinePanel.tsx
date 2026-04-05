'use client'

import { useState } from 'react'

interface PipelinePanelProps {
  pending: number
  total: number    // wiki articles
  commits7d: number
  modified7d: number
  brokenLinks: number
  articleStatus: {
    validated: number
    review: number
    draft: number
  }
}

export function PipelinePanel({
  pending,
  total,
  commits7d,
  modified7d,
  brokenLinks,
  articleStatus,
}: PipelinePanelProps) {
  const [showPipelineDetail, setShowPipelineDetail] = useState(false)

  const lintStatus =
    brokenLinks === 0 ? 'ok' : brokenLinks <= 3 ? 'warn' : 'err'

  const lintColor =
    lintStatus === 'ok'
      ? 'var(--ok)'
      : lintStatus === 'warn'
      ? 'var(--warn)'
      : 'var(--err)'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-6)' }}>

      {/* ── Pipeline: raw → wiki ── */}
      <div>
        <div className="font-meta" style={{ marginBottom: 'var(--s-4)' }}>
          Pipeline
        </div>
        <div
          className="card"
          style={{ overflow: 'hidden' }}
        >
          {/* Stage 01: raw/ */}
          <div
            style={{
              padding: '14px 18px',
              borderBottom: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.5rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: 'var(--tx-muted)',
                  marginBottom: '5px',
                }}
              >
                01 raw/
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '1.75rem',
                  letterSpacing: '-0.03em',
                  lineHeight: 1,
                  color: pending > 0 ? 'var(--warn)' : 'var(--tx-muted)',
                }}
              >
                {pending}
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.5625rem',
                  color: pending > 0 ? 'var(--warn)' : 'var(--tx-muted)',
                  letterSpacing: '0.04em',
                }}
              >
                {pending > 0 ? 'à compiler' : 'néant'}
              </div>
              {pending > 0 && (
                <button
                  onClick={() => setShowPipelineDetail((v) => !v)}
                  style={{
                    marginTop: '6px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.5rem',
                    color: 'var(--tx-muted)',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    padding: 0,
                  }}
                >
                  {showPipelineDetail ? '▲ réduire' : '▼ voir'}
                </button>
              )}
            </div>
          </div>

          {/* Arrow / transition label */}
          <div
            style={{
              padding: '7px 18px',
              borderBottom: '1px solid var(--border)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.5rem',
              color: 'var(--tx-muted)',
              letterSpacing: '0.08em',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span style={{ color: 'var(--border-hi)' }}>↓</span>
            compile-to-wiki
          </div>

          {/* Stage 02: wiki/ */}
          <div
            style={{
              padding: '14px 18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.5rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: 'var(--tx-muted)',
                  marginBottom: '5px',
                }}
              >
                02 wiki/
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '1.75rem',
                  letterSpacing: '-0.03em',
                  lineHeight: 1,
                  color: total > 0 ? 'var(--tx-hi)' : 'var(--tx-muted)',
                }}
              >
                {total}
              </div>
            </div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.5625rem',
                color: 'var(--tx-lo)',
                textAlign: 'right',
              }}
            >
              articles
            </div>
          </div>
        </div>
      </div>

      {/* ── Statut articles ── */}
      <div>
        <div className="font-meta" style={{ marginBottom: 'var(--s-4)' }}>
          Statut articles
        </div>
        <div className="card" style={{ overflow: 'hidden' }}>
          {[
            { label: 'Validés', count: articleStatus.validated, color: 'var(--ok)' },
            { label: 'En révision', count: articleStatus.review, color: 'var(--warn)' },
            { label: 'Brouillons', count: articleStatus.draft, color: 'var(--tx-muted)' },
          ].map(({ label, count, color }, i, arr) => (
            <div
              key={label}
              style={{
                padding: '10px 18px',
                borderBottom: i < arr.length - 1 ? '1px solid var(--border)' : 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span
                  style={{
                    width: '4px',
                    height: '4px',
                    borderRadius: '50%',
                    background: color,
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.6875rem',
                    color: 'var(--tx-lo)',
                  }}
                >
                  {label}
                </span>
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.875rem',
                  color: count > 0 ? color : 'var(--tx-muted)',
                  fontWeight: count > 0 ? 700 : 400,
                }}
              >
                {count}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Lint ── */}
      <div>
        <div className="font-meta" style={{ marginBottom: 'var(--s-4)' }}>
          Intégrité
        </div>
        <div
          className="card"
          style={{
            padding: '14px 18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                width: '5px',
                height: '5px',
                borderRadius: '50%',
                background: lintColor,
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6875rem',
                color: 'var(--tx-lo)',
              }}
            >
              Liens cassés
            </span>
          </div>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '1rem',
              color: lintColor,
              fontWeight: 700,
            }}
          >
            {brokenLinks}
          </span>
        </div>
      </div>

      {/* ── Activité ── */}
      <div>
        <div className="font-meta" style={{ marginBottom: 'var(--s-4)' }}>
          Activité (7j)
        </div>
        <div className="card" style={{ overflow: 'hidden' }}>
          {[
            {
              label: 'Commits',
              value: commits7d,
              color: commits7d > 0 ? 'var(--ok)' : 'var(--warn)',
            },
            {
              label: 'Articles modifiés',
              value: modified7d,
              color: modified7d > 0 ? 'var(--tx-hi)' : 'var(--tx-muted)',
            },
          ].map(({ label, value, color }, i, arr) => (
            <div
              key={label}
              style={{
                padding: '10px 18px',
                borderBottom: i < arr.length - 1 ? '1px solid var(--border)' : 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6875rem',
                  color: 'var(--tx-lo)',
                }}
              >
                {label}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.875rem',
                  color,
                  fontWeight: 700,
                }}
              >
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
