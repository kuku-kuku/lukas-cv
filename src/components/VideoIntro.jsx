import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function VideoIntro({ onEnd, onSkip }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const playVideo = async () => {
      if (videoRef.current) {
        try {
          await videoRef.current.play();
          
          // Force end after 5 seconds (change number as needed)
          setTimeout(() => {
            if (videoRef.current && onEnd) {
              onEnd();
            }
          }, 5000); // Video length in milliseconds
          
        } catch (err) {
          console.log("Autoplay prevented:", err.name);
        }
      }
    };
    
    const timer = setTimeout(playVideo, 100);
    return () => clearTimeout(timer);
  }, [onEnd]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0 }} // Instant hide when exiting
      className="fixed inset-0 z-50 bg-black"
    >
      {/* Video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        onEnded={onEnd}
        className="w-full h-full object-cover"
      >
        <source src="/hero.mp4" type="video/mp4" />
        {/* Fallback text */}
        Your browser does not support the video tag.
      </video>

      {/* Dark overlay to make video darker */}
      <div className="absolute inset-0 bg-black/50 pointer-events-none" />

      {/* Optional: Logo watermark */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 0.5 }}
        className="absolute top-8 left-8 text-white text-2xl font-bold z-10"
      >
        LB
      </motion.div>
    </motion.div>
  );
}