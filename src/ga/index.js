// src/ga/index.js
import ReactGA from "react-ga4";

const measurementId = "G-5TGTMSM9RT";

/**
 * Inicializuoja Google Analytics sekimą
 */
export const initGA = () => {
  ReactGA.initialize(measurementId);
};

/**
 * Nusiunčia puslapio peržiūrą į Google Analytics
 * @param {string} path 
 */
export const trackPageview = (path) => {
  ReactGA.send({ hitType: "pageview", page: path });
};
