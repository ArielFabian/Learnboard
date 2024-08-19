import React, { useState } from 'react';
import './Header.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
      setMenuOpen(!menuOpen);
  };

  return (
      <header className="bg-gray-800 text-white">
          <nav className="container mx-auto flex justify-between items-center p-4">
              <div className="flex space-x-4">
                  <a href="#" className="py-2 px-4 hover:bg-gray-700 rounded">Home</a>
                  <a href="#" className="py-2 px-4 hover:bg-gray-700 rounded">Features</a>
                  <a href="#" className="py-2 px-4 hover:bg-gray-700 rounded">Pricing</a>
                  <a href="#" className="py-2 px-4 hover:bg-gray-700 rounded">Contact</a>
              </div>
              <div className="relative">
                  <button 
                      id="accountButton" 
                      className="py-2 px-4 hover:bg-gray-700 rounded" 
                      onClick={toggleMenu}
                  >
                      Cuenta
                  </button>
                  {menuOpen && (
                      <div 
                          id="accountMenu" 
                          className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg"
                      >
                          <a href="#" className="block px-4 py-2 hover:bg-gray-200">Vincular cuenta Meet</a>
                          <a href="#" className="block px-4 py-2 hover:bg-gray-200">Vincular cuenta Zoom</a>
                          <a href="#" className="block px-4 py-2 hover:bg-gray-200">Vincular cuenta Teams</a>
                          <a href="#" className="block px-4 py-2 hover:bg-gray-200">Cerrar sesión</a>
                      </div>
                  )}
              </div>
          </nav>
      </header>
  );
};

export default Header;