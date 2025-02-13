import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './sections/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import LibroDelMesPage from './pages/LibroDelMesPage';
import Calendario from './pages/Calendario';
import PerfilUsuario from './pages/PerfilUsuario';
import AdminDashboard from './pages/AdminDashboard';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/routes/ProtectedRoute';
import { ErrorBoundary } from './components/error/ErrorBoundary';
import { NotFound } from './components/error/NotFound';
import './App.css';

const Library = () => <div className="p-4">Biblioteca</div>

function App() {
  const [clubName] = useState("Club de Lectura");

  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar logoText={clubName} />
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/libro-del-mes" element={<LibroDelMesPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/registro" element={<RegisterPage />} />
                
                <Route path="/calendario" element={
                  <ProtectedRoute>
                    <Calendario />
                  </ProtectedRoute>
                } />
                <Route path="/biblioteca" element={
                  <ProtectedRoute>
                    <Library />
                  </ProtectedRoute>
                } />
                <Route path="/perfil" element={
                  <ProtectedRoute>
                    <PerfilUsuario />
                  </ProtectedRoute>
                } />
                
                <Route path="/admin" element={
                  <ProtectedRoute requireAdmin>
                    <AdminDashboard />
                  </ProtectedRoute>
                } />

                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  )
}

export default App
