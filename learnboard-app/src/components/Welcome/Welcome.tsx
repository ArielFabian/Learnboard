import React, { useState, useEffect } from 'react';
import { Button, Form, Card, Row, Col } from 'react-bootstrap';
import { useRouter } from 'next/router';
import styles from './Welcome.module.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../Landing/Header';
import Footer from '../Landing/Footer';
import Snackbar from '../SnackBar/Snackbar';
import { auth } from '~/utils/firebaseconfig';

const Welcome: React.FC = () => {
  const router = useRouter();
  const [showSnackbar, setShowSnackbar] = useState(false); // Controlar la visibilidad del snackbar
  const [snackbarMessage, setSnackbarMessage] = useState(''); // Mensaje del snackbar
  const [snackbarType, setSnackbarType] = useState<'success' | 'error' | 'warning' | 'info'>('info'); // Tipo de snackbar
  const [user, setUser] = useState<any>(null); // Para manejar la información del usuario
  const [boardCode, setBoardCode] = useState(''); // Para el código de la pizarra

  useEffect(() => {
    // Obtener la información del usuario loggeado desde Firebase
    const unsubscribe = auth.onAuthStateChanged((loggedInUser) => {
      if (loggedInUser) {
        setUser({
          name: loggedInUser.displayName || loggedInUser.email, // Usa el nombre o el email si no tiene nombre
          email: loggedInUser.email,
        });
      } else {
        // Redirigir a la página de inicio de sesión si no está autenticado
        router.push('/login');
      }
    });

    return () => unsubscribe();
  }, [router]);

  // Validar que el código solo tenga números
  const isValidCode = (code: string) => {
    return /^[0-9]+$/.test(code); // Expresión regular para validar solo números
  };

  // Petición POST para crear una nueva pizarra
  const handleStartBoardClick = async () => {
    if (!user) {
      setSnackbarMessage('Por favor, inicie sesión para continuar');
      setSnackbarType('error');
      setShowSnackbar(true);
      setTimeout(() => setShowSnackbar(false), 3000);
      return;
    }

    try {
      // Hacer la petición POST al servidor para crear un espacio colaborativo
      const response = await axios.post('http://api.learn-board.tech/colabs', {
        name: user.name,
        email: user.email,
      });

      if (response.status === 200) {
        setSnackbarMessage('Pizarra creada con éxito');
        setSnackbarType('success');
        setShowSnackbar(true);
        setTimeout(() => {
          setShowSnackbar(false);
          // Redirigir a la pizarra creada
          router.push(`/canvas/${response.data.code}`);
        }, 3000);
      }
    } catch (error) {
      console.error('Error creando la pizarra:', error);
      setSnackbarMessage('Error creando la pizarra, por favor intenta más tarde');
      setSnackbarType('error');
      setShowSnackbar(true);
      setTimeout(() => setShowSnackbar(false), 3000);
    }
  };

  // Petición GET para unirse a una pizarra existente
  const handleJoinBoardClick = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidCode(boardCode)) {
      setSnackbarMessage('El código debe contener solo números');
      setSnackbarType('error');
      setShowSnackbar(true);
      setTimeout(() => setShowSnackbar(false), 3000);
      return;
    }

    try {
      // Hacer la petición GET al servidor para verificar si existe la pizarra
      const response = await axios.get(`https://api.learn-board.tech/colabs/${boardCode}`);

      if (response.status === 200) {
        setSnackbarMessage('Te has unido con éxito a la pizarra');
        setSnackbarType('success');
        setShowSnackbar(true);
        setTimeout(() => {
          setShowSnackbar(false);
          // Redirigir a la pizarra
          router.push(`/canvas/${boardCode}`);
        }, 3000);
      }
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        setSnackbarMessage('Pizarra no encontrada');
        setSnackbarType('error');
        setShowSnackbar(true);
        setTimeout(() => setShowSnackbar(false), 3000);
      } else {
        setSnackbarMessage('Error del servidor, por favor intenta más tarde');
        setSnackbarType('error');
        setShowSnackbar(true);
        setTimeout(() => setShowSnackbar(false), 3000);
      }
    }
  };

  return (
    <>
      <Header />
      <div className={styles.authContainer}>
        {/* Mensaje de bienvenida */}
        <div className={styles.authForm}>
          <h3 className={`${styles.title} text-center`}>¡Bienvenido a LearnBoard!</h3>
          <p className="text-center">
            Estás a solo un clic de comenzar a colaborar en tiempo real con tus compañeros de clase o trabajo. ¡Estamos emocionados de tenerte aquí!
          </p>

          {/* Columnas con Cards */}
          <Row>
            {/* Columna izquierda: Formulario para unirse a una pizarra */}
            <Col md={12} className="mb-4">
              <Card className="shadow-sm">
                <Card.Body>
                  <h4 className="text-center">Únete a una Pizarra</h4>
                  <Form onSubmit={handleJoinBoardClick}>
                    <Form.Group controlId="formBoardCode">
                      <Form.Label>Código de la Pizarra</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Ingresa el código de la pizarra"
                        className={styles.formControl}
                        value={boardCode}
                        onChange={(e) => setBoardCode(e.target.value)} // Actualizar el estado con el código
                      />
                    </Form.Group>
                    <Button variant="danger" type="submit" className="w-100 mt-3">
                      Unirse
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>

            {/* Columna derecha: Botón para iniciar una pizarra */}
            <Col md={12}>
              <Card className="shadow-sm">
                <Card.Body className="d-flex flex-column align-items-center">
                  <h4 className="text-center">Inicia tu propia Pizarra</h4>
                  <Button
                    variant="primary"
                    className="w-100 mt-3"
                    onClick={handleStartBoardClick}
                  >
                    Iniciar Pizarra
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </div>

      {/* Footer */}
      <Footer />

      {/* Snackbar para mostrar el mensaje */}
      <Snackbar
        message={snackbarMessage}
        type={snackbarType}
        show={showSnackbar}
        onClose={() => setShowSnackbar(false)}
      />
    </>
  );
};

export default Welcome;