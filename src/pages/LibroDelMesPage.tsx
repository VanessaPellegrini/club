import React, { useState, useEffect } from 'react';
import LibroDelMes from '../components/LibroDelMes';

// Import book covers
const bookCovers: Record<string, () => Promise<{ default: string }>> = import.meta.glob('../assets/books_cover/*');

interface Book {
  cover: string;
  title: string;
  author: string;
  formats: {
    physical: boolean;
    audio: boolean;
    digital: boolean;
  };
  reviews: {
    reviewerName: string;
    thoughts: string;
    favoriteQuote: string;
    rating: number;
  }[];
}

const LibroDelMesPage: React.FC = () => {
  const [currentBook, setCurrentBook] = useState<Book | null>(null);

  useEffect(() => {
    // Cargar la imagen del libro del mes
    const loadBookCover = async () => {
      const covers = Object.keys(bookCovers);
      if (covers.length > 0) {
        const module = await bookCovers[covers[1]](); // Usamos el segundo libro como libro del mes
        const bookDetails: Book = {
          cover: module.default,
          title: 'Libro del mes',
          author: 'Autor Ejemplo',
          formats: {
            physical: true,
            audio: true,
            digital: true,
          },
          reviews: [
            {
              reviewerName: 'María García',
              thoughts: 'Una lectura fascinante que te mantiene enganchado desde la primera página.',
              favoriteQuote: 'La vida no es la que uno vivió, sino la que uno recuerda y cómo la recuerda para contarla.',
              rating: 5
            },
            {
              reviewerName: 'Juan Pérez',
              thoughts: 'Una historia que te hace reflexionar sobre la vida y el tiempo.',
              favoriteQuote: 'No hay medicina que cure lo que no cura la felicidad.',
              rating: 4
            }
          ]
        };
        setCurrentBook(bookDetails);
      }
    };

    loadBookCover();
  }, []);

  if (!currentBook) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">Libro del Mes</h1>
      <LibroDelMes book={currentBook} />
    </div>
  );
};

export default LibroDelMesPage;
