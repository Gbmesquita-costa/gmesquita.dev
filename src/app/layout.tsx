import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.METADATA_BASE as string;

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: "Gabriel Mesquita",
      template: `%s | Gabriel Mesquita`,
    },
    description: `Portfólio de Gabriel Mesquita: desenvolvedor, entusiasta de arte e motivador. Explore projetos, inspirações e lembretes para viver cada momento.`,
    keywords: [
      "Gabriel Mesquita",
      "portfólio",
      "desenvolvedor",
      "arte",
      "inspiração",
      "motivação",
      "tecnologia",
      "front-end",
      "Next.js",
      "desenvolvimento web",
      "programação",
      "full stack",
      "JavaScript",
      "TypeScript",
      "React",
    ],
    authors: [{ name: "Gabriel Mesquita", url: baseUrl }],
    creator: "Gabriel Mesquita",
    publisher: "Gabriel Mesquita",

    // ADVANCED SEO OPTIMIZATIONS
    category: "technology",
    classification: "Personal Portfolio",

    // Optimized robot settings
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    // Alternative and Canonical URLs
    alternates: {
      canonical: baseUrl,
      languages: {
        "pt-BR": baseUrl,
      },
    },

    // Optimized Open Graph
    openGraph: {
      title: "Gabriel Mesquita • Portfólio",
      description: `Descubra o trabalho de Gabriel Mesquita: desenvolvimento web, projetos criativos e lembretes para viver com arte e propósito.`,
      url: baseUrl,
      siteName: "Gabriel Mesquita",
      images: [
        {
          url: `${baseUrl}/og-default.jpg`,
          width: 1200,
          height: 630,
          alt: "Gabriel Mesquita • Portfólio",
          type: "image/jpeg",
        },
      ],
      locale: "pt-BR",
      type: "website",
    },

    // Optimized Twitter Card
    twitter: {
      card: "summary_large_image",
      title: "Gabriel Mesquita • Portfólio",
      description: `Explore o portfólio de Gabriel Mesquita: desenvolvedor e entusiasta de arte. Projetos, inspirações e lembretes para viver plenamente.`,
      images: [`${baseUrl}/twitter-default.jpg`],
    },

    // INTEGRATED PWA SETTINGS
    applicationName: "Gabriel Mesquita",
    appleWebApp: {
      capable: true,
      title: "Gabriel Mesquita",
      statusBarStyle: "black-translucent",
    },

    // Additional metadata for SEO
    other: {
      "theme-color": "#10b981", // Green of my design
      "color-scheme": "dark light",
      "format-detection": "telephone=no", // Prevents automatic phone detection
      "mobile-web-app-capable": "yes",
      "apple-mobile-web-app-capable": "yes",
      "apple-mobile-web-app-status-bar-style": "black-translucent",
      "msapplication-TileColor": "#10b981",
      "msapplication-config": "/browserconfig.xml",
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const baseUrl = process.env.METADATA_BASE as string;

  return (
    <html lang="pt-BR" dir="ltr" suppressHydrationWarning>
      <head>
        {/* Schema.org JSON-LD for structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Gabriel Mesquita",
              jobTitle: "Desenvolvedor Full Stack",
              description:
                "Desenvolvedor apaixonado por código limpo, ferramentas criativas e experiências de usuário significativas.",
              url: baseUrl,
              image: `${baseUrl}/profile-image.jpg`,
              sameAs: [
                "https://github.com/Gbmesquita-costa",
                "https://linkedin.com/in/gabriel-mesquita-635600223",
                "https://twitter.com/Gabriel84285663",
                "https://instagram.com/gb.mesquita",
              ],
              knowsAbout: [
                "JavaScript",
                "TypeScript",
                "React",
                "Next.js",
                "Node.js",
                "Desenvolvimento Web",
                "Frontend Development",
                "Full Stack Development",
              ],
              worksFor: {
                "@type": "Organization",
                name: "Freelancer",
              },
              alumniOf: {
                "@type": "Organization",
                name: "Sua Faculdade/Curso",
              },
            }),
          }}
        />

        {/* Website structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Gabriel Mesquita",
              description:
                "Portfólio de Gabriel Mesquita: desenvolvedor, entusiasta de arte e motivador.",
              url: baseUrl,
              author: {
                "@type": "Person",
                name: "Gabriel Mesquita",
              },
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: `${baseUrl}/blog?q={search_term_string}`,
                },
                "query-input": "required name=search_term_string",
              },
              mainEntity: {
                "@type": "Person",
                name: "Gabriel Mesquita",
              },
            }),
          }}
        />

        {/* 📱 Additional PWA Meta Tags */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="apple-mobile-web-app-title" content="Gabriel Mesquita" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
      <GoogleAnalytics gaId={process.env.GOOGLE_ANALYTICS as string} />
    </html>
  );
}
