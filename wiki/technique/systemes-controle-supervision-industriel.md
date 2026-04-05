---
title: "Systèmes de contrôle et supervision industriels (SCADA) — stub"
category: technique
tags: [SCADA, supervision, automates, capteurs, systèmes-industriels, GTB]
created: 2026-04-04
updated: 2026-04-04
compile_enriched: 2026-04-04
source: "raw/stock/501302963-systemes-de-controle-industriel.md"
status: stub
---

# Systèmes de contrôle et supervision industriels (SCADA)

## Source

Cours du Pr. Hicham Jakjoud (EMSI, Maroc) sur les systèmes de contrôle industriel (nouvelles technologies). Ce document est un cours académique général sur les architectures SCADA, sans lien direct avec la copropriété.

## Pertinence marginale pour la copropriété

Ce document n'est pas directement applicable au contexte de la copropriété. Cependant, certains de ses concepts éclairent la **Gestion Technique du Bâtiment (GTB)** et la **Gestion Technique Centralisée (GTC)** présentes dans les grandes copropriétés ou résidences services :

- **Capteurs et actionneurs** — les équipements techniques d'un immeuble (ascenseurs, chaufferie, éclairage des parties communes, contrôle d'accès, alarmes incendie) fonctionnent selon des principes similaires aux systèmes industriels décrits
- **Supervision** — une GTB centralise la surveillance de ces équipements, génère des alertes et peut automatiser certaines actions
- **Risques cyber** — les systèmes de supervision connectés (télémaintenance des ascenseurs, GTB sur IP) sont exposés aux vulnérabilités décrites dans le cours SCADA

## Structure d'un système industriel (applicable à la GTB)

Un système de contrôle comprend :
1. Des **actionneurs** (moteurs, vannes, interrupteurs) et leur interface de puissance (distributeur, variateur de vitesse)
2. Une **instrumentation** (capteurs, conditionneurs, filtres, convertisseurs analogique-numérique) — assurant la mise en forme des signaux issus des capteurs
3. Un **système de commande** (automate programmable PLC, PC industriel) — élabore les lois de commande en fonction des consignes et des mesures
4. Un **système de supervision** (interface opérateur, historisation, alarmes) — fournit des vues de synthèse et des vues spécialisées sur l'état du système

## Composants d'un système de supervision

Un système de supervision se compose de quatre modules (source : Pr. Jakjoud, EMSI) :

| Module | Fonction | Équivalent GTB en copropriété |
|--------|----------|-------------------------------|
| Acquisition et traitement | Recueille les signaux physiques du procédé | Sondes de température, compteurs d'énergie |
| Commande temps réel | Élabore les commandes selon les consignes | Régulateur de chauffage, programmateur horaire |
| Contrôle | Surveillance, déclenchement d'alarmes, procédures de sécurité | Alertes panne ascenseur, détection incendie |
| Visualisation-stockage | Affichage et historisation des données | Tableau de bord énergie, historique des consommations |

En situation normale, le système présente des vues de synthèse et des vues spécialisées. Les modules de contrôle génèrent des **alarmes hiérarchisées** enregistrées dans un journal. L'enjeu de l'interface homme-machine est de rendre l'information exploitable sans submerger l'opérateur.

## Types de systèmes de contrôle industriel (ICS)

| Type | Description | Pertinence copropriété |
|------|-------------|----------------------|
| **SCADA** (Supervisory Control and Data Acquisition) | Contrôle, supervision et acquisition de données à distance | Télésurveillance ascenseurs, chaufferie |
| **DCS** (Distributed Control System) | Système de contrôle distribué pour procédés continus | Chaufferie urbaine raccordée |
| **PLC** (Programmable Logic Controller) | Automate programmable pour contrôle local | Automate de chaufferie, contrôle d'accès |
| **GTC** (Gestion Technique Centralisée) | Surveillance d'équipements ou de locaux | Copropriétés tertiaires ou grandes résidences |
| **SNCC** | Système numérique de contrôle-commande | Procédés continus (chauffage urbain) |

## Risques et vulnérabilités

Les systèmes de supervision connectés (télémaintenance des ascenseurs, GTB sur IP) sont exposés à trois catégories de risques industriels transposables :

- **Risque de panne** — défaillance des capteurs, perte de communication avec les automates
- **Risque cyber** — intrusion dans les systèmes de contrôle connectés (accès non autorisé à la GTB, prise de contrôle d'équipements à distance)
- **Risque humain** — erreur de paramétrage, manipulation non autorisée des consignes

Les mesures de protection incluent : segmentation réseau, authentification des accès distants, mises à jour régulières des firmwares, audits de sécurité périodiques.

## À développer si pertinent

Si la copropriété dispose d'une GTB ou envisage d'en installer une, ce sujet mérite un article dédié sur :
- Les bénéfices en termes de gestion énergétique
- Les contrats de maintenance des systèmes GTB
- Les risques de cybersécurité
- L'interopérabilité avec les systèmes des prestataires (ascensoristes, chauffagistes)

## Voir aussi

- [[fonctionnement-ascenseur]]
- [[securite-incendie-copropriete]]
- [[diagnostic-technique-global]]
