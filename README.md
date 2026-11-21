# Portfólio de projetos

Seleção de projetos pessoais de desenvolvimento web, automação e inteligência artificial. Os projetos privados são apresentados apenas por descrições resumidas; código-fonte, credenciais e informações internas não são publicados aqui.

## Projetos

### Calculadora de HP efetivo para Black Desert Online
**Tecnologias:** React 18, TypeScript, Vite, Node.js, Go, Web Workers, Tesseract.js (OCR), jsPDF, Supabase (protótipo A+), Docker e Nginx.

Projeto pessoal para analisar builds de dano e sobrevivência em guerras de larga escala. Compara estilos de jogo contra composições médias de adversários e ajuda a montar builds, avaliar curvas de dano e sobrevivência e planejar melhorias de equipamento considerando status e custo.

**Status:** em desenvolvimento. Código-fonte não público.

### Agente de IA para apoio ao desenvolvimento
**Tecnologias:** JavaScript, GitHub Copilot, avaliações automatizadas.

Agente coordenador reutilizável para apoiar tarefas de desenvolvimento em diferentes projetos. Delega atividades delimitadas a especialistas, integra os resultados seguindo as instruções de cada projeto e mantém regras reutilizáveis sem misturar decisões específicas de outros projetos.

**Status:** em desenvolvimento. Código-fonte não público.

### IDE de visualização de agentes
**Tecnologias:** JavaScript, Node.js, Canvas, GitHub Copilot.

Monitor local que representa agentes de IA como redes animadas e mostra delegações e retornos observados em uma sessão autorizada. A interface também apresenta estados e, quando disponíveis, modelo de linguagem e ferramentas utilizadas.

**Status:** protótipo funcional em desenvolvimento. Código-fonte não público.

### Otimizador de Windows
**Tecnologias:** Python, APIs de modelos de IA, testes automatizados.

Ferramenta em desenvolvimento para investigar problemas de desempenho no Windows e preparar propostas de ajustes reversíveis. Um agente de IA auxilia na pesquisa e no planejamento; a aplicação de alterações depende de revisão e aprovação humana.

**Status:** em desenvolvimento. Código-fonte não público.

### Bot de acompanhamento para Discord
**Tecnologias:** TypeScript, SQLite, Docker, Discord.

Bot para apoiar a organização de um processo probatório em uma comunidade: registra participantes, acompanha etapas, permite documentar avaliações e envia lembretes.

**Status:** projeto pessoal. Código-fonte não público.

### Portfólio pessoal
**Tecnologias:** HTML, CSS.

Projeto de estudo com páginas de apresentação pessoal e currículo.

**Repositório público:** [primeiro-projeto-em-html-css](https://github.com/ppalvesp/primeiro-projeto-em-html-css)

### Aim Log
**Tecnologias:** JavaScript, React, Electron.

Aplicativo desktop para Windows que organiza treinos de mira, benchmarks guiados e histórico de resultados do KovaaK's. A distribuição pública contém os instaladores e metadados de atualização; o código-fonte permanece privado.

**Repositório de distribuição:** [aim-progress-app](https://github.com/ppalvesp/aim-progress-app)

### Script de preparação pós-formatação
**Tecnologias:** Automação para Windows.

Projeto pessoal para agilizar a configuração inicial do computador e a instalação de aplicativos depois de formatar o sistema.

**Status:** projeto pessoal. Código-fonte não público.

## Tecnologias e temas

Python · JavaScript · TypeScript · React · Electron · Vite · Go · Node.js · Web Workers · HTML · CSS · SQLite · Docker · Nginx · Tesseract.js · jsPDF · Supabase · agentes de IA · APIs de modelos de IA · automação para Windows · bots para Discord · testes automatizados

## Perfil

[GitHub: ppalvesp](https://github.com/ppalvesp)

## Site de apresentação

O site deste portfólio usa React e Vite. A interface combina uma direção visual editorial em tema escuro, layouts responsivos e componentes acessíveis. Para executá-lo localmente, instale as dependências com `npm ci` e inicie o servidor com `npm run dev`. Para gerar os arquivos de publicação, use `npm run build`.

Use “Conhecer projeto” para abrir recursos, tecnologias e desafios. A janela pode ser fechada pelo botão “Fechar” ou pela tecla Esc. Os filtros Web, IA, Automação, Discord e Windows se aplicam à lista de outros projetos; a calculadora fica sempre em destaque. O menu indica a seção atual durante a rolagem.

Os detalhes incluem uma galeria de capturas reais da calculadora, da IDE e do otimizador. As legendas identificam telas sem eventos ou sem backend; não são demonstrações em execução. Projetos sem uma captura segura disponível mostram a limitação explicitamente.

Para atualizar as capturas automaticamente no Windows, use `npm run capture:previews`, com Chrome instalado, a calculadora local em `http://127.0.0.1:8180` e as pastas `agent-ide` e `otimizador-windows` ao lado deste repositório. A captura da calculadora usa um navegador novo no modo visitante; a IDE usa um arquivo temporário vazio e não lê conversas; o otimizador serve apenas a tela de acesso, sem iniciar seu backend nem alterar o PC. Revise as imagens antes de publicar.

`npm test` verifica as interações no desktop e no celular usando Playwright com Google Chrome instalado. O servidor temporário dos testes usa a porta 4174, sem alterar o site no Docker.

### Docker no Ubuntu (WSL)

A cópia para execução fica em `~/projetos/portfolio-projetos`. Nessa pasta, rode `docker compose up -d --build` e abra http://localhost:8085. O acesso fica restrito ao computador local.

Para parar apenas este site, rode `docker compose down` nessa mesma pasta. Os arquivos servidos são gerados no build da imagem; após atualizar o código, repita `docker compose up -d --build`.