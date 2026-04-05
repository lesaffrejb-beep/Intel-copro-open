# Audit technique exhaustif — wiki-copro

Date d'audit : 2026-04-04  
Auditeur : GPT-5.3-Codex (simulation due diligence technique)

## 0) Scope & méthode

- Périmètre analysé : dépôt complet (`wiki/`, `raw/`, `scripts/`, `dashboard/`, CI GitHub Actions, docs d'architecture).
- Vérifications exécutées :
  - `./scripts/lint.sh` (intégrité wiki)
  - `./scripts/metrics.sh` (métriques volumétriques)
  - `cd dashboard && npm run build` (build prod + tailles JS)
  - recherche statique TODO/FIXME/secrets/usages dépendances.
- Limites : pas de trafic réel, pas de DB relationnelle, pas de test de charge exécuté, pas d'audit CVE exhaustif possible sans lockfile npm.

---

## 1) ARCHITECTURE & SCALABILITÉ

### Synthèse
Architecture hybride : **knowledge-base Git/Markdown + dashboard Next.js fullstack sans couche service dédiée**. Le design est pertinent pour un usage solo/équipe réduite, mais pas pour une montée en charge multi-utilisateurs concurrente. Le principal goulot est l'accès synchrone au filesystem (lecture/écriture markdown) depuis des routes API dynamiques.

### État actuel (factuel)
- Type : monolithe applicatif Next.js (SSR + API routes) + scripts Bash offline.
- Persistance : fichiers Markdown (`wiki/`, `raw/`) ; aucune base de données, aucun cache partagé.
- Front/back : séparation partielle via `src/app` + `src/lib`, mais forte dépendance backend ↔ structure de fichiers.
- State management front : local state React (`useState`), pas de store global (cohérent vu la taille actuelle).

### Problèmes critiques
1. **Scalabilité I/O quasi nulle** : chaque requête API lit/parse des fichiers depuis disque sans cache (`fs.readFileSync`, `fs.readdirSync`). À ~1000 utilisateurs simultanés, saturation CPU + I/O + latence en cascade probable.
2. **Concurrence d'écriture non gérée** : `PATCH/POST /api/contacts` écrivent directement dans des fichiers sans verrou/transaction/versioning.
3. **Aucune architecture de service isolant le domaine “contacts”** : le dashboard écrit dans `wiki/meta/contacts`, couplage fort entre UI et base documentaire.

### Problèmes majeurs
- Routes majoritairement `force-dynamic` + `revalidate=0` : coût server-side maximum, pas d'amortissement cache.
- Parsing markdown systématique (`gray-matter`) sans memoization.
- Pas de stratégie pour multi-instance (si 2 pods écrivent simultanément, collisions/perte possible).

### Quick wins (< 2h)
- Ajouter cache mémoire TTL sur `getMetrics`, `listContacts`, `getWikiArticlesByCategory`.
- Introduire write-lock simple (file lock) côté contacts.
- Passer certaines pages en statique/revalidation légère (ex. `/wiki`).

### Refactoring long terme (> 1 semaine)
- Extraire un service “knowledge API” (DB + indexation) et garder le dépôt Git comme source de vérité asynchrone.
- Introduire queue d'ingestion + worker.
- Séparer lecture (read model cache/indexé) et écriture (pipeline contrôlé).

### Note /10
**4.5/10** — acceptable pour MVP solo, insuffisant pour scale investisseur.

---

## 2) CODE MORT & DETTE TECHNIQUE

### Synthèse
Dette modérée à forte côté dashboard : plusieurs fichiers volumineux, duplication UI inline styles, dépendances non utilisées, absence de tests automatisés. Côté scripts Bash, robustesse correcte mais duplication de logique de slugification et de scanning.

### Problèmes critiques
- Aucun test unitaire/intégration/E2E : risque de régression élevé.
- Aucun lockfile npm dans `dashboard/` : reproductibilité build/sécurité dégradées.

### Problèmes majeurs
- **Dépendances probablement inutilisées** dans `dashboard/package.json` : `react-markdown`, `rehype-highlight`, `remark-gfm` (non référencées dans `src/`).
- Fichiers trop longs (maintenabilité) :
  - `dashboard/src/app/contacts/[slug]/page.tsx` (~444 lignes)
  - `dashboard/src/components/contacts/DiscAssessment.tsx` (~374 lignes)
  - `dashboard/src/components/cockpit/PipelinePanel.tsx` (~340 lignes)
  - `dashboard/src/lib/disc.ts` (~302 lignes)
- Duplication de patterns de style inline (potentiel >20 lignes répétées sur plusieurs composants cockpit/contacts).
- Duplication de logique Python `kebab-case` dans plusieurs scripts (`granola-import.sh`, `pdf-to-raw.sh`, `sources-catalog.sh`).

### TODO/FIXME critiques
- Pas de TODO/FIXME critiques détectés dans le code applicatif.

### Quick wins (< 2h)
- Ajouter `package-lock.json` (`npm i --package-lock-only`) + scanner CVE.
- Supprimer dépendances inutilisées.
- Extraire composants UI répétitifs (badge row, meta blocks, style objects communs).

### Refactoring long terme (> 1 semaine)
- Découper page contact en sous-composants et hooks dédiés (fetch/update/assessment).
- Introduire design system (tokens + composants atomiques), retirer inline styles massifs.
- Centraliser utilitaires shell (slugify, date parse).

---

## 3) SÉCURITÉ (OWASP TOP 10)

### Synthèse
Le risque principal n'est pas SQLi (pas de DB SQL ici), mais **l'absence totale d'authN/authZ** sur des endpoints qui lisent/écrivent des données internes sensibles. En l'état, exposer ce dashboard sur Internet serait dangereux.

### Problèmes critiques
1. **A01 Broken Access Control — CRITIQUE**  
   `GET/POST/PATCH /api/contacts*` et `/api/metrics` sans authentification ni autorisation. Toute personne atteignant l'URL peut lire/écrire.
2. **A04 Insecure Design / A01 — CRITIQUE**  
   Données `wiki/meta/contacts` (sensibles) exposables via API sans garde-fou.
3. **A05 Security Misconfiguration — HAUTE**  
   Pas de rate limiting, pas de protection anti-abus, pas d'IP throttling.
4. **A03 Injection (Path Traversal potentielle) — HAUTE**  
   Slug issu de paramètre URL utilisé pour construire un chemin fichier sans validation stricte (`path.join(CONTACTS_DIR, `${slug}.md`)`).

### Problèmes majeurs
- Pas de journalisation sécurité (audit trail des modifications).
- Pas de politique CORS explicite (sur Next par défaut, dépend du déploiement reverse proxy).
- Pas de validation de schéma stricte des payloads (zod/yup absent).

### CVE dépendances
- Audit CVE npm **non vérifiable** actuellement : `npm audit` bloqué car lockfile absent.

### Quick wins (< 2h)
- Protéger toutes les routes API par auth (clé d'admin minimale au départ).
- Valider `slug` par regex stricte (`^[a-z0-9-]+$`).
- Ajouter limite de débit basique (middleware).

### Refactoring long terme (> 1 semaine)
- Mettre en place auth robuste (OIDC/session server).
- RBAC (`read_metrics`, `read_contacts`, `write_contacts`).
- Chiffrement au repos des données sensibles hors Git.

---

## 4) PERFORMANCE FRONT-END

### Synthèse
La perf front est correcte pour un outil interne léger, mais l'approche “tout dynamic SSR” + gros composants client peut pénaliser le TTFB et le coût serveur en charge. Bundle initial raisonnable, mais architecture non optimisée pour scale.

### Mesures observées
- Build Next OK.
- First Load JS partagé : ~102 kB.
- Route la plus lourde : `/contacts/[slug]` ~109 kB first load.

### Problèmes critiques
- Aucune instrumentation réelle Core Web Vitals (pas de RUM).

### Problèmes majeurs
- Pages clés dynamiques sans cache (coût serveur récurrent).
- Composants très volumineux -> risque re-render inutile et coût maintenance.
- Pas de stratégie explicite de lazy loading des blocs lourds (assessment/stratégie).

### Quick wins (< 2h)
- `dynamic(() => import(...))` pour blocs non critiques (assessment).
- Mettre en cache réponses `/api/metrics` 30–60s.
- Déporter styles inline répétés vers classes CSS.

### Refactoring long terme (> 1 semaine)
- Découper routes en server components plus fins + client islands ciblées.
- Mettre en place RUM Web Vitals + budget perf CI.

---

## 5) PERFORMANCE BACK-END & “DATABASE” (filesystem)

### Synthèse
Pas de DB relationnelle => pas de N+1 SQL, mais le filesystem joue le rôle de base et devient le point de contention. La latence dépendra fortement du volume de fichiers et de la concurrence.

### Problèmes critiques
- Lecture récursive synchrone du wiki en requête (`walkDir`) : coût O(N fichiers).
- Écritures markdown synchrones concurrentes sans verrou.

### Problèmes majeurs
- Pas de pagination API sur contacts (liste brute complète).
- Pas de cache partagé.
- Timeouts non explicitement maîtrisés côté fetch client (pas d'abort controller).

### Gains chiffrés estimés
- Cache mémoire métriques/wiki : **-100 à -400 ms** par requête à chaud.
- Pré-index des articles (job périodique) : **jusqu'à -80% CPU** sur endpoints read.
- Lock + file queue : baisse des corruptions/overwrites de **~100% à quasi 0**.

---

## 6) QUALITÉ DU CODE

### Synthèse
Le code est lisible et typé en TypeScript strict, mais souffre d'une dette structurelle (gros fichiers, inline styles, absence de tests, absence de lint TS/ESLint dédié dashboard). Qualité “artisanale avancée”, pas “plateforme pro”.

### Problèmes critiques
- Couverture tests = 0%.
- Aucun pipeline qualité code spécifique dashboard (lint TS/ESLint/format).

### Problèmes majeurs
- Fonctions/composants longs (>50 lignes) nombreux.
- Fichiers >300 lignes multiples.
- Patterns UI répétitifs non factorisés.

### Sonar simulé
- **Note globale qualité : C**
- Maintainability: C-
- Reliability: C
- Security hotspot density: D+
- Testability: E

---

## 7) DEVOPS & PRODUCTION-READINESS

### Synthèse
Une CI wiki existe, mais la partie application dashboard n'a pas de pipeline de qualité/sécurité complet. L'observabilité et la résilience prod sont insuffisantes pour un déploiement sérieux.

### Problèmes critiques
- Pas de pipeline CI dashboard (tests/build/audit sécurité dédiés).
- Pas de stratégie rollback documentée.
- Pas de monitoring/APM (Sentry/Datadog/OpenTelemetry).

### Problèmes majeurs
- Pas de séparation documentée dev/staging/prod.
- Pas de `/health` et `/ready` dédiés.
- Variables d'environnement non documentées (pas de `.env.example`).

### Quick wins (< 2h)
- Ajouter job CI `dashboard`: install, typecheck, build.
- Ajouter endpoint `/api/health`.
- Ajouter `.env.example` + README “runbook minimal”.

### Refactoring long terme (> 1 semaine)
- Déploiement conteneurisé + observabilité + alerting.
- Procédure incident + rollback + sauvegarde/restauration.

---

## 8) TECHNOLOGIES & STACK

### Synthèse
Stack moderne (Next 15, React 19, TS 5), globalement alignée standards 2025/2026. Le problème n'est pas la modernité mais l'industrialisation incomplète et l'usage non maîtrisé de la couche filesystem comme backend applicatif.

### Points majeurs
- Stack front récente, bonne base.
- Dépendances markdown inutilisées probables = complexité inutile.
- Pas de lockfile = drift de versions.

### Recommandations
- Figer dépendances + update policy mensuelle.
- Éliminer libs non utilisées.
- Définir standards d'architecture (ADR, conventions API, sécurité by default).

---

## 9) DOCUMENTATION & MAINTENABILITÉ

### Synthèse
Documentation métier/wiki excellente et abondante. Documentation produit logiciel (runbook, sécurité, architecture dashboard, onboarding dev fullstack) insuffisante pour transmission rapide à une équipe technique.

### Problèmes critiques
- Pas d'ADR techniques pour choix structurants (filesystem backend, dynamic routes, auth model).
- Onboarding développeur applicatif incomplet (tests, conventions, flux release).

### Problèmes majeurs
- README très orienté workflow wiki, moins orienté exploitation applicative.
- API non documentée (pas d'OpenAPI/Swagger).

### Note maintenabilité reprise
**5.5/10** (bon sur contenu métier, moyen-faible sur industrialisation logicielle).

---

## 10) VERDICT FINAL

### Pondération utilisée
- Sécurité 30%
- Architecture/Scalabilité 20%
- Qualité code/tests 15%
- DevOps/prod readiness 15%
- Performance 10%
- Documentation/maintenabilité 10%

### Note globale
**46/100**

### Verdict
🔴 **REFONTE OBLIGATOIRE** (< 50) pour exposition production/investisseur.

### Estimation effort pour niveau professionnel
- **18 à 30 jours homme** (1 dev senior fullstack + ponctuel DevOps/Sec).

### 3 deal-breakers (kill production)
1. **Absence d'auth/authz sur APIs sensibles**.
2. **Couplage filesystem synchrone sans verrou ni cache (scalabilité + intégrité)**.
3. **Zéro tests automatisés et CI applicative incomplète**.

---

## 11) Plan d'action priorisé (90 jours)

### Semaine 1–2 (sécurité immédiate)
- Auth obligatoire sur toutes API.
- Validation schéma + slug hardening.
- Rate limiting + logs d'audit.

### Semaine 3–5 (fiabilité)
- Tests unitaires/API prioritaires (contacts + metrics).
- CI dashboard complète (typecheck, test, build, audit deps).
- Lockfile + audit CVE récurrent.

### Semaine 6–9 (scalabilité)
- Cache lecture + pré-index wiki.
- Écriture sérialisée/transactionnelle.
- Pagination + optimisation endpoints.

### Semaine 10–12 (industrialisation)
- Monitoring + alerting + health endpoints.
- Runbooks incident/rollback.
- ADR architecture + standard d'onboarding dev.

