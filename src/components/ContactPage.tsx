import React from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle, Send } from 'lucide-react';

const ContactPage = () => {
  return (
    <div className="py-20">
      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-700/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 animate-fade-in">
            Контакты
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto animate-slide-up">
            Готовы отправиться в незабываемое путешествие по Нормандии? Мы поможем организовать идеальный тур!
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Details */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Свяжитесь с нами</h2>
                <p className="text-gray-600 text-lg mb-8">
                  Мы всегда готовы ответить на ваши вопросы и помочь спланировать идеальное путешествие по Нормандии.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">Телефон</h4>
                    <p className="text-gray-600 text-lg">+33 7 82 05 72 45</p>
                    <p className="text-sm text-green-600 font-medium">WhatsApp доступен</p>
                    <p className="text-sm text-gray-500">Ежедневно с 9:00 до 20:00</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-700 rounded-xl flex items-center justify-center shadow-lg">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">Email</h4>
                    <p className="text-gray-600 text-lg">normandietours@gmail.com</p>
                    <p className="text-sm text-gray-500">Ответим в течение 2 часов</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-violet-700 rounded-xl flex items-center justify-center shadow-lg">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">Адрес</h4>
                    <p className="text-gray-600 text-lg">Париж, Франция</p>
                    <p className="text-sm text-gray-500">Заберем вас в отеле, аэропорту или любом месте в Париже</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-600 to-red-700 rounded-xl flex items-center justify-center shadow-lg">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">Часы работы</h4>
                    <p className="text-gray-600 text-lg">Понедельник - Воскресенье</p>
                    <p className="text-sm text-gray-500">9:00 - 20:00 (по французскому времени)</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div id="contact-form" className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Отправить заявку</h3>
              <form action="https://formspree.io/f/meorqloq" method="POST" className="space-y-6">
                <input type="hidden" name="_subject" value="Nouvelle demande de contact - Normandie Tours" />
                <input type="hidden" name="_next" value="https://normandie-tours.netlify.app/?message=sent" />
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Имя *</label>
                    <input 
                      type="text" 
                      name="name"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="Ваше имя"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Фамилия</label>
                    <input 
                      type="text" 
                      name="surname"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="Ваша фамилия"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                  <input 
                    type="email" 
                    name="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Телефон</label>
                  <input 
                    type="tel" 
                    name="phone"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="+7 (xxx) xxx-xx-xx"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Интересующий тур</label>
                  <select name="tour" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300">
                    <option value="">Выберите тур</option>
                    <option value="rouen-giverny">Руан + Живерни</option>
                    <option value="combined-2days">Комбинированный тур: 2 дня</option>
                    <option value="rouen-etretat">Руан + Этрета</option>
                    <option value="rouen-honfleur-etretat">Руан – Онфлёр – Этрета</option>
                    <option value="mont-saint-michel-day">Мон-Сен-Мишель — дневной тур</option>
                    <option value="mont-saint-michel-2days">Мон-Сен-Мишель — 2 дня / 1 ночь</option>
                    <option value="bayeux-dday">Байё + Пляжи Высадки</option>
                    <option value="caen-calvados">Кан + Кальвадос</option>
                    <option value="custom">Индивидуальный тур</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Количество человек</label>
                  <select name="people" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300">
                    <option value="">Выберите количество</option>
                    <option value="1">1 человек</option>
                    <option value="2">2 человека</option>
                    <option value="3">3 человека</option>
                    <option value="4">4 человека</option>
                    <option value="5">5 человек</option>
                    <option value="6">6 человек</option>
                    <option value="7">7 человек</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Предпочитаемая дата</label>
                  <input 
                    type="date" 
                    name="date"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Сообщение</label>
                  <textarea 
                    rows={4}
                    name="message"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="Расскажите о ваших пожеланиях, особых интересах или вопросах..."
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-4 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <Send className="w-5 h-5" />
                  <span>Отправить заявку</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">Часто задаваемые вопросы</h3>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Ответы на самые популярные вопросы о наших турах
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Как забронировать тур?</h4>
                <p className="text-gray-600">
                  Свяжитесь с нами по телефону, email или заполните форму на сайте. 
                  Мы обсудим детали и подтвердим бронирование.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Какой размер группы?</h4>
                <p className="text-gray-600">
                  Максимум 4 человека в группе для комфортного и персонального опыта. 
                  Рекомендуем 3 человека для максимального комфорта. Также организуем индивидуальные приватные туры.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Что включено в стоимость?</h4>
                <p className="text-gray-600">
                  Транспорт, услуги гида, входные билеты в основные достопримечательности. 
                  Питание обсуждается отдельно.
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Можно ли изменить маршрут?</h4>
                <p className="text-gray-600">
                  Да, мы адаптируем маршрут под ваши интересы и пожелания. 
                  Обсудим это при бронировании.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Какая погода в Нормандии?</h4>
                <p className="text-gray-600">
                  Умеренный океанический климат. Рекомендуем взять легкую куртку 
                  и удобную обувь в любое время года.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Есть ли скидки?</h4>
                <p className="text-gray-600">
                  Предоставляем скидки для больших групп, постоянных клиентов 
                  и при бронировании нескольких туров.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Contact */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold mb-4">Есть вопросы?</h3>
          <p className="text-blue-100 mb-8 text-lg">
            Не стесняйтесь обращаться к нам любым удобным способом
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:+33782057245" 
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <Phone className="w-5 h-5" />
              <span>Позвонить</span>
            </a>
            <button 
              onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-blue-500 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-400 hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <Mail className="w-5 h-5" />
              <span>Написать</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;