# GOOD GARDEN ARCHIVE

Portal oficial do universo **GOOD GARDEN FAMILY**, inspirado na estética da internet de 2004–2006 (MySpace, Windows XP, Web 1.0/2.0 e revistas digitais underground).

## 🚀 Tecnologias Utilizadas
- **Astro** (Framework web moderno com foco em performance e SSG - Static Site Generation)
- **React** (Para componentes interativos isolados, como o player de áudio e os ganchos do ARG)
- **HTML5 semântico, CSS personalizado e JavaScript**
- **Cloudflare Pages** (Hospedagem e distribuição global estática)

## 📁 Estrutura de Diretórios
```text
/
├── public/             # Assets estáticos (imagens, favicon)
├── src/
│   ├── components/     # Componentes reutilizáveis (WindowBox, RetroPlayer, GlitchTeaser, etc.)
│   ├── layouts/        # BaseLayout estrutural com suporte a ViewTransitions
│   ├── pages/          # Rotas do site (Início, Personagens, Galeria, Música, Vídeos, Classificados, Arquivo, ARG)
│   └── styles/         # Estilos globais e variáveis de tema retrô
├── astro.config.mjs    # Configuração do Astro e integrações
└── package.json        # Dependências e scripts do projeto