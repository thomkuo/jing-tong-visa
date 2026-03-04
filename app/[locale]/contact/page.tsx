import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
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
    zh: "联系我们 | 京通签证服务 — 华盛顿特区",
  };
  const descriptions: Record<string, string> = {
    en: "Get in touch with Jing Tong Visa Services. Located near the Chinese Consulate in Washington D.C. Free consultation — we respond within 1 business day.",
    zh: "联系京通签证服务。办公室位于华盛顿特区中国领事馆附近。免费咨询——我们在1个工作日内回复。",
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
        imageSrc="/images/china-flag.jpg"
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

                {/* WeChat */}
                <div className="bg-surface border border-white/10 rounded-xl p-5 mb-4">
                  <div className="flex items-start gap-3 mb-4">
                    <span className="text-xl flex-shrink-0">💬</span>
                    <div>
                      <p className="text-xs text-muted uppercase tracking-wider mb-0.5">
                        {footer("labelWeChat")}
                      </p>
                      <p className="text-sm text-foreground">{footer("wechat")}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="relative w-40 h-40 rounded-lg overflow-hidden bg-white p-1">
                      <Image
                        src="/images/wechat-qr.png"
                        alt={footer("wechatQrAlt")}
                        fill
                        className="object-contain"
                        sizes="160px"
                      />
                    </div>
                    <p className="text-xs text-muted mt-2">{footer("wechatScan")}</p>
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
