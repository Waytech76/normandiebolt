import React from 'react';
import { Users, Award, Shield, MapPin, Clock, Heart, MessageCircle } from 'lucide-react';

interface AboutPageProps {
  setCurrentPage: (page: string) => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ setCurrentPage }) => {
  return (
    <div className="py-20">
      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-700/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 animate-fade-in">
            О нас
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto animate-slide-up">
            Мы — команда профессиональных гидов, влюбленных в Нормандию
          </p>
        </div>
      </section>

      {/* Main About Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Наша история</h2>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                🌟 <strong className="text-blue-600">Откройте секреты Нормандии с местными экспертами!</strong> 
                Мы — команда страстных русскоговорящих гидов, <strong>живущих в Нормандии уже много лет</strong>. 
                Наша уникальность в том, что мы сочетаем <strong className="text-indigo-600">русскоязычное наследие и французскую культуру</strong> — 
                мы понимаем менталитет русскоговорящих туристов, но при этом знаем Францию изнутри, как местные жители.
              </p>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                🏰 <strong className="text-indigo-600">Эксклюзивный доступ к магии Нормандии!</strong> 
                Благодаря нашему <strong>двойному культурному опыту</strong>, мы можем показать вам Нормандию 
                глазами местного жителя, но объяснить все на понятном русском языке, со всеми культурными нюансами 
                и историческими параллелями, которые будут вам близки.
              </p>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                🚗 <strong className="text-green-600">VIP-сервис от двери до двери!</strong> 
                Живя во французской системе сервиса, мы знаем, как обеспечить идеальный комфорт, 
                но при этом создать ту теплую, дружескую атмосферу, которая так ценится в русской культуре.
              </p>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                ✨ <strong className="text-purple-600">Персонализированная магия каждый день!</strong> 
                Наш <strong>билингвальный и бикультурный опыт</strong> позволяет нам быть идеальными 
                посредниками между двумя мирами — мы не просто переводим слова, мы передаем эмоции, 
                культурные коды и создаем мосты понимания между Россией и Францией.
              </p>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 text-white shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <h3 className="text-2xl font-bold mb-6">Наша миссия</h3>
                <p className="text-blue-100 mb-6">
                  Показать русскоговорящим туристам подлинную красоту Нормандии, поделиться 
                  нашей любовью к этому региону и создать персональные впечатления, которые 
                  останутся с вами навсегда.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">50+</div>
                    <div className="text-blue-200 text-sm">Довольных клиентов</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">3</div>
                    <div className="text-blue-200 text-sm">Лет опыта</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">Наши ценности</h3>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Принципы, которыми мы руководствуемся в работе
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Страсть к Нормандии</h4>
              <p className="text-gray-600">
                Мы искренне любим этот регион и хотим поделиться этой любовью с вами. 
                Каждый рассказ идет от сердца.
              </p>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Персональный подход</h4>
              <p className="text-gray-600">
                Каждый клиент уникален. Мы адаптируем наши туры под ваши интересы, 
                темп и предпочтения.
              </p>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-violet-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Качество превыше всего</h4>
              <p className="text-gray-600">
                Мы постоянно совершенствуемся, изучаем новые места и истории, 
                чтобы предложить вам лучший опыт.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Guide Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">Ваш гид по Нормандии</h3>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Познакомьтесь с вашим русскоговорящим гидом, который покажет вам настоящую Нормандию
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              <div className="md:flex">
                {/* Photo Section */}
                <div className="md:w-1/3 bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center p-12">
                  <div className="relative">
                    {/* Placeholder circle for photo */}
                    <div className="w-48 h-48 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-4 border-white/30 shadow-2xl">
                      <div className="w-40 h-40 bg-white/10 rounded-full flex items-center justify-center">
                        <Users className="w-20 h-20 text-white/80" />
                      </div>
                    </div>
                    {/* Decorative elements */}
                    <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full animate-bounce-slow"></div>
                    <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-green-400 rounded-full animate-bounce-slow" style={{ animationDelay: '1s' }}></div>
                  </div>
                </div>
                
                {/* Content Section */}
                <div className="md:w-2/3 p-8 md:p-12">
                  <div className="mb-6">
                    <h4 className="text-3xl font-bold text-gray-900 mb-2">Изнаур</h4>
                    <p className="text-xl text-blue-600 font-medium">Ваш русскоговорящий гид и водитель</p>
                  </div>
                  
                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    <p className="text-lg">
                      <span className="font-semibold text-blue-600">Здравствуйте!</span> Меня зовут Изнаур, 
                      я ваш русскоязычный водитель и гид по Нормандии.
                    </p>
                    
                    <p>
                      Я вырос и учился в <span className="font-semibold text-indigo-600">Руане</span> — городе с уникальной 
                      историей и атмосферой. Нормандия стала моим домом и моей страстью: я отлично знаю её города, 
                      побережье и скрытые уголки.
                    </p>
                    
                    <p>
                      Я говорю на <span className="font-semibold text-green-600">русском и французском</span> (оба — родные языки), 
                      а также на английском. Со мной вы увидите Нормандию не только через знаменитые достопримечательности, 
                      но и так, как её знают местные жители.
                    </p>
                  </div>
                  
                  {/* Skills/Languages */}
                  <div className="mt-8 flex flex-wrap gap-3">
                    <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                      🇷🇺 Русский (родной)
                    </span>
                    <span className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full text-sm font-medium">
                      🇫🇷 Français (natif)
                    </span>
                    <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
                      🇬🇧 English
                    </span>
                    <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium">
                      🏛️ Местная история
                    </span>
                  </div>
                  
                  {/* CTA */}
                  <div className="mt-8">
                    <button 
                      onClick={() => setCurrentPage('contact')}
                      className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center space-x-2"
                    >
                      <MessageCircle className="w-5 h-5" />
                      <span>Связаться с Изнауром</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">Наша команда</h3>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Профессиональные гиды с многолетним опытом
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h4 className="text-2xl font-bold text-gray-900 mb-4">Наши гиды</h4>
              <p className="text-gray-600 text-lg mb-6">
                Мы — команда молодых русскоговорящих гидов, живущих в Нормандии. 
                Наше преимущество — это не только знание языка, но и глубокое понимание 
                региона изнутри, как местных жителей.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <div>
                    <p className="font-semibold text-gray-900">Двойная культура</p>
                    <p className="text-gray-600">Русскоговорящие гиды, живущие в Нормандии</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <div>
                    <p className="font-semibold text-gray-900">Эксперты двух культур</p>
                    <p className="text-gray-600">Родной русский + французская культура изнутри</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <div>
                    <p className="font-semibold text-gray-900">Понимание менталитета</p>
                    <p className="text-gray-600">Знаем, что важно для русскоговорящих туристов</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-8 rounded-2xl">
              <h4 className="text-xl font-bold text-gray-900 mb-6">Что делает нас особенными</h4>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700">Знание скрытых жемчужин Нормандии</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700">Гибкость в планировании маршрутов</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700">Полная безопасность и страхование</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Heart className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700">Искренняя любовь к своему делу</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold mb-4">Наши достижения</h3>
            <p className="text-blue-100 max-w-2xl mx-auto text-lg">
              Цифры, которые говорят о нашем опыте и качестве
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-blue-200">Довольных клиентов</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">3</div>
              <div className="text-blue-200">Лет опыта</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">8</div>
              <div className="text-blue-200">Уникальных маршрутов</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">100%</div>
              <div className="text-blue-200">Положительных отзывов</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;