"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { MapPin, Zap, Users, ShieldCheck, type LucideIcon } from "lucide-react";
import { whyUsFeatures } from "@/data/whyUs";
import { AnimateIn } from "@/components/ui/AnimateIn";

const featureIcons: Record<string, LucideIcon> = {
  "consulate-proximity": MapPin,
  "fast-turnaround": Zap,
  "personalized-service": Users,
  "document-review": ShieldCheck,
};

export function WhyChooseUs() {
  const t = useTranslations("whyUs");
  const locale = useLocale();

  return (
    <section className="bg-surface py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <AnimateIn className="text-center mb-14">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t("title")}
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">{t("subtitle")}</p>
        </AnimateIn>

        {/* Features grid — staggered */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.12 } },
          }}
        >
          {whyUsFeatures.map((feature) => {
            const Icon = featureIcons[feature.id];
            return (
            <motion.div
              key={feature.id}
              variants={{
                hidden: { opacity: 0, y: 24 },
                show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] } },
              }}
              className="bg-surface-elevated border border-red-primary/20 rounded-xl p-6 hover:border-red-primary/50 transition-colors duration-300 group"
            >
              <div className="mb-4">
                {Icon && <Icon className="text-red-500 w-6 h-6" />}
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-3 group-hover:text-red-primary transition-colors duration-200">
                {locale === "zh" ? feature.titleZh : feature.title}
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                {locale === "zh"
                  ? feature.descriptionZh
                  : feature.description}
              </p>
            </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
