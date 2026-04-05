#!/bin/bash
# Convertit tous les PDFs de Ressources/ vers raw/ en markdown brut.
# Usage: ./scripts/pdf-to-raw.sh [--dry-run]
set -euo pipefail

DRY_RUN=0
[ "${1:-}" = "--dry-run" ] && DRY_RUN=1

ok=0; skip=0; fail=0

to_kebab() {
  python3 -c "
import unicodedata, re, sys
s = sys.argv[1]
s = unicodedata.normalize('NFD', s)
s = ''.join(c for c in s if unicodedata.category(c) != 'Mn')
s = re.sub(r'[^a-zA-Z0-9]+', '-', s.lower()).strip('-')
s = re.sub(r'-+', '-', s)
print(s[:80])
" "$1"
}

# Map Ressources/ subfolder -> raw/ subfolder
map_dir() {
  case "$1" in
    RAG/lois)        echo "lois" ;;
    RAG/financement) echo "financement" ;;
    RAG/guides)      echo "guides" ;;
    RAG/contexte-local) echo "contexte-local" ;;
    STOCK_SOURCE)    echo "stock" ;;
    *)               echo "stock" ;;
  esac
}

clean_legifrance() {
  # Supprime les headers/footers Légifrance répétitifs et les URLs
  python3 - "$1" <<'PYEOF'
import sys, re

with open(sys.argv[1], 'r', encoding='utf-8', errors='replace') as f:
    text = f.read()

# Supprimer les lignes de date/heure Légifrance (ex: "28/01/2026 14:05   Titre - Légifrance")
text = re.sub(r'^\d{2}/\d{2}/\d{4}\s+\d{2}:\d{2}\s+.*Légifrance\s*$', '', text, flags=re.MULTILINE)

# Supprimer les URLs légifrance
text = re.sub(r'^https?://www\.legifrance\.gouv\.fr/\S*\s*$', '', text, flags=re.MULTILINE)

# Supprimer les lignes de numéro de page seul (ex: "1/49")
text = re.sub(r'^\s*\d+/\d+\s*$', '', text, flags=re.MULTILINE)

# Réduire les lignes vides multiples à 2 max
text = re.sub(r'\n{4,}', '\n\n\n', text)

# Supprimer les espaces en fin de ligne
text = re.sub(r'[ \t]+$', '', text, flags=re.MULTILINE)

print(text.strip())
PYEOF
}

while IFS= read -r -d '' pdf; do
  rel="${pdf#Ressources/}"
  subdir="$(dirname "$rel")"
  filename="$(basename "$pdf")"
  stem="${filename%.*}"
  ext="${filename##*.}"

  target_dir="raw/$(map_dir "$subdir")"
  slug="$(to_kebab "$stem")"
  target="$target_dir/${slug}.md"

  if [ -f "$target" ]; then
    echo "SKIP  $target"
    skip=$((skip+1))
    continue
  fi

  if [ "$DRY_RUN" -eq 1 ]; then
    echo "DRY   $pdf  ->  $target"
    ok=$((ok+1))
    continue
  fi

  # Extraction texte
  if [ "${ext,,}" = "pdf" ]; then
    raw_text="$(pdftotext -enc UTF-8 "$pdf" - 2>/dev/null || true)"
  elif [ "${ext,,}" = "txt" ]; then
    raw_text="$(cat "$pdf")"
  else
    echo "SKIP  $pdf (type inconnu)"
    skip=$((skip+1))
    continue
  fi

  if [ -z "$raw_text" ]; then
    echo "FAIL  $pdf (texte vide — PDF scanné?)"
    fail=$((fail+1))
    continue
  fi

  # Écrire fichier temporaire pour nettoyage
  tmp="$(mktemp /tmp/raw_XXXXXX.md)"
  printf '%s' "$raw_text" > "$tmp"

  # Nettoyage Légifrance
  cleaned="$(clean_legifrance "$tmp")"
  rm -f "$tmp"

  # Écrire markdown final avec frontmatter minimal
  {
    echo "---"
    echo "source_file: \"$pdf\""
    echo "source_title: \"$stem\""
    echo "converted: \"$(date +%F)\""
    echo "status: raw"
    echo "---"
    echo ""
    printf '%s\n' "$cleaned"
  } > "$target"

  echo "OK    $pdf  ->  $target"
  ok=$((ok+1))

done < <(find Ressources -type f \( -name "*.pdf" -o -name "*.txt" \) -print0 | sort -z)

echo ""
echo "✅ Terminé : $ok convertis | $skip sautés | $fail échoués"
