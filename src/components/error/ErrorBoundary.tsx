import React, { Component, ErrorInfo, ReactNode } from 'react';
import { ErrorPage } from './ErrorPage';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by error boundary:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <ErrorPage
          title="¡Ups! Algo salió mal"
          message="Ha ocurrido un error inesperado. Por favor, intenta recargar la página."
          error={this.state.error}
        />
      );
    }

    return this.props.children;
  }
}
