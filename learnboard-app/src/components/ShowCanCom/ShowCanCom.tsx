import React, { useEffect, useState } from 'react';
import Compiler from '../Compiler/Complier';
import AppLayout from '~/layouts/AppLayout';
import Draggable from 'react-draggable';
import styles from './ParentComponent.module.css'; // Importa el módulo CSS
import ZoomOverlay from '../Zoom/ZoomOverlay';

// Componente principal que gestiona el estado del Compiler y del Iframe
const ParentComponent: React.FC = () => {
  const [showCompiler, setShowCompiler] = useState(false);
  const [iframeSrc, setIframeSrc] = useState('https://example.com/'); // Estado para manejar la URL del iframe
  const [showIframe, setShowIframe] = useState(true); // Estado para manejar la visibilidad del iframe

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
      {/* <div style={{ display: showCompiler ? 'none' : 'block' }}>
        <AppLayout
          showCompiler={showCompiler}
          onShowCompilerChange={handleShowCompilerChange}
        />
      </div> */}

      {/* Compiler visible cuando showCompiler es true */}
      {/* <div style={{ display: showCompiler ? 'block' : 'none' }}>
        <Compiler
          showCompiler={showCompiler}
          onShowCompilerChange={handleShowCompilerChange}
          iframeSrc={iframeSrc}
          handleIframeStateChange={handleIframeStateChange} // Pasar la función para manejar el iframe
        />
      </div> */}

      {/* Contenedor Draggable */}
      <Draggable handle={`.${styles.moveButton}`}>
        <div className={styles.draggableContainer}>
          <div className={styles.iframeContainer}>
            <button className={styles.moveButton}>Mover</button>
            <button onClick={() => setShowIframe(!showIframe)} className={styles.toggleButton}>
              {showIframe ? 'Ocultar' : 'Mostrar'}
            </button>

            {showIframe ? (
              <div className={`${styles.resizer} ${styles.ugly}`}>
                <iframe src={iframeSrc} title="Iframe Content" className={styles.resized} />
              </div>
            ) : (
              <div className={styles.hiddenIframe}>Iframe oculto</div>
            )}

            {/* Nuevo botón para capturar la pantalla del canvas */}
          </div>
        </div>
      </Draggable>

      {/* ZoomOverlay */}
      <ZoomOverlay />
    </div>
  );
};

export default ParentComponent;
