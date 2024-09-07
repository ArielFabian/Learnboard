import React, { useState } from 'react';
import './MainContent.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Typewriter from 'typewriter-effect';
import { Link, useNavigate } from 'react-router-dom';

const MainContent: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>(''); // Estado para almacenar el valor del input
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true); // Estado para habilitar o deshabilitar el botón
  const navigate = useNavigate(); // Hook para la navegación programática

  // Función para manejar el cambio del input y validar el valor ingresado
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);

    // Habilitar el botón solo si hay texto en el input
    if (value.trim() !== '') {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  };

  // Función de validación y redirección
  const codeValidation = () => {
    console.log(inputValue); // Mostrar el valor ingresado en la consola
    navigate(`/whiteboard?code=${encodeURIComponent(inputValue)}`); // Redirigir a la ruta con el código
  };

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
        <div className="mt-5">
          <input 
            type="text" 
            className="form-control" 
            placeholder="Ingrese código"
            style={{ maxWidth: '300px', margin: '0 auto' }}
            onChange={handleInputChange} // Manejar el cambio de valor del input
          />
        </div>
        <button 
          className="mt-4 btn btn-success btn-lg unirse-a-llamada" 
          onClick={codeValidation} // Llama a codeValidation al hacer clic
          disabled={isButtonDisabled} // Deshabilitar el botón si isButtonDisabled es true
        >
          Unirte a la llamada
        </button>
        <h2 className="mt-4">Da click para unirte a una llamada y probar nuestra herramienta :D</h2>
      </section>
    </main>
  );
};

export default MainContent;