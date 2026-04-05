import { getMetrics } from '@/lib/metrics'
import SearchBar from '@/components/wiki/SearchBar'

export const dynamic = 'force-dynamic'

export default async function WikiPage() {
  const m = await getMetrics()

  return (
    <div style={{ padding: 'var(--s-8)', maxWidth: '900px' }}>
      <div
        style={{
          marginBottom: 'var(--s-8)',
          paddingBottom: 'var(--s-6)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <h1
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--tx-lo)',
            marginBottom: '8px',
          }}
        >
          Wiki
        </h1>
        <div
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1.5rem',
            fontWeight: 500,
            color: 'var(--tx-hi)',
          }}
        >
          Base de connaissance
        </div>
      </div>

      <SearchBar />

      <div className="card" style={{ padding: '24px', marginTop: 'var(--s-6)' }}>
        <span className="font-meta" style={{ display: 'block', marginBottom: '16px' }}>
          Catégories
        </span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {Object.entries(m.byCategory).map(([cat, count], i, arr) => (
            <div
              key={cat}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px 16px',
                borderBottom: i < arr.length - 1 ? '1px solid var(--border)' : 'none',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8125rem',
                  color: count > 0 ? 'var(--tx-md)' : 'var(--tx-muted)',
                }}
              >
                wiki/{cat}/
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.875rem',
                  color: count > 0 ? 'var(--tx-hi)' : 'var(--tx-muted)',
                  fontWeight: count > 0 ? 700 : 400,
                }}
              >
                {count} article{count !== 1 ? 's' : ''}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
