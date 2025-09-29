import React, { useState, useEffect } from 'react';
import { Star, MapPin, Clock, Users, Calendar, Award, Shield, Heart, Info, MessageCircle, ChevronLeft, ChevronRight, X, CheckCircle, Sun, Moon, Landmark, Mountain } from 'lucide-react';
import { ReviewService, Review } from '../lib/reviewService';
import TourDetailsModal from './TourDetailsModal';
import TourReviewsModal from './TourReviewsModal';

interface HomePageProps {
  setCurrentPage: (page: string) => void;
}

// Tours data
const toursData = [
  {
    id: 1,
    title: "Живерни + Руан",
    description: "Посетите дом и сады Клода Моне в Живерни, а затем исследуйте исторический Руан с его готическим собором.",
    duration: "10 часов",
    groupSize: "до 4 человек",
    price: "€650",
    category: "art",
    highlights: ["Дом и сады Моне", "Готический собор Руана", "Старый город", "Музей изящных искусств"]
  },
  {
    id: 2,
    title: "Комбинированный тур: 2 дня",
    description: "Двухдневное путешествие, включающее Мон-Сен-Мишель и пляжи высадки в Нормандии.",
    duration: "2 дня",
    groupSize: "до 4 человек",
    price: "€1200",
    category: "history",
    highlights: ["Мон-Сен-Мишель", "Пляжи Д-Дей", "Байё", "Американское кладбище"]
  },
  {
    id: 3,
    title: "Руан + Этрета",
    description: "Откройте для себя исторический Руан и впечатляющие белые скалы Этреты за один день.",
    duration: "12 часов",
    groupSize: "до 4 человек",
    price: "€700",
    category: "nature",
    highlights: ["Собор Руана", "Скалы Этреты", "Рыбацкая деревня", "Панорамные виды"]
  },
  {
    id: 4,
    title: "Руан – Онфлёр – Этрета",
    description: "Полный день в трех жемчужинах Нормандии: исторический Руан, живописный Онфлёр и драматичная Этрета.",
    duration: "13 часов",
    groupSize: "до 4 человек",
    price: "€750",
    category: "nature",
    highlights: ["Три города за день", "Старый порт Онфлёра", "Скалы Этреты", "Нормандская архитектура"]
  },
  {
    id: 5,
    title: "Мон-Сен-Мишель — дневной тур",
    description: "Посетите знаменитое аббатство Мон-Сен-Мишель, одно из чудес Франции. Путь из Парижа занимает 4h30.",
    duration: "13 часов",
    groupSize: "до 4 человек",
    price: "€950",
    category: "history",
    highlights: ["Аббатство", "Средневековая деревня", "Залив", "Приливы и отливы"]
  },
  {
    id: 6,
    title: "Мон-Сен-Мишель — 2 дня / 1 ночь",
    description: "Двухдневное погружение в историю с ночевкой рядом с Мон-Сен-Мишель. Путь из Парижа занимает 4h30.",
    duration: "2 дня / 1 ночь",
    groupSize: "до 4 человек",
    price: "€1200",
    category: "history",
    highlights: ["Ночная подсветка", "Утренняя тишина", "Подробная экскурсия", "Местная кухня"]
  },
  {
    id: 7,
    title: "Байё + Пляжи Высадки",
    description: "Исследуйте историю Дня Д на пляжах Нормандии и посетите знаменитый гобелен Байё. Путь из Парижа в Байё занимает 4 часа.",
    duration: "12 часов",
    groupSize: "до 4 человек",
    price: "€850",
    category: "history",
    highlights: ["Пляжи Д-Дей", "Гобелен Байё", "Американское кладбище", "Музеи войны"]
  },
  {
    id: 8,
    title: "Кан + Кальвадос",
    description: "Откройте для себя Кан, город Вильгельма Завоевателя, и попробуйте знаменитый кальвадос. Путь из Парижа в Кан занимает 3 часа 30 минут.",
    duration: "11 часов",
    groupSize: "до 4 человек",
    price: "€850",
    category: "culture",
    highlights: ["Замок Кана", "Аббатства", "Дегустация кальвадоса", "Нормандская кухня"]
  }
];

// Filter categories
const filterCategories = [
  { id: 'all', name: 'Все туры', icon: Heart },
  { id: 'history', name: 'История', icon: Landmark },
  { id: 'nature', name: 'Природа', icon: Mountain },
  { id: 'art', name: 'Искусство', icon: Sun },
  { id: 'culture', name: 'Культура', icon: Moon }
];

// Tour Image Carousel Component
const TourImageCarousel: React.FC<{ tourId: number; images: string[] }> = ({ tourId, images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      }, 6000); // 6 seconds per image instead of 3
      return () => clearInterval(interval);
    }
  }, [images.length]);

  if (!images.length) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center">
        <MapPin className="w-12 h-12 text-blue-400" />
      </div>
    );
  }

  return (
    <div className="relative w-full h-full overflow-hidden">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-2000 ease-in-out ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={image}
            alt={`Tour ${tourId} - Image ${index + 1}`}
            className="w-full h-full object-cover transition-transform duration-2000 ease-in-out"
            style={{ imageRendering: 'high-quality' }}
          />
        </div>
      ))}
      
      {images.length > 1 && (
        <>
          <button
            onClick={() => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-300"
          >
            <ChevronLeft className="w-4 h-4 text-gray-700" />
          </button>
          <button
            onClick={() => setCurrentImageIndex((prev) => (prev + 1) % images.length)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-300"
          >
            <ChevronRight className="w-4 h-4 text-gray-700" />
          </button>
          
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const HomePage: React.FC<HomePageProps> = ({ setCurrentPage }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [approvedReviews, setApprovedReviews] = useState<Review[]>([]);
  const [allReviewImages, setAllReviewImages] = useState<string[]>([]);
  const [currentHeroImageIndex, setCurrentHeroImageIndex] = useState(0);
  const [currentCtaIndex, setCurrentCtaIndex] = useState(0);
  const [selectedTourForDetails, setSelectedTourForDetails] = useState<any>(null);
  const [selectedTourForReviews, setSelectedTourForReviews] = useState<any>(null);
  const [selectedTourForBooking, setSelectedTourForBooking] = useState<any>(null);
  const [tourImages, setTourImages] = useState<{[key: number]: string[]}>({});
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);
  const [pricePopup, setPricePopup] = useState<{ show: boolean; tour: any; position: { x: number; y: number } }>({
    show: false,
    tour: null,
    position: { x: 0, y: 0 }
  });
  const [bookingFormData, setBookingFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    people: '1',
    message: ''
  });
  const [isBookingSubmitting, setIsBookingSubmitting] = useState(false);
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [allApprovedReviews, setAllApprovedReviews] = useState<Review[]>([]);

  // État pour l'effet typewriter
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  // Textes rotatifs pour le CTA
  const ctaTexts = [
    "Организовать мой идеальный отдых",
    "Заказать тур под ключ", 
    "Получить VIP-сервис"
  ];

  // Fonction pour ouvrir une image en plein écran
  const openFullscreenImage = (imageUrl: string) => {
    setFullscreenImage(imageUrl);
  };

  // Computed properties
  const filteredTours = activeFilter === 'all' 
    ? toursData 
    : toursData.filter(tour => tour.category === activeFilter);

  // Corriger la structure des témoignages
  const testimonials = approvedReviews.map(review => ({
    name: review.client_name || review.name,
    text: review.comment,
    rating: review.rating,
    tour: review.tour_name || review.tour
  }));

  // Helper functions
  const getTourStats = (tourTitle: string) => {
    const tourReviews = allApprovedReviews.filter(review => 
      review.tour_name === tourTitle
    );
    const reviewCount = tourReviews.length;
    const averageRating = reviewCount > 0 
      ? tourReviews.reduce((sum, review) => sum + review.rating, 0) / reviewCount 
      : 0;
    return { reviewCount, averageRating };
  };

  const getTourPhotos = (tourTitle: string) => {
    const tourReviews = allApprovedReviews.filter(review => 
      review.tour_name === tourTitle
    );
    return tourReviews.flatMap(review => review.photos || []);
  };

  const loadTourImages = (reviews: any[]) => {
    const imagesByTour: {[key: number]: string[]} = {};
    
    toursData.forEach(tour => {
      const tourReviews = reviews.filter(review => 
        review.tour_name === tour.title
      );
      const images = tourReviews.flatMap(review => review.photos || []);
      imagesByTour[tour.id] = images;
    });
    
    setTourImages(imagesByTour);
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsBookingSubmitting(true);

    try {
      // Prepare form data for Formspree
      const formData = new FormData();
      formData.append('name', bookingFormData.name);
      formData.append('email', bookingFormData.email);
      formData.append('phone', bookingFormData.phone);
      formData.append('date', bookingFormData.date);
      formData.append('people', bookingFormData.people);
      formData.append('message', bookingFormData.message);
      formData.append('tour', selectedTourForBooking?.title || '');
      formData.append('price', selectedTourForBooking?.price || '');
      formData.append('_subject', `Nouvelle réservation: ${selectedTourForBooking?.title}`);
      
      // Submit to Formspree
      const response = await fetch('https://formspree.io/f/meorqloq', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Erreur lors de l\'envoi');
      }
      
      setBookingSubmitted(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setSelectedTourForBooking(null);
        setBookingSubmitted(false);
        setBookingFormData({
          name: '',
          email: '',
          phone: '',
          date: '',
          people: '1',
          message: ''
        });
      }, 3000);
      
    } catch (error) {
      console.error('Error submitting booking:', error);
      alert('Erreur lors de l\'envoi de la réservation. Veuillez réessayer.');
    } finally {
      setIsBookingSubmitting(false);
    }
  };

  // Load approved reviews for testimonials
  useEffect(() => {
    loadApprovedReviews();
    
    // Écouter les événements d'ouverture d'image en plein écran
    const handleOpenFullscreenImage = (event: CustomEvent) => {
      openFullscreenImage(event.detail);
    };
    
    window.addEventListener('openFullscreenImage', handleOpenFullscreenImage as EventListener);
    
    // Écouter les nouveaux avis approuvés
    const handleReviewUpdate = () => {
      console.log('🔄 Mise à jour des avis détectée');
      loadApprovedReviews();
    };
    
    window.addEventListener('reviewApproved', handleReviewUpdate);
    window.addEventListener('reviewSubmitted', handleReviewUpdate);
    window.addEventListener('reviewDeleted', handleReviewUpdate);
    
    return () => {
      window.removeEventListener('openFullscreenImage', handleOpenFullscreenImage as EventListener);
      window.removeEventListener('reviewApproved', handleReviewUpdate);
      window.removeEventListener('reviewSubmitted', handleReviewUpdate);
      window.removeEventListener('reviewDeleted', handleReviewUpdate);
    };
  }, []);

  // Auto-rotate hero carousel
  useEffect(() => {
    if (allReviewImages.length > 1) {
      const interval = setInterval(() => {
        setCurrentHeroImageIndex((prev) => (prev + 1) % allReviewImages.length);
      }, 8000); // 8 seconds per image
      return () => clearInterval(interval);
    }
  }, [allReviewImages.length]);

  // Effet typewriter pour le CTA
  useEffect(() => {
    const typeSpeed = 100; // Vitesse de frappe (ms)
    const deleteSpeed = 50; // Vitesse d'effacement (ms)
    const pauseTime = 2000; // Pause entre les mots (ms)

    const timeout = setTimeout(() => {
      const currentFullText = ctaTexts[textIndex];
      
      if (!isDeleting && charIndex < currentFullText.length) {
        // Écriture
        setCurrentText(currentFullText.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      } else if (isDeleting && charIndex > 0) {
        // Effacement
        setCurrentText(currentFullText.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      } else if (!isDeleting && charIndex === currentFullText.length) {
        // Pause avant effacement
        setTimeout(() => setIsDeleting(true), pauseTime);
      } else if (isDeleting && charIndex === 0) {
        // Passer au texte suivant
        setIsDeleting(false);
        setTextIndex((textIndex + 1) % ctaTexts.length);
      }
    }, isDeleting ? deleteSpeed : typeSpeed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, textIndex, ctaTexts]);

  const loadApprovedReviews = async () => {
    try {
      console.log('📥 Chargement des avis approuvés...');
      
      // Charger tous les avis approuvés
      const allApprovedData = await ReviewService.getApprovedReviews();
      console.log('✅ Avis approuvés chargés:', allApprovedData.length);
      
      setAllApprovedReviews(allApprovedData);
      setApprovedReviews(allApprovedData.slice(-3)); // Derniers 3 pour les témoignages
      
      // Collecter toutes les images des avis approuvés
      const allImages = allApprovedData
        .filter(review => review.photos && review.photos.length > 0)
        .flatMap(review => review.photos || []);
      setAllReviewImages(allImages);
      
      // Charger les images spécifiques aux tours
      loadTourImages(allApprovedData);
    } catch (error) {
      console.error('❌ Erreur lors du chargement des avis:', error);
    }
  };

  const handlePriceClick = (e: React.MouseEvent, tour: any) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    setPricePopup({
      show: true,
      tour,
      position: {
        x: rect.left + rect.width / 2,
        y: rect.top - 10
      }
    });
  };

  const closePricePopup = () => {
    setPricePopup({ show: false, tour: null, position: { x: 0, y: 0 } });
  };

  // Fermer la popup si on clique ailleurs
  useEffect(() => {
    const handleClickOutside = () => {
      if (pricePopup.show) {
        closePricePopup();
      }
    };
    
    if (pricePopup.show) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [pricePopup.show]);

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
        {/* Background Images Carousel */}
        {allReviewImages.length > 0 && (
          <div className="absolute inset-0">
            {allReviewImages.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-3000 ease-in-out ${
                  index === currentHeroImageIndex ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <img
                  src={image}
                  alt={`Hero background ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-3000 ease-in-out"
                  style={{ imageRendering: 'high-quality' }}
                  loading={index === 0 ? 'eager' : 'lazy'}
                />
                <div className="absolute inset-0 bg-black/10"></div>
              </div>
            ))}
          </div>
        )}
        
        {/* Fallback gradient background */}
        {allReviewImages.length === 0 && (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800"></div>
        )}
        
        {/* Subtle overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/20"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-6 mb-12">
            {/* Main Title */}
            <div className="text-center">
              <div className="inline-block bg-black/20 backdrop-blur-lg rounded-2xl px-6 py-4 shadow-xl border border-white/20">
                <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-gradient-to-r from-blue-200 via-indigo-300 to-blue-400 bg-clip-text drop-shadow-2xl">
                  Влюбитесь в Нормандию
                </h1>
              </div>
            </div>
            
            {/* Subtitle */}
            <div className="text-center">
              <div className="inline-block bg-black/20 backdrop-blur-lg rounded-xl px-5 py-3 shadow-lg border border-white/20">
                <h2 className="text-2xl md:text-3xl font-semibold text-blue-100 drop-shadow-lg">
                  Эксклюзивные туры под ключ с русскоговорящими гидами-местными жителями
                </h2>
              </div>
            </div>
            
            {/* Description */}
            <div className="text-center max-w-4xl mx-auto">
              <div className="bg-black/20 backdrop-blur-lg rounded-xl px-6 py-4 shadow-lg border border-white/20">
                <p className="text-lg md:text-xl text-blue-200 font-medium leading-relaxed drop-shadow-lg">
                  VIP-туры с персональным сервисом: от аэропорта до ресторана — мы организуем всё!
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={() => document.getElementById('tours')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:shadow-2xl transform hover:scale-105 transition-all duration-300 backdrop-blur-sm min-w-[380px] h-[60px] flex items-center justify-center"
            >
              <span className="inline-block font-mono">
                {currentText}
                <span className="animate-pulse">|</span>
              </span>
            </button>
            <button 
              onClick={() => setCurrentPage('contact')}
              className="bg-white/90 backdrop-blur-sm text-gray-900 px-8 py-4 rounded-2xl text-lg font-semibold hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border border-white/20"
            >
              Связаться с гидом
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="tours" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">Наши туры</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Выберите идеальный тур для знакомства с Нормандией
            </p>
          </div>
          
          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {filterCategories.map((category) => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveFilter(category.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    activeFilter === category.id
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg transform scale-105'
                      : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 shadow-md hover:shadow-lg'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{category.name}</span>
                </button>
              );
            })}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTours.map((tour, index) => {
              const { reviewCount, averageRating } = getTourStats(tour.title);
              const tourPhotos = getTourPhotos(tour.title);
              return (
                <div 
                  key={tour.id} 
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group transform hover:scale-105"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Image Section - Fixed height */}
                  <div className="relative h-64 bg-gray-100">
                    <TourImageCarousel 
                      tourId={tour.id} 
                      images={tourPhotos} 
                    />
                   
                    {/* Overlaid bubbles */}
                    <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                      {/* Reviews bubble - clickable */}
                      <button
                        onClick={() => setSelectedTourForReviews(tour)}
                        className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-full hover:bg-white transition-all duration-300 shadow-lg"
                      >
                        <div className="flex items-center space-x-1">
                          {[...Array(Math.floor(averageRating))].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          ))}
                          {averageRating % 1 !== 0 && (
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 opacity-50" />
                          )}
                        </div>
                        <MessageCircle className="w-4 h-4 text-blue-600" />
                        <span className="text-sm text-blue-600 font-medium">({reviewCount})</span>
                      </button>
                     
                      {/* Price bubble */}
                      <button
                        onClick={(e) => handlePriceClick(e, tour)}
                        className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-3 rounded-full shadow-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 cursor-pointer"
                      >
                        <span className="text-lg font-bold">{tour.price}</span>
                      </button>
                    </div>
                  </div>
                  
                  {/* Content section */}
                  <div className="p-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors leading-tight">
                      {tour.title}
                    </h4>
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                      {tour.description}
                    </p>
                   
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{tour.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{tour.groupSize}</span>
                      </div>
                    </div>
                   
                    <div className="flex space-x-3 mt-6">
                      <button 
                        onClick={() => setSelectedTourForDetails(tour)}
                        className="flex-1 bg-gradient-to-r from-gray-600 to-gray-700 text-white py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
                      >
                        <Info className="w-4 h-4" />
                        <span>Подробнее</span>
                      </button>
                      <button 
                        onClick={() => setSelectedTourForBooking(tour)}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                      >
                        Забронировать
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Наш VIP-сервис под ключ</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              От бронирования до возвращения домой — мы берем на себя всю организацию вашего идеального отдыха
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Сервис под ключ</h4>
              <p className="text-gray-600">Трансфер аэропорт, отели, рестораны — мы организуем всё от А до Я</p>
            </div>
            
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Эксклюзивные группы</h4>
              <p className="text-gray-600">Максимум 4 человека для VIP-обслуживания и персонального внимания</p>
            </div>
            
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-violet-50 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-violet-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Гиды-местные жители</h4>
              <p className="text-gray-600">Русскоговорящие гиды, живущие в Нормандии — знают все секретные места</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      {testimonials.length > 0 && (
        <section id="testimonials" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h3 className="text-4xl font-bold text-gray-900 mb-4">Отзывы наших клиентов</h3>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                Узнайте, что говорят о нас те, кто уже побывал в наших турах
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index} 
                  className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.tour}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Modals */}
      <TourDetailsModal 
        tour={selectedTourForDetails} 
        isOpen={!!selectedTourForDetails} 
        onClose={() => setSelectedTourForDetails(null)} 
        onBookTour={(tour) => setSelectedTourForBooking(tour)}
      />
      <TourReviewsModal 
        tour={selectedTourForReviews} 
        isOpen={!!selectedTourForReviews} 
        onClose={() => setSelectedTourForReviews(null)} 
      />

      {/* Booking Modal */}
      {selectedTourForBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-auto">
            <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Бронирование тура</h2>
                <p className="text-gray-600">{selectedTourForBooking.title}</p>
              </div>
              <button
                onClick={() => setSelectedTourForBooking(null)}
                className="text-gray-500 hover:text-gray-700 p-2"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              {bookingSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Заявка отправлена!</h3>
                  <p className="text-gray-600">Мы свяжемся с вами в ближайшее время для подтверждения бронирования.</p>
                </div>
              ) : (
                <>
                  {/* Tour Info */}
                  <div className="bg-blue-50 p-4 rounded-xl mb-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold text-gray-900">{selectedTourForBooking.title}</h3>
                        <p className="text-sm text-gray-600">{selectedTourForBooking.duration} • {selectedTourForBooking.groupSize}</p>
                      </div>
                      <span className="text-xl font-bold text-blue-600">{selectedTourForBooking.price}</span>
                    </div>
                  </div>

                  {/* Payment Info */}
                  <div className="bg-yellow-50 p-4 rounded-xl mb-6 border border-yellow-200">
                    <h4 className="font-semibold text-yellow-800 mb-2">💳 Условия оплаты</h4>
                    <ul className="text-sm text-yellow-700 space-y-1">
                      <li>• Оплата производится водителю в день тура</li>
                      <li>• Аванс 50€ после подтверждения бронирования</li>
                      <li>• Аванс возвращается при отмене за 48 часов</li>
                    </ul>
                  </div>

                  {/* Booking Form */}
                  <form onSubmit={handleBookingSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Имя *</label>
                        <input
                          type="text"
                          required
                          value={bookingFormData.name}
                          onChange={(e) => setBookingFormData(prev => ({ ...prev, name: e.target.value }))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Ваше имя"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                        <input
                          type="email"
                          required
                          value={bookingFormData.email}
                          onChange={(e) => setBookingFormData(prev => ({ ...prev, email: e.target.value }))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Телефон</label>
                        <input
                          type="tel"
                          value={bookingFormData.phone}
                          onChange={(e) => setBookingFormData(prev => ({ ...prev, phone: e.target.value }))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="+33 или +7"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Количество человек *</label>
                        <select
                          required
                          value={bookingFormData.people}
                          onChange={(e) => setBookingFormData(prev => ({ ...prev, people: e.target.value }))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="1">1 человек</option>
                          <option value="2">2 человека</option>
                          <option value="3">3 человека (рекомендуем)</option>
                          <option value="4">4 человека</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Предпочитаемая дата</label>
                      <input
                        type="date"
                        value={bookingFormData.date}
                        onChange={(e) => setBookingFormData(prev => ({ ...prev, date: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Дополнительные пожелания</label>
                      <textarea
                        rows={3}
                        value={bookingFormData.message}
                        onChange={(e) => setBookingFormData(prev => ({ ...prev, message: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Особые пожелания, место встречи в Париже..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isBookingSubmitting}
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-4 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isBookingSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          <span>Отправляем заявку...</span>
                        </>
                      ) : (
                        <>
                          <Calendar className="w-5 h-5" />
                          <span>Отправить заявку на бронирование</span>
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Price Explanation Popup */}
      {pricePopup.show && pricePopup.tour && (
        <div className="fixed inset-0 bg-black bg-opacity-25 z-50 flex items-center justify-center p-4">
          <div 
            className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 max-w-sm w-full mx-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={closePricePopup}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="text-center mb-4">
              <h4 className="font-bold text-gray-900 text-lg">{pricePopup.tour.title}</h4>
              <div className="text-2xl font-bold text-green-600 mt-2">{pricePopup.tour.price}</div>
            </div>
            
            <div className="space-y-3 text-sm">
              <div className="border-b pb-3">
                <h5 className="font-semibold text-gray-800 mb-2">💰 Что включено в цену:</h5>
                <ul className="space-y-1 text-gray-600">
                  <li>• VTC транспорт из Парижа</li>
                  <li>• Русскоговорящий гид-водитель</li>
                  <li>• Топливо и парковки</li>
                  <li>• Вода и WiFi в автомобиле</li>
                  <li>• Страховка пассажиров</li>
                </ul>
              </div>
              
              <div className="border-b pb-3">
                <h5 className="font-semibold text-gray-800 mb-2">📊 Структура цены:</h5>
                <div className="space-y-1 text-gray-600">
                  <div className="flex justify-between">
                    <span>Услуги гида:</span>
                    <span>60%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Транспорт + топливо:</span>
                    <span>25%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Страховка:</span>
                    <span>10%</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span>НДС (20%):</span>
                    <span>5%</span>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <p className="text-xs text-gray-500 mb-3">
                  💡 Цена фиксированная для группы до {pricePopup.tour.groupSize}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen Image Modal */}
      {fullscreenImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-95 z-50 overflow-auto cursor-zoom-out"
          onClick={() => setFullscreenImage(null)}
        >
          <div className="p-4">
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <img
                src={fullscreenImage}
                alt="Image en plein écran"
                className="w-auto h-auto max-w-none cursor-zoom-in"
                style={{ 
                  minWidth: '100%',
                  minHeight: 'calc(100vh - 2rem)',
                  objectFit: 'contain'
                }}
                onClick={() => setFullscreenImage(null)}
              />
            </div>
          </div>
          <button
            onClick={() => setFullscreenImage(null)}
            className="fixed top-4 right-4 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-all duration-300 z-10"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="fixed bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-2 rounded-lg text-sm backdrop-blur-sm">
            Cliquez pour fermer • Faites défiler pour naviguer
          </div>
        </div>
      )}
    </>
  );
};

export default HomePage;