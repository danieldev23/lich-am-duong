'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { EVENTS, HOLIDAYS } from '@/lib/constants';

const EVENT_TYPE_STYLES = {
  holiday: {
    gradient: 'bg-gradient-to-br from-red-50 to-red-100',
    text: 'text-red-700',
    border: 'border-red-200',
    pattern: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ef4444' fill-opacity='0.1'%3E%3Cpath d='M10 1l2 4h4l-3 3 1 4-4-2-4 2 1-4-3-3h4l2-4z'/%3E%3C/g%3E%3C/svg%3E")`,
  },
  history: {
    gradient: 'bg-gradient-to-br from-blue-50 to-blue-100',
    text: 'text-blue-700',
    border: 'border-blue-200',
    pattern: `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%233b82f6' fill-opacity='0.1'%3E%3Cpath d='M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z'/%3E%3Cpath d='M12 6v6l4 2-1 1.7-5-3V6h2z'/%3E%3C/g%3E%3C/svg%3E")`,
  },
  culture: {
    gradient: 'bg-gradient-to-br from-purple-50 to-purple-100',
    text: 'text-purple-700',
    border: 'border-purple-200',
    pattern: `url("data:image/svg+xml,%3Csvg width='22' height='22' viewBox='0 0 22 22' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%238b5cf6' fill-opacity='0.1'%3E%3Cpath d='M11 2c-5 0-9 4-9 9s4 9 9 9 9-4 9-9-4-9-9-9zm0 16c-3.9 0-7-3.1-7-7s3.1-7 7-7 7 3.1 7 7-3.1 7-7 7z'/%3E%3Ccircle cx='11' cy='11' r='3'/%3E%3C/g%3E%3C/svg%3E")`,
  }
};

const EVENT_TYPE_ICONS = {
  holiday: 'fas fa-gift',
  history: 'fas fa-landmark',
  culture: 'fas fa-theater-masks'
};

export function MonthlyHolidays() {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [monthlyEvents, setMonthlyEvents] = useState<any[]>([]);

  useEffect(() => {
    const getEventsByMonth = (month: number, year: number) => {
      const events: any[] = [];

      // Thêm holidays
      HOLIDAYS.forEach(holiday => {
        const [eventMonth, day] = holiday.date.split('-').map(Number);
        if (eventMonth === month) {
          events.push({
            ...holiday,
            date: new Date(year, month - 1, day),
            type: 'holiday' as const,
            title: holiday.name,
            description: `Ngày lễ ${holiday.name}`
          });
        }
      });

      // Thêm events
      EVENTS.forEach(event => {
        const [eventMonth, day] = event.date.split('-').map(Number);
        if (eventMonth === month) {
          events.push({
            ...event,
            date: new Date(year, month - 1, day)
          });
        }
      });

      // Loại bỏ duplicate dựa trên title + date
      const uniqueEvents = events.filter((event, index, self) =>
        index === self.findIndex(e =>
          e.title === event.title &&
          e.date.getTime() === event.date.getTime()
        )
      );

      return uniqueEvents.sort((a, b) => a.date.getTime() - b.date.getTime());
    };

    setMonthlyEvents(getEventsByMonth(currentMonth, currentYear));
  }, [currentMonth, currentYear]);

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
    <div className="relative bg-white rounded-xl shadow-lg p-6 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='50' height='50' viewBox='0 0 50 50' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23f59e0b' fill-opacity='0.1'%3E%3Cpath d='M25 5l5 10h10l-8 6 3 10-10-7-10 7 3-10-8-6h10l5-10z'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-emerald-700 mb-4 sm:mb-0 flex items-center">
            <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center mr-3">
              <i className="fas fa-star text-emerald-600"></i>
            </div>
            Sự Kiện Trong {getMonthName(currentMonth)} {currentYear}
          </h2>

          <div className="flex items-center space-x-3">
            <button
              onClick={goToPreviousMonth}
              className="p-3 rounded-xl hover:bg-gradient-to-r hover:from-emerald-50 hover:to-emerald-100 transition-all duration-300 text-gray-700 hover:text-emerald-700 hover:shadow-md"
            >
              <i className="fas fa-chevron-left"></i>
            </button>

            <div className="px-4 py-2 bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-xl border border-emerald-200 shadow-sm">
              <span className="text-emerald-700 font-medium">
                {getMonthName(currentMonth)} {currentYear}
              </span>
            </div>

            <button
              onClick={goToNextMonth}
              className="p-3 rounded-xl hover:bg-gradient-to-r hover:from-emerald-50 hover:to-emerald-100 transition-all duration-300 text-gray-700 hover:text-emerald-700 hover:shadow-md"
            >
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>

        {/* Events List */}
        {monthlyEvents.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-calendar-times text-2xl text-gray-400"></i>
            </div>
            <p className="text-gray-500 font-medium">Không có sự kiện nào trong tháng này</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {monthlyEvents.map((event, index) => {
              const eventStyle = EVENT_TYPE_STYLES[event.type as keyof typeof EVENT_TYPE_STYLES] || {
                gradient: 'bg-gradient-to-br from-gray-50 to-gray-100',
                text: 'text-gray-700',
                border: 'border-gray-200',
                pattern: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%236b7280' fill-opacity='0.1'%3E%3Ccircle cx='10' cy='10' r='3'/%3E%3C/g%3E%3C/svg%3E")`
              };

              return (
                <div key={index} className={cn(
                  "relative border-2 rounded-xl p-5 hover:shadow-lg transition-all duration-300 overflow-hidden group",
                  eventStyle.gradient,
                  eventStyle.border
                )}>
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-30">
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage: eventStyle.pattern,
                      }}
                    />
                  </div>

                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-white/80 backdrop-blur-sm rounded-xl flex items-center justify-center mr-3 shadow-sm">
                          <i className={cn(
                            EVENT_TYPE_ICONS[event.type as keyof typeof EVENT_TYPE_ICONS] || 'fas fa-calendar',
                            "text-xl",
                            eventStyle.text
                          )}></i>
                        </div>
                        <div>
                          <div className={cn("text-2xl font-bold", eventStyle.text)}>
                            {event.date.getDate()}
                          </div>
                          <div className={cn("text-xs opacity-75", eventStyle.text)}>
                            {getMonthName(currentMonth)}
                          </div>
                        </div>
                      </div>

                      <span className="text-xs font-medium px-3 py-1.5 bg-white/80 backdrop-blur-sm rounded-full shadow-sm">
                        {getEventTypeLabel(event.type)}
                      </span>
                    </div>

                    <h3 className={cn("font-bold text-lg mb-3 leading-tight group-hover:text-primary transition-colors", eventStyle.text)}>
                      {event.title}
                    </h3>

                    {(event.description || event.desc) && (
                      <p className={cn("text-sm opacity-90 leading-relaxed", eventStyle.text)}>
                        {event.description || event.desc}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Quick Navigation */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex flex-wrap gap-2 justify-center">
            {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
              <button
                key={month}
                onClick={() => setCurrentMonth(month)}
                className={cn(
                  "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300",
                  month === currentMonth
                    ? "bg-gradient-to-r from-primary to-primary-light text-white shadow-lg"
                    : "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-600 hover:from-emerald-50 hover:to-emerald-100 hover:text-emerald-700 hover:shadow-md"
                )}
              >
                T{month}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
