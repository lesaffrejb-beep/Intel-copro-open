# ROADMAP — wiki-copro

> Ce fichier est la source de vérité pour le développement du projet.
> Priorisé par impact sur le quotidien de stage.
>
> **Pour les agents LLM** : quand l'utilisateur dit "avance sur le projet",
> lire ce fichier, identifier la prochaine feature `⬜ TODO`, et l'implémenter.
> Après chaque livraison, mettre à jour le statut ici + ajouter une entrée dans `wiki/log.md`.

---

## Prochaine action

> **Prochaine feature à implémenter : F-005 — Linter juridique** (passage draft → validated).
> F-004 est désormais livrée (historique interactions + ajout PATCH).
> Ensuite : **F-006 — Alertes délais légaux** (calendrier procédural).
>
> L'ordre de priorité suit le tableau ci-dessous.
> En cas de doute, prioriser ce qui réduit la friction quotidienne du stage.

---

## Légende

| Statut | Signification |
|--------|---------------|
| `✅ DONE` | Livré, en production |
| `🔧 WIP` | En cours de développement |
| `⬜ TODO` | Planifié, pas encore commencé |

---

## Semaine 1–2 de stage (priorité immédiate)

### F-001. Compile auto sur push — SessionStart hook
<!-- effort: 2h | statut: ⬜ TODO -->

**Problème** : 15-20 min/soir perdues à copier-coller le prompt de compilation manuellement.

**Solution** : Quand un fichier arrive dans `raw/`, le hook SessionStart déclenche automatiquement le skill `/compile` sans intervention humaine.

**Fichiers concernés** : `.claude/hooks/`, `AGENTS.md` (section auto-pilot)

**Critère de done** : Un `git add raw/notes-terrain/fichier.md && git commit` déclenche la compilation wiki sans copier-coller de prompt.

---

### F-002. Recherche plein texte dans le dashboard ✅
<!-- effort: 3h | statut: ✅ DONE | livré: 04/04/2026 | commit: 44be5c6 -->

**Livré** : `GET /api/wiki/search?q=` + composant `SearchBar` avec debounce 250ms sur `/wiki`.
Recherche par titre, tags, contenu. Résultats triés par pertinence, max 30.

---

### F-011. Journal d'activité — wiki/log.md ✅
<!-- effort: 30min | statut: ✅ DONE | livré: 04/04/2026 -->

**Problème** : Aucune trace chronologique de quand les compilations, Q&A et lints ont eu lieu. Le git log donne les commits mais pas le contexte des sessions.

**Solution** : Fichier `wiki/log.md` append-only. Format parseable : `## [04/04/2026] type | description`. Script `scripts/log-entry.sh` pour ajouter des entrées depuis n'importe quel script ou hook.

**Inspiré de** : Pattern Karpathy (gist `llm-wiki.md`) — "log.md is chronological, an append-only record of what happened and when."

**Fichiers concernés** : `wiki/log.md`, `scripts/log-entry.sh`

**Critère de done** : Chaque ingest, compile, lint, Q&A ajoute une ligne au log. `grep "^## \[" wiki/log.md | tail -5` donne les 5 dernières opérations.

---

## Mois 1 (capture terrain)

### F-003. Mode terrain — fiche rapide depuis le téléphone ✅
<!-- effort: 2.5h | statut: ✅ DONE | livré: 04/04/2026 -->

**Problème** : Sur le terrain, pas de laptop. Granola capture l'audio mais pas les notes rapides textuelles.

**Solution** : Route `POST /api/note` qui accepte un texte brut (via raccourci iOS/Shortcuts) et le dépose dans `raw/notes-terrain/YYYY-MM-DD-titre.md` avec frontmatter auto-généré.

**Livré** : route `POST /api/note` (création automatique de notes brutes dans `raw/notes-terrain/` avec frontmatter).

**Fichiers créés** : `dashboard/src/app/api/note/route.ts`, `dashboard/src/lib/notes.ts`

**Critère de done** : Dictée Siri → raccourci iOS → fichier dans `raw/` → visible dans le hook SessionStart.

---

### F-004. Fiche contact enrichie — historique des interactions ✅
<!-- effort: 3h | statut: ✅ DONE | livré: 04/04/2026 -->

**Problème** : Le DISC c'est bien pour comprendre les gens, mais au quotidien ce qui manque c'est "qu'est-ce qui s'est passé avec ce copropriétaire la dernière fois ?".

**Solution** : Champ `interactions: []` dans le frontmatter contacts. Timeline chronologique dans `/contacts/[slug]`. Ajout via PATCH.

**Livré** : normalisation backend des interactions dans `contacts.ts`, `PATCH /api/contacts/[slug]` qui append une interaction, formulaire d'ajout + timeline chronologique sur la fiche contact.

**Fichiers concernés** : `dashboard/src/lib/contacts.ts`, `dashboard/src/app/contacts/[slug]/page.tsx`

**Critère de done** : Ouvrir une fiche contact → voir le fil des interactions (date, sujet, résultat).

---

## Mois 2 (fiabilité professionnelle)

### F-005. Linter juridique — détection des assertions sans source
<!-- effort: 4h | statut: ⬜ TODO -->

**Problème** : 84 articles en draft. Le goulot pour passer en "validated" = vérifier les citations juridiques. Impossible de tout relire manuellement.

**Solution** : Script ou prompt LLM qui scanne les articles, détecte les phrases affirmatives juridiques sans citation d'article de loi, et ajoute `[À VÉRIFIER]` automatiquement.

**Fichiers à créer** : `scripts/lint-juridique.sh`

**Critère de done** : `./scripts/lint-juridique.sh` produit une liste de phrases suspectes par article.

---

### F-006. Alertes délais légaux — calendrier procédural
<!-- effort: 3h | statut: ⬜ TODO -->

**Problème** : La déchéance (perte de droit par dépassement de délai) est le risque #1 en syndic. "On avait combien de temps pour déclarer ?" → aucun outil rapide.

**Solution** : Extraction des patterns "X jours" / "X mois" depuis les articles wiki. Page dashboard ou fichier de référence rapide avec tous les délais légaux.

**Fichiers à créer** : `scripts/extract-delais.sh` ou `dashboard/src/app/delais/page.tsx`

**Critère de done** : Une page ou un fichier liste tous les délais extraits du wiki, triés par urgence.

---

## Mois 3 (progression + certification)

### F-007. Dashboard "Ma semaine" — weekly review visuelle
<!-- effort: 4h | statut: ⬜ TODO -->

**Problème** : `weekly-review.sh` génère du texte brut. Pas de visualisation de la progression, pas de courbe motivante.

**Solution** : Page `/review` avec : articles ajoutés cette semaine, mots, broken links corrigés, notes terrain en attente, graphique semaine N vs N-1.

**Fichiers à créer** : `dashboard/src/app/review/page.tsx`, `dashboard/src/app/api/review/route.ts`

**Critère de done** : Ouvrir `/review` → voir un dashboard de progression hebdomadaire.

---

### F-008. Quiz amélioré — spaced repetition sur les erreurs
<!-- effort: 4h | statut: ⬜ TODO -->

**Problème** : `quiz.sh` pose des questions aléatoires. Pas de tracking des points faibles, pas de répétition espacée.

**Solution** : Fichier `outputs/quiz-history.json` qui track les réponses. Logique de sélection pondérée : re-poser plus souvent les questions ratées.

**Fichiers concernés** : `scripts/quiz.sh`, `outputs/quiz-history.json`

**Critère de done** : Après 10 sessions de quiz, les questions portent majoritairement sur les thèmes faibles.

---

## Mois 4–5 (automatisation avancée)

### F-009. Agent veille passive — alertes Légifrance + jurisprudence
<!-- effort: 8h | statut: ⬜ TODO -->

**Problème** : La loi change. Si le wiki cite un article abrogé, c'est une erreur professionnelle.

**Solution** : Job hebdomadaire (cron ou n8n) qui vérifie sur Légifrance les articles cités dans le wiki. Notification si modification détectée. Correspond à l'Agent 5 de ARCHITECTURE.md.

**Critère de done** : Recevoir une alerte quand un article de loi cité dans le wiki a été modifié.

---

## Fin de stage (livrable carrière)

### F-010. Export portfolio PDF — "Mes compétences prouvées"
<!-- effort: 5h | statut: ⬜ TODO -->

**Problème** : Fin de stage = rapport + entretiens. Besoin de transformer 6 mois de wiki en un livrable tangible.

**Solution** : Script `export-portfolio.sh` qui génère un PDF : articles par domaine, exemples de fiches, courbe de progression, cas terrain documentés, citations vérifiées.

**Fichiers à créer** : `scripts/export-portfolio.sh`

**Critère de done** : `./scripts/export-portfolio.sh` produit un PDF de 15 pages présentable en entretien.

---

## Historique des livraisons

| Date | Feature | Commit | Détail |
|------|---------|--------|--------|
| 04/04/2026 | F-002 Recherche wiki | `44be5c6` | API search + SearchBar + page /wiki |
| 04/04/2026 | Slug validation | `adac98d` | Regex anti path-traversal sur /api/contacts |
| 04/04/2026 | Lockfile + deps | `adac98d` | package-lock.json, suppression deps inutilisées |
| 04/04/2026 | CI dashboard | `adac98d` | Job typecheck + build dans GitHub Actions |
| 04/04/2026 | F-003 Mode terrain | `HEAD` | API `POST /api/note` + écriture dans `raw/notes-terrain/` |
| 04/04/2026 | F-004 Fiche contact enrichie | `HEAD` | Interactions frontmatter + timeline + ajout via PATCH |
