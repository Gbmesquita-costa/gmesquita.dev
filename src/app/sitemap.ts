import { MetadataRoute } from "next";
import { getPostSlugs } from "@/lib/blog.server";

const sitemap = (): MetadataRoute.Sitemap => {
  const baseUrl = process.env.METADATA_BASE as string;
  const currentDate = new Date().toISOString();

  // Top static URLs with SEO-optimized priorities
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 1.0, // Homepage - top priority
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.9, // About You Page - High Priority for Conversion
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: "weekly", // Updates frequently with new posts
      priority: 0.9, // Content Hub - Critical for SEO
    },
    {
      url: `${baseUrl}/uses`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7, // Referral page - good for long-tail SEO
    },
    {
      url: `${baseUrl}/reminder`,
      lastModified: currentDate,
      changeFrequency: "yearly", // More static content
      priority: 0.6, // Interesting but not a priority for SEO
    },
  ];

  // Dynamic Blog URLs - Automatically Included
  let blogRoutes: MetadataRoute.Sitemap = [];

  try {
    const postSlugs = getPostSlugs();

    blogRoutes = postSlugs.map((slug) => ({
      url: `${baseUrl}/blog/${slug}`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.8, // Individual posts - high priority for long-tail keywords
    }));
  } catch (error) {
    // If there is an error loading posts, continue without them.
    console.log("Nenhum post encontrado ou erro ao carregar posts");
  }

  // Combine all routes
  return [...staticRoutes, ...blogRoutes];
};

export default sitemap;
