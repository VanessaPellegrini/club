import React, { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface Event {
  id: string;
  date: Date;
  title: string;
  type: 'book_club' | 'author_talk' | 'workshop';
  description: string;
}

interface MonthBook {
  cover: string;
  title: string;
  author: string;
  description: string;
}

const monthNames = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

const Calendario: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<Event[]>([]);
  const [monthBook, setMonthBook] = useState<MonthBook | null>(null);

  // Mock data - En una implementación real, esto vendría de una API
  const mockEvents: Event[] = [
    {
      id: '1',
      date: new Date(2025, 1, 15), // 15 de febrero 2025
      title: 'Club de Lectura: Análisis del Libro del Mes',
      type: 'book_club',
      description: 'Discusión grupal sobre los temas principales y análisis de personajes.'
    },
    {
      id: '2',
      date: new Date(2025, 1, 20), // 20 de febrero 2025
      title: 'Charla con el Autor',
      type: 'author_talk',
      description: 'Sesión de preguntas y respuestas con el autor del libro del mes.'
    },
    {
      id: '3',
      date: new Date(2025, 1, 25), // 25 de febrero 2025
      title: 'Taller de Escritura Creativa',
      type: 'workshop',
      description: 'Taller práctico de escritura inspirado en el libro del mes.'
    }
  ];

  const mockBookCovers: Record<string, () => Promise<{ default: string }>> = 
    import.meta.glob('../assets/books_cover/*');

  useEffect(() => {
    // Filtrar eventos del mes actual
    const filteredEvents = mockEvents.filter(event => {
      return event.date.getMonth() === currentDate.getMonth() &&
             event.date.getFullYear() === currentDate.getFullYear();
    });
    setEvents(filteredEvents);

    // Cargar el libro del mes
    const loadMonthBook = async () => {
      const covers = Object.keys(mockBookCovers);
      if (covers.length > 0) {
        const module = await mockBookCovers[covers[0]]();
        setMonthBook({
          cover: module.default,
          title: 'Libro del Mes',
          author: 'Autor Ejemplo',
          description: 'Descripción del libro seleccionado para este mes.'
        });
      }
    };

    loadMonthBook();
  }, [currentDate]);

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      if (direction === 'prev') {
        newDate.setMonth(prevDate.getMonth() - 1);
      } else {
        newDate.setMonth(prevDate.getMonth() + 1);
      }
      return newDate;
    });
  };

  const getEventTypeStyle = (type: Event['type']) => {
    switch (type) {
      case 'book_club':
        return 'bg-indigo-100 text-indigo-800';
      case 'author_talk':
        return 'bg-green-100 text-green-800';
      case 'workshop':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header y Navegación */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Calendario de Eventos</h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigateMonth('prev')}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <ChevronLeftIcon className="h-6 w-6" />
          </button>
          <h2 className="text-xl font-semibold text-gray-700">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <button
            onClick={() => navigateMonth('next')}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <ChevronRightIcon className="h-6 w-6" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Libro del Mes */}
        {monthBook && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Libro del Mes</h3>
            <div className="flex space-x-4">
              <img
                src={monthBook.cover}
                alt={monthBook.title}
                className="w-32 h-48 object-cover rounded-lg shadow"
              />
              <div>
                <h4 className="text-lg font-medium">{monthBook.title}</h4>
                <p className="text-gray-600">{monthBook.author}</p>
                <p className="mt-2 text-gray-700">{monthBook.description}</p>
              </div>
            </div>
          </div>
        )}

        {/* Lista de Eventos */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Eventos del Mes</h3>
          <div className="space-y-4">
            {events.length > 0 ? (
              events.map(event => (
                <div
                  key={event.id}
                  className="border-l-4 border-indigo-500 pl-4 py-2"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{event.title}</h4>
                      <p className="text-sm text-gray-600">
                        {event.date.toLocaleDateString('es-ES', {
                          weekday: 'long',
                          day: 'numeric',
                          month: 'long'
                        })}
                      </p>
                      <p className="text-sm text-gray-700 mt-1">
                        {event.description}
                      </p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${getEventTypeStyle(event.type)}`}>
                      {event.type === 'book_club' ? 'Club de Lectura' :
                       event.type === 'author_talk' ? 'Charla de Autor' : 'Taller'}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">
                No hay eventos programados para este mes
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendario;
