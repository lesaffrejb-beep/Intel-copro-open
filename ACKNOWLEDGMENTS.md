# Remerciements & sources d'inspiration

> *"If I have seen further, it is by standing on the shoulders of giants."*
> — Isaac Newton, 1675

Ce projet n'est pas parti de zéro. Il est le fruit d'idées empruntées, combinées
et adaptées au métier de syndic de copropriété. Voici les personnes, projets et
sources qui ont rendu ce wiki possible.

---

## L'idée fondatrice

### Andrej Karpathy — [@karpathy](https://x.com/karpathy)

Le post X qui a tout déclenché. L'idée qu'un LLM peut construire et maintenir
de façon incrémentale un wiki personnel — pas juste du RAG avec map, mais un
vrai *reduce* qui synthétise la connaissance au-delà des faits individuels.

> *"Chain of thought is a reduce (in addition to attention ofc), so I guess
> this can be seen as a bit more of a directed context compaction mechanism,
> inheriting structure from the preexisting idea of a wiki."*

C'est cette vision qui a donné naissance à notre boucle de capitalisation :
`Question → Réponse → File Back → Wiki enrichi → meilleure prochaine réponse`.

### Farza — [@FarzaTV](https://x.com/FarzaTV)

Farzapedia : 2 500 entrées de journal, Apple Notes et iMessages transformées
en 400 articles wiki personnels avec backlinks. La preuve concrète que le
concept fonctionne à grande échelle.

Son insight clé : *"A knowledge base that lets an agent find what it needs via
a file system it actually understands just works better [than RAG]."*

C'est exactement notre architecture : `wiki/index.md` comme point d'entrée,
des `[[wikilinks]]` pour la navigation, et un agent qui crawle la structure.

Gist de référence : [farzaa/personal-wiki](https://gist.github.com/farzaa/c35ac0cfbeb957788650e36aabea836d)

### Nick Spisak — [@NickSpisak_](https://x.com/NickSpisak_)

Son tutoriel pas-à-pas a structuré notre approche : trois dossiers
(`raw/`, `wiki/`, `outputs/`), un fichier schéma (`AGENTS.md`), et la
discipline du health check mensuel. Notre `scripts/lint.sh` et notre CI/CD
GitHub Actions viennent directement de cette idée.

### Linghua Jin — [@LinghuaJ](https://x.com/LinghuaJ)

Son commentaire sur le post de Karpathy a mis le doigt sur la pièce manquante
du RAG : *"RAG only has map and no reduce."* C'est cette observation qui a
confirmé notre choix d'un wiki compilé plutôt qu'un simple moteur de recherche
sur documents bruts.

### H. Floyd — [@HFloyd](https://x.com/HFloyd)

Son avertissement : *"When outputs get filed back, errors compound too."*
C'est ce qui a motivé notre système de linting automatique et de health checks
à chaque push — pour attraper les erreurs avant qu'elles ne se propagent.

---

## Philosophie & méthodologie

### Steph Ango — "File over app"

La philosophie qui sous-tend tout le projet : les données sont des fichiers en
formats universels (Markdown, images), pas des entrées dans une base de données
propriétaire. Le wiki est portable, interopérable, et survit aux outils qui
changent. Notre wiki s'ouvre aussi bien dans Obsidian, VS Code, ou un simple
éditeur de texte.

### Tiago Forte — "Building a Second Brain"

Le concept de "Second Brain" — une base de connaissances externe qui augmente
la mémoire humaine. Notre wiki est un Second Brain spécialisé en copropriété,
mais enrichi par l'IA plutôt que maintenu manuellement.

---

## Repos GitHub qui nous ont inspirés

### [dominikmartn/nothing-design-skill](https://github.com/dominikmartn/nothing-design-skill)

Skill Claude Code pour générer des interfaces dans le design language de
Nothing (Carl Pei). Nos tokens de design, notre palette OLED monochrome et
notre approche "instrument widgets" dans le dashboard viennent de là.

### [hilash/cabinet](https://github.com/hilash/cabinet)

Plateforme de knowledge base avec agents IA, Git auto-commit, et édition
WYSIWYG. On a emprunté : la hiérarchie sidebar, le Git auto-commit on save,
les agent templates avec cron, et l'édition Markdown via Tiptap.

### [agno-agi/pal](https://github.com/agno-agi/pal)

"Personal Agent that Learns" — système multi-agents avec boucle
d'apprentissage. Notre architecture d'agents spécialisés (juriste, comptable,
rédacteur) et notre boucle file-back s'inspirent de leur routing à 5 agents
et de leur `pal_learnings`.

---

## Outils & plateformes

| Outil | Contribution |
|-------|-------------|
| [Claude Code](https://claude.ai/code) (Anthropic) | Moteur principal — compilation wiki, agents, hooks, automatisation |
| [OpenAI Codex](https://chatgpt.com/codex) | Agent asynchrone pour les PR de structure et de compilation |
| [Obsidian](https://obsidian.md) | Format `[[wikilinks]]`, vault navigable, philosophie "File over app" |
| [Granola](https://granola.ai) | Capture audio des RDV terrain → transcription → `raw/notes-terrain/` |
| [Marp](https://marp.app) | Conversion articles wiki → slides de présentation |
| [GitHub Actions](https://github.com/features/actions) | CI/CD : lint + metrics automatiques à chaque push |

---

## Sources juridiques & institutionnelles

Ce wiki n'invente rien : il compile, structure et rend actionnable des sources
officielles. Merci aux institutions qui rendent ces données accessibles.

| Source | Usage |
|--------|-------|
| [Légifrance](https://legifrance.gouv.fr) | Textes de loi, décrets, codes — source primaire de toute affirmation juridique |
| [Service Public](https://service-public.fr) | Fiches pratiques (PAR+, DPE, droits des copropriétaires) |
| [ANAH](https://anah.gouv.fr) | Guide des aides financières à la rénovation 2025 |
| [ADIL49](https://adil49.org) | Données locales Maine-et-Loire : démographie, marché immobilier, parc locatif |
| [France Rénov'](https://france-renov.gouv.fr) | Parcours de rénovation, conseillers, financements |
| [Registre National des Copropriétés](https://registre-coproprietes.gouv.fr) | Données d'immatriculation Maine-et-Loire (3 859 copropriétés) |
| [Sénat — Commission d'enquête](https://senat.fr) | Rapport n° 736 sur la paupérisation des copropriétés (juillet 2024) |
| Conseil National de l'Habitat | Rapport sur l'avenir du métier de syndic (septembre 2025) |
| Convention IRSI | Cadre inter-assureurs pour les dégâts des eaux |
| Département de Maine-et-Loire | Rapport annuel 2024, PDHH 2020-2025 |
| Ville d'Angers | PSMV (Plan de Sauvegarde et de Mise en Valeur) |

---

## Travaux universitaires

Ces mémoires et thèses ont enrichi notre compréhension des sujets complexes.
Merci à leurs auteurs et à [HAL](https://hal.science) pour l'accès ouvert.

- **Agathe Malot** — *La prise en compte de la diversité des activités lors de
  la rédaction du règlement de copropriété d'un ensemble immobilier complexe*,
  Mémoire de Master, CNAM / ESGT, soutenu le 14 juin 2016
  → a nourri [[reglement-copropriete-ensemble-immobilier-complexe]]

- **Pauline Dalbin** — *Scission d'un grand ensemble initialement sous le
  régime de la copropriété en une division en volumes*, Mémoire de Master,
  CNAM / ESGT, soutenu le 24 juin 2015
  ([HAL dumas-01631746](https://dumas.ccsd.cnrs.fr/dumas-01631746v1))
  → a nourri [[scission-copropriete-division-volumes]]

- **Yannik Paquet** — *Le lot de copropriété, entre complexité et illusion :
  analyse de la nature juridique du lot de copropriété*, Thèse de doctorat en
  Droit Privé, Université Grenoble Alpes, soutenue le 3 juin 2016
  ([HAL tel-01411404](https://theses.hal.science/tel-01411404v1))
  → a nourri [[lot-copropriete-nature-juridique]]

---

## Guides & ressources professionnelles

- **Bernard Boublim** — *Le contrat d'entreprise*, référence sur les marchés
  de travaux en copropriété
- **Ooreka** — *Le guide de la copropriété*, vue d'ensemble accessible
- **APC (Agence Parisienne du Climat)** — Référentiel DTG et livret "Acteurs
  et actions de la rénovation en copropriété"
- **VINCI / Leonard** — *Réinventer la ville — En 2050, la ville des saisons*,
  Mastère MDC Audencia / Centrale Nantes, promotion 2021
- **DRIF / JESA Institut** — Guide d'analyse des contrats BTP (marchés)

---

## Le contexte humain

Ce wiki a été construit dans le cadre d'un stage dans un cabinet syndic de
copropriété. Merci à l'équipe pour la confiance et le terrain d'apprentissage.

Formation : cursus en gestion de patrimoine immobilier.

---

## Comment on a construit ça

| # | Ce qu'on a fait | D'où vient l'idée |
|---|----------------|-------------------|
| 1 | Wiki compilé par LLM (pas de RAG) | Karpathy, Linghua Jin |
| 2 | Structure `raw/` → `wiki/` → `outputs/` | Nick Spisak, Karpathy |
| 3 | Boucle de capitalisation file-back | Farza, agno-agi/pal |
| 4 | `[[wikilinks]]` + backlinks + index | Obsidian, "File over app" |
| 5 | Lint + health checks automatiques | Nick Spisak, H. Floyd |
| 6 | Agents spécialisés (juriste, comptable…) | agno-agi/pal |
| 7 | Design system Nothing-inspired | dominikmartn/nothing-design-skill |
| 8 | Dashboard knowledge base | hilash/cabinet |
| 9 | Compilation hybride Claude Code + Codex | Anthropic, OpenAI |
| 10 | Manifest incrémental + tendances | Karpathy ("incremental engine") |

---

*On n'a rien inventé. On a assemblé. Et c'est exactement comme ça que la
connaissance progresse.*

---

_Dernière mise à jour : 2026-04-05_
