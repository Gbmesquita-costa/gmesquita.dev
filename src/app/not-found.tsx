"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";

import { useRouter } from "next/navigation";
import { motion, type Variants } from "framer-motion";

import {
  Home,
  ArrowLeft,
  Search,
  FileText,
  User,
  Monitor,
  Clock,
  AlertTriangle,
  Compass,
  RefreshCw,
} from "lucide-react";

import Navigation from "@/components/layout/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const NotFound = () => {
  const router = useRouter();

  const [countdown, setCountdown] = useState<number>(10);
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleRedirect = useCallback(() => {
    setTimeout(() => {
      router.push("/");
    }, 0);
  }, [router]);

  useEffect(() => {
    if (!isClient) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          handleRedirect();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isClient, handleRedirect]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
    },
  };

  const floatingVariants: Variants = {
    animate: {
      y: [-10, 10, -10],
      rotate: [-5, 5, -5],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const quickLinks = [
    { href: "/", label: "Início", icon: Home, description: "Página inicial" },
    {
      href: "/blog",
      label: "Blog",
      icon: FileText,
      description: "Artigos e tutoriais",
    },
    { href: "/about", label: "Sobre", icon: User, description: "Sobre mim" },
    {
      href: "/uses",
      label: "Ferramentas",
      icon: Monitor,
      description: "Ferramentas que uso",
    },
    {
      href: "/reminder",
      label: "Lembrete",
      icon: Clock,
      description: "Lembrete inspiracional",
    },
  ];

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-background">
        <main className="pt-20">
          <div className="max-w-6xl mx-auto px-6 py-20">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="text-center space-y-12"
            >
              {/* Animated 404 Icon */}
              <motion.div
                variants={floatingVariants}
                animate="animate"
                className="relative mx-auto w-32 h-32 md:w-40 md:h-40"
              >
                <div
                  className="absolute inset-0 bg-gradient-to-r 
                  from-green-400/20 via-cyan-400/20 
                  to-blue-500/20 rounded-full blur-2xl"
                />
                <div
                  className="relative w-full h-full bg-card/30 
                  backdrop-blur-sm rounded-full border 
                  border-border/50 flex items-center justify-center"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <Compass
                      className="w-16 h-16 md:w-20 
                      md:h-20 text-green-400"
                    />
                  </motion.div>
                </div>
              </motion.div>

              {/* Title and Description */}
              <motion.div variants={itemVariants} className="space-y-6">
                <h1 className="text-6xl md:text-8xl font-bold">
                  <span className="gradient-text">404</span>
                </h1>
                <div className="space-y-4">
                  <h2
                    className="text-3xl md:text-4xl 
                    font-bold text-foreground"
                  >
                    Página Não Encontrada
                  </h2>
                  <p
                    className="text-xl text-muted-foreground 
                    max-w-2xl mx-auto leading-relaxed"
                  >
                    Ops! A página que você está procurando não existe ou foi
                    movida. Não se preocupe, vamos ajudá-lo a encontrar o que
                    precisa.
                  </p>
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row 
                gap-4 justify-center items-center"
              >
                <Button asChild size="lg" className="cursor-pointer">
                  <Link href="/" className="flex items-center gap-2">
                    <Home className="w-4 h-4" />
                    Ir para Início
                  </Link>
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => router.back()}
                  className="cursor-pointer flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Voltar
                </Button>

                <Button
                  variant="ghost"
                  size="lg"
                  onClick={() => window.location.reload()}
                  className="cursor-pointer flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Recarregar
                </Button>
              </motion.div>

              {/* Quick Links */}
              <motion.div variants={itemVariants} className="space-y-6">
                <h3 className="text-2xl font-semibold text-foreground">
                  Links Úteis
                </h3>

                <div
                  className="grid grid-cols-1 md:grid-cols-2 
                  lg:grid-cols-3 gap-4 max-w-4xl mx-auto"
                >
                  {quickLinks.map((link) => (
                    <motion.div
                      key={link.href}
                      variants={itemVariants}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="group"
                    >
                      <Link href={link.href} className="block h-full">
                        <Card
                          className="h-full hover:shadow-lg hover:shadow-green-400/10 
                          transition-all duration-300 border-border/50 
                          hover:border-green-400/50 bg-card/30 
                          backdrop-blur-sm cursor-pointer"
                        >
                          <CardContent className="p-6 h-full">
                            <div className="flex items-start space-x-3 h-full">
                              <div
                                className="p-2 bg-green-400/10 rounded-lg 
                                group-hover:bg-green-400/20 transition-colors"
                              >
                                <link.icon className="w-6 h-6 text-green-400" />
                              </div>
                              <div className="flex-1 text-left">
                                <h4
                                  className="font-semibold text-foreground 
                                  group-hover:text-green-400 transition-colors"
                                >
                                  {link.label}
                                </h4>
                                <p className="text-sm text-muted-foreground mt-1">
                                  {link.description}
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Auto Redirect Info */}
              {isClient && (
                <motion.div variants={itemVariants} className="space-y-4">
                  <div
                    className="flex items-center 
                    justify-center space-x-2 
                    text-muted-foreground"
                  >
                    <AlertTriangle className="w-4 h-4" />
                    <span className="text-sm">
                      Redirecionamento automático em {countdown} segundos
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="max-w-xs mx-auto">
                    <div
                      className="h-1 bg-muted 
                      rounded-full overflow-hidden"
                    >
                      <motion.div
                        className="h-full bg-gradient-to-r 
                        from-green-400 via-cyan-400 to-blue-500"
                        initial={{ width: "100%" }}
                        animate={{ width: "0%" }}
                        transition={{ duration: 10, ease: "linear" }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Search Suggestion */}
              <motion.div variants={itemVariants} className="pt-8">
                <Card
                  className="max-w-md mx-auto 
                  border-border/50 bg-secondary/20"
                >
                  <CardContent className="p-6 text-center">
                    <Search className="w-8 h-8 text-green-400 mx-auto mb-3" />
                    <h4 className="font-semibold text-foreground mb-2">
                      Procurando algo específico?
                    </h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Pressione Ctrl+K para abrir a busca rápida
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        window.dispatchEvent(
                          new CustomEvent("open-command-palette")
                        )
                      }
                      className="cursor-pointer"
                    >
                      <Search className="w-4 h-4 mr-2" />
                      Buscar
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Footer Message */}
              <motion.div variants={itemVariants} className="pt-8 text-center">
                <p className="text-sm text-muted-foreground">
                  Se você acredita que isso é um erro, por favor{" "}
                  <a
                    href="mailto:gbmesquitadev@gmail.com"
                    className="text-green-400 hover:underline"
                  >
                    entre em contato comigo
                  </a>
                </p>
              </motion.div>
            </motion.div>
          </div>
        </main>
      </div>
    </>
  );
};

export default NotFound;
