import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { BookOpenIcon, SpeakerWaveIcon, DeviceTabletIcon } from '@heroicons/react/24/outline';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const bookCovers = import.meta.glob('../assets/books_cover/*', {
  eager: true,
  as: 'url'
}) as Record<string, string>;

interface Event {
  date: string;
  title: string;
}

interface ContentSection {
  id: string;
  title: string;
  links: { text: string; url: string; }[];
}

interface Review {
  reviewerName: string;
  thoughts: string;
  favoriteQuote: string;
  rating: number;
}

interface Book {
  cover: string;
  title: string;
  author: string;
  section: string;
  formats: {
    physical: boolean;
    audio: boolean;
    digital: boolean;
  };
  reviews?: Review[];
}

const Home: React.FC = () => {
  const [selectedIcon, setSelectedIcon] = useState<'book' | 'audio' | 'digital'>('book');
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const booksWithDetails: Book[] = Object.keys(bookCovers).map((path, index) => ({
      cover: bookCovers[path],
      title: index === 0 ? 'El Principito' : index === 1 ? 'Cien años de soledad' : '1984',
      author: index === 0 ? 'Antoine de Saint-Exupéry' : index === 1 ? 'Gabriel García Márquez' : 'George Orwell',
      section: index === 0 ? 'Libro Mes Anterior' : index === 1 ? 'Libro Actual' : 'Próximo Libro',
      formats: {
        physical: true,
        audio: index === 1,
        digital: true,
      },
      reviews: index === 1 ? [
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
      ] : []
    }));
    setBooks(booksWithDetails);
  }, []);

  const upcomingEvents: Event[] = [
    { date: '15 Feb', title: 'Club de Lectura: Análisis del Libro del Mes' },
    { date: '20 Feb', title: 'Charla con el Autor' },
    { date: '25 Feb', title: 'Taller de Escritura Creativa' },
    { date: '1 Mar', title: 'Inauguración Libro del Mes - Marzo' },
  ];

  const contentSections: Record<string, ContentSection> = {
    book: {
      id: 'book',
      title: 'Libros y Reseñas',
      links: [
        { text: 'Reseñas de Lectores', url: '/resenas' },
        { text: 'Análisis Literario', url: '/analisis' },
        { text: 'Discusiones del Club', url: '/discusiones' },
      ]
    },
    audio: {
      id: 'audio',
      title: 'Contenido de Audio',
      links: [
        { text: 'Audiolibros Recomendados', url: '/audiolibros' },
        { text: 'Podcast del Club', url: '/podcast' },
        { text: 'Entrevistas con Autores', url: '/entrevistas' },
      ]
    },
    digital: {
      id: 'digital',
      title: 'Recursos Digitales',
      links: [
        { text: 'Biblioteca Digital', url: '/ebooks' },
        { text: 'Recursos de Lectura', url: '/recursos' },
        { text: 'Apps Recomendadas', url: '/apps' },
      ]
    }
  };

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 8000,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
      <section className="text-center mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
          Bienvenidos al Club de Lectura
        </h1>
        <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
          Un espacio para compartir el amor por la literatura y crecer juntos a través de la lectura.
        </p>
      </section>

      <section className="mb-8 sm:mb-12">
        <div className="bg-white bg-opacity-90 rounded-xl shadow-lg p-4 sm:p-6 max-w-2xl mx-auto">
          <Slider {...carouselSettings}>
            {books.map((book, index) => (
              <div key={index} className="px-2">
                <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 h-full">
                  <h3 className="text-lg sm:text-xl font-medium text-gray-600 text-center mb-4">{book.section}</h3>
                  <div className="max-w-xs mx-auto">
                    <div className="aspect-w-2 aspect-h-3 mb-4">
                      <img
                        src={book.cover}
                        alt={book.title}
                        className="object-cover rounded-lg w-full h-full"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://via.placeholder.com/300x450?text=No+disponible';
                        }}
                      />
                    </div>
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2">{book.title}</h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-3">{book.author}</p>
                  <div className="flex flex-wrap gap-2">
                    {book.formats.physical && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Físico
                      </span>
                    )}
                    {book.formats.audio && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Audio
                      </span>
                    )}
                    {book.formats.digital && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        Digital
                      </span>
                    )}
                  </div>
                  {book.section === "Libro Actual" && (
                    <div className="mt-4">
                      <Link
                        to="/libro-del-mes"
                        className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full sm:w-auto"
                      >
                        Ver más detalles
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>

      <section className="mb-8 sm:mb-12">
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-8 mb-6 sm:mb-8">
          <button
            onClick={() => setSelectedIcon('book')}
            className={`flex items-center justify-center sm:justify-start p-3 sm:p-4 rounded-lg transition-colors ${
              selectedIcon === 'book'
                ? 'bg-indigo-100 text-indigo-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <BookOpenIcon className="h-6 w-6 sm:h-8 sm:w-8" />
            <span className="ml-2 sm:ml-3 text-sm sm:text-base font-medium">Libros</span>
          </button>
          <button
            onClick={() => setSelectedIcon('audio')}
            className={`flex items-center justify-center sm:justify-start p-3 sm:p-4 rounded-lg transition-colors ${
              selectedIcon === 'audio'
                ? 'bg-indigo-100 text-indigo-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <SpeakerWaveIcon className="h-6 w-6 sm:h-8 sm:w-8" />
            <span className="ml-2 sm:ml-3 text-sm sm:text-base font-medium">Audio</span>
          </button>
          <button
            onClick={() => setSelectedIcon('digital')}
            className={`flex items-center justify-center sm:justify-start p-3 sm:p-4 rounded-lg transition-colors ${
              selectedIcon === 'digital'
                ? 'bg-indigo-100 text-indigo-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <DeviceTabletIcon className="h-6 w-6 sm:h-8 sm:w-8" />
            <span className="ml-2 sm:ml-3 text-sm sm:text-base font-medium">Digital</span>
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6">
            {contentSections[selectedIcon].title}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {contentSections[selectedIcon].links.map((link, index) => (
              <Link
                key={index}
                to={link.url}
                className="block p-4 sm:p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <span className="text-base sm:text-lg font-medium text-gray-900">{link.text}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">Próximos Eventos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {upcomingEvents.map((event, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-4 sm:p-6 hover:shadow-xl transition-shadow"
            >
              <div className="text-lg sm:text-xl font-semibold text-indigo-600 mb-2">
                {event.date}
              </div>
              <p className="text-sm sm:text-base text-gray-800">{event.title}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
