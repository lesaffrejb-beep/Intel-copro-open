#!/bin/bash
set -euo pipefail

mkdir -p outputs
REPORT="outputs/metrics.md"
DATE_NOW="$(date +%F)"
WEEK_NOW="$(date +%G-W%V)"

count_files() { find "$1" -type f -name '*.md' 2>/dev/null | wc -l; }
count_status() { { grep -rl "^status: $1" wiki 2>/dev/null || true; } | wc -l; }
count_words() { find wiki -type f -name '*.md' -exec cat {} + 2>/dev/null | wc -w; }
count_lines() { find wiki -type f -name '*.md' -exec cat {} + 2>/dev/null | wc -l; }
count_links() { { grep -roh '\[\[[^]]*\]\]' wiki 2>/dev/null || true; } | wc -l; }

{
  echo "# Dashboard de progression — Wiki Copropriété"
  echo ""
  echo "Date: $DATE_NOW | Semaine: $WEEK_NOW"
  echo ""

  # --- Articles ---
  echo "## Articles"
  echo ""
  total_articles=$(find wiki -type f -name '*.md' 2>/dev/null | grep -v 'index\.md\|glossary\.md' | wc -l)
  validated=$(count_status validated)
  review=$(count_status review)
  draft=$(count_status draft)

  echo "| Métrique | Valeur |"
  echo "|----------|--------|"
  echo "| Total articles | $total_articles |"
  echo "| Validés ✅ | $validated |"
  echo "| En révision 🔄 | $review |"
  echo "| Brouillons ✏️ | $draft |"
  echo ""

  # --- Mots ---
  echo "## Volume de contenu"
  echo ""
  total_words=$(count_words)
  total_lines=$(count_lines)
  echo "| Métrique | Valeur |"
  echo "|----------|--------|"
  echo "| Mots total | $total_words |"
  echo "| Lignes total | $total_lines |"
  echo "| Objectif articles | 100 |"
  echo "| Objectif mots | 400 000 |"
  if [ "$total_articles" -gt 0 ]; then
    pct_art=$(( total_articles * 100 / 100 ))
    echo "| Progression articles | ${pct_art}% |"
  fi
  if [ "$total_words" -gt 0 ]; then
    pct_words=$(( total_words * 100 / 400000 ))
    echo "| Progression mots | ${pct_words}% |"
  fi
  echo ""

  # --- Couverture par catégorie ---
  echo "## Couverture par catégorie"
  echo ""
  echo "| Catégorie | Articles |"
  echo "|-----------|---------|"
  for cat in concepts procedures jurisprudence financement technique decisions errors-log meta; do
    dir="wiki/$cat"
    if [ -d "$dir" ]; then
      count=$(find "$dir" -type f -name '*.md' 2>/dev/null | wc -l)
    else
      count=0
    fi
    echo "| $cat | $count |"
  done
  echo ""

  # --- Backlinks ---
  echo "## Santé des liens"
  echo ""
  total_links=$(count_links)
  broken=0
  while IFS= read -r link; do
    if [ -n "$link" ]; then
      if ! find wiki -type f -name "${link}.md" 2>/dev/null | grep -q .; then
        broken=$((broken+1))
      fi
    fi
  done < <({ grep -roh '\[\[[^]]*\]\]' wiki 2>/dev/null || true; } | sed 's/\[\[//;s/\]\]//' | sort -u)

  echo "| Métrique | Valeur |"
  echo "|----------|--------|"
  echo "| Liens internes total | $total_links |"
  echo "| Liens cassés ⚠️ | $broken |"
  echo ""

  # --- Sources ---
  echo "## Sources"
  echo ""
  raw_files=$(find raw -type f -name '*.md' 2>/dev/null | wc -l)
  pdf_total=$(find Ressources -type f -name '*.pdf' 2>/dev/null | wc -l)
  ingestion_pct=0
  [ "$pdf_total" -gt 0 ] && ingestion_pct=$(( raw_files * 100 / pdf_total )) || true
  echo "| Métrique | Valeur |"
  echo "|----------|--------|"
  echo "| PDFs sources | $pdf_total |"
  echo "| Fichiers raw/ ingérés | $raw_files |"
  echo "| Taux d'ingestion | ${ingestion_pct}% |"
  echo ""

  # --- Erreurs ---
  echo "## Erreurs documentées"
  echo ""
  errors=0
  [ -d wiki/errors-log ] && errors=$(find wiki/errors-log -type f -name '*.md' 2>/dev/null | wc -l) || true
  echo "| Erreurs archivées | $errors |"
  echo ""

  # --- Activité récente ---
  echo "## Activité récente (7 derniers jours)"
  echo ""
  recent=$(git log --since="7 days ago" --name-only --pretty=format: -- wiki/ 2>/dev/null | grep '\.md$' | sort -u | wc -l || echo 0)
  commits=$(git log --since="7 days ago" --oneline 2>/dev/null | wc -l || echo 0)
  echo "| Métrique | Valeur |"
  echo "|----------|--------|"
  echo "| Articles modifiés (7j) | $recent |"
  echo "| Commits (7j) | $commits |"
  echo ""

  # --- Tendances (comparaison avec snapshot précédent) ---
  SNAPSHOT_DIR="outputs/snapshots"
  mkdir -p "$SNAPSHOT_DIR"
  SNAPSHOT_FILE="$SNAPSHOT_DIR/metrics-${DATE_NOW}.tsv"
  PREV_SNAPSHOT=$(ls -t "$SNAPSHOT_DIR"/metrics-*.tsv 2>/dev/null | head -1 || true)

  echo "## Tendances"
  echo ""
  # Sauvegarder le snapshot courant
  echo -e "date\tarticles\twords\tlinks\tbroken\tvalidated\tdraft" > "$SNAPSHOT_FILE"
  echo -e "${DATE_NOW}\t${total_articles}\t${total_words}\t${total_links}\t${broken}\t${validated}\t${draft}" >> "$SNAPSHOT_FILE"

  if [ -n "$PREV_SNAPSHOT" ] && [ "$PREV_SNAPSHOT" != "$SNAPSHOT_FILE" ]; then
    prev_date=$(tail -1 "$PREV_SNAPSHOT" | cut -f1)
    prev_articles=$(tail -1 "$PREV_SNAPSHOT" | cut -f2)
    prev_words=$(tail -1 "$PREV_SNAPSHOT" | cut -f3)
    prev_links=$(tail -1 "$PREV_SNAPSHOT" | cut -f4)
    prev_broken=$(tail -1 "$PREV_SNAPSHOT" | cut -f5)

    delta_art=$((total_articles - prev_articles))
    delta_words=$((total_words - prev_words))
    delta_links=$((total_links - prev_links))
    delta_broken=$((broken - prev_broken))

    sign_art=""; [ "$delta_art" -gt 0 ] && sign_art="+" || true
    sign_words=""; [ "$delta_words" -gt 0 ] && sign_words="+" || true
    sign_links=""; [ "$delta_links" -gt 0 ] && sign_links="+" || true
    sign_broken=""; [ "$delta_broken" -gt 0 ] && sign_broken="+" || true

    echo "| Métrique | Précédent ($prev_date) | Actuel | Δ |"
    echo "|----------|------------------------|--------|---|"
    echo "| Articles | $prev_articles | $total_articles | ${sign_art}${delta_art} |"
    echo "| Mots | $prev_words | $total_words | ${sign_words}${delta_words} |"
    echo "| Liens internes | $prev_links | $total_links | ${sign_links}${delta_links} |"
    echo "| Liens cassés | $prev_broken | $broken | ${sign_broken}${delta_broken} |"
  else
    echo "_Premier snapshot — les tendances seront disponibles à la prochaine exécution._"
  fi
  echo ""

  echo "---"
  echo "_Généré par \`./scripts/metrics.sh\` — $(date)_"

} > "$REPORT"

echo "✅ Dashboard généré: $REPORT"
grep -E '^\| ' "$REPORT" | head -30
