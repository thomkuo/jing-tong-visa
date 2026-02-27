"use client";

import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

export function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background photo */}
      <Image
        src="/images/great-wall.jpg"
        alt="Great Wall of China"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70" />
      {/* Red tint overlay */}
      <div className="absolute inset-0 bg-red-900/20" />
      {/* Bottom vignette → blends into page bg */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-bg to-transparent" />
      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(rgba(192,57,43,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(192,57,43,0.4) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Headline */}
          <motion.h1
            className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            suppressHydrationWarning
          >
            {t("headline")}
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            className="text-lg sm:text-xl text-white/75 max-w-2xl mx-auto mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            suppressHydrationWarning
          >
            {t("subheadline")}
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            suppressHydrationWarning
          >
            <Button
              href={`/${locale}/services`}
              size="lg"
              className="w-full sm:w-auto"
            >
              {t("ctaServices")}
            </Button>
            <Button
              href={`/${locale}/contact`}
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto border-white/50 text-white hover:bg-white/10 hover:border-white"
            >
              {t("ctaContact")}
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
