import React from 'react';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import styles from './Welcome.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../Landing/Header';
import Footer from '../Landing/Footer';
const Welcome: React.FC = () => {
  const router = useRouter();

  const handleStartBoardClick = () => {
    router.push('/start-board'); // Redirige a la pizarra
  };

  return (
    <>
    <Header/>
    <div className={styles.authContainer}>
      <div className={styles.authForm}>
        <h3 className={styles.title}>¡Bienvenido a LearnBoard!</h3>
        <p>Gracias por verificar tu correo. Ya puedes comenzar a utilizar la plataforma.</p>
        <Button variant="primary" onClick={handleStartBoardClick} className="w-100">
          Iniciar Pizarra
        </Button>
      </div>
    </div>   
    <Footer/> 
    </>

  );
};

export default Welcome;
