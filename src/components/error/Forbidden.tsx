import React from 'react';
import { ErrorPage } from './ErrorPage';

export const Forbidden: React.FC = () => (
  <ErrorPage
    code={403}
    title="Acceso denegado"
    message="No tienes los permisos necesarios para acceder a esta página."
  />
);
