/**
 * DISC + Enneagramme — moteur de profilage
 *
 * DISC : observable depuis le comportement (pas d'auto-déclaration)
 * Enneagramme : peur centrale + désir profond — pourquoi quelqu'un agit comme ça
 * Big Five (OCEAN) : estimé en arrière-plan pour crédibilité scientifique
 */

export type DiscType = 'D' | 'I' | 'S' | 'C'
export type EnneagramType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
export type DiscConfidence = 'low' | 'medium' | 'high'

export interface DiscProfile {
  primary: DiscType
  secondary: DiscType
  scores: Record<DiscType, number>
  confidence: DiscConfidence
}

export interface EnneagramProfile {
  type: EnneagramType
  wing?: EnneagramType
  fear: string
  desire: string
}

export interface CommunicationStrategy {
  format: string
  opener: string
  angle: string
  avoid: string[]
  email_length: 'court' | 'moyen' | 'long'
}

// ── Questions d'observation comportementale (7) ──────────────────────────────

export interface AssessmentQuestion {
  id: string
  question: string
  context: string
  options: {
    label: string
    disc: DiscType
    weight: number
  }[]
}

export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  {
    id: 'decision',
    question: 'Face à une décision à prendre',
    context: 'AG, sinistre, choix prestataire…',
    options: [
      { label: 'Décide vite, tranche sans hésitation, assume', disc: 'D', weight: 1 },
      { label: 'Consulte les autres, cherche le consensus avant', disc: 'I', weight: 1 },
      { label: "Prend le temps, attend d'avoir bien pesé", disc: 'S', weight: 1 },
      { label: 'Demande des données, des chiffres, des précédents', disc: 'C', weight: 1 },
    ],
  },
  {
    id: 'conflict',
    question: 'En cas de désaccord ou de conflit',
    context: 'contestation de charges, mauvais prestataire…',
    options: [
      { label: 'Affronte directement, peut être perçu comme agressif', disc: 'D', weight: 1 },
      { label: "Cherche à réconcilier, minimise, évite l'escalade", disc: 'I', weight: 1 },
      { label: "Recule, encaisse, mais n'oublie pas", disc: 'S', weight: 1 },
      { label: 'Argumente avec les faits, reste froid et méthodique', disc: 'C', weight: 1 },
    ],
  },
  {
    id: 'email',
    question: 'Ses emails ou messages sont',
    context: 'style spontané, pas en situation formelle',
    options: [
      { label: 'Courts, directs, parfois sans formule de politesse', disc: 'D', weight: 1 },
      { label: "Enthousiastes, longs, beaucoup d'exclamations", disc: 'I', weight: 1 },
      { label: 'Polis, formels, prudemment tournés', disc: 'S', weight: 1 },
      { label: 'Structurés, précis, avec pièces jointes et questions nettes', disc: 'C', weight: 1 },
    ],
  },
  {
    id: 'surprise',
    question: 'Une mauvaise surprise dans la copro (fuite, impayé…)',
    context: "réaction immédiate, avant d'avoir digéré",
    options: [
      { label: "Réaction forte, veut une action immédiate — 'c'est inacceptable'", disc: 'D', weight: 1 },
      { label: "S'inquiète pour les voisins, cherche à comprendre l'impact humain", disc: 'I', weight: 1 },
      { label: 'Inquiet mais discret, attend de voir comment ça évolue', disc: 'S', weight: 1 },
      { label: "'Comment ça s'est passé ? Qui est responsable ? Quels recours ?'", disc: 'C', weight: 1 },
    ],
  },
  {
    id: 'tempo',
    question: 'Son rythme naturel',
    context: 'sans pression externe',
    options: [
      { label: 'Rapide, impatient si ça traîne, multiplie les canaux', disc: 'D', weight: 1 },
      { label: 'Variable, énergique par vagues, facilement distrait', disc: 'I', weight: 1 },
      { label: 'Lent mais constant, fiable, régulier', disc: 'S', weight: 1 },
      { label: 'Méthodique, planifié, prévisible — pas de surprise', disc: 'C', weight: 1 },
    ],
  },
  {
    id: 'irritants',
    question: "Ce qui l'irrite le plus",
    context: 'plaintes spontanées, ressentis exprimés',
    options: [
      { label: "L'incompétence, la lenteur, les décisions floues", disc: 'D', weight: 1 },
      { label: 'Être ignoré, pas reconnu, traité comme un numéro', disc: 'I', weight: 1 },
      { label: 'Les changements brusques, le manque de stabilité', disc: 'S', weight: 1 },
      { label: 'Les erreurs, les imprécisions, le manque de rigueur', disc: 'C', weight: 1 },
    ],
  },
  {
    id: 'phone',
    question: 'Au téléphone, il est plutôt',
    context: 'appel non prévu',
    options: [
      { label: 'Direct, questions nettes, veut des réponses claires vite', disc: 'D', weight: 1 },
      { label: "Bavard, parte sur des tangentes, revient rarement à l'essentiel", disc: 'I', weight: 1 },
      { label: "Chaleureux mais discret, s'excuse de déranger", disc: 'S', weight: 1 },
      { label: 'Préparé, liste de points à couvrir, prend des notes', disc: 'C', weight: 1 },
    ],
  },
]

// ── Scoring DISC ─────────────────────────────────────────────────────────────

export function scoreDisc(answers: Record<string, DiscType>): DiscProfile {
  const scores: Record<DiscType, number> = { D: 0, I: 0, S: 0, C: 0 }

  for (const disc of Object.values(answers)) {
    scores[disc]++
  }

  const sorted = (Object.entries(scores) as [DiscType, number][]).sort(
    (a, b) => b[1] - a[1]
  )
  const [primaryEntry, secondaryEntry] = sorted
  const primary = primaryEntry[0]
  const secondary = secondaryEntry[0]
  const total = Object.values(answers).length

  const primaryCount = primaryEntry[1]
  const confidence: DiscConfidence =
    primaryCount / total >= 0.57
      ? 'high'
      : primaryCount / total >= 0.43
        ? 'medium'
        : 'low'

  return { primary, secondary, scores, confidence }
}

// ── Mapping DISC → Enneagramme probable ──────────────────────────────────────

export const DISC_TO_ENNEAGRAM: Record<DiscType, EnneagramType[]> = {
  D: [3, 7, 8],   // Achiever, Enthusiast, Challenger
  I: [2, 3, 7],   // Helper, Achiever, Enthusiast
  S: [1, 2, 6, 9], // Perfectionist, Helper, Loyalist, Peacemaker
  C: [1, 5, 6],   // Perfectionist, Investigator, Loyalist
}

// ── Enneagramme — profils complets ───────────────────────────────────────────

export const ENNEAGRAM_PROFILES: Record<EnneagramType, EnneagramProfile> = {
  1: {
    type: 1,
    fear: 'Être dans l\'erreur, être imparfait, être critiqué',
    desire: 'Être bon, juste, irréprochable',
  },
  2: {
    type: 2,
    fear: 'Ne pas être aimé, être perçu comme inutile ou ingrat',
    desire: 'Être aimé, nécessaire, apprécié',
  },
  3: {
    type: 3,
    fear: 'Échouer, être perçu comme incompétent ou sans valeur',
    desire: 'Réussir, être admiré, atteindre ses objectifs',
  },
  4: {
    type: 4,
    fear: 'Ne pas avoir d\'identité propre, être ordinaire',
    desire: 'Être unique, authentique, profondément compris',
  },
  5: {
    type: 5,
    fear: 'Être incompétent, manquer de ressources, être envahi',
    desire: 'Comprendre, maîtriser, être autonome et capable',
  },
  6: {
    type: 6,
    fear: 'Être abandonné, trahi, sans soutien fiable',
    desire: 'Sécurité, fiabilité, soutien durable',
  },
  7: {
    type: 7,
    fear: 'Être privé, limité, enfermé dans la douleur ou l\'ennui',
    desire: 'Liberté, options, expériences positives',
  },
  8: {
    type: 8,
    fear: 'Être contrôlé, dominé, manipulé par les autres',
    desire: 'Autonomie, force, contrôle de son destin',
  },
  9: {
    type: 9,
    fear: 'Rupture, conflit, perte de connexion avec les autres',
    desire: 'Paix intérieure, harmonie, cohésion du groupe',
  },
}

// ── Stratégies de communication DISC ─────────────────────────────────────────

export const DISC_COMMUNICATION: Record<DiscType, CommunicationStrategy> = {
  D: {
    format: 'Court, direct, bullet points. 3-5 lignes max.',
    opener: 'Commencer par le problème ou l\'action requise — pas de contexte.',
    angle: 'Mettre en avant l\'efficacité, les résultats, le gain de temps.',
    avoid: [
      'Longues introductions et contextualisations inutiles',
      'Décisions floues ou "on va voir"',
      'Détail excessif des processus',
      'Montrer sa propre incertitude',
    ],
    email_length: 'court',
  },
  I: {
    format: 'Ton chaleureux, personnalisé. Peut être légèrement plus long.',
    opener: 'Créer du lien avant d\'aller à l\'essentiel — une phrase personnelle.',
    angle: 'Mettre en avant la collaboration, la reconnaissance, le "on est ensemble là-dedans".',
    avoid: [
      'Ton froid ou purement administratif',
      'Longueur excessive de détails techniques',
      'Être trop formel ou distant',
      'Ignorer la dimension relationnelle du problème',
    ],
    email_length: 'moyen',
  },
  S: {
    format: 'Format clair, structuré, rassurant. Pas de surprise dans la forme.',
    opener: 'Reconnaître d\'abord la situation, avant la solution.',
    angle: 'Mettre en avant la continuité, la stabilité, "rien ne change radicalement".',
    avoid: [
      'Annonces brusques sans préparation',
      'Urgences artificielles',
      'Pressions pour décider vite',
      'Changer l\'approche sans explication',
    ],
    email_length: 'moyen',
  },
  C: {
    format: 'Précis, avec données, références et sources si possible.',
    opener: 'Entrer directement dans les faits — contexte légal ou chiffré.',
    angle: 'Mettre en avant la rigueur, la conformité, la traçabilité.',
    avoid: [
      'Affirmations sans source ni chiffre',
      'Imprécisions sur les délais ou montants',
      'Prise de décision sans données',
      'Ton émotionnel ou trop informel',
    ],
    email_length: 'long',
  },
}

// ── Génération de la carte de communication ───────────────────────────────────

export function generateCommunicationCard(
  disc: DiscProfile,
  enneagram: EnneagramType,
  situation?: string
): string {
  const strategy = DISC_COMMUNICATION[disc.primary]
  const ennProfile = ENNEAGRAM_PROFILES[enneagram]
  const discLabel = `${disc.primary}${disc.secondary}`

  const lines = [
    `STRATÉGIE COMMUNICATION — [DISC: ${discLabel}] — [Ennéagramme: ${enneagram}]`,
    '',
    `FORMAT     ${strategy.format}`,
    `ACCROCHE   ${strategy.opener}`,
    `ANGLE      ${strategy.angle}`,
    `PEUR CENTRALE  ${ennProfile.fear}`,
    '',
    'ÉVITER :',
    ...strategy.avoid.map((a) => `  · ${a}`),
  ]

  if (situation) {
    lines.push('')
    lines.push(`POUR CE MESSAGE : "${situation}"`)
    lines.push('  → Appliquer l\'angle ci-dessus à cette situation spécifique.')
    lines.push(`  → Rappel peur centrale (${enneagram}) : ${ennProfile.fear}`)
  }

  lines.push('')
  lines.push('⚠  USAGE INTERNE UNIQUEMENT — ne jamais inclure dans un mail.')

  return lines.join('\n')
}
