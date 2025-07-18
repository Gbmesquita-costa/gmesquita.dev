import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Gabriel Mesquita - Desenvolvedor Full Stack",
    short_name: "Gabriel Mesquita",
    description:
      "Portfólio de Gabriel Mesquita: desenvolvedor, entusiasta de arte e motivador. Explore projetos, inspirações e lembretes para viver cada momento.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a", // My dark theme background color
    theme_color: "#10b981", // Green of my design
    orientation: "portrait-primary",
    scope: "/",
    lang: "pt-BR",
    icons: [
      {
        src: "/favicon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/favicon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "maskable",
      },
    ],
    categories: ["developer", "portfolio", "technology"],
    screenshots: [
      {
        src: "/screenshot-wide.png",
        sizes: "1280x720",
        type: "maskable",
        form_factor: "wide",
      },
      {
        src: "/screenshot-narrow.png",
        sizes: "750x1334",
        type: "maskable",
        form_factor: "narrow",
      },
    ],
  };
}
