import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  logoText?: string;
  logoImage?: string;
}

const Navbar = ({ 
  logoText = "Club de Lectura",
  logoImage = "/logo-placeholder.png"
}: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  // Elementos de navegación públicos
  const publicNavItems = [
    { name: 'Inicio', path: '/' },
    { name: 'Libro del Mes', path: '/libro-del-mes' },
  ];

  // Elementos de navegación para usuarios autenticados
  const privateNavItems = [
    { name: 'Calendario', path: '/calendario' },
    { name: 'Biblioteca', path: '/biblioteca' },
    { name: 'Mi Perfil', path: '/perfil' },
  ];

  // Elementos de navegación para administradores
  const adminNavItems = [
    { name: 'Panel Admin', path: '/admin' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Determinar qué elementos mostrar basado en la autenticación y rol
  const navItems = [
    ...publicNavItems,
    ...(isAuthenticated ? privateNavItems : []),
    ...(isAuthenticated && user?.role === 'admin' ? adminNavItems : []),
  ];

  return (
    <header className="bg-white shadow-lg">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" role="navigation">
        <div className="flex justify-between h-14 sm:h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <img 
                  src={logoImage} 
                  alt={`${logoText} logo`}
                  className="h-6 sm:h-8 w-auto"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
                <span className="text-lg sm:text-xl font-bold text-gray-800">{logoText}</span>
              </Link>
            </div>
            <div className="hidden md:ml-6 md:flex md:space-x-4 lg:space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900 hover:border-gray-300 border-b-2 border-transparent hover:border-gray-300 transition-colors duration-200"
                  aria-label={`Ir a ${item.name}`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden md:flex md:items-center md:space-x-4">
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Cerrar Sesión
              </button>
            ) : (
              <div className="space-x-4">
                <Link
                  to="/login"
                  className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Iniciar Sesión
                </Link>
                <Link
                  to="/registro"
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Registrarse
                </Link>
              </div>
            )}
          </div>
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              aria-expanded={isOpen}
              aria-label="Menú principal"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200" role="menu" aria-orientation="vertical">
          <div className="pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="block pl-3 pr-4 py-2 text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition-colors duration-200"
                role="menuitem"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            {isAuthenticated ? (
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="block w-full text-left pl-3 pr-4 py-2 text-base font-medium text-red-600 hover:text-red-800 hover:bg-gray-50 transition-colors duration-200"
                role="menuitem"
              >
                Cerrar Sesión
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block pl-3 pr-4 py-2 text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition-colors duration-200"
                  role="menuitem"
                  onClick={() => setIsOpen(false)}
                >
                  Iniciar Sesión
                </Link>
                <Link
                  to="/registro"
                  className="block pl-3 pr-4 py-2 text-base font-medium text-blue-600 hover:text-blue-800 hover:bg-gray-50 transition-colors duration-200"
                  role="menuitem"
                  onClick={() => setIsOpen(false)}
                >
                  Registrarse
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;