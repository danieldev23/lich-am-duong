'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useEvents } from '@/hooks/useEvents';
import { EVENTS } from '@/lib/constants';

// Custom fire animation styles
const fireAnimationStyles = `
  @keyframes flicker {
    0%, 100% { transform: scale(1) rotate(-1deg); opacity: 1; }
    25% { transform: scale(1.1) rotate(1deg); opacity: 0.9; }
    50% { transform: scale(0.95) rotate(-0.5deg); opacity: 1; }
    75% { transform: scale(1.05) rotate(0.5deg); opacity: 0.95; }
  }
  
  @keyframes fireGlow {
    0%, 100% { filter: hue-rotate(0deg) brightness(1); }
    25% { filter: hue-rotate(10deg) brightness(1.1); }
    50% { filter: hue-rotate(-5deg) brightness(0.9); }
    75% { filter: hue-rotate(5deg) brightness(1.05); }
  }
  
  .fire-animation {
    animation: flicker 0.5s ease-in-out infinite, fireGlow 1s ease-in-out infinite;
  }
  
  .fire-glow {
    animation: fireGlow 0.8s ease-in-out infinite;
  }
`;

const EVENT_TYPE_COLORS = {
  holiday: 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-rose-200',
  history: 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-blue-200', 
  culture: 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-emerald-200'
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const EVENT_TYPE_ICONS = {
  holiday: 'fas fa-star',
  history: 'fas fa-landmark',
  culture: 'fas fa-theater-masks'
};

interface UpcomingEventsProps {
  onDateClick?: (date: Date) => void;
}

export function UpcomingEvents({ onDateClick }: UpcomingEventsProps) {
  const [mounted, setMounted] = useState(false);
  const { getUpcomingEvents, isLoading } = useEvents();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || isLoading) {
    return (
      <div className="bg-white rounded-xl p-6">
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

  // Get today's events
  const today = new Date();
  const todayStr = `${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;
  const todayEvents = EVENTS.filter(event => event.date === todayStr);
  
  const allUpcomingEvents = getUpcomingEvents(60); // Tăng lên 60 ngày để có nhiều sự kiện hơn
  
  // Debug log
  console.log('All upcoming events:', allUpcomingEvents.map(e => ({ 
    title: e.title || e.name, 
    date: e.date.toDateString(),
    daysFromNow: Math.ceil((e.date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
  })));
  
  // Lọc bỏ sự kiện hôm nay khỏi danh sách upcoming
  const upcomingEvents = allUpcomingEvents.filter(event => {
    const eventDate = new Date(event.date);
    const todayDate = new Date();
    return eventDate.toDateString() !== todayDate.toDateString();
  }).slice(0, 8); // Giới hạn 8 sự kiện để không quá dài

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getDaysUntil = (date: Date) => {
    const today = new Date();
    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Hôm nay';
    if (diffDays === 1) return 'Ngày mai';
    return `${diffDays} ngày nữa`;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getEventTypeLabel = (type: string) => {
    switch (type) {
      case 'holiday': return 'Ngày lễ';
      case 'history': return 'Lịch sử';
      case 'culture': return 'Văn hóa';
      default: return 'Sự kiện';
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: fireAnimationStyles }} />
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 px-4 py-3 flex items-center justify-between">
        <h2 className="text-lg font-bold text-white flex items-center">
          <i className="fas fa-calendar-check mr-2"></i>
          SỰ KIỆN NỔI BẬT SẮP DIỄN RA
        </h2>
        <button className="text-white hover:bg-white/20 p-2 rounded transition">
          <i className="fas fa-sync-alt"></i>
        </button>
      </div>

      <div className="divide-y divide-gray-100 max-h-[700px] overflow-y-auto">
        {/* Today's Card - Combined */}
        <div 
          className={cn(
            "p-5 hover:bg-gradient-to-r transition-all duration-300 cursor-pointer border-l-4 relative overflow-hidden",
            todayEvents.length > 0 
              ? "border-emerald-500 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 hover:shadow-lg hover:shadow-emerald-200/50"
              : "border-blue-500 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 hover:shadow-lg hover:shadow-blue-200/50"
          )}
          onClick={() => onDateClick?.(today)}
        >
          <div className="flex items-start space-x-4">
            {/* Left: Day info */}
            <div className="flex-shrink-0 text-center">
              <div className={cn(
                "bg-white rounded-lg px-3 py-2 min-w-[60px] shadow-sm border",
                todayEvents.length > 0 ? "border-emerald-200" : "border-blue-200"
              )}>
                <div className={cn(
                  "text-xs capitalize font-medium",
                  todayEvents.length > 0 ? "text-emerald-600" : "text-blue-600"
                )}>
                  {today.toLocaleDateString('vi-VN', { weekday: 'short' })}
                </div>
                <div className={cn(
                  "text-2xl font-bold",
                  todayEvents.length > 0 ? "text-emerald-700" : "text-blue-700"
                )}>{today.getDate()}</div>
                <div className={cn(
                  "text-xs",
                  todayEvents.length > 0 ? "text-emerald-500" : "text-blue-500"
                )}>{today.getMonth() + 1}/{today.getFullYear()}</div>
              </div>
            </div>
            
            {/* Right: Today info */}
            <div className="flex-1 min-w-0">
              {/* Today tag */}
              <div className="mb-2">
                <span className={cn(
                  "inline-block px-4 py-2 rounded-md text-sm font-bold text-white transform hover:scale-105 transition-all duration-200",
                  todayEvents.length > 0 
                    ? "bg-gradient-to-r from-emerald-500 to-teal-500 shadow-emerald-200"
                    : "bg-gradient-to-r from-blue-500 to-indigo-500 shadow-blue-200"
                )}>
                  {todayEvents.length > 0 ? todayEvents[0].title : "HÔM NAY"}
                </span>
              </div>
              
              {/* Date range */}
              <h3 className="text-sm font-semibold text-gray-800 mb-1">
                {today.toLocaleDateString('vi-VN')}
              </h3>
              
              {/* Status */}
              <div className="flex items-center mb-3">
                <div className={cn(
                  "flex items-center px-3 py-1.5 rounded-full text-xs font-bold tracking-wide",
                  todayEvents.length > 0 
                    ? "bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-red-200" 
                    : "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-blue-200"
                )}>
                  <div className={cn(
                    "w-3 h-3 rounded-full mr-2 animate-pulse",
                    "bg-white shadow-sm"
                  )}></div>
                  <span className="font-extrabold flex items-center">
                    {todayEvents.length > 0 ? (
                      <>
                        <span className="mr-1 text-base relative">
                        
                        </span>
                        <span className="relative">
                          Đang diễn ra
                          
                        </span>
                      </>
                    ) : (
                      <>📅 HIỆN TẠI</>
                    )}
                  </span>
                </div>
              </div>
              
              {/* Today events list */}
              {todayEvents.length > 0 && (
                <div className="space-y-1">
                  {todayEvents.map((event, index) => (
                    <div key={index} className="text-xs text-gray-600">
                      <div className="flex items-center">
                        <i className={cn(
                          "mr-2 flex-shrink-0",
                          event.type === 'holiday' ? 'fas fa-star text-rose-500' :
                          event.type === 'history' ? 'fas fa-landmark text-indigo-500' :
                          'fas fa-heart text-emerald-500'
                        )}></i>
                        <span className="font-medium">{event.title}</span>
                      </div>
                      <div className="ml-5 text-gray-500 mt-1">{event.desc}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {upcomingEvents.length === 0 ? (
          <div className="text-center py-12">
            <i className="fas fa-calendar-times text-5xl text-neutral-300 mb-4"></i>
            <p className="text-neutral-500">Không có sự kiện nào sắp tới</p>
          </div>
        ) : (
          upcomingEvents.map((event, index) => {
            const dayName = event.date.toLocaleDateString('vi-VN', { weekday: 'long' });
            const dayNum = event.date.getDate();
            const dateRange = `${event.date.toLocaleDateString('vi-VN')}`;
            const daysLeft = Math.ceil((event.date.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
            
            return (
              <div 
                key={index} 
                className="p-5 hover:bg-gradient-to-r hover:from-slate-50 hover:to-gray-50 hover:shadow-md transition-all duration-300 cursor-pointer rounded-lg mx-2 my-1"
                onClick={() => onDateClick?.(event.date)}
              >
                <div className="flex items-start space-x-4">
                  {/* Left: Day info */}
                  <div className="flex-shrink-0 text-center">
                    <div className="bg-gradient-to-br from-slate-100 to-gray-100 rounded-md px-3 py-2 min-w-[60px] shadow-sm border border-slate-200">
                      <div className="text-xs text-slate-600 capitalize font-medium">{dayName.split(' ')[1]}</div>
                      <div className="text-2xl font-bold text-slate-800">{dayNum}</div>
                      <div className="text-xs text-slate-500">{event.date.getMonth() + 1}/{event.date.getFullYear()}</div>
                    </div>
                  </div>
                  
                  {/* Right: Event info */}
                  <div className="flex-1 min-w-0">
                    {/* Event tag */}
                    <div className="mb-2">
                      <span className={cn(
                        "inline-block px-4 py-2 rounded-md text-sm font-bold transform hover:scale-105 transition-all duration-200",
                        EVENT_TYPE_COLORS[event.type as keyof typeof EVENT_TYPE_COLORS] || 'bg-gradient-to-r from-gray-500 to-gray-600 text-white shadow-gray-200'
                      )}>
                        {event.title || event.name}
                      </span>
                    </div>
                    
                    {/* Event title/description */}
                    <h3 className="text-sm font-semibold text-gray-800 mb-1">
                      {dateRange}
                    </h3>
                    
                    {/* Time info */}
                    <div className="flex items-center text-xs text-slate-500 mb-2">
                      <i className="far fa-calendar mr-1 text-slate-400 flex-shrink-0"></i>
                      <span>Diễn ra trong <strong className="text-slate-700">{daysLeft}</strong> ngày tới</span>
                    </div>
                    
                    {/* Event description */}
                    {(event.description || event.desc) && (
                      <div className="text-xs text-gray-600 leading-relaxed">
                        {event.description || event.desc}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
    </>
  );
}
