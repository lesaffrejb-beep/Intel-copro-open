import type { DiscType } from '@/lib/disc'

const DISC_LABELS: Record<DiscType, string> = {
  D: 'Dominant',
  I: 'Influent',
  S: 'Stable',
  C: 'Consciencieux',
}

const DISC_COLORS: Record<DiscType, string> = {
  D: 'var(--disc-d)',
  I: 'var(--disc-i)',
  S: 'var(--disc-s)',
  C: 'var(--disc-c)',
}

interface DiscBadgeProps {
  type: DiscType
  size?: 'sm' | 'md'
  showLabel?: boolean
}

export function DiscBadge({ type, size = 'md', showLabel = false }: DiscBadgeProps) {
  const color = DISC_COLORS[type]
  const fontSize = size === 'sm' ? '0.6rem' : '0.6875rem'
  const padding = size === 'sm' ? '2px 6px' : '3px 8px'

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        fontFamily: 'var(--font-mono)',
        fontSize,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        padding,
        borderRadius: '2px',
        border: `1px solid ${color}22`,
        background: `${color}11`,
        color,
      }}
      title={DISC_LABELS[type]}
    >
      <span style={{ fontWeight: 700 }}>{type}</span>
      {showLabel && (
        <span style={{ opacity: 0.7 }}>{DISC_LABELS[type]}</span>
      )}
    </span>
  )
}
