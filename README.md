# 🚀 Gabriel Mesquita - Portfolio & Blog

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-15.3.2-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Three.js-0.176.0-000000?style=for-the-badge&logo=three.js&logoColor=white" alt="Three.js" />
</div>

<div align="center">
  <h3>Portfolio pessoal e blog de Gabriel Mesquita</h3>
  <p>Desenvolvedor Full Stack apaixonado por código limpo, ferramentas criativas e experiências de usuário significativas.</p>
  
  <a href="https://gmesquita.dev">🌐 Ver Demo</a> •
  <a href="#-funcionalidades">✨ Funcionalidades</a> •
  <a href="#-instalação">🚀 Instalação</a> •
  <a href="#-contribuição">🤝 Contribuição</a>
</div>

---

## 📋 Índice

- [🎨 Overview](#-overview)
- [✨ Funcionalidades](#-funcionalidades)
- [🛠️ Tecnologias](#️-tecnologias)
- [🚀 Instalação](#-instalação)
- [📝 Scripts Disponíveis](#-scripts-disponíveis)
- [📁 Estrutura do Projeto](#-estrutura-do-projeto)
- [🎯 Sistema de Blog](#-sistema-de-blog)
- [🎨 Sistema de Cores](#-sistema-de-cores)
- [⌨️ Atalhos de Teclado](#️-atalhos-de-teclado)
- [🔧 Configuração](#-configuração)
- [📊 Performance](#-performance)
- [🤝 Contribuição](#-contribuição)
- [📄 Licença](#-licença)

## 🎨 Overview

Este é o portfolio pessoal e blog de Gabriel Mesquita, desenvolvido com as mais modernas tecnologias web. O projeto combina design elegante, performance otimizada e uma experiência de usuário excepcional.

### 🌟 Características Principais

- **🎯 Design Moderno**: Interface limpa com tema dark e gradientes vibrantes
- **⚡ Performance**: Otimizado para velocidade com Next.js 15 e React 19
- **📱 Responsivo**: Funciona perfeitamente em todos os dispositivos
- **🔍 SEO Otimizado**: Meta tags otimizadas e structured data
- **♿ Acessível**: Seguindo as melhores práticas de acessibilidade
- **🎮 Interativo**: Background 3D com Three.js e animações suaves

## ✨ Funcionalidades

### 🏠 Portfolio

- **Hero Section** com animação 3D interativa
- **Sobre Mim** com informações pessoais e profissionais
- **Ferramentas** que uso diariamente
- **Lembrete** inspiracional pessoal

### 📝 Sistema de Blog

- **Posts em Markdown** com syntax highlighting
- **Sistema de busca** avançado com filtros
- **Categorias e tags** com cores personalizadas
- **Posts em destaque** com carousel
- **Paginação** otimizada
- **Posts relacionados** baseados em categoria e tags
- **Tempo de leitura** automático
- **SEO completo** para cada post

### 🎛️ Command Palette

- **Ctrl+K** para abrir o command palette
- **Navegação rápida** por teclado
- **Ações diretas** (copiar link, enviar email, abrir GitHub)
- **Atalhos intuitivos** (G+H para Home, G+B para Blog, etc.)

### 🎨 Experiência Visual

- **Background 3D** interativo com Three.js
- **Animações suaves** com Framer Motion
- **Loading states** elegantes
- **Error boundaries** com feedback visual
- **Tema dark** otimizado

## 🛠️ Tecnologias

### Core

- **[Next.js 15.3.2](https://nextjs.org/)** - Framework React para produção
- **[React 19](https://react.dev/)** - Biblioteca para interfaces de usuário
- **[TypeScript 5](https://www.typescriptlang.org/)** - JavaScript tipado
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Framework CSS utilitário

### UI & Animações

- **[Framer Motion 12.19.1](https://www.framer.com/motion/)** - Animações fluidas
- **[Three.js 0.176.0](https://threejs.org/)** - Gráficos 3D no browser
- **[Lucide React](https://lucide.dev/)** - Ícones SVG
- **[Radix UI](https://www.radix-ui.com/)** - Componentes acessíveis

### Blog & Conteúdo

- **[Gray Matter](https://github.com/jonschlinkert/gray-matter)** - Parsing do frontmatter
- **[Remark](https://remark.js.org/)** - Processamento de Markdown
- **[Rehype](https://github.com/rehypejs/rehype)** - Processamento de HTML
- **[Reading Time](https://github.com/ngryman/reading-time)** - Cálculo de tempo de leitura

### Ferramentas

- **[Sharp](https://sharp.pixelplumbing.com/)** - Processamento de imagens
- **[CMDK](https://cmdk.paco.me/)** - Command palette
- **[Class Variance Authority](https://cva.style/)** - Variantes de classes CSS

## 🚀 Instalação

### Pré-requisitos

- Node.js 18+
- npm, yarn ou pnpm

### Passo a passo

1. **Clone o repositório**

```bash
git clone https://github.com/Gbmesquita-costa/portfolio.git
cd portfolio
```

2. **Instale as dependências**

```bash
npm install
# ou
yarn install
# ou
pnpm install
```

3. **Configure as variáveis de ambiente**

```bash
cp .env.example .env.local
```

Edite o arquivo `.env.local`:

```env
METADATA_BASE=http://localhost:3000
```

4. **Execute o projeto**

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

5. **Abra no navegador**

```
http://localhost:3000
```

## 📝 Scripts Disponíveis

### Desenvolvimento

```bash
npm run dev          # Inicia o servidor de desenvolvimento
npm run build        # Cria a build de produção
npm run start        # Inicia o servidor de produção
npm run lint         # Executa o linter
```

### Blog Management

```bash
npm run blog:new           # Cria um novo post
npm run blog:stats         # Mostra estatísticas do blog
npm run blog:optimize      # Otimiza arquivos markdown
npm run blog:validate      # Valida e corrige posts
npm run blog:clean         # Remove imagens órfãs
npm run blog:report        # Gera relatório de performance
npm run blog:maintenance   # Executa todas as otimizações
```

### Utilitários

```bash
npm run check:blog         # Verifica estrutura de diretórios
npm run performance:test   # Testa performance do sistema
```

## 📁 Estrutura do Projeto

```
src/
├── app/                    # App Router (Next.js 13+)
│   ├── about/              # Página Sobre
│   ├── blog/               # Sistema de blog
│   │   └── [slug]/         # Posts individuais
│   ├── reminder/           # Página de lembrete
│   ├── uses/               # Ferramentas que uso
│   ├── globals.css         # Estilos globais
│   ├── layout.tsx          # Layout principal
│   ├── page.tsx            # Homepage
│   ├── loading.tsx         # Loading state global
│   ├── not-found.tsx       # Página 404
│   ├── manifest.ts         # PWA manifest
│   ├── robots.ts           # Robots.txt
│   └── sitemap.ts          # Sitemap automático
├── components/             # Componentes React
│   ├── ui/                 # Componentes base (shadcn/ui)
│   ├── blog/               # Componentes do blog
│   ├── layout/             # Componentes de layout
│   └── ...                 # Outros componentes
├── lib/                    # Utilitários e configurações
│   ├── blog.server.ts      # Funções server-side do blog
│   ├── blog.client.ts      # Funções client-side do blog
│   ├── markdown.ts         # Processamento de markdown
│   ├── tag-colors.ts       # Sistema de cores
│   ├── types.ts            # Tipos TypeScript
│   └── utils.ts            # Utilitários gerais
├── posts/                  # Posts em Markdown
└── scripts/                # Scripts de automação
    ├── blog-optimization.js # Otimização do blog
    ├── blog-stats.js       # Estatísticas
    ├── create-post.js      # Criação de posts
    └── performance-test.js # Testes de performance
```

## 🎯 Sistema de Blog

### Criando um Post

Execute o comando para criar um novo post:

```bash
npm run blog:new
```

O script irá guiá-lo através de:

- ✏️ Título e excerpt
- 📂 Categoria (predefinida ou nova)
- 🏷️ Tags (predefinidas ou personalizadas)
- ⭐ Status de destaque
- 👤 Autor
- 🖼️ Imagem (com otimização automática)
- ⏱️ Tempo de leitura (manual ou automático)
- 🔍 Configurações de SEO

### Estrutura do Frontmatter

```yaml
---
title: "Título do Post"
excerpt: "Resumo do post para SEO e listagens"
date: "2024-01-15"
category: "Desenvolvimento"
tags: ["javascript", "react", "tutorial"]
featured: true
image: "/static/posts/meu-post.jpg"
author: "Gabriel Mesquita"
readTime: 5
seo:
  metaTitle: "Título customizado para SEO"
  metaDescription: "Descrição customizada"
  keywords: ["javascript", "react", "tutorial"]
---
```

### Markdown Suportado

- ✅ **GitHub Flavored Markdown** (GFM)
- ✅ **Syntax highlighting** automático
- ✅ **Tabelas**, listas e blockquotes
- ✅ **Código inline** e blocos de código
- ✅ **Links** e imagens
- ✅ **Headers** com IDs automáticos para navegação

## 🎨 Sistema de Cores

O projeto possui um sistema avançado de cores para tags e categorias:

### Tags Predefinidas

- **Frontend**: JavaScript, TypeScript, React, Next.js, Vue, Angular
- **Backend**: Node.js, Python, Java, PHP, Go, Rust
- **Database**: MySQL, PostgreSQL, MongoDB, Redis
- **DevOps**: Docker, Kubernetes, AWS, Azure, GCP
- **E muito mais...**

### Personalizando Cores

Edite `src/lib/tag-colors.ts` para adicionar novas cores:

```typescript
const TAG_COLORS: Record<string, string> = {
  "minha-tag": "#ff6b6b",
  "outra-tag": "#4ecdc4",
  // ...
};
```

## ⌨️ Atalhos de Teclado

### Command Palette

- **Ctrl+K** (ou **⌘+K**): Abre o command palette

### Navegação Rápida

- **G + H**: Ir para Home
- **G + A**: Ir para About
- **G + B**: Ir para Blog
- **G + U**: Ir para Uses
- **G + R**: Ir para Reminder

### Ações Rápidas

- **L**: Copiar link da página atual
- **E**: Abrir email de contato
- **S**: Ver código no GitHub
- **T**: Abrir Twitter
- **G**: Abrir GitHub
- **N**: Abrir LinkedIn
- **I**: Abrir Instagram

## 🔧 Configuração

### Variáveis de Ambiente

```env
# .env.local
METADATA_BASE=https://seu-dominio.com
```

### Configuração do Blog

Para personalizar o blog, edite:

- `src/lib/blog.server.ts` - Configurações server-side
- `src/lib/tag-colors.ts` - Cores das tags e categorias
- `scripts/create-post.js` - Configurações de criação de posts

### SEO e Metadata

O projeto inclui:

- ✅ Meta tags otimizadas
- ✅ Open Graph completo
- ✅ Twitter Cards
- ✅ JSON-LD structured data
- ✅ Sitemap automático
- ✅ Robots.txt configurado

## 📊 Performance

### Otimizações Implementadas

- **⚡ Next.js 15** com App Router
- **🖼️ Otimização automática** de imagens com Sharp
- **📦 Code splitting** automático
- **🗜️ Compressão** de assets
- **🎯 Tree shaking** para reduzir bundle size
- **⚡ Lazy loading** de componentes
- **🔄 Streaming** de conteúdo
- **💾 Caching** inteligente

### Métricas

Execute `npm run performance:test` para verificar:

- Tempo de carregamento de posts
- Performance de filtros
- Uso de memória
- Eficiência do cache

## 🤝 Contribuição

Contribuições são sempre bem-vindas! Se você tem uma ideia ou encontrou um bug:

### Como Contribuir

1. **Fork** o projeto
2. **Clone** seu fork

```bash
git clone https://github.com/seu-usuario/portfolio.git
```

3. **Crie uma branch** para sua feature

```bash
git checkout -b feature/minha-feature
```

4. **Commit** suas mudanças

```bash
git commit -m "feat: adiciona nova funcionalidade"
```

5. **Push** para a branch

```bash
git push origin feature/minha-feature
```

6. Abra um **Pull Request**

### Tipos de Contribuição

- 🐛 **Bug fixes**
- ✨ **Novas funcionalidades**
- 📚 **Melhorias na documentação**
- 🎨 **Melhorias de design**
- ⚡ **Otimizações de performance**
- 🧪 **Testes**

### Convenções

- Use **Conventional Commits** para mensagens
- Siga o **ESLint** configurado
- Adicione **tipos TypeScript** quando necessário
- Teste suas mudanças antes de enviar

## 📞 Contato

**Gabriel Mesquita** - Desenvolvedor Full Stack

- 🌐 **Website**: [gmesquita.dev](https://gmesquita.dev)
- 📧 **Email**: [gbmesquitadev@gmail.com](mailto:gbmesquitadev@gmail.com)
- 💼 **LinkedIn**: [gabriel-mesquita-635600223](https://linkedin.com/in/gabriel-mesquita-635600223)
- 🐙 **GitHub**: [Gbmesquita-costa](https://github.com/Gbmesquita-costa)
- 🐦 **Twitter**: [@Gabriel84285663](https://twitter.com/Gabriel84285663)
- 📸 **Instagram**: [@gb.mesquita](https://instagram.com/gb.mesquita)

## 📄 Licença

Este projeto está sob a licença **MIT**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

<div align="center">
  <p>Feito com ❤️ por <a href="https://github.com/Gbmesquita-costa">Gabriel Mesquita</a></p>
  <p>Se este projeto te ajudou, considere dar uma ⭐!</p>
</div>
