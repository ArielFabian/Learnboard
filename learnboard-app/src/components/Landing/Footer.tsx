import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={`${styles.footer} bg-dark text-white py-4`}>
      <div className="container d-flex justify-content-between align-items-center">
        {/* Espacio para el texto a la izquierda */}
        <div className={styles.footerLeft}>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.</p>
        </div>

        {/* Espacio para el texto central */}
        <div className={styles.footerCenter}>
          <p>Este es el texto central del footer</p>
        </div>

        {/* Espacio para las imágenes de iconos a la derecha */}
        <div className={`${styles.footerRight} d-flex`}>
          <div className={`${styles.iconContainer} bg-white p-2 m-2`}>
            <img src="./images/assets/meet.webp" alt="Meet" className="img-fluid" style={{ width: '50px', height: '50px' }} />
          </div>
          <div className={`${styles.iconContainer} bg-white p-2 m-2`}>
            <img src="./images/assets/zoom.png" alt="Zoom" className="img-fluid" style={{ width: '50px', height: '50px' }} />
          </div>
          <div className={`${styles.iconContainer} bg-white p-2 m-2`}>
            <img src="./images/assets/teams.png" alt="Teams" className="img-fluid" style={{ width: '50px', height: '50px' }} />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;