import React, { useCallback, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import BootSequence, { shouldBoot } from "../components/BootSequence";
import CommandRail from "../components/CommandRail";
import GridOverlay from "../components/GridOverlay";
import Masthead from "../components/sections/Masthead";
import Capabilities from "../components/sections/Capabilities";
import Method from "../components/sections/Method";
import Work from "../components/sections/Work";
import Stack from "../components/sections/Stack";
import Process from "../components/sections/Process";
import Contact from "../components/sections/Contact";
import Footer from "../components/sections/Footer";
import { useReducedMotion } from "../design/useMotionPrefs";

/**
 * The single page.
 *
 * Two deliberate structural decisions:
 *
 * 1. Every section renders unconditionally. The page is prerendered, so the
 *    whole document must exist at build time - an earlier version mounted
 *    the lower sections a frame late to keep hydration off the critical
 *    path, and the prerendered HTML then contained only the masthead.
 *    Prerendering solves that problem far better: the content is painted
 *    before any JavaScript runs at all. A deep link needs no help either,
 *    since the target element exists while the HTML is being parsed.
 *
 * 2. The selected project is held here rather than inside the work index, so
 *    the evidence links in section 01 can open the matching row in section 03
 *    and scroll to it. One owner, no duplicated state.
 */
export default function Home() {
  const reduced = useReducedMotion();
  /**
   * The curtain is decided after mount, never during render.
   *
   * shouldBoot() reads sessionStorage and matchMedia, which do not exist
   * while the page is being prerendered. Deciding during render would make
   * the first client render disagree with the prerendered HTML - a hydration
   * mismatch - so the first render always matches the server (no curtain)
   * and the curtain is added a tick later.
   */
  const [booting, setBooting] = useState(false);
  useEffect(() => {
    if (shouldBoot()) setBooting(true);
  }, []);
  const [openProject, setOpenProject] = useState(null);
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
        <Capabilities onEvidence={openFromEvidence} />
        <Method />
        <Work openId={openProject} onOpen={setOpenProject} />
        <Stack />
        <Process />
        <Contact />
      </main>

      <Footer />

      <AnimatePresence>
        {booting && <BootSequence onDone={() => setBooting(false)} />}
      </AnimatePresence>
    </div>
  );
}
