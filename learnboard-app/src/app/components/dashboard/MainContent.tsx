import React from 'react';
import './MainContent.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Typewriter from 'typewriter-effect';
import { Link } from 'react-router-dom';

const MainContent: React.FC = () => {
  return (
    <main className="container mt-5">
      <section className="bg-light p-5 rounded mb-4 text-center">
        <h2>Una nueva forma de volver tus clases más dinámicas</h2>
        <p>¿Cansado/a de las clases donde la explicación es aburrida?</p>
        <Typewriter
          options={{
            strings: [
              "TODAS LAS PIEZAS SE ESTAN UNIENDO",
              "POR QUE TU ERES PEÑA NIETO",
              "¿Donde esta la gotera señora?",
              "Boka chan ga oshiete kureta ironna mita meni narera puninan ndatte dore dore"
            ],
            autoStart: true,
            loop: true,
            delay: 60,
            deleteSpeed: 25,
          }}
        />
                
                <button className="btn btn-success btn-lg">Consigue LearnBoard ahora</button>
                <div className="d-flex justify-content-center mt-4">
                <img src="./assets/chrome.png" alt="Meet" className="img-fluid" />
                </div>
      </section>
      <section className="text-center">
        {/* <div className="d-flex justify-content-center mt-4">
          <button className="btn btn-outline-secondary mx-2" onClick={() => window.open ('https://meet.google.com/landing')}>
            <img src="./assets/meet.webp" alt="Meet" className="img-fluid" />
          </button>
          <button className="btn btn-outline-secondary mx-2" onClick={() => window.open('https://zoom.us/es/join?')}>
            <img src="./assets/zoom.png" alt="Zoom" className="img-fluid" />
          </button>
          <button className="btn btn-outline-secondary mx-2" onClick={() => window.open('https://www.microsoft.com/es-mx/microsoft-teams/join-a-meeting')}>
            <img src="./assets/teams.png" alt="Teams" className="img-fluid" />
          </button>
        </div>   */}
       
        <div className="mt-5">
    <input 
      type="text" 
      className="form-control" 
      placeholder="Ingrese código"
      style={{ maxWidth: '300px', margin: '0 auto' }}/>
  </div>
  <Link to="/whiteboard">
  <button className="mt-4 btn btn-success btn-lg">Unirte a la llamada</button>
  </Link>
  <h2 className="mt-4">Da click para unirte a una llamada y probar nuestra herramienta :D</h2>
      </section>
    </main>
  );
};

export default MainContent;