import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react'; // Asegúrate de que la librería esté instalada correctamente
import Compiler from './Compiler/Complier';
import AppLayout from '~/layouts/AppLayout';
import styles from './Header-Compiler.module.css';

const HeaderCompiler: React.FC = () => {
  const [showCompiler, setShowCompiler] = useState(true);
  const [showQR, setShowQR] = useState(false);

  const toggleView = () => {
    setShowCompiler(!showCompiler);
  };

  const toggleQR = () => {
    setShowQR(!showQR);
  };

  const currentUrl = window.location.href;

  return (
    <div>
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

      {/* Modal QR */}
      {showQR && (
        <div className={styles['qr-overlay']}>
          <div className={styles['qr-popup']}>
            <QRCodeCanvas value={currentUrl} size={200} />
            <button className={styles['close-button']} onClick={toggleQR}>
              X
            </button>
          </div>
        </div>
      )}

      {showCompiler ? <Compiler /> : <AppLayout />}
    </div>
  );
};

export default HeaderCompiler;
