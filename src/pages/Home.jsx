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
 * 1. The content is always rendered. The opening sequence is an overlay on
 *    top of a complete document, so the first paint, the crawler, and anyone
 *    with JS or motion disabled all get the whole page. (The previous version
 *    mounted the sections only after a five-second video had finished.)
 *
 * 2. The selected project is held here rather than inside the work index, so
 *    the evidence links in section 01 can open the matching row in section 03
 *    and scroll to it. One owner, no duplicated state.
 */
export default function Home() {
  const reduced = useReducedMotion();
  const [booting, setBooting] = useState(() => shouldBoot());
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
