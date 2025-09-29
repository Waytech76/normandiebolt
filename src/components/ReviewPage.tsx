import React, { useState } from 'react';
import { Star, Upload, Camera, Send, CheckCircle, AlertCircle, ArrowLeft, Home } from 'lucide-react';
import { ReviewService } from '../lib/reviewService';

interface ReviewPageProps {
  setCurrentPage?: (page: string) => void;
}

const ReviewPage: React.FC<ReviewPageProps> = ({ setCurrentPage }) => {
  const [formData, setFormData] = useState({
    tour_name: '',
    client_name: '',
    client_email: '',
    rating: 0,
    comment: '',
    photos: [] as File[]
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hoveredRating, setHoveredRating] = useState(0);

  const tours = [
    "Живерни + Руан",
    "Комбинированный тур: 2 дня",
    "Руан + Этрета",
    "Руан – Онфлёр – Этрета",
    "Мон-Сен-Мишель — дневной тур",
    "Мон-Сен-Мишель — 2 дня / 1 ночь",
    "Байё + Пляжи Высадки",
    "Кан + Кальвадос"
  ];

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + formData.photos.length > 10) {
      setError('Максимум 10 фотографий');
      return;
    }
    
    // Vérifier la taille des fichiers
    const oversizedFiles = files.filter(file => file.size > 10 * 1024 * 1024); // 10MB
    if (oversizedFiles.length > 0) {
      setError('Некоторые файлы слишком большие (макс. 10MB)');
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      photos: [...prev.photos, ...files]
    }));
    setError(null);
    
    // Reset input
    e.target.value = '';
  };

  const removePhoto = (index: number) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (formData.rating === 0) {
      setError('Пожалуйста, поставьте оценку');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // 1. Upload des photos si il y en a
      let photoUrls: string[] = [];
      if (formData.photos.length > 0) {
        console.log('📸 Upload des photos...');
        const uploadResult = await ReviewService.uploadPhotos(formData.photos);
        
        if (!uploadResult.success) {
          throw new Error(uploadResult.error || 'Erreur upload photos');
        }
        
        photoUrls = uploadResult.urls || [];
        console.log('✅ Photos uploadées:', photoUrls);
      }

      // 2. Soumettre l'avis
      console.log('📝 Soumission de l\'avis...');
      const submitResult = await ReviewService.submitReview({
        tour_name: formData.tour_name,
        client_name: formData.client_name,
        client_email: formData.client_email || undefined,
        rating: formData.rating,
        comment: formData.comment,
        photos: photoUrls
      });

      if (!submitResult.success) {
        throw new Error(submitResult.error || 'Erreur soumission avis');
      }

      console.log('✅ Avis soumis avec succès!');
      setIsSubmitted(true);
      
    } catch (error) {
      console.error('❌ Erreur lors de la soumission:', error);
      
      setError(error instanceof Error ? error.message : 'Une erreur inattendue s\'est produite.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Спасибо за ваш отзыв!</h2>
          <p className="text-gray-600 mb-6">
            Ваш отзыв отправлен на модерацию. После проверки он появится на нашем сайте.
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Мы очень ценим ваше мнение и используем ваши фотографии для показа красоты наших туров будущим клиентам.
          </p>
          <button
            onClick={() => {
              setIsSubmitted(false);
              setFormData({
                tour_name: '',
                client_name: '',
                client_email: '',
                rating: 0,
                comment: '',
                photos: []
              });
            }}
            className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            Оставить еще один отзыв
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white text-center">
            {/* Back Button */}
            {setCurrentPage && (
              <div className="flex justify-start mb-4">
                <button
                  onClick={() => setCurrentPage('home')}
                  className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-all duration-300 text-white"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Retour à l'accueil</span>
                </button>
              </div>
            )}
            <h1 className="text-3xl font-bold mb-2">Оставьте отзыв о вашем туре</h1>
            <p className="text-blue-100">Поделитесь впечатлениями и фотографиями</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 m-6">
              <div className="flex">
                <AlertCircle className="w-5 h-5 text-red-400 mr-2" />
                <p className="text-red-700">{error}</p>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Tour Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Выберите тур *
              </label>
              <select
                required
                value={formData.tour_name}
                onChange={(e) => setFormData(prev => ({ ...prev, tour_name: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              >
                <option value="">Выберите ваш тур...</option>
                {tours.map(tour => (
                  <option key={tour} value={tour}>{tour}</option>
                ))}
              </select>
            </div>

            {/* Client Info */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ваше имя *
                </label>
                <input
                  type="text"
                  required
                  value={formData.client_name}
                  onChange={(e) => setFormData(prev => ({ ...prev, client_name: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  placeholder="Ваше имя"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email (опционально)
                </label>
                <input
                  type="email"
                  value={formData.client_email}
                  onChange={(e) => setFormData(prev => ({ ...prev, client_email: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            {/* Rating */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Оцените тур *
              </label>
              <div className="flex items-center space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="transition-all duration-200 transform hover:scale-110"
                  >
                    <Star
                      className={`w-8 h-8 ${
                        star <= (hoveredRating || formData.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
                <span className="ml-4 text-gray-600">
                  {formData.rating > 0 && (
                    <span className="font-medium">
                      {formData.rating === 5 ? 'Отлично!' :
                       formData.rating === 4 ? 'Хорошо!' :
                       formData.rating === 3 ? 'Нормально' :
                       formData.rating === 2 ? 'Плохо' : 'Очень плохо'}
                    </span>
                  )}
                </span>
              </div>
            </div>

            {/* Comment */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ваш отзыв *
              </label>
              <textarea
                required
                rows={4}
                value={formData.comment}
                onChange={(e) => setFormData(prev => ({ ...prev, comment: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                placeholder="Расскажите о ваших впечатлениях от тура..."
              />
            </div>

            {/* Photo Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Добавьте фотографии (до 10 штук, макс. 10MB каждая)
              </label>
              
              {/* Upload Button */}
              <div className="mb-4">
                <label className="cursor-pointer">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 hover:bg-blue-50 transition-all duration-300">
                    <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600">
                      Нажмите для выбора фотографий ({formData.photos.length}/10)
                    </p>
                    <p className="text-sm text-gray-500 mt-1">JPG, PNG до 10MB каждая</p>
                  </div>
                </label>
              </div>

              {/* Photo Preview */}
              {formData.photos.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {formData.photos.map((photo, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={URL.createObjectURL(photo)}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removePhoto(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 transition-colors"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-4 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Отправляем...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Отправить отзыв</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;