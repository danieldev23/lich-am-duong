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
  
  let cellClass = 'p-2 sm:p-3 border border-gray-200 rounded-lg cursor-pointer transition-all duration-200 min-h-[60px] sm:min-h-[80px] hover:scale-105 hover:shadow-lg';
  
  if (!isCurrentMonth) {
    cellClass += ' opacity-30';
  } else if (todayCheck) {
    cellClass += ' bg-primary text-white ring-2 ring-emerald-500 shadow-lg';
  } else if (isWeekend) {
    cellClass += ' text-red-500';
  } else {
    cellClass += ' hover:bg-emerald-50';
  }
  
  return (
    <div className={cellClass} onClick={onClick}>
      <div className="text-center">
        <div className="text-lg sm:text-xl font-semibold">{day}</div>
        <div className={cn(
          "text-xs",
          todayCheck ? "text-white" : "text-gray-600"
        )}>{lunar.day}/{lunar.month}</div>
        {dayEvents.length > 0 && (
          <div className={cn(
            "w-2 h-2 rounded-full mx-auto mt-1",
            hasHoliday ? "bg-red-500" : "bg-orange-500"
          )} />
        )}
      </div>
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
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-emerald-700 mb-4 sm:mb-0">
            {getMonthName(month)} {year}
          </h2>
          <div className="flex items-center space-x-4">
            <button 
              onClick={goToPreviousMonth}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-700"
            >
              ←
            </button>
            <button 
              onClick={goToToday}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary transition-colors"
            >
              Hôm nay
            </button>
            <button 
              onClick={goToNextMonth}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-700"
            >
              →
            </button>
          </div>
        </div>

        {/* Calendar Header */}
        <div className="grid grid-cols-7 gap-1 mb-4">
          <div className="p-3 text-center font-semibold text-red-500">CN</div>
          <div className="p-3 text-center font-semibold text-gray-700">T2</div>
          <div className="p-3 text-center font-semibold text-gray-700">T3</div>
          <div className="p-3 text-center font-semibold text-gray-700">T4</div>
          <div className="p-3 text-center font-semibold text-gray-700">T5</div>
          <div className="p-3 text-center font-semibold text-gray-700">T6</div>
          <div className="p-3 text-center font-semibold text-gray-700">T7</div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">
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
    </section>
  );
}
