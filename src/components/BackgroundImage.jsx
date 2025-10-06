import React from "react";
import bg from "../assets/background.jpg";

/**
 * Globalus fonas visiems puslapiams (išskyrus Home).
 * - pilnai dengia ekraną
 * - vienoda object-position/cover visur (kad „nešokinėtų“)
 * - lengvas patamsinimas ir subtilūs radialiniai akcentai
 */
export default function BackgroundImage() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <img
        src={bg}
        alt="Background"
        className="w-full h-full object-cover object-center"
      />
      {/* Pagrindinis patamsinimas */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/80" />

      {/* Subtilūs radialiniai akcentai (nebūtina) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(139,92,246,0.10),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(59,130,246,0.07),transparent_50%)]" />
    </div>
  );
}
