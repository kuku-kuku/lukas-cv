# Copy audit — round 2

Every string the site renders, judged against one test: **would a dental clinic owner
understand this in ten seconds?**

Verdicts: **KEEP** · **SIMPLIFY** (rewrite in plain Lithuanian) · **MOVE** (into a
"Techninės detalės" block or a future page) · **DELETE**.

Counts: **176 rendered strings**, plus **37 dead keys** left over from the pre-redesign
site that render nowhere.

Proposed replacements are suggestions — edit this file directly and I will implement
exactly what it says.

---

## 0. Dead keys — DELETE (37)

Not referenced by any component. Pure removal, zero visible change.

`about` · `works` · `contact_intro` · `contact_button` · `professional_services` ·
`services_tagline` · `price_label` · `details` · `get_started` · `trust_fast_delivery` ·
`trust_quality_guaranteed` · `trust_modern_tech` · `service_1..6_short` ·
`service_1..6_long` · `featured_projects` · `works_tagline` · `type.*` · `view_code` ·
`lets_connect` · `contact_dialog_title` · `contact_dialog_subtitle` ·
`form_message_placeholder` · `form_sent_placeholder` · `form_verify` · `masthead_sr` ·
`status_label` · `privacy_policy`

Also dead but worth keeping: `about_p1`–`about_p5` (the old personal bio). They are the
only written material about you as a person — raw material for the new "Kas aš" block.

---

## 1. Hero / masthead

| String | Now | Verdict | Proposed |
|---|---|---|---|
| headline | SOFTWARE / ENGINEERING / PRACTICE. | **SIMPLIFY** | `Svetainės, kurios atneša klientų.` — keeps the three-line typographic stack and the orange full stop. EN route keeps the English headline. |
| `masthead_lede` | "Nepriklausoma inžinerijos praktika **Klaipėdoje**. Imu neaiškiai apibrėžtas technines problemas — interneto produktus, serverio sistemas, API integracijas…" | **SIMPLIFY** | `Kuriu svetaines ir paprastas internetines sistemas smulkiam verslui — nuo idėjos iki veikiančio rezultato. Dirbu nuotoliniu būdu su klientais visoje Lietuvoje.` |
| `cta_brief` | Aprašyti užduotį | **SIMPLIFY** | `Gauti pasiūlymą` |
| `cta_model` | Kaip dirbu | **SIMPLIFY** | `Kainos` → jumps to the new pricing section |
| `spec_status` / `_value` | BŪKLĖ / Priimu naujus projektus | **SIMPLIFY** | Trust point 1: `Atsakau per 24 val.` |
| `spec_base` / `_value` | VIETA / Klaipėda, Lietuva | **DELETE** | Trust point 2: `Fiksuota kaina iš anksto` |
| `spec_languages` / `_value` | KALBOS / Lietuvių / English | **DELETE** | Trust point 3: `Pirma konsultacija nemokama` |
| `spec_engagement` / `_value` | FORMATAS / Fiksuota apimtis arba valandinis | **DELETE** | folded into trust point 2 |
| LiveClock | `14:21:45 KLAIPĖDA` | **SIMPLIFY** | `Darbo laikas: I–V 9–18` (Lietuvos laiku). Drops the city and the live-seconds gimmick. |
| hero work teaser | 4 project rows | **KEEP** | names only, already plain |
| `scroll_cue` | ŽEMIAU | **KEEP** | meta label, fine |

**New:** a short `Kas aš` block — your photo, name, one sentence. Round 1 removed all
personal photography on the old brief; this round reverses that for the same reason it
was removed then — audience. Ordinary clients buy from a face.

---

## 2. Navigation

| String | Now | Verdict | Proposed |
|---|---|---|---|
| `nav_index` | Pradžia | **KEEP** | |
| `nav_capabilities` | Kompetencijos | **SIMPLIFY** | `Paslaugos` |
| `nav_method` | Metodas | **DELETE** | section leaves the homepage |
| `nav_work` | Darbai | **KEEP** | |
| `nav_stack` | Technologijos | **DELETE** | collapses into a footer line |
| `nav_process` | Procesas | **SIMPLIFY** | `Kaip dirbu` |
| `nav_contact` | Kontaktas | **SIMPLIFY** | `Susisiekti` |
| — | — | **NEW** | `Kainos`, `D.U.K.` |

Rail indices stay 00–06; the set becomes Pradžia / Paslaugos / Darbai / Kainos / Kaip
dirbu / D.U.K. / Susisiekti.

---

## 3. Section 01 — "Ką kuriu" → "Kuo galiu padėti"

Reframed from capabilities to **the client's problem**. Current bodies are the most
jargon-dense copy on the site.

| Now | Verdict | Proposed title | Proposed one-liner |
|---|---|---|---|
| Interneto programos — "produktai su React: komponentų sistema, maršrutai…" | **SIMPLIFY** | Reikia naujos svetainės | Nuo tuščio lapo iki veikiančios svetainės: dizainas, tekstai, nuotraukos ir paleidimas. |
| Greitis ir SEO — "Core Web Vitals, paketų svoris…" | **SIMPLIFY** | Svetainė pasenusi arba lėta | Atnaujinu išvaizdą ir pagreitinu — svetainė atsidaro per 1–2 s net telefone. |
| *(part of Greitis ir SEO)* | **SIMPLIFY** | Mūsų neranda Google | Sutvarkau tai, kas lemia matomumą Google, ir parodau, kas pasikeitė. |
| *(new)* | **NEW** | Reikia el. parduotuvės | ⚠️ **needs your confirmation — see questions** |
| Automatizavimas — "procesai perkeliami į kodą…" | **SIMPLIFY** | Daug rankinio darbo | Darbai, kurie dabar daromi ranka — užklausos, rezervacijos, ataskaitos — vyks patys. |
| Priežiūra — "Paleidimas, aplinkos kintamieji…" | **SIMPLIFY** | Reikia rūpintis svetaine | Rūpinuosi svetaine po paleidimo: atnaujinimai, kopijos, smulkūs pakeitimai. |
| Serveriai ir API — "REST API, MongoDB arba MySQL…" | **MOVE** | → Techninės detalės | the capability stays, the words go |
| Integracijos — "Firebase, Airtable, trečiųjų šalių API…" | **SIMPLIFY** | *(folded into "Daug rankinio darbo")* | sujungiu svetainę su jūsų sistemomis: el. paštu, rezervacijomis, apskaita |
| `cap_lede` | **SIMPLIFY** | | `Pasirinkite tai, kas labiausiai panašu į jūsų situaciją.` |
| tech chips (REACT 18 / SPA / DESIGN SYSTEMS) | **MOVE** | → Techninės detalės | |
| `evidence` "Kur panaudota" | **KEEP** | | good plain Lithuanian already |
| `shared` "susiję" | **DELETE** | | invisible mechanic nobody reads |

---

## 4. Section 02 — "Metodas" → remove from homepage

| String | Verdict | Note |
|---|---|---|
| `method_title` "Kaip neaiški užduotis tampa sistema" | **MOVE** | → `/kaip-dirbu` |
| `method_lede`, `principle_a/b/c_*` | **MOVE** | engineer-facing |
| `node_*` (10 nodes × title+body) | **MOVE** | → case study pages |
| `diagram_*` (8 strings) | **MOVE** | component stays, unused on `/` |

Replaced on the homepage by three plain cards, **"Kodėl verta dirbti su Beneta"**:
`Aiški kaina prieš pradedant` · `Matote progresą kiekvieną savaitę` · `Greita svetainė,
kurią randa Google`.

SystemDiagram.jsx is **not deleted** — it moves to the case-study/`/kaip-dirbu` route.

---

## 5. Section 03 — "Atrinkti darbai" → "Darbai"

| String | Verdict | Proposed |
|---|---|---|
| `work_title_new` | **SIMPLIFY** | `Darbai` |
| `work_lede` "Keturi projektai. Be išgalvotų procentų — tik apimtis, vaidmuo, technologijos…" | **SIMPLIFY** | `Tikros svetainės, kurias galite atsidaryti ir pažiūrėti.` (also factually stale — there are eight now) |
| per-project `kind` | **KEEP** | already plain: "Jaunimo futbolo akademija", "Gėlių studijos el. parduotuvė" |
| per-project `description` | **SIMPLIFY** | one sentence of **what changed for the client**, e.g. Bangų klinika: `Pacientai dabar randa paslaugas ir kainas telefone per kelias sekundes.` |
| `scope` / `problem` / `approach` | **MOVE** | → "Ką padariau" plain bullet list; engineering prose to case-study pages |
| `role` / `role_*` | **SIMPLIFY** | `Ką dariau` + plain values |
| `measured` + `metricNote` (Lighthouse 99…) | **MOVE** | → Techninės detalės; replace the row metric with `Atsidaro per 0,8 s` |
| `year`, `status.*` | **KEEP** | |
| `visit_live` "Peržiūrėti svetainę" | **KEEP** | |

---

## 6. Section 04 — "Technologijos" → one line

| String | Verdict |
|---|---|
| `stack_title`, `stack_lede`, 4 group titles, ~24 item names | **MOVE** |

Becomes one sentence near the footer with an expandable list:
`Naudoju šiuolaikines, patikimas technologijas (React, Node.js, WordPress, Shopify ir kt.).`

---

## 7. Section 05 — "Kaip atrodo darbas su manimi" → "Kaip atrodo darbas su Beneta"

Structure is good; the words are for engineers and the brand name is wrong (uses the
domain). Durations added per your spec.

| Now | Verdict | Proposed |
|---|---|---|
| Susipažinimas | **SIMPLIFY** | `Pokalbis` — nemokamai, ~30 min |
| Modelis ir sąmata | **SIMPLIFY** | `Pasiūlymas ir kaina` — per 1–2 d. |
| Realizacija | **SIMPLIFY** | `Kūrimas` — matote tarpinius rezultatus |
| Peržiūra | **KEEP** | + `ir pataisymai` |
| Paleidimas | **KEEP** | |
| Priežiūra | **KEEP** | + `(jei reikia)` |
| `step_*_body` ×6 | **SIMPLIFY** | drop "sistemos modelis", "produkcinis build", "aplinkos kintamieji", "endpointai" |
| `deliverable` "Ką gauni" | **SIMPLIFY** | `Ką gaunate` (jūs form) |
| `process_lede` | **SIMPLIFY** | `Šeši etapai. Po kiekvieno turite kažką konkretaus rankose.` |

---

## 8. Section 06 — Contact

| String | Verdict | Proposed |
|---|---|---|
| `contact_title_new` "Papasakok, ką reikia išspręsti" | **SIMPLIFY** | `Papasakokite apie savo verslą` |
| `contact_lede` | **SIMPLIFY** | `Nebūtina žinoti techninių detalių — užtenka parašyti, ką norite pasiekti.` |
| `form_name` "Tavo vardas" | **SIMPLIFY** | `Jūsų vardas` — **tu → jūs throughout** |
| `form_email` "Tavo el. paštas" | **SIMPLIFY** | `Jūsų el. paštas` |
| `form_message` "Tavo žinutė" | **SIMPLIFY** | `Apie ką kalbame?` |
| `form_brief_placeholder` "Ką reikia pasiekti, kokie terminai…" | **SIMPLIFY** | `Pvz.: turiu grožio saloną, reikia svetainės su kainoraščiu ir registracija.` |
| `form_brief_hint` | **SIMPLIFY** | `Jei turite dabartinę svetainę — įrašykite adresą.` |
| `err_name/email/message` | **SIMPLIFY** | tu → jūs |
| `form_sent_note` | **SIMPLIFY** | tu → jūs |
| `contact_note` "Jei projektas man netinka…" | **KEEP** | honest and plain; jūs form |
| `local_time` / Klaipėda | **DELETE** | → `Darbo laikas` |
| `response_value` | **KEEP** | |
| `privacy_note` | **KEEP** | |
| — | **NEW** | quick-select: Nauja svetainė / Atnaujinimas / El. parduotuvė / Kita |
| — | **NEW** | optional budget select, values from the pricing config |

---

## 9. Footer

| String | Verdict | Proposed |
|---|---|---|
| `Lukas Beneta · Klaipėda, LT` | **SIMPLIFY** | `Lukas Beneta · Nuotoliniu būdu · Visa Lietuva ir ES` |
| marquee `KLAIPĖDA — LT` | **SIMPLIFY** | `NUOTOLINIU BŪDU · VISA LIETUVA` |
| marquee capability names | **SIMPLIFY** | follow the new section-01 titles |
| `footer_available` | **KEEP** | |
| `colophon` "React · Tailwind · Vercel" | **KEEP** | small, harmless, credible to the few who read it |
| `rights` | **KEEP** | |

---

## 10. Not copy, but blocking readability (section 2 of your brief)

| Issue | Now | Target |
|---|---|---|
| body size | 15px / 13–14px small text | 18px desktop, 17px mobile, small text ≥16px |
| line height | 1.55 | 1.6 |
| secondary text | `--ink-2` #A7A5A0 (7.9:1) | #C4C1BA — currently *passes* 7:1, so this is a legibility preference, not a failure |
| muted text | `--ink-3` #8A8884 (5.7:1) | meta labels only — **fails your 7:1 paragraph target where used for sentences** (`form_brief_hint`, project `kind`, stack items) |
| background | #0A0A0B | #111113 |
| grid overlay | 10% line alpha | 3–4% behind text blocks |
| mono uppercase | used for `measured`, `metricNote`, stack items, `form_brief_hint` | meta labels ≤3 words only |
| heading/intro split | intro sits in right column | intro directly under heading |
| textarea | `resize-y` | `resize: none` + auto-grow |

---

## Questions blocking implementation

1. **Shopify** — your brief says "I have deep Shopify experience; confirm with me". None
   of the eight projects is Shopify; Flore studija is WooCommerce. Do I advertise Shopify
   as a service, and add `/el-parduotuves-kurimas`? If yes, is there a Shopify build I can
   show?
2. **The "Kas aš" photo** — round 1 deleted `me.jpg` on your instruction. I can restore it
   from git history, or you send a newer one. Which?
3. **Prices** — I will use your placeholders (490 / 990 / 1900, care 39 / 99, 35 €/h).
   Confirm before launch or tell me the real numbers now.
4. **Case-study + guide pages** (`/darbai/:slug`, `/patarimai/:slug`) are a large build on
   top of the homepage rewrite. Homepage + `/kainos` first, those next? Or all at once?
5. **EN route** — rewrite it to match, or leave the English version as-is for now? It
   currently mirrors the engineer-facing copy.

---

## Proposed order

1. Readability + textarea (section 2) — visible immediately, no copy decisions needed.
2. Delete the 37 dead keys.
3. Copy rewrite + remote positioning.
4. Pricing section.
5. New routes + SEO (SSG already shipped, so this is route modules only).
6. Before/after screenshots at 375 and 1440.
