import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Resets scroll on navigation. Jumps instantly rather than smooth-scrolling:
 * animating the viewport back up through a page the visitor is leaving reads
 * as a glitch, and it fights the route fade.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
