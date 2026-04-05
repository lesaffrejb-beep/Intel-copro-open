---
title: "Le Présent — Hooks Claude Code"
category: concept
tags: [claude-code, hooks, automatisation, workflow, outils]
created: 2026-04-03
updated: 2026-04-03
source: "externe"
status: validated
---

# Le Présent — Hooks Claude Code

> Ce qui ne subit pas le temps qui passe, c'est ce qui bouge. Ce qui bouge le plus, c'est le présent. Les hooks, c'est ça : des actions qui bougent à ta place, en continu, sans que tu y penses.  
> Et un hook bien configuré, c'est aussi un cadeau — tu l'offres une fois, il tourne pour toujours.

---

## Pourquoi les hooks et pas CLAUDE.md

Tu as dit à Claude Code de faire quelque chose — il ne l'a pas fait.  
Tu as dit « ne touche pas ce fichier » — il l'a touché.  
Tu as dit « lance le lint avant de finir » — il a oublié.

`CLAUDE.md` est une suggestion. Claude le lit et le suit à peu près 80 % du temps.

Les hooks, c'est différent. **Ce sont des actions automatiques qui se déclenchent systématiquement** — quand Claude édite un fichier, lance une commande, ou termine une tâche. Tu les configures une fois, ils tournent sans intervention.

---

## Comment fonctionnent les hooks

Trois moments d'intervention :

| Type | Moment | Usage typique |
|------|--------|---------------|
| `PreToolUse` | Avant que Claude agisse | Bloquer une action dangereuse |
| `PostToolUse` | Après que Claude agit | Lancer un contrôle, logger |
| `Stop` | Quand Claude finit une réponse | Commiter automatiquement |

**Code de sortie** :
- `exit 0` → action autorisée, on continue
- `exit 2` → action bloquée ; ton message `stderr` remonte à Claude pour qu'il corrige
- autre code → warning logué, mais pas de blocage

---

## Où vivent les hooks

```
.claude/settings.json         # niveau projet — commité dans git, partagé
~/.claude/settings.json       # niveau utilisateur — tous tes projets
.claude/settings.local.json   # local uniquement — non commité
```

Pour ce repo, `.claude/settings.json` est commité. Les hooks voyagent avec le projet.

---

## Les hooks installés dans ce repo

### 1. Bloquer les commandes dangereuses

Claude peut lancer `rm -rf`, `git reset --hard`, ou pire. Ce hook bloque avant exécution et retourne un message d'erreur à Claude pour qu'il propose une alternative.

`.claude/hooks/block-dangerous.sh` — patterns surveillés :

```
rm -rf
git reset --hard
git push.*--force
DROP TABLE / DROP DATABASE
curl ... | sh  (pipe vers shell)
wget ... | bash
```

**Code de sortie 2 = bloqué.** Claude reçoit le message et cherche une approche plus sûre.

---

### 2. Protéger les fichiers sensibles

Certains fichiers ne doivent pas être modifiés par Claude : clés, certificats, données internes.

`.claude/hooks/protect-files.sh` — fichiers protégés actuels :

```
.env*
.git/*
*.pem  /  *.key
secrets/*
```

À ajouter pour ce projet : `wiki/meta/*` (données internes du cabinet).

---

### 3. Logger toutes les commandes lancées

Un journal horodaté de tout ce que Claude exécute. Indispensable pour l'audit et le débogage rétrospectif.

`.claude/hooks/log-commands.sh` → écrit dans `.claude/command-log.txt` (hors git via `.gitignore`).

Format : `2026-04-03T14:32:01+02:00 git add wiki/concepts/charges.md`

---

### 4. Lancer le lint après chaque modification markdown

Ajouter dans `PostToolUse` pour que `./scripts/lint.sh` s'exécute automatiquement après chaque édition d'un fichier `.md`. Si le frontmatter est cassé ou un lien rompu, Claude voit l'erreur et corrige avant que tu regardes.

```json
{
  "PostToolUse": [
    {
      "matcher": "Write|Edit",
      "hooks": [
        {
          "type": "command",
          "command": "file=$(jq -r '.tool_input.file_path'); if echo \"$file\" | grep -q '\\.md$'; then ./scripts/lint.sh 2>&1 | tail -10; fi; exit 0"
        }
      ]
    }
  ]
}
```

---

### 5. Commiter automatiquement à chaque fin de tâche

Claude finit une réponse → `git add -A && git commit` automatique. L'historique git reste propre : un commit atomique par tâche, pas un blob « changes » à la fin de la journée.

`.claude/hooks/auto-commit.sh` à créer :

```bash
#!/usr/bin/env bash
set -euo pipefail
git add -A
if ! git diff --cached --quiet; then
  git commit -m "chore(ai): apply Claude edit"
fi
exit 0
```

Dans `settings.json` :

```json
{
  "Stop": [
    {
      "matcher": "",
      "hooks": [
        { "type": "command", "command": ".claude/hooks/auto-commit.sh" }
      ]
    }
  ]
}
```

---

## settings.json complet (cible pour ce repo)

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          { "type": "command", "command": ".claude/hooks/block-dangerous.sh" },
          { "type": "command", "command": ".claude/hooks/log-commands.sh" }
        ]
      },
      {
        "matcher": "Edit|Write",
        "hooks": [
          { "type": "command", "command": ".claude/hooks/protect-files.sh" }
        ]
      }
    ],
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "file=$(jq -r '.tool_input.file_path'); if echo \"$file\" | grep -q '\\.md$'; then ./scripts/lint.sh 2>&1 | tail -10; fi; exit 0"
          }
        ]
      }
    ],
    "Stop": [
      {
        "matcher": "",
        "hooks": [
          { "type": "command", "command": ".claude/hooks/auto-commit.sh" }
        ]
      }
    ]
  }
}
```

**Activer les scripts** :

```bash
chmod +x .claude/hooks/*.sh
git add .claude/settings.json .claude/hooks/
git commit -m "feat: hooks claude code opérationnels"
```

---

## Ce que ça change concrètement

La différence entre un setup Claude Code correct et un excellent, ce ne sont pas les prompts. Ce sont les hooks. Ils tournent quand tu ne regardes pas, attrapent les erreurs avant qu'elles atteignent le repo partagé, et gardent l'historique propre.

**Par où commencer** : hook #1 (commandes dangereuses) + hook #2 (fichiers protégés). Ça suffit pour éviter les erreurs les plus fréquentes.

---

*Voir aussi* : [[index]], [[productivity-assistant-design]], [[design-system-dashboard]]
