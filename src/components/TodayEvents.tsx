'use client';

import { EVENTS, EVENT_TYPE_COLORS, EVENT_TYPE_ICONS } from '@/lib/constants';
import { cn } from '@/lib/utils';

export function TodayEvents() {
  const today = new Date();
  const todayStr = `${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;
  const todayEvents = EVENTS.filter(event => event.date === todayStr);

  if (todayEvents.length === 0) {
    return null;
  }

  return (
    <div className="mb-8">
      <div className="relative bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 rounded-xl shadow-lg overflow-hidden">
        {/* Background Pattern */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm0 0c0 11.046 8.954 20 20 20s20-8.954 20-20-8.954-20-20-20-20 8.954-20 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* Floating Elements */}
        <div className="absolute top-4 left-4 w-12 h-12 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute top-6 right-6 w-8 h-8 bg-white/10 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-4 left-8 w-6 h-6 bg-white/10 rounded-full animate-pulse delay-500"></div>
        <div className="absolute bottom-6 right-4 w-10 h-10 bg-white/10 rounded-full animate-pulse delay-700"></div>

        <div className="relative z-10 p-6">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-4 shadow-lg">
              <i className="fas fa-calendar-day text-3xl text-white"></i>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">
              SỰ KIỆN HÔM NAY
            </h2>
            <p className="text-white/90 text-lg">
              {today.toLocaleDateString('vi-VN', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {todayEvents.map((event, index) => (
              <div
                key={index}
                className="relative bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden group"
              >
                {/* Event Card Background Pattern */}
                <div
                  className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-300"
                  style={{
                    backgroundImage:
                      event.type === "holiday"
                        ? `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23e74c3c' fill-opacity='0.3'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm0 0c0 5.5 4.5 10 10 10s10-4.5 10-10-4.5-10-10-10-10 4.5-10 10z'/%3E%3C/g%3E%3C/svg%3E")`
                        : event.type === "history"
                        ? `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%233498db' fill-opacity='0.3'%3E%3Cpath d='M20 0l20 20-20 20L0 20z'/%3E%3C/g%3E%3C/svg%3E")`
                        : `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23e91e63' fill-opacity='0.3'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3Ccircle cx='3' cy='13' r='3'/%3E%3Ccircle cx='13' cy='3' r='3'/%3E%3C/g%3E%3C/svg%3E")`,
                  }}
                />

                <div className="relative z-10">
                  {/* Event Icon */}
                  <div className="flex items-center justify-between mb-3">
                    <div className={cn(
                      "w-12 h-12 rounded-lg flex items-center justify-center shadow-sm",
                      EVENT_TYPE_COLORS[event.type]
                    )}>
                      <i className={cn(EVENT_TYPE_ICONS[event.type], "text-lg")}></i>
                    </div>
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  </div>

                  {/* Event Content */}
                  <h3 className="font-bold text-gray-800 text-lg mb-2 leading-tight">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                    {event.desc}
                  </p>

                  {/* Event Type Badge */}
                  <div className="flex items-center justify-between">
                    <span className={cn(
                      "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium",
                      event.type === "holiday" && "bg-red-100 text-red-800",
                      event.type === "history" && "bg-blue-100 text-blue-800",
                      event.type === "culture" && "bg-pink-100 text-pink-800"
                    )}>
                      {event.type === "holiday" && "🎉 Ngày lễ"}
                      {event.type === "history" && "📚 Lịch sử"}
                      {event.type === "culture" && "🎭 Văn hóa"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-6">
            <a
              href="/events"
              className="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-lg hover:bg-white/30 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <i className="fas fa-calendar-alt mr-2"></i>
              Xem tất cả sự kiện
              <i className="fas fa-arrow-right ml-2"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}