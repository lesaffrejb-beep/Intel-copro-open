#!/bin/bash
# Import d'exports Granola vers raw/notes-terrain/
#
# Usage:
#   ./scripts/granola-import.sh <fichier-granola.md>
#   ./scripts/granola-import.sh <dossier/>          # batch : tous les .md du dossier
#
# Comportement :
#   1. Détecte la date et le titre dans le fichier Granola.
#   2. Génère un nom kebab-case daté : YYYY-MM-DD-titre-de-la-reunion.md
#   3. Injecte un frontmatter YAML (source, date, tags, status: raw).
#   4. Copie dans raw/notes-terrain/.
#   5. Affiche le prompt de compilation à coller dans Claude Code.

set -euo pipefail

TARGET_DIR="raw/notes-terrain"
mkdir -p "$TARGET_DIR"

# --------------------------------------------------------------------------
# Fonctions utilitaires
# --------------------------------------------------------------------------

kebab_case() {
  # Convertit une chaîne en kebab-case ASCII (suppression accents, minuscules, tirets)
  python3 - "$1" <<'PYEOF'
import sys, unicodedata, re
s = sys.argv[1]
s = unicodedata.normalize('NFD', s)
s = ''.join(c for c in s if unicodedata.category(c) != 'Mn')
s = re.sub(r'[^a-zA-Z0-9]+', '-', s.lower()).strip('-')
s = re.sub(r'-+', '-', s)
print(s[:80])
PYEOF
}

extract_title() {
  # Cherche le premier titre Markdown H1 (# Titre)
  local file="$1"
  grep -m1 '^# ' "$file" | sed 's/^# //' | sed 's/[[:space:]]*$//' || echo ""
}

extract_date() {
  # Tente d'extraire une date depuis le contenu :
  # - Frontmatter YAML : "date: YYYY-MM-DD"
  # - Ligne "Date: ..." (formats courants Granola)
  # - Patterns YYYY-MM-DD dans le texte
  local file="$1"

  # Frontmatter YAML
  local d
  d=$(grep -m1 '^date:' "$file" | sed 's/^date:[[:space:]]*//' | tr -d '"' | sed 's/[[:space:]].*//' || true)
  if echo "$d" | grep -qE '^[0-9]{4}-[0-9]{2}-[0-9]{2}$'; then
    echo "$d"; return
  fi

  # Ligne "Date: ..." (anglais/français)
  d=$(grep -m1 -iE '^(date|le)[[:space:]]*:[[:space:]]*' "$file" \
    | sed -E 's/^[^:]+:[[:space:]]*//' \
    | sed 's/[[:space:]]*$//' || true)
  # Normalise les dates courantes (April 3, 2026 → 2026-04-03 ; 03/04/2026 → 2026-04-03)
  if [ -n "$d" ]; then
    local parsed
    parsed=$(python3 - "$d" <<'PYEOF' 2>/dev/null || echo "")
import sys
from datetime import datetime
s = sys.argv[1].strip()
for fmt in (
    "%Y-%m-%d", "%d/%m/%Y", "%d-%m-%Y",
    "%B %d, %Y", "%b %d, %Y",
    "%d %B %Y", "%d %b %Y",
    "%A %d %B %Y",
):
    try:
        print(datetime.strptime(s, fmt).strftime("%Y-%m-%d"))
        sys.exit(0)
    except ValueError:
        pass
PYEOF
    if [ -n "$parsed" ]; then
      echo "$parsed"; return
    fi
  fi

  # Date dans le nom du fichier lui-même (YYYY-MM-DD_*, YYYYMMDD_*, etc.)
  local basename_f
  basename_f="$(basename "$file")"
  d=$(echo "$basename_f" | grep -oE '[0-9]{4}-[0-9]{2}-[0-9]{2}' | head -1 || true)
  if [ -n "$d" ]; then
    echo "$d"; return
  fi

  # Fallback : date du jour
  date +%F
}

import_file() {
  local src="$1"
  local title
  local date_str
  local slug
  local dest

  title=$(extract_title "$src")
  date_str=$(extract_date "$src")

  if [ -z "$title" ]; then
    # Utilise le nom de fichier comme titre de fallback
    title="$(basename "$src" .md)"
  fi

  slug=$(kebab_case "$title")
  dest="$TARGET_DIR/${date_str}-${slug}.md"

  # Vérifie si le fichier de destination existe déjà
  if [ -f "$dest" ]; then
    echo "⏭️  Déjà importé: $dest — skip (supprimer le fichier pour ré-importer)"
    return
  fi

  # Construit le frontmatter + contenu
  {
    echo "---"
    echo "title: \"${title}\""
    echo "source: \"granola-export\""
    echo "date: ${date_str}"
    echo "type: notes-terrain"
    echo "tags: [notes-terrain, granola, verbatim]"
    echo "status: raw"
    echo "created: $(date +%F)"
    echo "---"
    echo ""
    # Supprime un éventuel frontmatter YAML déjà présent dans l'export
    awk '
      BEGIN { in_fm=0; done_fm=0 }
      NR==1 && /^---/ { in_fm=1; next }
      in_fm && /^---/ { in_fm=0; done_fm=1; next }
      in_fm { next }
      { print }
    ' "$src"
  } > "$dest"

  echo "✅ Importé: $dest"
}

# --------------------------------------------------------------------------
# Point d'entrée
# --------------------------------------------------------------------------

if [ $# -ne 1 ]; then
  echo "Usage: ./scripts/granola-import.sh <fichier.md | dossier/>"
  echo ""
  echo "Exemples:"
  echo "  ./scripts/granola-import.sh ~/Downloads/reunion-pierre-henri.md"
  echo "  ./scripts/granola-import.sh ~/Downloads/granola-exports/"
  exit 1
fi

INPUT="$1"
IMPORTED=0

if [ -d "$INPUT" ]; then
  # Mode batch : importer tous les .md du dossier
  while IFS= read -r -d '' f; do
    import_file "$f"
    IMPORTED=$((IMPORTED+1))
  done < <(find "$INPUT" -maxdepth 1 -type f -name '*.md' -print0 | sort -z)
  echo ""
  echo "Batch terminé : $IMPORTED fichier(s) traité(s) → $TARGET_DIR/"
elif [ -f "$INPUT" ]; then
  import_file "$INPUT"
  IMPORTED=1
else
  echo "Erreur : '$INPUT' n'est pas un fichier ni un dossier valide." >&2
  exit 1
fi

if [ "$IMPORTED" -eq 0 ]; then
  echo "Aucun fichier .md trouvé dans '$INPUT'."
  exit 0
fi

echo ""
echo "========== PROMPT À COLLER DANS CLAUDE CODE =========="
cat <<PROMPT
Tu es un expert en gestion de copropriété en droit français.
Réfère-toi à AGENTS.md à la racine du repo et applique strictement ses conventions.

Tâche — Notes terrain Granola récemment importées dans raw/notes-terrain/ :
1. Lis chaque fichier importé (date du jour ou récents) dans raw/notes-terrain/.
2. Extrais : cas rencontrés, décisions prises, erreurs commises, apprentissages, personnes citées.
3. Pour chaque élément :
   - Crée ou enrichis l'article wiki/ correspondant (concept, procédure, erreur, personne).
   - Si nouvelle erreur : crée un article dans wiki/errors-log/ au format "Erreur".
   - Si décision documentée : crée un article dans wiki/decisions/ au format "Décision".
4. Ajoute les backlinks [[...]] et mets à jour les sections "Voir aussi".
5. Mets à jour wiki/index.md.
6. Si contradiction avec l'existant : crée une note de conflit et marque [À VÉRIFIER].

Contraintes :
- Verbatim dans raw/, synthèse et structure dans wiki/.
- Citer les bases légales (article précis) ou marquer [À VÉRIFIER].
- Ton professionnel, concret, actionnable.
- Ne supprimer aucune connaissance existante dans le wiki.
PROMPT
