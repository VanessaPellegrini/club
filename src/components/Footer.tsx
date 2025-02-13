import React from 'react';
import { HeartIcon } from '@heroicons/react/24/solid';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white shadow-inner mt-auto">
      <div className="max-w-7xl mx-auto py-3 sm:py-4 px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm sm:text-base text-gray-600 flex flex-wrap items-center justify-center gap-1 sm:gap-2">
          Desarrollado con <HeartIcon className="h-4 w-4 sm:h-5 sm:w-5 text-red-500" /> por
          <a
            href="https://github.com/VanessaPellegrini"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 hover:text-indigo-800 transition-colors font-medium"
          >
            Van
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
