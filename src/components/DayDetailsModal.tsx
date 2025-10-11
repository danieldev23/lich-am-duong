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
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-neutral-200 p-4 flex justify-between items-center">
          <h3 className="text-xl font-bold text-primary">
            {getDayName(date.getDay())}, {day}/{month}/{year}
          </h3>
          <button 
            onClick={closeModal}
            className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Date Info */}
          <div className="bg-gradient-to-r from-primary to-primary-light p-4 rounded-lg text-white">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Dương Lịch</h4>
                <p className="text-2xl font-bold">{day}/{month}/{year}</p>
                <p className="text-sm opacity-90">{getDayName(date.getDay())}</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Âm Lịch</h4>
                <p className="text-2xl font-bold">{lunar.day}/{lunar.month}/{lunar.year}</p>
                <p className="text-sm opacity-90">{lunar.isLeapMonth ? 'Tháng nhuận' : 'Tháng đủ'}</p>
              </div>
            </div>
          </div>
          
          {/* Traditional Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-neutral-50 p-4 rounded-lg">
              <h4 className="font-semibold text-primary mb-2">Can Chi</h4>
              <p className="text-lg">{canChi}</p>
            </div>
            <div className="bg-neutral-50 p-4 rounded-lg">
              <h4 className="font-semibold text-primary mb-2">Trực</h4>
              <p className="text-lg">{truc}</p>
            </div>
            <div className="bg-neutral-50 p-4 rounded-lg">
              <h4 className="font-semibold text-primary mb-2">Tiết Khí</h4>
              <p className="text-lg">{tietKhi}</p>
            </div>
          </div>
          
          {/* Hours Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-700 mb-3 flex items-center">
                <i className="fas fa-sun mr-2"></i>
                Giờ Hoàng Đạo (Tốt)
              </h4>
              <div className="space-y-2">
                {hoangDao.map((hour, index) => (
                  <div key={index} className="flex justify-between items-center p-2 bg-white rounded">
                    <span className="font-medium">{hour.chi}</span>
                    <span className="text-sm text-neutral-600">{hour.time}</span>
                  </div>
                ))}
              </div>
              <p className="text-sm text-green-600 mt-3">
                <i className="fas fa-info-circle mr-1"></i>
                Thích hợp: khởi công, khai trương, cưới hỏi, xuất hành
              </p>
            </div>
            
            <div className="bg-red-50 p-4 rounded-lg">
              <h4 className="font-semibold text-red-700 mb-3 flex items-center">
                <i className="fas fa-moon mr-2"></i>
                Giờ Hắc Đạo (Xấu)
              </h4>
              <div className="space-y-2">
                {hacDao.map((hour, index) => (
                  <div key={index} className="flex justify-between items-center p-2 bg-white rounded">
                    <span className="font-medium">{hour.chi}</span>
                    <span className="text-sm text-neutral-600">{hour.time}</span>
                  </div>
                ))}
              </div>
              <p className="text-sm text-red-600 mt-3">
                <i className="fas fa-exclamation-triangle mr-1"></i>
                Nên tránh: việc quan trọng, ký kết hợp đồng
              </p>
            </div>
          </div>

          {/* Events */}
          {dayEvents.length > 0 && (
            <div className="bg-accent bg-opacity-10 p-4 rounded-lg">
              <h4 className="font-semibold text-accent mb-3 flex items-center">
                <i className="fas fa-star mr-2"></i>
                Sự Kiện & Ngày Lễ
              </h4>
              <div className="space-y-2">
                {dayEvents.map((event, index) => (
                  <div key={index} className="bg-white p-3 rounded border-l-4 border-accent">
                    <h5 className="font-medium text-accent">{event.title}</h5>
                    <p className="text-sm text-neutral-600 mt-1">{event.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
