'use client';

import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { EVENTS, HOLIDAYS, EVENT_TYPE_COLORS, EVENT_TYPE_ICONS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { useState, useMemo } from 'react';

type FilterType = 'all' | 'holiday' | 'history' | 'culture';

export default function EventsPage() {
  const [filter, setFilter] = useState<FilterType>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEvents = useMemo(() => {
    let events = EVENTS;

    // Filter by type
    if (filter !== 'all') {
      events = events.filter(event => event.type === filter);
    }

    // Filter by search term
    if (searchTerm) {
      events = events.filter(event => 
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.desc.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort by date
    return events.sort((a, b) => {
      const [monthA, dayA] = a.date.split('-').map(Number);
      const [monthB, dayB] = b.date.split('-').map(Number);
      return monthA - monthB || dayA - dayB;
    });
  }, [filter, searchTerm]);

  const eventsByMonth = useMemo(() => {
    const months: { [key: number]: typeof EVENTS } = {};
    
    filteredEvents.forEach(event => {
      const [month] = event.date.split('-').map(Number);
      if (!months[month]) {
        months[month] = [];
      }
      months[month].push(event);
    });

    return months;
  }, [filteredEvents]);

  const monthNames = [
    '', 'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
    'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
  ];

  const filterButtons = [
    { key: 'all' as FilterType, label: 'Tất cả', icon: 'fas fa-calendar', count: EVENTS.length },
    { key: 'holiday' as FilterType, label: 'Ngày lễ', icon: 'fas fa-star', count: EVENTS.filter(e => e.type === 'holiday').length },
    { key: 'history' as FilterType, label: 'Lịch sử', icon: 'fas fa-landmark', count: EVENTS.filter(e => e.type === 'history').length },
    { key: 'culture' as FilterType, label: 'Văn hóa', icon: 'fas fa-heart', count: EVENTS.filter(e => e.type === 'culture').length },
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      
      <div className="flex min-h-screen">
        <Sidebar />
        
        <main className="flex-1 lg:ml-64">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-primary mb-2">Sự Kiện & Ngày Lễ</h1>
              <p className="text-neutral-600">Tổng hợp các ngày lễ, sự kiện lịch sử và văn hóa Việt Nam</p>
            </div>

            {/* Filters and Search */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                {/* Filter Buttons */}
                <div className="flex flex-wrap gap-2">
                  {filterButtons.map((button) => (
                    <button
                      key={button.key}
                      onClick={() => setFilter(button.key)}
                      className={cn(
                        "flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors",
                        filter === button.key
                          ? "bg-primary text-white"
                          : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                      )}
                    >
                      <i className={button.icon}></i>
                      <span>{button.label}</span>
                      <span className="bg-white bg-opacity-20 px-2 py-1 rounded text-xs">
                        {button.count}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Search */}
                <div className="relative w-full lg:w-80">
                  <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400"></i>
                  <input
                    type="text"
                    placeholder="Tìm kiếm sự kiện..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Events List */}
            {Object.keys(eventsByMonth).length === 0 ? (
              <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                <i className="fas fa-search text-4xl text-neutral-400 mb-4"></i>
                <h3 className="text-xl font-semibold text-neutral-600 mb-2">Không tìm thấy sự kiện</h3>
                <p className="text-neutral-500">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
              </div>
            ) : (
              <div className="space-y-8">
                {Object.entries(eventsByMonth)
                  .sort(([a], [b]) => parseInt(a) - parseInt(b))
                  .map(([month, events]) => (
                    <div key={month} className="bg-white rounded-xl shadow-lg overflow-hidden">
                      <div className="bg-gradient-to-r from-primary to-primary-light p-4">
                        <h2 className="text-xl font-bold text-white flex items-center">
                          <i className="fas fa-calendar-alt mr-2"></i>
                          {monthNames[parseInt(month)]}
                          <span className="ml-2 bg-white bg-opacity-20 px-2 py-1 rounded text-sm">
                            {events.length} sự kiện
                          </span>
                        </h2>
                      </div>
                      
                      <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {events.map((event, index) => {
                            const [month, day] = event.date.split('-').map(Number);
                            const isHoliday = HOLIDAYS.some(h => h.date === event.date);
                            
                            return (
                              <div
                                key={index}
                                className="border border-neutral-200 rounded-lg p-4 hover:shadow-md transition-all cursor-pointer"
                              >
                                <div className="flex items-start space-x-3">
                                  <div className={cn(
                                    "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
                                    EVENT_TYPE_COLORS[event.type]
                                  )}>
                                    <i className={EVENT_TYPE_ICONS[event.type]}></i>
                                  </div>
                                  
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-1">
                                      <h3 className="font-semibold text-neutral-900 text-sm leading-tight">
                                        {event.title}
                                      </h3>
                                      <div className="flex items-center space-x-1">
                                        <span className="text-xs font-medium text-primary bg-primary bg-opacity-10 px-2 py-1 rounded">
                                          {day}/{month}
                                        </span>
                                        {isHoliday && (
                                          <i className="fas fa-star text-red-500 text-xs"></i>
                                        )}
                                      </div>
                                    </div>
                                    <p className="text-xs text-neutral-600 leading-relaxed">
                                      {event.desc}
                                    </p>
                                    <div className="mt-2">
                                      <span className={cn(
                                        "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
                                        event.type === 'holiday' && "bg-red-100 text-red-800",
                                        event.type === 'history' && "bg-blue-100 text-blue-800",
                                        event.type === 'culture' && "bg-pink-100 text-pink-800"
                                      )}>
                                        {event.type === 'holiday' && 'Ngày lễ'}
                                        {event.type === 'history' && 'Lịch sử'}
                                        {event.type === 'culture' && 'Văn hóa'}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}

            {/* Statistics */}
            <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-primary mb-4">Thống Kê</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">
                    {EVENTS.filter(e => e.type === 'holiday').length}
                  </div>
                  <div className="text-sm text-red-700">Ngày lễ</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {EVENTS.filter(e => e.type === 'history').length}
                  </div>
                  <div className="text-sm text-blue-700">Sự kiện lịch sử</div>
                </div>
                <div className="text-center p-4 bg-pink-50 rounded-lg">
                  <div className="text-2xl font-bold text-pink-600">
                    {EVENTS.filter(e => e.type === 'culture').length}
                  </div>
                  <div className="text-sm text-pink-700">Văn hóa</div>
                </div>
                <div className="text-center p-4 bg-primary bg-opacity-10 rounded-lg">
                  <div className="text-2xl font-bold text-primary">
                    {EVENTS.length}
                  </div>
                  <div className="text-sm text-primary">Tổng cộng</div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
