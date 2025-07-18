interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: number;
  featured: boolean;
  category: string;
  tags: string[];
  image?: string;
  author: string;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
}

interface BlogMetadata {
  title: string;
  excerpt: string;
  date: string;
  featured?: boolean;
  category: string;
  tags?: string[];
  image?: string;
  author?: string;
  readTime?: number;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
}

interface Category {
  name: string;
  slug: string;
  color: string;
  count: number;
}

interface PaginatedPosts {
  posts: BlogPost[];
  total: number;
  page: number;
  totalPages: number;
  hasMore: boolean;
}

interface SearchFilters {
  query?: string;
  category?: string;
  tags?: string[];
  featured?: boolean;
}

interface TagInfo {
  name: string;
  color: string;
  isPredefined: boolean;
  count?: number;
}

interface CategoryInfo {
  name: string;
  slug: string;
  color: string;
  isPredefined: boolean;
  count: number;
  description?: string;
}

interface BlogStats {
  totalPosts: number;
  featuredPosts: number;
  totalCategories: number;
  totalTags: number;
  lastUpdate: string | null;
  averageReadTime: number;
  totalReadTime: number;
}

interface ReadTimeStats {
  total: number;
  average: number;
  min: number;
  max: number;
  distribution: Record<string, number>;
}

interface PostValidationResult {
  slug: string;
  issues: string[];
}

interface TagColorConfig {
  backgroundColor: string;
  textColor: string;
  borderColor: string;
}

interface AdvancedSearchFilters extends SearchFilters {
  readTimeMin?: number;
  readTimeMax?: number;
  dateFrom?: string;
  dateTo?: string;
  author?: string;
  sortBy?: "date" | "title" | "readTime" | "category";
  sortOrder?: "asc" | "desc";
}

interface SearchResult {
  posts: BlogPost[];
  total: number;
  query?: string;
  filters: SearchFilters;
  suggestions?: string[];
}

interface PostCreationConfig {
  title: string;
  excerpt: string;
  category: {
    name: string;
    color: string;
    isNew?: boolean;
  };
  tags: Array<{
    name: string;
    color: string;
    isNew?: boolean;
  }>;
  featured: boolean;
  author: string;
  image: string;
  readTime: number;
  seo: {
    metaTitle?: string;
    metaDescription?: string;
    keywords: string[];
  };
}

enum ContentType {
  TUTORIAL = "tutorial",
  ARTICLE = "article",
  GUIDE = "guide",
  REVIEW = "review",
  NEWS = "news",
  OPINION = "opinion",
}

interface ExtendedSEO {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  canonicalUrl?: string;
  robots?:
    | "index,follow"
    | "noindex,nofollow"
    | "index,nofollow"
    | "noindex,follow";
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  structuredData?: Record<string, any>;
}

interface ExtendedBlogPost extends BlogPost {
  wordCount?: number;
  readingDifficulty?: "easy" | "medium" | "hard";
  tableOfContents?: Array<{
    level: number;
    title: string;
    anchor: string;
  }>;
  relatedTopics?: string[];
  publishedAt?: string;
  updatedAt?: string;
  status?: "draft" | "published" | "archived";
  contentType?: ContentType;
  extendedSeo?: ExtendedSEO;
}

export type {
  ExtendedBlogPost,
  ExtendedSEO,
  ContentType,
  PostCreationConfig,
  SearchResult,
  AdvancedSearchFilters,
  TagColorConfig,
  PostValidationResult,
  ReadTimeStats,
  BlogStats,
  CategoryInfo,
  TagInfo,
  SearchFilters,
  PaginatedPosts,
  BlogMetadata,
  Category,
  BlogPost,
};
