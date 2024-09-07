import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { auth } from './firebaseconfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import './Login.css';  // Importa el archivo CSS personalizado

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Logged in successfully');
    } catch (err) {
      setError('Failed to log in. Please check your credentials.');
    }
  };

  return (
    <div className="login-container">
      <Form onSubmit={handleLogin} className="login-form">
        <h3 className="text-center mb-4">LearnBoard</h3>
        <img src="./assets/Logo-LB-3.png" alt="LearnBoard" className="img-fluid mb-4" />
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
        <Button variant="danger" type="submit" className="w-100 mb-3">
          Ingresar
        </Button>
      </Form>
    </div>
  );
};

export default Login;