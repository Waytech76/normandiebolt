import React, { useState, useEffect } from 'react';
import { Cookie, X, Check } from 'lucide-react';

const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Vérifier si l'utilisateur a déjà accepté les cookies
    const cookiesAccepted = localStorage.getItem('normandie-tours-cookies-accepted');
    if (!cookiesAccepted) {
      setTimeout(() => {
        setShowBanner(true);
        setTimeout(() => setIsVisible(true), 100);
      }, 2000); // Afficher après 2 secondes
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('normandie-tours-cookies-accepted', 'true');
    setIsVisible(false);
    setTimeout(() => setShowBanner(false), 300);
  };

  const rejectCookies = () => {
    localStorage.setItem('normandie-tours-cookies-accepted', 'essential-only');
    setIsVisible(false);
    setTimeout(() => setShowBanner(false), 300);
  };

  if (!showBanner) return null;

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-50 transition-all duration-300 ${
      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
    }`}>
      <div className="bg-white border-t border-gray-200 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start space-x-3 flex-1">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <Cookie className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-1">Использование файлов cookie</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Мы используем файлы cookie для улучшения работы сайта, анализа трафика и персонализации контента. 
                  Продолжая использовать сайт, вы соглашаетесь с нашей{' '}
                  <button className="text-blue-600 hover:text-blue-700 underline font-medium">
                    политикой конфиденциальности
                  </button>.
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 flex-shrink-0">
              <button
                onClick={rejectCookies}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors text-sm"
              >
                Только необходимые
              </button>
              <button
                onClick={acceptCookies}
                className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center space-x-2"
              >
                <Check className="w-4 h-4" />
                <span>Принять все</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;