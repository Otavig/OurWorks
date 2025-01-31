import React from 'react';
import './Contact.css';
import contactImage from '../assets/imgs/personagem.png'; 

const Contact = () => {
  return (
    <section id="contact">
      <div className="contact-container">
        <div className="contact-image">
          <img src={contactImage} alt="Otávio Garcia" />
        </div>
        <div className="contact-info">
          <a href="mailto:otavig.developer@gmail.com" className="email-link">
            Otavig - otavig.developer@gmail.com
          </a>
          <p>&copy; 2025 Otávio Garcia. Desenvolvido com React, Vite e muito carinho.</p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
