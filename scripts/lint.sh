#!/bin/bash
set -euo pipefail

mkdir -p outputs
REPORT="outputs/lint-report.md"
DATE_NOW="$(date +%F)"
ERRORS=0
WARNINGS=0

mapfile -t FILES < <(find wiki -type f -name '*.md' | sort)

{
  echo "# Rapport de lint wiki"
  echo ""
  echo "Date: $DATE_NOW"
  echo ""
  echo "## Vérifications automatiques"

  echo ""
  echo "### Frontmatter incomplet"
  missing=0
  for f in "${FILES[@]}"; do
    if ! awk 'NR<=20{print}' "$f" | grep -q '^---'; then
      echo "- $f (frontmatter absent)"
      missing=$((missing+1))
    fi
  done
  ERRORS=$((ERRORS+missing))
  [ "$missing" -eq 0 ] && echo "- Aucun ✅"

  echo ""
  echo "### Articles sans source"
  nosource=0
  for f in "${FILES[@]}"; do
    if awk 'NR<=30{print}' "$f" | grep -qE '^source:[[:space:]]*"?[[:space:]]*"?$'; then
      echo "- $f ⚠️"
      nosource=$((nosource+1))
    fi
  done
  WARNINGS=$((WARNINGS+nosource))
  [ "$nosource" -eq 0 ] && echo "- Aucun détecté automatiquement ✅"

  echo ""
  echo "### Liens internes potentiellement cassés"
  broken=0
  while IFS= read -r match; do
    file="${match%%:*}"
    rest="${match#*:}"
    link="$(printf '%s' "$rest" | sed -E 's/.*\[\[([^]]+)\]\].*/\1/')"
    if ! find wiki -type f -name "$link.md" | grep -q .; then
      echo "- $file -> [[${link}]] ❌"
      broken=$((broken+1))
    fi
  done < <(grep -rn '\[\[[^]]*\]\]' wiki 2>/dev/null || true)
  ERRORS=$((ERRORS+broken))
  [ "$broken" -eq 0 ] && echo "- Aucun ✅"

  echo ""
  echo "## Contrôles à valider par LLM"
  echo "- Assertions juridiques sans citation d'article"
  echo "- Incohérences factuelles entre articles"
  echo "- Articles orphelins"
  echo "- Suggestions de connexions manquées"
  echo ""
  echo "## Prompt de correction"
  echo 'Voir prompts/lint-wiki.md puis exécuter dans Claude Code avec ce rapport.'
  echo ""
  echo "---"
  echo ""
  echo "## Résumé"
  echo "| Niveau | Nombre |"
  echo "|--------|--------|"
  echo "| Erreurs critiques ❌ | $ERRORS |"
  echo "| Avertissements ⚠️ | $WARNINGS |"
  if [ "$ERRORS" -eq 0 ] && [ "$WARNINGS" -eq 0 ]; then
    echo ""
    echo "**✅ Wiki sain — aucun problème détecté.**"
  elif [ "$ERRORS" -eq 0 ]; then
    echo ""
    echo "**⚠️ Wiki OK avec avertissements ($WARNINGS). Aucune erreur critique.**"
  else
    echo ""
    echo "**❌ Wiki : $ERRORS erreur(s) critique(s) à corriger.**"
  fi
} > "$REPORT"

echo "✅ Rapport généré: $REPORT"
echo "Erreurs critiques: $ERRORS | Avertissements: $WARNINGS"
echo "Exécute ensuite: cat prompts/lint-wiki.md"

# Sortie non-zéro si erreurs critiques (liens cassés, frontmatter manquant)
if [ "$ERRORS" -gt 0 ]; then
  echo "" >&2
  echo "❌ $ERRORS erreur(s) critique(s) détectée(s). Voir $REPORT pour le détail." >&2
  exit 1
fi
