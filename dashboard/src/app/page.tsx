import { getMetrics } from '@/lib/metrics'
import { getWikiArticlesByCategory } from '@/lib/wiki'
import { SignalBar } from '@/components/cockpit/SignalBar'
import { VitalCard } from '@/components/cockpit/VitalCard'
import { DomainGrid } from '@/components/cockpit/DomainGrid'
import { PipelinePanel } from '@/components/cockpit/PipelinePanel'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function CockpitPage() {
  const [m, articlesByCategory] = await Promise.all([
    getMetrics(),
    Promise.resolve(getWikiArticlesByCategory()),
  ])

  const ingestPct =
    m.sources.pdfs > 0
      ? Math.round((m.sources.ingested / m.sources.pdfs) * 100)
      : 0

  // Format date in a clean way
  const now = new Date()
  const dateLabel = now.toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      {/* ── Signal bar — spans full width ── */}
      <SignalBar
        pending={m.pending}
        brokenLinks={m.lint.brokenLinks}
        commits7d={m.activity.commits7d}
      />

      {/* ── Main content ── */}
      <div
        style={{
          padding: 'var(--s-8)',
          flex: 1,
          maxWidth: '1280px',
          width: '100%',
        }}
      >
        {/* ── Header ── */}
        <div
          className="stagger-0"
          style={{
            marginBottom: 'var(--s-8)',
            paddingBottom: 'var(--s-6)',
            borderBottom: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.625rem',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'var(--tx-muted)',
                marginBottom: '6px',
              }}
            >
              Cockpit
            </div>
            <h1
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1.75rem',
                fontWeight: 500,
                color: 'var(--tx-hi)',
                letterSpacing: '-0.02em',
                lineHeight: 1,
              }}
            >
              Le Présent
            </h1>
          </div>

          <div
            style={{
              textAlign: 'right',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.5625rem',
                color: 'var(--tx-muted)',
                letterSpacing: '0.06em',
                textTransform: 'capitalize',
              }}
            >
              {dateLabel}
            </div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.5rem',
                color: 'var(--border-hi)',
                marginTop: '3px',
                letterSpacing: '0.04em',
              }}
            >
              Antoine Immobilier · Angers
            </div>
          </div>
        </div>

        {/* ── Vitaux — 3 core metrics ── */}
        <section style={{ marginBottom: 'var(--s-8)' }}>
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
            <VitalCard
              value={m.articles.total}
              label="Articles wiki"
              sublabel={`objectif 100`}
              current={m.articles.total}
              max={m.articles.objective}
              color="var(--tx-hi)"
              stagger={1}
            />

            <VitalCard
              value={m.words.total}
              label="Mots"
              sublabel="objectif 400 000"
              current={m.words.total}
              max={m.words.objective}
              color="var(--tx-hi)"
              stagger={2}
            />

            <VitalCard
              value={m.activity.commits7d}
              label="Commits (7j)"
              sublabel={`${m.activity.modified7d} articles touchés`}
              color={m.activity.commits7d > 0 ? 'var(--ok)' : 'var(--warn)'}
              stagger={3}
            />
          </div>

          {/* Ingest sub-row */}
          {m.sources.pdfs > 0 && (
            <div
              className="stagger-4"
              style={{
                marginTop: '1px',
                border: '1px solid var(--border)',
                borderTop: 'none',
                padding: '10px 24px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                background: 'var(--bg-1)',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.5625rem',
                  color: 'var(--tx-muted)',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}
              >
                Corpus
              </span>
              {/* Bar */}
              <div
                style={{
                  flex: 1,
                  height: '2px',
                  background: 'var(--bg-3)',
                  borderRadius: '1px',
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                <div
                  className="bar-fill"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      ingestPct === 100
                        ? 'var(--ok)'
                        : ingestPct > 50
                        ? 'var(--tx-hi)'
                        : 'var(--warn)',
                    transformOrigin: 'left center',
                    transform: `scaleX(${Math.max(ingestPct / 100, 0)})`,
                  }}
                />
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.5625rem',
                  color: 'var(--tx-lo)',
                  letterSpacing: '0.04em',
                  whiteSpace: 'nowrap',
                }}
              >
                {m.sources.ingested}/{m.sources.pdfs} PDF compilés — {ingestPct}%
              </span>
            </div>
          )}
        </section>

        {/* ── Main grid: Domain map + Pipeline ── */}
        <section
          className="stagger-5"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 280px',
            gap: 'var(--s-6)',
            alignItems: 'start',
          }}
        >
          {/* Left: Domain Coverage */}
          <DomainGrid byCategory={articlesByCategory} />

          {/* Right: Pipeline + Status */}
          <PipelinePanel
            pending={m.pending}
            total={m.articles.total}
            commits7d={m.activity.commits7d}
            modified7d={m.activity.modified7d}
            brokenLinks={m.lint.brokenLinks}
            articleStatus={{
              validated: m.articles.validated,
              review: m.articles.review,
              draft: m.articles.draft,
            }}
          />
        </section>
      </div>

      {/* ── Footer context ── */}
      <div
        style={{
          padding: '12px var(--s-8)',
          borderTop: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.5rem',
            color: 'var(--tx-muted)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          wiki-copro · Le Présent v2
        </span>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.5rem',
            color: 'var(--border-hi)',
            letterSpacing: '0.06em',
          }}
        >
          {m.generatedAt}
        </span>
      </div>
    </div>
  )
}
