# CLAUDE.md — Instructions pour tous les agents LLM

> Ce fichier est lu automatiquement par Claude Code, Codex et tout agent IA
> qui travaille sur ce repo. **Respecter ces règles est obligatoire.**

## Règles Git — ZERO TOLÉRANCE

### Avant de créer une branche ou PR

1. **Toujours `git fetch origin main && git log --oneline origin/main -10`** avant de commencer.
2. **Toujours baser ta branche sur le dernier `origin/main`** : `git checkout -b ma-branche origin/main`.
3. **Ne JAMAIS créer une branche à partir d'un vieux commit** — c'est la cause #1 de conflits.

### Avant de push / créer une PR

1. **Vérifier les conflits AVANT** : `git merge --no-commit --no-ff origin/main` puis `git merge --abort`.
2. Si conflit détecté → **résoudre localement** avant de push. Ne jamais push une branche en conflit.
3. **Ne JAMAIS créer une PR qui a des conflits avec main.** Si tu ne peux pas résoudre, ne push pas.

### Doublons de PR

1. **Avant de créer une PR** : vérifier s'il existe déjà une PR ouverte sur le même sujet.
2. **Ne JAMAIS créer plusieurs PRs pour le même travail.** Si ta première PR a échoué, la mettre à jour ou la fermer d'abord.
3. **Une tâche = une branche = une PR.** Pas de tentatives multiples en parallèle.

### Renommage du repo / projet

1. **Ne JAMAIS renommer le projet** (wiki-copro, copro-wiki → autre chose) sauf demande explicite de l'utilisateur.
2. Les noms dans README.md, ARCHITECTURE.md, INDEX.md sont intentionnels. Ne pas y toucher.

## Règles de compilation wiki

### Fichiers déjà existants

1. **Avant de créer un fichier wiki** : vérifier s'il existe déjà (`ls wiki/concepts/`, `ls wiki/procedures/`, etc.).
2. Si le fichier existe → **mettre à jour** (enrichir), ne pas recréer.
3. Si le contenu est déjà dans main → ne pas le réintroduire dans une nouvelle PR.

### Index et liens

1. **Liens internes** : utiliser `[[nom-fichier]]` (sans préfixe de chemin). Pas `[[wiki/index]]`, juste `[[index]]`.
2. Après ajout d'un article wiki → **toujours mettre à jour `wiki/index.md`**.
3. Après modification d'un article → vérifier les backlinks (`## Voir aussi`).

## Convention de commit

- Format : `type: description courte en français`
- Types : `feat`, `fix`, `compile`, `chore`, `docs`
- Exemple : `compile: guide notaires → wiki/concepts/guide-notaires.md`

## Fichiers protégés (ne pas modifier sans demande explicite)

- `CLAUDE.md` (ce fichier)
- `AGENTS.md`
- `.claude/settings.json`
- `.claude/hooks/*`
- `.gitignore`

## Checklist pré-push obligatoire

Avant chaque push, l'agent doit vérifier :

- [ ] Branche basée sur le dernier `origin/main`
- [ ] Aucun conflit avec main
- [ ] Pas de PR ouverte en doublon
- [ ] Pas de fichier recréé qui existe déjà
- [ ] `wiki/index.md` à jour si nouveau fichier wiki
- [ ] Liens internes au format `[[nom]]` (pas `[[chemin/nom]]`)
- [ ] Commit message en français, format conventionnel
