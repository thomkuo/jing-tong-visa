import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/layout/PageHero";
import { NewsGrid } from "@/components/sections/NewsGrid";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { getAllNewsArticles } from "@/lib/mdx";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const titles: Record<string, string> = {
    en: "News & Updates | Jing Tong Visa — Washington D.C.",
    zh: "新闻动态 | 精通签证 — 华盛顿特区",
  };
  const descriptions: Record<string, string> = {
    en: "Stay informed on China visa policy changes, travel tips, and announcements from Jing Tong Visa Services.",
    zh: "及时了解中国签证政策变化、旅行建议及精通签证服务的最新公告。",
  };
  return {
    title: titles[locale] ?? titles.en,
    description: descriptions[locale] ?? descriptions.en,
    alternates: {
      canonical: `https://jingtongvisa.com/${locale}/news`,
      languages: {
        en: "https://jingtongvisa.com/en/news",
        zh: "https://jingtongvisa.com/zh/news",
        "x-default": "https://jingtongvisa.com/en/news",
      },
    },
    openGraph: {
      title: titles[locale] ?? titles.en,
      description: descriptions[locale] ?? descriptions.en,
      url: `https://jingtongvisa.com/${locale}/news`,
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

export default async function NewsIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("newsPage");
  const articles = getAllNewsArticles(locale);

  return (
    <>
      <PageHero
        title={t("heroTitle")}
        subtitle={t("heroSubtitle")}
        imageSeed="china-news-hero"
      />
      <section className="bg-bg">
        <NewsGrid articles={articles} />
      </section>
      <ContactCTA />
    </>
  );
}
