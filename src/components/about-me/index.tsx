import { SocialLinks } from "../social-links";

const AboutMe = () => {
  return (
    <div className="min-h-screen bg-background">
      <main className="pt-20">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl font-bold mb-8">
              <span className="gradient-text">Sobre Mim</span>
            </h1>

            <div className="prose prose-lg prose-invert max-w-none">
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                Sou um desenvolvedor de software apaixonado, dedicado a criar
                experiências digitais elegantes, escaláveis e centradas nas
                pessoas. Ao longo da última década, ajudei empresas a
                transformar ideias em produtos impactantes por meio de código
                limpo, design cuidadoso e tecnologias modernas.
              </p>

              <div className="grid md:grid-cols-2 gap-12 my-12">
                <div>
                  <h2 className="text-2xl font-semibold mb-4 text-green-400">
                    Experiência
                  </h2>
                  <div className="space-y-6">
                    <div className="border-l-2 border-green-400/30 pl-6">
                      <h3 className="font-semibold text-lg">
                        Desenvolvedor Full Stack - Atual
                      </h3>
                      <p className="text-green-400 text-sm">
                        Freelancer • 2018 - 2025
                      </p>
                      <p className="text-muted-foreground mt-2">
                        Desenvolvimento de aplicações web de alta performance
                        utilizando stacks modernas como React, Node.js e
                        infraestrutura cloud-native.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-4 text-green-400">
                    Habilidades
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      "JavaScript",
                      "TypeScript",
                      "React",
                      "Next.js",
                      "Node.js",
                      "Docker",
                      "AWS",
                    ].map((skill) => (
                      <div
                        key={skill}
                        className="bg-secondary/50 rounded-lg p-3 text-center 
                        text-sm font-medium hover:bg-secondary/70 transition-colors"
                      >
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="not-prose bg-secondary/30 rounded-lg p-8">
                <h2 className="text-2xl font-semibold mb-4 text-green-400">
                  Missão
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Acredito que a tecnologia deve ser intuitiva, inclusiva e
                  capacitadora. Minha missão é criar soluções que simplifiquem
                  problemas complexos, inspirem a criatividade e gerem impacto
                  significativo na vida das pessoas.
                </p>
              </div>
            </div>

            <div className="mt-16">
              <SocialLinks />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export { AboutMe };
