import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { auth } from '~/utils/firebaseconfig';
import { sendPasswordResetEmail } from 'firebase/auth';
import { useRouter } from 'next/router';
import styles from './Reset.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../Landing/Header';
import Footer from '../Landing/Footer';


const ResetPassword: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const router = useRouter();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess('Correo de recuperación enviado. Revisa tu bandeja de entrada.');
    } catch (err) {
      setError('Error al enviar el correo de recuperación.');
    }
  };

  return (
    <>
    <Header/>
    <div className={styles.authContainer}>
      <Form onSubmit={handleResetPassword} className={styles.authForm}>
        <h3 className={styles.title}>Recuperar Contraseña</h3>
        {error && <p className={styles.textDanger}>{error}</p>}
        {success && <p className={styles.textSuccess}>{success}</p>}
        <Form.Group className="mb-3">
          <Form.Label>Correo</Form.Label>
          <Form.Control
            type="email"
            placeholder="Ingresa tu correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.formControl}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className={`w-100 ${styles.btnPrimary}`}>
          Enviar Correo de Recuperación
        </Button>
      </Form>
    </div>
    <Footer/>
    </>
  );
};

export default ResetPassword;