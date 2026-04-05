---
title: "Sources de jurisprudence fiables pour le RAG copropriété"
category: jurisprudence
tags: [jurisprudence, rag, qualite-des-sources, copropriete, assemblee-generale, charges, travaux, syndic, sinistres]
created: 2026-04-03
updated: 2026-04-04
source: "raw/jurisprudence/sources-prioritaires-rag-copropriete-2026-04-03.md"
status: draft
---

# Objectif
Construire un corpus jurisprudence avec un niveau de confiance **très élevé** pour les réponses métier syndic.

---

# Sources à intégrer en priorité

## Niveau A — Sources officielles

### 1) Légifrance (officiel)
- Loi n° 65-557 du 10 juillet 1965 : https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000880200/
- Décret n° 67-223 du 17 mars 1967 : https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000881458/
- Portail codes consolidés : https://www.legifrance.gouv.fr/codes
- Codes utiles : civil, assurances, Code de la construction et de l'habitation (CCH), CPCE

### 2) Cour de cassation (officiel)
- Site officiel : https://www.courdecassation.fr/
- Bulletin civil (3e chambre civile, principalement) : https://www.courdecassation.fr/publications/bulletin-des-arrets-des-chambres-civiles

### 3) Judilibre (open data jurisprudence)
- Moteur de recherche : https://judilibre.search.cassation.fr/

### 4) Compléments institutionnels (rang 2)
- Service-Public (guides pratiques) : https://www.service-public.fr/particuliers/vosdroits/N313
- ANAH (aides, rénovation) : https://www.anah.gouv.fr/
- BOFiP (aspects fiscaux)

## Niveau B — Sources secondaires (support, jamais seules)
- ANIL / ADIL
- Revues professionnelles : AJDI (Actualité Juridique Droit Immobilier), Loyers & Copropriété
- Bases privées : Dalloz, LexisNexis, Doctrine.fr — uniquement si recoupées avec source officielle

---

# Mode d'ajout dans le repo (standard RAG)
1. Télécharger/exporter la source dans `Ressources/RAG/<domaine>/`.
2. Convertir vers `raw/` avec `./scripts/ingest.sh <fichier>`.
3. Créer/mettre à jour les articles wiki liés.
4. Renseigner `source:` dans le frontmatter vers le fichier `raw/...`.
5. Ajouter backlinks dans **Voir aussi**.

---

# Schéma minimal de fiche d'arrêt (obligatoire)
Chaque décision intégrée au corpus doit renseigner :
- **Juridiction** (Cour de cassation, Cour d'appel + ville, TJ)
- **Chambre** (ex. : 3e civ.)
- **Date**
- **N° de pourvoi** (ou RG pour les juridictions du fond)
- **Problème juridique**
- **Solution** (cassation / rejet / confirmation)
- **Portée pratique syndic**
- **Textes visés** (article précis de la loi 1965, décret 1967, code civil, etc.)
- **Lien officiel**

---

# Jurisprudence par thème

## 1. Assemblée générale (AG)

### Principes généraux
Textes de référence : loi n° 65-557, art. 42 al. 1 (délai de contestation 2 mois) ; décret n° 67-223, art. 9 à 18-1 (convocations, ordre du jour).

**Règle fondamentale (délai de contestation)**
- **Cass. 3e civ., jurisprudence constante** — Le délai de deux mois pour contester une décision d'AG court à compter de la **notification** du procès-verbal aux copropriétaires opposants ou défaillants (art. 42 al. 1 loi 1965). Passé ce délai, la décision est définitive.
- Application pratique : le syndic doit notifier le PV sans délai après l'AG ; tout retard peut allonger la période de fragilité juridique des décisions.

**Convocation et ordre du jour**
- La jurisprudence exige que toutes les questions soumises au vote figurent à l'ordre du jour joint à la convocation. Une question ajoutée en séance ou insuffisamment libellée encourt la nullité du vote (Cass. 3e civ., position constante). [À VÉRIFIER sur arrêt précis]
- Application pratique : le conseil syndical doit vérifier la complétude de l'ordre du jour avant envoi.

**Majorités**
- Les décisions prises à une majorité inférieure à celle requise par la loi sont nulles de plein droit (loi 1965, art. 24 à 26). L'erreur de majorité est l'un des motifs de contestation les plus fréquents.

---

## 2. Charges de copropriété

### Textes de référence
- Loi 1965, art. 10 (répartition des charges selon quote-part) ; art. 10-1 (charges spéciales) ; art. 14-1 (fonds de prévoyance / travaux).
- Décret 1967, art. 35 et s. (recouvrement).

**Critère d'utilité objective**
- **Cass. 3e civ.** — La répartition des charges de copropriété repose sur le critère d'**utilité objective** des parties communes ou services pour chaque lot, et non sur l'usage effectif par le copropriétaire (loi 1965, art. 10). Un copropriétaire ne peut se soustraire à une charge au motif qu'il n'utilise pas le service correspondant (ex. : ascenseur, espaces verts). [À VÉRIFIER sur arrêt précis]
- Application pratique : la grille de répartition inscrite au règlement de copropriété prime ; toute modification requiert l'unanimité ou une décision judiciaire.

**Recouvrement des charges impayées**
- Le syndicat dispose d'un **privilège immobilier spécial** sur le lot du copropriétaire débiteur (loi 1965, art. 19 et 19-1). Ce privilège prime sur la plupart des autres créanciers.
- La procédure de recouvrement peut être accélérée par une injonction de payer (CPCE) ou une action au fond. Le syndic peut agir sans autorisation préalable d'AG pour les actes conservatoires (Cass. 3e civ., position constante).
- Voir aussi : [[prescription-privileges-copropriete]]

**Contestation de la grille de répartition**
- Toute demande de révision de la répartition des charges s'effectue par voie judiciaire (art. 12 loi 1965). La prescription est de 5 ans (art. 2224 code civil) à compter de la connaissance des faits fondant la demande.

---

## 3. Travaux en copropriété

### Textes de référence
- Loi 1965, art. 24 (travaux d'entretien, majorité simple) ; art. 25 (travaux d'amélioration, majorité absolue) ; art. 26 (travaux de transformation, double majorité) ; art. 9 (travaux privatifs affectant parties communes).

**Travaux privatifs affectant les parties communes**
- **Cass. 3e civ., jurisprudence constante** — Tout copropriétaire souhaitant réaliser des travaux dans son lot qui affectent les parties communes ou l'aspect extérieur de l'immeuble **doit obtenir l'autorisation préalable de l'AG** (loi 1965, art. 9 al. 2). Les travaux réalisés sans autorisation peuvent être ordonnés en démolition/remise en état aux frais du copropriétaire.
- Application pratique : le syndic doit refuser d'entériner tout travail privatif affectant parties communes sans vote préalable ; en cas de litige, il peut saisir le juge en référé.

**Responsabilité décennale et dommages-ouvrage en copropriété**
- Le syndicat des copropriétaires a qualité pour agir contre les constructeurs sur le fondement de la garantie décennale (art. 1792 code civil) pour les désordres affectant les parties communes (Cass. 3e civ., position constante).
- L'assurance dommages-ouvrage (DO) doit être souscrite par le maître d'ouvrage (le syndicat) pour tous travaux soumis à permis de construire ou affectant la solidité de l'ouvrage (loi du 4 janvier 1978).
- Application pratique : vérifier la souscription de la DO avant le démarrage du chantier ; conserver les attestations d'assurance. Voir aussi : [[assurances-copropriete]]

**Plan pluriannuel de travaux (PPT)**
- Obligation introduite par la loi Climat-Résilience (2021) pour les copropriétés de plus de 15 ans. Voir [[plan-pluriannuel-travaux]].

---

## 4. Responsabilité du syndic

### Textes de référence
- Loi 1965, art. 18 (missions du syndic) ; art. 18-1 A (contrat syndic) ; loi Hoguet n° 70-9 (carte professionnelle) ; décret n° 2015-342 (contrat de syndic type).

**Faute de gestion du syndic**
- **Cass. 3e civ., jurisprudence constante** — Le syndic engage sa **responsabilité civile** s'il manque à ses obligations légales et contractuelles : défaut d'entretien, non-souscription des assurances obligatoires, non-recouvrement des charges, dépassement de mandat. La faute doit être prouvée par celui qui l'invoque.
- Application pratique : le conseil syndical doit exercer son contrôle (art. 21 loi 1965) et consigner ses observations. En cas de faute grave, l'AG peut révoquer le syndic et/ou saisir le tribunal.

**Dépassement de mandat**
- Le syndic ne peut engager de dépenses supérieures au budget voté, sauf urgence avérée (art. 18 loi 1965). Tout dépassement non justifié par l'urgence engage sa responsabilité personnelle.
- Application pratique : les devis et appels d'offres doivent être présentés à l'AG avant engagement des travaux importants.

**Action en responsabilité contre le syndic**
- L'action appartient au syndicat (représenté par le conseil syndical lors d'un conflit d'intérêts) ou à tout copropriétaire à titre individuel pour un préjudice personnel. Délai de prescription : 5 ans (art. 2224 code civil). [À VÉRIFIER]

---

## 5. Sinistres et assurances en copropriété

### Textes de référence
- Loi 1965, art. 14 al. 3 (obligation d'assurance du syndicat) ; convention IRSI (applicable depuis 2018 pour dégâts des eaux) ; convention CIDRE (incendies).

**Responsabilité du syndicat pour dommages aux parties communes**
- **Cass. 3e civ., jurisprudence constante** — Le syndicat est responsable des dommages causés aux copropriétaires ou aux tiers du fait des parties communes (loi 1965, art. 14). Cette responsabilité est de plein droit, sans qu'il soit besoin de prouver une faute ; le syndicat peut s'exonérer en prouvant la force majeure ou la faute de la victime.
- Application pratique : l'assurance multirisque immeuble (MRI) couvre ce risque ; vérifier les franchises et les exclusions annuellement.

**Convention IRSI (dégâts des eaux)**
- La convention IRSI (Indemnisation et Recours des Sinistres Immeuble) simplifie la gestion des sinistres en copropriété. En dessous de 5 000 € HT, l'assureur de l'occupant sinistré gère et indemnise, sans recours entre assureurs.
- Application pratique : le syndic doit déclarer le sinistre dans les 5 jours ouvrés et fournir les éléments d'identification des assureurs en cause. Voir aussi : [[degat-des-eaux-irsi]]

**Troubles anormaux de voisinage**
- Le syndicat et les copropriétaires peuvent engager leur responsabilité sur le fondement des troubles anormaux de voisinage (art. 544 et 1240 code civil), indépendamment de toute faute. La juridiction compétente est le tribunal judiciaire.

---

# Règle d'ingestion qualité (rappel)
- Toujours stocker : juridiction, chambre, date, n° pourvoi, solution, texte visé.
- Toujours conserver le lien officiel source.
- Si doute sur interprétation : marquer [À VÉRIFIER].
- Sources secondaires (ANIL, revues) : jamais utilisées seules.

---

## Voir aussi
- [[copropriete-definition]]
- [[assemblee-generale]]
- [[charges-copropriete]]
- [[plan-pluriannuel-travaux]]
- [[assurances-copropriete]]
- [[degat-des-eaux-irsi]]
- [[prescription-privileges-copropriete]]
- [[syndic-role]]
- [[contrat-syndic]]
- [[travaux-copropriete]]
- [[index]]
