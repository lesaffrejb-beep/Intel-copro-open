#!/bin/bash
# File-back automatique — Vérifie que les Q&A récents ont été capitalisés dans le wiki.
# Usage : ./scripts/file-back.sh
#
# Principe (inspiré Karpathy/Farza) :
#   Question → Réponse → File Back → Wiki enrichi → meilleure prochaine réponse
#
# Ce script détecte les outputs/ récents non encore reflétés dans le wiki
# et liste les sessions à capitaliser.

set -euo pipefail
cd "$(dirname "$0")/.."

echo "## File-back — Capitalisation des connaissances"
echo ""

# Vérifier les outputs récents (7 derniers jours)
RECENT_OUTPUTS=()
while IFS= read -r -d '' f; do
  RECENT_OUTPUTS+=("$f")
done < <(find outputs -type f -name '*.md' -newer <(date -d '7 days ago' +%F 2>/dev/null || echo "2000-01-01") -not -name 'lint-report.md' -not -name 'metrics.md' -not -name 'compile-manifest.tsv' -print0 2>/dev/null | sort -z || true)

if [ ${#RECENT_OUTPUTS[@]} -eq 0 ]; then
  echo "✅ Pas d'outputs récents à capitaliser."
else
  echo "### Outputs récents à vérifier pour file-back :"
  echo ""
  for f in "${RECENT_OUTPUTS[@]}"; do
    mod_date=$(stat -c %y "$f" 2>/dev/null | cut -d' ' -f1 || echo "?")
    echo "- 📋 $f ($mod_date)"
  done
  echo ""
  echo "→ Utiliser \`prompts/file-back.md\` pour capitaliser ces connaissances dans le wiki."
fi

# Vérifier les articles wiki récemment créés sans backlinks entrants
echo ""
echo "### Articles wiki récents sans backlinks entrants (orphelins potentiels) :"
orphans=0
while IFS= read -r -d '' f; do
  basename_f=$(basename "$f" .md)
  # Chercher des références vers cet article dans le reste du wiki
  refs=$(grep -rl "\[\[${basename_f}\]\]" wiki 2>/dev/null | grep -v "$f" | wc -l || echo 0)
  if [ "$refs" -eq 0 ]; then
    echo "- ⚠️  $f (0 backlinks)"
    orphans=$((orphans+1))
  fi
done < <(find wiki -type f -name '*.md' -newer <(date -d '7 days ago' +%F 2>/dev/null || echo "2000-01-01") -not -name 'index.md' -not -name 'glossary.md' -not -name 'log.md' -print0 2>/dev/null | sort -z || true)
[ "$orphans" -eq 0 ] && echo "✅ Tous les articles récents ont des backlinks."

echo ""
echo "---"
echo "_File-back check — $(date +%F)_"
