/**
 * VitalCard — metric card with CSS-animated fill bar.
 * Server-renderable: no client hooks. Animation via CSS keyframe + class.
 */

interface VitalCardProps {
  value: number | string
  label: string
  sublabel?: string
  current?: number
  max?: number
  color?: string        // CSS var, e.g. 'var(--ok)'
  stagger?: 0 | 1 | 2 | 3 | 4 | 5
  unit?: string
}

export function VitalCard({
  value,
  label,
  sublabel,
  current,
  max,
  color = 'var(--tx-hi)',
  stagger = 0,
  unit,
}: VitalCardProps) {
  const pct =
    current !== undefined && max !== undefined && max > 0
      ? Math.min(1, current / max)
      : null

  const pctLabel = pct !== null ? `${Math.round(pct * 100)}%` : null

  return (
    <div
      className={`card stagger-${stagger}`}
      style={{
        padding: '22px 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
      }}
    >
      {/* Value */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '5px' }}>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
            fontWeight: 400,
            letterSpacing: '-0.025em',
            lineHeight: 1,
            color,
          }}
        >
          {typeof value === 'number' ? value.toLocaleString('fr-FR') : value}
        </span>
        {unit && (
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              color: 'var(--tx-lo)',
            }}
          >
            {unit}
          </span>
        )}
      </div>

      {/* Label */}
      <span className="font-meta">{label}</span>

      {/* Animated fill bar */}
      {pct !== null && (
        <div
          style={{
            position: 'relative',
            height: '2px',
            background: 'var(--bg-3)',
            borderRadius: '1px',
            overflow: 'hidden',
          }}
        >
          <div
            className="bar-fill"
            style={{
              position: 'absolute',
              inset: 0,
              background: color,
              transformOrigin: 'left center',
              transform: `scaleX(${pct})`,
            }}
          />
        </div>
      )}

      {/* Sublabel */}
      {(sublabel || pctLabel) && (
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.5625rem',
            color: 'var(--tx-muted)',
            letterSpacing: '0.04em',
            marginTop: pct !== null ? '-8px' : 0,
          }}
        >
          {pctLabel ? `${pctLabel} — ${sublabel ?? ''}` : sublabel}
        </div>
      )}
    </div>
  )
}
