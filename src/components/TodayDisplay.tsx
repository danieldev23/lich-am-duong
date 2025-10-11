'use client';

import { useState, useEffect } from 'react';
import { convertSolar2Lunar, getCanChi, getTietKhi, getTruc, getGioHoangDao } from '@/lib/lunar-calendar';
import { EVENTS, HOLIDAYS } from '@/lib/constants';

export function TodayDisplay() {
  const [currentDate, setCurrentDate] = useState<Date | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setCurrentDate(new Date());
    
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!mounted || !currentDate) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 h-fit">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-6"></div>
          <div className="h-16 bg-gray-200 rounded mb-4"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();
  const dayOfWeek = currentDate.getDay();

  const lunar = convertSolar2Lunar(day, month, year);
  const canChi = getCanChi(day, month, year);
  const tietKhi = getTietKhi(day, month, year);
  const truc = getTruc(day, month, year);
  const { hoangDao, hacDao } = getGioHoangDao(day, month, year);

  const getDayName = (dayIndex: number) => {
    const days = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'];
    return days[dayIndex];
  };

  const getDateString = (date: Date) => {
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${month}-${day}`;
  };

  const dateStr = getDateString(currentDate);
  const todayEvents = EVENTS.filter(event => event.date === dateStr);
  const todayHolidays = HOLIDAYS.filter(h => h.date === dateStr);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 h-fit">
      <h2 className="text-2xl font-bold text-primary mb-6 text-center">
        <i className="fas fa-calendar-day mr-2"></i>
        Hôm Nay
      </h2>

      {/* Ngày dương lịch */}
      <div className="text-center mb-6">
        <div className="text-5xl font-bold text-primary mb-2">
          {day}
        </div>
        <div className="text-xl text-neutral-700 mb-1">
          Tháng {month}, {year}
        </div>
        <div className="text-lg text-neutral-600">
          {getDayName(dayOfWeek)}
        </div>
      </div>

      {/* Ngày âm lịch */}
      <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-lg p-4 mb-6">
        <h3 className="text-lg font-semibold text-red-700 mb-2 text-center">
          <i className="fas fa-moon mr-2"></i>
          Âm Lịch
        </h3>
        <div className="text-center">
          <div className="text-2xl font-bold text-red-600 mb-1">
            {lunar.day}/{lunar.month}
          </div>
          <div className="text-sm text-red-600">
            Năm {lunar.year}
          </div>
        </div>
      </div>

      {/* Thông tin bổ sung */}
      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
          <span className="text-sm font-medium text-blue-700">Can Chi</span>
          <span className="text-sm text-blue-600">{canChi}</span>
        </div>

        {tietKhi && (
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <span className="text-sm font-medium text-green-700">Tiết Khí</span>
            <span className="text-sm text-green-600">{tietKhi}</span>
          </div>
        )}

        <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
          <span className="text-sm font-medium text-purple-700">Trực</span>
          <span className="text-sm text-purple-600">{truc}</span>
        </div>

        {/* Giờ hoàng đạo */}
        <div className="p-3 bg-yellow-50 rounded-lg">
          <div className="text-sm font-medium text-yellow-700 mb-2">Giờ Hoàng Đạo</div>
          <div className="text-xs text-yellow-600 space-y-1">
            {hoangDao.map((gio, index) => (
              <div key={index} className="inline-block bg-yellow-200 px-2 py-1 rounded mr-1 mb-1">
                {gio.chi} ({gio.time})
              </div>
            ))}
          </div>
        </div>

        {/* Sự kiện hôm nay */}
        {(todayEvents.length > 0 || todayHolidays.length > 0) && (
          <div className="p-3 bg-red-50 rounded-lg">
            <div className="text-sm font-medium text-red-700 mb-2">
              <i className="fas fa-star mr-1"></i>
              Sự Kiện Hôm Nay
            </div>
            <div className="space-y-1">
              {todayHolidays.map((holiday, index) => (
                <div key={index} className="text-xs text-red-600 font-medium">
                  🎉 {holiday.name}
                </div>
              ))}
              {todayEvents.map((event, index) => (
                <div key={index} className="text-xs text-red-600">
                  📅 {event.title}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Thời gian thực */}
      <div className="mt-6 text-center">
        <div className="text-2xl font-mono font-bold text-primary">
          {currentDate.toLocaleTimeString('vi-VN')}
        </div>
        <div className="text-sm text-neutral-500 mt-1">
          Cập nhật theo thời gian thực
        </div>
      </div>
    </div>
  );
}
