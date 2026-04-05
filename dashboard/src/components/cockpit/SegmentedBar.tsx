interface SegmentedBarProps {
  value: number      // valeur actuelle
  max: number        // valeur max
  segments?: number  // nombre de segments (défaut 20)
  color?: string     // couleur override (CSS var)
  showPercent?: boolean
}

export function SegmentedBar({
  value,
  max,
  segments = 20,
  color,
  showPercent = true,
}: SegmentedBarProps) {
  const pct = max === 0 ? 0 : Math.min(1, value / max)
  const filled = Math.round(pct * segments)
  const percent = Math.round(pct * 100)

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '2px',
          flex: 1,
        }}
        aria-label={`${percent}%`}
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        {Array.from({ length: segments }).map((_, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: '3px',
              background:
                i < filled
                  ? color ?? 'var(--tx-hi)'
                  : 'var(--bg-3)',
              borderRadius: '1px',
              transition: 'background 0.3s ease',
            }}
          />
        ))}
      </div>
      {showPercent && (
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.625rem',
            color: 'var(--tx-lo)',
            minWidth: '28px',
            textAlign: 'right',
          }}
        >
          {percent}%
        </span>
      )}
    </div>
  )
}
