#!/bin/bash
# Détecte les fichiers raw/ non encore compilés dans wiki/
# Usage : ./scripts/check-pending.sh
# Retourne :
#   0  → tout est traité
#   1  → des fichiers sont en attente
#
# Utilise deux méthodes de détection :
#   1. Matching par nom de fichier (basename) dans wiki/
#   2. Manifest de compilation (outputs/compile-manifest.tsv) pour les renommages

set -euo pipefail
cd "$(dirname "$0")/.."

MANIFEST="outputs/compile-manifest.tsv"
PENDING=()
COMPILED=()

while IFS= read -r -d '' f; do
  base="$(basename "$f" .md)"

  # Méthode 1 : match par nom dans wiki/
  if find wiki -type f -name "${base}*.md" 2>/dev/null | grep -q .; then
    COMPILED+=("$f")
    continue
  fi

  # Méthode 2 : chercher dans le manifest (gère les renommages)
  if [ -f "$MANIFEST" ] && grep -q "^${f}	" "$MANIFEST" 2>/dev/null; then
    COMPILED+=("$f")
    continue
  fi

  PENDING+=("$f")
done < <(find raw -type f -name '*.md' -print0 2>/dev/null | sort -z)

echo "## État de l'ingestion raw/ → wiki/"
echo ""
echo "| Statut | Fichier |"
echo "|--------|---------|"
for f in "${COMPILED[@]}"; do
  echo "| ✅ compilé | $f |"
done
for f in "${PENDING[@]}"; do
  echo "| ⬜ en attente | $f |"
done

echo ""
if [ "${#PENDING[@]}" -eq 0 ]; then
  echo "✅ Rien en attente — wiki à jour."
  exit 0
else
  echo "⬜ ${#PENDING[@]} fichier(s) à compiler. Lance : ./scripts/process-new.sh"
  exit 1
fi
