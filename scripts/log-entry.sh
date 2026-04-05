#!/usr/bin/env bash
set -euo pipefail

# log-entry.sh — Ajoute une entrée au journal wiki/log.md
#
# Usage :
#   ./scripts/log-entry.sh <type> "<description>"
#   ./scripts/log-entry.sh compile "Convention IRSI → wiki/concepts/convention-irsi.md"
#   ./scripts/log-entry.sh qa "Question sur délais déclaration sinistre"
#   ./scripts/log-entry.sh lint "3 broken links corrigés"
#
# Types valides : ingest, compile, lint, qa, feature, fix, review

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
LOG_FILE="$REPO_ROOT/wiki/log.md"

if [ $# -lt 2 ]; then
  echo "Usage: $0 <type> \"<description>\""
  echo "Types: ingest, compile, lint, qa, feature, fix, review"
  exit 1
fi

TYPE="$1"
shift
DESC="$*"

VALID_TYPES="ingest compile lint qa feature fix review"
if ! echo "$VALID_TYPES" | grep -qw "$TYPE"; then
  echo "Erreur: type '$TYPE' invalide."
  echo "Types valides: $VALID_TYPES"
  exit 1
fi

DATE="$(date +%d/%m/%Y)"

# Append l'entrée
echo "" >> "$LOG_FILE"
echo "## [$DATE] $TYPE | $DESC" >> "$LOG_FILE"

echo "✓ Entrée ajoutée au log: [$DATE] $TYPE | $DESC"
