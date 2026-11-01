import React, { useCallback, useEffect, useState } from "react";
import CommandRail from "../components/CommandRail";
import GridOverlay from "../components/GridOverlay";
import Masthead from "../components/sections/Masthead";
import Capabilities from "../components/sections/Capabilities";
import Work from "../components/sections/Work";
import Why from "../components/sections/Why";
import About from "../components/sections/About";
import Pricing from "../components/sections/Pricing";
import Faq from "../components/sections/Faq";
import QuoteDrawer from "../components/QuoteDrawer";
import Process from "../components/sections/Process";
import Contact from "../components/sections/Contact";
import Footer from "../components/sections/Footer";
import { useReducedMotion } from "../design/useMotionPrefs";

/**
 * The single page.
 *
 * Two deliberate structural decisions:
 *
 * 1. There is no opening sequence. A curtain over the page existed to hide
 *    an empty first paint while a client-rendered app booted; the page is
 *    prerendered now, so the first frame is already the finished hero. A
 *    curtain mounted after hydration would cover content that had already
 *    arrived - content, curtain, content - and delay the one thing a
 *    visitor came for.
 *
 * 2. Every section renders unconditionally. The page is prerendered, so the
 *    whole document must exist at build time - an earlier version mounted
 *    the lower sections a frame late to keep hydration off the critical
 *    path, and the prerendered HTML then contained only the masthead.
 *    Prerendering solves that problem far better: the content is painted
 *    before any JavaScript runs at all. A deep link needs no help either,
 *    since the target element exists while the HTML is being parsed.
 *
 * 3. The selected project and the chosen pricing package are held here
 *    rather than inside their sections, so the evidence links in section 01
 *    can open a row in section 02, and a package in section 03 can pre-fill
 *    the form in section 06. One owner each, no duplicated state.
 */
export default function Home() {
  const reduced = useReducedMotion();
  const [openProject, setOpenProject] = useState(null);

  // Choosing a package opens the quote drawer with that package selected.
  const [quotePackage, setQuotePackage] = useState(null);
  // Stable identity: an inline arrow here gives the drawer a new prop on
  // every render of this page, which re-runs its effects continuously and
  // interrupts its exit animation so it never unmounts.
  const closeQuote = useCallback(() => setQuotePackage(null), []);
  const [pendingScroll, setPendingScroll] = useState(null);

  const openFromEvidence = useCallback((projectId) => {
    setOpenProject(projectId);
    setPendingScroll(projectId);
  }, []);

  // Scroll after the row has actually expanded, so we land on the open panel.
  useEffect(() => {
    if (!pendingScroll) return undefined;
    const id = window.requestAnimationFrame(() => {
      document.getElementById(`work-${pendingScroll}`)?.scrollIntoView({
        behavior: reduced ? "auto" : "smooth",
        block: "center",
      });
      setPendingScroll(null);
    });
    return () => window.cancelAnimationFrame(id);
  }, [pendingScroll, reduced]);

  return (
    <div className="relative min-h-screen">
      <GridOverlay />
      <CommandRail />

      <main>
        <Masthead />
        <Why />
        <Capabilities onEvidence={openFromEvidence} />
        <Work openId={openProject} onOpen={setOpenProject} />
        <About />
        <Pricing onChoose={setQuotePackage} />
        <Process />
        <Faq />
        <Contact />
      </main>

      <Footer />

      <QuoteDrawer packageId={quotePackage} onClose={closeQuote} />
    </div>
  );
}
