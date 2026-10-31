import React, { useEffect, useState } from "react";
import { PRACTICE } from "../design/content";

/**
 * Local time at the practice. A real readout rather than decoration: it is
 * the one thing on the page that is true to the second, and it tells a
 * visitor in another timezone whether a reply is likely today.
 *
 * The interval stops while the tab is hidden, so a backgrounded page costs
 * nothing.
 */
const formatter = () =>
  new Intl.DateTimeFormat("en-GB", {
    timeZone: PRACTICE.timeZone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

export default function LiveClock({ className = "" }) {
  /*
   * Starts as a placeholder rather than the current time: this page is
   * prerendered, so "now" at build time is not "now" in the browser and
   * hydration would report a text mismatch. The real time arrives on the
   * first tick, which is immediate.
   */
  const [time, setTime] = useState("--:--:--");

  useEffect(() => {
    let id = 0;
    let fmt;
    try {
      fmt = formatter();
    } catch (err) {
      return undefined;
    }

    const tick = () => setTime(fmt.format(new Date()));
    const start = () => {
      if (id) return;
      tick();
      id = window.setInterval(tick, 1000);
    };
    const stop = () => {
      if (id) window.clearInterval(id);
      id = 0;
    };
    const onVisibility = () => (document.hidden ? stop() : start());

    start();
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <span className={`font-mono tabular-nums ${className}`}>
      {time}
      <span className="ml-2 text-ink-3">{PRACTICE.locality}</span>
    </span>
  );
}
