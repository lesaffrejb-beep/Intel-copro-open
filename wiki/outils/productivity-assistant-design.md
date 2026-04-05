---
title: "Le Présent v2 — Vision Productivity Assistant"
category: concept
tags: [vision, architecture, productivity, ai-chief-of-staff, mcp, google-workspace, veille, dashboard]
created: 2026-04-04
updated: 2026-04-04
source: "session claude code — brainstorm JB"
status: draft
---

# Le Présent v2 — Vision Productivity Assistant

> De la base de connaissance wiki-copro vers un **AI Chief of Staff** complet pour syndic de copropriété.

---

## 1. Comment s'appelle ce concept ?

Ce que tu construis n'est pas juste un wiki. C'est un **système multi-agents orchestré** qui agit comme ton bras droit numérique.

### Noms de l'industrie

| Terme | Ce que ça couvre | Exemple |
|-------|-----------------|---------|
| **Second Brain** (Tiago Forte) | La base de connaissance seule | Obsidian, Notion, wiki-copro actuel |
| **AI Chief of Staff** | L'orchestrateur qui agit en ton nom | Lindy.ai, Dust.tt |
| **Digital Twin professionnel** | Ta version augmentée au travail | Ce qu'on construit |
| **Productivity Copilot** | L'assistant qui anticipe tes besoins | GitHub Copilot mais pour tout le métier |

### La version finale

Un système qui :
- Lit tes mails → draft les réponses en brouillon
- Gère ton agenda → prépare les réunions (documents, historique résidence, points à aborder)
- Capitalise chaque interaction → enrichit le wiki automatiquement
- Surveille le marché → te brief le lundi matin
- Track ta productivité → génère des rapports pour négocier ta prime

**Nom retenu** : **Le Présent v2** — le cadeau qui continue de donner, les hooks qui bougent à ta place (cf. [[le-present]]).

---

## 2. Mails pro / Agenda pro / Contacts pro — Faisabilité

### Google Workspace APIs disponibles

| API | Capacités | OAuth2 scope |
|-----|-----------|-------------|
| **Gmail API** | Lire, envoyer, créer brouillons, gérer labels | `gmail.modify` |
| **Calendar API** | CRUD événements, invitations, disponibilités | `calendar.events` |
| **People API** (Contacts) | Lecture/écriture contacts, groupes | `contacts.readonly` |
| **Drive API** | Upload/download, gestion dossiers, partage | `drive.file` |

### 3 chemins d'implémentation

1. **MCP Servers** (recommandé) — Claude Code supporte nativement les MCP servers. Un MCP server Google Workspace = Claude Code accède directement à Gmail/Calendar/Contacts/Drive dans la même session. Standard ouvert (supporté par OpenAI, Google, etc.).

2. **n8n** — orchestrateur low-code, déjà prévu pour l'Agent 5 (Veilleur). Trigger sur nouveau mail → Claude API → brouillon Gmail. Self-hosted sur VPS.

3. **Google Apps Script** — gratuit, tourne sur l'infra Google. Idéal pour des automations légères (onMailReceive → createDraft). Zéro serveur à maintenir.

### Sécurité

- OAuth2 avec scopes restreints (principle of least privilege)
- Tokens **jamais** dans le repo (`.env` + `.gitignore`)
- Refresh tokens stockés localement ou dans un secret manager

---

## 3. Google Drive 5TB pour les gros fichiers

**Excellente idée, déjà dans le README.** L'architecture cible :

```
Google Drive (5TB)                    GitHub Repo (<5GB)
├── audio/recordings/                 ├── raw/ (.md essence uniquement)
├── pdf/originaux/                    ├── wiki/ (connaissance structurée)
├── plans/architecturaux/             └── frontmatter: source_drive: "lien"
└── scans/
```

**Règle** : le repo garde l'essence en `.md`. Drive stocke le lourd (PDF originaux, enregistrements audio, scans). Le lien Drive est dans le frontmatter YAML `source_drive:` de chaque article.

**Script à créer** : `scripts/drive-link.sh` — upload vers Drive, retourne le lien, injecte dans le frontmatter.

---

## 4. Limites GitHub — Jusqu'où c'est gratuit ?

| Plan | Stockage repo | Fichier max | LFS inclus | Prix |
|------|--------------|-------------|------------|------|
| **Free** | 5 GB/repo (soft limit) | 100 MB/fichier | 1 GB stockage + 1 GB bandwidth/mois | **0 EUR** |
| **Pro** | 5 GB/repo (soft limit) | 100 MB/fichier | 2 GB + 2 GB | 4 USD/mois |
| **Team** | idem | idem | plus de LFS | 4 USD/user/mois |

**Pour wiki-copro** : le repo fait ~235 MB (dont 122 MB de `Ressources/`).

**Stratégie** :
1. Déplacer `Ressources/` (PDFs) vers Google Drive → repo < 100 MB
2. Rester en **Free** sans problème pendant des années
3. Si besoin Git LFS : data pack à 50 USD/an pour 50 GB

**Warning** : GitHub recommande < 1 GB par repo pour la performance. Au-delà de 5 GB, GitHub contacte pour demander de réduire. Avec Drive pour le lourd, on n'atteindra jamais cette limite.

---

## 5. Veille juridique automatique hebdomadaire

**Déjà prévue comme Agent 5 (Phase 2).** Design enrichi pour remplacer la newsletter nulle de votreimmeuble.com :

```
Dimanche soir (cron automatique)
  ├── Perplexity Sonar Pro → recherche web ciblée
  │   ├── "copropriété jurisprudence Cass 3e civ semaine"
  │   ├── "ANAH MPRc modification 2026"
  │   ├── "Matera syndic actualité concurrence"
  │   ├── "marché immobilier Angers Maine-et-Loire"
  │   ├── "réforme copropriété loi 2026"
  │   └── "parts de marché syndic France"
  │
  ├── Claude API → synthèse + scoring pertinence (0-100)
  │
  └── Output
       ├── outputs/veille/veille-YYYY-MM-DD.md (dans le repo)
       └── notification lundi 8h (email / Telegram / Slack)

Lundi matin 8h
  └── JB lit le brief sur son téléphone en 5 min
```

**Stack possible** :
- **GitHub Actions scheduled** (gratuit, limité à 2000 min/mois en Free)
- **n8n self-hosted** (sur VPS, plus flexible)
- **Google Apps Script + trigger horaire** (gratuit, zéro serveur)

**Contenu de la veille** :
- Nouvelles décisions Cour de cassation 3e civ.
- Modifications législatives (Loi 65-557, Décret 67-223)
- Circulaires ANAH / CEE / MPRc
- Actualité concurrents (Matera, Homeland, Cotoit)
- Marché immobilier local (Angers, Maine-et-Loire)
- MAJ des outils métier (ValoSyndic, logiciels syndic)

---

## 6. Agents — Sont-ils bien différenciés ?

**Oui, et c'est un point critique.** Chaque agent a un niveau de tolérance différent :

| Agent | Tolérance créative | Confiance requise | Modèle | Pourquoi |
|-------|-------------------|-------------------|--------|----------|
| **Rédacteur Mail** | Haute | 70% | Sonnet | Ton adaptable, formulations libres, JB relit avant envoi |
| **Rédacteur PV** | Moyenne | 85% | Sonnet | Structure fixe (template), contenu variable |
| **Juriste Copro** | **Zéro** | **100%** | **Opus** | Citation exacte ou `[À VÉRIFIER]`. Aucune approximation tolérée |
| **Comptable Copro** | Faible | 95% | Opus | Chiffres exacts, calculs vérifiables |
| **Diagnostiqueur** | Moyenne | 80% | Sonnet | Expertise technique, pas de valeur juridique engageante |
| **Veilleur** | Haute | 60% | Sonnet | Synthèse d'actualité, pas de conseil juridique |
| **Formateur Quiz** | Haute | 70% | Sonnet | Pédagogie, cas fictifs acceptés |

### Implémentation

Chaque prompt dans `prompts/agents/` encode déjà son niveau d'exigence via :
- Le choix du modèle (Opus = rigueur max, Sonnet = rapidité)
- Les instructions dans le system prompt ("cite l'article exact ou marque [À VÉRIFIER]")
- À ajouter : champ `confidence_threshold` dans le frontmatter YAML de chaque prompt

---

## 7. VPS ou pas ?

**Verdict : pas de VPS pour l'instant.**

| Besoin | Solution actuelle | VPS requis ? |
|--------|------------------|-------------|
| Compilation raw→wiki | Session Claude Code manuelle | Non |
| Lint + metrics | GitHub Actions CI (déjà en place) | Non |
| Veille hebdo | GitHub Actions scheduled OU Google Apps Script | Non |
| Draft mails | MCP server local (Claude Code desktop/web) | Non |
| Monitoring continu 24/7 | n8n self-hosted | **Oui** |

### Phase stage (avril-août 2026)

**Sessions de cowork hebdo avec Claude Code sur Mac suffisent.** Le repo est cloné localement, les scripts tournent manuellement. Pas besoin de serveur.

Workflow :
1. Clone le repo sur ton Mac
2. Ouvre Claude Code
3. Lance les scripts (`lint.sh`, `metrics.sh`, `weekly-review.sh`)
4. Compile, file-back, commit, push
5. Ferme. GitHub Actions fait le lint automatique au push.

### Phase post-stage (si automatisation 24/7)

- **VPS léger** : Hetzner CX22 (4 EUR/mois) ou Oracle Cloud Free Tier (**gratuit**)
- n8n self-hosted dessus
- Crons pour veille + Granola webhook + notifications push

---

## 8. Brouillons de réponses mail

**Faisable.** Design du pipeline :

```
Nouveau mail reçu
  → Classifier (copropriétaire / prestataire / assurance / admin / pub)
  → Lire wiki/ pour contexte pertinent (résidence, historique, procédure)
  → Lire wiki/meta/ pour ton et pratiques du cabinet
  → Générer brouillon avec le bon agent (redacteur-mail.md)
  → Sauvegarder en brouillon Gmail (label: "AI Draft 🤖")
  → JB relit, ajuste 2 mots, envoie
```

**3 approches techniques** :
1. **MCP Server Gmail** (recommandé) — Claude Code lit les mails, draft directement dans Gmail
2. **n8n workflow** — trigger sur nouveau mail → Claude API → brouillon Gmail
3. **Google Apps Script** — `onMailReceive()` → appel Claude API → `createDraft()`

**Règle absolue** : jamais d'envoi automatique. Toujours brouillon → validation humaine → envoi.

---

## 9. Portabilité LLM — Si Claude se fait dépasser

**L'architecture est déjà quasi-universelle** :
- Tout est en **Markdown** (lisible par n'importe quel LLM)
- Les prompts sont en **langage naturel** (pas de function calling spécifique)
- **Git** = standard universel
- **MCP** = standard ouvert (supporté par OpenAI, Google, Anthropic)

### Pour renforcer la portabilité

1. Fichier `config/llm-provider.json` :
```json
{
  "default": "claude-opus-4-6",
  "fast": "claude-sonnet-4-6",
  "search": "perplexity-sonar-pro",
  "fallback": "gpt-4o"
}
```

2. Prompts en langage naturel standard (éviter les `<xml>` spécifiques Claude)
3. MCP servers = interface universelle vers les outils
4. Si migration : changer le provider dans la config, les prompts markdown restent

### Risque réel

Les hooks Claude Code (`.claude/hooks/`) sont spécifiques à Claude Code. Si migration vers un autre outil → réécrire 4 scripts Bash. Pas dramatique.

Le wiki lui-même est **100% portable** — c'est du texte.

---

## 10. Tracking productivité et estimation CA

### Métriques trackables

| Métrique | Comment mesurer | Proxy CA |
|----------|----------------|----------|
| Temps réponse copropriétaire | Timestamp mail reçu → envoyé | Satisfaction → rétention lots |
| Dossiers traités / semaine | Compteur notes terrain | CA = nb lots * honoraires/lot |
| Erreurs évitées | `wiki/errors-log/` vide = bon signe | Coût évité (contentieux, pénalités retard) |
| Temps préparation AG | Avant/après utilisation wiki | Heures économisées * taux horaire |
| Questions résolues sans superviseur | Compteur file-back | Autonomie = temps superviseur libéré |
| Articles wiki créés | `metrics.sh` | Capital immatériel construit |

### Script à créer

`scripts/productivity-report.sh` :
- Parse `git log` pour volume d'activité (commits, fichiers modifiés)
- Parse `outputs/weekly/` pour progression qualitative
- Génère `outputs/productivity/report-YYYY-MM.md`

### Pour négociation salaire / prime

> "En 4 mois de stage, j'ai documenté X cas, résolu Y questions juridiques en autonomie, réduit le temps de préparation AG de Z%, et construit un actif de connaissance de W articles couvrant 100% des sources légales du métier."

Le `git log` **prouve** tout ça. Chaque commit est un fait, pas une affirmation.

---

## 11. Verdict honnête

### Ce qui est solide (déjà prouvé)

- Le concept "Second Brain" + Git est validé par Karpathy (~100 articles / 400K mots sans RAG)
- L'architecture Markdown+Git est **indestructible** (pas de vendor lock-in, pas de base de données à maintenir)
- Le file-back loop est un **vrai avantage compétitif** (le wiki s'améliore à chaque usage)
- Le pipeline raw→wiki est le même que [agno-agi/pal](https://github.com/agno-agi/pal), validé indépendamment

### Ce qui est ambitieux mais réaliste

- Intégration Gmail/Calendar via MCP servers (tech mature, standard ouvert)
- Veille automatique (n8n + Perplexity, stack éprouvée)
- Draft emails (plein d'outils le font déjà, ici c'est **personnalisé** au cabinet)

### Ce qui est "stretch goal"

- Full AI Chief of Staff autonome (complexe mais faisable à terme)
- Tracking CA précis (proxy seulement, pas de mesure directe)
- Dashboard frontend complet (Phase 4)

### C'est un gadget ?

**Non.** C'est un **projet de portfolio exceptionnel**. Tu montres :
1. Que tu comprends l'IA appliquée au métier (pas juste "j'utilise ChatGPT")
2. Que tu sais construire un système (architecture, CI, agents, hooks)
3. Que tu as un actif documenté et versionné (le wiki avec git diff comme preuve)
4. Que tu vibe codes **avec méthode** (pas du bricolage)

### Ligne pour le CV

> "Architecte d'un système multi-agents IA pour la gestion de copropriété — base de connaissance auto-améliorante, intégration Google Workspace, veille juridique automatisée."

---

## Roadmap intégrée

### Phase 1 — Fondations (avril-mai) — EN COURS
- Compiler 85 raw files → wiki articles
- Workflow quotidien Granola → raw → wiki → commit
- **Cible** : 30 articles / 50K mots

### Phase 1.5 — Google Drive (mai)
- Déplacer `Ressources/` vers Drive
- Script `drive-link.sh` pour référencement frontmatter
- **Cible** : repo < 100 MB

### Phase 2 — Intégrations (juin-juillet)
- Agent 5 : Veille juridique (n8n + Perplexity)
- MCP Server Gmail : lecture mails + brouillons
- MCP Server Calendar : préparation réunions
- `scripts/productivity-report.sh`
- **Cible** : 60 articles / 150K mots

### Phase 3 — Automation (août+)
- Draft mails automatiques (avec validation humaine)
- VPS si nécessaire (n8n self-hosted)
- Agent 7 : ValoSyndic sync
- Portabilité LLM : couche d'abstraction provider
- **Cible** : 100 articles / 400K mots

### Phase 4 — AI Chief of Staff + Dashboard (post-stage)
- Orchestrateur multi-agents complet
- Dashboard web Nothing-inspired (cf. [[design-system-dashboard]])
- Notifications push (Telegram/Slack)
- Le **Présent v2** — ton copilote syndic complet

---

*Voir aussi* : [[le-present]], [[design-system-dashboard]], [[index]]
