"use client";

import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { services } from "@/data/services";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { AnimateIn } from "@/components/ui/AnimateIn";

export function ServicesOverview() {
  const t = useTranslations("services");
  const locale = useLocale();

  const activeService = services.find((s) => s.active);
  const comingSoon = services.filter((s) => !s.active);

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

        {/* Featured active service — asymmetric image-left / content-right */}
        {activeService && (
          <AnimateIn className="mb-10">
            <div className="relative bg-surface-elevated border border-red-primary/30 rounded-2xl overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Image left — replace with licensed China photography before launch */}
                <div className="relative h-64 lg:h-auto lg:min-h-[420px] overflow-hidden">
                  <Image
                    src="https://picsum.photos/seed/china-tourist-visa/800/600"
                    alt="China tourist destination"
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-black/40" />
                  <div className="absolute inset-0 bg-red-primary/10" />

                  {/* Floating stat */}
                  <div className="absolute bottom-4 left-4 bg-bg/80 backdrop-blur-sm border border-red-primary/30 rounded-lg px-4 py-2.5">
                    <p className="text-xs text-muted uppercase tracking-wider mb-0.5">
                      {t("timeline")}
                    </p>
                    <p className="text-sm font-semibold text-foreground">
                      {activeService.timeline}
                    </p>
                  </div>
                </div>

                {/* Content right */}
                <div className="p-8 lg:p-10 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-5">
                    <Badge variant="default">{t("mostPopular")}</Badge>
                    <Badge variant="success">Active</Badge>
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-4">
                    {locale === "zh"
                      ? activeService.nameZh
                      : activeService.name}
                  </h3>

                  <p className="text-muted text-base leading-relaxed mb-6">
                    {locale === "zh"
                      ? activeService.descriptionZh
                      : activeService.description}
                  </p>

                  {/* Requirements checklist */}
                  {activeService.requirements && (
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-8">
                      {activeService.requirements.map((req, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-sm text-muted"
                        >
                          <span className="text-gold mt-0.5 flex-shrink-0">
                            ✓
                          </span>
                          {req}
                        </li>
                      ))}
                    </ul>
                  )}

                  <Button href={`/${locale}/services`} size="md" className="self-start">
                    {t("learnMore")}
                  </Button>
                </div>
              </div>
            </div>
          </AnimateIn>
        )}

        {/* Coming soon cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {comingSoon.map((service) => (
            <motion.div
              key={service.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
              }}
              className="bg-surface border border-white/10 rounded-xl p-6 opacity-70"
            >
              <div className="mb-3">
                <Badge variant="muted">{t("comingSoon")}</Badge>
              </div>
              <h4 className="font-display text-lg font-semibold text-foreground mb-2">
                {locale === "zh" ? service.nameZh : service.name}
              </h4>
              <p className="text-sm text-muted leading-relaxed">
                {locale === "zh" ? service.descriptionZh : service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
