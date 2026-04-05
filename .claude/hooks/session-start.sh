#!/usr/bin/env bash
# Hook SessionStart — chargé automatiquement à chaque ouverture Claude Code
# Rôle : donner à Claude Code le contexte complet + lister les fichiers en attente.
# Output : texte markdown lu par Claude Code comme contexte de démarrage.

set -euo pipefail
cd "$(dirname "$0")/../.." 2>/dev/null || exit 0

DATE_NOW="$(date +%F)"
MANIFEST="outputs/compile-manifest.tsv"

echo "## Contexte wiki-copro — Chargement automatique ($DATE_NOW)"
echo ""

# --- Statut wiki ---
total_articles=$(find wiki -type f -name '*.md' 2>/dev/null | grep -v 'index\.md\|glossary\.md' | wc -l || echo 0)
total_words=$(find wiki -type f -name '*.md' -exec cat {} + 2>/dev/null | wc -w || echo 0)
echo "### Wiki"
echo "- Articles : $total_articles | Mots : $total_words"

# --- Fichiers raw non encore compilés ---
# Utilise deux méthodes : matching par nom + manifest de compilation (gère les renommages)
echo ""
echo "### Fichiers en attente de compilation (raw/ non encore dans wiki/)"
pending=0
while IFS= read -r -d '' f; do
  basename_f="$(basename "$f" .md)"
  # Méthode 1 : match par nom dans wiki/
  if find wiki -type f -name "${basename_f}*.md" 2>/dev/null | grep -q .; then
    continue
  fi
  # Méthode 2 : chercher dans le manifest (gère les renommages)
  if [ -f "$MANIFEST" ] && grep -q "^${f}	" "$MANIFEST" 2>/dev/null; then
    continue
  fi
  echo "- ⬜ $f"
  pending=$((pending+1))
done < <(find raw -type f -name '*.md' -print0 2>/dev/null | sort -z)
[ "$pending" -eq 0 ] && echo "- ✅ Tout est à jour."

# --- Notes Granola récentes (raw/notes-terrain/ modifiées dans les 7 derniers jours) ---
echo ""
echo "### Notes terrain récentes (7j)"
recent_notes=0
while IFS= read -r -d '' f; do
  echo "- $f ($(date -r "$f" +%F 2>/dev/null || stat -c %y "$f" | cut -d' ' -f1))"
  recent_notes=$((recent_notes+1))
done < <(find raw/notes-terrain -type f -name '*.md' -mtime -7 -print0 2>/dev/null | sort -z || true)
[ "$recent_notes" -eq 0 ] && echo "- Aucune note terrain récente."

# --- Templates disponibles ---
echo ""
echo "### Templates disponibles"
find templates -type f -name '*.md' 2>/dev/null | while read -r t; do
  title=$(grep -m1 '^# ' "$t" 2>/dev/null | sed 's/^# //' || basename "$t" .md)
  echo "- $t — $title"
done || echo "- Aucun template trouvé."

# --- Instructions de comportement ---
echo ""
echo "---"
echo "### Mode de fonctionnement attendu de Claude Code"
echo ""
echo "Tu es l'assistant expert en gestion de copropriété de ce repo. À chaque message :"
echo "1. Si c'est une **question juridique ou métier** → répondre en lisant le wiki + lois + templates. Puis file-back automatique."
echo "2. Si c'est un **dépôt de fichier** (Granola, note, document) → traiter via le pipeline raw → wiki sans demander de confirmation."
echo "3. Si il y a des **fichiers en attente** ci-dessus → les traiter en priorité, sans attendre."
echo "4. **Mémoire organisationnelle** : les pratiques d'Antoine Immobilier sont dans wiki/meta/ et wiki/procedures/ — les consulter en priorité avant de répondre."
echo ""
echo "Consulte AGENTS.md pour les conventions complètes."
