// src/components/HeaderCompiler.tsx
import React, { useState } from 'react';
import Compiler from './Compiler/Complier';
import Canvas from './Canvas';
import styles from './Header-Compiler.module.css';
import CanvasPreview from './CanvasPreview';
import LoadingOverlay from './LoadingOverlay';
import AppLayout from '~/layouts/AppLayout';
import { QRCodeCanvas } from 'qrcode.react';

const HeaderCompiler: React.FC = () => {
  // Estado para manejar si se muestra Compiler o Canvas
  const [showCompiler, setShowCompiler] = useState(true);
  // Estado para controlar la visibilidad del QR
  const [showQR, setShowQR] = useState(false);

  // Función para alternar entre Compiler y Canvas
  const toggleView = () => {
    setShowCompiler(!showCompiler);
  };

  // Función para mostrar/ocultar el código QR
  const toggleQR = () => {
    setShowQR(!showQR);
  };

  // Obtener la URL actual del navegador
  const currentUrl = window.location.href;

  return (
    <div>
      {/* Contenedor fijo para el header */}
      <div className={styles['header-container']}>
        <header className={styles['header-compiler']}>
          <button className={styles['header-button']} onClick={toggleView}>
            {showCompiler ? 'Regresar al canvas' : 'Ir al compiler'}
          </button>
          <button className={styles['header-button']} onClick={toggleQR}>
            {showQR ? 'Ocultar QR' : 'QR'}
          </button>
          <button className={styles['header-button']}>Relleno</button>
        </header>
      </div>

      {/* Mostrar el código QR si el botón es presionado */}
      {showQR && (
        <div className="qr-container">
          <QRCodeCanvas value={currentUrl} size={200} /> {/* Generar el QR con la URL actual */}
        </div>
      )}

      {/* Renderización condicional de los componentes */}
      {showCompiler ? <Compiler /> : <AppLayout />}
    </div>
  );
};

export default HeaderCompiler;
