"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { motion } from "framer-motion";

import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BlogPaginationProps {
  currentPage: number;
  totalPages: number;
  totalPosts: number;
  hasMore: boolean;
  postsPerPage?: number;
}

interface PageButtonProps {
  page: number;
  isActive: boolean;
  onClick: () => void;
}

export function BlogPagination({
  currentPage,
  totalPages,
  totalPosts,
  hasMore,
  postsPerPage = 8,
}: BlogPaginationProps) {
  const router = useRouter();
  const pathname = usePathname();

  const searchParams = useSearchParams();

  const navigateToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());

    if (page === 1) {
      params.delete("page");
    } else {
      params.set("page", page.toString());
    }

    const newUrl = params.toString()
      ? `${pathname}?${params.toString()}`
      : pathname;
    router.push(newUrl);
  };

  if (totalPages <= 1) return null;

  const renderPageNumbers = () => {
    const pages = [];

    const maxVisible = 7;
    const halfVisible = Math.floor(maxVisible / 2);

    let startPage = Math.max(1, currentPage - halfVisible);
    let endPage = Math.min(totalPages, currentPage + halfVisible);

    if (currentPage <= halfVisible) {
      endPage = Math.min(totalPages, maxVisible);
    } else if (currentPage > totalPages - halfVisible) {
      startPage = Math.max(1, totalPages - maxVisible + 1);
    }

    if (startPage > 1) {
      pages.push(
        <PageButton
          key={1}
          page={1}
          isActive={currentPage === 1}
          onClick={() => navigateToPage(1)}
        />
      );

      if (startPage > 2) {
        pages.push(
          <span key="start-ellipsis" className="px-2 text-muted-foreground">
            <MoreHorizontal className="h-4 w-4" />
          </span>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <PageButton
          key={i}
          page={i}
          isActive={currentPage === i}
          onClick={() => navigateToPage(i)}
        />
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <span key="end-ellipsis" className="px-2 text-muted-foreground">
            <MoreHorizontal className="h-4 w-4" />
          </span>
        );
      }
      pages.push(
        <PageButton
          key={totalPages}
          page={totalPages}
          isActive={currentPage === totalPages}
          onClick={() => navigateToPage(totalPages)}
        />
      );
    }

    return pages;
  };

  const startPost = (currentPage - 1) * postsPerPage + 1;
  const endPost = Math.min(currentPage * postsPerPage, totalPosts);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mt-16 space-y-6"
    >
      <div className="text-center text-sm text-muted-foreground">
        Exibindo {startPost} - {endPost} de {totalPosts} posts
      </div>

      <div className="flex items-center justify-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => navigateToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className={cn(
            "h-9 w-9 rounded-xl transition-all cursor-pointer",
            currentPage === 1 && "opacity-50 cursor-not-allowed"
          )}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div className="flex items-center gap-1 cursor-pointer">
          {renderPageNumbers()}
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={() => navigateToPage(currentPage + 1)}
          disabled={!hasMore}
          className={cn(
            "h-9 w-9 rounded-xl transition-all cursor-pointer",
            !hasMore && "opacity-50 cursor-not-allowed"
          )}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="max-w-xs mx-auto">
        <div className="h-1 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-green-400 
            via-cyan-400 to-blue-500"
            initial={{ width: 0 }}
            animate={{ width: `${(currentPage / totalPages) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>
    </motion.div>
  );
}

function PageButton({ page, isActive, onClick }: PageButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className={cn(
        "h-9 w-9 rounded-md font-medium transition-all cursor-pointer",
        "hover:bg-muted hover:text-foreground",
        isActive
          ? "bg-green-400 text-green-900 shadow-lg shadow-green-400/20"
          : "text-muted-foreground hover:text-foreground"
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {page}
    </motion.button>
  );
}
