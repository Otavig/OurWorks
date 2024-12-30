import './App.css'
import { useState, useEffect, useRef } from 'react'
import Swiper from 'swiper';
import { EffectFade, Mousewheel, Pagination } from 'swiper/modules';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // Importando os ícones de seta

function FadeInSection({ children, delay = 0 }) {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setVisible(true);
          }, delay);
        }
      });
    });
    
    const currentElement = domRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [delay]);

  return (
    <div
      className={`fade-in-section ${isVisible ? 'is-visible' : ''}`}
      ref={domRef}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [currentWord, setCurrentWord] = useState('Developer');
  const words = ['Desenvolvedor', 'Cristão','Criativo', 'Inovador'];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isAboutVisible, setIsAboutVisible] = useState(false);
  const aboutRef = useRef(null);
  const mouseGlowRef = useRef(null);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactSubject, setContactSubject] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [activeTech, setActiveTech] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentSkillIndex, setCurrentSkillIndex] = useState(2);
  
  const skillsList = {
    iot: {
      name: "Integrated Solutions with IoT Course",
      duracao: "2 meses (2023)",
      description: "Aprendi como enviar um código C++ para a nuvem para controlar o ESP32.",
    },
    google: {
      name: "Google Cloud Computing",
      duracao: "1 mês (2021)",
      description:
        "Neste curso, aprendi sobre computação em nuvem, gerenciamento de recursos na nuvem, e como utilizar o Google Cloud Platform para hospedar aplicações.",
    },
    ads_senai: {
      name: "Análise e Desenvolvimento de Sistemas",
      duracao: "2 anos (2022 a 2024)",
      description:
        "Desenvolvi habilidades em lógica de programação, React Native, HTML, CSS, JavaScript, Python. Aprendi modelagem de software, Scrum Master, MySQL, e os padrões MVC e MVP, além de Back-End com Node.js.",
    },
    sesi: {
      name: "Ensino Médio Completo - Sesi 423",
      duracao: "Ano completo (Data de conclusão)",
      description:
        "Desenvolvi habilidades em robótica e eletroeletrônica, trabalhando com Raspberry Pi e Arduino, por fazer parte do curso técnico do Sesi.",
    },
    udemy: {
      name: "Cursos da Udemy",
      duracao: "Data de conclusão variada",
      description:
        "Realizei diversos cursos na Udemy, onde aprendi Java, Node, Python, SQL, JavaScript, React Web, Electron, entre outros tópicos essenciais para o desenvolvimento de software.",
    },
  };

  const skillsArray = Object.values(skillsList);

  const nextSkill = () => {
    if (currentSkillIndex < skillsArray.length - 1) {
      setCurrentSkillIndex(currentSkillIndex + 1);
    }
  };

  const prevSkill = () => {
    if (currentSkillIndex > 0) {
      setCurrentSkillIndex(currentSkillIndex - 1);
    }
  };
  
  const techDescriptions = {
    mysql: {
      name: "MySQL",
      description: "Um sistema de gerenciamento de banco de dados relacional de código aberto."
    },
    node: {
      name: "Node.js",
      description: "Um ambiente de execução JavaScript do lado do servidor."
    },
    js: {
      name: "JavaScript",
      description: "Uma linguagem de programação de alto nível, interpretada e orientada a objetos."
    },
    react: {
      name: "React",
      description: "Uma biblioteca JavaScript para construir interfaces de usuário."
    },
    html: {
      name: "HTML",
      description: "Linguagem de marcação utilizada na construção de páginas web."
    },
    css: {
      name: "CSS",
      description: "Linguagem de estilo usada para descrever a apresentação de um documento HTML."
    },
    python: {
      name: "Python",
      description: "Uma linguagem de programação de alto nível, interpretada e de propósito geral."
    },
    java: {
      name: "Java",
      description: "Uma linguagem de programação de alto nível, orientada a objetos, amplamente utilizada para o desenvolvimento de aplicativos móveis, web e empresariais."
    },    
    linux: {
      name: "Linux",
      description: "Um sistema operacional de código aberto baseado em Unix."
    },
    arduino: {
      name: "Arduino",
      description: "Uma plataforma de prototipagem eletrônica de código aberto."
    },
    raspberry: {
      name: "Raspberry Pi",
      description: "Um computador de placa única de baixo custo, amplamente utilizado em projetos de eletrônica e programação."
    }
  };

  useEffect(() => {
    // Desabilita overflow-y no html no início
    document.documentElement.style.overflowY = 'hidden';
  
    // Verifica a preferência do sistema
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDarkMode);
  
    // Aplica o modo escuro se necessário
    if (prefersDarkMode) {
      document.body.classList.add('dark-mode');
    }
  
    // Loading screen timer com progresso
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          // Mantém overflow-y desabilitado até que o carregamento termine
          document.documentElement.style.overflowY = 'hidden';
          clearInterval(interval);
          setTimeout(() => {
            setIsLoading(false);
            // Habilita overflow-y no html após a conclusão do carregamento
            document.documentElement.style.overflowY = 'auto';
          }, 500); // Delay para permitir animação de fade-out
          return 100;
        }
        return prev + 20;
      });
    }, 300);
  
    return () => {
      // Cleanup: garante que overflow-y seja restaurado
      clearInterval(interval);
      document.documentElement.style.overflowY = 'auto';
    };
  }, []);  

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.body.classList.toggle('dark-mode')
    
    // Adiciona efeito de rotação
    const button = document.querySelector('.dark-mode-toggle button')
    button.classList.add('rotate')
    setTimeout(() => button.classList.remove('rotate'), 500)
  }

  useEffect(() => {
    // Smooth scroll function with offset
    const smoothScroll = (target) => {
      const element = document.querySelector(target);
      if (element) {
        const offset = 180; // Adjust this value to change how much higher it scrolls
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    };

    // Add click event listeners to navigation links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        smoothScroll(link.getAttribute('href'));
      });
    });

    // Cleanup function
    return () => {
      links.forEach(link => {
        link.removeEventListener('click', smoothScroll);
      });
    };
  }, []);

  useEffect(() => {
    const type = () => {
      const currentFullWord = words[wordIndex];
      
      if (isDeleting) {
        setCurrentWord(currentFullWord.substring(0, charIndex - 1));
        charIndex--;
      } else {
        setCurrentWord(currentFullWord.substring(0, charIndex + 1));
        charIndex++;
      }

      if (!isDeleting && charIndex === currentFullWord.length) {
        isDeleting = true;
        setTimeout(type, 1000); // Wait before starting to delete
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(type, 200); // Short pause before typing next word
      } else {
        setTimeout(type, isDeleting ? 50 : 100); // Typing speed
      }
    };

    const typeTimer = setTimeout(type, 1000); // Initial delay

    return () => clearTimeout(typeTimer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.pageYOffset > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsAboutVisible(true);
        } else {
          setIsAboutVisible(false);
        }
      });
    }, options);

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => {
      if (aboutRef.current) {
        observer.unobserve(aboutRef.current);
      }
    };
  }, []);

  const scrollToTop = () => {
    const logoElement = document.querySelector('#logo');
    if (logoElement) {
      const yOffset = -20; // 20 pixels above the logo
      const y = logoElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const mouseGlowElement = document.createElement('div');
    mouseGlowElement.classList.add('mouse-glow');
    document.body.appendChild(mouseGlowElement);
    mouseGlowRef.current = mouseGlowElement;

    const handleMouseMove = (e) => {
      mouseGlowElement.style.left = `${e.clientX}px`;
      mouseGlowElement.style.top = `${e.clientY}px`;
    };

    const handleMouseEnter = () => {
      mouseGlowElement.classList.add('active');
    };

    const handleMouseLeave = () => {
      mouseGlowElement.classList.remove('active');
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseenter', handleMouseEnter);
    document.body.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeChild(mouseGlowElement);
    };
  }, []);

  useEffect(() => {
    new Swiper('.blog-slider', {
      spaceBetween: 30,
      effect: 'fade',
      loop: true,
      mousewheel: {
        invert: false,
      },
      pagination: {
        el: '.blog-slider__pagination',
        clickable: true,
      },
      modules: [EffectFade, Mousewheel, Pagination],
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const projectCards = document.querySelectorAll('.project-card');
      projectCards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        const cardBottom = card.getBoundingClientRect().bottom;
        if (cardTop < window.innerHeight && cardBottom > 0) {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = async (e) => {
      e.preventDefault();

      const contactData = {
          nome: contactName,
          email: contactEmail,
          assunto: contactSubject,
          mensagem: contactMessage,
      };

      try {
          const response = await fetch('https://otavig-contato.onrender.com/api/entrar-contato', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(contactData),
          });

          const data = await response.json();

          if (response.ok) {
              alert('Mensagem enviada com sucesso!');
              // Limpar os campos
              setContactName('');
              setContactEmail('');
              setContactSubject('');
              setContactMessage('');
              
              setIsContactModalOpen(false);
          } else {
              alert(`Erro: ${data.message}`);
          }
      } catch (error) {
          console.error('Erro ao enviar mensagem:', error);
          alert('Erro ao enviar a mensagem');
      }
  };

  const openContactModal = () => {
    setIsContactModalOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  };

  const closeContactModal = () => {
    setIsContactModalOpen(false);
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  };

  const handleTechMouseEnter = (techKey) => {
    setActiveTech(techKey);
  };

  const handleTechMouseLeave = () => {
    setActiveTech(null);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      {isLoading && (
        <div className={`loading-screen ${loadingProgress >= 100 ? 'fade-out' : ''}`}>
          <h2>{loadingProgress < 100 ? 'Carregando...' : 'Seja bem-vindo(a)!'}</h2>
          <div className="progress-bar">
            <div className="progress" style={{ width: `${loadingProgress}%` }}></div>
          </div>
        </div>
      )}
      <header>
        <div className="container-fluid">
          <div className="navb-logo" id="logo">
            Otavig
          </div>
          <div className="dark-mode-toggle">
              <button onClick={toggleDarkMode}>
                <i className={`bi ${isDarkMode ? 'bi-sun' : 'bi-moon'}`}></i>
              </button>
            </div>
          <div className="navb-items">
            <div className="item"><a href="#about">Sobre</a></div>
            <div className="item"><a href="#projects">Projetos</a></div>
            <div className="item-button"><a href="#" onClick={(e) => { e.preventDefault(); openContactModal(); }}>Contato</a></div>
          </div>
          <div className="mobile-toggle">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <i className={`bi ${isMobileMenuOpen ? 'bi-x' : 'bi-list'}`}></i>
            </button>
          </div>
          
          {isMobileMenuOpen && (
            <div className="mobile-menu">
              <div className="mobile-menu-item"><a href="#about">Sobre</a></div>
              <div className="mobile-menu-item"><a href="#projects">Projetos</a></div>
              <div className="mobile-menu-item"><a href="#" onClick={(e) => { e.preventDefault(); openContactModal(); }}>Contato</a></div>
            </div>
          )}
          
          {isModalOpen && (
            <div className="modal fade show" style={{display: 'block'}} id="navModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <p>Otávio Garcia</p>
                    <button type="button" className="btn-close" onClick={() => setIsModalOpen(false)} aria-label="Close">
                      <i className="bi bi-x"></i>
                    </button>
                  </div>
                  <div className="modal-body">
                    <div className="modal-line"><i className="bi bi-house"></i><a href="/">Home</a></div>
                    <div className="modal-line"><i className="bi bi-info-circle"></i><a href="/about">About</a></div>
                    <div className="modal-line"><i className="bi bi-filetype-doc"></i><a href="/resume">Resume</a></div>
                    <div className="modal-line"><i className="bi bi-folder-check"></i><a href="/portfolio">Portfolio</a></div>
                    <div className="modal-line"><i className="bi bi-telephone"></i><a href="/contact">Let's Talk</a></div>
                  </div>
                  <div className="mobile-modal-footer">
                    <a target="_blank" href="#"><i className="bi bi-instagram"></i></a>
                    <a target="_blank" href="#"><i className="bi bi-linkedin"></i></a>
                    <a target="_blank" href="#"><i className="bi bi-youtube"></i></a>
                    <a target="_blank" href="#"><i className="bi bi-facebook"></i></a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
      <FadeInSection delay={100}>
        <section className="section-1" id="profile">
          <div className="container-profile">
            <div className="container-profile-text">
              <h1 className="title-profile"><span>Full-Stack</span> {currentWord}</h1>
              <p className="text-profile">Desenvolvedor Web e um entusiasta em tecnologia sendo um Cristão praticante.</p>
              <div className="social-icons">
                <a href="https://www.linkedin.com/in/otavig" target="_blank" rel="noopener noreferrer">
                  <i className="bi bi-linkedin"></i>
                </a>
                <a href="https://github.com/Otavig" target="_blank" rel="noopener noreferrer">
                  <i className="bi bi-github"></i>
                </a>
                <a href="https://www.instagram.com/otavig_/" target="_blank" rel="noopener noreferrer">
                  <i className="bi bi-instagram"></i>
                </a>
              </div>
            </div>
            <div className="container-profile-img">
              <img src="/src/assets/imgs/perfil.png" alt="" />
            </div>
          </div>
        </section>
      </FadeInSection>
      <FadeInSection delay={200}>
        <section className="section-2" id="about" ref={aboutRef} style={{ marginTop: '12%' }}>
          <div className="character-bubble">
            <img src="/src/assets/imgs/extras/icon_paint.png" alt="Person" />
          </div>
          <div className={`container-about-card ${isAboutVisible ? 'fade-in' : 'fade-out'}`}>
            <div className="about-content">
              <div className="tech-stack-container">
                <div className="tech-stack">
                  <div className="tech-row">
                    <div className="tech-item" onMouseEnter={() => handleTechMouseEnter('mysql')} onMouseLeave={handleTechMouseLeave}>
                      <img src="/src/assets/imgs/icons-stack/mysql.png" alt="MySQL" />
                    </div>
                    <div className="tech-item" onMouseEnter={() => handleTechMouseEnter('node')} onMouseLeave={handleTechMouseLeave}>
                      <img src="/src/assets/imgs/icons-stack/node.png" alt="Node.js" />
                    </div>
                    <div className="tech-item" onMouseEnter={() => handleTechMouseEnter('python')} onMouseLeave={handleTechMouseLeave}>
                      <img src="/src/assets/imgs/icons-stack/python.png" alt="Python" />
                    </div>
                    <div className="tech-item" onMouseEnter={() => handleTechMouseEnter('java')} onMouseLeave={handleTechMouseLeave}>
                      <img src="/src/assets/imgs/icons-stack/java.png" alt="Java" />
                    </div>
                  </div>
                  <div className="tech-row">
                    <div className="tech-item" onMouseEnter={() => handleTechMouseEnter('react')} onMouseLeave={handleTechMouseLeave}>
                      <img src="/src/assets/imgs/icons-stack/react.png" alt="React" />
                    </div>
                    <div className="tech-item" onMouseEnter={() => handleTechMouseEnter('js')} onMouseLeave={handleTechMouseLeave}>
                      <img src="/src/assets/imgs/icons-stack/js.png" alt="JavaScript" />
                    </div>
                    <div className="tech-item" onMouseEnter={() => handleTechMouseEnter('html')} onMouseLeave={handleTechMouseLeave}>
                      <img src="/src/assets/imgs/icons-stack/html.png" alt="HTML" />
                    </div>
                    <div className="tech-item" onMouseEnter={() => handleTechMouseEnter('css')} onMouseLeave={handleTechMouseLeave}>
                      <img src="/src/assets/imgs/icons-stack/css.png" alt="CSS" />
                    </div>
                  </div>
                  <div className="tech-row">
                    <div className="tech-item" onMouseEnter={() => handleTechMouseEnter('linux')} onMouseLeave={handleTechMouseLeave}>
                      <img src="/src/assets/imgs/icons-stack/linux.png" alt="Linux" />
                    </div>
                    <div className="tech-item" onMouseEnter={() => handleTechMouseEnter('arduino')} onMouseLeave={handleTechMouseLeave}>
                      <img src="/src/assets/imgs/icons-stack/arduino.png" alt="Arduino" />
                    </div>
                    <div className="tech-item" onMouseEnter={() => handleTechMouseEnter('raspberry')} onMouseLeave={handleTechMouseLeave}>
                      <img src="/src/assets/imgs/icons-stack/raspberry.png" alt="RaspBerry" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="about-text-container">
                <p className="about-text">
                  "Desenvolvedor Full-Stack com conhecimentos em MySQL e especializado em Node.js, buscando aprender cada vez mais sobre Java. Tenho experiência em front-end e uma verdadeira paixão por criar sistemas escaláveis e de alto desempenho, com foco em arquiteturas de servidor e otimização de bancos de dados. Inspirado pela Bíblia e apaixonado por Cristo, busco sempre viver com virtude e integridade, aplicando esses princípios em meu trabalho e na vida. Minha verdadeira paixão é construir as bases sólidas que sustentam aplicações poderosas e de impacto."
                </p>
              </div>
            </div>
          </div>
        </section>
      </FadeInSection>

      <FadeInSection delay={300}>
        <section className="section-4" id="skills">
          <div className="skills-slider">
            <button
              onClick={prevSkill}
              className="carousel-button carousel-button-prev"
              aria-label="Anterior"
              disabled={currentSkillIndex === 0}
            >
              <FaChevronLeft /> {/* Ícone de seta para a esquerda */}
            </button>
            <div
              className="skills-carousel"
              style={{
                transform: `translateX(-${currentSkillIndex * 100}%)`,
              }}
            >
              {skillsArray.map((skill, index) => (
                <div
                  key={index}
                  className={`skill-card ${
                    index === currentSkillIndex ? "active" : ""
                  }`}
                >
                  <h3>{skill.name}</h3>
                  <p>{skill.description}</p>
                  <div className="duration">{skill.duracao}</div>
                </div>
              ))}
            </div>
            <button
              onClick={nextSkill}
              className="carousel-button carousel-button-next"
              aria-label="Próximo"
              disabled={currentSkillIndex === skillsArray.length - 1}
            >
              <FaChevronRight /> {/* Ícone de seta para a direita */}
            </button>
          </div>
        </section>
      </FadeInSection>


            {activeTech && (
        <div 
          className={`tech-description-card ${activeTech ? 'active' : ''}`}
          style={{
            position: 'fixed',
            left: `${mousePosition.x + 150}px`,
            top: `${mousePosition.y + 15}px`,
            zIndex: 1000,
          }}
        >
          <h3>{techDescriptions[activeTech].name}</h3>
          <p>{techDescriptions[activeTech].description}</p>
        </div>
      )}
      <FadeInSection delay={500}>
        <section className="section-3" id="projects">
          <div className='container-projects-card' style={{marginTop: '5%', marginBottom: '10%'}}>
            <h2 className="section-title">Projetos Principais</h2>
            <div className="projects-grid">
            <ProjectCard 
                title="Termo Infinity"
                description="Jogo de palavras onde o objetivo é descobrir a palavra oculta em poucas tentativas, com feedback sobre as letras corretas. Desenvolvido em Node."
                image="/src/assets/imgs/projects/termo/termo.png"
                demoLink="https://otavig.onrender.com/termo-infinity"
                githubLink="https://github.com/Otavig/Termo-infinity"
                delay={100}
              />
              <ProjectCard 
                title="PDAgame"
                description="Um jogo de tabuleiro com tema central a educação sobre a água com sistemas de Node.js, com banco de dados. com sistema de acesso e intranet. (Desenvolvido em 5 dias)"
                image="/src/assets/imgs//projects/pda_game/pda.png"
                demoLink="https://pd-agame.vercel.app/"
                githubLink="https://github.com/Otavig/PDA_Game?tab=readme-ov-file"
                delay={200}
              />
              <ProjectCard 
                title="Midia Indoor"
                description=" O projeto visa criar uma solução completa que permita a exibição de anúncios, informações e entretenimento em telas localizadas em locais estratégicos."
                image="/src/assets/imgs/projects/midia_indoor/midia_indoor.png"
                demoLink="https://projectmidia-git-main-otavigs-projects.vercel.app/#"
                githubLink="https://github.com/Otavig/MidiaIndoor"
                delay={300}
              />
              <ProjectCard 
                title="PejoAPP"
                description="O PEJO é um aplicativo inovador que promove conexões significativas ao combinar desafios sociais com a missão de superar a timidez."
                image="/src/assets/imgs/projects/pejoapp/1.png"
                githubLink="https://github.com/Otavig/PEJOAPP"
                noDemoLink={true}
                delay={400}
              />

                <ProjectCard 
                title="PointCircle"
                description="Um jogo interativo desenvolvido para cativar crianças e introduzi-las ao desenvolvimento de jogos. (Desenvolvido em 1 dias)"
                image="/src/assets/imgs//projects/pointcircle/point.png"
                demoLink="https://point-circle.vercel.app/"
                githubLink="https://github.com/Otavig/PointCircle"
                delay={500}
              />
              <ProjectCard 
                title="Netflix Clone"
                description="Este é um projeto desenvolvido por mim em uma aula no Senai em ADS, onde estavamos explorando o Flatlist no Expo Go. Projeto visou ter aparencia de uma netflix, porém com poucos filmes e séries."
                image="/src/assets/imgs/projects/netflix/1.png"
                githubLink="https://github.com/Otavig/NetflixAPP"
                noDemoLink={true}
                delay={600}
              />
              {/* Add more ProjectCard components as needed */}
            </div>
          </div>
        </section>
      </FadeInSection>
      <footer className="site-footer">
        <div className="footer-content">
          <p style={{color: 'white'}}>Desenvolvido por Otávio Garcia</p>
        </div>
      </footer>
      <button 
        className={`scroll-to-top ${showScrollTop ? 'show' : ''}`} 
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <i className="bi bi-arrow-up"></i>
      </button>

      {isContactModalOpen && (
        <div className="contact-modal-overlay" onClick={closeContactModal}>
          <div className="contact-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={closeContactModal}>×</button>
            <h2 className="section-title">Entre em Contato</h2>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Nome</label>
                <input
                  type="text"
                  id="name"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="subject">Assunto</label>
                <input
                  type="text"
                  id="subject"
                  value={contactSubject}
                  onChange={(e) => setContactSubject(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Mensagem</label>
                <textarea
                  id="message"
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-submit">Enviar Mensagem</button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

function ProjectCard({ title, description, image, demoLink, githubLink, noDemoLink, delay }) {
  return (
    <FadeInSection delay={delay}>
      <div className="project-card">
        <img src={image} alt={title} className="project-image" />
        <div className="project-info">
          <h3>{title}</h3>
          <p>{description}</p>
          <div className="project-buttons">
            {!noDemoLink && (
              <a href={demoLink} target="_blank" rel="noopener noreferrer" className="btn btn-demo">Acessar Demo</a>
            )}
            <a href={githubLink} target="_blank" rel="noopener noreferrer" className="btn btn-github">GitHub</a>
          </div>
        </div>
      </div>
    </FadeInSection>
  );
}

export default App