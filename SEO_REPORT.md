# SEO implementation report (2026-11-19)

Brief: `BENETA-CLAUDE-CODE-SEO-PROMPT.md`. Plan: `SEO_PLAN.md`.
Commits: `2766fe9` (sitemap, language link), `9b55bef` (price page, copy, JSON-LD).

## 1. Stack found

React Router 7 framework mode on Vite, with `ssr: false` and a `prerender` list.
Every content route ships as static HTML on Vercel. Head tags come from each
route's `meta()` through `buildMeta()` in `src/design/seo.js`. `<html lang>` is
set in `src/root.jsx` from the path. Copy lives in `src/design/pages.js` (service
pages) and `src/i18n.js` (home). Prices live only in `src/design/content.js`.

Three gaps in the research were **false positives**: `<html lang>`, hreflang
`/`↔`/en` and JSON-LD all existed in the prerendered HTML already. The research
tool had stripped `<head>`. The soft-404 fix was also already in place.

## 2. Changes made

| File | Change | Brief § |
|---|---|---|
| `scripts/build-sitemap.mjs` | xhtml alternates (lt/en/x-default) on `/` and `/en`. lastmod comes from the git date of each page's source files: today if they are uncommitted, the previous sitemap value when git is absent (Vercel). `priority` dropped | 4.6 |
| `src/components/CommandRail.jsx` | Language switch changed from `<button onClick>` to `<a href hreflang lang>`, same classes | 4.3 |
| `src/components/sections/Footer.jsx` | Domain link points to `https://www.beneta.lt/`. Added a `Kainos` link to the services list | 4.2, 7.3 |
| `src/design/content.js` | beneta project `liveUrl` uses the www host | 4.2 |
| `src/design/pages.js` | New `PRICE_PAGE`. Titles, descriptions, H1s and H2 renames per §5.3–5.6. New sections: Shopify, payments and delivery, what maintenance includes, response time, H3 system types, how to speed up a site. Two new e-shop FAQs | 5.2–5.6 |
| `src/components/ServiceLayout.jsx` (new) | Layout moved out of `routes/service.jsx`, markup unchanged. Adds H3 sub-blocks, a table, a price table built from `PACKAGES` and i18n, and a custom FAQ title. "Visos kainos" now links to `/svetainiu-kurimo-kaina` | 5.2, 7.1 |
| `src/routes/price.jsx` (new), `routes.js`, `react-router.config.js` | Route for the price page and its prerender entry | 5.2 |
| `src/components/Rich.jsx`, `src/design/text.js` (new) | `[text](/path)` links inside copy strings. Rendered as links on the page, stripped to plain text in the JSON-LD | 7 |
| `src/components/PageShell.jsx` | Bullet lists and FAQ answers render inline links | 7 |
| `src/design/schema.js` (new) | All JSON-LD in one place: WebSite, ProfessionalService, a separate `Person` (`#lukas`), and an `OfferCatalog` (`…/svetainiu-kurimo-kaina#catalog`) priced from `content.js`. Also WebPage/CollectionPage, Service (two monthly offers on the maintenance page), BreadcrumbList and FAQPage | 6 |
| `src/design/seo.js`, `src/root.jsx` | JSON-LD removed from these files. Root emits `SITE_GRAPH` | 6 |
| `src/design/homeFaq.js` (new), `sections/Faq.jsx` | The home FAQ and its FAQPage markup now come from one source. On LT, the price answer links to the price page | 5.1.3, 6 |
| `src/components/sections/Pricing.jsx` | Under the cards: "Kas įeina į kainą ir kokios metinės išlaidos →" (LT only) | 5.1.2 |
| `src/i18n.js` | Remote-work sentence added to the FAQ answer "Ar reikia susitikti gyvai?". New keys `faq_price_more` and `pricing_more` | 5.1.4 |
| `routes/home*.jsx`, `work.jsx`, `privacy.jsx` | New home meta description. WebPage / CollectionPage nodes. FAQPage on `/` and `/en` | 5.1, 5.7–5.9 |

## 3. New page

`/svetainiu-kurimo-kaina`: about 950 words of body copy (1,244 in the whole document,
including nav, contact and footer).
- **Links out:** all 4 service pages, `/darbai`, `/`.
- **Links in:** footer (every LT page), the home pricing section, the home FAQ,
  and "Visos kainos" on all 4 service pages.

## 4. Validation results

Build passes, with a clean dash check. `vitest` passes (6/6). Raw HTML checked
without JS:

| Route | lang | H1 | canonical | hreflang | JSON-LD | FAQ LD = visible |
|---|---|---|---|---|---|---|
| `/` | lt | 1 | self | lt,en,x-default | WebPage, FAQPage, WebSite, ProfessionalService, Person | 11 = 11 |
| `/en` | en | 1 | self | lt,en,x-default | same | 11 = 11 |
| `/elektroniniu-parduotuviu-kurimas` | lt | 1 | self | none | + Service, BreadcrumbList | 6 = 6 |
| `/svetainiu-atnaujinimas` | lt | 1 | self | none | + Service, BreadcrumbList | 4 = 4 |
| `/svetainiu-prieziura` | lt | 1 | self | none | + Service (2 offers), BreadcrumbList | 4 = 4 |
| `/individualus-programavimas` | lt | 1 | self | none | + Service, BreadcrumbList | 3 = 3 |
| `/svetainiu-kurimo-kaina` | lt | 1 | self | none | WebPage (mainEntity → catalog), BreadcrumbList, FAQPage | 4 = 4 |
| `/darbai` | lt | 1 | self | none | CollectionPage, BreadcrumbList | n/a |
| `/privatumas` | lt | 1 | self | none | WebPage | n/a |

Status codes, checked against `scripts/serve-build.mjs`, which mirrors `vercel.json`:
- Every sitemap URL returns 200.
- `/this-does-not-exist` returns 404.
- `/svetainiu-prieziura/` returns 308 to the no-slash URL.

The sitemap is valid XML: 9 URLs, with alternates on `/` and `/en`. A crawl of
the built HTML found 0 broken internal links, 0 links to `https://beneta.lt`
and 0 `/#pricing` links.

In the browser:
- No console errors (hydration is clean) on `/` and on the price page.
- No horizontal page scroll at 375 px. On a phone, the two tables scroll inside
  their own box.

**Not done:**
- **Lighthouse before/after:** Lighthouse is not installed and the brief bans new
  dependencies. Run PageSpeed Insights instead (§6).
- **Pixel screenshot comparison:** screenshots timed out because the app window
  was hidden. Structure and overflow were checked through the DOM instead.
- **Hero / LCP:** not changed. The decode animation was reworked in
  `a7c2166` and the text is in the prerendered HTML.

## 5. Answers from Lukas (applied 2026-11-19)

All five TODO(lukas) markers are resolved; none remain in the code.

| Question | Answer | Applied |
|---|---|---|
| Shopify experience | Not a Shopify theme developer: avoid the Shopify angle | Shopify section, Shopify FAQs and "Shopify" in the title, description and `knowsAbout` removed. Title is now `Elektroninių parduotuvių kūrimas verslui nuo 1 900 € \| Beneta`. The existing "WooCommerce ar Shopify?" comparison (earlier copy) stays |
| Payment and shipping providers | Paysera, Montonio, Stripe; Omniva, DPD, LP Express (Lukas also ticked "name no brands") | Named once, as the usual choices, in "Apmokėjimai ir pristatymas Lietuvoje" |
| Uptime monitoring | "Research and choose" | Included in both plans (see below) |
| Domain and hosting in the build price | First year included | Price page: added to "Kas įeina", "Išlaidos po paleidimo", the quote checklist answer and a new FAQ |
| Instalments | 50% before starting, 50% at launch | New price-page FAQ |
| Cancelling care | Any month | New maintenance FAQ |

**Monitoring decision.** Included in both plans ("Augimas" contains everything in
"Ramybė"). Reasons:
- The maintenance page already promised "tai pastebiu aš, ir anksčiau", and that
  promise needs monitoring.
- Lithuanian competitors put monitoring in their higher tier (about 69 €/mėn.),
  so having it at 39 € sets this plan apart.
- It costs little to run.

**Lukas must set it up for every client site before this copy is true**, for
example UptimeRobot, Better Stack or similar. UptimeRobot's free plan has 50
monitors at 5-minute checks, but sources disagree on whether commercial use is
allowed. Check its terms, or use the paid Solo tier.

## 6. Manual tasks outside the repo

- **Vercel:** `beneta.lt` → `www` was a **307** at the last audit (`docs/SEO-AUDIT.md`).
  In Domains, set it to a permanent (308/301) redirect. Also check that `http://`
  reaches `https://www` in one hop.
- **Search Console:** verify the `www` property, submit `sitemap.xml`, and request
  indexing for `/svetainiu-kurimo-kaina`. Save a baseline of current queries.
- **Rich Results Test** on `/` and `/svetainiu-prieziura`. Run **PageSpeed
  Insights (mobile)** on `/`, `/elektroniniu-parduotuviu-kurimas` and
  `/svetainiu-kurimo-kaina`.
- **Keyword Planner (LT):** pull volumes for the keyword map.

## 7. Unresolved issues / risks

- **Homepage "Kuo galiu padėti" items are interactive buttons, not H3 links.**
  Making them links would change the matrix interaction. Each capability panel
  already links to its service page, and the footer links all of them.
- **FAQPage was restored.** A comment showed it had been removed on purpose in
  2026-11 because there is no rich-result eligibility. It is back because the
  brief asks for it; it is harmless.
- **Two meta descriptions run past 160 characters:** `/individualus-programavimas`
  (164) and the price page (162). The e-shop description is now 141. The text is exactly as the brief gave it. Trim
  if wanted.
- **Copying the sitemap lastmod on Vercel:** it reuses the committed value, so
  run `npm run build` locally before committing content changes to refresh it.
- **react-dom 18.2 put stray NUL bytes in the HTML:**
  - The bug was already there before this work. When a multi-byte letter (š, ž)
    falls on a 2048-byte boundary of the server stream, a zero byte is written
    into the text.
  - In this build it affected `/darbai` and `/svetainiu-kurimo-kaina`; which
    pages are hit depends only on where letters land.
  - `scripts/finish-build.mjs` now strips these bytes after every build.
  - Upgrading to react-dom 18.3.1 was tried and does **not** fix it: that
    version has the same buffer code, so the upgrade was reverted. The real
    fix only comes with React 19. Until then, the post-build step handles it.
- **The site-wide JSON-LD graph is on every page,** including `/en`, as before.
  The LT business description appears on `/en` as well.

## Phase 2 (not done)

- Case-study pages `/darbai/<projektas>` for projects with real depth.
- Articles: Shopify ar WooCommerce; individuali svetainė ar šablonas; kaip
  pasiruošti svetainės kūrimui.
- A separate Shopify page, only if Search Console shows Shopify queries.
- Google Business Profile as a service-area business.
- Directory profiles and client-footer credits.

## 8. Positioning update (2026-11-19, later the same day)

**Lukas builds custom sites and shops only. He maintains existing Shopify,
WooCommerce and WordPress sites but no longer builds on them.**

### `/elektroniniu-parduotuviu-kurimas`
- **Removed:**
  - "WooCommerce ar Shopify? / Dirbu su abiem";
  - the platform wording in the meta description, lede, payments text and price
    text ("ar tiekėjas veikia su jūsų platforma", "Shopify ... mokesčius").
- **New H2:** "Individuali parduotuvė ar Shopify / WooCommerce?", with the copy
  Lukas supplied. "prižiūrėti" links to `/svetainiu-prieziura`. En dashes became
  hyphens, as the build requires.
- **Admin panel:** the promise is now "Depends on project", per Lukas. The meta
  description and lede no longer say "prekes ir kainas valdote patys"; the FAQ
  says an admin panel is built when needed.
- **Migration FAQ:** now reads "perkelti esamą Shopify ar WooCommerce
  parduotuvę į individualią".
- **Flore studija:**
  - It is a WordPress + WooCommerce shop that Lukas confirms he built, but he no
    longer takes that kind of work. It was removed from this page, so the
    "Kur tai jau padaryta" section no longer renders here.
  - It is now evidence on `/svetainiu-prieziura` ("sukūriau anksčiau ... esamas
    prižiūriu ir tobulinu").
  - On `/darbai` it stays as a built project, with its real stack, and links to
    the maintenance service.
- **Home capability "Reikia el. parduotuvės":**
  - tech list was WordPress / WooCommerce / Shopify; now React, Node.js, Paysera,
    Montonio, Stripe;
  - Flore is no longer listed as its evidence;
  - body text no longer promises self-editing (LT and EN).

### `/svetainiu-prieziura`
- **H2 rename:** "Shopify, WooCommerce ir WordPress svetainių priežiūra". It
  states he maintains, not builds, on these platforms, and explains what that
  covers on Shopify vs WooCommerce/WordPress.
- **FAQ:** wording updated to match.
- **Meta description:** set to the brief's text.

### `/svetainiu-kurimo-kaina`
- **Comparison section:** now opens with "Kuriu tik individualias svetaines -
  šablonų ir svetainių kūrimo įrankių nenaudoju".
- **Hosting after year one:**
  - new FAQ "Kas nutinka talpinimui po pirmųjų metų?";
  - one sentence in "Išlaidos po paleidimo";
  - the hosting clause removed from the domain FAQ so the two don't repeat.

### JSON-LD
Shopify / WordPress / WooCommerce removed from `knowsAbout`, so the business
entity no longer lists them beside "Elektroninių parduotuvių kūrimas".

### Platform mentions left in the built site (all checked)

| Page | Mention | About |
|---|---|---|
| `/svetainiu-prieziura` | meta, H2, intro, FAQ, Flore evidence, Ramybė list ("WordPress, papildiniai") | maintenance |
| every LT service page + price page | related-service card quoting the maintenance meta description | maintenance |
| `/elektroniniu-parduotuviu-kurimas` | new H2 and text; migration FAQ | custom vs platform; maintenance; migrating away |
| `/svetainiu-atnaujinimas` | "Svetainė veikia sename WordPress..." (warning sign) | refreshing an existing site |
| `/darbai` | Flore: role Programavimas, stack WordPress / WooCommerce | a past build, true per Lukas; links to maintenance |

### Checks
- Build passes and tests pass (6/6).
- HTML check: 0 broken internal links, 0 non-www or `/#pricing` links.
- FAQ JSON-LD = visible FAQs on every page: / 11, /en 11, e-shop 5,
  atnaujinimas 4, priežiūra 5, sistemos 3, kainos 7.

### Open
`inc_editing` ("Tekstus ir nuotraukas keičiate patys") is still promised in the
business-site package (home cards and the price page). For custom builds that
needs an editing tool, like the shop admin panel. Confirm with Lukas.
