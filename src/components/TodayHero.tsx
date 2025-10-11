'use client';

import { useCalendarStore } from '@/lib/store';
import { 
  convertSolar2Lunar, 
  getCanChi, 
  getTietKhi, 
  getTruc, 
  getGioHoangDao,
  getDayName,
  getMonthName 
} from '@/lib/lunar-calendar';
import { INSPIRATIONAL_QUOTES } from '@/lib/constants';
import { useEffect, useState } from 'react';

export function TodayHero() {
  const { displayDate, goToPreviousDay, goToNextDay } = useCalendarStore();
  const [quote, setQuote] = useState(INSPIRATIONAL_QUOTES[0]);

  useEffect(() => {
    // Randomly select a quote
    const randomQuote = INSPIRATIONAL_QUOTES[Math.floor(Math.random() * INSPIRATIONAL_QUOTES.length)];
    setQuote(randomQuote);
  }, [displayDate]);

  const day = displayDate.getDate();
  const month = displayDate.getMonth() + 1;
  const year = displayDate.getFullYear();
  const dayOfWeek = displayDate.getDay();

  const lunar = convertSolar2Lunar(day, month, year);
  const canChi = getCanChi(day, month, year);
  const tietKhi = getTietKhi(day, month, year);
  const truc = getTruc(day, month, year);
  const { hoangDao, hacDao } = getGioHoangDao(day, month, year);

  return (
    <section className="mb-8">
      <div className="relative rounded-xl shadow-lg overflow-hidden bg-gradient-to-br from-primary-600 via-primary-500 to-primary-700" style={{backgroundImage: "linear-gradient(135deg, rgba(15, 118, 110, 0.8), rgba(13, 148, 136, 0.6)), url('https://ngaydep.com/files/calendar-bg6.jpg?v=1.27')", backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <div className="relative z-10 p-8">
          {/* Navigation Controls */}
          <div className="flex justify-between items-center mb-6">
            <button 
              onClick={goToPreviousDay}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all"
            >
              <i className="fas fa-chevron-left"></i>
            </button>
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-2">
                {getMonthName(month - 1)} Năm {year}
              </h2>
            </div>
            <button 
              onClick={goToNextDay}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all"
            >
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>

          {/* Main Date Display */}
          <div className="text-center mb-8">
            <div className="text-8xl font-bold text-white mb-4">{day}</div>
            <div className="text-xl text-white opacity-90 mb-2">
              {getDayName(dayOfWeek).toUpperCase()}
            </div>
            <div className="text-white opacity-80">
              "{quote.text}"
              <div className="text-sm mt-1">- {quote.author} -</div>
            </div>
          </div>

          {/* Today Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Lunar Info */}
            <div className="text-center">
              <div className="bg-white bg-opacity-20 rounded-lg p-4">
                <div className="text-white opacity-90 text-sm mb-1">Ngày {canChi}</div>
                <div className="text-white opacity-90 text-sm mb-1">Tháng {lunar.month}</div>
                <div className="text-white opacity-90 text-sm">Năm {lunar.year}</div>
                <div className="text-2xl font-bold text-white mt-2">{lunar.day}</div>
                <div className="text-white opacity-90 text-sm">
                  THÁNG {lunar.month} {lunar.isLeapMonth ? '(NHUẬN)' : '(ĐỦ)'}
                </div>
              </div>
            </div>

            {/* Day Info */}
            <div className="text-center">
              <div className="bg-white bg-opacity-20 rounded-lg p-4">
                <div className="text-white opacity-90 text-sm mb-1">Ngày {canChi}</div>
                <div className="text-white opacity-90 text-sm mb-1">Trực {truc}</div>
                <div className="text-white opacity-90 text-sm">Tiết khí {tietKhi}</div>
                <div className="w-12 h-12 bg-white bg-opacity-30 rounded-full flex items-center justify-center mx-auto mt-3">
                  <i className="fas fa-yin-yang text-white text-xl"></i>
                </div>
              </div>
            </div>

            {/* Hours Info */}
            <div className="text-center">
              <div className="bg-white bg-opacity-20 rounded-lg p-4">
                <div className="text-white opacity-90 text-sm mb-2">Giờ Hoàng Đạo (Tốt):</div>
                <div className="text-white text-xs mb-3">
                  {hoangDao.slice(0, 3).map(h => `${h.chi} (${h.time})`).join(', ')}
                  {hoangDao.length > 3 && <br />}
                  {hoangDao.slice(3).map(h => `${h.chi} (${h.time})`).join(', ')}
                </div>
                <div className="text-white opacity-90 text-sm mb-2">Giờ Hắc Đạo (Xấu):</div>
                <div className="text-white text-xs">
                  {hacDao.slice(0, 3).map(h => `${h.chi} (${h.time})`).join(', ')}
                  {hacDao.length > 3 && <br />}
                  {hacDao.slice(3).map(h => `${h.chi} (${h.time})`).join(', ')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
