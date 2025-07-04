// App.jsx
import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from "react-router-dom";
import Home from "./pages/Home";
import Apie from "./pages/Apie";
import Paslaugos from "./pages/Paslaugos";
import Kontaktai from "./pages/Kontaktai";
import Darbai from "./pages/Darbai";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import "./styles.css";
import { AnimatePresence, motion } from "framer-motion";
import "./i18n";
import { initGA, trackPageview } from "./ga";

function AppContent() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  // Inicijuojam Google Analytics vieną kartą
  useEffect(() => {
    initGA();
  }, []);

  // Sekam kiekvieną puslapio pasikeitimą
  useEffect(() => {
    trackPageview(location.pathname);
  }, [location]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white font-poppins transition">
      <ScrollToTop />

      {!isHome && <Navbar />}

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Home />
              </motion.div>
            }
          />
          <Route
            path="/apie"
            element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Apie />
              </motion.div>
            }
          />
          <Route
            path="/paslaugos"
            element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Paslaugos />
              </motion.div>
            }
          />
          <Route
            path="/kontaktai"
            element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Kontaktai />
              </motion.div>
            }
          />
          <Route
            path="/darbai"
            element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Darbai />
              </motion.div>
            }
          />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
