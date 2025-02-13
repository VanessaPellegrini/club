import React from 'react';
import { Link } from 'react-router-dom';

interface ErrorPageProps {
  code?: number;
  title: string;
  message: string;
  error?: Error | null;
}

export const ErrorPage: React.FC<ErrorPageProps> = ({
  code,
  title,
  message,
  error
}) => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
      <div className="max-w-max mx-auto">
        <main className="sm:flex">
          {code && (
            <p className="text-4xl font-extrabold text-blue-600 sm:text-5xl">
              {code}
            </p>
          )}
          <div className="sm:ml-6">
            <div className="sm:border-l sm:border-gray-200 sm:pl-6">
              <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
                {title}
              </h1>
              <p className="mt-1 text-base text-gray-500">{message}</p>
              {error && process.env.NODE_ENV === 'development' && (
                <pre className="mt-4 text-sm text-red-600 bg-red-50 p-4 rounded-md overflow-auto">
                  {error.stack}
                </pre>
              )}
            </div>
            <div className="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
              <Link
                to="/"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Volver al inicio
              </Link>
              <button
                onClick={() => window.location.reload()}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Recargar página
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
