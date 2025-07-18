import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="pt-20">
        {/* Header Skeleton */}
        <header className="bg-card/20 border-b border-border/50">
          <div className="max-w-4xl mx-auto px-6 py-16 space-y-6">
            <Skeleton className="h-4 w-32" />
            <div className="flex items-center space-x-4">
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-20" />
            </div>
            <div className="space-y-3">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-3/4" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-2/3" />
            </div>
            <div className="flex items-center space-x-4">
              <Skeleton className="w-12 h-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-48" />
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-18 rounded-full" />
            </div>
            <Skeleton className="h-9 w-28" />
          </div>
        </header>

        {/* Featured Image Skeleton */}
        <Skeleton className="w-full aspect-[16/9] max-h-[500px]" />

        {/* Content Skeleton */}
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="space-y-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ))}
          </div>
        </div>

        {/* Related Posts Skeleton */}
        <section className="border-t border-border/30 bg-card/10">
          <div className="max-w-6xl mx-auto px-6 py-16">
            <div className="text-center mb-12">
              <Skeleton className="h-8 w-48 mx-auto mb-4" />
              <Skeleton className="h-4 w-64 mx-auto" />
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="aspect-[4/3] w-full" />
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <div className="flex justify-between">
                    <Skeleton className="h-3 w-16" />
                    <Skeleton className="h-3 w-12" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Loading;
