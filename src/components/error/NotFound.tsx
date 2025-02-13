import React from 'react';
import { ErrorPage } from './ErrorPage';

export const NotFound: React.FC = () => (
  <ErrorPage
    statusCode={404}
    title="Página no encontrada"
    message="Lo sentimos, no pudimos encontrar la página que estás buscando."
  />
);
