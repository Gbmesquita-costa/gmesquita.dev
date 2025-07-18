import fs from "node:fs";
import { join } from "node:path";

import matter from "gray-matter";
import readingTime from "reading-time";

import { BlogPost, Category, PaginatedPosts, SearchFilters } from "./types";
import { getCategoryColor, getTagColor } from "./tag-colors";

const postsDirectory = join(process.cwd(), "/src/posts");

// Ensures the directory exists
function ensurePostsDirectory(): void {
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true });
  }
}

// Get all post slugs
function getPostSlugs(): string[] {
  ensurePostsDirectory();

  try {
    return fs
      .readdirSync(postsDirectory)
      .filter((file) => file.endsWith(".md"))
      .map((file) => file.replace(/\.md$/, ""));
  } catch (error) {
    return [];
  }
}

// Get a post by slug with manual readTime support
function getPostBySlug(slug: string): BlogPost | null {
  try {
    const realSlug = slug.replace(/\.md$/, "");
    const fullPath = join(postsDirectory, `${realSlug}.md`);

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    // Calculates reading time (manually or automatically)
    let calculatedReadTime;
    if (
      data.readTime &&
      typeof data.readTime === "number" &&
      data.readTime > 0
    ) {
      // Uses manual time if provided
      calculatedReadTime = data.readTime;
    } else {
      // Automatically calculates if not provided
      const stats = readingTime(content);
      calculatedReadTime = Math.ceil(stats.minutes);
    }

    // Validates mandatory fields
    if (!data.title || !data.excerpt || !data.date || !data.category) {
      return null;
    }

    return {
      slug: realSlug,
      title: data.title,
      excerpt: data.excerpt,
      content,
      date: data.date,
      readTime: calculatedReadTime,
      featured: data.featured || false,
      category: data.category,
      tags: data.tags || [],
      image: data.image || null,
      author: data.author || "Gabriel Mesquita",
      seo: data.seo || {},
    };
  } catch (error) {
    return null;
  }
}

// Get all posts
function getAllPosts(): BlogPost[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

// Get posts with pagination and filters
function getPaginatedPosts(
  page: number = 1,
  limit: number = 12,
  filters: SearchFilters = {}
): PaginatedPosts {
  let posts = getAllPosts();

  // Apply filters
  if (filters.query) {
    const query = filters.query.toLowerCase();
    posts = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.content.toLowerCase().includes(query) ||
        post.tags.some((tag) => tag.toLowerCase().includes(query)) ||
        post.category.toLowerCase().includes(query)
    );
  }

  if (filters.category) {
    posts = posts.filter(
      (post) => post.category.toLowerCase() === filters.category?.toLowerCase()
    );
  }

  if (filters.tags && filters.tags.length > 0) {
    posts = posts.filter((post) =>
      filters.tags!.some((tag) =>
        post.tags.some((postTag) => postTag.toLowerCase() === tag.toLowerCase())
      )
    );
  }

  if (filters.featured !== undefined) {
    posts = posts.filter((post) => post.featured === filters.featured);
  }

  // Calculate pagination
  const total = posts.length;
  const totalPages = Math.ceil(total / limit);

  const start = (page - 1) * limit;
  const end = start + limit;

  const paginatedPosts = posts.slice(start, end);

  return {
    posts: paginatedPosts,
    total,
    page,
    totalPages,
    hasMore: page < totalPages,
  };
}

// Get featured posts
function getFeaturedPosts(limit?: number): BlogPost[] {
  const featuredPosts = getAllPosts().filter((post) => post.featured);

  if (limit === undefined) {
    return featuredPosts;
  }

  return featuredPosts.slice(0, limit);
}

// Get related posts
function getRelatedPosts(currentSlug: string, limit: number = 3): BlogPost[] {
  const currentPost = getPostBySlug(currentSlug);
  if (!currentPost) return [];

  const allPosts = getAllPosts().filter((post) => post.slug !== currentSlug);

  // Scoring based on category and tags
  const scoredPosts = allPosts.map((post) => {
    let score = 0;

    // Same category = +3 points
    if (post.category === currentPost.category) {
      score += 3;
    }

    // Common tags = +1 point per tag
    const commonTags = post.tags.filter((tag) =>
      currentPost.tags.includes(tag)
    );
    score += commonTags.length;

    return { post, score };
  });

  // Sort by score and then by date
  return scoredPosts
    .sort((a, b) => {
      if (a.score === b.score) {
        return (
          new Date(b.post.date).getTime() - new Date(a.post.date).getTime()
        );
      }
      return b.score - a.score;
    })
    .slice(0, limit)
    .map((item) => item.post);
}

// Get categories using centralized color system
function getCategories(): Category[] {
  const posts = getAllPosts();
  const categoryMap = new Map<string, number>();

  posts.forEach((post) => {
    const count = categoryMap.get(post.category) || 0;
    categoryMap.set(post.category, count + 1);
  });

  return Array.from(categoryMap.entries()).map(([name, count]) => ({
    name,
    slug: name.toLowerCase().replace(/\s+/g, "-"),
    color: getCategoryColor(name),
    count,
  }));
}

// Get all unique tags
function getAllTags(): string[] {
  const posts = getAllPosts();
  const tagsSet = new Set<string>();

  posts.forEach((post) => {
    post.tags.forEach((tag) => tagsSet.add(tag));
  });

  return Array.from(tagsSet).sort();
}

// Get most popular tags with filter for valid tags
function getPopularTags(
  limit: number = 6
): Array<{ name: string; count: number; color: string }> {
  const posts = getAllPosts();
  const tagMap = new Map<string, number>();

  // Counts occurrences of each tag
  posts.forEach((post) => {
    if (post.tags && Array.isArray(post.tags)) {
      post.tags.forEach((tag) => {
        // Only consider valid (non-empty) tags
        if (tag && tag.trim() && tag.trim().length > 0) {
          const cleanTag = tag.trim();
          const count = tagMap.get(cleanTag) || 0;

          tagMap.set(cleanTag, count + 1);
        }
      });
    }
  });

  // Convert to array, sort by count and get most popular ones
  return Array.from(tagMap.entries())
    .sort(([, a], [, b]) => b - a) // Sort by count (descending)
    .slice(0, limit) // Only take the requested limit
    .map(([name, count]) => ({
      name,
      count,
      color: getTagColor(name),
    }));
}

// Search posts by term
function searchPosts(query: string, limit?: number): BlogPost[] {
  if (!query.trim()) return [];

  const results = getPaginatedPosts(1, limit || 50, { query });
  return results.posts;
}

// Blog Statistics with Average Reading Time
function getBlogStats() {
  const posts = getAllPosts();
  const categories = getCategories();
  const tags = getAllTags();

  return {
    totalPosts: posts.length,
    featuredPosts: posts.filter((p) => p.featured).length,
    totalCategories: categories.length,
    totalTags: tags.length,
    lastUpdate: posts[0]?.date || null,
    averageReadTime:
      posts.length > 0
        ? Math.round(
            posts.reduce((sum, post) => sum + post.readTime, 0) / posts.length
          )
        : 0,
    totalReadTime: posts.reduce((sum, post) => sum + post.readTime, 0),
  };
}

// Function to get posts by reading time
function getPostsByReadTime(minTime?: number, maxTime?: number): BlogPost[] {
  let posts = getAllPosts();

  if (minTime !== undefined) {
    posts = posts.filter((post) => post.readTime >= minTime);
  }

  if (maxTime !== undefined) {
    posts = posts.filter((post) => post.readTime <= maxTime);
  }

  return posts;
}

// Function to get reading time statistics
function getReadTimeStats() {
  const posts = getAllPosts();
  const readTimes = posts.map((post) => post.readTime);

  if (readTimes.length === 0) {
    return {
      total: 0,
      average: 0,
      min: 0,
      max: 0,
      distribution: {},
    };
  }

  // Distribution by time bands
  const distribution: Record<string, number> = {
    "1-3 min": 0,
    "4-7 min": 0,
    "8-15 min": 0,
    "16+ min": 0,
  };

  readTimes.forEach((time) => {
    if (time <= 3) distribution["1-3 min"]++;
    else if (time <= 7) distribution["4-7 min"]++;
    else if (time <= 15) distribution["8-15 min"]++;
    else distribution["16+ min"]++;
  });

  return {
    total: readTimes.reduce((sum, time) => sum + time, 0),
    average: Math.round(
      readTimes.reduce((sum, time) => sum + time, 0) / readTimes.length
    ),
    min: Math.min(...readTimes),
    max: Math.max(...readTimes),
    distribution,
  };
}

// Function to validate posts (useful for debugging)
function validatePosts(): Array<{ slug: string; issues: string[] }> {
  const slugs = getPostSlugs();
  const validationResults = [];

  for (const slug of slugs) {
    const issues = [];

    try {
      const post = getPostBySlug(slug);

      if (!post) {
        issues.push("Post não pôde ser carregado");
        continue;
      }

      // Validations
      if (!post.title) issues.push("Título em falta");
      if (!post.excerpt) issues.push("Excerpt em falta");
      if (!post.date) issues.push("Data em falta");
      if (!post.category) issues.push("Categoria em falta");
      if (!post.readTime || post.readTime < 1)
        issues.push("Tempo de leitura inválido");
      if (!post.tags || post.tags.length === 0) issues.push("Sem tags");
      if (post.excerpt && post.excerpt.length < 50)
        issues.push("Excerpt muito curto");
      if (post.excerpt && post.excerpt.length > 200)
        issues.push("Excerpt muito longo");
    } catch (error) {
      issues.push(`Erro ao processar: ${error}`);
    }

    if (issues.length > 0) {
      validationResults.push({ slug, issues });
    }
  }

  return validationResults;
}

export {
  validatePosts,
  getReadTimeStats,
  getPostsByReadTime,
  getBlogStats,
  searchPosts,
  getPopularTags,
  getAllTags,
  getCategories,
  getRelatedPosts,
  getFeaturedPosts,
  getPaginatedPosts,
  getAllPosts,
  getPostBySlug,
  getPostSlugs,
  ensurePostsDirectory,
};
