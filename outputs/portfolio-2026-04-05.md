# Portfolio — Base de connaissances copropriété

**Date d'export** : 2026-04-05
**Projet** : copro-intel — base de connaissances syndic

## Vue d'ensemble

| Indicateur | Valeur |
|------------|--------|
| Articles wiki | **116** |
| Volume total | **152757 mots** |
| Sources ingérées (raw/) | 80 |
| Liens internes | 958 |
| Liens cassés | 0 |
| Taux d'intégrité | 100% |

## Couverture thématique

| Domaine | Articles | Mots |
|---------|----------|------|
| concepts | 67 | 98006 |
| procedures | 13 | 12784 |
| jurisprudence | 1 | 1528 |
| financement | 9 | 8185 |
| technique | 7 | 7609 |
| contexte-local | 12 | 16149 |
| decisions | 2 | 765 |
| meta | 2 | 932 |

## Outils et automatisation

| Outil | Description |
|-------|-------------|
| Scripts bash | 16 utilitaires (lint, metrics, ingest, search, quiz…) |
| Prompts opérationnels | 13 (compile, Q&A, file-back, weekly review…) |
| Agents spécialisés | 6 (juriste, comptable, rédacteur, diagnostiqueur…) |
| Templates métier | 3 (convocation AG, PV, matrice sinistre) |
| CI/CD | GitHub Actions — lint + metrics auto sur chaque push |
| Hooks Claude Code | SessionStart (contexte auto), PreToolUse (protection fichiers) |
| Manifest incrémental | Suivi des compilations raw→wiki avec timestamps |

## Architecture du repo

```
wiki-copro/
├── raw/                 # Sources brutes (80 fichiers)
│   ├── lois/            # Textes légaux (Légifrance)
│   ├── financement/     # Aides et dispositifs financiers
│   ├── guides/          # Guides pratiques
│   ├── notes-terrain/   # Notes Granola importées
│   └── stock/           # Documents divers
├── wiki/                # Base compilée (116 articles)
│   ├── concepts/        # Définitions, cadre légal
│   ├── procedures/      # Procédures opérationnelles
│   ├── financement/     # Dispositifs de financement
│   ├── technique/       # Sécurité, diagnostics, équipements
│   ├── contexte-local/  # Données Maine-et-Loire / Angers
│   ├── jurisprudence/   # Sources jurisprudentielles
│   ├── decisions/       # Arbitrages documentés
│   └── meta/            # Contexte organisationnel (interne)
├── prompts/             # Prompts et agents IA
├── scripts/             # Automatisation (16 scripts)
├── templates/           # Modèles de documents
├── outputs/             # Rapports générés (lint, metrics, portfolio)
└── .claude/hooks/       # Automatisation Claude Code
```

## Compétences mobilisées

- **Droit de la copropriété** : loi 65-557, décret 67-223, ALUR, ELAN, IRSI
- **Gestion de projet** : roadmap en 5 phases, suivi par métriques
- **Ingénierie documentaire** : pipeline d'ingestion, compilation, linting
- **Automatisation IA** : agents spécialisés, boucle de capitalisation (file-back)
- **DevOps** : CI/CD, hooks, scripts bash, Git workflow
- **Architecture de l'information** : wiki structuré, backlinks, index navigable

## Activité récente

| Indicateur | Valeur |
|------------|--------|
| Commits total | 59 |
| Premier commit | 2026-04-04 |
| Dernier commit | 2026-04-05 |

---
_Généré par `./scripts/export-portfolio.sh` — Sun Apr  5 06:22:00 UTC 2026_
