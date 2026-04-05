#!/bin/bash
set -euo pipefail

TOPIC=""
ERRORS_ONLY=0
WEEK=0

while [ $# -gt 0 ]; do
  case "$1" in
    --topic)
      TOPIC="${2:-}"
      shift 2
      ;;
    --errors-only)
      ERRORS_ONLY=1
      shift
      ;;
    --week)
      WEEK=1
      shift
      ;;
    *)
      echo "Option inconnue: $1"
      echo "Usage: ./scripts/quiz.sh [--topic <sujet>] [--errors-only] [--week]"
      exit 1
      ;;
  esac
done

echo "========== PROMPT QUIZ =========="
echo "Tu es un expert en gestion de copropriété en droit français."
echo "Réfère-toi à AGENTS.md et au prompt prompts/quiz-me.md."
[ -n "$TOPIC" ] && echo "Sujet ciblé: $TOPIC"
[ "$ERRORS_ONLY" -eq 1 ] && echo "Mode: erreurs uniquement (wiki/errors-log/)"
[ "$WEEK" -eq 1 ] && echo "Périmètre: contenu ajouté cette semaine"
cat <<'PROMPT'
Tâche:
1) Lis wiki/index.md et wiki/glossary.md puis les articles pertinents.
2) Génère 10 questions: 5 QCM, 3 cas pratiques, 2 ouvertes.
3) Attends mes réponses.
4) Corrige en citant l'article wiki ET la base légale source.
PROMPT
