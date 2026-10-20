import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import VideoIntro from "../components/VideoIntro";
import FlashTransition from "../components/FlashTransition";
import StickyNav from "../components/StickyNav";
import BackToTop from "../components/BackToTop"; // ← ADD THIS

// All sections
import HeroSection from "../components/sections/HeroSection";
import AboutSection from "../components/sections/AboutSection";
import ServicesSection from "../components/sections/ServicesSection";
import WorksSection from "../components/sections/WorksSection";
import ContactSection from "../components/sections/ContactSection";

export default function Home() {
  const [showVideo, setShowVideo] = useState(true);
  const [showFlash, setShowFlash] = useState(false);
  const [mainContentReady, setMainContentReady] = useState(false);

  useEffect(() => {
    // FORCE SHOW VIDEO - For testing/development
    // Comment out these lines to use normal once-per-day logic
    
    // Uncomment below to enable once-per-day video:
    /*
    const lastSeenDate = localStorage.getItem("videoIntroLastSeen");
    const today = new Date().toDateString();
    const hasSeenToday = lastSeenDate === today;
    
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (hasSeenToday || prefersReducedMotion) {
      setShowVideo(false);
      setMainContentReady(true);
    }
    */
  }, []);

  const handleVideoEnd = () => {
    setShowVideo(false);
    setShowFlash(true);
    setTimeout(() => {
      setShowFlash(false);
      setMainContentReady(true);
      localStorage.setItem("videoIntroLastSeen", new Date().toDateString());
    }, 1200);
  };

  const handleSkipIntro = () => {
    setShowVideo(false);
    setMainContentReady(true);
    localStorage.setItem("videoIntroLastSeen", new Date().toDateString());
  };

  return (
    <div className="relative bg-black text-white font-poppins min-h-screen">
      {/* Video Intro */}
      <AnimatePresence>
        {showVideo && (
          <VideoIntro onEnd={handleVideoEnd} onSkip={handleSkipIntro} />
        )}
      </AnimatePresence>

      {/* Flash Transition */}
      <AnimatePresence>
        {showFlash && <FlashTransition />}
      </AnimatePresence>

      {/* Main Content - One Page Scroll */}
      {mainContentReady && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          {/* Sticky Navigation */}
          <StickyNav />

          {/* Back to Top Button - ADD THIS */}
          <BackToTop />

          {/* All Sections in Order */}
          <div className="relative">
            <HeroSection />
            <AboutSection />
            <ServicesSection />
            <WorksSection />
            <ContactSection />
          </div>

          {/* Footer (optional) */}
          <footer className="relative py-8 text-center text-white/40 text-sm border-t border-white/10">
            <div className="max-w-7xl mx-auto px-4">
              <p>© {new Date().getFullYear()} Lukas Beneta. All rights reserved.</p>
            </div>
          </footer>
        </motion.div>
      )}
    </div>
  );
}