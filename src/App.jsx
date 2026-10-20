import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

// Demo routes (keep if needed)
import Demo from "./pages/Demo";
import AdminLogin from "./pages/AdminLogin";
import AdminPanel from "./pages/AdminPanel";
import Cart from "./pages/Cart";

// Old pages (backup - can remove later)
// import Apie from "./pages/Apie";
// import Paslaugos from "./pages/Paslaugos";
// import Kontaktai from "./pages/Kontaktai";
// import Darbai from "./pages/Darbai";

import ScrollToTop from "./components/ScrollToTop";
import BackgroundImage from "./components/BackgroundImage";
import "./styles.css";
import { AnimatePresence, motion } from "framer-motion";
import "./i18n";
import { initGA, trackPageview } from "./ga";

function AppContent() {
  const location = useLocation();
  const isDemo = location.pathname.startsWith("/demo");

  useEffect(() => {
    initGA();
  }, []);

  useEffect(() => {
    trackPageview(location.pathname);
  }, [location]);

  return (
    <div className="min-h-screen text-white font-poppins transition relative overflow-hidden">
      <ScrollToTop />

      {/* Background only for Demo pages */}
      {isDemo && <BackgroundImage />}

      {/* 
        No global Navbar - Home has StickyNav inside
        Demo pages can have their own nav if needed
      */}

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* Main Portfolio - One Page with Video Intro */}
          <Route path="/" element={<Home />} />

          {/* Demo Routes (keep if needed) */}
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

          {/* Old routes - commented out (backup)
          <Route path="/apie" element={<Apie />} />
          <Route path="/paslaugos" element={<Paslaugos />} />
          <Route path="/kontaktai" element={<Kontaktai />} />
          <Route path="/darbai" element={<Darbai />} />
          */}

          {/* 404 */}
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