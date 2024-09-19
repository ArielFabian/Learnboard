import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react'; // Asegúrate de que la librería esté instalada correctamente
import Compiler from './Compiler/Complier';
import AppLayout from '~/layouts/AppLayout';
import styles from './HeaderCompiler.module.css';

interface HeaderCompilerProps {
  showCompiler: boolean;
  toggleView: () => void;
  src: string;
  width?: string;
  height?: string;
}

const HeaderCompiler: React.FC<HeaderCompilerProps> = ({ showCompiler, toggleView, src, width = '300px', height = '200px' }) => {
  const [showQR, setShowQR] = useState(false);

  const toggleQR = () => {
    setShowQR(!showQR);
  };

  const currentUrl = window.location.href;

  return (
    <div>
      <div className={styles['header-container']}>
        <button className={styles['header-button']} onClick={toggleView}>
          {showCompiler ? 'Regresar al canvas' : 'Ir al compiler'}
        </button>
        <button className={styles['header-button']} onClick={toggleQR}>
          {showQR ? 'Ocultar QR' : 'QR'}
        </button>
      </div>

      <div className={styles.iframeContainer}>
        <iframe
          src={src}
          style={{ width: width, height: height }} // Inline styles for dynamic sizing
          className={styles.iframe}
          frameBorder="0"
          allowFullScreen
          title="Iframe Content"
        />
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
    </div>
  );
};

export default HeaderCompiler;
