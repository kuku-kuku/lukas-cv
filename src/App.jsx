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
 * Routing is unchanged from before — /, /demo, /demo/admin, /demo/cart,
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
      transition={{ duration: DUR.s, ease: EASE }}
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
    let handle = 0;
    const idle =
      window.requestIdleCallback || ((fn) => window.setTimeout(fn, 1500));
    const cancel =
      window.cancelIdleCallback || window.clearTimeout.bind(window);
    const schedule = () => {
      handle = idle(() => initGA(), { timeout: 6000 });
    };

    // gtag is ~176 kB of third-party JavaScript — larger than this app. It
    // waits for load and then for an idle moment, so it can never land in the
    // middle of the first render. Page views are queued until it is ready.
    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });

    return () => {
      window.removeEventListener("load", schedule);
      if (handle) cancel(handle);
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
