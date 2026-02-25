import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { ServicesOverview } from "@/components/sections/ServicesOverview";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { PhotoBreak } from "@/components/sections/PhotoBreak";
import { Testimonials } from "@/components/sections/Testimonials";
import { NewsPreview } from "@/components/sections/NewsPreview";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { getAllNewsArticles } from "@/lib/mdx";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    en: "Jing Tong Visa Services | China Visa Experts in Washington D.C.",
    zh: "精通签证服务 | 华盛顿特区中国签证专家",
  };

  const descriptions: Record<string, string> = {
    en: "Expert China tourist visa services in Washington D.C. Located steps from the Chinese Consulate. Fast, reliable, personalized — 500+ visas approved.",
    zh: "华盛顿特区专业中国旅游签证服务。毗邻中国驻美领事馆。快速、可靠、个性化——已协助500+份签证获批。",
  };

  return {
    title: titles[locale] ?? titles.en,
    description: descriptions[locale] ?? descriptions.en,
    openGraph: {
      title: titles[locale] ?? titles.en,
      description: descriptions[locale] ?? descriptions.en,
      url: `https://jingtongvisa.com/${locale}`,
      siteName: "Jing Tong Visa Services",
      locale: locale === "zh" ? "zh_CN" : "en_US",
      type: "website",
    },
    alternates: {
      canonical: `https://jingtongvisa.com/${locale}`,
      languages: {
        en: "https://jingtongvisa.com/en",
        zh: "https://jingtongvisa.com/zh",
      },
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const latestArticles = getAllNewsArticles(locale).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Jing Tong Visa Services",
    description:
      "Expert China visa services in Washington D.C., located near the Chinese Consulate.",
    url: "https://jingtongvisa.com",
    telephone: "+1-202-555-0123",
    email: "info@jingtongvisa.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "1234 Connecticut Ave NW",
      addressLocality: "Washington",
      addressRegion: "DC",
      postalCode: "20036",
      addressCountry: "US",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    priceRange: "$$",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <TrustBar />
      <ServicesOverview />
      <WhyChooseUs />

      {/* Full-width photo break — replace src with licensed China photography before launch */}
      <PhotoBreak
        src="https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=1920&q=80"
        alt="Shanghai skyline at night"
        quote="Your journey to China starts here — we handle every step of the visa process."
        height="h-64 lg:h-80"
      />

      <Testimonials />
      <NewsPreview articles={latestArticles} />
      <ContactCTA />
    </>
  );
}
