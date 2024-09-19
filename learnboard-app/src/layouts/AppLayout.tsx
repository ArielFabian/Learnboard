import React, { useEffect } from 'react';

import Canvas from '~/components/Canvas';
import CanvasEventListeners from '~/components/CanvasEventListeners';
import IframeComponent from '~/components/Compiler/components/IframeCompiler';
import IframeCompiler from '~/components/Compiler/components/IframeCompiler';
import HeaderCompiler from '~/components/HeaderCompiler';
import Overlay from '~/components/Overlay';
import styles from './AppLayout.module.css';

const renderIframe = (src: string, width: string, height: string) => (
  <iframe
    src={src}
    style={{ width: width, height: height }} // Estilos en línea para ajustar dinámicamente el tamaño
    className={styles.iframe}
    frameBorder="0"
    allowFullScreen
    title="Iframe Content"
  />
);

const iframeSrc = 'https://www.example.com';

export default function AppLayout({
  showCompiler,
  onShowCompilerChange,
}: {
  showCompiler: boolean;
  onShowCompilerChange: (newShowCompiler: boolean | ((prevState: boolean) => boolean)) => void;
}) {
  useEffect(() => {
    const html = document.querySelector('html');

    if (html) {
      html.style.overflow = 'hidden';
    }

    return () => {
      if (html) {
        html.style.overflow = 'auto';
      }
    };
  }, []);

  return (
    <>
      <Overlay showCompiler={showCompiler} onShowCompilerChange={onShowCompilerChange} initialSrc={''} />
      <Canvas />
      <CanvasEventListeners />
      <div className={styles.iframeContainer}>
        {/* Renderización del iframe mediante la función con el enlace codificado */}
        {renderIframe(iframeSrc, '100%', '300px')} {/* Puedes ajustar el tamaño del iframe aquí */}
      </div>
    </>
  );
}
