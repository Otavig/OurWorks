import React from 'react';
import Typewriter from 'typewriter-effect';
import './Teaser.css';
import perfil from '../assets/imgs/perfil.png'; // Importando a imagem corretamente

const Teaser = () => {
  return (
    <section id="teaser" className="teaser-container">
      <div className="teaser-text">
        <h2>
          <Typewriter
            options={{
              strings: [
                '<span style="color: #64d6f4;">Desenvolvedor</span> <span style="color:rgb(255, 255, 255);">Back-End</span>',
                '<span style="color: #64d6f4;">Desenvolvedor</span> <span style="color:rgb(255, 255, 255);">Full-Stack</span>',
              ],
              autoStart: true,
              loop: true,
              cursor: '|',
              delay: 50,
            }}
          />
        </h2>
        <h4 className="junior-tag">Junior</h4>
        <p>Entusiasta em tecnologia e cristão que incorpora seus valores e ética em tudo o que faz!</p>
        <div className="social-icons">
          <a href="https://www.linkedin.com/in/otavig/" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="https://github.com/otavig" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-github"></i>
          </a>
          <a href="mailto:otavig.developer@gmail.com">
            <i className="fas fa-envelope"></i>
          </a>
          {/* Novo link para Instagram */}
          <a href="https://www.instagram.com/otavig_/" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
          {/* Novo link para o currículo
          <a href="/path/to/seu-curriculo.pdf" target="_blank" rel="noopener noreferrer">
            <i className="fas fa-file-alt"></i> 
          </a> */}
        </div>
      </div>
      <div className="teaser-image">
        <img src={perfil} alt="Otávio Garcia (Otavig)" />
      </div>
    </section>
  );
};

export default Teaser;
