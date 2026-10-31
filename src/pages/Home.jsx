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

  /**
   * Everything below the fold mounts one frame after the masthead.
   *
   * The masthead is what the visitor is waiting for, and it was competing for
   * the main thread with six sections, an interactive diagram and a work
   * index that nobody can see yet. The delay is a single animation frame, so
   * the full document still exists milliseconds later - this is not
   * scroll-gated rendering, and no content is withheld from crawlers.
   */
  const [belowFold, setBelowFold] = useState(false);
  useEffect(() => {
    let done = false;
    const show = () => {
      if (done) return;
      done = true;
      setBelowFold(true);
    };
    // A frame callback is the right trigger when the page is actually being
    // painted, but it never fires in a background tab or a non-painting
    // renderer - which would leave the document as a masthead and nothing
    // else. The timer is the floor that guarantees the rest mounts anyway.
    const frame = window.requestAnimationFrame(show);
    const timer = window.setTimeout(show, 300);
    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timer);
    };
  }, []);

  // A deep link (/#contact) is resolved by the browser before those sections
  // exist, so it is re-applied once they do.
  useEffect(() => {
    if (!belowFold) return;
    const id = window.location.hash.slice(1);
    if (!id) return;
    document.getElementById(id)?.scrollIntoView({ behavior: "auto", block: "start" });
  }, [belowFold]);

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
      {belowFold && <CommandRail />}

      <main>
        <Masthead />
        {belowFold && (
          <>
            <Capabilities onEvidence={openFromEvidence} />
            <Method />
            <Work openId={openProject} onOpen={setOpenProject} />
            <Stack />
            <Process />
            <Contact />
          </>
        )}
      </main>

      {belowFold && <Footer />}

      <AnimatePresence>
        {booting && <BootSequence onDone={() => setBooting(false)} />}
      </AnimatePresence>
    </div>
  );
}
