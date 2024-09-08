import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={`${styles.footer} bg-dark text-white py-4`}>
      <div className="container d-flex justify-content-between align-items-center">
        {/* Texto del footer a la izquierda */}
        <div className={styles.footerLeft}>
          <p>LearnBoard - La mejor plataforma para educación colaborativa en línea.</p>
          <p>&copy; 2024 LearnBoard, Todos los derechos reservados.</p>
        </div>

        {/* Texto central */}
        <div className={styles.footerCenter}>
          <p>Conéctate con nosotros</p>
        </div>

        {/* Iconos de redes sociales a la derecha */}
        <div className={`${styles.footerRight} d-flex`}>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className={styles.iconContainer}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className={styles.icon} viewBox="0 0 16 16">
              <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" />
            </svg>
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className={styles.iconContainer}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className={styles.icon} viewBox="0 0 16 16">
              <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
            </svg>
          </a>
          <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer" className={styles.iconContainer}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className={styles.icon} viewBox="0 0 16 16">
              <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
