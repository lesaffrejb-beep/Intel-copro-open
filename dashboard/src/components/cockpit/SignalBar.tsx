'use client'

interface SignalBarProps {
  pending: number
  brokenLinks: number
  commits7d: number
}

export function SignalBar({ pending, brokenLinks, commits7d }: SignalBarProps) {
  // Determine what's worth shouting about
  const signals: { msg: string; color: string; cls: string }[] = []

  if (pending > 0) {
    signals.push({
      msg: `${pending} fichier${pending > 1 ? 's' : ''} en attente de compilation — raw/ → wiki/`,
      color: 'var(--warn)',
      cls: 'signal-warn',
    })
  }
  if (brokenLinks > 3) {
    signals.push({
      msg: `${brokenLinks} liens cassés dans le wiki`,
      color: 'var(--err)',
      cls: 'signal-err',
    })
  }
  if (commits7d === 0) {
    signals.push({
      msg: 'Aucun commit cette semaine — la base stagne',
      color: 'var(--tx-lo)',
      cls: '',
    })
  }

  if (signals.length === 0) {
    // All clear
    return (
      <div
        className="signal-ok"
        style={{
          borderBottom: '1px solid var(--border)',
          padding: '8px var(--s-8)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <span
          style={{
            width: '5px',
            height: '5px',
            borderRadius: '50%',
            background: 'var(--ok)',
            flexShrink: 0,
          }}
        />
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.625rem',
            color: 'var(--ok)',
            letterSpacing: '0.08em',
          }}
        >
          Système nominal
        </span>
      </div>
    )
  }

  const primary = signals[0]

  return (
    <div
      className={primary.cls}
      style={{
        borderBottom: '1px solid var(--border)',
        padding: '9px var(--s-8)',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
      }}
    >
      {/* Pulsing dot */}
      <span
        style={{
          width: '5px',
          height: '5px',
          borderRadius: '50%',
          background: primary.color,
          flexShrink: 0,
          animation: 'pulse-dot 2.4s ease-in-out infinite',
        }}
      />

      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.625rem',
          color: primary.color,
          letterSpacing: '0.06em',
          flex: 1,
        }}
      >
        {primary.msg}
      </span>

      {/* Extra signals */}
      {signals.length > 1 && (
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.5625rem',
            color: 'var(--tx-muted)',
            letterSpacing: '0.04em',
          }}
        >
          +{signals.length - 1} autre{signals.length > 2 ? 's' : ''}
        </span>
      )}
    </div>
  )
}
