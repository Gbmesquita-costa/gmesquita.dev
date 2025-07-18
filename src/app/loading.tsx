import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div
      className="min-h-screen 
      bg-background relative"
    >
      {/* Navigation Skeleton */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 
        bg-background/80 backdrop-blur-md 
        border-b border-border"
      >
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-8 w-12" />

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-4 w-16" />
              ))}
            </div>

            {/* Right side buttons */}
            <div className="flex gap-4 items-center">
              <Skeleton className="h-8 w-8 rounded-md" />
              <Skeleton className="h-8 w-8 rounded-md" />
            </div>
          </div>
        </div>
      </nav>

      {/* Dark overlay for better skeleton visibility */}
      <div
        className="fixed top-0 left-0 w-full 
        h-full bg-background/50 z-[1]"
      />

      {/* Hero Content Skeleton */}
      <div className="relative z-10">
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
          <div className="min-h-[80vh] flex flex-col justify-center">
            <div className="animate-pulse space-y-8">
              {/* Main Title */}
              <div className="space-y-4">
                <Skeleton className="h-16 md:h-20 w-full max-w-2xl" />
                <Skeleton className="h-16 md:h-20 w-3/4 max-w-xl" />
              </div>

              {/* Subtitle and description */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-8 w-32" />
                  <Skeleton className="h-8 w-4" />
                  <Skeleton className="h-8 w-24" />
                </div>
                <Skeleton className="h-6 w-80 max-w-full" />
              </div>

              {/* Command palette button */}
              <div className="space-y-4">
                <Skeleton className="h-12 w-52" />
              </div>

              {/* Social Links */}
              <div className="flex items-center space-x-6 pt-8">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="w-6 h-6 rounded" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom border */}
      <div
        className="fixed bottom-0 left-0 right-0 h-px bg-gradient-to-r 
        from-transparent via-green-400/20 to-transparent z-50"
      />
    </div>
  );
};

export default Loading;
