import React from 'react';
import { Button, Form, Card, Row, Col } from 'react-bootstrap';
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
                  <Form>
                    <Form.Group controlId="formBoardCode">
                      <Form.Label>Código de la Pizarra</Form.Label>
                      <Form.Control 
                        type="text" 
                        placeholder="Ingresa el código de la pizarra" 
                        className={styles.formControl} 
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
      <Footer />
    </>
  );
};

export default Welcome;
