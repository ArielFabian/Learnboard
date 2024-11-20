import React, { useEffect, useState } from 'react';
import Canvas, { CanvasProvider } from '~/components/Canvas';
import CanvasEventListeners from '~/components/CanvasEventListeners';
import Overlay from '~/components/Overlay';

export default function AppLayout({
  showCompiler,
  onShowCompilerChange,
}: {
  showCompiler: boolean;
  onShowCompilerChange: (newShowCompiler: boolean | ((prevState: boolean) => boolean)) => void;
}) {
  const [inputText, setInputText] = useState('');
  const [takeScreenshot, setTakeScreenshot] = useState(false);
  const handleTextChange = (text: string) => {
    setInputText(text);
  };
  const handleTakeScreenshot = (takeScreenshot: boolean) => {
    setTakeScreenshot(takeScreenshot);
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
     <CanvasProvider> <Overlay
        showCompiler={showCompiler}
        onShowCompilerChange={onShowCompilerChange}
        onTextChange={handleTextChange}
        onTakeScreenshotChange={handleTakeScreenshot}
        handleLatexClick={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
      
      <Canvas text={inputText} handleTextChange={handleTextChange} takeScreenshot = {takeScreenshot} handleTakeScreenshot = {handleTakeScreenshot}/>
      
      <CanvasEventListeners /></CanvasProvider>
    </>
  );
}
