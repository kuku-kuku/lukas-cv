// src/ga/index.js
import ReactGA from "react-ga4";

const measurementId = "G-5TGTMSM9RT";

let initialised = false;
let pending = null;

/**
 * Initialises Google Analytics.
 *
 * It is called from an idle callback so that loading gtag does not compete
 * with the first paint. Because of that, the first page view can be reported
 * before initialisation has happened, so views are queued until GA is ready
 * rather than dropped.
 */
export const initGA = () => {
  if (initialised) return;
  ReactGA.initialize(measurementId);
  initialised = true;
  if (pending) {
    ReactGA.send({ hitType: "pageview", page: pending });
    pending = null;
  }
};

/**
 * Sends a page view, or holds it until GA is initialised.
 * @param {string} path
 */
export const trackPageview = (path) => {
  if (!initialised) {
    pending = path;
    return;
  }
  ReactGA.send({ hitType: "pageview", page: path });
};
