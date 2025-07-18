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
        <div className="max-w-4xl mx-auto px-6 py-20">
          <div className="animate-pulse space-y-12">
            {/* Title */}
            <div className="space-y-4">
              <Skeleton className="h-14 md:h-16 w-64" />
            </div>

            {/* Main introduction paragraph */}
            <div className="space-y-3">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-4/5" />
              <Skeleton className="h-6 w-3/4" />
            </div>

            {/* Experience and Skills Grid */}
            <div className="grid md:grid-cols-2 gap-12">
              {/* Experience Section */}
              <div className="space-y-6">
                <Skeleton className="h-8 w-32" />

                <div className="space-y-6">
                  {/* First Experience Item */}
                  <div
                    className="space-y-3 pl-6 
                    border-l-2 border-muted"
                  >
                    <Skeleton className="h-6 w-48" />
                    <Skeleton className="h-4 w-36" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-5/6" />
                    </div>
                  </div>

                  {/* Second Experience Item */}
                  <div
                    className="space-y-3 pl-6 
                    border-l-2 border-muted"
                  >
                    <Skeleton className="h-6 w-40" />
                    <Skeleton className="h-4 w-32" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-4/5" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Skills Section */}
              <div className="space-y-6">
                <Skeleton className="h-8 w-20" />

                {/* Skills Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {Array.from({ length: 7 }).map((_, i) => (
                    <div key={i} className="space-y-2">
                      <Skeleton className="h-12 w-full rounded-lg" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Mission Section */}
            <div
              className="space-y-6 p-8 
              bg-secondary/20 rounded-lg"
            >
              <Skeleton className="h-8 w-24" />
              <div className="space-y-3">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-3/4" />
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-8">
              <div className="flex items-center space-x-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="w-6 h-6 rounded" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Loading;
