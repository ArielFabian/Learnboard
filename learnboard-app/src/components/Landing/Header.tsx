import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/router';
import { onAuthStateChanged, signOut, sendEmailVerification } from 'firebase/auth';
import { auth } from '~/utils/firebaseconfig';
import styles from './Header.module.css';

interface HeaderProps {
  isVerificationPage?: boolean; // Prop para determinar si es la página de verificación
}

const Header: React.FC<HeaderProps> = ({ isVerificationPage = false }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Verifica si el usuario está autenticado
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });

    // Cleanup suscripción
    return () => unsubscribe();
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogoutClick = async () => {
    await signOut(auth);
    router.push('/');
  };
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className={styles.navbar}>
      <Container>
        <Navbar.Brand href="#" onClick={() => router.push('/')} className={styles.logo}>
          LearnBoard
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={toggleMenu} className="text-light" />
        <Navbar.Collapse id="basic-navbar-nav" className={menuOpen ? styles.showMenu : ''}>
          <Nav className="m-auto">
            {isVerificationPage ? (
              <>
                {/* Si es la página de verificación, solo mostramos "Cerrar Sesión" y "Reenviar correo de verificación" */}
                <Nav.Link href="#" className={styles.navLink} onClick={handleLogoutClick}>
                  Cerrar Sesión
                </Nav.Link>
                {emailSent && (
                  <p className="text-success mt-2">Correo de verificación reenviado. Revisa tu bandeja de entrada.</p>
                )}
              </>
            ) : (
              !isAuthenticated ? (
                <>
                  <Nav.Link href="#" className={styles.navLink} onClick={() => router.push('/register')}>
                    Crear Cuenta
                  </Nav.Link>
                  <Nav.Link href="#" className={styles.navLink} onClick={() => router.push('/login')}>
                    Iniciar Sesión
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link href="#" className={styles.navLink} onClick={() => router.push('/welcome')}>
                    Iniciar Pizarra
                  </Nav.Link>
                  <Nav.Link href="#" className={styles.navLink} onClick={handleLogoutClick}>
                    Cerrar Sesión
                  </Nav.Link>
                </>
              )
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
