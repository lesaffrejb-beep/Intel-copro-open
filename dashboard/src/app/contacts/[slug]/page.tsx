'use client'

import { useState, useEffect } from 'react'
import type { CSSProperties } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { DiscAssessment } from '@/components/contacts/DiscAssessment'
import { DiscBadge } from '@/components/contacts/DiscBadge'
import { ENNEAGRAM_PROFILES, DISC_COMMUNICATION, generateCommunicationCard } from '@/lib/disc'
import type { Contact } from '@/lib/contacts'
import type { DiscType, EnneagramType } from '@/lib/disc'

const TAG_OPTIONS = ['copropriétaire', 'prestataire', 'collègue', 'notaire', 'assurance']

type Mode = 'view' | 'assess' | 'strategy'

export default function ContactPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string
  const isNew = slug === 'nouveau'

  const [contact, setContact] = useState<Partial<Contact> | null>(isNew ? {} : null)
  const [loading, setLoading] = useState(!isNew)
  const [mode, setMode] = useState<Mode>('view')
  const [saving, setSaving] = useState(false)
  const [name, setName] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [situation, setSituation] = useState('')
  const [card, setCard] = useState<string | null>(null)
  const [interactionDate, setInteractionDate] = useState(new Date().toISOString().slice(0, 10))
  const [interactionSujet, setInteractionSujet] = useState('')
  const [interactionResultat, setInteractionResultat] = useState('')
  const [interactionSaving, setInteractionSaving] = useState(false)

  useEffect(() => {
    if (isNew) return
    fetch(`/api/contacts/${slug}`)
      .then((r) => r.json())
      .then((data) => {
        setContact(data)
        setName(data.title ?? '')
        setTags(data.tags ?? [])
      })
      .catch(() => setContact(null))
      .finally(() => setLoading(false))
  }, [slug, isNew])

  async function handleCreate() {
    if (!name.trim()) return
    setSaving(true)
    const res = await fetch('/api/contacts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: name.trim(), tags }),
    })
    const data = await res.json()
    setSaving(false)
    if (data.slug) router.push(`/contacts/${data.slug}`)
  }

  async function handleAddInteraction() {
    if (!contact || !interactionDate || !interactionSujet.trim() || !interactionResultat.trim()) return
    setInteractionSaving(true)
    await fetch(`/api/contacts/${slug}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        interaction: {
          date: interactionDate,
          sujet: interactionSujet.trim(),
          resultat: interactionResultat.trim(),
        },
      }),
    })

    const updatedInteractions = [
      {
        date: interactionDate,
        sujet: interactionSujet.trim(),
        resultat: interactionResultat.trim(),
      },
      ...(contact.interactions ?? []),
    ].sort((a, b) => b.date.localeCompare(a.date))

    setContact({ ...contact, interactions: updatedInteractions })
    setInteractionSujet('')
    setInteractionResultat('')
    setInteractionSaving(false)
  }

  async function handleAssessComplete(result: {
    disc_primary: DiscType
    disc_secondary: DiscType
    disc_confidence: 'low' | 'medium' | 'high'
    enneagram_type: EnneagramType
  }) {
    const updated = { ...contact, ...result }
    setContact(updated)

    await fetch(`/api/contacts/${slug}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(result),
    })
  }

  function handleGenerateCard() {
    if (!contact?.disc_primary || !contact?.enneagram_type) return
    const disc = {
      primary: contact.disc_primary as DiscType,
      secondary: (contact.disc_secondary ?? 'S') as DiscType,
      scores: { D: 0, I: 0, S: 0, C: 0 },
      confidence: (contact.disc_confidence ?? 'medium') as 'low' | 'medium' | 'high',
    }
    const generated = generateCommunicationCard(disc, contact.enneagram_type as EnneagramType, situation || undefined)
    setCard(generated)
    setMode('strategy')
  }

  // ── Nouveau contact ───────────────────────────────────────────────────────
  if (isNew) {
    return (
      <div style={{ padding: 'var(--s-8)', maxWidth: '600px' }}>
        <div style={{ marginBottom: 'var(--s-8)', paddingBottom: 'var(--s-6)', borderBottom: '1px solid var(--border)' }}>
          <span className="font-meta">Orbite · Nouveau profil</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label className="font-meta" htmlFor="name">Nom complet</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex : Martin Dupont"
              autoFocus
              style={{
                background: 'var(--bg-1)',
                border: '1px solid var(--border)',
                borderRadius: '2px',
                padding: '10px 14px',
                fontFamily: 'var(--font-body)',
                fontSize: '1rem',
                color: 'var(--tx-hi)',
                outline: 'none',
              }}
              onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span className="font-meta">Catégorie</span>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {TAG_OPTIONS.map((tag) => {
                const active = tags.includes(tag)
                return (
                  <button
                    key={tag}
                    onClick={() =>
                      setTags(active ? tags.filter((t) => t !== tag) : [...tags, tag])
                    }
                    style={{
                      background: active ? 'var(--bg-2)' : 'var(--bg-1)',
                      border: `1px solid ${active ? 'var(--border-hi)' : 'var(--border)'}`,
                      borderRadius: '2px',
                      padding: '6px 12px',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.625rem',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: active ? 'var(--tx-hi)' : 'var(--tx-lo)',
                      cursor: 'pointer',
                      transition: 'all 0.1s ease',
                    }}
                  >
                    {tag}
                  </button>
                )
              })}
            </div>
          </div>

          <button
            onClick={handleCreate}
            disabled={!name.trim() || saving}
            style={{
              background: name.trim() ? 'var(--tx-hi)' : 'var(--bg-2)',
              color: name.trim() ? 'var(--bg-0)' : 'var(--tx-muted)',
              border: 'none',
              borderRadius: '2px',
              padding: '12px 20px',
              fontFamily: 'var(--font-body)',
              fontSize: '0.875rem',
              fontWeight: 500,
              cursor: name.trim() ? 'pointer' : 'not-allowed',
              alignSelf: 'flex-start',
            }}
          >
            {saving ? 'Création…' : 'Créer le profil →'}
          </button>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div style={{ padding: 'var(--s-8)' }}>
        <span className="font-meta">Chargement…</span>
      </div>
    )
  }

  if (!contact) {
    return (
      <div style={{ padding: 'var(--s-8)' }}>
        <span className="font-meta" style={{ color: 'var(--err)' }}>Contact introuvable</span>
      </div>
    )
  }

  const hasDisc = !!contact.disc_primary
  const hasEnneagram = !!contact.enneagram_type

  return (
    <div style={{ padding: 'var(--s-8)', maxWidth: '800px' }}>
      {/* Header */}
      <div
        style={{
          marginBottom: 'var(--s-8)',
          paddingBottom: 'var(--s-6)',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span className="font-meta">Orbite</span>
          <h1
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.5rem',
              fontWeight: 500,
              color: 'var(--tx-hi)',
            }}
          >
            {contact.title ?? name}
          </h1>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            {hasDisc && (
              <>
                <DiscBadge type={contact.disc_primary as DiscType} showLabel />
                {contact.disc_secondary && (
                  <DiscBadge type={contact.disc_secondary as DiscType} size="sm" />
                )}
              </>
            )}
            {hasEnneagram && (
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.625rem',
                  color: 'var(--tx-lo)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}
              >
                Ennéagramme {contact.enneagram_type}
              </span>
            )}
            {!hasDisc && (
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.625rem',
                  color: 'var(--tx-muted)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}
              >
                Profil à compléter
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '8px' }}>
          {!hasDisc && (
            <button
              onClick={() => setMode(mode === 'assess' ? 'view' : 'assess')}
              style={{
                background: mode === 'assess' ? 'var(--bg-2)' : 'var(--tx-hi)',
                color: mode === 'assess' ? 'var(--tx-hi)' : 'var(--bg-0)',
                border: '1px solid var(--border)',
                borderRadius: '2px',
                padding: '9px 14px',
                fontFamily: 'var(--font-body)',
                fontSize: '0.8125rem',
                fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              {mode === 'assess' ? '← Annuler' : 'Faire l\'assessment DISC →'}
            </button>
          )}
          {hasDisc && hasEnneagram && (
            <button
              onClick={() => setMode(mode === 'strategy' ? 'view' : 'strategy')}
              style={{
                background: 'var(--tx-hi)',
                color: 'var(--bg-0)',
                border: 'none',
                borderRadius: '2px',
                padding: '9px 14px',
                fontFamily: 'var(--font-body)',
                fontSize: '0.8125rem',
                fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              Stratégie communication →
            </button>
          )}
        </div>
      </div>

      {/* Assessment */}
      {mode === 'assess' && (
        <div className="card" style={{ padding: '28px', marginBottom: 'var(--s-8)' }}>
          <DiscAssessment onComplete={handleAssessComplete} />
        </div>
      )}

      {/* Strategy card */}
      {mode === 'strategy' && hasDisc && hasEnneagram && (
        <div className="card" style={{ padding: '24px', marginBottom: 'var(--s-8)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <span className="font-meta">Stratégie communication — usage interne</span>

          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <label
              htmlFor="situation-input"
              style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: 'var(--tx-lo)', minWidth: '80px' }}
            >
              Situation :
            </label>
            <input
              id="situation-input"
              type="text"
              value={situation}
              onChange={(e) => setSituation(e.target.value)}
              placeholder="Ex : annoncer une hausse de charges…"
              style={{
                flex: 1,
                background: 'var(--bg-0)',
                border: '1px solid var(--border)',
                borderRadius: '2px',
                padding: '8px 12px',
                fontFamily: 'var(--font-body)',
                fontSize: '0.875rem',
                color: 'var(--tx-md)',
                outline: 'none',
              }}
            />
            <button
              onClick={handleGenerateCard}
              style={{
                background: 'var(--bg-2)',
                border: '1px solid var(--border)',
                borderRadius: '2px',
                padding: '8px 14px',
                fontFamily: 'var(--font-body)',
                fontSize: '0.8125rem',
                color: 'var(--tx-md)',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              Générer
            </button>
          </div>

          {card && (
            <pre
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: 'var(--tx-md)',
                background: 'var(--bg-0)',
                border: '1px solid var(--border)',
                borderRadius: '2px',
                padding: '16px',
                whiteSpace: 'pre-wrap',
                lineHeight: 1.7,
              }}
            >
              {card}
            </pre>
          )}

          {!card && contact.disc_primary && contact.enneagram_type && (() => {
            const strategy = DISC_COMMUNICATION[contact.disc_primary as DiscType]
            const ennProfile = ENNEAGRAM_PROFILES[contact.enneagram_type as EnneagramType]
            return (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <Row label="Format" value={strategy.format} />
                <Row label="Accroche" value={strategy.opener} />
                <Row label="Angle" value={strategy.angle} />
                <Row label="Peur centrale" value={ennProfile.fear} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span className="font-meta">Éviter</span>
                  {strategy.avoid.map((a, i) => (
                    <span key={i} style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: 'var(--tx-lo)', paddingLeft: '12px' }}>
                      · {a}
                    </span>
                  ))}
                </div>
              </div>
            )
          })()}
        </div>
      )}

      {/* Body notes */}
      {mode === 'view' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-6)' }}>
          <div className="card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <span className="font-meta">Historique interactions</span>

            <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr 1fr auto', gap: '8px' }}>
              <input
                type="date"
                value={interactionDate}
                onChange={(e) => setInteractionDate(e.target.value)}
                style={inputStyle}
              />
              <input
                type="text"
                value={interactionSujet}
                onChange={(e) => setInteractionSujet(e.target.value)}
                placeholder="Sujet"
                style={inputStyle}
              />
              <input
                type="text"
                value={interactionResultat}
                onChange={(e) => setInteractionResultat(e.target.value)}
                placeholder="Résultat"
                style={inputStyle}
              />
              <button
                onClick={handleAddInteraction}
                disabled={interactionSaving || !interactionSujet.trim() || !interactionResultat.trim()}
                style={{
                  background: 'var(--tx-hi)',
                  color: 'var(--bg-0)',
                  border: 'none',
                  borderRadius: '2px',
                  padding: '8px 12px',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.8125rem',
                  cursor: 'pointer',
                }}
              >
                {interactionSaving ? 'Ajout…' : 'Ajouter'}
              </button>
            </div>

            {(contact.interactions ?? []).length === 0 ? (
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: 'var(--tx-muted)' }}>
                Aucune interaction enregistrée.
              </span>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {(contact.interactions ?? []).map((it, i) => (
                  <div key={`${it.date}-${i}`} style={{ borderLeft: '2px solid var(--border)', paddingLeft: '12px' }}>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'baseline' }}>
                      <span className="font-meta">{it.date}</span>
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--tx-hi)' }}>{it.sujet}</span>
                    </div>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: 'var(--tx-lo)' }}>{it.resultat}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {contact.body && (
            <div
              className="card"
              style={{ padding: '24px' }}
            >
              <span className="font-meta" style={{ display: 'block', marginBottom: '16px' }}>Notes</span>
              <pre
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.875rem',
                  color: 'var(--tx-lo)',
                  whiteSpace: 'pre-wrap',
                  lineHeight: 1.7,
                }}
              >
                {contact.body}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

const inputStyle: CSSProperties = {
  background: 'var(--bg-0)',
  border: '1px solid var(--border)',
  borderRadius: '2px',
  padding: '8px 10px',
  fontFamily: 'var(--font-body)',
  fontSize: '0.8125rem',
  color: 'var(--tx-md)',
  outline: 'none',
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.5625rem',
          color: 'var(--tx-muted)',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          minWidth: '80px',
          paddingTop: '2px',
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.8125rem',
          color: 'var(--tx-md)',
          lineHeight: 1.5,
          flex: 1,
        }}
      >
        {value}
      </span>
    </div>
  )
}
