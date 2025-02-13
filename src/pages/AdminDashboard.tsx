import React, { useState } from 'react';
import { PlusIcon, TrashIcon, PencilIcon, UserGroupIcon, CalendarIcon, BookOpenIcon } from '@heroicons/react/24/outline';

interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'user';
  joinDate: string;
  status: 'active' | 'pending';
}

interface Book {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  status: 'available' | 'unavailable';
}

interface Event {
  id: string;
  title: string;
  date: string;
  description: string;
  location: string;
  maxAttendees: number;
  currentAttendees: number;
}

interface JoinRequest {
  id: string;
  username: string;
  email: string;
  requestDate: string;
  message: string;
}

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'books' | 'events' | 'users' | 'requests'>('books');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'add' | 'edit'>('add');
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const mockUsers: User[] = [
    {
      id: '1',
      username: 'MariaLectora',
      email: 'maria@example.com',
      role: 'user',
      joinDate: '2024-01-15',
      status: 'active'
    },
    {
      id: '2',
      username: 'JuanAdmin',
      email: 'juan@example.com',
      role: 'admin',
      joinDate: '2023-12-01',
      status: 'active'
    }
  ];

  const mockBooks: Book[] = [
    {
      id: '1',
      title: 'Cien años de soledad',
      author: 'Gabriel García Márquez',
      coverUrl: '/books/book1.jpg',
      status: 'available'
    },
    {
      id: '2',
      title: 'El Aleph',
      author: 'Jorge Luis Borges',
      coverUrl: '/books/book2.jpg',
      status: 'unavailable'
    }
  ];

  const mockEvents: Event[] = [
    {
      id: '1',
      title: 'Club de Lectura: Análisis Mensual',
      date: '2024-03-15',
      description: 'Discusión sobre el libro del mes',
      location: 'Sala Virtual',
      maxAttendees: 20,
      currentAttendees: 15
    }
  ];

  const mockJoinRequests: JoinRequest[] = [
    {
      id: '1',
      username: 'NuevoLector',
      email: 'nuevo@example.com',
      requestDate: '2024-02-10',
      message: 'Me encantaría unirme al club para compartir mi pasión por la lectura.'
    }
  ];

  const TabButton: React.FC<{ 
    name: string; 
    active: boolean; 
    icon: React.ReactNode;
    onClick: () => void 
  }> = ({ name, active, icon, onClick }) => (
    <button
      onClick={onClick}
      className={`flex items-center px-4 py-2 rounded-lg ${
        active 
          ? 'bg-indigo-100 text-indigo-700' 
          : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      {icon}
      <span className="ml-2">{name}</span>
    </button>
  );

  const handleAction = (type: 'add' | 'edit' | 'delete', item?: any) => {
    if (type === 'delete') {
      // Implement delete logic
      console.log('Deleting item:', item);
      return;
    }

    setModalType(type);
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleStatusChange = (userId: string, newRole: 'admin' | 'user') => {
    console.log('Changing user role:', userId, newRole);
  };

  const handleJoinRequest = (requestId: string, action: 'approve' | 'reject') => {
    console.log('Handling join request:', requestId, action);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-4 sm:px-6 py-3 sm:py-4">
          <h1 className="text-xl sm:text-2xl font-bold text-white">Panel de Administración</h1>
        </div>

        <div className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-4 sm:mb-6 overflow-x-auto">
            <TabButton
              name="Libros"
              active={activeTab === 'books'}
              icon={<BookOpenIcon className="h-5 w-5" />}
              onClick={() => setActiveTab('books')}
            />
            <TabButton
              name="Eventos"
              active={activeTab === 'events'}
              icon={<CalendarIcon className="h-5 w-5" />}
              onClick={() => setActiveTab('events')}
            />
            <TabButton
              name="Usuarios"
              active={activeTab === 'users'}
              icon={<UserGroupIcon className="h-5 w-5" />}
              onClick={() => setActiveTab('users')}
            />
          </div>

          {activeTab === 'books' && (
            <div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 sm:mb-6">
                <h2 className="text-lg sm:text-xl font-semibold">Gestión de Libros</h2>
                <button
                  onClick={() => handleAction('add')}
                  className="w-full sm:w-auto bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center justify-center hover:bg-indigo-700"
                >
                  <PlusIcon className="h-5 w-5 mr-2" />
                  Añadir Libro
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockBooks.map((book) => (
                  <div key={book.id} className="bg-white rounded-lg shadow p-4">
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                      <img
                        src={book.coverUrl}
                        alt={book.title}
                        className="w-24 h-36 object-cover rounded"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://via.placeholder.com/160x240?text=Sin+Imagen';
                        }}
                      />
                      <div className="flex-1 text-center sm:text-left">
                        <h3 className="font-semibold mb-1">{book.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">{book.author}</p>
                        <div className="flex justify-center sm:justify-start space-x-2">
                          <button
                            onClick={() => handleAction('edit', book)}
                            className="text-blue-600 hover:text-blue-800 p-1"
                          >
                            <PencilIcon className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleAction('delete', book)}
                            className="text-red-600 hover:text-red-800 p-1"
                          >
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'events' && (
            <div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 sm:mb-6">
                <h2 className="text-lg sm:text-xl font-semibold">Gestión de Eventos</h2>
                <button
                  onClick={() => handleAction('add')}
                  className="w-full sm:w-auto bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center justify-center hover:bg-indigo-700"
                >
                  <PlusIcon className="h-5 w-5 mr-2" />
                  Crear Evento
                </button>
              </div>
              <div className="space-y-4">
                {mockEvents.map((event) => (
                  <div key={event.id} className="bg-white rounded-lg shadow p-4">
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                      <div>
                        <h3 className="font-semibold mb-1">{event.title}</h3>
                        <p className="text-sm text-gray-600 mb-1">
                          {new Date(event.date).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-gray-600 mb-2">{event.description}</p>
                        <p className="text-sm text-gray-600">
                          Asistentes: {event.currentAttendees}/{event.maxAttendees}
                        </p>
                      </div>
                      <div className="flex space-x-2 self-center sm:self-start">
                        <button
                          onClick={() => handleAction('edit', event)}
                          className="text-blue-600 hover:text-blue-800 p-1"
                        >
                          <PencilIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleAction('delete', event)}
                          className="text-red-600 hover:text-red-800 p-1"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div>
              <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">Gestión de Usuarios</h2>
              <div className="space-y-4">
                {mockUsers.map((user) => (
                  <div key={user.id} className="bg-white rounded-lg shadow p-4">
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                      <div>
                        <h3 className="font-semibold mb-1">{user.username}</h3>
                        <p className="text-sm text-gray-600 mb-1">{user.email}</p>
                        <p className="text-sm text-gray-600">
                          Miembro desde: {new Date(user.joinDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                        <select
                          value={user.role}
                          onChange={(e) => handleStatusChange(user.id, e.target.value as 'admin' | 'user')}
                          className="w-full sm:w-auto rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        >
                          <option value="user">Usuario</option>
                          <option value="admin">Administrador</option>
                        </select>
                        <button
                          onClick={() => handleAction('delete', user)}
                          className="text-red-600 hover:text-red-800 p-1"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">Solicitudes de Ingreso</h3>
                <div className="space-y-4">
                  {mockJoinRequests.map((request) => (
                    <div key={request.id} className="bg-white rounded-lg shadow p-4">
                      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                        <div>
                          <h4 className="font-semibold mb-1">{request.username}</h4>
                          <p className="text-sm text-gray-600 mb-1">{request.email}</p>
                          <p className="text-sm text-gray-600 mb-2">
                            Solicitud: {new Date(request.requestDate).toLocaleDateString()}
                          </p>
                          <p className="text-sm text-gray-700">{request.message}</p>
                        </div>
                        <div className="flex gap-2 self-center sm:self-start">
                          <button
                            onClick={() => handleJoinRequest(request.id, 'approve')}
                            className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                          >
                            Aprobar
                          </button>
                          <button
                            onClick={() => handleJoinRequest(request.id, 'reject')}
                            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                          >
                            Rechazar
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
