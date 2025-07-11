import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";

export default function Paslaugos() {
  const { t, i18n } = useTranslation();
  const [active, setActive] = useState(null);
  const services = [1, 2, 3, 4, 5, 6];

  return (
    <motion.div
      key={i18n.language}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-28 pb-20 px-4 md:px-8 text-white min-h-screen font-poppins transition-colors duration-500 relative"
    >
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <img
          src={require("../assets/background.jpg")}
          alt="bg"
          className="w-full h-full object-cover object-left sm:object-cover"
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      <motion.h2
        className="text-4xl font-bold mb-10 text-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {t("services")}
      </motion.h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        {services.map((i) => (
          <motion.div
            key={`${i}-${i18n.language}`}
            onClick={() =>
              setActive({
                title: t(`service_${i}_title`),
                long: t(`service_${i}_long`),
                price: t(`service_${i}_price`),
              })
            }
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="p-6 border border-gray-300 rounded-xl shadow hover:shadow-lg cursor-pointer bg-white/90 text-gray-900 transition-colors duration-500 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-2xl font-semibold mb-2">
                {t(`service_${i}_title`)}
              </h3>
              <p className="text-gray-700">{t(`service_${i}_short`)}</p>
            </div>
            <p className="mt-6 text-right font-semibold text-gray-900">
              {t(`service_${i}_price`)}
            </p>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white text-gray-900 rounded-xl p-8 max-w-lg w-full relative shadow-xl"
            >
              <button
                onClick={() => setActive(null)}
                className="absolute top-4 right-4 text-gray-500 hover:text-black text-2xl"
              >
                &times;
              </button>
              <h3 className="text-3xl font-bold mb-4">{active.title}</h3>
              <p className="mb-4 text-gray-800">{active.long}</p>
              <p className="font-semibold text-gray-900">{active.price}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
