"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export function TrustBar() {
  const t = useTranslations("trustBar");

  const stats = [
    { value: t("visasValue"), label: t("visasLabel") },
    { value: t("experienceValue"), label: t("experienceLabel") },
{ value: t("ratingValue"), label: t("ratingLabel") },
  ];

  return (
    <section className="bg-surface border-y border-red-primary/20 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-3 gap-8"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              variants={{
                hidden: { opacity: 0, y: 16 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
              }}
              className="flex flex-col items-center text-center gap-1"
            >
              <span className="font-display text-3xl sm:text-4xl font-bold text-red-primary">
                {stat.value}
              </span>
              <span className="text-xs sm:text-sm text-muted uppercase tracking-wider font-medium">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
