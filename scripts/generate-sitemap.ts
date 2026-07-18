import { writeFileSync } from "fs";
import { resolve } from "path";

// TODO: replace with your project URL once a project name or custom domain is set.
const BASE_URL = "";

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

const entries: SitemapEntry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/about", changefreq: "monthly", priority: "0.8" },
  { path: "/services", changefreq: "weekly", priority: "0.9" },
  { path: "/doctors", changefreq: "weekly", priority: "0.9" },
  { path: "/nutritionists", changefreq: "weekly", priority: "0.8" },
  { path: "/yoga-experts", changefreq: "weekly", priority: "0.8" },
  { path: "/ai-health-assistant", changefreq: "weekly", priority: "0.8" },
  { path: "/ai-dosha-assessment", changefreq: "weekly", priority: "0.8" },
  { path: "/book-consultation", changefreq: "weekly", priority: "0.9" },
  { path: "/pricing", changefreq: "weekly", priority: "0.9" },
  { path: "/blog", changefreq: "weekly", priority: "0.8" },
  { path: "/faqs", changefreq: "monthly", priority: "0.7" },
  { path: "/contact", changefreq: "monthly", priority: "0.7" },
  { path: "/privacy-policy", changefreq: "yearly", priority: "0.4" },
  { path: "/terms-conditions", changefreq: "yearly", priority: "0.4" },
];

function generateSitemap(items: SitemapEntry[]) {
  const urls = items.map((item) => {
    return [
      "  <url>",
      `    <loc>${BASE_URL}${item.path}</loc>`,
      item.changefreq ? `    <changefreq>${item.changefreq}</changefreq>` : null,
      item.priority ? `    <priority>${item.priority}</priority>` : null,
      "  </url>",
    ]
      .filter(Boolean)
      .join("\n");
  });

  return [
    "<?xml version=\"1.0\" encoding=\"UTF-8\"?>",
    "<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">",
    ...urls,
    "</urlset>",
  ].join("\n");
}

writeFileSync(resolve("public/sitemap.xml"), generateSitemap(entries));