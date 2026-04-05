#!/bin/bash
set -euo pipefail

mkdir -p outputs
REPORT="outputs/sources-catalog.md"
DATE_NOW="$(date +%F)"
RESSOURCES_DIR="Ressources"
RAW_DIR="raw"

{
  echo "# Catalogue des sources"
  echo ""
  echo "Date: $DATE_NOW"
  echo ""
  echo "Suivi de l'ingestion des PDFs vers raw/ et wiki/"
  echo ""

  total=0
  ingested=0
  pending=0

  echo "## Sources par domaine"
  echo ""

  for domain_dir in "$RESSOURCES_DIR"/RAG/*/; do
    [ -d "$domain_dir" ] || continue
    domain="$(basename "$domain_dir")"
    echo "### $domain"
    echo ""
    echo "| Fichier | Statut raw/ | Statut wiki/ |"
    echo "|---------|-------------|--------------|"

    while IFS= read -r -d '' pdf; do
      filename="$(basename "$pdf")"
      stem="${filename%.*}"
      kebab="$(python3 -c "
import unicodedata, re, sys
s = sys.argv[1]
s = unicodedata.normalize('NFD', s)
s = ''.join(c for c in s if unicodedata.category(c) != 'Mn')
s = re.sub(r'[^a-zA-Z0-9]+', '-', s.lower()).strip('-')
s = re.sub(r'-+', '-', s)
print(s[:80])
" "$stem")"

      # Chercher dans raw/
      raw_match="$(find "$RAW_DIR" -type f -name "${kebab}*.md" 2>/dev/null | head -1)"
      if [ -n "$raw_match" ]; then
        raw_status="✅ $(basename "$raw_match")"
      else
        raw_status="⬜ non ingéré"
      fi

      # Chercher dans wiki/
      wiki_match="$(find wiki -type f -name "${kebab}*.md" 2>/dev/null | head -1)"
      if [ -n "$wiki_match" ]; then
        wiki_status="✅ $(basename "$wiki_match")"
      else
        wiki_status="⬜ non compilé"
      fi

      echo "| $filename | $raw_status | $wiki_status |"
      total=$((total+1))
      [ -n "$raw_match" ] && ingested=$((ingested+1)) || pending=$((pending+1))
    done < <(find "$domain_dir" -type f \( -name "*.pdf" -o -name "*.md" \) -print0 | sort -z)

    echo ""
  done

  # STOCK_SOURCE
  if [ -d "$RESSOURCES_DIR/STOCK_SOURCE" ]; then
    echo "### STOCK_SOURCE"
    echo ""
    echo "| Fichier | Statut raw/ | Statut wiki/ |"
    echo "|---------|-------------|--------------|"

    while IFS= read -r -d '' pdf; do
      filename="$(basename "$pdf")"
      stem="${filename%.*}"
      kebab="$(python3 -c "
import unicodedata, re, sys
s = sys.argv[1]
s = unicodedata.normalize('NFD', s)
s = ''.join(c for c in s if unicodedata.category(c) != 'Mn')
s = re.sub(r'[^a-zA-Z0-9]+', '-', s.lower()).strip('-')
s = re.sub(r'-+', '-', s)
print(s[:80])
" "$stem")"

      raw_match="$(find "$RAW_DIR" -type f -name "${kebab}*.md" 2>/dev/null | head -1)"
      [ -n "$raw_match" ] && raw_status="✅ $(basename "$raw_match")" || raw_status="⬜ non ingéré"

      wiki_match="$(find wiki -type f -name "${kebab}*.md" 2>/dev/null | head -1)"
      [ -n "$wiki_match" ] && wiki_status="✅ $(basename "$wiki_match")" || wiki_status="⬜ non compilé"

      echo "| $filename | $raw_status | $wiki_status |"
      total=$((total+1))
      [ -n "$raw_match" ] && ingested=$((ingested+1)) || pending=$((pending+1))
    done < <(find "$RESSOURCES_DIR/STOCK_SOURCE" -type f \( -name "*.pdf" -o -name "*.md" \) -print0 | sort -z)

    echo ""
  fi

  echo "## Résumé"
  echo ""
  echo "| Métrique | Valeur |"
  echo "|----------|--------|"
  echo "| Total sources | $total |"
  echo "| Ingérées dans raw/ | $ingested |"
  echo "| En attente | $pending |"
  if [ "$total" -gt 0 ]; then
    pct=$(( ingested * 100 / total ))
    echo "| Progression | ${pct}% |"
  fi
  echo ""
  echo "## Prochaines ingestions recommandées"
  echo ""
  echo "Lancer : \`./scripts/ingest.sh <fichier>\` pour chaque source prioritaire."
  echo "Ordre suggéré : lois/ → financement/ → jurisprudence/ → guides/ → contexte-local/"

} > "$REPORT"

echo "✅ Catalogue généré: $REPORT"
echo "Total: $total sources | Ingérées: $ingested | En attente: $pending"
