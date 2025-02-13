import { useState, useEffect } from 'react';
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

const Home = () => {
  const [selectedIcon, setSelectedIcon] = useState<'book' | 'audio' | 'digital'>('book');
  const [books, setBooks] = useState<Book[]>([]);

  // Cargar las imágenes cuando el componente se monte
  useEffect(() => {
    // Crear array de libros con títulos y datos de ejemplo
    const booksWithDetails: Book[] = Object.keys(bookCovers).map((path, index) => ({
      cover: bookCovers[path],
      title: index === 0 ? 'Libro del mes anterior' : index === 1 ? 'Libro del mes' : 'Libro siguiente',
      author: 'Autor Ejemplo',
      formats: {
        physical: true,
        audio: index === 1, // Solo el libro del mes tiene audio
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

  // Mock data for the upcoming events
  const upcomingEvents: Event[] = [
    { date: '15 Feb', title: 'Club de Lectura: Análisis del Libro del Mes' },
    { date: '20 Feb', title: 'Charla con el Autor' },
    { date: '25 Feb', title: 'Taller de Escritura Creativa' },
    { date: '1 Mar', title: 'Inauguración Libro del Mes - Marzo' },
  ];

  // Mock data for the content sections
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
    autoplaySpeed: 5000,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Bienvenidos al Club de Lectura
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Un espacio dedicado a los amantes de la literatura, donde compartimos el placer
          de la lectura y creamos una comunidad vibrante de lectores apasionados.
          Únete a nosotros en este viaje literario.
        </p>
      </section>

      {/* Central Carousel */}
      <section className="mb-12">
        <div className="bg-white bg-opacity-90 rounded-xl shadow-lg p-6">
          <Slider {...carouselSettings}>
            {books.map((book, index) => (
              <div key={index} className="px-4">
                <div className="text-center">
                  <img
                    src={book.cover}
                    alt={`${book.title} por ${book.author}`}
                    className="mx-auto max-h-96 object-contain rounded-lg mb-4"
                  />
                  <h3 className="text-xl font-semibold text-gray-900">{book.title}</h3>
                  <p className="text-gray-600">{book.author}</p>
                  {index === 1 && (
                    <Link
                      to="/libro-del-mes"
                      className="inline-block mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      Ver más detalles
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>

      {/* Icon Selector */}
      <section className="mb-12">
        <div className="flex justify-center space-x-8 mb-8">
          <button
            onClick={() => setSelectedIcon('book')}
            className={`p-4 rounded-full transition-colors duration-200 ${selectedIcon === 'book' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-400 hover:text-gray-600'
              }`}
            aria-label="Ver contenido de libros"
          >
            <BookOpenIcon className="h-8 w-8" />
          </button>
          <button
            onClick={() => setSelectedIcon('audio')}
            className={`p-4 rounded-full transition-colors duration-200 ${selectedIcon === 'audio' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-400 hover:text-gray-600'
              }`}
            aria-label="Ver contenido de audio"
          >
            <SpeakerWaveIcon className="h-8 w-8" />
          </button>
          <button
            onClick={() => setSelectedIcon('digital')}
            className={`p-4 rounded-full transition-colors duration-200 ${selectedIcon === 'digital' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-400 hover:text-gray-600'
              }`}
            aria-label="Ver contenido digital"
          >
            <DeviceTabletIcon className="h-8 w-8" />
          </button>
        </div>

        {/* Content Links */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            {contentSections[selectedIcon].title}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {contentSections[selectedIcon].links.map((link, index) => (
              <Link
                key={index}
                to={link.url}
                className="text-gray-600 hover:text-indigo-600 hover:underline transition-colors duration-200"
              >
                {link.text}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Events Calendar */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Próximos Eventos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {upcomingEvents.map((event, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition-shadow duration-200"
            >
              <div className="font-semibold text-indigo-600">{event.date}</div>
              <div className="text-gray-900">{event.title}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
