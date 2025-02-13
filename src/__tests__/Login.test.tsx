import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import Login from '../components/Login';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Login Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  const renderLogin = () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
  };

  it('renders login form correctly', () => {
    renderLogin();
    
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Contraseña')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /iniciar sesión/i })).toBeInTheDocument();
    expect(screen.getByText('Recuperación de contraseña')).toBeInTheDocument();
  });

  it('shows validation errors for empty fields', async () => {
    renderLogin();
    
    const submitButton = screen.getByRole('button', { name: /iniciar sesión/i });
    await act(async () => {
      fireEvent.click(submitButton);
    });

    const alerts = await screen.findAllByRole('alert');
    expect(alerts).toHaveLength(2);
    expect(alerts[0]).toHaveTextContent('El email es requerido');
    expect(alerts[1]).toHaveTextContent('La contraseña es requerida');
  });

  it('shows error for invalid email format', async () => {
    renderLogin();
    
    const emailInput = screen.getByPlaceholderText('Email');
    fireEvent.change(emailInput, { target: { value: 'invalidemail' } });
    
    const submitButton = screen.getByRole('button', { name: /iniciar sesión/i });
    await act(async () => {
      fireEvent.click(submitButton);
    });

    const alert = await screen.findByRole('alert');
    expect(alert).toHaveTextContent('Por favor ingrese un email válido');
  });

  it('shows error for short password', async () => {
    renderLogin();
    
    const passwordInput = screen.getByPlaceholderText('Contraseña');
    fireEvent.change(passwordInput, { target: { value: '12345' } });
    
    const submitButton = screen.getByRole('button', { name: /iniciar sesión/i });
    await act(async () => {
      fireEvent.click(submitButton);
    });

    const alert = await screen.findByRole('alert');
    expect(alert).toHaveTextContent('La contraseña debe tener al menos 6 caracteres');
  });

  it('handles successful login', async () => {
    const mockResponse = { token: 'fake-token' };
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      })
    ) as jest.Mock;

    renderLogin();
    
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Contraseña');
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    
    const submitButton = screen.getByRole('button', { name: /iniciar sesión/i });
    
    await act(async () => {
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(localStorage.getItem('authToken')).toBe('fake-token');
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
    });
  });

  it('handles failed login', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
      })
    ) as jest.Mock;

    renderLogin();
    
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Contraseña');
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    
    const submitButton = screen.getByRole('button', { name: /iniciar sesión/i });
    
    await act(async () => {
      fireEvent.click(submitButton);
    });

    const alert = await screen.findByRole('alert');
    expect(alert).toHaveTextContent('Credenciales inválidas');
  });

  it('handles network error', async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error('Network error'))) as jest.Mock;

    renderLogin();
    
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Contraseña');
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    
    const submitButton = screen.getByRole('button', { name: /iniciar sesión/i });
    
    await act(async () => {
      fireEvent.click(submitButton);
    });

    const alert = await screen.findByRole('alert');
    expect(alert).toHaveTextContent('Error al intentar iniciar sesión. Por favor intente nuevamente.');
  });
});
