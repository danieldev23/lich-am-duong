'use client';

import { useCalendarStore } from '@/lib/store';
import { convertSolar2Lunar, getMonthName } from '@/lib/lunar-calendar';
import { EVENTS, HOLIDAYS } from '@/lib/constants';
import { getCalendarDays, isToday, isSameMonth, getDateString } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface CalendarCellProps {
  date: Date;
  isCurrentMonth: boolean;
  onClick: () => void;
}

function CalendarCell({ date, isCurrentMonth, onClick }: CalendarCellProps) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const isWeekend = date.getDay() === 0;
  const todayCheck = isToday(date);
  
  const lunar = convertSolar2Lunar(day, month, year);
  const dateStr = getDateString(date);
  const dayEvents = EVENTS.filter(event => event.date === dateStr);
  const hasHoliday = HOLIDAYS.some(h => h.date === dateStr);
  
  return (
    <div 
      className={cn(
        "relative p-2 sm:p-3 border border-gray-200 rounded-xl cursor-pointer transition-all duration-300 min-h-[60px] sm:min-h-[80px] overflow-hidden group",
        !isCurrentMonth && "opacity-30",
        isCurrentMonth && !todayCheck && !isWeekend && "hover:bg-gradient-to-br hover:from-emerald-50 hover:to-emerald-100 hover:shadow-lg hover:scale-105",
        isCurrentMonth && isWeekend && "text-red-500 hover:bg-gradient-to-br hover:from-red-50 hover:to-red-100",
        todayCheck && "bg-gradient-to-br from-primary to-primary-light text-white ring-2 ring-emerald-500 shadow-xl"
      )}
      onClick={onClick}
    >
      {/* Background Pattern for Today */}
      {todayCheck && (
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Ccircle cx='10' cy='10' r='2'/%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>
      )}
      
      {/* Background Pattern for Events */}
      {dayEvents.length > 0 && !todayCheck && (
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: hasHoliday 
                ? `url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ef4444' fill-opacity='0.3'%3E%3Cpath d='M8 1l2 4h4l-3 3 1 4-4-2-4 2 1-4-3-3h4l2-4z'/%3E%3C/g%3E%3C/svg%3E")`
                : `url("data:image/svg+xml,%3Csvg width='18' height='18' viewBox='0 0 18 18' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23f97316' fill-opacity='0.3'%3E%3Ccircle cx='9' cy='9' r='2'/%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>
      )}
      
      <div className="relative z-10 text-center">
        <div className={cn(
          "text-lg sm:text-xl font-bold mb-1",
          todayCheck && "text-white",
          !todayCheck && isWeekend && "text-red-600",
          !todayCheck && !isWeekend && "text-gray-800"
        )}>
          {day}
        </div>
        
        <div className={cn(
          "text-xs mb-1",
          todayCheck ? "text-white/90" : "text-gray-500"
        )}>
          {lunar.day}/{lunar.month}
        </div>
        
        {dayEvents.length > 0 && (
          <div className="flex justify-center space-x-1">
            <div className={cn(
              "w-2 h-2 rounded-full",
              hasHoliday ? "bg-red-500" : "bg-orange-500",
              todayCheck && "bg-white"
            )} />
            {dayEvents.length > 1 && (
              <div className={cn(
                "w-1.5 h-1.5 rounded-full",
                hasHoliday ? "bg-red-400" : "bg-orange-400",
                todayCheck && "bg-white/80"
              )} />
            )}
          </div>
        )}
      </div>
      
      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-transparent group-hover:from-white/10 group-hover:to-white/5 transition-all duration-300 rounded-xl" />
    </div>
  );
}

export function MonthlyCalendar() {
  const { 
    displayDate, 
    goToPreviousMonth, 
    goToNextMonth, 
    goToToday,
    openModal,
    setSelectedDate 
  } = useCalendarStore();
  
  const year = displayDate.getFullYear();
  const month = displayDate.getMonth();
  const calendarDays = getCalendarDays(displayDate);

  const handleCellClick = (date: Date) => {
    setSelectedDate(date);
    // Open modal with day details - we'll implement this later
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    
    openModal({
      type: 'dayDetails',
      date: { day, month, year }
    });
  };

  return (
    <section className="mb-8">
      <div className="relative bg-white rounded-xl shadow-lg p-6 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%2310b981' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-8-6-14-14-14s-14 6-14 14 6 14 14 14 14-6 14-14zm14-14c0-8-6-14-14-14s-14 6-14 14 6 14 14 14 14-6 14-14z'/%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="relative z-10">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-emerald-700 mb-4 sm:mb-0 flex items-center">
              <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center mr-3">
                <i className="fas fa-calendar text-emerald-600"></i>
              </div>
              {getMonthName(month)} {year}
            </h2>
            <div className="flex items-center space-x-3">
              <button 
                onClick={goToPreviousMonth}
                className="p-3 rounded-xl hover:bg-gradient-to-r hover:from-emerald-50 hover:to-emerald-100 transition-all duration-300 text-gray-700 hover:text-emerald-700 hover:shadow-md"
              >
                <i className="fas fa-chevron-left"></i>
              </button>
              <button 
                onClick={goToToday}
                className="px-6 py-3 bg-gradient-to-r from-primary to-primary-light text-white rounded-xl hover:shadow-lg transition-all duration-300 font-medium"
              >
                Hôm nay
              </button>
              <button 
                onClick={goToNextMonth}
                className="p-3 rounded-xl hover:bg-gradient-to-r hover:from-emerald-50 hover:to-emerald-100 transition-all duration-300 text-gray-700 hover:text-emerald-700 hover:shadow-md"
              >
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          </div>

          {/* Calendar Header */}
          <div className="grid grid-cols-7 gap-2 mb-4">
            {[
              { day: 'CN', color: 'text-red-500' },
              { day: 'T2', color: 'text-gray-700' },
              { day: 'T3', color: 'text-gray-700' },
              { day: 'T4', color: 'text-gray-700' },
              { day: 'T5', color: 'text-gray-700' },
              { day: 'T6', color: 'text-gray-700' },
              { day: 'T7', color: 'text-gray-700' }
            ].map((item, index) => (
              <div key={index} className={cn(
                "p-3 text-center font-bold text-sm rounded-lg bg-gradient-to-br from-gray-50 to-gray-100",
                item.color
              )}>
                {item.day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2">
            {calendarDays.map((date, index) => (
              <CalendarCell
                key={index}
                date={date}
                isCurrentMonth={isSameMonth(date, displayDate)}
                onClick={() => handleCellClick(date)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
