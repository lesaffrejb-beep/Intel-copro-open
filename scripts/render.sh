#!/bin/bash
set -euo pipefail

if [ $# -lt 1 ]; then
  echo "Usage: ./scripts/render.sh <wiki/article.md> [--all-slides | --summary]"
  echo ""
  echo "  --all-slides   Convertir l'article complet en slides Marp"
  echo "  --summary      Générer une slide de synthèse (1 page)"
  echo ""
  echo "Exemple:"
  echo "  ./scripts/render.sh wiki/concepts/syndic-role.md --all-slides"
  echo "  ./scripts/render.sh wiki/procedures/convocation-ag.md --summary"
  exit 1
fi

ARTICLE="$1"
MODE="${2:---all-slides}"

if [ ! -f "$ARTICLE" ]; then
  echo "❌ Fichier introuvable: $ARTICLE"
  exit 1
fi

BASENAME="$(basename "$ARTICLE" .md)"
mkdir -p outputs/slides

OUTPUT="outputs/slides/${BASENAME}.md"

echo "========== PROMPT RENDU MARP =========="
cat <<PROMPT
Tu es un expert en gestion de copropriété en droit français.
Tu dois convertir un article wiki en présentation Marp.

Article source : $ARTICLE
Mode : $MODE
Sortie attendue : $OUTPUT

$(if [ "$MODE" = "--summary" ]; then
  cat <<SUMMARY
## Mode résumé (1 slide)

Générer UNE slide de synthèse Marp pour cet article :
- Titre de l'article
- 3-5 points clés (bullet points courts)
- Références légales essentielles
- 1 "point de vigilance" en bas de slide

Format Marp :
\`\`\`markdown
---
marp: true
theme: default
paginate: false
---

# [Titre]

- Point clé 1
- Point clé 2
- Point clé 3

**Base légale** : [articles]

> ⚠️ Point de vigilance : [...]
\`\`\`
SUMMARY
else
  cat <<SLIDES
## Mode présentation complète

Générer une présentation Marp complète depuis l'article wiki.

Structure des slides :
1. Slide titre (titre + sous-titre contexte)
2. Slide définition / concept central
3. Slides contenu (1 idée = 1 slide, max 5 bullet points par slide)
4. Slide base légale (articles, lois, décrets)
5. Slide cas pratique ou exemple terrain
6. Slide points de vigilance / erreurs fréquentes
7. Slide "Voir aussi" (liens wiki + articles de loi)

Règles Marp :
- En-tête : \`marp: true\`, \`theme: default\`, \`paginate: true\`
- Séparateur de slides : \`---\`
- Pas plus de 6 lignes de texte par slide
- Mettre en gras les termes juridiques importants
- Utiliser \`> ⚠️\` pour les points de vigilance

Lire l'article : $ARTICLE
Écrire le résultat dans : $OUTPUT
SLIDES
fi)

PROMPT
