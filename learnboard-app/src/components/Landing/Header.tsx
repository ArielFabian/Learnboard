import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/router';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '~/utils/firebaseconfig';
import styles from './Header.module.css';

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
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

  const handleCreateAccountClick = () => {
    router.push('/register');
  };

  const handleMainClick = () => {
    router.push('/');
  };

  const handleLoginClick = () => {
    router.push('/login');
  };

  const handleStartCallClick = () => {
    router.push('/start-call');
  };

  const handleLogoutClick = async () => {
    await signOut(auth);
    router.push('/');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className={styles.navbar}>
      <Container>
        <Navbar.Brand href="#" onClick={handleMainClick} className={styles.logo}>
          LearnBoard
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={toggleMenu} className="text-light" />
        <Navbar.Collapse id="basic-navbar-nav" className={menuOpen ? styles.showMenu : ''}>
          <Nav className="m-auto">
            {!isAuthenticated ? (
              <>
                <Nav.Link href="#" className={styles.navLink} onClick={handleCreateAccountClick}>
                  Crear Cuenta
                </Nav.Link>
                <Nav.Link href="#" className={styles.navLink} onClick={handleLoginClick}>
                  Iniciar Sesión
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link href="#" className={styles.navLink} onClick={handleStartCallClick}>
                  Iniciar Pizarra
                </Nav.Link>
                <Nav.Link href="#" className={styles.navLink} onClick={handleLogoutClick}>
                  Cerrar Sesión
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;