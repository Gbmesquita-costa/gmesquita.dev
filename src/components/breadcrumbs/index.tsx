import Link from "next/link";

import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

const Breadcrumbs = ({ items, className }: BreadcrumbsProps) => {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("flex items-center space-x-1 text-sm", className)}
    >
      <ol className="flex items-center space-x-1">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <ChevronRight
                className="w-4 h-4 
                text-muted-foreground mx-1"
              />
            )}

            {item.current ? (
              <span
                className="text-foreground font-medium 
                truncate max-w-[200px]"
                aria-current="page"
              >
                {item.label}
              </span>
            ) : item.href ? (
              <Link
                href={item.href}
                className="text-muted-foreground hover:text-green-400 
                transition-colors truncate max-w-[200px]"
              >
                {index === 0 && <Home className="w-4 h-4 inline mr-1" />}
                {item.label}
              </Link>
            ) : (
              <span
                className="text-muted-foreground 
                truncate max-w-[200px]"
              >
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

// Utility function to generate breadcrumbs for blog
const generateArticleBreadcrumbs = (
  articleTitle?: string,
  category?: string
): BreadcrumbItem[] => {
  const breadcrumbs: BreadcrumbItem[] = [
    { label: "Início", href: "/" },
    { label: "Blog", href: "/blog" },
  ];

  if (category) {
    breadcrumbs.push({
      label: category,
      href: `/blog?category=${encodeURIComponent(category.toLowerCase())}`,
    });
  }

  if (articleTitle) {
    breadcrumbs.push({
      label: articleTitle,
      current: true,
    });
  }

  return breadcrumbs;
};

export { Breadcrumbs, generateArticleBreadcrumbs };
