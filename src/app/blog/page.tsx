import { Metadata } from "next";
import { Suspense } from "react";

import Navigation from "@/components/layout/navigation";
import { BlogHero } from "@/components/blog/blog-hero";

import { BlogGrid } from "@/components/blog/blog-grid";
import { BlogSearch } from "@/components/blog/blog-search";

import { BlogPagination } from "@/components/blog/blog-pagination";
import { BlogEmptyState } from "@/components/blog/blog-empty-state";

import { BlogSkeleton } from "@/components/blog/blog-skeleton";
import { FeaturedPostsCarousel } from "@/components/blog/featured-posts-carousel";

import {
  getPaginatedPosts,
  getCategories,
  getFeaturedPosts,
  getBlogStats,
  getPopularTags,
} from "@/lib/blog.server";

interface BlogPageProps {
  searchParams: Promise<{
    page?: string;
    q?: string;
    category?: string;
  }>;
}

export async function generateMetadata(): Promise<Metadata> {
  try {
    const stats = getBlogStats();

    return {
      title: "Blog • Histórias, Atualizações e Guias",
      description: `Explore ${stats.totalPosts} ${
        stats.totalPosts === 1 ? "artigo" : "artigos"
      } sobre desenvolvimento web, engenharia de software e carreiras em tecnologia. Conteúdo técnico e insights por Gabriel Mesquita.`,
      keywords: [
        "blog",
        "posts",
        "desenvolvimento web",
        "programação",
        "tecnologia",
        "engenharia de software",
        "Gabriel Mesquita",
        "JavaScript",
        "TypeScript",
        "React",
        "Next.js",
        "tutorial",
        "carreira tech",
      ],
      authors: [{ name: "Gabriel Mesquita", url: process.env.METADATA_BASE }],
      robots: {
        index: true,
        follow: true,
      },
      openGraph: {
        title: "Blog • Gabriel Mesquita",
        description: `Descubra ${stats.totalPosts} ${
          stats.totalPosts === 1 ? "post" : "posts"
        } sobre desenvolvimento web, engenharia de software e carreiras em tecnologia.`,
        url: `${process.env.METADATA_BASE}/blog`,
        locale: "pt-BR",
        type: "website",
        images: [
          {
            url: `${process.env.METADATA_BASE}/og-default.jpg`,
            width: 1200,
            height: 630,
            alt: "Blog por Gabriel Mesquita",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: "Blog • Gabriel Mesquita",
        description: `${stats.totalPosts} ${
          stats.totalPosts === 1 ? "post" : "posts"
        } sobre desenvolvimento web e tecnologia`,
        images: [`${process.env.METADATA_BASE}/twitter-default.jpg`],
      },
    };
  } catch (error) {
    return {
      title: "Blog • Gabriel Mesquita",
      description:
        "Blog sobre desenvolvimento web, engenharia de software e carreiras em tecnologia.",
    };
  }
}

const Blog = async ({ searchParams }: BlogPageProps) => {
  try {
    const resolvedSearchParams = await searchParams;
    const currentPage = Number(resolvedSearchParams?.page) || 1;

    const searchQuery = resolvedSearchParams?.q || "";
    const categoryFilter = resolvedSearchParams?.category || "";

    const POSTS_PER_PAGE = 12;

    // OPTIMIZED PARALLEL LOADING
    const [categoriesData, popularTagsData, featuredPostsData, postsData] =
      await Promise.all([
        getCategories(),
        getPopularTags(6),
        // Only loads featured posts on the first page without filters
        currentPage === 1 && !searchQuery && !categoryFilter
          ? getFeaturedPosts()
          : Promise.resolve([]),
        // MAIN LOADING
        getPaginatedPosts(currentPage, POSTS_PER_PAGE, {
          query: searchQuery,
          category: categoryFilter,
        }),
      ]);

    const { posts, total, totalPages, hasMore } = postsData;
    const showFeatured = featuredPostsData.length > 0;

    // OPTIMIZED PLURALIZATION
    const getPluralizedText = (count: number) => {
      if (count === 0) {
        return { posts: "posts", found: "encontrados" };
      } else if (count === 1) {
        return { posts: "post", found: "encontrado" };
      } else {
        return { posts: "posts", found: "encontrados" };
      }
    };

    const totalPlural = getPluralizedText(total);

    return (
      <>
        <Navigation />
        <main className="min-h-screen bg-background">
          <div className="pt-20">
            <div className="max-w-7xl mx-auto px-6 py-20">
              <div className="animate-fade-in-up space-y-20">
                <BlogHero totalCount={total} />

                {showFeatured && (
                  <section className="space-y-8">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2
                          className="text-3xl md:text-4xl 
                          font-bold text-foreground"
                        >
                          <span className="gradient-text">
                            Posts em Destaque
                          </span>
                        </h2>
                        <p className="text-muted-foreground mt-2">
                          O melhor conteúdo selecionado especialmente para você
                        </p>
                      </div>
                      <div
                        className="hidden md:flex items-center space-x-2 
                        text-sm text-muted-foreground bg-secondary/30 
                        rounded-full px-4 py-2"
                      >
                        <div
                          className="w-2 h-2 bg-green-400 
                          rounded-full animate-pulse"
                        />
                        <span>
                          {featuredPostsData.length}{" "}
                          {featuredPostsData.length === 1
                            ? "post em destaque"
                            : "posts em destaque"}
                        </span>
                      </div>
                    </div>

                    <div className="relative">
                      <div
                        className="absolute inset-0 bg-gradient-to-r 
                        from-green-400/5 via-cyan-400/5 
                        to-blue-500/5 rounded-2xl blur-2xl"
                      />
                      <div
                        className="relative bg-card/30 backdrop-blur-sm 
                        rounded-xl p-4 md:p-6 border border-border/50 
                        overflow-visible"
                      >
                        <Suspense fallback={<BlogSkeleton count={3} />}>
                          <FeaturedPostsCarousel posts={featuredPostsData} />
                        </Suspense>
                      </div>
                    </div>
                  </section>
                )}

                <BlogSearch
                  categories={categoriesData}
                  totalPosts={total}
                  popularTags={popularTagsData}
                />

                {posts.length > 0 ? (
                  <>
                    <section className="space-y-8">
                      <div className="flex items-center justify-between">
                        <div>
                          <h2
                            className="text-3xl md:text-4xl 
                            font-bold text-foreground"
                          >
                            {searchQuery || categoryFilter
                              ? "Resultados da Busca"
                              : "Todas as Publicações"}
                          </h2>
                          <p className="text-muted-foreground mt-2 flex gap-1">
                            {total} {totalPlural.posts} {totalPlural.found}
                            {(searchQuery || categoryFilter) && (
                              <span>para sua busca</span>
                            )}
                          </p>
                        </div>

                        <div
                          className="hidden md:flex items-center space-x-2 
                          text-sm text-muted-foreground px-4 py-2
                          bg-secondary/30 rounded-full"
                        >
                          <div
                            className="w-2 h-2 bg-green-400 
                            rounded-full animate-pulse"
                          />
                          <span>
                            Página {currentPage} de {totalPages}
                          </span>
                        </div>
                      </div>

                      <Suspense
                        fallback={<BlogSkeleton count={POSTS_PER_PAGE} />}
                        key={`${currentPage}-${searchQuery}-${categoryFilter}`}
                      >
                        <BlogGrid posts={posts} />
                      </Suspense>
                    </section>

                    {totalPages > 1 && (
                      <BlogPagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        totalPosts={total}
                        hasMore={hasMore}
                        postsPerPage={POSTS_PER_PAGE}
                      />
                    )}
                  </>
                ) : (
                  <BlogEmptyState
                    searchQuery={searchQuery}
                    category={categoryFilter}
                    categories={categoriesData}
                  />
                )}

                {/* 📊 PERFORMANCE STATS (dev only) */}
                {process.env.NODE_ENV === "development" && (
                  <div
                    className="mt-16 p-4 bg-secondary/20 
                    rounded-lg border border-border/30"
                  >
                    <h3
                      className="text-sm font-medium 
                      mb-2 text-muted-foreground"
                    >
                      🚀 Estatísticas de Performance (Dev)
                    </h3>
                    <div
                      className="grid grid-cols-2 
                      md:grid-cols-4 gap-4 text-xs"
                    >
                      <div>
                        <span className="text-muted-foreground">
                          Posts carregados:
                        </span>
                        <span className="ml-2 font-mono">{posts.length}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">
                          Total disponível:
                        </span>
                        <span className="ml-2 font-mono">{total}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">
                          Categorias:
                        </span>
                        <span className="ml-2 font-mono">
                          {categoriesData.length}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">
                          Tags populares:
                        </span>
                        <span className="ml-2 font-mono">
                          {popularTagsData.length}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      ✅ Sistema rodando com funções de servidor otimizadas
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </>
    );
  } catch (error) {
    return (
      <>
        <Navigation />
        <main className="min-h-screen bg-background">
          <div className="pt-20">
            <div className="max-w-7xl mx-auto px-6 py-20">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-red-400 mb-4">
                  Erro no blog
                </h1>
                <p className="text-muted-foreground mb-8">
                  Houve um problema ao carregar o blog. Tente recarregar a
                  página.
                </p>
                {process.env.NODE_ENV === "development" && (
                  <pre
                    className="text-left bg-secondary/20 p-4 
                    rounded-lg text-sm overflow-auto"
                  >
                    {error instanceof Error ? error.message : String(error)}
                  </pre>
                )}
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }
};

export default Blog;
