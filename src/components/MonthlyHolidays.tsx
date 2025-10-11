'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useEvents } from '@/hooks/useEvents';

const EVENT_TYPE_COLORS = {
  holiday: 'bg-red-100 text-red-800 border-red-200',
  history: 'bg-blue-100 text-blue-800 border-blue-200', 
  culture: 'bg-pink-100 text-pink-800 border-pink-200'
};

const EVENT_TYPE_ICONS = {
  holiday: 'fas fa-gift',
  history: 'fas fa-landmark',
  culture: 'fas fa-theater-masks'
};

export function MonthlyHolidays() {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const { getEventsByMonth, isLoading } = useEvents();

  const monthlyEvents = getEventsByMonth(currentMonth, currentYear);

  const getMonthName = (month: number) => {
    const months = [
      'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
      'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
    ];
    return months[month - 1];
  };

  const getEventTypeLabel = (type: string) => {
    switch (type) {
      case 'holiday': return 'Ngày lễ';
      case 'history': return 'Lịch sử';
      case 'culture': return 'Văn hóa';
      default: return 'Sự kiện';
    }
  };

  const goToPreviousMonth = () => {
    if (currentMonth === 1) {
      setCurrentMonth(12);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const goToNextMonth = () => {
    if (currentMonth === 12) {
      setCurrentMonth(1);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-primary">
          <i className="fas fa-list mr-2"></i>
          Ngày Lễ Trong {getMonthName(currentMonth)} {currentYear}
        </h2>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={goToPreviousMonth}
            className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
          >
            <i className="fas fa-chevron-left text-neutral-600"></i>
          </button>
          
          <div className="px-4 py-2 bg-primary bg-opacity-10 rounded-lg">
            <span className="text-primary font-medium">
              {getMonthName(currentMonth)} {currentYear}
            </span>
          </div>
          
          <button
            onClick={goToNextMonth}
            className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
          >
            <i className="fas fa-chevron-right text-neutral-600"></i>
          </button>
        </div>
      </div>

      {/* Events List */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="animate-pulse">
              <div className="h-32 bg-gray-200 rounded-lg"></div>
            </div>
          ))}
        </div>
      ) : monthlyEvents.length === 0 ? (
        <div className="text-center py-12">
          <i className="fas fa-calendar-times text-4xl text-neutral-300 mb-4"></i>
          <p className="text-neutral-500">Không có ngày lễ nào trong tháng này</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {monthlyEvents.map((event, index) => (
            <div key={index} className={cn(
              "border-2 rounded-lg p-4 hover:shadow-md transition-all duration-300",
              EVENT_TYPE_COLORS[event.type as keyof typeof EVENT_TYPE_COLORS] || 'bg-gray-100 text-gray-800 border-gray-200'
            )}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-white bg-opacity-50 rounded-lg flex items-center justify-center mr-3">
                    <i className={cn(
                      EVENT_TYPE_ICONS[event.type as keyof typeof EVENT_TYPE_ICONS] || 'fas fa-calendar',
                      "text-lg"
                    )}></i>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">
                      {event.date.getDate()}
                    </div>
                    <div className="text-xs opacity-75">
                      {getMonthName(currentMonth)}
                    </div>
                  </div>
                </div>
                
                <span className="text-xs font-medium px-2 py-1 bg-white bg-opacity-50 rounded-full">
                  {getEventTypeLabel(event.type)}
                </span>
              </div>
              
              <h3 className="font-semibold text-lg mb-2 leading-tight">
                {event.title}
              </h3>
              
              {(event.description || event.desc) && (
                <p className="text-sm opacity-90 leading-relaxed">
                  {event.description || event.desc}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Quick Navigation */}
      <div className="mt-6 pt-6 border-t border-neutral-200">
        <div className="flex flex-wrap gap-2 justify-center">
          {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
            <button
              key={month}
              onClick={() => setCurrentMonth(month)}
              className={cn(
                "px-3 py-1 rounded-lg text-sm font-medium transition-colors",
                month === currentMonth
                  ? "bg-primary text-white"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
              )}
            >
              T{month}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
