# INDEX.md — Inventaire opérationnel du repo `copro-intel-angers`

> Mise à jour : 2026-04-03
> Format : `chemin | type | statut | description`

## Navigation racine

| Chemin | Type | Statut | Description |
|---|---|---|---|
| `AGENTS.md` | Guide | ✅ Actif | Guide de navigation LLM + conventions du repo |
| `INDEX.md` | Index | ✅ Actif | Inventaire courant du contenu |

## Structure documentaire principale

| Chemin | Type | Statut | Description |
|---|---|---|---|
| `raw/lois/` | Dossier ingestion | ⬜ Prêt | Sources juridiques en Markdown (Loi 65-557, Décret 67-223, IRSI, arrêts) |
| `raw/financement/` | Dossier ingestion | ⬜ Prêt | Aides et financement en Markdown (MPRc, CEE, Éco-PTZ, ANAH) |
| `raw/pathologies/` | Dossier ingestion | ⬜ Prêt | Pathologies bâtiment en Markdown |
| `raw/notes-terrain/` | Dossier ingestion | ⬜ Prêt | Notes Granola brutes en verbatim |
| `raw/jurisprudence/` | Dossier ingestion | ⬜ Prêt | Arrêts Cass. 3e civ. |
| `wiki/concepts/` | Dossier compilé | ⬜ Vide | Synthèses concepts (LLM) |
| `wiki/procedures/` | Dossier compilé | ⬜ Vide | Procédures opérationnelles (LLM) |
| `wiki/financement/` | Dossier compilé | ⬜ Vide | Synthèses financement (LLM) |
| `wiki/technique/` | Dossier compilé | ⬜ Vide | Synthèses techniques (LLM) |

## Templates opérationnels

| Chemin | Type | Statut | Description |
|---|---|---|---|
| `templates/checklist-convocation-AG.md` | Template | ✅ Actif | Checklist convocation AG (J-45 à J-0, références légales) |
| `templates/template-PV-AG.md` | Template | ✅ Actif | Modèle complet de PV d’AG avec tables opposants/défaillants |
| `templates/matrice-urgence-sinistre.md` | Template | ✅ Actif | Matrice délais sinistres / assurance / IRSI |

## Projects Claude

| Chemin | Type | Statut | Description |
|---|---|---|---|
| `projects/juriste-copropriete/README.md` | Doc projet | ✅ Actif | Liste de documents à uploader |
| `projects/juriste-copropriete/SYSTEM_PROMPT.md` | System prompt | ✅ Actif | Prompt juriste copropriété |
| `projects/portefeuille-105-lots/SYSTEM_PROMPT.md` | System prompt | ✅ Actif | Prompt RAG portefeuille |

## Ressources sources (PDF/TXT)

| Chemin | Type | Statut | Description |
|---|---|---|---|
| `Ressources/RAG/lois/` | Sources primaires | ✅ Classé | 35 fichiers (textes légaux et réglementaires) |
| `Ressources/RAG/financement/` | Sources primaires | ✅ Classé | 8 fichiers (crédit, ANAH, audit, PAM) |
| `Ressources/RAG/contexte-local/` | Sources primaires | ✅ Classé | 12 fichiers (Angers/49, marché local) |
| `Ressources/RAG/guides/` | Sources primaires | ✅ Classé | 3 fichiers (guides copropriété) |
| `Ressources/STOCK_SOURCE/` | Sources secondaires | ✅ Classé | 21 fichiers (guides, études, notices techniques, txt) |

## Dossiers opérationnels portefeuille

| Chemin | Type | Statut | Description |
|---|---|---|---|
| `Antoine-Immobilier/_TEMPLATE_RESIDENCE/01_RCP/` | Template dossier | ⬜ Vide | Règlement + modificatifs |
| `Antoine-Immobilier/_TEMPLATE_RESIDENCE/02_PV_AG/` | Template dossier | ⬜ Vide | PV d’assemblées générales |
| `Antoine-Immobilier/_TEMPLATE_RESIDENCE/03_Contrats/` | Template dossier | ⬜ Vide | Contrats syndic/prestataires |
| `Antoine-Immobilier/_TEMPLATE_RESIDENCE/04_Assurance/` | Template dossier | ⬜ Vide | Polices et sinistres |
| `Antoine-Immobilier/_TEMPLATE_RESIDENCE/05_Budget/` | Template dossier | ⬜ Vide | Budgets / annexes comptables |
| `Antoine-Immobilier/_TEMPLATE_RESIDENCE/06_Sinistres_en_cours/` | Template dossier | ⬜ Vide | Dossiers sinistres actifs |
| `Résidences/` | Dossier opérationnel | ⬜ Vide | Espace libre pour résidences hors Antoine Immobilier |
| `Livrables/` | Dossier livrables | ⬜ Vide | Rapports, présentations, mémoires |

## Pilotage

| Chemin | Type | Statut | Description |
|---|---|---|---|
| `Notes/Brut/` | Dossier notes | ⬜ Vide | Entrée notes Granola et notes de terrain non triées |
| `Notes/Débriefs/roadmap-destination-repo-2026-04-03.md` | Roadmap | ✅ Actif | TODO priorisé pour ingestion et compilation |

## Légende

- ✅ : en place et utilisable
- ⬜ : créé mais à alimenter
