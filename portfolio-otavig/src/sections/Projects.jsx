import React, { useState } from 'react';
import './Projects.css'; // Certifique-se de criar e importar o arquivo de estilo CSS
import { FaGithub } from 'react-icons/fa';

// termo
import termInfinity0 from "../assets/imgs/term-infinity/termo0.png";
import termInfinity1 from "../assets/imgs/term-infinity/termo1.png";
import termInfinity2 from "../assets/imgs/term-infinity/termo2.png";

// midia indoor
import midiaIndoor0 from "../assets/imgs/midia-indoor/midia_indoor0.png";
import midiaIndoor1 from "../assets/imgs/midia-indoor/midia_indoor1.png";

// toptimizer
import toptimizer0 from "../assets/imgs/toptimizer/toptimizer0.png";
import toptimizer1 from "../assets/imgs/toptimizer/toptimizer1.png";
import toptimizer2 from "../assets/imgs/toptimizer/toptimizer2.png";
import toptimizer3 from "../assets/imgs/toptimizer/toptimizer3.png";
import toptimizer4 from "../assets/imgs/toptimizer/toptimizer4.png";

// pda
import pda0 from "../assets/imgs/pda/pda0.png";

const projectsData = [
  {
    title: 'Free-Lancer Toptimizer',
    description: 'Software Electron.js com arquivos .bat para otimização de sistemas Windows. Hospedado em VPS (Hostiger) com banco de dados Docker no Ubuntu, aplicação Node.js (Express) e funcionalidades de cadastro, login, geração e ativação de chaves de licença (com webhook), tudo com criptografia (bcrypt e JWT). Desenvolvido em 20 dias e disponível na Carpi Tech.',
    technologies: ['Ubuntu', 'Docker', 'MySQL', 'Node.js (Express)', 'JavaScript', 'HTML', 'CSS'],
    images: [toptimizer0, toptimizer1, toptimizer2, toptimizer3, toptimizer4],
    demo: 'https://drive.google.com/file/d/1iJV2iuXjYuel5cDQasVhqUXkKK7mq1w1/view'
  },
  {
    title: 'Term-Infinity',
    description: 'Projeto pessoal para aprimorar conhecimentos em DOM e algoritmos. Back-end com algoritmo de pesquisa binária (Big O(log n)) para processar dicionário, rotas GET (palavra aleatória) e POST (validação). Consome API de dicionário para palavras inexistentes.',
    technologies: ['Node.js (Express)','JavaScript', 'Html', 'Css', 'Python'],
    github: 'https://github.com/Otavig/Termo-infinity',
    demo: 'https://otavig.onrender.com/termo-infinity',
    images: [termInfinity0, termInfinity1, termInfinity2],
  },
  {
    title: "API com Gemini e MongoDB",
    description: "Este projeto demonstra a integração da API do Gemini para descrição de imagens com um banco de dados NoSQL MongoDB, seguindo os princípios de arquitetura MVC e MVP. Desenvolvido em Node.js com Express, o sistema recebe imagens via requisição POST, utiliza a API do Gemini para gerar descrições e armazena os resultados no MongoDB. O deploy e configuração do serviço foram realizados no Google Cloud, abrangendo todo o ciclo de DevOps da aplicação.",
    technologies: ["Node.js (Express)", "MongoDB", "Google Cloud", "Gemini API"],
    github: "https://github.com/Otavig/imersao-alura-backend/tree/main"
  },
  {
    title: 'PDA - Mestrado',
    description: 'Projeto de mestrado para recriar sistema da Unesp, tornando-o mais acessível e para meu professor. Gerenciamento e cadastro de cartas e eventos com banco de dados, plataforma de controle com login e jogo de tabuleiro educativo sobre a água.',
    technologies: ['MySQL', 'Node.js (Express)','JavaScript', 'Html', 'Css'],
    github: 'https://github.com/Otavig/PDA_Game',
    demo: 'https://pd-agame.vercel.app/',
    images: [pda0],
  },
  {
    title: 'Midia indoor',
    description: 'Sistema para gerenciar e exibir conteúdo digital (vídeos, imagens e GIFs). Permite upload, agendamento e controle de tempo de exibição. Utilizado no SENAI para exibir informações e anúncios. Ideal para diversos estabelecimentos.',
    technologies: ['MySQL', 'Node.js (Express)','JavaScript', 'Html', 'Css', 'BootStrap'],
    github: 'https://github.com/Otavig/MidiaIndoor',
    demo: 'https://projectmidia-git-main-otavigs-projects.vercel.app/#',
    images: [midiaIndoor0, midiaIndoor1],
  } 
];
const Projects = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (images) => {
    setSelectedImages(images);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImages([]);
  };

  return (
    <section id="projects">
      <div className="projects-container">
        {projectsData.map((project, index) => (
          <div key={index} className="project-card">
            <h3 className="project-title">{project.title}</h3>
            <p className="project-description">{project.description}</p>
            <div className="technologies">
              {project.technologies.map((tech, techIndex) => (
                <span key={techIndex} className="technology-item">{tech}</span>
              ))}
            </div>
            <div className="project-buttons">
              {project.github && (
                <a href={project.github} className="project-button" target="_blank" rel="noopener noreferrer">
                  <FaGithub /> GitHub
                </a>
              )}
              {project.demo && (
                <a href={project.demo} className="project-button" target="_blank" rel="noopener noreferrer">
                  Demo
                </a>
              )}
              {/* Condicional para exibir o botão de imagens */}
              {project.images && project.images.length > 0 && (
                <button className="project-button" onClick={() => openModal(project.images)}>
                  Imagens
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>X</button>
            <div className="modal-images">
              {selectedImages.map((image, index) => (
                <img key={index} src={image} alt={`Project screenshot ${index + 1}`} className="modal-image" />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;