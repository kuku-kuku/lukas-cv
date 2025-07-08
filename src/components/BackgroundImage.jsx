import React from "react";
import { useLocation } from "react-router-dom";
import bg from "../assets/background.jpg";

export default function BackgroundImage() {
  const location = useLocation();

  if (location.pathname === "/") return null;

  return (
    <div className="absolute top-0 left-0 w-full h-full -z-10">
      <img
        src={bg}
        alt="Background"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/40" />
    </div>
  );
}
