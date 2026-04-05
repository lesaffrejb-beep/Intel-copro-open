'use client'

import { useState } from 'react'
import { ASSESSMENT_QUESTIONS, scoreDisc, DISC_TO_ENNEAGRAM, ENNEAGRAM_PROFILES, generateCommunicationCard } from '@/lib/disc'
import type { DiscType, EnneagramType } from '@/lib/disc'
import { DiscBadge } from './DiscBadge'

interface DiscAssessmentProps {
  onComplete?: (result: {
    disc_primary: DiscType
    disc_secondary: DiscType
    disc_confidence: 'low' | 'medium' | 'high'
    enneagram_type: EnneagramType
  }) => void
}

type Phase = 'questions' | 'enneagram' | 'result'

export function DiscAssessment({ onComplete }: DiscAssessmentProps) {
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<Record<string, DiscType>>({})
  const [phase, setPhase] = useState<Phase>('questions')
  const [discResult, setDiscResult] = useState<ReturnType<typeof scoreDisc> | null>(null)
  const [selectedEnneagram, setSelectedEnneagram] = useState<EnneagramType | null>(null)
  const [situation, setSituation] = useState('')
  const [card, setCard] = useState<string | null>(null)

  const question = ASSESSMENT_QUESTIONS[current]
  const total = ASSESSMENT_QUESTIONS.length
  const progress = (current / total) * 100

  function handleAnswer(disc: DiscType) {
    const updated = { ...answers, [question.id]: disc }
    setAnswers(updated)

    if (current + 1 < total) {
      setCurrent(current + 1)
    } else {
      const result = scoreDisc(updated)
      setDiscResult(result)
      setPhase('enneagram')
    }
  }

  function handleEnneagramSelect(type: EnneagramType) {
    setSelectedEnneagram(type)
  }

  function handleFinish() {
    if (!discResult || !selectedEnneagram) return
    const generatedCard = generateCommunicationCard(discResult, selectedEnneagram, situation || undefined)
    setCard(generatedCard)
    setPhase('result')
    onComplete?.({
      disc_primary: discResult.primary,
      disc_secondary: discResult.secondary,
      disc_confidence: discResult.confidence,
      enneagram_type: selectedEnneagram,
    })
  }

  // ── Phase : Questions ──────────────────────────────────────────────────────
  if (phase === 'questions') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {/* Progress */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span className="font-meta">Assessment DISC</span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.625rem',
                color: 'var(--tx-lo)',
              }}
            >
              {current + 1} / {total}
            </span>
          </div>
          <div
            style={{
              height: '2px',
              background: 'var(--bg-3)',
              borderRadius: '1px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${progress}%`,
                background: 'var(--tx-hi)',
                transition: 'width 0.3s ease',
              }}
            />
          </div>
        </div>

        {/* Question */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.125rem',
              fontWeight: 500,
              color: 'var(--tx-hi)',
              lineHeight: 1.3,
            }}
          >
            {question.question}
          </div>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6875rem',
              color: 'var(--tx-lo)',
            }}
          >
            {question.context}
          </div>
        </div>

        {/* Options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {question.options.map((opt) => (
            <button
              key={opt.disc}
              onClick={() => handleAnswer(opt.disc)}
              style={{
                background: 'var(--bg-1)',
                border: '1px solid var(--border)',
                borderRadius: '2px',
                padding: '14px 16px',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'border-color 0.15s ease, background 0.15s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border-hi)'
                ;(e.currentTarget as HTMLButtonElement).style.background = 'var(--bg-2)'
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border)'
                ;(e.currentTarget as HTMLButtonElement).style.background = 'var(--bg-1)'
              }}
            >
              <DiscBadge type={opt.disc} size="sm" />
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.875rem',
                  color: 'var(--tx-md)',
                  lineHeight: 1.4,
                }}
              >
                {opt.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    )
  }

  // ── Phase : Choix Enneagramme ──────────────────────────────────────────────
  if (phase === 'enneagram' && discResult) {
    const suggested = DISC_TO_ENNEAGRAM[discResult.primary]

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {/* DISC result */}
        <div className="card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <span className="font-meta">Résultat DISC</span>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <DiscBadge type={discResult.primary} showLabel />
            <span style={{ color: 'var(--tx-lo)', fontSize: '0.75rem' }}>+</span>
            <DiscBadge type={discResult.secondary} showLabel size="sm" />
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.5625rem',
                color: 'var(--tx-muted)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginLeft: '4px',
              }}
            >
              confiance : {discResult.confidence}
            </span>
          </div>
        </div>

        {/* Enneagramme */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <span className="font-meta">Ennéagramme — types probables</span>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.75rem',
                color: 'var(--tx-lo)',
                marginTop: '4px',
              }}
            >
              Basé sur profil {discResult.primary}. Sélectionne le type qui correspond le mieux.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {suggested.map((type) => {
              const profile = ENNEAGRAM_PROFILES[type]
              const isSelected = selectedEnneagram === type
              return (
                <button
                  key={type}
                  onClick={() => handleEnneagramSelect(type)}
                  style={{
                    background: isSelected ? 'var(--bg-2)' : 'var(--bg-1)',
                    border: `1px solid ${isSelected ? 'var(--border-hi)' : 'var(--border)'}`,
                    borderRadius: '2px',
                    padding: '16px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.625rem',
                        background: isSelected ? 'var(--tx-hi)' : 'var(--bg-3)',
                        color: isSelected ? 'var(--bg-0)' : 'var(--tx-lo)',
                        padding: '2px 6px',
                        borderRadius: '1px',
                        fontWeight: 700,
                      }}
                    >
                      TYPE {type}
                    </span>
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.75rem',
                      color: 'var(--tx-lo)',
                      lineHeight: 1.5,
                    }}
                  >
                    <span style={{ color: 'var(--tx-muted)', fontSize: '0.625rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Peur </span>
                    {profile.fear}
                  </div>
                </button>
              )
            })}
          </div>

          {/* Situation optionnelle */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '8px' }}>
            <label className="font-meta" htmlFor="situation">
              Situation (optionnel)
            </label>
            <textarea
              id="situation"
              value={situation}
              onChange={(e) => setSituation(e.target.value)}
              placeholder="Ex : annoncer une augmentation de charges, relancer un impayé…"
              rows={2}
              style={{
                background: 'var(--bg-1)',
                border: '1px solid var(--border)',
                borderRadius: '2px',
                padding: '10px 12px',
                fontFamily: 'var(--font-body)',
                fontSize: '0.875rem',
                color: 'var(--tx-md)',
                resize: 'vertical',
                outline: 'none',
              }}
            />
          </div>

          <button
            onClick={handleFinish}
            disabled={!selectedEnneagram}
            style={{
              background: selectedEnneagram ? 'var(--tx-hi)' : 'var(--bg-2)',
              color: selectedEnneagram ? 'var(--bg-0)' : 'var(--tx-muted)',
              border: 'none',
              borderRadius: '2px',
              padding: '12px 20px',
              fontFamily: 'var(--font-body)',
              fontSize: '0.875rem',
              fontWeight: 500,
              cursor: selectedEnneagram ? 'pointer' : 'not-allowed',
              transition: 'all 0.15s ease',
              letterSpacing: '0.02em',
            }}
          >
            Générer la carte de communication →
          </button>
        </div>
      </div>
    )
  }

  // ── Phase : Résultat ───────────────────────────────────────────────────────
  if (phase === 'result' && card) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div>
          <span className="font-meta">Carte de communication</span>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.75rem',
              color: 'var(--tx-lo)',
              marginTop: '4px',
            }}
          >
            Usage interne uniquement — ne jamais copier-coller dans un mail.
          </p>
        </div>

        <pre
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: 'var(--tx-md)',
            background: 'var(--bg-1)',
            border: '1px solid var(--border)',
            borderRadius: '2px',
            padding: '20px',
            whiteSpace: 'pre-wrap',
            lineHeight: 1.7,
            overflowX: 'auto',
          }}
        >
          {card}
        </pre>

        <button
          onClick={() => {
            setPhase('questions')
            setCurrent(0)
            setAnswers({})
            setDiscResult(null)
            setSelectedEnneagram(null)
            setSituation('')
            setCard(null)
          }}
          style={{
            background: 'transparent',
            border: '1px solid var(--border)',
            borderRadius: '2px',
            padding: '10px 16px',
            fontFamily: 'var(--font-body)',
            fontSize: '0.8125rem',
            color: 'var(--tx-lo)',
            cursor: 'pointer',
            alignSelf: 'flex-start',
          }}
        >
          ↺ Recommencer l'assessment
        </button>
      </div>
    )
  }

  return null
}
