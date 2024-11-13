import './App.css'
import { useState, useEffect, useRef } from 'react'
import Swiper from 'swiper';
import { EffectFade, Mousewheel, Pagination } from 'swiper/modules';

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
  const words = ['Developer', 'Cristão','Criador', 'Inovador'];
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
  const [currentSkillIndex, setCurrentSkillIndex] = useState(0);

  const skillsList = {
    ads_senai: {
      name: "Análise e Desenvolvimento de Sistemas",
      description: "Estudei por 5 dias no senai"
    },
    IoT: {
      name: "Integrated Solutions with IoT Course",
      description: "Estudei por 5 dias no senai"
    },
    Google: {
      name: "Google Cloud Computing ",
      description: "Estudei por 5 dias no senai"
    }

  }

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
    linux: {
      name: "Linux",
      description: "Um sistema operacional de código aberto baseado em Unix."
    },
    arduino: {
      name: "Arduino",
      description: "Uma plataforma de prototipagem eletrônica de código aberto."
    }
  };

  useEffect(() => {
    // Add 'no-scroll' class to body when component mounts
    document.body.classList.add('no-scroll');

    // Verifica a preferência do sistema
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
    setIsDarkMode(prefersDarkMode)
    
    // Aplica o modo escuro se necessário
    if (prefersDarkMode) {
      document.body.classList.add('dark-mode')
    }

    // Loading screen timer with progress
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsLoading(false);
            document.body.classList.remove('no-scroll'); // Remove 'no-scroll' class when loading is complete
          }, 500); // Delay to allow fade-out animation to complete
          return 100;
        }
        return prev + 20;
      });
    }, 300);

    return () => clearInterval(interval);
  }, [])

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
    
    const formData = new FormData();
    formData.append('name', contactName);
    formData.append('email', contactEmail);
    formData.append('subject', contactSubject);
    formData.append('message', contactMessage);

    try {
      const response = await fetch('https://seudominio.com/send_email.php', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.text();
        alert(result);
        // Reset form fields
        setContactName('');
        setContactEmail('');
        setContactSubject('');
        setContactMessage('');
      } else {
        throw new Error('Erro ao enviar mensagem');
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente.');
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

  const nextSkill = () => {
    setCurrentSkillIndex((prevIndex) => (prevIndex + 1) % Object.entries(skillsList).length);
  };

  const prevSkill = () => {
    setCurrentSkillIndex((prevIndex) => (prevIndex - 1 + Object.entries(skillsList).length) % Object.entries(skillsList).length);
  };

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
            <div className="item"><a href="#skills">Habilidades</a></div>
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
        <section className="section-2" id="about" ref={aboutRef} style={{marginTop: '12%'}}>
          <div className="character-bubble">
            <img src="/src/assets/imgs/extras/icon_paint.png" alt="Person" />
          </div>
          <div className={`container-about-card ${isAboutVisible ? 'fade-in' : 'fade-out'}`}>
            <div className="about-content">
              <div className="tech-stack-container">
                <div className="tech-stack">
                  <div className="tech-row">
                    <div className="tech-item" onMouseEnter={() => handleTechMouseEnter('mysql')} onMouseLeave={handleTechMouseLeave}><img src="/src/assets/imgs/icons-stack/mysql.png" alt="MySQL" /></div>
                    <div className="tech-item" onMouseEnter={() => handleTechMouseEnter('node')} onMouseLeave={handleTechMouseLeave}><img src="/src/assets/imgs/icons-stack/node.png" alt="Node.js" /></div>
                    <div className="tech-item" onMouseEnter={() => handleTechMouseEnter('js')} onMouseLeave={handleTechMouseLeave}><img src="/src/assets/imgs/icons-stack/js.png" alt="JavaScript" /></div>
                  </div>
                  <div className="tech-row">
                    <div className="tech-item" onMouseEnter={() => handleTechMouseEnter('react')} onMouseLeave={handleTechMouseLeave}><img src="/src/assets/imgs/icons-stack/react.png" alt="React" /></div>
                    <div className="tech-item" onMouseEnter={() => handleTechMouseEnter('html')} onMouseLeave={handleTechMouseLeave}><img src="/src/assets/imgs/icons-stack/html.png" alt="HTML" /></div>
                    <div className="tech-item" onMouseEnter={() => handleTechMouseEnter('css')} onMouseLeave={handleTechMouseLeave}><img src="/src/assets/imgs/icons-stack/css.png" alt="CSS" /></div>
                  </div>  
                  <div className="tech-row">
                    <div className="tech-item" onMouseEnter={() => handleTechMouseEnter('python')} onMouseLeave={handleTechMouseLeave}><img src="/src/assets/imgs/icons-stack/python.png" alt="Python" /></div>
                    <div className="tech-item" onMouseEnter={() => handleTechMouseEnter('linux')} onMouseLeave={handleTechMouseLeave}><img src="/src/assets/imgs/icons-stack/linux.png" alt="LINUX" /></div>
                    <div className="tech-item" onMouseEnter={() => handleTechMouseEnter('arduino')} onMouseLeave={handleTechMouseLeave}><img src="/src/assets/imgs/icons-stack/arduino.png" alt="ARDUINO" /></div>
                  </div>
                </div>
              </div>
              <div className="about-text-container">
                <p className="about-text">
                  <sup className='aspas'>❝</sup><span className='span_maisculo'>D</span>esenvolvedor <span className='special_span'>Full-Stack</span> com ênfase em <span className='special_span'>Back-End</span>, especializado em <span className='special_span'>MySQL</span>. Experiência em desenvolvimento web e mobile, com foco em arquiteturas de servidor e bancos de dados. Apaixonado por <span className='special_span'>SQL</span> e sistemas escaláveis. Inspirado pela Bíblia e xadrez. Acabo lidando com o front-end muito bem, mas minha verdadeira paixão é criar os alicerces sólidos que sustentam aplicações poderosas.<span className='aspas'>❞</span>
                </p>
              </div>
            </div>
          </div>
        </section>
      </FadeInSection>
      <FadeInSection delay={300}>
        <section className='download-section'>
          <div className='download-container'>
            <a 
              download="./assets/curriculo.pdf"
              className='download-button'
            >
              <i className="bi bi-download"></i> Currículo
            </a>
          </div>
        </section>
      </FadeInSection>
      <FadeInSection delay={400}>
        <section className="section-4" id="skills">
          <div className="skills-slider">
            <div className="skills-carousel">
              <button onClick={prevSkill} className="carousel-button">Anterior</button>
              <div className="skill-card" style={{ display: 'block' }}>
                <h3>{Object.values(skillsList)[currentSkillIndex].name}</h3>
                <p>{Object.values(skillsList)[currentSkillIndex].description}</p>
              </div>
              <button onClick={nextSkill} className="carousel-button">Próximo</button>
            </div>
          </div>
        </section>
      </FadeInSection>
            {activeTech && (
        <div 
          className={`tech-description-card ${activeTech ? 'active' : ''}`}
          style={{
            position: 'fixed',
            left: `${mousePosition.x + 180}px`,
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
                title="PDAgame"
                description="Um jogo de tabuleiro com tema central a educação sobre a água com sistemas de Node.js, com banco de dados. com sistema de acesso e intranet. (Desenvolvido em 5 dias)"
                image="/src/assets/imgs//projects/pda_game/1.png"
                demoLink="https://pd-agame.vercel.app/"
                githubLink="https://github.com/Otavig/PDA_Game?tab=readme-ov-file"
                delay={100}
              />
              <ProjectCard 
                title="Midia Indoor"
                description=" O projeto visa criar uma solução completa que permita a exibição de anúncios, informações e entretenimento em telas localizadas em locais estratégicos."
                image="/src/assets/imgs/projects/midia_indoor/1.png"
                demoLink="https://projectmidia-git-main-otavigs-projects.vercel.app/#"
                githubLink="https://github.com/Otavig/MidiaIndoor"
                delay={200}
              />
              <ProjectCard 
                title="PejoAPP"
                description="O PEJO é um aplicativo inovador que promove conexões significativas ao combinar desafios sociais com a missão de superar a timidez."
                image="/src/assets/imgs/projects/pejoapp/1.png"
                githubLink="https://github.com/Otavig/PEJOAPP"
                noDemoLink={true}
                delay={300}
              />
              <ProjectCard 
                title="PokeAPI"
                description="Descrição resumida do projeto 2. Destaque os pontos mais interessantes e relevantes do seu trabalho."
                image="/src/assets/imgs/projects/pokeapi/1.png"
                demoLink="https://pokedex-otavig.vercel.app/"
                githubLink="https://github.com/Otavig/PokeAPI"
                delay={400}
              />
                <ProjectCard 
                title="PointCircle"
                description="Um jogo interativo desenvolvido para cativar crianças e introduzi-las ao desenvolvimento de jogos. (Desenvolvido em 1 dias)"
                image="/src/assets/imgs//projects/pointcircle/1.jpg"
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
          <p>Desenvolvido por Otávio Garcia ultilizando React</p>
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
              <a href={demoLink} target="_blank" rel="noopener noreferrer" className="btn btn-demo">Acessar Exemplo</a>
            )}
            <a href={githubLink} target="_blank" rel="noopener noreferrer" className="btn btn-github">GitHub</a>
          </div>
        </div>
      </div>
    </FadeInSection>
  );
}

export default App