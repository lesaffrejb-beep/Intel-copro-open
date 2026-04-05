# Instructions pour Codex (OpenAI)

> Ce fichier est lu par Codex au démarrage de chaque tâche.
> Lire aussi CLAUDE.md à la racine pour les règles complètes.

## ERREURS PASSÉES À NE PAS RÉPÉTER

### 1. PRs en conflit (CRITIQUE)
Codex a créé 4 PRs (#8, #17, #18, #19) toutes en conflit avec main
car elles étaient basées sur un vieux commit. Résultat : aucune n'a pu
être mergée, perte de temps.

**Fix** : TOUJOURS faire `git fetch origin main` puis
`git checkout -b ta-branche origin/main` AVANT de commencer à coder.

### 2. PRs en doublon (CRITIQUE)
Codex a créé 3 PRs (#17, #18, #19) pour la MÊME tâche au lieu d'en
mettre une seule à jour. Résultat : confusion totale.

**Fix** : vérifier les PRs ouvertes avant d'en créer une nouvelle.
Si une PR existe pour le même sujet, la mettre à jour ou la fermer.

### 3. Renommage non demandé du projet
PR #8 a renommé wiki-copro → intel-copro partout alors que personne
ne l'a demandé. Le repo s'appelle wiki-copro.

**Fix** : ne JAMAIS renommer le projet sans instruction explicite.

### 4. Fichiers recréés qui existent déjà
Codex a recréé des fichiers wiki qui existaient déjà sur main
(avenir-metier-syndic.md, comptabilite-copropriete.md, etc.),
causant des conflits inutiles.

**Fix** : TOUJOURS vérifier `ls wiki/concepts/` et `ls wiki/procedures/`
avant de créer un nouveau fichier.

## Checklist obligatoire avant push

```bash
# 1. Synchro avec main
git fetch origin main

# 2. Vérifier qu'on est à jour
git log --oneline origin/main -5

# 3. Vérifier les conflits
git diff origin/main...HEAD --stat

# 4. Vérifier que les fichiers n'existent pas déjà
ls wiki/concepts/ wiki/procedures/ wiki/decisions/
```

## Conventions

- Langue : français
- Liens wiki : `[[nom-fichier]]` (PAS `[[wiki/nom-fichier]]`)
- Commit : `type: description` (feat, fix, compile, chore)
- Une tâche = une branche = une PR
