import { useEffect, useRef, useState } from "react";

const previewUrl = path => `${import.meta.env.BASE_URL}${path}`;

const projects = [
  {
    number: "02",
    category: "FERRAMENTA DE DESENVOLVIMENTO",
    title: "Agente de desenvolvimento com IA",
    description:
      "Agente coordenador reutilizável que encaminha tarefas delimitadas a especialistas, integra os resultados e segue as instruções do projeto.",
    technologies: ["JavaScript", "GitHub Copilot", "Avaliações automatizadas"],
    areas: ["IA"],
    features: ["Coordenação e delegação entre especialistas", "Regras e decisões reutilizáveis entre projetos", "Avaliações para verificar consistência"],
    challenge: "Reutilizar práticas de trabalho sem misturar regras, tecnologias ou decisões específicas de projetos diferentes.",
    status: "Em desenvolvimento · Código-fonte privado",
    previewNote: "Este agente é usado dentro do VS Code e não possui uma interface própria para capturar.",
  },
  {
    number: "03",
    category: "VISUALIZAÇÃO DE AGENTES",
    title: "IDE de visualização de agentes",
    description:
      "Monitor local que representa agentes de IA como redes animadas e acompanha delegações e retornos observados numa sessão autorizada.",
    technologies: ["JavaScript", "Node.js", "Canvas"],
    areas: ["Web", "IA"],
    features: ["Redes animadas de agentes", "Acompanhamento de delegações e retornos", "Estados e ferramentas quando disponíveis na sessão"],
    challenge: "Representar a atividade observada na sessão sem apresentar animações como evidência de trabalho real.",
    status: "Protótipo funcional · Código-fonte privado",
    previews: [
      {
        src: previewUrl("previews/agent-ide-demo.gif"),
        alt: "Demonstração 3D de agentes de desenvolvimento conectados por fluxos animados.",
        caption: "Demonstração visual com dados simulados; os estados e fluxos não representam atividade real de uma sessão.",
        width: 1024,
        height: 768,
      },
      {
        src: previewUrl("previews/agent-ide.png"),
        alt: "Interface do monitor de agentes com lista, área de visualização e inspetor.",
        caption: "Interface real sem eventos carregados. Nenhuma conversa ou atividade privada foi capturada.",
      },
    ],
  },
  {
    number: "04",
    category: "AUTOMAÇÃO PARA WINDOWS",
    title: "Otimizador de Windows",
    description:
      "Ferramenta para investigar problemas de desempenho e preparar propostas de ajustes reversíveis, sempre com revisão e aprovação humana.",
    technologies: ["Python", "APIs de IA", "Testes automatizados"],
    areas: ["IA", "Automação"],
    features: ["Investigação de desempenho", "Propostas de ajustes reversíveis", "Revisão e aprovação humana antes de alterações"],
    challenge: "Preparar ajustes reversíveis sem aplicar mudanças no computador antes da revisão humana.",
    status: "Em desenvolvimento · Código-fonte privado",
    previews: [
      {
        src: previewUrl("previews/optimizer.png"),
        alt: "Tela de acesso local do otimizador, com navegação e aviso de acesso restrito.",
        caption: "Tela real de acesso restrito, sem backend conectado. Nenhum diagnóstico ou ajuste foi executado.",
      },
    ],
  },
  {
    number: "05",
    category: "COMUNIDADE · DISCORD",
    title: "Bot de acompanhamento",
    description:
      "Bot que ajuda a organizar um processo probatório: registra participantes, acompanha etapas, documenta avaliações e envia lembretes.",
    technologies: ["TypeScript", "SQLite", "Docker"],
    areas: ["Automação", "Discord"],
    features: ["Registro de participantes", "Acompanhamento de etapas e avaliações", "Envio de lembretes"],
    challenge: "Organizar o acompanhamento dos participantes e manter o registro das etapas e avaliações.",
    status: "Projeto pessoal · Código-fonte privado",
    previewNote: "Ainda não há uma captura de uma conversa de teste do bot sem dados da comunidade.",
  },
  {
    number: "06",
    category: "PRIMEIROS PASSOS NA WEB",
    title: "Portfólio pessoal",
    description: "Projeto de estudo em HTML e CSS, com páginas de apresentação pessoal e currículo.",
    technologies: ["HTML", "CSS"],
    areas: ["Web"],
    features: ["Páginas de apresentação pessoal", "Currículo", "Código disponível em repositório público"],
    challenge: "Explorar a construção de páginas de apresentação com HTML e CSS.",
    repository: "https://github.com/ppalvesp/primeiro-projeto-em-html-css",
    previewNote: "A cópia local deste projeto não está disponível para captura. O repositório público pode ser consultado abaixo.",
  },
  {
    number: "07",
    category: "APP WINDOWS · TREINO DE MIRA",
    title: "Aim Log",
    description:
      "Aplicativo desktop para organizar treinos de mira, acompanhar benchmarks e consultar a evolução das habilidades no KovaaK's.",
    technologies: ["JavaScript", "React", "Electron"],
    areas: ["Windows"],
    features: ["Rotina de treino e benchmarks guiados", "Registro local de sessões e resultados", "Distribuição de instaladores e atualizações para Windows"],
    challenge: "Organizar sessões de treino e benchmarks sem perder o histórico local e sem confundir resultados de modos diferentes.",
    status: "Aplicativo Windows · Código-fonte privado",
    repository: "https://github.com/ppalvesp/aim-progress-app",
    previewNote: "A distribuição pública contém instaladores e metadados; o código-fonte não é publicado.",
  },
  {
    number: "08",
    category: "AUTOMAÇÃO · PREPARAÇÃO DO WINDOWS",
    title: "Script de preparação pós-formatação",
    description:
      "Projeto para agilizar a configuração do computador e a instalação de aplicativos depois de formatar o Windows.",
    technologies: ["Windows", "Automação"],
    areas: ["Windows", "Automação"],
    features: ["Preparação inicial do computador após a formatação", "Automatização de tarefas repetitivas de configuração"],
    challenge: "Reduzir o trabalho manual para deixar o computador pronto para uso após uma instalação limpa.",
    status: "Projeto pessoal · Código-fonte privado",
    previewNote: "O repositório é privado e não possui uma captura pública do script.",
  },
];

const calculatorTechnologies = [
  "React 18",
  "TypeScript",
  "Vite",
  "Node.js",
  "Go",
  "Web Workers",
  "Tesseract.js",
  "jsPDF",
  "Supabase · protótipo A+",
  "Docker",
  "Nginx",
];

const calculatorProject = {
  title: "Calculadora de HP efetivo",
  category: "BLACK DESERT ONLINE · PvP",
  description: "Análise de dano, sobrevivência e melhorias de equipamento para guerras de larga escala em Black Desert Online.",
  technologies: calculatorTechnologies,
  features: [
    "Montagem de equipamento, cristais, consumíveis e buffs",
    "Busca de builds sugeridas para diferentes estilos de jogo",
    "Curvas de dano e sobrevivência por classe",
    "Guia de upgrade considerando desempenho e custo",
    "Leitura de prints com OCR e exportação em PDF",
    "Cálculos em Web Workers e resultados guardados no navegador",
  ],
  challenge: "Manter os cálculos compatíveis com os dados do jogo e executar buscas de builds sem bloquear a interface.",
  status: "Em desenvolvimento · Código-fonte privado",
  previews: [
    {
      src: previewUrl("previews/calculator-builder.png"),
      alt: "Tela Montar build da calculadora com estilos, equipamentos e resumo de status.",
      caption: "Montar build — captura real no modo visitante, com o estado inicial da aplicação.",
    },
    {
      src: previewUrl("previews/calculator-combat.png"),
      alt: "Calculadora de combate mostrando os campos do atacante e defensor e o resultado de HP efetivo.",
      caption: "Calculadora — dano, HP efetivo e comparação de defesas com os valores iniciais da aplicação.",
    },
  ],
};

const navigation = [
  { id: "projeto-principal", label: "Destaque" },
  { id: "projetos", label: "Projetos" },
  { id: "sobre", label: "Sobre" },
];

function useActiveSection() {
  const [activeSection, setActiveSection] = useState("inicio");
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const sections = ["inicio", ...navigation.map(item => item.id)];
      const current = sections.findLast(id => document.getElementById(id).getBoundingClientRect().top <= window.innerHeight * 0.35);
      const atBottom = window.scrollY > 0 && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
      setActiveSection(atBottom ? "sobre" : current ?? "inicio");
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);
  return activeSection;
}

function useScrollReveal() {
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -32px 0px" },
    );

    document.querySelectorAll("[data-reveal]").forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);
}

function useSmoothAnchorNavigation() {
  useEffect(() => {
    let frame = 0;
    let startTime = 0;

    const stopAnimation = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
    };

    const animateTo = (target, hash) => {
      stopAnimation();
      const start = window.scrollY;
      const scrollPadding = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
      const destination = Math.max(0, target.getBoundingClientRect().top + start - scrollPadding);
      const distance = destination - start;
      startTime = 0;
      window.history.pushState(null, "", hash);

      const step = timestamp => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / 850, 1);
        const eased = progress < 0.5
          ? 4 * progress ** 3
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;
        window.scrollTo({ top: start + distance * eased, behavior: "instant" });

        if (progress < 1) frame = requestAnimationFrame(step);
        else frame = 0;
      };

      frame = requestAnimationFrame(step);
    };

    const handleClick = event => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const link = event.target instanceof Element ? event.target.closest('a[href^="#"]') : null;
      if (!link || link.classList.contains("skip-link")) return;

      const hash = link.getAttribute("href");
      const target = document.getElementById(hash.slice(1));
      if (!target) return;

      event.preventDefault();
      animateTo(target, hash);
    };

    const stopOnInput = () => stopAnimation();
    document.addEventListener("click", handleClick);
    window.addEventListener("wheel", stopOnInput, { passive: true });
    window.addEventListener("touchstart", stopOnInput, { passive: true });
    return () => {
      document.removeEventListener("click", handleClick);
      window.removeEventListener("wheel", stopOnInput);
      window.removeEventListener("touchstart", stopOnInput);
      stopAnimation();
    };
  }, []);
}

function ProjectGallery({ project }) {
  const [index, setIndex] = useState(0);
  const [imageFailed, setImageFailed] = useState(false);
  if (!project.previews?.length) {
    return (
      <section className="project-gallery" aria-label="Prévia visual">
        <h3>Prévia visual</h3>
        <p>{project.previewNote}</p>
      </section>
    );
  }
  const preview = project.previews[index];
  return (
    <section className="project-gallery" aria-label="Capturas reais do projeto">
      <h3>Prévia do projeto</h3>
      <figure>
        {imageFailed ? (
          <p role="alert">Não foi possível carregar esta captura. Recarregue a página para tentar novamente.</p>
        ) : (
          <a href={preview.src} target="_blank" rel="noopener noreferrer" aria-label="Abrir captura em tamanho original">
            <img
              src={preview.src}
              alt={preview.alt}
              width={preview.width ?? 1440}
              height={preview.height ?? 1000}
              onError={() => setImageFailed(true)}
            />
          </a>
        )}
        <figcaption aria-live="polite">{preview.caption}</figcaption>
      </figure>
      {project.previews.length > 1 && (
        <div className="gallery-controls" role="group" aria-label="Escolher captura">
          {project.previews.map((image, imageIndex) => (
            <button
              type="button"
              key={image.src}
              aria-pressed={index === imageIndex}
              onClick={() => {
                setIndex(imageIndex);
                setImageFailed(false);
              }}
            >
              Captura {imageIndex + 1}
            </button>
          ))}
        </div>
      )}
      <p className="gallery-hint">Clique na imagem para abrir em tamanho original.</p>
    </section>
  );
}

function ProjectDetails({ project, onDismiss }) {
  const dialogRef = useRef(null);
  const closeTimerRef = useRef(0);
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    dialog.showModal();
    document.documentElement.classList.add("has-project-dialog");
    const frame = requestAnimationFrame(() => setVisible(true));
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(closeTimerRef.current);
      if (dialog.open) dialog.close();
      document.documentElement.classList.remove("has-project-dialog");
    };
  }, []);

  function dismiss() {
    if (closing || closeTimerRef.current) return;
    setClosing(true);
    closeTimerRef.current = window.setTimeout(onDismiss, 270);
  }

  return (
    <dialog
      ref={dialogRef}
      className={`project-dialog${visible ? " is-visible" : ""}${closing ? " is-closing" : ""}`}
      aria-labelledby="dialog-title"
      onCancel={event => {
        event.preventDefault();
        dismiss();
      }}
    >
      <div className="dialog-heading">
        <p className="eyebrow">{project.category}</p>
        <button type="button" className="dialog-close" onClick={dismiss} autoFocus>
          Fechar <span aria-hidden="true">×</span>
        </button>
      </div>
      <h2 id="dialog-title">{project.title}</h2>
      <p className="dialog-description">{project.description}</p>
      <ProjectGallery project={project} />
      <h3>Recursos</h3>
      <ul className="dialog-features">
        {project.features.map(feature => <li key={feature}>{feature}</li>)}
      </ul>
      <h3>Desafio do projeto</h3>
      <p>{project.challenge}</p>
      <h3>Tecnologias</h3>
      <TechnologyTags technologies={project.technologies} />
      {project.repository ? (
        <a className="card-link" href={project.repository} target="_blank" rel="noopener noreferrer">
          Ver repositório público <span aria-hidden="true">↗</span>
        </a>
      ) : (
        <p className="project-status">{project.status}</p>
      )}
    </dialog>
  );
}

function TechnologyTags({ technologies, label = "Tecnologias" }) {
  return (
    <ul className="technology-list" aria-label={label}>
      {technologies.map(technology => (
        <li key={technology}>{technology}</li>
      ))}
    </ul>
  );
}

function ProjectCard({ project, onOpen }) {
  return (
    <article className="project-card">
      <div className="card-heading">
        <span className="card-number">{project.number}</span>
      </div>
      <p className="card-category">{project.category}</p>
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <TechnologyTags technologies={project.technologies} />
      <button
        type="button"
        className="project-details-button"
        aria-haspopup="dialog"
        aria-label={`Conhecer projeto: ${project.title}`}
        onClick={event => onOpen(project, event.currentTarget)}
      >
        Conhecer projeto <span aria-hidden="true">↗</span>
      </button>
      {project.repository ? (
        <a className="card-link" href={project.repository} target="_blank" rel="noopener noreferrer">
          Ver repositório <span aria-hidden="true">↗</span>
        </a>
      ) : (
        <p className="project-status">
          <span className="status-dot" aria-hidden="true" />
          {project.status}
        </p>
      )}
    </article>
  );
}

function HeroArtwork() {
  return (
    <div className="hero-art" aria-hidden="true">
      <div className="art-grid" />
      <div className="art-panel panel-main">
        <span className="panel-label">PRODUTO</span>
        <strong>IDEIA</strong>
        <span className="panel-arrow">→</span>
        <strong>FERRAMENTA</strong>
      </div>
      <div className="art-panel panel-small panel-top">
        <span>WEB</span>
        <b>01</b>
      </div>
      <div className="art-panel panel-small panel-bottom">
        <span>IA</span>
        <b>02</b>
      </div>
      <div className="art-stamp">
        <span>PP</span>
        <small>DEV</small>
      </div>
    </div>
  );
}

function FeaturedProject({ onOpen }) {
  return (
    <section className="featured-section" id="projeto-principal" aria-labelledby="featured-title" data-reveal>
      <div className="page-wrap">
        <div className="section-kicker">
          <span>01 — PROJETO EM DESTAQUE</span>
          <span className="kicker-rule" aria-hidden="true" />
          <span>BLACK DESERT ONLINE</span>
        </div>
        <article className="featured-card">
          <div className="featured-copy">
            <p className="eyebrow">ANÁLISE DE BUILDS · PvP</p>
            <h2 id="featured-title">
              Calculadora para
              <br />
              <em>HP efetivo</em>
            </h2>
            <p>
              Uma ferramenta especializada para comparar dano e sobrevivência em guerras de larga escala.
              Ela organiza os dados da build e ajuda a planejar melhorias de equipamento sem perder de vista desempenho e custo.
            </p>
            <ul className="feature-list" aria-label="Principais recursos">
              <li>Builds sugeridas</li>
              <li>Curva de dano e sobrevivência</li>
              <li>Guia de upgrade</li>
            </ul>
            <TechnologyTags technologies={calculatorTechnologies} />
            <button
              type="button"
              className="project-details-button"
              aria-haspopup="dialog"
              aria-label="Conhecer projeto: Calculadora de HP efetivo"
              onClick={event => onOpen(calculatorProject, event.currentTarget)}
            >
              Conhecer projeto <span aria-hidden="true">↗</span>
            </button>
            <p className="project-status">
              <span className="status-dot" aria-hidden="true" />
              Em desenvolvimento · Código-fonte privado
            </p>
          </div>
          <div className="featured-visual" aria-hidden="true">
            <div className="calc-window-bar">
              <span className="calc-app-icon">◇</span>
              <span>CALCULADORA DE HP EFETIVO</span>
              <span className="calc-game-tag">BDO / PvP</span>
            </div>
            <div className="calc-dashboard">
              <div className="calc-defender">
                <p className="calc-panel-label"><i /> DEFENSOR</p>
                <div className="calc-stat-row">
                  <span>DR</span>
                  <strong>850</strong>
                  <span className="calc-stat-track"><i className="stat-dr" /></span>
                </div>
                <div className="calc-stat-row">
                  <span>EVASÃO</span>
                  <strong>1.100</strong>
                  <span className="calc-stat-track"><i className="stat-evasion" /></span>
                </div>
                <div className="calc-stat-row">
                  <span>HP</span>
                  <strong>15.000</strong>
                  <span className="calc-stat-track"><i className="stat-hp" /></span>
                </div>
              </div>
              <div className="calc-result">
                <div className="calc-result-heading">
                  <span>HP EFETIVO</span>
                  <span>BUILD ATUAL</span>
                </div>
                <strong className="calc-result-value">112.500</strong>
                <span className="calc-result-context">7,50× do HP base</span>
                <div className="calc-result-meter"><i /></div>
                <div className="calc-combat-stats">
                  <span>DANO MÉDIO <strong>140</strong></span>
                  <span>CHANCE DE ERRO <strong>0,0%</strong></span>
                </div>
                <div className="calc-upgrade">
                  <span>PRÓXIMOS 10 PONTOS · DR</span>
                  <strong>+5,00% de HP efetivo</strong>
                </div>
              </div>
            </div>
            <div className="calc-window-footer">
              <span><i /> ATACANTE · PA 1.050 · PRECISÃO 1.330</span>
              <span>ANÁLISE PvP</span>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

function App() {
  const [area, setArea] = useState("Todos");
  const [selectedProject, setSelectedProject] = useState(null);
  const openerRef = useRef(null);
  const activeSection = useActiveSection();
  useScrollReveal();
  useSmoothAnchorNavigation();
  const visibleProjects = projects.filter(project => area === "Todos" || project.areas.includes(area));

  function openProject(project, opener) {
    openerRef.current = opener;
    setSelectedProject(project);
  }

  function dismissProject() {
    setSelectedProject(null);
  }

  useEffect(() => {
    if (!selectedProject && openerRef.current?.isConnected) openerRef.current.focus();
  }, [selectedProject]);

  return (
    <>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <header className="site-header">
        <a className="wordmark" href="#inicio" aria-label="Início do portfólio">
          <span className="wordmark-mark" aria-hidden="true">
            P.
          </span>
          <span>
            PPALVESP <span className="wordmark-divider">/</span> PORTFÓLIO
          </span>
        </a>
        <nav className="site-nav" aria-label="Navegação principal">
          {navigation.map(item => (
            <a key={item.id} href={`#${item.id}`} aria-current={activeSection === item.id ? "location" : undefined}>
              {item.label}
            </a>
          ))}
        </nav>
        <a className="header-link" href="https://github.com/ppalvesp" target="_blank" rel="noopener noreferrer">
          GitHub <span aria-hidden="true">↗</span>
        </a>
      </header>

      <main id="conteudo">
        <section className="hero page-wrap" id="inicio" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="status-dot" aria-hidden="true" />
              DESENVOLVIMENTO / AUTOMAÇÃO / IA
            </p>
            <h1 id="hero-title">
              Curiosidade vira
              <br />
              <em>código.</em> Código vira
              <br />
              ferramentas.
            </h1>
            <p className="hero-description">
              Um portfólio de projetos práticos em web, automação e inteligência artificial —
              construídos para aprender, experimentar e resolver problemas reais.
            </p>
            <a className="text-link" href="#projetos">
              Explorar projetos <span aria-hidden="true">↓</span>
            </a>
          </div>
          <HeroArtwork />
          <div className="hero-index">
            <span>01</span>
            <span className="index-line" aria-hidden="true" />
            <span>PORTFÓLIO</span>
          </div>
        </section>

        <FeaturedProject onOpen={openProject} />

        <section className="projects-section page-wrap" id="projetos" aria-labelledby="projects-title" data-reveal>
          <div className="section-heading">
            <div>
              <p className="eyebrow">LABORATÓRIO DE IDEIAS</p>
              <h2 id="projects-title">
                Projetos em<span className="gold-dot"> construção.</span>
              </h2>
            </div>
            <p>Experimentação em diferentes áreas, do desenvolvimento web à coordenação de agentes de IA.</p>
          </div>
          <div className="project-filters" role="group" aria-label="Filtrar outros projetos por área">
            {["Todos", "Web", "IA", "Automação", "Discord", "Windows"].map(filter => (
              <button key={filter} type="button" aria-pressed={area === filter} onClick={() => setArea(filter)}>
                {filter}
              </button>
            ))}
          </div>
          <p className="filter-summary" role="status">
            {visibleProjects.length} {visibleProjects.length === 1 ? "projeto" : "projetos"}
            {area === "Todos" ? " em todas as áreas" : ` na área ${area}`}. A calculadora permanece em destaque acima.
          </p>
          <div className="project-grid">
            {visibleProjects.map(project => (
              <ProjectCard key={project.number} project={project} onOpen={openProject} />
            ))}
          </div>
        </section>

        <section className="about-section" id="sobre" aria-labelledby="about-title" data-reveal>
          <div className="page-wrap about-inner">
            <p className="eyebrow">SOBRE ESTE ESPAÇO</p>
            <div className="about-copy">
              <h2 id="about-title">
                Construir para aprender.
                <br />
                Aprender para <em>construir melhor.</em>
              </h2>
              <div>
                <p>
                  Este portfólio reúne projetos pessoais que atravessam desenvolvimento web, automação e inteligência artificial.
                  A seleção mostra o problema, as decisões técnicas e o estágio real de cada trabalho — sem fingir que protótipos
                  ou ferramentas privadas são produtos publicados.
                </p>
                <a className="text-link" href="https://github.com/ppalvesp" target="_blank" rel="noopener noreferrer">
                  Acompanhe no GitHub <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer page-wrap">
        <a className="wordmark" href="#inicio">
          <span className="wordmark-mark" aria-hidden="true">
            P.
          </span>
          <span>PPALVESP</span>
        </a>
        <p>Feito com curiosidade e vontade de aprender.</p>
        <a href="https://github.com/ppalvesp" target="_blank" rel="noopener noreferrer">
          GitHub <span aria-hidden="true">↗</span>
        </a>
        <span className="footer-year">PORTFÓLIO · {new Date().getFullYear()}</span>
      </footer>
      {selectedProject && <ProjectDetails project={selectedProject} onDismiss={dismissProject} />}
    </>
  );
}

export default App;
