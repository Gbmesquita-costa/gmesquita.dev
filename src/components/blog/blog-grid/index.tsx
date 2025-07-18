"use client";

import Link from "next/link";
import Image from "next/image";

import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

import { cn } from "@/lib/utils";
import { BlogPost } from "@/lib/types";

import { extractCategoriesFromPosts } from "@/lib/blog.client";
import { getTagColor, getCategoryColor } from "@/lib/tag-colors";

interface BlogGridProps {
  posts: BlogPost[];
  featured?: boolean;
}

interface BlogCardProps {
  post: BlogPost;
  index: number;
  featured?: boolean;
  variants: any;
  categories: Array<{ name: string; color: string }>;
  totalPosts?: number;
}

export function BlogGrid({ posts, featured = false }: BlogGridProps) {
  const categories = extractCategoriesFromPosts(posts);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const gridClass = cn(
    "grid gap-8",
    !featured && "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
  );

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={featured ? "w-full" : gridClass}
    >
      {posts.map((post, index) => (
        <BlogCard
          key={post.slug}
          post={post}
          index={index}
          featured={featured}
          variants={itemVariants}
          categories={categories}
          totalPosts={posts.length}
        />
      ))}
    </motion.div>
  );
}

function BlogCard({
  post,
  index,
  featured = false,
  variants,
  categories,
  totalPosts = 1,
}: BlogCardProps) {
  const categoryColor = getCategoryColor(post.category);

  const formattedDate = new Date(post.date).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <motion.div variants={variants} className="group h-full">
      <Link href={`/blog/${post.slug}`} className="block h-full">
        <Card
          className={cn(
            "overflow-hidden transition-all duration-300 h-full flex flex-col p-0",
            "hover:shadow-lg hover:shadow-green-400/10",
            "border-border/50 hover:border-green-400/50",
            "bg-card/30 backdrop-blur-sm hover:bg-card/50",
            "transform hover:scale-[1.02] hover:translate-y-[-2px]"
          )}
        >
          {/* Image */}
          <div
            className={cn(
              "relative overflow-hidden bg-muted p-0",
              "aspect-video"
            )}
          >
            {post.image ? (
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover transition-transform 
                duration-500 group-hover:scale-110"
                sizes={
                  featured
                    ? "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                }
                priority={index < 3}
              />
            ) : (
              <div
                className="w-full h-full bg-gradient-to-br 
                from-muted to-muted/50 flex 
                items-center justify-center"
              >
                <span className="text-muted-foreground text-sm">
                  Sem Imagem
                </span>
              </div>
            )}

            {/* Category Badge */}
            <div className="absolute top-4 left-4">
              <Badge
                variant="secondary"
                className="bg-background/90 
                backdrop-blur-sm text-xs font-medium"
                style={{
                  backgroundColor: `${categoryColor}20`,
                  borderColor: categoryColor,
                  color: categoryColor,
                }}
              >
                {post.category}
              </Badge>
            </div>

            {/* Featured Badge */}
            {post.featured && (
              <div className="absolute top-4 right-4">
                <Badge
                  className="bg-green-400 text-black
                  text-xs font-bold shadow-lg"
                >
                  ✨ Destaque
                </Badge>
              </div>
            )}

            <div
              className="absolute inset-0 bg-gradient-to-t 
              from-black/60 via-transparent to-transparent 
              opacity-0 group-hover:opacity-100 
              transition-opacity duration-300"
            />
          </div>

          {/* Content */}
          <CardContent className="flex flex-col flex-1 pt-1 pb-6">
            <div className="flex-1">
              <h3
                className={cn(
                  "font-semibold transition-colors line-clamp-2 mb-3",
                  "group-hover:text-green-400",
                  "text-lg"
                )}
              >
                {post.title}
              </h3>

              <p
                className={cn(
                  "text-muted-foreground leading-relaxed line-clamp-3 mb-4",
                  "text-sm"
                )}
              >
                {post.excerpt}
              </p>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags
                    .filter((tag) => tag && tag.trim())
                    .slice(0, 3)
                    .map((tag) => {
                      const tagColor = getTagColor(tag);
                      return (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs rounded-md 
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
                  {post.tags.filter((tag) => tag && tag.trim()).length > 3 && (
                    <span className="text-xs text-muted-foreground px-1 py-1">
                      +{post.tags.filter((tag) => tag && tag.trim()).length - 3}
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Meta Info */}
            <div
              className="flex items-center justify-between 
              text-sm text-muted-foreground pt-4 
              border-t border-border/30 mt-auto"
            >
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{formattedDate}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{post.readTime} min</span>
                </div>
              </div>

              <ArrowRight
                className="w-4 h-4 transition-all duration-200 
                group-hover:translate-x-1 group-hover:text-green-400"
              />
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
