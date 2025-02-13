import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpenIcon, StarIcon } from '@heroicons/react/24/outline';

interface Book {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  dateEarned: string;
}

interface UserProfile {
  username: string;
  email: string;
  profilePicture?: string;
  points: number;
  readBooks: Book[];
  toReadBooks: Book[];
  achievements: Achievement[];
}

const PerfilUsuario: React.FC = () => {
  const mockUserProfile: UserProfile = {
    username: "LectorEntusiasta",
    email: "lector@example.com",
    profilePicture: "https://api.dicebear.com/7.x/avataaars/svg?seed=LectorEntusiasta",
    points: 1250,
    readBooks: [
      {
        id: "1",
        title: "Cien años de soledad",
        author: "Gabriel García Márquez",
        coverUrl: "/books/book1.jpg"
      },
      {
        id: "2",
        title: "El Aleph",
        author: "Jorge Luis Borges",
        coverUrl: "/books/book2.jpg"
      }
    ],
    toReadBooks: [
      {
        id: "3",
        title: "Rayuela",
        author: "Julio Cortázar",
        coverUrl: "/books/book3.jpg"
      }
    ],
    achievements: [
      {
        id: "1",
        title: "Lector Principiante",
        description: "Completó su primer libro",
        icon: "🌟",
        dateEarned: "2024-01-15"
      },
      {
        id: "2",
        title: "Crítico Literario",
        description: "Escribió 5 reseñas",
        icon: "✍️",
        dateEarned: "2024-02-01"
      }
    ]
  };

  const BookList: React.FC<{ books: Book[]; title: string }> = ({ books, title }) => (
    <div className="mb-8">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {books.map((book) => (
          <Link
            key={book.id}
            to={`/libro/${book.id}`}
            className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex-shrink-0 w-16 h-24 bg-gray-200 rounded overflow-hidden">
              <img
                src={book.coverUrl}
                alt={book.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://via.placeholder.com/160x240?text=Sin+Imagen';
                }}
              />
            </div>
            <div className="ml-4">
              <h4 className="text-lg font-medium text-gray-900">{book.title}</h4>
              <p className="text-sm text-gray-600">{book.author}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-8">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img
                src={mockUserProfile.profilePicture}
                alt={mockUserProfile.username}
                className="h-24 w-24 rounded-full border-4 border-white shadow-lg"
              />
            </div>
            <div className="ml-6">
              <h1 className="text-2xl font-bold text-white">{mockUserProfile.username}</h1>
              <p className="text-indigo-100">{mockUserProfile.email}</p>
            </div>
          </div>
        </div>

        <div className="px-6 py-8">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Puntos y Logros</h2>
              <div className="flex items-center bg-yellow-100 px-4 py-2 rounded-full">
                <StarIcon className="h-5 w-5 text-yellow-500 mr-2" />
                <span className="font-semibold text-yellow-700">{mockUserProfile.points} puntos</span>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockUserProfile.achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className="bg-gray-50 rounded-lg p-4 flex items-start"
                >
                  <span className="text-2xl mr-3">{achievement.icon}</span>
                  <div>
                    <h4 className="font-medium text-gray-900">{achievement.title}</h4>
                    <p className="text-sm text-gray-600">{achievement.description}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Obtenido el {new Date(achievement.dateEarned).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <BookList books={mockUserProfile.readBooks} title="Libros leídos" />
          <BookList books={mockUserProfile.toReadBooks} title="Libros por leer" />
        </div>
      </div>
    </div>
  );
};

export default PerfilUsuario;
