'use client';

import { EVENTS, EVENT_TYPE_COLORS, EVENT_TYPE_ICONS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { useMemo } from 'react';

export function EventsList() {
  const upcomingEvents = useMemo(() => {
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();
    
    return EVENTS.filter(event => {
      const [month, day] = event.date.split('-').map(Number);
      const eventDate = new Date(currentYear, month - 1, day);
      const now = new Date();
      const nextMonth = new Date();
      nextMonth.setMonth(nextMonth.getMonth() + 1);
      
      return eventDate >= now && eventDate <= nextMonth;
    }).sort((a, b) => {
      const [monthA, dayA] = a.date.split('-').map(Number);
      const [monthB, dayB] = b.date.split('-').map(Number);
      const dateA = new Date(currentYear, monthA - 1, dayA);
      const dateB = new Date(currentYear, monthB - 1, dayB);
      return dateA.getTime() - dateB.getTime();
    });
  }, []);

  if (upcomingEvents.length === 0) {
    return (
      <section className="mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-primary mb-6 flex items-center">
            <i className="fas fa-star mr-2"></i>
            Sự Kiện & Ngày Lễ Sắp Tới
          </h2>
          <div className="text-center py-8 text-neutral-500">
            <i className="fas fa-calendar-times text-4xl mb-4"></i>
            <p>Không có sự kiện nào trong thời gian tới</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="mb-8">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-primary mb-6 flex items-center">
          <i className="fas fa-star mr-2"></i>
          Sự Kiện & Ngày Lễ Sắp Tới
        </h2>
        <div className="space-y-4">
          {upcomingEvents.map((event, index) => {
            const [month, day] = event.date.split('-').map(Number);
            const eventDate = new Date(new Date().getFullYear(), month - 1, day);
            const isToday = eventDate.toDateString() === new Date().toDateString();
            const daysUntil = Math.ceil((eventDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
            
            return (
              <div key={index} className="bg-white border border-neutral-200 rounded-lg p-4 hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className={cn(
                      "w-12 h-12 rounded-lg flex items-center justify-center",
                      EVENT_TYPE_COLORS[event.type]
                    )}>
                      <i className={cn(EVENT_TYPE_ICONS[event.type], "text-lg")}></i>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-neutral-900 truncate">
                        {event.title}
                      </h3>
                      <span className="text-sm font-medium text-primary bg-primary bg-opacity-10 px-2 py-1 rounded">
                        {day}/{month}
                      </span>
                    </div>
                    <p className="text-neutral-600 text-sm mt-1">{event.desc}</p>
                    <div className="flex items-center mt-2 text-xs text-neutral-500">
                      <i className="fas fa-clock mr-1"></i>
                      {isToday ? (
                        <span className="text-primary font-medium">Hôm nay</span>
                      ) : daysUntil === 1 ? (
                        <span className="text-accent font-medium">Ngày mai</span>
                      ) : (
                        <span>Còn {daysUntil} ngày</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
