import { useEffect } from 'react';
import "./MouseTrail.css"

const MouseTrail = () => {
  useEffect(() => {
    let lastMouseMoveTime = 0; // Controla o tempo do movimento do mouse

    const handleMouseMove = (e) => {
      const currentTime = new Date().getTime();
      
      // Adiciona o efeito apenas se um intervalo de tempo suficiente passar
      if (currentTime - lastMouseMoveTime > 10) { // Aumente o valor para tornar o movimento mais suave
        const mouseTrail = document.createElement('div');
        mouseTrail.classList.add('mouse-trail');
        document.body.appendChild(mouseTrail);

        // Posiciona a "minhoca" no local do mouse
        mouseTrail.style.left = `${e.pageX - 15}px`; // Ajuste para centralizar
        mouseTrail.style.top = `${e.pageY - 12}px`;  // Ajuste para centralizar

        // Remove o "trail" após a animação
        setTimeout(() => {
          mouseTrail.remove();
        }, 300); // Tempo de animação mais rápido
      }

      lastMouseMoveTime = currentTime;
    };

    document.addEventListener('mousemove', handleMouseMove);

    // Limpeza para evitar que o evento seja adicionado mais de uma vez
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return null; // Este componente não precisa renderizar nada
};

export default MouseTrail;
