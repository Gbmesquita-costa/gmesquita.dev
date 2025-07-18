"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, Sparkles, X, Tag } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Badge } from "@/components/ui/badge";

import { cn } from "@/lib/utils";
import { Category } from "@/lib/types";

import { getCategoryColor } from "@/lib/tag-colors";

interface BlogSearchProps {
  categories: Category[];
  totalPosts: number;
  popularTags: Array<{ name: string; count: number; color: string }>;
}

const getPluralizedText = (count: number) => {
  if (count === 0) {
    return { posts: "posts", found: "encontrados" };
  } else if (count === 1) {
    return { posts: "post", found: "encontrado" };
  } else {
    return { posts: "posts", found: "encontrados" };
  }
};

const BlogSearch = ({
  categories,
  totalPosts,
  popularTags,
}: BlogSearchProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentQuery = searchParams.get("q") || "";
  const currentCategory = searchParams.get("category") || "";

  const [searchQuery, setSearchQuery] = useState(currentQuery);
  const [selectedCategory, setSelectedCategory] = useState(currentCategory);

  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const debounceRef = useRef<NodeJS.Timeout>(null);

  const updateUrlStable = useCallback(
    (query: string, category: string) => {
      const params = new URLSearchParams();

      if (query.trim()) {
        params.set("q", query.trim());
      }

      if (category) {
        params.set("category", category);
      }

      params.delete("page");

      const newUrl = params.toString()
        ? `${pathname}?${params.toString()}`
        : pathname;

      router.push(newUrl);
    },
    [pathname, router]
  );

  useEffect(() => {
    setSearchQuery(currentQuery);
    setSelectedCategory(currentCategory);
  }, [currentQuery, currentCategory]);

  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      if (
        searchQuery !== currentQuery ||
        selectedCategory !== currentCategory
      ) {
        updateUrlStable(searchQuery, selectedCategory);
      }
      setIsSearching(false);
    }, 400);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [
    searchQuery,
    selectedCategory,
    currentQuery,
    currentCategory,
    updateUrlStable,
  ]);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setIsSearching(true);
  };

  const handleCategorySelect = (categorySlug: string) => {
    const isCurrentlySelected = selectedCategory === categorySlug;

    if (isCurrentlySelected) {
      setSelectedCategory("");
    } else {
      setSelectedCategory(categorySlug);
      setSearchQuery("");
    }
    setIsSearching(true);
  };

  const handleTagSelect = (tagName: string) => {
    const isTagCurrentlyInQuery =
      searchQuery.toLowerCase() === tagName.toLowerCase();

    if (isTagCurrentlyInQuery) {
      setSearchQuery("");
    } else {
      setSearchQuery(tagName);
      setSelectedCategory("");
    }
    setIsSearching(true);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSelectedCategory("");

    setIsSearching(false);
    router.push(pathname);
  };

  const activeFiltersCount = (searchQuery ? 1 : 0) + (selectedCategory ? 1 : 0);
  const totalPlural = getPluralizedText(totalPosts);

  const isTagSelected = (tagName: string) => {
    return searchQuery.toLowerCase() === tagName.toLowerCase();
  };

  return (
    <div className="w-full space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <div className="relative group">
          <div
            className="absolute inset-0 bg-gradient-to-r 
            from-green-400/20 via-cyan-400/20 to-blue-500/20 
            rounded-2xl blur-xl opacity-0 group-hover:opacity-100 
            transition-opacity duration-500"
          />

          <div
            className="relative flex items-center gap-3 p-2 
            bg-background/50 backdrop-blur-sm 
            border rounded-2xl shadow-lg"
          >
            <div className="relative flex-1 overflow-hidden rounded-xl">
              <Search
                className={cn(
                  "absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors z-10",
                  searchQuery ? "text-green-400" : "text-muted-foreground"
                )}
              />
              <Input
                type="text"
                placeholder="Buscar posts..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-12 pr-4 h-12 bg-transparent border-0 
                focus-visible:ring-0 text-base 
                placeholder:text-muted-foreground/70"
              />

              <AnimatePresence>
                {isSearching && (
                  <motion.div
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    exit={{ scaleX: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="absolute bottom-0 left-0 right-0 h-1"
                    style={{ originX: 0.5 }}
                  >
                    <div
                      className="absolute inset-0 bg-gradient-to-r 
                      from-green-400 via-cyan-400 to-blue-500 
                      blur-sm opacity-60"
                    />
                    <div
                      className="absolute inset-0 h-0.5 top-1/2 -translate-y-1/2"
                      style={{
                        background: `linear-gradient(90deg, transparent 0%, rgba(16, 185, 129, 0.3) 2%, rgba(16, 185, 129, 0.8) 10%, #10b981 20%, #06b6d4 50%, #3b82f6 80%, rgba(59, 130, 246, 0.8) 90%, rgba(59, 130, 246, 0.3) 98%, transparent 100%)`,
                      }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowFilters(!showFilters)}
                className={cn(
                  "h-10 w-10 rounded-xl transition-all cursor-pointer",
                  showFilters && "bg-green-400 text-green-900"
                )}
              >
                <Filter className="h-5 w-5" />
              </Button>
              {activeFiltersCount > 0 && (
                <span
                  className="absolute -top-1 -right-1 h-5 w-5 
                bg-green-400 text-green-900 text-xs 
                  rounded-full flex items-center justify-center 
                  font-semibold shadow-sm border-2 border-background"
                >
                  {activeFiltersCount}
                </span>
              )}
            </div>

            {/* Botão limpar */}
            {(searchQuery || selectedCategory) && (
              <Button
                variant="ghost"
                size="icon"
                onClick={clearSearch}
                className="h-10 w-10 rounded-xl transition-all 
                hover:bg-red-100 hover:text-red-600 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </Button>
            )}
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-6 bg-muted/30 rounded-2xl space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-green-400" />
                    Filtrar por categoria
                  </h3>
                  {activeFiltersCount > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearSearch}
                      className="text-muted-foreground 
                      hover:text-foreground cursor-pointer"
                    >
                      Limpar filtros
                    </Button>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  {categories.map((category, index) => {
                    const categoryColor = getCategoryColor(category.name);
                    const isSelected = selectedCategory === category.slug;

                    return (
                      <motion.div
                        key={category.slug}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Badge
                          variant={isSelected ? "default" : "outline"}
                          className={cn(
                            "cursor-pointer transition-all hover:scale-105 px-4 py-2 badge-hover",
                            isSelected && "shadow-lg"
                          )}
                          style={{
                            backgroundColor: isSelected
                              ? categoryColor
                              : "transparent",
                            borderColor: categoryColor,
                            color: isSelected ? "white" : categoryColor,
                          }}
                          onClick={() => handleCategorySelect(category.slug)}
                        >
                          {category.name}
                          <span className="ml-2 opacity-70">
                            ({category.count})
                          </span>
                        </Badge>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {popularTags.length > 0 && (
                <div className="space-y-4">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Tag className="h-4 w-4 text-cyan-400" />
                    Tags populares
                  </h3>

                  <div className="flex flex-wrap gap-2">
                    {popularTags.map((tag, index) => {
                      const isSelected = isTagSelected(tag.name);

                      return (
                        <motion.div
                          key={tag.name}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <Badge
                            variant={isSelected ? "default" : "outline"}
                            className={cn(
                              "cursor-pointer transition-all hover:scale-105 px-4 py-2 badge-hover",
                              isSelected && "shadow-lg"
                            )}
                            style={{
                              backgroundColor: isSelected
                                ? tag.color
                                : "transparent",
                              borderColor: tag.color,
                              color: isSelected ? "white" : tag.color,
                            }}
                            onClick={() => handleTagSelect(tag.name)}
                          >
                            {tag.name}
                            <span className="ml-2 opacity-70">
                              ({tag.count})
                            </span>
                          </Badge>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              )}

              <div
                className="pt-2 flex items-center justify-between text-sm 
                text-muted-foreground border-t border-border/30"
              >
                <span>
                  {totalPosts} {totalPlural.posts} {totalPlural.found}
                </span>

                {(searchQuery || selectedCategory) && (
                  <span className="flex items-center gap-2">
                    Filtrando por:
                    {searchQuery && (
                      <Badge
                        variant="secondary"
                        className="text-xs max-w-[150px]"
                      >
                        <span className="truncate">"{searchQuery}"</span>
                      </Badge>
                    )}
                    {selectedCategory && (
                      <Badge variant="secondary" className="text-xs">
                        {
                          categories.find((c) => c.slug === selectedCategory)
                            ?.name
                        }
                      </Badge>
                    )}
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export { BlogSearch };
