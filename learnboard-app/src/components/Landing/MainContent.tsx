import React from 'react';
import styles from './MainContent.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Typewriter from 'typewriter-effect';

const MainContent: React.FC = () => {
  return (
    <main className="bg-light container mt-5">
      {/* Sección Principal */}
      <section className="bg-light p-5 rounded mb-4 text-center">
        <h2 className="font-weight-bold text-dark">Transforma tus clases con dinamismo y tecnología</h2>
        <p className="lead text-muted">Haz que tus lecciones sean interactivas, atractivas y efectivas.</p>
        
        {/* Máquina de escribir con frases mejoradas */}
        <Typewriter
          options={{
            strings: [
              "Crea experiencias de aprendizaje inolvidables",
              "Mejora la participación y el entendimiento de tus estudiantes",
              "Haz que cada clase sea dinámica y entretenida",
              "La tecnología que impulsa tu éxito educativo"
            ],
            autoStart: true,
            loop: true,
            delay: 60,
            deleteSpeed: 25,
          }}
        />
        
        {/* Botón "Consigue LearnBoard ahora" modificado */}
        <button className="btn btn-primary btn-lg mt-4">Consigue LearnBoard ahora</button>

        {/* Ícono de Chrome para la extensión */}
        <div className={`${styles.feature} d-flex justify-content-center mt-4`}>
          <img 
            src="./images/assets/chrome.png" 
            alt="Chrome Extension" 
            className="img-fluid" 
            style={{ width: '50px', height: '50px' }} 
          />
        </div>
      </section>

      {/* Sección de código de llamada */}
      <section className="text-center">
         {/* Frase promocional mejorada */}
        <h2 className="mt-4 text-dark">Haz clic para unirte a una llamada y descubre el poder de LearnBoard</h2>
        <p className="text-muted">Prueba nuestra herramienta y transforma tu manera de enseñar.</p>
        <div className={`${styles.feature} mt-5`}>
          <input
            type="text"
            className="form-control"
            placeholder="Ingresa el código de la llamada"
            style={{ maxWidth: '300px', margin: '0 auto' }} 
          />
        </div>

        {/* Botón "Unirte a la llamada" */}
        <button className="mt-4 mb-4 btn btn-success btn-lg">Unirte a la llamada</button>

       
      </section>
    </main>
  );
};

export default MainContent;
