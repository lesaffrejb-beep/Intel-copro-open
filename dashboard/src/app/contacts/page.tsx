import Link from 'next/link'
import { listContacts, slugify } from '@/lib/contacts'
import { DiscBadge } from '@/components/contacts/DiscBadge'
import type { DiscType } from '@/lib/disc'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const TAG_LABELS: Record<string, string> = {
  copropriétaire: 'Copro',
  prestataire: 'Presta',
  collègue: 'Équipe',
  notaire: 'Notaire',
  assurance: 'Assu',
}

export default async function ContactsPage() {
  const contacts = listContacts()

  return (
    <div style={{ padding: 'var(--s-8)', maxWidth: '900px' }}>
      {/* Header */}
      <div
        style={{
          marginBottom: 'var(--s-12)',
          paddingBottom: 'var(--s-6)',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        }}
      >
        <div>
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
            Orbite
          </h1>
          <div
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.5rem',
              fontWeight: 500,
              color: 'var(--tx-hi)',
              letterSpacing: '-0.01em',
            }}
          >
            Profils contacts
          </div>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6875rem',
              color: 'var(--tx-muted)',
              marginTop: '4px',
            }}
          >
            {contacts.length} contact{contacts.length !== 1 ? 's' : ''} · usage interne uniquement
          </div>
        </div>

        <Link
          href="/contacts/nouveau"
          style={{
            background: 'var(--tx-hi)',
            color: 'var(--bg-0)',
            textDecoration: 'none',
            padding: '9px 16px',
            borderRadius: '2px',
            fontFamily: 'var(--font-body)',
            fontSize: '0.8125rem',
            fontWeight: 500,
          }}
        >
          + Nouveau profil
        </Link>
      </div>

      {contacts.length === 0 ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'var(--s-16)',
            gap: 'var(--s-4)',
            border: '1px dashed var(--border)',
            borderRadius: '2px',
          }}
        >
          <div className="font-meta">Aucun profil</div>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.875rem',
              color: 'var(--tx-lo)',
              textAlign: 'center',
              maxWidth: '360px',
              lineHeight: 1.6,
            }}
          >
            Crée un profil pour un copropriétaire, prestataire ou collègue.
            L'assessment DISC + Enneagramme génère une stratégie de communication interne.
          </p>
          <Link
            href="/contacts/nouveau"
            style={{
              color: 'var(--tx-hi)',
              textDecoration: 'none',
              fontFamily: 'var(--font-body)',
              fontSize: '0.875rem',
              borderBottom: '1px solid var(--border)',
              paddingBottom: '1px',
            }}
          >
            Commencer →
          </Link>
        </div>
      ) : (
        <div className="card">
          {contacts.map((contact, i) => (
            <Link
              key={contact.slug}
              href={`/contacts/${contact.slug}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '16px 20px',
                textDecoration: 'none',
                borderBottom:
                  i < contacts.length - 1 ? '1px solid var(--border)' : 'none',
                transition: 'background 0.1s ease',
              }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLAnchorElement).style.background = 'var(--bg-2)'
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLAnchorElement).style.background = 'transparent'
              }}
            >
              {/* DISC badge */}
              <div style={{ minWidth: '32px' }}>
                {contact.disc_primary ? (
                  <DiscBadge type={contact.disc_primary as DiscType} />
                ) : (
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.625rem',
                      color: 'var(--tx-muted)',
                      border: '1px dashed var(--border)',
                      padding: '2px 6px',
                      borderRadius: '2px',
                    }}
                  >
                    ?
                  </span>
                )}
              </div>

              {/* Name + tags */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9375rem',
                    fontWeight: 500,
                    color: 'var(--tx-hi)',
                    marginBottom: '3px',
                  }}
                >
                  {contact.title}
                </div>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {contact.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.5625rem',
                        color: 'var(--tx-lo)',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                      }}
                    >
                      {TAG_LABELS[tag] ?? tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Enneagram */}
              {contact.enneagram_type && (
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.625rem',
                    color: 'var(--tx-muted)',
                    letterSpacing: '0.06em',
                  }}
                >
                  E{contact.enneagram_type}
                </span>
              )}

              <span
                style={{
                  color: 'var(--tx-muted)',
                  fontSize: '0.75rem',
                }}
              >
                →
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
