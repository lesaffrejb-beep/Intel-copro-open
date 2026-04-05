#!/bin/bash
set -euo pipefail

YEAR="$(date +%G)"
WEEK="$(date +%V)"
OUTDIR="outputs/weekly"
OUTFILE="$OUTDIR/${YEAR}-W${WEEK}.md"
mkdir -p "$OUTDIR"

{
  echo "# Revue hebdomadaire ${YEAR}-W${WEEK}"
  echo ""
  echo "## Fichiers modifiés cette semaine"
  git log --since='7 days ago' --name-only --pretty=format: | rg -v '^$' | sort -u | sed 's/^/- /'
  echo ""
  echo "## Prompt à exécuter dans Claude Code"
  echo "Voir prompts/weekly-review.md"
} > "$OUTFILE"

echo "✅ Rapport initial généré: $OUTFILE"
echo "========== PROMPT HEBDO =========="
cat <<PROMPT
Tu es un expert en gestion de copropriété en droit français.
Réfère-toi à AGENTS.md et à prompts/weekly-review.md.

Utilise le fichier $OUTFILE pour:
1) Résumer les apprentissages de la semaine.
2) Identifier les patterns d'erreurs récurrents.
3) Proposer les sujets à approfondir.
4) Compléter ce rapport avec sections: "Ce que je maîtrise maintenant", "Ce que je dois encore travailler", "Objectifs semaine suivante".
PROMPT
