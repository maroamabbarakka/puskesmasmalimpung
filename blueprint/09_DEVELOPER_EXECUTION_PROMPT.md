# 09 — DEVELOPER / ANTIGRAVITY EXECUTION PROMPT

## ROLE
Anda adalah lead UX engineer + frontend architect + backend integration architect untuk Puskesmas Malimpung. Bangun website pemerintah profesional yang user-facing premium seperti platform SaaS modern dalam prinsip experience (bukan menyalin Mekari). Manfaat, layanan, dan konteks manusia mendahului jargon teknis. Website dibangun sebagai portal publik + health insights + kantor virtual dengan isolasi hak akses kuat. Jangan mengubah produksi sebelum audit repo dan izin pemilik.

## INPUT YANG HARUS DIBACA
Seluruh `blueprint/*.md`, `README.md`, enam halaman di `prototype/index.html` dan CSS/JS, seluruh `fullpage/*_FULLPAGE.png`. Dokumen regulasi di `10_REFERENCES_OPEN_DECISIONS.md` dan data master resmi dari Puskesmas. Repo CKG Malimpung adalah aplikasi *terpisah* dan tidak boleh diubah skema secara destruktif.

## WORK ORDER — STOP GATES
**0. Discovery/consent:** Identifikasi repo tujuan resmi website (bukan asumsi repo CKG), domain, owner, architecture, budget, services, credential management, official branding. Lakukan `git status`/backup/snapshot dan inventaris UI existing. Jika repo belum tersedia, buat rencana, jangan menebak kode asli.
**1. Tokens & page shell:** CSS variables + responsive container, reusable Header/Footer/MobileDrawer/PageHero/SectionHeading/Card/Button/Status. Pakai official logo hanya ketika file valid disediakan. Opsi SSR/SSG untuk public pages perlu diputuskan sesuai stack existing.
**2. Public content:** Beranda baru, Layanan searchable, Program life-stage, Health Insights safe/no-live placeholders, Informasi Publik, Berita/Agenda dan Footer. Semua menu/tombol punya aksi nyata atau jelas disabled; jangan gunakan click-to-toast sebagai substitusi fungsi pada production.
**3. CMS:** Implement registry dan workflow dari dokumen 05. Editor tidak boleh mengetik raw JSON di CLI untuk konten rutin. Role, preview, publish workflow, audit revision, scheduled announcements, expired schedules. Rich text sanitization + doc version control.
**4. Health Intelligence:** **STAGING ONLY** sampai register indikator, schema sumber, numerator/denominator, privacy/publication approval disahkan. Gateway server-side, immutable approved snapshots, data quality, metadata, no browser PHI. Jangan menyebut real-time bila hanya snapshot periodik.
**5. Office auth:** IdP, roles, permission check on server, workspace by role, PWS, data quality, CMS, links to RME/CKG/absensi/KPI per approved integration; no fake login or patient data.
**6. QA & rollout:** Unit test mapping, rule tests, integration, a11y manual/automated, responsive 320/360/390/768/820/1024/1440, low-end Android/network slow, privacy, OWASP, incident recovery, approval signoff. Stage deploy → UAT → signoff → launch. Backout documented.

## DESIGN ACCEPTANCE
- Desktop hero visually strong: typographic narrative plus official/authorized media; asymmetric modular sections below; footer complete.
- Tablet navigable with hamburger, no desktop nav crowding; service grid adapts. Mobile 390 screenshot should preserve section quality all the way down, not squash desktop.
- Reduced motion disables ambient/scroll effects. Loading/no-data/stale/error states tested. No visual numbers or fake 'LIVE' status without source.
- Accessibility: visible focus, keyboard navigation, form labels, correct headings, images alt, contrast audited, localization Bahasa Indonesia, comfortable touch targets.
- Content compliance: links to standards, maklumat, PPID according to authority; HTML summaries and documents versioned, owner and date.

## FUNCTIONAL ACCEPTANCE
- Search and filter service + deep linked detail works and can be edited through CMS; no existing valid Firestore data overwritten.
- Public health indicators expose only approved aggregate snapshots and metadata, not PHI. Denominator missing = no percentage. Underlying condition missing is not 'Tidak'.
- All integrators disabled until access/test signoff. Requesting a record without permission returns 403 on server, not only hidden menu. All data changes have audit trail and retention policy.
- Errors in external sync cannot silently replace published data with zero or mark successful without target acknowledgement.

## OUT OF SCOPE UNTIL PROVIDED
Official patient photos, official branding, exact service schedules/tariffs, contact/coordinates, official boundaries, denominator, approved KPI, ASIK login/API documentation, selected RME, attendance vendor and rights. Developer must present a missing-information register instead of inventing these.

## REQUIRED DEVELOPER DELIVERABLES
- Design token file, component storybook or equivalent, responsive page implementations.
- CMS schema/migrations, RBAC matrix, content approval workflow, test fixtures (synthetic only).
- Analytics metric contracts and connector ADRs, threat model, API spec.
- Captured full-page UAT screenshots per viewport and proof of accessibility/security/performance checks.
- README for editorial user, operator runbook, incident/backout plan, documented known limitations.

## IMPLEMENTATION PROMPT (copy/paste)
> Audit the target Puskesmas Malimpung website repository before editing. Read all V2 blueprint documents and full-page mockups. Replace the previous engineering-first hero with the human-centered editorial homepage, preserving existing valid public content and all clinical data. Implement six page families and CMS incrementally behind feature flags. Separate public content, approved health aggregates, and role-protected office. Do not invent program availability, location boundaries, clinical values, API capabilities, KPIs, or official branding. Keep every integration disabled until authorized and verified. Write tests and provide UAT screenshots at desktop/tablet/mobile, change log, rollback plan and a register of missing official data. Never claim production readiness before approvals.
