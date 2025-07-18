"use client";

import { motion } from "framer-motion";

interface BlogHeroProps {
  totalCount: number;
}

const getPluralizedText = (count: number) => {
  if (count === 0) {
    return {
      article: "posts",
      verb: "disponíveis",
      message: `Nenhum post está disponível no momento. Em breve teremos conteúdo sobre 
      tecnologia, curiosidades, dicas, tutoriais e descobertas fascinantes.`,
    };
  } else if (count === 1) {
    return {
      article: "post",
      verb: "disponível",
      message: `Aqui você encontra o ${count} post que escrevi, explorando tecnologia, 
      curiosidades, dicas e descobertas interessantes do mundo digital.`,
    };
  } else {
    return {
      article: "posts",
      verb: "disponíveis",
      message: `Explore os ${count} posts que escrevi sobre tecnologia, curiosidades, 
      tutoriais, dicas e outras descobertas fascinantes.`,
    };
  }
};

export function BlogHero({ totalCount }: BlogHeroProps) {
  const pluralizedText = getPluralizedText(totalCount);

  return (
    <div className="text-center max-w-4xl mx-auto">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl md:text-6xl font-bold mb-6"
      >
        <span className="gradient-text">Blog. Tutoriais. Guias.</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
      >
        {pluralizedText.message.split(" ").map((word, index) => {
          if (!isNaN(parseInt(word)) && parseInt(word) === totalCount) {
            return (
              <span
                key={index}
                className="inline-flex items-center justify-center min-w-[1.7rem] h-7
                text-green-400 font-bold text-lg
                bg-green-400/10 border border-green-400/20 
                rounded-full ml-1 mr-2 shadow-sm hover:shadow-green-400/20 
                hover:bg-green-400/15 transition-all duration-200"
              >
                {word}
              </span>
            );
          }
          return word + " ";
        })}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-8 flex flex-wrap justify-center 
        gap-4 text-sm text-muted-foreground"
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span>Conteúdo técnico</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
          <span>Dicas de carreira</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
          <span>Reflexões sobre tecnologia</span>
        </div>
      </motion.div>
    </div>
  );
}
