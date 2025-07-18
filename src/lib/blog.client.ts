import { BlogPost, Category } from "./types";
import { getCategoryColor } from "./tag-colors";

/**
 * Filter posts by search
 */
function filterPostsBySearch(posts: BlogPost[], query: string): BlogPost[] {
  if (!query.trim()) return posts;

  const searchTerm = query.toLowerCase();
  return posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm) ||
      post.excerpt.toLowerCase().includes(searchTerm) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchTerm)) ||
      post.category.toLowerCase().includes(searchTerm)
  );
}

/**
 * Filter posts by category
 */
function filterPostsByCategory(
  posts: BlogPost[],
  category: string
): BlogPost[] {
  if (!category) return posts;
  return posts.filter(
    (post) => post.category.toLowerCase() === category.toLowerCase()
  );
}

/**
 * Filter posts by tags
 */
function filterPostsByTags(posts: BlogPost[], tags: string[]): BlogPost[] {
  if (!tags.length) return posts;
  return posts.filter((post) =>
    tags.some((tag) =>
      post.tags.some((postTag) => postTag.toLowerCase() === tag.toLowerCase())
    )
  );
}

/**
 * Filter featured posts
 */
function filterFeaturedPosts(posts: BlogPost[]): BlogPost[] {
  return posts.filter((post) => post.featured);
}

/**
 * Posts page
 */
function paginatePosts(posts: BlogPost[], page: number, limit: number) {
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

/**
 * Sort posts by date
 */
function sortPostsByDate(
  posts: BlogPost[],
  order: "asc" | "desc" = "desc"
): BlogPost[] {
  return [...posts].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return order === "desc" ? dateB - dateA : dateA - dateB;
  });
}

/**
 * Group posts by category
 */
function groupPostsByCategory(posts: BlogPost[]): Record<string, BlogPost[]> {
  return posts.reduce((acc, post) => {
    const category = post.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(post);
    return acc;
  }, {} as Record<string, BlogPost[]>);
}

/**
 * Extract unique categories using centralized color system
 */
function extractCategoriesFromPosts(posts: BlogPost[]): Category[] {
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

/**
 * Extract unique tags from a list of posts
 */
function extractTagsFromPosts(posts: BlogPost[]): string[] {
  const tagsSet = new Set<string>();

  posts.forEach((post) => {
    post.tags.forEach((tag) => tagsSet.add(tag));
  });

  return Array.from(tagsSet).sort();
}

/**
 * Calculates related posts based on category and tags
 */
function calculateRelatedPosts(
  currentPost: BlogPost,
  allPosts: BlogPost[],
  limit: number = 3
): BlogPost[] {
  const otherPosts = allPosts.filter((post) => post.slug !== currentPost.slug);

  const scoredPosts = otherPosts.map((post) => {
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

/**
 * Formats date for display
 */
function formatPostDate(date: string, locale: string = "pt-BR"): string {
  return new Date(date).toLocaleDateString(locale, {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

/**
 * Formats short date
 */
function formatPostDateShort(date: string, locale: string = "pt-BR"): string {
  return new Date(date).toLocaleDateString(locale, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

/**
 * Calculates reading time based on content
 */
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;

  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}

/**
 * Generates statistics from a list of posts
 */
function generatePostsStats(posts: BlogPost[]) {
  const categories = extractCategoriesFromPosts(posts);
  const tags = extractTagsFromPosts(posts);

  return {
    totalPosts: posts.length,
    featuredPosts: posts.filter((p) => p.featured).length,
    totalCategories: categories.length,
    totalTags: tags.length,
    lastUpdate: posts.length > 0 ? posts[0].date : null,
    averageReadTime:
      posts.length > 0
        ? Math.round(
            posts.reduce((sum, post) => sum + post.readTime, 0) / posts.length
          )
        : 0,
  };
}

/**
 * Search posts with multiple filters
 */
function searchPostsWithFilters(
  posts: BlogPost[],
  filters: {
    query?: string;
    category?: string;
    tags?: string[];
    featured?: boolean;
  }
): BlogPost[] {
  let filteredPosts = posts;

  if (filters.query) {
    filteredPosts = filterPostsBySearch(filteredPosts, filters.query);
  }

  if (filters.category) {
    filteredPosts = filterPostsByCategory(filteredPosts, filters.category);
  }

  if (filters.tags && filters.tags.length > 0) {
    filteredPosts = filterPostsByTags(filteredPosts, filters.tags);
  }

  if (filters.featured !== undefined) {
    filteredPosts = filters.featured
      ? filterFeaturedPosts(filteredPosts)
      : filteredPosts.filter((post) => !post.featured);
  }

  return filteredPosts;
}

export {
  searchPostsWithFilters,
  generatePostsStats,
  calculateReadingTime,
  formatPostDateShort,
  formatPostDate,
  calculateRelatedPosts,
  extractTagsFromPosts,
  extractCategoriesFromPosts,
  groupPostsByCategory,
  sortPostsByDate,
  paginatePosts,
  filterFeaturedPosts,
  filterPostsByTags,
  filterPostsByCategory,
  filterPostsBySearch,
};
