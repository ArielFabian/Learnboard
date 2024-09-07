import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer bg-dark text-white py-4">
      <div className="container d-flex justify-content-between align-items-center">
        {/* Espacio para el texto a la izquierda */}
        <div className="footer-left">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.</p>
        </div>

        {/* Espacio para el texto central */}
        <div className="footer-center">
          <p>Este es el texto central del footer</p>
        </div>

        {/* Espacio para las imágenes de iconos a la derecha */}
        <div className="footer-right d-flex">
          <div className="icon-container bg-white p-2 m-2">
          <img src="./assets/face.webp" alt="Meet" className="img-fluid" />
          </div>
          <div className="icon-container bg-white p-2 m-2">
          <img src="./assets/x.webp" alt="Zoom" className="img-fluid" />
          </div>
          <div className="icon-container bg-white p-2 m-2">
          <img src="./assets/tiktok.webp" alt="Teams" className="img-fluid" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;