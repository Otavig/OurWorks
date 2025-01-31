import React from 'react';
import './About.css';
import { 
  FaNodeJs, FaDatabase, FaJava, FaPython, FaLinux, FaJs, FaMicrochip, 
  FaRaspberryPi, FaReact, FaHtml5, FaCss3Alt 
} from 'react-icons/fa';
import { SiNestjs, SiMongodb } from 'react-icons/si';

const technologies = [
  { icon: <FaNodeJs />, name: 'Node.js' },
  { icon: <FaDatabase />, name: 'MySQL' },
  { icon: <SiMongodb />, name: 'MongoDB' },
  { icon: <SiNestjs />, name: 'NestJS' },
  { icon: <FaJava />, name: 'Java' },
  { icon: <FaPython />, name: 'Python' },
  { icon: <FaLinux />, name: 'Linux' },
  { icon: <FaJs />, name: 'JavaScript' },
  { icon: <FaReact />, name: 'React' },
  { icon: <FaMicrochip />, name: 'Arduino' },
  { icon: <FaRaspberryPi />, name: 'Raspberry Pi' }
  // { icon: <FaHtml5 />, name: 'HTML' },
  // { icon: <FaCss3Alt />, name: 'CSS' },
];

const About = () => {
  return (
    <section id="about">
      <h2>Sobre Mim</h2>
      <p>
        Sou um desenvolvedor Back-End com foco em Node.js (Express), Java, MySQL, NoSQL e GraphQL. No início da minha carreira e durante meus estudos, atuei como desenvolvedor Full-Stack, adquirindo experiência com diversas tecnologias. Além disso, tenho conhecimento em VPS e Ubuntu para subir servidores e um pouco de Docker.
      </p>

      
      <h3>Formação e Cursos</h3>
      <ul>
        <li><strong>SUP. DE TEC. EM ANÁLISE E DESENV. DE SIST. (Unoeste FIPP)</strong> – Cursando desde fev. 2025</li>
        <li><strong>Curso Técnico em Análise e Desenvolvimento de Sistemas (Senai)</strong> – 2 anos</li>
        <li><strong>Cursos Udemy:</strong> React, Node.js, Java e Python</li>
        <li><strong>Fundamentos de Google Cloud Computing (Senai GCP)</strong></li>
        <li><strong>Soluções Integradas com IoT (Senai IoT)</strong></li>
        <li><strong>Programação em Python no Raspberry (Senai)</strong></li>
      </ul>
      
      <h3>Tecnologias que obtenho certo conhecimento</h3>
      <div className="tech-icons">
        {technologies.map((tech, index) => (
          <div key={index} className="icon" data-tooltip={tech.name}>
            {tech.icon}
          </div>
        ))}
      </div>
    </section>
  );
};

export default About;
