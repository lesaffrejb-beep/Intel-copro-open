---
title: "Design System — Le Présent Dashboard"
category: concept
tags: [dashboard, design-system, nothing-design, frontend, react, tailwind, shadcn]
created: 2026-04-04
updated: 2026-04-04
source: "nothing-design-skill + cabinet + agno-agi/pal"
status: draft
---

# Design System — Le Présent Dashboard

> Documentation du design system et de l'architecture frontend pour le futur dashboard wiki-copro. On ne build pas maintenant — on documente pour que le jour où tu dis "go", tout soit prêt.

---

## Philosophie

**3 principes** :
1. **Monochrome, typographie first** — le contenu domine, pas la déco (style Nothing)
2. **Si ça ressemble à un logiciel enterprise, c'est raté** — ça doit ressembler à une équipe qui travaille (philosophie Cabinet)
3. **Le wiki est le moteur, le dashboard est la vitre** — le front lit le Markdown, il ne le remplace pas

---

## Sources d'inspiration

### 1. Nothing Design Skill

**Repo** : [dominikmartn/nothing-design-skill](https://github.com/dominikmartn/nothing-design-skill)

Skill Claude Code qui génère des UI dans le langage visuel Nothing (téléphones). Ce qu'on retient :

- **Palette monochrome** : OLED black (#000) / white (#FFF), zéro couleur décorative
- **Hiérarchie 3 couches** :
  - **Display** : grands chiffres KPIs, titres typographiques massifs
  - **Body** : contenu principal (articles wiki, données, formulaires)
  - **Metadata** : dates, statuts, tags — plus petit, plus gris
- **Composants mécaniques** : inspirés du hardware Nothing
  - Toggles mécaniques (pas des switches Material Design)
  - Progress bars segmentées (pas des barres lisses)
  - Widgets "instrument" (comme des jauges de cockpit)
- **Dark/light mode natif** via tokens CSS

### 2. Cabinet

**Repo** : [hilash/cabinet](https://github.com/hilash/cabinet)

Plateforme KB + agents IA. Next.js 16 + shadcn/ui + Tiptap + Zustand. Ce qu'on retient :

- **Sidebar hiérarchique** : navigation par catégorie (résidences, lois, procédures)
- **Éditeur Tiptap** : markdown WYSIWYG pour éditer le wiki in-browser
- **Terminal intégré** (xterm.js) : lancer les scripts sans quitter le dashboard
- **Git auto-commit on save** : chaque modification = commit automatique
- **Agents avec cron jobs** : templates d'agents pré-configurés avec scheduling
- **Kanban** : suivi tâches (maintenance, dossiers sinistres)
- **Apps HTML embarquées** : dashboards financiers inline dans les pages wiki

### 3. Pal (agno-agi)

**Repo** : [agno-agi/pal](https://github.com/agno-agi/pal)

"Personal Agent that Learns" — même vision que wiki-copro mais Python/FastAPI/PostgreSQL. Ce qu'on retient :

- **Chat UI avec tool call transparency** : voir ce que fait chaque agent en temps réel
- **5 agents avec routing intelligent** : Navigator → route la query vers le bon agent
- **Learning loop** : table `pal_learnings` — chaque interaction améliore la suivante
- **Context graph** : 5 sources de données (Knowledge, Learnings, Wiki, Files, SQL)
- **8 cron jobs automatiques** : daily briefing, weekly review, lint, sync GitHub

---

## Stack technique retenue

| Couche | Choix | Raison |
|--------|-------|--------|
| **Framework** | Next.js + React + TypeScript | Standard, même stack que ValoSyndic |
| **CSS** | Tailwind CSS + tokens Nothing | Minimaliste, dark/light mode natif |
| **Composants** | shadcn/ui | Accessible, customisable, pas de bloat |
| **Typographie** | Space Grotesk (body) + Space Mono (mono) | Style Nothing, excellent pour données denses |
| **State** | Zustand | Léger, patterns prouvés par Cabinet |
| **Storage** | Markdown files (wiki/) via API | Cohérent avec l'architecture existante |
| **Éditeur** | Tiptap (si WYSIWYG nécessaire) | Même choix que Cabinet |
| **Rendu MD** | react-markdown + rehype | Standard, supporte frontmatter YAML |

---

## Design Tokens

### Couleurs (mode sombre — défaut)

```css
:root {
  /* Nothing monochrome — dark mode */
  --bg-primary: #000000;           /* OLED black */
  --bg-secondary: #0A0A0A;         /* cards */
  --bg-tertiary: #141414;          /* hover, active */
  --border: #1F1F1F;               /* séparateurs subtils */
  
  --text-display: #FFFFFF;          /* KPIs, titres Display */
  --text-body: #E0E0E0;            /* contenu principal */
  --text-metadata: #666666;         /* dates, statuts, tags */
  --text-muted: #404040;           /* placeholders */
  
  --accent: #FFFFFF;                /* liens, éléments interactifs */
  --accent-hover: #CCCCCC;
  
  /* Seules exceptions de couleur : statuts sémantiques */
  --status-ok: #22C55E;            /* validated, payé */
  --status-warn: #F59E0B;          /* review, en cours */
  --status-error: #EF4444;         /* erreur, impayé */
  --status-info: #3B82F6;          /* draft, info */
}

/* Light mode */
[data-theme="light"] {
  --bg-primary: #FFFFFF;
  --bg-secondary: #FAFAFA;
  --bg-tertiary: #F0F0F0;
  --border: #E5E5E5;
  
  --text-display: #000000;
  --text-body: #1A1A1A;
  --text-metadata: #999999;
  --text-muted: #CCCCCC;
  
  --accent: #000000;
  --accent-hover: #333333;
}
```

### Typographie

```css
/* Nothing typography system */
--font-body: 'Space Grotesk', system-ui, sans-serif;
--font-mono: 'Space Mono', 'JetBrains Mono', monospace;
--font-accent: 'Doto', monospace;  /* titres display, KPIs */

/* Hiérarchie 3 couches */
--text-display-size: 3rem;    /* 48px — KPIs, héros */
--text-heading-size: 1.5rem;  /* 24px — titres sections */
--text-body-size: 1rem;       /* 16px — contenu */
--text-meta-size: 0.75rem;    /* 12px — dates, tags */
--text-mono-size: 0.875rem;   /* 14px — code, données */
```

### Spacing

```css
/* 4px grid system */
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
```

---

## Composants clés

### 1. Widget Instrument (KPIs)

Inspiré des jauges Nothing — affiche un chiffre gros + label + tendance.

```
┌─────────────────────┐
│                      │
│       1 4 4 1        │  ← font-accent, 3rem
│       m o t s        │  ← text-metadata
│                      │
│  ████████░░░░  0.4%  │  ← progress bar segmentée
│  objectif: 400K      │
│                      │
└─────────────────────┘
```

Usage : articles wiki, mots total, taux ingestion, santé lint, commits 7j.

### 2. Toggle mécanique

Pas un switch iOS/Material. Un toggle qui ressemble à un interrupteur physique.

```
Statut résolu    [■■■■░░░░]  ON
Paiement reçu    [░░░░░░░░]  OFF
```

Usage : statut payé/impayé, dossier résolu/en cours, article draft/validated.

### 3. Progress bar segmentée

```
Ingestion sources  ██░░░░░░░░░░░░░░░░░░  8%
                   ▲ 6/76 PDFs compilés
```

Usage : avancement compilation, budget travaux, couverture thématique.

### 4. Sidebar hiérarchique (Cabinet-style)

```
📂 Wiki
  ├── 📁 concepts/ (5)
  ├── 📁 procedures/ (2)
  ├── 📁 jurisprudence/ (1)
  ├── 📁 financement/ (0)
  ├── 📁 technique/ (0)
  ├── 📁 outils/ (2)
  └── 📁 meta/ (2) 🔒
📂 Agents (7)
📂 Veille
📂 Productivité
```

### 5. Card article

```
┌─────────────────────────────────────────┐
│ Copropriété — Définition                │  ← heading
│ concept · draft · 2026-04-03            │  ← metadata
│                                         │
│ La copropriété est l'organisation d'un  │  ← body preview
│ immeuble bâti dont la propriété est...  │
│                                         │
│ ← charges-copro  → syndic-role          │  ← backlinks
└─────────────────────────────────────────┘
```

---

## Pages du dashboard

### 1. Home / Cockpit

Grille de widgets instrument :

| Widget | Données | Source |
|--------|---------|--------|
| Articles wiki | 11 / 100 | `metrics.sh` |
| Volume mots | 3 301 / 400K | `metrics.sh` |
| Taux ingestion | 0% (0/76 PDFs) | `sources-catalog.sh` |
| Santé lint | X warnings | `lint.sh` |
| Commits 7j | 24 | `git log` |
| Fichiers pending | 80 | `check-pending.sh` |

### 2. Wiki Browser

- Sidebar hiérarchique (catégories + articles)
- Rendu markdown avec frontmatter visible
- Recherche fuzzy full-text
- Graphe de backlinks (optionnel, comme Obsidian)

### 3. Agents

- Liste des 7 agents avec statut (actif/inactif/erreur)
- Dernière exécution + résultat
- Logs des tool calls (transparence à la Pal)
- Bouton "Run now" pour exécution manuelle

### 4. Veille

- Flux chronologique des `outputs/veille/`
- Scoring pertinence (0-100) par article
- Action requise : oui/non/à vérifier
- Bouton "Ingérer" → lance le pipeline compile

### 5. Productivité

- Graphe progression (articles/semaine, mots/semaine)
- Timeline git log visualisée
- Rapport mensuel généré par `productivity-report.sh`
- Export PDF pour entretien annuel

### 6. Mails (Phase 2)

- Inbox classifiée (copropriétaire / prestataire / assurance / admin)
- Brouillons IA avec label "AI Draft"
- Queue de validation : lire → ajuster → envoyer
- Historique par résidence/contact

---

## Ce qu'on prend de chaque source

| Idée | Source | Usage dans wiki-copro |
|------|--------|----------------------|
| Palette monochrome + 3 couches visuelles | Nothing | Tout le design system |
| Progress bars segmentées | Nothing | Budget travaux, ingestion, avancement wiki |
| Toggles mécaniques | Nothing | Statut payé/impayé, résolu/en cours |
| Widgets "instrument" | Nothing | KPIs du cockpit |
| Sidebar hiérarchique | Cabinet | Navigation résidences/catégories wiki |
| Git auto-commit on save | Cabinet | Déjà implémenté via hooks Claude Code |
| Agent templates + cron | Cabinet | Pattern pour Agent 5 (veille) + Agent 8 (mails) |
| Markdown WYSIWYG (Tiptap) | Cabinet | Édition wiki in-browser |
| Apps HTML embarquées | Cabinet | Dashboards financiers inline |
| Chat UI + tool call transparency | Pal | Page Agents — voir ce que fait chaque agent |
| Learning loop | Pal | `wiki/errors-log/` + `learnings.md` |
| Context graph (5 sources) | Pal | wiki/ + raw/ + meta/ + templates/ + outputs/ |
| Routing intelligent | Pal | Router vers le bon agent selon la query |

---

## Différence clé avec Pal et Cabinet

Pal = PostgreSQL + Python + FastAPI. Cabinet = Next.js full-stack.

**Nous** : le wiki Markdown + Git reste le **moteur**. Le dashboard est une **couche de lecture** par-dessus. Pas de base de données. Pas de migration de données. Le front consomme les mêmes fichiers `.md` que Claude Code.

Si le dashboard tombe → le wiki fonctionne toujours dans le terminal + Obsidian. **Zéro dépendance critique.**

---

## Quand builder ?

**Pas maintenant.** Conditions pour démarrer le front :
1. Wiki à 30+ articles (contenu à afficher)
2. Scripts stables (API à consommer)
3. Phase 1 terminée (fondations solides)
4. JB dit "go" pour le dashboard

Estimation : **Phase 4** (post-stage) ou en parallèle si le vibe coding le démange.

---

*Voir aussi* : [[productivity-assistant-design]], [[le-present]], [[index]]
