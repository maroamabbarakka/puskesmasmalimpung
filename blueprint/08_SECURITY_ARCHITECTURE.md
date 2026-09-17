# 08 — ARSITEKTUR FRONTEND/BACKEND & SECURITY GUARDRAILS

## Domain isolation
`public_content` (CMS), `clinical` (CKG/RME existing), `analytics_private` (aggregate/internal PWS), `analytics_public` (published aggregate snapshots), `workforce` (attendance/KPI). Separasi secara minimal **otorisasi & deployment/config**, bukan cukup beda nama collection. Cari keputusan apakah beda Firebase project/infrastruktur lebih tepat untuk PHI dan domain SDM. Anggaran infrastruktur dan syarat host disepakati instansi; jangan berasumsi Spark plan mencukupi server processing, ETL, audit, API, backup.

## Frontend architecture (suggested)
- Public app: SSR/SSG untuk konten informasi dan indexability; route-based code splitting, first load fast pada HP, no PHI SDK initialization in public bundle.
- Office app: authentication via instansi-approved IdP, server-verified role/claim, session expiry & revocation, per-module authorization; bukan hanya conditional rendering menu.
- Shared design library: tokens/color/typography/Button/Tag/InfoCard/IndicatorCard/MethodPanel/PageHero/DocumentLink/EmptyState/StatusBadge. Jangan share clinical state store dengan public app.
- CMS editorial: non-technical admin can publish; role-based approvals; history; verify before go-live. Content API returns published only.
- Analytics BFF: secure backend aggregates publication snapshots; no browser → Firestore clinical or RME directly.

## Data governance and security
Reference: https://jdih.kemkes.go.id/documents/peraturan-menteri-kesehatan-nomor-24-tahun-2022 (RME) and UU PDP 27/2022 (data kesehatan/biometrik termasuk data pribadi spesifik). Implement RBAC, minimization, encryption in transit/at rest per infrastructure capabilities, managed secrets, least privilege service accounts, network controls, logs without PHI, audit immutability where practical, backups plus restore drills, incident response contacts, user consent/notice as legally required, documented legal basis and retention policies. App logging must scrub NIK, DOB, access tokens, clinical payload, biometric templates and geolocation individual. Public error must avoid stack traces and private IDs.

## API boundary example
`GET /api/public/v1/services?status=published` returns only approved service fields; cache and validation. `GET /api/public/v1/indicators/:id` returns approved aggregate snapshots + methodology, with suppression already applied. `/api/internal/v1/indicators` uses signed session+role plus per-region auth. `/api/integration/v1/ckg` receives calls ONLY from trusted server/service account, never exposed in browser. These are **proposed routes**, not existing API endpoints.

## Public map privacy
No patient coordinate. For low-cell and rare disease, documented suppression and secondary suppression/re-identification assessment; aggregated geolevel policy per disease. No downloadable table or filter combination that reconstructs private cells. Do not publish MH, HIV, TB or detailed reproductive health per small desa automatically. Approval by owner/authorized health steward required.

## Software supply chain
Separate staging/prod secrets and projects; no secrets in repo, browser bundles, `.env` checked in, screenshots or ZIP. Automated dependency audit, headers (CSP tuned, HSTS when deployment qualifies, Referrer-Policy, X-Content-Type-Options), prevent open redirects, XSS sanitization for rich CMS text, restrict uploaded file MIME/type and scanning, CSRF protection where cookies used. Fallback when external integration is down is static last approved snapshot marked stale—not unverified live query.

## Data ownership
Puskesmas / instansi induk is decision-maker for scope and official data. Developer is processor/operator under contract and access policy; admin technical cannot independently authorize publication of patient-derived indicators. Existing CKG data must remain additive-only—no destructive migrations before controlled change plan.

## Threat model starter
Threats: IDOR across staff roles; exposed Firestore rules; manipulated public indicator; token leakage; scraping small-cell maps; CMS content injection; malicious document upload; RME data drift; lost mobile device; unauthorized GPS/biometric processing; bad data pipeline causing misleading KPI; stale cache presented realtime. Test role matrix, rule unit tests, object-level checks, consent/notice, forced reauth, audit integrity, rate limiting, response drills.

## Production gate
Mandatory signoff for data controller/legal basis, privacy threat model, penetration test proportionate to risk, role-permission test, metadata/indicator validation, safe disclosure, backup restoration, incident procedure, availability runbook, approved domain and PSE compliance as applicable. UI demo is not proof of compliance.
