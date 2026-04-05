---
title: "Théorie des jeux appliquée à la copropriété"
category: concept
tags: [théorie-des-jeux, négociation, gouvernance, assemblée-générale, coopération, charges]
created: 2026-04-04
updated: 2026-04-04
compile_enriched: 2026-04-04
source: "raw/stock/204508515-theorie-des-jeux.md (Wasmer, Principes de microéconomie, Pearson, 2010, chap. 17)"
status: draft
---

# Théorie des jeux appliquée à la copropriété

## Définition

La théorie des jeux est une branche de l'économie et des mathématiques qui analyse les **interactions stratégiques** entre agents rationnels : chaque acteur prend ses décisions en tenant compte des réactions probables des autres, qui font de même. Ce cadre analytique, formalisé notamment par John Nash (prix Nobel 1994 avec Reinhart Selten et John Harsanyi), offre des outils puissants pour comprendre les dynamiques de gouvernance en copropriété.

Les premiers développements majeurs remontent à la RAND Corporation (créée en 1945 par l'US Air Force), où des chercheurs comme Von Neumann, Kenneth Arrow (Nobel 1972) et Paul Samuelson (Nobel 1970) ont formalisé ces outils dans le contexte de la guerre froide et de la dissuasion nucléaire. Le contexte de la copropriété, bien que moins dramatique, relève de la même logique : un petit nombre d'acteurs interdépendants devant prendre des décisions collectives.

> Le rapport de la commission d'enquête sénatoriale de 2024 sur la paupérisation des copropriétés l'énonce explicitement : « la copropriété est une petite démocratie dans laquelle l'intérêt immédiat de chacun peut être de ne pas coopérer, mais où l'intérêt de tous est que chacun coopère au bien commun. »

## Concepts fondamentaux

### L'équilibre de Nash

Un **équilibre de Nash** est une situation dans laquelle chaque acteur choisit sa meilleure réponse compte tenu de la stratégie des autres, sans qu'aucun n'ait intérêt à dévier individuellement.

Ses trois propriétés clés :
- **Rationalité** — repose sur la maximisation de l'intérêt individuel
- **Spontanéité** — se produit sans intervention extérieure
- **Stabilité** — une fois atteint, personne ne souhaite en sortir

Limite essentielle : l'équilibre de Nash est **fréquemment sous-optimal au sens de Pareto** — il existe souvent une situation meilleure pour tous que l'équilibre spontanément atteint. C'est la différence fondamentale avec l'équilibre de marché en concurrence parfaite (la « main invisible » d'Adam Smith), qui est à la fois spontané, stable et Pareto-optimal. L'équilibre de Nash, lui, peut être spontané et stable tout en étant inefficace : c'est cette tension entre rationalité individuelle et rationalité collective qui fonde l'intérêt de la théorie pour la copropriété.

De plus, contrairement à l'équilibre de marché (généralement unique), il existe fréquemment **plusieurs équilibres de Nash** : l'équilibre atteint dépend alors des croyances et des anticipations des agents. En copropriété, cela signifie que modifier les croyances des copropriétaires (par l'information, la transparence, la communication) peut suffire à faire basculer la situation vers un équilibre plus favorable.

### Le dilemme du prisonnier

Le jeu le plus célèbre pour illustrer la tension entre intérêt individuel et intérêt collectif. Deux joueurs peuvent choisir de **coopérer** ou de **faire défection**. Par raisonnement rationnel, chacun a individuellement intérêt à faire défection — quelle que soit la stratégie de l'autre. Résultat : les deux font défection et se retrouvent dans une situation pire que s'ils avaient coopéré.

**Application directe en copropriété** : le non-paiement des charges, l'absentéisme aux assemblées générales, le refus de voter des travaux nécessaires sont des comportements de défection rationnels à court terme mais collectivement destructeurs.

On peut représenter le dilemme de l'entretien comme une matrice de gains où chaque copropriétaire choisit entre « contribuer » (C) et « ne pas contribuer » (D). La stratégie D est dominante individuellement (on bénéficie de l'entretien sans en supporter le coût), mais le résultat collectif (D,D) — dégradation de l'immeuble — est pire pour tous que la coopération (C,C).

### Les jeux répétés et le Folk Theorem

Quand la relation entre les mêmes acteurs se répète dans le temps (comme en copropriété où les copropriétaires coexistent sur le long terme), la coopération peut émerger spontanément :
- Un copropriétaire sait que son comportement aujourd'hui influence la réaction des autres demain
- La menace de « rétorsion » (ex. : refus de voter des améliorations profitant au mauvais payeur) incite à respecter les règles

Stratégie clé : le **Tit-for-Tat** (« donnant-donnant ») — coopérer d'abord, puis reproduire le comportement de l'autre. Cette stratégie simple est remarquablement efficace dans les simulations de jeux répétés.

### Les expériences d'Axelrod

Robert Axelrod (université du Michigan) a organisé dans les années 1970-1980 des tournois informatiques où des programmes représentant différentes stratégies s'affrontaient dans un dilemme du prisonnier répété sur 200 parties. Le résultat, publié dans *Nature* (1981) puis dans *The Evolution of Cooperation* (1984), a eu un retentissement considérable :

- Le programme **Tit-for-Tat** (4 lignes de code, soumis par le psychologue Anatol Rapoport) a gagné les deux tournois successifs, battant des programmes bien plus sophistiqués (jusqu'à 77 lignes).
- Les programmes « nice » (qui ne font jamais défection en premier) se sont classés parmi les 7 premiers sur 15.
- Le programme « Permanent Retaliation » (rancunier : il ne pardonne jamais) s'est classé dernier des « nice » — le **pardon** est payant.

**Quatre leçons d'Axelrod pour la copropriété :**
1. Ne soyez pas envieux — ne cherchez pas à « gagner » plus que l'autre copropriétaire, mais à bâtir la coopération
2. Ne soyez pas le premier à faire défection — commencez par coopérer
3. Rendez la pareille — punissez les comportements non coopératifs (recouvrement des impayés, mise en demeure)
4. Ne soyez pas trop « intelligent » — les stratégies trop sophistiquées ou manipulatrices sont moins efficaces que la transparence

### Les normes sociales comme correcteur

Kenneth Arrow a montré que des **normes sociales** émergent spontanément quand le marché est défaillant : le sentiment de culpabilité de celui qui dévie de la norme peut restaurer la coopération. En copropriété, la pression sociale (regard des voisins, réputation dans l'immeuble) constitue un mécanisme informel de maintien de la coopération, particulièrement efficace dans les petites copropriétés. Cependant, cette norme est fragile : si trop de copropriétaires font défection, l'effet normatif disparaît et un équilibre de non-coopération peut s'installer durablement.

### Le jeu de l'ultimatum et les rénovations

Dans le **jeu de l'ultimatum**, un joueur propose un partage et l'autre peut l'accepter ou le rejeter (auquel cas personne ne reçoit rien). La théorie prédit une offre minimale, mais les expériences montrent que les offres tournent autour de 45 % et que les offres jugées « injustes » sont rejetées dans 7 % des cas. En copropriété, cela explique pourquoi une répartition des charges perçue comme équitable est essentielle au vote favorable des travaux, même si la répartition est légalement correcte.

## Applications en copropriété

### 1. Le problème de l'entretien des parties communes

Situation typique de **bien commun** (ou « tragédie des communs ») : chaque copropriétaire bénéficie des parties communes mais supporte le coût des travaux. L'incitation individuelle est de différer les dépenses en espérant que les autres votent les travaux (comportement dit de « passager clandestin »).

Conséquences observées :
- Reports répétés de travaux d'entretien indispensables
- Dégradation accélérée du bâti
- Spirale de dévalorisation (copropriétés en difficulté)

Mécanismes correcteurs :
- **Fonds travaux obligatoire** (loi ALUR, art. 14-2) — force l'épargne collective préventive
- **Plan pluriannuel de travaux** — horizon temporel long réduisant l'incertitude
- **Majorité qualifiée** pour certains travaux — empêche un blocage par une minorité

### 2. L'absentéisme aux assemblées générales

L'absentéisme est rationnel individuellement (coût du déplacement et du temps > bénéfice marginal d'un vote) mais collectivement nuisible : quorum non atteint, décisions bloquées, copropriété en impasse.

Ce phénomène s'aggrave dans les grandes copropriétés (chaque copropriétaire se sent moins influent) et dans les ensembles immobiliers complexes à intérêts divergents.

Solutions possibles :
- Vote par correspondance et par voie électronique (loi ELAN 2018)
- Délégation facilitée
- Information préalable plus accessible

### 3. La négociation syndicat/prestataires

La théorie de la **négociation de Nash** (1950) identifie la solution optimale dans une négociation bilatérale : la valeur de la menace de rupture (BATNA — meilleure alternative à l'accord négocié) de chaque partie détermine son pouvoir de négociation.

En copropriété :
- Le syndicat a intérêt à maintenir une **mise en concurrence effective** des prestataires (syndics, entreprises de travaux, ascensoristes) pour renforcer son pouvoir de négociation
- La mise en concurrence systématique du contrat de syndic (loi ALUR) s'inscrit dans cette logique
- L'absence d'alternatives crédibles (un seul prestataire pour certains travaux spécialisés) affaiblit structurellement la position du syndicat

### 4. Le vote des travaux — problème de coordination

Quand plusieurs copropriétaires ont des positions différentes sur des travaux (favorables, opposés, indifférents), on est face à un problème de **coordination** : plusieurs équilibres sont possibles, et l'équilibre atteint dépend des croyances et des attentes.

Outils de coordination :
- Le **conseil syndical** comme instance de délibération préalable
- Les **réunions d'information** avant l'AG, qui modifient les croyances et convergent vers un équilibre coopératif
- La **transparence comptable** qui réduit l'asymétrie d'information entre syndic et copropriétaires

### 5. Les copropriétaires désinvestis ou malveillants

La commission sénatoriale de 2024 identifie deux catégories problématiques :
- **Copropriétaires précaires** — incapables de payer leurs charges (contrainte budgétaire, non pure défection)
- **Bailleurs indélicats / marchands de sommeil** — font délibérément défection (maximisent leur rendement locatif au détriment du collectif)

Pour les seconds, seule une réponse coercitive externe (procédures judiciaires, administrateur provisoire, ORCOD) peut rétablir la coopération, car la logique de jeu répété ne fonctionne plus : leur horizon temporel est court et ils n'ont pas d'intérêt résidentiel dans l'immeuble.

## Implications pour la gouvernance

| Problème de jeu | Mécanisme correcteur en copropriété |
|----------------|-------------------------------------|
| Défection sur l'entretien | Fonds travaux obligatoire, PPT |
| Passager clandestin | Charges obligatoires, recouvrement judiciaire |
| Absentéisme AG | Vote à distance, délégation |
| Blocage décisionnel | Majorités allégées (loi ALUR/ELAN) |
| Pouvoir excessif d'un prestataire | Mise en concurrence obligatoire |
| Asymétrie d'information | Transparence comptable, droit d'accès aux documents |
| Bailleurs malveillants | Administrateur provisoire, ORCOD |

## Limites du modèle

- Les copropriétaires ne sont pas toujours pleinement rationnels ni parfaitement informés — la théorie suppose un **common knowledge** (chacun sait que l'autre est rationnel, sait que l'autre le sait, etc.) qui n'est jamais parfaitement réalisé en pratique
- La théorie des jeux suppose des préférences stables ; en copropriété, les conflits de valeur (esthétique, usage, voisinage) compliquent les matrices de gains
- La coopération émergente est fragile : un choc exogène (crise économique, sinistre) peut la détruire durablement
- Comme le souligne Axelrod : « mieux vaut ne pas suivre aveuglément les prédictions de la théorie des jeux » — dans les jeux répétés de la vie réelle, la coopération émerge plus facilement que ne le prédit la théorie pure
- La difficulté de faire émerger la coopération croît avec le **nombre de joueurs** : une copropriété de 200 lots est structurellement plus exposée à la défection qu'une copropriété de 10 lots

## Références bibliographiques

- Wasmer E., *Principes de microéconomie*, Pearson, 2010, chapitre 17
- Axelrod R., *The Evolution of Cooperation*, Basic Books, 1984
- Nash J., « Equilibrium Points in N-person Games », *PNAS*, 1950
- Nash J., « The Bargaining Problem », *Econometrica*, avril 1950
- Eber N., *Théorie des jeux*, Dunod
- Arrow K., *Social Choice and Individual Values*, Wiley, 1951

## Voir aussi

- [[assemblee-generale]]
- [[charges-copropriete]]
- [[copropriete-en-difficulte]]
- [[fonds-travaux]]
- [[plan-pluriannuel-travaux]]
- [[syndicats-bien-commun-rapport]]
- [[conseil-syndical]]
