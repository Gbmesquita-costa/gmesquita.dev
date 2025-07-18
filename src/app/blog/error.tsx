"use client";

import { Button } from "@/components/ui/button";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

import Link from "next/link";

const BlogError = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  return (
    <div
      className="min-h-screen bg-background 
      flex items-center justify-center"
    >
      <div className="max-w-md mx-auto px-6">
        <Card className="border-red-400/50">
          <CardHeader className="text-center pb-4">
            <div
              className="mx-auto w-12 h-12 bg-red-400/20 
              rounded-full flex items-center justify-center mb-4"
            >
              <AlertTriangle className="w-6 h-6 text-red-400" />
            </div>
            <CardTitle className="text-2xl">Algo deu errado</CardTitle>
          </CardHeader>

          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">
              Ocorreu um erro ao carregar os posts. Tente novamente ou retorne à
              página inicial.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={reset}
                className="flex 
                items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Tentar Novamente
              </Button>

              <Button asChild variant="outline">
                <Link
                  href="/"
                  className="flex 
                  items-center gap-2"
                >
                  <Home className="w-4 h-4" />
                  Início
                </Link>
              </Button>
            </div>

            {process.env.NODE_ENV === "development" && (
              <details className="text-left mt-4">
                <summary
                  className="cursor-pointer text-sm 
                  text-muted-foreground"
                >
                  Detalhes do Bug (Development)
                </summary>
                <pre
                  className="mt-2 p-3 bg-muted rounded 
                  text-xs overflow-auto"
                >
                  {error.message}
                </pre>
              </details>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BlogError;
