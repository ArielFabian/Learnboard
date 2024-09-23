import React, { useEffect } from 'react';

import styles from './AppLayout.module.css';

import Canvas from '~/components/Canvas';
import CanvasEventListeners from '~/components/CanvasEventListeners';
import Overlay from '~/components/Overlay';

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
      <Overlay showCompiler={showCompiler} onShowCompilerChange={onShowCompilerChange} />
      <Canvas iframeSrc={iframeSrc} handleIframeStateChange={handleIframeStateChange} />
      <CanvasEventListeners />
    </>
  );
}
