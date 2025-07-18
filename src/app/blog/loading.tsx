import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

const Loading = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="pt-20">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="space-y-16">
            {/* Hero Skeleton */}
            <div
              className="text-center max-w-4xl 
              mx-auto space-y-4"
            >
              <Skeleton className="h-16 w-3/4 mx-auto" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-5/6 mx-auto" />
            </div>

            {/* Featured Posts Skeleton */}
            <section>
              <Skeleton className="h-8 w-48 mb-8" />
              <div
                className="grid gap-8 md:grid-cols-2 
                lg:grid-cols-3"
              >
                {Array.from({ length: 3 }).map((_, i) => (
                  <Card key={i} className="overflow-hidden">
                    <Skeleton className="aspect-video w-full" />
                    <CardContent className="p-6">
                      <Skeleton className="h-4 w-20 mb-3" />
                      <Skeleton className="h-6 w-full mb-2" />
                      <Skeleton className="h-6 w-3/4 mb-4" />
                      <div className="space-y-2 mb-4">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                      </div>
                      <div className="flex justify-between">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-16" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Search Skeleton */}
            <div className="space-y-6">
              <div className="relative">
                <Skeleton className="h-16 w-full rounded-2xl" />
              </div>
            </div>

            {/* Posts Grid Skeleton */}
            <section>
              <div
                className="flex items-center 
                justify-between mb-8"
              >
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-4 w-32" />
              </div>

              <div
                className="grid gap-8 
                md:grid-cols-2 lg:grid-cols-3"
              >
                {Array.from({ length: 9 }).map((_, i) => (
                  <Card key={i} className="overflow-hidden">
                    <Skeleton className="aspect-video w-full" />
                    <CardContent className="p-6">
                      <Skeleton className="h-4 w-20 mb-3" />
                      <Skeleton className="h-6 w-full mb-2" />
                      <Skeleton className="h-6 w-3/4 mb-4" />
                      <div className="space-y-2 mb-4">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                      </div>
                      <div className="flex justify-between">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-16" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
