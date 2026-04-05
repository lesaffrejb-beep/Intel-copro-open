#!/bin/bash
set -euo pipefail

if [ $# -ne 1 ]; then
  echo "Usage: ./scripts/ingest.sh <chemin-vers-fichier-raw>"
  exit 1
fi

INPUT="$1"
if [ ! -f "$INPUT" ]; then
  echo "Fichier introuvable: $INPUT"
  exit 1
fi

mkdir -p raw/notes-terrain raw/lois raw/financement raw/jurisprudence raw/pathologies raw/misc

BASENAME="$(basename "$INPUT")"
TARGET_DIR="raw/misc"
LOWER_PATH="$(printf '%s' "$INPUT" | tr '[:upper:]' '[:lower:]')"

# Pour les exports Granola, utiliser granola-import.sh dédié (meilleur frontmatter)
if echo "$LOWER_PATH" | grep -qE 'granola|transcript|meeting|rdv|reunion'; then
  echo "ℹ️  Fichier Granola détecté. Utilise de préférence scripts/granola-import.sh pour un meilleur import."
  echo ""
fi

case "$LOWER_PATH" in
  *granola*|*transcript*|*meeting*|*rdv*|*reunion*|*notes-terrain*) TARGET_DIR="raw/notes-terrain" ;;
  *loi*|*decret*|*jurisprud*|*legal*) TARGET_DIR="raw/lois" ;;
  *financ*|*mpr*|*cee*|*eco-ptz*|*anah*) TARGET_DIR="raw/financement" ;;
  *patholog*|*sinistre*|*degat*|*batiment*) TARGET_DIR="raw/pathologies" ;;
esac

TARGET_PATH="$TARGET_DIR/$BASENAME"
cp "$INPUT" "$TARGET_PATH"

echo "✅ Fichier ingéré dans: $TARGET_PATH"

echo ""
echo "========== PROMPT À COLLER DANS CLAUDE CODE =========="
cat <<PROMPT
Tu es un expert en gestion de copropriété en droit français.
Réfère-toi à AGENTS.md à la racine du repo et applique strictement ses conventions.

Tâche:
1) Lis le fichier brut suivant : $TARGET_PATH
2) Extrait concepts, procédures, personnes, erreurs.
3) Crée ou mets à jour les articles dans wiki/ avec frontmatter YAML complet.
4) Ajoute des backlinks [[...]] et complète la section "Voir aussi".
5) Mets à jour wiki/index.md.
6) Si contradiction avec l'existant: crée une note de conflit et marque [À VÉRIFIER].

Contraintes:
- Ne supprime aucune information existante.
- Cite les bases légales (article précis) ou marque [À VÉRIFIER].
- Ton professionnel, clair, actionnable.
PROMPT
