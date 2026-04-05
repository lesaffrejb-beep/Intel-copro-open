# AGENTS.md — Système LLM Knowledge Base (copropriété)

---

## AUTO-PILOT — Comportement par défaut de Claude Code

> Cette section est lue en priorité. Elle définit comment Claude Code se comporte **sans qu'on lui demande**.

### Détection d'intention automatique

À chaque message ou dépôt de fichier, Claude Code doit **détecter seul** ce qui est attendu et agir immédiatement, sans demander de confirmation ni de prompt supplémentaire.

| Signal détecté | Action automatique |
|----------------|--------------------|
| Question en langage naturel (métier, juridique, procédure) | → Lire wiki/ + lois + templates + wiki/meta/ → Répondre → File-back automatique |
| Fichier Granola / note terrain déposé dans `raw/notes-terrain/` | → Compiler vers wiki/ → Commit → Afficher résumé |
| Fichier brut dans `raw/lois/`, `raw/financement/`, etc. | → Compiler vers wiki/ → Mettre à jour INDEX.md → Commit |
| Fichiers en attente détectés au démarrage | → Traiter en priorité, sans attendre |
| Demande de template (LRAR, convocation, PV…) | → Chercher dans `templates/` et `wiki/` → Fournir prêt à l'emploi |
| Mention d'une résidence spécifique | → Chercher dans `Cabinet/` et `Résidences/` → Contextualiser |

### Règle d'or du mode auto-pilot

> **Ne jamais laisser de connaissance éphémère.** Toute réponse, toute note traitée, tout cas analysé → versé dans le wiki avant la fin de la session.

### Mémoire organisationnelle (priorité haute)

Avant de répondre à toute question, consulter dans l'ordre :
1. `wiki/meta/` — pratiques et culture du cabinet (confidentiel, ne jamais partager)
2. `wiki/procedures/` — procédures validées en interne
3. `templates/` — modèles de documents prêts à l'emploi
4. `wiki/concepts/` + `wiki/jurisprudence/` — base légale
5. Sources légales dans `raw/lois/` si l'article wiki semble insuffisant

Exemple : si l'utilisateur demande "comment on traite une LRAR de recouvrement chez nous ?", chercher d'abord dans `wiki/meta/` et `templates/` avant de répondre générique.

### Workflow "dépose et oublie" (mode off)

L'utilisateur peut simplement :
1. Lancer `./scripts/granola-import.sh <fichier>` pour importer une note Granola
2. Ou déposer un fichier directement dans `raw/notes-terrain/` (avec frontmatter YAML)
3. Claude Code détecte les fichiers non traités au démarrage et les compile automatiquement

---

## Identité du wiki
- **Domaine** : gestion de copropriété (syndic) en droit français.
- **Cadre légal principal** : Loi n°65-557 du 10 juillet 1965, Décret n°67-223 du 17 mars 1967, Loi ALUR, Loi ELAN, Convention IRSI.
- **Lieu d'exercice** : cabinet syndic régional (France).
- **Niveau de rigueur** : professionnel. Toute affirmation juridique doit citer un article (loi, décret, code) ou être marquée **[À VÉRIFIER]**.

## Conventions de nommage
- Fichiers wiki : `kebab-case.md` (exemple : `degat-des-eaux-irsi.md`).
- Langue : français professionnel, concret, actionnable.
- Encodage : UTF-8.

## Frontmatter YAML obligatoire (tous les articles wiki)
```yaml
---
title: "Titre de l'article"
category: concept | procedure | jurisprudence | template | error | person
tags: [tag1, tag2]
created: YYYY-MM-DD
updated: YYYY-MM-DD
source: "référence de la source brute dans raw/"
status: draft | review | validated
---
```

## Liens internes et backlinks
- Utiliser `[[nom-du-fichier]]` pour les liens internes (compatible Obsidian).
- Chaque article doit inclure une section **Voir aussi** avec des liens pertinents.

## Règles de compilation (raw → wiki)
1. Quand un fichier est ajouté dans `raw/`, le LLM doit :
   - lire le contenu brut ;
   - identifier concepts, procédures, personnes, erreurs ;
   - créer ou mettre à jour les articles wiki concernés ;
   - mettre à jour `wiki/index.md` ;
   - ajouter les backlinks.
2. Ne jamais supprimer de connaissance dans le wiki : seulement enrichir, corriger, dater.
3. En cas de contradiction, créer une **note de conflit** et demander validation humaine.

## Règles de linting
Le linter vérifie :
- liens cassés (backlinks vers des articles inexistants),
- articles orphelins (aucun lien entrant),
- articles sans source (`source:` vide),
- frontmatter incomplet,
- affirmations juridiques sans citation,
- incohérences factuelles,
- suggestions de connexions manquées.

## Types d'articles
### Concept
- Définition
- Base légale
- Application pratique en copropriété
- Pièges courants
- Voir aussi

### Procédure
- Contexte / quand appliquer
- Étapes numérotées
- Documents nécessaires
- Délais légaux
- Points de vigilance
- Voir aussi

### Erreur
- Date
- Contexte
- Erreur commise
- Pourquoi c'est une erreur
- Ce que j'aurais dû faire
- Leçon retenue
- Voir aussi

### Template
- Usage
- Quand l'utiliser
- Template (placeholders `{{...}}`)
- Notes d'utilisation
- Base légale si applicable
- Voir aussi

### Décision
**Décision** : Arbitrage documenté. Structure :
- Date
- Contexte (quel problème, quelles contraintes)
- Options envisagées (2-3 minimum)
- Option choisie et pourquoi
- Résultat (à remplir plus tard si possible)
- Ce que je referais différemment (à remplir rétrospectivement)
- Voir aussi

Dossier : `wiki/decisions/`

## TON ET PHILOSOPHIE
- Rigueur absolue : chaque affirmation juridique doit citer un article précis, pas juste "la loi de 1965".
- Humilité : si la réponse n'est pas certaine → "Je ne suis pas certain, voici les textes à vérifier : [références]".
- Concret et actionnable : pas de théorie abstraite, toujours ramener au terrain.
- Progression documentée : chaque erreur est une opportunité d'apprentissage, pas un échec.

## AGENTS SPÉCIALISÉS (dans prompts/agents/)

Chaque fichier dans `prompts/agents/` définit un prompt dédié pour un rôle
spécifique. Le prompt précise le rôle, le ton, les sources de référence, et
donne 2-3 exemples concrets d'utilisation. L'utilisateur copie le prompt dans
Claude Code selon le besoin.

| Agent | Fichier | Rôle |
|-------|---------|------|
| Juriste copro | `prompts/agents/juriste-copro.md` | Expert juridique copropriété |
| Comptable copro | `prompts/agents/comptable-copro.md` | Comptabilité de copropriété |
| Rédacteur mail | `prompts/agents/redacteur-mail.md` | Courriers et mails professionnels syndic |
| Rédacteur PV | `prompts/agents/redacteur-pv.md` | Procès-verbaux d'assemblée générale |
| Diagnostiqueur technique | `prompts/agents/diagnostiqueur-technique.md` | Assistant technique bâtiment |
| Formateur quiz | `prompts/agents/formateur-quiz.md` | Entraînement par cas pratiques |

## PROMPTS OPÉRATIONNELS (dans prompts/)

| Prompt | Fichier | Usage |
|--------|---------|-------|
| Compiler raw → wiki | `prompts/compile-to-wiki.md` | Transformer une source brute en articles wiki |
| Q&A Agent | `prompts/qa-agent.md` | Interroger le wiki entier + file-back automatique |
| File back | `prompts/file-back.md` | Verser une réponse/session dans le wiki (boucle de capitalisation) |
| Lint + Heal | `prompts/lint-wiki.md` | Audit structurel + suggestions d'articles + pistes de correction |
| Quiz | `prompts/quiz-me.md` | Entraînement adaptatif par cas pratiques |
| Revue hebdo | `prompts/weekly-review.md` | Synthèse + flashback (répétition espacée) |
| Extraire erreurs | `prompts/extract-errors.md` | Identifier et archiver les erreurs de la session |

## BOUCLE DE CAPITALISATION (core insight)

```
Question → Q&A Agent → Réponse → File Back → Wiki enrichi → meilleure prochaine réponse
```

**Règle d'or** : toute réponse produite par un agent doit être versée dans le wiki.
Workflow :
1. Poser une question avec `prompts/qa-agent.md` (ou un agent spécialisé)
2. Obtenir la réponse
3. Appliquer `prompts/file-back.md` sur cette réponse
4. Le wiki s'enrichit : chaque échange compound

## DONNÉES DE CONTEXTE ORGANISATIONNEL (wiki/meta/)

- Le dossier `wiki/meta/` contient les notes de contexte organisationnel :
  culture du cabinet, préférences du superviseur, carte des interlocuteurs,
  prestataires de confiance avec retours d'expérience.
- Ces fichiers doivent porter `sensitivity: internal` dans le frontmatter.
- **Ce dossier ne doit JAMAIS être partagé publiquement.**

## ROADMAP — ORDRE D'EXÉCUTION

Ne fais PAS tout d'un coup. Suis cet ordre, attends la validation
entre chaque phase.

### PHASE 1 — Fondations ✅
- [x] Créer l'arborescence complète du repo (dossiers vides avec .gitkeep)
- [x] Écrire AGENTS.md complet
- [x] Écrire README.md complet

### PHASE 2 — Scripts ✅
- [x] Écrire ingest.sh
- [x] Écrire lint.sh
- [x] Écrire search.sh
- [x] Écrire quiz.sh
- [x] Écrire weekly-review.sh
- [x] Tester que chaque script est exécutable et affiche un usage correct sans arguments

### PHASE 3 — Prompts agents ✅
- [x] Écrire les 6 prompts agents (juriste, comptable, rédacteur mail, rédacteur PV, diagnostiqueur technique, formateur quiz)
- [x] Écrire les 7 prompts opérationnels (compile-to-wiki, lint-wiki, quiz-me, weekly-review, extract-errors, qa-agent, file-back)

### PHASE 4 — Wiki de démarrage ✅
- [x] 116 articles wiki compilés (concepts, procédures, financement, technique, contexte-local, jurisprudence)
- [x] 0 backlink cassé (vérifié par lint.sh)
- [x] Frontmatters complets (vérifié par CI/CD)
- [x] Lint automatique à chaque push (GitHub Actions)

### PHASE 5 — Peaufinage ✅
- [x] .gitignore propre
- [x] Licence open-source (MIT)
- [x] wiki/ compatible Obsidian (index.md, [[wikilinks]], backlinks)
- [x] QUICKSTART.md écrit

### PHASES FUTURES — État d'avancement
- [x] GitHub Action pour linting automatique sur push (.github/workflows/lint.yml)
- [x] Script d'import Granola → raw/notes-terrain/ (scripts/granola-import.sh)
- [ ] Intégration MCP Obsidian pour requêtes directes depuis Claude
- [x] Dashboard de progression (scripts/metrics.sh + outputs/snapshots/ avec tendances)
- [x] Export portfolio (scripts/export-portfolio.sh)
- [x] Manifest de compilation incrémentale (scripts/compile-manifest.sh)
- [x] Script de capitalisation file-back (scripts/file-back.sh)
