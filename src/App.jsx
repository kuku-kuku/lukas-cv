import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import Apie from "./pages/Apie";
import Paslaugos from "./pages/Paslaugos";
import Kontaktai from "./pages/Kontaktai";
import Darbai from "./pages/Darbai";
import NotFound from "./pages/NotFound";
import Demo from "./pages/Demo";
import AdminLogin from "./pages/AdminLogin";
import AdminPanel from "./pages/AdminPanel";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import BackgroundImage from "./components/BackgroundImage";
import "./styles.css";
import { AnimatePresence, motion } from "framer-motion";
import "./i18n";
import { initGA, trackPageview } from "./ga";

function AppContent() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isDemo = location.pathname.startsWith("/demo"); // 👈 pridėta

  useEffect(() => {
    initGA();
  }, []);

  useEffect(() => {
    trackPageview(location.pathname);
  }, [location]);

  return (
    <div className="min-h-screen text-white font-poppins transition relative">
      <ScrollToTop />

      {/* Nerodyti Navbar nei Home, nei Demo puslapiuose */}
      {!isHome && !isDemo && <Navbar />}
      <BackgroundImage />

      {isHome && (
        <>
          <video
            className="absolute top-0 left-0 w-full h-full object-cover object-left md:object-center z-0"
            src="/hero.mp4"
            autoPlay
            loop
            muted
            playsInline
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50 z-10 pointer-events-none" />
        </>
      )}

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />

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

          <Route
            path="/demo"
            element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Demo />
              </motion.div>
            }
          />

          <Route
            path="/demo/admin"
            element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <AdminLogin />
              </motion.div>
            }
          />
          <Route
            path="/demo/cart"
            element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Cart />
              </motion.div>
            }
          />

          <Route
            path="/demo/admin-panel"
            element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <AdminPanel />
              </motion.div>
            }
          />

          <Route
            path="*"
            element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <NotFound />
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
