# QUICKSTART — Jour 1 du stage

> Version ultra-courte. Pour le détail complet : `README.md`, `AGENTS.md`, `ARCHITECTURE.md`.

## 1. Setup (1 fois)

```bash
chmod +x scripts/*.sh
```

Ouvrir `wiki/` comme vault dans Obsidian.

## 2. Workflow quotidien

### Matin (5 min)
```bash
./scripts/weekly-review.sh   # relire le résumé de la semaine
```
Ou ouvrir 2-3 articles wiki sur les sujets du jour.

### Soir — après une journée terrain (15 min)

**Étape 1 — Importer les notes Granola**
```bash
./scripts/granola-import.sh ~/Downloads/ma-note-granola.md
```
→ Copie dans `raw/notes-terrain/` avec frontmatter YAML.

**Étape 2 — Compiler vers le wiki**
Copier le prompt affiché par le script dans Claude Code et l'exécuter.

**Étape 3 — File-back**
```bash
cat prompts/file-back.md
```
Appliquer sur chaque réponse obtenue pour verser les connaissances dans le wiki.

**Étape 4 — Commit**
```bash
git add -A && git commit -m "feat: notes terrain YYYY-MM-DD" && git push
```

## 3. Question juridique rapide

```bash
cat prompts/qa-agent.md
```
Coller dans Claude Code + poser la question. Puis appliquer `file-back.md`.

## 4. Fin de semaine (vendredi, 20 min)

```bash
./scripts/lint.sh            # vérifier la santé du wiki
./scripts/metrics.sh         # dashboard de progression
./scripts/quiz.sh --week     # s'entraîner sur les sujets de la semaine
./scripts/weekly-review.sh   # synthèse + flashback
```

## 5. Règles d'or

| Ne jamais faire | Toujours faire |
|-----------------|----------------|
| Éditer `wiki/` à la main sans passer par le pipeline | Citer l'article exact (Loi 65-557 art. X) |
| Résumer dans `raw/` | Verser chaque réponse agent via `file-back.md` |
| Partager `wiki/meta/` | Committer quotidiennement |
| Accepter une citation juridique sans Légifrance | Marquer [À VÉRIFIER] si doute |

## 6. Scripts de référence

| Script | Usage |
|--------|-------|
| `scripts/granola-import.sh <fichier>` | Importer export Granola → `raw/notes-terrain/` |
| `scripts/ingest.sh <fichier>` | Classifier un fichier brut → `raw/` + prompt |
| `scripts/lint.sh` | Audit qualité du wiki |
| `scripts/metrics.sh` | Dashboard articles / mots / couverture |
| `scripts/sources-catalog.sh` | Suivi ingestion des PDFs sources |
| `scripts/weekly-review.sh` | Rapport hebdo + répétition espacée |
| `scripts/quiz.sh` | Entraînement par cas pratiques |
| `scripts/render.sh <article>` | Générer slides Marp depuis un article wiki |
