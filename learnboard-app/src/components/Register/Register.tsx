import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { auth } from '~/utils/firebaseconfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/router';
import styles from './Register.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../Landing/Header';
import Footer from '../Landing/Footer';
const Register: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('Cuenta creada exitosamente');
      router.push('/login');
    } catch (err) {
      setError('Error al crear la cuenta.');
    }
  };

  return (
    <>
    <Header/>
    <div className={styles.authContainer}>
      <Form onSubmit={handleRegister} className={styles.authForm}>
        <h3 className={styles.title}>Crear Cuenta</h3>
        {error && <p className={styles.textDanger}>{error}</p>}
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
        <Form.Group className="mb-3">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Ingresa tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.formControl}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Confirmar Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirma tu contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className={styles.formControl}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className={`w-100 ${styles.btnPrimary}`}>
          Registrarse
        </Button>
      </Form>
    </div>
    <Footer/>
    </>
  );
};

export default Register;
