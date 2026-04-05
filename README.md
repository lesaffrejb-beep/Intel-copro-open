# copro-intel — LLM Knowledge Base (Syndic)

Base de connaissances personnelle pour capitaliser les apprentissages métier en gestion de copropriété (stage dans un cabinet syndic), avec workflow quotidien piloté par Markdown + Git + Claude Code.

## Objectifs
1. Ne rien oublier : procédures, erreurs, cas terrain, jurisprudence.
2. S'entraîner en continu : quiz ciblés sur erreurs et sujets faibles.
3. Construire un actif professionnel portable et versionné.
4. Structurer une pratique "humble et rigoureuse" : chaque affirmation juridique est sourcée ou marquée **[À VÉRIFIER]**.

## Structure utile
- `raw/` : sources brutes (transcriptions Granola, droit, procédures, cas, formation).
- `wiki/` : connaissances compilées (concepts, procédures, erreurs, templates, glossaire, index).
- `scripts/` : scripts Bash sans dépendance externe.
- `prompts/` : prompts prêts à l'emploi pour Claude Code.
- `outputs/` : rapports générés (lint, revues hebdo).

## Workflow quotidien
1. **Matin** : relire 2-3 articles wiki sur les sujets du jour.
2. **Pendant la journée** : Granola capte réunions / appels / RDV.
3. **Soir (trajet ~20 min)** : récap vocal de la journée via Granola.
4. **Soir (maison)** :
   - exporter les transcriptions dans `raw/transcripts/` ;
   - lancer `./scripts/ingest.sh <fichier>` ;
   - exécuter le prompt généré dans Claude Code ;
   - **appliquer `prompts/file-back.md` sur les réponses obtenues** ;
   - commit + push.

## Boucle de capitalisation (core loop)

Chaque échange avec un agent enrichit le wiki. Ne pas laisser une réponse disparaître sans la verser.

```
Question → prompts/qa-agent.md → Réponse → prompts/file-back.md → Wiki enrichi
```

Pour toute question complexe :
```bash
# 1. Ouvrir Claude Code et charger le prompt
cat prompts/qa-agent.md

# 2. Écrire la question dans le prompt, exécuter
# 3. Une fois la réponse obtenue, appliquer le file-back
cat prompts/file-back.md
# Coller la réponse à la fin du prompt, exécuter
```

## Workflow hebdomadaire (vendredi soir ou dimanche)
1. `./scripts/lint.sh` puis corriger.
2. `./scripts/weekly-review.sh` puis lire le rapport.
3. `./scripts/quiz.sh --week` pour s'entraîner.
4. commit + push.

## Workflow mensuel
1. Quiz complet : `./scripts/quiz.sh`
2. Revue des erreurs récurrentes.
3. Identification des zones faibles.
4. Mise à jour du plan d'apprentissage.

## Sources de données
- Granola : transcriptions meetings/RDV/récaps.
- Documents internes : procédures cabinet (scan/OCR si nécessaire).
- Textes légaux : Loi 65-557, Décret 67-223, jurisprudence, conventions.
- Formation : cursus en gestion de patrimoine immobilier.
- Veille réglementaire et métier.

## Intégration outils
- **Obsidian** : ouvrir `wiki/` comme vault.
- **Google Drive** : stocker les gros fichiers (PDF/plans) et référencer le lien dans `source:`.
- **Claude Code (web)** : exécution des prompts de compilation/lint/quiz.
- **Git/GitHub** : historique complet de progression.

## Démarrage rapide
```bash
chmod +x scripts/*.sh
./scripts/ingest.sh raw/transcripts/exemple.md
./scripts/lint.sh
./scripts/weekly-review.sh
./scripts/quiz.sh --week

# Catalogue des sources (suivi ingestion des PDFs)
./scripts/sources-catalog.sh

# Rendu Marp slides
./scripts/render.sh wiki/concepts/syndic-role.md --all-slides
./scripts/render.sh wiki/procedures/convocation-ag.md --summary
```

## Données sensibles

> **Le dossier `wiki/meta/` a été supprimé pour la publication open-source.**
>
> Il contenait des notes de contexte organisationnel propres au cabinet
> (culture, interlocuteurs, prestataires). Si vous forkez ce repo pour votre
> propre cabinet, recréez-le avec vos données internes.

## Contraintes techniques
- UTF-8, Markdown strict, compatible Obsidian + GitHub.
- Scripts en Bash pur + git uniquement.
- Pas d'appel API automatique : les scripts génèrent des prompts texte.
- Fonctionnement offline (hors utilisation interactive de Claude Code).
- Repo léger (<100 Mo), gros médias sur Drive.

## Remerciements

Ce projet s'est construit sur les épaules de géants. Voir
[ACKNOWLEDGMENTS.md](ACKNOWLEDGMENTS.md) pour la liste complète des personnes,
repos, sources et idées qui ont rendu ce wiki possible.
