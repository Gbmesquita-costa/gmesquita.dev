import { MetadataRoute } from "next";

const robots = (): MetadataRoute.Robots => {
  const baseUrl = process.env.METADATA_BASE;

  return {
    rules: [
      // General rules for all crawlers
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/", // Block API endpoints
          "/_next/", // Next.js Internal Files
          "/admin/", // Administrative area (if applicable)
          "*.json$", // Configuration JSON files
          "/private/", // Private files
          "/temp/", // Temporary files
          "/*?*", // URLs with query strings (may duplicate content)
        ],
        crawlDelay: 1, // 1 second between requests - preserves performance
      },

      // Specific optimizations for Google
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/", "/_next/", "/admin/", "*.json$"],
        crawlDelay: 0, // Google may crawl more aggressively
      },

      // Optimizations for Bing
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/api/", "/_next/", "/admin/", "*.json$"],
        crawlDelay: 1, // Bing with moderate crawl
      },

      // Specifically allow social media crawlers
      {
        userAgent: "facebookexternalhit",
        allow: "/",
      },
      {
        userAgent: "Twitterbot",
        allow: "/",
      },
      {
        userAgent: "LinkedInBot",
        allow: "/",
      },

      // Block known malicious crawlers
      {
        userAgent: "SemrushBot",
        disallow: "/",
      },
      {
        userAgent: "AhrefsBot",
        disallow: "/",
      },
      {
        userAgent: "MJ12bot",
        disallow: "/",
      },
    ],

    // Sitemap location - critical for SEO
    sitemap: `${baseUrl}/sitemap.xml`,
  };
};

export default robots;
