# beneta.lt - SEO audit and implementation (2026-11-14)

Scope: technical audit of the codebase and the live site, Lithuanian keyword and
competitor research, new page architecture, copy, structured data, QA.

**Not available during this audit:** Google Search Console and analytics (no
access from this session). Nothing below about queries, impressions, CTR,
positions or indexed-page counts is measured - see section I.

---

## A. What was wrong with the original SEO

1. **One URL for every service.** E-shops, redesigns, maintenance and custom
   systems all lived as six short accordion items on `/`. Every Lithuanian
   competitor on page one (site.lt, kodexa.lt, myweb.lt, saitai.lt) has a
   separate page per service; a single page cannot be the best answer for
   "el. parduotuvės kūrimas" and "svetainių priežiūra" at the same time.
2. **The H1 did not name the service.** It was "Svetainės, kurios atneša
   klientų." - a good line, but no one searches for it.
3. **Most of the content never reached the HTML.** FAQ answers, five of six
   service descriptions and all project write-ups mounted only when clicked, so
   the prerendered page contained questions without answers. The visible page
   was ~1,000 words.
4. **The FAQ structured data described text that was not on the page** (a
   direct consequence of 3).
5. **The JSON-LD advertised the old price list** (200 / 300 / 60 / 20 EUR)
   while the page showed 490 / 990 / 1,900 / 39 / 99 / 35 EUR, and the business
   description was in English on the Lithuanian page.
6. **`/en` had a Lithuanian H1** (the headline was a hard-coded constant).

## B. Technical issues found

| Issue | Evidence | Status |
| --- | --- | --- |
| Soft 404s: any unknown URL answered **200** with the SPA shell | `curl https://www.beneta.lt/neegzistuoja` -> 200 | **Fixed**: rewrite limited to `/demo/*`; real `404.html` with 404 status, `noindex`, no canonical |
| `/en/` and `/en` both 200 (duplicate) | live check | **Fixed**: `trailingSlash: false` -> 308 |
| `beneta.lt` -> `www` is a **307 (temporary)** redirect | live check | **Open** - Vercel dashboard, see I |
| "Kainos" hero button scrolled to `#method`, a section no longer on the page (did nothing) | code | **Fixed** -> `#pricing` |
| No crawlable internal links: navigation was all `<button>` + scrollIntoView | prerendered HTML had 2 internal links | **Fixed**: footer + service-page nav are real `<a href>` links |
| FAQ answers absent from HTML | grep of build | **Fixed**: always mounted, collapsed by height, `inert` when closed |
| Stale JSON-LD prices, English description | build output | **Fixed**: read from `PACKAGES` / `CARE` / `HOURLY` |
| Hard-coded LT headline on `/en` | code | **Fixed** |

Checked and already correct: prerendering (real HTML for every content route),
canonical URLs, `hreflang` lt/en/x-default (lowercase attribute), Open Graph and
Twitter cards, `robots.txt` (blocks only `/demo`), sitemap generated from the
route list, image `alt` text (decorative thumbs correctly `alt=""`), image
dimensions set (no layout shift), self-hosted fonts with preload, no tracking
cookies.

## C. Keywords selected and why

No keyword tool with Lithuanian volume data was available, so **no search
volumes or difficulty scores are given**. Selection is based on what actually
ranks: the queries were searched, and the page titles, H1s and URL patterns of
the ranking pages were read. Paslaugos.lt (a marketplace) dominates most of
these SERPs; agency pages sit beside it.

| Query (and close variants) | Intent | Target page |
| --- | --- | --- |
| svetainių kūrimas verslui; internetinių / interneto svetainių kūrimas; profesionalių svetainių kūrimas | commercial | `/` |
| svetainės kūrimo kaina; kiek kainuoja svetainės sukūrimas | commercial / informational | `/` (title, FAQ), future article |
| elektroninių parduotuvių kūrimas; el. parduotuvės kūrimas; internetinės parduotuvės kūrimas; el. parduotuvės kaina | commercial | `/elektroniniu-parduotuviu-kurimas` |
| svetainės atnaujinimas; senos svetainės modernizavimas; svetainės dizaino atnaujinimas; kodėl svetainės neranda Google; lėta svetainė | commercial / problem | `/svetainiu-atnaujinimas` |
| svetainių priežiūra; svetainės techninė priežiūra; svetainės priežiūros kaina | commercial | `/svetainiu-prieziura` |
| individualus programavimas; verslo sistemų kūrimas; verslo procesų automatizavimas | commercial | `/individualus-programavimas` |

Why "atnaujinimas" carries SEO and speed: a business owner does not search
"technical SEO"; they search for the symptom (old, slow, not on Google). One
page for "my existing site has a problem" avoids a thin SEO page that would
over-promise rankings.

Why no separate `/svetainiu-kurimas` page: it would compete with the home
page for the same query (cannibalisation). The home page owns it.

## D. Pages created or modified

**New (prerendered, in the sitemap, Lithuanian only):**

- `/elektroniniu-parduotuviu-kurimas` - who it is for, what is included,
  WooCommerce vs Shopify, price, Flore studija, 4 FAQs
- `/svetainiu-atnaujinimas` - warning signs, fix vs rebuild, why sites are
  slow, why Google does not find a site, process (works on a copy, 301s for
  changed URLs), price, Bangų klinika, 4 FAQs
- `/svetainiu-prieziura` - why maintenance, the two care plans, without a
  plan, sites built by others, 4 FAQs
- `/individualus-programavimas` - what gets automated, how a project starts,
  technologies, price, FA Kaunas / Velgtilbud / Syncara, 3 FAQs
- `/darbai` - all eight projects with every written note, stack, role and
  live link, each linked to its service page

Each service page ends with related services and the existing contact form
(same EmailJS fields; validation verified, no message sent).

**Modified:** home (H1, lede, FAQ, links), `/en` (headline, FAQ, metadata),
404, footer (service links), Capabilities and Work (links to the new pages).

Why one `/darbai` page instead of case studies: only three projects have a
written problem/approach, about 80 words each. Eight separate pages would be
thin. `routes.js` already describes how a project moves to `/darbai/:slug`
once it has a proper write-up.

The service pages have no English versions on purpose (market is Lithuania).
They declare no `hreflang`, and `/en` does not link to them.

## E. Metadata

| URL | Title | Description (chars) |
| --- | --- | --- |
| `/` | Svetainių kūrimas verslui nuo 490 € \| Beneta | 146 |
| `/en` | Website development for business from EUR 490 \| Beneta | 148 |
| `/elektroniniu-parduotuviu-kurimas` | Elektroninių parduotuvių kūrimas verslui \| Beneta | 142 |
| `/svetainiu-atnaujinimas` | Svetainės atnaujinimas ir pagreitinimas \| Beneta | 141 |
| `/svetainiu-prieziura` | Svetainių priežiūra nuo 39 €/mėn. \| Beneta | 133 |
| `/individualus-programavimas` | Individualus programavimas ir automatizavimas verslui \| Beneta | 150 |
| `/darbai` | Darbai: svetainės ir sistemos, kurias sukūriau \| Beneta | 157 |

All are unique (checked by script). Every indexable page has a self-referencing
canonical; `/` and `/en` keep their hreflang pair; the 404 is `noindex` with no
canonical. Prices in titles and descriptions are computed from `content.js`.

## F. Content rewritten

- **H1** is now "Internetinių svetainių kūrimas verslui. Svetainės, kurios
  atneša klientų." The service comes first, in a smaller line above the three
  display lines, and the brand line keeps its typography.
- **Hero lede** now says who the work is for (clinics, salons, academies,
  shops, service companies), what is offered (build, refresh, maintain) and why
  to choose Beneta (fixed price, weekly progress, talking to the developer
  directly).
- **FAQ** went from 7 to 11 questions, phrased the way people search: price
  (now includes the 1,900 € tier), Google, mobile, template vs custom,
  refreshing an existing site, maintenance cost.
- All new copy follows the house rules: plain hyphens only (the build checks
  this), and no invented results, testimonials or metrics.

## G. Structured data

- Site-wide `@graph`: `ProfessionalService` (`@id` `/#business`, Lithuanian
  description, `areaServed` Lietuva, offer catalogue built from the real
  prices) and `WebSite`.
- Each service page: `Service` (provider -> `/#business`, price
  specification), `BreadcrumbList`, `FAQPage` matching the visible answers.
- `/darbai`: `BreadcrumbList`.
- Note: since 2023 Google shows FAQ rich results only for government and health
  sites. FAQPage stays because it is accurate, not because it will add
  snippets.

## H. Performance

No new dependencies. The new pages reuse the existing CSS and components and
have no canvas or hero animation. Screenshots are lazy-loaded with fixed
dimensions.

**Lighthouse was not run in this session.** It is not installed, and installing
it means downloading a package. The saved report `lh-beneta.json` (2026-10-31,
mobile, live site) shows **Performance 61, LCP 6.9 s, TBT 570 ms**. That
contradicts the "Lighthouse 99 desktop / 88 mobile" `metricNote` in
`content.js`. The new copy therefore quotes no Lighthouse numbers. Re-measure
and correct `metricNote` (section J).

## I. What still needs Google Search Console or external checks

1. Submit `https://www.beneta.lt/sitemap.xml` in Search Console and request
   indexing for the five new URLs.
2. Real data: queries, impressions, CTR, positions, the Pages report, and which
   pages lose visibility. None of this was available here.
3. **Vercel dashboard -> Domains:** change `beneta.lt` -> `www.beneta.lt`
   from 307 to a permanent 308.
4. Rich Results Test / Schema validator on the deployed URLs. The JSON-LD is
   valid JSON and uses schema.org types, but Google's own validator has not
   been run.
5. PageSpeed Insights (mobile) after deploy.
6. Google Business Profile as a service-area business with no address: the
   strongest local signal still missing.

## J. Next steps, by impact

1. **Fix mobile performance** (LCP 6.9 s in the last saved report). The likely
   causes are the hero canvas (`LatticeField`) and hydration cost on the home
   page. Measure first.
2. **Google Business Profile + reviews.** Ask real clients (Bangų klinika, FA
   Kaunas, Flore studija) for reviews on Google. Never write them yourself.
3. **Case studies** for Bangų klinika and FA Kaunas, once there are real
   details: the brief, screenshots before and after, and a measured result if
   one exists.
4. **Articles**, in this order. Each answers one real question in depth, using
   Beneta's own prices and process:
   1. *Kiek kainuoja svetainė 2027 m.: kas lemia kainą* - what drives the
      price, what is included, hidden costs (domain, hosting, Shopify fees)
   2. *WooCommerce ar Shopify mažai el. parduotuvei* - expands the comparison
      on the e-shop page
   3. *Kodėl svetainės neranda Google: 8 dažniausios techninės priežastys* -
      with screenshots of a real Search Console
   4. *Svetainės priežiūra: ką iš tikrųjų reikia daryti kas mėnesį*
   5. *Šabloninė ar individuali svetainė: kada kuri apsimoka*
5. **Links:** get listed on paslaugos.lt (it ranks for every query above), and
   ask clients for a credit link in their site footers.
6. Price positioning (a business decision, not SEO): the e-shop tier starts at
   1,900 €. Competitors advertise e-shops from 400-999 €. The e-shop page now
   explains what is included, but the gap will show in CTR.

### Sources used for research

- [paslaugos.lt price ranges](https://paslaugos.lt/kainos/interneto-svetainiu-programavimas)
- [paslaugos.lt e-shops](https://paslaugos.lt/kainos/elektroniniu-parduotuviu-kurimas)
- [paslaugos.lt maintenance](https://paslaugos.lt/kainos/interneto-svetainiu-kurimas/interneto-svetainiu-prieziura)
- [site.lt](https://site.lt/paslaugos/internetiniu-svetainiu-kurimas), [kodexa.lt](https://kodexa.lt/), [myweb.lt](https://myweb.lt/), [saitai.lt](https://saitai.lt/paslaugos/svetainiu-kurimas/), [svetainiudizainas.lt](https://svetainiudizainas.lt/), [webdnr.lt](https://webdnr.lt/wordpress-svetainiu-kurimas/), [studija4d.lt](https://www.studija4d.lt/interneto-svetainiu-kurimas/)
- [jmedia.lt agency price study 2026](https://jmedia.lt/straipsniai/svetainiu-kainos-tyrimas-2026/)
