import React, { useEffect, useState } from 'react';

import Compiler from './Compiler/Complier';

import AppLayout from '~/layouts/AppLayout';

// Componente principal que gestiona el estado del Compiler y del Iframe
const ParentComponent: React.FC = () => {
  const [showCompiler, setShowCompiler] = useState(false);
  const [iframeSrc, setIframeSrc] = useState('https://www.ejemplo.com'); // Estado para manejar la URL del iframe

  // Función para manejar el cambio de estado de showCompiler
  const handleShowCompilerChange = (newShowCompiler: boolean | ((prevState: boolean) => boolean)) => {
    setShowCompiler(newShowCompiler);
  };

  // Función para manejar el estado del iframe y asegurar que se mantenga entre cambios
  const handleIframeStateChange = (newSrc: string | ((prevState: string) => string)) => {
    setIframeSrc(newSrc);
  };

  useEffect(() => {
    // Mantener el estado del iframe aunque se cambie entre Compiler y AppLayout
    handleIframeStateChange((prevSrc) => prevSrc);
  }, []);

  return (
    <div>
      {/* AppLayout visible cuando showCompiler es false */}
      <div style={{ display: showCompiler ? 'none' : 'block' }}>
        <AppLayout
          showCompiler={showCompiler}
          onShowCompilerChange={handleShowCompilerChange}
          iframeSrc={iframeSrc}
          handleIframeStateChange={handleIframeStateChange} // Pasar la función para manejar el iframe/>
        />
      </div>

      {/* Compiler visible cuando showCompiler es true */}
      <div style={{ display: showCompiler ? 'block' : 'none' }}>
        <Compiler
          showCompiler={showCompiler}
          onShowCompilerChange={handleShowCompilerChange}
          iframeSrc={iframeSrc}
          handleIframeStateChange={handleIframeStateChange} // Pasar la función para manejar el iframe
        />
      </div>

      {/* Iframe independiente para mantener su estado */}
      <iframe
        src={iframeSrc}
        width="300px"
        height="500px"
        title="Iframe Content"
        style={{
          position: 'absolute',
          top: '50%', // Posiciona el iframe al 50% desde la parte superior
          right: '0', // Pega el iframe al lado derecho
          transform: 'translateY(-30%)', // Centra el iframe verticalmente en la mitad de la página
          zIndex: '100', // Ajusta el z-index si necesitas que esté encima o debajo de otros elementos
        }}
      />
    </div>
  );
};

export default ParentComponent;
