import React from "react";

const reminderBlocks = [
  <p>
    <span className="text-green-400 font-semibold">
      A vida é uma tela em branco
    </span>{" "}
    e cada momento que vivemos é uma pincelada de cor. Ao seu redor, há
    oportunidades de espalhar alegria e apoiar quem precisa de um gesto de
    gentileza ou uma palavra amiga.{" "}
    <span className="text-green-400 font-semibold">
      Comece hoje a iluminar o caminho de alguém
    </span>{" "}
    com seu bom humor e seu desejo genuíno de ajudar.
  </p>,
  <p>
    Quando você e sua parceira ou seu parceiro olham juntos para uma obra de
    arte, não estão apenas admirando formas e cores:{" "}
    <span className="text-green-400 font-semibold">
      estão celebrando a liberdade de sentir e criar.
    </span>{" "}
    Deixe que essa inspiração se espalhe para o seu dia a dia. Quebre a rotina e
    desenhe, pinte ou dance — qualquer expressão que faça seu coração bater mais
    forte.
  </p>,
  <p>
    O tempo é o presente mais valioso que carregamos. Não importa se é para
    rabiscar ideias em um caderno ou fazer uma ligação para alguém distante.{" "}
    <span className="text-green-400 font-semibold">
      Cada minuto pode ser um convite para viver mais intensamente
    </span>
    . Não adie o sorriso que você pode compartilhar agora.
  </p>,
  <p>
    Saiba que ao apoiar alguém, você não está apenas mudando o dia daquela
    pessoa — está plantando uma semente de gratidão que pode florescer em
    semanas, meses ou até anos.{" "}
    <span className="text-green-400 font-semibold">
      Ser gentil é sua forma mais bonita de arte
    </span>
    . Continue espalhando cores, gestos e palavras que transformam a rotina em
    magia.
  </p>,
  <p className="text-muted-foreground italic pt-8">
    — Por Gabriel, inspirado pelo espírito criativo de quem eu amo
  </p>,
];

const MyReminder = () => {
  return (
    <div className="min-h-screen bg-background">
      <main className="pt-20">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <div
            className="animate-fade-in-up 
            min-h-[70vh] flex flex-col justify-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-8">
              <span className="gradient-text">Lembre-se de Viver</span>
            </h1>

            <div
              className="prose prose-lg prose-invert max-w-none 
              space-y-6 text-lg leading-relaxed"
            >
              {reminderBlocks.map((block, idx) => (
                <React.Fragment key={idx}>{block}</React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export { MyReminder };
