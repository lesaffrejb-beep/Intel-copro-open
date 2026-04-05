---
title: "Décision — feuille de route Intel-Copro (Q2 2026)"
category: concept
tags: [decision, roadmap, priorisation, ingestion, produit]
created: 2026-04-03
updated: 2026-04-03
source: "outputs/sources-catalog.md + demande-utilisateur-2026-04-03"
status: draft
---

# Décision — feuille de route Intel-Copro

## Date
- 2026-04-03

## Contexte
Le projet a un stock documentaire brut très avancé, et l'enjeu devient la conversion en valeur opérationnelle quotidienne (wiki compilé, recherche utile, entraînement, qualité).  
La demande explicite est de cadrer la suite la plus cohérente : sources manquantes en `.md`, fonctionnalités prioritaires et trajectoire produit.

## Options envisagées

### Option A — Continuer l'ingestion brute
- **Principe** : ajouter encore des PDFs/sources avant d'améliorer l'exploitation.
- **Avantages** : augmente la couverture documentaire.
- **Limites** : effet tunnel ; valeur terrain faible si le contenu n'est pas compilé en fiches actionnables.

### Option B — Priorité à la compilation wiki (recommandée)
- **Principe** : convertir les `raw/*.md` déjà présents en articles wiki reliés (concepts/procédures/templates/erreurs).
- **Avantages** : impact immédiat sur la qualité des réponses et la révision métier.
- **Limites** : demande une discipline éditoriale régulière.

### Option C — Priorité aux features techniques
- **Principe** : développer d'abord des scripts/outils (lint juridique, score confiance automatique, graph backlinks).
- **Avantages** : scalabilité et contrôle qualité.
- **Limites** : risque de sur-ingénierie si la base wiki reste incomplète.

## Option choisie et pourquoi
**Option B, avec mini-lots techniques de l'option C.**  
Raison : la chaîne `raw -> wiki -> QA -> file-back` est déjà en place ; le goulot n'est plus l'ingestion brute mais la **compilation structurée** et la **fiabilité juridique traçable**.

## Résultat (à remplir plus tard si possible)
- À mesurer au 2026-05-15 :
  - % de sources compilées en articles wiki,
  - taux de réponses avec citation d'articles,
  - baisse des articles orphelins / liens cassés.

## Ce que je referais différemment (à remplir rétrospectivement)
- Ajouter dès le départ un tableau de bord de couverture (`raw` vs `wiki`) par thème métier.

## État des sources `.md` manquantes

D'après le dernier catalogue des sources :
- **Sources non converties en `.md` : 0**
- **Sources converties dans `raw/` : 76 / 76 (100%)**
- **Point d'attention réel** : beaucoup de sources sont **non compilées dans `wiki/`** (statut « non compilé »).

## Backlog cohérent (prochaines features)

1. **Feature 1 — Compileur priorisé par impact**
   - Prioriser 20 sources en premier : `lois/` + `contexte-local/` + `financement/`.
   - Sortie attendue : 1 fiche wiki par source avec backlinks.

2. **Feature 2 — Score de confiance standardisé**
   - Ajouter un bloc standard dans les templates :
     - `confidence: 0.00-1.00`
     - `confidence_basis: source primaire | source secondaire | inférence`
   - Linter : alerte si affirmation forte sans base explicite.

3. **Feature 3 — Lint juridique renforcé**
   - Détecter les affirmations juridiques sans article cité (`L.`, `R.`, loi/décret daté).
   - Forcer `**[À VÉRIFIER]**` si la preuve n'est pas trouvée.

4. **Feature 4 — Dashboard de progression**
   - Générer `outputs/dashboard.md` avec :
     - nb articles par catégorie,
     - nb liens entrants par article,
     - ratio raw compilé vs non compilé,
     - top 10 zones faibles.

5. **Feature 5 — Pack "terrain syndic"**
   - Créer un bundle de procédures critiques :
     - sinistres DDE/IRSI,
     - AG (préparation + PV + exécution),
     - impayés (pré-contentieux/contentieux),
     - travaux urgents vs non urgents.

## Voir aussi
- [[audit-strategique-antoine-immobilier]]
- [[antoine-immo-culture]]
- [[declaration-sinistre]]
- [[convocation-ag]]
- [[index]]
