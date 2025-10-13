'use client';

import { useState } from 'react';

// Mock functions and constants (replace with actual imports)
const convertSolar2Lunar = (day, month, year) => ({
  day: Math.floor(Math.random() * 30) + 1,
  month: Math.floor(Math.random() * 12) + 1,
  year: year - 76
});

const EVENTS = [
  { date: '1-1', title: 'Tết Dương Lịch', desc: 'Ngày đầu năm mới', type: 'holiday' },
  { date: '2-14', title: 'Valentine', desc: 'Ngày lễ tình yêu', type: 'culture' },
  { date: '3-8', title: 'Quốc tế Phụ nữ', desc: 'Ngày Quốc tế Phụ nữ', type: 'holiday' },
  { date: '4-30', title: 'Ngày Giải phóng miền Nam', desc: 'Ngày thống nhất đất nước', type: 'history' },
  { date: '5-1', title: 'Quốc tế Lao động', desc: 'Ngày Quốc tế Lao động', type: 'holiday' },
  { date: '6-1', title: 'Quốc tế Thiếu nhi', desc: 'Ngày Quốc tế Thiếu nhi', type: 'culture' },
  { date: '9-2', title: 'Quốc khánh', desc: 'Ngày Quốc khánh Việt Nam', type: 'holiday' },
  { date: '10-20', title: 'Ngày Phụ nữ Việt Nam', desc: 'Ngày Phụ nữ Việt Nam', type: 'culture' },
  { date: '11-20', title: 'Ngày Nhà giáo Việt Nam', desc: 'Ngày Nhà giáo Việt Nam', type: 'culture' },
  { date: '12-25', title: 'Giáng sinh', desc: 'Lễ Giáng sinh', type: 'holiday' }
];

const HOLIDAYS = [
  { date: '1-1' },
  { date: '4-30' },
  { date: '5-1' },
  { date: '9-2' },
  { date: '12-25' }
];

const getDateString = (date) => {
  return `${date.getMonth() + 1}-${date.getDate()}`;
};

const isToday = (date) => {
  const today = new Date();
  return date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();
};

const cn = (...classes) => classes.filter(Boolean).join(' ');

const Header = () => (
  <header className="bg-white shadow-md">
    <div className="container mx-auto px-4 py-4">
      <h1 className="text-2xl font-bold text-emerald-700">Lịch Việt Nam</h1>
    </div>
  </header>
);

// Mini Calendar Component
function MiniCalendar({ year, month, onDateClick }) {
  const monthNames = [
    'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
    'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
  ];

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDate = new Date(firstDay);
  startDate.setDate(startDate.getDate() - firstDay.getDay());

  const days = [];
  for (let i = 0; i < 42; i++) {
    const cellDate = new Date(startDate);
    cellDate.setDate(startDate.getDate() + i);
    days.push(cellDate);
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-3">
      <h3 className="text-sm font-semibold text-emerald-700 mb-2 text-center">
        {monthNames[month]}
      </h3>
      
      {/* Days header */}
      <div className="grid grid-cols-7 gap-1 mb-1">
        {['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'].map((day) => (
          <div key={day} className="text-xs text-center font-medium text-gray-500 p-1">
            {day}
          </div>
        ))}
      </div>
      
      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((date, index) => {
          const isCurrentMonth = date.getMonth() === month;
          const todayCheck = isToday(date);
          const isWeekend = date.getDay() === 0;
          const dateStr = getDateString(date);
          const hasEvent = EVENTS.some(event => event.date === dateStr);
          const hasHoliday = HOLIDAYS.some(h => h.date === dateStr);

          return (
            <button
              key={index}
              onClick={() => onDateClick(date)}
              className={cn(
                "text-xs p-1 rounded hover:bg-gray-100 transition-colors relative",
                !isCurrentMonth && "text-gray-300",
                isCurrentMonth && !todayCheck && !isWeekend && "text-gray-700",
                isCurrentMonth && isWeekend && "text-red-500",
                todayCheck && "bg-emerald-700 text-white font-semibold hover:bg-emerald-800"
              )}
            >
              {date.getDate()}
              {hasEvent && (
                <div className={cn(
                  "absolute bottom-0 right-0 w-1 h-1 rounded-full",
                  hasHoliday ? "bg-red-500" : "bg-blue-500"
                )} />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// Main Component
export default function YearlyPage() {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const yearlyEvents = EVENTS.filter(event => {
    const [month, day] = event.date.split('-').map(Number);
    const eventDate = new Date(selectedYear, month - 1, day);
    return eventDate.getFullYear() === selectedYear;
  }).sort((a, b) => {
    const [monthA, dayA] = a.date.split('-').map(Number);
    const [monthB, dayB] = b.date.split('-').map(Number);
    return monthA - monthB || dayA - dayB;
  });

  return (
    <div className="min-h-screen bg-beige">
      <Header />
      
      <main className="w-full">
        <div className="container mx-auto px-4 py-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-emerald-700 mb-2">Lịch Năm {selectedYear}</h1>
              <p className="text-gray-600">Tổng quan lịch cả năm với các sự kiện quan trọng</p>
            </div>
            
            <div className="flex items-center space-x-4 mt-4 sm:mt-0">
              <button
                onClick={() => setSelectedYear(selectedYear - 1)}
                className="p-2 rounded-lg hover:bg-white hover:shadow-md transition-all"
              >
                ←
              </button>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-700 focus:border-transparent"
              >
                {Array.from({ length: 21 }, (_, i) => selectedYear - 10 + i).map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
              <button
                onClick={() => setSelectedYear(selectedYear + 1)}
                className="p-2 rounded-lg hover:bg-white hover:shadow-md transition-all"
              >
                →
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Calendar Grid */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {Array.from({ length: 12 }, (_, month) => (
                  <MiniCalendar
                    key={month}
                    year={selectedYear}
                    month={month}
                    onDateClick={handleDateClick}
                  />
                ))}
              </div>
            </div>

            {/* Sidebar Info */}
            <div className="space-y-6">
              {/* Selected Date Info */}
              {selectedDate && (
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-bold text-emerald-700 mb-4">
                    Thông Tin Ngày
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600">Dương lịch</p>
                      <p className="font-semibold">
                        {selectedDate.getDate()}/{selectedDate.getMonth() + 1}/{selectedDate.getFullYear()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Âm lịch</p>
                      <p className="font-semibold">
                        {(() => {
                          const lunar = convertSolar2Lunar(
                            selectedDate.getDate(),
                            selectedDate.getMonth() + 1,
                            selectedDate.getFullYear()
                          );
                          return `${lunar.day}/${lunar.month}/${lunar.year}`;
                        })()}
                      </p>
                    </div>
                    
                    {/* Events on selected date */}
                    {(() => {
                      const dateStr = getDateString(selectedDate);
                      const dayEvents = EVENTS.filter(event => event.date === dateStr);
                      
                      if (dayEvents.length > 0) {
                        return (
                          <div>
                            <p className="text-sm text-gray-600 mb-2">Sự kiện</p>
                            <div className="space-y-1">
                              {dayEvents.map((event, index) => (
                                <div key={index} className="text-sm bg-blue-50 p-2 rounded">
                                  <p className="font-medium text-blue-700">{event.title}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      }
                      return null;
                    })()}
                  </div>
                </div>
              )}

              {/* Year Statistics */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-emerald-700 mb-4">
                  Thống Kê Năm {selectedYear}
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Tổng sự kiện</span>
                    <span className="font-semibold">{yearlyEvents.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Ngày lễ</span>
                    <span className="font-semibold text-red-600">
                      {yearlyEvents.filter(e => e.type === 'holiday').length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Sự kiện lịch sử</span>
                    <span className="font-semibold text-blue-600">
                      {yearlyEvents.filter(e => e.type === 'history').length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Văn hóa</span>
                    <span className="font-semibold text-pink-600">
                      {yearlyEvents.filter(e => e.type === 'culture').length}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-emerald-700 mb-4">
                  Thao Tác Nhanh
                </h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedYear(new Date().getFullYear())}
                    className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded transition-colors"
                  >
                    🏠 Về năm hiện tại
                  </button>
                  <button
                    onClick={() => setSelectedDate(new Date())}
                    className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded transition-colors"
                  >
                    📅 Chọn ngày hôm nay
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Events List - Moved outside the grid */}
          {yearlyEvents.length > 0 && (
            <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-emerald-700 mb-6">
                Sự Kiện Trong Năm {selectedYear}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {yearlyEvents.map((event, index) => {
                  const [month, day] = event.date.split('-').map(Number);
                  const isHoliday = HOLIDAYS.some(h => h.date === event.date);
                  
                  return (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-emerald-700 bg-emerald-50 px-2 py-1 rounded">
                          {day}/{month}
                        </span>
                        {isHoliday && (
                          <span className="text-red-500">⭐</span>
                        )}
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-1 text-sm">
                        {event.title}
                      </h4>
                      <p className="text-xs text-gray-600">
                        {event.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}