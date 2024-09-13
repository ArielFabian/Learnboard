// src/components/HeaderCompiler.tsx
import React, { useState } from 'react';
import Compiler from './Compiler/Complier';
import Canvas from './Canvas';
import './Header-Compiler.module.css';
import CanvasPreview from './CanvasPreview';
import LoadingOverlay from './LoadingOverlay';
import AppLayout from '~/layouts/AppLayout';

const HeaderCompiler: React.FC = () => {
  // Estado para manejar si se muestra Compiler o Canvas
  const [showCompiler, setShowCompiler] = useState(true);

  // Función para alternar entre Compiler y Canvas
  const toggleView = () => {
    setShowCompiler(!showCompiler);
  };
  // Estilos en línea
  const headerContainerStyle = {
    backgroundColor: '#f0f0f0',
    padding: '10px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  };

  const headerCompilerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const headerButtonStyle = {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '10px', // Ajusta el margen entre botones según sea necesario
  };

  const headerButtonHoverStyle = {
    backgroundColor: '#0056b3',
  };

  return (
    <div>
      {/* Contenedor fijo para el header */}
      <div className="header-container">
        <header className="header-compiler">
          <button className="header-button" onClick={toggleView}>
            {showCompiler ? 'Regresar al canvas' : 'Ir al compiler'}
          </button>
          <button className="header-button">QR</button>
          <button className="header-button">Relleno</button>
        </header>
      </div>

      {/* Renderización condicional de los componentes */}
      {showCompiler ? <Compiler /> : <AppLayout />}
    </div>
  );
};

export default HeaderCompiler;
