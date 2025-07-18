import { categories } from "./data";

const MyUses = () => {
  return (
    <div className="min-h-screen bg-background">
      <main className="pt-20">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="animate-fade-in-up">
            <div className="mb-16">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                <span className="gradient-text">O que eu uso</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-4xl">
                Uma lista cuidadosamente selecionada de softwares, hardwares e
                ferramentas que uso diariamente para desenvolvimento,
                produtividade e criação de conteúdo.
              </p>
            </div>

            <div className="space-y-16">
              {categories.map((category, categoryIndex) => (
                <div key={categoryIndex}>
                  <div className="flex items-center space-x-3 mb-8">
                    <category.icon className="w-8 h-8 text-green-400" />
                    <h2 className="text-3xl font-bold text-foreground">
                      {category.title}
                    </h2>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {category.items.map((item, itemIndex) => (
                      <a
                        key={itemIndex}
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group"
                      >
                        <div
                          className="bg-secondary/30 rounded-lg p-6 border 
                          border-border/50 hover:border-green-400/50 
                          transition-all duration-300 hover:scale-[1.02]"
                        >
                          <h3
                            className="text-lg font-semibold mb-2 
                            group-hover:text-green-400 transition-colors"
                          >
                            {item.name}
                          </h3>
                          <p className="text-muted-foreground">
                            {item.description}
                          </p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div
              className="mt-16 bg-secondary/20 rounded-lg 
              p-8 border border-border/30"
            >
              <h2 className="text-2xl font-bold mb-4 text-green-400">Nota</h2>
              <p className="text-lg text-muted-foreground">
                Uma seleção honesta das ferramentas que realmente uso no meu
                trabalho diário. Nada de marketing ou links patrocinados —
                apenas recomendações genuínas para desenvolvedores que querem
                otimizar seu setup e aumentar sua produtividade.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MyUses;
