import React, { useState, useEffect } from 'react';
import './MainContent.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const MainContent: React.FC = () => {
  const [displayedText, setDisplayedText] = useState('');
  const fullText = 'Apprende de forma colaborativa'; // Texto a mostrar
  const animationSpeed = 250; // Velocidad de escritura en milisegundos
  const pauseBeforeRestart = 100; // Pausa antes de reiniciar la animación en milisegundos

  useEffect(() => {
    let currentIndex = 0;

    const intervalId = setInterval(() => {
      setDisplayedText((prev) => prev + fullText[currentIndex]);
      currentIndex++;

      if (currentIndex === fullText.length) {
        clearInterval(intervalId);
        setTimeout(() => {
          setDisplayedText('');
          currentIndex = 0;
        }, pauseBeforeRestart);
      }
    }, animationSpeed);

    return () => clearInterval(intervalId); // Limpiar el intervalo al desmontar
  }, [fullText]);

  return (
    <main className="container mt-5">
      <section className="bg-light p-5 rounded mb-4 text-center">
        <h2>Una nueva forma de volver tus clases más dinámicas</h2>
        <p>¿Cansado/a de las clases donde la explicación es aburrida?</p>
        <button className="btn btn-primary">Más Información</button>
      </section>
      <section className="text-center">
        <h1 className="display-4">{displayedText}</h1>
        <p>Usa LearnBoard para shalalalalalalalala</p>
        <button className="btn btn-success btn-lg">Consigue LearnBoard ahora</button>
        <div className="d-flex justify-content-center mt-4">
          <button className="btn btn-outline-secondary mx-2">
            <img src="./assets/meet.webp" alt="Meet" className="img-fluid" />
          </button>
          <button className="btn btn-outline-secondary mx-2">
            <img src="./assets/zoom.png" alt="Zoom" className="img-fluid" />
          </button>
          <button className="btn btn-outline-secondary mx-2">
            <img src="./assets/teams.png" alt="Teams" className="img-fluid" />
          </button>
        </div>
        <h2 className="mt-4">Ingresa a la plataforma de tu elección para vincular tu cuenta e iniciar la llamada</h2>
      </section>
    </main>
  );
};

export default MainContent;