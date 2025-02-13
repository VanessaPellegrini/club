import { useState } from 'react';
import { Link } from 'react-router-dom';

interface NavbarProps {
  logoText?: string;
  logoImage?: string;
}

const Navbar = ({ 
  logoText = "Club de Lectura",
  logoImage = "/logo-placeholder.png" // You can replace this with your actual logo path
}: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Inicio', path: '/' },
    { name: 'Libro del Mes', path: '/libro-del-mes' },
    { name: 'Calendario', path: '/calendario' },
    //{ name: 'Biblioteca', path: '/biblioteca' },
    { name: 'Perfil', path: '/perfil' }
  ];

  return (
    <header className="bg-white shadow-lg">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" role="navigation">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            {/* Logo Container */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <img 
                  src={logoImage} 
                  alt={`${logoText} logo`}
                  className="h-8 w-auto"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
                <span className="text-xl font-bold text-gray-800">{logoText}</span>
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:ml-6 md:flex md:space-x-8">
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

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              aria-expanded={isOpen}
              aria-label="Abrir menú principal"
            >
              <span className="sr-only">Abrir menú principal</span>
              {!isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden" role="menu" aria-orientation="vertical">
          <div className="pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 transition-colors duration-200"
                role="menuitem"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;