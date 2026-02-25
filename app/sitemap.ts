import type { MetadataRoute } from "next";
import { getAllNewsSlugs } from "@/lib/mdx";

const BASE_URL = "https://jingtongvisa.com";
const LOCALES = ["en", "zh"];

const staticRoutes = [
  { path: "", priority: 1.0, changeFrequency: "weekly" as const },
  { path: "/services", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/pricing", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/checklist", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/faq", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/news", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/contact", priority: 0.8, changeFrequency: "monthly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const slugs = getAllNewsSlugs();

  const staticEntries = staticRoutes.flatMap(({ path, priority, changeFrequency }) =>
    LOCALES.map((locale) => ({
      url: `${BASE_URL}/${locale}${path}`,
      priority,
      changeFrequency,
    }))
  );

  const articleEntries = slugs.flatMap((slug) =>
    LOCALES.map((locale) => ({
      url: `${BASE_URL}/${locale}/news/${slug}`,
      priority: 0.6,
      changeFrequency: "monthly" as const,
    }))
  );

  return [...staticEntries, ...articleEntries];
}
