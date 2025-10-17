'use client';

import { useCalendarStore } from '@/lib/store';
import { 
  convertSolar2Lunar, 
  getCanChi, 
  getTietKhi, 
  getTruc, 
  getGioHoangDao,
  getDayName 
} from '@/lib/lunar-calendar';
import { EVENTS } from '@/lib/constants';
import { getDateString } from '@/lib/utils';
import { useEffect } from 'react';

export function DayDetailsModal() {
  const { isModalOpen, modalContent, closeModal } = useCalendarStore();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen, closeModal]);

  if (!isModalOpen || !modalContent || modalContent.type !== 'dayDetails') {
    return null;
  }

  const { day, month, year } = modalContent.date;
  const date = new Date(year, month - 1, day);
  const lunar = convertSolar2Lunar(day, month, year);
  const canChi = getCanChi(day, month, year);
  const tietKhi = getTietKhi(day, month, year);
  const truc = getTruc(day, month, year);
  const { hoangDao, hacDao } = getGioHoangDao(day, month, year);

  const dateStr = getDateString(date);
  const dayEvents = EVENTS.filter(event => event.date === dateStr);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="relative bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl animate-in slide-in-from-bottom-4 duration-500">
        {/* Header with enhanced gradient */}
        <div className="relative bg-gradient-to-br from-primary via-primary-light to-emerald-600 p-6 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-20">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />
          </div>
          
          <div className="relative z-10 flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mr-4">
                <i className="fas fa-calendar-day text-2xl text-white"></i>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">
                  {getDayName(date.getDay())}
                </h3>
                <p className="text-white/90 text-lg">
                  {day}/{month}/{year}
                </p>
              </div>
            </div>
            <button 
              onClick={closeModal}
              className="p-3 hover:bg-white/20 rounded-xl transition-all duration-300 text-white hover:scale-110"
            >
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>
        </div>
        
        <div className="overflow-y-auto max-h-[calc(90vh-120px)] p-6 space-y-6">
          {/* Date Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Solar Date Card */}
            <div className="relative bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 overflow-hidden border border-blue-200">
              <div className="absolute inset-0 opacity-20">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%233b82f6' fill-opacity='0.2'%3E%3Ccircle cx='15' cy='15' r='8'/%3E%3Cpath d='M15 3v4M15 23v4M27 15h-4M7 15H3M23.5 6.5l-2.8 2.8M9.3 20.7l-2.8 2.8M23.5 23.5l-2.8-2.8M9.3 9.3L6.5 6.5'/%3E%3C/g%3E%3C/svg%3E")`,
                  }}
                />
              </div>
              <div className="relative z-10">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center mr-3">
                    <i className="fas fa-sun text-blue-600 text-lg"></i>
                  </div>
                  <h4 className="font-bold text-blue-800 text-lg">Dương Lịch</h4>
                </div>
                <p className="text-3xl font-bold text-blue-900 mb-2">{day}/{month}/{year}</p>
                <p className="text-blue-700 font-medium">{getDayName(date.getDay())}</p>
              </div>
            </div>

            {/* Lunar Date Card */}
            <div className="relative bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 overflow-hidden border border-purple-200">
              <div className="absolute inset-0 opacity-20">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%238b5cf6' fill-opacity='0.2'%3E%3Cpath d='M16 2c-7.7 0-14 6.3-14 14s6.3 14 14 14c2.4 0 4.7-.6 6.7-1.7-2.4 1.1-5.1 1.7-7.9 1.7-10.5 0-19-8.5-19-19S4.3-3 14.8-3c2.8 0 5.5.6 7.9 1.7C20.7 2.6 18.4 2 16 2z'/%3E%3C/g%3E%3C/svg%3E")`,
                  }}
                />
              </div>
              <div className="relative z-10">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center mr-3">
                    <i className="fas fa-moon text-purple-600 text-lg"></i>
                  </div>
                  <h4 className="font-bold text-purple-800 text-lg">Âm Lịch</h4>
                </div>
                <p className="text-3xl font-bold text-purple-900 mb-2">{lunar.day}/{lunar.month}/{lunar.year}</p>
                <p className="text-purple-700 font-medium">{lunar.isLeapMonth ? 'Tháng nhuận' : 'Tháng đủ'}</p>
              </div>
            </div>
          </div>
          
          {/* Traditional Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-5 overflow-hidden border border-emerald-200">
              <div className="absolute inset-0 opacity-20">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='25' height='25' viewBox='0 0 25 25' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%2310b981' fill-opacity='0.2'%3E%3Cpath d='M12.5 2l3 6h6l-5 4 2 6-6-4-6 4 2-6-5-4h6l3-6z'/%3E%3C/g%3E%3C/svg%3E")`,
                  }}
                />
              </div>
              <div className="relative z-10">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center mr-3">
                    <i className="fas fa-yin-yang text-emerald-600"></i>
                  </div>
                  <h4 className="font-bold text-emerald-800">Can Chi</h4>
                </div>
                <p className="text-xl font-bold text-emerald-900">{canChi}</p>
              </div>
            </div>

            <div className="relative bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-5 overflow-hidden border border-amber-200">
              <div className="absolute inset-0 opacity-20">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='28' height='28' viewBox='0 0 28 28' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23f59e0b' fill-opacity='0.2'%3E%3Cpath d='M14 2C7.4 2 2 7.4 2 14s5.4 12 12 12 12-5.4 12-12S20.6 2 14 2zm0 20c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z'/%3E%3Cpath d='M14 6v8l6 3.5-1 1.7-7-4V6h2z'/%3E%3C/g%3E%3C/svg%3E")`,
                  }}
                />
              </div>
              <div className="relative z-10">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-amber-500/20 rounded-lg flex items-center justify-center mr-3">
                    <i className="fas fa-compass text-amber-600"></i>
                  </div>
                  <h4 className="font-bold text-amber-800">Trực</h4>
                </div>
                <p className="text-xl font-bold text-amber-900">{truc}</p>
              </div>
            </div>

            <div className="relative bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-5 overflow-hidden border border-indigo-200">
              <div className="absolute inset-0 opacity-20">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%236366f1' fill-opacity='0.2'%3E%3Cpath d='M13 2l2.5 5h5.5l-4.5 3.5 1.5 5.5-4.5-3.5-4.5 3.5 1.5-5.5L5 7h5.5L13 2z'/%3E%3C/g%3E%3C/svg%3E")`,
                  }}
                />
              </div>
              <div className="relative z-10">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-indigo-500/20 rounded-lg flex items-center justify-center mr-3">
                    <i className="fas fa-leaf text-indigo-600"></i>
                  </div>
                  <h4 className="font-bold text-indigo-800">Tiết Khí</h4>
                </div>
                <p className="text-xl font-bold text-indigo-900">{tietKhi || 'Không có'}</p>
              </div>
            </div>
          </div>
          
          {/* Hours Info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="relative bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 overflow-hidden border border-green-200">
              <div className="absolute inset-0 opacity-20">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='35' height='35' viewBox='0 0 35 35' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%2322c55e' fill-opacity='0.2'%3E%3Ccircle cx='17.5' cy='17.5' r='12'/%3E%3Cpath d='M17.5 5v5M17.5 25v5M30 17.5h-5M10 17.5H5M26.5 8.5l-3.5 3.5M12 21l-3.5 3.5M26.5 26.5l-3.5-3.5M12 14L8.5 8.5'/%3E%3C/g%3E%3C/svg%3E")`,
                  }}
                />
              </div>
              <div className="relative z-10">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center mr-3">
                    <i className="fas fa-sun text-green-600 text-lg"></i>
                  </div>
                  <h4 className="font-bold text-green-800 text-lg">Giờ Hoàng Đạo (Tốt)</h4>
                </div>
                <div className="space-y-3">
                  {hoangDao.map((hour, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm border border-green-200/50">
                      <span className="font-bold text-green-800">{hour.chi}</span>
                      <span className="text-sm text-green-600 font-medium">{hour.time}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-green-500/10 rounded-lg border border-green-300/50">
                  <p className="text-sm text-green-700 font-medium flex items-center">
                    <i className="fas fa-info-circle mr-2"></i>
                    Thích hợp: khởi công, khai trương, cưới hỏi, xuất hành
                  </p>
                </div>
              </div>
            </div>
            
            <div className="relative bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-6 overflow-hidden border border-red-200">
              <div className="absolute inset-0 opacity-20">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='33' height='33' viewBox='0 0 33 33' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ef4444' fill-opacity='0.2'%3E%3Cpath d='M16.5 3c-7.5 0-13.5 6-13.5 13.5 0 3.7 1.5 7.1 4 9.5l1.5-1.5C6.5 22.5 5 19.6 5 16.5 5 9.6 10.6 4 17.5 4s12.5 5.6 12.5 12.5c0 3.1-1.5 6-4 8l1.5 1.5c2.5-2.4 4-5.8 4-9.5C30 9 24 3 16.5 3z'/%3E%3Ccircle cx='16.5' cy='16.5' r='4'/%3E%3C/g%3E%3C/svg%3E")`,
                  }}
                />
              </div>
              <div className="relative z-10">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center mr-3">
                    <i className="fas fa-moon text-red-600 text-lg"></i>
                  </div>
                  <h4 className="font-bold text-red-800 text-lg">Giờ Hắc Đạo (Xấu)</h4>
                </div>
                <div className="space-y-3">
                  {hacDao.map((hour, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm border border-red-200/50">
                      <span className="font-bold text-red-800">{hour.chi}</span>
                      <span className="text-sm text-red-600 font-medium">{hour.time}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-red-500/10 rounded-lg border border-red-300/50">
                  <p className="text-sm text-red-700 font-medium flex items-center">
                    <i className="fas fa-exclamation-triangle mr-2"></i>
                    Nên tránh: việc quan trọng, ký kết hợp đồng
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Events */}
          {dayEvents.length > 0 && (
            <div className="relative bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 overflow-hidden border border-orange-200">
              <div className="absolute inset-0 opacity-20">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23f97316' fill-opacity='0.2'%3E%3Cpath d='M15 3l3 6h6l-5 4 2 6-6-4-6 4 2-6-5-4h6l3-6z'/%3E%3C/g%3E%3C/svg%3E")`,
                  }}
                />
              </div>
              <div className="relative z-10">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center mr-3">
                    <i className="fas fa-star text-orange-600 text-lg"></i>
                  </div>
                  <h4 className="font-bold text-orange-800 text-lg">Sự Kiện & Ngày Lễ</h4>
                </div>
                <div className="space-y-3">
                  {dayEvents.map((event, index) => (
                    <div key={index} className="relative bg-white/80 backdrop-blur-sm p-4 rounded-xl border-l-4 border-orange-500 shadow-sm overflow-hidden">
                      <div className="absolute inset-0 opacity-10">
                        <div
                          className="absolute inset-0"
                          style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23f97316' fill-opacity='0.2'%3E%3Ccircle cx='10' cy='10' r='3'/%3E%3C/g%3E%3C/svg%3E")`,
                          }}
                        />
                      </div>
                      <div className="relative z-10">
                        <h5 className="font-bold text-orange-800 text-lg mb-2">{event.title}</h5>
                        <p className="text-orange-700 leading-relaxed">{event.desc}</p>
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
}
