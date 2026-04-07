import React, { useState, useEffect } from 'react';
import './App.css';
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaDatabase,
  FaCode,
  FaTerminal
} from 'react-icons/fa';
import { SiPython, SiPandas, SiScikitlearn, SiOpencv, SiReact, SiTypescript } from 'react-icons/si';

import { useInView } from 'react-intersection-observer';
import Terminal from './components/Terminal';
import SkillChart from './components/SkillChart';

const useCountUpAnim = (end, duration, inView) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (inView && end > 0) {
      let start = 0;
      const stepTime = Math.max(16, Math.floor((duration * 1000) / end));
      const timer = setInterval(() => {
        start += 1;
        setCount(prev => (prev < end ? start : end));
        if (start >= end) clearInterval(timer);
      }, stepTime);
      return () => clearInterval(timer);
    }
  }, [inView, end, duration]);
  return count;
};

function App() {
  const [activeSection, setActiveSection] = useState('home');

  const { ref: statsRef, inView: statsInView } = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  const pipelinesCount = useCountUpAnim(14, 3, statsInView);
  const yearsExpCount = useCountUpAnim(2, 2, statsInView);
  const modelsCount = useCountUpAnim(45, 4, statsInView);
  const scriptsCount = useCountUpAnim(100, 3, statsInView);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'experience', 'skills', 'portfolio', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element &&
          element.offsetTop <= scrollPosition &&
          (element.offsetTop + element.offsetHeight) > scrollPosition) {
          setActiveSection(section);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <a href="#home" className="logo">CNS<span style={{ color: 'var(--text-main)' }}>.io</span></a>

        <nav className="nav-links">
          {['home', 'about', 'experience', 'skills', 'portfolio', 'contact'].map((item) => (
            <a
              key={item}
              href={`#${item}`}
              className={`nav-link ${activeSection === item ? 'active' : ''}`}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </a>
          ))}
        </nav>
      </header>

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <section id="home" className="hero" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'center' }}>
          <div className='box'>
            <p className="hero-subtitle">~$ whoami</p>
            <h1 className="hero-title">
              Carolina <span>Silva</span>
            </h1>
            <p className="hero-desc">
              Cientista de Dados Júnior com formação em Desenvolvimento de Software e MBA em
              andamento em Ciência de Dados e Analytics. Focada em análise de dados biomédicos e automação de pipelines
              científicos utilizando Python, SQL e Machine Learning. Combina lógica de programação
              com estatística aplicada para transformar dados complexos em insights para tomada de
              decisão.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <a href="#portfolio" className="btn">
                <FaCode /> Ver Projetos
              </a>
              <a href="/Carolina_Nascimento_Analista_Dados_Junior.pdf" download className="btn" style={{ borderColor: 'var(--text-muted)', color: 'var(--text-main)' }}>
                Download CV
              </a>
            </div>
          </div>
          <div>
            <Terminal />
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="about">
          <h2 className="section-title"><span>01.</span> Sobre Mim</h2>
          <div className="about-content">
            <div className="about-text">
              <p>
                Tenho interesse em explorar dados, identificar padrões e transformar informações complexas em algo claro e útil. Gosto do processo investigativo da Ciência de Dados — entender o problema, explorar os dados e construir soluções que apoiem decisões.
              </p>
              <p>
                Atuo com análise de dados biomédicos, processamento de imagens científicas e desenvolvimento de pipelines para análise automatizada, utilizando principalmente Python, Pandas e técnicas de Machine Learning. Meu trabalho envolve desde a preparação e exploração dos dados até a modelagem e interpretação dos resultados.
              </p>
              <p>
                Minha formação em desenvolvimento de software trouxe uma visão estruturada para resolver problemas e construir soluções eficientes, organizadas e reprodutíveis. Hoje, busco unir essa base técnica com análise de dados e aprendizado de máquina para desenvolver soluções que gerem impacto real.
              </p>
              <p>
                Estou sempre aprendendo, desenvolvendo projetos e explorando novas ferramentas para evoluir como Cientista de Dados.
              </p>
            </div>

            <div className="about-stats" ref={statsRef}>
              <div className="stat-item">
                <FaDatabase size={24} color="var(--accent-cyan)" style={{ marginBottom: '1rem' }} />
                <h3 className="stat-title">Pipelines Desenvolvidos</h3>
                <p style={{ fontSize: '2.5rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)' }}>
                  {pipelinesCount}+
                </p>
              </div>
              <div className="stat-item">
                <FaTerminal size={24} color="var(--accent-green)" style={{ marginBottom: '1rem' }} />
                <h3 className="stat-title">Anos de Experiência</h3>
                <p style={{ fontSize: '2.5rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-green)' }}>
                  {yearsExpCount}+
                </p>
              </div>
              <div className="stat-item">
                <SiScikitlearn size={24} color="var(--text-muted)" style={{ marginBottom: '1rem' }} />
                <h3 className="stat-title">Modelos Analisados</h3>
                <p style={{ fontSize: '2.5rem', fontFamily: 'var(--font-mono)' }}>
                  {modelsCount}+
                </p>
              </div>
              <div className="stat-item">
                <SiPython size={24} color="var(--text-muted)" style={{ marginBottom: '1rem' }} />
                <h3 className="stat-title">Scripts Python</h3>
                <p style={{ fontSize: '2.5rem', fontFamily: 'var(--font-mono)' }}>
                  {scriptsCount}+
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="experience">
          <h2 className="section-title"><span>02.</span> Experiência</h2>
          <div className="experience-list">
            <div className="experience-card">
              <div className="exp-header">
                <div>
                  <h3 className="exp-title">Cientista de Dados Júnior</h3>
                  <span className="exp-company">Instituto do Coração (InCor HCFMUSP)</span>
                </div>
                <span className="exp-date">Fev 2025 - Presente</span>
              </div>
              <ul className="exp-desc">
                <li>
                  <span className="exp-summary">Desenvolvimento de pipelines ETL em Python para integração de dados biomédicos (imagens e tabulares).</span>
                  <div className="exp-details">
                    Projetei e implementei arquiteturas de pipelines de dados escaláveis, processando e cruzando grandes volumes de informações médicas. Isso unificou bases desestruturadas e garantiu a consistência necessária para a condução ágil dos estudos clínicos e da pesquisa.
                  </div>
                </li>
                <li>
                  <span className="exp-summary">Aplicação de modelos estatísticos e algoritmos de ML em Python (Scikit-learn, Pandas, NumPy) para extração de padrões clínicos.</span>
                  <div className="exp-details">
                    Fui responsável por desenvolver, treinar e validar modelos preditivos voltados à saúde. Liderei a engenharia de features, otimizando o diagnóstico e identificando biomarcadores críticos que trouxeram alto rigor científico e confiabilidade às entregas.
                  </div>
                </li>
                <li>
                  <span className="exp-summary">Automação de rotinas de análise reduzindo drasticamente o tempo manual da equipe de pesquisa.</span>
                  <div className="exp-details">
                    Substituí fluxos altamente dependentes de análise manual por scripts automatizados de ponta a ponta. Isso liberou pesquisadores e médicos para focarem na interpretação dos resultados, impulsionando a produtividade e a escala do laboratório.
                  </div>
                </li>
              </ul>
            </div>

            <div className="experience-card">
              <div className="exp-header">
                <div>
                  <h3 className="exp-title">Desenvolvedora de Sistemas (Pesquisa Científica)</h3>
                  <span className="exp-company">Instituto do Coração (InCor HCFMUSP)</span>
                </div>
                <span className="exp-date">Abr 2023 - Jan 2025</span>
              </div>
              <ul className="exp-desc">
                <li>
                  <span className="exp-summary">Desenvolvimento full-stack de plataformas web para o gerenciamento de dados de ensaios clínicos experimentais.</span>
                  <div className="exp-details">
                    Desempenhei um papel central na construção da arquitetura e das interfaces da aplicação web, elaborando um sistema robusto, seguro e padronizado. A plataforma se tornou o eixo principal em coleta e armazenamento de dados para os experimentos do instituto.
                  </div>
                </li>
                <li>
                  <span className="exp-summary">Criação de dashboards interativos facilitando o rastreamento e análise de métricas de pesquisa.</span>
                  <div className="exp-details">
                    Concebi painéis visuais amigáveis que traduziam o grande volume de dados experimentais em indicadores de fácil interpretação. Isso ajudou gestores na tomada de decisão rápida e acompanhamento dos protocolos em curso de forma integrada.
                  </div>
                </li>
                <li>
                  <span className="exp-summary">Comunicação inter-disciplinar diária com médicos e biomédicos na tradução de necessidades lógicas complexas.</span>
                  <div className="exp-details">
                    Atuei como a principal ponte entre a tecnologia e a medicina. Assimilei as restrições e objetivos do ambiente hospitalar para extrair requisitos altamente específicos, garantindo que o software trouxesse agilidade e simplificasse a rotina de pesquisa biológica.
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="skills">
          <h2 className="section-title"><span>03.</span> Tech Skills</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', alignItems: 'center' }}>

            <div className="skills-grid">
              <div className="skill-category">
                <h3 className="skill-category-title"><FaDatabase /> Data & ML</h3>
                <div className="skill-list">
                  <span className="skill-tag">Python</span>
                  <span className="skill-tag">SQL</span>
                  <span className="skill-tag">Pandas</span>
                  <span className="skill-tag">NumPy</span>
                  <span className="skill-tag">Scikit-learn</span>
                  <span className="skill-tag">OpenCV</span>
                  <span className="skill-tag">ETL</span>
                </div>
              </div>

              <div className="skill-category">
                <h3 className="skill-category-title"><FaCode /> Software Dev</h3>
                <div className="skill-list">
                  <span className="skill-tag">TypeScript</span>
                  <span className="skill-tag">React</span>
                  <span className="skill-tag">HTML/CSS</span>
                  <span className="skill-tag">APIs REST</span>
                  <span className="skill-tag">MongoDB</span>
                  <span className="skill-tag">Git</span>
                  <span className="skill-tag">Linux</span>
                </div>
              </div>
            </div>

            <div style={{ width: '1000px', background: 'var(--bg-card)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--glass-border)' }}>
              <h3 className="skill-category-title" style={{ justifyContent: 'center', marginBottom: '0' }}>Radar de Proficiências</h3>
              <SkillChart />
            </div>

          </div>
        </section>

        {/* Portfolio Section */}
        <section id="portfolio" className="portfolio">
          <h2 className="section-title"><span>04.</span> Portfólio</h2>
          <div className="portfolio-grid">
            <div className="project-card">
              <div className="project-img-placeholder">
                &lt; Bookshifter /&gt;
              </div>
              <div className="project-content">
                <h3 className="project-title">Bookshifter (Sistema de Recomendação)</h3>
                <p className="project-desc">
                  Aplicação web para doação e troca de livros integrando um sistema de
                  recomendação baseado em idioma, gênero e autor usando Python.
                </p>
                <div className="project-tech">
                  <span>React</span> • <span>Python</span> • <span>Firebase</span>
                </div>
              </div>
            </div>

            <div className="project-card">
              <div className="project-img-placeholder">
                [ OpenCV_Segmentation_Model ]
              </div>
              <div className="project-content">
                <h3 className="project-title">Análise de Imagens Médicas (InCor)</h3>
                <p className="project-desc">
                  Pipeline computacional para segmentação e extração de características
                  de fibras de colágeno (SHG), auxiliando a análise estatística biomédica.
                </p>
                <div className="project-tech">
                  <span>Python</span> • <span>OpenCV</span> • <span>Scikit-image</span>
                </div>
              </div>
            </div>

            <div className="project-card">
              <div className="project-img-placeholder">
                &lt; Bookshifter /&gt;
              </div>
              <div className="project-content">
                <h3 className="project-title">Bookshifter (Sistema de Recomendação)</h3>
                <p className="project-desc">
                  Aplicação web para doação e troca de livros integrando um sistema de
                  recomendação baseado em idioma, gênero e autor usando Python.
                </p>
                <div className="project-tech">
                  <span>React</span> • <span>Python</span> • <span>Firebase</span>
                </div>
              </div>
            </div>

            <div className="project-card">
              <div className="project-img-placeholder">
                &lt; Bookshifter /&gt;
              </div>
              <div className="project-content">
                <h3 className="project-title">Bookshifter (Sistema de Recomendação)</h3>
                <p className="project-desc">
                  Aplicação web para doação e troca de livros integrando um sistema de
                  recomendação baseado em idioma, gênero e autor usando Python.
                </p>
                <div className="project-tech">
                  <span>React</span> • <span>Python</span> • <span>Firebase</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="contact">
          <h2 className="section-title" style={{ justifyContent: 'center' }}><span>05.</span> Contato</h2>
          <p className="contact-text">
            No momento estou aberta a novas oportunidades como Cientista de Dados Júnior ou posições
            relacionadas a Engenharia de Dados. Sinta-se à vontade para enviar uma mensagem!
          </p>
          <a href="mailto:nascimento.carolina202@gmail.com" className="btn">
            <FaEnvelope /> Diga Olá
          </a>

          <div className="social-links">
            <a href="https://github.com/Carolina-Silva" target="_blank" rel="noreferrer" className="social-icon">
              <FaGithub />
            </a>
            <a href="https://linkedin.com/in/carolina-silva01" target="_blank" rel="noreferrer" className="social-icon">
              <FaLinkedin />
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>Desenvolvido com React & CSS Puro por Carolina Silva © {new Date().getFullYear()}</p>
        <p style={{ marginTop: '0.5rem', opacity: 0.5, fontSize: '0.8rem' }}>Focado em Ciência de Dados e Performance</p>
      </footer>
    </div>
  );
}

export default App;
