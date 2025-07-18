"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import Link from "next/link";
import Image from "next/image";

import {
  Calendar,
  Clock,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { BlogPost } from "@/lib/types";
import { getTagColor, getCategoryColor } from "@/lib/tag-colors";

interface FeaturedPostsCarouselProps {
  posts: BlogPost[];
}

interface FeaturedPostCardProps {
  post: BlogPost;
  index: number;
}

export function FeaturedPostsCarousel({ posts }: FeaturedPostsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const CARDS_PER_VIEW = 3;

  const totalSlides = Math.ceil(posts.length / CARDS_PER_VIEW);
  const canNavigate = posts.length > CARDS_PER_VIEW;

  const nextSlide = () => {
    if (currentIndex < totalSlides - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (posts.length <= 3) {
    return (
      <div
        className="grid gap-6 grid-cols-1 
        md:grid-cols-2 lg:grid-cols-3"
      >
        {posts.map((post, index) => (
          <FeaturedPostCard key={post.slug} post={post} index={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="relative featured-carousel-container">
      {canNavigate && (
        <>
          <Button
            variant="ghost"
            size="icon"
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className={cn(
              "absolute left-0 top-1/2 -translate-y-1/2 z-20 cursor-pointer",
              "w-10 h-10 rounded-full bg-background/90 backdrop-blur-sm",
              "border border-border hover:bg-background shadow-lg",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "-ml-5"
            )}
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={nextSlide}
            disabled={currentIndex === totalSlides - 1}
            className={cn(
              "absolute right-0 top-1/2 -translate-y-1/2 z-20 cursor-pointer",
              "w-10 h-10 rounded-full bg-background/90 backdrop-blur-sm",
              "border border-border hover:bg-background shadow-lg",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "-mr-5"
            )}
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </>
      )}

      <div className="carousel-container px-2 py-4">
        <motion.div
          className="flex carousel-slide"
          animate={{
            x: `-${currentIndex * 100}%`,
          }}
          transition={{
            duration: 0.01,
            ease: "easeInOut",
          }}
        >
          {Array.from({ length: totalSlides }).map((_, slideIndex) => (
            <div key={slideIndex} className="flex-none w-full">
              <div className="featured-carousel-slide featured-cards-grid">
                {posts
                  .slice(
                    slideIndex * CARDS_PER_VIEW,
                    (slideIndex + 1) * CARDS_PER_VIEW
                  )
                  .map((post, cardIndex) => (
                    <div key={post.slug} className="featured-card-wrapper">
                      <FeaturedPostCard
                        post={post}
                        index={slideIndex * CARDS_PER_VIEW + cardIndex}
                      />
                    </div>
                  ))}
                {posts.slice(
                  slideIndex * CARDS_PER_VIEW,
                  (slideIndex + 1) * CARDS_PER_VIEW
                ).length < CARDS_PER_VIEW &&
                  Array.from({
                    length:
                      CARDS_PER_VIEW -
                      posts.slice(
                        slideIndex * CARDS_PER_VIEW,
                        (slideIndex + 1) * CARDS_PER_VIEW
                      ).length,
                  }).map((_, emptyIndex) => (
                    <div
                      key={`empty-${emptyIndex}`}
                      className="invisible hidden lg:block"
                    />
                  ))}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {canNavigate && totalSlides > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-200 cursor-pointer",
                currentIndex === index
                  ? "bg-green-400 w-8"
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function FeaturedPostCard({ post, index }: FeaturedPostCardProps) {
  const categoryColor = getCategoryColor(post.category);

  const formattedDate = new Date(post.date).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
      className="group h-full"
    >
      <Link href={`/blog/${post.slug}`} className="block h-full">
        <Card
          className={cn(
            "featured-card overflow-hidden transition-all duration-300 h-full flex flex-col p-0",
            "hover:shadow-lg hover:shadow-green-400/10",
            "border-border/50 hover:border-green-400/50",
            "bg-card/30 backdrop-blur-sm hover:bg-card/50"
          )}
        >
          <div
            className="relative aspect-video 
            overflow-hidden bg-muted p-0"
          >
            {post.image ? (
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover transition-transform 
                duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={index < 3}
              />
            ) : (
              <div
                className="w-full h-full bg-gradient-to-br 
                from-muted to-muted/50 flex ]
                items-center justify-center"
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

            <div className="absolute top-4 right-4">
              <Badge className="bg-green-400 text-black text-xs">
                Destaque
              </Badge>
            </div>

            <div
              className="absolute inset-0 bg-gradient-to-t 
            from-black/60 via-transparent to-transparent 
              opacity-0 group-hover:opacity-100 
              transition-opacity duration-300"
            />
          </div>

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
                className="w-4 h-4 
                transition-transform 
                group-hover:translate-x-1"
              />
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
