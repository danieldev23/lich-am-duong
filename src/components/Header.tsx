'use client';

import { useCalendarStore } from '@/lib/store';
import { formatTime } from '@/lib/utils';
import { useSettings } from '@/hooks/useSettings';
import { useEffect, useState } from 'react';

export function Header() {
  const { toggleSidebar } = useCalendarStore();
  const { getSetting } = useSettings();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <header className="bg-white shadow-lg border-b border-neutral-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleSidebar}
              className="lg:hidden p-2 rounded-md hover:bg-neutral-100 transition-colors"
            >
              <i className="fas fa-bars w-6 h-6"></i>
            </button>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-light rounded-lg flex items-center justify-center">
                <i className="fas fa-calendar-alt text-white"></i>
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-primary">
                  {getSetting('site_title', 'Lịch Âm Dương')}
                </h1>
                <p className="text-xs text-neutral-600 hidden sm:block">
                  {getSetting('site_description', 'Xem ngày tốt, giờ hoàng đạo')}
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-2 text-sm text-neutral-600">
              <i className="fas fa-clock"></i>
              <span>{formatTime(currentTime)}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
