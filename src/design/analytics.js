/**
 * Google Analytics 4, behind consent (Consent Mode v2, "basic").
 *
 *  - The head script in root.jsx (CONSENT_BOOT) sets every consent type to
 *    "denied" before anything else runs, and loads gtag.js only if this
 *    browser has already said yes. No yes, no request to Google at all.
 *  - The banner (ConsentBanner.jsx) calls setConsent(). "granted" loads
 *    gtag.js and updates consent; "denied" keeps it off and clears any GA
 *    cookies left from an earlier yes.
 *  - Ads storage is never granted: the site runs no ads.
 *  - track() is a no-op without consent, so nothing is queued that could be
 *    sent later as a cookieless ping.
 *
 * Page views on client-side navigation come from GA4's enhanced
 * measurement ("page changes based on browser history events"), which is on
 * by default in the data stream; outbound links and scroll depth come from
 * there too.
 */

export const GA_ID = "G-5TGTMSM9RT";
export const CONSENT_KEY = "beneta-consent";
export const CONSENT_OPEN_EVENT = "beneta:consent-open";

/** Runs inline in <head>, before hydration and before gtag.js. */
export const CONSENT_BOOT = `
window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments);}
window.gtag=gtag;
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',wait_for_update:500});
gtag('js',new Date());
gtag('config','${GA_ID}');
try{if(localStorage.getItem('${CONSENT_KEY}')==='granted'){
gtag('consent','update',{analytics_storage:'granted'});
var s=document.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtag/js?id=${GA_ID}';document.head.appendChild(s);
}}catch(e){}
`;

export function getConsent() {
  try {
    return localStorage.getItem(CONSENT_KEY);
  } catch {
    return null;
  }
}

function loadGtag() {
  if (document.querySelector(`script[src*="gtag/js?id=${GA_ID}"]`)) return;
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(s);
}

function clearGaCookies() {
  const host = location.hostname;
  const domains = ["", host, `.${host}`, `.${host.replace(/^www\./, "")}`];
  document.cookie.split(";").forEach((c) => {
    const name = c.split("=")[0].trim();
    if (!name.startsWith("_ga")) return;
    domains.forEach((d) => {
      document.cookie = `${name}=; Max-Age=0; path=/${d ? `; domain=${d}` : ""}`;
    });
  });
}

export function setConsent(value) {
  try {
    localStorage.setItem(CONSENT_KEY, value);
  } catch {
    /* private mode: the choice lasts for this page only */
  }
  if (typeof window.gtag !== "function") return;
  if (value === "granted") {
    window.gtag("consent", "update", { analytics_storage: "granted" });
    loadGtag();
  } else {
    window.gtag("consent", "update", { analytics_storage: "denied" });
    clearGaCookies();
  }
}

/** Reopen the banner (footer "Slapukų nustatymai"). */
export function openConsent() {
  window.dispatchEvent(new Event(CONSENT_OPEN_EVENT));
}

export function track(name, params = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  if (getConsent() !== "granted") return;
  window.gtag("event", name, params);
}

/**
 * One delegated listener instead of handlers on every button:
 *  - anything with data-track="name" sends that event (with data-track-label),
 *  - mailto: / tel: links send contact_click, which enhanced measurement
 *    does not cover.
 */
export function installClickTracking() {
  const onClick = (e) => {
    const el = e.target.closest?.("[data-track], a[href^='mailto:'], a[href^='tel:']");
    if (!el) return;
    if (el.dataset.track) {
      track(el.dataset.track, {
        label: el.dataset.trackLabel || el.textContent.trim().slice(0, 60),
        page_path: location.pathname,
      });
      return;
    }
    const href = el.getAttribute("href") || "";
    track("contact_click", {
      method: href.startsWith("mailto:") ? "email" : "phone",
      page_path: location.pathname,
    });
  };
  document.addEventListener("click", onClick, true);
  return () => document.removeEventListener("click", onClick, true);
}
