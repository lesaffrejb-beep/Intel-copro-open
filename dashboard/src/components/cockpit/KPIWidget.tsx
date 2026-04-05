import { SegmentedBar } from './SegmentedBar'

interface KPIWidgetProps {
  value: number | string
  label: string
  objective?: number | string
  objectiveLabel?: string
  current?: number
  max?: number
  barColor?: string
  status?: 'ok' | 'warn' | 'err' | 'info' | 'neutral'
  unit?: string
}

const statusColor: Record<string, string> = {
  ok: 'var(--ok)',
  warn: 'var(--warn)',
  err: 'var(--err)',
  info: 'var(--info)',
  neutral: 'var(--tx-hi)',
}

export function KPIWidget({
  value,
  label,
  objective,
  objectiveLabel,
  current,
  max,
  barColor,
  status = 'neutral',
  unit,
}: KPIWidgetProps) {
  const showBar =
    current !== undefined && max !== undefined && max > 0

  return (
    <div
      className="card"
      style={{
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        minHeight: '140px',
      }}
    >
      {/* Value + label */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: '6px',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 400,
              letterSpacing: '-0.02em',
              color: statusColor[status] ?? 'var(--tx-hi)',
              lineHeight: 1,
            }}
          >
            {typeof value === 'number' ? value.toLocaleString('fr-FR') : value}
          </span>
          {unit && (
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.875rem',
                color: 'var(--tx-lo)',
              }}
            >
              {unit}
            </span>
          )}
        </div>

        <span className="font-meta">{label}</span>
      </div>

      {/* Progress bar */}
      {showBar && (
        <SegmentedBar
          value={current!}
          max={max!}
          color={barColor}
        />
      )}

      {/* Objective */}
      {(objective !== undefined || objectiveLabel) && (
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.625rem',
            color: 'var(--tx-muted)',
            letterSpacing: '0.04em',
          }}
        >
          {objectiveLabel ??
            `objectif : ${typeof objective === 'number' ? objective.toLocaleString('fr-FR') : objective}`}
        </div>
      )}
    </div>
  )
}
