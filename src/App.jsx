import React, { Suspense, lazy, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Home from "./pages/Home";
import ScrollToTop from "./components/ScrollToTop";
import BackgroundImage from "./components/BackgroundImage";
import "./styles.css";
import "./i18n";
import { initGA, trackPageview } from "./ga";
import { DUR, EASE } from "./design/motion";

/**
 * Routing is unchanged from before - /, /demo, /demo/admin, /demo/cart,
 * /demo/admin-panel and the 404 all still resolve to the same components, so
 * no indexed URL moved.
 *
 * What changed:
 *  - the demo area and the 404 page are code-split, so the landing page no
 *    longer ships the demo shop in its main bundle,
 *  - the app shell no longer sets `overflow: hidden`, which was silently
 *    breaking `position: sticky` and 100svh sections inside the page.
 */

const Demo = lazy(() => import("./pages/Demo"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminPanel = lazy(() => import("./pages/AdminPanel"));
const Cart = lazy(() => import("./pages/Cart"));
const NotFound = lazy(() => import("./pages/NotFound"));

function RouteFade({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: DUR.base, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** Minimal, honest placeholder: a hairline, not a fake progress bar. */
function RouteFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <span className="label">Loading</span>
    </div>
  );
}

function AppContent() {
  const location = useLocation();
  const isDemo = location.pathname.startsWith("/demo");

  // Analytics is not first-paint work: starting gtag during hydration costs
  // main-thread time exactly when the page is trying to render.
  useEffect(() => {
    let timer = 0;
    let done = false;

    // gtag is ~176 kB of third-party JavaScript - larger than this entire
    // app - and ~570ms of main-thread work. Loading it during page load
    // pushed LCP out by seconds on a slow connection for no benefit to the
    // visitor, so it waits for the first real interaction (or 8s, whichever
    // comes first). Page views are queued in src/ga until it is ready, and
    // counter.dev already counts visits that never interact.
    const EVENTS = ["pointerdown", "keydown", "scroll", "touchstart"];
    const start = () => {
      if (done) return;
      done = true;
      EVENTS.forEach((e) => window.removeEventListener(e, start));
      window.clearTimeout(timer);
      initGA();
    };

    EVENTS.forEach((e) =>
      window.addEventListener(e, start, { once: true, passive: true })
    );
    timer = window.setTimeout(start, 8000);

    return () => {
      EVENTS.forEach((e) => window.removeEventListener(e, start));
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    trackPageview(location.pathname);
  }, [location]);

  return (
    <div className="relative min-h-screen">
      <ScrollToTop />

      {/* The photographic background belongs to the demo shop only. */}
      {isDemo && <BackgroundImage />}

      <Suspense fallback={<RouteFallback />}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />

            <Route
              path="/demo"
              element={
                <RouteFade>
                  <Demo />
                </RouteFade>
              }
            />
            <Route
              path="/demo/admin"
              element={
                <RouteFade>
                  <AdminLogin />
                </RouteFade>
              }
            />
            <Route
              path="/demo/cart"
              element={
                <RouteFade>
                  <Cart />
                </RouteFade>
              }
            />
            <Route
              path="/demo/admin-panel"
              element={
                <RouteFade>
                  <AdminPanel />
                </RouteFade>
              }
            />

            <Route
              path="*"
              element={
                <RouteFade>
                  <NotFound />
                </RouteFade>
              }
            />
          </Routes>
        </AnimatePresence>
      </Suspense>
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
