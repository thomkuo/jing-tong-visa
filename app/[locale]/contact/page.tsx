import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/layout/PageHero";
import { ContactForm } from "@/components/sections/ContactForm";
import { AnimateIn } from "@/components/ui/AnimateIn";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const titles: Record<string, string> = {
    en: "Contact Us | Jing Tong Visa Services — Washington D.C.",
    zh: "联系我们 | 精通签证服务 — 华盛顿特区",
  };
  const descriptions: Record<string, string> = {
    en: "Get in touch with Jing Tong Visa Services. Located near the Chinese Consulate in Washington D.C. Free consultation — we respond within 1 business day.",
    zh: "联系精通签证服务。办公室位于华盛顿特区中国领事馆附近。免费咨询——我们在1个工作日内回复。",
  };
  return {
    title: titles[locale] ?? titles.en,
    description: descriptions[locale] ?? descriptions.en,
    alternates: {
      canonical: `https://jingtongvisa.com/${locale}/contact`,
      languages: {
        en: "https://jingtongvisa.com/en/contact",
        zh: "https://jingtongvisa.com/zh/contact",
        "x-default": "https://jingtongvisa.com/en/contact",
      },
    },
    openGraph: {
      title: titles[locale] ?? titles.en,
      description: descriptions[locale] ?? descriptions.en,
      url: `https://jingtongvisa.com/${locale}/contact`,
      siteName: "Jing Tong Visa Services",
      locale: locale === "zh" ? "zh_CN" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: titles[locale] ?? titles.en,
      description: descriptions[locale] ?? descriptions.en,
    },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("contactPage");
  const footer = await getTranslations("footer");

  return (
    <>
      <PageHero
        title={t("heroTitle")}
        subtitle={t("heroSubtitle")}
        badge={t("heroBadge")}
        imageSeed="china-contact-hero"
      />

      <section className="bg-bg py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">

            {/* ─── Form (left, 3 cols) ──────────────────────────────── */}
            <div className="lg:col-span-3">
              <AnimateIn from="left">
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-2">
                  {t("formTitle")}
                </h2>
                <p className="text-muted text-sm mb-8">{t("formSubtitle")}</p>
                <ContactForm />
              </AnimateIn>
            </div>

            {/* ─── Office Info (right, 2 cols) ──────────────────────── */}
            <div className="lg:col-span-2">
              <AnimateIn from="right" delay={0.1}>
                <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                  {t("infoTitle")}
                </h2>

                {/* Info cards */}
                <div className="flex flex-col gap-4 mb-8">
                  {[
                    {
                      icon: "📍",
                      label: footer("labelAddress"),
                      value: footer("address"),
                    },
                    {
                      icon: "📞",
                      label: footer("labelPhone"),
                      value: footer("phone"),
                      href: `tel:${footer("phone")}`,
                    },
                    {
                      icon: "✉️",
                      label: footer("labelEmail"),
                      value: footer("email"),
                      href: `mailto:${footer("email")}`,
                    },
                    {
                      icon: "🕐",
                      label: footer("labelHours"),
                      value: footer("hours"),
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="bg-surface border border-white/10 rounded-xl p-4 flex items-start gap-3"
                    >
                      <span className="text-xl flex-shrink-0">{item.icon}</span>
                      <div>
                        <p className="text-xs text-muted uppercase tracking-wider mb-0.5">
                          {item.label}
                        </p>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="text-sm text-foreground hover:text-red-primary transition-colors"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-sm text-foreground">{item.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Consulate note */}
                <div className="bg-red-primary/10 border border-red-primary/30 rounded-xl p-5 mb-6">
                  <p className="text-sm text-foreground/90 leading-relaxed">
                    📌 {t("infoConsulateNote")}
                  </p>
                </div>

                {/* Map placeholder */}
                <div className="bg-surface border border-white/10 rounded-xl overflow-hidden h-48 flex items-center justify-center">
                  <div className="text-center px-4">
                    <p className="text-3xl mb-2">🗺️</p>
                    <p className="text-xs text-muted">{t("mapComingSoon")}</p>
                  </div>
                </div>
              </AnimateIn>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
