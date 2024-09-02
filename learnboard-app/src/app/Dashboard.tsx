import React from 'react';
import Header from './components/dashboard/Header';
import MainContent from './components/dashboard/MainContent';
import Feature from './components/dashboard/Feature';
import Footer from "./components/dashboard/Footer";
const Dashboard: React.FC = () => {
  return (
    <div className="dashboard">
      <Header />
      <MainContent />
      <section className="features">
        <Feature title="Explicaciones más dinámicas" description="¡Vuelve tus clases más dinámicas!" icons="./assets/explicar.png" />
        <Feature title="Herramientas Intuitivas" description="Con el uso de herramientas intuitivas las clases en línea serán más fáciles de explicar" icons="./assets/herramientas.png" />
        <Feature title="Conexión con otras plataformas" description="Utiliza nuestra herramienta en la plataforma de tu elección de las que tenemos disponibles" icons="./assets/conexion.png" />
        <Feature title="Métodos de entrada" description="Podrás utilizar tu computadora o celular en nuestra herramienta" icons="/assets/met_ent.webp" />
      </section>
      <Footer />
    </div>
  );
};

export default Dashboard;
