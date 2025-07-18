import { Metadata } from "next";

import Navigation from "@/components/layout/navigation";
import { MyReminder } from "@/components/my-reminder";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Lembrete • Momentos e Inspiração",
    description: `Uma mensagem motivacional para viver cada momento ao máximo: arte, empatia e presença. Inspirado por Gabriel e seu amor pela criatividade.`,
    keywords: [
      "inspiração",
      "motivação",
      "arte",
      "vida",
      "felicidade",
      "gentileza",
      "Gabriel Mesquita",
    ],
    authors: [{ name: "Gabriel Mesquita", url: process.env.METADATA_BASE }],
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: "Lembrete • Momentos e Inspiração",
      description: `Descubra uma mensagem motivacional para abraçar cada instante: arte, empatia e viver plenamente. Por Gabriel.`,
      url: process.env.METADATA_BASE,
      locale: "pt-BR",
      type: "website",
    },
  };
}

const Reminder = () => {
  return (
    <>
      <Navigation />
      <MyReminder />
    </>
  );
};

export default Reminder;
