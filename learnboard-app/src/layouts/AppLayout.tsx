import React, { useEffect, useState } from 'react';

import styles from './AppLayout.module.css';

import Canvas from '~/components/Canvas';
import CanvasEventListeners from '~/components/CanvasEventListeners';
import Overlay from '~/components/Overlay';
import { text } from 'stream/consumers';

export default function AppLayout({
  showCompiler,
  onShowCompilerChange,
  iframeSrc,
  handleIframeStateChange,
}: {
  showCompiler: boolean;
  onShowCompilerChange: (newShowCompiler: boolean | ((prevState: boolean) => boolean)) => void;
  iframeSrc: string;
  handleIframeStateChange: (newSrc: string | ((prevState: string) => string)) => void;
}) {
  const [inputText, setInputText] = useState(''); // Estado del texto

  const handleTextChange = (text: string) => {
    setInputText(text); // Actualiza el estado del texto
  };

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
      <Overlay
        showCompiler={showCompiler}
        onShowCompilerChange={onShowCompilerChange}
        onTextChange={handleTextChange}
        handleClick={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
      <Canvas iframeSrc={iframeSrc} handleIframeStateChange={handleIframeStateChange} onTextChange={handleTextChange} text={''} />
      <CanvasEventListeners />
    </>
  );
}
