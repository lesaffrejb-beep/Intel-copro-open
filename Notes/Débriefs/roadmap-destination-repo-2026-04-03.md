---
source: cadrage opérationnel interne
date_ajout: 2026-04-03
statut: raw
tags: [roadmap, organisation, ingestion, wiki]
priorite: critique
---

# Roadmap de destination du repo wiki-copro

## Objectif cible (vision)
Construire une base documentaire **navigable par humain + LLM + Obsidian**, avec séparation stricte :
- `Ressources/` = sources primaires (PDF/TXT)
- `raw/` = conversion Markdown intégrale (ingestion)
- `wiki/` = compilation LLM (synthèses)

## État actuel (2026-04-03)
- Arborescence cible recréée (`raw/`, `wiki/`, `Antoine-Immobilier/_TEMPLATE_RESIDENCE/`, `Résidences/`, `Livrables/`, `Notes/Brut/`).
- Fichiers templates opérationnels présents et utilisables.
- Prompts Projects Claude présents et exploitables.
- Ressources RAG classées (lois, financement, contexte local, guides).
- Ingestion `raw/` encore à démarrer en lot document par document.

## TODO priorisé (destination finale)

### P0 — critique (à lancer immédiatement)
- [ ] Ingestion `raw/lois/loi-65-557-consolidee-2026-04.md` (contenu intégral, article par article).
- [ ] Ingestion `raw/lois/decret-67-223-consolide-2026-04.md` (contenu intégral, article par article).
- [ ] Ingestion `raw/lois/convention-irsi-2026-04.md`.
- [ ] Ingestion des 3 guides financement prioritaires vers `raw/financement/` (MPRc, CEE, Éco-PTZ).
- [ ] Mise à jour `INDEX.md` après chaque document ingéré.

### P1 — haute
- [ ] Ingestion notes Granola en verbatim vers `raw/notes-terrain/`.
- [ ] Ingestion pathologies bâtiment vers `raw/pathologies/`.
- [ ] Ingestion jurisprudence Cass. 3e civ. vers `raw/jurisprudence/`.

### P2 — normale
- [ ] Lancer une passe pilote de compilation `raw/` → `wiki/` (un lot restreint).
- [ ] Ajouter liens Markdown pour navigation Obsidian.
- [ ] Ajouter procédure de contrôle qualité YAML + nommage + anti-doublons.

## Règles de fonctionnement à ne pas casser
1. Ne jamais éditer `wiki/` à la main.
2. Zéro résumé en `raw/` (contenu intégral).
3. Nommage systématique en kebab-case explicite (+ date si utile).
4. Métadonnées YAML obligatoires pour chaque fichier `raw/`.
5. Mettre à jour `INDEX.md` à chaque ingestion.

## Signal opérationnel
Le repo est **prêt pour démarrer le batch d’ingestion** dès réception des documents source (PDF/TXT/notes).
