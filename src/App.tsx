import React, { useState, useEffect } from 'react';
import { Menu, X, MapPin, Facebook, Instagram } from 'lucide-react';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import ReviewPage from './components/ReviewPage';
import AdminReviewsPage from './components/AdminReviewsPage';
import AdminLogin from './components/AdminLogin';
import CookieBanner from './components/CookieBanner';

// Simple Pill Navigation Component
const PillNav: React.FC<{
  currentPage: string;
  setCurrentPage: (page: string) => void;
  setIsMenuOpen: (open: boolean) => void;
}> = ({ currentPage, setCurrentPage, setIsMenuOpen }) => {
  const navItems = [
    { id: 'home', label: 'Главная' },
    { id: 'about', label: 'О нас' },
    { id: 'contact', label: 'Контакты' },
    { id: 'review', label: 'Отзывы' }
  ];

  const handleNavClick = (pageId: string) => {
    setCurrentPage(pageId);
    setIsMenuOpen(false);
    // Update URL
    window.history.pushState({}, '', `/${pageId === 'home' ? '' : pageId}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex items-center space-x-2">
      {navItems.map((item) => {
        const isActive = currentPage === item.id;
        
        return (
          <button
            key={item.id}
            onClick={() => handleNavClick(item.id)}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
              isActive
                ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg'
                : 'text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:text-blue-700 hover:shadow-md'
            }`}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
};

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  // Handle URL routing
  useEffect(() => {
    const handleRouting = () => {
      const path = window.location.pathname;
      if (path === '/about') {
        setCurrentPage('about');
      } else if (path === '/contact') {
        setCurrentPage('contact');
      } else if (path === '/review') {
        setCurrentPage('review');
      } else if (path === '/admin' || window.location.hash === '#admin') {
        setCurrentPage('admin');
      } else {
        setCurrentPage('home');
      }
    };
    
    handleRouting();
    
    const checkAdminAccess = () => {
      const hash = window.location.hash;
      const params = new URLSearchParams(window.location.search);
      
      if (hash === '#admin' || params.get('admin') === 'true') {
        setCurrentPage('admin');
        window.history.pushState({}, '', '/admin');
      }
    };
    
    checkAdminAccess();
    
    // Listen for browser navigation
    window.addEventListener('hashchange', checkAdminAccess);
    window.addEventListener('popstate', handleRouting);
    
    return () => {
      window.removeEventListener('hashchange', checkAdminAccess);
      window.removeEventListener('popstate', handleRouting);
    };
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'about':
        return <AboutPage setCurrentPage={setCurrentPage} />;
      case 'contact':
        return <ContactPage />;
      case 'review':
        return <ReviewPage setCurrentPage={setCurrentPage} />;
      case 'admin':
        return <AdminReviewsPage />;
      default:
        return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };

  // Special case for review page - no header/footer
  if (currentPage === 'review') {
    return <ReviewPage setCurrentPage={setCurrentPage} />;
  }

  // Special case for admin page - minimal header
  if (currentPage === 'admin') {
    if (!isAdminAuthenticated) {
      return <AdminLogin onLogin={() => setIsAdminAuthenticated(true)} />;
    }
    
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <button 
                onClick={() => setCurrentPage('home')}
                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold text-gray-900">Admin Panel</span>
              </button>
              <button
                onClick={() => setCurrentPage('home')}
                className="text-gray-600 hover:text-gray-900"
              >
                Retour au site
              </button>
            </div>
          </div>
        </header>
        <AdminReviewsPage />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-transparent backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <button 
              onClick={() => {
                setCurrentPage('home');
                window.history.pushState({}, '', '/');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-lg">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
                  Normandie Tours
                </h1>
                <p className="text-sm text-gray-600">Откройте красоту Нормандии</p>
              </div>
            </button>
            
            <nav className="hidden md:flex items-center space-x-8">
              <PillNav 
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                setIsMenuOpen={setIsMenuOpen}
              />
            </nav>

            <button 
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-transparent backdrop-blur-md border-t border-gray-200 animate-fade-in">
            <div className="px-4 py-3 space-y-3">
              <button 
                onClick={() => {
                  setCurrentPage('home');
                  setIsMenuOpen(false);
                  window.history.pushState({}, '', '/');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`block w-full text-left font-medium ${
                  currentPage === 'home' 
                    ? 'text-blue-600' 
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                Главная
              </button>
              <button 
                onClick={() => {
                  setCurrentPage('about');
                  setIsMenuOpen(false);
                  window.history.pushState({}, '', '/about');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`block w-full text-left font-medium ${
                  currentPage === 'about' 
                    ? 'text-blue-600' 
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                О нас
              </button>
              <button 
                onClick={() => {
                  setCurrentPage('contact');
                  setIsMenuOpen(false);
                  window.history.pushState({}, '', '/contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`block w-full text-left font-medium ${
                  currentPage === 'contact' 
                    ? 'text-blue-600' 
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                Контакты
              </button>
              <button 
                onClick={() => {
                  setCurrentPage('review');
                  setIsMenuOpen(false);
                  window.history.pushState({}, '', '/review');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="block w-full text-left font-medium bg-gradient-to-r from-green-600 to-emerald-700 text-white px-4 py-2 rounded-lg"
              >
                Оставить отзыв
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Page Content */}
      {renderPage()}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                <h4 className="text-xl font-bold">Normandie Tours</h4>
              </div>
              <p className="text-gray-400 mb-4">
                Откройте красоту Нормандии с профессиональными русскоговорящими гидами
              </p>
              <button 
                onClick={() => setCurrentPage('review')}
                className="bg-gradient-to-r from-green-600 to-emerald-700 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                Оставить отзыв
              </button>
              
              {/* Social Links */}
              <div className="flex items-center space-x-4 mt-4">
                <a 
                  href="https://www.facebook.com/profile.php?id=61581347082118" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a 
                  href="https://www.instagram.com/normandie.tours/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-pink-400 hover:text-pink-300 transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a 
                  href="https://vk.ru/club232991135" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-400 transition-colors"
                >
                  <span className="text-lg font-bold">VK</span>
                </a>
              </div>
            </div>
            
            <div>
              <h5 className="text-lg font-semibold mb-4">Популярные туры</h5>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={() => setCurrentPage('home')} className="hover:text-white transition-colors">Руан + Живерни</button></li>
                <li><button onClick={() => setCurrentPage('home')} className="hover:text-white transition-colors">Мон-Сен-Мишель</button></li>
                <li><button onClick={() => setCurrentPage('home')} className="hover:text-white transition-colors">Этрета + Онфлёр</button></li>
                <li><button onClick={() => setCurrentPage('home')} className="hover:text-white transition-colors">Пляжи Высадки</button></li>
              </ul>
            </div>
            
            <div>
              <h5 className="text-lg font-semibold mb-4">Контакты и отзывы</h5>
              <div className="space-y-2 text-gray-400">
                <p>+33 7 82 05 72 45 (WhatsApp)</p>
                <p>normandietours@gmail.com</p>
                <p>Руан, Нормандия, Франция</p>
                
                {/* Google Review Link */}
                <div className="mt-4">
                  <a 
                    href="https://g.page/r/CcRVfr-61I2FEBM/review" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-sm"
                  >
                    <span>⭐</span>
                    <span>Оставить отзыв в Google</span>
                  </a>
                </div>
                
                {/* Social Media Links */}
                <div className="flex items-center space-x-4 mt-4">
                  <a 
                    href="https://www.facebook.com/profile.php?id=61581347082118" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                    title="Facebook"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a 
                    href="https://www.instagram.com/normandie.tours/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-pink-400 hover:text-pink-300 transition-colors"
                    title="Instagram"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a 
                    href="https://vk.ru/club232991135" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-400 transition-colors text-sm font-bold"
                    title="VKontakte"
                  >
                    VK
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Normandie Tours. Все права защищены.</p>
          </div>
        </div>
      </footer>
      
      {/* Cookie Banner */}
      <CookieBanner />
    </div>
  );
};

export default App;