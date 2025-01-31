import { useState, useEffect } from "react";
import "./Header.css";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50); // Quando passar 50px, ativa o efeito
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNameClick = () => {
    document.getElementById("teaser").scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className={scrolled ? "header scrolled" : "header"}>
      <h1 onClick={handleNameClick} style={{cursor: "pointer"}}>Otávio Garcia</h1>
      <nav>
        <a href="#about">Sobre</a>
        <a href="#projects">Projetos</a>
        <a href="#contact">Contato</a>
      </nav>
    </header>
  );
}
