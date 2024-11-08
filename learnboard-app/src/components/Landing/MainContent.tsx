import styles from './MainContent.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { Button, Form, Card, Row, Col } from 'react-bootstrap';
import { useRouter } from 'next/router';
import axios from 'axios'; // Usamos axios para hacer la solicitud HTTP
import 'bootstrap/dist/css/bootstrap.min.css';
import Typewriter from 'typewriter-effect';
import Snackbar from '../SnackBar/Snackbar'; // Componente de Snackbar para notificaciones

const JoinCallPage: React.FC = () => {
  const router = useRouter();
  const [callCode, setCallCode] = useState(''); // Código de la llamada
  // const [userName, setUserName] = useState('');
  const [showSnackbar, setShowSnackbar] = useState(false); // Mostrar Snackbar
  const [snackbarMessage, setSnackbarMessage] = useState(''); // Mensaje del Snackbar
  const [snackbarType, setSnackbarType] = useState<'success' | 'error' | 'warning' | 'info'>('info'); // Tipo de Snackbar

  // Validar que el código de la llamada solo contenga números
  const isValidCode = (code: string) => {
    return /^[0-9]+$/.test(code); // Solo números
  };

  // Petición GET para unirse a una llamada
  const handleJoinCallClick = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidCode(callCode)) {
      setSnackbarMessage('El código de la llamada debe contener solo números');
      setSnackbarType('error');
      setShowSnackbar(true);
      setTimeout(() => setShowSnackbar(false), 3000);
      return;
    }

    try {
      // Hacer la petición GET al servidor para unirse a la llamada
      const response = await axios.get(`http://64.23.247.40:8000/colabs/${callCode}`);

      if (response.status === 200) {
        setSnackbarMessage('Te has unido con éxito a la llamada');
        setSnackbarType('success');
        setShowSnackbar(true);
        setTimeout(() => {
          setShowSnackbar(false);
          // Redirigir a la página de la llamada
          router.push(`/canvas/${callCode}`);
        }, 3000);
      }
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        setSnackbarMessage('Código de llamada no encontrado');
        setSnackbarType('error');
        setShowSnackbar(true);
        setTimeout(() => setShowSnackbar(false), 3000);
      } else {
        setSnackbarMessage('Error del servidor, por favor intente más tarde');
        setSnackbarType('error');
        setShowSnackbar(true);
        setTimeout(() => setShowSnackbar(false), 3000);
      }
    }
  };

  return (
    <div className={`${styles.joinCallContainer} py-5`}>
      <div className="container">
        <Row className="justify-content-center align-items-stretch"> {/* Agregamos align-items-stretch para que las cards se estiren */}
          {/* Card izquierda con los mensajes y el botón de la extensión */}
          <Col md={6} className="mb-4 d-flex">
            <Card className="shadow-sm p-4 w-100"> {/* Agregamos w-100 para que la card ocupe todo el ancho */}
              <Card.Body className="text-center">
                <h2 className="text-dark mb-4">Transforma tus clases con dinamismo</h2>
                <p className="text-muted lead">
                  Haz que tus lecciones sean interactivas, atractivas y efectivas.
                </p>
                {/* Efecto de máquina de escribir */}
                <Typewriter
                  options={{
                    strings: [
                      'Crea experiencias de aprendizaje inolvidables',
                      'Mejora la participación y el entendimiento de tus estudiantes',
                      'Haz que cada clase sea dinámica y entretenida',
                      'La tecnología que impulsa tu éxito educativo'
                    ],
                    autoStart: true,
                    loop: true,
                    delay: 60,
                    deleteSpeed: 25,
                  }}
                />
                <Button variant="primary" className="mt-4">
                  Consigue la extensión LearnBoard
                </Button>
                <div className="d-flex justify-content-center mt-4">
                  <img
                    src="./images/assets/chrome.png"
                    alt="Chrome Extension"
                    className="img-fluid"
                    style={{ width: '50px', height: '50px' }}
                  />
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Card derecha con el formulario para unirse a la llamada */}
          <Col md={6} className="mb-4 d-flex">
            <Card className="shadow-sm p-4 w-100"> {/* Agregamos w-100 para que la card ocupe todo el ancho */}
              <Card.Body>
                <h2 className="text-center text-dark">Únete a una llamada</h2>
                <p className="text-center text-muted">
                  Ingresa el código de la llamada
                </p>
                <Form onSubmit={handleJoinCallClick}>
                  <Form.Group controlId="formCallCode" className="mt-3">
                    <Form.Label>Código de la llamada</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Ingresa el código de la llamada"
                      value={callCode}
                      onChange={(e) => setCallCode(e.target.value)}
                      className={styles.formControl}
                      required
                    />
                  </Form.Group>
                  <Button variant="success" type="submit" className="w-100 mt-4">
                    Unirse a la llamada
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>

      {/* Snackbar para mostrar notificaciones */}
      <Snackbar
        message={snackbarMessage}
        type={snackbarType}
        show={showSnackbar}
        onClose={() => setShowSnackbar(false)}
      />
    </div>
  );
};

export default JoinCallPage;
