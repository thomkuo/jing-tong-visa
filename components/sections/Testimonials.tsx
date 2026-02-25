"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { testimonials } from "@/data/testimonials";
import { AnimateIn } from "@/components/ui/AnimateIn";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < rating ? "text-gold" : "text-surface-elevated"}>
          ★
        </span>
      ))}
    </div>
  );
}

export function Testimonials() {
  const t = useTranslations("testimonials");

  return (
    <section className="bg-bg py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <AnimateIn className="text-center mb-14">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t("title")}
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">{t("subtitle")}</p>
        </AnimateIn>

        {/* Cards — staggered */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.15 } },
          }}
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={{
                hidden: { opacity: 0, y: 24 },
                show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] } },
              }}
              className="bg-surface border border-red-primary/20 rounded-xl p-6 flex flex-col gap-4"
            >
              <StarRating rating={testimonial.rating} />
              <blockquote className="text-foreground text-sm leading-relaxed flex-1">
                &ldquo;{testimonial.text}&rdquo;
              </blockquote>
              <div className="flex items-center gap-3 pt-2 border-t border-white/10">
                <div className="w-8 h-8 rounded-full bg-red-primary/20 flex items-center justify-center text-red-primary text-sm font-semibold flex-shrink-0">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-muted">{testimonial.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
