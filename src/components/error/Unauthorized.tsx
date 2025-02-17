import React from 'react';
import { ErrorPage } from './ErrorPage';

export const Unauthorized: React.FC = () => (
  <ErrorPage
    code={401}
    title="Acceso no autorizado"
    message="No tienes permisos para acceder a esta página."
  />
);
