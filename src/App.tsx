import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './sections/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import LibroDelMesPage from './pages/LibroDelMesPage';
import Calendario from './pages/Calendario';
import './App.css';

// Placeholder components for routes
const Library = () => <div className="p-4">Biblioteca</div>
const Profile = () => <div className="p-4">Perfil</div>

function App() {
  const [clubName, setClubName] = useState("Club de Lectura");

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar logoText={clubName} />
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/libro-del-mes" element={<LibroDelMesPage />} />
            <Route path="/calendario" element={<Calendario />} />
            <Route path="/biblioteca" element={<Library />} />
            <Route path="/perfil" element={<Profile />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
