import React from 'react';
import { StarIcon, BookOpenIcon, SpeakerWaveIcon, DeviceTabletIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

interface Review {
  reviewerName: string;
  thoughts: string;
  favoriteQuote: string;
  rating: number;
}

interface BookDetails {
  cover: string;
  title: string;
  author: string;
  formats: {
    physical: boolean;
    audio: boolean;
    digital: boolean;
  };
  reviews: Review[];
}

interface LibroDelMesProps {
  book: BookDetails;
}

const LibroDelMes: React.FC<LibroDelMesProps> = ({ book }) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index}>
        {index < rating ? (
          <StarIconSolid className="h-5 w-5 text-yellow-400" />
        ) : (
          <StarIcon className="h-5 w-5 text-gray-300" />
        )}
      </span>
    ));
  };

  const renderFormatIcons = () => {
    return (
      <div className="flex space-x-4 mb-4">
        {book.formats.physical && (
          <div className="flex items-center">
            <BookOpenIcon className="h-6 w-6 text-indigo-600" />
            <span className="ml-2 text-sm text-gray-600">Físico</span>
          </div>
        )}
        {book.formats.audio && (
          <div className="flex items-center">
            <SpeakerWaveIcon className="h-6 w-6 text-indigo-600" />
            <span className="ml-2 text-sm text-gray-600">Audiolibro</span>
          </div>
        )}
        {book.formats.digital && (
          <div className="flex items-center">
            <DeviceTabletIcon className="h-6 w-6 text-indigo-600" />
            <span className="ml-2 text-sm text-gray-600">E-book</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="md:flex">
        {/* Book Cover Section */}
        <div className="md:flex-shrink-0 p-6">
          <img
            className="h-64 w-auto object-cover rounded-lg shadow-md"
            src={book.cover}
            alt={`Portada de ${book.title}`}
          />
        </div>

        {/* Book Details Section */}
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{book.title}</h2>
          <p className="text-xl text-gray-600 mb-4">{book.author}</p>
          {renderFormatIcons()}
        </div>
      </div>

      {/* Reviews Section */}
      <div className="px-6 pb-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Reseñas de Lectores</h3>
        <div className="space-y-6">
          {book.reviews.map((review, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-lg font-medium text-gray-900">{review.reviewerName}</h4>
                <div className="flex">{renderStars(review.rating)}</div>
              </div>
              <p className="text-gray-600 mb-3">{review.thoughts}</p>
              <blockquote className="border-l-4 border-indigo-500 pl-4 italic text-gray-700">
                "{review.favoriteQuote}"
              </blockquote>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LibroDelMes;
