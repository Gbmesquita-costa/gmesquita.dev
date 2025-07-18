import { Monitor, Smartphone, Keyboard, Coffee } from "lucide-react";

const categories = [
  {
    title: "Hardware",
    icon: Monitor,
    items: [
      {
        name: "Notebook Avell Storm 450r",
        description:
          "AMD Ryzen 7, RTX 4050, 32GB RAM, 2TB NVME - Máquina principal",
        link: "https://avell.com.br/storm-450r",
      },
      {
        name: "Studio Display",
        description:
          "Monitor Apple 5K de 27 polegadas - Perfeito para desenvolvimento",
        link: "https://apple.com/studio-display",
      },
      {
        name: "Monitor Avell Volcano`s-27-180hz",
        description: "Meu monitor principal",
        link: "https://avell.com.br/monitor-volcanos-27-180hz",
      },
      {
        name: "Headset Gamer Redragon Zeus X",
        description: "Ideal para jogar, trabalhar e ouvir música",
        link: "https://www.kabum.com.br/produto/227818/headset-gamer-redragon-zeus-x-chroma-mk-ii-rgb-som-surround-7-1-drivers-53mm-usb-preto-e-vermelho-h510-rgb",
      },
    ],
  },
  {
    title: "Software",
    icon: Smartphone,
    items: [
      {
        name: "VSCode",
        description: "Editor principal com tema Omni (Rocketseat)",
        link: "https://code.visualstudio.com",
      },
      {
        name: "Google Chrome",
        description: "Navegador principal",
        link: "https://www.google.com/intl/en/chrome/",
      },
      {
        name: "Windows 11",
        description: "Sistema operacional moderno e produtivo",
        link: "https://www.microsoft.com/en/software-download/windows11",
      },
    ],
  },
  {
    title: "Desenvolvimento",
    icon: Keyboard,
    items: [
      {
        name: "Next.js",
        description:
          "Framework React para criar aplicações web rápidas e escaláveis",
        link: "https://nextjs.org",
      },
      {
        name: "TypeScript",
        description: "JavaScript tipado para um código mais seguro e escalável",
        link: "https://www.typescriptlang.org",
      },
      {
        name: "Tailwind CSS",
        description:
          "Framework CSS utilitário para desenvolvimento rápido de UI",
        link: "https://tailwindcss.com",
      },
      {
        name: "Vercel",
        description:
          "Plataforma para deploy e hospedagem de aplicações frontend",
        link: "https://vercel.com",
      },
      {
        name: "Node.js",
        description: "Runtime JavaScript para aplicações no lado do servidor",
        link: "https://nodejs.org",
      },
      {
        name: "AWS",
        description:
          "Plataforma de serviços em nuvem para hospedagem e infraestrutura",
        link: "https://aws.amazon.com",
      },
    ],
  },
  {
    title: "Ambiente de Trabalho",
    icon: Coffee,
    items: [
      {
        name: "Redragon K607",
        description: "Teclado mecânico low profile com switches Brown",
        link: "https://www.kabum.com.br/produto/310984/teclado-mecanico-gamer-redragon-aps-rgb-switch-redragon-brown-abnt2-preto-low-profile-k607-rgb-pt-brown",
      },
      {
        name: "Redragon Cobra M7",
        description: "Mouse gamer ergonômico com alta precisão",
        link: "https://www.redragon.com.br/produto/mouse-gamer-redragon-cobra-m7-rgb-12400dpi-7-botoes-programaveis-preto-m711v2-15306",
      },
    ],
  },
];

export { categories };
