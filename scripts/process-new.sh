#!/bin/bash
# Traite tous les fichiers raw/ non encore compilés dans wiki/.
# Usage : ./scripts/process-new.sh [--granola-only] [--since YYYY-MM-DD]
#
# Mode d'emploi :
#   Dépose des fichiers Granola / notes / docs dans raw/
#   Lance ce script → il génère un prompt unique à coller dans Claude Code
#   Claude Code traite tout en une passe → commit automatique suggéré

set -euo pipefail
cd "$(dirname "$0")/.."

GRANOLA_ONLY=false
SINCE=""

while [[ $# -gt 0 ]]; do
  case "$1" in
    --granola-only) GRANOLA_ONLY=true; shift ;;
    --since) SINCE="$2"; shift 2 ;;
    *) echo "Usage: ./scripts/process-new.sh [--granola-only] [--since YYYY-MM-DD]"; exit 1 ;;
  esac
done

# ---- Collecte des fichiers en attente ----
PENDING=()

while IFS= read -r -d '' f; do
  base="$(basename "$f" .md)"
  if $GRANOLA_ONLY && ! echo "$f" | grep -q 'notes-terrain'; then
    continue
  fi
  if [ -n "$SINCE" ] && [ "$(date -r "$f" +%F 2>/dev/null || stat -c %y "$f" | cut -d' ' -f1)" \< "$SINCE" ]; then
    continue
  fi
  if ! find wiki -type f -name "${base}*.md" 2>/dev/null | grep -q .; then
    PENDING+=("$f")
  fi
done < <(find raw -type f -name '*.md' -print0 2>/dev/null | sort -z)

if [ "${#PENDING[@]}" -eq 0 ]; then
  echo "✅ Rien à traiter — wiki déjà à jour."
  exit 0
fi

echo "📋 ${#PENDING[@]} fichier(s) en attente :"
for f in "${PENDING[@]}"; do
  echo "   - $f"
done

echo ""
echo "=========================================="
echo "  PROMPT À COLLER DANS CLAUDE CODE"
echo "=========================================="
echo ""
cat <<PROMPT
Tu es un expert en gestion de copropriété en droit français.
Réfère-toi à AGENTS.md à la racine du repo et applique strictement ses conventions.

TÂCHE : Traitement batch — ${#PENDING[@]} fichier(s) raw/ non encore compilés.

Pour CHAQUE fichier de la liste ci-dessous, dans l'ordre :
1. Lire le contenu intégral.
2. Identifier le type : loi | financement | notes-terrain | jurisprudence | pathologie | autre.
3. Extraire tous les concepts, procédures, personnes, erreurs, décisions, templates.
4. Créer ou enrichir les articles wiki/ correspondants (frontmatter YAML complet).
5. Pour les notes terrain Granola :
   - Extraire les cas rencontrés, apprentissages, erreurs → wiki/errors-log/ si erreur, wiki/decisions/ si décision.
6. Ajouter backlinks [[...]] + mettre à jour les "Voir aussi".
7. Mettre à jour wiki/index.md.
8. En fin de traitement : commit + push avec un message clair.

Fichiers à traiter :
PROMPT

for f in "${PENDING[@]}"; do
  echo "- $f"
done

echo ""
cat <<PROMPT2
Contraintes :
- Verbatim dans raw/ → synthèse structurée dans wiki/.
- Toute affirmation juridique cite l'article précis ou porte [À VÉRIFIER].
- Ne supprimer aucune connaissance existante dans le wiki.
- Si contradiction → note de conflit + [À VÉRIFIER].
- Appliquer file-back sur chaque fichier traité.
PROMPT2

echo ""
echo "=========================================="
echo ""
echo "Après avoir collé ce prompt dans Claude Code, il traitera tout automatiquement."
echo "Pense à committer : git add -A && git commit -m 'feat: compilation batch $(date +%F)' && git push"
