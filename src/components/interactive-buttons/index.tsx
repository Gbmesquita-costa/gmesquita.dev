"use client";

import { Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ShareButtonProps {
  title?: string;
  description?: string;
  className?: string;
}

interface ScrollToTopButtonProps {
  className?: string;
  children?: React.ReactNode;
}

const ShareButton = ({ title, description, className }: ShareButtonProps) => {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: title,
        text: description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleShare}
      className={className}
    >
      <Share2 className="w-4 h-4" />
      <span>Compartilhar</span>
    </Button>
  );
};

const ScrollToTopButton = ({ className, children }: ScrollToTopButtonProps) => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Button variant="outline" onClick={handleScrollToTop} className={className}>
      {children || "Voltar ao topo"}
    </Button>
  );
};

export { ScrollToTopButton, ShareButton };
