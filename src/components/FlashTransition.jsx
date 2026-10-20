import React from "react";
import { motion } from "framer-motion";

export default function FlashTransition() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 1, 0] }}
      transition={{ duration: 1.2, times: [0, 0.2, 0.8, 1] }}
      className="fixed inset-0 z-[100] pointer-events-none"
      style={{
        background: "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,0.9) 50%, rgba(255,255,255,0.7) 100%)",
      }}
    />
  );
}