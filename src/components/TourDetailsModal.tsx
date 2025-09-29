import React from 'react';
import { X, Clock, Users, MapPin, Star, Calendar } from 'lucide-react';

interface TourDetailsModalProps {
  tour: any;
  isOpen: boolean;
  onClose: () => void;
  onBookTour?: (tour: any) => void;
}

const TourDetailsModal: React.FC<TourDetailsModalProps> = ({ tour, isOpen, onClose, onBookTour }) => {
  if (!isOpen || !tour) return null;

  const tourSchedules = {
    1: { // Руан + Живерни
      schedule: [
        { time: "08:00", activity: "Встреча и отправление из Парижа" },
        { time: "09:30", activity: "Прибытие в Живерни, посещение дома и садов Клода Моне" },
        { time: "11:30", activity: "Прогулка по деревне Живерни" },
        { time: "12:30", activity: "Переезд в Руан (45 минут)" },
        { time: "13:30", activity: "Обед в Руане (не включен)" },
        { time: "15:00", activity: "Экскурсия по историческому центру Руана" },
        { time: "16:00", activity: "Посещение Кафедрального собора Нотр-Дам" },
        { time: "17:30", activity: "Возвращение в Париж" }
      ],
      included: ["VTC транспорт из Парижа", "Русскоговорящий гид", "Входные билеты в сады Моне", "Вода и WiFi в автомобиле", "Страховка пассажиров"],
      notIncluded: ["Обед", "Ночевка в отеле", "Личные расходы", "Входные билеты в музеи (кроме садов Моне)"]
    },
    2: { // Комбинированный тур: 2 дня
      schedule: [
        { time: "День 1 - 08:00", activity: "Отправление из Парижа в Живерни" },
        { time: "День 1 - 09:30", activity: "Дом и сады Клода Моне в Живерни" },
        { time: "День 1 - 12:00", activity: "Переезд в Руан, обед" },
        { time: "День 1 - 15:00", activity: "Экскурсия по Руану, собор Нотр-Дам" },
        { time: "День 1 - 19:00", activity: "Ночевка в Руане (отель не включен)" },
        { time: "День 2 - 09:00", activity: "Отправление в Этрета" },
        { time: "День 2 - 10:30", activity: "Прогулка по скалам Этрета" },
        { time: "День 2 - 14:00", activity: "Переезд в Онфлёр, обед" },
        { time: "День 2 - 16:00", activity: "Прогулка по порту Онфлёр" },
        { time: "День 2 - 18:00", activity: "Возвращение в Париж" }
      ],
      included: ["VTC транспорт 2 дня", "Русскоговорящий гид", "Входные билеты в сады Моне", "Вода и WiFi", "Страховка пассажиров"],
      notIncluded: ["Питание", "Ночевка в отеле", "Личные расходы", "Входные билеты в музеи"]
    },
    3: { // Руан + Этрета
      schedule: [
        { time: "08:00", activity: "Отправление из Парижа" },
        { time: "09:30", activity: "Прибытие в Руан, экскурсия по городу" },
        { time: "11:00", activity: "Посещение собора Нотр-Дам" },
        { time: "12:00", activity: "Переезд в Этрета (1.5 часа)" },
        { time: "13:30", activity: "Обед с видом на море (не включен)" },
        { time: "14:30", activity: "Прогулка по знаменитым скалам" },
        { time: "16:00", activity: "Фотосессия у арки Порт-д'Аваль" },
        { time: "17:00", activity: "Возвращение в Париж" }
      ],
      included: ["VTC транспорт из Парижа", "Русскоговорящий гид", "Парковка", "Вода и WiFi", "Страховка пассажиров"],
      notIncluded: ["Обед", "Ночевка в отеле", "Личные расходы", "Входные билеты в музеи"]
    },
    4: { // Руан – Онфлёр – Этрета
      schedule: [
        { time: "08:00", activity: "Отправление из Парижа" },
        { time: "09:30", activity: "Прибытие в Руан, экскурсия по городу" },
        { time: "11:00", activity: "Переезд в Онфлёр" },
        { time: "12:30", activity: "Прогулка по порту Онфлёр, обед (не включен)" },
        { time: "14:30", activity: "Переезд в Этрета" },
        { time: "15:30", activity: "Прогулка по скалам Этрета" },
        { time: "17:00", activity: "Возвращение в Париж" }
      ],
      included: ["VTC транспорт из Парижа", "Русскоговорящий гид", "Парковка", "Вода и WiFi", "Страховка пассажиров"],
      notIncluded: ["Обед", "Ночевка в отеле", "Личные расходы", "Входные билеты в музеи"]
    },
    5: { // Мон-Сен-Мишель — дневной тур
      schedule: [
        { time: "07:00", activity: "Отправление из Парижа" },
        { time: "11:30", activity: "Прибытие к Мон-Сен-Мишель (4h30 пути)" },
        { time: "12:00", activity: "Экскурсия по аббатству" },
        { time: "14:00", activity: "Обед с видом на залив (не включен)" },
        { time: "15:30", activity: "Прогулка по деревне и валам" },
        { time: "16:00", activity: "Возвращение в Париж (4h30 пути)" }
      ],
      included: ["VTC транспорт из Парижа", "Русскоговорящий гид", "Парковка", "Вода и WiFi", "Страховка пассажиров"],
      notIncluded: ["Обед", "Входные билеты в аббатство", "Личные расходы"]
    },
    6: { // Мон-Сен-Мишель — 2 дня / 1 ночь
      schedule: [
        { time: "День 1 - 07:00", activity: "Отправление из Парижа" },
        { time: "День 1 - 11:30", activity: "Прибытие (4h30 пути), экскурсия по аббатству" },
        { time: "День 1 - 15:00", activity: "Прогулка по заливу во время отлива" },
        { time: "День 1 - 19:00", activity: "Ночевка рядом с Мон-Сен-Мишель (отель не включен)" },
        { time: "День 2 - 09:00", activity: "Утренняя прогулка, фотосессия" },
        { time: "День 2 - 11:00", activity: "Возвращение в Париж (4h30 пути)" }
      ],
      included: ["VTC транспорт 2 дня", "Русскоговорящий гид", "Парковка", "Вода и WiFi", "Страховка пассажиров"],
      notIncluded: ["Питание", "Ночевка в отеле", "Входные билеты в аббатство", "Личные расходы"]
    },
    7: { // Байё + Пляжи Высадки
      schedule: [
        { time: "08:00", activity: "Отправление из Парижа" },
        { time: "12:00", activity: "Прибытие в Байё (4 часа пути), посещение собора" },
        { time: "13:00", activity: "Музей гобелена Байё (входной билет не включен)" },
        { time: "14:30", activity: "Обед в Байё (не включен)" },
        { time: "15:30", activity: "Пляж Омаха, мемориал" },
        { time: "17:00", activity: "Американское кладбище в Коллевиль-сюр-Мер" },
        { time: "18:30", activity: "Возвращение в Париж (4 часа)" }
      ],
      included: ["VTC транспорт из Парижа", "Русскоговорящий гид", "Парковка", "Вода и WiFi", "Страховка пассажиров"],
      notIncluded: ["Обед", "Входные билеты в музеи", "Личные расходы"]
    },
    8: { // Кан + Кальвадос
      schedule: [
        { time: "08:00", activity: "Отправление из Парижа" },
        { time: "11:30", activity: "Прибытие в Кан (3h30 пути), замок Вильгельма Завоевателя" },
        { time: "13:00", activity: "Обед в Кане (не включен)" },
        { time: "14:30", activity: "Посещение винокурни кальвадоса" },
        { time: "16:00", activity: "Дегустация кальвадоса и местных продуктов" },
        { time: "17:30", activity: "Возвращение в Париж (3h30)" }
      ],
      included: ["VTC транспорт из Парижа", "Русскоговорящий гид", "Дегустация кальвадоса", "Вода и WiFi", "Страховка пассажиров"],
      notIncluded: ["Обед", "Входные билеты в замок", "Личные расходы"]
    }
  };

  const currentSchedule = tourSchedules[tour.id as keyof typeof tourSchedules] || {
    schedule: [{ time: "08:00", activity: "Отправление из Парижа, программа уточняется при бронировании" }],
    included: ["VTC транспорт из Парижа", "Русскоговорящий гид", "Вода и WiFi", "Страховка пассажиров"],
    notIncluded: ["Питание", "Ночевка в отеле", "Входные билеты в музеи", "Личные расходы"]
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-auto">
        <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">{tour.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 p-2"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* Tour Info */}
          <div className="grid md:grid-cols-4 gap-6">
            <div className="flex items-center space-x-3">
              <Clock className="w-5 h-5 text-blue-600" />
              <div>
                <p className="font-medium">Продолжительность</p>
                <p className="text-gray-600">{tour.duration}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Users className="w-5 h-5 text-blue-600" />
              <div>
                <p className="font-medium">Группа</p>
                <p className="text-gray-600">до 4 человек (рекомендуем 3)</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-blue-600" />
              <div>
                <p className="font-medium">Отправление</p>
                <p className="text-gray-600">Париж</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Star className="w-5 h-5 text-blue-600" />
              <div>
                <p className="font-medium">Цена</p>
                <p className="text-gray-600">{tour.price}</p>
              </div>
            </div>
          </div>

          {/* Departure Info */}
          <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
            <h3 className="text-lg font-semibold text-blue-900 mb-3 flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              Место отправления
            </h3>
            <p className="text-blue-800 mb-3">
              <strong>Все туры начинаются из Парижа</strong> - мы заберем вас в удобном для вас месте:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-blue-700">🏨 Ваш отель в Париже</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-blue-700">✈️ Аэропорт (CDG, Orly)</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-blue-700">🚉 Вокзал (Gare du Nord, etc.)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-blue-700">📍 Любое место по вашему выбору</span>
                </div>
              </div>
            </div>
            <p className="text-sm text-blue-600 mt-3 italic">
              💡 Трансфер из Парижа включен в стоимость тура
            </p>
          </div>
          {/* Description */}
          <div>
            <h3 className="text-xl font-semibold mb-3">Описание тура</h3>
            <p className="text-gray-700 leading-relaxed">{tour.description}</p>
          </div>

          {/* Schedule */}
          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-blue-600" />
              Программа тура
            </h3>
            <div className="space-y-3">
              {currentSchedule.schedule.map((item, index) => (
                <div key={index} className="flex items-start space-x-4 p-3 bg-gray-50 rounded-lg">
                  <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium min-w-fit">
                    {item.time}
                  </div>
                  <p className="text-gray-700">{item.activity}</p>
                </div>
              ))}
            </div>
          </div>

          {/* What's Included */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-green-700 mb-3">✅ Включено в стоимость</h4>
              <ul className="space-y-2">
                {currentSchedule.included.map((item, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-red-700 mb-3">❌ Не включено</h4>
              <ul className="space-y-2">
                {currentSchedule.notIncluded.map((item, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Booking Button */}
          <div className="border-t pt-6">
            <button 
              onClick={() => {
                if (onBookTour) {
                  onBookTour(tour);
                  onClose();
                }
              }}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-4 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              Забронировать
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourDetailsModal;