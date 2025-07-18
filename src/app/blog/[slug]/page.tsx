import { Metadata } from "next";
import { notFound } from "next/navigation";

import Link from "next/link";
import Image from "next/image";

import { Calendar, Clock, ArrowLeft } from "lucide-react";

import Navigation from "@/components/layout/navigation";
import { Badge } from "@/components/ui/badge";

import { RelatedPosts } from "@/components/blog/related-posts";
import {
  ShareButton,
  ScrollToTopButton,
} from "@/components/interactive-buttons";

import {
  getPostBySlug,
  getRelatedPosts,
  getCategories,
  getPostSlugs,
} from "@/lib/blog.server";

import { convertMarkdownToHtml, addHeaderIds } from "@/lib/markdown";
import { getTagColor } from "@/lib/tag-colors";

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  try {
    const slugs = getPostSlugs();

    if (process.env.NODE_ENV === "development") {
      return slugs.slice(0, 5).map((slug) => ({ slug }));
    }

    return slugs.map((slug) => ({ slug }));
  } catch (error) {
    return [];
  }
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  try {
    const resolvedParams = await params;
    const post = getPostBySlug(resolvedParams.slug);

    if (!post) {
      return {
        title: "Post não encontrado",
        description: "O post solicitado não foi encontrado.",
      };
    }

    const imageUrl = post.image
      ? `${process.env.METADATA_BASE}${post.image}`
      : `${process.env.METADATA_BASE}/og-default.jpg`;

    return {
      title: post.seo?.metaTitle || `${post.title} • Gabriel Mesquita`,
      description: post.seo?.metaDescription || post.excerpt,
      keywords: post.seo?.keywords?.join(", ") || post.tags?.join(", "),
      authors: [{ name: post.author, url: process.env.METADATA_BASE }],
      robots: "index, follow",
      openGraph: {
        title: post.seo?.metaTitle || post.title,
        description: post.seo?.metaDescription || post.excerpt,
        url: `${process.env.METADATA_BASE}/blog/${resolvedParams.slug}`,
        locale: "pt-BR",
        type: "article",
        publishedTime: post.date,
        authors: [post.author],
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: post.title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: post.seo?.metaTitle || post.title,
        description: post.seo?.metaDescription || post.excerpt,
        images: [imageUrl],
      },
    };
  } catch (error) {
    return {
      title: "Post não encontrado",
      description: "O post solicitado não foi encontrado.",
    };
  }
}

const PostPage = async ({ params }: PostPageProps) => {
  try {
    const resolvedParams = await params;

    const [post, categories] = await Promise.all([
      getPostBySlug(resolvedParams.slug),
      getCategories(),
    ]);

    if (!post) {
      notFound();
    }

    // OPTIMIZED PROCESSING: Markdown to HTML
    const contentHtml = addHeaderIds(await convertMarkdownToHtml(post.content));

    const relatedPostsPromise = Promise.resolve(getRelatedPosts(post.slug, 3));
    const category = categories.find(
      (cat) => cat.name.toLowerCase() === post.category.toLowerCase()
    );

    const formattedDate = new Date(post.date).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

    return (
      <>
        <Navigation />
        <main className="min-h-screen bg-background">
          <div className="pt-16">
            <header
              className="bg-card/20 border-b 
              border-border/50"
            >
              <div className="max-w-4xl mx-auto px-6 py-16">
                <div className="animate-fade-in-up space-y-6">
                  <Link
                    href="/blog"
                    className="inline-flex items-center space-x-2 
                    text-muted-foreground hover:text-green-400 
                    transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Voltar aos posts</span>
                  </Link>

                  <div
                    className="flex items-center 
                    space-x-4 text-sm"
                  >
                    <Badge
                      variant="secondary"
                      className="bg-background/80 
                      backdrop-blur-sm text-xs"
                      style={{
                        backgroundColor: `${category?.color || "#10b981"}20`,
                        borderColor: category?.color || "#10b981",
                        color: category?.color || "#10b981",
                      }}
                    >
                      {post.category}
                    </Badge>
                    <div
                      className="flex items-center 
                      space-x-1 text-muted-foreground"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>{formattedDate}</span>
                    </div>
                    <div
                      className="flex items-center 
                      space-x-1 text-muted-foreground"
                    >
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime} min de leitura</span>
                    </div>
                  </div>

                  <h1
                    className="text-4xl md:text-5xl 
                    font-bold leading-tight"
                  >
                    <span className="gradient-text">{post.title}</span>
                  </h1>

                  <p
                    className="text-xl text-muted-foreground 
                    leading-relaxed max-w-3xl"
                  >
                    {post.excerpt}
                  </p>

                  <div className="flex items-center space-x-4">
                    <div
                      className="relative w-12 h-12 
                      rounded-full overflow-hidden 
                      bg-secondary"
                    >
                      <div
                        className="w-full h-full bg-gradient-to-br 
                        from-green-400 to-cyan-400 flex 
                        items-center justify-center"
                      >
                        <span
                          className="text-white 
                          font-bold text-lg"
                        >
                          {post.author.charAt(0)}
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="font-medium">{post.author}</p>
                      <p className="text-sm text-muted-foreground">
                        Desenvolvedor Full Stack
                      </p>
                    </div>
                  </div>

                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-4">
                      {post.tags
                        .filter((tag) => tag && tag.trim())
                        .map((tag) => {
                          const tagColor = getTagColor(tag);
                          return (
                            <span
                              key={tag}
                              className="px-3 py-1 text-sm rounded-full 
                              font-medium transition-all hover:scale-105"
                              style={{
                                backgroundColor: `${tagColor}15`,
                                color: tagColor,
                                border: `1px solid ${tagColor}30`,
                              }}
                            >
                              {tag}
                            </span>
                          );
                        })}
                    </div>
                  )}

                  <div className="pt-4">
                    <ShareButton
                      title={post.title}
                      description={post.excerpt}
                      className="flex items-center 
                      space-x-2 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </header>

            {post.image && (
              <div className="relative w-full">
                <div
                  className="relative aspect-[16/9] 
                  max-h-[600px] overflow-hidden w-full"
                >
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                    sizes="100vw"
                    quality={85}
                  />
                  <div
                    className="absolute inset-0 
                    bg-gradient-to-t from-background/50 
                    to-transparent"
                  />
                </div>
              </div>
            )}

            <article className="max-w-4xl mx-auto px-6 py-16">
              <div
                className="prose prose-lg prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: contentHtml }}
              />
            </article>

            <RelatedPostsSection relatedPostsPromise={relatedPostsPromise} />

            <footer
              className="border-t 
              border-border/50 bg-card/20"
            >
              <div className="max-w-4xl mx-auto px-6 py-8">
                <div className="flex items-center justify-between">
                  <Link
                    href="/blog"
                    className="inline-flex items-center space-x-2 
                    text-muted-foreground hover:text-green-400 
                    transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Voltar aos posts</span>
                  </Link>

                  <ScrollToTopButton className="cursor-pointer" />
                </div>
              </div>
            </footer>
          </div>
        </main>
      </>
    );
  } catch (error) {
    notFound();
  }
};

async function RelatedPostsSection({
  relatedPostsPromise,
}: {
  relatedPostsPromise: Promise<any[]>;
}) {
  try {
    const relatedPosts = await relatedPostsPromise;

    if (relatedPosts.length === 0) {
      return null;
    }

    return (
      <section
        className="border-t 
        border-border/30 
        bg-card/10"
      >
        <div className="max-w-6xl mx-auto px-6 py-16">
          <RelatedPosts posts={relatedPosts} />
        </div>
      </section>
    );
  } catch (error) {
    return null;
  }
}

export default PostPage;
