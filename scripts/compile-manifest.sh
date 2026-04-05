#!/bin/bash
# Génère et maintient le manifest de compilation incrémentale.
# Permet de savoir quand chaque fichier raw/ a été compilé pour la dernière fois,
# et de ne recompiler que les fichiers modifiés depuis.
#
# Usage :
#   ./scripts/compile-manifest.sh          → Affiche les fichiers à recompiler
#   ./scripts/compile-manifest.sh mark <fichier_raw>  → Marque un fichier comme compilé
#   ./scripts/compile-manifest.sh status   → Résumé complet

set -euo pipefail
cd "$(dirname "$0")/.."

MANIFEST="outputs/compile-manifest.tsv"
DATE_NOW="$(date +%F_%H:%M)"

# Créer le manifest s'il n'existe pas
if [ ! -f "$MANIFEST" ]; then
  echo -e "# Manifest de compilation incrémentale" > "$MANIFEST"
  echo -e "# Format: raw_file\tcompiled_date\twiki_target\tstatus" >> "$MANIFEST"
fi

case "${1:-check}" in
  mark)
    # Marquer un fichier raw comme compilé
    RAW_FILE="${2:?Usage: compile-manifest.sh mark <raw_file> [wiki_target]}"
    WIKI_TARGET="${3:-auto}"
    # Supprimer l'ancienne entrée si elle existe
    grep -v "^${RAW_FILE}	" "$MANIFEST" > "${MANIFEST}.tmp" 2>/dev/null || cp "$MANIFEST" "${MANIFEST}.tmp"
    echo -e "${RAW_FILE}\t${DATE_NOW}\t${WIKI_TARGET}\tcompiled" >> "${MANIFEST}.tmp"
    mv "${MANIFEST}.tmp" "$MANIFEST"
    echo "✅ Marqué: $RAW_FILE → compilé ($DATE_NOW)"
    ;;

  check)
    # Lister les fichiers à (re)compiler
    echo "## Fichiers à compiler"
    echo ""
    NEED=0
    while IFS= read -r -d '' f; do
      raw_mod=$(stat -c %Y "$f" 2>/dev/null || echo 0)
      last_compile=$(grep "^${f}	" "$MANIFEST" 2>/dev/null | cut -f2 | tail -1)
      if [ -z "$last_compile" ]; then
        echo "⬜ NOUVEAU    $f"
        NEED=$((NEED+1))
      else
        # Convertir la date du manifest en epoch pour comparaison
        compile_epoch=$(date -d "${last_compile//_/ }" +%s 2>/dev/null || echo 0)
        if [ "$raw_mod" -gt "$compile_epoch" ]; then
          echo "🔄 MODIFIÉ    $f (compilé: $last_compile)"
          NEED=$((NEED+1))
        fi
      fi
    done < <(find raw -type f -name '*.md' -print0 2>/dev/null | sort -z)
    echo ""
    echo "→ $NEED fichier(s) à traiter."
    ;;

  status)
    # Résumé complet
    total_raw=$(find raw -type f -name '*.md' 2>/dev/null | wc -l)
    compiled=$(grep -c "	compiled$" "$MANIFEST" 2>/dev/null || echo 0)
    pending=$((total_raw - compiled))
    echo "## Manifest de compilation"
    echo "| Métrique | Valeur |"
    echo "|----------|--------|"
    echo "| Fichiers raw/ | $total_raw |"
    echo "| Compilés | $compiled |"
    echo "| En attente | $pending |"
    echo "| Couverture | $((compiled * 100 / (total_raw > 0 ? total_raw : 1)))% |"
    ;;

  *)
    echo "Usage: compile-manifest.sh [check|mark <file> [wiki_target]|status]"
    exit 1
    ;;
esac
