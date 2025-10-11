'use client';

import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { convertSolar2Lunar } from '@/lib/lunar-calendar';
import { EVENTS, HOLIDAYS } from '@/lib/constants';
import { getDateString, isToday } from '@/lib/utils';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface MiniCalendarProps {
  year: number;
  month: number;
  onDateClick: (date: Date) => void;
}

function MiniCalendar({ year, month, onDateClick }: MiniCalendarProps) {
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
      <h3 className="text-sm font-semibold text-primary mb-2 text-center">
        {monthNames[month]}
      </h3>
      
      {/* Days header */}
      <div className="grid grid-cols-7 gap-1 mb-1">
        {['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'].map((day) => (
          <div key={day} className="text-xs text-center font-medium text-neutral-500 p-1">
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
                "text-xs p-1 rounded hover:bg-neutral-100 transition-colors relative",
                !isCurrentMonth && "text-neutral-300",
                isCurrentMonth && !todayCheck && !isWeekend && "text-neutral-700",
                isCurrentMonth && isWeekend && "text-red-500",
                todayCheck && "bg-primary text-white font-semibold"
              )}
            >
              {date.getDate()}
              {hasEvent && (
                <div className={cn(
                  "absolute bottom-0 right-0 w-1 h-1 rounded-full",
                  hasHoliday ? "bg-red-500" : "bg-accent"
                )} />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function YearlyPage() {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateClick = (date: Date) => {
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
    <div className="min-h-screen bg-neutral-50">
      <Header />
      
      <div className="flex min-h-screen">
        <Sidebar />
        
        <main className="flex-1 lg:ml-64">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold text-primary mb-2">Lịch Năm {selectedYear}</h1>
                <p className="text-neutral-600">Tổng quan lịch cả năm với các sự kiện quan trọng</p>
              </div>
              
              <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                <button
                  onClick={() => setSelectedYear(selectedYear - 1)}
                  className="p-2 rounded-lg hover:bg-white hover:shadow-md transition-all"
                >
                  <i className="fas fa-chevron-left"></i>
                </button>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                  className="px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  {Array.from({ length: 21 }, (_, i) => selectedYear - 10 + i).map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
                <button
                  onClick={() => setSelectedYear(selectedYear + 1)}
                  className="p-2 rounded-lg hover:bg-white hover:shadow-md transition-all"
                >
                  <i className="fas fa-chevron-right"></i>
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
                    <h3 className="text-lg font-bold text-primary mb-4">
                      Thông Tin Ngày
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-neutral-600">Dương lịch</p>
                        <p className="font-semibold">
                          {selectedDate.getDate()}/{selectedDate.getMonth() + 1}/{selectedDate.getFullYear()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-neutral-600">Âm lịch</p>
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
                              <p className="text-sm text-neutral-600 mb-2">Sự kiện</p>
                              <div className="space-y-1">
                                {dayEvents.map((event, index) => (
                                  <div key={index} className="text-sm bg-accent bg-opacity-10 p-2 rounded">
                                    <p className="font-medium text-accent">{event.title}</p>
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
                  <h3 className="text-lg font-bold text-primary mb-4">
                    Thống Kê Năm {selectedYear}
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-neutral-600">Tổng sự kiện</span>
                      <span className="font-semibold">{yearlyEvents.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-neutral-600">Ngày lễ</span>
                      <span className="font-semibold text-red-600">
                        {yearlyEvents.filter(e => e.type === 'holiday').length}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-neutral-600">Sự kiện lịch sử</span>
                      <span className="font-semibold text-blue-600">
                        {yearlyEvents.filter(e => e.type === 'history').length}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-neutral-600">Văn hóa</span>
                      <span className="font-semibold text-pink-600">
                        {yearlyEvents.filter(e => e.type === 'culture').length}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-bold text-primary mb-4">
                    Thao Tác Nhanh
                  </h3>
                  <div className="space-y-2">
                    <button
                      onClick={() => setSelectedYear(new Date().getFullYear())}
                      className="w-full text-left px-3 py-2 text-sm hover:bg-neutral-100 rounded transition-colors"
                    >
                      <i className="fas fa-home mr-2 text-accent"></i>
                      Về năm hiện tại
                    </button>
                    <button
                      onClick={() => setSelectedDate(new Date())}
                      className="w-full text-left px-3 py-2 text-sm hover:bg-neutral-100 rounded transition-colors"
                    >
                      <i className="fas fa-calendar-day mr-2 text-accent"></i>
                      Chọn ngày hôm nay
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Events List */}
            {yearlyEvents.length > 0 && (
              <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-primary mb-6">
                  Sự Kiện Trong Năm {selectedYear}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {yearlyEvents.map((event, index) => {
                    const [month, day] = event.date.split('-').map(Number);
                    const isHoliday = HOLIDAYS.some(h => h.date === event.date);
                    
                    return (
                      <div key={index} className="border border-neutral-200 rounded-lg p-4 hover:shadow-md transition-all">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-primary bg-primary bg-opacity-10 px-2 py-1 rounded">
                            {day}/{month}
                          </span>
                          {isHoliday && (
                            <i className="fas fa-star text-red-500"></i>
                          )}
                        </div>
                        <h4 className="font-semibold text-neutral-900 mb-1 text-sm">
                          {event.title}
                        </h4>
                        <p className="text-xs text-neutral-600">
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
    </div>
  );
}
