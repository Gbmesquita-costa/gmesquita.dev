import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Skeleton */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 
        bg-background/80 backdrop-blur-md 
        border-b border-border"
      >
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-8 w-12" />

            <div
              className="hidden md:flex 
              items-center space-x-8"
            >
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-4 w-16" />
              ))}
            </div>

            <div className="flex gap-4 items-center">
              <Skeleton className="h-8 w-8 rounded-md" />
              <Skeleton className="h-8 w-8 rounded-md" />
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-20">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="animate-pulse space-y-16">
            {/* Header */}
            <div className="space-y-6">
              <Skeleton className="h-14 md:h-16 w-32" />
              <div className="space-y-3 max-w-4xl">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-4/5" />
              </div>
            </div>

            {/* Categories */}
            {Array.from({ length: 4 }).map((_, categoryIndex) => (
              <div key={categoryIndex} className="space-y-8">
                {/* Category Header */}
                <div className="flex items-center space-x-3">
                  <Skeleton className="w-8 h-8" />
                  <Skeleton className="h-9 w-32" />
                </div>

                {/* Items Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                  {Array.from({
                    length:
                      categoryIndex === 0
                        ? 4
                        : categoryIndex === 1
                        ? 3
                        : categoryIndex === 2
                        ? 6
                        : 2,
                  }).map((_, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="space-y-4 p-6 bg-secondary/20 
                      rounded-lg border border-border/30"
                    >
                      <Skeleton className="h-6 w-3/4" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Note Section */}
            <div
              className="p-8 bg-secondary/20 rounded-lg 
              border border-border/30 space-y-4"
            >
              <Skeleton className="h-7 w-20" />
              <div className="space-y-3">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-2/3" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Loading;
