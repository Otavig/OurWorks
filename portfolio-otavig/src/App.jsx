import { useEffect } from 'react';
import Header from "./components/Header";
import Teaser from './sections/Teaser';
import About from './sections/About';
import Projects from './sections/Projects';
import Contact from './sections/Contact';
import MouseTrail from './components/MouseTrail';
import "./styles/style.css";

function App() {
  useEffect(() => {
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');

    // Configuração do tamanho do canvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Array para armazenar as partículas
    let particlesArray = [];

    // Função para criar partículas
    function Particle() {
      this.x = Math.random() * canvas.width;
      this.y = canvas.height + Math.random() * 100;  // Começa um pouco abaixo da tela
      this.size = Math.random() * 3 + 1;
      this.speedY = Math.random() * 2 - 1;  
      this.speedX = Math.random() * 2 - 1;  

      this.update = function () {
        this.y += this.speedY;
        this.x += this.speedX;

        // Se a partícula sai de baixo da tela, ela reaparece embaixo
        if (this.y < -this.size) {
          this.y = canvas.height + this.size;
          this.x = Math.random() * canvas.width;
        }

        // Desenha a partícula
        ctx.fillStyle = "rgba(255, 255, 255, 0.5)";  // Cor branca com leve transparência
        ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      };
    }

    // Função para animar as partículas
    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Atualiza e desenha as partículas
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
      }

      // Chama a função de animação repetidamente
      requestAnimationFrame(animateParticles);
    }

    // Função para gerar novas partículas se o número de partículas for menor que 90
    function createParticles() {
      if (particlesArray.length < 20) {
        particlesArray.push(new Particle());
      }
    }

    // Inicializa 
    for (let i = 0; i < 20; i++) {
      createParticles();
    }

    // Gera partículas a cada intervalo, mas nunca deixando o número de partículas ultrapassar 20
    const particleInterval = setInterval(createParticles, 100);  

    // Inicia a animação
    animateParticles();

    // Limpeza do intervalo e evento ao desmontar o componente
    return () => {
      clearInterval(particleInterval);
    };
  }, []);

  return (
    <>
      <canvas id="particleCanvas"></canvas>
      <Header />
      <MouseTrail />
      <main>
        <Teaser />
        <About />
        <Projects />
        <Contact />
      </main>
    </>
  );
}

export default App;
