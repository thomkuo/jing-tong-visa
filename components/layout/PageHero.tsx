"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  imageSrc: string;
}

export function PageHero({ title, subtitle, imageSrc }: PageHeroProps) {
  return (
    <section className="relative pt-32 pb-20 lg:pt-44 lg:pb-28 overflow-hidden">
      {/* Background photo */}
      <Image
        src={imageSrc}
        alt="Page hero background"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/70" />
      <div className="absolute inset-0 bg-red-primary/10" />
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-bg to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h1
          className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08 }}
          suppressHydrationWarning
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            className="text-white/75 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            suppressHydrationWarning
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}
