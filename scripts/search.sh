#!/bin/bash
set -euo pipefail

if [ $# -lt 1 ]; then
  echo "Usage: ./scripts/search.sh \"ma question\""
  exit 1
fi
QUESTION="$*"

echo "========== PROMPT RECHERCHE =========="
cat <<PROMPT
Tu es un expert en gestion de copropriété en droit français.
Réfère-toi à AGENTS.md.

Question: "$QUESTION"

Méthode imposée:
1) Lire wiki/index.md et wiki/glossary.md.
2) Identifier les articles pertinents.
3) Lire ces articles.
4) Répondre de manière structurée en citant les sources wiki et les articles de loi.
5) Si information incertaine: marquer [À VÉRIFIER].
PROMPT
