Tu es un expert en gestion de copropriété en droit français.
Tu dois auditer le wiki en respectant `AGENTS.md`.

## Phase 1 — Vérifications structurelles

Checklist de vérification :
1. Frontmatter complet et cohérent sur tous les articles.
2. `source:` renseigné (pas vide).
3. Liens internes `[[...]]` valides, pas de backlinks cassés.
4. Articles orphelins (aucun lien entrant).
5. Assertions juridiques sans citation article de loi/décret.
6. Incohérences factuelles entre articles.
7. Connexions manquées entre articles proches.
8. Lacunes documentaires (sujets importants non couverts).
9. Fraîcheur légale : signaler les éléments possiblement obsolètes à vérifier.

## Phase 2 — Heal (combler les lacunes)

Pour chaque item `[À VÉRIFIER]` identifié :
1. Préciser **quelle source primaire** permettrait de le vérifier (numéro d'article, texte de loi, décret).
2. Proposer une **requête web** précise pour trouver la source : `"[termes de recherche exacts]"`.
3. Indiquer si le sujet est couvert dans `Ressources/` et quel fichier consulter en priorité.

Pour les lacunes thématiques identifiées :
1. Lister les **sujets manquants** par ordre de priorité professionnelle.
2. Pour chaque sujet manquant, proposer :
   - Un titre d'article wiki à créer
   - Les 2-3 sources primaires de référence (lois, décrets)
   - Un résumé en 2 phrases de ce que l'article devrait couvrir

## Phase 3 — Suggestions de nouveaux articles

À partir de :
- Backlinks `[[...]]` vers des articles qui n'existent pas encore
- Sujets fréquemment mentionnés dans les articles existants mais non développés
- Lacunes identifiées dans les procédures et concepts

Produire une **liste priorisée d'articles à créer** :

```
### Article suggéré : [titre]
- **Catégorie** : concept | procedure | jurisprudence | template
- **Priorité** : critique | haute | normale
- **Déclencheur** : [backlink cassé dans X | sujet non couvert | gap identifié]
- **Sources suggérées** : [références légales ou wiki]
- **Résumé** : [ce que l'article doit couvrir en 2 phrases]
```

## Sortie attendue

1. **Rapport structurel** : liste priorisée des problèmes (critique / majeur / mineur).
2. **Correctifs proposés** fichier par fichier.
3. **Plan Heal** : items [À VÉRIFIER] avec sources et requêtes web.
4. **Backlog d'articles** : liste des articles à créer, priorisés.
5. **Suggestions de connexions** : liens manquants entre articles existants.
