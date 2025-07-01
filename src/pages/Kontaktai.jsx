import React from "react";

export default function Kontaktai() {
  return (
    <div className="pt-28 pb-20 px-4 md:px-8 bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white min-h-screen font-poppins transition">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6">Susisiekime</h2>
        <p className="text-lg mb-10">
          Jei domina puslapis ar bendradarbiavimas – parašyk. Galime pasikalbėti el. paštu arba per socialinius tinklus.
        </p>
        <a
          href="mailto:lukas.beneta.dev@gmail.com"
          className="inline-block bg-indigo-600 text-white font-semibold px-6 py-3 rounded-full hover:bg-indigo-700 transition-all"
        >
          Rašyk man
        </a>
      </div>
    </div>
  );
}
