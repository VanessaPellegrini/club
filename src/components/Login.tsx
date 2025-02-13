import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './Login.module.css';

interface LoginFormData {
  email: string;
  password: string;
}

interface ValidationErrors {
  email?: string;
  password?: string;
  general?: string;
}

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();
  
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Por favor ingrese un email válido';
    }

    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name as keyof ValidationErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Credenciales inválidas');
      }

      const { token, user } = await response.json();
      
      auth.login(token, user);

      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    } catch (error) {
      setErrors({
        general: 'Error al iniciar sesión. Por favor verifica tus credenciales.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.leftSection}>
        <img src="/illustration.svg" alt="Welcome illustration" />
      </div>
      
      <div className={styles.rightSection}>
        <div className={styles.loginForm}>
          <div className={styles.header}>
            <h1>¡Hola de nuevo!</h1>
            <p>Bienvenido de vuelta, te extrañamos</p>
          </div>

          <form onSubmit={handleSubmit}>
            {errors.general && (
              <div className={styles.errorAlert}>
                {errors.general}
              </div>
            )}

            <div className={styles.inputGroup}>
              <input
                type="email"
                name="email"
                className={styles.input}
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <div className={styles.errorText}>{errors.email}</div>}
            </div>

            <div className={styles.inputGroup}>
              <input
                type="password"
                name="password"
                className={styles.input}
                placeholder="Contraseña"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && <div className={styles.errorText}>{errors.password}</div>}
            </div>

            <button 
              type="submit" 
              className={styles.submitButton}
              disabled={isLoading}
            >
              {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </button>
          </form>

          <div className={styles.socialLogin}>
            <p>O continúa con</p>
            <div className={styles.socialButtons}>
              <button 
                className={styles.socialButton}
                onClick={() => {}} 
                aria-label="Login with Google"
              >
                G
              </button>
              <button 
                className={styles.socialButton}
                onClick={() => {}} 
                aria-label="Login with Facebook"
              >
                f
              </button>
              <button 
                className={styles.socialButton}
                onClick={() => {}} 
                aria-label="Login with Apple"
              >
                ⌘
              </button>
            </div>
          </div>

          <div className={styles.registerLink}>
            <p>
              ¿No eres miembro? <a href="/registro">Regístrate ahora</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
