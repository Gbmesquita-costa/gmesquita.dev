"use client";

import Link from "next/link";
import Image from "next/image";

import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { BlogPost } from "@/lib/types";

import { extractCategoriesFromPosts } from "@/lib/blog.client";
import { getTagColor, getCategoryColor } from "@/lib/tag-colors";

interface RelatedPostsProps {
  posts: BlogPost[];
}

interface RelatedPostCardProps {
  post: BlogPost;
  index: number;
  variants: any;
  categories: Array<{ name: string; color: string }>;
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null;

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

  return (
    <section>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-bold mb-4">
          <span className="gradient-text">Posts Relacionados</span>
        </h2>
        <p className="text-muted-foreground">
          Continue explorando conteúdo similar
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-8 grid-cols-1 
        md:grid-cols-2 lg:grid-cols-3"
      >
        {posts.map((post, index) => (
          <RelatedPostCard
            key={post.slug}
            post={post}
            index={index}
            variants={itemVariants}
            categories={categories}
          />
        ))}
      </motion.div>
    </section>
  );
}

function RelatedPostCard({
  post,
  index,
  variants,
  categories,
}: RelatedPostCardProps) {
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
          className="overflow-hidden transition-all duration-300 h-full flex 
          flex-col p-0 hover:shadow-lg hover:shadow-green-400/10 border-border/50 
          hover:border-green-400/50 bg-card/30 backdrop-blur-sm hover:bg-card/50"
        >
          {/* Image */}
          <div className="relative aspect-video overflow-hidden bg-muted p-0">
            {post.image ? (
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover transition-transform 
                duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
              />
            ) : (
              <div
                className="w-full h-full bg-gradient-to-br from-muted 
                to-muted/50 flex items-center justify-center"
              >
                <span className="text-muted-foreground text-sm">
                  Sem Imagem
                </span>
              </div>
            )}

            <div className="absolute top-4 left-4">
              <Badge
                variant="secondary"
                className="bg-background/80 backdrop-blur-sm text-xs"
                style={{
                  backgroundColor: `${categoryColor}20`,
                  borderColor: categoryColor,
                  color: categoryColor,
                }}
              >
                {post.category}
              </Badge>
            </div>

            {post.featured && (
              <div className="absolute top-4 right-4">
                <Badge className="bg-green-400 text-black text-xs">
                  Destaque
                </Badge>
              </div>
            )}
          </div>

          {/* Content */}
          <CardContent className="flex flex-col flex-1 pt-1 pb-6">
            <div className="flex-1">
              <h3
                className="text-lg font-semibold transition-colors 
                line-clamp-2 mb-3 group-hover:text-green-400"
              >
                {post.title}
              </h3>

              <p
                className="text-sm text-muted-foreground 
                leading-relaxed line-clamp-3 mb-4"
              >
                {post.excerpt}
              </p>

              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.slice(0, 2).map((tag) => {
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
                  {post.tags.length > 2 && (
                    <span
                      className="text-xs 
                      text-muted-foreground 
                      px-1 py-1"
                    >
                      +{post.tags.length - 2}
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Meta info */}
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
                className="w-4 h-4 transition-transform 
                group-hover:translate-x-1"
              />
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
