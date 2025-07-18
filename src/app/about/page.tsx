import { Metadata } from "next";

import Navigation from "@/components/layout/navigation";
import { AboutMe } from "@/components/about-me";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Sobre Mim • Paixão por Construir",
    description:
      "Conheça mais sobre Gabriel Mesquita — um desenvolvedor apaixonado por código limpo, ferramentas criativas e experiências de usuário significativas.",
    keywords: [
      "desenvolvedor",
      "portfólio",
      "sobre",
      "habilidades",
      "engenheiro de software",
      "Gabriel Mesquita",
      "JavaScript",
      "Next.js",
      "desenvolvimento web",
      "programação",
    ],
    authors: [{ name: "Gabriel", url: process.env.METADATA_BASE }],
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: "Sobre Mim • Paixão por Construir",
      description:
        "Descubra mais sobre Gabriel Mesquita — um desenvolvedor focado em soluções elegantes, escaláveis e tecnologias capacitadoras.",
      url: `${process.env.METADATA_BASE}/about`,
      locale: "pt-BR",
      type: "website",
    },
  };
}

const About = () => {
  return (
    <>
      <Navigation />
      <AboutMe />;
    </>
  );
};

export default About;
