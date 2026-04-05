#!/bin/bash
# Export "portfolio" — Génère un rapport consolidé montrant la structure,
# les stats et la maturité de la base de connaissances.
# Utile pour entretiens, bilans de stage, présentations.
#
# Usage : ./scripts/export-portfolio.sh [output_file]
# Par défaut : outputs/portfolio-YYYY-MM-DD.md

set -euo pipefail
cd "$(dirname "$0")/.."

DATE_NOW="$(date +%F)"
OUTPUT="${1:-outputs/portfolio-${DATE_NOW}.md}"
mkdir -p "$(dirname "$OUTPUT")"

count_files_in() { find "$1" -type f -name '*.md' 2>/dev/null | wc -l; }
count_words_in() { find "$1" -type f -name '*.md' -exec cat {} + 2>/dev/null | wc -w; }

{
echo "# Portfolio — Base de connaissances copropriété"
echo ""
echo "**Date d'export** : $DATE_NOW"
echo "**Projet** : wiki-copro — Antoine Immobilier, Angers"
echo ""

# --- Vue d'ensemble ---
echo "## Vue d'ensemble"
echo ""
total_articles=$(find wiki -type f -name '*.md' | grep -v 'index\.md\|glossary\.md' | wc -l)
total_words=$(count_words_in wiki)
total_raw=$(find raw -type f -name '*.md' | wc -l)
total_links=$(grep -roh '\[\[[^]]*\]\]' wiki 2>/dev/null | wc -l || echo 0)
broken=0
while IFS= read -r link; do
  [ -n "$link" ] && ! find wiki -type f -name "${link}.md" 2>/dev/null | grep -q . && broken=$((broken+1))
done < <(grep -roh '\[\[[^]]*\]\]' wiki 2>/dev/null | sed 's/\[\[//;s/\]\]//' | sort -u)

echo "| Indicateur | Valeur |"
echo "|------------|--------|"
echo "| Articles wiki | **$total_articles** |"
echo "| Volume total | **$(printf "%'d" $total_words) mots** |"
echo "| Sources ingérées (raw/) | $total_raw |"
echo "| Liens internes | $total_links |"
echo "| Liens cassés | $broken |"
echo "| Taux d'intégrité | $((100 - broken * 100 / (total_links > 0 ? total_links : 1)))% |"
echo ""

# --- Couverture thématique ---
echo "## Couverture thématique"
echo ""
echo "| Domaine | Articles | Mots |"
echo "|---------|----------|------|"
for cat in concepts procedures jurisprudence financement technique contexte-local decisions meta; do
  dir="wiki/$cat"
  if [ -d "$dir" ]; then
    n=$(count_files_in "$dir")
    w=$(count_words_in "$dir")
    echo "| $cat | $n | $(printf "%'d" $w) |"
  fi
done
echo ""

# --- Outils et automatisation ---
echo "## Outils et automatisation"
echo ""
echo "| Outil | Description |"
echo "|-------|-------------|"
n_scripts=$(find scripts -type f -name '*.sh' | wc -l)
n_prompts=$(find prompts -type f -name '*.md' | wc -l)
n_agents=$(find prompts/agents -type f -name '*.md' 2>/dev/null | wc -l)
n_templates=$(find templates -type f -name '*.md' | wc -l)
echo "| Scripts bash | $n_scripts utilitaires (lint, metrics, ingest, search, quiz…) |"
echo "| Prompts opérationnels | $n_prompts (compile, Q&A, file-back, weekly review…) |"
echo "| Agents spécialisés | $n_agents (juriste, comptable, rédacteur, diagnostiqueur…) |"
echo "| Templates métier | $n_templates (convocation AG, PV, matrice sinistre) |"
echo "| CI/CD | GitHub Actions — lint + metrics auto sur chaque push |"
echo "| Hooks Claude Code | SessionStart (contexte auto), PreToolUse (protection fichiers) |"
echo "| Manifest incrémental | Suivi des compilations raw→wiki avec timestamps |"
echo ""

# --- Architecture ---
echo "## Architecture du repo"
echo ""
echo '```'
echo "wiki-copro/"
echo "├── raw/                 # Sources brutes ($total_raw fichiers)"
echo "│   ├── lois/            # Textes légaux (Légifrance)"
echo "│   ├── financement/     # Aides et dispositifs financiers"
echo "│   ├── guides/          # Guides pratiques"
echo "│   ├── notes-terrain/   # Notes Granola importées"
echo "│   └── stock/           # Documents divers"
echo "├── wiki/                # Base compilée ($total_articles articles)"
echo "│   ├── concepts/        # Définitions, cadre légal"
echo "│   ├── procedures/      # Procédures opérationnelles"
echo "│   ├── financement/     # Dispositifs de financement"
echo "│   ├── technique/       # Sécurité, diagnostics, équipements"
echo "│   ├── contexte-local/  # Données Maine-et-Loire / Angers"
echo "│   ├── jurisprudence/   # Sources jurisprudentielles"
echo "│   ├── decisions/       # Arbitrages documentés"
echo "│   └── meta/            # Contexte organisationnel (interne)"
echo "├── prompts/             # Prompts et agents IA"
echo "├── scripts/             # Automatisation ($n_scripts scripts)"
echo "├── templates/           # Modèles de documents"
echo "├── outputs/             # Rapports générés (lint, metrics, portfolio)"
echo "└── .claude/hooks/       # Automatisation Claude Code"
echo '```'
echo ""

# --- Compétences mobilisées ---
echo "## Compétences mobilisées"
echo ""
echo "- **Droit de la copropriété** : loi 65-557, décret 67-223, ALUR, ELAN, IRSI"
echo "- **Gestion de projet** : roadmap en 5 phases, suivi par métriques"
echo "- **Ingénierie documentaire** : pipeline d'ingestion, compilation, linting"
echo "- **Automatisation IA** : agents spécialisés, boucle de capitalisation (file-back)"
echo "- **DevOps** : CI/CD, hooks, scripts bash, Git workflow"
echo "- **Architecture de l'information** : wiki structuré, backlinks, index navigable"
echo ""

# --- Historique git ---
echo "## Activité récente"
echo ""
total_commits=$(git rev-list --count HEAD 2>/dev/null || echo "?")
first_commit=$(git log --reverse --format='%ai' 2>/dev/null | head -1 | cut -d' ' -f1)
echo "| Indicateur | Valeur |"
echo "|------------|--------|"
echo "| Commits total | $total_commits |"
echo "| Premier commit | $first_commit |"
echo "| Dernier commit | $(git log -1 --format='%ai' | cut -d' ' -f1) |"
echo ""

echo "---"
echo "_Généré par \`./scripts/export-portfolio.sh\` — $(date)_"

} > "$OUTPUT"

echo "✅ Portfolio exporté : $OUTPUT"
echo ""
head -30 "$OUTPUT"
