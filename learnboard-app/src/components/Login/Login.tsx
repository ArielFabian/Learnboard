import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { auth } from '../../utils/firebaseconfig';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import styles from './Login.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '~/components/Landing/Header';
import { useRouter } from 'next/router';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Inicial sesión con éxito');
      router.push('/welcome');
    } catch (err) {
      setError('Fallo al iniciar sesión, verifica tus credenciales');
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      alert('Estas logueado con Google');
      router.push('/welcome');
    } catch (err) {
      setError('Fallo al iniciar sesión con Google');
    }
  };

  return (
    <>
      <Header />
      <div className={styles.loginContainer}>
        <Form onSubmit={handleLogin} className={styles.loginForm}>
          <h3 className={styles.title}>Login</h3>
          <img src="./images/assets/Logo-LB-3.png" alt="LearnBoard" className="img-fluid mb-4" />
          <p className="text-center">Ingresa tu cuenta<br />Te queremos mucho usuario :3</p>
          {error && <p className="text-danger text-center">{error}</p>}
          <Form.Group className="mb-3">
            <Form.Label>Correo Gmail</Form.Label>
            <Form.Control
              type="email"
              placeholder="Ingrese su correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100 mb-3">
            Ingresar con Email
          </Button>
          <Button variant="danger" onClick={handleGoogleLogin} className="w-100 mb-3">
            Ingresar con Google
          </Button>
          <div className="text-center">
            <p>
              ¿No tienes una cuenta?{' '}
              <a href="#" onClick={() => router.push('/register')}>
                Haz click aquí
              </a>
            </p>
            <p>
              ¿Olvidaste tu contraseña?{' '}
              <a href="#" onClick={() => router.push('/reset-password')}>
                Haz click aquí
              </a>
            </p>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Login;
