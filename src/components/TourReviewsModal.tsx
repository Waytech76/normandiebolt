import React, { useState, useEffect } from 'react';
import { X, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { ReviewService, Review } from '../lib/reviewService';

interface TourReviewsModalProps {
  tour: any;
  isOpen: boolean;
  onClose: () => void;
}

const TourReviewsModal: React.FC<TourReviewsModalProps> = ({ tour, isOpen, onClose }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [allImages, setAllImages] = useState<string[]>([]);

  useEffect(() => {
    if (isOpen && tour) {
      loadTourReviews();
    }
  }, [isOpen, tour?.title]);

  const loadTourReviews = async () => {
    if (!tour) return;
    
    try {
      console.log('📥 Chargement des avis pour le tour:', tour.title);
      
      // Charger tous les avis approuvés
      const allApprovedReviews = await ReviewService.getApprovedReviews();
      
      // Filtrer pour ce tour spécifique
      const tourReviews = allApprovedReviews.filter(review => 
        review.tour_name === tour.title
      );
      
      console.log('✅ Avis du tour chargés:', tourReviews.length);
      
      setReviews(tourReviews);
      
      // Collecter toutes les images
      const images = tourReviews.flatMap(review => review.photos || []);
      setAllImages(images);
    } catch (error) {
      console.error('❌ Erreur lors du chargement des avis du tour:', error);
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  if (!isOpen || !tour) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-auto">
        <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{tour.title}</h2>
            <p className="text-gray-600">{reviews.length} отзыв(ов)</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 p-2"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {/* Image Carousel */}
          {allImages.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Фотографии от наших клиентов</h3>
              <div className="relative">
                <img
                  src={allImages[currentImageIndex]}
                  alt={`Tour photo ${currentImageIndex + 1}`}
                  className="w-full max-h-96 object-contain rounded-lg bg-gray-100"
                  onError={(e) => {
                    console.error('Error loading image:', allImages[currentImageIndex]);
                    e.currentTarget.src = 'https://via.placeholder.com/400x300?text=Image+Error';
                  }}
                />
                {allImages.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                      {currentImageIndex + 1} / {allImages.length}
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Reviews */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Отзывы клиентов</h3>
            {reviews.length === 0 ? (
              <p className="text-gray-600 text-center py-8">Пока нет отзывов для этого тура</p>
            ) : (
              reviews.map((review) => (
                <div key={review.id} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-900">{review.client_name}</h4>
                      <p className="text-sm text-gray-500">
                        {new Date(review.created_at).toLocaleDateString('ru-RU')}
                      </p>
                    </div>
                    <div className="flex items-center">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4">{review.comment}</p>
                  
                  {/* Review Photos */}
                  {review.photos && review.photos.length > 0 && (
                    <div className="grid grid-cols-3 gap-2 mt-4">
                      {review.photos.map((photo, index) => (
                        <div key={index} className="relative group cursor-pointer">
                          <img
                            src={photo}
                            alt={`Review photo ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg"
                          />
                          <button
                            onClick={() => window.open(photo, '_blank')}
                            className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300 rounded-lg flex items-center justify-center group"
                          >
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded-full p-2 shadow-lg">
                              <span className="text-lg">🔍</span>
                            </div>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourReviewsModal;