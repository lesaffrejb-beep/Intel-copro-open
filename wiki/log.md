# Journal d'activité — wiki-copro

> Fichier append-only. Chaque opération (ingest, compile, lint, Q&A, feature) ajoute une entrée.
> Format : `## [JJ/MM/AAAA] type | description`
>
> Types : `ingest`, `compile`, `lint`, `qa`, `feature`, `fix`, `review`
>
> **Pour les agents LLM** : ajouter une entrée ici après chaque opération significative.
> Utiliser `./scripts/log-entry.sh <type> "<description>"` ou ajouter manuellement.
>
> Commande utile : `grep "^## \[" wiki/log.md | tail -10`

---

## [04/04/2026] feature | Hardening dashboard — slug validation, lockfile, CI, cleanup deps
Commit `adac98d`. Validation regex slug contacts, ajout package-lock.json, suppression react-markdown/rehype-highlight/remark-gfm (non utilisées), job CI dashboard typecheck+build.

## [04/04/2026] feature | Recherche full-text wiki dans le dashboard
Commit `44be5c6`. API `GET /api/wiki/search?q=`, composant SearchBar avec debounce 250ms, recherche par titre/tags/contenu, résultats triés par pertinence. Page /wiki remplace le placeholder "Phase 3".

## [04/04/2026] feature | ROADMAP.md — 11 features priorisées
Création du fichier ROADMAP.md avec IDs (F-001 à F-011), efforts estimés, critères de done, fichiers concernés. Section "Prochaine action" pour guider les agents LLM.

## [04/04/2026] feature | Journal d'activité wiki/log.md + script log-entry.sh
Inspiré du pattern Karpathy (gist llm-wiki.md). Fichier append-only pour tracer chronologiquement les opérations sur le wiki. Script bash pour automatiser l'ajout d'entrées.

## [04/04/2026] feature | F-003 Mode terrain — API POST /api/note
Ajout de `POST /api/note` pour capturer une note brute (texte libre) et générer automatiquement un fichier `raw/notes-terrain/YYYY-MM-DD-titre.md` avec frontmatter. Déduplication de nom de fichier (`-2`, `-3`, etc.) et normalisation des tags.

## [04/04/2026] feature | F-004 Fiche contact enrichie — interactions frontmatter, timeline et ajout via PATCH
