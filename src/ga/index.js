// src/ga/index.js
import ReactGA from "react-ga4";

// Tavo Google Analytics 4 matavimo ID
const measurementId = "G-5TGTMSM9RT";

/**
 * Inicializuoja Google Analytics sekimą
 */
export const initGA = () => {
  ReactGA.initialize(measurementId);
};

/**
 * Nusiunčia puslapio peržiūrą į Google Analytics
 * @param {string} path - Puslapio URL kelias (pvz. "/apie")
 */
export const trackPageview = (path) => {
  ReactGA.send({ hitType: "pageview", page: path });
};
