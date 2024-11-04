import React, { useEffect, useState } from 'react';
import Compiler from '../Compiler/Complier';
import AppLayout from '~/layouts/AppLayout';
import Draggable from 'react-draggable';
import styles from './ParentComponent.module.css'; // Importa el módulo CSS
// import ZoomOverlay from '../Zoom/ZoomOverlay';
import dynamic from "next/dynamic";

const Overlay = dynamic(
  () => import("../VideoSDK/Overlay"),
  {
    ssr: false,
  }
);

const ParentComponent: React.FC = () => {
  const [showCompiler, setShowCompiler] = useState(false);
  const [iframeSrc, setIframeSrc] = useState('https://example.com/');
  const [showIframe, setShowIframe] = useState(true);

  const handleShowCompilerChange = (newShowCompiler: boolean | ((prevState: boolean) => boolean)) => {
    setShowCompiler(newShowCompiler);
  };

  const handleIframeStateChange = (newSrc: string | ((prevState: string) => string)) => {
    setIframeSrc(newSrc);
  };

  useEffect(() => {
    handleIframeStateChange((prevSrc) => prevSrc);
  }, []);

  return (
    <div>
      <div style={{ display: showCompiler ? 'none' : 'block' }}>
        <AppLayout
          showCompiler={showCompiler}
          onShowCompilerChange={handleShowCompilerChange}
        />
      </div>

      <div style={{ display: showCompiler ? 'block' : 'none' }}>
        <Compiler
          showCompiler={showCompiler}
          onShowCompilerChange={handleShowCompilerChange}
          iframeSrc={iframeSrc}
          handleIframeStateChange={handleIframeStateChange}
        />
      </div>

      <Draggable handle={`.${styles.moveButton}`}>
        <div className={styles.draggableContainer}>
          <div className={styles.iframeContainer}>
            <button className={styles.moveButton}>Mover</button>
            <button onClick={() => setShowIframe(!showIframe)} className={styles.toggleButton}>
              {showIframe ? 'Ocultar' : 'Mostrar'}
            </button>

            {showIframe ? (
              <Overlay/>
            ) : (
              <div className={styles.hiddenIframe}>Iframe oculto</div>
            )}
          </div>
        </div>
      </Draggable>
      {/* <ZoomOverlay /> */}
    </div>
  );
};

export default ParentComponent;
