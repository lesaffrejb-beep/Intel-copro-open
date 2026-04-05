---
source_file: "Ressources/STOCK_SOURCE/501302963-Systemes-de-Controle-Industriel.txt"
source_title: "501302963-Systemes-de-Controle-Industriel"
converted: "2026-04-03"
status: compiled
compiled_date: "2026-04-04"
---

SYSTÈMES DE CONTRÔLE INDUSTRIEL
    (NOUVELLES TECHNOLOGIES)
                               Pr. Hicham JAKJOUD
                           hi.jakjoud@emsi-edu.ma
                                                OBJECTIFS DU COURS

 Comprendre le rôle de la supervision dans un environnement industriel


 Survoler les différentes technologies de supervision passées et actuelles


 Appréhender les composants d'un système de supervision et de contrôle industriel (SCADA)


 Analyser les risques d'une architecture SCADA


 Appréhender les menaces et les vulnérabilités


 Identifier les mesures de protection


 Pouvoir, finalement, concevoir un système de supervision dans les règles de l’art
INTRODUCTION GÉNÉRALE
                                         INTRODUCTION GENERALE
 Quelques concepts généraux


     Structure générale d’un système industriel:


          Tout système industriel peut être
           divisé en plusieurs sous systèmes
           interconnectés les uns aux autres

          Chaque sous système possède
           plusieurs actionneurs et capteurs

          A chaque instant ces derniers
           provoquent des changements ou
           envoient des informations sur l’état du
           système,
                                           INTRODUCTION GENERALE
 Quelques concepts généraux:
     Les systèmes industriels sont constitués de quatre parties principales qui sont:
          Un ensemble de sous systèmes destinés à l’accomplissement d’une fonction globale
          Un ensemble de systèmes d’actionnement constitués d’une interface de puissance (distributeur, variateur de
           vitesse, …) et de l’actionneur proprement dit (vérins, moteurs, résistances, …)
          Une instrumentation composée d’un ensemble de chaînes de mesure incluant les capteurs, les conditionneurs, les
           filtres, les CAN… Elles assurent la mise en forme des signaux issus des capteurs
          Un système permettant l’élaboration des lois de commande en fonction des consignes de production et des
           mesures réalisées sur l’ensemble des processus élémentaires
          Chaque sous système du système global peut subir des défauts et être soumis à des perturbations diverses (non
           quantifiables)
                                            INTRODUCTION GENERALE
 Quelques concepts généraux: Les risques industriels (1/2)

      Le risque industriel concerne certains sites industriels tels que

           Des sites de production de matières premières possédant des dangers intrinsèques (inflammabilité, toxique,
            explosif) qui utilisent en entrée ces produits chimiques afin d’en produire d’autres,

           Des sites de transformation de ces matières (dangereuses) en produits non dangereux, directement ou
            indirectement utilisables,

           Des sites de stockage de produits possédant des dangers extrinsèques

           Des sites de distribution (les unités de livraison pour les produits pétroliers par exemple)

     Les sources de dangers ne se situent pas uniquement dans les industries chimiques et pétrolières
                                            INTRODUCTION GENERALE
 Quelques concepts généraux: Les risques industriels (2/2)

     Il existe trois catégories de risques à savoir:

          Le risque toxique dû à la propagation dans l’air, l’eau ou le sol de produits dangereux pour la santé humaine,

          Le risque d’incendie dû à l’inflammation de produits, soit au contact d’autres produits, soit au contact d’une
           flamme ou d’un point chaud

          Le risque d’explosion dû au mélange de certains produits avec d’autres, soit à la libération brutale de gaz, ou
           encore à l’explosion de produits explosifs
                   INTRODUCTION GENERALE
 La supervision
                                           INTRODUCTION GENERALE
 La supervision : en général (1/4)


      La supervision industrielle est utilisée par de nombreux procédés tels que :


           Systèmes de surveillance d’équipements ou de locaux, (GTC pour Gestion Technique Centralisée),


           Systèmes numériques de contrôle-commande (SNCC), principalement pour des procédés de type continu,


           Système de Contrôle, Supervision et Acquisition des Données (SCADA) ;


           Ou finalement systèmes manufacturiers qui regroupent l’ensemble des fonctionnalités du superviseur
                                           INTRODUCTION GENERALE
 La supervision : en général (2/4)

      Suite à l’automatisation industrielle, l’opérateur humain a été contraint de conduire (au sens d’une prédominance de
       l’intervention) ou de superviser (prédominance de la surveillance) des machines automatisées

      Tout en réduisant les prises d’information et les actions directes sur le produit à fabriquer (exemple : centrales
       nucléaires).

      Dans les situations statiques, l’environnement ne change que sous l’effet des actions du sujet (de l’agent cognitif).
       C’est le cas, dans une certaine mesure, du travail de bureau.

      Dans les situations dynamiques, dont relèvent les situations de contrôle de processus, l’environnement change, de plus,
       indépendamment des actions du sujet.

      Ces actions peuvent simplement se combiner à des dynamiques externes.

      Elles peuvent aussi infléchir l’action d’automatismes (exemple : le changement d’une consigne d’épaisseur va conduire
       à transformer un produit sous l’effet des nombreuses opérations automatisées d’un laminoir).
                                             INTRODUCTION GENERALE
 La supervision : en général (3/4)

      Une installation industrielle automatisée s’organise autour de quelques modules principaux prenant en charge
       différentes parties essentielles de l’automatisation

      Composants d’un système de supervision:
          module d’acquisition et de traitement des signaux physiques du
             procédé

          module de commande temps réel qui élabore les commandes en
             fonction des consignes, des signaux acquis et selon des modèles
             de commande prédéfinis

          module de contrôle qui permet de surveiller la commande,
             l’évolution du procédé, de déclencher des procédures de sécurité
             (arrêts d’urgence) ou de prévenir l’opérateur d’une situation
             anormale

          module de visualisation-stockage, qui permet d’obtenir et de
             mettre à la disposition des opérateurs des éléments d’évaluation
             du procédé par ses valeurs instantanées et historiques.
                                            INTRODUCTION GENERALE
 La supervision : en général (4/4)

      En situation normale, le système de supervision présente (sur les synoptiques):

           une ou plusieurs vues de synthèse sur le système industriel,

           une ou plusieurs vues spécialisées sur la phase de l’activité principale en cours et sur les éléments du système
            concerné.

      Les modules de contrôle du système automatisé génèrent des alarmes selon une hiérarchie propre à chaque système.

      Un journal enregistre tous les événements significatifs survenus sur le système pendant que les écrans de contrôle de
       l’opérateur retransmettent les alarmes.

      En dernier lieu, l’opérateur reste seul devant son système et, s’il dispose théoriquement de tous les éléments pour agir,
       en pratique il est facilement débordé par la quantité d’informations qui se
       présente à lui.

      Par ailleurs, la communication homme-machine doit être particulièrement étudiée pour rendre efficace l’interaction
       entre le système d’aide à la supervision et l’opérateur.
                                              INTRODUCTION GENERALE
     La supervision : Evolution des systèmes de contrôle


                              1

2

                                                            3
                                          INTRODUCTION GENERALE
 La supervision : Evolution des systèmes de contrôle (1/20)
    Qu’est ce qu’un système de contrôle industriel?
           Noté ICS (pour Industrial Control System) est un terme général regroupant les différents types de systèmes de
            contrôle tels que:
                Les systèmes SCADA
                Les systèmes DCS (Distributed Control System)
                Les configurations plus petites de systèmes de contrôle tells que les Automates Programmables PLC
                 (Programmable Logic Controllers).
           Les ICS sont typiquement utilisés dans les industries électrique, aquatiques, pétrolières et du gaz, chimiques, de
            transport, pharmaceutiques, du papier, alimentaires, automobile, aérospatiales…
                                             INTRODUCTION GENERALE
 La supervision : Evolution des systèmes de contrôle (2/20)

      Dans les premières usines de traitement, le contrôle-commande des procédés requérait le plus souvent plusieurs
       opérateurs.

      Ceux-ci devaient alors surveiller en permanence chaque unité de traitement, observer de volumineux instruments de
       mesure, installés sur site et manipuler des vannes.

      L’ensemble de l’exploitation de l’usine nécessitait donc couramment des opérateurs venant « visiter » l’usine, tablette à
       la main pour enregistrer nombre de paramètres essentiels.

      À la fin de leur premier passage, des calculs appropriés devaient être réalisés, en vue de la visite suivante, pour ajuster
       les vannes, registres, entraînements et autres éléments finaux,

      Cela impliquait que chaque opérateur développe sa propre sensibilité par rapport au procédé.

      L’un des défis d’une telle gestion d’usine consistait à coordonner les nombreux opérateurs afin qu’ils puissent gérer le
       flux de produit d’un bout à l’autre de l’usine de façon cohérente.

      Du fait de la subjectivité de ce « ressenti » de l’exploitation, les résultats de l’usine pouvaient varier selon les différents
       opérateurs et leurs différents états émotionnels.

      Les délais et autres inefficacités en résultant étaient ainsi les facteurs limitant la productivité de l’usine.
                                            INTRODUCTION GENERALE
 La supervision : Evolution des systèmes de contrôle (3/20)
    Débuts des tableaux de commande locale:
           Avec les progrès technologiques, il est devenu possible de transmettre des signaux pneumatiques.
           La salle de contrôle a ainsi fait son apparition dans les usines les plus importantes
           Les volumineux appareils de mesure ont été placés en un seul lieu, avec quelques dispositifs de contrôle
            commande qui transmettaient les signaux en retour aux vannes les plus proches sur le terrain.
           Différents opérateurs pouvaient alors enregistrer leurs relevés dans un journal et réaliser quelques réglages sur les
            procédés d’exploitation sans devoir se rendre sur les sites.
           Naturellement, il restait nécessaire de visiter l’usine pour régler les vannes, registres et autres éléments finaux les
            plus distants.
                                            INTRODUCTION GENERALE
 La supervision : Evolution des systèmes de contrôle (4/20)
      Débuts des tableaux de commande locale:
           Un concept venait de naître : amener l’usine aux opérateurs plutôt que le contraire.
           Du fait de l’apport de la plupart des informations nécessaires aux opérateurs, les délais de prise de décisions, en
            ont été fortement réduits.
           Il devenait ainsi plus aisé et plus rapide de repérer les interactions entre différentes portions du procédé.
           Tout ceci était réalisé         par   contrôle-commande      et   supervision,   grâce    à   un   câblage      direct   et
            des signaux analogiques.
           L’avantage était qu’il ne fallait pas trop de câblage (ou de canalisations, pour le cas d’installations pneumatiques).
           Mais l’inconvénient était          qu’il   n’existait   qu’une    faible   marge     de   contrôle    commande,          de
            supervision et d’alarme.
                                          INTRODUCTION GENERALE
 La supervision : Evolution des systèmes de contrôle (5/20)
    Des salles de contrôle plus sophistiquées:
           Après la seconde guerre mondiale, les commandes électriques sont devenues plus robustes et pratiques pour un
            usage en environnements industriels.
           De plus nombreuses mesures devenaient alors possibles du fait de la baisse du coût des capteurs.
           De nouveaux types de capteurs et techniques de mesure sont apparus pour permettre l’acquisition des paramètres
            impossibles à mesurer jusqu’alors.
           Aussi, il devenait possible de mesurer un plus grand nombre de paramètres en ligne, plutôt que de prélever des
            échantillons de laboratoire.
           La taille des contrôleurs était plus petite, de sorte qu’un plus grand nombre d’entre eux pouvait tenir sur un
            même tableau et une surface réduite.
           Tout cela a conduit à une salle de commande plus complexe, d’où le besoin d’un câblage plus important vers ce
            lieu,
           Cela présentait des problèmes de gestion des informations pour les opérateurs, outre les défis en termes de
            logistique de gestion du signal pour l’ingénieur d’instrumentation.
                                          INTRODUCTION GENERALE
 La supervision : Evolution des systèmes de contrôle (6/20)
    Commande centrale de l’ordinateur central:
           Les progrès technologiques ont fait baisser les prix des ordinateurs. Ce qui a permis le développement accru des
            salles de commande centralisée.
           Au cours des années 60 - 70, deux types d’ordinateurs pour la commande des procédés sont apparus :
                Commande numérique directe (CND)
                Commande analogique commandée numériquement (DDAC)
                                          INTRODUCTION GENERALE
 La supervision : Evolution des systèmes de contrôle (7/20)
    Commande centrale de l’ordinateur central:
                Commande numérique directe (CND)
                   Avantages :
                                                                        Ordinateur                            Procédés
                          Contrôle commande sophistiqué
                          Acquisition de données et alarme
                     Inconvénients :                                                 Sauvegarde analogique
                         Fiabilité de l’ordinateur
                          Ordinateurs ou contrôleurs redondants
                          Câblage complexe et étendu
                          L’interface homme machine nécessitait des opérateurs de haut niveau
                          Cherté
                Commande analogique commandée numériquement (DDAC)
                                          INTRODUCTION GENERALE
 La supervision : Evolution des systèmes de contrôle (8/20)
    Commande centrale de l’ordinateur central:
                Commande numérique directe (CND)
                                                                                   Ordinateur
                Commande analogique commandée numériquement (DDAC)
                     Avantages :
                        Fiabilité élevée
                          Interface homme – machine appropriée
                          Acquisition de données et alarmes
                          Contrôle commande sophistiqué                       Panneau analogique
                          Redondance complète
                     Inconvénients :
                         Câblage et installation complexes
                          Difficulté à mener des modifications de stratégie
                          Cherté                                                  Procédés
                                           INTRODUCTION GENERALE
 La supervision : Evolution des systèmes de contrôle (9/20)
    Commande centrale de l’ordinateur central:
           Cette salle centrale de contrôle-commande offrait ainsi une image bien plus précise de l’exploitation globale de
            l’usine.
           En revanche, les éléments suivants devenaient très coûteux du fait des :
                Parcours des nombreux câblages de contrôle-commande, chemins de câbles et dispositifs de manutention,
                Conception de l’ingénierie,
                Main d’œuvre relevant de l’installation des lignes et raccordements,
                Problèmes inhérents à une modification de la stratégie de contrôle-commande.


           Inconvénient majeur: L’ordinateur central est le point névralgique de l’installation (une panne peut provoquer
            l’extinction de l’usine entière)
           Pour résoudre cela, des contrôleurs de secours étaient souvent introduits dans le système informatique.
           Afin d’assurer une meilleure fiabilité du système, il fallait fréquemment dupliquer les systèmes de contrôle (soit 2
            jeux de contrôle-commande pour chaque élément).
           Cette redondance impliquait ainsi souvent l’emploi d’instruments analogiques pour permettre à l’usine de
            continuer de fonctionner.
                                            INTRODUCTION GENERALE
 La supervision : Evolution des systèmes de contrôle (10/20)
    Commande centrale de l’ordinateur central:
           Les opérateurs devaient ainsi être en mesure de faire fonctionner les ordinateurs mais aussi de connaître le
            contrôle-commande de procédé.
           Par conséquent, Il était difficile de trouver du personnel qualifié; dont le salaire était donc particulièrement élevé.
           L’emploi d’un ordinateur de contrôle pour la gestion des points de consigne et autres paramètres sur les
            contrôleurs analogiques permettait d’éviter la perte de signal au niveau des éléments terminaux à l’arrêt de
            l’ordinateur.
           Cela n’économisait pas le double système de contrôle commande, mais au moins les opérateurs pouvaient éviter
            d’apprendre à gérer le procédé par l’ordinateur.
           Si l’ordinateur de contrôle était bien implémenté, les opérateurs pouvaient aller jusqu’à en oublier la présence.
           Avantages :
              Vision centralisée de l’exploitation mieux organisée,
                Stratégies de contrôle plus flexibles,
                Alarmes bien plus souples et efficaces
                Possibilité accrue de disposer d’un historique et d’un journal des évènements significatifs.
                                          INTRODUCTION GENERALE
 La supervision : Evolution des systèmes de contrôle (11/20)
    Commande centrale de l’ordinateur central:
           Inconvénients :
               Beaucoup de câblage
                Risque considérable sur l’usine
                Extensibilité limitée (difficile d’étendre les solutions sans reprogrammer l’ordinateur au complet)
           Le coût élevé du contrôle-commande de l’ordinateur central impliquait que l’on n’emploie les ordinateurs que
            pour des exploitations suffisamment étendues ou des procédés suffisamment critiques pour justifier l’effort
            nécessaire pour une telle automatisation.
           Un contrôle-commande de type informatique est désormais devenu plus incontournable.
           En effet, avec la maturité, chaque industrie doit optimiser ses méthodes de traitement.
                                            INTRODUCTION GENERALE
 La supervision : Evolution des systèmes de contrôle (12/20)
    Contrôle réparti des processus:
           La salle de contrôle central rassemblait les informations sans que tous les traitements ne soient situés en un seul lieu
            répartition des risques.
           Le coût et la complexité du câblage pouvaient en outre être amoindris par l’emploi d’un signal numérique passant
            par un simple câble (autoroute de l’information).
           Le secret du parcours de tous ces signaux est en fait une vieille technologie : le télégraphe.
           L’emploi du code Morse était la forme numérique de la communication des signaux analogiques.
           L'architecture répartie de procédés permet une répartition
            fonctionnelle des tâches entre différents processeurs
             réduction des risques d’une panne globale.
           Cette vision de l’exploitation de l’usine depuis la salle de
            contrôle central offre à l’opérateur une fenêtre unique
            sur l’ensemble du procédé.
           Et les opérateurs n’ont plus à faire le tour de l’usine.
                                          INTRODUCTION GENERALE
 La supervision : Evolution des systèmes de contrôle (13/20)
    Contrôle réparti des processus:
           Chaque contrôleur ou groupe de contrôleurs peut être visualiser sur l’écran ce qui permet de superviser le
            déroulement du traitement.
           Si nécessaire, les opérateurs peuvent aisément faire le point et commander des modifications depuis leur clavier,
            comme ils peuvent gérer toutes les alarmes en cas d’alerte sur un procédé.
           Par ailleurs, si nécessaire, une usine peut disposer de plusieurs postes opérateur sur le réseau.
           Un poste d’opérateur local peut être implanté sur une partie spécifique de l’usine, directement sur la même autoroute
            d’information ou directement câblé sur un ensemble de boucles de contrôle.
           Avantages:
                Un moindres parcours de câbles,
                Un moindre risque de pannes
                Un système plus évolutif
           Inconvénients:
               Les capteurs et éléments finaux sont toujours reliés à des armoires de contrôle-commande
                Les branchements entre composants provenant de différents fabriquant pouvaient présenter un certain nombre
                 de difficultés.
           C’est à cela que répondent les E/S numériques ou bus de terrain
                                           INTRODUCTION GENERALE
 La supervision : Evolution des systèmes de contrôle (14/20)
    Système de processeurs répartis:
           Noté DCS (pour Distributed Control System)
           Depuis l’apparition sur le marché de la première génération des DCS, leur structure fonctionnelle a peu évolué
           Mais la façon de réaliser les différentes fonctions a évolué pour tirer profit de nouvelles technologies issues
                du monde de la micro-informatique,
                de l’apparition des réseaux de terrain
                de l’évolution de l’offre des constructeurs d’automates programmables,
           Les principaux éléments d’un DCS :
                le contrôleur de processus ;
                l’interface de communication homme-machine ;
                le réseau de communication numérique ;l’outil de configuration du système.
           Nous allons cette technologie plus loin dans un chapitre dédié
                                          INTRODUCTION GENERALE
 La supervision : Evolution des systèmes de contrôle (15/20)
    Automates Programmables Industriels :
           Noté API ou PLC (pour Programmable Logic Controlers)
           Conçus pour les fonctions d’automatisation dans les usines, lorsque l’exploitation nécessitait de nombreuses
            opérations rapides, répétées, comme sur la plupart des chaînes.
           Bien que ce ne soit pas typique des usines de traitement traditionnelles, certaines opérations peuvent également
            exploiter les capacités extrêmement puissantes d’un PLC.
           Les PLC actuels peuvent être bien plus efficaces que jamais pour les opérations de séquençage, de régulation et de
            verrouillage.
           Le contrôle commande en temps réel pour le verrouillage de moteurs et équipements relatifs est une opération très
            pratique au sein des PLC employés dans le monde du contrôle-commande des procédés.
           Un bon exemple est le contrôle des processus discontinus à l’aide de fonctions de gestion de procédé, configurées
            par ordinateur personnel (PC) ou station de travail opérateur de type PC.
           Les PLC les plus récents ont été employés pour l’informatique répartie, par une opération impliquant plusieurs PLC
            sur les réseaux.
                                          INTRODUCTION GENERALE
 La supervision : Evolution des systèmes de contrôle (16/20)
    Automates Programmables Industriels :
           Noté API ou PLC (pour Programmable Logic Controlers)
           Conçus pour les fonctions d’automatisation dans les usines, lorsque l’exploitation nécessitait de nombreuses
            opérations rapides, répétées, comme sur la plupart des chaînes.
           Bien que ce ne soit pas typique des usines de traitement traditionnelles, certaines opérations peuvent également
            exploiter les capacités extrêmement puissantes d’un PLC.
           Les PLC actuels peuvent être bien plus efficaces que jamais pour les opérations de séquençage, de régulation et de
            verrouillage.
           Le contrôle commande en temps réel pour le verrouillage de moteurs et équipements relatifs est une opération très
            pratique au sein des PLC employés dans le monde du contrôle-commande des procédés.
           Un bon exemple est le contrôle des processus discontinus à l’aide de fonctions de gestion de procédé, configurées
            par ordinateur personnel (PC) ou station de travail opérateur de type PC.
           Les PLC les plus récents ont été employés pour l’informatique répartie, par une opération impliquant plusieurs PLC
            sur les réseaux.
           Ces réseaux sont parfois, mais pas toujours, P2P (un PLC peut parler avec un autre de façon directe, sans passer par
            un quelconque dispositif intermédiaire).
           Le contrôle-commande décentralisé est désormais disponible sur la plupart des systèmes PLC actuels, par des
            entrées-sorties distantes intelligentes.
                                          INTRODUCTION GENERALE
 La supervision : Evolution des systèmes de contrôle (17/20)
    Automates Programmables Industriels :
           Parmi les applications typiques se trouvent:
              les arrêts/démarrages des équipements
                Les verrouillages de sécurité,
                le filtrage,
                groupage simple,
                emballage,
                embouteillage et manipulation de matériel
           Les PLC sont le plus souvent une alternative bon marché aux DCS, dont les stratégies sophistiquées de boucles de
            traitement ne sont pas nécessaires.
           Avantages
                Excellentes capacités de traitement logique ; et langage LADDER facile à comprendre !
                Grande rapidité, possibilité de détecter un dysfonctionnement rapidement
                Très bon marché,
                Tolérance en milieu hostile ; ne nécessitent pas de salle blanche comme les DCS et autres
                Grande fiabilité et niveau élevé de flexibilité et évolutivité
                En principe, très compacts et ne nécessitant pas beaucoup d’espace.
                                          INTRODUCTION GENERALE
 La supervision : Evolution des systèmes de contrôle (18/20)
    Automates Programmables Industriels :
           Inconvénients:
               Non-déterministes : incapacité à prédire les temps de réponse, catastrophique pour le contrôle commande des
                 PID ! (sauf si une interruption temps réel est disponible)
               Nécessité pour l’ordinateur hôte ou le PC d’assurer l’interface avec les contrôles de processus et autres
                 opérations plus complexes
               Le logiciel de contrôle de batch est typiquement indisponible chez les fournisseurs de contrôle commande de
                 procédé sur les systèmes hybrides à DCS et PLC
               Les interfaces utilisateurs disponibles n’ont pas toujours la capacité de celles accompagnant le contrôle-
                 commande réparti ; l’emploi d’interfaces homme-machine (IHM) d’autres fabricants limite les capacités des
                 PLC
               Nécessité de configurer les PLC, outre la configuration des ordinateurs et des DCS sur les systèmes qui
                 conjuguent ces 2 éléments
               Les fournisseurs et distributeurs de PLC manquent d’expertise sur les procédés, ce qui induit les services et
                 coûts afférents d’un intégrateur indépendant.
                                          INTRODUCTION GENERALE
 La supervision : Evolution des systèmes de contrôle (19/20)
    Automates Programmables Industriels :
           Inconvénients:
               Non-déterministes : incapacité à prédire les temps de réponse, catastrophique pour le contrôle commande des
                 PID ! (sauf si une interruption temps réel est disponible)
               Nécessité pour l’ordinateur hôte ou le PC d’assurer l’interface avec les contrôles de processus et autres
                 opérations plus complexes
               Le logiciel de contrôle de batch est typiquement indisponible chez les fournisseurs de contrôle commande de
                 procédé sur les systèmes hybrides à DCS et PLC
               Les interfaces utilisateurs disponibles n’ont pas toujours la capacité de celles accompagnant le contrôle-
                 commande réparti ; l’emploi d’interfaces homme-machine (IHM) d’autres fabricants limite les capacités des
                 PLC
               Nécessité de configurer les PLC, outre la configuration des ordinateurs et des DCS sur les systèmes qui
                 conjuguent ces 2 éléments
               Les fournisseurs et distributeurs de PLC manquent d’expertise sur les procédés, ce qui induit les services et
                 coûts afférents d’un intégrateur indépendant.
                                          INTRODUCTION GENERALE
 La supervision : Evolution des systèmes de contrôle (20/20)
    Système de Supervision, Contrôle et Acquisition des Données :
           Dit système SCADA (pour Supervisory, Control, And Data Acquisition)
           Il permet la centralisation des données, la présentation souvent semi-graphique sur des postes de « pilotage »
           Il collecte des données de divers appareils d’une quelconque installation, puis transmet ces données à un ordinateur
            central, que ce soit proche ou éloigné
           Ce dernier contrôle et supervise l’installation et il est subordonné par d’autres postes d’opérateurs.
           Ces systèmes n’ont en principe pas été employés pour le contrôle de processus mais plutôt pour le démarrage et
            l’arrêt d’unités distantes, comme par exemple dans le cas des transformateurs de puissance distants ou des pompes à
            eau ou à gaz sur les pipelines.
           Nous allons voir plus loin que les systèmes SCADA consistent en une interface homme machine (HMI pour Human
            Machine Interface), des unités de commande terminales (RTU pour Remote Terminal Units), des automates
            programmables, une infrastructure réseau de communication, des ordinateurs, des contrôleurs intégrés et autres et
            un support logiciel aux différents niveaux
SYSTÈMES DE SUPERVISION
     INDUSTRIELLE
                               SYSTÈMES DE SUPERVISION INDUSTRIELLE
 Grandes familles d’un système de supervision
    Il y a au moins quatre classes différentes dans les projets de supervision


              Champ
Code       d’application                   Intégration                                       Commentaires

                              La supervision est liée aux            Visualisation de voyants, afficheurs.
  A      Actionneurs
                              équipements                            Poste HMI.

         Système de                                                  Système de collecte d’informations connecté sur les entrées-
  B                           Mapping des informations               sorties du système de contrôle-commande
         contrôle

                                                                     Partie intégrante du système, le module de supervision partage
                                                                     les informations des autres modules de commande et de
         Systèmes de          La supervision est une extension des   contrôle.
  C      contrôle et de la
                              fonctions de contrôle du système       Les approches intégrant la sûreté de fonctionnement comme
         commande                                                    critère de contrôle et commande choisissent souvent ce type
                                                                     d’intégration

         Systèmes                                                    La supervision se situe à un niveau supérieur dans la hiérarchie
         automatisés et       La supervision est un module           des systèmes d’information. Elle introduit des niveaux de
  D      systèmes de          stratégique coopérant avec les         redondance dans la collecte d’informations. Système complexe
         contrôle-            différents systèmes de contrôle        et comportant beaucoup de points, nécessite souvent un
         commande                                                    système d’AIDE
                             SYSTÈMES DE SUPERVISION INDUSTRIELLE
 Architecture d’un système de supervision
    La supervision est un niveau supérieur du contrôle-commande des systèmes industriels.
     Elle se superpose à la boucle de commande et assure les conditions d’opérations pour lesquelles les algorithmes
      d’estimation et de commande ont été conçus.
     Parmi les taches principales de la supervision se trouvent
          La surveillance
          Le diagnostic et la détection
          L’aide à la décision
          La maintenance
                              SYSTÈMES DE SUPERVISION INDUSTRIELLE
 Techniques de supervision
 Pour concevoir un système de supervision on a besoin de maîtriser les techniques suivantes:
    Acquisition de données:
           C’est la première étape de la supervision
           Consiste à recueillir, à valider et à assurer l’acheminement des informations sur l’état du système jusqu’au poste de
            pilotage
           C’est en continue et sans interruption que cette tache est exécutée
           Ces opérations impliquent l’utilisation des capteurs et des chaîne de mesure appropriées
           Ces informations sont utilisées pour accomplir l’étape de la détection
     Surveillance
     Diagnostic et Détection
     Aide à la décision
     Maintenance
                              SYSTÈMES DE SUPERVISION INDUSTRIELLE
 Techniques de supervision
 Pour concevoir un système de supervision on a besoin de maîtriser les techniques suivantes:
    acquisition de données
     Surveillance:
        Les données provenant du système sont utilisées par cette étape pour représenter l’état de fonctionnement puis en
          détecter les évolutions
        La surveillance intervient en phase d’exploitation bien qu’elle soit prise en compte dès la phase de conception
          Elle sert à filtrer les signaux et les événements issus du procédé et de la commande afin d’établir l’état du système
          En fonctionnement normal, elle communique des comptes rendus filtrés à la commande
          Elle permet également de détecter et diagnostiquer les fautes et les erreurs dans le système
          En cas de dysfonctionnement, elle en informe le module de maintenance et le module de supervision
          …
     Diagnostic et Détection
     Aide à la décision
     Maintenance
                               SYSTÈMES DE SUPERVISION INDUSTRIELLE
 Techniques de supervision
 Pour concevoir un système de supervision on a besoin de maîtriser les techniques suivantes:
    acquisition de données
     Surveillance:
        Deux type de surveillance sont à distinguer
                Surveillance de la commande: Elle permet de vérifier que les ordres émis sont conformes à l’état de la partie
                 opérative, le concept Objets Commandables Elémentaires est développé pour la conception des filtres de
                 commande nécessaires dans cette étape.
                Surveillance du système opérant: Elle a en charge de surveiller les défaillances du procédé. Ces derniers, dans
                 le cadre de la sûreté de fonctionnement, sont classées en deux catégories:
                    Les défaillances cataleptiques : soudaines et complètes (passage immédiat d’un état normal à une panne)
                     Les défaillances progressives : partielles et graduelles
                Ce type de surveillance peut se scinder en deux sous types surveillances prédictive et curative qui elles même
                 peuvent être soit directe soit indirecte.
                 …
     Diagnostic et Détection
     Aide à la décision
     Maintenance
                               SYSTÈMES DE SUPERVISION INDUSTRIELLE
 Techniques de supervision
 Pour concevoir un système de supervision on a besoin de maîtriser les techniques suivantes:
    acquisition de données
     Surveillance:
        Deux type de surveillance sont à distinguer
                Surveillance du système opérant:
                   La surveillance prédictive: directe est fondée sur l’analyse des signaux, des données ou l’étude des
                      processus stochastiques pour connaître l’état actuel réel de l’élément et évaluer sa durée de vie restante.
                      Alors que la surveillance prédictive indirecte prend en compte tous les types de matériels ayant des
                      défaillances produisant une baisse de qualité ou de quantité des produits fabriqués,
                   La surveillance curative : elle se base sur deux fonctions à savoir la détection et le diagnostic. La détection
                      dépend de la contrainte temps réel, elle permet d’analyser le comportement de la partie opérative pour
                      obtenir les symptômes en cas de dysfonctionnement. Alors que le diagnostic est basé sur un mécanisme en
                      deux étapes à savoir la localisation du sous-système défaillant (en interprétant, au fur et à mesure des
                      occurrences, les symptômes signalés par la détection) et l’identification des causes premières des
                      défaillances ainsi que l’analyse de leur conséquences.
     Diagnostic et Détection
     Aide à la décision
     Maintenance
                               SYSTÈMES DE SUPERVISION INDUSTRIELLE
 Techniques de supervision
 Pour concevoir un système de supervision on a besoin de maîtriser les techniques suivantes:
    acquisition de données
     Surveillance
     Diagnostic et Détection :
          La détection : doit permettre de décider si le système se trouve ou non dans un état de fonctionnement normal, Le
           signal mesuré comporte forcément du bruit qui n’est pas, forcément, mesurable d’où le modèle du système est
           souvent imparfait et peut donner un résidus non nul même en absence du défaut. On fait donc appel à des teste
           statistiques.
          Le diagnostic : A partir des défauts détectés, il faut localiser l’élément défaillant et identifier la cause provoquant le
           défaut.
     Aide à la décision
     Maintenance
                              SYSTÈMES DE SUPERVISION INDUSTRIELLE
 Techniques de supervision
 Pour concevoir un système de supervision on a besoin de maîtriser les techniques suivantes:
    acquisition de données
     Surveillance
     Diagnostic et Détection
     Aide à la décision :
        Un opérateur, aussi expérimenté et qualifié qu’il soit, peut prendre des décisions inappropriées
          L’aide à la décision consiste à aider l’opérateur à prendre la bonne décision devant tout scénario. Et ce en proposant
           une liste d’actions qui pourraient restaurer les grandeurs optimales du système.
          L’opérateur est toujours la pièce maitresse, puisque le système de l’aide à la décision ne peut jamais agir. Son rôle se
           limite à informer et conseiller seulement. Il propose, donc, quel moyen d’action doit être exécuté (Exemple: changer
           la commande manuel parce que le régulateur travaille hors de son domaine de stabilité). Mais ce n’est pas ce système
           qui trouvera le point de réglage ou la valeur précise de l’action (ceci constitue toujours un grand chantier de la
           recherche scientifique)
     Maintenance
                              SYSTÈMES DE SUPERVISION INDUSTRIELLE
 Techniques de supervision
 Pour concevoir un système de supervision on a besoin de maîtriser les techniques suivantes:
    acquisition de données
     Surveillance
     Diagnostic et Détection
     Maintenance :
        C’est l’étape qui suit en générale la prise de la décision.
          Elle consiste à maintenir ou à restaurer les performances des composants ou du système d’une façon globale pour
           accomplir la tache requise.
          Plusieurs types de maintenance sont à distinguer
SYSTÈME DE SUPERVISION, CONTRÔLE
   ET ACQUISITION DES DONNÉES
             SCADA
                          SYSTÈMES DE SUPERVISION, ACQUISION AND DATA
                                          ACQUISITION
 Introduction
     SCADA est un système informatique industriel permettant la surveillance et le contrôle des processus.
      Il consiste en
           Une interface homme machine (HMI),
           Des unités de commande terminales (RTU)
           Des automates programmables (PLC)
           Infrastructure de communications et réseaux
           Ordinateurs
           Régulateurs embarqués et autres
           Et un système logiciel approprié aux différents niveaux
      Le terme SCADA se réfère, en général, aux systèmes centralisés qui surveillent et contrôle la totalité des sites ou des
       processus complexes qui s’étalent sur une large zone (d’une seule usine à plusieurs autres dans différents pays)
      La majorité des actions de contrôle sont réalisés automatiquement par les RTUs ou les PLCs
            SYSTÈMES DE SUPERVISION, ACQUISION AND DATA
                            ACQUISITION
 Exemple
            SYSTÈMES SCADA
 Exemple
                                                  SYSTÈMES SCADA
 Architecture Matérielle d’un système SCADA


     Le contrôle des procédés et la technologie d’automatisation a subit un changement significatif durant la dernière décennie
     Différentes terminologies des systèmes de contrôles sont désormais présentes et permettent de décrire différents types de
      contrôle.
     Traditionnellement, deux concepts principaux de la stratégie de contrôle sont à distinguer.
     La première présente un contrôleur logique centralisé et le module entrées sorties (I/O) distribué alors que la deuxième
      présente un contrôleur localisé.
     Principalement, lorsque le contrôleur logique est localisé, les données du processus doivent être envoyées à travers le
      réseau au point d’intérêt, d’où le nom de SCADA.
     Actuellement, la technologie du contrôleur logique s’est développer de telle manière à ce qu’il reste localisé, et a obtenu
      d’autres noms tels que régulateur d’automatisation programmable ou le contrôleur programmable d’application (PAC).
     Le changement du nom du contrôleur s’est accompagné de l’acquisition de tous les types de capacité de communication
      pour faire face aux besoins du réseau de contrôle.
         Exemple: une capacité mémoire plus grande pour un logiciel d’application plus volumineux,
     Quelque soit la méthode utilisée par le contrôleur ou le module I/O pour se connecter au réseau. Basée sur le protocole IP,
      cette connexion est transparente pour l’interface HMI.
                                                SYSTÈMES SCADA
 Architecture Matérielle d’un système SCADA
     Dans un premier temps, nous allons exposer les principaux composants d’un système SCADA :
          Le champ I/O : peut être monté en rack avec CPU ou en réseau intégré dans un boitier CPU ou RTU
          Contrôleur logique: qui peut être un CPU monté en rack ou un RTU intégré avec un CPU
          Réseau et composants réseau: le protocole le plus souvent utilisé est l’ETHERNET
          CPU, I/O, la configuration réseau et le logiciel du développement d’application sont typiquement délivrés par la
           plateforme hardware choisie.
               Exemple: ControlLogix 5000 de Rockwell Automation pour un Automate Allen-Bradleyc ou Proficy Me pour
                GE-IP line de PLC&PAC
          Hardware HMI : qui peut être un ordinateur industriel robuste ou un matériel HMI de distributeurs différents
               Exemple: Panel View de A-B ou Versaview de GE-IP.
          Le logiciel de l’interface HMI
               Exemple: Wonderware, In Touch, iFix pour le développement de l’Interface Graphique de l’Utilisateur GUI
                (Graphical User Interface), l’historique et la gestion des alarmes
          Poste de Travail Ingénierie/Maintenance: un ordinateur avec tous les logiciels de développement chargés avec leur
           licences nécessaires
                                                  SYSTÈMES SCADA
 Architecture Matérielle d’un système SCADA
     Avant d’entamer les détails de la structure du système SCADA, nous allons présenter les besoins nécessaires pour la
      configuration et l’utilisation du système, La progression naturelle des livrables pour l'ingénierie peut être répertoriée
      comme suit:
          P&IDs (Piping and Instrumentation Diagrams): le point de départ des Entrées/ Sorties
          Fiches de données pour les instruments (Instrument Datat Sheets): il aidera à confirmer les exigences des I/O.
          La liste des I/O: la liste énumérant chaque points d’entrée et de sortie du système SCADA. Cette liste est préparée
           (dans MSAccess ou MSExcel) en fonction des panneaux de contrôle et du contexte géographique.
          Plan de repérage électrique: emplacement physique et classification des zones de panneaux de commande,
          Diagrammes de blocs de contrôle: connectivité des diagrammes de ligne de divers composants impliqués dans le
           schéma de contrôle. Cela peut être encore amélioré pour créer des schémas d'interconnexion.
                                                  SYSTÈMES SCADA
 Architecture Matérielle d’un système SCADA
     Avant d’entamer les détails de la structure du système SCADA, nous allons présenter les besoins nécessaires pour la
      configuration et l’utilisation du système, La progression naturelle des livrables pour l'ingénierie peut être répertoriée
      comme suit:
          Diagramme de Réseau de Contrôle: Un diagramme de réseaux détaillé
          Diagrammes d’interconnexion: acheminement des câbles
          Disposition des panneaux de contrôle: comprend la nomenclature et l'emplacement prévu de chaque composant du
           panneau.
          Schémas PLC: câblage vers/depuis le PLC, le PAC et les I/O. Parfois, les schémas des PLC peuvent être améliorés
           pour inclure plus de détails sur les instruments de terrain, de sorte que les dessins de boucle d'instruments ne sont
           pas nécessaires. Dans les cas où la boucle est complexe et a des connexions dans divers panneaux, des dessins de
           boucle doivent être préparés.
          Schémas de câblage du panneau: fils par numéro et terminaisons par numéro.
          package de panneaux - Comprenant la disposition des panneaux, les schémas et les dessins de câblage, ainsi que les
           normes requises pour le projet et les détails commerciaux
                                                  SYSTÈMES SCADA
 Architecture Matérielle d’un système SCADA
     Avant d’entamer les détails de la structure du système SCADA, nous allons présenter les besoins nécessaires pour la
      configuration et l’utilisation du système, La progression naturelle des livrables pour l'ingénierie peut être répertoriée
      comme suit:
          Diagramme de Réseau de Contrôle: Un diagramme de réseaux détaillé
          Diagrammes d’interconnexion: acheminement des câbles
          Disposition des panneaux de contrôle: comprend la nomenclature et l'emplacement prévu de chaque composant du
           panneau.
          Schémas PLC: câblage vers/depuis le PLC, le PAC et les I/O. Parfois, les schémas des PLC peuvent être améliorés
           pour inclure plus de détails sur les instruments de terrain, de sorte que les dessins de boucle d'instruments ne sont
           pas nécessaires. Dans les cas où la boucle est complexe et a des connexions dans divers panneaux, des dessins de
           boucle doivent être préparés.
          Schémas de câblage du panneau: fils par numéro et terminaisons par numéro.
          package de panneaux - Comprenant la disposition des panneaux, les schémas et les dessins de câblage, ainsi que les
           normes requises pour le projet et les détails commerciaux
                                                  SYSTÈMES SCADA
 Architecture Matérielle d’un système SCADA
     Avant d’entamer les détails de la structure du système SCADA, nous allons présenter les besoins nécessaires pour la
      configuration et l’utilisation du système, La progression naturelle des livrables pour l'ingénierie peut être répertoriée
      comme suit:
          Sélection des fournisseurs du panneau de contrôle en fonction des qualifications et des détails commerciaux.
          Récits de contrôle : Description des applications et du développement logique préparée à partir de l'ingénierie des
           procédés et d’autres entrées.
          Diagramme de cause à effet : fait pour comprendre les exigences de sécurité d'exploitation. Il peut être intégré à
           l'étude HAZOP (Hazard in Operations).
          Diagrammes logiques : Détails supplémentaires pour le développement logique. En règle générale, chaque sortie
           nécessite une expression. Les dérogations et l'arrêt d'urgence (ESD) doivent être pris en compte. Généralement, il est
           développé dans un progiciel de développement d'application de contrôleur, puis publié dans un logiciel de
           bureautique approprié tel que Word ou Visio.
          Concept et acceptation de l'écran IHM : Ceci est fait pour comprendre les besoins des clients.
                                                  SYSTÈMES SCADA
 Architecture Matérielle d’un système SCADA
    Avant d’entamer les détails de la structure du système SCADA, nous allons présenter les besoins nécessaires pour la
      configuration et l’utilisation du système, La progression naturelle des livrables pour l'ingénierie peut être répertoriée
      comme suit:
          Package des spécification de l'offre de construction : Cela comprend tous les dessins et documents nécessaires à
            l'entrepreneur en construction qualifié pour soumissionner pour un projet.
          Dessins de boucle d'instrument - Dans les cas où les boucles sont complexes et impliquent plusieurs sorties, et un
            schéma de boucle est préparé montrant la connectivité électrique de chaque composant de la boucle de contrôle.
          Spécifications de la construction: elle comprend tous les dessins et le calendrier avec les standards requis pour la
            construction
          La procédure et les formes FAT: toutes les détailles avec les documents et les formes de FAT (Factory Acceptance
            Test)
          Plan et formulaires de mise en service : Plan et calendrier de mise en service pour atténuer les risques de démarrage.
            Comprend des formulaires pour le paiement point à point.
          Manuels d'exploitation : guide (étape par étape) pour les opérateurs.
           Manuels de maintenance: Ressources de maintenance et de dépannage
           Formulaires de test d'acceptation client : Pour passer par une fonctionnalité complète avec le client. Le manuel
            d'exploitation peut être utilisé comme guide pour ce test.
                                                  SYSTÈMES SCADA
 Architecture Matérielle d’un système SCADA
     Les E/S du terrain : est un matériel installé sur le terrain qui contient toutes les entrées et sorties du système SCADA.
     La liste des entrées sorties et les schémas de blocs de commande sont nécessaires pour l’évaluation et la sélection des
      détails de ces E/S sur le terrain.
     Ces E/S peuvent être montées en rack de type RTU à montage unique ou à montage individuel.

     Les E/S de champs qui existent sont:
          Entrée Numérique : Les points typiques sont l’état de l’équipement, l’état des commutateurs distants, les seuils des
           paramètres du processus concernés (Low, High). Une classification supplémentaire peut être effectuée en fonction
           des exigences de tension de l'équipement, de l'approvisionnement, de l’amortissement et de la haute densité.
          Impulsion haute vitesse : il s'agit d'une entrée numérique spécialisée qui peut gérer une impulsion haute vitesse
           généralement utilisée dans la totalisation du débit.
          Sortie numérique : Les points typiques sont les commandes de l'équipement pour l'activer / le désactiver ou pour
           ouvrir / fermer. Une classification supplémentaire peut être faite en fonction des exigences de tension de
           l'équipement, des exigences de courant et de la haute densité.
          Sortie relais : carte de sortie numérique offrant une flexibilité de tension. Chaque point de sortie est un contact de
           relais et peut avoir toute une gamme de tensions.
                                                 SYSTÈMES SCADA
 Architecture Matérielle d’un système SCADA
     Les E/S du terrain:
     Les E/S de terrain qui existent sont:
          Entrée analogique : les points typiques sont des variables de processus, telles que la température, la pression, le
           débit. Il est disponible dans les grandes catégories suivantes:
               Entrée 4–20 mA: la plus couramment utilisée pour l'entrée d'émetteur de terrain. Dans certains cas, il peut être
                modifié pour 0 à 20 mA, ce qui est rarement utilisé.
               Entrée 2–10V: signal de processus basé sur la tension.

          Thermocouples : cartes de conditionneur de signal d'entrée développées uniquement pour les thermocouples. Ils sont
           disponibles pour différents types de thermocouples.
          RTD : cartes de conditionneur de signal d'entrée développées uniquement pour les RTD. Ils sont disponibles pour
           différents types de RTD.
          Sortie analogique : généralement utilisée dans les versions courant ou tension. La plupart des applications sont la
           modulation de vannes ou de variateurs de fréquence (VFD) en tant qu'éléments de commande finaux.
          Entrées série : disponibles pour divers protocoles série tels que RS232, EIA485, Modbus + et Modbus. Ils sont
           généralement utilisés pour les instruments de terrain avancés, tels que le transmetteur et l'analyseur de débit
                                                 SYSTÈMES SCADA
 Architecture Matérielle d’un système SCADA
     Le solveur logique :
          C’est le processeur de la plate-forme matérielle.
          Il peut être intégré aux E/S de terrain individuelles de style RTU ou à une carte séparée dans les E/S montées en
           RACK.
          Le système SCADA peut avoir plusieurs CPU localisés en réseau.
          Des considérations spéciales peuvent être nécessaires pour les besoins en mémoire, la connectivité réseau et la
           vitesse du contrôle implémenté.
     Réseaux et composants de réseau :

          Le réseau SCADA dépend de la répartition géographique des E / S de terrain.
          Un réseau de contrôle typique est implémenté sur Ethernet en utilisant le matériel et les protocoles du fabricant.
          Un tel exemple est le protocole de datagramme utilisateur (UDP). Cependant, de plus en plus de fabricants
           proposent TCP / IP.
          Une connectivité réseau appropriée doit être incluse dans les E / S de terrain.
          Certaines E / S de terrain peuvent être mises en œuvre en RF ou d'autres systèmes sans fil.
                                                 SYSTÈMES SCADA
 Architecture Matérielle d’un système SCADA
     Réseaux et composants de réseau :
          Les grandes catégories de composants réseau sont :
               Médias réseau : il s'agit généralement d'une combinaison de fils de cuivre et de fibres optiques. Une attention
                particulière doit être accordée à la redondance. Des accessoires appropriés doivent être sélectionnés pour les
                installations réseau.
               Commutateurs réseau : les considérations à prendre en compte pour la sélection sont la redondance, le support
                réseau et un certain nombre de canaux à chaque emplacement et les périphériques sans contrôle tels que les
                caméras,
               E / S de terrain : une connectivité réseau appropriée doit être fournie aux E/S de terrain. Les limitations de
                distance, le cas échéant, doivent être notées et résolues.
               Solveur logique : une connectivité réseau appropriée doit être fournie aux CPU.
                                                   SYSTÈMES SCADA
 Configuration SCADA et le logiciel utilisé:
      Généralement fourni par le fabricant du matériel, mais c'est le logiciel où tout est réuni.
      Il faut se reporter au manuel de programmation du fabricant sélectionné pour plus de détails sur les instructions.
      Ce logiciel comprend deux parties principales:

           les configurations matérielle et réseau.
           le développement applicatif ou logique.
      Nous allons voir les étapes de base ci-après ainsi que la progression naturelle suivie dans une activité donnée
                                                  SYSTÈMES SCADA
 Configuration Matérielle :
      De nouveaux projets sont créés dans les logiciels du fabricant de matériel (A-B Logix5000, RSLogix Guard ou GE-IP
       Proficy ME).
      Un rack matériel approprié est ajouté (GE-IP Rx3i ou 7i ou A-B SLC 5, MicroLogix).
      Vous pouvez nommer le rack par schéma numérique simple ou par désignation de zone.

      Une fois le rack ajouté:
           Le processeur et l'alimentation sont ajoutés.
           Le module d'E / S de terrain requis en fonction de la liste d'E / S est ajouté.

           Les modules réseau nécessaires basés sur le schéma SCADA sont ajoutés.
           La redondance, si elle est prévue, est ajoutée.
                                                    SYSTÈMES SCADA
 Chargement de points :
     Chaque point de la liste d'E/S est introduit dans le logiciel de configuration sous forme de liste de signaux ou de liste de
      points.
     L'utilitaire d'importation est disponible et les propriétés de base du point sont définies, telles que binaire ou entier.
     Pour les entiers, une plage de variables de processus est ajoutée.
 Allocation d'E / S
      Chaque point d'E/S câblé de la liste est ensuite connecté à un point respectif dans un emplacement et un rack respectifs ou
       des E/S de terrain montées individuellement.
      Si les points du contrôleur sont utilisés dans une autre logique (de contrôleur), ils sont connectés en utilisant la
       configuration P2P ou la configuration Modbus, selon le cas.
      Dans cette étape, la source de tous les points de données est définie pour l'utilisation de l'UC.
                                                  SYSTÈMES SCADA
 Développement logiciel :
     Au fur et à mesure que l'application est identifiée à partir des P&ID et que les récits de contrôle sont complétés avec l'aide
      d'ingénieurs de processus et de disciplines associées, le développement de la logique est lancé.
     Chaque sortie de la liste d'E/S nécessite un développement logique.
     Plusieurs balises mémoire sont également créées lors du processus de création de la logique.
     La plupart des packages de développement logique offrent plusieurs options pour développer des applications :
          des diagrammes à relais,
          des diagrammes de blocs fonctionnels,
          des textes structurés
          et C ou C ++.
     Des points supplémentaires utilisés pour le développement de la logique sont ajoutés à ce stade.
     Ces points sont appelés points faibles.
                                                 SYSTÈMES SCADA
 Développement logiciel :
     Brève description des différentes méthodes de développement logique :
          Diagrammes Ladder :
               Semblables aux diagrammes schématiques d'alimentation électrique, les diagrammes à contacts sont
                généralement utilisés pour des applications de petite à moyenne taille.
          Diagrammes de blocs fonctionnels :
               Ceci est très largement utilisé dans les industries de transformation et dans les DCS.
               Les blocs fonctionnels standard (IEC61131) sont fournis par le fabricant.
               Il est très similaire au schéma de principe pour la logique où chaque bloc est un objet actif.
               Les balises sont connectées aux entrées et aux sorties.
               Le bloc fonctionnel défini par l'utilisateur peut être préparé pour une application répétitive.
               Le package de solution de processus GE-IP Proficy et le PlantPAX de Rockwell Automation méritent d'être
                signalés. Il offre la possibilité de migrer le bloc fonctionnel préparé dans l'environnement HMI du package
                avec une facilité de glisser-déposer.
           Textes structurés : instructions logiques avec peu de mnémoniques et de syntaxe.
          C, C ++ : Généralement utilisé pour les opérations logiques complexes.
                                                    SYSTÈMES SCADA
 Compilation et codes :
      Une fois le développement logiciel terminé, il est compilé et le code est généré.
      En règle générale, lorsqu’il manque quelque partie du matériel, un avertissement peut apparaître lors de la génération de
       code.
 Connexion à la CPU et téléchargement des codes :
      Cela nécessite l'adresse MAC de l'unité et l'adresse IP compatible pour le poste de travail d'ingénierie.
 Simulations logiques et prétests :
      L'utilitaire de simulation est disponible pour le prétest de la logique développée.
      En forçant la valeur de l’entrée, elle peut être déclenchée et testée.
      La logique peut également être testée en déclenchant des entrées à l'aide de cavaliers câblés afin que des corrections
       puissent être apportées si nécessaire.
      À la fin du prétest, la base de données complète des points est exportée pour être utilisée dans le logiciel HMI.
      Cette base de données contiendra toutes les balises câblées et les balises mémoire.
                                                  SYSTÈMES SCADA
 Le matériel HMI :
     C'est le matériel où les opérateurs s'interfacent avec le processus sur une base de routine.
     Il peut s'agir de matériel spécialisé tel que Panel View ou Versaview avec la version Runtime de View Software chargée
      ou il peut s'agir d'un PC industriel renforcé avec écran tactile.
     En règle générale, seule la version d'exécution du logiciel est chargée sur cette station de sorte que des modifications ne
      peuvent pas être apportées.
     Les éléments à prendre en compte pour les sélections sont :
          le montage sur panneau,
          le montage sur bureau,
          le toucher actif,
          l'utilisation à l'intérieur,
          l'utilisation à l'extérieur,
          la classification des zones électriques,
          les systèmes d'exploitation
          et les compatibilités logicielles.
                                                    SYSTÈMES SCADA
 Le logiciel HMI :
     Le développement de l’interface HMI définit l'interactivité des opérateurs avec le processus.
     Il existe deux versions distinctes de ce logiciel:
          l'une est appelée RUN TIME, qui est chargée sur la station IHM et n'a aucune capacité de développement,
          et l'autre est appelée version de développement.
     Le coût du logiciel est généralement associé au nombre d'étiquettes ou au nombre d'écrans dans le système.
     Il y a des considérations telles que la connectivité avec le matériel et d'autres composants qui peuvent nécessiter un
      middleware supplémentaire, comme l'échange de liaison ouverte pour le contrôle de processus (OPC) ou Modbus.
     D'autres considérations du coût sont :
          La gestion des alarmes,
          Les tendances
          L'historique et les rapports associés.
                                                 SYSTÈMES SCADA
 Le logiciel HMI :
     Voici les activités du développement de l’HMI:
          Développement de concept HMI: certaines exigences convenues d'un commun accord avec l'utilisateur final en
           fonction de sa norme ou de son expérience existante. Il doit définir le schéma de couleurs, le schéma de navigation
           et les directives d'animation des équipements et appareils individuels.
          Configuration système préliminaire: cette activité définit divers nœuds et configurations.
          Définitions et configuration des balises middleware: si un middleware est utilisé comme OPC ou Modbus pour les
           données en direct. Une configuration correcte doit être effectuée dans ce logiciel.
          Chargement de la base de données de balises: cette activité dépend de l'achèvement du développement de la logique
           car au cours de ce développement, plusieurs balises de mémoire sont définies et peuvent nécessiter une animation.
          Création d'éléments constitutifs du processus tels que vannes de contrôle, pompes, soufflantes, réservoirs.
          Création d'un écran d'accueil et d'écrans de processus en utilisant des blocs de processus et en attachant des noms de
           balises.
          Création de panneaux de contrôle ou de pop-ups qui sont des écrans détaillés pour le fonctionnement des
           équipements.
                                                  SYSTÈMES SCADA
 Le logiciel HMI :
     Voici les activités du développement de l’HMI:
          Création d'écrans de paramètres de configuration.
          Création d'un écran de gestion des alarmes.
          Création de tendances historiques.
          Création de rapports.
          Tests de navigation de base.
          Connexion avec les régulateurs.
          Connexion avec les contrôleurs.
          Test de l'ensemble d'écrans avec le contrôleur respectif à l'aide de valeurs de variable forcées ou de cavaliers.
          Test pré-FAT avant l'expédition de tout le matériel du contrôleur et de l'IHM.
                                                SYSTÈMES SCADA
 Développement du concept HMI
     Certaines exigences de base convenues d'un commun accord doivent être définies avec les utilisateurs finaux pour les
      cartes de couleurs et de navigation
     Schémas de couleurs :
         Vert: normal pour le fonctionnement du processus
         Gris: l'appareil ou l'équipement ne fonctionne pas
         Rouge: anormal ou alarmant pour le fonctionnement du processus
         Jaune: avertissement
         Rouge / rouge clignotant: alarme sans accusé de réception
         Rouge fixe: alarme acquittée
         Clignotement jaune / rouge: transition vers un état d'alarme. Exemple: MOV passant à un état d'alarme ouvert ou
          fermé
         Clignotement jaune / vert - Passage à l'état normal tel que MOV passage à l'état normal ouvert ou fermé
         Cyan ou bleu sarcelle: données incorrectes en raison de la perte de communications
         Texte de l'alarme en vert fixe: alarme non acquittée qui est revenue à la normale
         Texte d'alarme en bleu fixe: alarme acquittée qui est revenue à la normale
                                                SYSTÈMES SCADA
 Développement du concept IHM
     Certaines exigences de base convenues d'un commun accord doivent être définies avec les utilisateurs finaux pour les
      cartes de couleurs et de navigation
     Schémas de navigation
         Écran de démarrage ou écran d'accueil comme présentation générale du processus.
         En cliquant sur une sous-partie du processus, vous accédez à la structure du processus pour cette zone.
         Un clic sur l'équipement ou l'appareil ouvre une fenêtre contextuelle ou un écran du panneau de commande pour
          contrôler l'appareil.
         Vingt pour cent de la zone d'affichage est dédiée à la fenêtre d'alarme active, généralement les 20% supérieurs. Dans
          les cas où il y a plusieurs moniteurs, 20% à 25% du bureau est dédié à la fenêtre d'alarme active.
         Les paramètres généraux de configuration du processus sont saisis via un écran de configuration séparé.
         Les paramètres de configuration de l'équipement sont saisis via des fenêtres contextuelles ou des panneaux de
          contrôle.
                                                SYSTÈMES SCADA
 Développement du concept IHM
     Certaines exigences de base convenues d'un commun accord doivent être définies avec les utilisateurs finaux pour les
      cartes de couleurs et de navigation
     Configurations préliminaires
         Le progiciel IHM nécessite une configuration préliminaire telle que la définition des modes et des contrôleurs dans
          le système, ainsi que les configurations et adresses IP nécessaires pour chaque nœud pour une communication
          réussie.
         Dans le cas d'un package IHM acheté avec le matériel du même fabricant, la navigation par balises est parfois
          simplifiée par les utilitaires de communication, tels que RSLinx de A-B et Proficy ME de GE-IP.
                                                 SYSTÈMES SCADA
 Développement du concept IHM
     Certaines exigences de base convenues d'un commun accord doivent être définies avec les utilisateurs finaux pour les
      cartes de couleurs et de navigation
    Définitions et configurations de balises middleware
         Si un middleware tel qu'un serveur OPC ou un serveur Modbus est dans le schéma SCADA, alors le middleware doit
          être installé sur le poste de travail d'ingénierie et la configuration doit être effectuée conformément aux directives du
          fabricant.
         Si nécessaire, une base de données de balises doit être créée, en faisant correspondre les balises et l'adresse dans les
          contrôleurs.
         Le fichier de projet est ensuite enregistré.
         La version Runtime du middleware doit être installée sur le matériel IHM et les fichiers de configuration doivent y
          être transférés.
         Le test de communication de la base de données de balises doit être effectué entre le middleware et l'IHM
          indépendamment des contrôleurs et entre le middleware et le contrôleur lui-même pour assurer une connectivité
          totale.
                                                SYSTÈMES SCADA
 Développement du concept IHM
     Certaines exigences de base convenues d'un commun accord doivent être définies avec les utilisateurs finaux pour les
      cartes de couleurs et de navigation
    Chargement de la base de données de balises
         Une fois le développement logique terminé, la base de données complète des balises est exportée, y compris toutes
          les balises mémoire.
         Ce fichier peut être utilisé pour importer dans l'environnement IHM comme point de départ pour la base de données
          de points.
         Les propriétés des points IHM seront uniques et peuvent différer des propriétés du package logique.
         Toutes ces propriétés doivent être modifiées de manière appropriée pour compléter la base de données de balises.
         De plus, chaque étiquette d'automate aura un préfixe unique ou un nœud unique dans la base de données d'étiquettes
          IHM pour des communications en direct.
                                                  SYSTÈMES SCADA
 Développement du concept IHM
     Certaines exigences de base convenues d'un commun accord doivent être définies avec les utilisateurs finaux pour les
      cartes de couleurs et de navigation
    Création de blocs de construction
         Il s'agit de l'étape la plus importante pour la qualité globale des écrans.
         Dans cette étape, tous les éléments constitutifs uniques du processus sont identifiés et une animation et un contrôle
          acceptables sont définis pour une méthodologie opérationnelle appropriée.
         Ces blocs de construction font partie du modèle de projet.
    Création de l'écran d'accueil et des écrans de processus
         Il s'agit de la vue de dessus du processus pour donner des informations globales sur l'état du processus aux
          opérations.
         Il peut s'agir d'un schéma de principe / d'un organigramme de processus représentant divers composants du processus
          ou d'une carte clé de l'installation avec interactivité dans des blocs ou des zones uniques pour faciliter les opérations.
                                                 SYSTÈMES SCADA
 Développement du concept IHM
     Certaines exigences de base convenues d'un commun accord doivent être définies avec les utilisateurs finaux pour les
      cartes de couleurs et de navigation
     Création de panneaux de contrôle ou de pop-ups
         Dans le diagramme de flux de processus ou la zone du processus qui est représentée à l'écran, il y aura des éléments
          de contrôle finaux, tels que
              les vannes d'isolement,
              la vanne de contrôle,
              les pompes
              les VFD,
          Ils ont un impact sur le résultat du processus et peuvent être contrôlés en mode opérateur par une intervention
           depuis l'IHM ou en mode automatique suivant la logique système.
         Les panneaux de contrôle auront au minimum les composants suivants:
              Bouton pour faire l'unité en mode automatique
              Bouton pour mettre l'unité en mode opérateur
              Bouton pour allumer / éteindre l'appareil
              Si l'élément de contrôle final est un appareil analogique, alors il aura un curseur pour la sortie analogique et
               l'affichage du point de consigne.
                                                 SYSTÈMES SCADA
 Développement du concept IHM
     Certaines exigences de base convenues d'un commun accord doivent être définies avec les utilisateurs finaux pour les
      cartes de couleurs et de navigation
     Création de panneaux de contrôle ou de pop-ups
         Les écrans de configuration permettent aux opérateurs de saisir des variables de contrôle, telles que l'unité de
          minuterie, les constantes des fonctions de contrôle, les constantes PID et les points de consigne de l'opérateur.
         Cela peut être un écran séparé ou inclus sur le panneau de commande / pop-up.
     Création de la gestion des alarmes
         Il est très facile de définir n'importe quel point comme alarme dans SCADA HMI d'un simple clic sur un bouton,
          mais une bonne gestion des alarmes doit être clairement définie lorsque le projet est entrepris.
         Des ressources et des directives précieuses pour la gestion des alarmes peuvent être trouvées dans des normes, telles
          que les directives ANSI / ISA 18.2, API RP1167 et PHMSA Alarm Management
                                                  SYSTÈMES SCADA
 Développement du concept IHM
     Certaines exigences de base convenues d'un commun accord doivent être définies avec les utilisateurs finaux pour les
      cartes de couleurs et de navigation
     Création de tendances historiques
         À l'aide de récits de contrôle appropriés du projet, les points, qui devront être enregistrés pour l'historique et le
          rapport, doivent être identifiés à partir de la base de données.
     Création de rapports
         Tous les rapports réglementaires ou rapports d'exploitation doivent être définis et créés à l'aide de diverses méthodes
          utilisées pour la gestion de base de données.
     Test de navigation de base
         Une fois le développement de l'écran terminé, un test de navigation de base doit être effectué au moment de
          l'exécution pour éliminer les erreurs évidentes de lien rompu et la facilité de navigation.
     Connexion avec des contrôleurs
         Un test de base de connexion avec le contrôleur doit être effectué pour vérifier l'échange dynamique de données
          entre l'IHM et les contrôleurs.
         Il valide la connectivité avec les contrôleurs.
                                                 SYSTÈMES SCADA
 Développement du concept IHM
     Certaines exigences de base convenues d'un commun accord doivent être définies avec les utilisateurs finaux pour les
      cartes de couleurs et de navigation
     Test de l'ensemble d'écrans
         Test de l'ensemble d'écrans avec le contrôleur respectif à l'aide de valeurs de variable forcées ou de cavaliers.
         Une unité ou un ensemble d'unités (système) peut être testé pour valider le développement de l'IHM en utilisant une
          combinaison de valeurs d'étiquettes forcées ou de cavaliers.
     Test pré-FAT du matériel et de l'IHM
          Les tests pré-FAT sont effectués avant l'expédition de tout le matériel du contrôleur et de l'IHM.
          Tous les contrôleurs peuvent être installés dans un environnement de bureau avec le logiciel de configuration réel
           chargé.
          Il facilite les tests de l'IHM et de la logique et aide également à valider les communications entre les contrôleurs.
          Il garantit également l'opérabilité des contrôleurs avant l'installation dans les panneaux de contrôle
                                                 SYSTÈMES SCADA
 Stations de travail d'ingénierie
      Le poste de travail d'ingénierie est un PC utilisé pour développer des applications SCADA.
      Il a les logiciels suivants comme exigence minimale:
           Logiciel de développement IHM avec licence appropriée
           Connectivité IHM, contrôleur et middleware, comme le pilote OPC ou DDE ou RSLinx
           Logiciel de configuration de contrôleur et de développement logique, tel que ProficyME ou Control Logix
           Toute base de données requise par les tendances historiques, telles que ODBC ou SQL
           Tout logiciel de reporting, tel que MSExcel ou Crystal Reports
      Pour tous les projets SCADA réussis, le développement progressif des livrables est préparé à chaque étape du projet, puis
       les bases de connaissances sont utilisées dans les archives de l'entreprise pour les projets futurs.


 Nous allons enchainer sur un exemple concret d’une interface HMI d’un sytème SCADA
                                                SYSTÈMES SCADA
 Exemple concret d’un système SCADA HMI
     Définition du système
         Un véritable système d'arrêt d'urgence du carburant (EFSO) a été mis en place dans un aéroport international.
         Dans cette partie, nous montrons quelques exemples de systèmes SCADA opérationnels et le développement de la
          stratégie de contrôle de manière logique et séquentielle.
         Cet aéroport fait l'objet d'importantes mises à niveau techniques et d’un contrôle et une utilisation appropriés de
          l'EFSO constituent une partie essentielle du projet.
         Le système EFSO amélioré comprendra
              Poste maître (MS)
              Panneaux de commande et de terminaison locaux
              Stations d'alarme
              MOV
                                                  SYSTÈMES SCADA
 Exemple concret d’un système SCADA HMI
     Les postes d'alarme sont installés le long de l'extérieur de chaque hall près de chaque porte ou poste de ravitaillement en
      carburant et sont câblés aux panneaux de commande locaux.
     L'actionnement de n'importe quelle station d'alarme signalera aux pompes d'alimentation en carburant au terminal de
      carburant (FT) de s'arrêter en cas d'urgence.
     Tout signal d'alarme arrêtera les pompes d'alimentation en carburant et arrêtera les opérations de ravitaillement des avions
      dans tout l'aéroport.
     Le MS ferme ensuite les MOV spécifiques pour isoler la zone de ravitaillement où l'EFSO s'est produit.
     Les commandes du système EFSO sont reliées entre elles à l’aide du protocole de réseau Ethernet sur le vaste réseau
      Ethernet de l’aéroport.
     Les panneaux de contrôle locaux sont mis en réseau avec le MS au FT en utilisant un schéma de mise en réseau P2P.
     Les PLC des panneaux de contrôle locaux sont connectés via des câbles CAT6 aux panneaux de brassage dans la salle du
      répartiteur intermédiaire (IDF) la plus proche.
     À partir de ces panneaux de brassage, le système EFSO se connecte au réseau Ethernet via des commutateurs Cisco dans
      la salle IDF.
     Cette capacité de mise en réseau API fait partie intégrante des contrôleurs de panneau FSO via les API Allen Bradley
      1600 Guard.
                                                 SYSTÈMES SCADA
 Exemple concret d’un système SCADA HMI
     Le système EFSO est contrôlé à partir d'un panneau HMI maître au FT.
     Cette HMI est un moniteur LCD à écran tactile qui est monté dans une salle de contrôle existante.
     L‘HMI utilise une série d'écrans graphiques «synoptiques» pour fournir l'indication d'alarme et le contrôle du système.
     Les panneaux EFSO terminaux surveillent en permanence les stations push / pull EFSO dans chaque zone.
     La vue intérieure d'un panneau de commande et les emplacements des API sont illustrés sur la Figure.
     L'automate maître surveille les informations d'état EFSO ESD, l'état du réseau de communication et le panneau de
      commande EFSO.
     Un câble à fibre optique monomode assure les liaisons de communication entre les terminaux et la salle du répartiteur
      principal (MDF) où l'ensemble du système est relié au réseau de l'aéroport.
     Le câble est acheminé parallèlement aux canalisations d'alimentation en combustible hors sol de 51cm dans un conduit
      existant, puis sous terre dans une banque de conduits de communication d'expansion du terminal 2 (T2X) qui se termine à
      la salle T2X MDF.
                                                 SYSTÈMES SCADA
 Exemple concret d’un système SCADA HMI
     L'élément de commande des panneaux de contrôle du système EFSO est l'API.
     Ce dispositif permet d'ajuster la logique de commande à l'aide d'un programme logiciel PLC et surveille le flux de
      données entre les stations push / pull EFSO et les dispositifs du panneau avant.
     Il facilite également le flux de données numériques vers la station de pompage et le panneau de commande principal via
      le réseau de fibre optique Ethernet de l'aéroport.
     Fonctionnement du panneau d'affichage de l’HMI principale
     Le Master Display est un grand projet impliquant de nombreux aspects matériels et logiciels ainsi que la programmation
      de SCADA.
     Les informations données ici seront limitées aux descriptions des opérations des unités à écran tactile.
     Les écrans d'affichage graphique qui contrôlent le système EFSO et les opérations de ravitaillement seront également
      abordés brièvement.
     Conventions d'écran EFSO L'IHM utilise un écran tactile couleur de 17 pouces utilisant le logiciel graphique Allen
      Bradley.
     Ce logiciel fournit une représentation «mimique» du panneau du système EFSO et des terminaux de l'aéroport.
     L'écran principal est l'écran «aperçu», illustré à la figure, représentant la répartition du système EFSO dans chaque
      terminal d'aéroport et hall.
                                              SYSTÈMES SCADA
 Exemple concret d’un système SCADA HMI
     Fonctionnement du panneau d'affichage de l’HMI principale
                                                  SYSTÈMES SCADA
 Exemple concret d’un système SCADA HMI
     Fonctionnement du panneau d'affichage de l’HMI principale
     Voici un schéma de couleurs utilisé sur l'interface graphique du système EFSO.
          Le vert est un fonctionnement normal
          Le rouge est une situation d'urgence ou d'alarme
          Le jaune est consultatif
     La figure présente un aperçu de l'ensemble du système EFSO.
     Elle montre tous les terminaux, toutes les zones, T1, T2X et le terminal de nuit distant (RON).
     C’est l'écran d'accueil et dans des conditions normales il aura toutes les animations en vert.
     Cet affichage utilise les fonctionnalités suivantes sur chaque écran suivant pour le contrôle:
          Toutes les zones ainsi que leurs halls et terminaux sont représentés sur la photo. Les panneaux EFSO sont
           représentés par une boîte.
          Toutes les zones et tous les terminaux sont tactiles.
          Chaque bouton mène à un écran spécifique du panneau.
          Par exemple, lorsque les zones 5 à 11 sont touchées, l'écran du panneau RON apparaît car ces zones sont contrôlées
           par RON.
                                                  SYSTÈMES SCADA
 Exemple concret d’un système SCADA HMI
     Fonctionnement du panneau d'affichage de l’HMI principale
     Cet affichage utilise les fonctionnalités suivantes sur chaque écran suivant pour le contrôle:
          Lorsqu'un hall ou le terminal a une urgence EFSO, ce bloc entier clignote en rouge. En cas de contournement de hall
           ou de terminal, le bloc respectif sera surligné en jaune.
          Lorsque le panneau est alimenté par une source d'alimentation sans coupure (UPS), le boîtier du panneau de ce hall
           clignote en jaune avec le texte «ON UPS».
          Lorsqu'un panneau perd la communication avec le contrôleur principal, la boîte du panneau de ce hall clignote en
           rouge avec le texte «P2P».
          La boîte d'alarme supérieure affiche uniquement les alarmes actives et peut afficher jusqu'à quatre lignes d'alarmes.
           Lorsque plusieurs alarmes sont actives, utilisez les flèches HAUT et BAS de la boîte d'alarme pour faire défiler. Une
           fois l'alarme effacée, elle n'est plus affichée dans cette case. Tous les autres écrans sont affichés de telle sorte que
           cette case soit toujours visible. L'exception est l'écran du journal des alarmes, qui affiche tous les journaux des
           alarmes. L'heure d'occurrence de l'alarme, l'heure d'acquittement de l'alarme et le message d'alarme sont chacun
           affichés sur cette case.
          Nous arrêterons la description du système HMI à ce stade.
                    SYSTÈMES SCADA
 Les unités RTUs
                                                  SYSTÈMES SCADA
 Les unités RTUs
     Outre les systèmes de communication et l’interface HMI, SCADA est caractérisé par deux autres éléments à savoir:
          Les unités de commande à distance (RTU)
          L’unité maîtresse de commande (MTU)
     La figure 1 montre quels signaux entrent dans la RTU sous forme de blocs;
     La figure 2 montre quels signaux quittent la RTU.
     Pour les passer brièvement en revue, le RTU recueille des informations sur le terrain sous forme des valeurs analogiques,
      les points d'alarme et d'état et les quantités mesurées.
     Il garde ces informations disponibles en mémoire jusqu'à ce que le MTU les demande.
     Il code ensuite et transmet les informations au MTU.
     De plus, lorsque le MTU ordonne, le RTU ouvre et ferme les vannes, allume et éteint les commutateurs, émet des trains
      d'impulsions pour déplacer les moteurs pas à pas.
     Cela peut sembler être un répertoire de fonctions plutôt limité, mais il est suffisant pour accomplir tout le contrôle à
      distance et la surveillance qui doivent être effectués.
                                                 SYSTÈMES SCADA
 Les unités RTUs
     Des RTU sont maintenant proposés qui ont la capacité de recevoir et d'envoyer des messages aux appareils de terrain au
      format série, généralement RS-232.
     Dans la plupart des cas, cette fonctionnalité n'augmente pas les fonctionnalités de SCADA; cependant, cela simplifie une
      partie du transfert de données locales sur le terrain.
     Les communications série sous forme de bus de terrain sont, désormais, proposées.
     Le bus de terrain dans les conceptions de contrôle de processus présente maintes avantages, en particulier pour les petits
      systèmes, qu'il devient clairement le protocole de choix pour les installations de terrain dans les systèmes SCADA.
                                                SYSTÈMES SCADA
 Les unités RTUs
     Interface de communication
         La figure suivante développe la description d'un RTU (comme une petite boite noire).
         Les RTU modernes sont essentiellement des micro-ordinateurs avec un équipement spécial à une extrémité qui est
          conçu pour faire l’interface avec la liaison de communication et avec un autre équipement à l'autre extrémité qui
          permet l’interaction avec les capteurs, les actionneurs et les calculateurs dans le processus.
         Pendant que la RTU est en mode réception, une partie de l'équipement d'interface de communication (le modem)
          reçoit un signal série du support de communication.
         À ce stade, le signal est analogique, bien que certains signaux analogiques aient pu être codés en binaire pour être
          transmis à la RTU.
         En utilisant des règles qui ont été établies lors du développement du protocole de communication, une autre partie
          de l'interface de communication interprète la chaîne de uns et de zéros et transmet les informations au reste de la
          RTU.
         En utilisant des règles qui ont été établies lors du développement du protocole de communication, une autre partie
          de l'interface de communication interprète la chaîne binaire et transmet les informations au reste de la RTU.
                                                  SYSTÈMES SCADA
 Les unités RTUs
     A noter que, dans certains cas, la fonction d'interprétation est accomplie par le microprocesseur qui forme le cœur de la
      RTU.
     Lorsque ce type d'architecture est utilisé, une partie du programme qui traduit le signal binaire en informations utiles est
      appelée programme «pilote de protocole».
     Également pour cette architecture, la fonction d'interruption, qui est essentielle au fonctionnement d'une RTU, doit
      s'exécuter rapidement ou il doit y avoir un tampon pour stocker le message entrant.
     Si le ou les premiers bits d'un message ne sont pas reconnus, le message n'est souvent pas compris.
     La RTU ne sait pas quand un message va lui être envoyé.
     Il doit toujours être en mode d'écoute (sauf lorsqu’il émet).
     Cependant, pendant qu'il écoute, la RTU fera beaucoup d'autres choses.
     Les premières RTU utilisaient des circuits électroniques dédiés à la détection continue des messages entrants, les
      décodant, les stockant dans une mémoire tampon et la transmission des informations pertinentes au reste de la RTU
      lorsque elle sont demandées.
     Les RTU modernes accomplissent ces fonctions avec le programme pilote de protocole exécuté par le CPU.
                                                 SYSTÈMES SCADA
 Les unités RTUs
     Contrôle numérique:
         De nombreux messages du MTU concernent le contrôle.
         Ils exigeront de la RTU qu'elle développe et transfère un signal vers l'un des éléments de terrain à proximité de son
          emplacement.
         Considérons le scénario où un message reçu par RTU lui demande d’ouvrir une vanne à deux positions, lorsque la
          position mémoire relative à la vanne est à l’adresse 32 et que le nombre de vannes est deux.
         La RTU affiche les registres alloués au contrôle des vannes discrètes.
         Notez que puisque chaque registre a une longueur d'un octet et que chaque bit est capable de définir la position
          «fermée» par «0» et la position «ouverte» par «1», chaque registre peut contrôler jusqu'à huit éléments discrets.
         La RTU localise la première position du registre spécifiée (registre 04 de position 32) et la forcera à un état "1".
                                                SYSTÈMES SCADA
 Les unités RTUs
     Contrôle numérique :
         Quelques millisecondes plus tard, ce registre est régulièrement lu.
         À ce stade, parce que ces deux registres ont un "1" dans leurs positions, ils amèneront deux positions de registre de
          tampon de contrôle à passer à "1".
         Un "1" sur ces positions provoquera deux pilotes de relais sur une vanne de sortie qui permettront à l'air de
          l'instrument d'ouvrir l'une des vannes.
         Notez que le verrouillage, soit au niveau du pilote du relais ou du relais lui-même, fait que la commande est «Échec
          de la dernière position».
         Cela signifie que si le système de communication échoue après la réception du message d'ouverture des vannes, les
          vannes resteront ouvertes.
         S'il s'avère nécessaire de les fermer alors que le système SCADA est hors service, un système manuel ou
          instrumenté de sécurité qui agit pour annuler le SCADA doit être mis en place.
         la même procédure serait utilisée pour mettre un moteur en marche.
         Au lieu de mettre sous tension un solénoïde, le relais de verrouillage ferait fermer un démarreur de moteur.
         La plupart des contrôles binaires discrets peuvent être affectés de cette manière.
                                                 SYSTÈMES SCADA
 Les unités RTUs
     Contrôle analogique:
         Supposons que la MTU ordonne à la RTU d’ouvrir une vanne à seulement 75%.
         Ça serait géré par une instruction de contrôle analogique.
         Considérons l’exemple de la figure où le message de la MTU demande une ouverture analogique, registre n° 22, et
          le fixe à 75.
         Dans ce cas, ça doit prendre plus d’un simple bit pour définir le besoin.
         Le registre 22 ayant un octet, les huit bits permettent de définir valeur en question en tant qu’une combinaison
          linéaire de 50 %, 25 %, ,,, 0,39%
         Huit bits de précision sont suffisant pour la plupart des application.
         Cependant pour d’autres applications, le cas échéant, le contrôleur peut utiliser une autre partie définie sur un
          deuxième octet
                                                  SYSTÈMES SCADA
 Les unités RTUs
     Contrôle analogique:
         Maintenant, lorsque l'impulsion de déclenchement de l'horloge arrive et que ces valeurs sont déplacées vers un
          registre tampon, quelque chose de différent se produit.
         Dans une carte de sortie analogique, ces bits doivent être reconstitués en un signal analogique.
         Pour cet exercice, supposons que 10 volts entraîneront l'ouverture de la vanne à 100% et que 0 volts la rendra
          ouverte à 0%.
         Le premier bit (bit 0) est le MSB.
         Parce que c'est un « 1 », il allume une source de tension qui produit 5 volts.
         Le deuxième bit (bit 1) car c'est aussi un « 1 », active une source de tension qui produit 2.5 volts.
         Le troisième bit (bit 2) parce qu'il s'agit d'un « 0 » n'active pas la source de tension de 1,25 volts.
         Le quatrième n'allume pas non plus la source 0,625 volts et ainsi de suite.
         Toutes ces tensions sont ajoutées et les 7,5 volts qui en résultent sont acheminés vers un pilote de puissance.
         De là, il peut être transformé en un signal 4-20 mA.
         Cela entraînerait l'envoi de (0,75 x (20 - 4) + 4) = 16 mA à une position de la vanne à 75% de la position
          complètement ouverte.
                                                SYSTÈMES SCADA
 Les unités RTUs
     Contrôle analogique:
         En fait, le signal serait plus susceptible d'agir comme le point de consigne distant d'un contrôleur PID
          (proportionnel-intégral-dérivé), et la sortie du contrôleur pourrait contrôler une vanne, un volet, une vitesse de
          machine, ou n'importe quel nombre de paramètres qui pourraient être décrits par une valeur analogique comprise
          entre 0 et 100%.
     Contrôle pulsé:
         La méthode du contrôle pulsé est rarement utilisée.
         Elle permet à un moteur pas à pas d'être incrémenté ou décrémenté d'un nombre spécifié de pas.
         Le registre à seize bits peut avoir le bit 0 réglé avec un « 1 » pour incrémenter ou un « 0 » pour décrémenter.
         L'un des quinze bits restants sera mis à « 1 » avec un pour chaque sortie d'impulsion requise.
         Plutôt que de synchroniser tous les bits simultanément à partir du registre tampon, ils sont cadencés un à la fois et
          agencés pour aller au moteur pas à pas l'un après l'autre (en série).
         L'une des raisons pour lesquelles ce système n'est pas populaire est que chaque instruction au moteur nécessite une
          connaissance de la position initiale du moteur.
                                                 SYSTÈMES SCADA
 Les unités RTUs
     Contrôle pulsé:
         Avec le temps, les erreurs s'accumuleront dans la position initiale supposée du moteur.
         Il devient donc nécessaire de forcer par intermittence le moteur soit complètement ouvert soit complètement fermé
          pour réenregistrer sa position.
         Bien que ce ne soit pas particulièrement difficile d'un point de vue de contrôle, cela peut avoir des effets très
          déstabilisants sur le processus.
         Des commutateurs de position de rétroaction sont maintenant appliqués pour éliminer ce problème, mais les
          dommages causés par les premières applications médiocres en font une méthode de contrôle moins populaire.
     Contrôle série:
         De nombreux appareils terminaux sont équipés d'une entrée et d'une sortie série.
         Cette capacité simplifie le mouvement des données entre les registres d'instruments et les registres RTU.
                                                 SYSTÈMES SCADA
 Les unités RTUs
     Surveillance des signaux discrets:
         L'une des fonctions d'acquisition de données les plus courantes qu'un système SCADA est appelé à effectuer est la
          surveillance de l'état discret ou des points d'alarme. 
         Ceux-ci sont parfois appelés points numériques. 
         Considérons la figure qui est la représentation d'une alarme discrète dans ce cas un interrupteur du niveau haut d’un
          réservoir hydroélectrique. 
         Le LSH-101, est alimenté en 24 volts CC à partir de la RTU. 
         Lorsque le niveau d'eau devient suffisamment élevé pour ouvrir l'interrupteur, le fil de retour transportant le signal
          de 24 volts voit sa source de tension interrompue vers certains circuits de conditionnement de signal. 
         Les signaux transitoires, le bruit CA et les effets du rebond des contacts de commutation sont, ainsi, supprimés, et la
          tension est décalée vers un niveau plus compatible avec le niveau logique. 
         Une impulsion d'horloge transfère le signal conditionné, dans ce cas un niveau de + 5 volts, dans le registre d'entrée
          TOR numéro 20, bit 7, sous la forme d'un «1».
         La prochaine fois que le MTU demande à la RTU l'état du registre d'entrée TOR 20, bit 7, le RTU examinera ce bit
          et signalera qu'il s'agit d'un "1."
         Le MTU saura alors que le niveau d'eau dans le réservoir est élevé.
                                                 SYSTÈMES SCADA
 Les unités RTUs
     Surveillance des signaux discrets:
         Bien entendu, si le niveau d'eau est bas, le signal de 24 volts aurait continué à atteindre le conditionneur de signal, et
          la sortie du conditionneur de signal aurait été de zéro volt. 
         Cela aurait été cadencé dans le registre comme un "0". 
         Un "O" dans le registre d'entrée discrète 20, bit 7, serait configuré pour signifier qu'il n'y a pas de niveau haut dans
          le réservoir.

         Les entrées discrètes peuvent informer sur l'état d'une vaste gamme de paramètres. 
         Les niveaux, les pressions, les températures, les débits, les positions des vannes, l'état du moteur, etc. peuvent être
          surveillés à l'aide de simples interrupteurs. 
         En utilisant une logique spéciale avec une sortie de contact de relais, il est également possible d'obtenir l'état des
          moniteurs à rayonnement élevé, des alarmes de gaz combustible, de l'analyse de pH hors limites et de presque tout le
          reste
                                                  SYSTÈMES SCADA
 Les unités RTUs
     Surveillance des signaux analogique:
         Il est souvent important de surveiller un paramètre de processus pour obtenir plus qu'une quantité binaire
          d'informations.
         Par exemple, la hauteur de liquide dans le réservoir, la vitesse d'un moteur ou un niveau de rayonnement peuvent
          être nécessaires.
         Dans ces situations, un capteur est fourni qui modifie le paramètre d'intérêt en une quantité plus facilement
          surveillée, telle que le courant.
         Sur la figure, le flotteur à la surface du réservoir modifie le courant continu de 24 volts fourni par le RTU de sorte
          que, sur la plage qui nous intéresse, le courant varie de 4 mA à 20 mA.
         Ce courant, à travers une résistance de 250 ohms, est traduit en une tension comprise entre 1 et 5 volts à l'entrée du
          circuit, qui effectue un certain conditionnement du signal, puis échantillonne et maintient la tension.
         Un convertisseur analogique-numérique (ADC) fonctionne alors sur la tension.
         Le résultat est un mot de huit bits qui représente le 1 à 5 volts à environ 1/2 pour cent.
         Si une meilleure précision était nécessaire, et c'est rarement le cas, jusqu'à seize bits pourraient être utilisés.
         Ce mot est cadencé dans un registre spécifique, et la RTU, lorsqu'elle lui est demandée, enverra le contenu du
          registre au MTU.
                                                SYSTÈMES SCADA
 Les unités RTUs
     Surveillance des signaux de comptage d’impulsions:
         De nombreux capteurs ou instruments locaux dont la sortie est de style odomètre ont été modifiés pour être lus par
          SCADA.
         Souvent, la manière la moins coûteuse est de faire envoyer par l'appareil une chaîne d'impulsions de telle sorte que
          chaque cycle d'ouverture-fermeture représente une quantité fixe et connue.
         De cette manière, le RTU peut comptabiliser ou accumuler ces fermetures de contact et déduire de leur somme les
          mesures faites par l'appareil.
                                                SYSTÈMES SCADA
 Les unités RTUs
     Surveillance des signaux de comptage d’impulsions:
         Un totalisateur, qui est un dispositif externe à la RTU, délivre une fermeture de contact pour chaque baril de pétrole
          qui traverse un compteur à turbine.
         Cette fermeture de contact est alimentée par le courant continu de 24 volts de la RTU, et le signal intermittent est
          introduit dans un conditionneur de signal.
         Dans ce cas, cependant, la sortie du conditionneur de signal est branchée sur un circuit de comptage qui est composé
          de bascules et d'une logique de pilotage.
         En règle générale, le compteur aura seize bits et peut donc compter jusqu'à 65536.
         Certains RTU incluent une fonctionnalité de totalisateur interne à eux-mêmes.
                                                 SYSTÈMES SCADA
 Les unités RTUs
     Surveillance des signaux séries:
         Le signal série est le dernier type de signal pouvant être envoyé à la RTU par un appareil de terrain.
         Comme la plupart des entrées analogiques et de comptage d'impulsions, un signal série est envoyé à la RTU à partir
          d'un processeur électronique quelconque.
         Il s'agira très souvent d'un appareil complexe tel qu'un analyseur de vibrations du moteur ou un chromatographe de
          flux de processus.
         Habituellement, le ou les signaux existent dans le processeur électronique sous forme de signaux numériques, il est,
          donc, plus facile de les déplacer en tant que signaux numériques série.
         La connexion physique utilisée est souvent une liaison RS-232, comme le montre la figure.
         Agissant en tant que maître, le RTU initie le dialogue avec l’appareil de terrain.
         en guise de réponse, l'appareil s'identifie et envoie un message série avec un format fixe, disant essentiellement à la
          RTU tout ce qu'il sait.
         Le RTU stocke ces données dans des registres au fur et à mesure de leur entrée.
         Lorsque la MTU scanne la RTU, cette dernière inclut ces informations avec tout le reste qu'il envoie.
                                                SYSTÈMES SCADA
 Les unités RTUs
     Fonctions non-RTU :
          Les fonctions RTU sont les fonctions que ces unités remplissent en tant qu’elles mêmes.
          De plus, certaines RTU dotées de capacités de calcul peuvent être programmées pour exécuter d'autres fonctions.
          Avant de décider de programmer de telles RTU pour faire autre chose, il faut faire attention à ne pas charger trop
           sur la RTU.
          Les préoccupations potentielles incluent la surcharge du processeur, l'exposition de l'équipement à des transitoires
           électriques, l'exposition du logiciel aux personnes qui développent de nouveaux programmes et le respect des
           exigences réglementaires impliquant la stabilité des données.
                                                  SYSTÈMES SCADA
 Les unités MTUs
     Unités Terminales Principales MTU?
          Au centre de chaque système SCADA se trouve le dispositif qui:
               Émet toutes les commandes,
               Rassemble toutes les données,
               Stocke certaines informations,
               Transmet d'autres informations aux systèmes associés,
               S'interface avec les personnes qui exploitent le processus
               et semble en fait être le maître de situation.
          Cet appareil est le terminal maître.
          Certaines industries l'appellent « l'ordinateur hôte »
                                                SYSTÈMES SCADA
 Les unités MTUs
     Interface de communication
          La MTU doit envoyer des informations à chaque RTU.
          Il utilise presque toujours le même support que la RTU utilise pour lui envoyer des informations.
          Il utilise également le même protocole que la RTU.
          A ces égards, la MTU a les mêmes capacités et équipements d'interface de communication qu’avec les RTUs.
          La principale différence est que, en tant qu'esclave, la RTU ne peut pas lancer une conversation; en tant que maître,
           la MTU le peut.
          Ces communications sont initiées par des programmes au sein de la MTU qui peuvent être déclenchés par des
           instructions manuelles de l'opérateur (très inhabituelles) ou par d'autres programmes au sein de la MTU (méthode
           normale).
          Plus de 99% de tous les messages de la MTU vers les RTU sont automatiquement lancés.
                                                  SYSTÈMES SCADA
 Les unités MTUs
     Interface de communication
          La MTU doit également communiquer avec les imprimantes et les écrans qui forment l'interface opérateur.
          Il le fait avec des techniques identiques à celles utilisées par n'importe quel ordinateur.
          De nombreux MTUs sont tenus de transmettre les données aux ordinateurs comptables, aux ordinateurs d'entreprise
           ou aux réseaux informatiques. Dans certains cas, des protocoles propriétaires seront utilisés.
          Dans d'autres cas, des produits ouverts spécialement conçus pour les communications entre ordinateurs seront
           utilisés.
          À ce niveau de communication, la communication d'égal à égal est plus courante que la communication maître-
           esclave.
          La quasi-totalité de ce type de communication est gérée par des réseaux locaux (LANs)
                                                 SYSTÈMES SCADA
 Les unités MTUs
     Interface d'une image du processus
          Pour que la MTU puisse faire les tâches que nous attendons d’elle, une description très détaillée de tous les capteurs
           et actionneurs connectés au système doit être disponible pour le processeur de la MTU.
          Pour être traitée de la manière la plus rapide, cette description doit être organisée sous une forme hiérarchique.
          Différentes formes hiérarchiques peuvent bénéficier à différents processus, et souvent plusieurs chemins possibles à
           travers la description de processus aboutissent à la même action.
          Cette déclaration sera expliquée dans un exemple, sur la fermeture d'un robinet d'arrêt de pipeline.
                                                 SYSTÈMES SCADA
 Les unités MTUs
     Interface d'une image du processus
          Pour visualiser comment l'image de processus peut être décrite au MTU, considérons le processus très simple
           illustré à la Figure, qui représente un pipeline sous le contrôle d'un MTU.
          À l'extrémité d'entrée de la canalisation, la RTU numéro 1 surveille l'état d'une pompe, qui peut être activée ou
           désactivée.
          Elle permet également à la MTU de contrôler la pompe (mise en marche ou à l'arrêt), et de contrôler, ouvrir ou
           fermer une vanne d'arrêt.
          Elle surveille la position, ouverte ou fermée, de la vanne d'arrêt et permet de collecter le débit accumulé ou le débit
           total de fluide entrant dans la canalisation pour la MTU.
          Enfin, RTU 1 prévoit un pressostat basse pression, qui sera interprété comme une alarme, à surveiller depuis la
           MTU.
          Au RTU 3, les mêmes fonctions sont disponibles sauf qu'il n'y a pas de pompe à surveiller ou à contrôler.
          Sur la RTU 2, il n'y a qu'une vanne de blocage, qui peut être contrôlée et surveillée, et l'alarme basse pression à
           interfacer avec le MTU.
          Il s'agit d'un système SCADA très simple mais exploitable pour surveiller et contrôler un pipeline.
                                                 SYSTÈMES SCADA
 Les unités MTUs
     Interface d'une image du processus
          Ce système doit faire le suivi du fluide entrant dans la canalisation sur une base de vingt-quatre heures, soustraire le
           fluide sortant de la canalisation et créer une alarme à la MTU afin que l'opérateur sache quand il y a un problème.
          Il doit également surveiller les interrupteurs d'alarme basse pression à chaque RTU et, si le pipeline ne fonctionne
           pas correctement, créer une alarme à la MTU.
          Si l'opérateur agit pour fermer (éteindre) le pipeline, la MTU doit envoyer une commande sur une base de haute
           priorité à chaque RTU qui a une vanne d'arrêt, ordonnant à la RTU de fermer la vanne d'arrêt.
          En même temps, il doit ordonner à RTU 1 d'arrêter la pompe.
          Il convient alors de vérifier que chaque vanne d'arrêt est fermée.
          Si la vanne se ferme, la MTU doit en informer l'opérateur.
          Si la vanne ne s'est pas fermée, il doit en informer l'opérateur et renvoyer la commande à la RTU, en lui répétant de
           fermer la vanne.
          Après un certain nombre d'essais prédéterminés, la MTU doit informer l'opérateur que la vanne a refusé de se
           fermer et arrêter d'essayer de fermer la vanne.
                    SYSTÈMES SCADA
 Les unités MTUs
                                                 SYSTÈMES SCADA
 Les unités MTUs
     Interface d'une image du processus
          En plus de ces actions, qui se produisent à l'arrêt, la MTU doit informer l'opérateur chaque fois qu'il lui est demandé
           de l'état de la pompe ou des vannes d'arrêt.
          La MTU doit permettre à l'opérateur d'ouvrir ou de fermer à distance l'une des vannes d'arrêt.
          Lors des changements de poste et sur demande, elle doit imprimer un rapport indiquant la quantité du fluide qui a
           été sortie du pipeline au cours du dernier poste, au cours des vingt-quatre dernières heures et au cours de la période
           de vingt-quatre heures précédente.
          Le MTU doit également imprimer, utilisant une imprimante d'alarme séparée, une description qui comprend la date
           et l'heure de chaque modification d'une condition d'alarme au fur et à mesure qu'elle se produit.
                                                SYSTÈMES SCADA
 Les unités MTUs
     Interface d'une image du processus
          Au niveau physique, comme le montre la figure, la configuration de la MTU est très similaire à la configuration
           d'un ordinateur de bureau.
          Une VDU ou un écran doit être décrit (VGA, EGA, couleur, etc ...), et l'imprimante de rapport doit être décrite
           (protocole, alimentation papier, mise en page, etc ...).
          L'imprimante du journal des alarmes doit être décrite de la même
         manière.
          Les connexions à la RTU doivent être configurées.
          En supposant des communications radio full-duplex, les informations
         de configuration doivent inclure des éléments tels que la durée de mise
         en marche de l'émetteur radio, le débit de données et le protocole.
          Ceux-ci décrivent l'équipement physiquement connecté au MTU.
                                                 SYSTÈMES SCADA
 Les unités MTUs
     Interface d'une image du processus
          Au-delà de la communication radio, plusieurs couches doivent être configurées.
          La MTU doit être informé du nombre de RTU et de leur identification.
          Dans cet exemple, les chiffres montrent qu'il existe trois RTU et que leurs numéros d'identification sont 1, 2 et.
          La MTU doit également savoir ce qui est connecté à chaque terminal de chaque RTU.
          La configuration de la MTU doit bien entendu être identique à la configuration de la RTU à ce niveau, seule la RTU
           avec le numéro d'identification 1 sera considérée ici.
                                                 SYSTÈMES SCADA
 Les unités MTUs
     Interface d'une image du processus
          Les entrées et sorties de la RTU ont été regroupées.
          À ce stade, nous définirons toutes les sorties discrètes comme étant codées
           001, toutes les entrées discrètes comme 010 et toutes les entrées du
           totalisateur comme 011.
          S'il y avait des entrées analogiques, des sorties analogiques ou des sorties
           de train d'impulsions, elles seraient également identifiées comme des
           groupes.
          Il faut noter que de nombreux points de configuration au sein des groupes
           sont affichés comme NC (non connecté).
          Les RTU sont physiquement construits comme des dispositifs modulaires
           et, même si un seul totalisateur est nécessaire, le plus petit module
           disponible peut être formé de 4.
          Le plus petit module disponible pour les sorties TOR ou les entrées TOR
           peut être 4, 8 ou 16.
                                               SYSTÈMES SCADA
 Les unités MTUs
     Interface d'une image du processus
          Avec ce système de codage simple, nous avons maintenant décrit essentiellement tout ce qui est connecté au MTU.
          Par exemple, pour désactiver la pompe numéro 4, le MTU doit fournir un signal au modem qui dit: "Mettre un
           'zéro' dans l'adresse de registre suivante":


          Pour connaître l'état du commutateur d'alarme de pression basse au milieu de la canalisation, le MTU doit
           ordonner à RTU2 de notifier l'état avec le code suivant, qui identifie une position de registre:
                                                 SYSTÈMES SCADA
 Les unités MTUs
     Interface d'une image du processus
          Selon que ce soit un 0 ou un 1 qui se trouve dans cette position de registre, la MTU comprend que la pression est
           basse ou normale.
          Un seul bit est, donc, suffisant pour changer une position de vanne ou lire l’état d’un interrupteur.
          Cependant, cela n'est vrai que si beaucoup de planification a été apportée au message et si beaucoup de soin a été
           apporté à la configuration du système pour que la MTU et les RTU sachent exactement où se trouve chaque
           information.
          D’autre part, les entrées du totalisateur et les points analogiques sont légèrement plus complexes que les points
           discrets.
          Les informations de ces types de signaux ne peuvent pas être contenues dans un bit.
          Habituellement, un mot analogique ou totalisateur se compose de seize bits.
          Tant que la MTU et la RTU sont configurés de la même manière et que le protocole de communication peut gérer
           la taille du mot, le nombre de bits n'a pas d'importance.
                                                SYSTÈMES SCADA
 Les unités MTUs
     Interface d'une image du processus
          Le message envoyé par la MTU à la RTU décrira l'emplacement du premier bit du mot du registre.
          Lorsque la RTU reçoit ce message, il enverra les informations qui se trouvent à cet emplacement ainsi que les
           quinze emplacements suivants à la MTU.
          Avec cette quantité de détails, la MTU peut être informé de ce qui se passe partout dans son univers.
          Elle peut également atteindre tous les points qui lui sont connectés pour effectuer des changements.
          Des éclaircissements sont encore nécessaires.
          Ce serait une véritable gêne si l'opérateur devait mémoriser ces codes longs, si faciles à manipuler pour un
           ordinateur.
          Une interface d'entrée-sortie opérateur ou une interface homme-machine doit être configurée.
                                               SYSTÈMES SCADA
 Les unités MTUs
     Interface d'une image du processus
          Après cela, lorsque l'opérateur demande la condition d'alarme de basse pression à RTU 1, la MTU saura qu'on lui
           demande quel bit est dans la position de registre 0100101 dans le numéro de RTU 0001; elle saura que si elle en
           trouve un dans cette position de registre, le message qu‘elle doit envoyer au VDU est «La pression d'entrée du
           pipeline est normale».
          Une fois la configuration est réalisée correctement, le système SCADA aurait une image complète du processus et
           aurait la capacité de transmettre les informations aux opérateurs aux RTUs et aux autres.
                                                  SYSTÈMES SCADA
 Exemple d’application:
     Dans une usine nous disposant de 2 RTUs, et d’une MTU.
     La RTU-1 (ID: 0000 0001) est connectée à:
          Une vanne (V1) à deux positions (ON/OFF) (registre 02 première position 01)
          Une vanne (V2) à ouverture en (25%, 33%, 5%, 66%, 75% et 100%) (registre 03 première position 01)
          Un capteur de pression (0µA et 1mA) (registre 04 première position 01)
          Un détecteur de présence (registre 12 première position 01)
      La RTU-2 (ID: 0000 0010) est connectée à
           Un thermocouple (sortie entre 2 mV et 10 mV) (registre 06 première position 01)
           Un détecteur de présence (numérique) (registre 07 première position 01)
           Une vanne (V3) à deux position (ON/OFF) (registre 08 première position 01)
           Un totaliseur de nombre d’impulsion (registre 09 première position 01)
     1- Donner la configuration de la MTU
     2- La MTU désire fermer la vanne V2 à 75%. Donner le code que la MTU émettra sur le réseau
     3- Le thermocouple fournit une valeur de sortie de 4 mV, donner la valeur du registre associé.
     4- La MTU demande une description totale de la RTU-1 sachant que la V1 est ouverte, V2 est ouverte à 75%, le capteur de
     pression délivre un courant de 500µA et le détecteur de présence détecte la présence d’un objet. Donner le message envoyé
     par la RTU-1
SYSTÈMES DE CONTRÔLE
     DISTRIBUÉS
                                  SYSTÈMES DE CONTRÔLE DISTRIBUÉS
 Introduction:
     Nous avons signaler que les DCS sont utilisé dans l’industrie chimique, pétrochimique, de raffinage, pharmaceutique,
       alimentaire, cimenterie, eau et eaux usées, pétrolière etc.
     Les automatisations présentées sont utilisées dans les processus de batch, de Fed-batch ou continus.
     Les installations à base de DCS peuvent être utilisées avec un seul site ou plusieurs sites se trouvant dans la même zone
      ou éparpillés sur la carte du monde en utilisant les micro-ondes, les satellites, Internet, et d’autres technologies permettent
      la communication entre les zones lointaines.
     Les systèmes les plus récents incluent des options pour les infrastructures optiques, filaires et sans fil.
     Les technologies actuelles dans les champs de la communication et les systèmes embarqués offrent des produits et des
      ressources qui peuvent jouer un rôle actif dans le processus de production
     Cette nouvelle capacité active génère des changements radicaux dans l’organisation et les systèmes d’informations,
     En effet, de nouvelles approches sont appliquées pour la modélisation, le test et l’évaluation des fonctionnalités.
     Aussi, les avancées récentes dans la microélectronique, l’informatique, les systèmes de régulation embarqués et les
      logiciels permettent d’une manière significative d’améliorer les fonctionnalité, la complexité et l’évolutivité des processus
      de fabrication
                                  SYSTÈMES DE CONTRÔLE DISTRIBUÉS
 Introduction:
     L'emplacement physique de l'usine dicte souvent l'approche qui doit être adoptée dans la conception de l'usine et les
       matériaux de construction.
     Par exemple, dans les usines de pâtes et papiers situées dans de nombreuses régions d'Amérique du Nord, il est assez
       courant de construire des enceintes autour du processus de sorte que même les plus gros équipements, tels que les
       digesteurs continus de plus de 90m de hauteur, ne soient pas visibles de l'extérieur de la l’installation.
     Ces enceintes protègent le processus des basses températures qui peuvent chuter à moins de -1° C en hiver.
     Dans d'autres segments de l'industrie, tels que la fabrication pharmaceutique où des produits de grande valeur peuvent
      être produits, les enceintes d'équipement fournissent un environnement de salle blanche soutenu par des systèmes
      spéciaux de traitement de l'air pour maintenir la température, l'humidité et la qualité de l'air dans les limites souhaitées.
     Ainsi, selon l'emplacement de l'usine et le type de produit fabriqué, les équipements de transformation peuvent être
      contenus dans des bâtiments.
     Contrairement à ces exemples de construction d'installations fermées, dans un climat plus tempéré, une partie ou la
      totalité des équipements de traitement associés à une usine peuvent être situés à l'air libre sans aucune protection contre
      les éléments extérieurs.
                                   SYSTÈMES DE CONTRÔLE DISTRIBUÉS
 Organisation de l'usine :
    Dans la plupart des usines, l'équipement de traitement est organisé en groupes
      fonctionnels appelés zones de processus.
    Ainsi, si une personne dans l'usine reçoit des instructions sur la façon d'atteindre
      un équipement, alors ces instructions doivent inclure une référence à la zone de
      l'usine où l'équipement est situé.
    Par exemple, dans un processus de mise en pâte, la zone associée au
      blanchiment ou au traitement des grumes peut être appelée les zones de
      «blanchiment» ou de «cours à bois» de l'usine.
    Les noms de zone sont normalement attribués lors de la conception de l'usine
      pour faciliter la discussion ou la référence à différentes parties de l'usine.
    Les zones sont normalement subdivisées en unités et en équipements.
      Cette relation entre un site d'usine, des zones, des unités et des équipements est
       généralement modélisée à l'aide du modèle d'équipement S88, comme illustré
       dans la figure.
                                SYSTÈMES DE CONTRÔLE DISTRIBUÉS
 Organisation de l'usine :
    La portée d'un seul DCS sera un site de processus unique.
     Un site de traitement est divisé en une ou plusieurs zones d'usine nommées. Les
      stratégies de contrôle dans une zone doivent être étiquetées de manière unique.
     Une zone d'usine peut contenir plusieurs unités. Une unité peut contenir des
      modules d'équipement et des modules de commande.
     Un module de contrôle peut être contenu par une zone, une unité, un module
      d'équipement ou par un autre module de contrôle. Un module de commande
      peut contenir d'autres modules de commande ou blocs fonctionnels.
     Une zone ou une unité peut contenir plusieurs modules d'équipement. Un
      module d'équipement peut contenir d'autres modules d'équipement, des modules
      de commande et des blocs fonctionnels. La commande d'un module
      d'équipement est décrite en termes de SFC et de blocs fonctionnels.
                                   SYSTÈMES DE CONTRÔLE DISTRIBUÉS
 Organisation de l'usine :
    En plus de la hiérarchie physique de l'usine, il est courant d'utiliser d'autres hiérarchies pour aider à organiser les
      systèmes.
    Quatre organisations couramment utilisées qui sont utilisées sont résumées comme suit:
      Contrôle: dans la plupart des systèmes DCS, la hiérarchie de contrôle suit étroitement la hiérarchie S88. La hiérarchie
       S88 comprend le site, la zone, l'unité, le module d'équipement, le module de commande et l'élément de commande.
      Système de contrôle: Le DCS se compose de stations opérateur / configuration, d'ordinateurs hôtes, de contrôleurs, de
       périphériques IO, de dispositifs intelligents, de passerelles, etc. L'association entre ces équipements est capturée par le
       réseau de l'usine, le réseau de contrôle régional et le réseau IO.
      Opérations: La hiérarchie des opérations est utilisée à la fois par l'opérateur et les ingénieurs de maintenance comme
       principal moyen de trouver des affichages, des rapports, et d'autres articles qu'ils utilisent pour effectuer leur travail.
      Installation physique: La hiérarchie physique de l'usine est utilisée par les ingénieurs et techniciens de maintenance
       comme un moyen principal de voir les relations physiques (emplacement) et de parcourir les informations de
       maintenance sur les instruments et l'équipement de l'usine.
                               SYSTÈMES DE CONTRÔLE DISTRIBUÉS
 Exemples d’architecture de DCS:
                                  SYSTÈMES DE CONTRÔLE DISTRIBUÉS
 Exemples de DCS:
    En modularisant le système de production, un DCS réduit l'impact d'un seul défaut sur l'ensemble du système.
      Dans la plupart des systèmes, le DCS est interfacé avec le réseau de l'entreprise pour donner aux services commerciales
       une vue de la production.
      Un exemple de mise en œuvre montrant les composants et la configuration générale d'un DCS est illustré dans la figure
       suivant.
      Ce DCS englobe une installation entière, depuis les processus de production de bas niveau jusqu'à la couche entreprise ou
       entreprise.
      Dans cet exemple, un contrôleur de supervision (serveur de contrôle) communique avec ses subordonnés via un réseau de
       contrôle.
      Le superviseur envoie des points de consigne et demande des données aux contrôleurs de terrain distribués.
      Les contrôleurs distribués contrôlent leurs actionneurs de processus en fonction des commandes du serveur de contrôle et
       les signaux des capteurs de processus.
SYSTÈMES DE CONTRÔLE DISTRIBUÉS
                                  SYSTÈMES DE CONTRÔLE DISTRIBUÉS
 Exemples de DCS:
    La figure donne des exemples de contrôleurs de bas niveau trouvés sur un système DCS.
     Les dispositifs de contrôle de terrain illustrés comprennent un API, un contrôleur de processus, un contrôleur à boucle
      unique et un contrôleur de machine.
     Le contrôleur à boucle unique relie les capteurs et les actionneurs à l'aide d'un câblage point à point, tandis que les trois
      autres appareils de terrain intègrent des réseaux de bus de terrain pour s'interfacer avec les capteurs et actionneurs de
      processus.
     Les réseaux de bus de terrain éliminent le besoin de câblage point à point entre un contrôleur et des capteurs et
      actionneurs de terrain individuels.
     De plus, un bus de terrain permet une plus grande fonctionnalité au-delà du contrôle, y compris le diagnostic des
      dispositifs de terrain, et peut réaliser des algorithmes de contrôle dans le bus de terrain, évitant ainsi le routage du signal
      vers l'API pour chaque opération de contrôle.
     Les protocoles de communication industrielle standard conçus par des groupes industriels tels que Modbus et Fieldbus
      sont souvent utilisés sur les réseaux de contrôle et les réseaux de bus de terrain.
     En plus des boucles de contrôle au niveau de la supervision et au niveau du terrain, des niveaux de contrôle
      intermédiaires peuvent également exister.
                                 SYSTÈMES DE CONTRÔLE DISTRIBUÉS
 Exemples de DCS:
    Par exemple, dans le cas d'un DCS contrôlant une installation de fabrication de pièces discrètes, il pourrait y avoir un
      superviseur de niveau intermédiaire pour chaque cellule de l'usine.
    Ce superviseur comprendrait une cellule de fabrication contenant un contrôleur de machine qui traite une pièce et un
      contrôleur de robot qui gère le stock brut et les produits finis.
    Il pourrait y avoir plusieurs de ces cellules qui gèrent des contrôleurs de niveau terrain sous la boucle de contrôle de
      supervision DCS principale.
SYSTÈMES D’ARRÊT D’URGENCE
                                        SYSTÈMES D’ARRÊT D’URGENCE
 Qu’est ce qu’un ESD (Emergency Shut Down System)?


     L'arrêt d'urgence est un arrêt du processus, dû à la défaillance de l’alimentation ou à la défaillance de composants
      importants de l'usine (comme une panne d'alimentation de la pompe, une panne d'alimentation en réactif ou une panne
      de four, etc.).


     Un système d'arrêt d'urgence est une méthode permettant d'arrêter les opérations de processus et de s'isoler des
      connexions ou des courants entrants pour réduire rapidement la possibilité d'un événement indésirable.


     Le but du système ESD est de protéger le personnel, de protéger les installations et de prévenir les impacts
      environnementaux des activités de processus.


     Le système ESD est considéré comme l'un des principaux systèmes de sécurité pouvant être fournis pour toute
      installation.
                                     SYSTÈMES D’ARRÊT D’URGENCE
 Qu’est ce qu’un ESD (Emergency Shut Down System)?


     Un système ESD pour un système de commande de processus comprend une vanne d'arrêt d'urgence et un actionneur de
      vanne associé.


     Un contrôleur d'arrêt d'urgence (ESD) fournit des signaux de sortie à la vanne ESD en cas de défaillance du système de
      contrôle de processus.


     Une électrovanne répond au contrôleur ESD pour mettre l'actionneur en état de défaillance. Un test du contrôleur de
      vanne numérique (DVC) effectue la course de la vanne ESD.


     Un dispositif d'amplification d'impédance permet l'alimentation en courant continu de l'électrovanne sur une ligne à deux
      fils tout en permettant une communication numérique sur la même ligne.
                                     SYSTÈMES D’ARRÊT D’URGENCE
 Fonctionnalité


    Traditionnellement, les analyses de risque ont conclu que le système d'arrêt d'urgence a besoin d'un niveau d'intégrité de
     sécurité élevé, généralement SIL 2 ou 3.


    Fondamentalement, le système se compose de capteurs montés sur site, de vannes et de relais de déclenchement, d'une
     logique système pour le traitement des signaux entrants, d'unités d'alarme et d'IHM.


    Le système est capable de traiter les signaux d'entrée et d'activer les sorties conformément aux tableaux de cause à effet
     définis pour l'installation.
                                     SYSTÈMES D’ARRÊT D’URGENCE
 Actions typiques d'un système d'arrêt d'urgence


     Arrêt des systèmes de pièces et des équipements
     Isoler les inventaires d'hydrocarbures
     Isoler les équipements électriques
     Empêcher l'escalade des événements
     Arrêter l'écoulement des hydrocarbures
     Dépressuriser / purger
     Contrôle de la ventilation d'urgence
     Fermer les portes étanches et les portes coupe-feu
     Développement de projet centralisé pour les besoins de sécurité et de processus
                                    SYSTÈMES D’ARRÊT D’URGENCE

 Étant donné que le système ESD est construit sur la même plate-forme de contrôle que le système d'automatisation de
  processus, vous pouvez répondre à vos besoins en matière de contrôle de processus et de sécurité fonctionnelle avec une
  plate-forme de contrôle commune.


 Un système de contrôle unique peut être utilisé pour développer à la fois des applications de contrôle de processus et de
  sécurité fonctionnelle.


 Des outils d'analyse statique sont fournis pour aider à la vérification et à la validation de la stratégie de sécurité.


 Avec une plate-forme unique et un atelier logiciel, la plaeforme peut fournir des solutions pour les applications de sécurité
  des processus, discrètes et fonctionnelles, réduisant ainsi le besoin de pièces de rechange, de formation et d'assistance et
  permettant des économies considérables.
SYSTÈMES DE CONTRÔLE DE GESTION
    DE L’ENERGIE ELECTRIQUE
        SYSTÈMES DE GESTION DE CONTRÔLE DE L’ENERGIE ELECTRIQUE
 Définition du système de contrôle de gestion


     Il existe une grande variété de termes pour décrire les activités de contrôle.


     Parmi ceux-ci, le terme «contrôle de gestion» représente probablement le terme le plus connu et le plus
      répandu dans le vocabulaire de la gestion d'entreprise.


     Il est , à ce titre, le plus conditionné par des interprétations subjectives.


     De plus, les procédures de contrôle ont évolué au fil des années, préférant de temps à autre des solutions
      visant à résoudre les besoins opérationnels contingents.


     Entendu au sens «traditionnel» par exemple, le contrôle de gestion met l'accent sur les résultats de nature
      économique et financière et ne prend que partiellement en considération deux problèmes émergeant dans la
      gestion d'entreprise:
          le jaugeage et le traitement des facteurs décisifs sous-jacents à l'avantage concurrentiel (par exemple la
           satisfaction du client);
          la surveillance systématique de l'environnement extérieur.
        SYSTÈMES DE GESTION DE CONTRÔLE DE L’ENERGIE ELECTRIQUE
 Définition du système de contrôle de gestion


     Un système de gestion de l'énergie (SGÉ) est un processus d'amélioration continue en énergie qui est
      structuré et systématique. Inspiré de la norme volontaire du Management de l’énergie - ISO 50 001 (adopté en
      2011).


     Le suivi de la consommation d’énergie devient une partie intégrante des méthodes de gestion en rendant
      l’énergie visible.


     Dans le but :


          d’identifier et de quantifier la consommation d'énergie inutilement utilisée ;


          de découvrir un potentiel d'économie insoupçonné;


          d’améliorer le rendement énergétique;
        SYSTÈMES DE GESTION DE CONTRÔLE DE L’ENERGIE ELECTRIQUE
 Exemple de projets


     Projets traditionnels en efficacité énergétique:


     Nécessitent des investissements en capital.


     Sont en compétitions avec d’autres projets d’investissements dans l’entreprise et sont parfois reportés.


     Les projets les plus rentables ou les plus faciles sont déjà fait
