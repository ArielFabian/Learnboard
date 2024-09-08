import React from 'react';
import Header from '~/components/Landing/Header';
import MainContent from '~/components/Landing/MainContent';
import Feature from '~/components/Landing/Feature';
import Footer from "~/components/Landing/Footer";
import PageSEO from '~/components/PageSEO';
import styles from '~/components/Landing/App.module.css';

export default function Page() {
  return (
    <>
      <PageSEO />
      <div className={`${styles.mainContent}`}>
        <Header />
        <MainContent />
        <section className={`${styles.features} mb-5 mt-3`}>
          <Feature title="Explicaciones más dinámicas" description="¡Vuelve tus clases más dinámicas!" icons="./images/assets/explicar.png" />
          <Feature title="Herramientas Intuitivas" description="Con el uso de herramientas intuitivas las clases en línea serán más fáciles de explicar" icons="./images/assets/herramientas.png" />
          <Feature title="Conexión con otras plataformas" description="Utiliza nuestra herramienta en la plataforma de tu elección de las que tenemos disponibles" icons="./images/assets/conexion.png" />
          <Feature title="Métodos de entrada" description="Podrás utilizar tu computadora o celular en nuestra herramienta" icons="./images/assets/met_ent.webp" />
        </section>
        <Footer />
      </div>
    </>
  );
};