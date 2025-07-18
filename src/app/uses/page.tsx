import { Metadata } from "next";

import Navigation from "@/components/layout/navigation";
import MyUses from "@/components/my-uses";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Ferramentas",
    description: `Uma lista detalhada de hardware, software e ferramentas que uso diariamente para desenvolvimento, produtividade e criação de conteúdo. Curado por Gabriel Mesquita.`,
    keywords: [
      "ferramentas",
      "tools",
      "hardware",
      "software",
      "setup de desenvolvedor",
      "espaço de trabalho",
      "produtividade",
      "Gabriel Mesquita",
    ],
    authors: [{ name: "Gabriel Mesquita", url: process.env.METADATA_BASE }],
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: "Ferramentas",
      description: `Explore o hardware, software e ferramentas em que Gabriel Mesquita confia para desenvolvimento, produtividade e criação de conteúdo. Conheça seu setup diário.`,
      url: process.env.METADATA_BASE,
      locale: "pt-BR",
      type: "website",
    },
  };
}

const Uses = () => {
  return (
    <>
      <Navigation />
      <MyUses />;
    </>
  );
};

export default Uses;
