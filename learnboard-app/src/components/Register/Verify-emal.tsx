import React, { useEffect, useState } from 'react';
import { auth } from '~/utils/firebaseconfig';
import { onAuthStateChanged, reload,sendEmailVerification } from 'firebase/auth';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import styles from './Register.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../Landing/Header';
import Footer from '../Landing/Footer';
const VerifyEmail: React.FC = () => {
    const [isVerified, setIsVerified] = useState(false);
    const [error, setError] = useState('');
    const [emailSent, setEmailSent] = useState(false);
    const router = useRouter();
  
    useEffect(() => {
      const checkVerificationStatus = async () => {
        const user = auth.currentUser;
        if (user) {
          await reload(user); // Recargar usuario para obtener el estado actualizado
          if (user.emailVerified) {
            setIsVerified(true);
          }
        }
      };
  
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user && user.emailVerified) {
          setIsVerified(true);
        }
      });
  
      // Intervalo para verificar si el usuario ha verificado su correo
      const intervalId = setInterval(checkVerificationStatus, 5000);
  
      return () => {
        unsubscribe();
        clearInterval(intervalId);
      };
    }, []);
  
    useEffect(() => {
      if (isVerified) {
        router.push('/welcome');
      }
    }, [isVerified, router]);
  
    const resendVerificationEmail = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          await sendEmailVerification(user);
          setEmailSent(true);
        } catch (err) {
          setError('Error al enviar el correo de verificación. Por favor intenta de nuevo.');
        }
      }
    };
  
    return (
      <>
        <Header isVerificationPage={true} /> {/* Aquí pasamos la prop isVerificationPage */}
        <div className={styles.authContainer}>
          <div className={styles.authForm}>
            <h3 className={styles.title}>Verifica tu correo electrónico</h3>
            <p>Te hemos enviado un correo de verificación. Por favor, revisa tu bandeja de entrada.</p>
            {emailSent && <p className={styles.textSuccess}>Correo reenviado. Revisa tu bandeja de entrada.</p>}
            {error && <p className={styles.textDanger}>{error}</p>}
            <Button variant="primary" onClick={resendVerificationEmail} className="w-100 mb-3">
              Reenviar Correo de Verificación
            </Button>
            <Button variant="danger" onClick={() => router.push('/login')} className="w-100">
              Cerrar Sesión
            </Button>
          </div>
        </div>
        <Footer/>
      </>
      
    );
  };
  
  export default VerifyEmail;