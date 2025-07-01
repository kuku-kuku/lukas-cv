import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";

export default function Paslaugos() {
  const { t } = useTranslation();
  const [active, setActive] = useState(null);
  const services = [1, 2, 3, 4, 5, 6];

  return (
    <motion.div
      key={t("services")} // re-key on language change
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-28 pb-20 px-4 md:px-8 bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white min-h-screen font-poppins transition-colors duration-500"
    >
      <motion.h2
        className="text-4xl font-bold mb-10 text-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {t("services")}
      </motion.h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((i) => (
          <motion.div
            key={i}
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
            className="p-6 border border-gray-300 dark:border-gray-700 rounded-xl shadow hover:shadow-lg cursor-pointer bg-white dark:bg-gray-800 transition-colors duration-500"
          >
            <h3 className="text-2xl font-semibold mb-2">{t(`service_${i}_title`)}</h3>
            <p className="mb-2 text-gray-700 dark:text-gray-300">{t(`service_${i}_short`)}</p>
            <p className="font-bold text-indigo-600 dark:text-indigo-400">
              {t("price_label")}: {t(`service_${i}_price`)}
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
              className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-xl p-8 max-w-lg w-full relative shadow-xl"
            >
              <button
                onClick={() => setActive(null)}
                className="absolute top-4 right-4 text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white text-2xl"
              >
                &times;
              </button>
              <h3 className="text-3xl font-bold mb-4">{active.title}</h3>
              <p className="mb-4 text-gray-800 dark:text-gray-300">{active.long}</p>
              <p className="font-semibold text-indigo-600 dark:text-indigo-400">
                {t("price_label")}: {active.price}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
