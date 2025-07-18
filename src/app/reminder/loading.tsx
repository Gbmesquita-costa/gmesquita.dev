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

            <div className="hidden md:flex items-center space-x-8">
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
        <div className="max-w-4xl mx-auto px-6 py-20">
          <div
            className="animate-pulse min-h-[70vh] 
            flex flex-col justify-center space-y-8"
          >
            {/* Title */}
            <div className="space-y-4">
              <Skeleton className="h-14 md:h-16 w-80 max-w-full" />
              <Skeleton className="h-14 md:h-16 w-48 max-w-full" />
            </div>

            {/* Content Paragraphs */}
            <div className="space-y-8 pt-4">
              {/* First Paragraph */}
              <div className="space-y-3">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-4/5" />
                <Skeleton className="h-5 w-3/4" />
              </div>

              {/* Second Paragraph */}
              <div className="space-y-3">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-5/6" />
                <Skeleton className="h-5 w-full" />
              </div>

              {/* Third Paragraph */}
              <div className="space-y-3">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-2/3" />
                <Skeleton className="h-5 w-4/5" />
              </div>

              {/* Fourth Paragraph */}
              <div className="space-y-3">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-5/6" />
                <Skeleton className="h-5 w-3/4" />
              </div>

              {/* Signature */}
              <div className="pt-8 space-y-2">
                <Skeleton
                  className="h-4 w-96 
                  max-w-full opacity-70"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Loading;
