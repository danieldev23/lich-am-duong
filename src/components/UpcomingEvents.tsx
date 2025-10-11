'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useEvents } from '@/hooks/useEvents';

const EVENT_TYPE_COLORS = {
  holiday: 'bg-red-100 text-red-800',
  history: 'bg-blue-100 text-blue-800', 
  culture: 'bg-pink-100 text-pink-800'
};

const EVENT_TYPE_ICONS = {
  holiday: 'fas fa-gift',
  history: 'fas fa-landmark',
  culture: 'fas fa-theater-masks'
};

export function UpcomingEvents() {
  const [mounted, setMounted] = useState(false);
  const { getUpcomingEvents, isLoading } = useEvents();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-6"></div>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const upcomingEvents = getUpcomingEvents(30);

  const getDaysUntil = (date: Date) => {
    const today = new Date();
    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Hôm nay';
    if (diffDays === 1) return 'Ngày mai';
    return `${diffDays} ngày nữa`;
  };

  const getEventTypeLabel = (type: string) => {
    switch (type) {
      case 'holiday': return 'Ngày lễ';
      case 'history': return 'Lịch sử';
      case 'culture': return 'Văn hóa';
      default: return 'Sự kiện';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-primary mb-6">
        <i className="fas fa-calendar-alt mr-2"></i>
        Sự Kiện Sắp Tới
      </h2>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {upcomingEvents.length === 0 ? (
          <div className="text-center py-8">
            <i className="fas fa-calendar-times text-4xl text-neutral-300 mb-4"></i>
            <p className="text-neutral-500">Không có sự kiện nào sắp tới</p>
          </div>
        ) : (
          upcomingEvents.map((event, index) => (
            <div key={index} className="border border-neutral-200 rounded-lg p-4 hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className={cn(
                    "w-12 h-12 rounded-lg flex items-center justify-center",
                    EVENT_TYPE_COLORS[event.type as keyof typeof EVENT_TYPE_COLORS] || 'bg-gray-100 text-gray-800'
                  )}>
                    <i className={cn(
                      EVENT_TYPE_ICONS[event.type as keyof typeof EVENT_TYPE_ICONS] || 'fas fa-calendar',
                      "text-lg"
                    )}></i>
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-neutral-800 mb-1">
                        {event.title || event.name}
                      </h3>
                      <p className="text-sm text-neutral-600 mb-2">
                        {event.description}
                      </p>
                    </div>
                    <span className={cn(
                      "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ml-2",
                      EVENT_TYPE_COLORS[event.type as keyof typeof EVENT_TYPE_COLORS] || 'bg-gray-100 text-gray-800'
                    )}>
                      {getEventTypeLabel(event.type)}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-neutral-500">
                      <i className="fas fa-calendar mr-1"></i>
                      {event.date.toLocaleDateString('vi-VN', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                    <div className="text-sm font-medium text-primary">
                      {getDaysUntil(event.date)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Xem thêm */}
      <div className="mt-6 text-center">
        <button className="text-primary hover:text-primary-dark font-medium text-sm transition-colors">
          <i className="fas fa-arrow-right mr-1"></i>
          Xem tất cả sự kiện
        </button>
      </div>
    </div>
  );
}
