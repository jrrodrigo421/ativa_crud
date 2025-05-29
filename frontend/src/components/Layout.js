import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Layout = ({ children }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-primary text-light shadow-md">
        <div className="container mx-auto p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Ativa CRUD</h1>
          <button 
            onClick={handleLogout}
            className="bg-primary-dark hover:bg-red-800 text-light px-4 py-2 rounded transition-colors"
          >
            Sair
          </button>
        </div>
      </header>

      <main className="flex-grow container mx-auto p-4">
        {children}
      </main>

      <footer className="bg-secondary text-light py-4">
        <div className="container mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} Ativa CRUD. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout; 