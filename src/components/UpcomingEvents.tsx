'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useEvents } from '@/hooks/useEvents';

const EVENT_TYPE_COLORS = {
  holiday: 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white',
  history: 'bg-gradient-to-r from-blue-400 to-blue-600 text-white', 
  culture: 'bg-gradient-to-r from-pink-400 to-purple-500 text-white'
};

const EVENT_TYPE_ICONS = {
  holiday: 'fas fa-star',
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
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-emerald-600 to-green-600 px-4 py-3 flex items-center justify-between">
        <h2 className="text-lg font-bold text-white flex items-center">
          <i className="fas fa-calendar-check mr-2"></i>
          SỰ KIỆN NỔI BẬT SẮP DIỄN RA
        </h2>
        <button className="text-white hover:bg-white/20 p-2 rounded transition">
          <i className="fas fa-sync-alt"></i>
        </button>
      </div>

      <div className="divide-y divide-gray-100 max-h-[700px] overflow-y-auto">
        {upcomingEvents.length === 0 ? (
          <div className="text-center py-12">
            <i className="fas fa-calendar-times text-5xl text-neutral-300 mb-4"></i>
            <p className="text-neutral-500">Không có sự kiện nào sắp tới</p>
          </div>
        ) : (
          upcomingEvents.map((event, index) => {
            const dayName = event.date.toLocaleDateString('vi-VN', { weekday: 'long' });
            const dayNum = event.date.getDate();
            const dateRange = `${event.date.toLocaleDateString('vi-VN')} - ${event.date.toLocaleDateString('vi-VN')}`;
            const daysLeft = Math.ceil((event.date.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
            
            return (
              <div key={index} className="p-4 hover:bg-gray-50 transition cursor-pointer">
                <div className="flex items-start space-x-4">
                  {/* Left: Day info */}
                  <div className="flex-shrink-0 text-center">
                    <div className="bg-gray-100 rounded-lg px-3 py-2 min-w-[60px]">
                      <div className="text-xs text-gray-600 capitalize">{dayName.split(' ')[1]}</div>
                      <div className="text-2xl font-bold text-gray-800">{dayNum}</div>
                      <div className="text-xs text-gray-500">{event.date.getMonth() + 1}/{event.date.getFullYear()}</div>
                    </div>
                  </div>
                  
                  {/* Right: Event info */}
                  <div className="flex-1 min-w-0">
                    {/* Event tag */}
                    <div className="mb-2">
                      <span className={cn(
                        "inline-block px-3 py-1 rounded text-sm font-medium",
                        EVENT_TYPE_COLORS[event.type as keyof typeof EVENT_TYPE_COLORS] || 'bg-gray-500 text-white'
                      )}>
                        {event.title || event.name}
                      </span>
                    </div>
                    
                    {/* Event title/description */}
                    <h3 className="text-sm font-semibold text-gray-800 mb-1">
                      {dateRange}
                    </h3>
                    
                    {/* Time info */}
                    <div className="flex items-center text-xs text-gray-500 space-x-3">
                      <span>
                        <i className="far fa-calendar mr-1"></i>
                        Diễn ra trong <strong>{daysLeft}</strong> ngày tới
                      </span>
                    </div>
                    
                    {/* Description if available */}
                    {event.description && (
                      <p className="text-xs text-gray-600 mt-2 line-clamp-2">
                        {event.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
